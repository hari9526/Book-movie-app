import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import logo from '../../assets/logo.svg';
import './Header.css';
import { useHistory, useParams } from 'react-router-dom';
import { Modal } from '@material-ui/core';
import LoginModal from '../login-modal/LoginModal';


function Header(props) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isBookShowVisible, setIsBookShowVisible] = useState(false);
  const history = useHistory();


  useEffect(() => {
    
    let isLoggedIn = localStorage.getItem('authorizationToken') == null ? false : true;
    setIsUserLoggedIn(isLoggedIn);
    if (window.location.pathname.includes('movie'))
      setIsBookShowVisible(true)
  }, [window.location.pathname])

  const bookShowEventHandler = () => {         
    history.push(`/bookshow/`);
  }
  

  const loginEventHandler = () => {
    //Open login modal when user clicks on 
    //login button
    setShowLoginModal(true);

  }

  const logoutEventHandler = () => {
  }

  const handleClose = () => {
    setShowLoginModal(false);
  };


  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  return (
    <div>
      <AppBar position="static" className='app-header-styling'>
        <Toolbar className='toolBar-app-header'>
          <img src={logo} className='logo-app-header ' />
          <div className='fill-remaining-space'></div>
          {
            isBookShowVisible && (
              <Button variant='contained' color='primary' onClick={() => bookShowEventHandler()} className='header-button'>
                Book Show
              </Button>
            )
          }

          {
            isUserLoggedIn ? (
              <Button variant="contained" color="default" onClick={() => { logoutEventHandler() }} className='header-button'>
                Logout
              </Button>
            ) : (

              <Button variant="contained" color="default" onClick={() => { loginEventHandler() }} className='header-button'>
                Login
              </Button>

            )
          }

        </Toolbar>
      </AppBar>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        boxshadow={1}
        open={showLoginModal}
        onClose={handleClose}>

        <div style={getModalStyle()} className='login-modal' >

          <LoginModal baseUrl={props.baseUrl} setIsUserLoggedIn={setIsUserLoggedIn} />
        </div>
      </Modal>
    </div>
  );
}

export default Header;
