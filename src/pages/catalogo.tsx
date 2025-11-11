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

// Helper functions para generar placeholders de texto
const getProductInitials = (productName: string): string => {
  const words = productName.trim().split(' ').filter(word => word.length > 0);

  if (words.length === 1) {
    // Si es una sola palabra, tomar las primeras 2 letras
    return words[0].substring(0, 2).toUpperCase();
  } else {
    // Si son múltiples palabras, tomar la primera letra de las primeras 3 palabras
    return words
      .slice(0, 3)
      .map(word => word[0])
      .join('')
      .toUpperCase();
  }
};

const getColorFromString = (str: string): string => {
  // Generar un color consistente basado en el hash del string
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Definir una paleta de colores profesionales para productos industriales
  const colors = [
    'linear-gradient(135deg, #0446F0 0%, #0338C0 100%)', // Azul
    'linear-gradient(135deg, #10B981 0%, #059669 100%)', // Verde
    'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', // Naranja
    'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)', // Púrpura
    'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)', // Rojo
    'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)', // Cyan
    'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)', // Índigo
    'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)', // Rosa
    'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)', // Teal
    'linear-gradient(135deg, #F97316 0%, #EA580C 100%)', // Naranja oscuro
  ];

  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

const ProductPlaceholder = ({ productName, className }: { productName: string; className?: string }) => {
  const initials = getProductInitials(productName);
  const backgroundColor = getColorFromString(productName);

  return (
    <div
      className={className}
      style={{
        background: backgroundColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        color: '#ffffff',
        fontSize: 'clamp(2rem, 4vw, 3.5rem)',
        fontWeight: '700',
        letterSpacing: '0.05em',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
        userSelect: 'none'
      }}
    >
      {initials}
    </div>
  );
};

const Catalogo = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [providers, setProviders] = useState<Array<{id: string; nombre_comercial: string}>>([]);
  const [stats, setStats] = useState<CatalogStats>({
    totalProducts: 0,
    totalProviders: 0,
    totalCategories: 0
  });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    categoria: '',
    busqueda: '',
    pricing_mode: '',
    sortBy: 'nombre-asc',
    minPrice: '',
    maxPrice: '',
    providers: [] as string[],
    inStockOnly: false
  });
  const { addToCart } = useCart();
  const router = useRouter();
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const [collapsedSections, setCollapsedSections] = useState<{[key: string]: boolean}>({});
  const [providersDropdownOpen, setProvidersDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [pricingDropdownOpen, setPricingDropdownOpen] = useState(false);

  // Quick view and compare states
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [compareProducts, setCompareProducts] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  // Detectar si estamos en vista móvil/tableta e inicializar filtros cerrados
  useEffect(() => {
    const checkMobileView = () => {
      const isMobile = window.innerWidth < 992; // 992px es el breakpoint lg de Bootstrap
      setIsMobileView(isMobile);

      // Si es móvil/tableta, cerrar todos los filtros
      if (isMobile) {
        setCollapsedSections({
          search: true,
          sort: true,
          category: true,
          pricing: true,
          priceRange: true,
          providers: true,
          availability: true
        });
      }
    };

    checkMobileView();
    window.addEventListener('resize', checkMobileView);

    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchProviders();
    fetchProducts();
    fetchStats();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [filters.categoria, filters.busqueda, filters.pricing_mode]);

  useEffect(() => {
    applyClientSideFilters();
  }, [products, filters.sortBy, filters.minPrice, filters.maxPrice, filters.providers, filters.inStockOnly]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.custom-multi-select') && !target.closest('.custom-single-select')) {
        setProvidersDropdownOpen(false);
        setSortDropdownOpen(false);
        setCategoryDropdownOpen(false);
        setPricingDropdownOpen(false);
      }
    };

    if (providersDropdownOpen || sortDropdownOpen || categoryDropdownOpen || pricingDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [providersDropdownOpen, sortDropdownOpen, categoryDropdownOpen, pricingDropdownOpen]);

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

  const fetchProviders = async () => {
    try {
      const response = await fetch('/api/providers');
      const data = await response.json();
      if (data.providers) {
        setProviders(data.providers);
      }
    } catch (error) {
      console.error('Error al cargar proveedores:', error);
    }
  };

  const applyClientSideFilters = () => {
    let filtered = [...products];

    // Filter by providers
    if (filters.providers.length > 0) {
      filtered = filtered.filter(p => filters.providers.includes(p.provider.id));
    }

    // Filter by price range (only for products with prices)
    if (filters.minPrice) {
      const minPrice = parseFloat(filters.minPrice);
      filtered = filtered.filter(p => p.precio === null || p.precio >= minPrice);
    }
    if (filters.maxPrice) {
      const maxPrice = parseFloat(filters.maxPrice);
      filtered = filtered.filter(p => p.precio === null || p.precio <= maxPrice);
    }

    // Filter by stock availability
    if (filters.inStockOnly) {
      filtered = filtered.filter(p => p.stock > 0);
    }

    // Sort products
    switch (filters.sortBy) {
      case 'nombre-asc':
        filtered.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      case 'nombre-desc':
        filtered.sort((a, b) => b.nombre.localeCompare(a.nombre));
        break;
      case 'precio-asc':
        filtered.sort((a, b) => {
          if (a.precio === null) return 1;
          if (b.precio === null) return -1;
          return a.precio - b.precio;
        });
        break;
      case 'precio-desc':
        filtered.sort((a, b) => {
          if (a.precio === null) return 1;
          if (b.precio === null) return -1;
          return b.precio - a.precio;
        });
        break;
      case 'stock-desc':
        filtered.sort((a, b) => b.stock - a.stock);
        break;
    }

    setFilteredProducts(filtered);
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

  const handleFilterChange = (key: string, value: string | boolean | string[]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleProviderToggle = (providerId: string) => {
    setFilters(prev => ({
      ...prev,
      providers: prev.providers.includes(providerId)
        ? prev.providers.filter(id => id !== providerId)
        : [...prev.providers, providerId]
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      categoria: '',
      busqueda: '',
      pricing_mode: '',
      sortBy: 'nombre-asc',
      minPrice: '',
      maxPrice: '',
      providers: [],
      inStockOnly: false
    });
  };

  const removeFilter = (filterKey: string, value?: string) => {
    if (filterKey === 'providers' && value) {
      handleProviderToggle(value);
    } else if (filterKey === 'priceRange') {
      setFilters(prev => ({ ...prev, minPrice: '', maxPrice: '' }));
    } else {
      setFilters(prev => ({ ...prev, [filterKey]: filterKey === 'inStockOnly' ? false : '' }));
    }
  };

  const toggleSection = (section: string) => {
    setCollapsedSections(prev => {
      const isCurrentlyOpen = !prev[section]; // En el JSX se usa !collapsedSections, entonces false/undefined = abierto

      // Si la sección ya está abierta, cerrarla
      if (isCurrentlyOpen) {
        return {
          ...prev,
          [section]: true // true = cerrado
        };
      }

      // En móvil/tableta: comportamiento acordeón (solo una sección abierta)
      if (isMobileView) {
        const allSections = ['search', 'sort', 'category', 'pricing', 'priceRange', 'providers', 'availability'];
        const newState: {[key: string]: boolean} = {};
        allSections.forEach(sec => {
          newState[sec] = sec === section ? false : true; // false = abierto, true = cerrado
        });
        return newState;
      }

      // En desktop: permitir múltiples secciones abiertas
      return {
        ...prev,
        [section]: false // false = abierto
      };
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.categoria) count++;
    if (filters.busqueda) count++;
    if (filters.pricing_mode) count++;
    if (filters.minPrice || filters.maxPrice) count++;
    if (filters.providers.length > 0) count += filters.providers.length;
    if (filters.inStockOnly) count++;
    return count;
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

  // Quick View functionality
  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
    document.body.style.overflow = 'unset';
  };

  // Compare functionality
  const handleCompare = (productId: string) => {
    setCompareProducts(prev => {
      if (prev.includes(productId)) {
        // Remove from comparison
        return prev.filter(id => id !== productId);
      } else {
        // Add to comparison (max 4 products)
        if (prev.length >= 4) {
          alert('Máximo 4 productos para comparar');
          return prev;
        }
        return [...prev, productId];
      }
    });
  };

  const clearComparison = () => {
    setCompareProducts([]);
  };

  const goToComparison = () => {
    if (compareProducts.length < 2) {
      alert('Selecciona al menos 2 productos para comparar');
      return;
    }
    setShowCompareModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeCompareModal = () => {
    setShowCompareModal(false);
    document.body.style.overflow = 'unset';
  };

  const getCompareProductsData = (): Product[] => {
    return products.filter(p => compareProducts.includes(p.id));
  };

  return (
    <Layout header={1} footer={1}>
      <CatalogHero
        totalProducts={stats.totalProducts}
        totalProviders={stats.totalProviders}
        totalCategories={stats.totalCategories}
      />

      <section className="catalog__area pt-60 pb-80">
        <div className="container">
          {/* Results Counter */}
          {!loading && (
            <div className="catalog__results mb-40">
              <div className="results-info">
                <h4>
                  <i className="fas fa-box-open"></i>
                  Mostrando {filteredProducts.length} de {products.length} productos
                </h4>
                {getActiveFiltersCount() > 0 && (
                  <p className="results-note">
                    {getActiveFiltersCount()} filtro{getActiveFiltersCount() > 1 ? 's' : ''} activo{getActiveFiltersCount() > 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="row">
            {/* Filtros Avanzados */}
            <div className="col-xl-3 col-lg-4">
              <div className="sidebar__widget mb-40">
                <div className="sidebar__widget-header">
                  <h3 className="sidebar__widget-title">
                    <i className="fas fa-filter"></i>
                    Filtros
                    {getActiveFiltersCount() > 0 && (
                      <span className="filter-count-badge">{getActiveFiltersCount()}</span>
                    )}
                  </h3>
                  {getActiveFiltersCount() > 0 && (
                    <button className="clear-all-btn" onClick={clearAllFilters}>
                      <i className="fas fa-times-circle"></i>
                      Limpiar todo
                    </button>
                  )}
                </div>

                {/* Active Filters Display */}
                {getActiveFiltersCount() > 0 && (
                  <div className="active-filters-section">
                    <div className="active-filters-chips">
                      {filters.busqueda && (
                        <span className="filter-chip">
                          <span className="filter-chip-label">
                            <i className="fas fa-search"></i>
                            {filters.busqueda}
                          </span>
                          <button onClick={() => removeFilter('busqueda')}>
                            <i className="fas fa-times"></i>
                          </button>
                        </span>
                      )}
                      {filters.categoria && (
                        <span className="filter-chip">
                          <span className="filter-chip-label">
                            <i className="fas fa-tag"></i>
                            {categories.find(c => c.slug === filters.categoria)?.name}
                          </span>
                          <button onClick={() => removeFilter('categoria')}>
                            <i className="fas fa-times"></i>
                          </button>
                        </span>
                      )}
                      {filters.pricing_mode && (
                        <span className="filter-chip">
                          <span className="filter-chip-label">
                            <i className="fas fa-dollar-sign"></i>
                            {filters.pricing_mode === 'PRECIO' ? 'Con precio' : 'Cotización'}
                          </span>
                          <button onClick={() => removeFilter('pricing_mode')}>
                            <i className="fas fa-times"></i>
                          </button>
                        </span>
                      )}
                      {(filters.minPrice || filters.maxPrice) && (
                        <span className="filter-chip">
                          <span className="filter-chip-label">
                            <i className="fas fa-dollar-sign"></i>
                            {filters.minPrice && `$${filters.minPrice}`}
                            {filters.minPrice && filters.maxPrice && ' - '}
                            {filters.maxPrice && `$${filters.maxPrice}`}
                          </span>
                          <button onClick={() => removeFilter('priceRange')}>
                            <i className="fas fa-times"></i>
                          </button>
                        </span>
                      )}
                      {filters.providers.map(providerId => {
                        const provider = providers.find(p => p.id === providerId);
                        return provider ? (
                          <span key={providerId} className="filter-chip">
                            <span className="filter-chip-label">
                              <i className="fas fa-industry"></i>
                              {provider.nombre_comercial}
                            </span>
                            <button onClick={() => removeFilter('providers', providerId)}>
                              <i className="fas fa-times"></i>
                            </button>
                          </span>
                        ) : null;
                      })}
                      {filters.inStockOnly && (
                        <span className="filter-chip">
                          <span className="filter-chip-label">
                            <i className="fas fa-box"></i>
                            En stock
                          </span>
                          <button onClick={() => removeFilter('inStockOnly')}>
                            <i className="fas fa-times"></i>
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="sidebar__widget-content">
                  {/* Búsqueda */}
                  <div className="filter__group-collapsible">
                    <button
                      className="filter__group-header"
                      onClick={() => toggleSection('search')}
                    >
                      <div className="filter__group-title">
                        <i className="fas fa-search"></i>
                        <h5>Búsqueda</h5>
                      </div>
                      <i className={`fas fa-chevron-${collapsedSections.search ? 'down' : 'up'}`}></i>
                    </button>
                    {!collapsedSections.search && (
                      <div className="filter__group-content">
                        <div className="search__widget-advanced">
                          <input
                            type="text"
                            placeholder="Buscar productos..."
                            value={filters.busqueda}
                            onChange={(e) => handleFilterChange('busqueda', e.target.value)}
                          />
                          <i className="fas fa-search search-icon"></i>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Ordenar */}
                  <div className="filter__group-collapsible">
                    <button
                      className="filter__group-header"
                      onClick={() => toggleSection('sort')}
                    >
                      <div className="filter__group-title">
                        <i className="fas fa-sort"></i>
                        <h5>Ordenar por</h5>
                      </div>
                      <i className={`fas fa-chevron-${collapsedSections.sort ? 'down' : 'up'}`}></i>
                    </button>
                    {!collapsedSections.sort && (
                      <div className="filter__group-content">
                        <div className="custom-single-select">
                          <button
                            type="button"
                            className="custom-single-select__trigger"
                            onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                          >
                            <span className="custom-single-select__text">
                              {filters.sortBy === 'nombre-asc' && 'Nombre (A-Z)'}
                              {filters.sortBy === 'nombre-desc' && 'Nombre (Z-A)'}
                              {filters.sortBy === 'precio-asc' && 'Precio (Menor a Mayor)'}
                              {filters.sortBy === 'precio-desc' && 'Precio (Mayor a Menor)'}
                              {filters.sortBy === 'stock-desc' && 'Mayor Stock'}
                            </span>
                            <i className={`fas fa-chevron-${sortDropdownOpen ? 'up' : 'down'}`}></i>
                          </button>
                          {sortDropdownOpen && (
                            <div className="custom-single-select__dropdown">
                              <button
                                className={`custom-single-select__option ${filters.sortBy === 'nombre-asc' ? 'active' : ''}`}
                                onClick={() => { handleFilterChange('sortBy', 'nombre-asc'); setSortDropdownOpen(false); }}
                              >
                                Nombre (A-Z)
                              </button>
                              <button
                                className={`custom-single-select__option ${filters.sortBy === 'nombre-desc' ? 'active' : ''}`}
                                onClick={() => { handleFilterChange('sortBy', 'nombre-desc'); setSortDropdownOpen(false); }}
                              >
                                Nombre (Z-A)
                              </button>
                              <button
                                className={`custom-single-select__option ${filters.sortBy === 'precio-asc' ? 'active' : ''}`}
                                onClick={() => { handleFilterChange('sortBy', 'precio-asc'); setSortDropdownOpen(false); }}
                              >
                                Precio (Menor a Mayor)
                              </button>
                              <button
                                className={`custom-single-select__option ${filters.sortBy === 'precio-desc' ? 'active' : ''}`}
                                onClick={() => { handleFilterChange('sortBy', 'precio-desc'); setSortDropdownOpen(false); }}
                              >
                                Precio (Mayor a Menor)
                              </button>
                              <button
                                className={`custom-single-select__option ${filters.sortBy === 'stock-desc' ? 'active' : ''}`}
                                onClick={() => { handleFilterChange('sortBy', 'stock-desc'); setSortDropdownOpen(false); }}
                              >
                                Mayor Stock
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Categoría */}
                  <div className="filter__group-collapsible">
                    <button
                      className="filter__group-header"
                      onClick={() => toggleSection('category')}
                    >
                      <div className="filter__group-title">
                        <i className="fas fa-tag"></i>
                        <h5>Categoría</h5>
                      </div>
                      <i className={`fas fa-chevron-${collapsedSections.category ? 'down' : 'up'}`}></i>
                    </button>
                    {!collapsedSections.category && (
                      <div className="filter__group-content">
                        <div className="custom-single-select">
                          <button
                            type="button"
                            className="custom-single-select__trigger"
                            onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                          >
                            <span className="custom-single-select__text">
                              {filters.categoria
                                ? categories.find(c => c.slug === filters.categoria)?.name || 'Todas las categorías'
                                : 'Todas las categorías'
                              }
                            </span>
                            <i className={`fas fa-chevron-${categoryDropdownOpen ? 'up' : 'down'}`}></i>
                          </button>
                          {categoryDropdownOpen && (
                            <div className="custom-single-select__dropdown">
                              <button
                                className={`custom-single-select__option ${filters.categoria === '' ? 'active' : ''}`}
                                onClick={() => { handleFilterChange('categoria', ''); setCategoryDropdownOpen(false); }}
                              >
                                Todas las categorías
                              </button>
                              {categories.map(cat => (
                                <button
                                  key={cat.id}
                                  className={`custom-single-select__option ${filters.categoria === cat.slug ? 'active' : ''}`}
                                  onClick={() => { handleFilterChange('categoria', cat.slug); setCategoryDropdownOpen(false); }}
                                >
                                  {cat.name}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Tipo de precio */}
                  <div className="filter__group-collapsible">
                    <button
                      className="filter__group-header"
                      onClick={() => toggleSection('pricing')}
                    >
                      <div className="filter__group-title">
                        <i className="fas fa-dollar-sign"></i>
                        <h5>Modalidad de Precio</h5>
                      </div>
                      <i className={`fas fa-chevron-${collapsedSections.pricing ? 'down' : 'up'}`}></i>
                    </button>
                    {!collapsedSections.pricing && (
                      <div className="filter__group-content">
                        <div className="custom-single-select">
                          <button
                            type="button"
                            className="custom-single-select__trigger"
                            onClick={() => setPricingDropdownOpen(!pricingDropdownOpen)}
                          >
                            <span className="custom-single-select__text">
                              {filters.pricing_mode === '' && 'Todos'}
                              {filters.pricing_mode === 'PRECIO' && 'Con precio'}
                              {filters.pricing_mode === 'COTIZAR' && 'Solo cotizar'}
                            </span>
                            <i className={`fas fa-chevron-${pricingDropdownOpen ? 'up' : 'down'}`}></i>
                          </button>
                          {pricingDropdownOpen && (
                            <div className="custom-single-select__dropdown">
                              <button
                                className={`custom-single-select__option ${filters.pricing_mode === '' ? 'active' : ''}`}
                                onClick={() => { handleFilterChange('pricing_mode', ''); setPricingDropdownOpen(false); }}
                              >
                                Todos
                              </button>
                              <button
                                className={`custom-single-select__option ${filters.pricing_mode === 'PRECIO' ? 'active' : ''}`}
                                onClick={() => { handleFilterChange('pricing_mode', 'PRECIO'); setPricingDropdownOpen(false); }}
                              >
                                Con precio
                              </button>
                              <button
                                className={`custom-single-select__option ${filters.pricing_mode === 'COTIZAR' ? 'active' : ''}`}
                                onClick={() => { handleFilterChange('pricing_mode', 'COTIZAR'); setPricingDropdownOpen(false); }}
                              >
                                Solo cotizar
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Rango de precio */}
                  <div className="filter__group-collapsible">
                    <button
                      className="filter__group-header"
                      onClick={() => toggleSection('priceRange')}
                    >
                      <div className="filter__group-title">
                        <i className="fas fa-dollar-sign"></i>
                        <h5>Rango de Precio</h5>
                      </div>
                      <i className={`fas fa-chevron-${collapsedSections.priceRange ? 'down' : 'up'}`}></i>
                    </button>
                    {!collapsedSections.priceRange && (
                      <div className="filter__group-content">
                        <div className="price-range-inputs">
                          <input
                            type="number"
                            placeholder="Precio mínimo"
                            value={filters.minPrice}
                            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                            className="price-input"
                          />
                          <span className="price-separator">-</span>
                          <input
                            type="number"
                            placeholder="Precio máximo"
                            value={filters.maxPrice}
                            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                            className="price-input"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Proveedores */}
                  <div className="filter__group-collapsible">
                    <button
                      className="filter__group-header"
                      onClick={() => toggleSection('providers')}
                    >
                      <div className="filter__group-title">
                        <i className="fas fa-industry"></i>
                        <h5>Proveedores</h5>
                        {filters.providers.length > 0 && (
                          <span className="filter-count">({filters.providers.length})</span>
                        )}
                      </div>
                      <i className={`fas fa-chevron-${collapsedSections.providers ? 'down' : 'up'}`}></i>
                    </button>
                    {!collapsedSections.providers && (
                      <div className="filter__group-content">
                        <div className="custom-multi-select">
                          <button
                            type="button"
                            className="custom-multi-select__trigger"
                            onClick={() => setProvidersDropdownOpen(!providersDropdownOpen)}
                          >
                            <span className="custom-multi-select__text">
                              {filters.providers.length === 0
                                ? 'Seleccionar proveedores'
                                : `${filters.providers.length} proveedor${filters.providers.length > 1 ? 'es' : ''} seleccionado${filters.providers.length > 1 ? 's' : ''}`
                              }
                            </span>
                            <i className={`fas fa-chevron-${providersDropdownOpen ? 'up' : 'down'}`}></i>
                          </button>
                          {providersDropdownOpen && (
                            <div className="custom-multi-select__dropdown">
                              {providers.map(provider => (
                                <label key={provider.id} className="custom-multi-select__option">
                                  <input
                                    type="checkbox"
                                    checked={filters.providers.includes(provider.id)}
                                    onChange={() => handleProviderToggle(provider.id)}
                                  />
                                  <span className="checkbox-custom"></span>
                                  <span className="checkbox-label">{provider.nombre_comercial}</span>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Disponibilidad */}
                  <div className="filter__group-collapsible">
                    <button
                      className="filter__group-header"
                      onClick={() => toggleSection('availability')}
                    >
                      <div className="filter__group-title">
                        <i className="fas fa-box"></i>
                        <h5>Disponibilidad</h5>
                      </div>
                      <i className={`fas fa-chevron-${collapsedSections.availability ? 'down' : 'up'}`}></i>
                    </button>
                    {!collapsedSections.availability && (
                      <div className="filter__group-content">
                        <label className="checkbox-item">
                          <input
                            type="checkbox"
                            checked={filters.inStockOnly}
                            onChange={(e) => handleFilterChange('inStockOnly', e.target.checked)}
                          />
                          <span className="checkbox-custom"></span>
                          <span className="checkbox-label">Solo productos en stock</span>
                        </label>
                      </div>
                    )}
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
                  <div className="row">
                    {filteredProducts.map(product => (
                      <div key={product.id} className="col-xl-4 col-md-6 mb-40">
                        <div
                          className="product-card-b2b"
                          onClick={() => router.push(`/producto/${product.slug}`)}
                          style={{ cursor: 'pointer' }}
                        >
                          {/* Image Section with Overlay Info */}
                          <div className="product-card-b2b__image-wrapper">
                            <ProductPlaceholder
                              productName={product.nombre}
                              className="product-card-b2b__image"
                            />

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
                              <button
                                className="quick-action-btn"
                                title="Vista rápida"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleQuickView(product);
                                }}
                              >
                                <i className="far fa-eye"></i>
                              </button>
                              <button
                                className={`quick-action-btn ${compareProducts.includes(product.id) ? 'active' : ''}`}
                                title="Comparar"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCompare(product.id);
                                }}
                              >
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
                              {product.nombre}
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
                                  {product.pricing_mode === 'COTIZAR' ? (
                                    <span className="stock-info stock-info--quote">
                                      <i className="fas fa-file-invoice-dollar"></i>
                                      Según cotización
                                    </span>
                                  ) : (
                                    product.stock > 0 && (
                                      <span className="stock-info">
                                        <i className="fas fa-box"></i>
                                        {product.stock} unidades
                                      </span>
                                    )
                                  )}
                                </div>
                              </div>

                              <div className="product-card-b2b__action">
                                {product.pricing_mode === 'PRECIO' ? (
                                  <button
                                    className="btn-b2b btn-b2b--primary"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleAddToCart(product);
                                    }}
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
                                    href={{
                                      pathname: '/cotizar',
                                      query: {
                                        producto: product.nombre,
                                        productoId: product.id,
                                        categoria: product.category.name,
                                        proveedor: product.provider.razon_social
                                      }
                                    }}
                                    className="btn-b2b btn-b2b--quote"
                                    onClick={(e) => e.stopPropagation()}
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

                  {filteredProducts.length === 0 && (
                    <div className="text-center py-5">
                      <div className="no-results-message">
                        <i className="fas fa-search fa-3x mb-3 text-muted"></i>
                        <h4>No se encontraron productos</h4>
                        <p>Intenta ajustar los filtros de búsqueda</p>
                        {getActiveFiltersCount() > 0 && (
                          <button className="btn-clear-filters mt-3" onClick={clearAllFilters}>
                            <i className="fas fa-redo"></i>
                            Limpiar todos los filtros
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Ayuda y Asesoría */}
      <style jsx>{`
        @keyframes ctaPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 12px 40px rgba(4, 70, 240, 0.25);
          }
          50% {
            transform: scale(1.02);
            box-shadow: 0 16px 50px rgba(4, 70, 240, 0.35);
          }
        }

        @keyframes shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 200%;
          }
        }

        @keyframes buttonPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .cta-animated {
          animation: ctaPulse 3s ease-in-out infinite;
          position: relative;
          overflow: hidden;
        }

        .cta-animated::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          animation: shimmer 4s infinite;
          animation-delay: 1s;
        }

        .cta-button-primary {
          animation: buttonPulse 2s ease-in-out infinite;
        }
      `}</style>
      <section
        className="catalog-cta__section"
        style={{
          background: '#ffffff',
          position: 'relative',
          paddingTop: '60px',
          paddingBottom: '60px'
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div
                className="cta__content cta-animated"
                style={{
                  background: 'radial-gradient(ellipse at top, rgba(4, 70, 240, 0.95) 0%, rgba(3, 56, 192, 0.98) 25%, rgba(1, 31, 92, 1) 100%)',
                  borderRadius: '24px',
                  padding: '40px 60px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '40px',
                  flexWrap: 'wrap'
                }}
                data-aos="fade-up"
              >
                {/* Left content */}
                <div className="cta-content-wrapper">
                  <div className="cta-icon-box">
                    <i className="fal fa-headset"></i>
                  </div>
                  <div className="cta-text-box">
                    <h2 className="cta__title">
                      ¿Necesitas ayuda para encontrar el producto ideal?
                    </h2>
                    <p className="cta__description">
                      Nuestros asesores especializados están listos para ayudarte con cotizaciones personalizadas y recomendaciones técnicas
                    </p>
                  </div>
                </div>

                {/* Right buttons */}
                <div className="cta__buttons">
                  <Link
                    href="/contact"
                    className="cta-button-primary"
                    style={{
                      background: '#ffffff',
                      color: '#0446F0',
                      padding: '14px 28px',
                      borderRadius: '12px',
                      fontSize: '15px',
                      fontWeight: '600',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      border: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    <i className="fal fa-comments"></i>
                    Hablar con un asesor
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="quick-view-modal" onClick={closeQuickView}>
          <div className="quick-view-modal__content" onClick={(e) => e.stopPropagation()}>
            <button className="quick-view-modal__close" onClick={closeQuickView}>
              <i className="fas fa-times"></i>
            </button>

            <div className="row g-4">
              <div className="col-lg-6">
                <div className="quick-view-modal__image">
                  <ProductPlaceholder productName={quickViewProduct.nombre} />
                </div>

                {/* Información adicional del producto */}
                <div className="product-extra-info">
                  <div className="extra-info-item">
                    <i className="fas fa-barcode"></i>
                    <div className="extra-info-content">
                      <span className="extra-info-label">Código del producto</span>
                      <span className="extra-info-value">SKU-{quickViewProduct.id.padStart(6, '0')}</span>
                    </div>
                  </div>

                  <div className="extra-info-item">
                    <i className="fas fa-box"></i>
                    <div className="extra-info-content">
                      <span className="extra-info-label">Unidad de venta</span>
                      <span className="extra-info-value">
                        {(() => {
                          const nombre = quickViewProduct.nombre.toLowerCase();
                          if (nombre.includes('cemento') || nombre.includes('mortero')) return 'Saco / Bulto';
                          if (nombre.includes('concreto premezclado')) return 'Metro cúbico (m³)';
                          if (nombre.includes('cable') || nombre.includes('alambrón')) return 'Rollo / Metro';
                          if (nombre.includes('varilla') || nombre.includes('tubo')) return 'Pieza / Metro';
                          if (nombre.includes('malla')) return 'Panel / Metro cuadrado';
                          return 'Pieza individual';
                        })()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="quick-view-modal__info">
                  {/* Badge de modo de precio */}
                  {quickViewProduct.pricing_mode === 'COTIZAR' && (
                    <div className="pricing-mode-badge">
                      <i className="fas fa-file-invoice-dollar"></i>
                      Producto bajo cotización
                    </div>
                  )}

                  {/* Título del producto */}
                  <h2 className="product-title">{quickViewProduct.nombre}</h2>

                  {/* Proveedor y Categoría */}
                  <div className="product-meta-simple">
                    <div className="meta-column">
                      <span className="meta-title">
                        <i className="fas fa-industry"></i>
                        Proveedor
                      </span>
                      <span className="meta-badge">
                        {quickViewProduct.provider?.razon_social}
                      </span>
                    </div>
                    <div className="meta-column">
                      <span className="meta-title">
                        <i className="fas fa-tags"></i>
                        Categoría
                      </span>
                      <span className="meta-badge">
                        {quickViewProduct.category?.name}
                      </span>
                    </div>
                  </div>

                  {/* Descripción */}
                  <div className="product-description-section">
                    <h4 className="section-title">
                      <i className="fas fa-align-left"></i>
                      Descripción del producto
                    </h4>
                    <p className="description-text">{quickViewProduct.descripcion}</p>
                  </div>

                  <div className="quick-view-divider"></div>

                  {/* Precio y Stock */}
                  <div className="price-stock-section">
                    <div className="price-block">
                      <span className="block-label">Precio unitario</span>
                      <div className={`price-display ${quickViewProduct.pricing_mode === 'COTIZAR' ? 'price-display--quote' : ''}`}>
                        {quickViewProduct.pricing_mode === 'PRECIO' ? (
                          <>
                            <span className="currency">$</span>
                            <span className="amount">{quickViewProduct.precio?.toLocaleString('es-MX')}</span>
                            <span className="currency-code">MXN</span>
                          </>
                        ) : (
                          <span className="quote-text">Bajo cotización</span>
                        )}
                      </div>
                    </div>

                    {quickViewProduct.pricing_mode === 'PRECIO' && (
                      <div className="stock-block">
                        <span className="block-label">Disponibilidad</span>
                        <div className={`stock-display ${quickViewProduct.stock > 0 ? 'stock-display--available' : 'stock-display--out'}`}>
                          <i className={`fas ${quickViewProduct.stock > 0 ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                          <span>{quickViewProduct.stock > 0 ? `${quickViewProduct.stock} unidades disponibles` : 'Producto agotado'}</span>
                        </div>
                      </div>
                    )}

                    {quickViewProduct.pricing_mode === 'COTIZAR' && (
                      <div className="stock-block">
                        <span className="block-label">Disponibilidad</span>
                        <div className="stock-display stock-display--quote">
                          <i className="fas fa-file-invoice-dollar"></i>
                          <span>Según cotización</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Botones de acción */}
                  <div className="quick-view-modal__actions">
                    {quickViewProduct.pricing_mode === 'PRECIO' ? (
                      quickViewProduct.stock > 0 && (
                        <button
                          className="action-btn action-btn--cart"
                          onClick={() => {
                            handleAddToCart(quickViewProduct);
                            closeQuickView();
                          }}
                          disabled={addingToCart === quickViewProduct.id}
                        >
                          <i className="fas fa-shopping-cart"></i>
                          <span>{addingToCart === quickViewProduct.id ? 'Agregando...' : 'Agregar al carrito'}</span>
                        </button>
                      )
                    ) : (
                      <Link
                        href={{
                          pathname: '/cotizar',
                          query: {
                            producto: quickViewProduct.nombre,
                            productoId: quickViewProduct.id,
                            categoria: quickViewProduct.category.name,
                            proveedor: quickViewProduct.provider.razon_social
                          }
                        }}
                        className="action-btn action-btn--quote"
                      >
                        <i className="fas fa-file-invoice-dollar"></i>
                        <span>Solicitar cotización</span>
                      </Link>
                    )}

                    <Link href={`/producto/${quickViewProduct.slug}`} className="action-btn action-btn--details">
                      <i className="fas fa-info-circle"></i>
                      <span>Ver detalles completos</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compare Modal */}
      {showCompareModal && (
        <div className="compare-modal" onClick={closeCompareModal}>
          <div className="compare-modal__content" onClick={(e) => e.stopPropagation()}>
            <button className="compare-modal__close" onClick={closeCompareModal}>
              <i className="fas fa-times"></i>
            </button>

            <div className="compare-modal__header">
              <h2>
                <i className="fas fa-balance-scale"></i>
                Comparación de Productos
              </h2>
              <p>Comparando {getCompareProductsData().length} productos seleccionados</p>
            </div>

            <div className="compare-modal__scroll-container">
              <div className="compare-modal__table-wrapper">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th className="compare-table__label">Característica</th>
                    {getCompareProductsData().map(product => (
                      <th key={product.id} className="compare-table__product">
                        <div className="compare-product-header">
                          <div style={{ width: '150px', height: '150px' }}>
                            <ProductPlaceholder productName={product.nombre} />
                          </div>
                          <h4>{product.nombre}</h4>
                          <button
                            className="remove-from-compare"
                            onClick={() => handleCompare(product.id)}
                            title="Quitar de comparación"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="compare-table__label">Proveedor</td>
                    {getCompareProductsData().map(product => (
                      <td key={product.id}>
                        <span className="compare-value">
                          <i className="fas fa-industry"></i>
                          {product.provider?.razon_social}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="compare-table__label">Categoría</td>
                    {getCompareProductsData().map(product => (
                      <td key={product.id}>
                        <span className="compare-badge">{product.category?.name}</span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="compare-table__label">Descripción</td>
                    {getCompareProductsData().map(product => (
                      <td key={product.id}>
                        <p className="compare-description">{product.descripcion}</p>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="compare-table__label">Precio</td>
                    {getCompareProductsData().map(product => (
                      <td key={product.id}>
                        <span className={`compare-price ${product.pricing_mode === 'COTIZAR' ? 'compare-price--quote' : ''}`}>
                          {product.pricing_mode === 'PRECIO' ? (
                            <>
                              ${product.precio?.toLocaleString('es-MX')}
                              <small>MXN</small>
                            </>
                          ) : (
                            'Bajo cotización'
                          )}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="compare-table__label">Disponibilidad</td>
                    {getCompareProductsData().map(product => (
                      <td key={product.id}>
                        {product.pricing_mode === 'PRECIO' ? (
                          <span className={`compare-stock ${product.stock > 0 ? 'compare-stock--available' : 'compare-stock--out'}`}>
                            <i className={`fas ${product.stock > 0 ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                            {product.stock > 0 ? `${product.stock} unidades` : 'Agotado'}
                          </span>
                        ) : (
                          <span className="compare-value">Consultar</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="compare-table__label">Acciones</td>
                    {getCompareProductsData().map(product => (
                      <td key={product.id}>
                        <div className="compare-actions">
                          <Link href={`/producto/${product.slug}`} className="compare-btn compare-btn--primary">
                            <i className="far fa-eye"></i>
                            Ver detalles
                          </Link>
                          {product.pricing_mode === 'PRECIO' ? (
                            product.stock > 0 && (
                              <button
                                className="compare-btn compare-btn--secondary"
                                onClick={() => handleAddToCart(product)}
                                disabled={addingToCart === product.id}
                              >
                                <i className="fas fa-shopping-cart"></i>
                                {addingToCart === product.id ? 'Agregando...' : 'Al carrito'}
                              </button>
                            )
                          ) : (
                            <Link
                              href={{
                                pathname: '/cotizar',
                                query: {
                                  producto: product.nombre,
                                  productoId: product.id,
                                  categoria: product.category.name,
                                  proveedor: product.provider.razon_social
                                }
                              }}
                              className="compare-btn compare-btn--quote"
                            >
                              <i className="fas fa-file-invoice-dollar"></i>
                              Solicitar cotización
                            </Link>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compare Bar */}
      {compareProducts.length > 0 && (
        <div className="compare-bar">
          <div className="container">
            <div className="compare-bar__content">
              <div className="compare-bar__info">
                <i className="fas fa-balance-scale"></i>
                <span>
                  <strong>{compareProducts.length}</strong> producto{compareProducts.length > 1 ? 's' : ''} seleccionado{compareProducts.length > 1 ? 's' : ''} para comparar
                </span>
                {compareProducts.length > 0 && (
                  <span className="compare-bar__hint">
                    Haz clic en <i className="far fa-balance-scale"></i> en las tarjetas para añadir/quitar productos
                  </span>
                )}
              </div>

              <div className="compare-bar__actions">
                <button className="compare-bar__btn compare-bar__btn--clear" onClick={clearComparison}>
                  <i className="fas fa-trash-alt"></i>
                  Limpiar todo
                </button>
                <button
                  className="compare-bar__btn compare-bar__btn--compare"
                  onClick={goToComparison}
                  disabled={compareProducts.length < 2}
                >
                  <i className="fas fa-columns"></i>
                  Ver comparación ({compareProducts.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Catalogo;