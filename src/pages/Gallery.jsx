import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import placeholderImage from '../assets/Placeholder.jpg';
import { Trash2 } from 'lucide-react';

const Gallery = () => {
  // State to store the identified albums, initialized with placeholder data
  const [identifiedAlbums, setIdentifiedAlbums] = useState([
    {
      id: 1,
      title: 'Album 1',
      artist: 'Artist 1',
      cover: placeholderImage,
    },
    {
      id: 2,
      title: 'Album 2',
      artist: 'Artist 2',
      cover: placeholderImage,
    },
    {
      id: 3,
      title: 'Album 3',
      artist: 'Artist 3',
      cover: placeholderImage,
    },
    {
      id: 4,
      title: 'Album 4',
      artist: 'Artist 4',
      cover: placeholderImage,
    },
    {
      id: 5,
      title: 'Album 5',
      artist: 'Artist 5',
      cover: placeholderImage,
    },
  ]);

  // useEffect hook to load saved albums from local storage on component mount
  useEffect(() => {
    const savedAlbums = JSON.parse(localStorage.getItem('savedAlbums')) || [];

    if (savedAlbums.length > 0) {
      const updatedAlbums = [...identifiedAlbums];

      // Replace placeholder albums with saved albums from local storage
      savedAlbums.forEach((savedAlbum, index) => {
        if (index < updatedAlbums.length) {
          updatedAlbums[index] = {
            id: updatedAlbums[index].id,
            title: savedAlbum.name,
            artist: savedAlbum.artist,
            cover: savedAlbum.cover,
          };
        }
      });

      setIdentifiedAlbums(updatedAlbums);
    }
  }, []);

  // Function to delete an album and revert it back to the placeholder
  const deleteAlbum = (id) => {
    const updatedAlbums = identifiedAlbums.map((album) =>
      album.id === id
        ? {
            ...album,
            cover: placeholderImage,
            title: `Album ${id}`,
            artist: `Artist ${id}`,
          }
        : album
    );

    setIdentifiedAlbums(updatedAlbums);

    // Remove the album from local storage
    const savedAlbums = JSON.parse(localStorage.getItem('savedAlbums')) || [];
    const updatedSavedAlbums = savedAlbums.filter((album, index) => index !== id - 1);
    localStorage.setItem('savedAlbums', JSON.stringify(updatedSavedAlbums));
  };

  // Slick carousel settings for responsive album display
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Medium screens: show 2 albums
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600, // Small screens: show 1 album
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Your Identified Albums
      </h1>
      
      {/* Slick carousel for displaying albums */}
      <Slider {...settings}>
        {identifiedAlbums.map((album) => (
          <div key={album.id} className="p-4 relative" style={{ background: 'transparent' }}>
            <div
              className="shadow-lg p-0 text-center"
              style={{
                background: 'transparent',
                boxShadow: 'none',
              }}
            >
              {/* Album Cover Image */}
              <img
                src={album.cover}
                alt={album.title}
                className="rounded-lg"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '12px',
                }}
              />

              {/* Album Title & Artist */}
              <h2 className="text-xl font-semibold text-white mt-2">{album.title}</h2>
              <p className="text-gray-400">{album.artist}</p>

              {/* Delete Button (Only appears if the album is not a placeholder) */}
              {album.cover !== placeholderImage && (
                <button
                  onClick={() => deleteAlbum(album.id)}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Gallery;
