import React, { useEffect, useState } from 'react';

import { api } from '../utils/api';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { PopupEditAvatar } from './PopupEditAvatar';
import { PopupEditProfile } from './PopupEditProfile';
import { PopupAddPlace } from './PopupAddPlace';
import { PopupConfirm } from './PopupConfirm';
import { ImagePopup } from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export const App = () => {
  // Глобальные состояния с данными о пользователями и карточками
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, initialCards]) => {
        setCurrentUser(userInfo);
        setCards(initialCards);
      })
      .catch(error => console.log(error));
  }, []);

  // Состояния для отображения попапов
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  };

  const handleCardClick = (card) => {
    setSelectedCard(card)
  };

  const handleClosePopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  };

  // Функции для обработки действий над карточками
  const handleCardLike = (card) => {
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    api.toggleLike(card._id, isLiked)
      .then(likedCard => {
        const updatedCards = cards.map(other => other._id === likedCard._id ? likedCard : other);
        setCards(updatedCards);
      })
      .catch(error => console.log(error));
  };

  const handleCardDelete = (card) => {
    const isOwn = card.owner._id === currentUser._id;
    if (isOwn) {
      api.deleteCard(card._id)
        .then(() => {
          const updatedCards = cards.filter(other => card._id !== other._id);
          setCards(updatedCards);
        })
        .catch(error => console.log(error));
    }
  }

  // Функции для обработки submit'ов форм
  const handleUpdateProfile = (profile) => {
    api.editUserInfo(profile)
      .then(user => {
        setCurrentUser(user);
        setIsEditProfilePopupOpen(false);
      })
      .catch(error => console.log(error));
  };

  const handleUpdateAvatar = (avatar) => {
    api.editUserAvatar(avatar)
      .then(user => {
        setCurrentUser(user);
        setIsEditAvatarPopupOpen(false);
      })
      .catch(error => console.log(error));
  };

  const handleAddPlace = (card) => {
    api.addCard(card)
      .then(addedCard => {
        setCards([addedCard, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="page">
      <div className="content">
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <Main
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete} />
          <Footer />
          <PopupConfirm />
          <PopupEditAvatar
            isOpen={isEditAvatarPopupOpen}
            onClose={handleClosePopups}
            onUpdateAvatar={handleUpdateAvatar} />
          <PopupEditProfile
            isOpen={isEditProfilePopupOpen}
            onClose={handleClosePopups}
            onUpdateUser={handleUpdateProfile} />
          <PopupAddPlace
            isOpen={isAddPlacePopupOpen}
            onClose={handleClosePopups}
            onAddPlace={handleAddPlace} />
          <ImagePopup card={selectedCard} onClose={handleClosePopups} />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}
