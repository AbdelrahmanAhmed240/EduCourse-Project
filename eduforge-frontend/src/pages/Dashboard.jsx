import { useState, useEffect } from 'react';
import { Ratio } from 'react-bootstrap'; 
import ReactMarkdown from 'react-markdown'; 
import { useCourse } from '../context/CourseContext';
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
          {/* Syllabus Sidebar */}
          <div className="col-lg-3 mb-4">
            <div className="card bg-dark border-secondary">
              <div className="card-header bg-warning fw-bold text-dark text-center">SYLLABUS</div>
              <div className="list-group list-group-flush">
                {units.map((unit, index) => (
                  <button 
                    key={index} 
                    onClick={() => { setActiveUnit(index); setShowQuiz(false); }}
                    className={`list-group-item list-group-item-action border-secondary p-3 text-start ${activeUnit === index ? "bg-dark text-warning fw-bold" : "bg-dark text-light opacity-50"}`}>
                    {index + 1}. {unit.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Core Content Viewer */}
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

                    <article className="text-light fs-5 lh-lg w-100">
                      {currentUnit.summary ? (
                        currentUnit.summary.split('|').map((segment, index) => {
                          const text = segment.trim();

                          // 1. Structural Interception: Code Implementations
                          if (text.startsWith('**Code Implementation:**')) {
                            const rawCode = text.replace('**Code Implementation:**', '').trim();
                            return (
                              <div key={index} className="my-4">
                                <strong className="text-warning d-block mb-2">Code Implementation:</strong>
                                <pre className="bg-black text-success p-3 rounded border-start border-warning overflow-x-auto w-100 font-monospace fs-6">
                                  <code>{rawCode}</code>
                                </pre>
                              </div>
                            );
                          }

                          // 2. Structural Interception: Syntax Specifications
                          if (text.startsWith('**Syntax Specification:**')) {
                            const rawSyntax = text.replace('**Syntax Specification:**', '').trim();
                            return (
                              <div key={index} className="my-4">
                                <strong className="text-warning d-block mb-2">Syntax Specification:</strong>
                                <div className="bg-black text-warning px-3 py-2 rounded border border-secondary font-monospace fs-6 d-inline-block w-100">
                                  <code>{rawSyntax}</code>
                                </div>
                              </div>
                            );
                          }

                          // 3. Native Fallback: Normal Paragraphs & Standard Document Markdown
                          return (
                            <ReactMarkdown
                              key={index}
                              components={{
                                strong: ({ node, ...props }) => <strong className="text-warning fw-bold" {...props} />,
                                p: ({ node, ...props }) => <p className="mb-4" {...props} />
                              }}
                            >
                              {text}
                            </ReactMarkdown>
                          );
                        })
                      ) : (
                        <p className="text-muted">No content text returned from AI processor cluster.</p>
                      )}
                    </article>

                    {/* Quiz Section Trigger */}
                    <div className="mt-5 pt-4 border-top border-secondary text-center">
                        {!showQuiz ? (
                          <button className="btn btn-warning w-100 p-3 rounded-3 fw-bold" onClick={() => setShowQuiz(true)}>Start Unit Quiz</button>
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