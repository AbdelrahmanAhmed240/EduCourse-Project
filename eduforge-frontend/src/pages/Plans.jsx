import React from 'react';
import DotPattern from '../components/DotPattern';

const Plans = () => {
  return (
    <DotPattern>
      <div className="container py-5">
        {/* Header */}
        <div className="text-center mb-5 mt-4">
          <h1 className="display-3 fw-bold text-white">
            Choose Your <span className="text-warning">Power</span>
          </h1>
          <p className="text-light opacity-50 fs-5">Unlock the full potential of AI-driven learning.</p>
        </div>

        <div className="row justify-content-center g-4">
          
          {/* Student Plan */}
          <div className="col-md-4">
            <div className="card h-100 border-secondary shadow text-white" 
                 style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', borderRadius: '24px' }}>
              <div className="card-body p-4 d-flex flex-column">
                <h4 className="fw-bold mb-3">Student</h4>
                <h2 className="text-warning mb-4">Free</h2>
                <ul className="list-unstyled flex-grow-1 opacity-75">
                  <li className="mb-2">✔ 3 AI Units / mo</li>
                  <li className="mb-2">✔ Standard Quizzes</li>
                  <li className="mb-2">✔ Community Access</li>
                </ul>
                <button className="btn btn-outline-warning rounded-pill fw-bold py-2 mt-4">Get Started</button>
              </div>
            </div>
          </div>

          {/* Pro Plan (The Best Design) */}
          <div className="col-md-4">
            <div className="card h-100 border-warning shadow-lg text-white" 
                 style={{ 
                    background: 'rgba(255, 193, 7, 0.1)', 
                    backdropFilter: 'blur(15px)', 
                    borderRadius: '24px',
                    boxShadow: '0 0 20px rgba(255, 193, 7, 0.2)' // Glow effect
                 }}>
              <div className="card-body p-4 d-flex flex-column text-center">
                <div className="badge bg-warning text-dark rounded-pill mb-3 align-self-center px-3">MOST POPULAR</div>
                <h4 className="fw-bold mb-2 text-warning">Forge Pro ✨</h4>
                <h2 className="display-5 fw-bold text-white mb-4">$9.99<span className="fs-6 opacity-50">/mo</span></h2>
                <ul className="list-unstyled text-start flex-grow-1">
                  <li className="mb-3">✔ <span className="fw-bold">Unlimited</span> AI Units</li>
                  <li className="mb-3">✔ Advanced Analytics</li>
                  <li className="mb-3">✔ PDF Exporting</li>
                  <li className="mb-3">✔ Priority Forge</li>
                </ul>
                <button className="btn btn-warning rounded-pill fw-bold py-3 mt-4 shadow">Go Pro Now</button>
              </div>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="col-md-4">
            <div className="card h-100 border-secondary shadow text-white" 
                 style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', borderRadius: '24px' }}>
              <div className="card-body p-4 d-flex flex-column">
                <h4 className="fw-bold mb-3">Enterprise</h4>
                <h2 className="text-warning mb-4">Custom</h2>
                <ul className="list-unstyled flex-grow-1 opacity-75">
                  <li className="mb-2">✔ School Management</li>
                  <li className="mb-2">✔ Custom AI Training</li>
                  <li className="mb-2">✔ 24/7 Support</li>
                </ul>
                <button className="btn btn-outline-warning rounded-pill fw-bold py-2 mt-4">Contact Sales</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </DotPattern>
  );
};

export default Plans;