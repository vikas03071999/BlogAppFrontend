import './home.css';
import Header from '../../header/Header';
import Posts from '../../posts/Posts';
import Sidebar from '../../sidebar/Sidebar';
import Cookies from 'universal-cookie';
import { useContext, useEffect } from 'react';
import { Context } from '../../Context/Context';
import { LoginFailure, LoginStart, LoginSuccess } from '../../Context/Actions';
import axios from 'axios';
import { API_BASE_URL } from '../../ApiUrl';



function Home() {
  const cookies = new Cookies();
  console.log(cookies.get("access_token"))
  const {user,dispatch} = useContext(Context)
  const instance = axios.create({
    withCredentials:true
  })

  useEffect(()=>{
    const loginUserAgainForAccessToken = async() => {
      if(user && !cookies.get('access_token')){
        dispatch(LoginStart)
        try{
          const userDetails = {
            email:user.email,
            password: user.password
          }
          const res = await instance.post(API_BASE_URL+`/auth/login`,userDetails)
          dispatch(LoginSuccess(res.data))
        }catch(err){
          console.log(err.response)
          dispatch(LoginFailure)
        }
      }
    }
    loginUserAgainForAccessToken()
  },[])
  
  return (
    <>
      <Header />
      <div className='home'>
        <Posts />
        <Sidebar />
      </div>
    </>
  )
}

export default Home
