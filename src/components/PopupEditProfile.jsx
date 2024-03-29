import React, { useContext, useState, useEffect } from 'react';

import { PopupWithForm } from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export const PopupEditProfile = ({ isOpen, isLoading, onClose, onUpdateUser }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(null);
  const [about, setAbout] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setName(currentUser?.name);
      setAbout(currentUser?.about);
    }
  }, [isOpen, currentUser]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAboutChange = (event) => {
    setAbout(event.target.value);
  };

  const handleSubmit = () => {
    onUpdateUser({ name, about });
  };

  return (
    <PopupWithForm
      formTitle="Редактировать профиль"
      formName="profile"
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <label className="form__field">
        <input
          required
          id="name-input"
          name="name"
          className="form__input"
          placeholder="Ваше имя"
          minLength="2"
          maxLength="40"
          value={name || ''}
          onChange={handleNameChange} />
        <span className="form__input-error name-input-error"></span>
      </label>
      <label className="form__field">
        <input
          required
          id="about-input"
          name="about"
          className="form__input"
          placeholder="Расскажите о себе"
          minLength="2"
          maxLength="200"
          value={about || ''}
          onChange={handleAboutChange} />
        <span className="form__input-error about-input-error"></span>
      </label>
    </PopupWithForm>
  );
};
