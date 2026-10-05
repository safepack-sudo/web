import React, { useState, useEffect, useRef } from 'react';

const knowledgeBase = [
  {
    keywords: ['width', 'size', 'max width', 'dimension', '4000', '4000mm', 'wide', 'extrusion'],
    answer: "Safepack operates India's widest continuous extrusion coating & lamination plant capable of manufacturing protective barrier rolls and technical laminates up to 4000mm (4 meters) in seamless width without seams."
  },
  {
    keywords: ['steel', 'coil', 'metal', 'rust', 'vci', 'scrim', 'ferrous'],
    answer: "For steel coils and heavy metal exports, we recommend Safepack 5-Ply VCI Woven Scrim Wrap (HDPE woven scrim + PE extrusion + Kraft + active Green VCI). It provides puncture-proof physical durability and active molecular passivation for up to 36 months of transit and yard storage."
  },
  {
    keywords: ['moisture', 'foil', 'aluminium', 'barrier', 'wvtr', 'water', 'humidity'],
    answer: "Our Aluminium Barrier Foils achieve ultra-low Water Vapor Transmission Rates (WVTR < 0.005 g/m²/day), conforming to MIL-PRF-131 and DIN 55473. Ideal for ocean sea crates, heavy machinery, defense electronics, and electrical switchgear."
  },
  {
    keywords: ['bio', 'sustainable', 'eco', 'compostable', 'green', 'pla', 'plastic free'],
    answer: "Safepack Bio-Safe range includes 100% biodegradable and compostable PLA-coated kraft papers and plant-derived VCI films certified under EN 13432 and ASTM D6400. They degrade harmlessly into organic biomass without microplastic residue."
  },
  {
    keywords: ['cert', 'certification', 'iso', 'rohs', 'reach', 'standard', 'mil'],
    answer: "Safepack facilities are ISO 9001, ISO 14001, and ISO 45001 certified. Our corrosion prevention and barrier products comply with global RoHS, REACH, and US Military Specification MIL-PRF-131 / MIL-B-22019."
  },
  {
    keywords: ['quote', 'rfq', 'price', 'cost', 'sample', 'contact', 'buy'],
    answer: "You can request an instant customized RFQ or technical samples. Click 'Pre-fill RFQ Form' below, or reach our technical sales hotline directly at +91 9766394445 / solutions@safepack.com."
  }
];

export default function AskSiplChat({ onPreFillRfq }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hello! Welcome to Safepack Industries (SIPL). I am your AI Technical Packaging Specialist. How can I assist with your anti-corrosion VCI, barrier laminates, or custom specifications today?',
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
    }
  }, [messages, isOpen]);

  const generateAnswer = (userQuery) => {
    const q = userQuery.toLowerCase();
    for (const item of knowledgeBase) {
      if (item.keywords.some(k => q.includes(k))) {
        return item.answer;
      }
    }
    return `Thank you for your inquiry regarding "${userQuery}". Our engineering team in Pune, India customizes formulations for 40+ countries. We can provide technical data sheets (TDS) and custom quotes immediately. Would you like to connect with a senior technical consultant or submit an RFQ?`;
  };

  const handleSend = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateAnswer(query);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  const handleQuickPrompt = (prompt) => {
    handleSend(prompt);
  };

  const handleTransferToRfq = () => {
    if (typeof onPreFillRfq === 'function') {
      onPreFillRfq('Inquiry via Ask SIPL AI Assistant');
    } else {
      sessionStorage.setItem('prefill_rfq', 'Inquiry via Ask SIPL AI Assistant');
    }
    setIsOpen(false);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', '/');
    } else {
      window.location.href = '/?section=contact';
    }
  };

  return (
    <>
      {/* Floating Trigger Button on Bottom-Right */}
      <div className="ask-sipl-launcher">
        {!isOpen && unreadCount > 0 && (
          <span className="ask-sipl-unread">{unreadCount}</span>
        )}
        <button 
          className={`ask-sipl-btn ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open Ask SIPL Live Chat"
        >
          {isOpen ? (
            <i className="fa-solid fa-xmark"></i>
          ) : (
            <>
              <span className="ask-sipl-icon-wrap">
                <i className="fa-solid fa-headset"></i>
                <span className="ask-sipl-live-dot"></span>
              </span>
              <span className="ask-sipl-label">Ask SIPL</span>
            </>
          )}
        </button>
      </div>

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="ask-sipl-window" role="dialog" aria-label="Ask SIPL Live AI Assistant">
          
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">
                <img src="/images/logo.png" alt="SIPL" onError={(e) => { e.target.src = 'https://safepack.com/wp-content/uploads/2021/07/logo-1-1.png'; }} />
                <span className="avatar-online"></span>
              </div>
              <div className="chat-header-text">
                <strong>Ask SIPL Assistant</strong>
                <span><i className="fa-solid fa-circle text-success"></i> Online &middot; Technical Packaging AI</span>
              </div>
            </div>
            <button className="chat-close-btn" onClick={() => setIsOpen(false)} aria-label="Close Chat">
              <i className="fa-solid fa-minus"></i>
            </button>
          </div>

          {/* Messages Body */}
          <div className="chat-body">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message ${msg.sender === 'user' ? 'msg-user' : 'msg-bot'}`}>
                {msg.sender === 'bot' && (
                  <div className="msg-bot-badge">
                    <i className="fa-solid fa-shield-halved"></i>
                  </div>
                )}
                <div className="msg-bubble">
                  <p>{msg.text}</p>
                  <span className="msg-time">{msg.time}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chat-message msg-bot">
                <div className="msg-bot-badge"><i className="fa-solid fa-shield-halved"></i></div>
                <div className="msg-bubble msg-typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="chat-chips-scroll">
            <button className="chat-chip" onClick={() => handleQuickPrompt('What is Safepack maximum manufacturing width?')}>
              📏 4000mm Max Width
            </button>
            <button className="chat-chip" onClick={() => handleQuickPrompt('Recommend packaging for export steel coils')}>
              🔩 VCI Steel Coils
            </button>
            <button className="chat-chip" onClick={() => handleQuickPrompt('What are your Bio-Safe compostable options?')}>
              🌿 Bio-Safe Compostable
            </button>
            <button className="chat-chip" onClick={() => handleQuickPrompt('Tell me about Aluminium Barrier Foils WVTR')}>
              🛡️ Low WVTR Barrier Foil
            </button>
            <button className="chat-chip" onClick={() => handleQuickPrompt('What ISO and military certifications do you hold?')}>
              📜 Certifications &amp; Standards
            </button>
          </div>

          {/* Chat Quick Action Banner */}
          <div className="chat-action-bar">
            <button className="chat-rfq-btn" onClick={handleTransferToRfq}>
              <i className="fa-solid fa-file-invoice"></i> Pre-fill RFQ Form
            </button>
            <a href="tel:+919766394445" className="chat-call-btn">
              <i className="fa-solid fa-phone"></i> Call Hotline
            </a>
          </div>

          {/* Input Footer */}
          <form className="chat-input-row" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
            <input 
              type="text" 
              placeholder="Ask about products, GSM, specs, quotes..." 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="chat-input"
            />
            <button type="submit" className="chat-send-btn" disabled={!inputText.trim()} aria-label="Send Message">
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </form>

        </div>
      )}
    </>
  );
}
