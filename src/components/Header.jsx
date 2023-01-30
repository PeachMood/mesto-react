import React from 'react';

import headerLogo from '../images/headerLogo.svg';

export const Header = () => {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Место" />
    </header>
  );
};
