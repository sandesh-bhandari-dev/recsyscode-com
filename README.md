# RecSysCode Archive

A curated archive and learning tracker for recommender systems, built with Next.js, React, and Supabase.

[recsyscode.com](https://recsyscode.com)

## Setup
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure
```
src/
  app/
    layout.js       ← Root layout (fonts, Rough.js, CSS)
    page.js         ← Main page / section router
    globals.css     ← All styles
  components/
    Navbar.js       ← Top navigation bar
    LocationBar.js  ← Fake browser location bar
    Archive.js      ← Resource archive with filters
    Roadmap.js      ← Mastery grid / progress tracker
    Shelf.js        ← Curated picks shelf
    VideoSection.js ← Lectures / YouTube videos
    Papers.js       ← Papers table
    SubmitForm.js   ← Submit a resource form
    Footer.js       ← Footer navigation
  data/
    resources.js    ← Archive resource entries
    masteryData.js  ← Roadmap problems (47 items)
    papersData.js   ← Key papers list
  lib/
    supabase.js     ← Supabase REST client
    hooks.js        ← useMasteryState hook
```
