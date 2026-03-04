'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './App.module.css';

// ─── Curated playlists / featured content ───────────────────────────────────
const FEATURED = [
  { id: 'PLFgquLnL59alCl_2TQvOiD5Vgm1hCaGSI', title: 'Global Top 50', desc: 'Hottest tracks worldwide', color: '#ff3c3c' },
  { id: 'PLDIoUOhQQPlXr63I_vwF06Dq1aY59NLML', title: 'Lofi Beats', desc: 'Study & chill vibes', color: '#3c8fff' },
  { id: 'PLgzTt0k8mXzEk586ze4BjvDXR7c-TUSnx', title: 'Bollywood Hits', desc: 'Top Hindi songs 2024', color: '#ff8c00' },
  { id: 'PLYlS9za0PMIO_jLXlt-xBRdHcb4woRSyp', title: 'Hip-Hop Essentials', desc: 'The culture, the sound', color: '#9b59b6' },
  { id: 'PLH6pfBXQXHEC2uDmDy6PiCCEU5hkBBhJC', title: 'Tamil Trending', desc: 'Best of Kollywood now', color: '#e74c3c' },
  { id: 'PLYXLhJO8WEEDe4Ssom3n2ovEFXTBIjP07', title: 'K-Pop Hits', desc: 'K-Pop chart toppers', color: '#2ecc71' },
];

