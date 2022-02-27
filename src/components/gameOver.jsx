import { useEffect, useState } from "react";

const GameOver = ({ action, images }) => {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [validURLs, setValidURLs] = useState([]);

  useEffect(() => {
    const validImageURLs = images.filter(x => x && x !== 'wrong');
    setCorrectAnswers(validURLs.length);
    setValidURLs(validImageURLs);
  }, [correctAnswers, validURLs]);

  const winningImages = validURLs.map((winningImage, index) => {
    return (
      <li>
        <div className="image-container image-container--game-end">
          <img src={winningImage} />
        </div>
      </li>
    );
  });

  return (
    <>
      <p>Game Over</p>
      <button onClick={action}>New Game</button>
      {correctAnswers > 0 && (
        <>
          <h2>Congratulations!</h2>
          <p>You have won a total of {correctAnswers} dogs.</p>
          <ul className="winning-images-container">
            {winningImages}  
          </ul>
        </>
      )}
    </>
  )
};

export default GameOver;