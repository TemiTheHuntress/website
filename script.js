const bootTime = new Date();
const uptimeNode = document.querySelector("#uptime");
const yearNode = document.querySelector("#year");

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

updateUptime();
window.setInterval(updateUptime, 1000);
