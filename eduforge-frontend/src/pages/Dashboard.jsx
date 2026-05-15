import { useState } from 'react';
import { Ratio } from 'react-bootstrap'; 
import { useCourse } from '../context/CourseContext';
import { Navigate } from 'react-router-dom';
import Quiz from '../components/Quiz';
import DotPattern from '../components/DotPattern';

const Dashboard = () => {
  const { course } = useCourse();
  const [activeUnit, setActiveUnit] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  if (!course) return <Navigate to="/generate"/>;

  const currentUnit = course.units[activeUnit];

  return (
    <DotPattern>
    <div>
      <div class="container py-3">
        <div class="row">
          <div class="col-lg-3 mb-4">
            <div class="card bg-dark">
              <div class="card-header bg-warning text-dark fw-bold">
                {course.title}
              </div>
              
              <div class="list-group rounded-0">
                {course.units.map((unit, index) => (
                  <button 
                    key={unit.id}class="col-lg-3 mb-4"
                    onClick={() => { setActiveUnit(index); setShowQuiz(false); }}
                    class={`list-group-item list-group-item-action border-secondary py-2 ${
                      activeUnit === index ? "bg-secondary text-warning" : "bg-dark text-light"
                    }`}
                  >
                    {unit.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div class="col-lg-9">
            <div class="card bg-dark border-secondary p-1">
              <Ratio aspectRatio="16x9">
                <iframe 
                  src={`https://www.youtube.com/embed/${currentUnit.videoId}`} 
                  title="video" 
                  allowFullScreen
                ></iframe>
              </Ratio>
              <div class="card-body p-3">
                <h2 class="text-warning pb-3">{currentUnit.title}</h2>
                <p class="text-light opacity-75 pb-3">
                  {currentUnit.summary}
                </p>
                <hr class="border-secondary" />
                {!showQuiz ? (
                  <button 
                    class="rounded-2 custom-btn px-3 py-1" 
                    onClick={() => setShowQuiz(true)}
                  >
                    Take Unit Quiz
                  </button>
                ) : (
                  <Quiz questions={currentUnit.quiz} />
                )}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
    </DotPattern>
  );
};

export default Dashboard;