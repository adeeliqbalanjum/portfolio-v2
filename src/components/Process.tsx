'use client';

import { useState } from 'react';

const steps = [
  ['01', 'Discover', 'Goals, references, pages, and direction.'],
  ['02', 'Structure', 'Layout, section flow, and responsive planning.'],
  ['03', 'Build', 'Development, styling, and functional setup.'],
  ['04', 'Polish', 'Spacing, motion, mobile checks, and refinement.'],
  ['05', 'Launch', 'Final review, deployment, and handover.']
];

export default function Process() {
  const [active, setActive] = useState(0);
  return (
    <section className="process" id="process">
      <div className="process-inner">
        <div className="process-header"><span className="tag tag-orange">Process</span><h2 className="display-lg">Simple process. Premium output.</h2></div>
        <div className="process-accordion">
          {steps.map(([num, title, desc], index) => (
            <article key={title} className={`process-item${active === index ? ' active' : ''}`}>
              <button className="process-item-header" onClick={() => setActive(index)}><span className="process-num">{num}</span><span className="process-item-title">{title}</span><span className="process-item-indicator"><span className="process-plus" /></span></button>
              <div className="process-item-body"><div className="process-body-inner"><p className="process-desc">{desc}</p></div></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
