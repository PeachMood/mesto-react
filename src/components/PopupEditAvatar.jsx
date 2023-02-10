import React, { useRef } from 'react';

import { PopupWithForm } from './PopupWithForm';

export const PopupEditAvatar = ({ isOpen, onClose, onUpdateAvatar }) => {
  const avatar = useRef(null);

  const handleSubmit = () => {
    onUpdateAvatar({ avatar: avatar.current.value })
  };

  return (
    <PopupWithForm
      formTitle="Обновить аватар"
      formName="avatar"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <label className="form__field">
        <input
          required
          id="avatar-input"
          name="avatar"
          type="url"
          className="form__input"
          placeholder="Ссылка на картинку"
          ref={avatar} />
        <span className="form__input-error avatar-input-error"></span>
      </label>
    </PopupWithForm>
  );
};
