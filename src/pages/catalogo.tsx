import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import Banner from "@/components/layout/banner/Banner";

interface Product {
  id: number;
  nombre: string;
  categoria: string;
  proveedor: string;
  precio: number | null;
  precio_modo: 'precio' | 'cotizar';
  imagen: string;
  descripcion: string;
  slug: string;
}

const sampleProducts: Product[] = [
  {
    id: 1,
    nombre: "Kit EPP Básico - 1 Persona",
    categoria: "Seguridad",
    proveedor: "AP Safety",
    precio: 450,
    precio_modo: 'precio',
    imagen: "/img/products/epp-kit-1.jpg",
    descripcion: "Kit básico de equipo de protección personal para 1 persona",
    slug: "kit-epp-basico-1-persona"
  },
  {
    id: 2,
    nombre: "Bomba Sumergible Industrial",
    categoria: "Equipos",
    proveedor: "Pumping Team",
    precio: null,
    precio_modo: 'cotizar',
    imagen: "/img/products/bomba-sumergible.jpg",
    descripcion: "Bomba sumergible de alta capacidad para uso industrial",
    slug: "bomba-sumergible-industrial"
  },
  {
    id: 3,
    nombre: "Refacciones Hidráulicas",
    categoria: "Refacciones",
    proveedor: "MTM",
    precio: 250,
    precio_modo: 'precio',
    imagen: "/img/products/refacciones-hidraulicas.jpg",
    descripcion: "Conjunto de refacciones para sistemas hidráulicos",
    slug: "refacciones-hidraulicas"
  },
  {
    id: 4,
    nombre: "Plafones LED Pack x10",
    categoria: "Iluminación",
    proveedor: "Plásticos Torres",
    precio: 1200,
    precio_modo: 'precio',
    imagen: "/img/products/plafones-led.jpg",
    descripcion: "Pack de 10 plafones LED de alta eficiencia",
    slug: "plafones-led-pack-10"
  }
];

const Catalogo = () => {
  const [products] = useState<Product[]>(sampleProducts);
  const [filters, setFilters] = useState({
    categoria: '',
    proveedor: '',
    precio_modo: '',
    busqueda: ''
  });

  const categorias = [...new Set(products.map(p => p.categoria))];
  const proveedores = [...new Set(products.map(p => p.proveedor))];

  const filteredProducts = products.filter(product => {
    return (
      (filters.categoria === '' || product.categoria === filters.categoria) &&
      (filters.proveedor === '' || product.proveedor === filters.proveedor) &&
      (filters.precio_modo === '' || product.precio_modo === filters.precio_modo) &&
      (filters.busqueda === '' || product.nombre.toLowerCase().includes(filters.busqueda.toLowerCase()))
    );
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
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
                      {categorias.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Proveedor */}
                  <div className="filter__group mb-30">
                    <h5>Proveedor</h5>
                    <select 
                      className="form-select"
                      value={filters.proveedor}
                      onChange={(e) => handleFilterChange('proveedor', e.target.value)}
                    >
                      <option value="">Todos los proveedores</option>
                      {proveedores.map(prov => (
                        <option key={prov} value={prov}>{prov}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Tipo de precio */}
                  <div className="filter__group mb-30">
                    <h5>Disponibilidad</h5>
                    <select 
                      className="form-select"
                      value={filters.precio_modo}
                      onChange={(e) => handleFilterChange('precio_modo', e.target.value)}
                    >
                      <option value="">Todos</option>
                      <option value="precio">Con precio</option>
                      <option value="cotizar">Solo cotizar</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Productos */}
            <div className="col-xl-9 col-lg-8">
              <div className="catalog__results mb-40">
                <h4>Mostrando {filteredProducts.length} productos</h4>
              </div>
              
              <div className="row">
                {filteredProducts.map(product => (
                  <div key={product.id} className="col-xl-4 col-md-6 mb-40">
                    <div className="product__item card h-100">
                      <div className="product__thumb">
                        <img 
                          src={product.imagen} 
                          alt={product.nombre}
                          className="card-img-top"
                          style={{ height: '200px', objectFit: 'cover' }}
                        />
                        <div className="product__badges">
                          {product.precio_modo === 'cotizar' && (
                            <span className="badge bg-warning">Cotizar</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="card-body d-flex flex-column">
                        <div className="product__content flex-grow-1">
                          <span className="product__category text-muted small">
                            {product.categoria} • {product.proveedor}
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
                            {product.precio_modo === 'precio' ? (
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
                            {product.precio_modo === 'precio' ? (
                              <button className="btn btn-primary w-100">
                                <i className="fal fa-shopping-cart me-2"></i>
                                Agregar al carrito
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
              
              {filteredProducts.length === 0 && (
                <div className="text-center py-5">
                  <h4>No se encontraron productos</h4>
                  <p>Intenta ajustar los filtros de búsqueda</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Catalogo;