import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourse } from '../context/CourseContext';
import DotPattern from '../components/DotPattern';
import toast, { Toaster } from 'react-hot-toast';
import { saveCourse, fetchRemainingCreations } from '../api';

const Generator = () => {
  const [topic, setTopic] = useState('');
  const [units, setUnits] = useState(3);
  const [level, setLevel] = useState('Beginner');
  const [remaining, setRemaining] = useState(null);
  const { updateCourse, loading, setLoading } = useCourse();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('profile')) {
      fetchRemainingCreations()
        .then(({ data }) => {
          setRemaining(data.remaining);
        })
        .catch((err) => console.error("Could not load creation metrics limits:", err));
    }
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!localStorage.getItem('profile')) return toast.error("Log in first!");

    if (remaining === 0) {
      return toast.error("0 creations remaining this week!");
    }

    setLoading(true);
    try {
      const { data } = await saveCourse({ topic, units, level });
      updateCourse(data);
      toast.success("Course Created! ✨");
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DotPattern>
      <Toaster position="top-center" />
      <div className="py-5 container">
        <div className="card p-5 border-secondary mx-auto bg-dark" style={{ maxWidth: '600px' }}>
          <h2 className="text-center mb-3 text-white">Course <span className="text-warning">Generator</span></h2>
          
          <form onSubmit={handleCreate}>
            <div className="mb-3">
              <label className="form-label text-warning fw-bold">Topic</label>
              <input 
                type="text" 
                className="form-control bg-dark text-white border-secondary" 
                required 
                onChange={(e) => setTopic(e.target.value)} 
                placeholder="e.g. Angular, Node.js"
                disabled={remaining === 0 || loading}
              />
            </div>
            
            <div className="row mb-4">
              <div className="col-4">
                <label className="form-label text-warning fw-bold">Units</label>
                <input 
                  type="number" 
                  className="form-control bg-dark text-white border-secondary" 
                  defaultValue="3" 
                  min="1" 
                  max="10" 
                  onChange={(e) => setUnits(e.target.value)} 
                  disabled={remaining === 0 || loading}
                />
              </div>
              <div className="col-8">
                <label className="form-label text-warning fw-bold">Level</label>
                <select 
                  className="form-select bg-dark text-white border-secondary" 
                  onChange={(e) => setLevel(e.target.value)}
                  disabled={remaining === 0 || loading}
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Professional</option>
                </select>
              </div>
            </div>

            <div className="text-center mb-4">
              {remaining === null ? (
                <p className="text-muted small m-0">Checking your dynamic plan limits...</p>
              ) : remaining === Infinity ? (
                <p className="text-info fw-bold m-0">⚡ Unlimited Access Plan Enabled</p>
              ) : (
                <p className={`fw-bold m-0 ${remaining === 0 ? 'text-danger' : 'text-warning'}`}>
                  {remaining === 0 
                    ? "⚠️ No creations available this week" 
                    : `📊 ${remaining} ${remaining === 1 ? 'creation' : 'creations'} available this week`
                  }
                </p>
              )}
            </div>

            {remaining === 0 ? (
              <button 
                type="button" 
                className="btn btn-secondary fw-bold w-100 py-3 rounded-3" 
                style={{ cursor: 'not-allowed', opacity: 0.6 }}
                disabled
              >
                0 Creations Available 🔒
              </button>
            ) : (
              <button 
                type="submit" 
                className="btn btn-warning fw-bold w-100 py-3 rounded-3 d-flex align-items-center justify-content-center" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span 
                      className="spinner-border spinner-border-sm me-3 text-dark" 
                      role="status" 
                      aria-hidden="true"
                      style={{ width: '1.2rem', height: '1.2rem', strokeWidth: '3px' }}
                    ></span>
                    <span className="placeholder-glow">
                      <span className="text-dark">Creating Your Syllabus... ⏳</span>
                    </span>
                  </>
                ) : (
                  "Create Course ✨"
                )}
              </button>
            )}
          </form>
        </div>
      </div>
    </DotPattern>
  );
};

export default Generator;