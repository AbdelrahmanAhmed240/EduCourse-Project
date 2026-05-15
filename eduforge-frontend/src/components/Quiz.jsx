import { useState } from 'react';

const Quiz = ({ questions }) => {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  if (!questions || questions.length === 0) return null;

  return (
    <div class="card bg-dark border-warning text-white p-4 shadow">
      <h5 class="text-warning mb-3">Unit Quiz</h5>
      <p class="mb-4">{questions[0].text}</p>
      
      <form>
        {questions[0].options.map((opt, i) => (
          <div key={i} class="form-check mb-3">
            <input 
              class="form-check-input" 
              type="radio" 
              name="quiz" 
              id={`q-${i}`}
              onChange={() => setSelected(i)}
              disabled={submitted}
            />
            <label class="form-check-label ms-2" htmlFor={`q-${i}`}>
              {opt}
            </label>
          </div>
        ))}
      </form>

      {submitted ? (
        <div class={`mt-3 fw-bold p-2 rounded ${selected === questions[0].correct ? "text-success bg-success bg-opacity-10" : "text-danger bg-danger bg-opacity-10"}`}>
          {selected === questions[0].correct ? "✨ Correct! Well done." : "❌ Incorrect. Try reviewing the video."}
        </div>
      ) : (
        <button 
          class="btn btn-warning mt-2 fw-bold px-4 rounded-pill" 
          onClick={() => setSubmitted(true)}
          disabled={selected === null}
        >
          Submit Answer
        </button>
      )}
    </div>
  );
};

export default Quiz;