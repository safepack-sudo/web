import React from 'react';
import { clientLogos } from '../data/content';

export default function Clients() {
  return (
    <section className="clients-section" id="clients">
      <div className="container">
        <div className="section-head text-center">
          <div>
            <div className="eyebrow">Partnerships &amp; Trust</div>
            <h2>Partnering with Fortune 500 Industrial Leaders</h2>
          </div>
          <p style={{ margin: '10px auto 0' }}>
            Safepack is trusted across 40+ countries by premier automotive, steel, and engineering conglomerates.
          </p>
        </div>

        <div className="clients-logo-grid">
          {clientLogos.map((client, idx) => (
            <div className="client-box" key={idx}>
              <img src={client.src} alt={client.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
