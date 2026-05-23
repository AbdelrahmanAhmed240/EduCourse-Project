import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourse } from '../context/CourseContext';
import DotPattern from '../components/DotPattern';
import toast, { Toaster } from 'react-hot-toast';
import { saveCourse, fetchRemainingCreations } from '../api';

const Generator = () => {
  const [formData, setFormData] = useState({ topic: '', units: 3, level: 'Beginner' });
  const [remaining, setRemaining] = useState(null);
  const { updateCourse, loading, setLoading } = useCourse();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('profile')) {
      fetchRemainingCreations()
        .then(({ data }) => setRemaining(data.remaining))
        .catch(() => setRemaining(0)); // Default to 0 on failure for safety
    }
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!localStorage.getItem('profile')) return toast.error("Please log in to continue.", { id: 'gen-err' });
    if (remaining === 0) return toast.error("Weekly generation limit reached.", { id: 'gen-err' });

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
      <Toaster position="top-center" />
      <div className="py-5 container">
        <div className="card p-4 p-md-5 border-secondary mx-auto bg-dark shadow-lg rounded-4" style={{ maxWidth: '600px' }}>
          <h2 className="text-center mb-4 text-white fw-bold">
            Course <span className="text-warning">Generator</span>
          </h2>
          
          <form onSubmit={handleCreate}>
            <div className="mb-4">
              <label className="form-label text-warning small fw-bold">Course Topic</label>
              <input 
                type="text" 
                className="form-control bg-dark text-white border-secondary py-2" 
                required 
                placeholder="e.g. Advanced React Patterns"
                value={formData.topic}
                onChange={(e) => setFormData({...formData, topic: e.target.value})}
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
                  onChange={(e) => setFormData({...formData, units: e.target.value})}
                  disabled={loading || remaining === 0}
                />
              </div>
              <div className="col-7">
                <label className="form-label text-warning small fw-bold">Difficulty Level</label>
                <select 
                  className="form-select bg-dark text-white border-secondary py-2" 
                  value={formData.level}
                  onChange={(e) => setFormData({...formData, level: e.target.value})}
                  disabled={loading || remaining === 0}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Professional">Professional</option>
                </select>
              </div>
            </div>

            {/* Status indicator */}
            {remaining !== null && (
              <div className="text-center mb-4">
                <p className={`small fw-bold ${remaining === 0 ? 'text-danger' : 'text-warning'}`}>
                  {remaining === Infinity ? "⚡ Unlimited Access" : 
                   remaining === 0 ? "⚠️ Limit reached for this week" : 
                   `📊 ${remaining} ${remaining === 1 ? 'creation' : 'creations'} remaining`}
                </p>
              </div>
            )}

            <button 
              type="submit" 
              className="btn btn-warning w-100 fw-bold py-3 rounded-3 d-flex align-items-center justify-content-center" 
              disabled={loading || remaining === 0}
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