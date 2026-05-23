import { useState } from 'react';
import DotPattern from '../components/DotPattern';
import { login, signup } from '../api'; 
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import zxcvbn from 'zxcvbn';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [pwScore, setPwScore] = useState(null);
  const navigate = useNavigate();

  const scoreConfig = [
    { label: 'Very Weak',  color: '#ef4444', width: '20%'  },
    { label: 'Weak',       color: '#f97316', width: '40%'  },
    { label: 'Fair',       color: '#eab308', width: '60%'  },
    { label: 'Strong',     color: '#22c55e', width: '80%'  },
    { label: 'Very Strong',color: '#16a34a', width: '100%' },
  ];

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setFormData({ ...formData, password: val });
    if (val.length > 0) {
      const result = zxcvbn(val);
      setPwScore(result.score); // 0-4
    } else {
      setPwScore(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && (pwScore === null || pwScore < 2)) {
      toast.error("Password is too weak. Please choose a stronger password.", { id: 'auth-err' });
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
        setIsLogin(true);
        setFormData({ name: '', email: '', password: '' });
        setPwScore(null);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Authentication failed. Please verify your credentials.";
      toast.error(message, { id: 'auth-err' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DotPattern>
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{ top: 70, zIndex: 9999 }}
      />                        
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div className="card bg-dark text-white border border-secondary shadow-lg p-5 mt-4 rounded-4 w-100" style={{ maxWidth: '450px' }}>
          
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
              <div className="position-relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  className="form-control bg-dark text-white border-secondary pe-5"
                  required
                  onChange={handlePasswordChange}
                  value={formData.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="btn btn-link position-absolute top-50 end-0 translate-middle-y pe-3 text-secondary p-0 border-0"
                  style={{ zIndex: 10 }}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>

              {/* Strength bar — only shown on signup */}
              {!isLogin && pwScore !== null && (
                <div className="mt-2">
                  <div className="w-100 rounded" style={{ height: '4px', background: '#374151' }}>
                    <div
                      className="rounded"
                      style={{
                        height: '4px',
                        width: scoreConfig[pwScore].width,
                        background: scoreConfig[pwScore].color,
                        transition: 'width 0.3s ease, background 0.3s ease',
                      }}
                    />
                  </div>
                  <small style={{ color: scoreConfig[pwScore].color, fontSize: '0.75rem' }} className="fw-semibold">
                    {scoreConfig[pwScore].label}
                  </small>
                </div>
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