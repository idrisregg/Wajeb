import { useNavigate } from "react-router-dom";
import "./notfound.css";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="notfound-wrapper">
      <div className="notfound-content">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-text">
          Oops! The page you are looking for doesn’t exist.
        </p>
        <button className="notfound-btn" onClick={() => navigate("/")}>
          ← Go Back
        </button>
      </div>
      <div className="notfound-illustration"></div>
    </div>
  );
}

export default NotFoundPage;
