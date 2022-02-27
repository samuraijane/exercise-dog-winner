import { useState } from "react";

const QuestionForm = ({ action, count, data }) => {
  const { answer, question } = data;

  const [fieldValue, setFieldValue] = useState('');

  const handleChange = e => {
    const target = e.target.value;
    setFieldValue(target);
  };

  return (
    <form onSubmit={e => action(e, answer === fieldValue)}>
      <label>{question}</label>
      <input onChange={handleChange} />
      <button>Submit</button>
    </form>
  )
};

export default QuestionForm;