const TRENDING_VIDEOS = [
  // Pop / International
  { id: 'JGwWNGJdvx8', title: 'Shape of You', artist: 'Ed Sheeran', thumb: 'https://img.youtube.com/vi/JGwWNGJdvx8/mqdefault.jpg' },
  { id: 'kTJczUoc26U', title: 'Senorita', artist: 'Shawn Mendes & Camila', thumb: 'https://img.youtube.com/vi/kTJczUoc26U/mqdefault.jpg' },
  { id: 'RgKAFK5djSk', title: 'See You Again', artist: 'Wiz Khalifa', thumb: 'https://img.youtube.com/vi/RgKAFK5djSk/mqdefault.jpg' },
  { id: 'OPf0YbXqDm0', title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', thumb: 'https://img.youtube.com/vi/OPf0YbXqDm0/mqdefault.jpg' },
  { id: 'hT_nvWreIhg', title: 'Counting Stars', artist: 'OneRepublic', thumb: 'https://img.youtube.com/vi/hT_nvWreIhg/mqdefault.jpg' },
  { id: 'YqeW9_5kURI', title: 'Perfect', artist: 'Ed Sheeran', thumb: 'https://img.youtube.com/vi/YqeW9_5kURI/mqdefault.jpg' },
  { id: 'CevxZvSJLk8', title: 'Roar', artist: 'Katy Perry', thumb: 'https://img.youtube.com/vi/CevxZvSJLk8/mqdefault.jpg' },
  { id: 'nfWlot6h_JM', title: 'Shake It Off', artist: 'Taylor Swift', thumb: 'https://img.youtube.com/vi/nfWlot6h_JM/mqdefault.jpg' },
  { id: 'PT2_F-1esPk', title: 'Unstoppable', artist: 'Sia', thumb: 'https://img.youtube.com/vi/PT2_F-1esPk/mqdefault.jpg' },
  { id: 'bo_efYSyea0', title: 'Sorry', artist: 'Justin Bieber', thumb: 'https://img.youtube.com/vi/bo_efYSyea0/mqdefault.jpg' },
  { id: '09R8_2nJtjg', title: 'Sugar', artist: 'Maroon 5', thumb: 'https://img.youtube.com/vi/09R8_2nJtjg/mqdefault.jpg' },
  { id: 'SlPhMPnQ58k', title: 'Levitating', artist: 'Dua Lipa', thumb: 'https://img.youtube.com/vi/SlPhMPnQ58k/mqdefault.jpg' },
  { id: 'pRpeEdMmmQ0', title: 'Happier', artist: 'Marshmello & Bastille', thumb: 'https://img.youtube.com/vi/pRpeEdMmmQ0/mqdefault.jpg' },
  { id: 'ZbZSe6N_BXs', title: 'Happy', artist: 'Pharrell Williams', thumb: 'https://img.youtube.com/vi/ZbZSe6N_BXs/mqdefault.jpg' },
  { id: 'fHI8X4OXluQ', title: 'Astronaut In The Ocean', artist: 'Masked Wolf', thumb: 'https://img.youtube.com/vi/fHI8X4OXluQ/mqdefault.jpg' },

  // Bollywood
  { id: 'reIOoKhTHU8', title: 'Kesariya', artist: 'Arijit Singh', thumb: 'https://img.youtube.com/vi/reIOoKhTHU8/mqdefault.jpg' },
  { id: 'BddP6PYo2gs', title: 'Tum Hi Ho', artist: 'Arijit Singh', thumb: 'https://img.youtube.com/vi/BddP6PYo2gs/mqdefault.jpg' },
  { id: 'pMsDDJqCGSY', title: 'Raataan Lambiyan', artist: 'Jubin Nautiyal', thumb: 'https://img.youtube.com/vi/pMsDDJqCGSY/mqdefault.jpg' },
  { id: 'YVNKFaZBArM', title: 'Chaleya', artist: 'Arijit Singh & Shilpa Rao', thumb: 'https://img.youtube.com/vi/YVNKFaZBArM/mqdefault.jpg' },
  { id: '1wJP4m3rOJI', title: 'Apna Bana Le', artist: 'Arijit Singh', thumb: 'https://img.youtube.com/vi/1wJP4m3rOJI/mqdefault.jpg' },
  { id: 'AHJOKyDFDHM', title: 'Bekhayali', artist: 'Sachet Tandon', thumb: 'https://img.youtube.com/vi/AHJOKyDFDHM/mqdefault.jpg' },
  { id: 'JVxkr7QPYHY', title: 'Ik Vaari Aa', artist: 'Arijit Singh', thumb: 'https://img.youtube.com/vi/JVxkr7QPYHY/mqdefault.jpg' },
  { id: 'lSUCqkWH_Q0', title: 'Dil Diyan Gallan', artist: 'Atif Aslam', thumb: 'https://img.youtube.com/vi/lSUCqkWH_Q0/mqdefault.jpg' },

  // Tamil / Kollywood
  { id: 'P8RgTFOhMpw', title: 'Kannaana Kanney', artist: 'D. Imman', thumb: 'https://img.youtube.com/vi/P8RgTFOhMpw/mqdefault.jpg' },
  { id: 'tgbNymZ7vqY', title: 'Arabic Kuthu', artist: 'Anirudh Ravichander', thumb: 'https://img.youtube.com/vi/tgbNymZ7vqY/mqdefault.jpg' },
  { id: 'vo6JBJ7QFBQ', title: 'Rowdy Baby', artist: 'Dhanush & Dhee', thumb: 'https://img.youtube.com/vi/vo6JBJ7QFBQ/mqdefault.jpg' },
  { id: 'hIPBaB3UPRA', title: 'Kaavaalaa', artist: 'Anirudh Ravichander', thumb: 'https://img.youtube.com/vi/hIPBaB3UPRA/mqdefault.jpg' },
  { id: 'ZS7BSzK7HLs', title: 'Naatu Naatu', artist: 'Rahul Sipligunj', thumb: 'https://img.youtube.com/vi/ZS7BSzK7HLs/mqdefault.jpg' },

  // Hip-Hop
  { id: 'YVkUvmDQ3HY', title: 'HUMBLE.', artist: 'Kendrick Lamar', thumb: 'https://img.youtube.com/vi/YVkUvmDQ3HY/mqdefault.jpg' },
  { id: 'IHNzOHi8sJs', title: 'God's Plan', artist: 'Drake', thumb: 'https://img.youtube.com/vi/IHNzOHi8sJs/mqdefault.jpg' },
  { id: 'QjvzCTqkBDQ', title: 'Rockstar', artist: 'Post Malone', thumb: 'https://img.youtube.com/vi/QjvzCTqkBDQ/mqdefault.jpg' },
  { id: '6ONRf7h3Mdk', title: 'SICKO MODE', artist: 'Travis Scott', thumb: 'https://img.youtube.com/vi/6ONRf7h3Mdk/mqdefault.jpg' },
  { id: 'nS2oNq02E48', title: 'Blinding Lights', artist: 'The Weeknd', thumb: 'https://img.youtube.com/vi/nS2oNq02E48/mqdefault.jpg' },

  // K-Pop
  { id: 'gdZLi9oWNZg', title: 'Dynamite', artist: 'BTS', thumb: 'https://img.youtube.com/vi/gdZLi9oWNZg/mqdefault.jpg' },
  { id: 'MBdVXkSdhwU', title: 'Psycho', artist: 'Red Velvet', thumb: 'https://img.youtube.com/vi/MBdVXkSdhwU/mqdefault.jpg' },
  { id: '9bZkp7q19f0', title: 'GANGNAM STYLE', artist: 'PSY', thumb: 'https://img.youtube.com/vi/9bZkp7q19f0/mqdefault.jpg' },
  { id: 'XsX3ATc3FbA', title: 'Boy With Luv', artist: 'BTS ft. Halsey', thumb: 'https://img.youtube.com/vi/XsX3ATc3FbA/mqdefault.jpg' },

  // Lofi / Chill
  { id: '5qap5aO4i9A', title: 'Lofi Hip Hop Radio', artist: 'ChilledCow', thumb: 'https://img.youtube.com/vi/5qap5aO4i9A/mqdefault.jpg' },
  { id: 'DWcJFNfaw9c', title: 'Study Music Alpha Waves', artist: 'YellowBrickCinema', thumb: 'https://img.youtube.com/vi/DWcJFNfaw9c/mqdefault.jpg' },
];

// ─── YouTube Player Hook ─────────────────────────────────────────────────────
function useYouTubePlayer(onStateChange, onReady) {
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('yt-player', {
        height: '1',
        width: '1',
        playerVars: { autoplay: 0, controls: 0, rel: 0, modestbranding: 1 },
        events: {
          onReady: () => { setReady(true); if (onReady) onReady(playerRef.current); },
          onStateChange: (e) => { if (onStateChange) onStateChange(e.data); },
        },
      });
    };
    return () => { window.onYouTubeIframeAPIReady = null; };
  }, []);

  return { player: playerRef, ready };
}

