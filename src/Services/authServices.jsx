export const login = async (email, password) => {
    try {
      const URL = process.env.REACT_APP_API_URL
      const response = await fetch(`${URL}/user/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem("token", data.token.access); 
        return { success: true, message: "Login successful!" };
      } else {
        return { success: false, message: data.detail || "Login failed" };
      }
    } catch (error) {
      return { success: false, message: "Server error. Please try again." };
    }
  };
  
  export const getToken = () => {
    return localStorage.getItem("token");
  };
  
  export const logout = () => {
    localStorage.removeItem("token");
  };
  