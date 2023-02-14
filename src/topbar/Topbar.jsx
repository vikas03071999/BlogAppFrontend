import './topbar.css';
import {Link, useNavigate} from "react-router-dom";
import { useContext } from 'react';
import { Context } from '../Context/Context';
import { Logout } from '../Context/Actions'


function Topbar() {
  // const isUser = true;
  const navigate = useNavigate()
  const {user, dispatch} = useContext(Context)

  // Functions area starts here...
  const handleLogout = (e) => {
    // e.preventDefault()
    dispatch({type:"LOGOUT"})
    navigate("/login")
  }
  console.log(user)
  return (
    <div className='top'>
        <div className="topleft">
            <i className="topIcon fa-brands fa-facebook"></i>
            <i className="topIcon fa-brands fa-twitter"></i>
            <i className="topIcon fa-brands fa-pinterest"></i>
            <i className="topIcon fa-brands fa-instagram"></i>
        </div>
        <div className="topcenter">
          <ul className='toplist'>
            <li className="topListItem">
              <Link to="/" className="link">HOME</Link>
            </li>
            <li className="topListItem">
              <Link to="/" className="link">ABOUT</Link>
            </li>
            <li className="topListItem">
              <Link to="/" className="link">CONTACT</Link>
            </li>
            <li className="topListItem">
              <Link to="/write" className="link">WRITE</Link>
            </li>
            <li className="topListItem" onClick={handleLogout}>
              {/* <Link to="/login" className="link"> */}
                {user && "LOGOUT"}
              {/* </Link> */}
            </li>
          </ul>
        </div>
        <div className="topright">
          {
            user ? (<Link to="/userProfile"><img src={user.displayPicture ? `http://localhost:8000/images/${user?.displayPicture}`:require('./profilePicture.jpg')} alt="" className="topImg" /></Link>):
            (
            <ul className='toplist'>
            <li className="topListItem">
              <Link to="/login" className="link">LOGIN</Link>
            </li>
            <li className="topListItem">
              <Link to="/login" className="link">REGISTER</Link>
            </li>
            </ul>
            )
          }
          
          <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
        </div>
    </div>
  )
}

export default Topbar
