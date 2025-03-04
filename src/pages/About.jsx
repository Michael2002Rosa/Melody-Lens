const About = () => {
    return (
      <div className="container mx-auto p-8 text-center text-white">
        {/* High-Level Explanation */}
        <h1 className="text-4xl font-bold mb-4 text-orange-500">🎵 Melody Lens: Your Music Discovery Companion 🎵</h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Melody Lens is a revolutionary web app that brings the magic of music discovery to your fingertips! 
          Simply point your camera at an album cover, and let Melody Lens do the rest. 🎤📸
        </p>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mt-4">
          Using cutting-edge image recognition and music APIs, Melody Lens identifies the album, fetches its details 
          (like the artist and tracklist), and adds it to your personal gallery. 🖼️🎶 Whether you're a music enthusiast 
          or just exploring new tunes, Melody Lens makes it easy to capture, identify, and save your favorite albums in one place. 🎧📚
        </p>
  
        {/* Low-Level Explanation */}
        <div className="mt-10">
          <h2 className="text-3xl font-semibold text-orange-400">🔍 How Melody Lens Works Under the Hood 🔍</h2>
          <div className="mt-6 space-y-6 text-gray-400 text-left max-w-3xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold text-orange-300">📸 Image Capture:</h3>
              <p>The app uses your device's camera to capture an image of an album cover.</p>
              <p>The image is converted into a base64-encoded string for processing.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-orange-300">🔄 Reverse Image Search:</h3>
              <p>The image is sent to a backend server, where the Google Cloud Vision API performs a reverse image search to identify the album name.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-orange-300">🎧 Spotify Integration:</h3>
              <p>The identified album name is used to query the Spotify API.</p>
              <p>Spotify returns details like the artist name, album cover, and tracklist.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-orange-300">💾 Save to Gallery:</h3>
              <p>The album details are saved to local storage and displayed in your gallery.</p>
              <p>You can view, delete, or explore your saved albums anytime.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-orange-300">🎡 Carousel Display:</h3>
              <p>The gallery uses a responsive carousel (powered by <strong>react-slick</strong>) to showcase your saved albums.</p>
              <p>Each album card displays the cover, title, artist, and a delete button for easy management.</p>
            </div>
          </div>
        </div>
  
        {/* Why Melody Lens? */}
        <div className="mt-12">
          <h2 className="text-3xl font-semibold text-orange-400">Why Melody Lens? 🤔</h2>
          <ul className="mt-4 space-y-3 text-gray-400 max-w-2xl mx-auto text-left">
            <li><span className="text-orange-300 font-semibold">✨ Seamless Experience:</span> From capturing an album cover to saving it in your gallery, everything happens in just a few clicks. 🖱️</li>
            <li><span className="text-orange-300 font-semibold">🌍 Music Discovery:</span> Explore new albums and artists effortlessly. 🎤</li>
            <li><span className="text-orange-300 font-semibold">❤️ Personalized Gallery:</span> Build your own collection of favorite albums. 🖼️</li>
          </ul>
        </div>
  
        {/* Call to Action */}
        <div className="mt-12">
          <a
            href="/"
            className="px-6 py-3 bg-orange-600 text-white rounded-lg text-lg hover:bg-orange-700 transition-colors"
          >
            Start Scanning Albums 🚀
          </a>
        </div>
      </div>
    );
  };
  
  export default About;
  