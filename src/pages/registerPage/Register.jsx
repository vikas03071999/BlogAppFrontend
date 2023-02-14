import React, { useState } from 'react'
import './register.css'
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios'
import { API_BASE_URL } from '../../ApiUrl'

function Register() {
  const[username,setUsername] = useState("")
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  const[err,setErr] = useState(false)
  const[enableRegister,setEnableRegister] = useState(false)
  const instance = axios.create({
    withCredentials:true
  })
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    try{
      const dataObj = {
        username,
        email,
        password
      }
      const registerResponse = await instance.post(API_BASE_URL+`/auth/register`,dataObj)
    }
    catch(error){
      setErr(true)
    }
  }

  const enableDisableRegisterBtn = () => {
    setEnableRegister(username && email && password)
  }
  return (
    <div className='register'>
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleRegister}>
        <label>Username</label>
        <input type="text" placeholder="Enter your username..." className="registerInput" onChange={(e)=> {setUsername(e.target.value);setErr(false);}} onKeyUp={enableDisableRegisterBtn} />
        <label>Email</label>
        <input type="text" placeholder="Enter your email..." className="registerInput" onChange={(e)=> {setEmail(e.target.value);setErr(false);}} onKeyUp={enableDisableRegisterBtn} />
        <label>Password</label>
        <input type="password" placeholder="Enter your password..." className="registerInput" onChange={(e)=> {setPassword(e.target.value);setErr(false);}} onKeyUp={enableDisableRegisterBtn} />
        <button type="submit" className="registerBtn" disabled={!enableRegister}>Register</button>
      </form>
      {
        err && <span>Something went wrong</span>
      }
      <button className="loginRegButton">
        <Link to="/login" className='link'>Login</Link>
      </button>
    </div>
  )
}

export default Register
