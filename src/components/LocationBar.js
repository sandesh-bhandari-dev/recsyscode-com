'use client';

import { useState, useEffect } from 'react';

const sectionPaths = {
  archive: 'archive',
  course: 'archive/course',
  shelf: 'shelf',
  videos: 'lectures',
  papers: 'papers',
  submit: 'submit',
};

export default function LocationBar({ activeSection, activeFolder }) {
  const path = activeFolder
    ? `recsyscode.com/archive/${activeFolder}`
    : `recsyscode.com/${sectionPaths[activeSection] || activeSection}`;

  return (
    <div className="location-bar">
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span className="loc-badge">Location</span>
        <input className="loc-input" value={path} readOnly />
      </div>
    </div>
  );
}
