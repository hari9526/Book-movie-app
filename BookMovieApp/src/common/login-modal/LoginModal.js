import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Header from '../header/Header';
import RegisterForm from '../register-form/RegisterForm';
import LoginForm from '../login-form/LoginForm';


const LoginModal = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, value) => {
        setValue(value);
    }

    function LinkTab(props) {
        return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
    }

    return (
        <div>
            {/* <Typography variant="h6" id="modal-title">
                Text in a modal
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}
            <Tabs variant="fullWidth" value={value} onChange={(event, value) => handleChange(event, value)}>
                <LinkTab label="Login" href="login" />
                <LinkTab label="Register" href="register" />
            </Tabs>
            {value === 0 && <LoginForm />}
            {value === 1 && <RegisterForm />}
        </div>
    );
};

export default LoginModal;
