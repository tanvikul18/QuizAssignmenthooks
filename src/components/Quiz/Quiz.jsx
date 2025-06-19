import React, { useEffect, useState } from 'react'
import './Quiz.css'
import Footer from '../Footer/Footer';

export default function Quiz(props) {
  console.log(props)
 

  return (
    
       props.index <= 5 ? ( <div className='quiz'>
      <div className='quiz-container'>
        <div className='quiz-header'>
        
             <h2>{props.questions.question}</h2> 
       
        </div>
       
       
       </div>
       <div className='quiz-body options-card'>
        <div className='options-area' id="options-container">
          {
            props.questions.options.map((option,ind)=>{
              return <li key={ind} onClick={()=>{
                props.dispatch({type: "newAns",payload : ind})
              
                props.dispatch({type: "nextQuetions"})
              }} className={`option ${props.answerIndex == ind ? 'optionSelected' : ''}`}>{String.fromCharCode(97 + ind)}.&nbsp;{option.label}</li>
            })
          }
          </div>
       </div>
       <div className='quiz-footer'>
            <p>Number of Questions : {props.index}/{props.totalQuestions}</p>    
           <Footer index = {props.index} totalQuestions = {props.totalQuestions} dispatch = {props.dispatch}/>
       </div>
    </div>) : (props.dispatch({type:"summary"}))
     
    
   
  )
}
