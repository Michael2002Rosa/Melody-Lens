import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { Camera, Save } from 'lucide-react';
import detectorLogo from '../assets/detectorlogo.png';

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [albumData, setAlbumData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Capture image from the webcam
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  };

  // Reverse image search using the backend
  const reverseImageSearch = async (imageSrc) => {
    try {
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64Data = imageSrc.split(',')[1];

      // Send the base64-encoded image to the backend
      const response = await axios.post('http://localhost:5000/reverse-image-search', {
        imageBase64: base64Data,
      });

      return response.data.title; // Return the title of the first result
    } catch (error) {
      console.error('Error in reverse image search:', error);
      throw error;
    }
  };

  // Helper function to get Spotify access token
  const getSpotifyAccessToken = async () => {
    const clientId = 'YOUR SPOTIFY CLIENT ID'; // Replace with your Spotify Client ID
    const clientSecret = 'YOUR SPOTIFY CLIENT SECRET'; // Replace with your Spotify Client Secret

    const authResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        },
      }
    );

    return authResponse.data.access_token;
  };

  // Search for the album on Spotify
  const searchAlbumOnSpotify = async (query) => {
    const accessToken = await getSpotifyAccessToken();

    // Search for the album
    const searchResponse = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return searchResponse.data.albums.items[0]; // Return the first result
  };

  // Fetch album tracks from Spotify
  const fetchAlbumTracks = async (albumId) => {
    const accessToken = await getSpotifyAccessToken();

    // Fetch tracks for the album
    const tracksResponse = await axios.get(
      `https://api.spotify.com/v1/albums/${albumId}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return tracksResponse.data.items.map((track) => track.name); // Return track names
  };

  // Identify the album
  const identifyAlbum = async () => {
    if (!imageSrc) return;

    setLoading(true);

    try {
      // Step 1: Reverse image search to get the album name
      const albumName = await reverseImageSearch(imageSrc);
      console.log('Album Name:', albumName);

      // Step 2: Search for the album on Spotify
      const album = await searchAlbumOnSpotify(albumName);
      console.log('Album:', album);

      if (album) {
        // Step 3: Fetch album details
        const tracks = await fetchAlbumTracks(album.id);

        const albumDetails = {
          name: album.name,
          artist: album.artists[0].name,
          cover: album.images[0].url,
          tracks: tracks,
        };

        setAlbumData(albumDetails);
      } else {
        setAlbumData('No album found.');
      }
    } catch (error) {
      console.error('Error identifying album:', error);
      setAlbumData('Failed to identify album. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Save the current album to local storage
  const saveAlbumToGallery = () => {
    if (albumData) {
      // Get existing albums from local storage
      const savedAlbums = JSON.parse(localStorage.getItem('savedAlbums')) || [];

      // Add the new album to the list
      savedAlbums.push(albumData);

      // Save the updated list back to local storage
      localStorage.setItem('savedAlbums', JSON.stringify(savedAlbums));

      alert('Album saved to gallery!');
    }
  };

  return (
    <div style={{ textAlign: 'center', width: '100%' }}>
      {/* Logo */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <img
          src={detectorLogo}
          alt="Logo"
          style={{ width: '200px', height: 'auto' }}
        />
      </div>

      {/* Webcam */}
      <div style={{ width: '100%', margin: '0 auto' }}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={{
            width: '50%',
            height: 'auto',
            margin: '0 auto',
            border: '2px solid #ccc',
            borderRadius: '10px',
            transform: 'scaleX(-1)', 
          }}
        />
      </div>

      {/* Buttons */}
      <div style={{ margin: '20px 0', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button
          onClick={capture}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          <Camera size={24} />
        </button>
        <button
          onClick={identifyAlbum}
          disabled={!imageSrc || loading}
          style={{
            padding: '10px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Identifying...' : 'Identify Album'}
        </button>
        <button
          onClick={saveAlbumToGallery}
          disabled={!albumData}
          style={{
            padding: '10px',
            backgroundColor: '#ffc107',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          <Save size={24} />
        </button>
      </div>

      {/* Captured Image */}
      {imageSrc && (
        <div>
          <h2>Captured Image</h2>
          <img
            src={imageSrc}
            alt="Captured"
            style={{
              width: '50%',
              height: 'auto',
              margin: '0 auto',
              border: '2px solid #ccc',
              borderRadius: '10px',
            }}
          />
        </div>
      )}

      {/* Album Details */}
      {albumData ? (
        <div>
          <h2>Album Details</h2>
          <p>Name: {albumData.name}</p>
          <p>Artist: {albumData.artist}</p>
          <img src={albumData.cover} alt="Album Cover" style={{ width: '200px', height: 'auto' }} />
          <h3>Tracks:</h3>
          {albumData.tracks ? (
            <ul>
              {albumData.tracks.map((track, index) => (
                <li key={index}>{track}</li>
              ))}
            </ul>
          ) : (
            <p>No tracks available.</p>
          )}
        </div>
      ) : (
        <p>No album data available.</p>
      )}

      {/* Link to Gallery */}
      <div style={{ marginTop: '20px' }}>
        <a href="/gallery" style={{ color: '#007bff', textDecoration: 'none' }}>
          View Gallery
        </a>
      </div>
    </div>
  );
};

export default WebcamCapture;