import { useState, useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useCourse } from '../context/CourseContext';

const NavigationBar = () => {
  const navigate = useNavigate();
  const { clearCourse } = useCourse();

  const user = JSON.parse(localStorage.getItem('profile'));
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Added state for the user dropdown

  useEffect(() => {
    const closeDropdown = () => setIsDropdownOpen(false);
    window.addEventListener('click', closeDropdown);
    return () => window.removeEventListener('click', closeDropdown);
  }, []);

  const handleLogout = () => {
    clearCourse();
    localStorage.removeItem('profile');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark sticky-top shadow">
      <div className="container">
        <Link to="/" className="navbar-brand text-light fw-bold fs-4">
          <span className="text-warning">Edu</span>Course AI
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="eduNavbar"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          data-bs-theme="dark"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="eduNavbar">
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

            {user ? (
              <div className="nav-item dropdown">
                <button
                  className="nav-link text-warning dropdown-toggle d-flex align-items-center gap-2 bg-transparent border-0" 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    setIsDropdownOpen(!isDropdownOpen);
                  }}
                  aria-expanded={isDropdownOpen}
                >
                  <FaUserCircle size={25} />
                  <span className="small">{user.result.name.split(' ')[0]}</span>
                </button>

                <ul className={`dropdown-menu dropdown-menu-dark dropdown-menu-end position-absolute ${isDropdownOpen ? 'show' : ''}`} style={{ right: 0 }}>
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