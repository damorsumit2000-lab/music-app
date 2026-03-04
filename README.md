# 🎵 Rhythmix — YouTube Music Web Player

A full-featured, beautifully designed music web app powered by the **YouTube IFrame API**. Built with **Next.js 14**, deployable to **Vercel** in one click.

## ✨ Features

- 🔍 **Search** any song, artist, or album via YouTube
- 🎵 **Full Player** — play/pause, seek, volume, next/prev
- ❤️ **Like songs** & build your personal library
- 🔀 **Shuffle & Repeat** controls
- 📋 **Featured playlists** — Global Top 50, Lofi, Bollywood, Hip-Hop, Tamil, K-Pop
- 📚 **Library** — view recently played & liked songs
- ⚡ Zero backend — runs entirely in the browser

## 🚀 Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/rhythmix)

## 🛠 Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🔑 YouTube API Key (Optional for full search)

The app works out of the box with trending/featured content. To enable full YouTube search:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a project → Enable **YouTube Data API v3**
3. Create an API key (restrict to your domain for security)
4. Replace the `apiKey` value in `components/App.jsx`

```js
const apiKey = 'YOUR_API_KEY_HERE';
```

## 🏗 Tech Stack

- **Next.js 14** (App Router)
- **YouTube IFrame API** — music playback
- **YouTube Data API v3** — search
- **CSS Modules** — scoped styling
- **Syne + DM Sans** — typography

## 📁 Project Structure

```
rhythmix/
├── app/
│   ├── layout.js       # Root layout + metadata
│   ├── page.js         # Entry point
│   └── globals.css     # Global design tokens
├── components/
│   ├── App.jsx         # Main app component
│   └── App.module.css  # Component styles
├── next.config.js
└── package.json
```

## 🌐 Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project
3. Select your GitHub repo → Deploy
4. Done! 🎉

---

Built with ❤️ using Next.js + YouTube API
