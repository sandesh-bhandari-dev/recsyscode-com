'use client';

const shelfCards = [
  {
    title: 'Essential Papers',
    desc: 'Foundational research every RecSys engineer should read.',
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
    desc: 'Open-source codebases for building recommender systems.',
    links: [
      { label: 'Surprise (scikit-surprise)', url: 'https://github.com/NicolasHug/Surprise' },
      { label: 'LightFM', url: 'https://github.com/lyst/lightfm' },
      { label: 'RecBole -- 73 Algorithms', url: 'https://github.com/RUCAIBox/RecBole' },
      { label: 'TensorFlow Recommenders', url: 'https://github.com/tensorflow/recommenders' },
      { label: 'Microsoft Recommenders', url: 'https://github.com/microsoft/recommenders' },
    ],
  },
  {
    title: 'Must-Read Blogs',
    desc: 'Industry posts bridging theory and production.',
    links: [
      { label: 'Netflix Tech Blog -- RecSys Series', url: 'https://netflixtechblog.com/tagged/recommendations' },
      { label: 'Pinterest Engineering -- PinSage', url: 'https://medium.com/pinterest-engineering' },
      { label: 'Airbnb -- Listing Embeddings', url: 'https://medium.com/airbnb-engineering/listing-embeddings-in-search-ranking-59632227b132' },
      { label: 'Spotify Engineering -- Discover Weekly', url: 'https://engineering.atspotify.com/2023/01/content-sequencing/' },
      { label: 'Google AI -- Two-Tower Models', url: 'https://blog.google/products/search/search-on-2022/' },
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
