import React, { useState } from "react";
import {requests} from '../utils/axios';

async function registerUser(credentials) {
    console.log(credentials);
    return requests.post("/user/register", credentials)
    .then(res => console.log(res))
}


const Register = () => {
    const [username,setUsername] = useState("")
    const [email, setEmail] = useState("");
    const [firstname,setFirstname] = useState("")
    const [lastname,setLastname] = useState("")
    const [team,setTeam] = useState("")
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [adminPassword,setAdminPassword] = useState("")
    const [isCoach,setIsCoach] = useState(false)
    const handleSubmit = async e => {
        e.preventDefault();
       const token = await registerUser(
            {
                username:email,
                password:password,
                is_coach:isCoach,
                team:team,
                firstName:firstname,
                training:[{date:email}],
                lastName:lastname,
                national_id:username,
                image:" ",
                injury:" ",
                tests:{
                    test1:"0",
                    test2:"0",
                    test3:"0",
                    test4:"0",
                    test5:"0",
                    test6:"0",
                    test7:"0",
                    test8:"0",
                    date:"0",
                    season:"0",
                    nrOfCols:12,
                },
                measurements:{
                    weight:"0",
                    height:"0",
                    fat:"0",
                    date:"0",
                    season2:"0",
                }
            }
        )
    }
    function validateForm() {
        return (email.length > 0 && password.length > 0 && confirmPassword.length > 0 && password==confirmPassword && adminPassword=="0190");
    }

           return (
        <div className="register-container1">
            <div className="register-container2">
                <div className="left-register">
                    <h1 className="welcome">Welcome Back!</h1>
                    <h2 className="here-you">Here you can add a new player</h2>
                    <h4 className="fill-every">Fill every filed with the information<br/>suitable for the player</h4>
                </div>
                <div className="register-form-wrapper">
                    <form className="register-form" onSubmit={validateForm() ? handleSubmit : ""}>
                        <label className="register-form-title">Create Account</label>
                        <input  className="register-input form-icons-username" placeholder="Username" required type="text" onChange={e=> setUsername(e.target.value)}></input>
                        <input className="register-input form-icons-email" placeholder="E-mail" required type="text" onChange={e=> setEmail(e.target.value)}></input>
                        <div className="first-last-fields">
                            <input className="register-input register-row-field " style={{marginLeft:"0"}} placeholder="Firstname" onChange={e=> setFirstname(e.target.value)} required type="text"></input>
                            <input className="register-input register-row-field " placeholder="Lastname" onChange={e=> setLastname(e.target.value)} required type="text" ></input>
                            <select className="register-input register-row-field" placeholder="Team" onChange={e=> setTeam(e.target.value)} required type="text">
                                <option>Team</option>
                                <option>Team A</option>
                                <option>Team B</option>
                                <option>Team C</option>
                            </select>
                        </div>
                        <input className="register-input form-icons-password" placeholder="Password" required type="password" onChange={e=> setPassword(e.target.value)}></input>
                        <input className="register-input form-icons-password" placeholder="Confirm Password" required type="password" onChange={e=> setConfirmPassword(e.target.value)}></input>
                        <input className="register-input admin-password form-icons-admin-password" placeholder="Admin Password" required type="password" onChange={e=> setAdminPassword(e.target.value)}></input>
                        <div className="is_coach"><label>Is the user actually a coach?</label>
                            <input type="checkbox" onChange={e=> setIsCoach(e.target.checked)}></input>
                        </div>
                        <button style={!validateForm()?{background:"grey"}:{}} className="register-submit" disabled={!validateForm()} type="submit">Add Player</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
