import { useContext } from 'react';
import Home from './pages/Home';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import QuestionPage from './pages/QuestionPage';
import { Context } from './context/context';


const App = () => {
  const {user} = useContext(Context)
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
     {user.name && <Route path="/questions" element={<QuestionPage />} />}    </Routes>
    </BrowserRouter>
  )
}

export default App;
