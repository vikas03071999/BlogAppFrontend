import React from 'react'
import "./post.css"
import { format } from "timeago.js"
import { Link, useNavigate } from "react-router-dom"

export default function Post({blog}) {
  const photoURL = blog.photo !== "" ? `http://localhost:8000/images/${blog.photo}` : require("../topbar/profilePicture.jpg")
  const navigate = useNavigate()
 
  const handleClick = (blogId) => {
    // navigate("/post/"+blogId)
  }
  return (
    <div className='post'>
      <img src={photoURL} alt="" className="postImg" />
      <div className="postInfo">
        <div className="postCats">
            {
              blog && blog.categories.map(cat => (
                <span className="postCat">{cat}</span>
              ))
            }
            {/* <span className="postCat">Life</span> */}
        </div>
        <Link to={`/post/${blog?._id}`} style={{textDecoration:"none"}}>
        <span className="postTitle">{ blog?.title}</span>
        </Link>
        <span className="postDate">{ blog && format(blog.createdAt) }</span>
      </div>
      <p className="postDesc">{blog?.description}</p>
    </div>
  )
}
