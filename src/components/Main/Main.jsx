import { useEffect,useReducer,useRef,useState } from "react";

import Quiz from "../Quiz/Quiz.jsx"
import Summary from "../Summary/Summary.jsx";

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
    answers:{},
    isReview: false
}
function reducer(state, action) {
  switch (action.type) {
    case "active":
      return { ...state, questions: action.payload, status: "active" };

    case "newAns": {
      const currQuestion = state.questions[state.index];
      const selectedOption = currQuestion.options[action.payload];
      const updatedPoints = selectedOption.isCorrect ? state.actualPoints + 5 : state.actualPoints;
      return {
        ...state,
        optTxt: selectedOption.label,
        answerIndex: action.payload,
        actualPoints: updatedPoints,
        answers: {
          ...state.answers,
          [state.index]: {
            index: action.payload,
            label: selectedOption.label
          }
        }
      };
    }

    case "nextQuestions": {
      const nextIndex = state.index + 1;
      const saved = state.answers[nextIndex] || { index: -1, label: null };;
      return {
        ...state,
        index: nextIndex,
        optTxt: saved.label,
        answerIndex: saved.index
      };
    }

    case "prevQuestions": {
      const prevIndex = state.index - 1;
      const saved = state.answers[prevIndex] || { index: -1, label: null };
      return {
        ...state,
        index: prevIndex,
        optTxt: saved.label,
        answerIndex: saved.index,
        isReview:false
      };
    }

    case "review": {
      const saved = state.answers[0] || { index: -1, label: null };
      return {
        ...state,
        status: "active",
        index: 0,
        optTxt: saved.label,
        answerIndex: saved.index,
        isReview:true
      };
    }

    case "summary":
      return { ...state,  status: "finish" };

    case "restart":
      return {
        ...state,
        status: "active",
        index: 0,
        optTxt: null,
        answerIndex: -1,
        actualPoints: 0,
        answers: {},
        isReview:false
      };

    default:
      return state;
  }
}

function Main({questionsData}) {
  const shuffledRef = useRef();

  const[{questions,status,index,optTxt,answerIndex,actualPoints,isReview},dispatch]=useReducer(reducer,initialStates);
  const totalQuestions = questionsData.length;
  const totalPoints = totalQuestions * 5;
 // console.log(totalPoints)
  useEffect(()=>{
  
      if(questionsData?.length > 0){
        const shuffledQs = shuffleArray(questionsData).map((q) => ({
        ...q,
        options: shuffleArray(q.options), 
      }));
      shuffledRef.current = shuffledQs;
    //  console.log(shuffledQs)
  
          dispatch({type: "active",payload : shuffledQs})
      }
      
  },[questionsData])
  return (
    <>
           {
             status === 'active' && <Quiz dispatch={dispatch} totalQuestions={totalQuestions} questions={questions[index]} index={index + 1} optTxt={optTxt} answerIndex= {answerIndex} isReview={isReview}/>
          }
          {
            status === 'finish' && <Summary dispatch={dispatch} totalPoints={totalPoints} actualPoints = {actualPoints} />
          }
    </>
  )
}
export default Main;