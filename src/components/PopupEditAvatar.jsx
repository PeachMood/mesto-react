import React, { useEffect, useRef } from 'react';

import { PopupWithForm } from './PopupWithForm';

export const PopupEditAvatar = ({ isOpen, isLoading, onClose, onUpdateAvatar }) => {
  const avatar = useRef(null);

  const handleSubmit = () => {
    onUpdateAvatar({ avatar: avatar.current.value })
  };

  useEffect(() => {
    if (!isOpen) {
      avatar.current.value = null;
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      formTitle="Обновить аватар"
      formName="avatar"
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
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
