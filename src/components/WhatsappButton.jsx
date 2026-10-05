import React, { useState } from 'react';

export default function WhatsappButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const phoneNumber = '919766394445';
  const defaultMessage = encodeURIComponent(
    'Hello Safepack (SIPL) Team, I am interested in inquiring about your VCI and technical industrial packaging solutions.'
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <div className="whatsapp-floating-wrap">
      {showTooltip && (
        <div className="whatsapp-tooltip">
          <strong>Chat on WhatsApp</strong>
          <span>Instant SIPL Technical Sales Support</span>
        </div>
      )}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Chat on WhatsApp with Safepack Technical Support"
      >
        <div className="whatsapp-pulse"></div>
        <i className="fa-brands fa-whatsapp"></i>
        <span className="whatsapp-live-indicator"></span>
      </a>
    </div>
  );
}
