import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DotPattern from '../components/DotPattern';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const profileData = JSON.parse(localStorage.getItem('profile'));
    
    if (!profileData || !profileData.token) {
      return navigate('/login'); 
    }

    const fetchUserProfile = async () => {
      try {
        const mySequentialId = profileData?.result?.customId; 
        const token = profileData?.token;

        // Safety fallback: prevents fetching 'undefined' if state parsing takes a millisecond
        if (mySequentialId === undefined || mySequentialId === null) {
          console.log("Awaiting numeric identifier serialization...");
          return;
        }

        const response = await fetch(`http://localhost:5000/api/auth/profile/${mySequentialId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data);
        } else {
          setApiError(data.message || "Failed to load profile record.");
        }
      } catch (error) {
        console.error("Network interface error:", error);
        setApiError("Authentication verification failed.");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (apiError) return <div className="text-danger text-center font-monospace my-5">⚠️ {apiError}</div>;
  if (!user) return <div className="text-white text-center my-5">Loading account infrastructure...</div>;

  return (
    <DotPattern>
    <div className="container my-5">
      <div className="card bg-dark border-secondary p-3 rounded-2">
        <h2 className="text-warning">User Profile (Account ID: {user.customId})</h2>
        <hr className="border-secondary" />
        <div className="mb-2">
          <p className="text-light"><strong>Full Name:</strong> {user.name}</p>
          <p className="text-white"><strong>Email:</strong> {user.email}</p>
          <p className="text-white"><strong>Plan:</strong> <span className="badge bg-warning text-dark">{user.plan}</span></p>
          <p className="text-white"><strong>Member Since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
        <button onClick={handleLogout} className="btn btn-outline-danger">Logout</button>
      </div>
    </div>
    </DotPattern>
  );
};

export default Profile;