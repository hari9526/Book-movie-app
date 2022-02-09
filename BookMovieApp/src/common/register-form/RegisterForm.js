import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import './RegisterForm.css'; 


const RegisterForm = (props) => {
    debugger;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); 

    const onFormSubmitted = (e) => {
        e.preventDefault();
        let signupUserRequest = {
            email_address: email,
            first_name: firstName,
            last_name: lastName,
            mobile_number: contactNumber,
            password: password,
        }
        let data = JSON.stringify(signupUserRequest); 
        fetch(`${props.baseUrl}/signup`, {
            body: data,
            method: 'POST',
            headers: {
                "Accept": "application/json", 
                "Content-Type": "application/json;charset=UTF-8",                                
            }
            
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status == "ACTIVE") {
                    setSuccessMessage('Registration Successful. Please Login!'); 
                }
                else
                    setSuccessMessage(data.message)   
            });

    }



    return (
        <div className='login-form'>
            <ValidatorForm onSubmit={onFormSubmitted} autoComplete="off">
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
                    validators={['required']}
                    errorMessages={['Required']}
                    onChange={(event) => setContactNumber(event.target.value)}
                    margin="normal"
                />
                <div className='response-message'>
                    {successMessage}
                </div>
                <Button variant="contained" type='sumit' color="primary" className='login-button'>
                    Register
                </Button>
                
            </ValidatorForm>
            

        </div>
    );
};

export default RegisterForm;
