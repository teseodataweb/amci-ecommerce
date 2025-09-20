import React, { useState, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import Banner from "@/components/layout/banner/Banner";

interface ReportItem {
  id: number;
  fecha: string;
  orden_id: number;
  cliente: string;
  proveedor: string;
  producto: string;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
  envio: number;
  comision_amci: number;
  neto_proveedor: number;
  estado_dispersion: 'pendiente' | 'dispersado';
  fecha_dispersion: string | null;
}

const Reportes = () => {
  // Datos de muestra para reportes
  const [reportData] = useState<ReportItem[]>([
    {
      id: 1,
      fecha: "2024-01-15",
      orden_id: 1001,
      cliente: "Juan Pérez García",
      proveedor: "AP Safety", 
      producto: "Kit EPP Básico - 1 Persona",
      cantidad: 2,
      precio_unitario: 450,
      subtotal: 900,
      envio: 150,
      comision_amci: 90,
      neto_proveedor: 810,
      estado_dispersion: 'pendiente',
      fecha_dispersion: null
    },
    {
      id: 2,
      fecha: "2024-01-14",
      orden_id: 1002,
      cliente: "María González",
      proveedor: "Pumping Team",
      producto: "Bomba Sumergible Industrial",
      cantidad: 1,
      precio_unitario: 15000,
      subtotal: 15000,
      envio: 500,
      comision_amci: 1500,
      neto_proveedor: 13500,
      estado_dispersion: 'dispersado',
      fecha_dispersion: "2024-01-20"
    },
    {
      id: 3,
      fecha: "2024-01-13",
      orden_id: 1003,
      cliente: "Carlos Rodríguez",
      proveedor: "MTM",
      producto: "Refacciones Hidráulicas",
      cantidad: 3,
      precio_unitario: 250,
      subtotal: 750,
      envio: 120,
      comision_amci: 75,
      neto_proveedor: 675,
      estado_dispersion: 'pendiente',
      fecha_dispersion: null
    },
    {
      id: 4,
      fecha: "2024-01-12",
      orden_id: 1004,
      cliente: "Ana Martínez",
      proveedor: "Plásticos Torres",
      producto: "Plafones LED Pack x10",
      cantidad: 2,
      precio_unitario: 1200,
      subtotal: 2400,
      envio: 200,
      comision_amci: 240,
      neto_proveedor: 2160,
      estado_dispersion: 'dispersado',
      fecha_dispersion: "2024-01-18"
    },
    {
      id: 5,
      fecha: "2024-01-11",
      orden_id: 1005,
      cliente: "Roberto Silva",
      proveedor: "AP Safety",
      producto: "Kit EPP Avanzado - 5 Personas",
      cantidad: 1,
      precio_unitario: 2200,
      subtotal: 2200,
      envio: 180,
      comision_amci: 220,
      neto_proveedor: 1980,
      estado_dispersion: 'pendiente',
      fecha_dispersion: null
    }
  ]);

  // Estados para filtros
  const [filters, setFilters] = useState({
    fecha_desde: '',
    fecha_hasta: '',
    proveedor: '',
    estado_dispersion: ''
  });

  // Estado para edición de dispersión
  const [editingDispersion, setEditingDispersion] = useState<number | null>(null);
  const [editingDate, setEditingDate] = useState<string>('');

  // Obtener lista única de proveedores
  const proveedores = useMemo(() => 
    [...new Set(reportData.map(item => item.proveedor))],
    [reportData]
  );

  // Filtrar datos según los filtros aplicados
  const filteredData = useMemo(() => {
    return reportData.filter(item => {
      const fechaItem = new Date(item.fecha);
      const fechaDesde = filters.fecha_desde ? new Date(filters.fecha_desde) : null;
      const fechaHasta = filters.fecha_hasta ? new Date(filters.fecha_hasta) : null;

      return (
        (!fechaDesde || fechaItem >= fechaDesde) &&
        (!fechaHasta || fechaItem <= fechaHasta) &&
        (!filters.proveedor || item.proveedor === filters.proveedor) &&
        (!filters.estado_dispersion || item.estado_dispersion === filters.estado_dispersion)
      );
    });
  }, [reportData, filters]);

  // Calcular totales
  const totales = useMemo(() => {
    return filteredData.reduce((acc, item) => ({
      subtotal: acc.subtotal + item.subtotal,
      envio: acc.envio + item.envio,
      comision_amci: acc.comision_amci + item.comision_amci,
      neto_proveedor: acc.neto_proveedor + item.neto_proveedor
    }), {
      subtotal: 0,
      envio: 0,
      comision_amci: 0,
      neto_proveedor: 0
    });
  }, [filteredData]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      fecha_desde: '',
      fecha_hasta: '',
      proveedor: '',
      estado_dispersion: ''
    });
  };

  // Función para exportar a CSV
  const exportToCSV = () => {
    const headers = [
      'Fecha',
      'Orden ID',
      'Cliente',
      'Proveedor', 
      'Producto',
      'Cantidad',
      'Precio Unitario (MXN)',
      'Subtotal (MXN)',
      'Envío (MXN)',
      'Comisión AMCI (MXN)',
      'Neto Proveedor (MXN)',
      'Estado Dispersión',
      'Fecha Dispersión'
    ];

    const csvContent = [
      headers.join(','),
      ...filteredData.map(item => [
        item.fecha,
        item.orden_id,
        `"${item.cliente.replace(/"/g, '""')}"`,
        `"${item.proveedor.replace(/"/g, '""')}"`,
        `"${item.producto.replace(/"/g, '""')}"`,
        item.cantidad,
        item.precio_unitario,
        item.subtotal,
        item.envio,
        item.comision_amci,
        item.neto_proveedor,
        item.estado_dispersion,
        item.fecha_dispersion || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `reporte_ventas_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Función para marcar como dispersado
  const markAsDispersed = (id: number, fecha: string) => {
    // En una app real, esto se enviaría al servidor
    console.log(`Marcando como dispersado: ID ${id}, Fecha: ${fecha}`);
    setEditingDispersion(null);
    alert('Estado de dispersión actualizado exitosamente');
  };

  const startEditingDispersion = (id: number, currentDate: string | null) => {
    setEditingDispersion(id);
    setEditingDate(currentDate || new Date().toISOString().split('T')[0]);
  };

  return (
    <Layout header={1} footer={1}>
      <Banner 
        title="Reportes de Ventas"
        subtitle="Conciliación y dispersión por proveedor"
        bg="bg-primary"
      />
      
      <section className="reports__area pt-120 pb-80">
        <div className="container">
          {/* Tarjetas de resumen */}
          <div className="row mb-5">
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="summary-card card text-center p-4 border-start border-primary border-4">
                <div className="card-icon mb-3">
                  <i className="fal fa-chart-line fa-2x text-primary"></i>
                </div>
                <h4 className="text-primary">${totales.subtotal.toLocaleString('es-MX')}</h4>
                <p className="text-muted">Ventas Totales</p>
              </div>
            </div>
            
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="summary-card card text-center p-4 border-start border-warning border-4">
                <div className="card-icon mb-3">
                  <i className="fal fa-percentage fa-2x text-warning"></i>
                </div>
                <h4 className="text-warning">${totales.comision_amci.toLocaleString('es-MX')}</h4>
                <p className="text-muted">Comisión AMCI</p>
              </div>
            </div>
            
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="summary-card card text-center p-4 border-start border-success border-4">
                <div className="card-icon mb-3">
                  <i className="fal fa-money-bill-wave fa-2x text-success"></i>
                </div>
                <h4 className="text-success">${totales.neto_proveedor.toLocaleString('es-MX')}</h4>
                <p className="text-muted">Neto Proveedores</p>
              </div>
            </div>
            
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="summary-card card text-center p-4 border-start border-info border-4">
                <div className="card-icon mb-3">
                  <i className="fal fa-truck fa-2x text-info"></i>
                </div>
                <h4 className="text-info">${totales.envio.toLocaleString('es-MX')}</h4>
                <p className="text-muted">Costos de Envío</p>
              </div>
            </div>
          </div>

          {/* Filtros y acciones */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="filters-card card p-4">
                <div className="row align-items-end">
                  <div className="col-xl-2 col-md-6 mb-3">
                    <label className="form-label">Fecha desde</label>
                    <input
                      type="date"
                      className="form-control"
                      value={filters.fecha_desde}
                      onChange={(e) => handleFilterChange('fecha_desde', e.target.value)}
                    />
                  </div>
                  
                  <div className="col-xl-2 col-md-6 mb-3">
                    <label className="form-label">Fecha hasta</label>
                    <input
                      type="date"
                      className="form-control"
                      value={filters.fecha_hasta}
                      onChange={(e) => handleFilterChange('fecha_hasta', e.target.value)}
                    />
                  </div>
                  
                  <div className="col-xl-3 col-md-6 mb-3">
                    <label className="form-label">Proveedor</label>
                    <select
                      className="form-select"
                      value={filters.proveedor}
                      onChange={(e) => handleFilterChange('proveedor', e.target.value)}
                    >
                      <option value="">Todos los proveedores</option>
                      {proveedores.map(proveedor => (
                        <option key={proveedor} value={proveedor}>
                          {proveedor}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="col-xl-2 col-md-6 mb-3">
                    <label className="form-label">Estado</label>
                    <select
                      className="form-select"
                      value={filters.estado_dispersion}
                      onChange={(e) => handleFilterChange('estado_dispersion', e.target.value)}
                    >
                      <option value="">Todos los estados</option>
                      <option value="pendiente">Pendiente</option>
                      <option value="dispersado">Dispersado</option>
                    </select>
                  </div>
                  
                  <div className="col-xl-3 col-md-12 mb-3">
                    <div className="action-buttons d-flex gap-2">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={clearFilters}
                      >
                        <i className="fal fa-eraser me-1"></i>
                        Limpiar
                      </button>
                      
                      <button
                        className="btn btn-success"
                        onClick={exportToCSV}
                        disabled={filteredData.length === 0}
                      >
                        <i className="fal fa-download me-1"></i>
                        Exportar CSV
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabla de reportes */}
          <div className="row">
            <div className="col-12">
              <div className="reports-table card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h4 className="mb-0">
                    Reporte Detallado ({filteredData.length} registros)
                  </h4>
                  <div className="summary-info">
                    <span className="badge bg-warning me-2">
                      Pendientes: {filteredData.filter(item => item.estado_dispersion === 'pendiente').length}
                    </span>
                    <span className="badge bg-success">
                      Dispersados: {filteredData.filter(item => item.estado_dispersion === 'dispersado').length}
                    </span>
                  </div>
                </div>
                
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead className="table-light">
                        <tr>
                          <th>Fecha</th>
                          <th>Orden</th>
                          <th>Cliente</th>
                          <th>Proveedor</th>
                          <th>Producto</th>
                          <th>Cant.</th>
                          <th>Subtotal</th>
                          <th>Envío</th>
                          <th>Comisión AMCI</th>
                          <th>Neto Proveedor</th>
                          <th>Estado</th>
                          <th>Fecha Dispersión</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.map(item => (
                          <tr key={item.id}>
                            <td>{new Date(item.fecha).toLocaleDateString('es-MX')}</td>
                            <td>
                              <strong>#{item.orden_id}</strong>
                            </td>
                            <td>
                              <div className="customer-info">
                                <div className="fw-bold">{item.cliente}</div>
                              </div>
                            </td>
                            <td>
                              <span className="badge bg-primary">{item.proveedor}</span>
                            </td>
                            <td>
                              <div className="product-info">
                                <div>{item.producto}</div>
                                <small className="text-muted">
                                  ${item.precio_unitario.toLocaleString('es-MX')} c/u
                                </small>
                              </div>
                            </td>
                            <td className="text-center">
                              <span className="badge bg-light text-dark">{item.cantidad}</span>
                            </td>
                            <td className="text-end">
                              <strong>${item.subtotal.toLocaleString('es-MX')}</strong>
                            </td>
                            <td className="text-end">
                              ${item.envio.toLocaleString('es-MX')}
                            </td>
                            <td className="text-end text-warning">
                              <strong>${item.comision_amci.toLocaleString('es-MX')}</strong>
                            </td>
                            <td className="text-end text-success">
                              <strong>${item.neto_proveedor.toLocaleString('es-MX')}</strong>
                            </td>
                            <td>
                              <span className={`badge ${
                                item.estado_dispersion === 'dispersado' 
                                  ? 'bg-success' 
                                  : 'bg-warning'
                              }`}>
                                {item.estado_dispersion.toUpperCase()}
                              </span>
                            </td>
                            <td>
                              {editingDispersion === item.id ? (
                                <div className="d-flex align-items-center gap-2">
                                  <input
                                    type="date"
                                    className="form-control form-control-sm"
                                    style={{ width: '140px' }}
                                    value={editingDate}
                                    onChange={(e) => setEditingDate(e.target.value)}
                                  />
                                  <button
                                    className="btn btn-success btn-sm"
                                    onClick={() => markAsDispersed(item.id, editingDate)}
                                  >
                                    <i className="fal fa-check"></i>
                                  </button>
                                  <button
                                    className="btn btn-secondary btn-sm"
                                    onClick={() => setEditingDispersion(null)}
                                  >
                                    <i className="fal fa-times"></i>
                                  </button>
                                </div>
                              ) : (
                                <div>
                                  {item.fecha_dispersion ? (
                                    <span className="text-success">
                                      {new Date(item.fecha_dispersion).toLocaleDateString('es-MX')}
                                    </span>
                                  ) : (
                                    <span className="text-muted">Pendiente</span>
                                  )}
                                </div>
                              )}
                            </td>
                            <td>
                              {item.estado_dispersion === 'pendiente' && editingDispersion !== item.id && (
                                <button
                                  className="btn btn-outline-primary btn-sm"
                                  onClick={() => startEditingDispersion(item.id, item.fecha_dispersion)}
                                >
                                  <i className="fal fa-edit me-1"></i>
                                  Marcar
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      
                      {/* Fila de totales */}
                      <tfoot className="table-light">
                        <tr>
                          <th colSpan={6} className="text-end">TOTALES:</th>
                          <th className="text-end">${totales.subtotal.toLocaleString('es-MX')}</th>
                          <th className="text-end">${totales.envio.toLocaleString('es-MX')}</th>
                          <th className="text-end text-warning">${totales.comision_amci.toLocaleString('es-MX')}</th>
                          <th className="text-end text-success">${totales.neto_proveedor.toLocaleString('es-MX')}</th>
                          <th colSpan={3}></th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  
                  {filteredData.length === 0 && (
                    <div className="text-center py-5">
                      <i className="fal fa-chart-bar fa-3x text-muted mb-3"></i>
                      <h4>No hay datos para mostrar</h4>
                      <p className="text-muted">
                        No se encontraron registros con los filtros seleccionados.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Información adicional */}
          <div className="row mt-4">
            <div className="col-12">
              <div className="alert alert-info">
                <i className="fal fa-info-circle me-2"></i>
                <strong>Información importante:</strong>
                <ul className="mb-0 mt-2">
                  <li>Los reportes muestran todas las ventas completadas por período y proveedor</li>
                  <li>La comisión AMCI se calcula sobre el subtotal antes de IVA y envío</li>
                  <li>El estado de dispersión puede editarse haciendo clic en "Marcar" para registros pendientes</li>
                  <li>Los datos exportados en CSV incluyen todas las columnas visibles en la tabla</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Reportes;