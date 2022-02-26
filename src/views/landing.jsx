import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from 'react-router-dom';
import useStateCallback from "../hooks/useStateCallback";
import Question from "../components/question";
import { setInitialState } from "../redux/actions";

const Landing = () => {

  const disptach = useDispatch();
  const questions = useSelector(state => state.questions);
  const navigateTo = useNavigate();

  const [currentQuestionCount, setCurrentQuestionCount] = useStateCallback(0);
  const [isGameEnd, setIsGameEnd] = useState(false);

  useEffect(() => {
    disptach(setInitialState());
  }, []);

  const handleNavigation = nextQuestionNum => {
    if (!isGameEnd && currentQuestionCount < 10) {
      navigateTo(`q${nextQuestionNum}`);
    }
    if (currentQuestionCount >= 10) {
      setIsGameEnd(true);
    }
  }

  const handleClick = num => {
    setCurrentQuestionCount(prevState => prevState + 1, newState => handleNavigation(newState));
  };

  return (
    <>
      <h2>Welcome to Dog Winner</h2>
      <p>The only game on the internet where you can win a dog for each correct answer you give.</p>
      <Routes>
        <Route path={`q${currentQuestionCount}`} element={<Question data={questions[currentQuestionCount - 1]} />} />
      </Routes>
      <button disabled={isGameEnd} onClick={handleClick}>Proceed</button>
      {isGameEnd && <p>Game Over</p>}
    </>
  )

};

export default Landing;