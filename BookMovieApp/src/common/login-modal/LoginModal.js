import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Header from '../header/Header';
import RegisterForm from '../register-form/RegisterForm';
import LoginForm from '../login-form/LoginForm';
import './LoginModal.css'; 


const LoginModal = (props) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, value) => {
        setValue(value);
    }

    function LinkTab(props) {
        return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
    }

    return (
        <div>
            <Tabs variant="fullWidth" value={value} onChange={(event, value) => handleChange(event, value)} className='login-model-tab'>
                <LinkTab label="Login" href="login" />
                <LinkTab label="Register" href="register" />
            </Tabs>
            {value === 0 && <LoginForm baseUrl={props.baseUrl} setIsUserLoggedIn={ props.setIsUserLoggedIn}/>}
            {value === 1 && <RegisterForm baseUrl={ props.baseUrl}/>}
        </div>
    );
};

export default LoginModal;
