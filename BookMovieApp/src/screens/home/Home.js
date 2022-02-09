import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import './Home.css';
import { makeStyles } from '@material-ui/core/styles';


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
});



const Home = (props) => {
  const { classes } = props;

  const [upComingMoviesList, setUpcomingMoviesList] = useState([]);
  const [releasedMoviesList, setReleasedMoviesList] = useState([]);

  useEffect(() => {

    getUpcomingMoviesList();
    getReleasedMoviesList();
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
        let formmattedResponse = data.movies.map(({ poster_url, title, release_date }) => {
          return {
            img: poster_url,
            title: title,
            releasedDate: formatDates(release_date),
          }
        });
        setReleasedMoviesList(formmattedResponse);
      }
    }
    catch (e) {
      console.log(e);
    }

  }

  function formatDates(dateValue) {
    const parts = dateValue.split('-');
    const dateString = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    }).format(Date.UTC(...parts)).replace(/,/g, '');
    return (dateString);
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
            spacing = {32}
            cellHeight={350}
            style={{ height: 'auto' }}>
            {releasedMoviesList.map(tile => (
              <GridListTile key={tile.img} className='released-movie-hover'>
                <img src={tile.img} alt={tile.title} />
                <GridListTileBar
                  title={tile.title}
                  subtitle={<span>Release Date:{tile.releasedDate}</span>}
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
        <div className='movie-filter'>

        </div>

      </div>

    </div>
  );
};
Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);

