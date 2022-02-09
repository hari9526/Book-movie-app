import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import './Home.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import FindMoviesForm from './FindMoviesForm';
import { Link } from 'react-router-dom';



const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridListRow: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  card: {
    minWidth: 240,
    maxWidth: 240,
    marginLeft: 'auto',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
});



const Home = (props) => {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;

  const [upComingMoviesList, setUpcomingMoviesList] = useState([]);
  const [releasedMoviesList, setReleasedMoviesList] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [artistsList, setArtistsList] = useState([]);

  useEffect(() => {

    getUpcomingMoviesList();
    getReleasedMoviesList();
    getGenresList();
    getArtistsList();
  }, []);

  async function getUpcomingMoviesList() {
    try {
      const rawResponse = await fetch(`${props.baseUrl}/movies?page=1&status=PUBLISHED`);
      const data = await rawResponse.json();

      if (rawResponse.ok) {
        let formmattedResponse = data.movies.map(({ poster_url, title }) => {
          return {
            img: poster_url,
            title: title,
          }
        });
        setUpcomingMoviesList(formmattedResponse);
      }
    }
    catch (e) {
      console.log(e);
    }

  }

  async function getReleasedMoviesList() {
    try {
      const rawResponse = await fetch(`${props.baseUrl}/movies?page=1&status=RELEASED`);
      const data = await rawResponse.json();

      if (rawResponse.ok) {
        let formmattedResponse = data.movies.map(({ id, poster_url, title, release_date }) => {
          return {
            id: id,
            img: poster_url,
            title: title,
            releasedDate: new Date(release_date).toDateString(),
          }
        });
        setReleasedMoviesList(formmattedResponse);
      }
    }
    catch (e) {
      console.log(e);
    }

  }

  async function getGenresList() {
    try {
      const rawResponse = await fetch(`${props.baseUrl}/genres`);
      const data = await rawResponse.json();

      if (rawResponse.ok) {
        let formmattedResponse = data.genres.map(({ genre }) => genre);
        setGenresList(formmattedResponse);
      }
    }
    catch (e) {
      console.log(e);
    }

  }

  async function getArtistsList() {
    try {
      const rawResponse = await fetch(`${props.baseUrl}/artists`);
      const data = await rawResponse.json();

      if (rawResponse.ok) {
        let formmattedResponse = data.artists.map(({ first_name, last_name }) => first_name + last_name);
        setArtistsList(formmattedResponse);
      }
    }
    catch (e) {
      console.log(e);
    }

  }

  return (
    <div>
      <div className='home-page-header'>
        Upcoming Movies
      </div>

      <div className={classes.root}>
        <GridList className={classes.gridListRow} cols={6} cellHeight={250}>
          {upComingMoviesList.map(tile => (
            <GridListTile key={tile.img}>
              <img src={tile.img} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>

      <div className='released-movies-container'>
        <div className='released-movies'>
          <GridList className={classes.gridList}
            cols={4}
            spacing={32}
            cellHeight={350}
            style={{ height: 'auto' }}>
            {releasedMoviesList.map(tile => (

              <GridListTile key={tile.img} className='released-movie-hover'>
                <Link to={`/movie/${tile.id}`}>
                  <img src={tile.img} alt={tile.title} />
                  <GridListTileBar
                    title={tile.title}
                    subtitle={<span>Release Date:{tile.releasedDate}</span>}
                  />

                </Link>

              </GridListTile>


            ))}
          </GridList>
        </div>
        <div className='movie-filter'>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                FIND MOVIES BY:
              </Typography>
              <FindMoviesForm
                genresList={genresList}
                artistsList={artistsList}
                baseUrl={props.baseUrl}
                setReleasedMoviesList={setReleasedMoviesList} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);

