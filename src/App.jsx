import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/userManagement/Login.jsx";
import Logout from "./Pages/userManagement/Logout.jsx";
import Register from './Pages/userManagement/Register.jsx';
import VerifyRegistration from './Pages/userManagement/verifyRegistration.jsx';
import ForgetPassword from './Pages/userManagement/ResetPassword.jsx';
import Navbar from "./Navbar.jsx";
import Home from "./Home.jsx";
import BlogFeed from './Pages/contentManagement/AllBlogPost.jsx'; 
import BlogFeedViaUser from './components/Post_card.jsx';

function App() {
  return (
    <>
      <Router>
       <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verfy" element={<VerifyRegistration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/view" element={<BlogFeed />} />
          <Route path='/reset-password' element={<ForgetPassword />} />
          <Route path='/post' element={<BlogFeed/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
