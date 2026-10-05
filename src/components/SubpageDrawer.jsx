import React, { useEffect, useState } from 'react';
import { subpageDetailRegistry } from '../data/subpageData';

export default function SubpageDrawer({ item, categoryTitle, onClose, onPreFillRfq }) {
  if (!item) return null;

  // Look up rich registered details or fall back to item props
  const richData = subpageDetailRegistry[item.name] || {};
  const displayName = richData.name || item.name;
  const initialImage = richData.image || item.image || "https://safepack.com/wp-content/uploads/2021/07/vci-paper-scrim-reinforced-8-s1.png";
  const [activeImg, setActiveImg] = useState(initialImage);
  const gallery = richData.gallery || [];

  // Reset active image whenever item changes
  useEffect(() => {
    setActiveImg(richData.image || item.image || "https://safepack.com/wp-content/uploads/2021/07/vci-paper-scrim-reinforced-8-s1.png");
  }, [item, richData.image]);

  const displayHeadline = richData.headline || item.desc || `${displayName} - Advanced Industrial Packaging Solution`;
  const displaySummary = richData.summary || `${item.desc}. Engineered with precision molecular formulation and heavy-duty extrusion capabilities up to 4000mm width at Safepack's integrated manufacturing facilities.`;
  const displayBadge = richData.badge || item.spec || categoryTitle;
  const displayHighlights = richData.highlights || [
    "Patented formulation tested against international ASTM and DIN benchmarks",
    "Continuous extrusion coating capability up to 4000mm width",
    "100% compliant with global environmental directives (RoHS, REACH)",
    "Engineered for demanding overseas container shipping environments"
  ];
  const displaySpecs = richData.specs || [
    { k: "Manufacturing Width", v: "Up to 4000mm Width" },
    { k: "Specification Grade", v: item.spec || "Heavy Industrial Grade" },
    { k: "Standards & Compliance", v: "RoHS / REACH / ISO 9001 Certified" },
    { k: "Export Availability", v: "Worldwide (40+ Countries)" }
  ];

  // Listen to Escape key to dismiss subpage drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleRfq = () => {
    onPreFillRfq(`${categoryTitle} - ${displayName}`);
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
        className="subpage-dialog-card" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar with Navigation Hierarchy & Close Button */}
        <div className="subpage-dialog-header">
          <div className="subpage-dialog-crumbs">
            <span className="crumb-chip">
              <i className="fa-solid fa-folder-open"></i> {categoryTitle}
            </span>
            <i className="fa-solid fa-chevron-right crumb-separator"></i>
            <span className="crumb-chip crumb-active">
              {displayName}
            </span>
            <span className="crumb-badge">
              {displayBadge}
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

        {/* Modal Main Two-Column Layout */}
        <div className="subpage-dialog-content">
          
          {/* Left Column: Visual Showcase, Gallery & Live Link */}
          <div className="subpage-visual-column">
            <div className="subpage-featured-figure">
              <img 
                src={activeImg} 
                alt={displayName} 
                className="subpage-featured-img"
                onError={(e) => {
                  e.target.src = "https://safepack.com/wp-content/uploads/2021/07/vci-paper-scrim-reinforced-8-s1.png";
                }}
              />
              <div className="subpage-img-overlay">
                <span className="subpage-source-pill">
                  <i className="fa-solid fa-check-circle"></i> Official Safepack Product
                </span>
              </div>
            </div>

            {/* Thumbnail Gallery if multiple real photos exist */}
            {gallery.length > 0 && (
              <div className="subpage-gallery-thumbs">
                <button 
                  className={`subpage-thumb-btn ${activeImg === richData.image ? 'active' : ''}`}
                  onClick={() => setActiveImg(richData.image)}
                >
                  <img src={richData.image} alt="Primary angle" />
                </button>
                {gallery.map((gImg, gIdx) => (
                  <button 
                    key={gIdx}
                    className={`subpage-thumb-btn ${activeImg === gImg ? 'active' : ''}`}
                    onClick={() => setActiveImg(gImg)}
                  >
                    <img src={gImg} alt={`Gallery angle ${gIdx + 1}`} />
                  </button>
                ))}
              </div>
            )}

            <div className="subpage-cred-strip">
              <div className="cred-item">
                <i className="fa-solid fa-award"></i>
                <div>
                  <strong>Up to 4000mm</strong>
                  <span>Continuous Web Extrusion</span>
                </div>
              </div>
              <div className="cred-item">
                <i className="fa-solid fa-globe"></i>
                <div>
                  <strong>40+ Export Markets</strong>
                  <span>Global Sea Transit Tested</span>
                </div>
              </div>
            </div>

            {richData.liveUrl && (
              <a 
                href={richData.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-outline btn-block subpage-external-link"
              >
                <span>Verify on Live safepack.com</span>
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            )}
          </div>

          {/* Right Column: Title, Headline, Details & Technical Parameters */}
          <div className="subpage-details-column">
            <div className="subpage-title-block">
              <h2 className="subpage-main-title">{displayName}</h2>
              <h4 className="subpage-main-headline">{displayHeadline}</h4>
            </div>
            
            <p className="subpage-main-description">
              {displaySummary}
            </p>

            {/* Core Engineering Features */}
            <div className="subpage-features-panel">
              <h5 className="subpage-panel-heading">
                <i className="fa-solid fa-microchip"></i> Key Technical Advantages
              </h5>
              <ul className="subpage-features-list">
                {displayHighlights.map((hl, idx) => (
                  <li key={idx}>
                    <i className="fa-solid fa-circle-check"></i>
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Specifications Matrix */}
            <div className="subpage-specs-panel">
              <h5 className="subpage-panel-heading">
                <i className="fa-solid fa-sliders"></i> Verified Technical Specifications
              </h5>
              
              <div className="subpage-specs-matrix">
                {displaySpecs.map((sp, idx) => (
                  <div className="spec-matrix-cell" key={idx}>
                    <span className="spec-cell-label">{sp.k}</span>
                    <strong className="spec-cell-value">{sp.v}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="subpage-actions-bar">
              <button className="btn btn-primary subpage-cta-submit" onClick={handleRfq}>
                <i className="fa-solid fa-file-signature"></i>
                <span>Request TDS &amp; Official Quotation</span>
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
