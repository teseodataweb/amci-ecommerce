import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/router';

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  variant_data?: any;
  bundle_data?: any;
  product?: {
    id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    pricing_mode: 'PRECIO' | 'COTIZAR';
    emisor_factura: 'AMCI' | 'PROVEEDOR';
    stock: number;
    slug: string;
    provider?: {
      id: string;
      razon_social: string;
    };
    images?: Array<{
      id: string;
      url: string;
      alt: string;
    }>;
  };
}

interface CartContextType {
  items: CartItem[];
  loading: boolean;
  addToCart: (productId: string, quantity?: number, variantData?: any) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
  getCartCount: () => number;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  // Verificar sesión de usuario
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        await fetchCart();
      } else {
        // Si no hay usuario, usar localStorage
        loadLocalCart();
      }
      setLoading(false);
    };

    checkUser();

    // Suscribirse a cambios de autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        // Sincronizar carrito local con la base de datos
        await syncLocalCartToDb();
        await fetchCart();
      } else {
        loadLocalCart();
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Cargar carrito desde localStorage
  const loadLocalCart = () => {
    const localCart = localStorage.getItem('cart');
    if (localCart) {
      setItems(JSON.parse(localCart));
    }
  };

  // Guardar carrito en localStorage
  const saveLocalCart = (items: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(items));
  };

  // Sincronizar carrito local con la base de datos al iniciar sesión
  const syncLocalCartToDb = async () => {
    const localCart = localStorage.getItem('cart');
    if (localCart) {
      const items = JSON.parse(localCart);
      for (const item of items) {
        await addToCartDb(item.product_id, item.quantity, item.variant_data);
      }
      localStorage.removeItem('cart');
    }
  };

  // Obtener carrito desde la base de datos
  const fetchCart = async () => {
    if (!user) return;

    try {
      console.log('Fetching cart for user:', user.id);

      // Primero obtener los items del carrito
      const { data: cartItems, error: cartError } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id);

      if (cartError) {
        console.error('Error fetching cart items:', cartError);
        throw cartError;
      }

      console.log('Cart items found:', cartItems?.length || 0);

      if (!cartItems || cartItems.length === 0) {
        setItems([]);
        return;
      }

      // Obtener los detalles de los productos por separado
      const productIds = cartItems.map(item => item.product_id);

      const { data: products, error: productsError } = await supabase
        .from('products')
        .select(`
          *,
          provider:providers(id, razon_social),
          images:product_images(id, url, alt)
        `)
        .in('id', productIds);

      if (productsError) {
        console.error('Error fetching product details:', productsError);
        throw productsError;
      }

      // Combinar los datos del carrito con los detalles del producto
      const enrichedItems = cartItems.map(cartItem => ({
        ...cartItem,
        product: products?.find(p => p.id === cartItem.product_id) || null
      }));

      console.log('Enriched cart items:', enrichedItems.length);
      setItems(enrichedItems);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setItems([]);
    }
  };

  // Agregar al carrito en la base de datos
  const addToCartDb = async (productId: string, quantity: number = 1, variantData?: any) => {
    if (!user) return;

    try {
      // Verificar si el producto ya está en el carrito
      const { data: existing, error: selectError } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .maybeSingle(); // Usar maybeSingle() en lugar de single() para evitar error 406

      if (selectError) {
        console.error('Error checking existing cart item:', selectError);
        throw selectError;
      }

      if (existing) {
        // Actualizar cantidad
        console.log('Updating existing cart item');
        const { error } = await supabase
          .from('cart_items')
          .update({
            quantity: existing.quantity + quantity,
            variant_data: variantData || existing.variant_data
          })
          .eq('id', existing.id);

        if (error) throw error;
      } else {
        // Agregar nuevo item
        console.log('Adding new cart item');
        const { error } = await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            product_id: productId,
            quantity,
            variant_data: variantData
          });

        if (error) throw error;
      }

      await fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  // Agregar al carrito (maneja tanto usuario autenticado como no autenticado)
  const addToCart = async (productId: string, quantity: number = 1, variantData?: any) => {
    if (user) {
      await addToCartDb(productId, quantity, variantData);
    } else {
      // Obtener información del producto
      const { data: product } = await supabase
        .from('products')
        .select(`
          *,
          provider:providers!inner(
            id,
            razon_social
          ),
          images:product_images(
            id,
            url,
            alt
          )
        `)
        .eq('id', productId)
        .single();

      if (!product) return;

      // Agregar al carrito local
      const existingIndex = items.findIndex(item => item.product_id === productId);

      if (existingIndex >= 0) {
        const newItems = [...items];
        newItems[existingIndex].quantity += quantity;
        setItems(newItems);
        saveLocalCart(newItems);
      } else {
        const newItem: CartItem = {
          id: `local-${Date.now()}`,
          product_id: productId,
          quantity,
          variant_data: variantData,
          product
        };
        const newItems = [...items, newItem];
        setItems(newItems);
        saveLocalCart(newItems);
      }
    }
  };

  // Eliminar del carrito
  const removeFromCart = async (itemId: string) => {
    if (user && !itemId.startsWith('local-')) {
      try {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('id', itemId);

        if (error) throw error;
        await fetchCart();
      } catch (error) {
        console.error('Error removing from cart:', error);
      }
    } else {
      const newItems = items.filter(item => item.id !== itemId);
      setItems(newItems);
      saveLocalCart(newItems);
    }
  };

  // Actualizar cantidad
  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) return;

    if (user && !itemId.startsWith('local-')) {
      try {
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity })
          .eq('id', itemId);

        if (error) throw error;
        await fetchCart();
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    } else {
      const newItems = items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
      setItems(newItems);
      saveLocalCart(newItems);
    }
  };

  // Limpiar carrito
  const clearCart = async () => {
    if (user) {
      try {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id);

        if (error) throw error;
        setItems([]);
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    } else {
      setItems([]);
      localStorage.removeItem('cart');
    }
  };

  // Calcular total del carrito
  const getCartTotal = () => {
    return items.reduce((total, item) => {
      const price = item.product?.precio || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  // Contar items en el carrito
  const getCartCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  // Refrescar carrito
  const refreshCart = async () => {
    if (user) {
      await fetchCart();
    } else {
      loadLocalCart();
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        refreshCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};