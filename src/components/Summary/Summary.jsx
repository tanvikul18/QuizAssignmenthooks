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
    <div className="summary-container">
      <div className="summary-card">
        <h2>You have completed the quiz.</h2>
        <p><em>You can review the quiz by clicking on Review.</em></p>

        <div className="score">You got: {totalPercent} %</div>

        {totalPercent < 80 ? (
          <>
            <p className="fail">Sorry! You failed this quiz.</p>
            <p><em>You can try again by clicking on Restart.</em></p>
          </>
        ) : (
          <p className="pass">Great! You passed the quiz.</p>
        )}

        <div className="button-row">
          <button onClick={handleReview} >Review</button>
          <button onClick={handleRestart}>Restart</button>
        </div>
      </div>
    </div>
  );
}
