// Safepack 2.0 - Next-Gen Interactive Controller

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initPackagingWizard();
  initLayerVisualizer();
  initSustainabilityCalculator();
  initTdsSearch();
  initModernRfq();
});

// 1. Theme Toggle Controller
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  const htmlRoot = document.documentElement;

  const savedTheme = localStorage.getItem('safepack_theme') || 'light';
  htmlRoot.setAttribute('data-theme', savedTheme);
  updateToggleIcon(savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('safepack_theme', newTheme);
      updateToggleIcon(newTheme);
    });
  }

  function updateToggleIcon(theme) {
    if (!toggleBtn) return;
    toggleBtn.innerHTML = theme === 'dark' 
      ? '<i class="fa-solid fa-sun" style="color:#f59e0b;"></i>' 
      : '<i class="fa-solid fa-moon"></i>';
  }
}

// 2. Interactive Packaging Recommender Wizard
function initPackagingWizard() {
  const metalBtns = document.querySelectorAll('#metalSelector .pill-opt');
  const transitBtns = document.querySelectorAll('#transitSelector .pill-opt');
  const durationBtns = document.querySelectorAll('#durationSelector .pill-opt');

  let selectedMetal = 'steel';
  let selectedTransit = 'ocean';
  let selectedDuration = '12m';

  const solutionsDatabase = {
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
      desc: "High-absorption virgin kraft laminated with lightweight PE. Rapidly saturates enclosed cargo volume with protective vapors within 15 minutes of packaging.",
      vci: "Rapid-Acting Ferrous VCI",
      tensile: "MD > 380 N / CD > 220 N",
      wvtr: "< 3.0 g/m²/24h",
      width: "Up to 2400mm"
    },
    'copper-ocean': {
      title: "Safepack Multi-Metal VCI Barrier Foil Laminate (Anti-Tarnish)",
      desc: "Formulated specifically without secondary amines to prevent tarnishing or stains on non-ferrous copper, brass, and bronze components under humid sea shipping.",
      vci: "Non-Ferrous Anti-Tarnish VCI",
      tensile: "High Barrier Foil Comp.",
      wvtr: "< 0.05 g/m²/24h",
      width: "Up to 1600mm"
    },
    'aluminum-ocean': {
      title: "Safepack VCI 3-in-1 Multilayer Film & Desiccant System",
      desc: "Co-extruded polyethylene film infused with specialized aluminium passivating compounds, paired with molecular sieve desiccants to neutralize condensation.",
      vci: "Aluminium Passivating VCI",
      tensile: "Puncture Proof High DART",
      wvtr: "< 1.2 g/m²/24h",
      width: "Rolls / Gusseted 3D Bags"
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

  function updateRecommendation() {
    const key = `${selectedMetal}-${selectedTransit}`;
    const defaultData = solutionsDatabase[key] || solutionsDatabase['steel-ocean'];

    document.getElementById('recTitle').textContent = defaultData.title;
    document.getElementById('recDesc').textContent = defaultData.desc;
    document.getElementById('specVci').textContent = defaultData.vci;
    document.getElementById('specTensile').textContent = defaultData.tensile;
    document.getElementById('specWvtr').textContent = defaultData.wvtr;
    document.getElementById('specWidth').textContent = defaultData.width;

    // Card highlight pulse
    const card = document.getElementById('wizardOutput');
    card.style.transform = 'scale(0.99)';
    setTimeout(() => card.style.transform = 'scale(1)', 150);
  }

  function bindSelector(buttons, onSelect) {
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        onSelect(btn.dataset.val);
        updateRecommendation();
      });
    });
  }

  bindSelector(metalBtns, val => selectedMetal = val);
  bindSelector(transitBtns, val => selectedTransit = val);
  bindSelector(durationBtns, val => selectedDuration = val);
}

// Wizard action helper
window.requestWizardSpec = function() {
  const title = document.getElementById('recTitle').textContent;
  const notes = document.getElementById('mNotes');
  if (notes) {
    notes.value = `Selected via Wizard:\nRecommended Solution: ${title}\nPlease send full TDS and testing samples.`;
  }
  const rfqSection = document.getElementById('rfq-configurator');
  if (rfqSection) {
    rfqSection.scrollIntoView({ behavior: 'smooth' });
  }
};

