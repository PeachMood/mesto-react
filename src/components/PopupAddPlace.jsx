import React, { useEffect, useState } from 'react';

import { PopupWithForm } from './PopupWithForm';

export const PopupAddPlace = ({ isOpen, isLoading, onClose, onAddPlace }) => {
  const [name, setName] = useState(null);
  const [link, setLink] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setName(null);
      setLink(null);
    }
  }, [isOpen]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleSubmit = () => {
    onAddPlace({ name, link });
  };

  return (
    <PopupWithForm
      formTitle="Новое место"
      formName="card"
      buttonText={isLoading ? "Создание..." : "Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
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
