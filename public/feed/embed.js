/**
 * CrossLayerAI Feed Widget
 * 
 * Gaming-focused TikTok-style vertical feed
 * Discord-inspired dark theme with animated voice waveforms
 */

(function() {
  'use strict';

  const script = document.currentScript;
  const CONFIG = {
    api: script?.getAttribute('data-api') || window.CROSSLAYER_API_URL || 'http://localhost:3000',
    game: script?.getAttribute('data-game') || window.CROSSLAYER_GAME_ID || null,
    container: script?.getAttribute('data-container') || 'crosslayer-feed',
    staticData: window.CROSSLAYER_FEED_DATA || null, // Support static data without API
  };

  let state = { items: [], loading: false };

  // Gaming color palette - aligned with CrossLayerAI landing page
  const COLORS = {
    bg: '#0a0a0f',
    bgCard: '#1a1a25',
    accent: '#00f5d4',
    accentPink: '#ff2d55',
    accentPurple: '#8338ec',
    discord: '#5865f2',
    text: '#ffffff',
    textMuted: '#8a8a9a',
  };

  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    #${CONFIG.container} {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: ${COLORS.bg};
      overflow: hidden;
      height: 100%;
      position: relative;
      color: ${COLORS.text};
    }
    #${CONFIG.container} * { box-sizing: border-box; margin: 0; padding: 0; }

    /* Glassmorphism Header */
    .clf-header {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      padding: 12px 16px;
      background: linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 50%, transparent 100%);
      backdrop-filter: blur(12px);
      z-index: 20;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    .clf-logo {
      font-size: 14px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 8px;
      background: linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentPurple});
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.8));
    }
    .clf-logo-icon {
      width: 24px;
      height: 24px;
      background: linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentPurple});
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      -webkit-text-fill-color: white;
    }
    .clf-powered {
      font-size: 10px;
      color: ${COLORS.textMuted};
      text-shadow: 0 1px 3px rgba(0,0,0,0.9);
    }
    .clf-powered a {
      color: ${COLORS.accentPink};
      text-decoration: none;
      font-weight: 600;
      text-shadow: 0 1px 3px rgba(0,0,0,0.9);
    }

    /* Scroll Container */
    .clf-scroll {
      height: 100%;
      overflow-y: scroll;
      scroll-snap-type: y mandatory;
      scrollbar-width: none;
    }
    .clf-scroll::-webkit-scrollbar { display: none; }

    /* Feed Item */
    .clf-item {
      width: 100%;
      height: 100%;
      scroll-snap-align: start;
      scroll-snap-stop: always;
      position: relative;
      background: ${COLORS.bg};
      overflow: hidden;
    }

    /* Media Container */
    .clf-media {
      position: absolute;
      inset: 0;
    }
    .clf-media video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
    }
    .clf-media img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
      display: block;
      background: ${COLORS.bg};
    }

    /* Play Button */
    .clf-play {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 5;
    }
    .clf-play-icon {
      width: 72px;
      height: 72px;
      background: rgba(0,0,0,0.6);
      backdrop-filter: blur(8px);
      border: 2px solid rgba(255,255,255,0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }
    .clf-play-icon::after {
      content: '';
      border: 12px solid transparent;
      border-left: 18px solid #fff;
      margin-left: 6px;
    }
    .clf-item.playing .clf-play-icon { opacity: 0; transform: scale(0.8); }
    .clf-play:hover .clf-play-icon {
      transform: scale(1.1);
      background: rgba(0,0,0,0.8);
      border-color: ${COLORS.accent};
    }

    /* Sound Button */
    .clf-sound {
      position: absolute;
      top: 56px;
      right: 12px;
      width: 40px;
      height: 40px;
      background: rgba(0,0,0,0.6);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255,255,255,0.1);
      cursor: pointer;
      z-index: 15;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      transition: all 0.2s ease;
    }
    .clf-sound:hover {
      background: rgba(0,0,0,0.8);
      border-color: ${COLORS.accent};
    }

    /* Voice/Audio Visual */
    .clf-voice-visual {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, ${COLORS.accentPurple} 0%, ${COLORS.accentPink} 50%, ${COLORS.accent} 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 24px;
    }
    .clf-voice-avatar {
      width: 100px;
      height: 100px;
      background: rgba(255,255,255,0.15);
      backdrop-filter: blur(10px);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 48px;
      animation: voicePulse 2s ease-in-out infinite;
      border: 2px solid rgba(255,255,255,0.2);
    }
    @keyframes voicePulse {
      0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,255,255,0.3); }
      50% { transform: scale(1.05); box-shadow: 0 0 30px 10px rgba(255,255,255,0.1); }
    }
    .clf-voice-waves {
      display: flex;
      align-items: center;
      gap: 4px;
      height: 60px;
      padding: 0 32px;
    }
    .clf-voice-bar {
      width: 4px;
      background: rgba(255,255,255,0.4);
      transition: all 0.1s ease;
    }
    .clf-item.playing .clf-voice-bar {
      animation: voiceWave 0.4s ease-in-out infinite alternate;
      background: #fff;
    }
    @keyframes voiceWave {
      from { transform: scaleY(0.3); }
      to { transform: scaleY(1); }
    }
    .clf-voice-label {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(0,0,0,0.3);
      padding: 8px 16px;
      font-size: 13px;
      font-weight: 500;
    }
    .clf-mic-icon {
      font-size: 16px;
    }

    /* Bottom Info Panel */
    .clf-info {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 100px 16px 16px;
      background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 20%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.98) 100%);
      z-index: 10;
    }

    /* Header - Player & Game Tags */
    .clf-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
    }
    .clf-player-tag {
      font-size: 13px;
      font-weight: 700;
      color: ${COLORS.accent};
      background: rgba(0,245,212,0.15);
      padding: 4px 12px;
      border: 1px solid rgba(0,245,212,0.3);
    }
    .clf-game-tag {
      font-size: 12px;
      color: rgba(255,255,255,0.7);
      background: rgba(255,255,255,0.1);
      padding: 4px 10px;
    }

    /* Bot Message */
    .clf-bot-message {
      background: rgba(0,0,0,0.4);
      backdrop-filter: blur(8px);
      border-left: 3px solid ${COLORS.accentPurple};
      padding: 12px;
      margin-bottom: 12px;
    }
    .clf-bot-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: linear-gradient(135deg, ${COLORS.accentPurple}, ${COLORS.accentPink});
      padding: 3px 8px;
      font-size: 10px;
      font-weight: 600;
      margin-bottom: 8px;
    }
    .clf-message-text {
      font-size: 14px;
      line-height: 1.5;
      color: #fff;
    }
    .clf-mention { 
      color: ${COLORS.accent}; 
      font-weight: 600;
    }

    /* Reactions */
    .clf-reactions {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .clf-reaction {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 13px;
      color: rgba(255,255,255,0.9);
      background: rgba(255,255,255,0.1);
      padding: 6px 12px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .clf-reaction:hover {
      background: rgba(255,255,255,0.2);
    }
    .clf-count {
      font-size: 13px;
      font-weight: 600;
      color: #fff;
      text-shadow: 0 1px 2px rgba(0,0,0,0.8);
    }
    .clf-action:has(.liked) .clf-count {
      color: ${COLORS.accentPink};
    }

    /* No Media State */
    .clf-item.no-media {
      background: linear-gradient(135deg, ${COLORS.bgCard} 0%, ${COLORS.bg} 100%);
    }
    .clf-item.no-media .clf-info {
      position: relative;
      background: none;
      padding: 80px 20px 24px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .clf-item.no-media .clf-message { font-size: 15px; }

    /* Loading State */
    .clf-loading {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: ${COLORS.textMuted};
      gap: 12px;
    }
    .clf-spinner {
      width: 32px;
      height: 32px;
      border: 3px solid rgba(255,255,255,0.1);
      border-top-color: ${COLORS.accent};
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* Empty State */
    .clf-empty {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: ${COLORS.textMuted};
      gap: 8px;
    }
    .clf-empty-icon {
      font-size: 48px;
      opacity: 0.5;
    }

    /* YouTube Embed */
    .clf-youtube-embed {
      position: relative;
      width: 100%;
      height: 100%;
      background: #000;
    }
    .clf-youtube-embed iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: none;
    }

    /* External Video (TikTok, Twitch, etc.) */
    .clf-external-video {
      position: relative;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, ${COLORS.bg} 0%, #1a1a2e 100%);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .clf-external-thumb {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .clf-external-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      background: rgba(0,0,0,0.4);
      transition: background 0.2s;
    }
    .clf-external-video:hover .clf-external-overlay {
      background: rgba(0,0,0,0.6);
    }
    .clf-external-play {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background: rgba(255,0,0,0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      color: #fff;
      box-shadow: 0 4px 20px rgba(255,0,0,0.4);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .clf-external-video:hover .clf-external-play {
      transform: scale(1.1);
      box-shadow: 0 6px 30px rgba(255,0,0,0.6);
    }
    .clf-external-label {
      font-size: 14px;
      font-weight: 600;
      color: #fff;
      text-shadow: 0 2px 4px rgba(0,0,0,0.5);
    }

    /* Scroll Hint - Shows on first item */
    .clf-scroll-hint {
      position: absolute;
      bottom: 100px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      color: rgba(255,255,255,0.7);
      font-size: 11px;
      font-weight: 500;
      z-index: 15;
      animation: scrollHintFade 3s ease-in-out infinite;
      pointer-events: none;
    }
    .clf-scroll-hint-arrow {
      font-size: 20px;
      animation: scrollHintBounce 1.5s ease-in-out infinite;
    }
    @keyframes scrollHintBounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(8px); }
    }
    @keyframes scrollHintFade {
      0%, 100% { opacity: 0.7; }
      50% { opacity: 1; }
    }
    .clf-scroll-hint.hidden {
      opacity: 0 !important;
      transition: opacity 0.3s ease;
    }

    /* Feed Position Dots */
    .clf-dots {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      gap: 6px;
      z-index: 15;
    }
    .clf-dot {
      width: 6px;
      height: 6px;
      background: rgba(255,255,255,0.3);
      transition: all 0.3s ease;
    }
    .clf-dot.active {
      background: ${COLORS.accent};
      height: 18px;
    }

  `;

  const injectStyles = () => {
    if (document.getElementById('clf-css')) return;
    const el = document.createElement('style');
    el.id = 'clf-css';
    el.textContent = CSS;
    document.head.appendChild(el);
  };

  const highlightMentions = (text) => text.replace(/@[\w_]+/g, '<span class="clf-mention">$&</span>');

  // Detect external video URLs (YouTube, Twitch, etc.) that can't be played directly
  const isExternalVideoUrl = (url) => {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be') || 
           url.includes('twitch.tv') || url.includes('tiktok.com');
  };

  // Check if URL is YouTube
  const isYouTubeUrl = (url) => {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  // Extract YouTube video ID
  const getYouTubeId = (url) => {
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^&\s?]+)/);
    return match ? match[1] : null;
  };

  // Get YouTube embed URL
  const getYouTubeEmbedUrl = (url) => {
    const id = getYouTubeId(url);
    return id ? `https://www.youtube.com/embed/${id}?autoplay=0&rel=0&modestbranding=1` : null;
  };

  // Get YouTube thumbnail
  const getYouTubeThumbnail = (url) => {
    const id = getYouTubeId(url);
    return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : null;
  };

  // Generate voice waveform bars
  const generateWaveBars = () => {
    let bars = '';
    for (let i = 0; i < 32; i++) {
      const height = 20 + Math.random() * 60;
      bars += `<div class="clf-voice-bar" style="height:${height}%;animation-delay:${i * 0.05}s"></div>`;
    }
    return bars;
  };

  const renderItem = (item) => {
    const hasMedia = item.media?.url;
    const isVideo = item.media?.type === 'video';
    const isAudio = item.media?.type === 'audio';
    const isImage = item.media?.type === 'image';
    const isYouTube = isVideo && isYouTubeUrl(item.media?.url);
    const isOtherExternal = isVideo && !isYouTube && isExternalVideoUrl(item.media?.url);
    const ytEmbedUrl = isYouTube ? getYouTubeEmbedUrl(item.media.url) : null;
    const ytThumbnail = isOtherExternal ? getYouTubeThumbnail(item.media.url) : null;

    return `
      <div class="clf-item ${hasMedia ? '' : 'no-media'}" data-id="${item.id}" data-media-type="${item.media?.type || 'none'}">
        ${hasMedia ? `
          <div class="clf-media">
            ${isVideo 
              ? (isYouTube
                  ? `<div class="clf-youtube-embed">
                      <iframe 
                        src="${ytEmbedUrl}"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    </div>`
                  : isOtherExternal 
                    ? `<div class="clf-external-video" data-url="${item.media.url}">
                        <img src="${ytThumbnail || ''}" alt="" class="clf-external-thumb" onerror="this.style.display='none'">
                        <div class="clf-external-overlay">
                          <div class="clf-external-play">▶</div>
                          <div class="clf-external-label">Watch on External Site</div>
                        </div>
                      </div>`
                    : `<video src="${item.media.url}" loop playsinline preload="auto" muted></video>`)
              : isImage
                ? `<img src="${item.media.url}" alt="">`
                : isAudio
                  ? `
                    <div class="clf-voice-visual">
                      <div class="clf-voice-avatar">${item.botEmoji || '🎙️'}</div>
                      <div class="clf-voice-waves">${generateWaveBars()}</div>
                      <div class="clf-voice-label">
                        <span class="clf-mic-icon">🎤</span>
                        <span>Voice Message</span>
                      </div>
                      <audio src="${item.media.url}" preload="auto"></audio>
                    </div>
                  `
                  : ''
            }
          </div>
          ${isVideo && !isYouTube && !isOtherExternal ? `
            <div class="clf-play"><div class="clf-play-icon"></div></div>
            <button class="clf-sound" data-muted="true">🔇</button>
          ` : ''}
          ${isAudio ? `
            <div class="clf-play"><div class="clf-play-icon"></div></div>
          ` : ''}
        ` : ''}

        <div class="clf-info">
          <div class="clf-header">
            <span class="clf-player-tag">${item.playerName}</span>
            ${item.gameName ? `<span class="clf-game-tag">${item.gameName}</span>` : ''}
          </div>
          <div class="clf-bot-message">
            <div class="clf-bot-badge">
              <span>${item.botEmoji || '🤖'}</span>
              <span>${item.botName || 'AI'}</span>
            </div>
            <div class="clf-message-text">${highlightMentions(item.message)}</div>
          </div>
          <div class="clf-reactions">
            <span class="clf-reaction">❤️ ${item.likes || '0'}</span>
            <span class="clf-reaction">💬 ${item.comments || '0'}</span>
            <span class="clf-reaction">👁️ ${item.views || '0'}</span>
          </div>
        </div>
      </div>
    `;
  };

  const render = () => {
    const container = document.getElementById(CONFIG.container);
    if (!container) return;

    if (state.items.length === 0) {
      container.innerHTML = `
        <div class="clf-header">
          <div class="clf-logo">
            <div class="clf-logo-icon">⚡</div>
            Highlights
          </div>
          <div class="clf-powered">by <a href="https://crosslayerai.com">CrossLayerAI</a></div>
        </div>
        <div class="clf-empty">
          <div class="clf-empty-icon">🎮</div>
          <div>No highlights yet</div>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="clf-header">
        <div class="clf-logo">
          <div class="clf-logo-icon">⚡</div>
          Highlights
        </div>
        <div class="clf-powered">by <a href="https://crosslayerai.com">CrossLayerAI</a></div>
      </div>
      <div class="clf-scroll">
        ${state.items.map(renderItem).join('')}
      </div>
      ${state.items.length > 1 ? `
        <div class="clf-scroll-hint">
          <span class="clf-scroll-hint-arrow">↓</span>
          <span>Swipe for more</span>
        </div>
        <div class="clf-dots">
          ${state.items.map((_, i) => `<div class="clf-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>`).join('')}
        </div>
      ` : ''}
    `;

    // Attach handlers
    container.querySelectorAll('.clf-item').forEach(item => {
      const video = item.querySelector('video');
      const audio = item.querySelector('audio');
      const playBtn = item.querySelector('.clf-play');
      const soundBtn = item.querySelector('.clf-sound');

      const pauseOthers = () => {
        container.querySelectorAll('video').forEach(v => {
          if (v !== video) { v.pause(); v.closest('.clf-item')?.classList.remove('playing'); }
        });
        container.querySelectorAll('audio').forEach(a => {
          if (a !== audio) { a.pause(); a.closest('.clf-item')?.classList.remove('playing'); }
        });
      };

      if (video && playBtn) {
        const togglePlay = () => {
          pauseOthers();
          if (video.paused) {
            video.play();
            item.classList.add('playing');
          } else {
            video.pause();
            item.classList.remove('playing');
          }
        };
        playBtn.onclick = togglePlay;
        video.onclick = togglePlay;

        if (soundBtn) {
          soundBtn.onclick = (e) => {
            e.stopPropagation();
            video.muted = !video.muted;
            soundBtn.textContent = video.muted ? '🔇' : '🔊';
          };
        }
      }

      if (audio && playBtn) {
        const toggleAudio = () => {
          pauseOthers();
          if (audio.paused) {
            audio.play();
            item.classList.add('playing');
          } else {
            audio.pause();
            item.classList.remove('playing');
          }
        };
        playBtn.onclick = toggleAudio;
      }

      // Handle external video links (YouTube, etc.)
      const externalVideo = item.querySelector('.clf-external-video');
      if (externalVideo) {
        externalVideo.onclick = () => {
          const url = externalVideo.dataset.url;
          if (url) window.open(url, '_blank');
        };
      }

      const likeBtn = item.querySelector('[data-action="like"]');
      if (likeBtn) {
        likeBtn.onclick = () => {
          likeBtn.classList.toggle('liked');
        };
      }
    });

    // Auto-pause on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) {
          const v = e.target.querySelector('video');
          const a = e.target.querySelector('audio');
          if (v) v.pause();
          if (a) a.pause();
          e.target.classList.remove('playing');
        }
      });
    }, { threshold: 0.5 });
    container.querySelectorAll('.clf-item').forEach(i => observer.observe(i));

    // Scroll hint and position dots
    const scrollContainer = container.querySelector('.clf-scroll');
    const items = container.querySelectorAll('.clf-item');
    const scrollHint = container.querySelector('.clf-scroll-hint');
    const dots = container.querySelectorAll('.clf-dot');
    
    // Hide scroll hint after first scroll
    if (scrollContainer && scrollHint) {
      let hasScrolled = false;
      scrollContainer.addEventListener('scroll', () => {
        if (!hasScrolled && scrollContainer.scrollTop > 50) {
          hasScrolled = true;
          scrollHint.classList.add('hidden');
        }
      }, { passive: true });
    }

    // Update position dots based on visible item
    if (scrollContainer && dots.length > 0) {
      const dotObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const index = Array.from(items).indexOf(e.target);
            dots.forEach((dot, i) => {
              dot.classList.toggle('active', i === index);
            });
          }
        });
      }, { threshold: 0.6 });
      items.forEach(item => dotObserver.observe(item));
    }

    // No auto-loop - user must manually scroll back to beginning
  };

  const fetchFeed = async () => {
    if (state.loading) return;
    state.loading = true;

    // Use static data if provided (for static hosting like GitHub Pages)
    // Re-read from window in case it was updated dynamically
    const staticData = window.CROSSLAYER_FEED_DATA || CONFIG.staticData;
    if (staticData) {
      state.items = staticData;
      state.loading = false;
      return;
    }

    try {
      const url = CONFIG.game ? `${CONFIG.api}/api/feed/${CONFIG.game}` : `${CONFIG.api}/api/feed`;
      const res = await fetch(url);
      const json = await res.json();
      if (json.success) state.items = json.data.items || [];
    } catch (e) {
      console.error('Feed error:', e);
    }
    state.loading = false;
  };

  const init = async () => {
    injectStyles();
    const container = document.getElementById(CONFIG.container);
    if (!container) return;

    container.innerHTML = `
      <div class="clf-header">
        <div class="clf-logo">
          <div class="clf-logo-icon">⚡</div>
          Highlights
        </div>
      </div>
      <div class="clf-loading">
        <div class="clf-spinner"></div>
        <div>Loading highlights...</div>
      </div>
    `;

    await fetchFeed();
    render();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose global API
  window.CrossLayerFeed = { 
    refresh: async (scrollToTop = false) => {
      await init();
      // Only scroll to top if requested (e.g., when new content is added)
      if (scrollToTop) {
        const container = document.querySelector('.clf-scroll');
        if (container) {
          container.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }
  };
})();
