function Card(props) {
  const { card, handleOpenPopup, imageComponent } = props;
  const { name, link, isLiked } = card;

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt=""
        onClick={() => handleOpenPopup(imageComponent)}
      />
      <button
        aria-label="Eliminar tarjeta"
        className="card__delete-button"
        type="button"
      ></button>
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Botón Me gusta"
          className={`card__like-button ${isLiked ? "card__like-button_is-active" : ""}`}
          type="button"
        ></button>
      </div>
    </li>
  );
}

export default Card;
