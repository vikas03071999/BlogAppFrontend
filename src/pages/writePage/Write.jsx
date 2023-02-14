import React, { useContext, useState } from 'react'
import './write.css'
import { Context } from '../../Context/Context'
import Login from '../loginPage/Login'
import axios from "axios"
import { API_BASE_URL } from '../../ApiUrl'
import { useNavigate } from 'react-router-dom'


export default function Write() {
  const {user} = useContext(Context)
  const [blogTitle,setBlogTitle] = useState("")
  const [blogDesc,setBlogDesc] = useState("")
  const [blogImg,setBlogImg] = useState(null)
  const [blogTags,setBlogTags] = useState("")
  const navigate = useNavigate()

  const instance = axios.create({
    withCredentials: true
  })
  // Function area
  const handleBlogSubmission = async(e) => {
    e.preventDefault()
    const blogData = {
      userId:user._id,
      title:blogTitle,
      description: blogDesc,
      categories: blogTags !== "" ? blogTags.split(",") : []
    }
    if(blogImg){
      const data = new FormData()
      const fileName = Date.now() + blogImg.name
      data.append("name",fileName)
      data.append("file",blogImg)
      blogData.photo = fileName
      try{
        const photoUpload = await instance.post(API_BASE_URL+`/uploadFile`,data)
        console.log("Photo uploaded successfully")
      }
      catch(err){
        console.log("Error in uploading blog photo")
      }
    }
    try{
      const blogRes = await instance.post(API_BASE_URL+`/post/newPost`,blogData)
      console.log(blogRes.data)
      navigate("/")
    }
    catch(err){
      console.log("Error in uploading blog")
    }
  } 
  return (
    <>
    {
      user ? <div className='write'>
        {
          blogImg && 
          <img src={URL.createObjectURL(blogImg)} alt="" className="writeImg" />
        }
      <form className="writeForm" onSubmit={handleBlogSubmission}>
        <div className="writeFormGroup">
            <label htmlFor='addFile'>
                <i className="addFileIcon fa-solid fa-plus"></i>
            </label>
            <input type="file" className="addFile" id='addFile' onChange={(e) => setBlogImg(e.target.files[0])} />
            <input type="text" placeholder="Title..." className="writeInput title" autoFocus={true} onChange={(e)=>setBlogTitle(e.target.value)}/>
            
        </div>
        <input type="text" id='tags' className='tagsInput' placeholder="Enter tags separated by comma" onChange={(e)=>setBlogTags(e.target.value)}/>
        <div className="writeFormGroup">
            <textarea className="writeInput desc" placeholder='Write your blog here...' onChange={(e) => setBlogDesc(e.target.value)}></textarea>
        </div>
        <button className="writeSubmit">Publish</button>
      </form>
    </div> : <Login />
    }
    </>
  )
}
