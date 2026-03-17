const GTC_KNOWLEDGE = {
  oversigt: {
    keywords: ["gtc", "konference", "oversigt", "hvad er", "fortæl", "generelt", "overblik", "hej", "hallo", "start"],
    response:
      `NVIDIA GTC 2026 fandt sted den 17.-20. marts 2026 i San Jose, Californien.\n\n` +
      `CEO Jensen Huang holdt keynote-talen, hvor han fremlagde NVIDIAs vision for fremtidens AI.\n\n` +
      `De store temaer var: NemoClaw (AI-agenter), DLSS 5 (AI-gaming), Vera CPU, fysisk AI, ` +
      `autonome koretoejer og rumcomputing.`
  },

  nemoclaw: {
    keywords: ["nemoclaw", "nemo", "claw", "agenter", "agent", "openclaw"],
    response:
      `NemoClaw er NVIDIAs nye vaerktoej til nemmere at bygge AI-agenter.\n\n` +
      `Det bygger videre paa open source-projektet OpenClaw og tilfojer et ekstra sikkerhedslag.\n\n` +
      `Med NemoClaw kan udviklere hurtigere skabe intelligente AI-assistenter ` +
      `til virksomheder og forbrugere.`
  },

  dlss5: {
    keywords: ["dlss", "dlss 5", "gaming", "spil", "grafik", "rendering"],
    response:
      `DLSS 5 er den nyeste version af NVIDIAs AI-drevne grafikteknologi.\n\n` +
      `Den bruger avanceret AI til at forbedre billedkvaliteten i spil ` +
      `og samtidig oege ydeevnen markant.\n\n` +
      `DLSS 5 repraesenterer et stort spring fremad for AI-stoettet gaming.`
  },

  vera: {
    keywords: ["vera", "cpu", "processor", "rubin", "chip", "hardware"],
    response:
      `Vera er NVIDIAs nye CPU-arkitektur, som blev annonceret paa GTC 2026.\n\n` +
      `Vera Rubin-platformen er designet til naeste generation af AI-datacentre ` +
      `og aabner ogsa for rumcomputing med Vera Rubin Space-1.\n\n` +
      `Den tilbyder energieffektiv inferens og databehandling til baade ` +
      `jordbaserede og orbitale applikationer.`
  },

  fysiskAI: {
    keywords: ["fysisk ai", "physical ai", "robot", "robotik", "robotter", "olaf", "disney"],
    response:
      `Fysisk AI var et centralt tema paa GTC 2026 - AI-systemer integreret i maskiner ` +
      `som robotter og biler, der navigerer i den virkelige verden.\n\n` +
      `NVIDIA praesenterede flere nye modeller:\n` +
      `- Cosmos 3: Genererer syntetiske verdener til traening\n` +
      `- Isaac GR00T N1.7: Open VLA-model til humanoide robotter\n` +
      `- Alpamayo 1.5: Forbedret navigation til selvkoerende biler\n\n` +
      `Jensen Huang demonstrerede endda en gaaende, talende robot-version af Olaf fra Disneys Frost!`
  },

  autonomeKoeretoejer: {
    keywords: ["bil", "biler", "selvkoerende", "autonom", "uber", "robotaxi", "koeretoej", "koere", "chatgpt moment"],
    response:
      `Jensen Huang erklaeerede at "ChatGPT-oejeblikket for selvkoerende biler er kommet."\n\n` +
      `NVIDIA og Uber vil lancere autonome koretoejer i 28 byer paa fire kontinenter inden 2028, ` +
      `med Los Angeles og San Francisco allerede i 2027.\n\n` +
      `Nye bilproducenter som BYD, Hyundai, Nissan og Geely slutter sig til ` +
      `NVIDIAs robotaxi-initiativ sammen med GM, Mercedes og Toyota.\n\n` +
      `Det hele drives af NVIDIA Drive AV-software og Alpamayo-modellerne.`
  },

  edgeAI: {
    keywords: ["edge", "5g", "t-mobile", "nokia", "netvaerk", "infrastruktur"],
    response:
      `NVIDIA samarbejder med T-Mobile og Nokia om at accelerere fysisk AI ` +
      `ved hjaelp af AI-RAN-infrastruktur (AI Radio Access Network).\n\n` +
      `Ved at goere 5G-netvaerket til en distribueret AI-computer skabes en ` +
      `skalerbar plan for verdens edge AI-infrastruktur.\n\n` +
      `Fordelene er lav latenstid og lokal behandling, der allerede bruges ` +
      `til at optimere trafiklys og reparere transmissionslinjer.`
  },

  rum: {
    keywords: ["rum", "space", "orbital", "satellit", "kredsloeb"],
    response:
      `NVIDIA beveger sig ind i rumcomputing med planer om orbitale datacentre (ODC'er).\n\n` +
      `Platforme som IGX Thor og Jetson Orin tilbyder energieffektiv inferens i kredsloeb.\n\n` +
      `Vera Rubin Space-1 er annonceret til fremtidig tilgaengelighed ` +
      `og skal muliggoere AI-applikationer mellem Jorden og rummet.\n\n` +
      `Som Jensen Huang sagde: "Intelligens skal leve, hvor data genereres."`
  },

  dataFactory: {
    keywords: ["data", "factory", "blueprint", "traening", "syntetisk", "datasaet"],
    response:
      `NVIDIA annoncerede Physical AI Data Factory Blueprint - en aaben referencearkitektur ` +
      `der automatiserer, hvordan traeningsdata genereres, beriges og evalueres.\n\n` +
      `Den bruger Cosmos-familien af verdensmodeller til at behandle data ` +
      `og generere syntetiske data i stor skala.\n\n` +
      `Blueprint bliver tilgaengelig paa GitHub i april 2026. ` +
      `Uber og Skild AI bruger det allerede.`
  },

  partnere: {
    keywords: ["partner", "samarbej", "virksomhed", "industri", "hvem"],
    response:
      `Vigtige partnerskaber annonceret paa GTC 2026:\n\n` +
      `- Uber: Autonome koretoejer i 28 byer inden 2028\n` +
      `- BYD, Hyundai, Nissan, Geely: Nye robotaxi-partnere\n` +
      `- GM, Mercedes, Toyota: Eksisterende partnere\n` +
      `- T-Mobile & Nokia: Edge AI-infrastruktur\n` +
      `- Disney: Robot-Olaf demonstration\n` +
      `- Skild AI: Robotik med Data Factory Blueprint`
  }
};

const FALLBACK_RESPONSE =
  `Beklager, det emne kender jeg ikke til endnu.\n\n` +
  `Jeg kan fortaelle dig om foelgende GTC 2026-emner:\n` +
  `- Oversigt over konferencen\n` +
  `- NemoClaw (AI-agenter)\n` +
  `- DLSS 5 (AI-gaming)\n` +
  `- Vera CPU og hardware\n` +
  `- Fysisk AI og robotter\n` +
  `- Selvkoerende biler og robotaxier\n` +
  `- Edge AI og 5G\n` +
  `- Rumcomputing\n` +
  `- Data Factory Blueprint\n` +
  `- Partnerskaber\n\n` +
  `Skriv bare et af emnerne, saa fortaeller jeg mere!`;

const GREETING =
  `Hej! Jeg er ClawBot - din guide til NVIDIAs GTC 2026-konference.\n\n` +
  `Spoerg mig om alt fra NemoClaw, DLSS 5, Vera CPU, fysisk AI, ` +
  `selvkoerende biler, rumcomputing og meget mere!\n\n` +
  `Hvad vil du vide?`;

module.exports = { GTC_KNOWLEDGE, FALLBACK_RESPONSE, GREETING };
