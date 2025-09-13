import React, { useState } from 'react';
import { ShoppingCart, Eye, Star } from 'lucide-react';
import './ProductCard.scss';

const ProductCard = ({ product, onAddToCart, onViewDetails }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = () => setImageError(true);

  const getValidImageUrl = (images) => {
    if (!images || images.length === 0) return 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop';
    
    const firstImage = images[0];
    try {
      const cleanUrl = firstImage.replace(/['"]/g, '');
      new URL(cleanUrl);
      return cleanUrl;
    } catch {
      return 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop';
    }
  };

  const imageUrl = imageError 
    ? 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' 
    : getValidImageUrl(product.images);

  return (
    <div className="product-card">

      <div className="product-card__image-container">
        {!imageLoaded && !imageError && (
          <div className="product-card__image-skeleton" />
        )}
        <img
          src={imageUrl}
          alt={product.title}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`product-card__image ${imageLoaded ? 'product-card__image--loaded' : ''}`}
        />
        
    
        <div className="product-card__overlay">
          <button
            onClick={() => onViewDetails(product)}
            className="product-card__action product-card__action--view"
          >
            <Eye />
          </button>
          <button
            onClick={() => onAddToCart(product)}
            className="product-card__action product-card__action--cart"
          >
            <ShoppingCart />
          </button>
        </div>

        <div className="product-card__badge">
          {product.category.name}
        </div>
      </div>

  
      <div className="product-card__content">
        <h3 className="product-card__title">
          {product.title}
        </h3>
        
        <p className="product-card__description">
          {product.description}
        </p>

      
        <div className="product-card__rating">
          <div className="product-card__stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`product-card__star ${
                  i < 4 ? 'product-card__star--filled' : ''
                }`}
              />
            ))}
          </div>
          <span className="product-card__rating-text">(4.0)</span>
        </div>

        <div className="product-card__footer">
          <div className="product-card__price">
            ${product.price}
          </div>
          
          <button
            onClick={() => onAddToCart(product)}
            className="product-card__add-to-cart"
          >
            <ShoppingCart />
            <span>В корзину</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;