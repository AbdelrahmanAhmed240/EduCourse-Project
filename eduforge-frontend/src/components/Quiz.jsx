import { useState } from 'react';

const Quiz = ({ questions }) => {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  if (!questions || questions.length === 0) return null;
  const quiz = questions[0];

  return (
    <div className="card bg-dark border-warning text-white p-4 shadow">
      <h5 className="text-warning mb-3">Unit Quiz</h5>
      <p className="mb-4">{quiz.text}</p>
      
      {quiz.options.map((opt, i) => (
        <div key={i} className="form-check mb-3">
          <input className="form-check-input" type="radio" name="quiz" disabled={submitted} onChange={() => setSelected(i)} />
          <label className="form-check-label">{opt}</label>
        </div>
      ))}

      {submitted ? (
        <div className={`p-3 bg-opacity-10 ${selected === quiz.correct ? "text-success bg-success" : "text-danger bg-danger"}`}>
          {selected === quiz.correct ? "✨ Correct! Well done." : "❌ Incorrect. Try reviewing the video."}
        </div>
      ) : (
        <button className="btn btn-warning mt-2 fw-bold p-3 rounded-3" disabled={selected === null} onClick={() => setSubmitted(true)}>
          Submit Answer
        </button>
      )}
    </div>
  );
};

export default Quiz;