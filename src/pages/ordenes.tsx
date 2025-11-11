import React, { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "@/components/layout/Layout";
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
        <Head>
          <title>Mis Órdenes - AMCI</title>
        </Head>
        <Layout header={1} footer={1}>
          {/* Hero Section */}
          <section
            className="hero__area hero__area-ordenes"
            style={{
              position: 'relative',
              minHeight: '35vh',
              display: 'flex',
              alignItems: 'center',
              overflow: 'hidden',
              background: 'radial-gradient(ellipse at center, rgb(30, 64, 175) 0%, rgb(13, 27, 62) 50%, rgb(0, 15, 40) 100%)'
            }}
          >
            <div className="container position-relative" style={{ zIndex: 2, paddingTop: '70px', paddingBottom: '70px' }}>
              <div className="row">
                <div className="col-12 text-center">
                  <h1
                    className="display-4 fw-bold text-white mb-2"
                    style={{
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)',
                      fontSize: 'clamp(2rem, 5vw, 3rem)'
                    }}
                  >
                    Mis Órdenes
                  </h1>
                  <p className="text-white" style={{ textShadow: '1px 1px 6px rgba(0, 0, 0, 0.5)' }}>
                    Cargando...
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section style={{ background: '#f8f9fa', minHeight: '60vh', display: 'flex', alignItems: 'center', paddingTop: '80px', paddingBottom: '80px' }}>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xl-6 text-center">
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #0446F0 0%, #0338C0 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 30px',
                    boxShadow: '0 10px 30px rgba(4, 70, 240, 0.3)'
                  }}>
                    <div className="spinner-border text-white" role="status" style={{ width: '40px', height: '40px' }}>
                      <span className="visually-hidden">Cargando...</span>
                    </div>
                  </div>
                  <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a', marginBottom: '12px' }}>
                    Cargando tus órdenes
                  </h3>
                  <p style={{ fontSize: '16px', color: '#666' }}>
                    Por favor espera un momento...
                  </p>
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
        <Head>
          <title>Mis Órdenes - AMCI</title>
        </Head>
        <Layout header={1} footer={1}>
          {/* Hero Section */}
          <section
            className="hero__area hero__area-ordenes"
            style={{
              position: 'relative',
              minHeight: '35vh',
              display: 'flex',
              alignItems: 'center',
              overflow: 'hidden',
              background: 'radial-gradient(ellipse at center, rgb(30, 64, 175) 0%, rgb(13, 27, 62) 50%, rgb(0, 15, 40) 100%)'
            }}
          >
            <div className="container position-relative" style={{ zIndex: 2, paddingTop: '70px', paddingBottom: '70px' }}>
              <div className="row">
                <div className="col-12 text-center">
                  <h1
                    className="display-4 fw-bold text-white mb-2"
                    style={{
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)',
                      fontSize: 'clamp(2rem, 5vw, 3rem)'
                    }}
                  >
                    Mis Órdenes
                  </h1>
                  <p className="text-white" style={{ textShadow: '1px 1px 6px rgba(0, 0, 0, 0.5)', fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>
                    Historial de tus compras
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section style={{ background: '#f8f9fa', minHeight: '65vh', display: 'flex', alignItems: 'center', paddingTop: '80px', paddingBottom: '80px' }}>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xl-6 col-lg-8">
                  <div
                    style={{
                      background: '#ffffff',
                      borderRadius: '24px',
                      padding: '60px 40px',
                      textAlign: 'center',
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)'
                    }}
                  >
                    <div
                      style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        background: 'rgba(4, 70, 240, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 30px'
                      }}
                    >
                      <i className="fal fa-clipboard-list" style={{ fontSize: '48px', color: '#0446F0' }}></i>
                    </div>
                    <h3 style={{ fontSize: '28px', fontWeight: '700', color: '#1a1a1a', marginBottom: '16px' }}>
                      No tienes órdenes aún
                    </h3>
                    <p style={{ fontSize: '16px', color: '#666', marginBottom: '32px', lineHeight: '1.6' }}>
                      ¡Explora nuestro catálogo de productos industriales y realiza tu primera compra con proveedores certificados!
                    </p>
                    <Link
                      href="/catalogo"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        background: 'linear-gradient(135deg, #0446F0 0%, #0338C0 100%)',
                        color: '#ffffff',
                        padding: '16px 32px',
                        borderRadius: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                        textDecoration: 'none',
                        boxShadow: '0 4px 12px rgba(4, 70, 240, 0.3)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(4, 70, 240, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(4, 70, 240, 0.3)';
                      }}
                    >
                      <i className="fal fa-shopping-cart"></i>
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
      <Head>
        <title>Mis Órdenes - AMCI</title>
        <meta name="description" content="Consulta el historial y estado de tus órdenes en AMCI" />
      </Head>
      <Layout header={1} footer={1}>
        {/* Hero Section */}
        <section
          className="hero__area hero__area-ordenes"
          style={{
            position: 'relative',
            minHeight: '40vh',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            background: 'radial-gradient(ellipse at center, rgb(30, 64, 175) 0%, rgb(13, 27, 62) 50%, rgb(0, 15, 40) 100%)'
          }}
        >
          <div className="container position-relative" style={{ zIndex: 2, paddingTop: '80px', paddingBottom: '80px' }}>
            <div className="row">
              <div className="col-12">
                <div className="text-center">
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      background: 'rgba(16, 185, 129, 0.2)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      borderRadius: '30px',
                      padding: '8px 20px',
                      marginBottom: '20px',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <i className="fas fa-check-circle" style={{ color: '#10B981', fontSize: '16px' }}></i>
                    <span style={{ color: '#ffffff', fontSize: '14px', fontWeight: '600' }}>
                      {orders.length} {orders.length === 1 ? 'orden realizada' : 'órdenes realizadas'}
                    </span>
                  </div>
                  <h1
                    className="display-4 fw-bold text-white mb-3"
                    style={{
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)',
                      fontSize: 'clamp(2rem, 5vw, 3rem)'
                    }}
                  >
                    Mis Órdenes
                  </h1>
                  <p
                    className="text-white mx-auto"
                    style={{
                      textShadow: '1px 1px 6px rgba(0, 0, 0, 0.5)',
                      maxWidth: '600px',
                      fontSize: 'clamp(1rem, 2vw, 1.2rem)'
                    }}
                  >
                    Consulta el historial y estado de todas tus compras
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ background: '#f8f9fa', paddingTop: '80px', paddingBottom: '80px' }}>
          <div className="container">
            {/* Estadísticas del cliente - Rediseñadas */}
            <div className="row mb-5">
              <div className="col-xl-3 col-md-6 mb-4">
                <div
                  style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    padding: '30px 24px',
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(4, 70, 240, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.06)';
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '4px',
                    height: '100%',
                    background: 'linear-gradient(180deg, #0446F0 0%, #0338C0 100%)'
                  }}></div>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '14px',
                    background: 'rgba(4, 70, 240, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px'
                  }}>
                    <i className="fal fa-clipboard-list" style={{ fontSize: '28px', color: '#0446F0' }}></i>
                  </div>
                  <h3 style={{ fontSize: '32px', fontWeight: '700', color: '#0446F0', marginBottom: '8px' }}>
                    {orders.length}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#666', margin: 0, fontWeight: '500' }}>Total de órdenes</p>
                </div>
              </div>

              <div className="col-xl-3 col-md-6 mb-4">
                <div
                  style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    padding: '30px 24px',
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(245, 158, 11, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.06)';
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '4px',
                    height: '100%',
                    background: 'linear-gradient(180deg, #F59E0B 0%, #D97706 100%)'
                  }}></div>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '14px',
                    background: 'rgba(245, 158, 11, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px'
                  }}>
                    <i className="fal fa-clock" style={{ fontSize: '28px', color: '#F59E0B' }}></i>
                  </div>
                  <h3 style={{ fontSize: '32px', fontWeight: '700', color: '#F59E0B', marginBottom: '8px' }}>
                    {orders.filter(o => ['RECIBIDO', 'CONFIRMADO', 'ENVIADO'].includes(o.estado)).length}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#666', margin: 0, fontWeight: '500' }}>En proceso</p>
                </div>
              </div>

              <div className="col-xl-3 col-md-6 mb-4">
                <div
                  style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    padding: '30px 24px',
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.06)';
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '4px',
                    height: '100%',
                    background: 'linear-gradient(180deg, #10B981 0%, #059669 100%)'
                  }}></div>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '14px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px'
                  }}>
                    <i className="fal fa-check-circle" style={{ fontSize: '28px', color: '#10B981' }}></i>
                  </div>
                  <h3 style={{ fontSize: '32px', fontWeight: '700', color: '#10B981', marginBottom: '8px' }}>
                    {orders.filter(o => ['ENTREGADO', 'CERRADO'].includes(o.estado)).length}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#666', margin: 0, fontWeight: '500' }}>Completadas</p>
                </div>
              </div>

              <div className="col-xl-3 col-md-6 mb-4">
                <div
                  style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    padding: '30px 24px',
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(139, 92, 246, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.06)';
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '4px',
                    height: '100%',
                    background: 'linear-gradient(180deg, #8B5CF6 0%, #7C3AED 100%)'
                  }}></div>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '14px',
                    background: 'rgba(139, 92, 246, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px'
                  }}>
                    <i className="fal fa-dollar-sign" style={{ fontSize: '28px', color: '#8B5CF6' }}></i>
                  </div>
                  <h3 style={{ fontSize: '28px', fontWeight: '700', color: '#8B5CF6', marginBottom: '8px' }}>
                    ${orders.reduce((sum, order) => sum + order.total, 0).toLocaleString('es-MX')}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#666', margin: 0, fontWeight: '500' }}>Total gastado (MXN)</p>
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