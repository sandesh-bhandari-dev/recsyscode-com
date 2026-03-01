import './globals.css';
import Script from 'next/script';

export const metadata = {
  title: 'RecSysCode — Recommender Systems Archive',
  description: 'A curated archive of recommender systems research, code, datasets, and learning resources.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Architects+Daughter&family=Caveat:wght@400;600;700&family=Patrick+Hand&family=Permanent+Marker&family=Shadows+Into+Light&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Script
          src="https://cdn.jsdelivr.net/npm/roughjs@4.6.6/bundled/rough.min.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
