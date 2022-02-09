import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Details.css';
import Typography from '@material-ui/core/Typography';

const Details = (props) => {
  const [movieDetails, setMovieDetails] = useState({});
  const { id } = useParams();

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
