const audio = document.getElementById("audio");
const playBtn = document.getElementById("play-pause");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const volumeSlider = document.getElementById("volume");

let allSongs = [], filteredSongs = [], currentIndex = -1;
let shuffleMode = false, repeatMode = 0;

// 讀取 songs.json
fetch('../data/songs.json')
  .then(res => res.json())
  .then(data => { allSongs = data; filteredSongs = allSongs.slice(); updateQueue(); })
  .catch(err => console.error(err));

function playSong(index){
  if(index < 0 || index >= filteredSongs.length) return;
  currentIndex = index;
  const song = filteredSongs[currentIndex];
  audio.src = song.file;
  audio.play().catch(err=>console.log(err));
  document.getElementById("now-playing").textContent = `▶ ${song.title} - ${song.artist}`;
  updateQueue();
  playBtn.textContent = "⏸";
}

playBtn.addEventListener("click", ()=>{
  if(audio.paused && currentIndex >=0){ audio.play(); playBtn.textContent="⏸"; }
  else{ audio.pause(); playBtn.textContent="▶"; }
});

function updateQueue(){
  const queueList = document.getElementById("queue-list");
  queueList.innerHTML="";
  filteredSongs.forEach((song,i)=>{
    const li = document.createElement("li");
    li.textContent = song.title;
    li.setAttribute("data-artist", song.artist);
    li.onclick = ()=>playSong(i);
    if(i===currentIndex) li.classList.add("playing");
    queueList.appendChild(li);
  });
  const currentLi = queueList.querySelector(".playing");
  if(currentLi) currentLi.scrollIntoView({behavior:"smooth", block:"center"});
}

// 搜尋
document.getElementById("search").addEventListener("input",e=>{
  const keyword = e.target.value.toLowerCase();
  filteredSongs = allSongs.filter(s=>s.title.toLowerCase().includes(keyword) || s.artist.toLowerCase().includes(keyword));
  updateQueue();
});
document.getElementById("search").addEventListener("keydown", e=>{ if(e.key==="Enter" && filteredSongs.length>0) playSong(0); });

// 控制按鈕
document.getElementById("prev").addEventListener("click", ()=>{ if(currentIndex>0) playSong(currentIndex-1); });
document.getElementById("next").addEventListener("click", ()=>{ if(shuffleMode) playRandomSong(); else if(currentIndex<filteredSongs.length-1) playSong(currentIndex+1); else if(repeatMode===1) playSong(0); });
document.getElementById("shuffle").addEventListener("click", ()=>{ shuffleMode=!shuffleMode; document.getElementById("shuffle").textContent=shuffleMode?"✅":"🔀"; });
document.getElementById("repeat").addEventListener("click", ()=>{ repeatMode=(repeatMode+1)%3; document.getElementById("repeat").textContent=repeatMode===0?"🔁 關閉":repeatMode===1?"🔁 全部":"🔂 單曲"; });

audio.addEventListener("ended", ()=>{ if(repeatMode===2) playSong(currentIndex); else if(shuffleMode) playRandomSong(); else if(currentIndex<filteredSongs.length-1) playSong(currentIndex+1); else if(repeatMode===1) playSong(0); });
function playRandomSong(){ if(filteredSongs.length<=1) return; let next; do{next=Math.floor(Math.random()*filteredSongs.length);}while(next===currentIndex); playSong(next); }

// 進度條
audio.addEventListener("timeupdate", ()=>{ progress.style.width=(audio.currentTime/audio.duration*100)+"%"; });
progressContainer.addEventListener("click", e=>{ const rect=progressContainer.getBoundingClientRect(); audio.currentTime=((e.clientX-rect.left)/rect.width)*audio.duration; });

// 音量
volumeSlider.addEventListener("input", e=>{ audio.volume=e.target.value; });

// 落葉效果
function createLeaf(){ const leaf=document.createElement('div'); leaf.className='leaf'; leaf.style.left=Math.random()*window.innerWidth+'px'; leaf.style.animationDuration=(5+Math.random()*10)+'s'; leaf.style.transform=`rotate(${Math.random()*360}deg)`; document.body.appendChild(leaf); setTimeout(()=>leaf.remove(),15000); }
setInterval(createLeaf,500);

updateQueue();


function playSong(index){
  if(index < 0 || index >= filteredSongs.length) return;
  currentIndex = index;
  const song = filteredSongs[currentIndex];
  audio.src = song.file;
  audio.play().catch(err=>console.log("播放錯誤:", err));

  // 更新畫面
  const nowPlayingText = `▶️ ${song.title} - ${song.artist}`;
  document.getElementById("now-playing").textContent = nowPlayingText;

  document.title = `${song.title} - ${song.artist}`;

  updateQueue();
}


const timeDisplay = document.getElementById("time-display");

audio.addEventListener("timeupdate", () => {
  const current = formatTime(audio.currentTime);
  const duration = formatTime(audio.duration);
  timeDisplay.textContent = `${current} / ${duration}`;

  // 更新進度條
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = percent + "%";
});

function formatTime(sec) {
  if (isNaN(sec)) return "00:00";
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
