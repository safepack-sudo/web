// Safepack Industries Ltd. — Master JavaScript Application Controller

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollSpy();
  initFormToast();
  initProductModals();
});

// 1. Mobile Menu Toggle
function initMobileMenu() {
  const menuBtn = document.getElementById('menuBtn');
  const panel = document.getElementById('mobilePanel');

  if (menuBtn && panel) {
    menuBtn.addEventListener('click', () => {
      panel.classList.toggle('open');
    });

    panel.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        panel.classList.remove('open');
      });
    });
  }
}

// 2. Navigation Scroll Spy
function initScrollSpy() {
  const links = [...document.querySelectorAll('.nav-links a')];
  const sections = [...document.querySelectorAll('main section[id]')];

  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(a => a.classList.remove('active'));
        const activeLink = links.find(a => a.getAttribute('href') === `#${entry.target.id}`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => observer.observe(s));
}

// 3. Form Submission with Animated Toast
function initFormToast() {
  const form = document.getElementById('demoForm');
  const toast = document.getElementById('toast');

  if (!form || !toast) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      form.reset();

      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3500);
    }, 1000);
  });
}

// 4. Product Details Modal
const productInfo = {
  vci: {
    title: "VCI Packaging Solutions",
    badge: "Corrosion Protection",
    desc: "Safepack's non-toxic Volatile Corrosion Inhibitor (VCI) products provide comprehensive molecular rust protection for ferrous and non-ferrous metals during overseas transit and warehouse storage.",
    specs: [
      { k: "Product Formats", v: "VCI Kraft Paper, Poly-coated, Fabric-reinforced Metal Wrap, 3-ply Scrim" },
      { k: "Protection Duration", v: "Up to 24 to 36 Months in sealed conditions" },
      { k: "Metals Covered", v: "Carbon Steel, Copper, Brass, Bronze, Aluminium, Galvanized Iron" },
      { k: "Compliance", v: "100% RoHS, REACH, Nitrite-Free, Non-Hazardous" }
    ]
  },
  multilayer: {
    title: "Multilayer Technical Laminates",
    badge: "Technical Laminates",
    desc: "Custom engineered paper-film-foil composite laminates combining virgin kraft, specialized polymers, woven HDPE fabric, and barrier foils for heavy industrial packaging.",
    specs: [
      { k: "Max Extrusion Width", v: "Up to 4000 mm continuous width" },
      { k: "Structure Options", v: "2-ply, 3-ply, 4-ply, 5-ply custom configurations" },
      { k: "Key Industries", v: "Pharmaceuticals, Food Bulk, Agro Chemicals, Heavy Sack Liners" }
    ]
  },
  compostable: {
    title: "Compostable & Bio-Safe Packaging",
    badge: "100% Sustainable",
    desc: "Biodegradable barrier packaging utilizing certified plant biopolymers and PLA coatings. Delivers high moisture and grease resistance while breaking down in compost within 90-180 days.",
    specs: [
      { k: "Base Materials", v: "FSC Virgin Kraft + Certified Biopolymer / PLA" },
      { k: "Compostability", v: "EN 13432 & ASTM D6400 Certified" },
      { k: "Properties", v: "Heat-sealable, High OGR, 0% Petroleum Plastic" }
    ]
  },
  barrier: {
    title: "Aluminium Barrier Packaging",
    badge: "Ultra-High Barrier",
    desc: "Multi-ply aluminium foil laminates providing zero transmission against moisture, oxygen, UV rays, and corrosive salt air for export electronics and machinery.",
    specs: [
      { k: "WVTR", v: "< 0.005 g/m²/24hrs" },
      { k: "OTR", v: "< 0.005 cc/m²/24hrs" },
      { k: "Vacuum Capability", v: "Fully vacuum heat-sealable and puncture proof" }
    ]
  },
  oilgas: {
    title: "VCI Solutions for Oil & Gas",
    badge: "Harsh Environments",
    desc: "Industrial-scale rust inhibition chemistry engineered for deep-sea pipelines, refineries, long-term asset mothballing, flange protections, and hydrotest storage.",
    specs: [
      { k: "Application Methods", v: "Fogging, hydrotesting additives, surface spray, flange wrapping" },
      { k: "Corrosion Protection", v: "Protects both enclosed void spaces and external exposed metal" }
    ]
  },
  insulation: {
    title: "Insulation Facing Laminates",
    badge: "Thermal & Fire Safe",
    desc: "FSK (Foil-Scrim-Kraft) and PSA self-adhesive facings laminated to glass wool, rock wool, or elastomeric foam for HVAC duct wrapping and building insulation.",
    specs: [
      { k: "Fire Rating", v: "Class 0 / Class 1 Fire Retardant standards" },
      { k: "Reinforcement", v: "Tri-directional fiberglass scrim" }
    ]
  }
};

function initProductModals() {
  const modal = document.getElementById('productModal');
  const modalContent = document.getElementById('modalContent');
  const closeBtn = document.getElementById('modalClose');

  if (!modal || !modalContent) return;

  window.openProductDetail = function(catKey) {
    const item = productInfo[catKey] || productInfo.vci;
    
    let specsHtml = item.specs.map(s => `
      <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #eef3f0; font-size:0.88rem;">
        <strong style="color:#0f1720;">${s.k}:</strong>
        <span style="color:#647068; text-align:right;">${s.v}</span>
      </div>
    `).join('');

    modalContent.innerHTML = `
      <span class="card-badge" style="position:static; display:inline-block; margin-bottom:12px;">${item.badge}</span>
      <h2 style="font-size:1.7rem; margin-bottom:12px; color:#0f1720;">${item.title}</h2>
      <p style="color:#49544d; font-size:0.95rem; margin-bottom:20px; line-height:1.6;">${item.desc}</p>
      
      <div style="background:#f5fbf7; padding:18px; border-radius:14px; margin-bottom:24px; border:1px solid #dfe8e2;">
        <h4 style="margin-bottom:10px; font-size:0.92rem; color:#0b663d; text-transform:uppercase; letter-spacing:0.5px;">Technical Specifications</h4>
        ${specsHtml}
      </div>

      <div style="display:flex; gap:12px;">
        <a href="#contact" onclick="document.getElementById('productModal').classList.remove('active'); document.getElementById('fInterest').value='${item.title}';" class="btn btn-primary" style="flex:1;">
          Request Quotation / Sample &rarr;
        </a>
      </div>
    `;

    modal.classList.add('active');
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}
