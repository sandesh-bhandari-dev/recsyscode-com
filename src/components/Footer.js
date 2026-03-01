'use client';

export default function Footer({ onNavigate }) {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-brand">
          <div className="brand-logo-sm">R</div>
          <span>RecSysCode</span>
        </div>

        <ul className="footer-links">
          <li><a onClick={() => onNavigate('archive')} style={{ cursor: 'pointer' }}>Archive</a></li>
          <li><a onClick={() => onNavigate('shelf')} style={{ cursor: 'pointer' }}>Shelf</a></li>
          <li><a onClick={() => onNavigate('videos')} style={{ cursor: 'pointer' }}>Lectures</a></li>
          <li><a onClick={() => onNavigate('papers')} style={{ cursor: 'pointer' }}>Papers</a></li>
          <li><a onClick={() => onNavigate('submit')} style={{ cursor: 'pointer' }}>Submit</a></li>
        </ul>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--font-light)', fontSize: '0.78rem', color: 'var(--ink-faint)' }}>
            Built by Sandesh Bhandari
          </div>
        </div>
      </div>
      <div className="container footer-copy">
        {year} RecSysCode -- Open archive for recommender systems researchers and engineers
      </div>
    </footer>
  );
}
