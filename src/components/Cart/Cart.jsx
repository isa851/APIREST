import React from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import './Cart.scss';

const Cart = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  totalPrice,
  onClearCart
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="cart__backdrop" onClick={onClose} />
      
      {/* Cart Panel */}
      <div className="cart">
        {/* Header */}
        <div className="cart__header">
          <h2 className="cart__title">Корзина покупок</h2>
          <button onClick={onClose} className="cart__close">
            <X />
          </button>
        </div>

        {/* Cart Items */}
        <div className="cart__content">
          {cartItems.length === 0 ? (
            <div className="cart__empty">
              <div className="cart__empty-icon">🛒</div>
              <h3 className="cart__empty-title">Корзина пуста</h3>
              <p className="cart__empty-description">
                Добавьте товары для покупки
              </p>
            </div>
          ) : (
            <div className="cart__items">
              {cartItems.map((item) => (
                <div key={item.product.id} className="cart__item">
                  <img
                    src={item.product.images[0]?.replace(/['"]/g, '') || 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop'}
                    alt={item.product.title}
                    className="cart__item-image"
                  />
                  
                  <div className="cart__item-details">
                    <h4 className="cart__item-title">
                      {item.product.title}
                    </h4>
                    <p className="cart__item-price">${item.product.price}</p>
                    
                    {/* Quantity Controls */}
                    <div className="cart__item-quantity">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="cart__quantity-btn"
                      >
                        <Minus />
                      </button>
                      <span className="cart__quantity-value">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="cart__quantity-btn"
                      >
                        <Plus />
                      </button>
                    </div>
                  </div>
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="cart__item-remove"
                  >
                    <Trash2 />
                  </button>
                </div>
              ))}
              
              {/* Clear Cart Button */}
              {cartItems.length > 0 && (
                <button onClick={onClearCart} className="cart__clear">
                  Очистить корзину
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="cart__footer">
            <div className="cart__total">
              <span className="cart__total-label">Итого:</span>
              <span className="cart__total-price">${totalPrice.toFixed(2)}</span>
            </div>
            
            <button className="cart__checkout">
              Оформить заказ
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;