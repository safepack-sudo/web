import React from 'react';

export default function Topline() {
  const handleScrollToContact = (e) => {
    e.preventDefault();
    if (window.location.pathname !== '/') {
      window.location.href = '/?section=contact';
      return;
    }
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', '/');
    }
  };

  return (
    <div className="topline">
      <div className="container topline-inner">
        {/* Left Side: Top Secondary Navigation with Clean URLs and New Tab support */}
        <div className="topline-left">
          <nav className="topline-subnav" aria-label="Secondary Quick Navigation">
            <a href="/" className="topline-link active">
              <i className="fa-solid fa-house" style={{ fontSize: '0.72rem', marginRight: '4px' }}></i>
              Home
            </a>
            <span className="topline-divider">&bull;</span>
            <a 
              href="https://safepack.com/news/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="topline-link"
              title="Opens in new tab"
            >
              News <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '0.62rem', marginLeft: '3px', opacity: 0.7 }}></i>
            </a>
            <span className="topline-divider">&bull;</span>
            <a 
              href="https://safepack.com/blog/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="topline-link"
              title="Opens in new tab"
            >
              Blog <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '0.62rem', marginLeft: '3px', opacity: 0.7 }}></i>
            </a>
            <span className="topline-divider">&bull;</span>
            <a 
              href="/" 
              onClick={handleScrollToContact}
              className="topline-link"
            >
              Contact
            </a>
            <span className="topline-divider">&bull;</span>
            <a 
              href="https://safepack.com/locations/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="topline-link"
              title="Opens in new tab"
            >
              Locations <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '0.62rem', marginLeft: '3px', opacity: 0.7 }}></i>
            </a>
          </nav>
        </div>

        {/* Right Side: Quick Contact Desk */}
        <div className="mini-links">
          <span className="mini-link-item hide-on-sm">
            <i className="fa-solid fa-earth-americas"></i> Exporting to 40+ Countries
          </span>
          <a href="mailto:solutions@safepack.com" className="mini-link-item">
            <i className="fa-solid fa-envelope"></i> solutions@safepack.com
          </a>
          <a href="tel:+919766394445" className="mini-link-item">
            <i className="fa-solid fa-phone"></i> +91 9766394445
          </a>
          <a href="tel:+919822067467" className="mini-link-item hide-on-md">
            <i className="fa-solid fa-globe"></i> +91 9822067467 (Intl)
          </a>
        </div>
      </div>
    </div>
  );
}
