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
    <div className="quiz-container" aria-labelledby="quiz-question">
      <div className="quiz" key={index}>
        <div className="quiz-header-card">
            <div className="quiz-header">
                {
              isLastQuestion  ?  '': (<div>
                <button className="btn btnPrev" disabled={index === 1} onClick={handlePrev} title="Previous" aria-label="Previous">&lt;</button>
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
                  isLastQuestion ?   '' :   <button className="btn btnNext" onClick={handleNext} title="Next" aria-label="Next">&gt;</button>
                }
              </div>): (<div></div>)
              
              }
            </div>
            <div className="progress"> 
            <div className="progress-bar" aria-hidden="true">
              <div
                id="progress-fill"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            </div>

            <div className="card">
              <div className="question-area">
                <div id="quiz-question" className="question-text">  {questions.question
                    .split(new RegExp(`(${questions.highlights.join("|")})`, "gi"))
                    .map((part, index) =>
                      questions.highlights.some(
                        (h) => h.toLowerCase() === part.toLowerCase()
                      ) ? (
                        <strong key={index}>{part}</strong>
                      ) : (
                        part
                      )
                    )}</div>
                {/* {questions.subtitle && (
                  <div className="subtitle">{questions.subtitle}</div>
                )} */}
              </div>
            </div>
        </div>
        <div className="options-card">
          <fieldset className="options-area">
            <legend className="sr-only">Choices</legend>
            {questions.options.map((option, ind) => {
              const isSelected = answerIndex === ind;
              const optionClass = `option-btn${isSelected ? " selected" : ""}`;

              return (
                <button
                  key={ind}
                  className={optionClass}
                  onClick={!isReview ? () => handleOptionClick(ind) : undefined}
                >
                  <span>
                    {String.fromCharCode(97 + ind)}.&nbsp;{option.label}
                  </span>
                </button>
              );
            })}
          </fieldset>

        
        </div>
      </div>
    </div>
  );
}
