import React, { useEffect, useState } from 'react';
import './Summary.css';

export default function Summary({ dispatch, totalPoints, actualPoints }) {
  const [totalPercent, setTotalPercent] = useState(0);

  useEffect(() => {
    if (totalPoints > 0) {
      const percent = ((actualPoints / totalPoints) * 100);
      setTotalPercent(percent);
    }
  }, []);

  const handleReview = () => dispatch({ type: 'review' });
  const handleRestart = () => dispatch({ type: 'restart' });

  return (
    <main className="summary-container" role="main" aria-labelledby="summary-heading">
      <section className="summary-card">
        <header>
          <h2 id= "summary-heading">You have completed the quiz.</h2>
          <p><em>You can review the quiz by clicking on Review.</em></p>
        </header>
        <section className='summmary-score'>
        <div className="score">You got: {totalPercent} %</div>
        {totalPercent < 80 ? (
          <>
            <p className="fail">Sorry! You failed this quiz.</p>
            <p><em>You can try again by clicking on Restart.</em></p>
          </>
        ) : (
          <p className="pass">Great! You passed the quiz.</p>
        )}
        </section>
        <footer className="button-row">
          <button onClick={handleReview} >Review</button>
          <button onClick={handleRestart}>Restart</button>
        </footer>
      </section>
    </main>
  );
}
