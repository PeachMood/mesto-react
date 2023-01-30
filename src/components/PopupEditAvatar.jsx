import React from 'react';

import { PopupWithForm } from './PopupWithForm';

export const PopupEditAvatar = ({ isOpen, onClose }) => {
  return (
    <PopupWithForm formTitle="Обновить аватар" formName="avatar" buttonText="Сохранить" isOpen={isOpen} onClose={onClose}>
      <label className="form__field">
        <input id="avatar-input" name="avatar" type="url" className="form__input" placeholder="Ссылка на картинку" required />
        <span className="form__input-error avatar-input-error"></span>
      </label>
    </PopupWithForm>
  );
};
