import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './LoginForm.css'; 

const LoginForm = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className='login-form'>
            <TextField
                required
                id="user-name"
                label="Username"
                className={'test'}
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
                margin="normal"
            />
            <br />
            <TextField
                required
                id="user-password"
                label="Password"
                className={'test'}
                value={password}
                type="password"
                onChange={(event) => setPassword(event.target.value)}
                margin="normal"
            />
            <br />

            <Button variant="contained" color="primary" className='login-button'>
                Login
            </Button>

        </div>
    );
};

export default LoginForm;
