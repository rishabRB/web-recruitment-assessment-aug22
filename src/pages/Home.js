
import { useEffect,useContext } from "react";

import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Result from "../components/Result";
import { Context } from "../context/context";

const Home=()=>{

  let navigate = useNavigate()
  const {user,
         updateUser,
        showcheck,
        fetchToken,
        fetchQuestion,
        fetchCategory,
        Category,
        updateDifficulty,
        updateCategory,
        error,
        updateError
      } = useContext(Context)
  
 
  useEffect(()=>{
    fetchToken()
    fetchCategory()
  },[])


  //handling start
  const handleClickStart=()=>{
    if(user.name){ 
    fetchQuestion()
    navigate("/questions")
    }
    else
    updateError("Please enter your name")
  }
 
 

  return (
    <div className="app">
      <Header />
      {!showcheck && <main className="main">
        <h1>Quiz</h1>
        <input type="text" name="name" onChange={(e)=>updateUser(e.target.name,e.target.value)} placeholder="Enter your name" />
        <div className="choose-wrapper">
          <div className="choose">
          <select onChange={(e)=>updateDifficulty(e.target.value)}>
            <option value="">Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          </div>
          <div className="choose">
          <select onChange={(e)=>updateCategory(e.target.value)}>
            {Category.map((item,index)=>(
              <option key={index} value={item.id}>{item.name}</option>
            ))}
          </select>
          </div>
        </div>

       { error && 
        <div className="error-container">
           <span>{error}</span>
        </div>}
        <div style={{justifyContent:"center"}} className="btn-container">
          <button onClick={handleClickStart}>Start</button>
        </div>
      </main>
      }
      {showcheck && <Result />}
      <div className="grow" />
      <Footer />
    </div>
  );
}

export default Home;