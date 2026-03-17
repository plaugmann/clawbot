const { GTC_KNOWLEDGE, FALLBACK_RESPONSE, GREETING } = require("./gtcKnowledge");

function findBestMatch(message) {
  const normalized = message.toLowerCase().trim();

  if (normalized === "hej" || normalized === "hallo" || normalized === "start" || normalized === "menu") {
    return GREETING;
  }

  let bestTopic = null;
  let bestScore = 0;

  for (const [topic, data] of Object.entries(GTC_KNOWLEDGE)) {
    let score = 0;
    for (const keyword of data.keywords) {
      if (normalized.includes(keyword)) {
        score += keyword.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestTopic = topic;
    }
  }

  if (bestTopic && bestScore > 0) {
    return GTC_KNOWLEDGE[bestTopic].response;
  }

  return FALLBACK_RESPONSE;
}

module.exports = { findBestMatch, GREETING };