// ─── Search Results Item ─────────────────────────────────────────────────────
function SearchResult({ item, onPlay, isActive }) {
  if (!item || item.id?.kind === 'youtube#channel') return null;
  const vid = item.id?.videoId || item.id;
  const title = item.snippet?.title || item.title || 'Unknown';
  const channel = item.snippet?.channelTitle || item.artist || '';
  const thumb = item.snippet?.thumbnails?.medium?.url || item.thumb || `https://img.youtube.com/vi/${vid}/mqdefault.jpg`;

  return (
    <div className={`${styles.searchResult} ${isActive ? styles.active : ''}`} onClick={() => onPlay({ id: vid, title, artist: channel, thumb })}>
      <img src={thumb} alt={title} className={styles.resultThumb} />
      <div className={styles.resultInfo}>
        <span className={styles.resultTitle}>{title}</span>
        <span className={styles.resultArtist}>{channel}</span>
      </div>
      <button className={styles.playBtn}>▶</button>
    </div>
  );
}

// ─── Mini Equalizer Animation ────────────────────────────────────────────────
function Equalizer({ playing }) {
  return (
    <div className={`${styles.eq} ${playing ? styles.eqPlaying : ''}`}>
      {[1,2,3,4].map(i => <span key={i} className={styles.eqBar} style={{ animationDelay: `${i * 0.1}s` }} />)}
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState('home'); // home | search | playlist | library
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [queue, setQueue] = useState([]);
  const [queueIdx, setQueueIdx] = useState(0);
  const [library, setLibrary] = useState([]);
  const [liked, setLiked] = useState([]);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [activePlaylist, setActivePlaylist] = useState(null);
  const [playerExpanded, setPlayerExpanded] = useState(false);
  const progressInterval = useRef(null);
  const apiKey = 'AIzaSyDYNO8ER1AgIbhQtzRhVoVKOC1U1SQfME8'; // demo key - replace with your own

  const handleStateChange = useCallback((state) => {
    if (state === 1) { // playing
      setIsPlaying(true);
      progressInterval.current = setInterval(() => {
        if (playerRef.current?.getCurrentTime) {
          setProgress(playerRef.current.getCurrentTime());
          setDuration(playerRef.current.getDuration() || 0);
        }
      }, 500);
    } else if (state === 2) { // paused
      setIsPlaying(false);
      clearInterval(progressInterval.current);
    } else if (state === 0) { // ended
      clearInterval(progressInterval.current);
      handleNext();
    }
  }, []);

  const { player: playerRef, ready } = useYouTubePlayer(handleStateChange);

  const playTrack = useCallback((track) => {
    setCurrentTrack(track);
    setProgress(0);
    if (ready && playerRef.current?.loadVideoById) {
      playerRef.current.loadVideoById(track.id);
      playerRef.current.setVolume(volume);
    }
    // Add to library history
    setLibrary(prev => {
      const filtered = prev.filter(t => t.id !== track.id);
      return [track, ...filtered].slice(0, 50);
    });
  }, [ready, volume]);

  const playFromQueue = useCallback((tracks, index = 0) => {
    setQueue(tracks);
    setQueueIdx(index);
    playTrack(tracks[index]);
  }, [playTrack]);

  const handleNext = useCallback(() => {
    if (queue.length === 0) return;
    let nextIdx;
    if (shuffle) {
      nextIdx = Math.floor(Math.random() * queue.length);
    } else {
      nextIdx = (queueIdx + 1) % queue.length;
    }
    if (repeat && nextIdx === 0 && !shuffle) {
      playerRef.current?.seekTo(0);
      playerRef.current?.playVideo();
      return;
    }
    setQueueIdx(nextIdx);
    playTrack(queue[nextIdx]);
  }, [queue, queueIdx, shuffle, repeat, playTrack]);

  const handlePrev = useCallback(() => {
    if (progress > 3) { playerRef.current?.seekTo(0); return; }
    const prevIdx = Math.max(0, queueIdx - 1);
    setQueueIdx(prevIdx);
    if (queue[prevIdx]) playTrack(queue[prevIdx]);
  }, [queue, queueIdx, progress, playTrack]);

  const togglePlay = () => {
    if (!currentTrack) return;
    if (isPlaying) playerRef.current?.pauseVideo();
    else playerRef.current?.playVideo();
  };

  const seek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    const t = pct * duration;
    playerRef.current?.seekTo(t);
    setProgress(t);
  };

  const handleVolume = (e) => {
    const v = Number(e.target.value);
    setVolume(v);
    playerRef.current?.setVolume(v);
  };

  // Search using YouTube Data API
  const search = async (q) => {
    if (!q.trim()) return;
    setSearching(true);
    setView('search');
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(q + ' music')}&type=video&videoCategoryId=10&maxResults=20&key=${apiKey}`
      );
      const data = await res.json();
      if (data.items) {
        setResults(data.items);
        setQueue(data.items.map(i => ({
          id: i.id.videoId,
          title: i.snippet.title,
          artist: i.snippet.channelTitle,
          thumb: i.snippet.thumbnails.medium.url,
        })));
      } else {
        // Fallback: use trending if API key not valid
        setResults(TRENDING_VIDEOS);
        setQueue(TRENDING_VIDEOS);
      }
    } catch {
      setResults(TRENDING_VIDEOS);
      setQueue(TRENDING_VIDEOS);
    }
    setSearching(false);
  };

  const toggleLike = (track) => {
    setLiked(prev => {
      const exists = prev.find(t => t.id === track.id);
      if (exists) return prev.filter(t => t.id !== track.id);
      return [track, ...prev];
    });
  };

  const isLiked = currentTrack && liked.find(t => t.id === currentTrack.id);

  const fmt = (s) => {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const loadFeaturedPlaylist = (playlist) => {
    setActivePlaylist(playlist);
    setView('playlist');
  };

  return (
    <div className={styles.root}>
      {/* Hidden YT player */}
      <div id="yt-player" style={{ position: 'fixed', opacity: 0, pointerEvents: 'none', width: 1, height: 1 }} />

      {/* ── Sidebar ── */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <span className={`${styles.logoMark} syne`}>R</span>
          <span className={`${styles.logoText} syne`}>Rhythmix</span>
        </div>

        <nav className={styles.nav}>
          {[
            { id: 'home', icon: '⌂', label: 'Home' },
            { id: 'search', icon: '⌕', label: 'Search' },
            { id: 'library', icon: '♪', label: 'Library' },
          ].map(item => (
            <button key={item.id} className={`${styles.navItem} ${view === item.id ? styles.navActive : ''}`}
              onClick={() => setView(item.id)}>
              <span className={styles.navIcon}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className={styles.sideSection}>
          <p className={`${styles.sideLabel} syne`}>Liked Songs</p>
          {liked.length === 0 ? (
            <p className={styles.empty}>No liked songs yet</p>
          ) : (
            <div className={styles.likedList}>
              {liked.slice(0, 5).map(t => (
                <div key={t.id} className={styles.sideTrack} onClick={() => playFromQueue(liked, liked.indexOf(t))}>
                  <img src={t.thumb} alt={t.title} className={styles.sideThumb} />
                  <span className={styles.sideTrackTitle}>{t.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.sideSection}>
          <p className={`${styles.sideLabel} syne`}>Recent</p>
          {library.slice(0, 5).map(t => (
            <div key={t.id + Math.random()} className={styles.sideTrack} onClick={() => playTrack(t)}>
              <img src={t.thumb} alt={t.title} className={styles.sideThumb} />
              <span className={styles.sideTrackTitle}>{t.title}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className={styles.main}>
        {/* Top Bar */}
        <header className={styles.topbar}>
          <form onSubmit={(e) => { e.preventDefault(); search(query); }} className={styles.searchForm}>
            <span className={styles.searchIcon}>⌕</span>
            <input
              className={styles.searchInput}
              placeholder="Search songs, artists, albums…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => { if (results.length > 0) setView('search'); }}
            />
            {query && <button type="button" className={styles.clearBtn} onClick={() => { setQuery(''); setResults([]); setView('home'); }}>✕</button>}
          </form>
        </header>

        {/* Content Area */}
        <div className={styles.content}>

          {/* HOME VIEW */}
          {view === 'home' && (
            <div className={styles.homeView}>
              <section className={styles.section}>
                <h2 className={`${styles.sectionTitle} syne`}>Featured Playlists</h2>
                <div className={styles.featuredGrid}>
                  {FEATURED.map(pl => (
                    <div key={pl.id} className={styles.featuredCard} style={{ '--card-color': pl.color }}
                      onClick={() => loadFeaturedPlaylist(pl)}>
                      <div className={styles.featuredGlow} />
                      <span className={styles.featuredEmoji}>♫</span>
                      <div>
                        <p className={`${styles.featuredTitle} syne`}>{pl.title}</p>
                        <p className={styles.featuredDesc}>{pl.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className={styles.section}>
                <h2 className={`${styles.sectionTitle} syne`}>Trending Now</h2>
                <div className={styles.trendingGrid}>
                  {TRENDING_VIDEOS.map((v, i) => (
                    <div key={v.id} className={styles.trendingCard}
                      onClick={() => { playFromQueue(TRENDING_VIDEOS, i); }}>
                      <div className={styles.trendingThumbWrap}>
                        <img src={v.thumb} alt={v.title} className={styles.trendingThumb} />
                        <div className={styles.trendingOverlay}>
                          {currentTrack?.id === v.id ? <Equalizer playing={isPlaying} /> : <span className={styles.playOverlay}>▶</span>}
                        </div>
                      </div>
                      <p className={styles.trendingTitle}>{v.title}</p>
                      <p className={styles.trendingArtist}>{v.artist}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* SEARCH VIEW */}
          {view === 'search' && (
            <div className={styles.searchView}>
              {searching ? (
                <div className={styles.loading}>
                  <div className={styles.spinner} />
                  <p>Searching…</p>
                </div>
              ) : results.length > 0 ? (
                <>
                  <h2 className={`${styles.sectionTitle} syne`}>Results for "{query}"</h2>
                  <div className={styles.resultsList}>
                    {results.map((item, i) => (
                      <SearchResult key={i} item={item}
                        isActive={currentTrack?.id === (item.id?.videoId || item.id)}
                        onPlay={(track) => {
                          playFromQueue(
                            results.map(r => ({
                              id: r.id?.videoId || r.id,
                              title: r.snippet?.title || r.title,
                              artist: r.snippet?.channelTitle || r.artist,
                              thumb: r.snippet?.thumbnails?.medium?.url || r.thumb,
                            })),
                            i
                          );
                        }}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className={styles.searchPrompt}>
                  <p className={`${styles.searchPromptTitle} syne`}>Find your sound</p>
                  <p className={styles.searchPromptSub}>Search for any song, artist, or album</p>
                  <div className={styles.tags}>
                    {['Bollywood', 'Hip-Hop', 'Lofi', 'Pop', 'Tamil', 'K-Pop', 'Rock', 'Jazz'].map(t => (
                      <button key={t} className={styles.tag} onClick={() => { setQuery(t); search(t); }}>{t}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* PLAYLIST VIEW */}
          {view === 'playlist' && activePlaylist && (
            <div className={styles.playlistView}>
              <div className={styles.playlistHero} style={{ '--pl-color': activePlaylist.color }}>
                <div className={styles.playlistHeroGlow} />
                <span className={styles.playlistIcon}>♫</span>
                <div>
                  <p className={styles.playlistType}>PLAYLIST</p>
                  <h1 className={`${styles.playlistName} syne`}>{activePlaylist.title}</h1>
                  <p className={styles.playlistDesc}>{activePlaylist.desc}</p>
                </div>
              </div>
              <div className={styles.playlistEmbed}>
                <iframe
                  src={`https://www.youtube.com/embed/videoseries?list=${activePlaylist.id}&autoplay=0&rel=0`}
                  width="100%"
                  height="400"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ border: 'none', borderRadius: 12 }}
                />
                <p className={styles.playlistNote}>▲ Browse and play any track in this playlist. Use the player below for full controls.</p>
              </div>
            </div>
          )}

          {/* LIBRARY VIEW */}
          {view === 'library' && (
            <div className={styles.libraryView}>
              <h2 className={`${styles.sectionTitle} syne`}>Your Library</h2>

              {liked.length > 0 && (
                <div className={styles.librarySection}>
                  <h3 className={`${styles.librarySectionTitle} syne`}>❤ Liked Songs ({liked.length})</h3>
                  {liked.map((t, i) => (
                    <div key={t.id} className={`${styles.libraryTrack} ${currentTrack?.id === t.id ? styles.activeTrack : ''}`}
                      onClick={() => playFromQueue(liked, i)}>
                      <span className={styles.trackNum}>{i + 1}</span>
                      <img src={t.thumb} alt={t.title} className={styles.libraryThumb} />
                      <div className={styles.libraryTrackInfo}>
                        <span className={styles.libraryTrackTitle}>{t.title}</span>
                        <span className={styles.libraryTrackArtist}>{t.artist}</span>
                      </div>
                      {currentTrack?.id === t.id && <Equalizer playing={isPlaying} />}
                    </div>
                  ))}
                </div>
              )}

              {library.length > 0 && (
                <div className={styles.librarySection}>
                  <h3 className={`${styles.librarySectionTitle} syne`}>Recently Played ({library.length})</h3>
                  {library.map((t, i) => (
                    <div key={t.id + i} className={`${styles.libraryTrack} ${currentTrack?.id === t.id ? styles.activeTrack : ''}`}
                      onClick={() => playTrack(t)}>
                      <span className={styles.trackNum}>{i + 1}</span>
                      <img src={t.thumb} alt={t.title} className={styles.libraryThumb} />
                      <div className={styles.libraryTrackInfo}>
                        <span className={styles.libraryTrackTitle}>{t.title}</span>
                        <span className={styles.libraryTrackArtist}>{t.artist}</span>
                      </div>
                      {currentTrack?.id === t.id && <Equalizer playing={isPlaying} />}
                    </div>
                  ))}
                </div>
              )}

              {liked.length === 0 && library.length === 0 && (
                <div className={styles.emptyLibrary}>
                  <p className={`${styles.emptyTitle} syne`}>Your library is empty</p>
                  <p className={styles.emptySub}>Play songs to build your history, like tracks to save them here.</p>
                  <button className={styles.exploreBtn} onClick={() => setView('home')}>Explore Music</button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* ── Player Bar ── */}
      <footer className={`${styles.player} ${playerExpanded ? styles.playerExpanded : ''}`}>
        {currentTrack ? (
          <>
            {/* Track Info */}
            <div className={styles.playerTrack} onClick={() => setPlayerExpanded(v => !v)}>
              <img src={currentTrack.thumb} alt={currentTrack.title} className={styles.playerThumb} />
              <div className={styles.playerTrackInfo}>
                <span className={styles.playerTitle}>{currentTrack.title}</span>
                <span className={styles.playerArtist}>{currentTrack.artist}</span>
              </div>
              <button className={`${styles.likeBtn} ${isLiked ? styles.liked : ''}`}
                onClick={(e) => { e.stopPropagation(); toggleLike(currentTrack); }}>
                {isLiked ? '❤' : '♡'}
              </button>
            </div>

            {/* Controls + Progress */}
            <div className={styles.playerCenter}>
              <div className={styles.controls}>
                <button className={`${styles.ctrl} ${shuffle ? styles.ctrlActive : ''}`} onClick={() => setShuffle(v => !v)} title="Shuffle">⇄</button>
                <button className={styles.ctrl} onClick={handlePrev}>⏮</button>
                <button className={styles.playPause} onClick={togglePlay}>
                  {isPlaying ? '⏸' : '▶'}
                </button>
                <button className={styles.ctrl} onClick={handleNext}>⏭</button>
                <button className={`${styles.ctrl} ${repeat ? styles.ctrlActive : ''}`} onClick={() => setRepeat(v => !v)} title="Repeat">↺</button>
              </div>
              <div className={styles.progressRow}>
                <span className={styles.time}>{fmt(progress)}</span>
                <div className={styles.progressBar} onClick={seek}>
                  <div className={styles.progressFill} style={{ width: duration ? `${(progress / duration) * 100}%` : '0%' }} />
                  <div className={styles.progressThumb} style={{ left: duration ? `${(progress / duration) * 100}%` : '0%' }} />
                </div>
                <span className={styles.time}>{fmt(duration)}</span>
              </div>
            </div>

            {/* Volume */}
            <div className={styles.playerRight}>
              <span className={styles.volIcon}>{volume === 0 ? '🔇' : volume < 50 ? '🔉' : '🔊'}</span>
              <input type="range" min="0" max="100" value={volume} onChange={handleVolume} className={styles.volSlider} />
            </div>
          </>
        ) : (
          <div className={styles.playerEmpty}>
            <span className={styles.playerEmptyIcon}>♫</span>
            <span>Nothing playing — search or browse to start</span>
          </div>
        )}
      </footer>
    </div>
  );
}
