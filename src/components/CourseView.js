'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { folders, getCourseData } from '@/data/coursesData';
import { useCourseProgress } from '@/lib/hooks';

export default function CourseView({ folderId, onBack }) {
  const folder = folders.find((f) => f.id === folderId);
  const courseData = getCourseData(folderId);
  const { state, cycleProgress, toggleMastered, getProgress } = useCourseProgress(folderId);
  const [diffFilter, setDiffFilter] = useState('all');
  const [detailItem, setDetailItem] = useState(null);
  const [showInterviewQs, setShowInterviewQs] = useState(false);
  const progressCanvasRef = useRef(null);

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

  // Draw progress ring
  const drawRing = useCallback(() => {
    const canvas = progressCanvasRef.current;
    if (!canvas || !window.rough) return;
    const rc = window.rough.canvas(canvas);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 120, 120);
    rc.circle(60, 60, 104, { stroke: '#ddd', strokeWidth: 2, roughness: 1.8, fill: 'none' });
    if (pct > 0) {
      const endAngle = -Math.PI / 2 + (pct / 100) * 2 * Math.PI;
      rc.arc(60, 60, 104, 104, -Math.PI / 2, endAngle, false, {
        stroke: '#2a6e48', strokeWidth: 3, roughness: 1.2,
      });
    }
    ctx.font = "bold 26px 'Permanent Marker', cursive";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#1e1e1e';
    ctx.fillText(pct + '%', 60, 60);
  }, [pct]);

  useEffect(() => {
    const timer = setTimeout(drawRing, 100);
    return () => clearTimeout(timer);
  }, [drawRing]);

  return (
    <div>
      <button className="back-btn" onClick={onBack}>Back to Archive</button>

      <div className="section-header">
        <h2 className="sketch-underline">{folder.title}</h2>
        <p>{folder.desc}</p>
      </div>

      {/* Progress row */}
      <div className="roadmap-top">
        <div className="roadmap-progress-card">
          <h3>Overall Progress</h3>
          <div className="progress-ring-wrap">
            <canvas ref={progressCanvasRef} width={120} height={120} />
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
        </div>

        {/* Tree visualization */}
        <div className="learning-curve-card">
          <h3>Learning Path</h3>
          <div className="tree-wrap">
            <div className="legend">
              <div className="lg-item"><div className="lg-dot ns" />Not Started</div>
              <div className="lg-item"><div className="lg-dot ip" />In Progress</div>
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
                        <div
                          key={c.id}
                          className={`tn ${cls}`}
                          onClick={() => setDetailItem(c)}
                          title={c.t}
                        >
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

      {/* Detail modal */}
      {detailItem && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setDetailItem(null)}>
          <div className="course-detail-panel" style={{ maxWidth: '560px', width: '100%', maxHeight: '80vh', overflowY: 'auto', margin: 0 }} onClick={e => e.stopPropagation()}>
            <button className="chx" onClick={() => setDetailItem(null)}>x</button>
            <h3>{detailItem.t}</h3>
            <p className="cdesc">{detailItem.desc}</p>
            {detailItem.grp && <p style={{ fontFamily: 'var(--font-accent)', color: 'var(--ink-faint)', marginBottom: 8 }}>Group: {detailItem.grp}</p>}
            <h4 style={{ fontFamily: 'var(--font-accent)', fontSize: '1.1rem', marginBottom: 10 }}>Resources</h4>
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

      {/* System Design special: toggle between concepts and interview questions */}
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

      {/* Mastery Grid */}
      <div className="mastery-section-hdr">
        <h3>The Mastery Grid</h3>
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
          <button
            key={f.key}
            className={`mf-btn${diffFilter === f.key ? ' active' : ''}`}
            onClick={() => setDiffFilter(f.key)}
          >
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
            const barColor = done ? '#2a6e48' : prog > 0 ? '#2d5fa8' : '#e0d9cc';

            return (
              <tr key={c.id} className={done ? 'mastered' : ''}>
                <td className="cat-cell">{c.grp || (folderId === 'dsa' ? `Ch ${c.id}` : c.id)}</td>
                <td>
                  <a
                    href="javascript:void(0)"
                    className="problem-link"
                    onClick={(e) => { e.preventDefault(); setDetailItem(c); }}
                  >
                    {c.t}
                    {c.isProject && <span className="project-badge">Project</span>}
                    <span className="pla"> &gt;</span>
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
                  <button
                    className={`mastery-done-btn${done ? ' done' : ''}`}
                    onClick={() => toggleMastered(c.id)}
                  >
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
