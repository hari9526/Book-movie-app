import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Details.css';
import Typography from '@material-ui/core/Typography';
import YouTube from 'react-youtube';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import StarBorderIcon from "@material-ui/icons/StarBorder";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Header  from '../../common/header/Header';


const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",

    "& > * + *": {
      marginTop: theme.spacing.unit
    }
  },
  emptyStar: {
    color: "white"
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
});



const Details = (props) => {

  const [movieDetails, setMovieDetails] = useState({});
  const { id } = useParams();
  const { classes } = props;

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
      <Header baseUrl={props.baseUrl}/> 
      {Object.keys(movieDetails).length !== 0 && (
        <div className='movie-details-container'>
          <div className='movie-details-left'>

            <Typography variant="subtitle1" gutterBottom className='back-to-home'>
              <Link to={`/`} style={{ textDecoration: 'none' }}>
                &lt; Back to Home
              </Link>

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
              <strong>Plot</strong>: (<a href={movieDetails.wiki_url} target="_blank">Wiki Link</a>) {movieDetails.storyline}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Trailer</strong>:
            </Typography>
            <YouTube videoId={movieDetails.trailer_url.split('=').pop()} opts={opts} onReady={_onReady} />
          </div>
          <div className='movie-details-right'>
            <Typography variant="h6" gutterBottom>
              Rate this movie:
            </Typography>
            {/* <Rating
              name="half-rating-read"
              defaultValue={3.5}
              precision={0.5}
              readOnly
              emptyIcon={
                <StarBorderIcon fontSize="inherit" className={classes.emptyStar} />
              }
            /> */}

            <Typography variant="h6" gutterBottom className='artists-title'>
              Artists:
            </Typography>
            <GridList className={classes.gridList}
              cols={2}
              spacing={8}
              cellHeight={150}
              style={{ height: 'auto' }}>
              {movieDetails.artists.map(tile => (

                <GridListTile key={tile.profile_url} className='released-movie-hover'>
                  <img src={tile.profile_url} alt={tile.first_name + " " + tile.last_name} />
                  <GridListTileBar
                    title={tile.first_name + " " + tile.last_name}

                  />
                </GridListTile>


              ))}
            </GridList>
          </div>
        </div>
      )
      }


    </div >
  );
};


Details.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Details);
