import React, { useContext, useEffect, useState } from 'react'
import "./singlePost.css"
import { useLocation } from "react-router"
import axios from "axios"
import { API_BASE_URL } from "../ApiUrl.js"
import { format } from 'timeago.js'
import { Context } from '../Context/Context'
import { useNavigate} from "react-router-dom" 

export default function SinglePost() {
    const location = useLocation()
    const urlParts = location.pathname.split("/")
    const postId = urlParts[urlParts.length - 1]
    const [blog, setBlog] = useState(null)
    const { user } = useContext(Context)
    const [blogWriter, setBlogWriter] = useState(null)
    const [updateMode, setUpdateMode] = useState(false)
    const [editedTitle, setEditedTitle] = useState("")
    const [editedDesc, setEditedDesc] = useState("")
    const navigate = useNavigate()
    const instance = axios.create({
        withCredentials: true
    })

    useEffect(() => {
        const fetchPost = async () => {
            const post = await instance.get(API_BASE_URL + `/post/getPost/${postId}`)
            setBlog(post.data)
            setEditedTitle(post.data.title)
            setEditedDesc(post.data.description)
        }
        fetchPost()
    }, [postId])

    useEffect(() => {
        const getBlogWriter = async () => {
            const blogWriter = await instance.get(API_BASE_URL + `/user/${blog?.userId}`)
            setBlogWriter(blogWriter.data)
        }
        getBlogWriter()
    }, [blog])

    const handleDelete = async() => {
        const res = await instance.delete(API_BASE_URL+`/post/deletePost/${blog?._id}`)
        res.status === 200 && navigate("/")
    }

    const handleBlogUpdate = async() => {
        // e.preventDefault()
        const updatedData = {
            title:editedTitle,
            description:editedDesc
        }
        const updatedPost = await instance.put(API_BASE_URL+`/post/updatePost/${blog?._id}`,updatedData)
        window.location.reload()
    }
    return (
        <div className='singlePost'>
            <div className="wrapper">
                <img src={blog?.photo ? `http://localhost:8000/images/${blog.photo}`:require('../topbar/profilePicture.jpg')} alt="" className="singlePostImg" />
                <div className="singlePostHeading">
                    {
                        updateMode ? <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} className='editTitleInput' autoFocus /> : <span className="singlePostTitle">{blog?.title}</span>
                    }
                    {
                        user?._id === blog?.userId && !updateMode &&
                        <div className="singlePostEdit">
                            <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={() => setUpdateMode(true)}></i>
                            <i className="singlePostIcon fa-solid fa-trash-can" onClick={handleDelete}></i>
                        </div>
                    }
                </div>
                <div className="singlePostInfo">
                    <span className="authorName">Author: <b>{blogWriter?.username}</b></span>
                    <span className="uploadTime">{format(blog?.createdAt)}</span>
                </div>
                {
                    updateMode ? <textarea value={editedDesc} onChange={(e) => setEditedDesc(e.target.value)} className="editBlogDesc" /> : <p className='singlePostDesc'>{blog?.description}</p>
                }
                { updateMode && <button className='updateBlogBtn' onClick={handleBlogUpdate}>Update</button>}
            </div>
        </div>
    )
}
