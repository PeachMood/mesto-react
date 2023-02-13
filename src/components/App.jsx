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
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [trashedCard, setTrashedCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, initialCards]) => {
        setCurrentUser(userInfo);
        setCards(initialCards);
      })
      .catch(error => console.log(error));
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleClosePopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setTrashedCard(null);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    api.toggleLike(card._id, isLiked)
      .then(likedCard => {
        const updatedCards = cards.map(other => other._id === likedCard._id ? likedCard : other);
        setCards(updatedCards);
      })
      .catch(error => console.log(error));
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCardDelete = (card) => {
    setTrashedCard(card);
  };

  const handleUpdateProfile = (profile) => {
    setIsLoading(true);
    api.editUserInfo(profile)
      .then(updatedUser => {
        setCurrentUser(updatedUser);
        setIsEditProfilePopupOpen(false);
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  };

  const handleUpdateAvatar = (avatar) => {
    setIsLoading(true);
    api.editUserAvatar(avatar)
      .then(updatedUser => {
        setCurrentUser(updatedUser);
        setIsEditAvatarPopupOpen(false);
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  };

  const handleAddPlace = (card) => {
    setIsLoading(true);
    api.addCard(card)
      .then(addedCard => {
        setCards([addedCard, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  };

  const handleConfirmClick = (card) => {
    setIsLoading(true);
    const isOwn = card.owner._id === currentUser._id;
    if (isOwn) {
      api.deleteCard(card._id)
        .then(() => {
          const updatedCards = cards.filter(other => card._id !== other._id);
          setCards(updatedCards);
          setTrashedCard(null);
        })
        .catch(error => console.log(error))
        .finally(() => setIsLoading(false));
    }
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
          <PopupConfirm
            card={trashedCard}
            isLoading={isLoading}
            onClose={handleClosePopups}
            onConfirm={handleConfirmClick} />
          <PopupEditAvatar
            isOpen={isEditAvatarPopupOpen}
            isLoading={isLoading}
            onClose={handleClosePopups}
            onUpdateAvatar={handleUpdateAvatar} />
          <PopupEditProfile
            isOpen={isEditProfilePopupOpen}
            isLoading={isLoading}
            onClose={handleClosePopups}
            onUpdateUser={handleUpdateProfile} />
          <PopupAddPlace
            isOpen={isAddPlacePopupOpen}
            isLoading={isLoading}
            onClose={handleClosePopups}
            onAddPlace={handleAddPlace} />
          <ImagePopup
            card={selectedCard}
            onClose={handleClosePopups} />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}
