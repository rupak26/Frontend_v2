import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Style/Register.css" ;

const Register = () => {
  const [username , setUsername] =  useState("");  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 
 

  const handleRegister = async (e) => {
      e.preventDefault();

      const requestData = JSON.stringify({ 
        username : username,
        email: email, 
        password: password 
      });
     try{ 
        const response = await fetch(`http://3.239.105.239:8000/user/register/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: requestData,
        });
    
        const data = await response.json();
        
        if (response.ok) {
          alert("Registration successful! Please Verify Your Account.");
          navigate("/verfy");
        } else {
          alert(`Registration failed: ${data.message || "Unknown error"}`);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to connect to server.");
    }
  };
  return (
    <div className="register-container">
      <h2>Register</h2>
      <form id="Register" onSubmit={handleRegister}>
        <input 
            type="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required />
        <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required />
        <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
