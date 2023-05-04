import React, { useState } from 'react';
import "./Login.css";
import { useNavigate } from "react-router-dom";
import {createContext, useContext } from "react";
import { UserContext } from '../../context/Context';
import { GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
const clientId = "807135373271-ttv2agmers5u7idbgctfjogj1gggshf4.apps.googleusercontent.com"

async function loginUser(credentials) {
    let formData = new FormData();
    formData.append("username", credentials.username);
    formData.append('password', credentials.password);

    return fetch('http://localhost:8080/api/login', {
      method: 'POST',
      body: formData
    })
    .then(data => data.json())
}

const onSuccess = (res) => {
    var obj = jwt_decode(res.credential);
    var data = JSON.stringify(obj);
    console.log(data);
}
const onFailure = (res) => {
    console.log("Login google failure",res);
}
export default function Login(){
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const [name,setName]= useContext(UserContext);

    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        window.sessionStorage.setItem('accesstoken', token.access_token);
        window.sessionStorage.setItem('refreshtoken', token.refresh_token);
        window.sessionStorage.setItem('isLogin',true);
        console.log(token);


        let accesstoken = window.sessionStorage.getItem("accesstoken");
        let data = JSON.parse(atob(accesstoken.split('.')[1])).sub;
        let n = data.split(',')[1];

        setName(n);

        navigate('/shop');
    }

    

    return(
        <div  className="login-container">

            <form onSubmit={handleSubmit}>
                <div className="imgcontainer">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXpyl9XyBbun_MqGSVEXips0DXfuLNzKKQ7A&usqp=CAU" alt="Avatar" className="avatar"/>
                </div>
  
                <div className="container">

                    <label for="uname"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="uname" onChange={e => setUserName(e.target.value)} required/>

                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" onChange={e => setPassword(e.target.value)} required/>

                    <button type="submit">Login</button>
                    <GoogleOAuthProvider clientId={clientId}>
                        <GoogleLogin
                            buttonText="Google"
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn = {true}
                        />
                    </GoogleOAuthProvider>
                   
                </div>
            </form>
    
        </div>
    );
}