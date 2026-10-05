import React, { useEffect } from 'react';

export default function ProductModal({ product, onClose, onPreFillRfq }) {
  if (!product) return null;

  // Listen to Escape key to dismiss modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleRequestQuote = () => {
    onPreFillRfq(product.title);
    onClose();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="subpage-backdrop-enhanced active" 
      onClick={onClose} 
      role="dialog" 
      aria-modal="true"
    >
      <div 
        className="subpage-dialog-card product-family-dialog" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="subpage-dialog-header">
          <div className="subpage-dialog-crumbs">
            <span className="crumb-chip">
              <i className="fa-solid fa-layer-group"></i> Core Solutions
            </span>
            <i className="fa-solid fa-chevron-right crumb-separator"></i>
            <span className="crumb-chip crumb-active">
              {product.title}
            </span>
            <span className={`crumb-badge ${product.isEco ? 'chip-eco' : ''}`}>
              {product.badge}
            </span>
          </div>

          <button 
            className="subpage-close-button" 
            onClick={onClose} 
            aria-label="Close dialog"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Modal Main Content: Image Left, Specs Right */}
        <div className="subpage-dialog-content">
          
          {/* Left Column: Visual Showcase */}
          <div className="subpage-visual-column">
            <div className="subpage-featured-figure">
              <img 
                src={product.img} 
                alt={product.title} 
                className="subpage-featured-img"
                onError={(e) => {
                  e.target.src = 'https://safepack.com/wp-content/uploads/2021/07/vci-49-hi-min.jpg';
                }}
              />
              <div className="subpage-img-overlay">
                <span className="subpage-source-pill">
                  <i className="fa-solid fa-award"></i> Core Capability Family
                </span>
              </div>
            </div>

            <div className="subpage-cred-strip">
              <div className="cred-item">
                <i className="fa-solid fa-ruler-combined"></i>
                <div>
                  <strong>Up to 4000mm Width</strong>
                  <span>Continuous Web Extrusion</span>
                </div>
              </div>
              <div className="cred-item">
                <i className="fa-solid fa-earth-americas"></i>
                <div>
                  <strong>40+ Export Countries</strong>
                  <span>PAN India &amp; Global Supply</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Full Description & Technical Specifications */}
          <div className="subpage-details-column">
            <div className="subpage-title-block">
              <h2 className="subpage-main-title">{product.title}</h2>
              <h4 className="subpage-main-headline">{product.badge} &bull; Engineered Solution</h4>
            </div>

            <p className="subpage-main-description">
              {product.fullDesc}
            </p>

            {/* Technical Specifications Matrix */}
            <div className="subpage-specs-panel">
              <h5 className="subpage-panel-heading">
                <i className="fa-solid fa-sliders"></i> Verified Technical Specifications
              </h5>
              
              <div className="subpage-specs-matrix">
                {product.specs.map((s, idx) => (
                  <div className="spec-matrix-cell" key={idx}>
                    <span className="spec-cell-label">{s.k}</span>
                    <strong className="spec-cell-value">{s.v}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="subpage-actions-bar">
              <button className="btn btn-primary subpage-cta-submit" onClick={handleRequestQuote}>
                <i className="fa-solid fa-file-signature"></i>
                <span>Request Quotation / Testing Sample &rarr;</span>
              </button>
              <button className="btn btn-outline subpage-cta-close" onClick={onClose}>
                Close
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
