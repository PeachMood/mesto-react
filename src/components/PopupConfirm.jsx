import React from 'react';

import { PopupWithForm } from './PopupWithForm';

export const PopupConfirm = ({ isOpen, onClose }) => {
  return (
    <PopupWithForm formTitle="Вы уверены?" formName="confirm" buttonText="Да" isOpen={isOpen} onClose={onClose} />
  );
};
