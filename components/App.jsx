'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './App.module.css';

// ─── Song Data ───────────────────────────────────────────────────────────────
const SONGS = {
  trending: [
    { id: 'JGwWNGJdvx8', title: 'Shape of You', artist: 'Ed Sheeran', album: 'Divide', genre: 'Pop' },
    { id: 'kTJczUoc26U', title: 'Señorita', artist: 'Shawn Mendes & Camila Cabello', album: 'Señorita', genre: 'Pop' },
    { id: 'OPf0YbXqDm0', title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', album: 'Uptown Special', genre: 'Pop' },
    { id: 'nfWlot6h_JM', title: 'Shake It Off', artist: 'Taylor Swift', album: '1989', genre: 'Pop' },
    { id: 'SlPhMPnQ58k', title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', genre: 'Pop' },
    { id: 'ZbZSe6N_BXs', title: 'Happy', artist: 'Pharrell Williams', album: 'G I R L', genre: 'Pop' },
    { id: 'bo_efYSyea0', title: 'Sorry', artist: 'Justin Bieber', album: 'Purpose', genre: 'Pop' },
    { id: '09R8_2nJtjg', title: 'Sugar', artist: 'Maroon 5', album: 'V', genre: 'Pop' },
    { id: 'nS2oNq02E48', title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', genre: 'R&B' },
    { id: 'PT2_F-1esPk', title: 'Unstoppable', artist: 'Sia', album: 'This Is Acting', genre: 'Pop' },
    { id: 'YqeW9_5kURI', title: 'Perfect', artist: 'Ed Sheeran', album: 'Divide', genre: 'Pop' },
    { id: 'hT_nvWreIhg', title: 'Counting Stars', artist: 'OneRepublic', album: 'Native', genre: 'Pop Rock' },
    { id: 'RgKAFK5djSk', title: 'See You Again', artist: 'Wiz Khalifa ft. Charlie Puth', album: 'Furious 7', genre: 'Hip-Hop' },
    { id: 'fHI8X4OXluQ', title: 'Astronaut In The Ocean', artist: 'Masked Wolf', album: 'Astronomical', genre: 'Hip-Hop' },
    { id: 'CevxZvSJLk8', title: 'Roar', artist: 'Katy Perry', album: 'PRISM', genre: 'Pop' },
    { id: '7wtfhZwyrcc', title: 'Stressed Out', artist: 'Twenty One Pilots', album: 'Blurryface', genre: 'Alternative' },
    { id: 'TUVcZfQe-Kw', title: 'Closer', artist: 'The Chainsmokers ft. Halsey', album: 'Closer', genre: 'Electronic' },
    { id: 'uelHwf8o7_U', title: 'Bad Guy', artist: 'Billie Eilish', album: 'WWAFAWIA', genre: 'Pop' },
    { id: 'pRpeEdMmmQ0', title: 'Happier', artist: 'Marshmello & Bastille', album: 'Happier', genre: 'Electronic' },
    { id: 'ZAl1sKAbFZ0', title: 'Old Town Road', artist: 'Lil Nas X ft. Billy Ray Cyrus', album: '7', genre: 'Country Rap' },
  ],
  bollywood: [
    { id: 'reIOoKhTHU8', title: 'Kesariya', artist: 'Arijit Singh', album: 'Brahmāstra', genre: 'Bollywood' },
    { id: 'BddP6PYo2gs', title: 'Tum Hi Ho', artist: 'Arijit Singh', album: 'Aashiqui 2', genre: 'Bollywood' },
    { id: 'pMsDDJqCGSY', title: 'Raataan Lambiyan', artist: 'Jubin Nautiyal', album: 'Shershaah', genre: 'Bollywood' },
    { id: 'YVNKFaZBArM', title: 'Chaleya', artist: 'Arijit Singh & Shilpa Rao', album: 'Jawan', genre: 'Bollywood' },
    { id: 'AHJOKyDFDHM', title: 'Bekhayali', artist: 'Sachet Tandon', album: 'Kabir Singh', genre: 'Bollywood' },
    { id: 'lSUCqkWH_Q0', title: 'Dil Diyan Gallan', artist: 'Atif Aslam', album: 'Tiger Zinda Hai', genre: 'Bollywood' },
    { id: '1wJP4m3rOJI', title: 'Apna Bana Le', artist: 'Arijit Singh', album: 'Bhediya', genre: 'Bollywood' },
    { id: 'JVxkr7QPYHY', title: 'Ik Vaari Aa', artist: 'Arijit Singh', album: 'Raabta', genre: 'Bollywood' },
    { id: 'pMF_RdCDpgI', title: 'Hawayein', artist: 'Arijit Singh', album: 'Jab Harry Met Sejal', genre: 'Bollywood' },
    { id: 'WNIPqafd4As', title: 'Ghungroo', artist: 'Arijit Singh & Shilpa Rao', album: 'War', genre: 'Bollywood' },
    { id: 'Umqb9KENgmk', title: 'Tera Ban Jaunga', artist: 'Akhil Sachdeva', album: 'Kabir Singh', genre: 'Bollywood' },
    { id: 'wCBzE3Cgl5Q', title: 'Shayad', artist: 'Arijit Singh', album: 'Love Aaj Kal', genre: 'Bollywood' },
    { id: 'tQ5AKxjJGoI', title: 'Chaiyya Chaiyya', artist: 'Sukhwinder Singh', album: 'Dil Se', genre: 'Bollywood' },
    { id: 'yPx3gxiYRsM', title: 'Kabhi Khushi Kabhie Gham', artist: 'Lata Mangeshkar', album: 'K3G', genre: 'Bollywood' },
    { id: 'lp-EJB2TBlE', title: 'Dil Chahta Hai', artist: 'Shankar Mahadevan', album: 'Dil Chahta Hai', genre: 'Bollywood' },
  ],
  hiphop: [
    { id: 'YVkUvmDQ3HY', title: 'HUMBLE.', artist: 'Kendrick Lamar', album: 'DAMN.', genre: 'Hip-Hop' },
    { id: 'IHNzOHi8sJs', title: "God's Plan", artist: 'Drake', album: 'Scorpion', genre: 'Hip-Hop' },
    { id: 'QjvzCTqkBDQ', title: 'Rockstar', artist: 'Post Malone ft. 21 Savage', album: 'Beerbongs & Bentleys', genre: 'Hip-Hop' },
    { id: '6ONRf7h3Mdk', title: 'SICKO MODE', artist: 'Travis Scott', album: 'Astroworld', genre: 'Hip-Hop' },
    { id: 'CvUa5lDXYnU', title: 'Sunflower', artist: 'Post Malone & Swae Lee', album: 'Spider-Man', genre: 'Hip-Hop' },
    { id: '6JnGBs88sL0', title: 'Lucid Dreams', artist: 'Juice WRLD', album: 'Goodbye & Good Riddance', genre: 'Hip-Hop' },
    { id: 'jFEGinsHWYE', title: 'XO Tour Llif3', artist: 'Lil Uzi Vert', album: 'Luv Is Rage 2', genre: 'Hip-Hop' },
    { id: 'bpOSxM0UIJ4', title: 'Hotline Bling', artist: 'Drake', album: 'If Youre Reading This', genre: 'Hip-Hop' },
    { id: 'ZAl1sKAbFZ0', title: 'Old Town Road', artist: 'Lil Nas X', album: '7', genre: 'Hip-Hop' },
    { id: 'Q0oIoR9mLPs', title: 'Rap God', artist: 'Eminem', album: 'MMLP2', genre: 'Hip-Hop' },
    { id: '4NRXx6U8ekM', title: 'Mask Off', artist: 'Future', album: 'Future', genre: 'Hip-Hop' },
    { id: 'e-ORhEE9VVg', title: 'Bad and Boujee', artist: 'Migos ft. Lil Uzi Vert', album: 'Culture', genre: 'Hip-Hop' },
  ],
  tamil: [
    { id: 'tgbNymZ7vqY', title: 'Arabic Kuthu', artist: 'Anirudh Ravichander', album: 'Beast', genre: 'Tamil' },
    { id: 'vo6JBJ7QFBQ', title: 'Rowdy Baby', artist: 'Dhanush & Dhee', album: 'Maari 2', genre: 'Tamil' },
    { id: 'hIPBaB3UPRA', title: 'Kaavaalaa', artist: 'Anirudh Ravichander', album: 'Jailer', genre: 'Tamil' },
    { id: 'ZS7BSzK7HLs', title: 'Naatu Naatu', artist: 'Rahul Sipligunj', album: 'RRR', genre: 'Tamil' },
    { id: 'P8RgTFOhMpw', title: 'Kannaana Kanney', artist: 'D. Imman', album: 'Viswasam', genre: 'Tamil' },
    { id: 'OO7anCFdRro', title: 'Enjoy Enjaami', artist: 'Dhee ft. Arivu', album: 'Enjoy Enjaami', genre: 'Tamil' },
    { id: 'MZmPe5FXUKY', title: 'Vaathi Coming', artist: 'Anirudh Ravichander', album: 'Master', genre: 'Tamil' },
    { id: 'YR1BXJyFpZQ', title: 'Surviva', artist: 'Anirudh Ravichander', album: 'Vivegam', genre: 'Tamil' },
    { id: 'LCmFY-BCZWY', title: 'Mersalaayitten', artist: 'A.R. Rahman', album: 'I', genre: 'Tamil' },
    { id: 'ZzMFJ8WSAP4', title: 'Aalaporan Tamizhan', artist: 'A.R. Rahman', album: 'Mersal', genre: 'Tamil' },
    { id: '8PNFKpLFDno', title: 'Chumma Kizhi', artist: 'Anirudh Ravichander', album: 'Pattas', genre: 'Tamil' },
    { id: 'mhqSzqJumPE', title: 'Single Pasanga', artist: 'Anirudh Ravichander', album: 'Vignesh Shivan', genre: 'Tamil' },
  ],
  kpop: [
    { id: 'gdZLi9oWNZg', title: 'Dynamite', artist: 'BTS', album: 'BE', genre: 'K-Pop' },
    { id: 'XsX3ATc3FbA', title: 'Boy With Luv', artist: 'BTS ft. Halsey', album: 'Map of the Soul', genre: 'K-Pop' },
    { id: '9bZkp7q19f0', title: 'GANGNAM STYLE', artist: 'PSY', album: 'PSY 6', genre: 'K-Pop' },
    { id: 'MBdVXkSdhwU', title: 'Psycho', artist: 'Red Velvet', album: 'The ReVe Festival', genre: 'K-Pop' },
    { id: 'R3vsTVJxGfQ', title: 'How You Like That', artist: 'BLACKPINK', album: 'The Album', genre: 'K-Pop' },
    { id: 'pSudEWBAYRE', title: 'DNA', artist: 'BTS', album: 'Love Yourself', genre: 'K-Pop' },
    { id: '7C2z4GqqS5E', title: 'Kill This Love', artist: 'BLACKPINK', album: 'Kill This Love', genre: 'K-Pop' },
    { id: 'WPdwvef-QHs', title: 'Fake Love', artist: 'BTS', album: 'Love Yourself: Tear', genre: 'K-Pop' },
    { id: 'mPVDGOVjRQ0', title: 'Ddu-Du Ddu-Du', artist: 'BLACKPINK', album: 'Square Up', genre: 'K-Pop' },
    { id: 'uNMYRgT4ous', title: 'Lovesick Girls', artist: 'BLACKPINK', album: 'The Album', genre: 'K-Pop' },
    { id: '0-q1KafFCLU', title: 'Spring Day', artist: 'BTS', album: 'You Never Walk Alone', genre: 'K-Pop' },
    { id: 'WyiIGEHQP8o', title: 'Permission to Dance', artist: 'BTS', album: 'Butter', genre: 'K-Pop' },
  ],
  lofi: [
    { id: '5qap5aO4i9A', title: 'Lofi Hip Hop Radio', artist: 'Lofi Girl', album: 'Chill Beats', genre: 'Lofi' },
    { id: 'DWcJFNfaw9c', title: 'Study Music Alpha Waves', artist: 'YellowBrickCinema', album: 'Focus', genre: 'Lofi' },
    { id: 'n61ULEU7CO0', title: 'Chill Lofi Study Beats', artist: 'The Bootleg Boy', album: 'Lo-Fi Beats', genre: 'Lofi' },
    { id: 'jfKfPfyJRdk', title: 'Lofi Hip Hop Mix', artist: 'Lofi Girl', album: 'Beats to Relax', genre: 'Lofi' },
    { id: 'Na0w3Mz46GA', title: 'Coffee Shop Lofi', artist: 'Lofi Geek', album: 'Morning Coffee', genre: 'Lofi' },
    { id: 'lTRiuFIWV54', title: 'Late Night Lofi', artist: 'Chillhop Music', album: 'Late Night', genre: 'Lofi' },
    { id: '4xDzrJKXOOY', title: 'Synthwave Radio', artist: 'Lofi Girl', album: 'Synthwave', genre: 'Lofi' },
    { id: 'MDpuGEiNnh0', title: 'Rainy Day Lofi', artist: 'ChilledCow', album: 'Rain Beats', genre: 'Lofi' },
  ],
};

const GENRES = [
  { key: 'trending', label: 'Trending',  emoji: '🔥', color: '#ff4757' },
  { key: 'bollywood', label: 'Bollywood', emoji: '🎬', color: '#ffa502' },
  { key: 'hiphop',   label: 'Hip-Hop',   emoji: '🎤', color: '#8b5cf6' },
  { key: 'tamil',    label: 'Tamil',     emoji: '🌟', color: '#06b6d4' },
  { key: 'kpop',     label: 'K-Pop',     emoji: '✨', color: '#ec4899' },
  { key: 'lofi',     label: 'Lofi',      emoji: '🎧', color: '#10b981' },
];

const thumb = (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
const fmt   = (s)  => {
  if (!s || isNaN(s)) return '0:00';
  return `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`;
};
const getColor = (id) => {
  const PALETTE = ['#ff4757','#ffa502','#8b5cf6','#06b6d4','#ec4899','#10b981','#f59e0b','#3b82f6','#ef4444','#14b8a6'];
  let h = 0;
  for (let c of id) h = c.charCodeAt(0) + ((h << 5) - h);
  return PALETTE[Math.abs(h) % PALETTE.length];
};

// ─── Audio Visualizer (CSS-based, reacts to play state) ─────────────────────
function Visualizer({ playing, color }) {
  const bars = Array.from({ length: 32 }, (_, i) => i);
  return (
    <div className={styles.visualizer}>
      {bars.map(i => (
        <div key={i} className={`${styles.vBar} ${playing ? styles.vBarActive : ''}`}
          style={{
            '--delay': `${(i * 0.04) % 0.8}s`,
            '--height': `${20 + Math.sin(i * 0.8) * 40 + Math.cos(i * 0.5) * 20}%`,
            '--color': color,
          }} />
      ))}
    </div>
  );
}

// ─── Ambient Background (reacts to song color) ───────────────────────────────
function AmbientBg({ color, playing }) {
  return (
    <div className={styles.ambient}>
      <div className={`${styles.ambientOrb} ${styles.ambientOrb1} ${playing ? styles.ambientPlaying : ''}`}
        style={{ '--c': color }} />
      <div className={`${styles.ambientOrb} ${styles.ambientOrb2} ${playing ? styles.ambientPlaying : ''}`}
        style={{ '--c': color }} />
      <div className={`${styles.ambientOrb} ${styles.ambientOrb3} ${playing ? styles.ambientPlaying : ''}`}
        style={{ '--c': color }} />
    </div>
  );
}

// ─── Mini EQ ─────────────────────────────────────────────────────────────────
function EQ({ active, color = '#ff4757' }) {
  return (
    <div className={styles.eq} style={{ '--eq-color': color }}>
      {[0,1,2,3].map(i => (
        <span key={i} className={`${styles.eqBar} ${active ? styles.eqActive : ''}`}
          style={{ animationDelay: `${i * 0.12}s` }} />
      ))}
    </div>
  );
}

// ─── Song Card ────────────────────────────────────────────────────────────────
function SongCard({ song, isActive, isPlaying, onPlay, onLike, liked, onOpenPage }) {
  const color = getColor(song.id);
  return (
    <div className={`${styles.songCard} ${isActive ? styles.songCardActive : ''}`}
      style={{ '--cc': color }}>
      <div className={styles.cardThumb} onClick={() => onPlay(song)}>
        <img src={thumb(song.id)} alt={song.title} className={styles.cardThumbImg} />
        <div className={styles.cardOverlay}>
          {isActive && isPlaying ? <EQ active color="#fff" /> : <span className={styles.cardPlay}>▶</span>}
        </div>
        {isActive && <div className={styles.cardGlowBar} style={{ background: color }} />}
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardTitleRow}>
          <span className={styles.cardTitle} style={isActive ? { color } : {}}
            onClick={() => onOpenPage(song)}>{song.title}</span>
          <button className={`${styles.cardHeart} ${liked ? styles.cardHeartOn : ''}`}
            style={liked ? { color } : {}} onClick={() => onLike(song)}>
            {liked ? '♥' : '♡'}
          </button>
        </div>
        <span className={styles.cardArtist}>{song.artist}</span>
        <span className={styles.cardGenre}>{song.genre}</span>
      </div>
    </div>
  );
}

// ─── Song Row ─────────────────────────────────────────────────────────────────
function SongRow({ song, index, isActive, isPlaying, onPlay, onLike, liked, onOpenPage }) {
  const color = getColor(song.id);
  return (
    <div className={`${styles.songRow} ${isActive ? styles.songRowActive : ''}`}
      style={isActive ? { '--rc': color } : {}} onClick={() => onPlay(song)}>
      <div className={styles.rowNum}>
        {isActive ? <EQ active={isPlaying} color={color} /> : <span className={styles.rowNumText}>{index + 1}</span>}
      </div>
      <img src={thumb(song.id)} alt={song.title} className={styles.rowThumb} onClick={e => { e.stopPropagation(); onOpenPage(song); }} />
      <div className={styles.rowInfo}>
        <span className={styles.rowTitle} style={isActive ? { color } : {}}>{song.title}</span>
        <span className={styles.rowArtist}>{song.artist}</span>
      </div>
      <span className={styles.rowGenre}>{song.genre}</span>
      <button className={`${styles.rowHeart} ${liked ? styles.rowHeartOn : ''}`}
        style={liked ? { color } : {}}
        onClick={e => { e.stopPropagation(); onLike(song); }}>
        {liked ? '♥' : '♡'}
      </button>
    </div>
  );
}

// ─── Parse LRC lyrics from lrclib ────────────────────────────────────────────
function parseLrc(lrc) {
  if (!lrc) return [];
  const lines = lrc.split('\n');
  const result = [];
  const timeRe = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/g;
  for (const line of lines) {
    const text = line.replace(/\[.*?\]/g, '').trim();
    if (!text) continue;
    let match;
    timeRe.lastIndex = 0;
    while ((match = timeRe.exec(line)) !== null) {
      const mins = parseInt(match[1]);
      const secs = parseInt(match[2]);
      const ms   = parseInt(match[3].padEnd(3, '0'));
      result.push({ time: mins * 60 + secs + ms / 1000, text });
    }
  }
  return result.sort((a, b) => a.time - b.time);
}

// ─── Lyrics Hook (lrclib.net) ─────────────────────────────────────────────────
function useLyrics(song) {
  const [lines,   setLines]   = useState([]);
  const [status,  setStatus]  = useState('idle'); // idle | loading | ok | notfound | error
  const lastKey = useRef('');

  useEffect(() => {
    if (!song) return;
    // Clean artist: strip features/ft./x collaborators for better matching
    const artistClean = song.artist.split(/\s*(?:ft\.?|feat\.?|&|x\s)\s*/i)[0].trim();
    const key = `${song.title}__${artistClean}`;
    if (key === lastKey.current) return;
    lastKey.current = key;

    setLines([]);
    setStatus('loading');

    const url = `https://lrclib.net/api/get?artist_name=${encodeURIComponent(artistClean)}&track_name=${encodeURIComponent(song.title)}`;

    fetch(url)
      .then(r => {
        if (r.status === 404) { setStatus('notfound'); return null; }
        if (!r.ok) throw new Error('Network error');
        return r.json();
      })
      .then(data => {
        if (!data) return;
        const parsed = parseLrc(data.syncedLyrics || data.plainLyrics);
        if (parsed.length) {
          setLines(parsed);
          setStatus('ok');
        } else if (data.plainLyrics) {
          // Plain lyrics — no timestamps, show as static lines
          const plain = data.plainLyrics.split('\n')
            .map((text, i) => ({ time: -1, text: text.trim() }))
            .filter(l => l.text);
          setLines(plain);
          setStatus('plain');
        } else {
          setStatus('notfound');
        }
      })
      .catch(() => setStatus('error'));
  }, [song]);

  return { lines, status };
}

// ─── Lyrics Panel ─────────────────────────────────────────────────────────────
function LyricsPanel({ song, progress, color, isPlaying }) {
  const { lines, status } = useLyrics(song);
  const containerRef = useRef(null);
  const activeRef    = useRef(null);
  const isSynced = lines.length > 0 && lines[0].time >= 0;

  // Find active line index
  const activeIdx = isSynced
    ? lines.reduce((best, line, i) => line.time <= progress ? i : best, -1)
    : -1;

  // Auto-scroll active line into center
  useEffect(() => {
    if (!isSynced || !activeRef.current || !containerRef.current) return;
    const container = containerRef.current;
    const el        = activeRef.current;
    const offset    = el.offsetTop - container.clientHeight / 2 + el.clientHeight / 2;
    container.scrollTo({ top: offset, behavior: 'smooth' });
  }, [activeIdx, isSynced]);

  return (
    <div className={styles.lyricsPanel}>
      <div className={styles.lyricsPanelHeader}>
        <span className={styles.lyricsPanelIcon}>♪</span>
        <span className={styles.lyricsPanelTitle}>Lyrics</span>
        {status === 'ok'    && <span className={styles.lyricsBadge} style={{ background: `${color}33`, color }}>Synced</span>}
        {status === 'plain' && <span className={styles.lyricsBadge} style={{ background: `${color}33`, color }}>Static</span>}
      </div>

      {status === 'loading' && (
        <div className={styles.lyricsState}>
          <div className={styles.lyricsSpinner} style={{ borderTopColor: color }} />
          <p>Fetching lyrics…</p>
        </div>
      )}

      {status === 'notfound' && (
        <div className={styles.lyricsState}>
          <span className={styles.lyricsStateIcon}>♩</span>
          <p className={styles.lyricsStateTitle}>No lyrics found</p>
          <p className={styles.lyricsStateSub}>Try searching a different version of this song</p>
        </div>
      )}

      {status === 'error' && (
        <div className={styles.lyricsState}>
          <span className={styles.lyricsStateIcon}>⚠</span>
          <p className={styles.lyricsStateTitle}>Couldn't load lyrics</p>
          <p className={styles.lyricsStateSub}>Check your internet connection</p>
        </div>
      )}

      {(status === 'ok' || status === 'plain') && (
        <div className={styles.lyricsScroll} ref={containerRef}>
          {lines.map((line, i) => {
            const isActive  = isSynced && i === activeIdx;
            const isPast    = isSynced && i < activeIdx;
            const isFuture  = isSynced && i > activeIdx;
            return (
              <p key={i}
                ref={isActive ? activeRef : null}
                className={`${styles.lyricLine}
                  ${isActive  ? styles.lyricLineActive  : ''}
                  ${isPast    ? styles.lyricLinePast    : ''}
                  ${isFuture  ? styles.lyricLineFuture  : ''}
                  ${!isSynced ? styles.lyricLineStatic  : ''}`}
                style={isActive ? { color, textShadow: `0 0 30px ${color}88` } : {}}>
                {line.text}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Song Page (Full Screen) ──────────────────────────────────────────────────
function SongPage({ song, isPlaying, progress, duration, volume, shuffle, repeat, autoplay,
  onTogglePlay, onNext, onPrev, onSeek, onVolume, onShuffle, onRepeat, onAutoplay,
  onLike, isLiked, onClose, queue, qIdx, onPlayFromQueue, theme }) {
  const color = getColor(song.id);

  return (
    <div className={`${styles.songPage} ${styles[theme]}`} style={{ '--sp': color }}>
      <AmbientBg color={color} playing={isPlaying} />
      <Visualizer playing={isPlaying} color={color} />
      <button className={styles.spClose} onClick={onClose}>✕</button>

      <div className={styles.spLayout}>

        {/* ── Col 1: Art + Controls ── */}
        <div className={styles.spLeft}>
          <div className={styles.spArtWrap} style={{ boxShadow: `0 0 80px ${color}66, 0 0 160px ${color}22` }}>
            <img src={thumb(song.id)} alt={song.title} className={styles.spArt}
              style={{ animation: isPlaying ? 'spSpin 20s linear infinite' : 'none' }} />
            <div className={styles.spArtRing} style={{ borderColor: `${color}88`,
              animation: isPlaying ? 'ringPulse 2s ease-in-out infinite' : 'none' }} />
          </div>

          <div className={styles.spInfo}>
            <h1 className={styles.spTitle}>{song.title}</h1>
            <p className={styles.spArtist}>{song.artist}</p>
            <p className={styles.spAlbum}>{song.album} · {song.genre}</p>
          </div>

          <div className={styles.spMeta}>
            <button className={`${styles.spLike} ${isLiked ? styles.spLikeOn : ''}`}
              style={isLiked ? { color, borderColor: color } : {}} onClick={() => onLike(song)}>
              {isLiked ? '♥ Liked' : '♡ Like'}
            </button>
            <button className={`${styles.spAutoplay} ${autoplay ? styles.spAutoplayOn : ''}`}
              style={autoplay ? { color, borderColor: color } : {}} onClick={onAutoplay}>
              ⟳ {autoplay ? 'Autoplay ON' : 'Autoplay OFF'}
            </button>
          </div>

          <div className={styles.spProgressSection}>
            <div className={styles.spProgressBar} onClick={onSeek}>
              <div className={styles.spProgressFill} style={{ width: duration ? `${(progress/duration)*100}%` : '0%', background: color }} />
              <div className={styles.spProgressDot} style={{ left: duration ? `${(progress/duration)*100}%` : '0%', background: color }} />
            </div>
            <div className={styles.spTimes}><span>{fmt(progress)}</span><span>{fmt(duration)}</span></div>
          </div>

          <div className={styles.spControls}>
            <button className={`${styles.spCtrl} ${shuffle ? styles.spCtrlOn : ''}`}
              style={shuffle ? { color } : {}} onClick={onShuffle}>⇄</button>
            <button className={styles.spCtrlLg} onClick={onPrev}>⏮</button>
            <button className={styles.spPlayBtn}
              style={{ background: color, boxShadow: `0 0 40px ${color}88` }} onClick={onTogglePlay}>
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button className={styles.spCtrlLg} onClick={onNext}>⏭</button>
            <button className={`${styles.spCtrl} ${repeat ? styles.spCtrlOn : ''}`}
              style={repeat ? { color } : {}} onClick={onRepeat}>↺</button>
          </div>

          <div className={styles.spVolume}>
            <span className={styles.spVolIcon}>{volume === 0 ? '🔇' : volume < 50 ? '🔉' : '🔊'}</span>
            <input type="range" min="0" max="100" value={volume} onChange={onVolume}
              className={styles.spVolSlider} style={{ '--vp': `${volume}%`, '--vc': color }} />
          </div>
        </div>

        {/* ── Col 2: Live Lyrics ── */}
        <LyricsPanel song={song} progress={progress} color={color} isPlaying={isPlaying} />

        {/* ── Col 3: Queue ── */}
        <div className={styles.spRight}>
          <h3 className={styles.spQueueTitle}>Up Next</h3>
          <div className={styles.spQueue}>
            {queue.map((s, i) => {
              const qColor = getColor(s.id);
              return (
                <div key={s.id + i}
                  className={`${styles.spQueueItem} ${i === qIdx ? styles.spQueueItemActive : ''}`}
                  style={i === qIdx ? { '--qc': qColor } : {}}
                  onClick={() => onPlayFromQueue(i)}>
                  <img src={thumb(s.id)} alt={s.title} className={styles.spQueueThumb} />
                  <div className={styles.spQueueInfo}>
                    <span className={styles.spQueueTitle2} style={i === qIdx ? { color: qColor } : {}}>{s.title}</span>
                    <span className={styles.spQueueArtist}>{s.artist}</span>
                  </div>
                  {i === qIdx && <EQ active={isPlaying} color={qColor} />}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [theme,    setTheme]    = useState('dark');
  const [view,     setView]     = useState('home');
  const [genre,    setGenre]    = useState('trending');
  const [query,    setQuery]    = useState('');
  const [results,  setResults]  = useState([]);
  const [current,  setCurrent]  = useState(null);
  const [isPlaying,setIsPlaying]= useState(false);
  const [volume,   setVolume]   = useState(80);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [queue,    setQueue]    = useState([]);
  const [qIdx,     setQIdx]     = useState(0);
  const [liked,    setLiked]    = useState([]);
  const [shuffle,  setShuffle]  = useState(false);
  const [repeat,   setRepeat]   = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [songPage, setSongPage] = useState(null); // song object or null
  const [ytReady,  setYtReady]  = useState(false);

  const ytRef   = useRef(null);
  const tick    = useRef(null);
  const queueRef   = useRef(queue);
  const qIdxRef    = useRef(qIdx);
  const shuffleRef = useRef(shuffle);
  const repeatRef  = useRef(repeat);
  const autoplayRef= useRef(autoplay);

  // Keep refs in sync so callbacks always see latest values
  useEffect(() => { queueRef.current   = queue;    }, [queue]);
  useEffect(() => { qIdxRef.current    = qIdx;     }, [qIdx]);
  useEffect(() => { shuffleRef.current = shuffle;  }, [shuffle]);
  useEffect(() => { repeatRef.current  = repeat;   }, [repeat]);
  useEffect(() => { autoplayRef.current= autoplay; }, [autoplay]);

  // ── Init YouTube Player ────────────────────────────────────────────────────
  useEffect(() => {
    const onReady = () => {
      setYtReady(true);
      ytRef.current.setVolume(80);
    };
    const onStateChange = (e) => {
      const state = e.data;
      if (state === 1) { // playing
        setIsPlaying(true);
        clearInterval(tick.current);
        tick.current = setInterval(() => {
          if (ytRef.current?.getCurrentTime) {
            setProgress(ytRef.current.getCurrentTime() || 0);
            setDuration(ytRef.current.getDuration()    || 0);
          }
        }, 300);
      } else if (state === 2) { // paused
        setIsPlaying(false);
        clearInterval(tick.current);
      } else if (state === 0) { // ended
        clearInterval(tick.current);
        // Use refs so this always has fresh data
        if (repeatRef.current) {
          ytRef.current?.seekTo(0);
          ytRef.current?.playVideo();
        } else if (autoplayRef.current) {
          playNextFromRef();
        }
      }
    };

    const init = () => {
      ytRef.current = new window.YT.Player('yt-hidden', {
        height: '1', width: '1',
        playerVars: { autoplay: 0, controls: 0, rel: 0, fs: 0, modestbranding: 1, iv_load_policy: 3 },
        events: { onReady, onStateChange },
      });
    };

    if (window.YT?.Player) { init(); return; }
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
    window.onYouTubeIframeAPIReady = init;
    return () => {
      clearInterval(tick.current);
      window.onYouTubeIframeAPIReady = null;
    };
  }, []);

  // ── Play next using refs (works inside YT callback) ───────────────────────
  const playNextFromRef = useCallback(() => {
    const q   = queueRef.current;
    const idx = qIdxRef.current;
    if (!q.length) return;
    let next;
    if (shuffleRef.current) {
      next = Math.floor(Math.random() * q.length);
    } else {
      next = (idx + 1) % q.length;
    }
    setQIdx(next);
    qIdxRef.current = next;
    const song = q[next];
    setCurrent(song);
    setSongPage(prev => prev ? song : null); // update song page if open
    setProgress(0);
    if (ytRef.current?.loadVideoById) {
      ytRef.current.loadVideoById(song.id);
    }
  }, []);

  // ── Play song ─────────────────────────────────────────────────────────────
  const playSong = useCallback((song, newQueue, idx) => {
    setCurrent(song);
    setProgress(0);
    if (newQueue !== undefined) {
      setQueue(newQueue);
      setQIdx(idx ?? 0);
      queueRef.current  = newQueue;
      qIdxRef.current   = idx ?? 0;
    }
    if (ytRef.current?.loadVideoById) {
      ytRef.current.loadVideoById(song.id);
      ytRef.current.setVolume(volume);
    }
  }, [volume]);

  // ── Next / Prev ───────────────────────────────────────────────────────────
  const goNext = useCallback(() => {
    const q   = queueRef.current;
    const idx = qIdxRef.current;
    if (!q.length) return;
    const next = shuffle ? Math.floor(Math.random() * q.length) : (idx + 1) % q.length;
    setQIdx(next);
    qIdxRef.current = next;
    playSong(q[next]);
  }, [shuffle, playSong]);

  const goPrev = useCallback(() => {
    if (progress > 3) { ytRef.current?.seekTo(0); return; }
    const q   = queueRef.current;
    const idx = qIdxRef.current;
    const prev = Math.max(0, idx - 1);
    setQIdx(prev);
    qIdxRef.current = prev;
    if (q[prev]) playSong(q[prev]);
  }, [progress, playSong]);

  const togglePlay = () => {
    if (!current) return;
    isPlaying ? ytRef.current?.pauseVideo() : ytRef.current?.playVideo();
  };

  const seek = (e) => {
    const pct = (e.clientX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth;
    const t = pct * duration;
    ytRef.current?.seekTo(t);
    setProgress(t);
  };

  const handleVolume = (e) => {
    const v = +e.target.value;
    setVolume(v);
    ytRef.current?.setVolume(v);
  };

  const toggleLike = (song) => {
    setLiked(prev => prev.find(s => s.id === song.id)
      ? prev.filter(s => s.id !== song.id)
      : [song, ...prev]);
  };

  const isLikedFn = (id) => liked.some(s => s.id === id);

  // ── Search ─────────────────────────────────────────────────────────────────
  const apiKey = 'AIzaSyDYNO8ER1AgIbhQtzRhVoVKOC1U1SQfME8';
  const doSearch = async (q) => {
    if (!q.trim()) return;
    setView('search');
    try {
      const res  = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(q+' song audio')}&type=video&videoCategoryId=10&maxResults=30&key=${apiKey}`);
      const data = await res.json();
      if (data.items?.length) {
        setResults(data.items.filter(i => i.id?.videoId).map(i => ({
          id:     i.id.videoId,
          title:  i.snippet.title.replace(/\(Official.*?\)/gi,'').replace(/\[.*?\]/gi,'').trim(),
          artist: i.snippet.channelTitle.replace(' - Topic','').replace('VEVO','').trim(),
          album: '', genre: 'Search',
        })));
      } else {
        fallbackSearch(q);
      }
    } catch { fallbackSearch(q); }
  };
  const fallbackSearch = (q) => {
    const all = Object.values(SONGS).flat();
    setResults(all.filter(s => s.title.toLowerCase().includes(q.toLowerCase()) || s.artist.toLowerCase().includes(q.toLowerCase())));
  };

  const curColor  = current ? getColor(current.id) : '#ff4757';
  const curGenre  = GENRES.find(g => g.key === genre);
  const songList  = view === 'search' ? results : view === 'liked' ? liked : SONGS[genre] || [];

  // ── Update document title ─────────────────────────────────────────────────
  useEffect(() => {
    if (current) document.title = `${current.title} — Rhythmix`;
    else document.title = 'Rhythmix — Music for the Bold';
  }, [current]);

  return (
    <div className={`${styles.root} ${styles[theme]}`}>
      <div id="yt-hidden" style={{ position:'fixed', width:1, height:1, opacity:0, pointerEvents:'none' }} />

      {/* ── Full Screen Song Page ── */}
      {songPage && (
        <SongPage
          song={songPage}
          isPlaying={isPlaying}
          progress={progress}
          duration={duration}
          volume={volume}
          shuffle={shuffle}
          repeat={repeat}
          autoplay={autoplay}
          queue={queue}
          qIdx={qIdx}
          theme={theme}
          isLiked={isLikedFn(songPage.id)}
          onTogglePlay={togglePlay}
          onNext={goNext}
          onPrev={goPrev}
          onSeek={seek}
          onVolume={handleVolume}
          onShuffle={() => setShuffle(v => !v)}
          onRepeat={() => setRepeat(v => !v)}
          onAutoplay={() => setAutoplay(v => !v)}
          onLike={toggleLike}
          onClose={() => setSongPage(null)}
          onPlayFromQueue={(i) => { setQIdx(i); qIdxRef.current = i; playSong(queue[i]); setSongPage(queue[i]); }}
        />
      )}

      {/* ── Sidebar ── */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <div className={styles.logoIcon} style={{ background: curColor }}>♫</div>
          <span className={styles.logoText}>Rhythmix</span>
        </div>
        <nav className={styles.nav}>
          {[{v:'home',i:'⌂',l:'Discover'},{v:'search',i:'⌕',l:'Search'},{v:'liked',i:'♥',l:'Liked'}].map(n=>(
            <button key={n.v} className={`${styles.navBtn} ${view===n.v?styles.navBtnActive:''}`}
              style={view===n.v?{'--nb':curColor}:{}} onClick={()=>setView(n.v)}>
              <span className={styles.navIcon}>{n.i}</span><span>{n.l}</span>
            </button>
          ))}
        </nav>
        <div className={styles.genreList}>
          <p className={styles.genreListLabel}>Genres</p>
          {GENRES.map(g=>(
            <button key={g.key}
              className={`${styles.genreBtn} ${genre===g.key&&view==='home'?styles.genreBtnActive:''}`}
              style={genre===g.key&&view==='home'?{'--gb':g.color}:{}}
              onClick={()=>{setGenre(g.key);setView('home');}}>
              <span>{g.emoji}</span><span>{g.label}</span>
              <span className={styles.genreCount}>{SONGS[g.key]?.length}</span>
            </button>
          ))}
        </div>
        {liked.length>0&&(
          <div className={styles.sideRecent}>
            <p className={styles.sideRecentLabel}>Recently Liked</p>
            {liked.slice(0,4).map(s=>(
              <div key={s.id} className={styles.sideItem}
                onClick={()=>{playSong(s,liked,liked.indexOf(s));setSongPage(s);}}>
                <img src={thumb(s.id)} alt={s.title} className={styles.sideItemThumb}/>
                <div className={styles.sideItemInfo}>
                  <span className={styles.sideItemTitle}>{s.title}</span>
                  <span className={styles.sideItemArtist}>{s.artist}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* ── Main ── */}
      <div className={styles.main}>
        <header className={styles.topbar}>
          <form className={styles.searchBar} onSubmit={e=>{e.preventDefault();doSearch(query);}}>
            <span className={styles.searchIcon}>⌕</span>
            <input className={styles.searchInput} placeholder="Search any song or artist…"
              value={query} onChange={e=>setQuery(e.target.value)}/>
            {query&&<button type="button" className={styles.searchClear} onClick={()=>{setQuery('');setView('home');}}>✕</button>}
          </form>
          <button className={styles.themeBtn} onClick={()=>setTheme(t=>t==='dark'?'light':'dark')}>
            {theme==='dark'?'☀':'☾'}
          </button>
        </header>

        <div className={styles.content}>

          {/* HOME */}
          {view==='home'&&(
            <div className={styles.homeView}>
              <div className={styles.hero} style={{'--hc':curGenre?.color||'#ff4757'}}>
                <div className={styles.heroGlow}/>
                <div className={styles.heroText}>
                  <p className={styles.heroLabel}>{curGenre?.emoji} {curGenre?.label}</p>
                  <h1 className={styles.heroTitle}>
                    {genre==='trending'?'Hot Right Now':genre==='bollywood'?'Bollywood Beats':
                     genre==='hiphop'?'Hip-Hop Essentials':genre==='tamil'?'Tamil Chartbusters':
                     genre==='kpop'?'K-Pop Universe':'Lofi Chill Zone'}
                  </h1>
                  <p className={styles.heroMeta}>{SONGS[genre]?.length} songs</p>
                  <button className={styles.heroPlay} style={{background:curGenre?.color}}
                    onClick={()=>{const s=SONGS[genre];playSong(s[0],s,0);setSongPage(s[0]);}}>▶ Play All</button>
                </div>
              </div>
              <div className={styles.pills}>
                {GENRES.map(g=>(
                  <button key={g.key}
                    className={`${styles.pill} ${genre===g.key?styles.pillActive:''}`}
                    style={genre===g.key?{background:g.color,borderColor:g.color,color:'#fff'}:{}}
                    onClick={()=>setGenre(g.key)}>{g.emoji} {g.label}</button>
                ))}
              </div>
              <div className={styles.cardGrid}>
                {SONGS[genre]?.map((s,i)=>(
                  <SongCard key={s.id} song={s} isActive={current?.id===s.id} isPlaying={isPlaying}
                    onPlay={song=>{playSong(song,SONGS[genre],i);}}
                    onLike={toggleLike} liked={isLikedFn(s.id)}
                    onOpenPage={song=>{playSong(song,SONGS[genre],i);setSongPage(song);}}/>
                ))}
              </div>
              <div className={styles.listSection}>
                <h2 className={styles.listTitle}>Full List</h2>
                <div className={styles.listHeader}><span>#</span><span>Song</span><span>Genre</span><span></span></div>
                {SONGS[genre]?.map((s,i)=>(
                  <SongRow key={s.id+i} song={s} index={i} isActive={current?.id===s.id}
                    isPlaying={isPlaying} onPlay={song=>{playSong(song,SONGS[genre],i);}}
                    onLike={toggleLike} liked={isLikedFn(s.id)}
                    onOpenPage={song=>{playSong(song,SONGS[genre],i);setSongPage(song);}}/>
                ))}
              </div>
            </div>
          )}

          {/* SEARCH */}
          {view==='search'&&(
            <div className={styles.searchView}>
              {results.length>0?(
                <>
                  <h2 className={styles.listTitle}>Results for "{query}"</h2>
                  <div className={styles.cardGrid}>
                    {results.map((s,i)=>(
                      <SongCard key={s.id} song={s} isActive={current?.id===s.id} isPlaying={isPlaying}
                        onPlay={song=>{playSong(song,results,i);}}
                        onLike={toggleLike} liked={isLikedFn(s.id)}
                        onOpenPage={song=>{playSong(song,results,i);setSongPage(song);}}/>
                    ))}
                  </div>
                </>
              ):(
                <div className={styles.empty}>
                  <span className={styles.emptyIcon}>⌕</span>
                  <h2 className={styles.emptyTitle}>Find your sound</h2>
                  <p className={styles.emptySub}>Search any song, artist, or album</p>
                  <div className={styles.tagCloud}>
                    {['Arijit Singh','Drake','BTS','Anirudh','Taylor Swift','The Weeknd','Dua Lipa','Eminem','AR Rahman','Atif Aslam'].map(t=>(
                      <button key={t} className={styles.tag} onClick={()=>{setQuery(t);doSearch(t);}}>{t}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* LIKED */}
          {view==='liked'&&(
            <div className={styles.likedView}>
              <div className={styles.likedHero} style={{'--lc':curColor}}>
                <div className={styles.likedGlow}/>
                <span className={styles.likedIcon}>♥</span>
                <div>
                  <h1 className={styles.likedTitle}>Liked Songs</h1>
                  <p className={styles.likedMeta}>{liked.length} songs</p>
                  {liked.length>0&&<button className={styles.likedPlay} style={{background:curColor}}
                    onClick={()=>{playSong(liked[0],liked,0);setSongPage(liked[0]);}}>▶ Play All</button>}
                </div>
              </div>
              {liked.length===0?(
                <div className={styles.empty}>
                  <span className={styles.emptyIcon}>♡</span>
                  <h2 className={styles.emptyTitle}>No liked songs yet</h2>
                  <p className={styles.emptySub}>Tap ♡ on any song to save it here</p>
                  <button className={styles.emptyBtn} onClick={()=>setView('home')}>Browse Music</button>
                </div>
              ):liked.map((s,i)=>(
                <SongRow key={s.id} song={s} index={i} isActive={current?.id===s.id}
                  isPlaying={isPlaying} onPlay={song=>{playSong(song,liked,i);}}
                  onLike={toggleLike} liked
                  onOpenPage={song=>{playSong(song,liked,i);setSongPage(song);}}/>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Bottom Player Bar ── */}
      <footer className={styles.player} style={{'--pc':curColor}}>
        <div className={styles.playerGlow} style={{background:`linear-gradient(90deg,${curColor}22,transparent)`}}/>
        {current?(
          <>
            <div className={styles.pTrack} onClick={()=>setSongPage(current)} style={{cursor:'pointer'}}>
              <div className={styles.pArt} style={{boxShadow:`0 0 20px ${curColor}55`}}>
                <img src={thumb(current.id)} alt={current.title} className={styles.pArtImg}/>
                {isPlaying&&<div className={styles.pArtRing} style={{borderColor:curColor}}/>}
              </div>
              <div className={styles.pInfo}>
                <span className={styles.pTitle}>{current.title}</span>
                <span className={styles.pArtist}>{current.artist}</span>
              </div>
              <button className={`${styles.pHeart} ${isLikedFn(current.id)?styles.pHeartOn:''}`}
                style={isLikedFn(current.id)?{color:curColor}:{}}
                onClick={e=>{e.stopPropagation();toggleLike(current);}}>
                {isLikedFn(current.id)?'♥':'♡'}
              </button>
            </div>
            <div className={styles.pCenter}>
              <div className={styles.pBtns}>
                <button className={`${styles.pCtrl} ${shuffle?styles.pCtrlOn:''}`}
                  style={shuffle?{color:curColor}:{}} onClick={()=>setShuffle(v=>!v)} title="Shuffle">⇄</button>
                <button className={styles.pCtrl} onClick={goPrev}>⏮</button>
                <button className={styles.pPlay}
                  style={{background:curColor,boxShadow:`0 0 20px ${curColor}77`}} onClick={togglePlay}>
                  {isPlaying?'⏸':'▶'}
                </button>
                <button className={styles.pCtrl} onClick={goNext}>⏭</button>
                <button className={`${styles.pCtrl} ${repeat?styles.pCtrlOn:''}`}
                  style={repeat?{color:curColor}:{}} onClick={()=>setRepeat(v=>!v)} title="Repeat">↺</button>
              </div>
              <div className={styles.pProgress}>
                <span className={styles.pTime}>{fmt(progress)}</span>
                <div className={styles.pTrackBar} onClick={seek}>
                  <div className={styles.pFill} style={{width:duration?`${(progress/duration)*100}%`:'0%',background:curColor}}/>
                  <div className={styles.pDot} style={{left:duration?`${(progress/duration)*100}%`:'0%',background:curColor}}/>
                </div>
                <span className={styles.pTime}>{fmt(duration)}</span>
              </div>
            </div>
            <div className={styles.pRight}>
              <button className={`${styles.pAutoplayBtn} ${autoplay?styles.pAutoplayOn:''}`}
                style={autoplay?{color:curColor}:{}} onClick={()=>setAutoplay(v=>!v)} title="Autoplay">⟳</button>
              <span className={styles.pVol}>{volume===0?'🔇':volume<50?'🔉':'🔊'}</span>
              <input type="range" min="0" max="100" value={volume} className={styles.pVolSlider}
                style={{'--vp':`${volume}%`,'--vc':curColor}}
                onChange={handleVolume}/>
            </div>
          </>
        ):(
          <div className={styles.pEmpty}>
            <span className={styles.pEmptyNote}>♫</span>
            <span>Pick a song to start listening</span>
          </div>
        )}
      </footer>
    </div>
  );
}
