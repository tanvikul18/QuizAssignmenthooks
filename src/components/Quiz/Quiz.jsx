import React, { useEffect } from "react";
import { useState } from "react";
import "./Quiz.css";

const rederHighlightText = (quesTxt,highlights)=>{
   if (!quesTxt || !highlights || highlights.length === 0) return quesTxt;
   const parts = quesTxt.split(new RegExp(`(${highlights?.join("|")})`, "gi"));
  //console.log(parts)
                  return  parts.map((part, index) =>
                      highlights.some(
                        (h) => h.toLowerCase() === part.toLowerCase()
                      ) ? (
                        <strong key={index}>{part}</strong>
                      ) : (
                        part
                      )
                    )
}
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
   console.log(isLastQuestion)
    const isFinalQuestion = index === totalQuestions;
  const isPastLastQuestion = index > totalQuestions;

  useEffect(() => {
    if (isPastLastQuestion) {
      dispatch({ type: "summary" });
    }
  }, [isPastLastQuestion, dispatch]);

 
  if (isPastLastQuestion) return null;

  const handleOptionClick = (selectedIndex) => {
    dispatch({ type: "newAns", payload: selectedIndex });
    setTimeout(() => {
      dispatch({ type: "nextQuestions" });
    }, 400);
  };
   const handlePrev=(e)=>{
    dispatch({type: "prevQuestions"})
    
  }
  const handleNext=()=>{
     dispatch({type: "nextQuestions"})
  }
 
 

  return (
    <div className="quiz-container" aria-labelledby="quiz-question">
      <main className="quiz" key={index}>
        <header className="quiz-header-card">
            <div className="quiz-header">
                {
                  !isPastLastQuestion && <div>
                    <button className="btn btnPrev" disabled={index === 1} onClick={handlePrev} title="Previous" aria-label="Previous">&lt;</button>
                  </div>
              }
              
              
              <div>
                  <span className="quiz-countnumber">
                  {
                     !isPastLastQuestion && <><strong>0{index}</strong><span className="quiz-count" >/ 0{totalQuestions}</span></>
                }
                
              </span>
              </div>
            
              {
              isReview ? (<div className="quiz-next">
                {
                  !isPastLastQuestion && <button className="btn btnNext" onClick={handleNext} title="Next" aria-label="Next">&gt;</button>
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

            <section className="card">
              <div className="question-area">
                <div id="quiz-question" className="question-text">  {rederHighlightText(questions?.question,questions?.highlights)}</div>
             
              </div>
            </section>
        </header>
        <section className="options-card">
          <fieldset className="options-area">
            <legend className="sr-only">Choices</legend>
            {questions.options.map((option, ind) => {
              const isSelected = answerIndex === ind;
              const optionClass = `option-btn${isSelected ? " selected" : ""}`;

              return (
                <button
                  key={option.label+ind}
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
        </section>
      </main>
    </div>
  );
}
