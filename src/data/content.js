// Safepack Structured Data Repository

export const productsData = [
  {
    id: "vci",
    title: "VCI Packaging Solutions",
    badge: "Corrosion Protection",
    img: "/images/vci-steel-wrap.jpg",
    shortDesc: "Advanced corrosion prevention systems (VCI paper, metal wrap, films, emitters & oils) for ferrous and non-ferrous metals during overseas transit.",
    fullDesc: "Safepack's non-toxic Volatile Corrosion Inhibitor (VCI) products provide comprehensive molecular rust protection for ferrous and non-ferrous metals. The active chemical vapors continuously passivate metal surface charges, preventing electrolytic oxidation in humid marine transit.",
    specs: [
      { k: "Product Formats", v: "VCI Kraft Paper, Poly-coated, Fabric-reinforced Metal Wrap, 3-ply Scrim" },
      { k: "Protection Duration", v: "Up to 24 to 36 Months in sealed conditions" },
      { k: "Metals Covered", v: "Carbon Steel, Copper, Brass, Bronze, Aluminium, Galvanized Iron" },
      { k: "Compliance", v: "100% RoHS, REACH, Nitrite-Free, Non-Hazardous" }
    ]
  },
  {
    id: "multilayer",
    title: "Multilayer Packaging",
    badge: "Technical Laminates",
    img: "/images/laminate-solutions.jpg",
    shortDesc: "Custom engineered paper-film-foil laminate structures, PE poly-coated papers, and sterile medical barrier wrappers for critical applications.",
    fullDesc: "Custom engineered paper-film-foil composite laminates combining virgin kraft, specialized polymers, woven HDPE fabric, and barrier foils for heavy industrial, pharmaceutical, and food bulk packaging.",
    specs: [
      { k: "Max Extrusion Width", v: "Up to 4000 mm continuous width" },
      { k: "Structure Options", v: "2-ply, 3-ply, 4-ply, 5-ply custom configurations" },
      { k: "Key Industries", v: "Pharmaceuticals, Food Bulk, Agro Chemicals, Heavy Sack Liners" }
    ]
  },
  {
    id: "compostable",
    title: "Compostable Packaging",
    badge: "Sustainable",
    isEco: true,
    img: "/images/sustainable-packaging.jpg",
    shortDesc: "Biopolymer and PLA eco-conscious barrier solutions designed to replace single-use plastics without sacrificing puncture and moisture resistance.",
    fullDesc: "Biodegradable barrier packaging utilizing certified plant biopolymers and PLA coatings. Delivers high moisture and grease resistance while breaking down completely in compost within 90-180 days with zero microplastics.",
    specs: [
      { k: "Base Materials", v: "FSC Virgin Kraft + Certified Biopolymer / PLA" },
      { k: "Compostability", v: "EN 13432 & ASTM D6400 Certified" },
      { k: "Properties", v: "Heat-sealable, High OGR, 0% Petroleum Plastic" }
    ]
  },
  {
    id: "barrier",
    title: "Aluminium Barrier Packaging",
    badge: "Barrier Protection",
    img: "/images/aluminium-barrier.png",
    shortDesc: "High-barrier 3-ply and 5-ply aluminium foil laminates providing zero transmission against moisture, oxygen, UV rays, and harsh maritime air.",
    fullDesc: "Multi-ply aluminium foil laminates providing near-zero Water Vapor Transmission Rate (WVTR) and Oxygen Transmission Rate (OTR) for defense equipment, export electronics, and sensitive industrial hardware.",
    specs: [
      { k: "WVTR", v: "< 0.005 g/m²/24hrs" },
      { k: "OTR", v: "< 0.005 cc/m²/24hrs" },
      { k: "Vacuum Capability", v: "Fully vacuum heat-sealable and puncture proof" }
    ]
  },
  {
    id: "oilgas",
    title: "VCI Solutions for Oil & Gas",
    badge: "Harsh Environments",
    img: "/images/oil-gas-preservation.jpg",
    shortDesc: "Heavy-duty corrosion inhibition powders, hydrotest additives, and flange wraps for offshore platforms, refineries, and long-term asset mothballing.",
    fullDesc: "Industrial-scale chemical rust inhibition systems engineered for deep-sea pipelines, refineries, internal cavities, valves, and long-term offshore rigs against high salinity and extreme temperatures.",
    specs: [
      { k: "Application Methods", v: "Fogging, hydrotesting additives, surface spray, flange wrapping" },
      { k: "Corrosion Protection", v: "Protects both enclosed void spaces and external exposed metal" }
    ]
  },
  {
    id: "insulation",
    title: "Insulation Facing Laminates",
    badge: "Thermal Systems",
    img: "/images/insulation-laminates.jpg",
    shortDesc: "FSK (Foil-Scrim-Kraft) and PSA self-adhesive facings engineered for HVAC duct insulation, radiant heat reflection, and fire safety building standards.",
    fullDesc: "High-performance Foil-Scrim-Kraft (FSK) and PSA facings laminated to glass wool, rock wool, or elastomeric foam for HVAC duct wrapping, metal building insulation, and pipe lagging.",
    specs: [
      { k: "Fire Rating", v: "Class 0 / Class 1 Fire Retardant standards" },
      { k: "Reinforcement", v: "Tri-directional fiberglass scrim" }
    ]
  }
];

export const clientLogos = [
  { name: "Tata Steel", src: "/images/client-tatasteel.jpg" },
  { name: "Saint Gobain", src: "/images/client-saint-gobain.jpg" },
  { name: "Larsen & Toubro", src: "/images/client-lt.jpg" },
  { name: "SKF Bearings", src: "/images/client-skf.jpg" },
  { name: "Honda", src: "/images/client-honda.jpg" },
  { name: "Piramal Group", src: "/images/client-piramal.jpg" },
  { name: "Mankind Pharma", src: "/images/client-mankind.jpg" }
];

export const industriesData = [
  { icon: "fa-industry", title: "Metal Mills & Steel", desc: "Heavy coil wrapping & export transit" },
  { icon: "fa-car", title: "Automotive", desc: "Engines, transmissions & CKD kits" },
  { icon: "fa-microchip", title: "Electronics", desc: "PCB boards & anti-tarnish copper" },
  { icon: "fa-shield-halved", title: "Defence & Aerospace", desc: "MIL-PRF long-term hardware preservation" },
  { icon: "fa-pills", title: "Medical & Pharma", desc: "Sterile foil wraps & desiccants" },
  { icon: "fa-oil-well", title: "Oil, Gas & Marine", desc: "Offshore preservation & mothballing" }
];

export const statsData = [
  { value: "100+ Years", label: "Combined packaging expertise & trust" },
  { value: "500+ Products", label: "Custom formulations & barrier laminates" },
  { value: "Up to 4000mm", label: "One of world's widest extrusion lines" },
  { value: "40+ Countries", label: "Supplying leaders PAN India & globally" }
];

export const certificationsData = [
  { standard: "ISO 9001:2015", label: "Quality Mgmt." },
  { standard: "ISO 14001:2015", label: "Environment" },
  { standard: "ISO 45001", label: "Occupational Safety" },
  { standard: "RoHS Compliant", label: "Zero Heavy Metals" },
  { standard: "REACH Validated", label: "SVHC Free" }
];
