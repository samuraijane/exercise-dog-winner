import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from 'react-router-dom';
import useStateCallback from "../hooks/useStateCallback";
import { fetchImage } from "../redux/actions";
import QuestionForm from "../components/questionForm";
import Status from "../components/status";
import Welcome from "../components/welcome";
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

  const handleNewGame = () => {
    disptach(setInitialState());
    setIsGameEnd(false);
    setCurrentQuestionCount(1);
    navigateTo('/q1');
  };

  const handleSubmit = (e, isCorrect) => {
    e.preventDefault();
    console.log(isCorrect);
    disptach(fetchImage());
    setTimeout(() => {
      setCurrentQuestionCount(prevState => prevState + 1, newState => handleNavigation(newState));
    }, 2000);
  };

  const handleClick = num => {
    setCurrentQuestionCount(prevState => prevState + 1, newState => handleNavigation(newState));
  };

  return (
    <>
      {currentQuestionCount < 1 && <Welcome />}
      {!isGameEnd && currentQuestionCount > 0 && <Status count={currentQuestionCount} />}
      <Routes>
        <Route
          element={<QuestionForm action={handleSubmit} data={questions[currentQuestionCount - 1]} />}
          path={`q${currentQuestionCount}`}
        />
      </Routes>
      {!isGameEnd && currentQuestionCount < 1 && (
        <button disabled={isGameEnd} onClick={handleClick}>Start Game</button>
      )}
      {isGameEnd && (
        <>
          <p>Game Over</p>
          <button onClick={handleNewGame}>New Game</button>
        </>
      )}
    </>
  )

};

export default Landing;