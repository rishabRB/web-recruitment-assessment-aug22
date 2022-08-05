import { useContext, useEffect,useReducer,useState} from "react";
import Footer from "../components/Footer";
import Question from "../components/Question";
import Loading from "../components/Loading";
import { Context } from "../context/context";

const QuestionPage = () => {

 const {user,questionIndex,questions} = useContext(Context)

  return (
    <div className="question-container">
    <div className="name-container">
      <h1>Hi,{user.name}</h1>
    </div>
    {questions.length ? <Question 
     question={questions[questionIndex].question} 
     correctAnswer={questions[questionIndex].correct_answer}
     incorrectAnswers={questions[questionIndex].incorrect_answers}
     />
     :
     <Loading />
    }
    <Footer />
    </div>
  );
}   
export default QuestionPage;