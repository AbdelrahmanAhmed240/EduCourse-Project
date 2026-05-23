import { useState } from 'react';
import DotPattern from '../components/DotPattern';
import { login, signup } from '../api'; 
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Professional Password Policy Validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/; 
    
    if (!isLogin && !passwordRegex.test(formData.password)) {
      toast.error("Password must be 8+ chars, with 1 letter, 1 number, and 1 special character.", { id: 'auth-err' });
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        const { data } = await login({ email: formData.email, password: formData.password });
        localStorage.setItem('profile', JSON.stringify(data));
        toast.success("Welcome back!");
        navigate('/dashboard'); 
      } else {
        await signup(formData);
        toast.success("Account created successfully! Please sign in.");
        setIsLogin(true); // Switch to login view
        setFormData({ name: '', email: '', password: '' }); // Clear form
      }
    } catch (error) {
      // Extract backend error message or fallback to default
      const message = error.response?.data?.message || "Authentication failed. Please verify your credentials.";
      toast.error(message, { id: 'auth-err' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DotPattern>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div className="card bg-dark text-white border border-secondary shadow-lg p-5 rounded-4 w-100" style={{ maxWidth: '450px' }}>
          
          <div className="text-center mb-4">
            <h2 className="fw-bold mb-2">
              {isLogin ? 'Sign In to ' : 'Join '} 
              <span className="text-warning">EduCourse</span>
            </h2>
            <p className="text-secondary small">
              {isLogin ? 'Enter your credentials to access your account' : 'Create your account to start learning'}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-3">
                <label className="form-label text-warning small fw-bold">Full Name</label>
                <input name="name" type="text" className="form-control bg-dark text-white border-secondary" required 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} value={formData.name} />
              </div>
            )}
            
            <div className="mb-3">
              <label className="form-label text-warning small fw-bold">Email Address</label>
              <input name="email" type="email" className="form-control bg-dark text-white border-secondary" required 
                onChange={(e) => setFormData({...formData, email: e.target.value})} value={formData.email} />
            </div>

            <div className="mb-4">
              <label className="form-label text-warning small fw-bold">Password</label>
              <input name="password" type="password" className="form-control bg-dark text-white border-secondary" required 
                onChange={(e) => setFormData({...formData, password: e.target.value})} value={formData.password} />
              {!isLogin && (
                <small className="text-secondary d-block mt-1" style={{ fontSize: '0.75rem' }}>
                  Min 8 chars, 1 letter, 1 number, 1 special character (@$!%*#?&)
                </small>
              )}
            </div>

            <button 
              type="submit" 
              className="btn btn-warning w-100 fw-bold py-2 rounded-3 mb-3"
              disabled={loading}
            >
              {loading ? (
                <span><span className="spinner-border spinner-border-sm me-2"></span>Processing...</span>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>

            <div className="text-center">
              <button type="button" className="btn btn-link text-white text-decoration-none small opacity-75" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <span className="text-warning fw-bold">{isLogin ? 'Register' : 'Sign In'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </DotPattern>
  );
};

export default Login;