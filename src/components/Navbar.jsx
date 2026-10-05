import React, { useState, useEffect, useRef } from 'react';
import { headerNavSequence } from '../data/navigationData';
import { getSubpageUrl } from '../utils/slugify';

export default function Navbar({ activeSection }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMega, setOpenMega] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const headerRef = useRef(null);

  // Smooth scroll without altering address bar to include '#'
  const scrollToSection = (sectionId, e) => {
    if (e) e.preventDefault();
    setOpenMega(null);
    closeMobile();

    if (window.location.pathname !== '/') {
      window.location.href = `/?section=${sectionId}`;
      return;
    }

    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      // Keep address bar clean with NO #
      window.history.replaceState(null, '', '/');
    }
  };

  // Handle scroll & auto-close mega menus on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      if (openMega) setOpenMega(null);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [openMega]);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Handle click outside and Escape key to dismiss menus
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setOpenMega(null);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpenMega(null);
        setMobileOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 1280 && mobileOpen) {
        setMobileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileOpen]);

  const toggleMobile = () => setMobileOpen(!mobileOpen);
  const closeMobile = () => {
    setMobileOpen(false);
    setMobileExpanded(null);
    setMobileSearchQuery('');
  };

  // Filtered subitems for mobile search
  const allSearchableItems = React.useMemo(() => {
    const list = [];
    headerNavSequence.forEach((category) => {
      category.sections.forEach((sec) => {
        sec.items.forEach((item) => {
          list.push({
            ...item,
            categoryTitle: category.title,
            sectionHeading: sec.heading
          });
        });
      });
    });
    return list;
  }, []);

  const filteredItems = React.useMemo(() => {
    if (!mobileSearchQuery.trim()) return [];
    const q = mobileSearchQuery.toLowerCase();
    return allSearchableItems.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        (item.spec && item.spec.toLowerCase().includes(q))
    );
  }, [mobileSearchQuery, allSearchableItems]);

  return (
    <>
      <header 
        ref={headerRef}
        className={`nav-wrap ${isScrolled ? 'nav-scrolled' : ''}`} 
        id="header"
      >
        <div className="container nav">
          
          {/* Official Brand Logo */}
          <a 
            href="/" 
            className="brand" 
            onClick={(e) => scrollToSection('home', e)} 
            aria-label="Safepack Home"
          >
            <div className="brand-logo-wrap">
              <img 
                src="/images/logo.png" 
                alt="Safepack Logo" 
                className="brand-img" 
                onError={(e) => { e.target.src = 'https://safepack.com/wp-content/uploads/2021/07/logo-1-1.png'; }} 
              />
            </div>
          </a>

          {/* Desktop Properly Sequenced Navigation matching Approved Mockup */}
          <nav className="nav-links" aria-label="Main Navigation">
            
            {/* 1. Home */}
            <a 
              href="/" 
              className={`nav-direct-link ${activeSection === 'home' && !openMega ? 'active' : ''}`}
              onMouseEnter={() => setOpenMega(null)}
              onClick={(e) => scrollToSection('home', e)}
            >
              Home
            </a>

            {/* 2. All 6 Comprehensive Mega Dropdowns */}
            {headerNavSequence.map((menu) => (
              <div 
                key={menu.id} 
                className="nav-dropdown-wrapper"
                onMouseEnter={() => setOpenMega(menu.id)}
              >
                <button 
                  className={`nav-dropdown-btn ${openMega === menu.id ? 'open' : ''} ${menu.isEcoHighlight ? 'eco-highlight' : ''}`}
                  onClick={() => setOpenMega(openMega === menu.id ? null : menu.id)}
                  aria-expanded={openMega === menu.id}
                >
                  <i className={`fa-solid ${menu.icon} nav-icon-sm`}></i>
                  <span>
                    {menu.id === 'composites' ? (
                      <>
                        <span className="nav-title-full">Paper / Film / Foil Composites</span>
                        <span className="nav-title-short">Composites</span>
                      </>
                    ) : (
                      menu.title
                    )}
                  </span>
                  {menu.id === 'sustainability' ? (
                    <span className="nav-eco-leaf" title="100% Eco-Sustainable">🌱</span>
                  ) : menu.badge ? (
                    <span className={`nav-chip-badge ${menu.isEcoHighlight ? 'chip-eco' : ''}`}>
                      {menu.badge}
                    </span>
                  ) : null}
                  <i className="fa-solid fa-chevron-down caret-icon"></i>
                </button>

                {/* Desktop Mega Dropdown Overlay matching 1:1 with Approved Visual Concept */}
                {openMega === menu.id && (
                  <div 
                    className={`mega-menu-panel mega-menu-${menu.id}`} 
                    onMouseLeave={() => setOpenMega(null)}
                  >
                    <div className="mega-grid-layout">
                      
                      {/* Left: Product Columns in clean 3-column category grid */}
                      <div className="mega-sections-container">
                        
                        {/* Header Intro Bar */}
                        <div className="mega-panel-intro">
                          <h3 className="mega-portfolio-title">
                            {menu.title.toUpperCase()} TECHNICAL PORTFOLIO
                          </h3>
                          <p className="mega-portfolio-desc">
                            {menu.description}
                          </p>
                        </div>

                        {/* 3-Column Category Grid with Icons & Bullet Links */}
                        <div className={`mega-columns-row cols-${menu.sections.length}`}>
                          {menu.sections.map((sec, sIdx) => (
                            <div className="mega-category-card" key={sIdx}>
                              <div className="category-header">
                                <div className="category-icon-box">
                                  <i className={`fa-solid ${sec.icon}`}></i>
                                </div>
                                <h5 className="category-name">{sec.heading.toUpperCase()}</h5>
                              </div>
                              <ul className="category-items-list">
                                {sec.items.map((sub, itemIdx) => (
                                  <li key={itemIdx}>
                                    <a 
                                      href={getSubpageUrl(sub.name)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="category-item-link"
                                      onClick={() => setOpenMega(null)}
                                      title={`${sub.name} (Opens in new tab)`}
                                    >
                                      <span className="item-bullet">&bull;</span>
                                      <span className="item-name">{sub.name}</span>
                                      <i className="fa-solid fa-arrow-up-right-from-square item-open-icon"></i>
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Featured Showcase Card matching Mockup */}
                      <div className="mega-showcase-card">
                        <span className="showcase-badge">
                          {menu.featured?.tag || 'FLAGSHIP ANTI-CORROSION'}
                        </span>
                        <h4 className="showcase-title">
                          {menu.featured?.title || 'All Under One Roof'}
                        </h4>
                        
                        <div className="showcase-image-container">
                          <img 
                            src={menu.featured?.image || (menu.id === 'composites' ? '/images/laminate-solutions.jpg' : '/images/vci-steel-wrap.jpg')} 
                            alt={menu.featured?.title || 'Safepack Solutions'} 
                            className="showcase-img"
                            onError={(e) => { e.target.src = '/images/vci-steel-wrap.jpg'; }}
                          />
                        </div>

                        <p className="showcase-caption">
                          All Under One Roof - Trusted Worldwide
                        </p>

                        <div className="showcase-cert-row">
                          <span className="cert-badge">
                            <i className="fa-solid fa-certificate"></i> ISO 9001
                          </span>
                          <span className="cert-badge">
                            <i className="fa-solid fa-shield-halved"></i> RoHS
                          </span>
                          <span className="cert-badge">
                            <i className="fa-solid fa-circle-check"></i> REACH
                          </span>
                        </div>

                        <button 
                          className="showcase-cta-btn"
                          onClick={(e) => scrollToSection('solutions', e)}
                        >
                          Explore Applications &rarr;
                        </button>
                      </div>

                    </div>

                    {/* Bottom Export Strip matching Mockup */}
                    <div className="mega-bottom-strip">
                      <span className="strip-text">
                        Over 500+ specialized barrier products manufactured in Pune, India &middot; Exporting worldwide
                      </span>
                    </div>

                  </div>
                )}
              </div>
            ))}

            {/* 3. Interactive Packaging Wizard */}
            <a 
              href="/" 
              className={`nav-direct-link nav-wizard-link ${activeSection === 'wizard' ? 'active' : ''}`}
              onMouseEnter={() => setOpenMega(null)}
              onClick={(e) => scrollToSection('wizard', e)}
            >
              <i className="fa-solid fa-wand-magic-sparkles"></i>
              <span>Wizard</span>
            </a>

            {/* 4. Global Presence */}
            <a 
              href="/" 
              className={`nav-direct-link ${activeSection === 'global' ? 'active' : ''}`}
              onMouseEnter={() => setOpenMega(null)}
              onClick={(e) => scrollToSection('global', e)}
            >
              Global Presence
            </a>

          </nav>

          {/* Right Header Actions */}
          <div className="nav-actions">
            <button 
              className="btn btn-primary nav-rfq-cta" 
              onClick={(e) => scrollToSection('contact', e)}
            >
              <span>Request Quote</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
            <button 
              className={`menu-btn ${mobileOpen ? 'is-active' : ''}`} 
              onClick={toggleMobile} 
              aria-label="Toggle Menu"
              aria-expanded={mobileOpen}
            >
              <i className={`fa-solid ${mobileOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
            </button>
          </div>

        </div>
      </header>

      {/* Responsive Mobile Drawer Backdrop */}
      <div 
        className={`mobile-backdrop ${mobileOpen ? 'active' : ''}`} 
        onClick={closeMobile}
        aria-hidden="true"
      />

      {/* Mobile Navigation Drawer Panel */}
      <aside 
        className={`mobile-drawer ${mobileOpen ? 'open' : ''}`} 
        id="mobileDrawer"
        aria-label="Mobile Navigation"
      >
        <div className="mobile-drawer-header">
          <div className="mobile-drawer-brand">
            <img src="/images/logo.png" alt="Safepack" className="mobile-drawer-logo" />
            <div className="mobile-drawer-brand-text">
              <strong>SAFEPACK</strong>
              <span>Navigation &amp; Products</span>
            </div>
          </div>
          <button className="mobile-drawer-close" onClick={closeMobile} aria-label="Close menu">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Live Search Filter for Subpages / Products */}
        <div className="mobile-drawer-search">
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
          <input 
            type="text" 
            placeholder="Search 40+ products, laminates, VCI..." 
            value={mobileSearchQuery}
            onChange={(e) => setMobileSearchQuery(e.target.value)}
            className="mobile-search-input"
          />
          {mobileSearchQuery && (
            <button className="mobile-search-clear" onClick={() => setMobileSearchQuery('')}>
              <i className="fa-solid fa-circle-xmark"></i>
            </button>
          )}
        </div>

        {/* Search Results if user is searching */}
        {mobileSearchQuery.trim() !== '' ? (
          <div className="mobile-search-results">
            <div className="search-results-header">
              <span>{filteredItems.length} matching products found</span>
            </div>
            {filteredItems.length > 0 ? (
              <div className="search-results-list">
                {filteredItems.map((item, idx) => (
                  <a 
                    key={idx}
                    href={getSubpageUrl(item.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mobile-search-item"
                    onClick={closeMobile}
                  >
                    <div className="search-item-header">
                      <strong className="search-item-name">{item.name}</strong>
                      <span className="search-item-cat">{item.categoryTitle}</span>
                    </div>
                    <p className="search-item-desc">{item.desc}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {item.spec && <span className="search-item-spec">{item.spec}</span>}
                      <span style={{ fontSize: '0.72rem', color: '#00bf71', fontWeight: 600 }}>
                        Open in new tab <i className="fa-solid fa-arrow-up-right-from-square"></i>
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="no-search-results">
                <i className="fa-solid fa-box-open"></i>
                <p>No products match "{mobileSearchQuery}"</p>
                <button className="btn btn-outline btn-sm" onClick={() => setMobileSearchQuery('')}>
                  Clear Search
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Standard Navigation Sequence */
          <div className="mobile-menu-scroll">
            <a 
              href="/" 
              className="mobile-top-link" 
              onClick={(e) => scrollToSection('home', e)}
            >
              <i className="fa-solid fa-house"></i>
              <span>Home Overview</span>
            </a>

            {headerNavSequence.map((menu) => (
              <div className="mobile-accordion-item" key={menu.id}>
                <button 
                  className={`mobile-accordion-header ${mobileExpanded === menu.id ? 'active' : ''}`}
                  onClick={() => setMobileExpanded(mobileExpanded === menu.id ? null : menu.id)}
                >
                  <div className="mobile-accordion-title">
                    <i className={`fa-solid ${menu.icon}`}></i>
                    <span>{menu.title}</span>
                    {menu.id === 'sustainability' ? (
                      <span className="nav-eco-leaf">🌱</span>
                    ) : menu.badge ? (
                      <span className={`nav-chip-badge ${menu.isEcoHighlight ? 'chip-eco' : ''}`}>
                        {menu.badge}
                      </span>
                    ) : null}
                  </div>
                  <i className={`fa-solid fa-chevron-${mobileExpanded === menu.id ? 'up' : 'down'} accordion-arrow`}></i>
                </button>

                {mobileExpanded === menu.id && (
                  <div className="mobile-sub-list">
                    {menu.sections.map((sec, cIdx) => (
                      <div key={cIdx} className="mobile-sub-group">
                        <h6 className="mobile-sub-heading">
                          <i className={`fa-solid ${sec.icon}`}></i> {sec.heading}
                        </h6>
                        <div className="mobile-sub-buttons">
                          {sec.items.map((sub, sIdx) => (
                            <a 
                              key={sIdx}
                              href={getSubpageUrl(sub.name)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mobile-sub-item-btn"
                              onClick={closeMobile}
                            >
                              <span className="item-bullet" style={{ color: '#059669', marginRight: '6px' }}>&bull;</span>
                              <div className="mobile-sub-main">
                                <strong>{sub.name}</strong>
                                <small>{sub.desc}</small>
                              </div>
                              <i className="fa-solid fa-arrow-up-right-from-square sub-chevron"></i>
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <a 
              href="/" 
              className="mobile-top-link mobile-wizard-link" 
              onClick={(e) => scrollToSection('wizard', e)}
            >
              <i className="fa-solid fa-wand-magic-sparkles"></i>
              <span>Packaging Recommendation Wizard</span>
            </a>
            <a 
              href="/" 
              className="mobile-top-link" 
              onClick={(e) => scrollToSection('global', e)}
            >
              <i className="fa-solid fa-globe"></i>
              <span>Global Presence &amp; Export Network</span>
            </a>
            <a 
              href="/" 
              className="mobile-top-link" 
              onClick={(e) => scrollToSection('contact', e)}
            >
              <i className="fa-solid fa-paper-plane"></i>
              <span>Contact &amp; Factory Locations</span>
            </a>

            {/* Quick Mobile Contact & RFQ Action */}
            <div className="mobile-drawer-footer">
              <button 
                className="btn btn-primary btn-block" 
                onClick={(e) => scrollToSection('contact', e)}
              >
                <i className="fa-solid fa-file-signature"></i>
                <span>Instant RFQ / Quote</span>
              </button>
              <div className="mobile-quick-contacts">
                <a href="tel:+919766394445" className="quick-contact-btn">
                  <i className="fa-solid fa-phone"></i> +91 9766394445
                </a>
                <a href="mailto:solutions@safepack.com" className="quick-contact-btn">
                  <i className="fa-solid fa-envelope"></i> Email Support
                </a>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
