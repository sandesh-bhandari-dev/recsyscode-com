'use client';

import { useState, useEffect, useCallback } from 'react';
import { sbFetch } from '@/lib/supabase';

const TOPIC_LABELS = {
  collaborative: 'Collaborative Filtering',
  matrix: 'Matrix Factorization',
  deep: 'Deep Learning',
  evaluation: 'Evaluation',
  production: 'Production Systems',
};

const FILTER_TOPICS = [
  { key: 'all', label: 'All' },
  { key: 'collaborative', label: 'Collaborative Filtering' },
  { key: 'matrix', label: 'Matrix Factorization' },
  { key: 'deep', label: 'Deep Learning' },
  { key: 'evaluation', label: 'Evaluation' },
  { key: 'production', label: 'Production' },
];

export default function VideoSection() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTopic, setCurrentTopic] = useState('all');
  const [modalVideo, setModalVideo] = useState(null);

  // Fetch videos from Supabase
  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await sbFetch('videos?order=published_at.desc&select=id,title,topic,description,duration,published_at,is_new,is_own,author');
        if (!res.ok) throw new Error('fetch failed');
        const data = await res.json();
        setVideos(data);
      } catch (e) {
        console.warn('Video fetch failed:', e);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, []);

  const filtered = currentTopic === 'all' ? videos : videos.filter((v) => v.topic === currentTopic);
  const ownCount = videos.filter((v) => v.is_own).length;

  // Close modal on Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setModalVideo(null); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div>
      <div className="videos-header">
        <h2>Curated Lectures</h2>
        <p className="subtitle">
          The best RecSys talks from across the web &mdash; Stanford, Netflix, Pinterest and more. Curated by RecSysCode.
        </p>
        <div className="videos-stats-row">
          <div className="vs-item"><span className="vs-num">{videos.length}</span><span className="vs-label">talks</span></div>
          <div className="vs-item"><span className="vs-num">{ownCount}</span><span className="vs-label">by me</span></div>
        </div>
      </div>

      <div className="video-filters">
        {FILTER_TOPICS.map((t) => (
          <button
            key={t.key}
            className={`vf-btn${currentTopic === t.key ? ' active' : ''}`}
            onClick={() => setCurrentTopic(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <div className="loading-pill">
              <div className="loading-dot" />
              <div className="loading-dot" />
              <div className="loading-dot" />
              Loading lectures...
            </div>
          </div>
        ) : !videos.length ? (
          <div className="video-empty-state">
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ margin: '0 auto 12px', display: 'block' }}>
              <rect x="5" y="10" width="46" height="36" rx="3" stroke="#8a8580" strokeWidth="2" strokeDasharray="6 3" fill="none" />
              <polygon points="22,20 22,38 38,29" stroke="#8a8580" strokeWidth="2" fill="none" />
            </svg>
            <h3>No lectures yet</h3>
            <p>Videos will appear here once added to the Supabase database.</p>
          </div>
        ) : !filtered.length ? (
          <div className="video-empty-state">
            <h3>No lectures in this topic</h3>
            <p>Try a different filter above.</p>
          </div>
        ) : (
          <div className="video-grid">
            {filtered.map((v) => (
              <VideoCard key={v.id} video={v} onOpen={() => setModalVideo(v)} />
            ))}
          </div>
        )}
      </div>

      {/* Video Modal */}
      {modalVideo && (
        <div className="video-modal open" onClick={(e) => { if (e.target === e.currentTarget) setModalVideo(null); }}>
          <div className="video-modal-box">
            <div className="video-modal-hdr">
              <button className="video-modal-close" onClick={() => setModalVideo(null)}>x</button>
              <div className="video-modal-title">{modalVideo.title}</div>
            </div>
            <div className="video-embed-wrap">
              <iframe
                src={`https://www.youtube.com/embed/${modalVideo.id}?autoplay=1&rel=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="video-modal-info">
              <p className="video-modal-desc">{modalVideo.description || ''}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function VideoCard({ video: v, onOpen }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="video-card" onClick={onOpen}>
      <div className="video-thumb-wrap">
        {!imgLoaded && <div className="video-thumb-shimmer" />}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`}
          alt={v.title}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          onError={(e) => { e.target.src = `https://img.youtube.com/vi/${v.id}/0.jpg`; }}
        />
        <div className="video-play-overlay">
          <div className="play-circle">
            <svg width="16" height="16" viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21" /></svg>
          </div>
        </div>
        <div className="video-duration-badge">{v.duration || ''}</div>
        {v.is_new && <div className="video-new-badge">New</div>}
        {v.is_own && <div className="video-own-badge">By Me</div>}
      </div>
      <div className="video-card-body">
        <div className="video-card-topic">{TOPIC_LABELS[v.topic] || v.topic || ''}</div>
        <div className="video-card-title">{v.title}</div>
        <div className="video-card-author">
          <span className={`author-badge ${v.is_own ? 'own' : 'ext'}`}>
            {v.is_own ? 'By Me' : 'External'}
          </span>
          {v.author || (v.is_own ? 'RecSysCode' : '')}
        </div>
        <div className="video-card-meta">{v.published_at || ''}</div>
      </div>
    </div>
  );
}
