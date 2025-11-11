import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/contexts/CartContext";

interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

interface Review {
  id: string;
  user_name: string;
  rating: number;
  comment: string;
  date: string;
  verified_purchase: boolean;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

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
    nombre_comercial?: string;
    descripcion?: string;
    años_experiencia?: number;
    rating?: number;
    total_ventas?: number;
    tiempo_respuesta?: string;
    ubicacion?: string;
    certificaciones?: string[];
  };
  images: ProductImage[];
  reviews?: Review[];
  faqs?: FAQ[];
}


const ProductDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  useEffect(() => {
    if (!slug || typeof slug !== 'string') {
      console.log('Slug no válido:', slug);
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(false);

        console.log('Fetching product with slug:', slug);
        const response = await fetch(`/api/products/${slug}`);
        const data = await response.json();

        console.log('API Response:', {
          status: response.status,
          ok: response.ok,
          data: data
        });

        if (response.ok && data.product) {
          console.log('Producto encontrado:', data.product);
          setProduct(data.product);
          setError(false);
        } else {
          console.log('Producto no encontrado o error en respuesta');
          setError(true);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      setAddingToCart(true);
      await addToCart(product.id, quantity);
      alert('Producto agregado al carrito');
      setQuantity(1);
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      alert('Error al agregar el producto al carrito');
    } finally {
      setAddingToCart(false);
    }
  };

  const openModal = (index: number) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    if (product && product.images) {
      setModalImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product && product.images) {
      setModalImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  // Keyboard navigation and ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;

      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, product]);

  if (loading) {
    return (
      <Layout header={1} footer={1}>
        <div className="product-detail-loading">
          <div className="container">
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Cargando producto...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout header={1} footer={1}>
        <div className="product-not-found">
          <div className="container">
            <div className="not-found-content">
              <div className="not-found-icon">
                <i className="fas fa-box-open"></i>
              </div>
              <h1>Producto no encontrado</h1>
              <p>Lo sentimos, el producto que buscas no existe o ya no está disponible.</p>
              <Link href="/catalogo" className="btn-back-catalog">
                <i className="fas fa-arrow-left"></i>
                Volver al catálogo
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const currentImage = product.images && product.images.length > 0
    ? product.images[currentImageIndex]
    : null;

  return (
    <Layout header={1} footer={1}>
      {/* Breadcrumb Hero */}
      <section className="product-detail-hero">
        <div className="product-detail-hero__overlay">
          {/* Partículas pequeñas animadas */}
          <div className="particle-product particle-product-1"></div>
          <div className="particle-product particle-product-2"></div>
          <div className="particle-product particle-product-3"></div>

          {/* Círculos decorativos grandes */}
          <div className="product-shape product-shape-1"></div>
          <div className="product-shape product-shape-2"></div>
        </div>

        <div className="container position-relative" style={{ zIndex: 2 }}>
          <nav aria-label="breadcrumb" className="breadcrumb-modern">
            <div className="breadcrumb-content">
              <Link href="/" className="breadcrumb-item-link">
                <i className="fal fa-home"></i>
                <span>Inicio</span>
              </Link>

              <span className="breadcrumb-separator">
                <i className="fal fa-angle-right"></i>
              </span>

              <Link href="/catalogo" className="breadcrumb-item-link">
                <i className="fal fa-box-open"></i>
                <span>Catálogo</span>
              </Link>

              <span className="breadcrumb-separator">
                <i className="fal fa-angle-right"></i>
              </span>

              <Link href={`/catalogo?category=${product.category.slug}`} className="breadcrumb-item-link">
                <i className="fal fa-tag"></i>
                <span>{product.category.name}</span>
              </Link>

              <span className="breadcrumb-separator">
                <i className="fal fa-angle-right"></i>
              </span>

              <span className="breadcrumb-current">
                <i className="fal fa-cube"></i>
                <span>{product.nombre}</span>
              </span>
            </div>
          </nav>
        </div>
      </section>

      <section className="product-detail-section">
        <div className="container">
          <div className="row g-5">
            {/* Galería de imágenes */}
            <div className="col-lg-6">
              <div className="product-gallery">
                <div className="main-image" onClick={() => openModal(currentImageIndex)}>
                  {currentImage ? (
                    <img
                      src={currentImage.url}
                      alt={currentImage.alt}
                      className="img-fluid"
                    />
                  ) : (
                    <img
                      src="https://via.placeholder.com/600x600?text=Sin+Imagen"
                      alt="Sin imagen disponible"
                      className="img-fluid"
                    />
                  )}
                </div>

                {product.images && product.images.length > 1 && (
                  <div className="thumbnails-grid">
                    {product.images.map((image, index) => (
                      <button
                        key={image.id}
                        className={`thumbnail-item ${index === currentImageIndex ? 'active' : ''}`}
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <img src={image.url} alt={image.alt} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Información del producto */}
            <div className="col-lg-6">
              <div className="product-info">
                {/* Badges superiores */}
                <div className="product-meta-badges">
                  <span className="badge-category">
                    <i className="fas fa-tag"></i>
                    {product.category.name}
                  </span>
                  <span className="badge-provider">
                    <i className="fas fa-industry"></i>
                    {product.provider.razon_social}
                  </span>
                </div>

                {/* Título del producto */}
                <h1 className="product-title">{product.nombre}</h1>

                {/* Descripción */}
                <p className="product-description">{product.descripcion}</p>

                {/* Disponibilidad y SKU */}
                <div className="product-availability-info">
                  <div className="info-item">
                    <span className="info-label">
                      <i className="fas fa-barcode"></i>
                      SKU
                    </span>
                    <span className="info-value">SKU-{product.id.padStart(6, '0')}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">
                      <i className="fas fa-box"></i>
                      Stock
                    </span>
                    {product.pricing_mode === 'PRECIO' ? (
                      <span className={`stock-value ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                        {product.stock > 0 ? `${product.stock} unidades` : 'Agotado'}
                      </span>
                    ) : (
                      <span className="stock-value quote-mode">Bajo cotización</span>
                    )}
                  </div>
                </div>

                <div className="divider"></div>

                {/* Precio */}
                <div className="price-section">
                  {product.pricing_mode === 'PRECIO' ? (
                    <>
                      <div className="price-label">Precio unitario</div>
                      <div className="price-value">
                        <span className="currency">$</span>
                        <span className="amount">{product.precio?.toLocaleString('es-MX')}</span>
                        <span className="currency-code">MXN</span>
                      </div>
                      <div className="price-note">
                        <i className="fas fa-info-circle"></i>
                        Precio sin IVA
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="quote-label">
                        <i className="fas fa-file-invoice-dollar"></i>
                        Este producto requiere cotización
                      </div>
                      <div className="quote-description">
                        Contacta a nuestro equipo para obtener un presupuesto personalizado según tus necesidades.
                      </div>
                    </>
                  )}
                </div>

                {/* Cantidad y acciones */}
                {product.pricing_mode === 'PRECIO' && product.stock > 0 && (
                  <>
                    <div className="quantity-selector">
                      <label className="quantity-label">Cantidad</label>
                      <div className="quantity-controls">
                        <button
                          className="quantity-btn decrease"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          disabled={quantity <= 1}
                        >
                          <i className="fas fa-minus"></i>
                        </button>
                        <input
                          type="number"
                          className="quantity-input"
                          value={quantity}
                          min="1"
                          max={product.stock}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 1;
                            setQuantity(Math.min(Math.max(1, val), product.stock));
                          }}
                        />
                        <button
                          className="quantity-btn increase"
                          onClick={() => setQuantity(Math.min(quantity + 1, product.stock))}
                          disabled={quantity >= product.stock}
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>

                    <button
                      className="btn-add-to-cart"
                      onClick={handleAddToCart}
                      disabled={addingToCart}
                    >
                      {addingToCart ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Agregando...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-shopping-cart"></i>
                          Agregar al carrito
                        </>
                      )}
                    </button>
                  </>
                )}

                {product.pricing_mode === 'COTIZAR' && (
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
                    className="btn-request-quote"
                  >
                    <i className="fas fa-file-invoice-dollar"></i>
                    Solicitar cotización
                  </Link>
                )}

                {product.pricing_mode === 'PRECIO' && product.stock === 0 && (
                  <div className="out-of-stock-message">
                    <i className="fas fa-exclamation-triangle"></i>
                    <div>
                      <strong>Producto agotado</strong>
                      <p>Contáctanos para consultar disponibilidad</p>
                    </div>
                  </div>
                )}

                <div className="divider"></div>

                {/* Características clave */}
                <div className="key-features">
                  <h3 className="features-title">
                    <i className="fas fa-check-circle"></i>
                    Características principales
                  </h3>
                  <ul className="features-list">
                    <li>
                      <i className="fas fa-check"></i>
                      Producto verificado y aprobado
                    </li>
                    <li>
                      <i className="fas fa-check"></i>
                      Proveedor certificado: {product.provider.razon_social}
                    </li>
                    <li>
                      <i className="fas fa-check"></i>
                      Categoría: {product.category.name}
                    </li>
                  </ul>
                </div>

                {/* Info adicional */}
                <div className="additional-info">
                  <div className="info-card">
                    <i className="fas fa-truck"></i>
                    <div>
                      <strong>Envío disponible</strong>
                      <p>Entrega estimada: 3-5 días hábiles</p>
                    </div>
                  </div>
                  <div className="info-card">
                    <i className="fas fa-shield-alt"></i>
                    <div>
                      <strong>Compra segura</strong>
                      <p>Transacciones protegidas</p>
                    </div>
                  </div>
                  <div className="info-card">
                    <i className="fas fa-undo-alt"></i>
                    <div>
                      <strong>Garantía incluida</strong>
                      <p>Producto garantizado</p>
                    </div>
                  </div>
                  <div className="info-card">
                    <i className="fas fa-headset"></i>
                    <div>
                      <strong>Soporte técnico</strong>
                      <p>Asesoría especializada</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Información detallada del producto */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="product-detailed-info">
                <div className="tabs-container">
                  <div className="tab-content active">
                    <h3 className="section-title">
                      <i className="fas fa-info-circle"></i>
                      Descripción detallada
                    </h3>
                    <div className="description-content">
                      <p>{product.descripcion}</p>
                      <p className="mt-3">
                        Este producto es distribuido por <strong>{product.provider.razon_social}</strong>
                        y pertenece a la categoría de <strong>{product.category.name}</strong>.
                      </p>
                      {product.pricing_mode === 'PRECIO' && (
                        <p className="mt-3">
                          Contamos con <strong>{product.stock} unidades disponibles</strong> para entrega inmediata.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="specifications-section mt-4">
                    <h3 className="section-title">
                      <i className="fas fa-clipboard-list"></i>
                      Especificaciones técnicas
                    </h3>
                    <div className="specs-grid">
                      <div className="spec-item">
                        <span className="spec-label">SKU</span>
                        <span className="spec-value">SKU-{product.id.padStart(6, '0')}</span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Categoría</span>
                        <span className="spec-value">{product.category.name}</span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Proveedor</span>
                        <span className="spec-value">{product.provider.razon_social}</span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Disponibilidad</span>
                        <span className="spec-value">
                          {product.pricing_mode === 'PRECIO'
                            ? `${product.stock} unidades en stock`
                            : 'Bajo cotización'}
                        </span>
                      </div>
                      {product.pricing_mode === 'PRECIO' && (
                        <>
                          <div className="spec-item">
                            <span className="spec-label">Precio unitario</span>
                            <span className="spec-value">${product.precio?.toLocaleString('es-MX')} MXN</span>
                          </div>
                          <div className="spec-item">
                            <span className="spec-label">IVA</span>
                            <span className="spec-value">16% (no incluido en el precio)</span>
                          </div>
                        </>
                      )}
                      <div className="spec-item">
                        <span className="spec-label">Unidad de venta</span>
                        <span className="spec-value">
                          {(() => {
                            const nombre = product.nombre.toLowerCase();
                            if (nombre.includes('cemento') || nombre.includes('mortero')) return 'Saco / Bulto';
                            if (nombre.includes('concreto premezclado')) return 'Metro cúbico (m³)';
                            if (nombre.includes('cable') || nombre.includes('alambrón')) return 'Rollo / Metro';
                            if (nombre.includes('varilla') || nombre.includes('tubo')) return 'Pieza / Metro';
                            if (nombre.includes('malla')) return 'Panel / Metro cuadrado';
                            return 'Pieza individual';
                          })()}
                        </span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Tiempo de entrega</span>
                        <span className="spec-value">3-5 días hábiles</span>
                      </div>
                    </div>
                  </div>

                  <div className="shipping-info-section mt-4">
                    <h3 className="section-title">
                      <i className="fas fa-shipping-fast"></i>
                      Información de envío
                    </h3>
                    <div className="shipping-details">
                      <ul className="shipping-list">
                        <li>
                          <i className="fas fa-check-circle"></i>
                          <span>Envío a todo México</span>
                        </li>
                        <li>
                          <i className="fas fa-check-circle"></i>
                          <span>Cotización de envío sin costo adicional</span>
                        </li>
                        <li>
                          <i className="fas fa-check-circle"></i>
                          <span>Seguimiento en tiempo real de tu pedido</span>
                        </li>
                        <li>
                          <i className="fas fa-check-circle"></i>
                          <span>Empaque seguro para productos frágiles</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Información del vendedor */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="vendor-info-section">
                <div className="vendor-card">
                  <h3 className="section-title">
                    <i className="fas fa-store"></i>
                    Sobre el vendedor
                  </h3>
                  <div className="vendor-header">
                    <div className="vendor-logo">
                      <i className="fas fa-building"></i>
                    </div>
                    <div className="vendor-identity">
                      <h4 className="vendor-name">{product.provider.razon_social}</h4>
                      {product.provider.nombre_comercial && (
                        <p className="vendor-commercial-name">{product.provider.nombre_comercial}</p>
                      )}
                      {product.provider.ubicacion && (
                        <p className="vendor-location">
                          <i className="fas fa-map-marker-alt"></i>
                          {product.provider.ubicacion}
                        </p>
                      )}
                    </div>
                    {product.provider.rating && (
                      <div className="vendor-rating-badge">
                        <div className="rating-stars">
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={`fas fa-star ${i < Math.floor(product.provider.rating!) ? 'filled' : ''}`}
                            ></i>
                          ))}
                        </div>
                        <span className="rating-number">{product.provider.rating.toFixed(1)}</span>
                      </div>
                    )}
                  </div>

                  {product.provider.descripcion && (
                    <p className="vendor-description">{product.provider.descripcion}</p>
                  )}

                  <div className="vendor-stats">
                    {product.provider.años_experiencia && (
                      <div className="stat-item">
                        <i className="fas fa-calendar-alt"></i>
                        <div>
                          <strong>{product.provider.años_experiencia}</strong>
                          <span>años de experiencia</span>
                        </div>
                      </div>
                    )}
                    {product.provider.total_ventas && (
                      <div className="stat-item">
                        <i className="fas fa-shopping-bag"></i>
                        <div>
                          <strong>{product.provider.total_ventas.toLocaleString()}</strong>
                          <span>productos vendidos</span>
                        </div>
                      </div>
                    )}
                    {product.provider.tiempo_respuesta && (
                      <div className="stat-item">
                        <i className="fas fa-clock"></i>
                        <div>
                          <strong>{product.provider.tiempo_respuesta}</strong>
                          <span>tiempo de respuesta</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {product.provider.certificaciones && product.provider.certificaciones.length > 0 && (
                    <div className="vendor-certifications">
                      <h5>
                        <i className="fas fa-certificate"></i>
                        Certificaciones
                      </h5>
                      <div className="certifications-list">
                        {product.provider.certificaciones.map((cert, index) => (
                          <span key={index} className="certification-badge">
                            <i className="fas fa-check-circle"></i>
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Reseñas de clientes */}
          {product.reviews && product.reviews.length > 0 && (
            <div className="row mt-5">
              <div className="col-12">
                <div className="reviews-section">
                  <div className="reviews-header">
                    <h3 className="section-title">
                      <i className="fas fa-comments"></i>
                      Opiniones de clientes
                    </h3>
                    <div className="reviews-summary">
                      <div className="average-rating">
                        <span className="average-number">
                          {(product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length).toFixed(1)}
                        </span>
                        <div className="average-stars">
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={`fas fa-star ${i < Math.floor(product.reviews!.reduce((acc, r) => acc + r.rating, 0) / product.reviews!.length) ? 'filled' : ''}`}
                            ></i>
                          ))}
                        </div>
                        <span className="reviews-count">({product.reviews.length} opiniones)</span>
                      </div>
                    </div>
                  </div>

                  <div className="reviews-list">
                    {product.reviews.map((review) => (
                      <div key={review.id} className="review-card">
                        <div className="review-header">
                          <div className="reviewer-info">
                            <div className="reviewer-avatar">
                              <i className="fas fa-user"></i>
                            </div>
                            <div>
                              <h5 className="reviewer-name">
                                {review.user_name}
                                {review.verified_purchase && (
                                  <span className="verified-badge">
                                    <i className="fas fa-check-circle"></i>
                                    Compra verificada
                                  </span>
                                )}
                              </h5>
                              <p className="review-date">
                                {new Date(review.date).toLocaleDateString('es-MX', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                          </div>
                          <div className="review-rating">
                            {[...Array(5)].map((_, i) => (
                              <i
                                key={i}
                                className={`fas fa-star ${i < review.rating ? 'filled' : ''}`}
                              ></i>
                            ))}
                          </div>
                        </div>
                        <p className="review-comment">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preguntas frecuentes */}
          {product.faqs && product.faqs.length > 0 && (
            <div className="row mt-5">
              <div className="col-12">
                <div className="faqs-section">
                  <h3 className="section-title">
                    <i className="fas fa-question-circle"></i>
                    Preguntas frecuentes
                  </h3>
                  <div className="faqs-list">
                    {product.faqs.map((faq) => (
                      <div key={faq.id} className="faq-item">
                        <div className="faq-question">
                          <i className="fas fa-chevron-right"></i>
                          <h5>{faq.question}</h5>
                        </div>
                        <div className="faq-answer">
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Botón volver */}
          <div className="row mt-5">
            <div className="col-12">
              <Link href="/catalogo" className="btn-back">
                <i className="fas fa-arrow-left"></i>
                Volver al catálogo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {isModalOpen && product && product.images && product.images.length > 0 && (
        <div className="image-modal" onClick={closeModal}>
          <button className="close-modal" onClick={closeModal}>
            <i className="fas fa-times"></i>
          </button>

          {product.images.length > 1 && (
            <>
              <button className="modal-navigation prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
                <i className="fas fa-chevron-left"></i>
              </button>
              <button className="modal-navigation next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
                <i className="fas fa-chevron-right"></i>
              </button>
            </>
          )}

          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={product.images[modalImageIndex]?.url || ''}
              alt={product.images[modalImageIndex]?.alt || 'Producto'}
            />
          </div>

          {product.images.length > 1 && (
            <div className="image-counter">
              {modalImageIndex + 1} / {product.images.length}
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default ProductDetail;