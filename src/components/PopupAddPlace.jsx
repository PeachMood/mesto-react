import React, { useState } from 'react';

import { PopupWithForm } from './PopupWithForm';

export const PopupAddPlace = ({ isOpen, onClose, onAddPlace }) => {
  // Управляемые компоненты формы
  const [name, setName] = useState(null);
  const [link, setLink] = useState(null);

  const handleNameChange = (event) => {
    const updatedName = event.target.value;
    setName(updatedName);
  };

  const handleLinkChange = (event) => {
    const updatedLink = event.target.value;
    setLink(updatedLink);
  };

  const handleSubmit = () => {
    onAddPlace({ name, link });
  };

  return (
    <PopupWithForm formTitle="Новое место" formName="card" buttonText="Создать" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <label className="form__field">
        <input
          required
          id="place-input"
          name="name"
          className="form__input"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          value={name || ''}
          onChange={handleNameChange} />
        <span className="form__input-error place-input-error"></span>
      </label>
      <label className="form__field">
        <input
          required
          id="link-input"
          name="link"
          type="url"
          className="form__input"
          placeholder="Ссылка на картинку"
          value={link || ''}
          onChange={handleLinkChange} />
        <span className="form__input-error link-input-error"></span>
      </label>
    </PopupWithForm>
  );
};
