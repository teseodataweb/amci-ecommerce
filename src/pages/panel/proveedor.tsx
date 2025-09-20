import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import Banner from "@/components/layout/banner/Banner";

interface Order {
  id: number;
  cliente_nombre: string;
  cliente_email: string;
  total: number;
  estado: 'RECIBIDO' | 'CONFIRMADO' | 'ENVIADO' | 'ENTREGADO' | 'CERRADO' | 'CANCELADO';
  created_at: string;
  productos: OrderItem[];
  direccion_envio: string;
  telefono_cliente: string;
}

interface OrderItem {
  id: number;
  producto_nombre: string;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
}

interface TrackingInfo {
  carrier: string;
  tracking: string;
  tracking_url: string;
}

const PanelProveedor = () => {
  // Datos simulados - en producción vendrían de la API
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1001,
      cliente_nombre: "Juan Pérez García",
      cliente_email: "juan@empresa.com",
      total: 900,
      estado: 'RECIBIDO',
      created_at: "2024-01-15T10:30:00Z",
      productos: [
        {
          id: 1,
          producto_nombre: "Kit EPP Básico - 1 Persona (Talla M)",
          cantidad: 2,
          precio_unitario: 450,
          subtotal: 900
        }
      ],
      direccion_envio: "Av. Insurgentes 123, Col. Roma Norte, CDMX, CP 06700",
      telefono_cliente: "55 1234 5678"
    },
    {
      id: 1002,
      cliente_nombre: "María González",
      cliente_email: "maria@construcciones.com",
      total: 1350,
      estado: 'CONFIRMADO',
      created_at: "2024-01-14T14:20:00Z",
      productos: [
        {
          id: 2,
          producto_nombre: "Kit EPP Básico - 15 Personas",
          cantidad: 1,
          precio_unitario: 1350,
          subtotal: 1350
        }
      ],
      direccion_envio: "Calzada de Tlalpan 456, Col. Del Valle, CDMX, CP 03100",
      telefono_cliente: "55 8765 4321"
    },
    {
      id: 1003,
      cliente_nombre: "Carlos Rodríguez",
      cliente_email: "carlos@industrial.mx",
      total: 675,
      estado: 'ENVIADO',
      created_at: "2024-01-13T09:15:00Z",
      productos: [
        {
          id: 3,
          producto_nombre: "Kit EPP Básico - 1 Persona (Talla L)",
          cantidad: 1,
          precio_unitario: 475,
          subtotal: 475
        }
      ],
      direccion_envio: "Blvd. Manuel Ávila Camacho 789, Naucalpan, Estado de México",
      telefono_cliente: "55 9876 5432"
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo>({
    carrier: '',
    tracking: '',
    tracking_url: ''
  });

  // Filtros
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<string>('');

  const filteredOrders = orders.filter(order => {
    const matchesStatus = !statusFilter || order.estado === statusFilter;
    const matchesDate = !dateFilter || order.created_at.startsWith(dateFilter);
    return matchesStatus && matchesDate;
  });

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

  const confirmOrder = (orderId: number) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, estado: 'CONFIRMADO' as const } : order
      )
    );
    alert('Orden confirmada exitosamente. El cliente ha sido notificado.');
  };

  const openTrackingModal = (order: Order) => {
    setSelectedOrder(order);
    setShowTrackingModal(true);
    setTrackingInfo({ carrier: '', tracking: '', tracking_url: '' });
  };

  const submitTracking = () => {
    if (!selectedOrder || !trackingInfo.carrier || !trackingInfo.tracking) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === selectedOrder.id ? { ...order, estado: 'ENVIADO' as const } : order
      )
    );

    setShowTrackingModal(false);
    alert('Información de envío registrada exitosamente. El cliente ha sido notificado.');
  };

  const markAsDelivered = (orderId: number) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, estado: 'ENTREGADO' as const } : order
      )
    );
    alert('Orden marcada como entregada.');
  };

  const closeOrder = (orderId: number) => {
    if (confirm('¿Estás seguro de cerrar esta orden? Esta acción no se puede deshacer.')) {
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, estado: 'CERRADO' as const } : order
        )
      );
      alert('Orden cerrada exitosamente.');
    }
  };

  return (
    <Layout header={1} footer={1}>
      <Banner 
        title="Panel de Proveedor"
        subtitle="Gestiona tus órdenes y envíos"
        bg="bg-primary"
      />
      
      <section className="provider__panel pt-120 pb-80">
        <div className="container">
          {/* Estadísticas */}
          <div className="row mb-5">
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="stat-card card text-center p-4">
                <div className="stat-icon mb-3">
                  <i className="fal fa-clipboard-list fa-2x text-info"></i>
                </div>
                <h3 className="stat-number text-info">{orders.filter(o => o.estado === 'RECIBIDO').length}</h3>
                <p className="stat-label text-muted">Órdenes pendientes</p>
              </div>
            </div>
            
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="stat-card card text-center p-4">
                <div className="stat-icon mb-3">
                  <i className="fal fa-check-circle fa-2x text-warning"></i>
                </div>
                <h3 className="stat-number text-warning">{orders.filter(o => o.estado === 'CONFIRMADO').length}</h3>
                <p className="stat-label text-muted">Confirmadas</p>
              </div>
            </div>
            
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="stat-card card text-center p-4">
                <div className="stat-icon mb-3">
                  <i className="fal fa-truck fa-2x text-primary"></i>
                </div>
                <h3 className="stat-number text-primary">{orders.filter(o => o.estado === 'ENVIADO').length}</h3>
                <p className="stat-label text-muted">En tránsito</p>
              </div>
            </div>
            
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="stat-card card text-center p-4">
                <div className="stat-icon mb-3">
                  <i className="fal fa-medal fa-2x text-success"></i>
                </div>
                <h3 className="stat-number text-success">{orders.filter(o => ['ENTREGADO', 'CERRADO'].includes(o.estado)).length}</h3>
                <p className="stat-label text-muted">Completadas</p>
              </div>
            </div>
          </div>
          
          {/* Filtros */}
          <div className="row mb-4">
            <div className="col-xl-12">
              <div className="filters card p-4">
                <div className="row">
                  <div className="col-md-4">
                    <label className="form-label">Filtrar por estado</label>
                    <select 
                      className="form-select"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="">Todos los estados</option>
                      <option value="RECIBIDO">Recibido</option>
                      <option value="CONFIRMADO">Confirmado</option>
                      <option value="ENVIADO">Enviado</option>
                      <option value="ENTREGADO">Entregado</option>
                      <option value="CERRADO">Cerrado</option>
                      <option value="CANCELADO">Cancelado</option>
                    </select>
                  </div>
                  
                  <div className="col-md-4">
                    <label className="form-label">Filtrar por fecha</label>
                    <input 
                      type="date"
                      className="form-control"
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                    />
                  </div>
                  
                  <div className="col-md-4 d-flex align-items-end">
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={() => {
                        setStatusFilter('');
                        setDateFilter('');
                      }}
                    >
                      Limpiar filtros
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Lista de órdenes */}
          <div className="row">
            <div className="col-xl-12">
              <div className="orders-table card">
                <div className="card-header">
                  <h4 className="mb-0">Órdenes ({filteredOrders.length})</h4>
                </div>
                
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Orden #</th>
                          <th>Cliente</th>
                          <th>Fecha</th>
                          <th>Productos</th>
                          <th>Total</th>
                          <th>Estado</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.map(order => (
                          <tr key={order.id}>
                            <td>
                              <strong>#{order.id}</strong>
                            </td>
                            <td>
                              <div>
                                <div className="fw-bold">{order.cliente_nombre}</div>
                                <small className="text-muted">{order.cliente_email}</small>
                              </div>
                            </td>
                            <td>
                              {new Date(order.created_at).toLocaleDateString('es-MX')}
                            </td>
                            <td>
                              <div className="products-list">
                                {order.productos.map(product => (
                                  <div key={product.id} className="mb-1">
                                    <small>
                                      {product.cantidad}x {product.producto_nombre}
                                    </small>
                                  </div>
                                ))}
                              </div>
                            </td>
                            <td>
                              <strong>${order.total.toLocaleString('es-MX')} MXN</strong>
                            </td>
                            <td>
                              <span className={`badge ${getStatusBadgeClass(order.estado)}`}>
                                {order.estado}
                              </span>
                            </td>
                            <td>
                              <div className="action-buttons">
                                {order.estado === 'RECIBIDO' && (
                                  <button 
                                    className="btn btn-warning btn-sm me-2 mb-1"
                                    onClick={() => confirmOrder(order.id)}
                                  >
                                    <i className="fal fa-check me-1"></i>
                                    Confirmar
                                  </button>
                                )}
                                
                                {order.estado === 'CONFIRMADO' && (
                                  <button 
                                    className="btn btn-primary btn-sm me-2 mb-1"
                                    onClick={() => openTrackingModal(order)}
                                  >
                                    <i className="fal fa-truck me-1"></i>
                                    Enviar
                                  </button>
                                )}
                                
                                {order.estado === 'ENVIADO' && (
                                  <button 
                                    className="btn btn-success btn-sm me-2 mb-1"
                                    onClick={() => markAsDelivered(order.id)}
                                  >
                                    <i className="fal fa-check-circle me-1"></i>
                                    Entregado
                                  </button>
                                )}
                                
                                {order.estado === 'ENTREGADO' && (
                                  <button 
                                    className="btn btn-secondary btn-sm me-2 mb-1"
                                    onClick={() => closeOrder(order.id)}
                                  >
                                    <i className="fal fa-times-circle me-1"></i>
                                    Cerrar
                                  </button>
                                )}
                                
                                <button 
                                  className="btn btn-outline-info btn-sm mb-1"
                                  data-bs-toggle="collapse"
                                  data-bs-target={`#details-${order.id}`}
                                >
                                  <i className="fal fa-eye me-1"></i>
                                  Ver detalles
                                </button>
                              </div>
                              
                              {/* Detalles expandibles */}
                              <div className="collapse mt-3" id={`details-${order.id}`}>
                                <div className="card card-body">
                                  <h6>Información del cliente:</h6>
                                  <p className="mb-2">
                                    <strong>Teléfono:</strong> {order.telefono_cliente}
                                  </p>
                                  <p className="mb-3">
                                    <strong>Dirección:</strong> {order.direccion_envio}
                                  </p>
                                  
                                  <h6>Productos:</h6>
                                  <div className="table-responsive">
                                    <table className="table table-sm">
                                      <thead>
                                        <tr>
                                          <th>Producto</th>
                                          <th>Cantidad</th>
                                          <th>Precio Unit.</th>
                                          <th>Subtotal</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {order.productos.map(product => (
                                          <tr key={product.id}>
                                            <td>{product.producto_nombre}</td>
                                            <td>{product.cantidad}</td>
                                            <td>${product.precio_unitario.toLocaleString('es-MX')}</td>
                                            <td>${product.subtotal.toLocaleString('es-MX')}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {filteredOrders.length === 0 && (
                    <div className="text-center py-5">
                      <i className="fal fa-inbox fa-3x text-muted mb-3"></i>
                      <h4>No hay órdenes</h4>
                      <p className="text-muted">No se encontraron órdenes con los filtros seleccionados.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Modal para información de envío */}
      {showTrackingModal && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Registrar envío - Orden #{selectedOrder?.id}</h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setShowTrackingModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Paquetería / Transportista *</label>
                  <select 
                    className="form-select"
                    value={trackingInfo.carrier}
                    onChange={(e) => setTrackingInfo(prev => ({ ...prev, carrier: e.target.value }))}
                  >
                    <option value="">Selecciona una paquetería</option>
                    <option value="DHL">DHL</option>
                    <option value="FedEx">FedEx</option>
                    <option value="UPS">UPS</option>
                    <option value="Estafeta">Estafeta</option>
                    <option value="Paquete Express">Paquete Express</option>
                    <option value="Mensajería propia">Mensajería propia</option>
                  </select>
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Número de guía *</label>
                  <input 
                    type="text"
                    className="form-control"
                    placeholder="Ej: 1234567890"
                    value={trackingInfo.tracking}
                    onChange={(e) => setTrackingInfo(prev => ({ ...prev, tracking: e.target.value }))}
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">URL de rastreo (opcional)</label>
                  <input 
                    type="url"
                    className="form-control"
                    placeholder="https://rastreo.paqueteria.com/..."
                    value={trackingInfo.tracking_url}
                    onChange={(e) => setTrackingInfo(prev => ({ ...prev, tracking_url: e.target.value }))}
                  />
                  <small className="text-muted">
                    Si no proporcionas la URL, se generará automáticamente según la paquetería
                  </small>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowTrackingModal(false)}
                >
                  Cancelar
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={submitTracking}
                >
                  <i className="fal fa-truck me-2"></i>
                  Registrar envío
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default PanelProveedor;