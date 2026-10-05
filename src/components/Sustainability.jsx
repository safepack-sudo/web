import React, { useState } from 'react';

export default function Sustainability() {
  const [tonnage, setTonnage] = useState(100);

  const co2Saved = (tonnage * 2.3).toFixed(1);
  const plasticDiverted = tonnage.toFixed(1);
  const treesEquivalent = Math.round(tonnage * 104.5).toLocaleString();

  return (
    <section className="sustain" id="sustainability">
      <div className="container sustain-grid">
        <div>
          <div className="eyebrow" style={{ color: '#abd9bb' }}>
            <i className="fa-solid fa-leaf"></i> Sustainability at the core
          </div>
          <h2>Protection that performs with the planet in mind.</h2>
          <p>
            We make sustainability an integral product story. Safepack pioneers non-toxic, nitrite-free Green VCI chemistry and bio-safe compostable barrier coatings to slash Scope 3 supply chain carbon emissions.
          </p>

          <div className="check-list">
            <div className="check-item"><span>✓</span> <div><strong>Reduce:</strong> Lower packaging weight &amp; chemical volume</div></div>
            <div className="check-item"><span>✓</span> <div><strong>Reuse:</strong> Multi-trip heavy duty returnable wraps</div></div>
            <div className="check-item"><span>✓</span> <div><strong>Recycle:</strong> 100% recyclable kraft base substrates</div></div>
            <div className="check-item"><span>✓</span> <div><strong>Rethink:</strong> Plant-derived Bio-Safe biopolymer coatings</div></div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '20px', borderRadius: '18px', border: '1px solid rgba(255, 255, 255, 0.15)', marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem' }}>
              <span>Annual Packaging Usage:</span>
              <strong style={{ color: '#d8f3dc' }}>{tonnage} Metric Tonnes</strong>
            </div>
            <input 
              type="range" 
              min="10" 
              max="500" 
              value={tonnage} 
              onChange={(e) => setTonnage(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#52b788', cursor: 'pointer' }}
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '14px', textAlign: 'center' }}>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '8px' }}>
                <strong style={{ display: 'block', fontSize: '1.2rem', color: '#52b788' }}>{plasticDiverted} T</strong>
                <small style={{ fontSize: '0.72rem', color: '#c9ded0' }}>Plastic Diverted</small>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '8px' }}>
                <strong style={{ display: 'block', fontSize: '1.2rem', color: '#52b788' }}>{co2Saved} T</strong>
                <small style={{ fontSize: '0.72rem', color: '#c9ded0' }}>CO₂e Offset</small>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '8px' }}>
                <strong style={{ display: 'block', fontSize: '1.2rem', color: '#52b788' }}>{treesEquivalent}</strong>
                <small style={{ fontSize: '0.72rem', color: '#c9ded0' }}>Trees Grown</small>
              </div>
            </div>
          </div>

        </div>

        <div className="leaf-panel">
          <div className="leaf one"></div>
          <div className="leaf two"></div>
          <div className="leaf three"></div>
          <div className="tag">
            <i className="fa-solid fa-seedling"></i> Green VCI Chemistry &middot; Sustainable Bio-Materials
          </div>
        </div>
      </div>
    </section>
  );
}
