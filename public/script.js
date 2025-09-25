let allSongs = [];
let filteredSongs = [];
let currentIndex = -1;
let shuffleMode = false;
let repeatMode = 0; // 0=關閉, 1=全部, 2=單曲

async function loadSongs() {
  const res = await fetch("/api/songs");
  allSongs = await res.json();
  filteredSongs = allSongs;
  renderSongs(allSongs);
}

function renderSongs(songs) {
  const list = document.getElementById("song-list");
  list.innerHTML = "";

  songs.forEach((song, i) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.onclick = () => playSong(i);
    list.appendChild(li);
  });
}

function playSong(index) {
  if (index < 0 || index >= filteredSongs.length) return;

  currentIndex = index;
  const song = filteredSongs[currentIndex];
  const audio = document.getElementById("audio");
  const nowPlaying = document.getElementById("now-playing");

  audio.src = `/songs/${song.file}`;
  audio.play();
  nowPlaying.textContent = `▶️ ${song.title} - ${song.artist}`;

  updateQueue();
}

// 更新播放清單顯示
function updateQueue() {
  const queueList = document.getElementById("queue-list");
  queueList.innerHTML = "";

  for (let i = currentIndex + 1; i < filteredSongs.length; i++) {
    const li = document.createElement("li");
    li.textContent = `${filteredSongs[i].title} - ${filteredSongs[i].artist}`;
    li.onclick = () => playSong(i); // 點擊 queue 也能跳播
    queueList.appendChild(li);
  }

  if (queueList.innerHTML === "") {
    queueList.innerHTML = "<li>(沒有下一首)</li>";
  }
}

// 搜尋功能
const searchInput = document.getElementById("search");
searchInput.addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase();
  filteredSongs = allSongs.filter(song =>
    song.title.toLowerCase().includes(keyword) ||
    song.artist.toLowerCase().includes(keyword)
  );
  renderSongs(filteredSongs);
  updateQueue();
});

// Enter → 播放第一首
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && filteredSongs.length > 0) {
    playSong(0);
  }
});

// 上一首
document.getElementById("prev").addEventListener("click", () => {
  if (currentIndex > 0) playSong(currentIndex - 1);
});

// 下一首
document.getElementById("next").addEventListener("click", () => {
  if (shuffleMode) {
    playRandomSong();
  } else if (currentIndex < filteredSongs.length - 1) {
    playSong(currentIndex + 1);
  } else if (repeatMode === 1) {
    playSong(0); // 循環回第一首
  }
});

// 隨機播放切換
document.getElementById("shuffle").addEventListener("click", () => {
  shuffleMode = !shuffleMode;
  document.getElementById("shuffle").textContent = shuffleMode ? "✅ 隨機" : "🔀 隨機";
});

// 重複播放切換
document.getElementById("repeat").addEventListener("click", () => {
  repeatMode = (repeatMode + 1) % 3;
  const btn = document.getElementById("repeat");
  if (repeatMode === 0) btn.textContent = "🔁 關閉";
  if (repeatMode === 1) btn.textContent = "🔁 全部";
  if (repeatMode === 2) btn.textContent = "🔂 單曲";
});

// 自動播下一首 or 重複
document.getElementById("audio").addEventListener("ended", () => {
  if (repeatMode === 2) {
    playSong(currentIndex); // 單曲循環
  } else if (shuffleMode) {
    playRandomSong();
  } else if (currentIndex < filteredSongs.length - 1) {
    playSong(currentIndex + 1);
  } else if (repeatMode === 1) {
    playSong(0); // 全部循環
  }
});

// 隨機選一首
function playRandomSong() {
  if (filteredSongs.length <= 1) return;
  let nextIndex;
  do {
    nextIndex = Math.floor(Math.random() * filteredSongs.length);
  } while (nextIndex === currentIndex);
  playSong(nextIndex);
}

loadSongs();

// ---------- 落葉效果 ----------
function createLeaf() {
  const leaf = document.createElement('div');
  leaf.className = 'leaf';
  leaf.style.left = Math.random() * window.innerWidth + 'px';
  leaf.style.animationDuration = (5 + Math.random() * 10) + 's';
  leaf.style.transform = `rotate(${Math.random()*360}deg)`;
  document.body.appendChild(leaf);

  // 動畫結束後移除
  setTimeout(() => {
    leaf.remove();
  }, 15000);
}

// 每隔 500ms 生成一片落葉
setInterval(createLeaf, 500);
