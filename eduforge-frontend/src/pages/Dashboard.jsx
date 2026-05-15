import { useState, useEffect } from 'react';
import { Ratio } from 'react-bootstrap'; 
import ReactMarkdown from 'react-markdown'; 
import { useCourse } from '../context/CourseContext';
import { Link } from 'react-router-dom';
import Quiz from '../components/Quiz';
import DotPattern from '../components/DotPattern';
import { fetchCourses } from '../api';

const Dashboard = () => {
  const { course, updateCourse } = useCourse();
  const [activeUnit, setActiveUnit] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (user && !course) {
      fetchCourses().then(({ data }) => {
        if (data && data.length > 0) updateCourse(data[0]);
      }).catch(err => console.error(err));
    }
  }, [user, course, updateCourse]);

  const units = course?.units || [];
  const currentUnit = units[activeUnit];

  return (
    <DotPattern>
      <div className="container py-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-3 mb-4">
            <div className="card bg-dark border-secondary sticky-top shadow-sm" style={{ top: '20px' }}>
              <div className="card-header bg-warning text-dark fw-bold border-0">SYLLABUS</div>
              <div className="list-group list-group-flush">
                {units.map((unit, index) => (
                  <button key={index} onClick={() => { setActiveUnit(index); setShowQuiz(false); window.scrollTo(0,0); }}
                    className={`list-group-item list-group-item-action border-secondary py-3 text-start ${activeUnit === index ? "bg-secondary text-warning fw-bold" : "bg-dark text-light opacity-50"}`}>
                    {index + 1}. {unit.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Reader Area */}
          <div className="col-lg-9">
            <div className="card bg-dark border-secondary shadow-lg overflow-hidden border-0">
              {currentUnit ? (
                <>
                  <Ratio aspectRatio="16x9">
                    {currentUnit.videoId === "unavailable" ? (
                      <div className="d-flex flex-column align-items-center justify-content-center bg-black text-warning p-5 text-center">
                        <h2 className="fw-bold h4">⚠️ VIDEO QUOTA EMPTY</h2>
                        <p className="text-muted">Please study the technical dissertation below.</p>
                      </div>
                    ) : (
                      <iframe src={`https://www.youtube.com/embed/${currentUnit.videoId}`} title="video" allowFullScreen className="border-0"></iframe>
                    )}
                  </Ratio>

                  <div className="card-body p-4 p-md-5">
                    <h1 className="text-warning fw-bold text-center mb-5 h2">{currentUnit.title}</h1>
                    
                    <hr className="border-secondary opacity-25 mb-5" />

                    <article className="mx-auto text-light lh-lg fs-5" style={{ maxWidth: '800px', textAlign: 'justify' }}>
                        <ReactMarkdown 
                          components={{
                            strong: ({node, ...props}) => <strong className="text-warning fw-bold" {...props} />,
                            code: ({node, inline, ...props}) => (
                              inline 
                              ? <code className="bg-black text-info px-2 py-1 rounded small" {...props} />
                              : <pre className="bg-black text-success p-4 rounded border-start border-warning border-4 my-4 overflow-auto small shadow-sm"><code {...props} /></pre>
                            ),
                            p: ({node, ...props}) => <p className="mb-5" {...props} />
                          }}
                        >
                          {currentUnit.summary?.replace(/\|/g, '\n\n')}
                        </ReactMarkdown>
                    </article>

                    <div className="mt-5 pt-5 border-top border-secondary text-center">
                        {!showQuiz ? (
                          <button className="btn btn-warning w-100 py-3 rounded-pill fw-bold" onClick={() => setShowQuiz(true)}>Start Unit Quiz</button>
                        ) : (
                          <Quiz questions={currentUnit.quiz} />
                        )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-5 text-center text-white opacity-50">Forging technical assets...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DotPattern>
  );
};

export default Dashboard;