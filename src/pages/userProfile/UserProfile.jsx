import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../Context/Context'
import Sidebar from '../../sidebar/Sidebar'
import "./UserProfile.css"
import axios from "axios"
import { API_BASE_URL } from "../../ApiUrl"
import { LoginSuccess } from '../../Context/Actions'

const UserProfile = () => {
    const { user, dispatch } = useContext(Context)
    const [editMode, setEditMode] = useState(false)
    const [editedUsername, setEditedUsername] = useState()
    const [editedEmail, setEditedEmail] = useState()
    const [editedPassword, setEditedPassword] = useState("")
    const [dp, setDp] = useState(null)
    const instance = axios.create({
        withCredentials: true
    })


    useEffect(() => {
        setEditedUsername(user?.username)
        setEditedEmail(user?.email)
    }, [user])

    const handleUserProfileUpdates = async (e) => {
        e.preventDefault()
        let editedDataObj = {}
        if (user.username !== editedUsername) {
            editedDataObj.username = editedUsername
        }
        if (user.email !== editedEmail) {
            editedDataObj.email = editedEmail
        }
        if (editedPassword !== "") {
            editedDataObj.password = editedPassword
        }
        // edited data object is ready, now if a user has changed the profile picture we need to upload
        if (dp) {
            const data = new FormData()
            const fileName = Date.now() + dp.name
            data.append("name", fileName)
            data.append("file", dp)
            editedDataObj.displayPicture = fileName
            try {
                const photoUpload = await instance.post(API_BASE_URL + `/uploadFile`, data)
                console.log("Photo uploaded successfully")
            }
            catch (err) {
                console.log("Error in uploading display photo")
            }
        }

        try{
            console.log(editedDataObj)
            const updatedUser = await instance.put(API_BASE_URL+`/user/${user._id}`,editedDataObj)
            dispatch(LoginSuccess(updatedUser.data))
            // console.log(updatedUser.data)
            window.location.reload()
        }
        catch(err){
            console.log("Error in updating user data")
        }

    }
    return (
        <div className='userProfileContainer'>
            <div className="profileSection">
                <div className="profileCard">
                    {!editMode && <i className="fa-solid fa-user-pen editIcon" onClick={() => setEditMode(!editMode)}></i>}
                    <form className="userProfileForm" onSubmit={handleUserProfileUpdates}>
                        <div className="pictureSection">
                            <img src={dp ? URL.createObjectURL(dp) : user.displayPicture !== "" ? `http://localhost:8000/images/${user.displayPicture}` : require('../../topbar/profilePicture.jpg')} alt="" className='userProfilePicture' />
                            {editMode &&
                                <label htmlFor="profilePic" style={{ fontSize: "20px", cursor: "pointer" }}>Change picture</label>
                            }
                            <input type="file" id="profilePic" style={{ display: 'none' }} onChange={(e) => setDp(e.target.files[0])} />
                        </div>
                        {editMode ?
                            <input className="editInput" type="text"
                                value={editedUsername}
                                onChange={(e) => setEditedUsername(e.target.value)} /> :
                            <input className='editInput' type="text" readOnly value={user?.username} />
                        }
                        {editMode ?
                            <input className="editInput" type="email"
                                value={editedEmail}
                                onChange={(e) => setEditedEmail(e.target.value)} /> :
                            <input className='editInput' type="text" readOnly value={user?.email} />
                        }
                        {editMode ?
                            <input className="editInput" type="password"
                                placeholder='New password here'
                                onChange={(e) => setEditedPassword(e.target.value)} /> :
                            <input className="editInput" type="password" readOnly />
                        }
                        {editMode && <button className='updateProfileBtn'>Update</button>}
                    </form>
                </div>
            </div>
            <Sidebar />
        </div>
    )
}

export default UserProfile
