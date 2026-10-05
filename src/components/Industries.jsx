import React from 'react';
import { industriesData } from '../data/content';

export default function Industries() {
  return (
    <section className="industries" id="industries">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">Industries we serve</div>
            <h2>Trusted across critical sectors.</h2>
          </div>
          <p>
            Industry-led discovery reduces navigation effort and helps visitors reach the right technical solution faster.
          </p>
        </div>

        <div className="industry-grid">
          {industriesData.map((ind, idx) => (
            <div className="industry-card" key={idx}>
              <div className="industry-icon">
                <i className={`fa-solid ${ind.icon}`}></i>
              </div>
              <strong>{ind.title}</strong>
              <span>{ind.desc} &rarr;</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
