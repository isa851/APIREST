import React from 'react';
import { ShoppingCart, Search, Store } from 'lucide-react';
import './Header.scss';

const Header = ({ cartItemsCount, onCartClick, searchTerm, onSearchChange }) => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__content">
          <div className="header__logo">
            <div className="header__logo-icon">
              <Store className="header__logo-svg" />
            </div>
            <span className="header__logo-text">SHOPISKO</span>
          </div>

    
          <div className="header__search">
            <div className="header__search-wrapper">
              <div className="header__search-icon">
                <Search />
              </div>
              <input
                type="text"
                placeholder="Поиск товаров..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="header__search-input"
              />
            </div>
          </div>

          <button onClick={onCartClick} className="header__cart">
            <div className="header__cart-content">
              <ShoppingCart className="header__cart-icon" />
              <span className="header__cart-text">Корзина</span>
            </div>
            {cartItemsCount > 0 && (
              <span className="header__cart-badge">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;