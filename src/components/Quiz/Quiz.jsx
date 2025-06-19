import React from "react";
import { useState } from "react";
import "./Quiz.css";

export default function Quiz({
  index,
  totalQuestions,
  questions,
  answerIndex,
  dispatch,
  isReview
}) {
  const progressPercent = Math.round((index / totalQuestions) * 100);
   const isLastQuestion = index > totalQuestions;
  // Handle option click
  const handleOptionClick = (selectedIndex) => {
    dispatch({ type: "newAns", payload: selectedIndex });
    setTimeout(() => {
      dispatch({ type: "nextQuestions" });
    }, 400);
  };
   const handlePrev=(e)=>{
    dispatch({type: "review"})
    
  }
  const handleNext=()=>{
     dispatch({type: "nextQuestions"})
  }
 
 
  if (isLastQuestion) {
    dispatch({ type: "summary" });
    return null;
  }

 
  if (!questions || !questions.options) {
    return <div className="quiz-container">Invalid question data.</div>;
  }

  return (
    <div className="quiz-container">
      <div className="quiz" key={index}>
        <div className="quiz-header">
            {
           isLastQuestion  ?  '': (<div>
             <button className="btn btnPrev" disabled={index === 1} onClick={handlePrev} title="Previous">&lt;</button>
          </div>)
          }
           
          
          <div>
              <span className="quiz-countnumber">
              {
              index <= totalQuestions ?  (<><strong>0{index}</strong><span className="quiz-count" >/ 0{totalQuestions}</span></>): ""
            }
             
          </span>
          </div>
        
          {
           isReview ? (<div className="quiz-next">
            {
               isLastQuestion ?   '' :   <button className="btn btnNext" onClick={handleNext} title="Next">&gt;</button>
            }
          </div>): (<div></div>)
           
          }
        </div>
        
        <div className="progress-bar">
          <div
            id="progress-fill"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        <div className="card">
          <div className="question-area">
            <div className="question-text">{questions.question}</div>
            {questions.subtitle && (
              <div className="subtitle">{questions.subtitle}</div>
            )}
          </div>
        </div>

        <div className="options-card">
          <div className="options-area">
            {questions.options.map((option, ind) => {
              const isSelected = answerIndex === ind;
              const optionClass = `option-btn${isSelected ? " selected" : ""}`;

              return (
                <button
                  key={ind}
                  className={optionClass}
                  onClick={() => handleOptionClick(ind)}
                >
                  <span>
                    {String.fromCharCode(97 + ind)}.&nbsp;{option.label}
                  </span>
                </button>
              );
            })}
          </div>

        
        </div>
      </div>
    </div>
  );
}
