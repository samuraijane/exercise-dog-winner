import AnswerForm from "./answerForm";

const Question = ({ data }) => {
  const { answer, id, question } = data;
  return (
    <>
      <p><span>Question</span>{question}</p>
      <AnswerForm correctAnswer={answer} />
    </>
  )
};

export default Question;