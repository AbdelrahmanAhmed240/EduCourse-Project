"use client";
import { useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import DotPattern from "../components/DotPattern";

const Home = () => (
  <DotPattern>
    <div class="container text-center py-5 d-flex flex-column align-items-center gap-3">
      <div>
        <h1 class="fw-bold text-light display-1">
          Learn Anything <br />
          <span class="text-warning">Instantly...</span>
        </h1>
      </div>
      <div class="w-75">
        <p class="lead text-light opacity-75">
          EduForge AI transforms any topic into a structured course with 
          <span class="text-warning fw-bold"> theory, videos, and quizzes </span> 
          in seconds—all for free.
        </p>
      </div>
      <div class="d-flex flex-column align-items-center gap-3">        
        <Link 
          to="/generate" 
          class="btn btn-warning btn-lg px-4 py-3 fw-bold rounded-4"
        >
          Start Creating Content for Free ...
        </Link>
        <Link 
          to="/plans" 
          class="btn btn-outline-warning btn-lg px-3 py-3 fw-bold rounded-4"
        >
          ⚡ See Our Plans
        </Link>
      </div>

    </div>
  </DotPattern>
);

export default Home;