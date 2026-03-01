'use client';

import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks';

export default function Shell({ activeSection, activeFolder, children }) {
  const router = useRouter();
  const [showAuth, setShowAuth] = useState(false);
  const { user, signIn, signOut } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('rsc_dark');
    if (saved === 'true') {
      setDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleDark = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : '');
    localStorage.setItem('rsc_dark', String(next));
  };

  const handleSectionChange = (section) => {
    const routes = {
      home: '/',
      archive: '/archive',
      shelf: '/shelf',
      resources: '/resources',
    };
    router.push(routes[section] || '/');
  };

  return (
    <>
      <div className="top-banner">
        RecSysCode — Open-source recommender systems learning archive
      </div>
      <Navbar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        user={user}
        onSignInClick={() => setShowAuth(true)}
        onSignOut={signOut}
        darkMode={darkMode}
        onToggleDark={toggleDark}
      />
      <main>
        <div className="section-wrap">
          <div className="container">
            {children}
          </div>
        </div>
      </main>
      <Footer />
      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onSignIn={(data) => { signIn(data); setShowAuth(false); }}
        />
      )}
    </>
  );
}
