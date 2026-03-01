'use client';

const shelfCards = [
  {
    title: 'Essential Papers',
    desc: 'Foundational research every RecSys engineer should have read.',
    icon: (
      <svg className="shelf-icon" viewBox="0 0 56 56" fill="none">
        <rect x="4" y="8" width="48" height="40" rx="2" stroke="#1e1e1e" strokeWidth="2.5" />
        <line x1="12" y1="18" x2="44" y2="18" stroke="#1e1e1e" strokeWidth="1.5" />
        <line x1="12" y1="26" x2="38" y2="26" stroke="#1e1e1e" strokeWidth="1.5" />
        <line x1="12" y1="34" x2="42" y2="34" stroke="#1e1e1e" strokeWidth="1.5" />
        <path d="M6 12 Q28 6 50 12" stroke="#b83232" strokeWidth="2" fill="none" />
      </svg>
    ),
    links: [
      { label: 'Matrix Factorization Techniques (Koren et al.)', url: 'https://netflixtechblog.com/netflix-recommendations-beyond-the-5-stars-part-1-55838468f429' },
      { label: 'Deep Neural Networks for YouTube Recs', url: 'https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/45530.pdf' },
      { label: 'Wide & Deep Learning (Cheng et al.)', url: 'https://arxiv.org/abs/1606.07792' },
      { label: 'Neural Collaborative Filtering (He et al.)', url: 'https://arxiv.org/abs/1708.05031' },
      { label: 'BERT4Rec (Sun et al.)', url: 'https://arxiv.org/abs/1904.06690' },
    ],
  },
  {
    title: 'Core Repos',
    desc: 'Best open-source codebases for learning and building recommender systems.',
    icon: (
      <svg className="shelf-icon" viewBox="0 0 56 56" fill="none">
        <rect x="8" y="4" width="40" height="48" rx="2" stroke="#1e1e1e" strokeWidth="2.5" />
        <path d="M16 16 L24 28 L32 20 L40 32" stroke="#2d5fa8" strokeWidth="2" fill="none" strokeLinecap="round" />
        <line x1="16" y1="38" x2="40" y2="38" stroke="#1e1e1e" strokeWidth="1" />
        <circle cx="20" cy="12" r="3" stroke="#2a6e48" strokeWidth="1.5" fill="none" />
      </svg>
    ),
    links: [
      { label: 'Surprise (scikit-surprise)', url: 'https://github.com/NicolasHug/Surprise' },
      { label: 'LightFM', url: 'https://github.com/lyst/lightfm' },
      { label: 'RecBole — 73 Algorithms', url: 'https://github.com/RUCAIBox/RecBole' },
      { label: 'TensorFlow Recommenders', url: 'https://github.com/tensorflow/recommenders' },
      { label: 'Microsoft Recommenders', url: 'https://github.com/microsoft/recommenders' },
    ],
  },
  {
    title: 'Must-Read Blogs',
    desc: 'Industry posts bridging theory and production-scale practice.',
    icon: (
      <svg className="shelf-icon" viewBox="0 0 56 56" fill="none">
        <path d="M8 44 L8 12 Q8 8 12 8 L44 8 Q48 8 48 12 L48 44" stroke="#1e1e1e" strokeWidth="2.5" fill="none" />
        <line x1="8" y1="44" x2="48" y2="44" stroke="#1e1e1e" strokeWidth="2.5" />
        <line x1="16" y1="18" x2="40" y2="18" stroke="#c4680a" strokeWidth="2" />
        <line x1="16" y1="26" x2="36" y2="26" stroke="#1e1e1e" strokeWidth="1.5" />
        <line x1="16" y1="32" x2="38" y2="32" stroke="#1e1e1e" strokeWidth="1.5" />
      </svg>
    ),
    links: [
      { label: 'Netflix Tech Blog — RecSys Series', url: 'https://netflixtechblog.com/tagged/recommendations' },
      { label: 'Pinterest Engineering — PinSage', url: 'https://medium.com/pinterest-engineering' },
      { label: 'Airbnb — Listing Embeddings', url: 'https://medium.com/airbnb-engineering/listing-embeddings-in-search-ranking-59632227b132' },
      { label: 'Spotify Engineering — Discover Weekly', url: 'https://engineering.atspotify.com/2023/01/content-sequencing/' },
      { label: 'Google AI — Two-Tower Models', url: 'https://blog.google/products/search/search-on-2022/' },
    ],
  },
];

export default function Shelf() {
  return (
    <div>
      <div className="section-header">
        <h2>The Shelf</h2>
        <p>Curated best-of resources, hand-picked for quality</p>
      </div>

      <div className="shelf-grid">
        {shelfCards.map((card, i) => (
          <div key={card.title} className={`shelf-card anim-in${i > 0 ? ` anim-delay-${i}` : ''}`}>
            <div className="shelf-card-corner" />
            {card.icon}
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
            <ul className="shelf-list">
              {card.links.map((link) => (
                <li key={link.url}>
                  <span className="shelf-bullet" />
                  <a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
