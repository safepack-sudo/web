# Safepack Industries Ltd. — Official Web Portal (SIPL)

Develop New Website of SIPL — Modern, responsive, and high-performance **React 19 + Vite** web application for **Safepack Industries Ltd.**, a global leader in research-driven Green VCI corrosion prevention, technical barrier laminates, and 100% compostable bio-safe packaging.

---

## ⚡ React Architecture & Component Structure

```
d:/SIPL/
├── public/
│   └── images/                # High-resolution official product photography & client logos
├── src/
│   ├── components/
│   │   ├── Topline.jsx        # Topline announcement with global export indicators
│   │   ├── Navbar.jsx         # Sticky frosted glass navigation with 6 mega menus & search
│   │   ├── Hero.jsx           # Industrial hero section with floating trust badges
│   │   ├── Stats.jsx          # Century-deep authority metrics & extrusion widths
│   │   ├── Products.jsx       # 6 Core product families with interactive modal triggers
│   │   ├── PackagingWizard.jsx# Interactive Metal + Transit -> Recommended VCI Recommender
│   │   ├── Sustainability.jsx # Interactive Scope 3 Carbon & Plastic Diverted Slider
│   │   ├── Industries.jsx     # Sector-specific solutions grid
│   │   ├── GlobalPresence.jsx # Global video map & export reach
│   │   ├── Clients.jsx        # Fortune 500 trust showcase (Tata Steel, Saint Gobain, L&T, SKF, Honda...)
│   │   ├── Certifications.jsx # ISO 9001, ISO 14001, ISO 45001, RoHS, REACH compliance strip
│   │   ├── ContactRfq.jsx     # High-intent quotation configurator with prefill capability
│   │   ├── ProductModal.jsx   # Quick-view technical specification modal dialog
│   │   ├── Toast.jsx          # Animated submission feedback alert
│   │   └── Footer.jsx         # 4-column rich footer with persistent visitor counter
│   ├── pages/
│   │   └── SubpageDetail.jsx  # Dedicated standalone product pages (/products/:slug)
│   ├── data/
│   │   ├── navigationData.js  # 6 Mega menus with 90+ verified products and thumbnails
│   │   └── subpageData.js     # Technical parameters, test standards, and galleries
│   ├── utils/
│   │   └── slugify.js         # SEO slug generator without hashes
│   ├── App.jsx                # React Router routing & scroll handling
│   ├── index.css              # Master responsive styling system
│   └── main.jsx               # React 19 entry point with BrowserRouter
├── vercel.json                # Vercel SPA rewrite configuration
├── package.json               # Dependencies & build scripts
└── vite.config.js             # Vite configuration
```

---

## 🚀 Running the React App

### Development Server:
```bash
npm run dev
```
Access at: **[http://localhost:3001/](http://localhost:3001/)**

### Production Build:
```bash
npm run build
npm run preview
```
