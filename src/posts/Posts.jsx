import React from 'react';
import './posts.css';
import Post from '../post/Post.jsx';
import { useEffect, useState } from 'react';
import axios from "axios"
import { API_BASE_URL } from '../ApiUrl.js'


export default function Posts() {
  const[blogs,setBlogs] = useState([])
  const instance = axios.create({
    withCredentials:true
  })
  useEffect(()=>{
    const fetchBlogs = async() => {
      const blogsRes = await instance.get(API_BASE_URL+`/post/getAllPosts`)
      setBlogs(blogsRes.data)
    }
    fetchBlogs()
  },[])
  return (
    <div className='posts'>
      {
        blogs && blogs.map(blog => {
          return (
            <Post key={blog._id} blog={blog} />
          )
        })
      }
      {/* <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post /> */}
    </div>
  )
}
