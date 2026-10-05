import React, { useState } from 'react';

export default function DiscoverSafepack() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = 'mZJMXLPRFwo';
  const startTime = 4; // &t=4s as requested

  return (
    <section className="discover-safepack" id="discover">
      <div className="container">
        <div className="discover-grid">
          
          {/* Left Column: Video with Thumbnail Preview and Interactive Play Button */}
          <div className="discover-video-column">
            <div className="video-card-container">
              {!isPlaying ? (
                <div 
                  className="video-thumbnail-preview"
                  onClick={() => setIsPlaying(true)}
                  role="button"
                  tabIndex={0}
                  aria-label="Play Safepack Corporate Video"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setIsPlaying(true);
                    }
                  }}
                >
                  <img 
                    src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                    alt="Safepack Corporate Overview Video Thumbnail"
                    className="video-thumb-img"
                    onError={(e) => {
                      e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                    }}
                  />
                  <div className="video-overlay-gradient"></div>
                  
                  {/* Glowing Pulsing Play Button */}
                  <div className="video-play-btn-wrapper">
                    <button className="video-play-btn" aria-hidden="true" tabIndex={-1}>
                      <i className="fa-solid fa-play"></i>
                    </button>
                    <div className="video-pulse-ring ring-1"></div>
                    <div className="video-pulse-ring ring-2"></div>
                  </div>

                  {/* Video Badge / Label */}
                  <div className="video-meta-badge">
                    <span className="badge-live-dot"></span>
                    <span>Watch Corporate Film</span>
                  </div>
                </div>
              ) : (
                <div className="video-iframe-wrapper">
                  <iframe 
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&start=${startTime}&rel=0&modestbranding=1`}
                    title="Safepack Industrial Packaging Solutions"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="video-iframe"
                  ></iframe>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Discover Safepack Content */}
          <div className="discover-content">
            <div className="eyebrow">
              <i className="fa-solid fa-compass"></i> Discover Safepack
            </div>
            <h2>Global market leader in corrosion prevention solutions.</h2>
            <p>
              Safepack is a global market leader in corrosion prevention solutions, manufacturing over 500 products. The company serves over 10,000 customers worldwide and exports its products to 45+ countries.
            </p>

            <div className="discover-features">
              <div className="feature-item">
                <i className="fa-solid fa-industry"></i>
                <div>
                  <strong>Ultramodern Manufacturing Campus</strong>
                  <p>From molecule chemical synthesis to finished barrier laminates all under one roof in Pune, India.</p>
                </div>
              </div>
              <div className="feature-item">
                <i className="fa-solid fa-flask-vial"></i>
                <div>
                  <strong>Research Inspired Products</strong>
                  <p>Patented Green VCI chemistry, eco-friendly formulations, and custom barrier engineering.</p>
                </div>
              </div>
            </div>

            <div className="discover-action-row">
              <button 
                type="button" 
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById('solutions');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    window.history.replaceState(null, '', '/');
                  }
                }} 
                className="btn btn-primary"
              >
                Explore Core Solutions &rarr;
              </button>
              <a 
                href="https://www.youtube.com/watch?v=mZJMXLPRFwo&t=4s" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-outline video-external-link"
              >
                <i className="fa-brands fa-youtube" style={{ color: '#ff0000', marginRight: '6px' }}></i>
                Watch on YouTube
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
