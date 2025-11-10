import React, { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import CatalogHero from "@/components/layout/banner/CatalogHero";
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

interface CatalogStats {
  totalProducts: number;
  totalProviders: number;
  totalCategories: number;
}

const Catalogo = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [stats, setStats] = useState<CatalogStats>({
    totalProducts: 0,
    totalProviders: 0,
    totalCategories: 0
  });
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
    fetchStats();
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

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/catalog/stats');
      const data = await response.json();
      if (data.stats) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
      // Set default values if API fails
      setStats({
        totalProducts: products.length,
        totalProviders: new Set(products.map(p => p.provider.id)).size,
        totalCategories: categories.length
      });
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
      <CatalogHero
        totalProducts={stats.totalProducts}
        totalProviders={stats.totalProviders}
        totalCategories={stats.totalCategories}
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
                        <div className="product-card-b2b">
                          {/* Image Section with Overlay Info */}
                          <div className="product-card-b2b__image-wrapper">
                            <Link href={`/producto/${product.slug}`}>
                              <img
                                src={product.images?.[0]?.url || 'https://via.placeholder.com/400x280?text=Sin+Imagen'}
                                alt={product.images?.[0]?.alt || product.nombre}
                                className="product-card-b2b__image"
                              />
                            </Link>

                            {/* Badges Overlay */}
                            <div className="product-card-b2b__badges">
                              {product.pricing_mode === 'COTIZAR' ? (
                                <span className="badge-b2b badge-b2b--quote">
                                  <i className="fas fa-file-invoice-dollar"></i>
                                  Por cotización
                                </span>
                              ) : (
                                <>
                                  {product.stock > 0 ? (
                                    <span className="badge-b2b badge-b2b--stock">
                                      <i className="fas fa-check-circle"></i>
                                      En Stock
                                    </span>
                                  ) : (
                                    <span className="badge-b2b badge-b2b--out">
                                      <i className="fas fa-exclamation-circle"></i>
                                      Agotado
                                    </span>
                                  )}
                                </>
                              )}
                            </div>

                            {/* Quick Actions Overlay */}
                            <div className="product-card-b2b__quick-actions">
                              <button className="quick-action-btn" title="Vista rápida">
                                <i className="far fa-eye"></i>
                              </button>
                              <button className="quick-action-btn" title="Comparar">
                                <i className="far fa-balance-scale"></i>
                              </button>
                            </div>
                          </div>

                          {/* Content Section */}
                          <div className="product-card-b2b__content">
                            {/* Provider Badge */}
                            <div className="product-card-b2b__provider">
                              <i className="fas fa-industry"></i>
                              <span>{product.provider?.razon_social}</span>
                            </div>

                            {/* Category */}
                            <div className="product-card-b2b__category">
                              {product.category?.name}
                            </div>

                            {/* Title */}
                            <h3 className="product-card-b2b__title">
                              <Link href={`/producto/${product.slug}`}>
                                {product.nombre}
                              </Link>
                            </h3>

                            {/* Description */}
                            <p className="product-card-b2b__description">
                              {product.descripcion}
                            </p>

                            {/* Divider */}
                            <div className="product-card-b2b__divider"></div>

                            {/* Footer with Price and Action */}
                            <div className="product-card-b2b__footer">
                              <div className="product-card-b2b__price-section">
                                <span className="price-label">Precio</span>
                                <div className="price-info-row">
                                  <span className={`price-value ${product.pricing_mode === 'COTIZAR' ? 'price-value--quote' : ''}`}>
                                    {product.pricing_mode === 'PRECIO' ? (
                                      <>
                                        ${product.precio?.toLocaleString('es-MX')}
                                        <span className="price-currency">MXN</span>
                                      </>
                                    ) : (
                                      'Bajo cotización'
                                    )}
                                  </span>
                                  {product.stock > 0 && (
                                    <span className="stock-info">
                                      <i className="fas fa-box"></i>
                                      {product.stock} unidades
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="product-card-b2b__action">
                                {product.pricing_mode === 'PRECIO' ? (
                                  <button
                                    className="btn-b2b btn-b2b--primary"
                                    onClick={() => handleAddToCart(product)}
                                    disabled={addingToCart === product.id || product.stock === 0}
                                  >
                                    {addingToCart === product.id ? (
                                      <>
                                        <span className="spinner-border spinner-border-sm me-2" />
                                        Agregando...
                                      </>
                                    ) : (
                                      <>
                                        <i className="fas fa-shopping-cart"></i>
                                        <span>Agregar</span>
                                      </>
                                    )}
                                  </button>
                                ) : (
                                  <Link
                                    href={`/producto/${product.slug}`}
                                    className="btn-b2b btn-b2b--quote"
                                  >
                                    <i className="fas fa-file-invoice"></i>
                                    <span>Cotizar</span>
                                  </Link>
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

      {/* CTA Section - Ayuda y Asesoría */}
      <section className="catalog-cta__section py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div
                className="catalog-cta__card"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <div className="catalog-cta__content">
                  <div className="catalog-cta__icon">
                    <i className="fas fa-headset"></i>
                  </div>
                  <div className="catalog-cta__text">
                    <h3 className="catalog-cta__title">¿Necesitas ayuda para encontrar el producto ideal?</h3>
                    <p className="catalog-cta__description">
                      Nuestros asesores especializados están listos para ayudarte con cotizaciones personalizadas y recomendaciones técnicas
                    </p>
                  </div>
                  <div className="catalog-cta__action">
                    <Link href="/contact" className="btn-cta-catalog">
                      <i className="fas fa-comments me-2"></i>
                      Hablar con un asesor
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Catalogo;