import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const NavigationBar = () => {
  return (
    <nav class="navbar navbar-expand-lg bg-dark sticky-top shadow">
      <div class="container">
        <Link to="/" class="navbar-brand text-light fw-bold fs-4">
          <span class="text-warning">Edu</span>Forge AI
        </Link>
        
        {/* Mobile toggle button */}
        <button class="navbar-toggler" type="button" data-bs-theme="dark" data-bs-toggle="collapse" data-bs-target="#eduNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="eduNavbar">
          <div class="navbar-nav ms-auto align-items-center gap-3">
            <Link to="/dashboard" class="nav-link text-light">
              My Courses
            </Link>

            <Link to="/plans"  class="nav-link text-light">
               Plans
            </Link>

            <Link to="/generate">
              <button class="custom-btn px-3 py-2 rounded-3 fw-bold border-0">
                Create Course
              </button>
            </Link>

            <Link to="/login" class="nav-link text-light">
              <FaUserCircle size={25} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;