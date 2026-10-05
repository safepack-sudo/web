import React from 'react';
import { statsData } from '../data/content';

export default function Stats() {
  return (
    <div className="container stats-wrap">
      <div className="stats">
        {statsData.map((stat, idx) => (
          <div className="stat" key={idx}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
