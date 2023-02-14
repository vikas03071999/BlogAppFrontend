import React, { useContext } from 'react'
import { Context } from '../Context/Context'
import './sidebar.css'

export default function Sidebar() {
  const {user} = useContext(Context)

  return (
    <div className='sidebar'>
      <div className="sidebarItem">
        <span className="sidebarTitle">
            ABOUT ME
        </span>
        <img 
        src={user?.displayPicture? `http://localhost:8000/images/${user.displayPicture}`:`http://localhost:8000/images/NOIMAGE.png`} 
        alt=""
         />
        <p className="sidebarDesc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Corrupti officia iure.
        </p>     
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">
            CATEGORIES
        </span>
        <ul className="sidebarList">
            <li className="sidebarListItem">React</li>
            <li className="sidebarListItem">Node</li>
            <li className="sidebarListItem">Express</li>
            <li className="sidebarListItem">Mongoose</li>
            <li className="sidebarListItem">MongoDB</li>
            <li className="sidebarListItem">Data structures</li>
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">
            FOLLOW US
        </span>
        <div className="sidebarIcons">
            <i className="sidebarIcon fa-brands fa-facebook"></i>
            <i className="sidebarIcon fa-brands fa-twitter"></i>
            <i className="sidebarIcon fa-brands fa-pinterest"></i>
            <i className="sidebarIcon fa-brands fa-instagram"></i>
        </div>
      </div>
      
    </div>
  )
}
