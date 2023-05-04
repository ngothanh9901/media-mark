import { useState } from "react";
import { useNavigate } from "react-router-dom";

async function register(credentials) {
    const url = "http://localhost:8080/api/user";
      return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
		},
        body: JSON.stringify({
            "email": credentials.email,
            "name": credentials.name,
            "password": credentials.password,
            "roleId": [
              2
            ],
            "username": credentials.username
        })
      })
}

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

export default function Register(){
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [name,setName] = useState();
    const [email,setEmail] = useState();

    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        await register({
            email:email,
            name: name,
            password:password,
            username:username
        })


        const token = await loginUser({
            username,
            password
        });
        window.sessionStorage.setItem('accesstoken', token.access_token);
        window.sessionStorage.setItem('refreshtoken', token.refresh_token);
        window.sessionStorage.setItem('name',token)
        window.sessionStorage.setItem('isLogin',true);
        console.log(token);
        navigate('/shop');
       
    }

    return(
        <div  className="login-container">

            <form onSubmit={handleSubmit}>
                <div className="container">
                    <h1>Register</h1>
                    <p>Please fill in this form to create an account.</p>
                    <hr/>

                    <label for="name"><b>Name</b></label>
                    <input type="text" placeholder="Enter name" name="name" id="name"  onChange={e => setName(e.target.value)} required></input>

                    <label for="email"><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" name="email" id="email" onChange={e => setEmail(e.target.value)} required></input>

                    <label for="email"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="username" id="username" onChange={e => setUserName(e.target.value)} required></input>

                    <label for="password"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" id="password" onChange={e => setPassword(e.target.value)} required/>

                    <hr/>

                    <button type="submit" className="registerbtn" >Register</button>
                </div>
            </form>
        </div>
    );
}