import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom'

import "../../styles/authpages.css";

import axios from 'axios';
const LOGIN_URL = '/api/login';

export default function LoginPage() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')

  const [errMsg, setErrMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL, 
        JSON.stringify({identifier, password}), 
        {
          headers: { 'Content-Type': 'application/json' }, 
          withCredentials: true
        }
      );
      console.log(response.data);
      setAuth( response.data );
      navigate(from, { replace: true });
    }
    catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response")
      }
      else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password')
      }
      else if (err.response?.status === 401) {
        setErrMsg('Unauthorized')
      }
      else {
        setErrMsg('Login Failed')
      }
    }


    setIdentifier('');
    setPassword('');

    console.log('submitted')
  }

  return (
    <div class="container">
      <div class="title">Login</div>
      <div class="content">
        <form class="login-form" id="login-form" method="POST" action="/api/login" onSubmit={handleSubmit}>
          <div class="login-details user-details">
            <div class="login-input input-box">
              <span class="details">Username or Email</span>
              <input 
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                id="identifier" 
                name="identifier" 
                type="text" 
                placeholder="Enter your username or email" 
                required
              />
            </div>
            <div class="login-input input-box">
              <span class="details">Password</span>
              <input 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password" 
                type="password" 
                placeholder="Enter your password" 
                name="password" 
                required
              />
            </div>
          </div>
          <div class="button">
            <input type="submit" name="login_btn" value="Login"/>
          </div>
        </form>
      </div>
    </div>
  )
}