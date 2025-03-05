import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../Services/authServices"
import "../../Style/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      alert(result.message);
      navigate("/view");
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <h1>Did You Forget Password ?</h1><br />
      <p>
        <button onClick={() => navigate("/reset-password")}>
          Forgot Password?
        </button>
      </p>
    </div>
  );
};

export default Login;

