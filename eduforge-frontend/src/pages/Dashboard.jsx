import { useState, useEffect } from 'react';
import { Ratio } from 'react-bootstrap'; 
import ReactMarkdown from 'react-markdown'; 
import { useCourse } from '../context/CourseContext';
import Quiz from '../components/Quiz';
import DotPattern from '../components/DotPattern';
import { fetchCourses } from '../api';
import { useNavigate } from 'react-router-dom';

const GUEST_PREVIEW = {
  title: "Artificial Intelligence Fundamentals",
  units: [
    {
      title: "Neural Networks & Deep Learning",
      videoId: "aircAruvnKk",
      summary: `**Welcome to your AI-generated course!** This is a live preview of what EduCourse builds for you — structured, in-depth content on any topic, generated in seconds.|

Neural networks are computational models inspired by the human brain. They consist of layers of interconnected nodes (neurons) that process data by passing signals through weighted connections, learning patterns from examples.|

**Syntax Specification:** model = Sequential([Dense(128, activation='relu'), Dense(10, activation='softmax')])|

**Code Implementation:**
import tensorflow as tf

model = tf.keras.Sequential([
  tf.keras.layers.Dense(128, activation='relu', input_shape=(784,)),
  tf.keras.layers.Dropout(0.2),
  tf.keras.layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
model.fit(x_train, y_train, epochs=5)|

**Why it matters:** Neural networks power image recognition, language translation, recommendation engines, and virtually every modern AI product you interact with daily.`,
      quiz: [
        { question: "What activation function is commonly used in hidden layers?", options: ["Sigmoid", "ReLU", "Tanh", "Softmax"], answer: 1 },
        { question: "What does the optimizer do during training?", options: ["Loads data", "Adjusts weights to minimize loss", "Splits the dataset", "Builds the architecture"], answer: 1 },
      ]
    },
    { title: "Machine Learning Algorithms", videoId: "aircAruvnKk", summary: "Preview locked. Sign up to unlock all units.", quiz: [] },
    { title: "Natural Language Processing", videoId: "aircAruvnKk", summary: "Preview locked. Sign up to unlock all units.", quiz: [] },
  ]
};

const Dashboard = () => {
  const { course, updateCourse } = useCourse();
  const [activeUnit, setActiveUnit] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));
  const isGuest = !user;

  const activeCourse = isGuest ? GUEST_PREVIEW : course;

  useEffect(() => {
    if (user && !course) {
      fetchCourses().then(({ data }) => {
        if (data && data.length > 0) updateCourse(data[0]);
      }).catch(err => console.error(err));
    }
  }, [user, course, updateCourse]);

  const units = activeCourse?.units || [];
  const currentUnit = units[activeUnit];
  const isLockedUnit = isGuest && activeUnit > 0;

  return (
    <DotPattern>
      <div className="container py-4">

        {/* Guest Banner */}
        {isGuest && (
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4 px-4 py-3 rounded-4 border border-warning bg-dark shadow">
            <div>
              <p className="fw-bold text-warning mb-0">👀 You're viewing a sample course</p>
              <p className="text-secondary small mb-0">Sign up free to generate unlimited courses on any topic instantly.</p>
            </div>
            <button className="btn btn-warning fw-bold px-4 rounded-3" onClick={() => navigate('/login')}>
              Get Started Free →
            </button>
          </div>
        )}

        <div className="row">
          {/* Syllabus Sidebar */}
          <div className="col-lg-3 mb-4">
            <div className="card bg-dark border-secondary">
              <div className="card-header bg-warning fw-bold text-dark text-center">
                {isGuest ? '✨ SAMPLE SYLLABUS' : 'SYLLABUS'}
              </div>
              <div className="list-group list-group-flush">
                {units.map((unit, index) => (
                  <button
                    key={index}
                    onClick={() => { setActiveUnit(index); setShowQuiz(false); }}
                    className={`list-group-item list-group-item-action border-secondary p-3 text-start ${activeUnit === index ? "bg-dark text-warning fw-bold" : "bg-dark text-light opacity-50"}`}
                  >
                    {isGuest && index > 0 && <span className="me-1">🔒</span>}
                    {index + 1}. {unit.title}
                  </button>
                ))}
              </div>

              {isGuest && (
                <div className="card-footer bg-dark border-secondary text-center">
                  <small className="text-secondary">
                    Your course will have up to <span className="text-warning fw-bold">10 units</span> on any topic
                  </small>
                </div>
              )}
            </div>
          </div>

          {/* Core Content Viewer */}
          <div className="col-lg-9">
            <div className="card bg-dark border-secondary shadow-lg overflow-hidden border-0">

              {isLockedUnit ? (
                <div className="d-flex flex-column align-items-center justify-content-center text-center p-5" style={{ minHeight: '500px' }}>
                  <div className="mb-4" style={{ fontSize: '4rem' }}>🔒</div>
                  <h3 className="text-warning fw-bold mb-2">This unit is locked</h3>
                  <p className="text-secondary mb-4">Create a free account to generate this course and unlock all units with full content, videos, and quizzes.</p>
                  <button className="btn btn-warning fw-bold px-5 py-3 rounded-3 fs-5" onClick={() => navigate('/login')}>
                    Unlock All Units Free →
                  </button>
                </div>
              ) : currentUnit ? (
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

                    {/* Quiz / CTA */}
                    <div className="mt-5 pt-4 border-top border-secondary text-center">
                      {isGuest ? (
                        <div className="p-4 rounded-4" style={{ background: '#111827' }}>
                          <p className="text-warning fw-bold fs-5 mb-1">🎯 Ready to test your knowledge?</p>
                          <p className="text-secondary small mb-3">Sign up to unlock quizzes, track your progress, and generate courses on any topic.</p>
                          <button className="btn btn-warning fw-bold px-5 py-2 rounded-3" onClick={() => navigate('/login')}>
                            Start Learning Free →
                          </button>
                        </div>
                      ) : !showQuiz ? (
                        <button className="btn btn-warning w-100 p-3 rounded-3 fw-bold" onClick={() => setShowQuiz(true)}>
                          Start Unit Quiz
                        </button>
                      ) : (
                        <Quiz questions={currentUnit.quiz} />
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-5 text-center text-white opacity-50">
                  Start Creating from Create Course Button...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DotPattern>
  );
};

export default Dashboard;