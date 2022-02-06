import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import logo from '../../assets/logo.svg';
import './Header.css';


function Header() {
  return (
    <div>
      <AppBar position="static" className='app-header-styling'>
        <Toolbar className='toolBar-app-header'>
          <img src={logo} className='logo-app-header ' />
          <div className='fill-remaining-space'></div>
          <Button variant="contained" color="default" className='login-button'>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
