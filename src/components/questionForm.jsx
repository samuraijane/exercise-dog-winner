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
      <div className="question-block">
        <label>{question}</label>
        <input onChange={handleChange} />
      </div>
      <button>Submit</button>
    </form>
  )
};

export default QuestionForm;