import React, { useContext, useState } from 'react'
import './login.css'
import {Link} from "react-router-dom"
import axios from "axios"
import { API_BASE_URL } from '../../ApiUrl.js'
import { Context } from '../../Context/Context'
import { LoginStart, LoginSuccess, LoginFailure } from "../../Context/Actions"
import { useNavigate } from 'react-router-dom'

function Login() {
  const[err,setErr] = useState(false)
  const[enableLoginBtn,setEnableLoginBtn] = useState(false)
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  const { dispatch, user } = useContext(Context)
  const navigate = useNavigate()

  const instance = axios.create({
    withCredentials:true
  })


  const enableDisableLoginBtn = () => {
    setEnableLoginBtn(email && password)
  }

  const handleLogin = async(e) => {
    e.preventDefault()
    dispatch(LoginStart)
    try{
      const dataObj = {
        email,
        password
      }
      const userRes = await instance.post(API_BASE_URL+`/auth/login`,dataObj)
      dispatch(LoginSuccess(userRes.data))
      navigate("/")
      // console.log(userRes.data)
    }
    catch(error){
      dispatch(LoginFailure)
      setErr(true)
    }
  }
  console.log(user)
  return (
    <div className='login'>
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleLogin}>
        <label>Email</label>
        <input type="text" placeholder="Enter your email..." className="loginInput" onChange={(e)=>setEmail(e.target.value)}  onKeyUp={enableDisableLoginBtn}/>
        <label>Password</label>
        <input type="password" placeholder="Enter your password..." className="loginInput" onChange={(e)=>setPassword(e.target.value)} onKeyUp={enableDisableLoginBtn}/>
        <button className="loginButton" disabled={!enableLoginBtn}>Login</button>
      </form>
      <button className="registerButton">
        <Link to="/register" className='link'>REGISTER</Link>
      </button>
    </div>
  )
}

export default Login
