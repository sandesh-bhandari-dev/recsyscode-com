'use client';

import { useState, useEffect } from 'react';
import { sbFetch } from '@/lib/supabase';
import papersData from '@/data/papersData';

// Static "picks" resources (papers + blogs + codes from papersData and curated)
const PICKS = [
  ...papersData.map((p) => ({
    type: 'paper',
    title: p.title,
    meta: `${p.authors} · ${p.venue} ${p.year}`,
    url: p.url,
  })),
  { type: 'blog', title: 'Netflix Tech Blog: RecSys Series', meta: 'Netflix Engineering', url: 'https://netflixtechblog.com/tagged/recommendations' },
  { type: 'blog', title: 'Pinterest Engineering: PinSage', meta: 'Pinterest', url: 'https://medium.com/pinterest-engineering' },
  { type: 'blog', title: 'Airbnb: Listing Embeddings in Search Ranking', meta: 'Airbnb Engineering', url: 'https://medium.com/airbnb-engineering/listing-embeddings-in-search-ranking-59632227b132' },
  { type: 'blog', title: 'Spotify Engineering: Content Sequencing', meta: 'Spotify', url: 'https://engineering.atspotify.com/2023/01/content-sequencing/' },
  { type: 'code', title: 'Surprise (scikit-surprise)', meta: 'Nicolas Hug', url: 'https://github.com/NicolasHug/Surprise' },
  { type: 'code', title: 'RecBole: 73 Algorithms', meta: 'RUC AIBox', url: 'https://github.com/RUCAIBox/RecBole' },
  { type: 'code', title: 'LightFM: Hybrid Library', meta: 'Lyst', url: 'https://github.com/lyst/lightfm' },
  { type: 'code', title: 'TensorFlow Recommenders', meta: 'Google', url: 'https://github.com/tensorflow/recommenders' },
  { type: 'code', title: 'Microsoft Recommenders', meta: 'Microsoft', url: 'https://github.com/microsoft/recommenders' },
];

export default function Resources() {
  const [tab, setTab] = useState('picks');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await sbFetch('videos?order=published_at.desc&select=id,title,topic,description,duration,published_at,is_new,is_own,author');
        if (!res.ok) throw new Error('fetch failed');
        const data = await res.json();
        setVideos(data);
      } catch {
        setVideos([]);
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, []);

  const byMe = videos.filter((v) => v.is_own);
  // Could also add blog posts, papers authored by you, etc.

  return (
    <div>
      <div className="section-header">
        <h2>Resources</h2>
        <p>Curated papers, talks, repos, and blogs</p>
      </div>

      <div className="resources-tabs">
        <button className={`resources-tab${tab === 'picks' ? ' active' : ''}`} onClick={() => setTab('picks')}>
          Picks
        </button>
        <button className={`resources-tab${tab === 'by-me' ? ' active' : ''}`} onClick={() => setTab('by-me')}>
          By Me
        </button>
      </div>

      {tab === 'picks' ? (
        <div className="resource-list">
          {PICKS.map((item, i) => (
            <div key={i} className="resource-item">
              <span className={`resource-type-badge ${item.type}`}>{item.type}</span>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
              <span className="resource-meta">{item.meta}</span>
              <span className="resource-arrow">&#8594;</span>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 40 }}>
              <div className="loading-pill">
                <div className="loading-dot" />
                <div className="loading-dot" />
                <div className="loading-dot" />
                Loading...
              </div>
            </div>
          ) : byMe.length === 0 ? (
            <div className="empty-state">
              <h3>Coming soon</h3>
              <p>My blogs, videos, and papers will appear here.</p>
            </div>
          ) : (
            <div className="resource-list">
              {byMe.map((v) => (
                <div key={v.id} className="resource-item">
                  <span className="resource-type-badge video">video</span>
                  <a href={`https://youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer">
                    {v.title}
                  </a>
                  <span className="resource-meta">{v.published_at || ''}</span>
                  <span className="resource-arrow">&#8594;</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
