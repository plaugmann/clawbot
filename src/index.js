const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { findBestMatch, GREETING } = require("./chatbot");

const client = new Client({
  authStrategy: new LocalAuth(),
  authTimeoutMs: 120000,
  qrMaxRetries: 5,
  puppeteer: {
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  }
});

client.on("qr", (qr) => {
  console.log("Scan denne QR-kode med WhatsApp paa din telefon:");
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("ClawBot er klar! Venter paa beskeder om GTC 2026...");
});

client.on("authenticated", () => {
  console.log("Autentificering lykkedes!");
});

client.on("auth_failure", (msg) => {
  console.error("Autentificering fejlede:", msg);
});

client.on("message", async (message) => {
  if (message.fromMe) return;

  const chatInfo = await message.getChat();
  console.log(`Besked fra ${chatInfo.name || message.from}: ${message.body}`);

  const response = findBestMatch(message.body);
  await message.reply(response);
  console.log(`Svar sendt til ${chatInfo.name || message.from}`);
});

client.on("disconnected", (reason) => {
  console.log("ClawBot afbrudt:", reason);
});

console.log("Starter ClawBot - NVIDIA GTC 2026 chatbot (dansk)...");
client.initialize().catch((err) => {
  console.error("Fejl ved opstart:", err.message || err);
  process.exit(1);
});
