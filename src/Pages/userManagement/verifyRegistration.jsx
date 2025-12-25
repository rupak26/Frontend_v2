import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Style/VerifyRegistration.css";

const VerifyRegistration = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const URL = process.env.REACT_APP_API_URL

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${URL}/user/verify/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      console.log("Response Status:", response.status);
      console.log("Response Data:", data);

      if (response.ok) {
        alert(data.msg);
        navigate("/login"); 
      } else {
        alert(`Verification failed: ${data.msg || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to connect to server.");
    }
  };

  return (
    <div className="verify-container">
      <div className="verify-box">
        <h2>Verify Registration</h2>
        <form onSubmit={handleVerify}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit">Verify</button>
        </form>
      </div>
    </div>
  );
};

export default VerifyRegistration;
