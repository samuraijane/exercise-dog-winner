import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setInitialState } from "../redux/actions";

const Landing = () => {

  const disptach = useDispatch();

  useEffect(() => {
    disptach(setInitialState());
  }, []);

  return (
    <p>Landing</p>
  )

};

export default Landing;