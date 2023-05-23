import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

const PWD_REGEX = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{7,}$/

const REGISTER_URL = '/api/register'

export default function RegisterPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('')
  const [validName, setValidName] = useState(false)

  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)

  const [pwdMatch, setPwdMatch] = useState('')
  const [validMatch, setValidMatch] = useState(false)

  const [matchMsg, setMatchMsg] = useState('')

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validMatch) {
      setMatchMsg('passwords do not match')
    }
    else {
      if (validName && validEmail && validPwd && validMatch) {
        
        // try to add to the database
        try {
          const response = await axios.post(REGISTER_URL, 
            JSON.stringify({ username: username, email: email, password: pwd }), 
            {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
            }
          )

          console.log(response.data)
          console.log(JSON.stringify(response))
          console.log('success')
          setSuccess(true)

          // reset inputs
          setUsername('')
          setEmail('')
          setPwd('')
          setPwdMatch('')

          navigate('/login');

        }
        catch (err) {
          
          if (!err?.response) {
            setErrMsg('No Server Response')
          }
          else if (err?.response.status === 409) {
            setErrMsg(err.response.data.message)
          }
          else {
            setErrMsg('Registration Failed')
          }
          console.log(errMsg)
        }

      }
    }


  }

  useEffect(() => {
    setValidName(username.length >= 3)
  }, [username])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email))
  }, [email])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd))
    setValidMatch(pwd === pwdMatch)
    setMatchMsg('')
  }, [pwd, pwdMatch])

  return (
    <div class="main-auth-container">
      <div class="container">
        <div class="title">Registration</div>
        <div class="content">
          <form id="sign-up-form" type="POST" action="/api/register" onSubmit={handleSubmit}>
            <div class="user-details">
              <div class="input-box">
                <span class="details">Username</span>
                <input 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  id="username" 
                  name="username" 
                  type="text" 
                  placeholder="Enter your username" 
                  autocomplete="off" 
                  required
                />
              </div>
              <div class="input-box">
                <span class="details">Email</span>
                <input 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="Enter your email" 
                  autocomplete="off" 
                  required
                />
              </div>
              <div class="input-box">
                <span class="details">Password</span>
                <input 
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  id="password" 
                  name="password" 
                  type="password" 
                  placeholder="Enter your password" 
                  pattern="^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{7,}$" 
                  title="Minimum of 7 characters. Should have at least one special character and one number and one UpperCase Letter." autocomplete="off" 
                  required
                />
              </div>
              <div class="input-box">
                <span class="details">Confirm Password</span>
                <input 
                  value={pwdMatch}
                  onChange={(e) => setPwdMatch(e.target.value)}
                  id="confirm-password" 
                  type="password" 
                  placeholder="Confirm your password" 
                  pattern="^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{7,}$" 
                  title="Minimum of 7 characters. Should have at least one special character and one number and one UpperCase Letter." autocomplete="off" 
                  required
                />
              </div>
            </div>
            <p class="password-message">{matchMsg}</p>
            <div class="button">
              <input type="submit" value="Register" name="register_btn"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}