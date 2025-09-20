import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import Banner from "@/components/layout/banner/Banner";

interface OrderItem {
  id: number;
  producto_nombre: string;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
  proveedor: string;
}

interface Order {
  id: number;
  fecha: string;
  cliente_nombre: string;
  cliente_email: string;
  total: number;
  subtotal: number;
  envio: number;
  iva: number;
  estado: 'RECIBIDO' | 'CONFIRMADO' | 'ENVIADO' | 'ENTREGADO' | 'CERRADO' | 'CANCELADO';
  direccion_envio: string;
  telefono_cliente: string;
  items: OrderItem[];
  tracking?: {
    carrier: string;
    numero: string;
    url?: string;
  };
}

// Datos simulados - en producción vendrían de la API
const getOrderById = (id: string): Order | null => {
  const orders: { [key: string]: Order } = {
    "1001": {
      id: 1001,
      fecha: "2024-01-15T10:30:00Z",
      cliente_nombre: "Juan Pérez García",
      cliente_email: "juan@empresa.com",
      total: 1050,
      subtotal: 900,
      envio: 150,
      iva: 144,
      estado: 'ENVIADO',
      direccion_envio: "Av. Insurgentes 123, Col. Roma Norte, CDMX, CP 06700",
      telefono_cliente: "55 1234 5678",
      items: [
        {
          id: 1,
          producto_nombre: "Kit EPP Básico - 1 Persona (Talla M)",
          cantidad: 2,
          precio_unitario: 450,
          subtotal: 900,
          proveedor: "AP Safety"
        }
      ],
      tracking: {
        carrier: "DHL",
        numero: "1234567890",
        url: "https://www.dhl.com.mx/ex/tracking.html?AWB=1234567890"
      }
    },
    "1002": {
      id: 1002,
      fecha: "2024-01-14T14:20:00Z",
      cliente_nombre: "María González",
      cliente_email: "maria@construcciones.com",
      total: 1650,
      subtotal: 1350,
      envio: 180,
      iva: 216,
      estado: 'CONFIRMADO',
      direccion_envio: "Calzada de Tlalpan 456, Col. Del Valle, CDMX, CP 03100",
      telefono_cliente: "55 8765 4321",
      items: [
        {
          id: 1,
          producto_nombre: "Kit EPP Avanzado - 15 Personas",
          cantidad: 1,
          precio_unitario: 1350,
          subtotal: 1350,
          proveedor: "AP Safety"
        }
      ]
    }
  };

  return orders[id] || null;
};

