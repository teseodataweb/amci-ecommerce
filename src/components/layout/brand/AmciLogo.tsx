import React from "react";
import Link from "next/link";

interface AmciLogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'full' | 'symbol';
  className?: string;
}

const AmciLogo: React.FC<AmciLogoProps> = ({ 
  size = 'medium', 
  variant = 'full',
  className = '' 
}) => {
  const sizeClasses = {
    small: 'fs-5',
    medium: 'fs-3', 
    large: 'fs-1'
  };

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