// Concept C: Eco-Sustainable & Circular Bio-Packaging Interactive Controller

document.addEventListener('DOMContentLoaded', () => {
  initEsgDashboard();
  initSampleModal();
  initWhitepaperForm();
});

// 1. Interactive ESG Sustainability Dashboard
function initEsgDashboard() {
  const slider = document.getElementById('tonnageSlider');
  const display = document.getElementById('tonnageDisplay');
  const plasticVal = document.getElementById('plasticValue');
  const co2Val = document.getElementById('co2Value');
  const treesVal = document.getElementById('treesValue');
  const esgScore = document.getElementById('esgScore');
  const presetBtns = document.querySelectorAll('.preset-btn');

  if (!slider) return;

  function updateMetrics(tonnes) {
    display.textContent = `${tonnes} Metric Tonnes`;
    
    // Impact multipliers:
    // 1 Metric Tonne Bio-Safe replaces 1 Tonne virgin PE plastic
    // Slashing 2.3 Tonnes of CO2 emissions
    // 104.5 tree seedlings grown equivalent over 10 years
    const plastic = tonnes.toFixed(1);
    const co2 = (tonnes * 2.3).toFixed(1);
    const trees = Math.round(tonnes * 104.5).toLocaleString();
    
    // Score scaling:
    let score = Math.min(99, Math.round(82 + (tonnes / 1000) * 16));

    plasticVal.textContent = plastic;
    co2Val.textContent = co2;
    treesVal.textContent = trees;
    esgScore.textContent = `${score} / 100`;
  }

  slider.addEventListener('input', () => {
    presetBtns.forEach(btn => btn.classList.remove('active'));
    updateMetrics(parseFloat(slider.value));
  });

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      presetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const ton = parseFloat(btn.dataset.ton);
      slider.value = ton;
      updateMetrics(ton);
    });
  });

  updateMetrics(parseFloat(slider.value));
}

// 2. Bio Sample Modal Dialog
function initSampleModal() {
  const modal = document.getElementById('bioSampleModal');
  const closeBtn = document.getElementById('bioModalClose');
  const titleEl = document.getElementById('modalSampleTitle');
  const form = document.getElementById('modalSampleForm');

  if (!modal) return;

  window.openBioSampleModal = function(productName) {
    if (titleEl) {
      titleEl.textContent = `Order Free Sample Roll: ${productName}`;
    }
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

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert("Testing sample roll dispatch request confirmed! Tracking reference will be emailed within 24 hours.");
      modal.classList.remove('active');
      form.reset();
    });
  }
}

// 3. Whitepaper Form
function initWhitepaperForm() {
  const form = document.getElementById('bioContactForm');
  const feedback = document.getElementById('bioFormFeedback');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generating ESG Dossier...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
      form.reset();
      if (feedback) {
        feedback.style.display = 'block';
        setTimeout(() => feedback.style.display = 'none', 9000);
      }
    }, 1200);
  });
}
