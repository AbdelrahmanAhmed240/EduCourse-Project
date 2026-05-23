import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourse } from '../context/CourseContext';
import DotPattern from '../components/DotPattern';
import toast, { Toaster } from 'react-hot-toast';
import { saveCourse, fetchRemainingCreations } from '../api';

const Generator = () => {
  const [formData, setFormData] = useState({ topic: '', units: 3, level: 'Beginner' });
  const [remaining, setRemaining] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const { updateCourse, loading, setLoading } = useCourse();
  const navigate = useNavigate();

  // Check auth and fetch limits on mount
  useEffect(() => {
    const profile = localStorage.getItem('profile');
    if (!profile) {
      setIsGuest(true);
      return; // Don't redirect — let them see the form
    }

    fetchRemainingCreations()
      .then(({ data }) => setRemaining(data.remaining))
      .catch(() => setRemaining(0));
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    // Guest user — show friendly toast instead of redirecting
    if (isGuest || !localStorage.getItem('profile')) {
      toast('🔐 Please log in first to create your course!', {
        id: 'auth-err',
        icon: '👋',
        duration: 3000,
        style: {
          background: '#1a1a2e',
          color: '#fff',
          border: '1px solid #f59e0b',
          fontWeight: '600',
        },
      });
      return;
    }

    if (remaining === 0) {
      toast.error("Weekly generation limit reached.", { id: 'gen-err' });
      return;
    }

    setLoading(true);
    try {
      const { data } = await saveCourse(formData);
      updateCourse(data);
      toast.success("Course generated successfully! ✨", { id: 'gen-success' });
      navigate('/dashboard');
    } catch (error) {
      const msg = error.response?.data?.message || "Generation failed. Please try again.";
      toast.error(msg, { id: 'gen-err' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DotPattern>
        <Toaster 
          position="top-center"
          toastOptions={{
            style: {
              marginTop: '60px', 
              zIndex: 9999,
            },
          }}
        />
      <div className="py-5 container">
        <div className="card p-4 p-md-5 border-secondary mx-auto bg-dark shadow-lg rounded-4" style={{ maxWidth: '600px' }}>
          <h2 className="text-center mb-4 text-white fw-bold">
            Course <span className="text-warning">Generator</span>
          </h2>

          {/* Guest banner */}
          {isGuest && (
            <div className="alert alert-warning d-flex align-items-center gap-2 mb-4 py-2 rounded-3" role="alert">
              <span>👋</span>
              <span className="small fw-semibold">
                You're browsing as a guest.{' '}
                <span
                  className="text-decoration-underline"
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate('/login')}
                >
                  Log in
                </span>{' '}
                to generate courses.
              </span>
            </div>
          )}

          <form onSubmit={handleCreate}>
            <div className="mb-4">
              <label className="form-label text-warning small fw-bold">Course Topic</label>
              <input
                type="text"
                className="form-control bg-dark text-white border-secondary py-2"
                required
                placeholder="e.g. Advanced React Patterns"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                disabled={loading || remaining === 0}
              />
            </div>

            <div className="row mb-4">
              <div className="col-5">
                <label className="form-label text-warning small fw-bold">Units</label>
                <input
                  type="number"
                  className="form-control bg-dark text-white border-secondary py-2"
                  min="1" max="10"
                  value={formData.units}
                  onChange={(e) => setFormData({ ...formData, units: Number(e.target.value) })}
                  disabled={loading || remaining === 0}
                />
              </div>
              <div className="col-7">
                <label className="form-label text-warning small fw-bold">Difficulty</label>
                <select
                  className="form-select bg-dark text-white border-secondary py-2"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  disabled={loading || remaining === 0}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Professional">Professional</option>
                </select>
              </div>
            </div>

            {remaining !== null && !isGuest && (
              <div className="text-center mb-4">
                <p className={`small fw-bold ${remaining === 0 ? 'text-danger' : 'text-info'}`}>
                  {remaining === Infinity ? "⚡ Unlimited Access" :
                    remaining === 0 ? "⚠️ No creations remaining this week" :
                      `📊 ${remaining} ${remaining === 1 ? 'creation' : 'creations'} available`}
                </p>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-warning w-100 fw-bold py-3 rounded-3 d-flex align-items-center justify-content-center"
              disabled={loading || remaining === 0 || !formData.topic.trim()}
            >
              {loading ? (
                <><span className="spinner-border spinner-border-sm me-2"></span>Generating...</>
              ) : "Create Course ✨"}
            </button>
          </form>
        </div>
      </div>
    </DotPattern>
  );
};

export default Generator;