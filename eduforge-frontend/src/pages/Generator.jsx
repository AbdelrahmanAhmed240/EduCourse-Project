import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourse } from '../context/CourseContext';
import DotPattern from '../components/DotPattern';

const Generator = () => {
  const [topic, setTopic] = useState('');
  const [units, setUnits] = useState(3);
  const [level, setLevel] = useState('Beginner');
  
  const { updateCourse, loading, setLoading } = useCourse();
  const navigate = useNavigate();

  const handleCreate = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      const newCourse = {
        title: topic,
        level: level,
        units: Array.from({ length: units }, (_, index) => ({
          id: index + 1,
          title: `${topic} - Unit ${index + 1}`, 
          videoId: "SqcY0GlETPk",
          summary: `This is a ${level} lesson about ${topic}. This unit covers core fundamentals and practical applications.`,
          quiz: [{ 
            text: `What is the main focus of ${topic}?`, 
            options: [topic, "A different subject", "None of the above"], 
            correct: 0 
          }]
        }))
      };

      updateCourse(newCourse);
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
  <DotPattern>
    <div class="py-5">
      <div class="container">
        <div class="card p-4 border-secondary mx-auto bg-dark" style={{ maxWidth: '600px' }}>
            <h2 class="text-center mb-3 text-white">
              Course <span class="text-warning">Generator</span>
            </h2>

          <form onSubmit={handleCreate}>
            <div class="mb-3">
              <label class="form-label text-warning fw-bold">Topic</label>
              <input 
                type="text"
                class="form-control bg-dark text-white border-secondary py-2"
                required 
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div class="row mb-5">
              <div class="col-6">
                <label class="form-label text-warning fw-bold">Units</label>
                <input 
                  type="number"
                  class="form-control bg-dark text-white border-secondary py-2"
                  defaultValue="3"
                  min="1" 
                  max="10"
                  onKeyDown={(e) => ["-", "+", "e"].includes(e.key) && e.preventDefault()}
                  onChange={(e) => setUnits(parseInt(e.target.value) || 1)}
                />
              </div>

              <div class="col-6">
                <label class="form-label text-warning fw-bold">Level</label>
                <select 
                  class="form-select bg-dark text-white border-secondary py-2"
                  onChange={(e) => setLevel(e.target.value)}
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Professional</option>
                </select>
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <button 
                type="submit" 
                className="custom-btn fw-bold py-3 px-5 rounded-3" 
                disabled={loading}>
                {loading ? (
                  <div>
                    <div className="spinner-border spinner-border-sm text-dark"></div>
                    <span>Creating...</span>
                  </div>
                ) : (
                  "Create Course ✨"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </DotPattern>
  );
};

export default Generator;