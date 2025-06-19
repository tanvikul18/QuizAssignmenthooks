import React from 'react'

export default function Header({dispatch,totalQuestions,index}) {
  const handlePrev=(e)=>{
   dispatch({type: "prevQuetions"})
  }
  return (
    <div className='header-container'>
        <div className='header-quesno'>
          {
            index == 1 ? '' : (<button onClick={handlePrev}>Prev</button>)
          }
            {
              index <= totalQuestions ?  <p>{`0${index}`}/{`0${totalQuestions}`}</p> : ""
            }
           
      </div>
      <div className='progress-bar'>
        <div id="progress-fill">
        {
           index <= totalQuestions ?  <progress value={index} max={5}></progress> : <progress value={totalQuestions} max={5}></progress>
        }
        </div>
      </div>
    </div>
  )
}
