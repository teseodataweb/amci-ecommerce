import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import Banner from "@/components/layout/banner/Banner";
import Link from "next/link";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

interface Order {
  id: number;
  fecha: string;
  total: number;
  estado: 'RECIBIDO' | 'CONFIRMADO' | 'ENVIADO' | 'ENTREGADO' | 'CERRADO' | 'CANCELADO';
  items_count: number;
  primer_producto: string;
  proveedor_principal: string;
}

const MisOrdenes = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('');

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/orders?userId=${user.id}`);

        if (response.ok) {
          const data = await response.json();
          const mappedOrders = data.orders.map((order: any) => ({
            id: order.numero_orden,
            fecha: order.fecha,
            total: order.total,
            estado: order.estado,
            items_count: order.items_count,
            primer_producto: order.items[0]?.product_name || 'Sin productos',
            proveedor_principal: 'Proveedor'
          }));
          setOrders(mappedOrders);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const filteredOrders = orders.filter(order => 
    !statusFilter || order.estado === statusFilter
  );

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
      'RECIBIDO': 'En espera de confirmación del proveedor',
      'CONFIRMADO': 'Confirmado por el proveedor, preparando envío',
      'ENVIADO': 'En camino a tu dirección',
      'ENTREGADO': 'Entregado exitosamente',
      'CERRADO': 'Orden completada',
      'CANCELADO': 'Orden cancelada'
    };
    return messages[status as keyof typeof messages] || 'Estado desconocido';
  };

  if (loading) {
    return (
      <ProtectedRoute requireAuth={true}>
        <Layout header={1} footer={1}>
          <Banner
            title="Mis Órdenes"
            subtitle="Cargando..."
            bg="bg-primary"
          />
          <section className="orders__area pt-120 pb-120">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xl-6 text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                  <p className="mt-3">Cargando tus órdenes...</p>
                </div>
              </div>
            </div>
          </section>
        </Layout>
      </ProtectedRoute>
    );
  }

  if (orders.length === 0 && !loading) {
    return (
      <ProtectedRoute requireAuth={true}>
        <Layout header={1} footer={1}>
          <Banner
            title="Mis Órdenes"
            subtitle="Historial de compras"
            bg="bg-primary"
          />

          <section className="orders__area pt-120 pb-120">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xl-6 text-center">
                  <div className="empty-orders">
                    <i className="fal fa-clipboard-list fa-5x text-muted mb-4"></i>
                    <h3 className="mb-3">No tienes órdenes aún</h3>
                    <p className="text-muted mb-4">
                      ¡Explora nuestro catálogo y realiza tu primera compra!
                    </p>
                    <Link href="/catalogo" className="btn btn-primary btn-lg">
                      <i className="fal fa-shopping-cart me-2"></i>
                      Explorar Catálogo
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Layout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requireAuth={true}>
      <Layout header={1} footer={1}>
      <Banner 
        title="Mis Órdenes"
        subtitle={`${orders.length} órdenes realizadas`}
        bg="bg-primary"
      />
      
      <section className="orders__area pt-120 pb-80">
        <div className="container">
          {/* Estadísticas del cliente */}
          <div className="row mb-5">
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="stat-card card text-center p-4 border-start border-primary border-4">
                <div className="stat-icon mb-3">
                  <i className="fal fa-clipboard-list fa-2x text-primary"></i>
                </div>
                <h3 className="stat-number text-primary">{orders.length}</h3>
                <p className="stat-label text-muted">Total de órdenes</p>
              </div>
            </div>
            
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="stat-card card text-center p-4 border-start border-warning border-4">
                <div className="stat-icon mb-3">
                  <i className="fal fa-clock fa-2x text-warning"></i>
                </div>
                <h3 className="stat-number text-warning">
                  {orders.filter(o => ['RECIBIDO', 'CONFIRMADO', 'ENVIADO'].includes(o.estado)).length}
                </h3>
                <p className="stat-label text-muted">En proceso</p>
              </div>
            </div>
            
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="stat-card card text-center p-4 border-start border-success border-4">
                <div className="stat-icon mb-3">
                  <i className="fal fa-check-circle fa-2x text-success"></i>
                </div>
                <h3 className="stat-number text-success">
                  {orders.filter(o => ['ENTREGADO', 'CERRADO'].includes(o.estado)).length}
                </h3>
                <p className="stat-label text-muted">Completadas</p>
              </div>
            </div>
            
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="stat-card card text-center p-4 border-start border-info border-4">
                <div className="stat-icon mb-3">
                  <i className="fal fa-dollar-sign fa-2x text-info"></i>
                </div>
                <h3 className="stat-number text-info">
                  ${orders.reduce((sum, order) => sum + order.total, 0).toLocaleString('es-MX')}
                </h3>
                <p className="stat-label text-muted">Total gastado (MXN)</p>
              </div>
            </div>
          </div>

          {/* Filtros */}
          <div className="row mb-4">
            <div className="col-xl-12">
              <div className="filters card p-4">
                <div className="row align-items-center">
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
                  
                  <div className="col-md-4 d-flex align-items-end">
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={() => setStatusFilter('')}
                    >
                      Limpiar filtro
                    </button>
                  </div>
                  
                  <div className="col-md-4 d-flex align-items-end justify-content-end">
                    <Link href="/catalogo" className="btn btn-primary">
                      <i className="fal fa-plus me-2"></i>
                      Nueva Compra
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de órdenes */}
          <div className="row">
            <div className="col-xl-12">
              <div className="orders-list">
                {filteredOrders.map(order => (
                  <div key={order.id} className="order-card card mb-4">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-xl-2 col-md-6 mb-3 mb-xl-0">
                          <div className="order-number">
                            <h5 className="mb-1">Orden #{order.id}</h5>
                            <small className="text-muted">
                              {new Date(order.fecha).toLocaleDateString('es-MX')}
                            </small>
                          </div>
                        </div>
                        
                        <div className="col-xl-4 col-md-6 mb-3 mb-xl-0">
                          <div className="order-products">
                            <h6 className="mb-1">{order.primer_producto}</h6>
                            <small className="text-muted">
                              {order.items_count > 1 && `+${order.items_count - 1} producto(s) más`}
                            </small>
                            <div className="mt-1">
                              <span className="badge bg-primary">{order.proveedor_principal}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="col-xl-2 col-md-6 mb-3 mb-xl-0">
                          <div className="order-total">
                            <h5 className="mb-1 text-success">
                              ${order.total.toLocaleString('es-MX')}
                            </h5>
                            <small className="text-muted">MXN</small>
                          </div>
                        </div>
                        
                        <div className="col-xl-2 col-md-6 mb-3 mb-xl-0">
                          <div className="order-status text-center">
                            <span className={`badge ${getStatusBadgeClass(order.estado)} mb-1`}>
                              {order.estado}
                            </span>
                            <div>
                              <small className="text-muted">
                                {getStatusMessage(order.estado)}
                              </small>
                            </div>
                          </div>
                        </div>
                        
                        <div className="col-xl-2 col-md-12">
                          <div className="order-actions text-center">
                            <Link 
                              href={`/orden/${order.id}`}
                              className="btn btn-outline-primary btn-sm w-100"
                            >
                              <i className="fal fa-eye me-1"></i>
                              Ver Detalles
                            </Link>
                            
                            {['ENVIADO', 'ENTREGADO'].includes(order.estado) && (
                              <button 
                                className="btn btn-outline-info btn-sm w-100 mt-2"
                                onClick={() => alert('Función de rastreo en desarrollo')}
                              >
                                <i className="fal fa-truck me-1"></i>
                                Rastrear
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredOrders.length === 0 && (
                  <div className="text-center py-5">
                    <i className="fal fa-search fa-3x text-muted mb-3"></i>
                    <h4>No se encontraron órdenes</h4>
                    <p className="text-muted">No hay órdenes con el estado seleccionado.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      </Layout>
    </ProtectedRoute>
  );
};

export default MisOrdenes;