import { Link } from "react-router-dom";
import "./Style/Navbar.css"; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="logo"><Link to="/">Home</Link></h1>
        <ul className="nav-links">
          <li><Link to="/login">SignIn</Link></li>
          <li><Link to="/register">SignUp</Link></li>
          <li><Link to="/logout">Signout</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
