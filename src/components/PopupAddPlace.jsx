import React from 'react';

import { PopupWithForm } from './PopupWithForm';

export const PopupAddPlace = ({ isOpen, onClose }) => {
  return (
    <PopupWithForm formTitle="Новое место" formName="card" buttonText="Создать" isOpen={isOpen} onClose={onClose}>
      <label className="form__field">
        <input id="place-input" name="name" className="form__input" placeholder="Название" required minLength="2"
          maxLength="30" />
        <span className="form__input-error place-input-error"></span>
      </label>
      <label className="form__field">
        <input id="link-input" name="link" type="url" className="form__input" placeholder="Ссылка на картинку" required />
        <span className="form__input-error link-input-error"></span>
      </label>
    </PopupWithForm>
  );
};
