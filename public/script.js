// 完全靜態版
const allSongs = [
  { title: "エガクミライ", artist: "It's MyGo!!!!!", file: "https://raw.githubusercontent.com/InyTw/maybe-like-spotify-lah/main/songs/エガクミライ.mp3" },
  { title: "Song Two", artist: "Artist B", file: "https://raw.githubusercontent.com/InyTw/maybe-like-spotify-lah/main/songs/song2.mp3" }
];

let filteredSongs = allSongs.slice();
let currentIndex = -1;
let shuffleMode = false;
let repeatMode = 0;

// ---------- 渲染歌曲 ----------
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

// ---------- 播放歌曲 ----------
function playSong(index) {
  if (index < 0 || index >= filteredSongs.length) return;
  currentIndex = index;
  const song = filteredSongs[currentIndex];
  const audio = document.getElementById("audio");
  const nowPlaying = document.getElementById("now-playing");

  audio.src = song.file;
  audio.play().catch(err => console.log("播放錯誤:", err));
  nowPlaying.textContent = `▶️ ${song.title} - ${song.artist}`;
  updateQueue();
}

// ---------- 更新播放清單 ----------
function updateQueue() {
  const queueList = document.getElementById("queue-list");
  queueList.innerHTML = "";
  for (let i = currentIndex + 1; i < filteredSongs.length; i++) {
    const li = document.createElement("li");
    li.textContent = `${filteredSongs[i].title} - ${filteredSongs[i].artist}`;
    li.onclick = () => playSong(i);
    queueList.appendChild(li);
  }
  if (queueList.innerHTML === "") queueList.innerHTML = "<li>(沒有下一首)</li>";
}

// ---------- 搜尋 ----------
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
searchInput.addEventListener("keydown", (e) => { if (e.key === "Enter" && filteredSongs.length > 0) playSong(0); });

// ---------- 上一首/下一首/隨機/重複 ----------
document.getElementById("prev").addEventListener("click", () => { if (currentIndex > 0) playSong(currentIndex - 1); });
document.getElementById("next").addEventListener("click", () => {
  if (shuffleMode) playRandomSong();
  else if (currentIndex < filteredSongs.length - 1) playSong(currentIndex + 1);
  else if (repeatMode === 1) playSong(0);
});
document.getElementById("shuffle").addEventListener("click", () => {
  shuffleMode = !shuffleMode;
  document.getElementById("shuffle").textContent = shuffleMode ? "✅ 隨機" : "🔀 隨機";
});
document.getElementById("repeat").addEventListener("click", () => {
  repeatMode = (repeatMode + 1) % 3;
  const btn = document.getElementById("repeat");
  if (repeatMode === 0) btn.textContent = "🔁 關閉";
  if (repeatMode === 1) btn.textContent = "🔁 全部";
  if (repeatMode === 2) btn.textContent = "🔂 單曲";
});
document.getElementById("audio").addEventListener("ended", () => {
  if (repeatMode === 2) playSong(currentIndex);
  else if (shuffleMode) playRandomSong();
  else if (currentIndex < filteredSongs.length - 1) playSong(currentIndex + 1);
  else if (repeatMode === 1) playSong(0);
});
function playRandomSong() {
  if (filteredSongs.length <= 1) return;
  let nextIndex;
  do { nextIndex = Math.floor(Math.random() * filteredSongs.length); } while (nextIndex === currentIndex);
  playSong(nextIndex);
}

// ---------- 落葉 ----------
function createLeaf() {
  const leaf = document.createElement('div');
  leaf.className = 'leaf';
  leaf.style.left = Math.random() * window.innerWidth + 'px';
  leaf.style.animationDuration = (5 + Math.random() * 10) + 's';
  leaf.style.transform = `rotate(${Math.random() * 360}deg)`;
  document.body.appendChild(leaf);
  setTimeout(() => leaf.remove(), 15000);
}
setInterval(createLeaf, 500);

// ---------- 初始化 ----------
renderSongs(allSongs);
updateQueue();
