import { useEffect,useReducer,useState } from "react";

import Quiz from "../Quiz/Quiz.jsx"
import Summary from "../Summary/Summary.jsx";
import Header from "../Header/Header.jsx";
const shuffleArray = (array) => {
const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const initialStates = {
    questions : [],
    status : "loading",
    index : 0,
    optTxt : null,
    answerIndex : -1,
    actualPoints : 0,
    
}
function reducer(state,action){
   switch(action.type){
      case "active":
       return {...state,questions : action.payload, status: "active" }
    case "newAns" :
      console.log(state.questions)
      const currquestion = state.questions[state.index];
      
        return {...state, optTxt : currquestion.options[action.payload].label,answerIndex : action.payload, actualPoints : currquestion.options[action.payload].isCorrect ? state.actualPoints + 5 : state.actualPoints }  
    case "nextQuetions" :
        return {...state, index:state.index + 1, optTxt : null,answerIndex: -1} 
    case "prevQuetions" :
    return {...state, index:state.index - 1} 
    case "summary":
        return {...state, status : "finish"}
    case "restart":
        return {...state, status : "active",index : 0 , optTxt : null ,answerIndex: -1,actualPoints : 0}        
       default:
        return state;
   }
}
function Main({questionsData}) {
  
 console.log(questionsData)
  const[{questions,status,index,optTxt,answerIndex,actualPoints},dispatch]=useReducer(reducer,initialStates);
  const totalQuestions = questionsData.length;
  const totalPoints = questionsData.length * 5 ;
 // console.log(totalPoints)
  useEffect(()=>{
  
      if(questionsData?.length > 0){
        const shuffledQs = shuffleArray(questionsData).map((q) => ({
        ...q,
        options: shuffleArray(q.options), // shuffle options per question
      }));
      console.log(shuffledQs)
   //   setShuffledQuestions(shuffledQs);
          dispatch({type: "active",payload : shuffledQs})
      }
      
  },[])
  return (
    <>
      
           <Header dispatch={dispatch} totalQuestions={totalQuestions} index={index + 1}/> 
      
    
          {
             status === 'active' && <Quiz dispatch={dispatch} totalQuestions={totalQuestions} questions={questionsData[index]} index={index + 1} optTxt={optTxt} answerIndex= {answerIndex}/>
          }
          {
            status === 'finish' && <Summary dispatch={dispatch} totalPoints = {totalPoints} actualPoints = {actualPoints}/>
          }
    </>
  )
}
export default Main;