// 3. 5-Ply Layer Visualizer Controller
function initLayerVisualizer() {
  const layerItems = document.querySelectorAll('.layer-nav-item');
  const layerHeading = document.getElementById('layerHeading');
  const layerText = document.getElementById('layerText');
  const layerTag = document.getElementById('layerTag');
  const layerBars = document.querySelectorAll('.layer-bar');

  const layerData = {
    '5': {
      tag: "Layer 5 Focus (Outer Shield)",
      title: "Virgin Polymer Outer Shell (UV & Weather Shield)",
      desc: "Specialized masterbatch formulation infused with anti-UV stabilizers and hydrophobic barriers, safeguarding packed metal cargo from intense tropical sun, sea spray, and rainstorms during open-deck port storage."
    },
    '4': {
      tag: "Layer 4 Focus (Structural Strength)",
      title: "Woven HDPE / PP High-Tensile Fabric Scrim",
      desc: "Precision woven polymer mesh providing extreme burst and tear resistance, engineered to wrap heavy sharp-edged steel coils, machinery corners, and wire spools without puncture."
    },
    '3': {
      tag: "Layer 3 Focus (Thermal Co-Extrusion)",
      title: "Homogeneous Polyethylene Bonding Layer",
      desc: "Hot-melt extrusion laminating matrix that thermally fuses kraft paper to woven fabric without water-based adhesives, preventing delamination in hot, humid climates."
    },
    '2': {
      tag: "Layer 2 Focus (Moisture Buffer)",
      title: "High-Density FSC Kraft Paper Substrate",
      desc: "Specially chosen neutral-pH virgin kraft paper serving as the stable structural carrier for the chemical formulation while absorbing condensation."
    },
    '1': {
      tag: "Layer 1 Focus (Active Chemistry)",
      title: "Active Green VCI Molecular Impregnation Matrix",
      desc: "Patented non-toxic amine chemistry that continuously sublimates, depositing a mono-molecular protective passivating layer on all metal surfaces to halt oxidation."
    }
  };

  layerItems.forEach(item => {
    item.addEventListener('click', () => {
      layerItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const num = item.dataset.layer;
      const data = layerData[num];

      if (layerHeading && data) {
        layerTag.textContent = data.tag;
        layerHeading.textContent = data.title;
        layerText.textContent = data.desc;
      }

      layerBars.forEach((bar, idx) => {
        if (bar.classList.contains(`l${num}`)) {
          bar.style.transform = 'scale(1.04)';
          bar.style.boxShadow = '0 0 20px rgba(16,185,129,0.5)';
        } else {
          bar.style.transform = 'scale(1)';
          bar.style.boxShadow = 'none';
        }
      });
    });
  });
}

// 4. Sustainability Calculator
function initSustainabilityCalculator() {
  const slider = document.getElementById('packagingTonnage');
  const tonnageDisplay = document.getElementById('tonnageDisplay');
  const co2Savings = document.getElementById('co2Savings');
  const plasticDiverted = document.getElementById('plasticDiverted');
  const treesEquivalent = document.getElementById('treesEquivalent');

  if (!slider) return;

  function recalculate() {
    const tonnes = parseFloat(slider.value);
    tonnageDisplay.textContent = tonnes;

    // Formulas:
    // 1 tonne bio-safe replaces 1 tonne plastic = ~2.3 tonnes CO2 reduction
    const co2 = (tonnes * 2.3).toFixed(1);
    const plastic = tonnes.toFixed(1);
    const trees = Math.round(tonnes * 104.5).toLocaleString();

    co2Savings.textContent = co2;
    plasticDiverted.textContent = plastic;
    treesEquivalent.textContent = trees;
  }

  slider.addEventListener('input', recalculate);
  recalculate();
}

// 5. TDS Search & Download Simulation
function initTdsSearch() {
  const searchInput = document.getElementById('tdsSearchInput');
  const rows = document.querySelectorAll('.tds-row');

  if (!searchInput) return;

  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase().trim();
    rows.forEach(row => {
      const match = row.dataset.name.toLowerCase().includes(q) || row.textContent.toLowerCase().includes(q);
      row.style.display = match ? 'flex' : 'none';
    });
  });
}

window.simulateTdsDownload = function(tdsCode) {
  const alertText = `Downloading official technical specification document: ${tdsCode}.pdf\n\n(Includes: ASTM D1748 Humidity Test, DIN 50017 SO2 Corrosion Data, RoHS & REACH Compliance Certificate)`;
  alert(alertText);
};

// 6. Smart RFQ Form Handler
function initModernRfq() {
  const form = document.getElementById('modernRfqForm');
  const alertBox = document.getElementById('rfqAlert');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting Specifications...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
      form.reset();
      if (alertBox) {
        alertBox.style.display = 'block';
        setTimeout(() => alertBox.style.display = 'none', 9000);
      }
    }, 1400);
  });
}
