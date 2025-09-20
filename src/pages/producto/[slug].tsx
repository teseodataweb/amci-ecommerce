import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import Banner from "@/components/layout/banner/Banner";

interface ProductVariant {
  id: number;
  nombre: string;
  precio_adicional: number;
}

interface ProductImage {
  id: number;
  url: string;
  alt: string;
}

interface Product {
  id: number;
  nombre: string;
  categoria: string;
  proveedor: string;
  precio: number | null;
  precio_modo: 'precio' | 'cotizar';
  imagenes: ProductImage[];
  descripcion: string;
  descripcion_completa: string;
  slug: string;
  variantes?: ProductVariant[];
  emisor_factura: 'AMCI' | 'PROVEEDOR';
  costo_envio_base: number;
  tiempo_entrega: string;
  especificaciones: { [key: string]: string };
}

// Datos de muestra - en producción vendrían de la API
const getProductBySlug = (slug: string): Product | null => {
  const products: { [key: string]: Product } = {
    "kit-epp-basico-1-persona": {
      id: 1,
      nombre: "Kit EPP Básico - 1 Persona",
      categoria: "Seguridad",
      proveedor: "AP Safety",
      precio: 450,
      precio_modo: 'precio',
      imagenes: [
        { id: 1, url: "/img/products/epp-kit-1-main.jpg", alt: "Kit EPP principal" },
        { id: 2, url: "/img/products/epp-kit-1-detail.jpg", alt: "Kit EPP detalle" },
        { id: 3, url: "/img/products/epp-kit-1-components.jpg", alt: "Componentes del kit" }
      ],
      descripcion: "Kit básico de equipo de protección personal para 1 persona",
      descripcion_completa: "Kit completo de equipo de protección personal diseñado para una persona. Incluye casco, gafas de seguridad, guantes, chaleco reflectante y calzado de seguridad. Cumple con todas las normas de seguridad mexicanas e internacionales.",
      slug: "kit-epp-basico-1-persona",
      variantes: [
        { id: 1, nombre: "Talla S", precio_adicional: 0 },
        { id: 2, nombre: "Talla M", precio_adicional: 0 },
        { id: 3, nombre: "Talla L", precio_adicional: 0 },
        { id: 4, nombre: "Talla XL", precio_adicional: 25 }
      ],
      emisor_factura: 'AMCI',
      costo_envio_base: 150,
      tiempo_entrega: "3-5 días hábiles",
      especificaciones: {
        "Material del casco": "Polietileno de alta densidad",
        "Certificación": "NOM-115-STPS-2009",
        "Peso total": "2.5 kg",
        "Garantía": "12 meses",
        "País de origen": "México"
      }
    },
    "bomba-sumergible-industrial": {
      id: 2,
      nombre: "Bomba Sumergible Industrial",
      categoria: "Equipos",
      proveedor: "Pumping Team",
      precio: null,
      precio_modo: 'cotizar',
      imagenes: [
        { id: 1, url: "/img/products/bomba-main.jpg", alt: "Bomba sumergible" },
        { id: 2, url: "/img/products/bomba-specs.jpg", alt: "Especificaciones técnicas" }
      ],
      descripcion: "Bomba sumergible de alta capacidad para uso industrial",
      descripcion_completa: "Bomba sumergible diseñada para aplicaciones industriales de alta demanda. Construida con materiales resistentes a la corrosión y con motor de alta eficiencia. Ideal para drenaje, transferencia de líquidos y aplicaciones de construcción.",
      slug: "bomba-sumergible-industrial",
      emisor_factura: 'PROVEEDOR',
      costo_envio_base: 500,
      tiempo_entrega: "15-20 días hábiles",
      especificaciones: {
        "Potencia": "5 HP",
        "Caudal máximo": "500 GPM",
        "Altura máxima": "150 pies",
        "Material": "Hierro fundido",
        "Voltaje": "220V / 440V",
        "Garantía": "24 meses"
      }
    }
  };

  return products[slug] || null;
};

const ProductDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);

  if (!slug || typeof slug !== 'string') {
    return <div>Cargando...</div>;
  }

  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <Layout header={1} footer={1}>
        <Banner 
          title="Producto no encontrado"
          subtitle="El producto que buscas no existe"
          bg="bg-danger"
        />
        <div className="container py-5 text-center">
          <h3>Producto no encontrado</h3>
          <p>Lo sentimos, el producto que buscas no existe.</p>
          <Link href="/catalogo" className="btn btn-primary">
            Volver al catálogo
          </Link>
        </div>
      </Layout>
    );
  }

  const currentImage = product.imagenes[currentImageIndex];
  const selectedVariantData = product.variantes?.find(v => v.id === selectedVariant);
  const finalPrice = product.precio ? product.precio + (selectedVariantData?.precio_adicional || 0) : null;

  return (
    <Layout header={1} footer={1}>
      <Banner 
        title={product.nombre}
        subtitle={`${product.categoria} • ${product.proveedor}`}
        bg="bg-primary"
      />
      
      <section className="product__details pt-120 pb-80">
        <div className="container">
          <div className="row">
            {/* Imágenes del producto */}
            <div className="col-xl-6 col-lg-6">
              <div className="product__details-thumb mb-40">
                <div className="product__details-thumb-main mb-3">
                  <img 
                    src={currentImage.url}
                    alt={currentImage.alt}
                    className="w-100"
                    style={{ height: '400px', objectFit: 'cover' }}
                  />
                </div>
                
                {product.imagenes.length > 1 && (
                  <div className="product__details-thumb-nav d-flex gap-2">
                    {product.imagenes.map((image, index) => (
                      <button
                        key={image.id}
                        className={`thumb-nav-item ${index === currentImageIndex ? 'active' : ''}`}
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <img 
                          src={image.url}
                          alt={image.alt}
                          style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Información del producto */}
            <div className="col-xl-6 col-lg-6">
              <div className="product__details-content mb-40">
                <div className="product__details-category mb-2">
                  <span className="badge bg-light text-dark">
                    {product.categoria}
                  </span>
                  <span className="badge bg-primary ms-2">
                    {product.proveedor}
                  </span>
                </div>
                
                <h2 className="product__details-title mb-3">
                  {product.nombre}
                </h2>
                
                <p className="product__details-desc mb-4">
                  {product.descripcion_completa}
                </p>
                
                {/* Precio */}
                <div className="product__details-price mb-4">
                  {product.precio_modo === 'precio' ? (
                    <>
                      <span className="current-price h3 text-primary">
                        ${finalPrice?.toLocaleString('es-MX')} MXN
                      </span>
                      {selectedVariantData && selectedVariantData.precio_adicional > 0 && (
                        <small className="text-muted d-block">
                          Precio base: ${product.precio?.toLocaleString('es-MX')} + ${selectedVariantData.precio_adicional} (variante)
                        </small>
                      )}
                      <small className="text-muted d-block">
                        Precio antes de IVA • Envío: +${product.costo_envio_base} MXN
                      </small>
                    </>
                  ) : (
                    <span className="quote-price h3 text-warning">
                      Solicitar cotización
                    </span>
                  )}
                </div>
                
                {/* Variantes */}
                {product.variantes && product.variantes.length > 0 && (
                  <div className="product__details-variants mb-4">
                    <h5>Selecciona una variante:</h5>
                    <div className="variants-grid">
                      {product.variantes.map(variant => (
                        <button
                          key={variant.id}
                          className={`btn ${selectedVariant === variant.id ? 'btn-primary' : 'btn-outline-primary'} me-2 mb-2`}
                          onClick={() => setSelectedVariant(variant.id)}
                        >
                          {variant.nombre}
                          {variant.precio_adicional > 0 && (
                            <small> (+${variant.precio_adicional})</small>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Cantidad y botones */}
                {product.precio_modo === 'precio' && (
                  <div className="product__details-action mb-4">
                    <div className="quantity-input d-flex align-items-center mb-3">
                      <label className="me-3">Cantidad:</label>
                      <div className="quantity-control d-flex">
                        <button 
                          className="btn btn-outline-secondary"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        >
                          -
                        </button>
                        <input 
                          type="number" 
                          value={quantity}
                          min="1"
                          className="form-control text-center mx-2"
                          style={{ width: '80px' }}
                          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        />
                        <button 
                          className="btn btn-outline-secondary"
                          onClick={() => setQuantity(quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <button className="btn btn-primary btn-lg w-100 mb-3">
                      <i className="fal fa-shopping-cart me-2"></i>
                      Agregar al carrito
                    </button>
                  </div>
                )}
                
                {product.precio_modo === 'cotizar' && (
                  <div className="product__details-action mb-4">
                    <button className="btn btn-warning btn-lg w-100 mb-3">
                      <i className="fal fa-envelope me-2"></i>
                      Solicitar cotización
                    </button>
                  </div>
                )}
                
                {/* Información adicional */}
                <div className="product__details-info">
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <i className="fal fa-truck me-2 text-primary"></i>
                      <strong>Tiempo de entrega:</strong> {product.tiempo_entrega}
                    </li>
                    <li className="mb-2">
                      <i className="fal fa-file-invoice me-2 text-primary"></i>
                      <strong>Factura emitida por:</strong> {product.emisor_factura}
                    </li>
                    <li className="mb-2">
                      <i className="fal fa-shield-alt me-2 text-primary"></i>
                      <strong>Garantía:</strong> {product.especificaciones["Garantía"] || "Consultar con proveedor"}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Especificaciones técnicas */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="product__details-tabs">
                <h3 className="mb-4">Especificaciones técnicas</h3>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <tbody>
                      {Object.entries(product.especificaciones).map(([key, value]) => (
                        <tr key={key}>
                          <td className="fw-bold" style={{ width: '30%' }}>{key}</td>
                          <td>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;