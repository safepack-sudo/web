import React, { useState } from 'react';

export default function PackagingWizard({ onPreFillRfq }) {
  const [metal, setMetal] = useState('steel');
  const [transit, setTransit] = useState('ocean');
  const [duration, setDuration] = useState('12m');

  const recommendations = {
    'steel-ocean': {
      title: "Safepack VCI Steel Wrap (Heavy Duty Woven Fabric Reinforced)",
      desc: "Co-extrusion barrier with high-tensile HDPE woven scrim and concentrated Green VCI amine salt matrix. Engineered specifically to withstand severe condensation, temperature cycling, and high-salinity marine ocean container shipping.",
      vci: "Ferrous Multi-Layer Active VCI",
      tensile: "MD > 750 N / CD > 600 N",
      wvtr: "< 0.5 g/m²/24h",
      width: "Up to 3000mm / 4000mm"
    },
    'steel-air': {
      title: "Safepack VCI Poly Coated Kraft Paper (Rapid Saturation)",
      desc: "High-absorption virgin kraft laminated with lightweight PE. Rapidly saturates enclosed cargo volume with protective vapors within 15 minutes of packaging for accelerated air transit.",
      vci: "Rapid-Acting Ferrous VCI",
      tensile: "MD > 380 N / CD > 220 N",
      wvtr: "< 3.0 g/m²/24h",
      width: "Up to 2400mm"
    },
    'steel-land': {
      title: "Safepack VCI Crepe Paper & Stretch Film System",
      desc: "High-elongation crepe paper paired with multi-layer VCI stretch wrap. Absorbs road vibration while continuously releasing vapor inhibitors across automotive and steel freight.",
      vci: "Ferrous Contact & Vapor Inhibitor",
      tensile: "High Flexibility & Puncture Resistance",
      wvtr: "< 2.5 g/m²/24h",
      width: "Rolls up to 2000mm"
    },
    'steel-storage': {
      title: "Safepack VCI Heavy Duty Barrier Foil & Emitter Matrix",
      desc: "Engineered 5-ply aluminium foil barrier combined with molecular VCI diffuse emitters for static yard preservation and warehouse mothballing up to 36 months.",
      vci: "Extended-Life Vapor Phase VCI",
      tensile: "MIL-PRF-131 Class 1 Heavy Duty",
      wvtr: "< 0.005 g/m²/24h",
      width: "Custom Machine Shrouds & 4000mm Rolls"
    },
    'copper-ocean': {
      title: "Safepack Multi-Metal VCI Barrier Foil Laminate (Anti-Tarnish)",
      desc: "Formulated specifically without secondary amines to prevent tarnishing or stains on non-ferrous copper, brass, and bronze components under humid sea shipping.",
      vci: "Non-Ferrous Anti-Tarnish VCI",
      tensile: "High Barrier Foil Composite",
      wvtr: "< 0.05 g/m²/24h",
      width: "Up to 1600mm"
    },
    'copper-air': {
      title: "Safepack Non-Ferrous VCI Plain & Poly Kraft Paper",
      desc: "pH-neutral virgin kraft paper impregnated with copper passivators. Prevents oxidation streaks and surface discoloration on precision electronic and electrical coils.",
      vci: "Nitrite-Free Copper Passivator",
      tensile: "MD > 300 N / CD > 180 N",
      wvtr: "< 5.0 g/m²/24h",
      width: "Up to 2000mm"
    },
    'copper-land': {
      title: "Safepack VCI Stretch Film for Non-Ferrous Metals",
      desc: "100% amine-free stretch film infused with specialized copper and bronze passivating chemicals for domestic transit and intermediate factory staging.",
      vci: "Amine-Free Copper VCI",
      tensile: "300% Pre-Stretch Capability",
      wvtr: "< 4.0 g/m²/24h",
      width: "Machine & Hand Rolls (500mm)"
    },
    'copper-storage': {
      title: "Safepack Hermetic Foil Barrier with Copper Passivating Foam",
      desc: "Heat-sealable high-barrier laminate paired with open-cell VCI foam pads saturated with non-ferrous inhibitors for long-term electrical and copper tubing preservation.",
      vci: "Concentrated Non-Ferrous Inhibitor",
      tensile: "High Puncture Barrier",
      wvtr: "< 0.01 g/m²/24h",
      width: "Pre-formed 3D Bags & Rolls"
    },
    'aluminum-ocean': {
      title: "Safepack VCI 3-in-1 Multilayer Film & Desiccant System",
      desc: "Co-extruded polyethylene film infused with specialized aluminium passivating compounds, paired with molecular sieve desiccants to neutralize condensation.",
      vci: "Aluminium Passivating VCI",
      tensile: "Puncture Proof High DART",
      wvtr: "< 1.2 g/m²/24h",
      width: "Rolls / Gusseted 3D Bags"
    },
    'aluminum-air': {
      title: "Safepack VCI High-DART Polyethylene Bag Liner",
      desc: "Ultra-clean low-density film free of heavy metals, providing rapid passivation against aerospace aluminum skin condensation during high-altitude transit.",
      vci: "Aerospace Grade Light VCI",
      tensile: "High Tear Strength",
      wvtr: "< 2.0 g/m²/24h",
      width: "Up to 3000mm Tube/Sheet"
    },
    'aluminum-land': {
      title: "Safepack VCI Poly Coated Paper for Aluminium Coils",
      desc: "Moisture-resistant kraft barrier that prevents fretting corrosion and chafing marks between adjacent aluminium coils and extrusions during road transport.",
      vci: "White Rust Inhibitor Formulation",
      tensile: "MD > 400 N / CD > 250 N",
      wvtr: "< 3.0 g/m²/24h",
      width: "Continuous Width to 2400mm"
    },
    'aluminum-storage': {
      title: "Safepack VCI Alupack 5-Ply Vacuum Foil Barrier",
      desc: "Military-grade aluminium barrier laminate providing an impervious barrier to vapor, salt fog, and UV light for critical aluminum ingots, forgings, and aerospace structures.",
      vci: "Vapor Passivation + Vacuum Seal",
      tensile: "MIL-PRF-131 Class 1",
      wvtr: "< 0.005 g/m²/24h",
      width: "Up to 4000mm Seamless"
    },
    'multimetal-ocean': {
      title: "Safepack Universal Multi-Metal VCI Woven Scrim Laminate",
      desc: "Co-extruded 5-ply wrap protecting assemblies containing mixed steel, copper, brass, aluminium, and cadmium in ocean freight containers.",
      vci: "Universal Broad-Spectrum VCI 500",
      tensile: "MD > 700 N / CD > 550 N",
      wvtr: "< 0.5 g/m²/24h",
      width: "Continuous Width up to 4000mm"
    },
    'multimetal-air': {
      title: "Safepack Bio-Safe Multi-Metal VCI Film & Bags",
      desc: "Lightweight transparent multi-metal film permitting customs barcode scanning without breaking sealed corrosion protection.",
      vci: "Universal Contact & Vapor VCI",
      tensile: "High Clarity & Puncture Resistance",
      wvtr: "< 2.5 g/m²/24h",
      width: "Custom Zipper / 2D / 3D Bags"
    },
    'multimetal-land': {
      title: "Safepack Multi-Metal VCI Poly Coated Kraft Interleaving",
      desc: "Heavy-duty poly-coated paper delivering simultaneous protection to mixed metallic assemblies, transmissions, and machined components in regional transport.",
      vci: "Universal Multi-Metal VCI",
      tensile: "MD > 450 N / CD > 280 N",
      wvtr: "< 2.0 g/m²/24h",
      width: "Up to 2400mm"
    },
    'multimetal-storage': {
      title: "Safepack Long-Term Asset Mothballing VCI Powder + Foil Enclosure",
      desc: "Complete preservation kit combining water-soluble fogging VCI powder for interior cavities and heat-sealable 5-ply aluminium foil for outer hermetic seal up to 5 years.",
      vci: "Universal Multi-Metal VCI 500",
      tensile: "MIL-PRF-131 Class 1",
      wvtr: "< 0.005 g/m²/24h",
      width: "Custom Machine Shrouds"
    }
  };

  const key = `${metal}-${transit}`;
  const rec = recommendations[key] || recommendations['steel-ocean'];

  const handleApplyToRfq = () => {
    onPreFillRfq(rec.title);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', '/');
    }
  };

  return (
    <section className="wizard-section" id="wizard">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow"><i className="fa-solid fa-wand-magic-sparkles"></i> Decision Recommender</div>
            <h2>Interactive Packaging Selection Engine</h2>
          </div>
          <p>
            Select your metal substrate, transit mode, and protection duration to instantly compute the recommended VCI barrier system, tensile requirements, and standard widths.
          </p>
        </div>

        <div className="wizard-card">
          <div className="wizard-controls">
            
            <div className="wizard-step-group">
              <label><i className="fa-solid fa-cubes"></i> 1. Select Metal Substrate</label>
              <div className="pill-row">
                <button className={`pill-choice ${metal === 'steel' ? 'active' : ''}`} onClick={() => setMetal('steel')}>Carbon Steel / Coils</button>
                <button className={`pill-choice ${metal === 'copper' ? 'active' : ''}`} onClick={() => setMetal('copper')}>Copper / Brass / Bronze</button>
                <button className={`pill-choice ${metal === 'aluminum' ? 'active' : ''}`} onClick={() => setMetal('aluminum')}>Aluminium &amp; Alloys</button>
                <button className={`pill-choice ${metal === 'multimetal' ? 'active' : ''}`} onClick={() => setMetal('multimetal')}>Multi-Metal Assemblies</button>
              </div>
            </div>

            <div className="wizard-step-group">
              <label><i className="fa-solid fa-ship"></i> 2. Transit Mode &amp; Climate</label>
              <div className="pill-row">
                <button className={`pill-choice ${transit === 'ocean' ? 'active' : ''}`} onClick={() => setTransit('ocean')}>Ocean Cargo (High Humidity)</button>
                <button className={`pill-choice ${transit === 'air' ? 'active' : ''}`} onClick={() => setTransit('air')}>Air Freight / Rapid Transit</button>
                <button className={`pill-choice ${transit === 'land' ? 'active' : ''}`} onClick={() => setTransit('land')}>Domestic Road / Rail</button>
                <button className={`pill-choice ${transit === 'storage' ? 'active' : ''}`} onClick={() => setTransit('storage')}>Long-Term Plant Mothballing</button>
              </div>
            </div>

            <div className="wizard-step-group">
              <label><i className="fa-solid fa-clock"></i> 3. Required Protection Duration</label>
              <div className="pill-row">
                <button className={`pill-choice ${duration === '6m' ? 'active' : ''}`} onClick={() => setDuration('6m')}>Up to 6 Months</button>
                <button className={`pill-choice ${duration === '12m' ? 'active' : ''}`} onClick={() => setDuration('12m')}>12 to 24 Months</button>
                <button className={`pill-choice ${duration === '36m' ? 'active' : ''}`} onClick={() => setDuration('36m')}>24 to 36+ Months</button>
              </div>
            </div>

          </div>

          <div className="wizard-result-box">
            <div>
              <span className="eyebrow" style={{ fontSize: '0.7rem' }}>
                <i className="fa-solid fa-circle-check"></i> Recommended Formulation
              </span>
              <h3>{rec.title}</h3>
              <p>{rec.desc}</p>

              <div className="spec-grid-mini">
                <div className="spec-mini-item">
                  <small>Active Chemistry</small>
                  <strong>{rec.vci}</strong>
                </div>
                <div className="spec-mini-item">
                  <small>Tensile Strength</small>
                  <strong>{rec.tensile}</strong>
                </div>
                <div className="spec-mini-item">
                  <small>Water Vapor (WVTR)</small>
                  <strong>{rec.wvtr}</strong>
                </div>
                <div className="spec-mini-item">
                  <small>Extrusion Widths</small>
                  <strong>{rec.width}</strong>
                </div>
              </div>
            </div>

            <button className="btn btn-primary btn-block" onClick={handleApplyToRfq}>
              Apply Formulation to RFQ &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
