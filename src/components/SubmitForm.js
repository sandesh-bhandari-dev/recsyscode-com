'use client';

import { useState } from 'react';

const TYPES = ['paper', 'code', 'dataset', 'blog'];
const LEVELS = ['beginner', 'intermediate', 'advanced'];
const TOPICS = [
  'Introduction', 'Collaborative Filtering', 'Content-Based',
  'Matrix Factorization', 'Deep Learning', 'Graph Neural Nets',
  'Sequential Models', 'Evaluation', 'Production', 'LLM + RecSys',
];

export default function SubmitForm({ onCancel }) {
  const [form, setForm] = useState({
    title: '', url: '', type: '', level: '', topic: '', description: '', tags: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const update = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!form.title.trim()) { setError('Title is required.'); return; }
    if (!form.url.trim()) { setError('URL is required.'); return; }
    if (!form.type) { setError('Please select a type.'); return; }
    if (!form.level) { setError('Please select a level.'); return; }

    // In production, this would POST to Supabase
    console.log('Submitted resource:', form);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="submit-success">
        <div className="submit-success-icon">&#10003;</div>
        <h2>Thank you for your submission</h2>
        <p>Your resource has been submitted for review. It will appear in the archive once approved.</p>
        <button className="submit-another-btn" onClick={() => { setSubmitted(false); setForm({ title: '', url: '', type: '', level: '', topic: '', description: '', tags: '' }); }}>
          Submit Another
        </button>
        <button className="submit-back-btn" onClick={onCancel}>Back to Archive</button>
      </div>
    );
  }

  return (
    <div>
      <div className="section-header">
        <h2 className="sketch-underline">Submit a Resource</h2>
        <p>Help grow the RecSysCode Archive</p>
      </div>

      <form className="submit-form" onSubmit={handleSubmit}>
        <div className="sf-field">
          <label>Title <span className="sf-req">*</span></label>
          <input
            type="text"
            placeholder="e.g. Deep Neural Networks for YouTube Recommendations"
            value={form.title}
            onChange={(e) => update('title', e.target.value)}
          />
        </div>

        <div className="sf-field">
          <label>URL <span className="sf-req">*</span></label>
          <input
            type="url"
            placeholder="https://..."
            value={form.url}
            onChange={(e) => update('url', e.target.value)}
          />
        </div>

        <div className="sf-row-3">
          <div className="sf-field">
            <label>Type <span className="sf-req">*</span></label>
            <select value={form.type} onChange={(e) => update('type', e.target.value)}>
              <option value="">Select type...</option>
              {TYPES.map((t) => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
            </select>
          </div>

          <div className="sf-field">
            <label>Level <span className="sf-req">*</span></label>
            <select value={form.level} onChange={(e) => update('level', e.target.value)}>
              <option value="">Select level...</option>
              {LEVELS.map((l) => <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>)}
            </select>
          </div>

          <div className="sf-field">
            <label>Topic</label>
            <select value={form.topic} onChange={(e) => update('topic', e.target.value)}>
              <option value="">Select topic...</option>
              {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div className="sf-field">
          <label>Description</label>
          <textarea
            placeholder="Brief description..."
            rows={4}
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
          />
        </div>

        <div className="sf-field">
          <label>Tags <span className="sf-hint">(comma separated)</span></label>
          <input
            type="text"
            placeholder="e.g. collaborative, matrix, pytorch"
            value={form.tags}
            onChange={(e) => update('tags', e.target.value)}
          />
        </div>

        {error && <div className="sf-error">{error}</div>}

        <div className="sf-actions">
          <button type="button" className="sf-cancel-btn" onClick={onCancel}>Cancel</button>
          <button type="submit" className="sf-submit-btn">Submit Resource</button>
        </div>
      </form>
    </div>
  );
}
