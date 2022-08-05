import Options from "./Option"
import {useContext, useState} from "react"

import { useNavigate } from "react-router-dom"
import { Context } from "../context/context"

const Question =({question,correctAnswer,incorrectAnswers})=>{
  
  let options=[...incorrectAnswers,correctAnswer]
  const navigate = useNavigate()
  const [choosed,setChoosed]=useState(null)
  const {questionIndex,
         handleQuestionIndex,
         setShowCheck,
         error,
         updateError,
         updateCorrectAnswers,
         questionAnswered,
         updateQuestionAnswered
        }=useContext(Context)

  //state for mainting previous option index
  const [previousOption,setPreviousOption]=useState(0)



  //checking if the answer is correct or not
  const checkAnswer=()=>{
    if(choosed===correctAnswer){
      setPreviousOption(questionIndex)
      setChoosed(null)
      updateCorrectAnswers()
      updateQuestionAnswered()
  
    }
    else{
      setPreviousOption(questionIndex)
      setChoosed(null)
      updateQuestionAnswered()
    }
  }
 
  //handleing next button
  const handleClick=()=>{
    removecssClass(previousOption)
    if(questionAnswered < 4 && choosed){
      checkAnswer()
      handleQuestionIndex()
    }
    else if(questionAnswered === 4 && choosed){
      checkAnswer()
      setShowCheck(true)
      navigate('/')
    }
    else if(!choosed){
       updateError("Please select an option")
    }
  }


  //adding css class from option
  const addcssClass=(index)=>{
    const list = document.getElementById(index).classList
    list.add('choosed')
  }

  //removing css class from previous option
  const removecssClass=(index)=>{
    const previous = document.getElementById(index).classList
    previous.remove('choosed')
  }

  //mainting previous option index
  const choosedOption=(option,index)=>{
    if(previousOption >= 0){
    removecssClass(previousOption)
  }
    setPreviousOption(index)
    addcssClass(index)
    setChoosed(option)
  }

    return (
      <div className="question-wrapper">
      <div className="question">
       <h2>Q{questionIndex+1}: {question}</h2>
      </div>
      <div className="Option-container">
       {options?.map((option,index) => (
       <Options
       key={index} 
       index={index} 
       option={option}
       choosedOption={choosedOption}
        />))}
    </div>
    { error && 
        <div   className="error-container">
           <span style={{margin:10}}>{error}</span>
        </div>}
    <div className="btn-container">
      <button onClick={handleClick}>Next</button>
    </div>
    </div>
    )
  }

  export default Question