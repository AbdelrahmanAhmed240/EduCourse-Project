import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
      <div className="card bg-dark border-secondary p-3 rounded-2">
        <h2 className="text-warning">User Profile</h2>
        <hr className="border-secondary" />
        <div className="mb-2">
          <p className="text-light"><strong>Full Name:</strong> {user.name}</p>
          <p className="text-white"><strong >Email:</strong> {user.email}</p>
          <p className="text-white"><strong >Plan:</strong> <span className="badge bg-warning text-dark">{user.plan}</span></p>
          <p className="text-white"><strong >Member Since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
        <button onClick={handleLogout} className="btn btn-outline-danger">Logout</button>
      </div>
    </div>
    </DotPattern>
  );
};

export default Profile;