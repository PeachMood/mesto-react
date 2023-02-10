import React, { useEffect, useRef } from 'react';

export const PopupWithForm = ({ formTitle, formName, buttonText, isOpen, onClose, onSubmit, children }) => {
  const form = useRef(null);
  const popupClassName = `popup popup_${formName} popup_background_light ${isOpen && 'popup_opened'}`;

  useEffect(() => {
    if (!isOpen) {
      form.current.reset();
    }
  }, [isOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <section className={popupClassName}>
      <div className="popup__container">
        <button className="popup__close button" type="button" onClick={onClose} aria-label="Закрыть попап"></button>
        <form name={formName} className={`form form_${formName}`} onSubmit={handleSubmit} noValidate ref={form}>
          <h2 className="form__title">{formTitle}</h2>
          {children}
          <button className="form__submit button" type="submit">{buttonText}</button>
        </form>
      </div>
    </section>
  );
};
