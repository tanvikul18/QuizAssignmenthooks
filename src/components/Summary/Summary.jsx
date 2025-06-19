 import React, { useEffect, useState } from 'react'
import './Summary.css'
export default function Summary({dispatch,totalPoints,actualPoints}) {
  const[totalPercent,settotalPercent] = useState(0);
  const calculatePercent=()=>{
    console.log(actualPoints,totalPoints  )
     const calPercent = Number((actualPoints/totalPoints)*100);
    settotalPercent(calPercent)
  }
 
   
   useEffect(()=>{
        calculatePercent()
   },[])
  return (
    <div className='finish-screen'>
      <p>You have completed the quiz.</p>
      
       <p>You got: {totalPercent} %</p>
       {
           totalPercent < 80 ? ( <><p>Sorry ! you failed in this quiz.</p><div className='retry'>
        <span>In case you want to have another attempt:</span>
       <button onClick={()=> dispatch({type: "restart"})}>Restart</button>
       </div></>) : <p>Hurray ! You have passed the quix.</p>
       }
      
    </div>

  )
}
