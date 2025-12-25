import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Style/ForgetPassword.css"; 
const URL = process.env.REACT_APP_API_URL

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); 
  const navigate = useNavigate();
 

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/user/forget-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log("OTP Response:", data);

      if (response.ok) {
        alert(data.msg);
        setStep(2); // Move to next step
      } else {
        alert(`Error: ${data.msg || "Failed to request OTP"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to connect to server.");
    }
  };

  // Step 2: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL}/user/reset-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, new_password: newPassword }),
      });

      const data = await response.json();
      console.log("Reset Response:", data);

      if (response.ok) {
        alert(data.msg);
        navigate("/login"); // Redirect to login after reset
      } else {
        alert(`Error: ${data.msg || "Password reset failed"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to connect to server.");
    }
  };

  return (
    <div className="forget-password-container">
      <div className="forget-password-box">
        {step === 1 ? (
          <>
            <h2>Forgot Password</h2>
            <form onSubmit={handleRequestOTP}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Request OTP</button>
            </form>
          </>
        ) : (
          <>
            <h2>Reset Password</h2>
            <form onSubmit={handleResetPassword}>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button type="submit">Reset Password</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
