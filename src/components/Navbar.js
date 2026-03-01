'use client';

export default function Navbar({ activeSection, onSectionChange, user, onSignInClick, onSignOut }) {
  const navItems = [
    { key: 'archive', label: 'Archive' },
    { key: 'shelf', label: 'Shelf' },
    { key: 'videos', label: 'Lectures' },
    { key: 'papers', label: 'Papers' },
  ];

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <div className="navbar-brand" onClick={() => onSectionChange('archive')} style={{ cursor: 'pointer' }}>
          <div className="brand-logo" id="brandLogo">R</div>
          <span className="brand-name">
            <span>Rec</span><span style={{ color: 'var(--accent-red)' }}>Sys</span><span>Code</span>
          </span>
        </div>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.key}>
              <a
                className={activeSection === item.key ? 'active' : ''}
                onClick={() => onSectionChange(item.key)}
                style={{ cursor: 'pointer' }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          {user ? (
            <div className="user-menu">
              <span className="user-avatar">{user.name?.charAt(0)?.toUpperCase() || 'U'}</span>
              <span className="user-name">{user.name}</span>
              <button className="nav-sign-out-btn" onClick={onSignOut}>Sign Out</button>
            </div>
          ) : (
            <button className="nav-sign-in-btn" onClick={onSignInClick}>Sign In</button>
          )}
          <button className="nav-submit-btn" onClick={() => onSectionChange('submit')}>
            + Submit
          </button>
        </div>
      </div>
    </nav>
  );
}
