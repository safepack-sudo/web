import React, { useState, useEffect, useRef, useCallback } from 'react';

const heroSlides = [
  {
    id: 1,
    tabLabel: '01. Research & Innovation',
    eyebrow: 'Environment First',
    eyebrowIcon: 'fa-flask',
    titleLine1: 'Research Inspired',
    titleLine2: 'Products &',
    titleLine3: 'Solutions.',
    desc: 'Constant lateral thinking for innovative products and practices, keeping ‘environment safety’ at core.',
    image: '/images/banner-1.png',
    fallbackImg: 'https://safepack.com/wp-content/uploads/2021/10/banner-1-41-si-1.png',
    primaryBtn: { text: 'Explore Innovation', href: '#solutions' },
    secondaryBtn: { text: 'Learn More', href: '#wizard' },
    cardTop: { icon: 'fa-flask', title: 'Customized Research', subtitle: 'Advanced formulation labs' },
    cardBottom: { icon: 'fa-leaf', title: 'Environment First', subtitle: 'Green VCI Chemistry' },
    tags: ['Green VCI Chemistry', 'Optimized Protection', 'Customized Research']
  },
  {
    id: 2,
    tabLabel: '02. VCI Solutions',
    eyebrow: 'Molecule Synthesis to End Products',
    eyebrowIcon: 'fa-layer-group',
    titleLine1: 'Anti-Corrosive VCI',
    titleLine2: 'Packaging',
    titleLine3: 'Solutions.',
    desc: 'Ultramodern manufacturing plant, from molecule synthesis to end products – ALL UNDER ONE ROOF!',
    image: '/images/banner-2.png',
    fallbackImg: 'https://safepack.com/wp-content/uploads/2021/10/banner-2-41-si.png',
    primaryBtn: { text: 'Explore VCI Solutions', href: '#solutions' },
    secondaryBtn: { text: 'Request Details', href: '#contact' },
    cardTop: { icon: 'fa-industry', title: 'Complete VCI Range', subtitle: 'Multi-metal Protection' },
    cardBottom: { icon: 'fa-clock', title: 'Long Term Protection', subtitle: 'Global Export Ready' },
    tags: ['Complete VCI Range', 'Multi-metal Protection', 'Long Term Protection']
  },
  {
    id: 3,
    tabLabel: '03. Flexible Packaging',
    eyebrow: 'Innovative and Quality Packaging',
    eyebrowIcon: 'fa-box',
    titleLine1: 'Multilayer Flexible',
    titleLine2: 'Packaging',
    titleLine3: 'Solutions.',
    desc: 'Wide range of innovative and quality packaging solutions to protect and preserve what matters to you the most.',
    image: '/images/banner-3.png',
    fallbackImg: 'https://safepack.com/wp-content/uploads/2021/10/banner-3-41-si.png',
    primaryBtn: { text: 'View Flexible Range', href: '#solutions' },
    secondaryBtn: { text: 'Calculate ESG Offset', href: '#sustainability' },
    cardTop: { icon: 'fa-seedling', title: 'Sustainable Solutions', subtitle: 'Green VCI Chemistry' },
    cardBottom: { icon: 'fa-users', title: 'Customer Centric', subtitle: 'Technical Laminates' },
    tags: ['Technical Laminates', 'Green VCI Chemistry', 'Sustainable Solutions']
  },
  {
    id: 4,
    tabLabel: '04. Global Packaging',
    eyebrow: 'Prevent Rust & Protect Globally',
    eyebrowIcon: 'fa-globe-americas',
    titleLine1: 'Leading World Class',
    titleLine2: 'Packaging',
    titleLine3: 'Solutions.',
    desc: 'We commit to prevent rust and provide quality packaging solutions, globally. Exporting to 40+ Countries.',
    image: '/images/banner-4.png',
    fallbackImg: 'https://safepack.com/wp-content/uploads/2021/10/banner-4-41-si.png',
    primaryBtn: { text: 'Explore Global Network', href: '#global' },
    secondaryBtn: { text: 'Contact Us', href: '#contact' },
    cardTop: { icon: 'fa-ship', title: 'Exporting to 40+ Countries', subtitle: 'Worldwide Reach' },
    cardBottom: { icon: 'fa-award', title: 'International Accreditations', subtitle: 'Customized Products' },
    tags: ['Exporting to 40+ Countries', 'Customized Products', 'International Accreditations']
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Robust timer for slide rotation
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

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
    if (diff > 50) {
      nextSlide(); // Swiped left -> next
    } else if (diff < -50) {
      prevSlide(); // Swiped right -> prev
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const current = heroSlides[currentSlide];

  return (
    <section 
      className="hero" 
      id="home"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="container hero-container">
        
        {/* Main Grid: Copy Left, Visual Stage Right */}
        <div className="hero-grid">
          
          {/* Left Text Column with Crossfade Transition */}
          <div className="hero-copy-column">
            {heroSlides.map((slide, idx) => (
              <div 
                key={slide.id} 
                className={`hero-slide-copy ${idx === currentSlide ? 'active' : ''}`}
                aria-hidden={idx !== currentSlide}
              >
                <div className="eyebrow">
                  <i className={`fa-solid ${slide.eyebrowIcon}`}></i> {slide.eyebrow}
                </div>
                
                <h1>
                  {slide.titleLine1}<br/>
                  <span className="green">{slide.titleLine2}</span><br/>
                  {slide.titleLine3}
                </h1>
                
                <p>
                  {slide.desc}
                </p>

                <div className="hero-actions">
                  <a href={slide.primaryBtn.href} className="btn btn-primary">
                    {slide.primaryBtn.text} &rarr;
                  </a>
                  <a href={slide.secondaryBtn.href} className="btn btn-outline">
                    {slide.secondaryBtn.text}
                  </a>
                </div>

                <div className="hero-trust">
                  {slide.tags.map((tag, tIdx) => (
                    <span key={tIdx}><i>✓</i> {tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Visual Image Column with Multi-Layer Crossfade Stage */}
          <div className="hero-visual" aria-label="Safepack Product Banner Showcase">
            <div className="visual-stage">
              {heroSlides.map((slide, idx) => (
                <div 
                  key={slide.id} 
                  className={`visual-slide-layer ${idx === currentSlide ? 'active' : ''}`}
                  aria-hidden={idx !== currentSlide}
                >
                  <img 
                    src={slide.image} 
                    alt={slide.titleLine1 + ' ' + slide.titleLine2} 
                    className="hero-stage-img" 
                    onError={(e) => { e.target.src = slide.fallbackImg; }} 
                  />
                </div>
              ))}
              <div className="visual-gradient-overlay"></div>
            </div>

            {/* Dynamic Floating Feature Cards */}
            <div className="floating-card">
              <div className="floating-icon"><i className={`fa-solid ${current.cardBottom.icon}`}></i></div>
              <div>
                <strong>{current.cardBottom.title}</strong>
                <small>{current.cardBottom.subtitle}</small>
              </div>
            </div>

            <div className="floating-card floating-card-top">
              <div className="floating-icon icon-blue"><i className={`fa-solid ${current.cardTop.icon}`}></i></div>
              <div>
                <strong>{current.cardTop.title}</strong>
                <small>{current.cardTop.subtitle}</small>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Interactive Navigation Bar with Tabs & Arrows */}
        <div className="hero-bottom-navigator">
          
          {/* Previous / Next Arrows */}
          <div className="hero-nav-arrows">
            <button 
              className="slider-nav-btn" 
              onClick={prevSlide}
              aria-label="Previous Slide"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button 
              className="slider-nav-btn" 
              onClick={nextSlide}
              aria-label="Next Slide"
            >
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>

          {/* 4 Interactive Category Tab Pills */}
          <div className="hero-category-tabs">
            {heroSlides.map((slide, idx) => (
              <button
                key={slide.id}
                className={`hero-tab-pill ${idx === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(idx)}
                aria-label={`Jump to slide ${slide.tabLabel}`}
              >
                <span className="tab-pill-text">{slide.tabLabel}</span>
                {idx === currentSlide && (
                  <span className={`tab-pill-progress ${isPaused ? 'paused' : ''}`}></span>
                )}
              </button>
            ))}
          </div>

          {/* Slide Numeric Counter */}
          <div className="hero-counter-wrap">
            <span className="current-num">0{currentSlide + 1}</span>
            <span className="slash">/</span>
            <span className="total-num">0{heroSlides.length}</span>
          </div>

        </div>

      </div>
    </section>
  );
}
