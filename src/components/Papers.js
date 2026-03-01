'use client';

import papersData from '@/data/papersData';

const TOPICS = [...new Set(papersData.map((p) => p.topic))];

export default function Papers() {
  return (
    <div>
      <div className="section-header">
        <h2>Key Papers</h2>
        <p>Seminal research that shaped modern recommender systems</p>
      </div>

      <table className="papers-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Authors</th>
            <th>Venue</th>
            <th>Year</th>
            <th>Topic</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {papersData.map((p, i) => (
            <tr key={i}>
              <td style={{ fontWeight: 'bold', maxWidth: 320 }}>{p.title}</td>
              <td style={{ color: 'var(--ink-light)', fontSize: '0.88rem' }}>{p.authors}</td>
              <td><span className="venue-badge">{p.venue}</span></td>
              <td style={{ fontFamily: 'var(--font-accent)', fontSize: '0.9rem' }}>{p.year}</td>
              <td><span className="topic-badge">{p.topic}</span></td>
              <td>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="paper-link-btn">
                  PDF ↗
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
