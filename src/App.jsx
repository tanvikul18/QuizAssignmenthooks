import { useState,useEffect } from "react"
import Main from "../src/components/Main/Main.jsx"


function App() {
 
  const [quesData,setquesData] = useState([]);
  const [getPassMarks,setPassMarks] = useState(0)
  const fetchQuestions=async(e)=>{
    try{
   const response =await fetch('/questions.json');
   const result = await response.json();
   //console.log(result)
   setquesData(result.questions);
   setPassMarks(result.passmark)
    }
    catch(err){
      console.log(err)
    }
  }
 
  useEffect(()=>{
      fetchQuestions()
  },[])
  return (
    <>
   
        {
            quesData.length > 0 && <Main questionsData = {quesData} passMarks= {getPassMarks}/>
             }
    </>
  )
}

export default App
