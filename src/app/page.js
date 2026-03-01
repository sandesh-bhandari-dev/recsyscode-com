'use client';

import { useRouter } from 'next/navigation';
import Shell from '@/components/Shell';

export default function HomePage() {
  const router = useRouter();

  return (
    <Shell activeSection="home" activeFolder={null}>
      <div style={{ marginTop: '-40px' }}>
        <div className="hero-section">
          <h1 className="hero-title">
            Learn <span className="accent">Recommender Systems</span> From Zero to Production
          </h1>
          <p className="hero-subtitle">
            Curated papers, structured courses, code repos, and video lectures. Everything you need to master RecSys.
          </p>
          <div className="hero-ctas">
            <button className="hero-cta-primary" onClick={() => router.push('/archive')}>
              Browse the Archive
            </button>
            <button className="hero-cta-secondary" onClick={() => router.push('/shelf')}>
              View Curated Picks
            </button>
          </div>
        </div>
      </div>
    </Shell>
  );
}
