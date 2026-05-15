import { useState } from 'react';
import DotPattern from '../components/DotPattern';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <DotPattern>
    <div class="container d-flex justify-content-center mt-5">
        <div class="card bg-dark text-white border-secondary p-4 shadow-lg rounded-4 w-100" style={{ maxWidth: '400px' }}>
          
          <div class="text-center mb-4">
            <h2 class="fw-bold">
              {isLogin ? 'Welcome ' : 'Join '} 
              <span class="text-warning">EduForge</span>
            </h2>
            <p class="text-secondary">
              {isLogin ? 'Sign in to your account' : 'Register for a new account'}
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <div class="mb-3">
                <label class="form-label text-warning">Full Name</label>
                <input 
                  type="text" 
                  class="form-control bg-dark text-white border-secondary" 
                  required  
                />
              </div>
            )}

            <div class="mb-3">
              <label class="form-label text-warning">Email Address</label>
              <input 
                type="email" 
                class="form-control bg-dark text-white border-secondary" 
                required
              />
            </div>

            <div class="mb-4">
              <label class="form-label text-warning">Password</label>
              <input 
                type="password" 
                class="form-control bg-dark text-white border-secondary" 
                required
              />
            </div>

            <button class="btn btn-warning w-75 d-flex justify-content-center fw-bold rounded-4 mx-auto mb-3">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>

            <div class="text-center">
              <button 
                type="button" 
                class="btn border-0 text-white text-decoration-none opacity-75"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "No account? " : "Have an account? "}
                <span class="text-warning fw-bold">
                  {isLogin ? 'Register' : 'Sign In'}
                </span>
              </button>
            </div>

          </form>
        </div>
      </div>
    </DotPattern>
  );
};

export default Login;