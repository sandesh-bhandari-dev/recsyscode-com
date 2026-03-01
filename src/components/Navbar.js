'use client';

import { useState } from 'react';

export default function Navbar({ activeSection, onSectionChange, user, onSignInClick, onSignOut, darkMode, onToggleDark }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { key: 'archive', label: 'Archive' },
    { key: 'shelf', label: 'Shelf' },
    { key: 'resources', label: 'Resources' },
  ];

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <div className="navbar-brand" onClick={() => onSectionChange('home')} style={{ cursor: 'pointer' }}>
          <div className="brand-logo">R</div>
          <span className="brand-name">
            <span>Rec</span><span style={{ color: 'var(--accent)' }}>Sys</span><span>Code</span>
          </span>
        </div>

        <ul className={`nav-links${mobileOpen ? ' open' : ''}`}>
          {navItems.map((item) => (
            <li key={item.key}>
              <a
                className={activeSection === item.key ? 'active' : ''}
                onClick={() => { onSectionChange(item.key); setMobileOpen(false); }}
                style={{ cursor: 'pointer' }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button className="nav-dark-btn" onClick={onToggleDark} title={darkMode ? 'Light mode' : 'Dark mode'}>
            {darkMode ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          {user ? (
            <div className="user-menu">
              <span className="user-avatar">{user.name?.charAt(0)?.toUpperCase() || 'U'}</span>
              <span className="user-name">{user.name}</span>
              <button className="nav-sign-out-btn" onClick={onSignOut}>Sign Out</button>
            </div>
          ) : (
            <button className="nav-sign-in-btn" onClick={onSignInClick}>Sign In</button>
          )}

          <button className="nav-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              {mobileOpen ? (
                <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
              ) : (
                <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
              )}
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
