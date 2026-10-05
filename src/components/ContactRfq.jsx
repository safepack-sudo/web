import React, { useState, useEffect } from 'react';
import { submitInquiry } from '../services/inquiryService';

export default function ContactRfq({ preFilledProduct, onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preFilledProduct) {
      setFormData(prev => ({ ...prev, interest: preFilledProduct }));
      setSubmitted(false);
    }
  }, [preFilledProduct]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await submitInquiry(formData);
      setLoading(false);
      setSubmitted(true);
      onShowToast(res.message);
      
      // Reset after successful dispatch
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        interest: '',
        message: ''
      });
    } catch (err) {
      setLoading(false);
      onShowToast("Submission encountered an issue. Please reach us at solutions@safepack.com");
    }
  };

  return (
    <section className="cta" id="contact">
      <div className="container cta-box">
        <div>
          <div className="eyebrow">
            <i className="fa-solid fa-headset"></i> Request Information
          </div>
          <h2>Request a Quote or Technical Details</h2>
          <p>
            Connect directly with Safepack's packaging technologists and application engineers to evaluate your corrosion prevention, extrusion coating, and barrier laminate requirements.
          </p>

          <div className="contact-direct-info">
            <p>
              <i className="fa-solid fa-envelope"></i> 
              <strong>Official Email:</strong> 
              <a href="mailto:solutions@safepack.com">solutions@safepack.com</a>
            </p>
            <p>
              <i className="fa-solid fa-phone"></i> 
              <strong>Domestic Hotline:</strong> 
              <a href="tel:+919766394445">+91 9766394445</a>
            </p>
            <p>
              <i className="fa-solid fa-globe"></i> 
              <strong>International Sales:</strong> 
              <a href="tel:+919822067467">+91 9822067467</a>
            </p>
            <p>
              <i className="fa-brands fa-skype"></i> 
              <strong>Skype Desk:</strong> safepack_info
            </p>
          </div>

          <div className="contact-trust-badges">
            <span className="trust-badge-item">
              <i className="fa-solid fa-clock-rotate-left"></i> 24-Hour Technical Response
            </span>
            <span className="trust-badge-item">
              <i className="fa-solid fa-shield-halved"></i> Direct Manufacturer Guarantee
            </span>
          </div>
        </div>

        <form className="form-card" onSubmit={handleSubmit}>
          {submitted && (
            <div className="form-success-banner">
              <i className="fa-solid fa-circle-check"></i>
              <span>Your request was received. Our team will contact you shortly!</span>
            </div>
          )}

          <div className="field">
            <label>YOUR NAME *</label>
            <input 
              required 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="e.g. Rajesh Sharma" 
            />
          </div>

          <div className="field">
            <label>COMPANY NAME *</label>
            <input 
              required 
              name="company" 
              value={formData.company} 
              onChange={handleChange} 
              placeholder="e.g. Tata Motors / ArcelorMittal" 
            />
          </div>

          <div className="field">
            <label>WORK EMAIL *</label>
            <input 
              type="email" 
              required 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="name@company.com" 
            />
          </div>

          <div className="field">
            <label>PHONE / WHATSAPP NUMBER</label>
            <input 
              type="tel" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              placeholder="+91 98765 43210" 
            />
          </div>

          <div className="field full">
            <label>PRODUCT OR SOLUTION INTEREST</label>
            <input 
              name="interest" 
              value={formData.interest} 
              onChange={handleChange} 
              placeholder="VCI Steel Wrap / FSK Laminates / Bio-Safe PLA..." 
            />
          </div>

          <div className="field full">
            <label>APPLICATION / TARGET REQUIREMENTS</label>
            <textarea 
              rows="4" 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              placeholder="Specify metal type, roll dimensions (up to 4000mm), ocean transit duration, or target GSM specifications..."
            />
          </div>

          <div className="field full">
            <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
              {loading ? (
                <span><i className="fa-solid fa-spinner fa-spin"></i> Submitting Request...</span>
              ) : (
                <span>Submit Inquiry &amp; Request TDS &rarr;</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
