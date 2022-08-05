//Mainting state of the application


import {useState,createContext} from 'react';
import axios from "axios";
export const Context = createContext();

export const ContextProvider = ({children}) => {
    
    const [user,setUser]=useState({name:'',score:0});
    const [correctAnswers,setCorrectAnswers]=useState(0);
    const [questionAnswered,setQuestionAnswered]=useState(0);
    const [questionIndex , setQuesionIndex] = useState(0)
    const [showcheck,setShowCheck] = useState(false)
    const [questions,setQuestions] = useState([])
    const [token ,setToken] = useState("")
    const [totalQuestions,setTotalQuestions] = useState(5)
    const [Category,setCategory] = useState([{id:0,name:"Category"}])
    const [choosedCategory,setChoosedCategory] = useState("")
    const [Difficulty,setDifficulty] = useState("")
    const [error,setError] = useState("")
   
   //resetting the state of the application
   const resetData =()=>{
    setQuestionAnswered(0)
    setQuesionIndex(0)
    setShowCheck(false)
    setQuestions([])
    setToken("")
   }


    //update correct answer count 
    const updateCorrectAnswers = () => {
        setCorrectAnswers(correctAnswers+1) 
    }

    //update question answered count
    const updateQuestionAnswered = () => {
        setQuestionAnswered(questionAnswered+1)
    }

    //update questionIndex
   const handleQuestionIndex=()=>{
    setQuesionIndex(questionIndex+1)
  }

  //update total question count
  const updateTotalQuestion = () => {  
    setTotalQuestions(totalQuestions+5)
  }


  //handling error
  const updateError=(error)=>{
    setError(error)
    setTimeout(() => {
      setError("")
    },1000);
  }




    //update user
    const updateUser=(name,value)=>{
        setUser({
            ...user,
            [name]:value
        })
      }


    //update choosed category
    const updateCategory=(name)=>{
       setChoosedCategory(name)
      }
    
    //update difficulty
    const updateDifficulty=(name)=>{
      setDifficulty(name)
    }


    //fetching catetoery from api
    const fetchCategory = async() => {
      try{
        const response = await axios('https://opentdb.com/api_category.php')
        if(response.data.trivia_categories){
        setCategory([...Category,...response.data.trivia_categories])
        }
      }
      catch(err){
        console.log(err)
      } 
    }

    //fetching token from api
    const fetchToken=async ()=>{
        try{
          const response = await axios('https://opentdb.com/api_token.php?command=request')
          if(response.data.token){
          setToken(response.data.token)
          }
        }
        catch(err){
          console.log(err)
        }
    }

    //fetching question from api
    const fetchQuestion= async()=>{
        try{
          const response= await axios(choosedCategory || Difficulty ? `https://opentdb.com/api.php?amount=5&category=${choosedCategory}&difficulty=${Difficulty}&type=multiple&token=${token}`:`https://opentdb.com/api.php?amount=5&type=multiple&token=${token}`)
          if(response.data.results){
          setQuestions(response.data.results)
          }
        }
        catch(err){
          console.log(err)
        }
      }


    return (
        <Context.Provider value={{
            user,
            updateUser,
            questionIndex,
            handleQuestionIndex,
            correctAnswers,
            updateCorrectAnswers,
            showcheck,
            setShowCheck,
            updateQuestionAnswered,
            questionAnswered,
            fetchToken,
            token,
            questions,
            setQuestions,
            fetchQuestion,
            resetData,
            updateTotalQuestion,
            totalQuestions,
            fetchCategory,
            Category,
            updateCategory,
            updateDifficulty,
            choosedCategory,
            Difficulty,
            error,
            updateError
        }}>
        {children}
        </Context.Provider>
    );
    }

