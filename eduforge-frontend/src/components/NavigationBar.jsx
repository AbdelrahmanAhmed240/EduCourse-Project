import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useCourse } from '../context/CourseContext';

const NavigationBar = () => {
  const navigate = useNavigate();
  const { clearCourse } = useCourse();
  
  // 1. Get user data from localStorage
  const user = JSON.parse(localStorage.getItem('profile'));

  // 2. Logout handler
  const handleLogout = () => {
    clearCourse();
    localStorage.removeItem('profile');
    navigate('/login');
    window.location.reload(); 
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark sticky-top shadow">
      <div className="container">
        <Link to="/" className="navbar-brand text-light fw-bold fs-4">
          <span className="text-warning">Edu</span>Forge AI
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-theme="dark" data-bs-toggle="collapse" data-bs-target="#eduNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="eduNavbar">
          <div className="navbar-nav ms-auto align-items-center gap-3">
            <Link to="/dashboard" className="nav-link text-light">
              My Courses
            </Link>

            <Link to="/plans" className="nav-link text-light">
               Plans
            </Link>

            <Link to="/generate">
              <button className="custom-btn px-3 py-2 rounded-3 fw-bold border-0">
                Create Course
              </button>
            </Link>

            {/* 3. DYNAMIC PROFILE SECTION */}
            {user ? (
              <div className="nav-item dropdown">
                <a 
                  className="nav-link text-warning dropdown-toggle d-flex align-items-center gap-2" 
                  href="#" 
                  role="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  <FaUserCircle size={25} />
                  <span className="small">{user.result.name.split(' ')[0]}</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end">
                  <li><Link className="dropdown-item" to="/profile">My Profile</Link></li>
                  <li><Link className="dropdown-item" to="/dashboard">Dashboard</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="nav-link text-light">
                <FaUserCircle size={25} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;