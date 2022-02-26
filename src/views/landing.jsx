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

  useEffect(() => {
    disptach(setInitialState());
  }, []);

  const handleClick = num => {
      setCurrentQuestionCount(prev => prev + 1, s => navigateTo(`q${s}`));
  };

  return (
    <>
      <h2>Welcome to Dog Winner</h2>
      <p>The only game on the internet where you can win a dog for each correct answer you give.</p>
      <Routes>
        <Route path={`q${currentQuestionCount}`} element={<Question data={questions[currentQuestionCount - 1]} />} />
      </Routes>
      <button onClick={handleClick}>Proceed</button>
    </>
  )

};

export default Landing;