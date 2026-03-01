'use client';

import { useState, useEffect } from 'react';
import { folders, getCourseData } from '@/data/coursesData';

// ─── ADD YOUR OWN COURSES HERE ───────────────────────────────────────────────
// Duplicate any object below to add a new course card.
const MY_COURSES = [
  // {
  //   id: 'my-course-1',
  //   title: 'My First Course',
  //   desc: 'A short description of what this course covers.',
  //   badge: '10 Lessons',
  //   status: 'coming-soon', // 'available' or 'coming-soon'
  //   url: 'https://your-link-here.com', // optional external link
  // },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function Archive({ onOpenFolder }) {
  const [view, setView] = useState('folders'); // 'folders' or 'my-courses'
  const [folderStats, setFolderStats] = useState({});

  // Load folder progress from localStorage
  useEffect(() => {
    const stats = {};
    folders.forEach((f) => {
      try {
        const data = getCourseData(f.id);
        const saved = localStorage.getItem('rsc_course_' + f.id);
        if (saved) {
          const parsed = JSON.parse(saved);
          const mastered = Object.values(parsed).filter((v) => v >= 100).length;
          stats[f.id] = { mastered, total: data.total };
        } else {
          stats[f.id] = { mastered: 0, total: data.total };
        }
      } catch {
        stats[f.id] = { mastered: 0, total: 0 };
      }
    });
    setFolderStats(stats);
  }, []);

  return (
    <div>
      <div className="section-header">
        <h2 className="sketch-underline">The Archive</h2>
        <p>Pick a roadmap to begin your mastery journey, or browse courses posted here</p>
      </div>

      {/* View Toggle */}
      <div className="archive-view-toggle">
        <button className={`avt-btn${view === 'folders' ? ' active' : ''}`} onClick={() => setView('folders')}>
          Course Folders
        </button>
        <button className={`avt-btn${view === 'my-courses' ? ' active' : ''}`} onClick={() => setView('my-courses')}>
          My Courses
        </button>
      </div>

      {view === 'folders' ? (
        /* ─── FOLDER GRID ─── */
        <div className="folder-grid">
          {folders.map((f, i) => {
            const st = folderStats[f.id] || { mastered: 0, total: 0 };
            const progressText = f.progressType === 'mastery'
              ? `${st.mastered} / ${st.total} mastered`
              : 'Self-paced track';
            return (
              <div
                key={f.id}
                className={`folder-card anim-in`}
                style={{ animationDelay: `${i * 0.08}s` }}
                onClick={() => onOpenFolder(f.id)}
              >
                <span className="folder-badge">{f.badge}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <span className="folder-progress">{progressText}</span>
              </div>
            );
          })}
        </div>
      ) : (
        /* ─── MY COURSES ─── */
        <div className="folder-grid">
          {MY_COURSES.length === 0 ? (
            <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
              <h3>No courses yet</h3>
              <p>Add your courses to <code>MY_COURSES</code> in <code>src/components/Archive.js</code></p>
            </div>
          ) : (
            MY_COURSES.map((c, i) => (
              <div
                key={c.id}
                className={`folder-card anim-in`}
                style={{ animationDelay: `${i * 0.08}s`, opacity: c.status === 'coming-soon' ? 0.6 : 1 }}
                onClick={() => c.url && c.status !== 'coming-soon' && window.open(c.url, '_blank')}
              >
                <span className="folder-badge">{c.badge}</span>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <span className="folder-progress">
                  {c.status === 'coming-soon' ? 'Coming soon' : 'Available →'}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
