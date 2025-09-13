import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './ProductGrid.scss';

const ProductGrid = ({ products, isLoading, onAddToCart, onViewDetails }) => {
  if (isLoading) {
    return (
      <div className="product-grid">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="product-grid__skeleton">
            <div className="product-grid__skeleton-image" />
            <div className="product-grid__skeleton-content">
              <div className="product-grid__skeleton-line product-grid__skeleton-line--title" />
              <div className="product-grid__skeleton-line product-grid__skeleton-line--description" />
              <div className="product-grid__skeleton-line product-grid__skeleton-line--small" />
              <div className="product-grid__skeleton-footer">
                <div className="product-grid__skeleton-line product-grid__skeleton-line--price" />
                <div className="product-grid__skeleton-line product-grid__skeleton-line--button" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="product-grid__empty">
        <div className="product-grid__empty-icon">🔍</div>
        <h3 className="product-grid__empty-title">Товары не найдены</h3>
        <p className="product-grid__empty-description">
          Попробуйте изменить критерии поиска
        </p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};

export default ProductGrid;