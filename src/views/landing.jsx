import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setInitialState } from "../redux/actions";

const Landing = () => {

  const disptach = useDispatch();

  useEffect(() => {
    disptach(setInitialState());
  }, []);

  const handleClick = () => {
    console.log('game start clicked');
  };

  return (
    <>
      <h2>Welcome to Dog Winner</h2>
      <p>The only game on the internet where you can win a dog for each correct answer you give.</p>
      <button onClick={handleClick}>Start Game</button>
    </>
  )

};

export default Landing;