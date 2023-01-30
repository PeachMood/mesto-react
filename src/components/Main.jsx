import React, { useState, useEffect } from 'react';

import { Card } from './Card';
import { api } from '../utils/api';

export const Main = ({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) => {
  const [userName, setUserName] = useState(null);
  const [userDescription, setUserDescription] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, initialCards]) => {
        setUserName(userInfo.name);
        setUserDescription(userInfo.about);
        setUserAvatar(userInfo.avatar);
        setCards(initialCards);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})` }} onClick={onEditAvatar} aria-label="Обновить аватар"></div>
          <div className="profile__info">
            <div className="profile__name-wrapper">
              <h1 className="profile__name">{userName}</h1>
              <button className="profile__edit button" type="button" onClick={onEditProfile} aria-label="Редактировать профиль"></button>
            </div>
            <p className="profile__about">{userDescription}</p>
          </div>
        </div>
        <button className="profile__add button" type="button" onClick={onAddPlace} aria-label="Создать карточку"></button>
      </section>
      <section className="cards" aria-label="Карточки">
        <ul className="cards__container">
          {cards.map(card => <Card key={card._id} card={card} onCardClick={onCardClick} />)}
        </ul>
      </section>
    </main>
  );
};
