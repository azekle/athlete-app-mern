import React, { useState } from "react";
import {requests} from '../utils/axios';

async function registerUser(credentials) {
    console.log(credentials);
    return requests.post("/user/register", credentials)
    .then(res => console.log(res))
}


const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();
       const token = await registerUser(
            {
                username:email,
                password:password,
                is_coach:false,
                team:"Junior A",
                firstName:"Smith",
                lastName:"Mark",
                national_id:199,
            }
        )
    }
    function validateForm() {
        return email.length > 0 && password.length > 0 && confirmPassword.length > 0;
    }

           return (
        <div className="Login">
            <form onSubmit={validateForm() ? handleSubmit : ""} class="register-form">
                <label>Email</label>
                <input required type="text" onChange={e=> setEmail(e.target.value)}></input>
                <input required type="text" onChange={e=> setPassword(e.target.value)}></input>
                <input required type="text" onChange={e=> setConfirmPassword(e.target.value)}></input>
                <button disabled={!validateForm()} type="submit">s</button>
            </form>
        </div>
    )
}

export default Register
