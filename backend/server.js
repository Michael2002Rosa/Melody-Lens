import express from 'express';
import cors from 'cors'; 
import dotenv from 'dotenv'; 
import { ImageAnnotatorClient } from '@google-cloud/vision'; 

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json({ limit: '10mb' })); // Increase payload size limit to 10MB

// Initialize Google Cloud Vision client
const visionClient = new ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS, // Path tonservice account key file
});

// Reverse Image Search Endpoint
app.post('/reverse-image-search', async (req, res) => {
  const { imageBase64 } = req.body;

  if (!imageBase64) {
    return res.status(400).json({ error: 'Image data is required' });
  }

  try {
    console.log('Received image data');

    // Convert base64 image to a buffer
    const imageBuffer = Buffer.from(imageBase64, 'base64');

    // Perform reverse image search using Google Cloud Vision API
    const [result] = await visionClient.webDetection(imageBuffer);

    // Extract web detection results
    const webDetection = result.webDetection;

    if (!webDetection || !webDetection.webEntities || webDetection.webEntities.length === 0) {
      return res.status(404).json({ error: 'No results found' });
    }

    // Extract the most relevant result
    const mostRelevantEntity = webDetection.webEntities[0];
    res.json({
      title: mostRelevantEntity.description,
      score: mostRelevantEntity.score,
    });
  } catch (error) {
    console.error('Error in reverse image search:', error);

    // Log the full error response from Google Cloud Vision API
    if (error.response) {
      console.error('Google Cloud Vision API Error Response:', error.response.data);
    }

    res.status(500).json({ error: 'Failed to fetch data from Google Cloud Vision API' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});