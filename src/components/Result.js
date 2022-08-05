import { useContext } from 'react'
import {Context} from '../context/context'
import { useNavigate } from 'react-router-dom'
const Result=()=>{
    const {questionAnswered,
           correctAnswers,
           fetchQuestion,
           fetchToken,
           resetData,
           updateTotalQuestion,
           totalQuestions
        } = useContext(Context)

    const navigate = useNavigate()
   
    //reset 
    const handleClickReset=()=>{
        navigate("/")
        window.location.reload()
    }

    //start again
    const handleClickStart=()=>{
       resetData()
       fetchToken()
       fetchQuestion()
       updateTotalQuestion()
       navigate("/questions")
    }

    return(
        <div className="main">
        <div className="result-container">
            <h1>Your result : </h1>
            <div className="result-wrapper">
            <span>Question answered : {totalQuestions}</span>
            <span>Correct answers : {correctAnswers}</span>
            <span>Incorrect answers : {totalQuestions - correctAnswers}</span>
            </div>
            <div style={{justifyContent:'center'}} className='btn-container'>
            <button  className='btn' onClick={handleClickReset}>Reset</button>
            <button  className='btn' onClick={handleClickStart}>start again</button>
            </div>
        </div>
        </div>
    )
}
export default Result;