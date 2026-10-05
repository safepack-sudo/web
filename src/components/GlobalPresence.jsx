import React from 'react';

export default function GlobalPresence() {
  return (
    <section className="global-presence-section" id="global">
      <div className="container">
        
        {/* Section Heading matching exact live site */}
        <div className="global-head-block">
          <div className="eyebrow">
            <i className="fa-solid fa-earth-americas"></i> Worldwide Reach &amp; Distribution
          </div>
          <h2 className="global-main-heading">
            Exporting to 40+ countries
          </h2>
        </div>

        {/* Video Map Container embedding exact live MP4 */}
        <div className="global-video-wrapper">
          <video 
            className="global-map-video" 
            src="https://safepack.com/wp-content/uploads/2021/10/safepack-map.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            controlsList="nodownload"
            poster="https://safepack.com/wp-content/uploads/2022/05/Safepack-Solutions.jpg"
          >
            Your browser does not support the video tag.
          </video>
          
          <div className="global-video-badge">
            <span className="live-pulse-dot"></span>
            <span>Live Global Export Network</span>
          </div>
        </div>

        {/* Lower Banner: We Supply Packaging Solutions PAN India and across the globe */}
        <div className="global-pan-india-banner">
          <div className="pan-india-copy">
            <h3>We Supply Packaging Solutions PAN India and across the globe.</h3>
            <p>
              Safepack operates an ultramodern, vertically integrated manufacturing campus in Pune, India—handling molecule synthesis, extrusion coating up to 4000mm width, blown films, and precision micro-slitting under one roof.
            </p>
          </div>

          <div className="pan-india-action">
            <a href="#contact" className="btn btn-primary btn-pan-india">
              <span>Contact Global Sales</span>
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>

        {/* Stat Highlights Counter */}
        <div className="global-stats-row">
          <div className="global-stat-card">
            <div className="stat-num-row">
              <strong>40+</strong>
              <i className="fa-solid fa-plane-departure"></i>
            </div>
            <span>Countries Exported</span>
          </div>

          <div className="global-stat-card">
            <div className="stat-num-row">
              <strong>500+</strong>
              <i className="fa-solid fa-layer-group"></i>
            </div>
            <span>Specialized Products</span>
          </div>

          <div className="global-stat-card">
            <div className="stat-num-row">
              <strong>10,000+</strong>
              <i className="fa-solid fa-building"></i>
            </div>
            <span>Enterprise Clients</span>
          </div>

          <div className="global-stat-card">
            <div className="stat-num-row">
              <strong>4000mm</strong>
              <i className="fa-solid fa-ruler-combined"></i>
            </div>
            <span>Widest Extrusion Plant</span>
          </div>
        </div>

      </div>
    </section>
  );
}
