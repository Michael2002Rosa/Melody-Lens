![logo](https://github.com/user-attachments/assets/8a34b57a-6511-4c4b-bfe9-223c7d48a0eb)


<h1 align="center">


  <br>
  Melody Lens
  <br>
</h1>

<h4 align="center">A vinyl detector with gallery functionality</h4>


<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#full-video-demonstration">Full Video Demonstration </a>
  



</p>

<p align="center">
  <img src="https://s6.gifyu.com/images/bM3He.gif">







## Key Features

🎨 Album Cover Recognition

Utilizes Google Cloud Vision API for accurate reverse image search of vinyl album covers

Processes webcam-captured images in real-time with React-Webcam

🎵 Spotify Integration

Fetches comprehensive album data (artist, tracklist, cover art) via Spotify API

Implements OAuth 2.0 for secure API authentication

🖼️ Interactive Gallery

Displays identified albums in a responsive carousel using React Slick

Saves recognized albums to a persistent gallery with localStorage

⚡ Optimized Performance

Compresses images client-side before API calls to reduce payload size

Implements error boundaries and loading states for smooth UX

🎛️ Tech Stack

Frontend: React, Tailwind CSS, Axios

Backend: Node.js, Express

APIs: Google Cloud Vision, Spotify Web API
## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/Michael2002Rosa/Melody-Lens

# Go into the repository
$ cd Melody-Lens

# Install dependencies
$ npm install

# Run the app
$ npm start
```

Prerequisites:

•Node.js (v16 or higher)

•npm (v8 or higher)

•Spotify Developer Account (for album data)

•Google Cloud Account (for image recognition)

🔑 API Setup

  1. Spotify API
    Go to Spotify Developer Dashboard

Create a new app and get:

•Client ID

•Client Secret

2. Google Cloud Vision API
Enable the Cloud Vision API

Create a service account and download the JSON key file

Set the key path in your environment:

```bash
export GOOGLE_APPLICATION_CREDENTIALS="path/to/your/service-account-key.json
```
🖥️ Running the App
```bash
#Start the frontend
npm start

#(In a seperate terminal) Start the backend server
node server.js
```

## Full Video Demonstration

Please check out the full video demonstration on YouTube via this link: **[HERE]( https://www.youtube.com/watch?v=eZTqcGVDcvcab_channelMichaelRosa
)

---
