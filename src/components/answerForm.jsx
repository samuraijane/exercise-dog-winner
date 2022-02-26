import { useState } from "react";

const AnswerForm = ({ correctAnswer }) => {

  const [fieldValue, setFieldValue] = useState('');

  const handleChange = e => {
    const target = e.target.value;
    setFieldValue(target);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(fieldValue === correctAnswer);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} />
    </form>
  )
};

export default AnswerForm;