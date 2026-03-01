'use client';

import { useState } from 'react';

export default function AuthModal({ onClose, onSignIn }) {
  const [mode, setMode] = useState('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    if (mode === 'signup' && !name.trim()) {
      setError('Please enter your name.');
      return;
    }

    const userData = {
      id: 'user_' + Date.now(),
      name: mode === 'signup' ? name.trim() : email.split('@')[0],
      email: email.trim(),
      createdAt: new Date().toISOString(),
    };

    if (mode === 'signup') {
      try {
        const users = JSON.parse(localStorage.getItem('rsc_users') || '{}');
        if (users[email.trim()]) {
          setError('An account with this email already exists.');
          return;
        }
        users[email.trim()] = { ...userData, password };
        localStorage.setItem('rsc_users', JSON.stringify(users));
      } catch { /* ignore */ }
    } else {
      try {
        const users = JSON.parse(localStorage.getItem('rsc_users') || '{}');
        const existing = users[email.trim()];
        if (!existing) {
          userData.name = email.split('@')[0];
        } else if (existing.password !== password) {
          setError('Invalid password.');
          return;
        } else {
          userData.name = existing.name;
          userData.id = existing.id;
        }
      } catch { /* ignore */ }
    }

    onSignIn(userData);
  };

  const handleGoogleSignIn = () => {
    // In production, this would use Supabase Auth with Google OAuth
    // For now, simulate with a demo user
    const userData = {
      id: 'google_' + Date.now(),
      name: 'Google User',
      email: 'user@gmail.com',
      createdAt: new Date().toISOString(),
    };
    onSignIn(userData);
  };

  return (
    <div className="auth-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="auth-modal">
        <button className="auth-close" onClick={onClose}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="auth-header">
          <div className="brand-logo" style={{ margin: '0 auto 12px', width: 40, height: 40 }}>R</div>
          <h2>{mode === 'signin' ? 'Sign In' : 'Create Account'}</h2>
          <p>Track your progress across all courses</p>
        </div>

        {/* Google Sign In */}
        <button className="auth-google-btn" onClick={handleGoogleSignIn}>
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <div className="auth-divider">or</div>

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'signup' && (
            <div className="auth-field">
              <label>Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </div>
          )}

          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              required
            />
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="auth-submit-btn">
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="auth-switch">
          {mode === 'signin' ? (
            <p>No account yet? <a onClick={() => { setMode('signup'); setError(''); }}>Create one</a></p>
          ) : (
            <p>Already have an account? <a onClick={() => { setMode('signin'); setError(''); }}>Sign in</a></p>
          )}
        </div>
      </div>
    </div>
  );
}
