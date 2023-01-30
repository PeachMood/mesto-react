import React from 'react';

import { PopupWithForm } from './PopupWithForm';

export const PopupEditProfile = ({ isOpen, onClose }) => {
  return (
    <PopupWithForm formTitle="Редактировать профиль" formName="profile" buttonText="Сохранить" isOpen={isOpen} onClose={onClose}>
      <label className="form__field">
        <input id="name-input" name="name" className="form__input" placeholder="Ваше имя" required minLength="2"
          maxLength="40" />
        <span className="form__input-error name-input-error"></span>
      </label>
      <label className="form__field">
        <input id="about-input" name="about" className="form__input" placeholder="Расскажите о себе" required
          minLength="2" maxLength="200" />
        <span className="form__input-error about-input-error"></span>
      </label>
    </PopupWithForm>
  );
};