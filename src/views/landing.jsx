import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from 'react-router-dom';
import useStateCallback from "../hooks/useStateCallback";
import { fetchImage, setInitialState, setWrongImage } from "../redux/actions";
import GameOver from "../components/gameOver";
import Modal from "../components/modal";
import QuestionForm from "../components/questionForm";
import Status from "../components/status";
import Welcome from "../components/welcome";

const Landing = () => {

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const images = useSelector(state => state.images);
  const questions = useSelector(state => state.questions);

  const [currentQuestionCount, setCurrentQuestionCount] = useStateCallback(0);
  const [isGameEnd, setIsGameEnd] = useState(false);
  const [isWrongAnswer, setIsWrongAnswer] = useState(false);

  useEffect(() => {
    dispatch(setInitialState());
  }, []);

  const handleNavigation = nextQuestionNum => {
    if (!isGameEnd && currentQuestionCount < 10) {
      navigateTo(`q${nextQuestionNum}`);
      setIsWrongAnswer(false);
    }
    if (currentQuestionCount >= 10) {
      setIsGameEnd(true);
    }
  }

  const handleNewGame = () => {
    dispatch(setInitialState());
    setIsGameEnd(false);
    setCurrentQuestionCount(1);
    navigateTo('/q1');
  };

  const handleSubmit = (e, isCorrect) => {
    e.preventDefault();
    if (isCorrect) {
      dispatch(fetchImage());
    } else {
      dispatch(setWrongImage());
    }
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
        <GameOver action={handleNewGame} images={images} />
        </>
      )}
      {images[currentQuestionCount - 1] && (
        <Modal imageURL={images[currentQuestionCount - 1]} message="some message tbd" />
      )}
    </>
  )

};

export default Landing;