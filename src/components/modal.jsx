const Modal = ({ imageURL, message }) => {
  console.log(imageURL, message)
  return (
    <div>
      {imageURL && (
        <div className="image-container">
          <img src={imageURL} />
        </div>
      )}
      <p>{message}</p>
    </div>
  )
};

export default Modal;