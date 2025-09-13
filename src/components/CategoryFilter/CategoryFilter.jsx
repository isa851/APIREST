import React from 'react';
import './CategoryFilter.scss';

const CategoryFilter = ({ categories, selectedCategory, onCategorySelect, isLoading }) => {
  if (isLoading) {
    return (
      <div className="category-filter">
        <div className="category-filter__loading">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="category-filter__skeleton" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="category-filter">
      <div className="category-filter__list">
        <button
          onClick={() => onCategorySelect(null)}
          className={`category-filter__item ${
            selectedCategory === null ? 'category-filter__item--active' : ''
          }`}
        >
          Все товары
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`category-filter__item ${
              selectedCategory === category.id ? 'category-filter__item--active' : ''
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;