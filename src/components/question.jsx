const Question = ({ data }) => {
  const { answer, id, question } = data;
  return (
    <>
      <p><span>Question</span>{question}</p>
    </>
  )
};

export default Question;