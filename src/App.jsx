import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Topline from './components/Topline';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DiscoverSafepack from './components/DiscoverSafepack';
import Stats from './components/Stats';
import Products from './components/Products';
import PackagingWizard from './components/PackagingWizard';
import Sustainability from './components/Sustainability';
import Industries from './components/Industries';
import GlobalPresence from './components/GlobalPresence';
import Clients from './components/Clients';
import Certifications from './components/Certifications';
import ContactRfq from './components/ContactRfq';
import ProductModal from './components/ProductModal';
import SubpageDrawer from './components/SubpageDrawer';
import AskSiplChat from './components/AskSiplChat';
import WhatsappButton from './components/WhatsappButton';
import Toast from './components/Toast';
import Footer from './components/Footer';
import SubpageDetail from './pages/SubpageDetail';

function HomePage({ initialSection }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSubpage, setSelectedSubpage] = useState(null);
  const [subpageCategory, setSubpageCategory] = useState('');
  const [preFilledProduct, setPreFilledProduct] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  const showToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3500);
  };

  const handlePreFillRfq = (productName) => {
    setPreFilledProduct(productName);
  };

  const handleSelectSubpage = (item, catTitle) => {
    setSelectedSubpage(item);
    setSubpageCategory(catTitle);
  };

  // Check for stored RFQ prefill from SubpageDetail
  useEffect(() => {
    const storedRfq = sessionStorage.getItem('prefill_rfq');
    if (storedRfq) {
      setPreFilledProduct(storedRfq);
      sessionStorage.removeItem('prefill_rfq');
    }
  }, []);

  // Handle section query parameters (e.g. /?section=contact or /contact) and keep URL clean without hash
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const targetSection = params.get('section') || initialSection;
    if (targetSection) {
      setTimeout(() => {
        const el = document.getElementById(targetSection);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          window.history.replaceState(null, '', '/');
        }
      }, 100);
    }
  }, [location.search, initialSection]);

  // Active section tracking on scroll
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120;
        const sectionId = current.getAttribute('id');
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-root">
      <Topline />
      <Navbar activeSection={activeSection} />
      
      <main>
        <Hero />
        <DiscoverSafepack />
        <Stats />
        <Products onSelectProduct={(prod) => setSelectedProduct(prod)} />
        <PackagingWizard onPreFillRfq={handlePreFillRfq} />
        <Sustainability />
        <Industries />
        <GlobalPresence />
        <Clients />
        <Certifications />
        <ContactRfq preFilledProduct={preFilledProduct} onShowToast={showToast} />
      </main>

      <Footer />

      {/* Main Product Family Modal */}
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onPreFillRfq={handlePreFillRfq} 
      />

      {/* Deep Mega-Menu Subpage Detail Drawer */}
      <SubpageDrawer 
        item={selectedSubpage} 
        categoryTitle={subpageCategory} 
        onClose={() => setSelectedSubpage(null)} 
        onPreFillRfq={handlePreFillRfq} 
      />

      {/* Floating Left Side WhatsApp Support Button */}
      <WhatsappButton />

      {/* Floating Bottom-Right Ask SIPL Live AI Chatbot */}
      <AskSiplChat onPreFillRfq={handlePreFillRfq} />

      <Toast message={toastMessage} visible={toastVisible} />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products/:slug" element={<SubpageDetail />} />
      <Route path="/about" element={<HomePage initialSection="about" />} />
      <Route path="/sustainability" element={<HomePage initialSection="sustainability" />} />
      <Route path="/industries" element={<HomePage initialSection="industries" />} />
      <Route path="/applications" element={<HomePage initialSection="industries" />} />
      <Route path="/wizard" element={<HomePage initialSection="wizard" />} />
      <Route path="/contact" element={<HomePage initialSection="contact" />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}
