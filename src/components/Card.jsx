import React from 'react';

export const Card = ({ card, onCardClick }) => {
  const handleCardClick = () => onCardClick(card);

  return (
    <li className="card__element">
      <figure className="card">
        <button className="card__delete button" type="button" aria-label="Удалить карточку"></button>
        <div className="card__square">
          <img className="card__image" src={card?.link} alt={card?.name} onClick={handleCardClick} />
        </div>
        <figcaption className="card__caption">
          <h2 className="card__text">{card?.name}</h2>
          <div className="card__wrapper">
            <button className="card__like button" type="button" aria-label="Поставить лайк"></button>
            <span className="card__counter">{card?.likes.length}</span>
          </div>
        </figcaption>
      </figure>
    </li>
  );
};
