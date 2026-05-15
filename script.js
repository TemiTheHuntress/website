const bootTime = new Date();
const uptimeNode = document.querySelector("#uptime");
const yearNode = document.querySelector("#year");
const feedNode = document.querySelector("#terminal-feed");
const signalNode = document.querySelector("#signal");
const copeNode = document.querySelector("#cope");
const bugsNode = document.querySelector("#bugs");
const canvas = document.querySelector("#data-rain");
const context = canvas?.getContext("2d");

const logLines = [
  "booting TemiNet personal uplink...",
  "mounting /projects: success, mostly",
  "scanning abandoned folders: too many",
  "loading sarcasm module: online",
  "checking Cloudflare Pages: please clap",
  "routing bad ideas through neon filter",
  "warning: confidence exceeds test coverage",
  "deploy target: static files with delusions",
  "status: operational enough"
];

let feedIndex = 0;
let rainColumns = [];

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

function updateUptime() {
  if (!uptimeNode) return;

  const elapsedSeconds = Math.max(0, Math.floor((Date.now() - bootTime.getTime()) / 1000));
  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;
  const paddedSeconds = String(seconds).padStart(2, "0");

  uptimeNode.textContent = `${minutes}:${paddedSeconds} since refresh`;
}

function writeFeed() {
  if (!feedNode) return;

  const nextLine = `> ${logLines[feedIndex % logLines.length]}`;
  const currentLines = feedNode.textContent.split("\n").filter(Boolean).slice(-8);

  feedNode.textContent = [...currentLines, nextLine].join("\n");
  feedIndex += 1;
}

function updateTelemetry() {
  if (signalNode) signalNode.textContent = `${88 + Math.floor(Math.random() * 10)}%`;
  if (copeNode) copeNode.textContent = `${52 + Math.floor(Math.random() * 35)}%`;
  if (bugsNode) bugsNode.textContent = String(Math.floor(Math.random() * 9));
}

function resizeRain() {
  if (!canvas || !context) return;

  const pixelRatio = window.devicePixelRatio || 1;
  canvas.width = Math.floor(window.innerWidth * pixelRatio);
  canvas.height = Math.floor(window.innerHeight * pixelRatio);
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

  const columnCount = Math.ceil(window.innerWidth / 18);
  rainColumns = Array.from({ length: columnCount }, () => Math.random() * window.innerHeight);
}

function drawRain() {
  if (!canvas || !context) return;

  context.fillStyle = "rgba(5, 6, 10, 0.08)";
  context.fillRect(0, 0, window.innerWidth, window.innerHeight);
  context.fillStyle = "rgba(184, 255, 61, 0.65)";
  context.font = "14px Cascadia Mono, Consolas, monospace";

  rainColumns.forEach((y, index) => {
    const character = Math.random() > 0.5 ? "1" : "0";
    const x = index * 18;
    context.fillText(character, x, y);
    rainColumns[index] = y > window.innerHeight + 20 ? 0 : y + 18;
  });

  window.requestAnimationFrame(drawRain);
}

updateUptime();
writeFeed();
updateTelemetry();
window.setInterval(updateUptime, 1000);
window.setInterval(writeFeed, 1500);
window.setInterval(updateTelemetry, 1800);

if (context && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  resizeRain();
  drawRain();
  window.addEventListener("resize", resizeRain);
}
