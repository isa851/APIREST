import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header/Header';
import CategoryFilter from './components/CategoryFilter/CategoryFilter';
import ProductGrid from './components/ProductGrid/ProductGrid';
import Cart from './components/Cart/Cart';
import ProductModal from './components/ProductModal/ProductModal';
import Toast from './components/Toast/Toast';
import { useCart } from './hooks/useCart';
import { fetchProducts, fetchCategories, fetchProductsByCategory } from './services/api';
import './styles/global.scss';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState({ message: '', isVisible: false });

  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    clearCart,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      setIsCategoriesLoading(true);
      
      try {
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories()
        ]);
        
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setIsLoading(false);
        setIsCategoriesLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Load products by category
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const productsData = selectedCategory 
          ? await fetchProductsByCategory(selectedCategory)
          : await fetchProducts();
        
        setProducts(productsData);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [selectedCategory]);

  // Filter products by search term
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products;
    
    const term = searchTerm.toLowerCase();
    return products.filter(product =>
      product.title.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term) ||
      product.category.name.toLowerCase().includes(term)
    );
  }, [products, searchTerm]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setToast({
      message: 'Товар добавлен в корзину!',
      isVisible: true
    });
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleCloseToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  return (
    <div className="app">
      <Header
        cartItemsCount={getTotalItems()}
        onCartClick={() => setIsCartOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <main className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        {/* Hero Section */}
        <div className="text-center" style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#111827', marginBottom: '0.5rem' }}>
            Добро пожаловать в <span className="text-gradient">ModernShop</span>
          </h1>
          <p style={{ color: '#6b7280', fontSize: '1.125rem', margin: 0 }}>
            Откройте для себя лучшие товары по невероятным ценам
          </p>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          isLoading={isCategoriesLoading}
        />

        {/* Products Grid */}
        <ProductGrid
          products={filteredProducts}
          isLoading={isLoading}
          onAddToCart={handleAddToCart}
          onViewDetails={handleViewDetails}
        />
      </main>

      {/* Cart Sidebar */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        totalPrice={getTotalPrice()}
        onClearCart={clearCart}
      />

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
      />

      {/* Toast Notifications */}
      <Toast
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={handleCloseToast}
      />
    </div>
  );
}

export default App;