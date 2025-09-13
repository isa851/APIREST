const API_BASE_URL = 'https://api.escuelajs.co/api/v1';

export const fetchProducts = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products?limit=20`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const fetchCategories = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const fetchProductsByCategory = async (categoryId: number): Promise<any[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/?categoryId=${categoryId}&limit=20`);
    if (!response.ok) {
      throw new Error('Failed to fetch products by category');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
};