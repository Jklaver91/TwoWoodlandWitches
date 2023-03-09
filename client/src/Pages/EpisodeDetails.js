import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function EpisodeDetails() {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const getEpisode = async () => {
      try {
        const response = await fetch(`/api/get-episode/${id}`);
        const data = await response.json();
        setEpisode(data);
      } catch (err) {
        console.error(err);
      }
    };

    const getAccessToken = async () => {
      try {
        const response = await fetch('/api/get-access-token');
        const data = await response.json();
        setAccessToken(data.access_token);
      } catch (err) {
        console.error(err);
      }
    };
    
    getAccessToken();
    getEpisode();
  }, [id]);

  return (
    <div className="p-5">
      {episode && accessToken ? (
        <div>
          <h1>{episode.name}</h1>
          <iframe
            title={episode.name}
            src={`https://open.spotify.com/embed/episode/${episode.id}`}
            width="100%"
            height="232"
            frameBorder="0"
            allowtransparency="true"
            allow="encrypted-media"
            accessToken={accessToken}
          ></iframe>
        </div>
      ) : (
        <div>podcast 1...</div>
      )}
    </div>
  );
}

export default EpisodeDetails;
