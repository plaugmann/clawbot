const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode");
const qrcodeTerminal = require("qrcode-terminal");
const express = require("express");
const { findBestMatch, GREETING } = require("./chatbot");

const PORT = process.env.PORT || 3000;
const ALLOWED_CHAT = "NVIDIA GTC chat";
const app = express();

let currentQr = null;
let botStatus = "Starter op...";
const debugLog = [];
function addDebug(msg) { debugLog.unshift(new Date().toISOString().slice(11,19) + " " + msg); if (debugLog.length > 20) debugLog.pop(); }

app.get("/", async (req, res) => {
  let qrImage = "";
  if (currentQr) {
    qrImage = await qrcode.toDataURL(currentQr);
  }
  res.send(`<!DOCTYPE html>
<html><head>
  <title>ClawBot - GTC 2026</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="refresh" content="5">
  <style>
    body { font-family: sans-serif; text-align: center; padding: 2rem; background: #1a1a2e; color: #eee; }
    h1 { color: #76b900; }
    .status { padding: 1rem; margin: 1rem auto; max-width: 400px; border-radius: 8px; background: #16213e; }
    img { max-width: 300px; border-radius: 8px; }
    .ready { color: #76b900; font-size: 1.5rem; }
  </style>
</head><body>
  <h1>ClawBot</h1>
  <p>NVIDIA GTC 2026 WhatsApp Chatbot (Dansk)</p>
  <div class="status">
    <p><strong>Status:</strong> ${botStatus}</p>
    ${qrImage ? `<p>Scan QR-koden med WhatsApp:</p><p><strong>Linkede enheder > Link en enhed</strong></p><img src="${qrImage}" alt="QR"/>` : ""}
    ${botStatus.includes("Klar") ? '<p class="ready">Bot aktiv!</p>' : ""}
  </div>
</body></html>`);
});

app.get("/debug", (req, res) => {
  res.json({ log: debugLog });
});

app.get("/status", (req, res) => {
  res.json({ status: botStatus, hasQr: !!currentQr });
});

app.listen(PORT, () => { console.log(`Web UI klar paa port ${PORT}`); });

const chromePath = process.env.PUPPETEER_EXECUTABLE_PATH || null;

const client = new Client({
  authStrategy: new LocalAuth({ dataPath: "/tmp/.wwebjs_auth" }),
  authTimeoutMs: 0,
  qrMaxRetries: 0,
  puppeteer: {
    headless: true,
    ...(chromePath && { executablePath: chromePath }),
    args: ["--no-sandbox","--disable-setuid-sandbox","--disable-dev-shm-usage","--disable-gpu","--single-process"]
  }
});

client.on("loading_screen", (percent, message) => {
  botStatus = `Indlaeser WhatsApp... ${percent}% - ${message}`;
  console.log(botStatus);
});

client.on("qr", (qr) => {
  currentQr = qr;
  botStatus = "Venter paa QR-scanning...";
  console.log("\n--- QR-KODE: Scan med WhatsApp ---");
  qrcodeTerminal.generate(qr, { small: true });
  console.log(`Eller abn web UI paa port ${PORT}\n`);
});

client.on("ready", () => {
  currentQr = null;
  botStatus = "Klar! Lytter efter beskeder...";
  console.log("ClawBot er klar!");
});

client.on("authenticated", () => {
  currentQr = null;
  botStatus = "Autentificeret! Indlaeser...";
  console.log("Autentificering lykkedes!");
});

client.on("auth_failure", (msg) => {
  botStatus = `Autentificering fejlede: ${msg}`;
  console.error(botStatus);
});

client.on("message_create", async (message) => {
  const chatInfo = await message.getChat();
  const dbg = "[DEBUG] Chat: " + chatInfo.name + " | fromMe: " + message.fromMe + " | body: " + message.body;
  console.log(dbg);
  addDebug(dbg);
  if (chatInfo.name !== ALLOWED_CHAT) return;
  if (message.fromMe && message.hasQuotedMsg) return;
  console.log(`Besked fra ${chatInfo.name || message.from}: ${message.body}`);
  const response = findBestMatch(message.body);
  await message.reply(response);
  console.log(`Svar sendt til ${chatInfo.name || message.from}`);
});

client.on("disconnected", async (reason) => {
  botStatus = `Afbrudt: ${reason} - genstarter om 5 sek...`;
  console.log("ClawBot afbrudt:", reason, "- genstarter...");
  setTimeout(() => {
    client.initialize().catch((err) => {
      botStatus = `Fejl ved genstart: ${err.message || err}`;
      console.error("Fejl ved genstart:", err.message || err);
    });
  }, 5000);
});

console.log("Starter ClawBot - NVIDIA GTC 2026 chatbot (dansk)...");
client.initialize().catch((err) => {
  botStatus = `Fejl: ${err.message || err}`;
  console.error("Fejl ved opstart:", err.message || err);
});
