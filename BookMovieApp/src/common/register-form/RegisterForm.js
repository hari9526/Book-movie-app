import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


const RegisterForm = () => {
    const [userName, setUserName] = useState('');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [contactNumber, setContactNumber] = useState(0);

    const onFormSubmitted = (e) => {
        e.preventDefault();
        debugger; 
    }

    return (
        <div className='login-form'>
            <ValidatorForm  onSubmit={onFormSubmitted} autoComplete="off">
                <TextValidator
                   
                    id="first-name"
                    label="First Name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    validators={['required']}
                    errorMessages={['Required']}
                    margin="normal"
                />
                <TextValidator
                   
                    id="last-name"
                    label="Last Name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    validators={['required']}
                    errorMessages={['Required']}
                    margin="normal"
                />
                <TextValidator
                   
                    id="email"
                    label="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    validators={['required']}
                    errorMessages={['Required']}
                    margin="normal"
                />
                <TextValidator
                    id="user-password"
                    label="Password"
                    value={password}
                    type="password"
                    validators={['required']}
                    errorMessages={['Required']}
                    onChange={(event) => setPassword(event.target.value)}
                    margin="normal"
                />
                <TextValidator
                    id="contact-number"
                    label="Contact No"
                    value={contactNumber}
                    type="password"
                    validators={['required']}
                    errorMessages={['Required']}
                    onChange={(event) => setContactNumber(event.target.value)}
                    margin="normal"
                />

                <Button variant="contained" type='sumit' color="primary" className='login-button'>
                    Register
                </Button>
            </ValidatorForm>

        </div>
    );
};

export default RegisterForm;
