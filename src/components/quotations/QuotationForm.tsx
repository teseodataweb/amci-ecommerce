import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface QuotationFormProps {
  productId: string;
  productName: string;
  providerName: string;
  onSuccess?: (quotationId: string) => void;
  onCancel?: () => void;
}

interface FormData {
  ubicacion: string;
  fechaRequerida: string;
  horaRequerida: string;
  volumenEstimado: string;
  duracionEstimada: string;
  tipoObra: string;
  accesoVehicular: string;
  aguaDisponible: boolean;
  condicionesAdicionales: string;
  notasCliente: string;
}

const QuotationForm: React.FC<QuotationFormProps> = ({
  productId,
  productName,
  providerName,
  onSuccess,
  onCancel
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [quotationId, setQuotationId] = useState('');

  const [formData, setFormData] = useState<FormData>({
    ubicacion: '',
    fechaRequerida: '',
    horaRequerida: '08:00',
    volumenEstimado: '',
    duracionEstimada: '',
    tipoObra: '',
    accesoVehicular: '',
    aguaDisponible: true,
    condicionesAdicionales: '',
    notasCliente: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = (): boolean => {
    if (!formData.ubicacion.trim()) {
      setError('La ubicación es requerida');
      return false;
    }

    if (!formData.fechaRequerida) {
      setError('La fecha es requerida');
      return false;
    }

    // Validar que la fecha sea futura
    const fechaSeleccionada = new Date(`${formData.fechaRequerida}T${formData.horaRequerida}`);
    if (fechaSeleccionada < new Date()) {
      setError('La fecha debe ser futura');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setError('Debes iniciar sesión para solicitar cotizaciones');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Construir objeto de datos del servicio
      const datosServicio = {
        ubicacion: formData.ubicacion.trim(),
        fechaRequerida: `${formData.fechaRequerida}T${formData.horaRequerida}:00`,
        volumenEstimado: formData.volumenEstimado ? parseFloat(formData.volumenEstimado) : undefined,
        duracionEstimada: formData.duracionEstimada ? parseInt(formData.duracionEstimada) : undefined,
        condicionesSitio: {
          tipoObra: formData.tipoObra || undefined,
          accesoVehicular: formData.accesoVehicular || undefined,
          aguaDisponible: formData.aguaDisponible,
          condicionesAdicionales: formData.condicionesAdicionales || undefined
        }
      };

      const response = await fetch('/api/quotations/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId,
          clienteId: user.id,
          datosServicio,
          notasCliente: formData.notasCliente.trim() || undefined
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al solicitar cotización');
      }

      setSuccess(true);
      setQuotationId(data.quotation.id);

      if (onSuccess) {
        onSuccess(data.quotation.id);
      }

    } catch (err: any) {
      console.error('Error submitting quotation:', err);
      setError(err.message || 'Error al enviar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  // Vista de éxito
  if (success) {
    return (
      <div className="quotation-form-success card p-4">
        <div className="text-center mb-4">
          <div className="success-icon mb-3">
            <i className="fas fa-check-circle text-success" style={{ fontSize: '4rem' }}></i>
          </div>
          <h3 className="mb-3">¡Cotización Solicitada!</h3>
          <p className="text-muted">
            Tu solicitud ha sido enviada a <strong>{providerName}</strong>
          </p>
          <p className="text-muted">
            Código de cotización: <code>{quotationId}</code>
          </p>
        </div>

        <div className="alert alert-info">
          <h5 className="alert-heading">Próximos pasos:</h5>
          <ol className="mb-0">
            <li>El proveedor revisará tu solicitud</li>
            <li>Recibirás un presupuesto en las próximas 24-48 horas</li>
            <li>Podrás aceptar o rechazar el presupuesto desde tu panel</li>
          </ol>
        </div>

        <div className="d-flex gap-2">
          <button
            className="btn btn-primary flex-fill"
            onClick={() => window.location.href = '/ordenes'}
          >
            Ver Mis Cotizaciones
          </button>
          <button
            className="btn btn-outline-secondary flex-fill"
            onClick={() => window.location.href = '/catalogo'}
          >
            Volver al Catálogo
          </button>
        </div>
      </div>
    );
  }

  // Formulario
  return (
    <div className="quotation-form card p-4">
      <h4 className="mb-3">Solicitar Cotización</h4>
      <p className="text-muted mb-4">
        <strong>Servicio:</strong> {productName}<br />
        <strong>Proveedor:</strong> {providerName}
      </p>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Ubicación del Servicio */}
        <div className="form-grp mb-3">
          <label htmlFor="ubicacion">
            Ubicación del Servicio <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="ubicacion"
            name="ubicacion"
            className="form-control"
            placeholder="Dirección completa: calle, número, colonia, ciudad"
            value={formData.ubicacion}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <small className="text-muted">
            Incluye referencias para facilitar el acceso
          </small>
        </div>

        {/* Fecha y Hora */}
        <div className="row">
          <div className="col-md-8">
            <div className="form-grp mb-3">
              <label htmlFor="fechaRequerida">
                Fecha Requerida <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                id="fechaRequerida"
                name="fechaRequerida"
                className="form-control"
                value={formData.fechaRequerida}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
                disabled={loading}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-grp mb-3">
              <label htmlFor="horaRequerida">Hora</label>
              <select
                id="horaRequerida"
                name="horaRequerida"
                className="form-control"
                value={formData.horaRequerida}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="06:00">06:00 AM</option>
                <option value="07:00">07:00 AM</option>
                <option value="08:00">08:00 AM</option>
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">01:00 PM</option>
                <option value="14:00">02:00 PM</option>
                <option value="15:00">03:00 PM</option>
                <option value="16:00">04:00 PM</option>
                <option value="17:00">05:00 PM</option>
                <option value="18:00">06:00 PM</option>
              </select>
            </div>
          </div>
        </div>

        {/* Detalles Técnicos */}
        <div className="row">
          <div className="col-md-6">
            <div className="form-grp mb-3">
              <label htmlFor="volumenEstimado">
                Volumen Estimado (m³)
              </label>
              <input
                type="number"
                id="volumenEstimado"
                name="volumenEstimado"
                className="form-control"
                placeholder="Ej: 30"
                value={formData.volumenEstimado}
                onChange={handleChange}
                min="0"
                step="0.1"
                disabled={loading}
              />
              <small className="text-muted">Metros cúbicos de concreto</small>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-grp mb-3">
              <label htmlFor="duracionEstimada">
                Duración Estimada (horas)
              </label>
              <input
                type="number"
                id="duracionEstimada"
                name="duracionEstimada"
                className="form-control"
                placeholder="Ej: 4"
                value={formData.duracionEstimada}
                onChange={handleChange}
                min="1"
                step="1"
                disabled={loading}
              />
            </div>
          </div>
        </div>

        {/* Condiciones del Sitio */}
        <h5 className="mt-4 mb-3">Condiciones del Sitio</h5>

        <div className="form-grp mb-3">
          <label htmlFor="tipoObra">Tipo de Obra</label>
          <input
            type="text"
            id="tipoObra"
            name="tipoObra"
            className="form-control"
            placeholder="Ej: Losa de cimentación, Columnas, Muro de contención"
            value={formData.tipoObra}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="form-grp mb-3">
          <label htmlFor="accesoVehicular">Acceso Vehicular</label>
          <textarea
            id="accesoVehicular"
            name="accesoVehicular"
            className="form-control"
            placeholder="Describe las condiciones de acceso: calle pavimentada, ancho disponible, obstáculos, etc."
            value={formData.accesoVehicular}
            onChange={handleChange}
            rows={2}
            disabled={loading}
          />
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            id="aguaDisponible"
            name="aguaDisponible"
            className="form-check-input"
            checked={formData.aguaDisponible}
            onChange={handleChange}
            disabled={loading}
          />
          <label className="form-check-label" htmlFor="aguaDisponible">
            Agua disponible en sitio (para limpieza del equipo)
          </label>
        </div>

        <div className="form-grp mb-3">
          <label htmlFor="condicionesAdicionales">Condiciones Adicionales</label>
          <textarea
            id="condicionesAdicionales"
            name="condicionesAdicionales"
            className="form-control"
            placeholder="Altura libre de obstáculos, distancia al punto de colado, etc."
            value={formData.condicionesAdicionales}
            onChange={handleChange}
            rows={2}
            disabled={loading}
          />
        </div>

        {/* Notas Adicionales */}
        <div className="form-grp mb-4">
          <label htmlFor="notasCliente">Notas Adicionales</label>
          <textarea
            id="notasCliente"
            name="notasCliente"
            className="form-control"
            placeholder="Cualquier información adicional que el proveedor deba saber..."
            value={formData.notasCliente}
            onChange={handleChange}
            rows={3}
            disabled={loading}
          />
        </div>

        {/* Botones */}
        <div className="d-flex gap-2">
          {onCancel && (
            <button
              type="button"
              className="btn btn-outline-secondary flex-fill"
              onClick={onCancel}
              disabled={loading}
            >
              Cancelar
            </button>
          )}
          <button
            type="submit"
            className="btn btn-warning flex-fill"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Enviando...
              </>
            ) : (
              <>
                <i className="fal fa-paper-plane me-2"></i>
                Solicitar Cotización
              </>
            )}
          </button>
        </div>
      </form>

      <style jsx>{`
        .quotation-form {
          max-width: 600px;
          margin: 0 auto;
        }
        .form-grp {
          margin-bottom: 1rem;
        }
        .form-grp label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
        .success-icon {
          animation: scaleIn 0.3s ease-out;
        }
        @keyframes scaleIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default QuotationForm;
