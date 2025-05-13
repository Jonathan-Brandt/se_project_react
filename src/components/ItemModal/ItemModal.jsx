import "./ItemModal.css";

function ItemModal({ activeModal, closeModal, card, handleDeleteItem }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={closeModal}
          type="button"
          className="modal__close modal__close__item"
        ></button>

        <img src={card.imageUrl} alt="clothing item" className="modal__image" />
        <div className="modal__footer">
          <div className="modal__text-content">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <div className="modal__button">
            <button className="modal__delete__item" onClick={handleDeleteItem}>
              Delete item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