const OrdenDetalle = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id || typeof id !== 'string') {
    return (
      <Layout header={1} footer={1}>
        <div className="container py-5 text-center">
          <h3>Cargando orden...</h3>
        </div>
      </Layout>
    );
  }

  const order = getOrderById(id);

  if (!order) {
    return (
      <Layout header={1} footer={1}>
        <Banner 
          title="Orden no encontrada"
          subtitle="La orden que buscas no existe o ha sido eliminada"
          bg="bg-danger"
        />
        <div className="container py-5 text-center">
          <h3>Orden no encontrada</h3>
          <p>Lo sentimos, no pudimos encontrar la orden #{id}.</p>
          <Link href="/catalogo" className="btn btn-primary">
            <i className="fal fa-arrow-left me-2"></i>
            Volver al catálogo
          </Link>
        </div>
      </Layout>
    );
  }

  const getStatusBadgeClass = (status: string) => {
    const statusMap = {
      'RECIBIDO': 'bg-info',
      'CONFIRMADO': 'bg-warning',
      'ENVIADO': 'bg-primary',
      'ENTREGADO': 'bg-success',
      'CERRADO': 'bg-secondary',
      'CANCELADO': 'bg-danger'
    };
    return statusMap[status as keyof typeof statusMap] || 'bg-secondary';
  };

  const getStatusMessage = (status: string) => {
    const messages = {
      'RECIBIDO': 'Tu orden ha sido recibida y está siendo procesada.',
      'CONFIRMADO': 'El proveedor ha confirmado tu orden y está preparando el envío.',
      'ENVIADO': 'Tu orden ha sido enviada y está en camino.',
      'ENTREGADO': 'Tu orden ha sido entregada exitosamente.',
      'CERRADO': 'Tu orden ha sido completada.',
      'CANCELADO': 'Tu orden ha sido cancelada.'
    };
    return messages[status as keyof typeof messages] || 'Estado desconocido';
  };

  return (
    <Layout header={1} footer={1}>
      <Banner 
        title={`Orden #${order.id}`}
        subtitle="Detalles y seguimiento de tu pedido"
        bg="bg-success"
      />
      
      <section className="order__details pt-120 pb-80">
        <div className="container">
          {/* Thank you message */}
          <div className="row mb-5">
            <div className="col-12">
              <div className="thank-you-message text-center bg-light p-5 rounded">
                <i className="fal fa-check-circle fa-4x text-success mb-4"></i>
                <h2 className="mb-3">¡Gracias por tu compra!</h2>
                <p className="lead mb-4">
                  Tu orden #{order.id} ha sido procesada exitosamente. 
                  Recibirás actualizaciones por email en cada etapa del proceso.
                </p>
                
                {/* Order Status */}
                <div className="order-status mb-4">
                  <span className={`badge badge-lg ${getStatusBadgeClass(order.estado)} text-white fs-6`}>
                    {order.estado}
                  </span>
                  <p className="mt-2 mb-0">
                    {getStatusMessage(order.estado)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Order Details */}
            <div className="col-xl-8 col-lg-8 mb-4">
              <div className="order-details-card card">
                <div className="card-header">
                  <h4 className="mb-0">Detalles de la Orden</h4>
                </div>
                
                <div className="card-body">
                  {/* Order Info */}
                  <div className="order-info mb-4">
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <h6>Número de Orden</h6>
                        <p className="mb-0">#{order.id}</p>
                      </div>
                      <div className="col-md-6 mb-3">
                        <h6>Fecha</h6>
                        <p className="mb-0">
                          {new Date(order.fecha).toLocaleDateString('es-MX', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <div className="col-md-6 mb-3">
                        <h6>Cliente</h6>
                        <p className="mb-0">{order.cliente_nombre}</p>
                        <small className="text-muted">{order.cliente_email}</small>
                      </div>
                      <div className="col-md-6 mb-3">
                        <h6>Teléfono</h6>
                        <p className="mb-0">{order.telefono_cliente}</p>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="shipping-info mb-4">
                    <h6>Dirección de Envío</h6>
                    <p className="mb-0">{order.direccion_envio}</p>
                  </div>

                  {/* Tracking Information */}
                  {order.tracking && (
                    <div className="tracking-info mb-4">
                      <h6>Información de Envío</h6>
                      <div className="tracking-details bg-light p-3 rounded">
                        <div className="row">
                          <div className="col-md-4 mb-2">
                            <strong>Paquetería:</strong> {order.tracking.carrier}
                          </div>
                          <div className="col-md-4 mb-2">
                            <strong>Número de Guía:</strong> {order.tracking.numero}
                          </div>
                          <div className="col-md-4 mb-2">
                            {order.tracking.url ? (
                              <a 
                                href={order.tracking.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn btn-outline-primary btn-sm"
                              >
                                <i className="fal fa-external-link-alt me-1"></i>
                                Rastrear Envío
                              </a>
                            ) : (
                              <span className="text-muted">Rastreo no disponible</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Order Items */}
                  <div className="order-items">
                    <h6>Productos Ordenados</h6>
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Producto</th>
                            <th>Proveedor</th>
                            <th>Cantidad</th>
                            <th>Precio Unit.</th>
                            <th>Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items.map(item => (
                            <tr key={item.id}>
                              <td>{item.producto_nombre}</td>
                              <td>
                                <span className="badge bg-primary">{item.proveedor}</span>
                              </td>
                              <td className="text-center">{item.cantidad}</td>
                              <td>${item.precio_unitario.toLocaleString('es-MX')} MXN</td>
                              <td className="fw-bold">${item.subtotal.toLocaleString('es-MX')} MXN</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="col-xl-4 col-lg-4">
              <div className="order-summary-card card">
                <div className="card-header">
                  <h5 className="mb-0">Resumen de la Orden</h5>
                </div>
                
                <div className="card-body">
                  <div className="summary-row d-flex justify-content-between mb-3">
                    <span>Subtotal:</span>
                    <span>${order.subtotal.toLocaleString('es-MX')} MXN</span>
                  </div>
                  
                  <div className="summary-row d-flex justify-content-between mb-3">
                    <span>Envío:</span>
                    <span>${order.envio.toLocaleString('es-MX')} MXN</span>
                  </div>
                  
                  <div className="summary-row d-flex justify-content-between mb-3">
                    <span>IVA (16%):</span>
                    <span>${order.iva.toLocaleString('es-MX')} MXN</span>
                  </div>
                  
                  <hr />
                  
                  <div className="summary-total d-flex justify-content-between mb-4">
                    <span className="fw-bold h5">Total:</span>
                    <span className="fw-bold h5 text-primary">
                      ${order.total.toLocaleString('es-MX')} MXN
                    </span>
                  </div>

                  <div className="order-actions d-grid gap-2">
                    <Link href="/catalogo" className="btn btn-primary">
                      <i className="fal fa-shopping-cart me-2"></i>
                      Continuar Comprando
                    </Link>
                    
                    <Link href="/panel/cliente" className="btn btn-outline-primary">
                      <i className="fal fa-list me-2"></i>
                      Ver Mis Órdenes
                    </Link>
                    
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={() => window.print()}
                    >
                      <i className="fal fa-print me-2"></i>
                      Imprimir Orden
                    </button>
                  </div>
                </div>
              </div>

              {/* Help Section */}
              <div className="help-section card mt-4">
                <div className="card-body">
                  <h6 className="card-title">¿Necesitas Ayuda?</h6>
                  <p className="card-text small">
                    Si tienes preguntas sobre tu orden o necesitas soporte, no dudes en contactarnos.
                  </p>
                  <div className="help-actions d-grid gap-2">
                    <Link href="/contact" className="btn btn-outline-info btn-sm">
                      <i className="fal fa-envelope me-2"></i>
                      Contactar Soporte
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

export default OrdenDetalle;