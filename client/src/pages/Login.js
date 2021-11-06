import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from 'prop-types';
import { BsPerson } from 'react-icons/bs';
import { AiFillLock } from 'react-icons/ai';
import "./Login.css";
import {requests} from '../utils/axios'


export default function Login( {setToken}) {
    async function loginUser(credentials) {
        console.log(credentials);
        setIsLoading(true)
        return requests.post("/user/authenticate", credentials)
        .then(res => res.data.token)
        .catch(res=>{alert("Password or Username wrong!");setIsLoading(false)})
        
    }

    const [isLoading,setIsLoading] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [tokenState,setTokenState] = useState(false);

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser(
            {
                username: email,
                password: password
            }
        );
        if(token)setToken(token);
        if(token)setTokenState(true)
      
        
    }
    if (tokenState) return(window.location.pathname = "/dashboard");
    return (
        <div className="Login">
            <div className="login-wrapper">
                {isLoading?<div className="loading"><label>LOADING</label></div>:""}
            <Form className="actual-form" onSubmit={handleSubmit}>   
            <label className="login-label">Login</label>
            <label className="sub-login-label">Enter your credentials to login</label>
            <Form.Group className="form-gr" controlId="email">
                <BsPerson className="icon1"/>
                <Form.Control
                autoFocus
                className="input-field" 
                placeholder="E-mail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="form-gr"  controlId="password">
                <AiFillLock className="icon1"/>
                <Form.Control
                className="input-field" 
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <div className="bottom-form">
                <a className="forgot-password" href="#">Forgot Password?</a>
            <Button className="submit-button" block size="lg" type="submit" disabled={!validateForm()}>
                Login
            </Button>
            </div>
            </Form>
            </div>
            <div className="ball"></div>
        </div>
        );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}