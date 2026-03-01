'use client';

import { useState, useEffect } from 'react';
import { folders, getCourseData } from '@/data/coursesData';

export default function Archive({ onOpenFolder }) {
  const [view, setView] = useState('folders');
  const [folderStats, setFolderStats] = useState({});

  useEffect(() => {
    const stats = {};
    folders.forEach((f) => {
      try {
        const data = getCourseData(f.id);
        if (!data) { stats[f.id] = { mastered: 0, total: 0, started: 0 }; return; }
        const saved = localStorage.getItem('rsc_course_' + f.id);
        if (saved) {
          const parsed = JSON.parse(saved);
          const mastered = Object.values(parsed).filter((v) => v >= 100).length;
          const started = Object.values(parsed).filter((v) => v > 0).length;
          stats[f.id] = { mastered, total: data.total, started };
        } else {
          stats[f.id] = { mastered: 0, total: data.total, started: 0 };
        }
      } catch {
        stats[f.id] = { mastered: 0, total: 0, started: 0 };
      }
    });
    setFolderStats(stats);
  }, []);

  const inProgressFolders = folders.filter(f => {
    const st = folderStats[f.id];
    return st && st.started > 0;
  });

  return (
    <div>
      <div className="section-header">
        <h2>The Archive</h2>
        <p>Pick a roadmap and start learning</p>
      </div>

      <div className="archive-view-toggle">
        <button className={`avt-btn${view === 'folders' ? ' active' : ''}`} onClick={() => setView('folders')}>
          Course Folders
        </button>
        <button className={`avt-btn${view === 'my-courses' ? ' active' : ''}`} onClick={() => setView('my-courses')}>
          My Courses
        </button>
      </div>

      {view === 'folders' ? (
        <div className="folder-grid">
          {folders.map((f, i) => {
            const st = folderStats[f.id] || { mastered: 0, total: 0, started: 0 };
            return (
              <div
                key={f.id}
                className="folder-card anim-in"
                style={{ animationDelay: `${i * 0.06}s` }}
                onClick={() => onOpenFolder(f.id)}
              >
                <span className="folder-badge">{f.badge}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <div className="folder-card-stats">
                  <div className="fcs-item">
                    <span className="fcs-num">{st.started}</span>
                    <span className="fcs-label">Started</span>
                  </div>
                  <div className="fcs-item">
                    <span className="fcs-num">{st.mastered}</span>
                    <span className="fcs-label">Mastered</span>
                  </div>
                  <div className="fcs-item">
                    <span className="fcs-num">{st.total > 0 ? Math.round((st.mastered / st.total) * 100) : 0}%</span>
                    <span className="fcs-label">Complete</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="folder-grid">
          {inProgressFolders.length > 0 ? inProgressFolders.map((f, i) => {
            const st = folderStats[f.id] || { mastered: 0, total: 0, started: 0 };
            return (
              <div
                key={f.id}
                className="folder-card anim-in"
                style={{ animationDelay: `${i * 0.06}s` }}
                onClick={() => onOpenFolder(f.id)}
              >
                <span className="folder-badge">{f.badge}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <div className="folder-card-stats">
                  <div className="fcs-item">
                    <span className="fcs-num">{st.started}</span>
                    <span className="fcs-label">Started</span>
                  </div>
                  <div className="fcs-item">
                    <span className="fcs-num">{st.mastered}</span>
                    <span className="fcs-label">Mastered</span>
                  </div>
                  <div className="fcs-item">
                    <span className="fcs-num">{st.total > 0 ? Math.round((st.mastered / st.total) * 100) : 0}%</span>
                    <span className="fcs-label">Complete</span>
                  </div>
                </div>
              </div>
            );
          }) : (
            <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
              <h3>Thank you for visiting</h3>
              <p>Courses coming soon. Head to Course Folders and explore available roadmaps.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
