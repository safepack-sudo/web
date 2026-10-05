import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { subpageDetailRegistry } from '../data/subpageData';
import { slugify } from '../utils/slugify';
import Topline from '../components/Topline';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AskSiplChat from '../components/AskSiplChat';
import WhatsappButton from '../components/WhatsappButton';
import Toast from '../components/Toast';

export default function SubpageDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Find matching subpage entry from registry
  const matchedEntry = Object.entries(subpageDetailRegistry).find(([key]) => {
    return slugify(key) === slug || key.toLowerCase() === slug?.replace(/-/g, ' ').toLowerCase();
  });

  const itemName = matchedEntry ? matchedEntry[0] : slug ? slug.replace(/-/g, ' ').toUpperCase() : 'Product Details';
  const itemData = matchedEntry ? matchedEntry[1] : null;

  const displayName = itemData?.name || itemName;
  const categoryTitle = itemData?.category || 'Safepack Technical Range';
  const initialImage = itemData?.image || 'https://safepack.com/wp-content/uploads/2021/07/vci-paper-scrim-reinforced-8-s1.png';
  const [activeImg, setActiveImg] = useState(initialImage);
  const gallery = itemData?.gallery || [];

  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3500);
  };

  const displayHeadline = itemData?.headline || `${displayName} — High-Performance Industrial Packaging Solution`;
  const displaySummary = itemData?.summary || `Safepack ${displayName} is engineered with molecular chemical precision and heavy-duty extrusion capabilities up to 4000mm width at Safepack's integrated manufacturing campus in Pune, India.`;
  const displayBadge = itemData?.badge || 'Export Grade';
  const displayHighlights = itemData?.highlights || [
    "Patented formulation tested against international ASTM, DIN & MIL-PRF benchmarks",
    "Continuous extrusion coating capability up to 4000mm width without intermediate seams",
    "100% compliant with global environmental directives (RoHS, REACH SVHC Free)",
    "Engineered for demanding overseas container ocean transit environments"
  ];
  const displaySpecs = itemData?.specs || [
    { k: "Manufacturing Width", v: "Up to 4000mm Continuous Width" },
    { k: "Specification Grade", v: "Heavy Industrial Export Grade" },
    { k: "Standards & Compliance", v: "RoHS / REACH / ISO 9001 Certified" },
    { k: "Export Availability", v: "Worldwide Supply across 40+ Countries" }
  ];

  // Dynamic SEO, Canonical Link, and Schema.org Product Metadata
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (itemData?.image) {
      setActiveImg(itemData.image);
    }

    // Dynamic Page Title
    document.title = `${displayName} | Safepack Industries Ltd. - Industrial Anti-Corrosion Packaging`;

    // Dynamic Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', displaySummary);
    }

    // Dynamic Schema.org Product JSON-LD Injection
    let scriptTag = document.getElementById('product-schema-jsonld');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'product-schema-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": displayName,
      "image": [activeImg, ...gallery],
      "description": displaySummary,
      "category": categoryTitle,
      "brand": {
        "@type": "Brand",
        "name": "Safepack"
      },
      "manufacturer": {
        "@type": "Organization",
        "name": "Safepack Industries Ltd.",
        "url": "https://safepack.com"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": itemData?.liveUrl || `https://safepack.com/products/${slug}`
      }
    });

    return () => {
      const existingScript = document.getElementById('product-schema-jsonld');
      if (existingScript) existingScript.remove();
    };
  }, [slug, itemData, displayName, displaySummary, categoryTitle, activeImg, gallery]);

  const handleInquiryRedirect = () => {
    // Navigate back to home contact section with prefill
    sessionStorage.setItem('prefill_rfq', `${categoryTitle} - ${displayName}`);
    navigate('/?section=contact');
  };

  return (
    <div className="app-root subpage-standalone-root">
      <Topline />
      <Navbar activeSection="solutions" />

      <main className="subpage-standalone-main">
        <div className="container">
          
          {/* Top Breadcrumb Navigation Bar */}
          <nav className="standalone-breadcrumbs" aria-label="Breadcrumb">
            <a href="/" className="crumb-link">
              <i className="fa-solid fa-house"></i> Home
            </a>
            <i className="fa-solid fa-chevron-right crumb-sep"></i>
            <span className="crumb-cat">
              {categoryTitle}
            </span>
            <i className="fa-solid fa-chevron-right crumb-sep"></i>
            <span className="crumb-current">
              {displayName}
            </span>
          </nav>

          {/* Standalone Product Showcase Card */}
          <article className="standalone-card">
            
            {/* Live Canonical Dossier URL Banner */}
            <div className="standalone-canonical-bar">
              <div className="canonical-left">
                <span className="canonical-label">
                  <i className="fa-solid fa-link"></i> Live URL Dossier:
                </span>
                <a 
                  href={itemData?.liveUrl || `https://safepack.com/?s=${encodeURIComponent(displayName)}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="canonical-link"
                  title="Verify official technical specifications on safepack.com"
                >
                  <span>{itemData?.liveUrl || `https://safepack.com/products/${slug}`}</span>
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
              </div>
              <div className="canonical-right">
                <span className="canonical-badge">
                  <i className="fa-solid fa-circle-check"></i> ASTM / MIL-PRF Validated
                </span>
                <span className="canonical-badge">
                  <i className="fa-solid fa-earth-americas"></i> Exporting to 40+ Countries
                </span>
              </div>
            </div>

            <div className="standalone-grid">
              
              {/* Left Column: Visual Showcase & Gallery Switcher */}
              <div className="standalone-visual-col">
                <figure className="standalone-main-figure">
                  <img 
                    src={activeImg} 
                    alt={`${displayName} - Safepack Industrial Packaging`} 
                    className="standalone-img"
                    loading="eager"
                    onError={(e) => {
                      e.target.src = 'https://safepack.com/wp-content/uploads/2021/07/vci-paper-scrim-reinforced-8-s1.png';
                    }}
                  />
                  <div className="standalone-badge-chip">
                    <i className="fa-solid fa-shield-halved"></i>
                    <span>Verified Technical Grade</span>
                  </div>
                </figure>

                {/* Multiple Real Angle Thumbnails */}
                {gallery.length > 0 && (
                  <div className="standalone-thumb-strip">
                    <button 
                      className={`standalone-thumb-btn ${activeImg === itemData?.image ? 'active' : ''}`}
                      onClick={() => setActiveImg(itemData?.image)}
                      title="Primary Angle"
                      aria-label="View primary angle"
                    >
                      <img src={itemData?.image} alt={`${displayName} primary view`} />
                    </button>
                    {gallery.map((gImg, gIdx) => (
                      <button 
                        key={gIdx}
                        className={`standalone-thumb-btn ${activeImg === gImg ? 'active' : ''}`}
                        onClick={() => setActiveImg(gImg)}
                        title={`Angle ${gIdx + 1}`}
                        aria-label={`View angle ${gIdx + 1}`}
                      >
                        <img src={gImg} alt={`${displayName} angle ${gIdx + 1}`} />
                      </button>
                    ))}
                  </div>
                )}

                <div className="standalone-cred-card">
                  <div className="cred-row">
                    <i className="fa-solid fa-ruler-combined"></i>
                    <div>
                      <strong>Up to 4000mm Continuous Width</strong>
                      <span>India's widest single-nip extrusion plant</span>
                    </div>
                  </div>
                  <div className="cred-row">
                    <i className="fa-solid fa-earth-americas"></i>
                    <div>
                      <strong>Exporting to 40+ Countries</strong>
                      <span>PAN India and worldwide logistics network</span>
                    </div>
                  </div>
                </div>

                {itemData?.liveUrl && (
                  <a 
                    href={itemData.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-outline btn-block standalone-verify-btn"
                  >
                    <span>Verify Live Dossier on safepack.com</span>
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </a>
                )}
              </div>

              {/* Right Column: Hero Headline, Details & Technical Matrix */}
              <div className="standalone-content-col">
                <header className="standalone-title-block">
                  <span className="standalone-tag-pill">{displayBadge}</span>
                  <h1 className="standalone-product-title">{displayName}</h1>
                  <h3 className="standalone-product-headline">{displayHeadline}</h3>
                </header>

                <p className="standalone-description">
                  {displaySummary}
                </p>

                {/* Quick Engineering Trust Bar */}
                <div className="standalone-metrics-bar">
                  <div className="metric-pill">
                    <i className="fa-solid fa-layer-group"></i>
                    <span><strong>4000mm</strong> Extrusion Width</span>
                  </div>
                  <div className="metric-pill">
                    <i className="fa-solid fa-certificate"></i>
                    <span><strong>RoHS / REACH</strong> Compliant</span>
                  </div>
                  <div className="metric-pill">
                    <i className="fa-solid fa-shield"></i>
                    <span><strong>36 Months</strong> Protection</span>
                  </div>
                </div>

                {/* Core Engineering Features */}
                <div className="standalone-features-box">
                  <h4 className="box-title">
                    <i className="fa-solid fa-circle-check" style={{ color: '#00bf71' }}></i>
                    Core Engineering Features &amp; Passivation
                  </h4>
                  <ul className="standalone-features-list">
                    {displayHighlights.map((hl, idx) => (
                      <li key={idx}>
                        <i className="fa-solid fa-check"></i>
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Verified Technical Parameters */}
                <div className="standalone-specs-box">
                  <h4 className="box-title">
                    <i className="fa-solid fa-sliders"></i>
                    Technical Parameters &amp; Test Standards
                  </h4>
                  <div className="standalone-specs-grid">
                    {displaySpecs.map((sp, idx) => (
                      <div className="spec-item-cell" key={idx}>
                        <span className="spec-k">{sp.k}</span>
                        <strong className="spec-v">{sp.v}</strong>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="standalone-action-row">
                  <button className="btn btn-primary btn-rfq" onClick={handleInquiryRedirect}>
                    <i className="fa-solid fa-file-signature"></i>
                    <span>Request Technical TDS &amp; Official Quotation &rarr;</span>
                  </button>
                  <a href="/" className="btn btn-outline">
                    &larr; Back to Full Catalog
                  </a>
                </div>

              </div>

            </div>
          </article>

        </div>
      </main>

      <Footer />
      <WhatsappButton />
      <AskSiplChat />
      <Toast message={toastMessage} visible={toastVisible} />
    </div>
  );
}
