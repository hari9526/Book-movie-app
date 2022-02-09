import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './LoginForm.css';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const LoginForm = (props) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const onFormSubmitted = (e) => {
        e.preventDefault();
        var basic = require('basic-authorization-header');

        var authorizationToken = basic(userName, password);
        fetch(`${props.baseUrl}/auth/login`, {
            method: 'POST',
            headers: {
                "Accept": "application/json;charset=UTF-8",
                "authorization": authorizationToken, 
            }
        })
            .then((res) => res.json())
            .then(data => { 
                if (data.status == "ACTIVE") {
                    localStorage.setItem('userData', JSON.stringify(data));
                    localStorage.setItem('authorizationToken', authorizationToken);
                }
                else { 
                    console.log(data); 
                }
                debugger; 
            });
    }

    return (
        <div className='login-form'>
            <ValidatorForm onSubmit={onFormSubmitted} autoComplete="off">
                <TextValidator

                    id="user-name"
                    label="Username"
                    value={userName}
                    onChange={(event) => setUserName(event.target.value)}
                    validators={['required']}
                    errorMessages={['Username cannot be empty']}
                    margin="normal"
                />
                <TextValidator
                    id="user-password"
                    label="Password"
                    value={password}
                    type="password"
                    validators={['required']}
                    errorMessages={['Password cannot be empty']}
                    onChange={(event) => setPassword(event.target.value)}
                    margin="normal"
                />

                <Button variant="contained" type='sumit' color="primary" className='login-button'>
                    Login
                </Button>
            </ValidatorForm>

        </div>
    );
};

export default LoginForm;
