import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import Banner from "@/components/layout/banner/Banner";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

interface Product {
  id: string;
  nombre: string;
  categoria: string;
  proveedor: string;
  precio: number | null;
  precio_modo: 'precio' | 'cotizar';
  estado: 'pendiente' | 'aprobado' | 'pausado';
  imagen: string;
  created_at: string;
  descripcion: string;
}

interface Order {
  id: string;
  cliente_nombre: string;
  cliente_email: string;
  proveedor: string;
  total: number;
  estado: 'RECIBIDO' | 'CONFIRMADO' | 'ENVIADO' | 'ENTREGADO' | 'CERRADO' | 'CANCELADO';
  created_at: string;
  productos: string[];
}

interface Provider {
  id: string;
  razon_social: string;
  rfc: string;
  email: string;
  name: string;
  phone: string;
  active: boolean;
  created_at: string;
}

const AdminPanel = () => {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'providers' | 'settings'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSales: 0,
    pendingProducts: 0,
    activeProducts: 0,
    pendingProviders: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [productsRes, ordersRes, statsRes, providersRes] = await Promise.all([
          fetch('/api/admin/products'),
          fetch('/api/admin/orders'),
          fetch('/api/admin/stats'),
          fetch('/api/admin/providers')
        ]);

        if (productsRes.ok) {
          const productsData = await productsRes.json();
          setProducts(productsData.products.map((p: any) => ({
            id: p.id,
            nombre: p.nombre,
            categoria: p.categoria,
            proveedor: p.proveedor,
            precio: p.precio,
            precio_modo: p.precio_modo,
            estado: p.estado,
            imagen: p.imagen,
            created_at: p.created_at,
            descripcion: p.descripcion
          })));
        }

        if (ordersRes.ok) {
          const ordersData = await ordersRes.json();
          setOrders(ordersData.orders.map((o: any) => ({
            id: o.numero_orden,
            cliente_nombre: o.cliente_nombre,
            cliente_email: o.cliente_email,
            proveedor: o.proveedor,
            total: o.total,
            estado: o.estado,
            created_at: o.created_at,
            productos: o.productos
          })));
        }

        if (providersRes.ok) {
          const providersData = await providersRes.json();
          setProviders(providersData.providers);
        }

        if (statsRes.ok) {
          const statsData = await statsRes.json();
          const pendingProviders = providers.filter(p => !p.active).length;
          setStats({
            totalOrders: statsData.totalOrders,
            totalSales: statsData.totalSales,
            pendingProducts: statsData.pendingProducts,
            activeProducts: statsData.activeProducts,
            pendingProviders: pendingProviders
          });
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user && profile?.role === 'ADMIN') {
      fetchData();
    }
  }, [user, profile]);

  // Configuraciones
  const [settings, setSettings] = useState({
    comision_amci_percent: 10,
    periodo_dispersion: 15,
    envio_notificaciones: true,
    aprobacion_automatica: false
  });

  // Funciones para productos
  const approveProduct = async (productId: string) => {
    try {
      const response = await fetch('/api/admin/products', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, action: 'approve' })
      });

      if (response.ok) {
        setProducts(prevProducts =>
          prevProducts.map(product =>
            product.id === productId ? { ...product, estado: 'aprobado' as const } : product
          )
        );
        alert('Producto aprobado exitosamente');
      }
    } catch (error) {
      console.error('Error approving product:', error);
      alert('Error al aprobar el producto');
    }
  };

  const pauseProduct = async (productId: string) => {
    try {
      const response = await fetch('/api/admin/products', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, action: 'pause' })
      });

      if (response.ok) {
        setProducts(prevProducts =>
          prevProducts.map(product =>
            product.id === productId ? { ...product, estado: 'pausado' as const } : product
          )
        );
        alert('Producto pausado exitosamente');
      }
    } catch (error) {
      console.error('Error pausing product:', error);
      alert('Error al pausar el producto');
    }
  };

  const rejectProduct = async (productId: string) => {
    if (confirm('¿Estás seguro de rechazar este producto? Esta acción no se puede deshacer.')) {
      try {
        const response = await fetch('/api/admin/products', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId, action: 'reject' })
        });

        if (response.ok) {
          setProducts(prevProducts =>
            prevProducts.filter(product => product.id !== productId)
          );
          alert('Producto rechazado y eliminado');
        }
      } catch (error) {
        console.error('Error rejecting product:', error);
        alert('Error al rechazar el producto');
      }
    }
  };

  const getProductStatusBadge = (status: string) => {
    const statusMap = {
      'pendiente': 'bg-warning',
      'aprobado': 'bg-success',
      'pausado': 'bg-secondary'
    };
    return statusMap[status as keyof typeof statusMap] || 'bg-secondary';
  };

  const getOrderStatusBadge = (status: string) => {
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

  const handleSettingsChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = () => {
    // Aquí se enviarían las configuraciones a la API
    alert('Configuraciones guardadas exitosamente');
  };

  // Funciones para proveedores
  const approveProvider = async (providerId: string) => {
    try {
      const response = await fetch('/api/admin/providers', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ providerId, action: 'approve' })
      });

      if (response.ok) {
        setProviders(prevProviders =>
          prevProviders.map(provider =>
            provider.id === providerId ? { ...provider, active: true } : provider
          )
        );
        alert('Proveedor aprobado exitosamente');
      }
    } catch (error) {
      console.error('Error approving provider:', error);
      alert('Error al aprobar el proveedor');
    }
  };

  const rejectProvider = async (providerId: string) => {
    if (confirm('¿Estás seguro de rechazar este proveedor? Esta acción no se puede deshacer.')) {
      try {
        const response = await fetch('/api/admin/providers', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ providerId, action: 'reject' })
        });

        if (response.ok) {
          setProviders(prevProviders =>
            prevProviders.filter(provider => provider.id !== providerId)
          );
          alert('Proveedor rechazado');
        }
      } catch (error) {
        console.error('Error rejecting provider:', error);
        alert('Error al rechazar el proveedor');
      }
    }
  };

  return (
    <ProtectedRoute requiredRole="ADMIN">
      <Layout header={1} footer={1}>
      <Banner 
        title="Panel de Administración AMCI"
        subtitle="Gestión completa del marketplace"
        bg="bg-dark"
      />
      
      <section className="admin__panel pt-120 pb-80">
        <div className="container">
          {/* Estadísticas generales */}
          {loading ? (
            <div className="row mb-5">
              <div className="col-12 text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando estadísticas...</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="row mb-5">
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="stat-card card text-center p-4 border-start border-primary border-4">
                  <div className="stat-icon mb-3">
                    <i className="fal fa-shopping-cart fa-2x text-primary"></i>
                  </div>
                  <h3 className="stat-number text-primary">{stats.totalOrders}</h3>
                  <p className="stat-label text-muted">Órdenes totales</p>
                </div>
              </div>

              <div className="col-xl-3 col-md-6 mb-4">
                <div className="stat-card card text-center p-4 border-start border-warning border-4">
                  <div className="stat-icon mb-3">
                    <i className="fal fa-clock fa-2x text-warning"></i>
                  </div>
                  <h3 className="stat-number text-warning">{stats.pendingProducts}</h3>
                  <p className="stat-label text-muted">Productos pendientes</p>
                </div>
              </div>

              <div className="col-xl-3 col-md-6 mb-4">
                <div className="stat-card card text-center p-4 border-start border-success border-4">
                  <div className="stat-icon mb-3">
                    <i className="fal fa-check-circle fa-2x text-success"></i>
                  </div>
                  <h3 className="stat-number text-success">{stats.activeProducts}</h3>
                  <p className="stat-label text-muted">Productos activos</p>
                </div>
              </div>

              <div className="col-xl-3 col-md-6 mb-4">
                <div className="stat-card card text-center p-4 border-start border-info border-4">
                  <div className="stat-icon mb-3">
                    <i className="fal fa-dollar-sign fa-2x text-info"></i>
                  </div>
                  <h3 className="stat-number text-info">
                    ${stats.totalSales.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </h3>
                  <p className="stat-label text-muted">Ventas totales (MXN)</p>
                </div>
              </div>
            </div>
          )}

          {/* Navegación por pestañas */}
          <div className="row">
            <div className="col-12">
              <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'products' ? 'active' : ''}`}
                    onClick={() => setActiveTab('products')}
                  >
                    <i className="fal fa-box me-2"></i>
                    Productos
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`}
                    onClick={() => setActiveTab('orders')}
                  >
                    <i className="fal fa-clipboard-list me-2"></i>
                    Órdenes
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'providers' ? 'active' : ''}`}
                    onClick={() => setActiveTab('providers')}
                  >
                    <i className="fal fa-users me-2"></i>
                    Proveedores
                    {providers.filter(p => !p.active).length > 0 && (
                      <span className="badge bg-danger ms-2">
                        {providers.filter(p => !p.active).length}
                      </span>
                    )}
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'settings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('settings')}
                  >
                    <i className="fal fa-cog me-2"></i>
                    Configuración
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Contenido de pestañas */}
          {activeTab === 'products' && (
            <div className="products-tab">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h4 className="mb-0">Gestión de Productos</h4>
                      <span className="badge bg-warning">
                        {products.filter(p => p.estado === 'pendiente').length} pendientes de aprobación
                      </span>
                    </div>
                    
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>Producto</th>
                              <th>Proveedor</th>
                              <th>Precio</th>
                              <th>Estado</th>
                              <th>Fecha</th>
                              <th>Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {products.map(product => (
                              <tr key={product.id}>
                                <td>
                                  <div className="product-info d-flex align-items-center">
                                    <img 
                                      src={product.imagen}
                                      alt={product.nombre}
                                      className="me-3"
                                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                    />
                                    <div>
                                      <h6 className="mb-1">{product.nombre}</h6>
                                      <small className="text-muted">{product.categoria}</small>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <span className="badge bg-primary">{product.proveedor}</span>
                                </td>
                                <td>
                                  {product.precio_modo === 'precio' ? (
                                    <span className="fw-bold text-success">
                                      ${product.precio?.toLocaleString('es-MX')} MXN
                                    </span>
                                  ) : (
                                    <span className="text-warning">Cotización</span>
                                  )}
                                </td>
                                <td>
                                  <span className={`badge ${getProductStatusBadge(product.estado)}`}>
                                    {product.estado.toUpperCase()}
                                  </span>
                                </td>
                                <td>
                                  {new Date(product.created_at).toLocaleDateString('es-MX')}
                                </td>
                                <td>
                                  <div className="action-buttons">
                                    {product.estado === 'pendiente' && (
                                      <>
                                        <button 
                                          className="btn btn-success btn-sm me-1 mb-1"
                                          onClick={() => approveProduct(product.id)}
                                        >
                                          <i className="fal fa-check me-1"></i>
                                          Aprobar
                                        </button>
                                        <button 
                                          className="btn btn-danger btn-sm me-1 mb-1"
                                          onClick={() => rejectProduct(product.id)}
                                        >
                                          <i className="fal fa-times me-1"></i>
                                          Rechazar
                                        </button>
                                      </>
                                    )}
                                    
                                    {product.estado === 'aprobado' && (
                                      <button 
                                        className="btn btn-warning btn-sm me-1 mb-1"
                                        onClick={() => pauseProduct(product.id)}
                                      >
                                        <i className="fal fa-pause me-1"></i>
                                        Pausar
                                      </button>
                                    )}
                                    
                                    {product.estado === 'pausado' && (
                                      <button 
                                        className="btn btn-success btn-sm me-1 mb-1"
                                        onClick={() => approveProduct(product.id)}
                                      >
                                        <i className="fal fa-play me-1"></i>
                                        Activar
                                      </button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="orders-tab">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="mb-0">Órdenes Recientes</h4>
                    </div>
                    
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>Orden #</th>
                              <th>Cliente</th>
                              <th>Proveedor</th>
                              <th>Productos</th>
                              <th>Total</th>
                              <th>Estado</th>
                              <th>Fecha</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orders.map(order => (
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
                                  <span className="badge bg-primary">{order.proveedor}</span>
                                </td>
                                <td>
                                  <div className="products-list">
                                    {order.productos.map((product, index) => (
                                      <div key={index}>
                                        <small>{product}</small>
                                      </div>
                                    ))}
                                  </div>
                                </td>
                                <td>
                                  <strong>${order.total.toLocaleString('es-MX')} MXN</strong>
                                </td>
                                <td>
                                  <span className={`badge ${getOrderStatusBadge(order.estado)}`}>
                                    {order.estado}
                                  </span>
                                </td>
                                <td>
                                  {new Date(order.created_at).toLocaleDateString('es-MX')}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'providers' && (
            <div className="providers-tab">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h4 className="mb-0">
                        Proveedores
                        {providers.filter(p => !p.active).length > 0 && (
                          <span className="badge bg-warning text-dark ms-2">
                            {providers.filter(p => !p.active).length} pendientes
                          </span>
                        )}
                      </h4>
                    </div>

                    <div className="card-body">
                      {/* Tabla de proveedores */}
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>Razón Social</th>
                              <th>RFC</th>
                              <th>Contacto</th>
                              <th>Email</th>
                              <th>Teléfono</th>
                              <th>Estado</th>
                              <th>Fecha de registro</th>
                              <th>Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {providers.length === 0 ? (
                              <tr>
                                <td colSpan={8} className="text-center py-5">
                                  <i className="fal fa-users fa-3x text-muted mb-3"></i>
                                  <p className="text-muted">No hay proveedores registrados</p>
                                </td>
                              </tr>
                            ) : (
                              providers.map((provider) => (
                                <tr key={provider.id}>
                                  <td>
                                    <strong>{provider.razon_social}</strong>
                                  </td>
                                  <td>{provider.rfc}</td>
                                  <td>{provider.name || 'N/A'}</td>
                                  <td>
                                    <small>{provider.email}</small>
                                  </td>
                                  <td>{provider.phone || 'N/A'}</td>
                                  <td>
                                    {provider.active ? (
                                      <span className="badge bg-success">Activo</span>
                                    ) : (
                                      <span className="badge bg-warning text-dark">Pendiente</span>
                                    )}
                                  </td>
                                  <td>
                                    <small>
                                      {new Date(provider.created_at).toLocaleDateString('es-MX')}
                                    </small>
                                  </td>
                                  <td>
                                    {!provider.active ? (
                                      <div className="btn-group" role="group">
                                        <button
                                          className="btn btn-success btn-sm"
                                          onClick={() => approveProvider(provider.id)}
                                          title="Aprobar proveedor"
                                        >
                                          <i className="fal fa-check"></i>
                                        </button>
                                        <button
                                          className="btn btn-danger btn-sm"
                                          onClick={() => rejectProvider(provider.id)}
                                          title="Rechazar proveedor"
                                        >
                                          <i className="fal fa-times"></i>
                                        </button>
                                      </div>
                                    ) : (
                                      <button
                                        className="btn btn-info btn-sm"
                                        onClick={() => alert('Ver detalles del proveedor')}
                                      >
                                        <i className="fal fa-eye me-1"></i>
                                        Ver
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-tab">
              <div className="row">
                <div className="col-xl-8">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="mb-0">Configuración General</h4>
                    </div>
                    
                    <div className="card-body">
                      <form onSubmit={(e) => { e.preventDefault(); saveSettings(); }}>
                        {/* Configuración de comisiones */}
                        <div className="settings-section mb-4">
                          <h5 className="section-title mb-3">Comisiones y Pagos</h5>
                          
                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <label className="form-label">Comisión AMCI (%)</label>
                              <div className="input-group">
                                <input
                                  type="number"
                                  className="form-control"
                                  min="0"
                                  max="100"
                                  step="0.1"
                                  value={settings.comision_amci_percent}
                                  onChange={(e) => handleSettingsChange('comision_amci_percent', parseFloat(e.target.value))}
                                />
                                <span className="input-group-text">%</span>
                              </div>
                              <small className="text-muted">
                                Comisión aplicada sobre el subtotal antes de IVA y envío
                              </small>
                            </div>
                            
                            <div className="col-md-6 mb-3">
                              <label className="form-label">Período de dispersión</label>
                              <select 
                                className="form-select"
                                value={settings.periodo_dispersion}
                                onChange={(e) => handleSettingsChange('periodo_dispersion', parseInt(e.target.value))}
                              >
                                <option value="15">Cada 15 días</option>
                                <option value="30">Cada 30 días</option>
                                <option value="7">Semanal (7 días)</option>
                              </select>
                              <small className="text-muted">
                                Frecuencia con la que se dispersan los pagos a proveedores
                              </small>
                            </div>
                          </div>
                        </div>
                        
                        {/* Configuración de notificaciones */}
                        <div className="settings-section mb-4">
                          <h5 className="section-title mb-3">Notificaciones</h5>
                          
                          <div className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="envio_notificaciones"
                              checked={settings.envio_notificaciones}
                              onChange={(e) => handleSettingsChange('envio_notificaciones', e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="envio_notificaciones">
                              Enviar notificaciones automáticas por email
                            </label>
                          </div>
                        </div>
                        
                        {/* Configuración de productos */}
                        <div className="settings-section mb-4">
                          <h5 className="section-title mb-3">Gestión de Productos</h5>
                          
                          <div className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="aprobacion_automatica"
                              checked={settings.aprobacion_automatica}
                              onChange={(e) => handleSettingsChange('aprobacion_automatica', e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="aprobacion_automatica">
                              Aprobación automática de productos
                            </label>
                            <small className="text-muted d-block">
                              Los productos de proveedores verificados se aprobarán automáticamente
                            </small>
                          </div>
                        </div>
                        
                        <div className="settings-actions">
                          <button type="submit" className="btn btn-primary">
                            <i className="fal fa-save me-2"></i>
                            Guardar configuración
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                
                {/* Información adicional */}
                <div className="col-xl-4">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">Información del Sistema</h5>
                    </div>
                    <div className="card-body">
                      <ul className="list-unstyled">
                        <li className="mb-3">
                          <div className="d-flex justify-content-between">
                            <span>Versión:</span>
                            <span className="badge bg-primary">MVP 1.0</span>
                          </div>
                        </li>
                        <li className="mb-3">
                          <div className="d-flex justify-content-between">
                            <span>Proveedores activos:</span>
                            <span className="fw-bold">4</span>
                          </div>
                        </li>
                        <li className="mb-3">
                          <div className="d-flex justify-content-between">
                            <span>Productos totales:</span>
                            <span className="fw-bold">{products.length}</span>
                          </div>
                        </li>
                        <li className="mb-3">
                          <div className="d-flex justify-content-between">
                            <span>Última actualización:</span>
                            <span className="text-muted">Hoy</span>
                          </div>
                        </li>
                      </ul>
                      
                      <div className="alert alert-info mt-4">
                        <i className="fal fa-info-circle me-2"></i>
                        <small>
                          <strong>Recordatorio:</strong> Revisa los productos pendientes de aprobación regularmente 
                          para mantener la calidad del catálogo.
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      </Layout>
    </ProtectedRoute>
  );
};

export default AdminPanel;