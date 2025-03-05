
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../Style/Logout.css";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="logout-container">
      <h2>You have been logged out!</h2>
      <p>Thank you for visiting. See you again soon!</p>
      <button onClick={handleLogout}>Go to Login</button>
    </div>
  );
};

export default Logout;
