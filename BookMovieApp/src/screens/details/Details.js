import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Details.css';
import Typography from '@material-ui/core/Typography';
import YouTube from 'react-youtube';


const Details = (props) => {
  const [movieDetails, setMovieDetails] = useState({});
  const { id } = useParams();

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };


  useEffect(() => {

    getMovieDetails(id);

  }, [id]);

  const getMovieDetails = async (id) => {
    try {
      const rawResponse = await fetch(`${props.baseUrl}/movies/${id}`);
      const data = await rawResponse.json();
      if (rawResponse.ok) {
        setMovieDetails(data);
      }
    }
    catch (e) {
      console.log(e);
    }

  }

  function _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  return (

    <div >
      {Object.keys(movieDetails).length !== 0 && (
        <div className='movie-details-container'>
          <div className='movie-details-left'>
            <Typography variant="subtitle1" gutterBottom className='back-to-home'>
              &lt; Back to Home
            </Typography>
            <div className='movie-poster'>
              <img src={movieDetails.poster_url} alt={movieDetails.title} />
            </div>

          </div>
          <div className='movie-details-middle'>
            <Typography variant="h2" gutterBottom>
              {movieDetails.title}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Genre</strong>: {movieDetails.genres.join()}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Duration</strong>: {movieDetails.duration}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Release Date</strong>: {new Date(movieDetails.release_date).toDateString()}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Rating</strong>: {movieDetails.rating}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Plot</strong>: (<a href={ movieDetails.wiki_url} target = "_blank">Wiki Link</a>) {movieDetails.storyline}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Trailer</strong>:
            </Typography>
            <YouTube videoId={movieDetails.trailer_url.split('=').pop()} opts={opts} onReady={_onReady} />
          </div>
          <div className='movie-details-right'>
            dispBlock
          </div>

        </div>
      )}


    </div>
  );
};

export default Details;
