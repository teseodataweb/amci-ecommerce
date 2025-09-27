import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import Banner from "@/components/layout/banner/Banner";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

type ReportType = 'sales-by-provider' | 'top-products' | 'commissions';

const Reportes = () => {
  const [activeReport, setActiveReport] = useState<ReportType>('sales-by-provider');
  const [loading, setLoading] = useState(false);
  const [salesByProvider, setSalesByProvider] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [commissions, setCommissions] = useState<any[]>([]);
  const [commissionPercent, setCommissionPercent] = useState(10);

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/admin/reports?type=${activeReport}`);
        if (response.ok) {
          const data = await response.json();

          if (activeReport === 'sales-by-provider') {
            setSalesByProvider(data.report);
          } else if (activeReport === 'top-products') {
            setTopProducts(data.report);
          } else if (activeReport === 'commissions') {
            setCommissions(data.report);
            setCommissionPercent(data.commission_percent);
          }
        }
      } catch (error) {
        console.error('Error fetching report:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [activeReport]);

  const exportToCSV = (data: any[], filename: string, headers: string[]) => {
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(h => {
        const key = h.toLowerCase().replace(/ /g, '_');
        return row[key] || '';
      }).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <ProtectedRoute requiredRole="ADMIN">
      <Layout header={1} footer={1}>
        <Banner
          title="Reportes y Análisis"
          subtitle="Estadísticas y reportes del negocio"
          bg="bg-primary"
        />

        <section className="reportes__area pt-120 pb-80">
          <div className="container">
            {/* Navegación de reportes */}
            <div className="row mb-5">
              <div className="col-12">
                <ul className="nav nav-pills mb-4">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeReport === 'sales-by-provider' ? 'active' : ''}`}
                      onClick={() => setActiveReport('sales-by-provider')}
                    >
                      <i className="fal fa-chart-line me-2"></i>
                      Ventas por Proveedor
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeReport === 'top-products' ? 'active' : ''}`}
                      onClick={() => setActiveReport('top-products')}
                    >
                      <i className="fal fa-trophy me-2"></i>
                      Productos Más Vendidos
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeReport === 'commissions' ? 'active' : ''}`}
                      onClick={() => setActiveReport('commissions')}
                    >
                      <i className="fal fa-dollar-sign me-2"></i>
                      Comisiones
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contenido de reportes */}
            <div className="row">
              <div className="col-12">
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Cargando reporte...</span>
                    </div>
                    <p className="mt-3">Generando reporte...</p>
                  </div>
                ) : (
                  <>
                    {/* Reporte: Ventas por Proveedor */}
                    {activeReport === 'sales-by-provider' && (
                      <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h4 className="mb-0">Ventas por Proveedor</h4>
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => exportToCSV(salesByProvider, 'ventas_por_proveedor', ['proveedor', 'total_ventas', 'total_ordenes'])}
                          >
                            <i className="fal fa-download me-2"></i>
                            Exportar CSV
                          </button>
                        </div>
                        <div className="card-body">
                          {salesByProvider.length === 0 ? (
                            <p className="text-center text-muted py-5">No hay datos para mostrar</p>
                          ) : (
                            <div className="table-responsive">
                              <table className="table table-hover">
                                <thead>
                                  <tr>
                                    <th>Proveedor</th>
                                    <th className="text-end">Total Ventas (MXN)</th>
                                    <th className="text-end">Órdenes</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {salesByProvider.map((item, index) => (
                                    <tr key={index}>
                                      <td><strong>{item.razon_social}</strong></td>
                                      <td className="text-end">
                                        ${item.total_ventas.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                      </td>
                                      <td className="text-end">{item.total_ordenes}</td>
                                    </tr>
                                  ))}
                                </tbody>
                                <tfoot>
                                  <tr className="table-active">
                                    <th>TOTAL</th>
                                    <th className="text-end">
                                      ${salesByProvider.reduce((sum, item) => sum + item.total_ventas, 0).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                    </th>
                                    <th className="text-end">
                                      {salesByProvider.reduce((sum, item) => sum + item.total_ordenes, 0)}
                                    </th>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Reporte: Productos Más Vendidos */}
                    {activeReport === 'top-products' && (
                      <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h4 className="mb-0">Top 10 Productos Más Vendidos</h4>
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => exportToCSV(topProducts, 'productos_mas_vendidos', ['nombre', 'proveedor', 'cantidad_vendida', 'total_ventas'])}
                          >
                            <i className="fal fa-download me-2"></i>
                            Exportar CSV
                          </button>
                        </div>
                        <div className="card-body">
                          {topProducts.length === 0 ? (
                            <p className="text-center text-muted py-5">No hay datos para mostrar</p>
                          ) : (
                            <div className="table-responsive">
                              <table className="table table-hover">
                                <thead>
                                  <tr>
                                    <th>#</th>
                                    <th>Producto</th>
                                    <th>Proveedor</th>
                                    <th className="text-end">Unidades Vendidas</th>
                                    <th className="text-end">Total Ventas (MXN)</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {topProducts.map((item, index) => (
                                    <tr key={index}>
                                      <td><strong>#{index + 1}</strong></td>
                                      <td>{item.nombre}</td>
                                      <td>{item.proveedor}</td>
                                      <td className="text-end">{item.cantidad_vendida}</td>
                                      <td className="text-end">
                                        ${item.total_ventas.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Reporte: Comisiones */}
                    {activeReport === 'commissions' && (
                      <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h4 className="mb-0">
                            Comisiones AMCI ({commissionPercent}%)
                            <small className="text-muted ms-2">Solo órdenes completadas</small>
                          </h4>
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => exportToCSV(commissions, 'comisiones', ['razon_social', 'total_ventas', 'comision_amci', 'neto_proveedor'])}
                          >
                            <i className="fal fa-download me-2"></i>
                            Exportar CSV
                          </button>
                        </div>
                        <div className="card-body">
                          {commissions.length === 0 ? (
                            <p className="text-center text-muted py-5">No hay datos para mostrar</p>
                          ) : (
                            <div className="table-responsive">
                              <table className="table table-hover">
                                <thead>
                                  <tr>
                                    <th>Proveedor</th>
                                    <th className="text-end">Total Ventas (MXN)</th>
                                    <th className="text-end">Comisión AMCI (MXN)</th>
                                    <th className="text-end">Neto Proveedor (MXN)</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {commissions.map((item, index) => (
                                    <tr key={index}>
                                      <td><strong>{item.razon_social}</strong></td>
                                      <td className="text-end">
                                        ${item.total_ventas.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                      </td>
                                      <td className="text-end text-info">
                                        ${item.comision_amci.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                      </td>
                                      <td className="text-end text-success">
                                        ${item.neto_proveedor.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                                <tfoot>
                                  <tr className="table-active">
                                    <th>TOTAL</th>
                                    <th className="text-end">
                                      ${commissions.reduce((sum, item) => sum + item.total_ventas, 0).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                    </th>
                                    <th className="text-end text-info">
                                      ${commissions.reduce((sum, item) => sum + item.comision_amci, 0).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                    </th>
                                    <th className="text-end text-success">
                                      ${commissions.reduce((sum, item) => sum + item.neto_proveedor, 0).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                    </th>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
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
      </Layout>
    </ProtectedRoute>
  );
};

export default Reportes;