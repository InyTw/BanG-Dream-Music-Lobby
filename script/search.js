// Navbar 動畫效果
    const navbar = document.getElementById('navbar');
    navbar.style.opacity = '0';
    navbar.style.transition = 'opacity 0.8s cubic-bezier(.4,2,.6,1)';
    window.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => { navbar.style.opacity = '1'; }, 100);
    });
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        navbar.style.background = 'rgba(58,141,222,0.92)';
        navbar.style.boxShadow = '0 4px 24px #3a8dde88';
      } else {
        navbar.style.background = '';
        navbar.style.boxShadow = '';
      }
    });

    // 本地 meme 圖片搜尋功能
    const searchInput = document.getElementById('meme-search');
    const resultsSection = document.getElementById('meme-results');
    // 預設所有圖片檔案（可自動擴充）
    const memeFiles = [
  '為什麼要演奏穿日影.jpg',
  '現在正是復權的時刻.jpg'
    ];

    function renderMemes(list) {
      if (list.length > 0) {
        resultsSection.innerHTML = list.map(f =>
          `<div class="meme-img-wrap">`
          + `<img src="meme/${encodeURIComponent(f)}" alt="${f}" class="meme-img">`
          + `<div class="meme-caption">${f.replace(/\.[^.]+$/, '')}</div>`
          + `<button class="meme-download-btn" data-filename="${encodeURIComponent(f)}" data-src="meme/${encodeURIComponent(f)}">下載</button>`
          + `</div>`
        ).join('');
        setTimeout(() => {
          document.querySelectorAll('.meme-download-btn').forEach(btn => {
            btn.onclick = function() {
              const filename = decodeURIComponent(this.getAttribute('data-filename'));
              const src = this.getAttribute('data-src');
              const a = document.createElement('a');
              a.href = src;
              a.download = filename;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            };
          });
        }, 0);
      } else {
        resultsSection.innerHTML = '<div style="color:#fff">找不到相關梗圖</div>';
      }
    }

    function searchMemes(keyword) {
      const q = keyword.trim();
      if (!q) {
        renderMemes(memeFiles);
        return;
      }
      resultsSection.innerHTML = '<div style="color:#fff">搜尋中...</div>';
      const found = memeFiles.filter(f => f.includes(q));
      renderMemes(found);
    }

    // 頁面載入時預設顯示所有圖片
    renderMemes(memeFiles);

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        searchMemes(searchInput.value);
      }
    });