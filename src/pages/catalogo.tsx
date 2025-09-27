import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import Banner from "@/components/layout/banner/Banner";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/router";

interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number | null;
  pricing_mode: 'PRECIO' | 'COTIZAR';
  stock: number;
  slug: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  provider: {
    id: string;
    razon_social: string;
  };
  images: Array<{
    id: string;
    url: string;
    alt: string;
  }>;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const Catalogo = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    categoria: '',
    busqueda: '',
    pricing_mode: ''
  });
  const { addToCart } = useCart();
  const router = useRouter();
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [filters]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      if (data.categories) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (filters.categoria) queryParams.append('category', filters.categoria);
      if (filters.busqueda) queryParams.append('search', filters.busqueda);
      if (filters.pricing_mode) queryParams.append('pricing_mode', filters.pricing_mode);

      const response = await fetch(`/api/products?${queryParams.toString()}`);
      const data = await response.json();

      if (data.products) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleAddToCart = async (product: Product) => {
    try {
      setAddingToCart(product.id);
      await addToCart(product.id, 1);
      // Mostrar notificación de éxito (opcional)
      alert('Producto agregado al carrito');
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      alert('Error al agregar el producto al carrito');
    } finally {
      setAddingToCart(null);
    }
  };

  return (
    <Layout header={1} footer={1}>
      <Banner 
        title="Catálogo AMCI"
        subtitle="Encuentra los mejores productos de nuestros proveedores certificados"
        bg="bg-primary"
      />
      
      <section className="catalog__area pt-120 pb-80">
        <div className="container">
          <div className="row">
            {/* Filtros */}
            <div className="col-xl-3 col-lg-4">
              <div className="sidebar__widget mb-40">
                <h3 className="sidebar__widget-title">Filtros</h3>
                
                {/* Búsqueda */}
                <div className="sidebar__widget-content">
                  <div className="search__widget mb-30">
                    <input
                      type="text"
                      placeholder="Buscar productos..."
                      value={filters.busqueda}
                      onChange={(e) => handleFilterChange('busqueda', e.target.value)}
                    />
                  </div>
                  
                  {/* Categoría */}
                  <div className="filter__group mb-30">
                    <h5>Categoría</h5>
                    <select
                      className="form-select"
                      value={filters.categoria}
                      onChange={(e) => handleFilterChange('categoria', e.target.value)}
                    >
                      <option value="">Todas las categorías</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.slug}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Tipo de precio */}
                  <div className="filter__group mb-30">
                    <h5>Disponibilidad</h5>
                    <select
                      className="form-select"
                      value={filters.pricing_mode}
                      onChange={(e) => handleFilterChange('pricing_mode', e.target.value)}
                    >
                      <option value="">Todos</option>
                      <option value="PRECIO">Con precio</option>
                      <option value="COTIZAR">Solo cotizar</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Productos */}
            <div className="col-xl-9 col-lg-8">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                  <p className="mt-2">Cargando productos...</p>
                </div>
              ) : (
                <>
                  <div className="catalog__results mb-40">
                    <h4>Mostrando {products.length} productos</h4>
                  </div>

                  <div className="row">
                    {products.map(product => (
                      <div key={product.id} className="col-xl-4 col-md-6 mb-40">
                        <div className="product__item card h-100">
                          <div className="product__thumb">
                            <img
                              src={product.images?.[0]?.url || 'https://via.placeholder.com/300x200?text=Sin+Imagen'}
                              alt={product.images?.[0]?.alt || product.nombre}
                              className="card-img-top"
                              style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <div className="product__badges">
                              {product.pricing_mode === 'COTIZAR' && (
                                <span className="badge bg-warning">Cotizar</span>
                              )}
                              {product.stock > 0 && product.pricing_mode === 'PRECIO' && (
                                <span className="badge bg-success">En stock</span>
                              )}
                            </div>
                          </div>

                          <div className="card-body d-flex flex-column">
                            <div className="product__content flex-grow-1">
                              <span className="product__category text-muted small">
                                {product.category?.name} • {product.provider?.razon_social}
                              </span>
                              <h5 className="product__title mt-2">
                                <a href={`/producto/${product.slug}`}>
                                  {product.nombre}
                                </a>
                              </h5>
                              <p className="product__desc text-muted">
                                {product.descripcion}
                              </p>
                            </div>

                            <div className="product__meta mt-auto">
                              <div className="product__price mb-3">
                                {product.pricing_mode === 'PRECIO' ? (
                                  <span className="current-price h5 text-primary">
                                    ${product.precio?.toLocaleString('es-MX')} MXN
                                  </span>
                                ) : (
                                  <span className="quote-price h5 text-warning">
                                    Solicitar cotización
                                  </span>
                                )}
                              </div>

                              <div className="product__btn">
                                {product.pricing_mode === 'PRECIO' ? (
                                  <button
                                    className="btn btn-primary w-100"
                                    onClick={() => handleAddToCart(product)}
                                    disabled={addingToCart === product.id}
                                  >
                                    {addingToCart === product.id ? (
                                      <>
                                        <span className="spinner-border spinner-border-sm me-2" />
                                        Agregando...
                                      </>
                                    ) : (
                                      <>
                                        <i className="fal fa-shopping-cart me-2"></i>
                                        Agregar al carrito
                                      </>
                                    )}
                                  </button>
                                ) : (
                                  <a
                                    href={`/producto/${product.slug}`}
                                    className="btn btn-outline-warning w-100"
                                  >
                                    <i className="fal fa-envelope me-2"></i>
                                    Solicitar cotización
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {products.length === 0 && (
                    <div className="text-center py-5">
                      <h4>No se encontraron productos</h4>
                      <p>Intenta ajustar los filtros de búsqueda</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Catalogo;