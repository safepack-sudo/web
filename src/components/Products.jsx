import React from 'react';
import { productsData } from '../data/content';

export default function Products({ onSelectProduct }) {
  return (
    <section className="products" id="solutions">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">Our Core Solutions</div>
            <h2>Packaging solutions for demanding industries.</h2>
          </div>
          <p>
            A cleaner information architecture groups Safepack’s core capabilities into easy-to-scan product families with strong visual differentiation, verified specifications, and faster technical access.
          </p>
        </div>

        <div className="product-grid">
          {productsData.map((item) => (
            <article className="product-card" key={item.id}>
              <div className={`card-badge ${item.isEco ? 'eco-badge' : ''}`}>{item.badge}</div>
              <div className="product-art">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  onError={(e) => { e.target.src = 'https://safepack.com/wp-content/uploads/2021/07/vci-49-hi-min.jpg'; }} 
                />
              </div>
              <div className="product-body">
                <h3>{item.title}</h3>
                <p>{item.shortDesc}</p>
                <button className="card-link btn-plain" onClick={() => onSelectProduct(item)}>
                  Explore category &rarr;
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
