// Removed "use client"; directive completely to fit standard SPA configurations safely
import { Link } from "react-router-dom";
import DotPattern from "../components/DotPattern";

const Home = () => (
  <DotPattern>
    <div className="container text-center py-5 d-flex flex-column align-items-center gap-3">
      <div>
        <h1 className="fw-bold text-light display-1">
          Learn Anything <br />
          <span className="text-warning">Instantly...</span>
        </h1>
      </div>
      <div className="w-75">
        <p className="lead text-light opacity-75">
          EduCourse AI transforms any topic into a structured course with 
          <span className="text-warning fw-bold"> theory, videos, and quizzes </span> 
          in seconds—all for free.
        </p>
      </div>
      <div className="d-flex flex-column align-items-center gap-3">        
        <Link 
          to="/generate" 
          className="btn btn-warning btn-lg px-4 py-3 fw-bold rounded-4"
        >
          Start Creating Content for Free ...
        </Link>
        <Link 
          to="/plans" 
          className="btn btn-outline-warning btn-lg px-3 py-3 fw-bold rounded-4"
        >
          ⚡ See Our Plans
        </Link>
      </div>
    </div>
  </DotPattern>
);

export default Home;