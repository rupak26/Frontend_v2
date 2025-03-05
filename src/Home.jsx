import { Link } from "react-router-dom";
import "./Style/Home.css";

const Home = () => {
  return (
    <div>
      <section className="home">
        <div className="home-content">
          <div className="left-content">
            <p>Welcome to JOGAJOG . <br/>
            Your platform to connect, share, and grow.</p>
          </div>
        </div>
      </section>

      {/* <section className="features">
        <div className="feature">
          <h2>🚀 Fast & Secure</h2>
          <p>Experience seamless and secure communication with our platform.</p>
        </div>
        <div className="feature">
          <h2>🌎 Global Community</h2>
          <p>Connect with people from around the world in real-time.</p>
        </div>
        <div className="feature">
          <h2>📱 Cross-Platform</h2>
          <p>Access from anywhere, whether on a computer or mobile.</p>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 JOGAJOG. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
