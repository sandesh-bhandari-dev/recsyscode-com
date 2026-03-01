'use client';

import { useState, useEffect } from 'react';
import { folders, getCourseData } from '@/data/coursesData';
import { useCourseProgress } from '@/lib/hooks';

export default function CourseView({ folderId, onBack }) {
  const folder = folders.find((f) => f.id === folderId);
  const courseData = getCourseData(folderId);
  const { state, cycleProgress, toggleMastered, getProgress } = useCourseProgress(folderId);
  const [diffFilter, setDiffFilter] = useState('all');
  const [detailItem, setDetailItem] = useState(null);
  const [showInterviewQs, setShowInterviewQs] = useState(false);

  if (!folder || !courseData) return <div>Folder not found.</div>;

  const allCourses = showInterviewQs && courseData.interviewQs
    ? courseData.interviewQs
    : courseData.courses;

  const filteredCourses = diffFilter === 'all'
    ? allCourses
    : allCourses.filter((c) => c.d === diffFilter);

  const mastered = allCourses.filter((c) => getProgress(c.id) >= 100).length;
  const total = allCourses.length;
  const pct = total > 0 ? Math.round((mastered / total) * 100) : 0;

  useEffect(() => {
    if (mastered > 0) {
      try {
        const key = new Date().toISOString().split('T')[0];
        const streak = JSON.parse(localStorage.getItem('rsc_streak') || '{}');
        streak[key] = (streak[key] || 0) + 1;
        localStorage.setItem('rsc_streak', JSON.stringify(streak));
      } catch {}
    }
  }, [mastered]);

  return (
    <div>
      <button className="back-btn" onClick={onBack}>&#8592; Back to Archive</button>

      <div className="section-header">
        <h2>{folder.title}</h2>
        <p>{folder.desc}</p>
      </div>

      <div className="roadmap-top">
        <div className="roadmap-progress-card">
          <h3>Overall Progress</h3>
          <div className="progress-ring-wrap">
            <svg width="100" height="100" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#e5e5e5" strokeWidth="6" />
              <circle cx="50" cy="50" r="42" fill="none"
                stroke={pct >= 100 ? '#16a34a' : '#2563eb'}
                strokeWidth="6" strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={`${2 * Math.PI * 42 * (1 - pct / 100)}`}
                transform="rotate(-90 50 50)"
                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
              />
              <text x="50" y="50" textAnchor="middle" dominantBaseline="central"
                style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: 'var(--font-mono)', fill: 'var(--ink)' }}>
                {pct}%
              </text>
            </svg>
            <div className="progress-stats">
              <div className="progress-stat">
                <span className="ps-num">{mastered}</span>
                <span className="ps-label">mastered</span>
              </div>
              <div className="progress-stat">
                <span className="ps-num">{total}</span>
                <span className="ps-label">total topics</span>
              </div>
              <div className="progress-stat">
                <span className="ps-num">{pct}%</span>
                <span className="ps-label">complete</span>
              </div>
            </div>
          </div>

          <div className="internship-box">
            <p className="internship-motto">You will never be fully ready, start applying <strong style={{ color: '#000', fontSize: '1.05em' }}>NOW!!</strong></p>
            <p className="internship-title">Top Internship Resources</p>
            <ul className="internship-list">
              {[
                { label: 'Simplify Summer 2026 Tracker', url: 'https://github.com/SimplifyJobs/Summer2026-Internships' },
                { label: 'Community Collaboration List', url: 'https://github.com/vanshb03/Summer2026-Internships' },
                { label: 'Intern-List', url: 'https://intern-list.com' },
                { label: 'WayUp', url: 'https://www.wayup.com' },
                { label: 'YC Startups', url: 'https://www.ycombinator.com/internships' },
                { label: 'Wellfound', url: 'https://wellfound.com' },
              ].map((item) => (
                <li key={item.url}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="learning-curve-card">
          <h3>Learning Path</h3>
          <div className="tree-wrap">
            <div className="legend">
              <div className="lg-item"><div className="lg-dot ns" />Not Started</div>
              <div className="lg-item"><div className="lg-dot cp" />Completed</div>
            </div>
            <div className="rtree">
              {courseData.tiers.map((tier, ti) => (
                <div key={ti}>
                  <div className="tree-tier">
                    {tier.map((cid) => {
                      const c = allCourses.find((x) => x.id === cid);
                      if (!c) return null;
                      const prog = getProgress(c.id);
                      const cls = prog >= 100 ? 'completed' : prog > 0 ? 'in-progress' : '';
                      return (
                        <div key={c.id} className={`tn ${cls}`} onClick={() => setDetailItem(c)} title={c.t}>
                          <span className="nc">{c.d?.charAt(0).toUpperCase()}</span>
                          {c.t.length > 20 ? c.t.substring(0, 18) + '...' : c.t}
                          {prog >= 100 && <span className="nchk">&#10003;</span>}
                        </div>
                      );
                    })}
                  </div>
                  {ti < courseData.tiers.length - 1 && <div className="tc" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {detailItem && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={() => setDetailItem(null)}>
          <div className="course-detail-panel" style={{ maxWidth: 560, width: '100%', maxHeight: '80vh', overflowY: 'auto', margin: 0 }} onClick={e => e.stopPropagation()}>
            <button className="chx" onClick={() => setDetailItem(null)}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <h3>{detailItem.t}</h3>
            <p className="cdesc">{detailItem.desc}</p>
            {detailItem.grp && <p style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', marginBottom: 8 }}>Group: {detailItem.grp}</p>}
            <h4 style={{ marginBottom: 10 }}>Resources</h4>
            <ul className="rl">
              {detailItem.r?.map((res, i) => (
                <li key={i}>
                  <span className={`rt-badge rt-${res.y}`}>{res.y}</span>
                  <a href={res.u} target="_blank" rel="noopener noreferrer">{res.t}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {folderId === 'system-design' && courseData.interviewQs && (
        <div className="sd-toggle">
          <button className={`mf-btn${!showInterviewQs ? ' active' : ''}`} onClick={() => setShowInterviewQs(false)}>
            Core Concepts ({courseData.courses.length})
          </button>
          <button className={`mf-btn${showInterviewQs ? ' active' : ''}`} onClick={() => setShowInterviewQs(true)}>
            Interview Questions ({courseData.interviewQs.length})
          </button>
        </div>
      )}

      <div className="mastery-section-hdr">
        <h3>Mastery Grid</h3>
        <span className="mastery-summary">{mastered} / {total} mastered</span>
      </div>

      <div className="mastery-filters">
        <span className="mf-label">Filter:</span>
        {[
          { key: 'all', label: 'All' },
          { key: 'beginner', label: 'Beginner' },
          { key: 'intermediate', label: 'Intermediate' },
          { key: 'advanced', label: 'Advanced' },
        ].map((f) => (
          <button key={f.key} className={`mf-btn${diffFilter === f.key ? ' active' : ''}`} onClick={() => setDiffFilter(f.key)}>
            {f.label}
          </button>
        ))}
      </div>

      <table className="mastery-table">
        <thead>
          <tr>
            <th>{folderId === 'dsa' ? 'Ch' : 'Topic'}</th>
            <th>Name</th>
            <th>Difficulty</th>
            <th>Progress</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.map((c) => {
            const prog = getProgress(c.id);
            const done = prog >= 100;
            const barColor = done ? '#16a34a' : prog > 0 ? '#2563eb' : '#e5e5e5';
            return (
              <tr key={c.id} className={done ? 'mastered' : ''}>
                <td className="cat-cell">{c.grp || (folderId === 'dsa' ? `Ch ${c.id}` : c.id)}</td>
                <td>
                  <a href="javascript:void(0)" className="problem-link" onClick={(e) => { e.preventDefault(); setDetailItem(c); }}>
                    {c.t}
                    {c.isProject && <span className="project-badge">Project</span>}
                    <span className="pla"> &#8594;</span>
                  </a>
                </td>
                <td><span className={`diff-badge ${c.d}`}>{c.d}</span></td>
                <td style={{ minWidth: 140 }}>
                  <div className="prog-bar-wrap" onClick={() => cycleProgress(c.id)} title="Click to advance">
                    <div className="prog-bar-track">
                      <div className="prog-bar-fill" style={{ width: `${prog}%`, background: barColor }} />
                    </div>
                    <span className="prog-bar-pct">{prog}%</span>
                  </div>
                </td>
                <td>
                  <button className={`mastery-done-btn${done ? ' done' : ''}`} onClick={() => toggleMastered(c.id)}>
                    {done ? 'Done' : 'Mark done'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
