import { create } from 'zustand';

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: 'Please fill in all fields' };
    }

    try {
      const res = await fetch(`/api/products/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, message: data.message || 'Failed to create product' };
      }

      set((state) => ({ products: [...state.products, data.product] }));
      return { success: true, message: 'Product created successfully' };
    } catch (err) {
      return { success: false, message: err.message || 'Network error' };
    }
  },

  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);
      set({ products: data.products });
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  },

  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`/api/products/${pid}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, message: data.message || 'Failed to delete product' };
      }

      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));

      return { success: true, message: "Product deleted successfully" };
    } catch (err) {
      return { success: false, message: err.message || 'Network error' };
    }
  },

  updateProduct: async (pid, updatedProduct) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, message: data.message || 'Failed to update product' };
      }

      // Ensure updated product keeps its _id
      const updatedWithId = { ...updatedProduct, _id: pid };

      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? updatedWithId : product
        ),
      }));

      return { success: true, message: "Product updated successfully" };
    } catch (err) {
      return { success: false, message: err.message || 'Network error' };
    }
  },
}));
