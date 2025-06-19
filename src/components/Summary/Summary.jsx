import React, { useEffect, useState } from 'react';
import './Summary.css';

export default function Summary({ dispatch, totalPoints, actualPoints }) {
  const [totalPercent, setTotalPercent] = useState(0);
  const handleReview=()=>{
    dispatch({type: "review"})
    
  }
  const handleRestart = ()=>{
    dispatch({ type: 'restart' })
  }
  const calculatePercent=()=>{
    console.log(actualPoints,totalPoints  )
     const calPercent = Number((actualPoints/totalPoints)*100);
    setTotalPercent(calPercent)
    }
   useEffect(()=>{
        calculatePercent()
   },[])
  return (
   <div className='summary-container'>
    <div className="summary">
      <p>You have completed the quiz.</p>
       <p>You can review the quiz.</p>
       <button onClick={handleReview}>Review</button>
      <p>You got: {totalPercent} %</p>

      {totalPercent < 80 ? (
        <>
          <p role="alert">Sorry! You failed this quiz.</p>
          <div className="retry">
            <span>Want to try again?</span>
            <button onClick={handleRestart}>Restart</button>
          </div>
        </>
      ) : (
        <p>🎉 Hurray! You passed the quiz.</p>
      )}
    </div>
    </div>
  );
}
