'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import LocationBar from '@/components/LocationBar';
import Archive from '@/components/Archive';
import CourseView from '@/components/CourseView';
import Shelf from '@/components/Shelf';
import VideoSection from '@/components/VideoSection';
import Papers from '@/components/Papers';
import SubmitForm from '@/components/SubmitForm';
import AuthModal from '@/components/AuthModal';
import Footer from '@/components/Footer';
import { useAuth } from '@/lib/hooks';

const SECTIONS = ['archive', 'shelf', 'videos', 'papers', 'submit'];

function getInitialSection() {
  if (typeof window !== 'undefined') {
    const hash = window.location.hash.replace('#', '');
    if (SECTIONS.includes(hash)) return hash;
  }
  return 'archive';
}

export default function HomePage() {
  const [activeSection, setActiveSection] = useState(getInitialSection);
  const [activeFolder, setActiveFolder] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const { user, signIn, signOut } = useAuth();

  const openFolder = (folderId) => {
    setActiveFolder(folderId);
    setActiveSection('course');
    window.location.hash = 'course-' + folderId;
  };

  const backToArchive = () => {
    setActiveFolder(null);
    setActiveSection('archive');
    window.location.hash = 'archive';
  };

  const handleSectionChange = (section) => {
    if (section === 'archive') {
      setActiveFolder(null);
    }
    setActiveSection(section);
    window.location.hash = section;
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'archive': return <Archive onOpenFolder={openFolder} />;
      case 'course': return <CourseView folderId={activeFolder} onBack={backToArchive} />;
      case 'shelf': return <Shelf />;
      case 'videos': return <VideoSection />;
      case 'papers': return <Papers />;
      case 'submit': return <SubmitForm onCancel={() => handleSectionChange('archive')} />;
      default: return <Archive onOpenFolder={openFolder} />;
    }
  };

  return (
    <>
      <div className="topbar">RecSysCode -- Open-source recommender systems archive</div>

      <Navbar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        user={user}
        onSignInClick={() => setShowAuth(true)}
        onSignOut={signOut}
      />
      <LocationBar
        activeSection={activeSection}
        activeFolder={activeFolder}
        onSectionChange={handleSectionChange}
      />

      <main>
        <div className="section-wrap">
          <div className="container">
            {renderSection()}
          </div>
        </div>
      </main>

      <Footer onNavigate={handleSectionChange} />

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onSignIn={(data) => { signIn(data); setShowAuth(false); }}
        />
      )}
    </>
  );
}
