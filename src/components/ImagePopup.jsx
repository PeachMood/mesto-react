import React from 'react';

export const ImagePopup = ({ card, onClose }) => {
  let popupClassName = 'popup popup_figure popup_background_dark';
  if (card) {
    popupClassName += ' popup_opened';
  }

  return (
    <section className={popupClassName}>
      <div className="popup__container">
        <button className="popup__close button" type="button" onClick={onClose} aria-label="Закрыть попап"></button>
        <figure className="figure">
          <img className="figure__image figure__image_size_large" src={card?.link} alt={card?.name} />
          <figcaption className="figure__caption">
            <h2 className="figure__text">{card?.name}</h2>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};
