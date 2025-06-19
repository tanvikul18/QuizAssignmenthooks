import React from 'react'

export default function Footer(props) {
   const handleNext = ()=>{
    props.dispatch({type: "nextQuetions"})
   
   }
  return (
    <div>
        {
            props.index <= props.totalQuestions - 1 ? (<button onClick={handleNext}>Next</button> )
             :(<button onClick={()=>props.dispatch({type:"summary"})}>Finish</button>)
        }
       
    </div>
  )
}
