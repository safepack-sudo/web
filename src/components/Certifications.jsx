import React from 'react';
import { certificationsData } from '../data/content';

export default function Certifications() {
  return (
    <section className="certifications">
      <div className="container cert-row">
        <div className="cert-title">
          <strong>Quality. Compliance. Confidence.</strong>
          <span>Trust signals validated by international accreditation standards.</span>
        </div>
        {certificationsData.map((c, idx) => (
          <div className="cert" key={idx}>
            <b>{c.standard}</b>
            <small>{c.label}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
