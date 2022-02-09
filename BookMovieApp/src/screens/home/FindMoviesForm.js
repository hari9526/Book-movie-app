import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm } from 'react-material-ui-form-validator';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import './Home.css'; 


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        margin: theme.spacing.unit
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: '100%',
        maxWidth: '100%',
    },
});

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;


// const MenuProps = {
//     PaperProps: {
//       style: {
//         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//         width: 250,
//       },
//     },
// };

const name = ['Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',];

const FindMoviesForm = (props) => {

    const { classes } = props;

    const [movieName, setMovieName] = useState('');
    const [genres, setGenres] = useState([]
    );


    const [artists, setArtists] = useState([]);
    const [releaseDate, setReleaseDate] = useState('');
    const [releaseDateEnd, setReleaseDateEnd] = useState('');

    const onFormSubmitted = (e) => {
        e.preventDefault();

        const queryParams = { title: movieName, start_date: releaseDate, end_date: releaseDateEnd };
        const queryString = `${props.baseUrl}/movies?${new URLSearchParams(queryParams).toString()}`;      
        let apiResponse = []
        fetch(queryString)
            .then((res) => res.json())
            .then((data) => {
                apiResponse = data.movies;
                //To implement: 
                //Filtering based on genres and artists                                 
                let filteredResponse = apiResponse.map(({ poster_url, title }) => {
                    return {
                        img: poster_url,
                        title: title,
                    }
                });
                props.setReleasedMoviesList(filteredResponse);
            })        
        props.setReleasedMoviesList([]);
    }



    return (
        <div>
            <form onSubmit={onFormSubmitted} className={classes.container} noValidate>
                <TextField

                    id="movie-name"
                    label="Movie Name"
                    value={movieName}
                    onChange={(event) => setMovieName(event.target.value)}
                    margin="normal"
                    className={classes.textField}
                />
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="select-genres-checkbox" className={classes.textField}>Genres</InputLabel>
                    <Select
                        multiple
                        value={genres}
                        className={classes.textField}
                        onChange={(event) => setGenres(event.target.value)}
                        input={<Input id="select-genres-checkbox" />}
                        renderValue={selected => selected.join(', ')}

                    >
                        {props.genresList.map(name => (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={genres.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="select-artists-checkbox" className={classes.textField}>Artists</InputLabel>
                    <Select
                        multiple
                        value={artists}
                        className={classes.textField}
                        onChange={(event) => setArtists(event.target.value)}
                        input={<Input id="select-artists-checkbox" />}
                        renderValue={selected => selected.join(', ')}

                    >
                        {props.artistsList.map(name => (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={artists.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    id="release-date-start"
                    className={classes.textField}
                    label="Release Date Start"
                    defaultValue="dd-mm-yyyy"
                    onChange={(event) => setReleaseDate(event.target.value)}
                    type="date"
                    onChange={(event) => setReleaseDate(event.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}

                />
                <TextField
                    id="release-date-end"
                    className={classes.textField}
                    label="Release Date End"
                    defaultValue="dd-mm-yyyy"
                    onChange={(event) => setReleaseDateEnd(event.target.value)}
                    type="date"
                    onChange={(event) => setReleaseDateEnd(event.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                />
                <Button variant="contained" type='sumit' color="primary" className='apply-filter'>
                    APPLY
                </Button>
            </form>
        </div>
    );
};

FindMoviesForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FindMoviesForm);


