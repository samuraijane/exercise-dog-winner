const Modal = ({ imageURL, message }) => {
  return (
    <div className="modal">
      {imageURL && (
        <div className="modal__image-container">
          <img src={imageURL} />
        </div>
      )}
      <div className="modal__message">
        <p>{message}</p>
      </div>
    </div>
  )
};

export default Modal;