import React from "react";
import Link from "next/link";
import Image from "next/image";

interface AmciLogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'full' | 'symbol' | 'white';
  className?: string;
  useImage?: boolean;
}

const AmciLogo: React.FC<AmciLogoProps> = ({
  size = 'medium',
  variant = 'full',
  className = '',
  useImage = true
}) => {
  // Dimensiones según el tamaño
  const imageSizes = {
    small: { width: 120, height: 40 },
    medium: { width: 180, height: 60 },
    large: { width: 240, height: 80 }
  };

  const sizeClasses = {
    small: 'fs-5',
    medium: 'fs-3',
    large: 'fs-1'
  };

  // Si useImage es true, intentar cargar la imagen oficial
  if (useImage) {
    const logoPath = variant === 'white'
      ? '/img/brand/amci/logo-white.png'
      : '/img/brand/amci/logo.png';

    return (
      <Link href="/" className={`amci-logo-image ${className}`}>
        <Image
          src={logoPath}
          alt="AMCI - Asociación Mexicana de Concreteros Independientes"
          width={imageSizes[size].width}
          height={imageSizes[size].height}
          priority
          style={{ objectFit: 'contain' }}
        />
      </Link>
    );
  }

  // Fallback: Logo de texto (actual)
  const logoContent = variant === 'full' ? (
    <div className={`amci-logo d-flex align-items-center ${className}`}>
      <div className={`amci-symbol me-2 ${sizeClasses[size]}`}>
        <span className="fw-bold text-primary">A</span>
        <span className="fw-bold text-secondary">M</span>
        <span className="fw-bold text-warning">C</span>
        <span className="fw-bold text-info">I</span>
      </div>
      {size !== 'small' && (
        <div className="amci-text">
          <div className={`fw-bold text-dark lh-1 ${size === 'large' ? 'fs-4' : 'fs-6'}`}>
            AMCI
          </div>
          <div className={`text-muted lh-1 ${size === 'large' ? 'fs-6' : 'small'}`}>
            Suministros Industriales
          </div>
        </div>
      )}
    </div>
  ) : variant === 'white' ? (
    <div className={`amci-logo d-flex align-items-center ${className}`}>
      <div className={`amci-symbol me-2 ${sizeClasses[size]}`}>
        <span className="fw-bold text-white">AMCI</span>
      </div>
      {size !== 'small' && (
        <div className="amci-text">
          <div className={`fw-bold text-white lh-1 ${size === 'large' ? 'fs-4' : 'fs-6'}`}>
            AMCI
          </div>
          <div className={`text-white-50 lh-1 ${size === 'large' ? 'fs-6' : 'small'}`}>
            Suministros Industriales
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className={`amci-symbol ${sizeClasses[size]} ${className}`}>
      <span className="fw-bold text-primary">A</span>
      <span className="fw-bold text-secondary">M</span>
      <span className="fw-bold text-warning">C</span>
      <span className="fw-bold text-info">I</span>
    </div>
  );

  return (
    <Link href="/" className="text-decoration-none">
      {logoContent}
    </Link>
  );
};

export default AmciLogo;