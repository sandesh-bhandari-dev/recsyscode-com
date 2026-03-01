'use client';

import { useState } from 'react';

export default function AuthModal({ onClose, onSignIn }) {
  const [mode, setMode] = useState('signin'); // 'signin' or 'signup'
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

    // For now, use localStorage-based auth (no backend)
    // In production, replace with Supabase Auth or similar
    const userData = {
      id: 'user_' + Date.now(),
      name: mode === 'signup' ? name.trim() : email.split('@')[0],
      email: email.trim(),
      createdAt: new Date().toISOString(),
    };

    if (mode === 'signup') {
      // Store user data
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
      // Verify credentials
      try {
        const users = JSON.parse(localStorage.getItem('rsc_users') || '{}');
        const existing = users[email.trim()];
        if (!existing) {
          // Auto-create for demo purposes
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

  return (
    <div className="auth-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="auth-modal">
        <button className="auth-close" onClick={onClose}>x</button>

        <div className="auth-header">
          <div className="brand-logo" style={{ margin: '0 auto 12px', width: 48, height: 48, fontSize: '1.5rem' }}>R</div>
          <h2>{mode === 'signin' ? 'Sign In' : 'Create Account'}</h2>
          <p>Track your mastery progress across all courses</p>
        </div>

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
            <p>No account yet? <a onClick={() => { setMode('signup'); setError(''); }} style={{ cursor: 'pointer' }}>Create one</a></p>
          ) : (
            <p>Already have an account? <a onClick={() => { setMode('signin'); setError(''); }} style={{ cursor: 'pointer' }}>Sign in</a></p>
          )}
        </div>
      </div>
    </div>
  );
}
