import React, { useState } from "react";
import { axiosWithAuth } from "../axiosWithAuth";

const Login = (props) => {
  const [credentials, setCredentials] = useState({});
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const login = e => {
    e.preventDefault(); 
    axiosWithAuth().post('/api/login', credentials)
    .then(res => {
        localStorage.setItem('token', res.data.payload);
        props.history.push('./protected');
    })
}

const handleChange = e => {
  setCredentials({...credentials, [e.target.name]: e.target.value,
  });
}
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div>
            <form className = "login" onSubmit = {login}>
                <input 
                type="text"
                name="username"
                placeholder="name"
                value = {credentials.username}
                onChange ={handleChange}
                />
                <input 
                type ="password"
                name ="password"
                placeholder="password"
                value ={credentials.password}
                onChange={handleChange}
                />
                <button>Log In</button>
            </form>
        </div>
    {/* )
} */}
    </>
  );
};

export default Login;
