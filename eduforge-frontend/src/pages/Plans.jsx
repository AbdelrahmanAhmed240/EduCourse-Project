import React from 'react';
import DotPattern from '../components/DotPattern';

const Plans = () => {
  return (
    <DotPattern>
      <div className="container py-5 text-white">
        
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold">Choose Your <span className="text-warning">Plan</span></h1>
        </div>

        <div className="row justify-content-center align-items-stretch g-4">

          <div className="col-lg-4">
            <div className="card h-100 border-secondary rounded-2 p-2 bg-dark text-white">
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center">
                  <h3 className="m-0">Student</h3>
                  <span className="badge bg-secondary rounded-pill p-2">ACTIVE</span>
                </div>
                <h1 className="text-warning fw-bold mb-4 display-5">Free</h1>
                <ul className="list-unstyled flex-grow-1 text-secondary">
                  <li className="mb-2">✓ 3 AI Units / mo</li>
                  <li className="mb-2">✓ Standard Quizzes</li>
                  <li className="mb-2">✓ Community Access</li>
                </ul>
                <button className="btn btn-secondary w-100 rounded-pill fw-bold py-2 opacity-50 mt-5" disabled>
                  Current Plan
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card h-100 border-warning border-2 rounded-2 p-2 bg-dark text-white">
              <div className="card-body d-flex flex-column text-center">
                <span className="badge bg-warning text-dark mb-2 p-2">MOST POPULAR</span>
                <h3 className="fw-bold text-warning">Edu Pro ✨</h3>
                <h1 className="mb-3">$9.99<span className="fs-5 fw-normal text-muted">/mo</span></h1>
                <ul className="list-unstyled flex-grow-1 text-start text-light">
                  <li className="mb-2">✓ <strong>Unlimited</strong> AI Units</li>
                  <li className="mb-2">✓ Multi-Language Explanations</li>
                  <li className="mb-2">✓ PDF Exporting</li>
                </ul>
                <button className="btn btn-warning w-100 rounded-pill fw-bold py-2 mt-5">
                  Upgrade to Pro
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card h-100 border-secondary rounded-2 p-2 bg-dark text-white">
              <div className="card-body d-flex flex-column">
                <h3 className="fw-bold mb-2">Enterprise</h3>
                <h1 className="text-warning fw-bold mb-4">Custom</h1>
                <ul className="list-unstyled flex-grow-1 text-secondary">
                  <li className="mb-2">✓ School Management</li>
                  <li className="mb-2">✓ Custom AI Training</li>
                  <li className="mb-2">✓ 24/7 Support</li>
                </ul>
                <button className="btn btn-outline-warning w-100 rounded-pill fw-bold py-2 mt-5">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </DotPattern>
  );
};

export default Plans;