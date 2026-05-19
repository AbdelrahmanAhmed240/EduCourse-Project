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
          <div className="col-lg-3 mb-4">
            <div className="card bg-dark border-secondary">
              <div className="card-header bg-warning">SYLLABUS</div>
              <div className="list-group list-group-flush">
                {units.map((unit, index) => (
                  <button 
                    key={index} onClick={() => { setActiveUnit(index); setShowQuiz(false); }}
                    className={`list-group-item list-group-item-action border-secondary p-3 text-start ${activeUnit === index ? "bg-dark text-warning" : "bg-dark text-light opacity-25"}`}>
                    {index + 1}. {unit.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-9">
            <div className="card bg-dark border-secondary shadow-lg overflow-hidden border-0">
              {currentUnit ? (
                <>
                  <Ratio aspectRatio="16x9">
                    {currentUnit.videoId === "unavailable" ? (
                      <div className="d-flex flex-column align-items-center justify-content-center bg-black text-warning p-5 text-center">
                        <h2 className="fw-bold">⚠️ VIDEO QUOTA EMPTY</h2>
                        <p className="text-muted">Please study the technical dissertation below.</p>
                      </div>
                    ) : (
                      <iframe src={`https://www.youtube.com/embed/${currentUnit.videoId}`} title="video" allowFullScreen></iframe>
                    )}
                  </Ratio>

                  <div className="card-body p-4">
                    <h2 className="text-warning text-center mb-4">{currentUnit.title}</h2>
                    
                    <hr className="border-secondary mb-4"/>

                    <article className="text-light fs-5">
                        <ReactMarkdown 
                          components={{
                            strong: ({node, ...props}) => <strong className="text-warning" {...props} />,
                            code: ({node, inline, ...props}) => (
                              <pre className="bg-black text-success p-3 rounded border-start border-warning overflow-x-auto my-2 w-100">
                                <code {...props} />
                              </pre>
                            ),
                            p: ({node, ...props}) => <p className="mb-4" {...props} />
                          }}
                        >
                          {currentUnit.summary?.replace(/\|/g, '\n\n')}
                        </ReactMarkdown>
                    </article>

                    <div className="mt-5 pt-4 border-top border-secondary text-center">
                        {!showQuiz ? (
                          <button className="btn btn-warning w-100 p-3 rounded-3  fw-bold" onClick={() => setShowQuiz(true)}>Start Unit Quiz</button>
                        ) : (
                          <Quiz questions={currentUnit.quiz} />
                        )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-5 text-center text-white opacity-50">Start Creating from Create Course Button...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DotPattern>
  );
};

export default Dashboard;