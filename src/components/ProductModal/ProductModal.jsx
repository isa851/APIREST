import React, { useState } from "react";
import { X, ShoppingCart, Star, ChevronLeft, ChevronRight } from "lucide-react";
import "./ProductModal.scss";

const ProductModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !product) return null;

  const validImages = product.images.filter((img) => {
    try {
      const cleanUrl = img.replace(/['"]/g, "");
      new URL(cleanUrl);
      return true;
    } catch {
      return false;
    }
  });

  const images =
    validImages.length > 0
      ? validImages
      : [
          "https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
        ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="product-modal__backdrop" onClick={onClose} />

      <div className="product-modal">
        <div
          className="product-modal__container"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="product-modal__header">
            <h2 className="product-modal__title">Детали товара</h2>
            <button onClick={onClose} className="product-modal__close">
              <X />
            </button>
          </div>

          <div className="product-modal__content">
            <div className="product-modal__gallery">
              <div className="product-modal__main-image">
                <img
                  src={images[currentImageIndex]}
                  alt={product.title}
                  className="product-modal__image"
                />

                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="product-modal__nav product-modal__nav--prev"
                    >
                      <ChevronLeft />
                    </button>
                    <button
                      onClick={nextImage}
                      className="product-modal__nav product-modal__nav--next"
                    >
                      <ChevronRight />
                    </button>
                  </>
                )}
              </div>

              {images.length > 1 && (
                <div className="product-modal__thumbnails">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`product-modal__thumbnail ${
                        index === currentImageIndex
                          ? "product-modal__thumbnail--active"
                          : ""
                      }`}
                    >
                      <img src={image} alt="" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="product-modal__info">
              <div className="product-modal__category">
                {product.category.name}
              </div>

              <h1 className="product-modal__product-title">{product.title}</h1>

              <div className="product-modal__rating">
                <div className="product-modal__stars">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`product-modal__star ${
                        i < 4 ? "product-modal__star--filled" : ""
                      }`}
                    />
                  ))}
                </div>
                <span className="product-modal__rating-text">
                  (4.0) • 127 отзывов
                </span>
              </div>

              <div className="product-modal__price">${product.price}</div>

              <div className="product-modal__section">
                <h3 className="product-modal__section-title">Описание</h3>
                <p className="product-modal__description">
                  {product.description}
                </p>
              </div>

              <div className="product-modal__section">
                <h3 className="product-modal__section-title">Особенности</h3>
                <ul className="product-modal__features">
                  <li>• Высокое качество материалов</li>
                  <li>• Быстрая доставка</li>
                  <li>• Гарантия 1 год</li>
                  <li>• Бесплатный возврат</li>
                </ul>
              </div>

              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="product-modal__add-to-cart"
              >
                <ShoppingCart />
                <span>Добавить в корзину</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
