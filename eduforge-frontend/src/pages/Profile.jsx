import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaGem, FaCalendarAlt } from 'react-icons/fa';
import DotPattern from '../components/DotPattern';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const profileData = JSON.parse(localStorage.getItem('profile'));
    
    if (profileData) {
      setUser(profileData.result);
    } else {
      navigate('/login'); 
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (!user) return <div className="text-white">Loading...</div>;

  return (
    <DotPattern>
    <div className="container my-5">
      <div className="card bg-dark border-secondary p-4 rounded-3">
        <h2 className="text-warning">User Profile</h2>
        <hr className="border-secondary" />
        <div className="d-flex flex-column gap-2">
          <p className="text-white"><strong><FaUser className="text-warning m-2" />Full Name:</strong> {user.name}</p>
          <p className="text-white"><strong><FaEnvelope className="text-warning m-2" />Email:</strong> {user.email}</p>
          <p className="text-white"><strong><FaGem className="text-warning m-2" />Plan:</strong> <span className="badge bg-warning text-dark p-1.5">{user.plan}</span></p>
          <p className="text-white"><strong><FaCalendarAlt className="text-warning m-2" />Member Since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
        <button onClick={handleLogout} className="btn btn-outline-danger p-3 mt-3">Logout</button>
      </div>
    </div>
    </DotPattern>
  );
};

export default Profile;