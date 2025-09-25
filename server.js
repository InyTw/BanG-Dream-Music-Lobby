import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// 靜態檔案 (前端)
app.use(express.static(path.join(__dirname, "public")));

// 讀取歌曲清單
app.get("/api/songs", (req, res) => {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, "data/songs.json")));
  res.json(data);
});

// 音樂檔
app.use("/songs", express.static(path.join(__dirname, "songs")));

app.listen(PORT, () => {
  console.log(`🎶 Mini Spotify running at http://localhost:${PORT}`);
});
