import Topbar from "./topbar/Topbar";
import Home from './pages/homepage/Home';
import Single from "./pages/single/Single";
import Write from "./pages/writePage/Write";
import Login from "./pages/loginPage/Login";
import Register from "./pages/registerPage/Register";
import {BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import UserProfile from "./pages/userProfile/UserProfile";

function App() {
  return (
    <Router>
      <Topbar />
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route path="/write" element={<Write />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/post/:id" element={<Single />}/>
        <Route path="/userProfile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
