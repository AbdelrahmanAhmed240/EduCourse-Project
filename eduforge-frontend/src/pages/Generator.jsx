import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourse } from '../context/CourseContext';
import DotPattern from '../components/DotPattern';
import toast, { Toaster } from 'react-hot-toast';
import { saveCourse } from '../api';

const Generator = () => {
  const [topic, setTopic] = useState('');
  const [units, setUnits] = useState(3);
  const [level, setLevel] = useState('Beginner');
  const { updateCourse, loading, setLoading } = useCourse();
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!localStorage.getItem('profile')) return toast.error("Log in first!");

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
              <input type="text" className="form-control bg-dark text-white border-secondary" required onChange={(e) => setTopic(e.target.value)} />
            </div>
            <div className="row mb-5">
              <div className="col-4">
                <label className="form-label text-warning fw-bold">Units</label>
                <input type="number" className="form-control bg-dark text-white border-secondary" defaultValue="3" min="1" max="10" onChange={(e) => setUnits(e.target.value)} />
              </div>
              <div className="col-8">
                <label className="form-label text-warning fw-bold">Level</label>
                <select className="form-select bg-dark text-white border-secondary" onChange={(e) => setLevel(e.target.value)}>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Professional</option>
                </select>
              </div>
            </div>
            <button type="submit" className="custom-btn fw-bold w-100 py-3 rounded-3" disabled={loading}>
              {loading ? "Creating...." : "Create Course ✨"}
            </button>
          </form>
        </div>
      </div>
    </DotPattern>
  );
};
export default Generator;