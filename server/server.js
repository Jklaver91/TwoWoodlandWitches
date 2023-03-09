const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();

const spotifyApi = new SpotifyWebApi({
  clientId: 'f3f195c8976647169182690d62827f5a',
  clientSecret: '0106a4974e114d8b8d5c2a43f36c54f3',
});

// Route to get an access token from Spotify
app.get('/api/get-access-token', async (req, res) => {
    try {
      const response = await spotifyApi.clientCredentialsGrant();
      const accessToken = response.body.access_token;
      res.json({ access_token: accessToken });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Route to get details about a specific episode
  app.get('/api/get-episode/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const response = await spotifyApi.getEpisode(id);
      const episode = response.body;
      res.json(episode);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  // Catch-all route to serve the React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });
  
  // Start the server
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });