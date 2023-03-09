import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '.././App.css';
import { Card, ListGroup, Button } from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';
import { Link } from 'react-router-dom';

const spotifyApi = new SpotifyWebApi({
  clientId: 'f3f195c8976647169182690d62827f5a',
});

function Episodes() {
  const [episodes, setEpisodes] = useState([]);

  const getAccessToken = () => {
    const hashParams = {};
    const hash = window.location.hash.substring(1);
    const regex = /([^&;=]+)=?([^&;]*)/g;
    let match = regex.exec(hash);

    while (match) {
      hashParams[match[1]] = decodeURIComponent(match[2]);
      match = regex.exec(hash);
    }

    const redirectUri = 'http://localhost:3000/episodes'; // replace with your app's redirect URI
    if (Object.keys(hashParams).length === 0) {
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${spotifyApi.getCredentials().clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}`;
    } else {
      spotifyApi.setAccessToken(hashParams.access_token);
    }
  };

  const fetchEpisodes = async () => {
    try {
      const response = await spotifyApi.getShowEpisodes('1eNgnbvpilm75LMH2jQS2i');
      console.log(response);
      setEpisodes(response.body.items);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAccessToken();
    // Call fetchEpisodes() after the access token has been obtained
  }, []);

  useEffect(() => {
    fetchEpisodes();
  }, []);

  console.log(episodes);

  return (
    <div className='p-5'>
      <h1>Episodes</h1>
      {episodes.length > 0 && (
        <div className="row">
          {episodes.map((episode) => (
            <div key={episode.id} className="col-md-3">
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>{episode.name}</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item>{episode.description}</ListGroup.Item>
                  </ListGroup>
                  <Link to={`/episodes/${episode.id}`}>
                    <Button variant="primary">Play Episode</Button>
                  </Link>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Episodes;