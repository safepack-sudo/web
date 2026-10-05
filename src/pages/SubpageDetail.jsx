import React, { useEffect, useState, useMemo, useRef } from 'react';
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
  
  // Assemble full distinct gallery list for auto-sliding
  const galleryList = useMemo(() => {
    const list = [];
    if (itemData?.image) list.push(itemData.image);
    if (itemData?.gallery && Array.isArray(itemData.gallery)) {
      itemData.gallery.forEach(img => {
        if (!list.includes(img)) list.push(img);
      });
    }
    return list.length > 0 ? list : ['https://safepack.com/wp-content/uploads/2021/07/vci-paper-scrim-reinforced-8-s1.png'];
  }, [itemData]);

  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Reset active slide index whenever route slug or item changes
  useEffect(() => {
    setActiveIdx(0);
  }, [slug, itemData]);

  // Robust auto-sliding carousel timer (3.8s interval)
  useEffect(() => {
    if (galleryList.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % galleryList.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [galleryList.length, isPaused, activeIdx]);

  const nextImg = (e) => {
    if (e) e.stopPropagation();
    setActiveIdx(prev => (prev + 1) % galleryList.length);
  };

  const prevImg = (e) => {
    if (e) e.stopPropagation();
    setActiveIdx(prev => (prev - 1 + galleryList.length) % galleryList.length);
  };

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };
  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) nextImg();
    else if (diff < -45) prevImg();
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

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
      "image": galleryList,
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
  }, [slug, itemData, displayName, displaySummary, categoryTitle, galleryList]);

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
              
              {/* Left Column: Visual Showcase & Auto-Sliding Gallery Switcher */}
              <div className="standalone-visual-col">
                <figure 
                  className="standalone-main-figure"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  aria-label="Product Images Carousel"
                >
                  <div className="figure-viewport">
                    {galleryList.map((img, idx) => (
                      <img 
                        key={idx}
                        src={img} 
                        alt={`${displayName} view ${idx + 1}`} 
                        className={`standalone-img ${idx === activeIdx ? 'active' : ''}`}
                        loading="eager"
                        onError={(e) => {
                          e.target.src = 'https://safepack.com/wp-content/uploads/2021/07/vci-paper-scrim-reinforced-8-s1.png';
                        }}
                      />
                    ))}
                  </div>

                  {/* Navigation Arrows for Gallery */}
                  {galleryList.length > 1 && (
                    <>
                      <button 
                        type="button" 
                        className="figure-nav-arrow figure-nav-prev" 
                        onClick={prevImg}
                        aria-label="Previous image"
                      >
                        <i className="fa-solid fa-chevron-left"></i>
                      </button>
                      <button 
                        type="button" 
                        className="figure-nav-arrow figure-nav-next" 
                        onClick={nextImg}
                        aria-label="Next image"
                      >
                        <i className="fa-solid fa-chevron-right"></i>
                      </button>

                      <div className="figure-slide-badge">
                        <i className="fa-solid fa-images"></i> {activeIdx + 1} / {galleryList.length}
                      </div>
                    </>
                  )}

                  <div className="standalone-badge-chip">
                    <i className="fa-solid fa-shield-halved"></i>
                    <span>Verified Technical Grade</span>
                  </div>
                </figure>

                {/* Multiple Real Angle Thumbnails with Active Progress Bar */}
                {galleryList.length > 1 && (
                  <div 
                    className="standalone-thumb-strip"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                  >
                    {galleryList.map((gImg, gIdx) => (
                      <button 
                        key={gIdx}
                        className={`standalone-thumb-btn ${activeIdx === gIdx ? 'active' : ''}`}
                        onClick={() => setActiveIdx(gIdx)}
                        title={`View angle ${gIdx + 1} of ${galleryList.length}`}
                        aria-label={`View angle ${gIdx + 1}`}
                      >
                        <img src={gImg} alt={`${displayName} angle ${gIdx + 1}`} />
                        {activeIdx === gIdx && (
                          <span key={activeIdx} className={`thumb-progress-bar ${isPaused ? 'paused' : ''}`}></span>
                        )}
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
