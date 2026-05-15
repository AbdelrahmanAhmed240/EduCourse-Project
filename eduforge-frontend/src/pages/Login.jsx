import { useState, useRef, useEffect } from 'react';
import DotPattern from '../components/DotPattern';
import { login, signup } from '../api'; 
import { useNavigate } from 'react-router-dom';
import * as bootstrap from 'bootstrap';
import toast, { Toaster } from 'react-hot-toast'; 

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const passwordRef = useRef(null);
  const tooltipRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (passwordRef.current) {
      tooltipRef.current = new bootstrap.Tooltip(passwordRef.current, {
        title: "Min 8 chars, 1 letter, 1 number",
        trigger: 'manual',
        placement: 'right'
      });
    }
    return () => tooltipRef.current?.dispose();
  }, [isLogin]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    tooltipRef.current?.hide();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; 

    if (!isLogin && !passwordRegex.test(formData.password)) {
      tooltipRef.current?.show();
      toast.error("Password is too weak!", { id: 'pass-error' });
      setTimeout(() => tooltipRef.current?.hide(), 3000);
      return;
    }

    try {
      if (isLogin) {
        const { data } = await login({ email: formData.email, password: formData.password });
        localStorage.setItem('profile', JSON.stringify(data));
        navigate('/profile');
      } else {
        await signup(formData);
        toast.success("Account created successfully! Please log in.");
        setIsLogin(true);
      }
    } catch (error) {
      const message = error.response?.data?.message || "An error occurred";
      toast.error(message);
    }
  };

  return (
    <DotPattern>
      <Toaster position="center" reverseOrder={false} />
      <div className="container d-flex justify-content-center my-4">
        <div className="card bg-dark text-white border-secondary p-3 rounded-2 w-100" style={{ maxWidth: '400px' }}>
          
          <div className="text-center mb-3">
            <h2>
              {isLogin ? 'Welcome ' : 'Join '} 
              <span className="text-warning">EduForge</span>
            </h2>
            <p className="text-secondary">
              {isLogin ? 'Sign in to your account' : 'Register for a new account'}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-3">
                <label className="form-label text-warning">Full Name</label>
                <input 
                  name="name"
                  type="text" 
                  className="form-control bg-dark text-white border-secondary" 
                  required  
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="mb-3">
              <label className="form-label text-warning">Email Address</label>
              <input 
                name="email" 
                type="email" 
                className="form-control bg-dark text-white border-secondary" 
                required
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-warning">Password</label>
              <input 
                ref={passwordRef}
                name="password" 
                type="password" 
                className="form-control bg-dark text-white border-secondary" 
                required
                onChange={handleChange} 
              />
            </div>

            <button type="submit" className="btn btn-warning w-75 d-flex justify-content-center fw-bold rounded-3 mx-auto mb-3">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>

            <div className="text-center">
              <button 
                type="button" 
                className="btn border-0 text-white opacity-75"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "No account? " : "Have an account? "}
                <h6 className="text-warning">
                  {isLogin ? 'Register' : 'Sign In'}
                </h6>
              </button>
            </div>

          </form>
        </div>
      </div>
    </DotPattern>
  );
};

export default Login;