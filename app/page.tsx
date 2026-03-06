"use client";

import React, { useState, useEffect, useRef } from "react";

/* ============================================================
   RAISON D'ÊTRE — 30 entries, 4 tones
   ============================================================ */
const RAISONS = [
  { tone: "poetic", text: "To live inside beauty the way light lives inside a prism —\nbroken open, refracted into something more than itself,\nstunned by what the world keeps offering." },
  { tone: "raw", text: "I want my time back before it's too late.\nI want to read beside her with the cat between us\nand feel the weight of a day that was entirely mine." },
  { tone: "philosophical", text: "A life is what you pay attention to.\nThe question is not what to do with your days\nbut what to let through — and what to finally stop carrying." },
  { tone: "cinematic", text: "Morning light on old stone. Coffee going cold.\nA sentence so good it stops you mid-page.\nThis is the whole point. This has always been the whole point." },
  { tone: "poetic", text: "To be drunk on human genius —\non the audacity of a person who looked at silence\nand decided to make it sing." },
  { tone: "raw", text: "The scholar's life is not a retirement plan.\nIt is a declaration — that curiosity matters,\nthat beauty is serious, that this is what a day is for." },
  { tone: "philosophical", text: "Wonder is not passive.\nIt is the most demanding thing a person can practice —\nto stay open when the world keeps giving you reasons to close." },
  { tone: "cinematic", text: "The shade of sun moving across a cathedral wall.\nA language slowly becoming yours.\nA city you haven't found yet, already waiting." },
  { tone: "poetic", text: "Love is the room everything else happens in.\nHer beside you. The cat a warm weight.\nThe book open. Nothing missing." },
  { tone: "raw", text: "I spent years pricing things.\nWhat I want now is to be astonished —\nby a building, by a sentence, by the ordinary miracle of being here." },
  { tone: "philosophical", text: "Seneca wrote: it is not that we have little time,\nbut that we waste so much of it.\nThe antidote is not efficiency. It is depth." },
  { tone: "cinematic", text: "Sunrise at 6am after a brilliant night.\nThat feeling — exhausted, electric, grateful —\nwhen you remember the world is enormous and you are still in it." },
  { tone: "poetic", text: "Architecture is humanity's argument with gravity —\nits insistence that stone can reach,\nthat shelter can become sacred." },
  { tone: "raw", text: "The anxiety is real. So is the beauty.\nBoth live in the same body.\nThe work is learning to let the beauty be louder." },
  { tone: "philosophical", text: "A language learned is a second soul acquired.\nTo think in Spanish is not translation —\nit is becoming slightly other, which makes you more yourself." },
  { tone: "cinematic", text: "A Lautner house in perfect weather.\nJapanese timber, glass, the hills beyond.\nA life so carefully chosen it looks like luck." },
  { tone: "poetic", text: "Every great artwork is a message in a bottle\nfrom someone who needed to say: I was here,\nI felt this, and it mattered." },
  { tone: "raw", text: "Freedom is not given. It is designed.\nBuilt slowly, from choices that compound,\nuntil one day you look up and you are living your actual life." },
  { tone: "philosophical", text: "The examined life is not easier.\nIt is richer — denser, more flavored,\nworn the way good leather wears: better for the time it has held." },
  { tone: "cinematic", text: "To travel as a scholar is to arrive twice —\nonce with your body, once with everything you already knew\nthat the place suddenly makes real." },
  { tone: "poetic", text: "There is a kind of happiness that comes\nnot from having what you want\nbut from wanting exactly what you have — for one perfect moment." },
  { tone: "raw", text: "I want to read more books than I have years for.\nI want to learn enough Spanish to dream in it.\nI want days so full of beauty they ache." },
  { tone: "philosophical", text: "The ancient Greek word for leisure was skholē —\nthe root of school. Rest and learning were the same thing.\nYou are not escaping work. You are returning to its origin." },
  { tone: "cinematic", text: "Real connection. Eyes that mean it.\nConversation that goes somewhere true.\nThe warmth of being known — this is the whole architecture." },
  { tone: "poetic", text: "To be moved by something —\nreally moved, stopped in your tracks, changed —\nis the closest we get to being alive on purpose." },
  { tone: "raw", text: "The cat doesn't know about markets or mortality.\nHe knows the warmth of a lap, the quality of the light.\nSome mornings he is the wisest thing in the room." },
  { tone: "philosophical", text: "Retire early not to stop working\nbut to start working on what actually matters —\nthe endless, rewarding labor of becoming curious." },
  { tone: "cinematic", text: "A mosque at dusk, its dome going gold.\nA sentence in a language you're still learning, suddenly clear.\nThe small daily victories of an attentive life." },
  { tone: "poetic", text: "She is reading beside you.\nThe world is doing what it does — wheeling, indifferent, magnificent.\nAnd in this room: warmth, silence, everything enough." },
  { tone: "raw", text: "This is not a rehearsal.\nThe nook, the light, the book, the cat —\nbuild it now. It is not waiting for permission." },
];

/* ============================================================
   ART & ARCHITECTURE COLLECTION
   Photos use Unsplash Source API — always loads, always beautiful,
   no API key needed. Query is tuned to the subject.
   Format: https://source.unsplash.com/800x600/?{query}
   ============================================================ */
const COLLECTION = [
  {
    name: "Sheikh Lotfollah Mosque",
    who: "Mohammad Reza Isfahani, 1619",
    where: "Isfahan, Iran",
    note: "Its dome shifts from cream to blush to rose as the sun moves — a building that breathes color like a living thing through the hours of the day.",
    img: "https://upload.wikimedia.org/wikipedia/commons/4/42/Exterior_of_Sheikh_Lotfollah_Mosque_in_Late_Afternoon_Light_-_Imam_Square_%28Naqsh-e_Jahan%29_-_Isfahan_-_Iran_%287433060812%29_%282%29.jpg",
    detail: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Sheikh_lotfollah_mosque.jpg",
  },
  {
    name: "Borobudur",
    who: "Sailendra Dynasty, ~800 CE",
    where: "Central Java, Indonesia",
    note: "Walking its nine terraces is meant to enact the Buddhist path to enlightenment — the building is a pilgrimage compressed into stone.",
    img: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Borobudur-Nothwest-view.jpg",
    detail: "https://upload.wikimedia.org/wikipedia/commons/7/77/Stupa_Borobudur.jpg",
  },
  {
    name: "Kinkaku-ji (Golden Pavilion)",
    who: "Ashikaga Yoshimitsu, 1397",
    where: "Kyoto, Japan",
    note: "Its reflection in the still pond was considered as sacred as the structure itself — two temples, one real, one water.",
    img: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Kinkakuji_panorama.jpg",
    detail: "https://upload.wikimedia.org/wikipedia/commons/d/de/Water_reflection_of_Kinkaku-ji_Temple_a_sunny_day%2C_Kyoto%2C_Japan.jpg",
  },
  {
    name: "Nasir al-Mulk Mosque (Pink Mosque)",
    who: "Mohammad Hasan Memar, 1888",
    where: "Shiraz, Iran",
    note: "At dawn its stained glass shatters sunlight into a shifting carpet of color — the floor becomes a second ceiling.",
    img: "https://upload.wikimedia.org/wikipedia/commons/8/8f/2022-03-25_Iran%2C_Shiraz_DSC_0440_DxO.jpg",
    detail: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Mezquita_de_Nasirolmolk%2C_Shiraz%2C_Ir%C3%A1n%2C_2016-09-24%2C_DD_66-68_HDR.jpg",
  },
  {
    name: "Ryoan-ji Rock Garden",
    who: "Unknown master, ~1499",
    where: "Kyoto, Japan",
    note: "Fifteen stones arranged so that from any vantage point, one is always hidden — an unsolvable puzzle raked into gravel for 500 years.",
    img: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Kyoto-Ryoan-Ji_MG_4512.jpg",
    detail: "https://upload.wikimedia.org/wikipedia/commons/9/9b/RyoanJi-Dry_garden.jpg",
  },
  {
    name: "The Alhambra — Court of the Lions",
    who: "Muhammad V, 1370",
    where: "Granada, Spain",
    note: "Its 124 marble columns were designed to evoke a palm grove — to stand inside is to inhabit a garden of paradise built from geometry and shadow.",
    img: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Pavillon_Cour_des_Lions_Alhambra_Granada_Spain.jpg",
    detail: "https://upload.wikimedia.org/wikipedia/commons/7/79/Nasride_Palace_-_La_Alhambra_de_Granada_Spain_Andalousia_-_Picture_Image_Photography_%2814723326260%29.jpg",
  },
  {
    name: "Meenakshi Amman Temple",
    who: "Nayak dynasty, 17th century",
    where: "Madurai, India",
    note: "Its towers hold 33,000 painted sculptures — not decoration but cosmology, every surface a map of the divine crammed with impossible color.",
    img: "https://upload.wikimedia.org/wikipedia/commons/3/32/Madurai_Meenakshi_Amman_Temple_Gopuram.jpg",
    detail: "https://upload.wikimedia.org/wikipedia/commons/6/60/Madurai_Meenakshi_temple_shikhara.jpg",
  },
  {
    name: "Göbekli Tepe",
    who: "Unknown, ~9600 BCE",
    where: "Şanlıurfa, Turkey",
    note: "Built 6,000 years before Stonehenge by people with no agriculture — the oldest known monumental structure, proof that ritual preceded civilization.",
    img: "https://upload.wikimedia.org/wikipedia/commons/d/d5/G%C3%B6bekli_Tepe%2C_Urfa.jpg",
    detail: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Gobekli_Tepe_2.jpg",
  },
  {
    name: "Palenque — Temple of the Inscriptions",
    who: "Maya King Pakal, ~683 CE",
    where: "Chiapas, Mexico",
    note: "A king designed his own tomb with a secret stone shaft so his spirit could travel between worlds — an afterlife engineered in limestone.",
    img: "https://upload.wikimedia.org/wikipedia/commons/9/92/Palenque%2C_Chiapas%2C_Mx_%2829134578633%29.jpg",
    detail: "https://upload.wikimedia.org/wikipedia/commons/f/ff/T%C3%AAte_de_Pakal_adolescent%2C_Palenque%2C_exposition_%22Mayas%22%2C_Mus%C3%A9e_du_Quai_Branly%2C_Paris.jpg",
  },
  {
    name: "Wieliczka Salt Mine Cathedral",
    who: "Polish miners, 13th–20th century",
    where: "Kraków, Poland",
    note: "An entire cathedral sculpted entirely from rock salt by miners who prayed in what they carved, 100 meters underground.",
    img: "https://upload.wikimedia.org/wikipedia/commons/4/47/Wieliczka_salt_mine_st_Kingy_chapel.jpg",
    detail: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Poland-01583_-_St._Kinga%27s_Chapel_%2831547044100%29.jpg",
  },
  {
    name: "Ajanta Caves",
    who: "Buddhist monks, 2nd century BCE–6th century CE",
    where: "Maharashtra, India",
    note: "Painted in near-total darkness by oil lamp — murals depicting joy, sorrow, and desire with a psychological realism that feels startlingly modern.",
    img: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Ajanta_caves_panorama_2010.jpg",
    detail: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Ajanta_Padmapani.jpg",
  },
  {
    name: "Süleymaniye Mosque",
    who: "Mimar Sinan, 1558",
    where: "Istanbul, Turkey",
    note: "Sinan placed the dome so precisely that the interior seems to breathe — vast and intimate at once, light arriving as if personally invited.",
    img: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Exterior_of_the_S%C3%BCleymaniye_Mosque_in_Istanbul%2C_Turkey_001.JPG",
    detail: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Interior_of_the_Suleymaniye_Mosque%2C_Nave_%283672472413%29.jpg",
  },
  {
    name: "Meteora Monasteries",
    who: "Orthodox monks, 14th century",
    where: "Thessaly, Greece",
    note: "Built atop rock pillars 400 meters high — monks reached them only by nets hauled by hand, faith expressed as vertical defiance.",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/27/Meteora_-_Varlaam_monastery_from_below.jpg",
    detail: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Megala_Meteora_11.jpg",
  },
  {
    name: "Saadian Tombs",
    who: "Ahmad al-Mansur, 1578",
    where: "Marrakech, Morocco",
    note: "Sealed and forgotten for 200 years, rediscovered in 1917 — the cedar ceilings perfectly preserved by their own abandonment.",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/00/Maroc_Marrakech_Saadiens_Luc_Viatour_5.jpg",
    detail: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Detail_of_the_Saadian_tombs_1102.jpg",
  },
  {
    name: "Derinkuyu Underground City",
    who: "Unknown, ~8th century BCE",
    where: "Cappadocia, Turkey",
    note: "An underground city 85 meters deep, 18 floors, sheltering 20,000 people — complete with wineries, stables, and a school in solid rock.",
    img: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Derinkuyu_Underground_City.JPG",
    detail: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Antique_cave_churches.jpg",
  },
  {
    name: "Chichen Itza — El Castillo",
    who: "Maya civilization, ~1000 CE",
    where: "Yucatán, Mexico",
    note: "On each equinox, shadow forms a serpent descending the staircase — astronomical precision engineered a thousand years before it was explained.",
    img: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Chichen-Itza-Castillo-Seen-From-East.JPG",
    detail: "https://upload.wikimedia.org/wikipedia/commons/9/93/Chichen-Itza-Serpent-Effect.jpg",
  },
  {
    name: "Fallingwater",
    who: "Frank Lloyd Wright, 1939",
    where: "Mill Run, Pennsylvania",
    note: "Wright placed the house over the waterfall, not beside it — the sound of water moves through every room, the building inseparable from what it admires.",
    img: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Frank_Lloyd_Wright_-_Mill_Run%2C_PA_-_Fallingwater_%28A%29.jpg",
    detail: "https://upload.wikimedia.org/wikipedia/commons/f/fe/FallingwaterCantilever570320cv.jpg",
  },
  {
    name: "Longmen Grottoes",
    who: "Northern Wei Dynasty, 493 CE",
    where: "Luoyang, China",
    note: "100,000 Buddhist figures carved over 400 years — the largest stands 17 meters tall, its face modeled on Empress Wu Zetian herself.",
    img: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Longmen_Grottoes_3.jpg",
    detail: "https://upload.wikimedia.org/wikipedia/commons/1/10/Ancient_Buddhist_Grottoes_at_Longmen-_Fengxian_Temple%2C_Vairocana_Buddha.jpg",
  },
  {
    name: "Trulli of Alberobello",
    who: "Local builders, 14th century onward",
    where: "Puglia, Italy",
    note: "Built without mortar to dodge property taxes — an entire village of fiscal evasion that became one of earth's most beautiful places.",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/25/Alberobello%2C_trulli_%283%29.jpg",
    detail: "https://upload.wikimedia.org/wikipedia/commons/3/34/Trulli_Alberobello07_apr06.jpg",
  },
  {
    name: "Brion Cemetery",
    who: "Carlo Scarpa, 1978",
    where: "San Vito d'Altivole, Italy",
    note: "An architect who believed death deserved the same beauty as life — every joint and water channel considered as if grief itself had been given form.",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/27/04_Tomba_Brion_-_San_Vito_d%27Altivole%2C_Treviso%2C_Italy_-_Carlo_Scarpa-FPPL3045.jpg",
    detail: "https://upload.wikimedia.org/wikipedia/commons/4/4b/02_Tomba_Brion_-_San_Vito_d%27Altivole%2C_Treviso%2C_Italy_-_Carlo_Scarpa-FPPL2910.jpg",
  },
];

/* ============================================================
   ANXIETY SKILLS (Weekdays)
   ============================================================ */
const ANXIETY_SKILLS = [
  { name: "Cognitive Defusion", what: "You are not your thoughts. You can watch them pass.", steps: ["Say: 'I notice I'm having the thought that...'", "Let it float by. Don't grab it.", "Ask: useful, or just noise?"] },
  { name: "Physiological Sigh", what: "The fastest reset your nervous system has.", steps: ["Inhale fully through nose.", "Second short sniff on top.", "Long slow exhale. Repeat 3×."] },
  { name: "Window of Tolerance", what: "Anxiety pulls you outside the zone where you think clearly.", steps: ["Feet flat. Name 5 things you feel.", "4 counts in. 6 counts out.", "Repeat until something softens."] },
  { name: "STOP", what: "One pause breaks the spiral before it builds.", steps: ["Stop. Physically still.", "One breath.", "Observe. Then choose."] },
  { name: "Radical Acceptance", what: "Fighting reality costs more than the reality does.", steps: ["Name what you're resisting.", "Say: 'This is. I don't have to like it.'", "Ask: what's possible if I stop fighting?"] },
  { name: "Scheduled Worry", what: "Give worry a time. Take back the rest of the day.", steps: ["Pick a 15-min slot. Not tonight.", "Worry arrives early? 'Later. 4pm.'", "At the slot: write it, close it."] },
  { name: "Name It", what: "Naming an emotion precisely cuts its intensity.", steps: ["What's the exact word for this feeling?", "Say it: 'I am feeling ___'", "Notice the shift. It's almost always there."] },
  { name: "Check the Facts", what: "Anxiety calls possibilities certainties. It's lying.", steps: ["Write the thought as a statement.", "Evidence for. Evidence against.", "What would you tell a friend?"] },
  { name: "Self-Compassion Break", what: "The harshest voice in the room is usually yours.", steps: ["Hand on heart. Feel the warmth.", "'This is hard. This is human.'", "What would you say to someone you love?"] },
  { name: "Urge Surfing", what: "Every spike peaks — and then it falls. Every time.", steps: ["Notice it. Don't fight.", "'Rising... crest... falling...'", "Wait. It passes. It always passes."] },
];

/* ============================================================
   HAPPINESS TECHNIQUES (Weekends)
   ============================================================ */
const HAPPINESS_TECHNIQUES = [
  { name: "Three Good Things", what: "Writing three specific positive events each night rewires the brain toward noticing what's working.", steps: ["Write 3 specific good things today — small counts.", "For each: why did it happen? What does it mean?", "7 days in a row. The effect compounds."] },
  { name: "Savoring", what: "Deliberately slowing to absorb a good experience extends its emotional benefit.", steps: ["Choose one moment today and stop fully.", "Engage all senses. Stay 30 seconds longer.", "'I am taking this in.' Mean it."] },
  { name: "Awe Walk", what: "Deliberately seeking awe expands your sense of time and self.", steps: ["Walk 20 mins. Find something that makes you feel small — in a good way.", "Look up more than usual.", "When awe flickers: stop. Stay 30 seconds."] },
  { name: "Best Possible Self", what: "Vividly imagining your ideal future increases optimism today.", steps: ["10 mins: write your life 5 years from now. Everything went well.", "Be specific: where, who, what does Tuesday look like?", "Name one thing today that moves toward it."] },
  { name: "Gratitude Letter", what: "One of the highest-impact happiness interventions ever measured.", steps: ["Someone who shaped you and was never thanked.", "3–4 sentences: what they did and how it changed you.", "Send it today. Even a text."] },
  { name: "Anticipatory Savoring", what: "Looking forward produces nearly as much joy as the experience itself.", steps: ["Plan something specific this week. Not someday.", "Make it concrete: where, when, who.", "5 mins imagining it in detail. This is a practice."] },
  { name: "Meaningful Conversation", what: "Deeper conversations produce more happiness than surface chat.", steps: ["Ask one question deeper than usual: 'What's actually on your mind?'", "Listen to what they actually say.", "Share something true in return."] },
];

/* ============================================================
   THEMES
   ============================================================ */
const THEMES = [
  { id: "isfahan", label: "Isfahan", bg: "linear-gradient(160deg,#080810 0%,#100e22 60%,#0a1410 100%)", card: "rgba(255,255,255,0.045)", border: "rgba(180,138,70,0.22)", text: "#F2EDE2", accent: "#C9914A", sub: "#8A7D68", divider: "rgba(180,138,70,0.18)", ornament: "✦", headFont: "'Cinzel','Trajan Pro',serif", bodyFont: "'Crimson Pro',Garamond,serif" },
  { id: "kyoto", label: "Kyoto", bg: "linear-gradient(160deg,#080e08 0%,#101a0e 60%,#0e100a 100%)", card: "rgba(255,255,255,0.035)", border: "rgba(130,180,110,0.2)", text: "#EAE8DC", accent: "#82B46E", sub: "#72806A", divider: "rgba(130,180,110,0.16)", ornament: "◈", headFont: "'Cinzel',serif", bodyFont: "'Crimson Pro',Georgia,serif" },
  { id: "byzantium", label: "Byzantium", bg: "linear-gradient(160deg,#0e060e 0%,#1a0e28 60%,#140a10 100%)", card: "rgba(255,255,255,0.04)", border: "rgba(170,90,150,0.22)", text: "#F0E8F2", accent: "#B870A8", sub: "#8A6880", divider: "rgba(170,90,150,0.18)", ornament: "❖", headFont: "'Cinzel',serif", bodyFont: "'Crimson Pro',Georgia,serif" },
  { id: "shiraz", label: "Shiraz", bg: "linear-gradient(160deg,#0e0606 0%,#1c0e0e 60%,#100808 100%)", card: "rgba(255,255,255,0.04)", border: "rgba(190,80,70,0.2)", text: "#F2EAE6", accent: "#D86858", sub: "#8A7068", divider: "rgba(190,80,70,0.16)", ornament: "◉", headFont: "'Cinzel',serif", bodyFont: "'Crimson Pro',Georgia,serif" },
];

/* ============================================================
   TYPES
   ============================================================ */
type Theme = {
  id: string; label: string; bg: string; card: string; border: string;
  text: string; accent: string; sub: string; divider: string;
  ornament: string; headFont: string; bodyFont: string;
};

/* ============================================================
   HELPERS
   ============================================================ */
function seed() {
  const t = new Date();
  return t.getFullYear() * 10000 + (t.getMonth() + 1) * 100 + t.getDate();
}
function pick<T>(arr: T[]): T { return arr[seed() % arr.length]; }
function getTheme() { return THEMES[seed() % THEMES.length]; }
function isWeekend() { const d = new Date().getDay(); return d === 0 || d === 6; }
function fmtDate() {
  const t = new Date();
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const d = t.getDate();
  const suf = [11,12,13].includes(d) ? "th" : (["st","nd","rd"][(d % 10) - 1] || "th");
  return `${days[t.getDay()]} · ${months[t.getMonth()]} ${d}${suf}`;
}

/* ============================================================
   SWIPEABLE ART GALLERY
   ============================================================ */
function ArtGallery({ startIndex, theme }: { startIndex: number; theme: Theme }) {
  const [current, setCurrent] = useState(startIndex);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [detailLoaded, setDetailLoaded] = useState(false);
  const [detailError, setDetailError] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const art = COLLECTION[current];

  const prev = () => { setImgLoaded(false); setImgError(false); setDetailLoaded(false); setDetailError(false); setCurrent((c) => (c - 1 + COLLECTION.length) % COLLECTION.length); };
  const next = () => { setImgLoaded(false); setImgError(false); setDetailLoaded(false); setDetailError(false); setCurrent((c) => (c + 1) % COLLECTION.length); };

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      {/* Counter + nav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
        <button onClick={prev} style={{ background: "none", border: `1px solid ${theme.border}`, color: theme.accent, borderRadius: "50%", width: 30, height: 30, cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
        <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: theme.sub }}>{current + 1} / {COLLECTION.length}</span>
        <button onClick={next} style={{ background: "none", border: `1px solid ${theme.border}`, color: theme.accent, borderRadius: "50%", width: 30, height: 30, cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
      </div>

      {/* Art info */}
      <div style={{ fontFamily: theme.headFont, fontSize: "21px", fontWeight: 400, letterSpacing: "0.04em", lineHeight: 1.2, marginBottom: "4px", color: theme.text }}>{art.name}</div>
      <div style={{ fontSize: "11px", color: theme.sub, letterSpacing: "0.05em", marginBottom: "16px", lineHeight: 1.6 }}>{art.who} · {art.where}</div>

      {/* Main photo */}
      <div style={{ borderRadius: "9px", overflow: "hidden", border: `1px solid ${theme.border}`, background: "rgba(0,0,0,0.4)", marginBottom: "5px", height: "210px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {!imgLoaded && !imgError && <span style={{ fontSize: "11px", color: theme.sub, letterSpacing: "0.1em" }}>loading...</span>}
        {imgError && <span style={{ fontSize: "11px", color: theme.sub, letterSpacing: "0.1em", opacity: 0.5 }}>image unavailable</span>}
        <img
          key={art.img}
          src={art.img}
          alt={art.name}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
          style={{ width: "100%", height: "210px", objectFit: "cover", display: imgLoaded ? "block" : "none", opacity: 0.9 }}
        />
      </div>

      {/* Detail photo */}
      <div style={{ borderRadius: "9px", overflow: "hidden", border: `1px solid ${theme.border}`, background: "rgba(0,0,0,0.4)", marginBottom: "16px", height: "125px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {!detailLoaded && !detailError && <span style={{ fontSize: "11px", color: theme.sub, letterSpacing: "0.1em" }}>detail...</span>}
        {detailError && <span style={{ fontSize: "11px", color: theme.sub, letterSpacing: "0.1em", opacity: 0.5 }}>image unavailable</span>}
        <img
          key={art.detail}
          src={art.detail}
          alt={`${art.name} — detail`}
          onLoad={() => setDetailLoaded(true)}
          onError={() => setDetailError(true)}
          style={{ width: "100%", height: "125px", objectFit: "cover", display: detailLoaded ? "block" : "none", opacity: 0.86, filter: "contrast(1.05) saturate(1.08)" }}
        />
      </div>

      {/* Note */}
      <div style={{ fontSize: "15px", lineHeight: 1.78, fontStyle: "italic", color: theme.text, paddingTop: "15px", borderTop: `1px solid ${theme.divider}` }}>{art.note}</div>

      {/* Dot indicators */}
      <div style={{ display: "flex", justifyContent: "center", gap: "5px", marginTop: "16px", flexWrap: "wrap" }}>
        {COLLECTION.map((_, i) => (
          <div key={i} onClick={() => { setImgLoaded(false); setImgError(false); setDetailLoaded(false); setDetailError(false); setCurrent(i); }}
            style={{ width: i === current ? 16 : 5, height: 5, borderRadius: 3, background: i === current ? theme.accent : theme.border, cursor: "pointer", transition: "all 0.3s ease" }} />
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   APP
   ============================================================ */
export default function MorningBrief() {
  const [visible, setVisible] = useState(false);
  const theme = getTheme();
  const raison = pick(RAISONS);
  const startArtIndex = seed() % COLLECTION.length;
  const practice = isWeekend() ? pick(HAPPINESS_TECHNIQUES) : pick(ANXIETY_SKILLS);
  const practiceLabel = isWeekend() ? "Weekend Practice" : "Today's Skill";

  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t); }, []);

  const c: Record<string, React.CSSProperties> = {
    root: { minHeight: "100vh", background: theme.bg, fontFamily: theme.bodyFont, color: theme.text, WebkitFontSmoothing: "antialiased" },
    wrap: { maxWidth: "430px", margin: "0 auto", padding: "44px 20px 80px", opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(14px)", transition: "opacity 0.9s ease, transform 0.9s ease" },
    dateRow: { textAlign: "center", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: theme.sub, marginBottom: "5px" },
    themeRow: { textAlign: "center", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: theme.accent, marginBottom: "34px", opacity: 0.65 },
    raisonWrap: { borderTop: `1px solid ${theme.divider}`, borderBottom: `1px solid ${theme.divider}`, padding: "28px 6px", marginBottom: "34px", textAlign: "center" },
    raisonTone: { fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase", color: theme.accent, opacity: 0.55, marginBottom: "14px" },
    raisonText: { fontSize: "17px", lineHeight: "1.8", fontStyle: "italic", color: theme.text, whiteSpace: "pre-line" },
    card: { background: theme.card, border: `1px solid ${theme.border}`, borderRadius: "14px", padding: "22px 18px", marginBottom: "16px", backdropFilter: "blur(6px)" },
    label: { fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: theme.accent, marginBottom: "15px", display: "flex", alignItems: "center", gap: "8px" },
    practiceName: { fontFamily: theme.headFont, fontSize: "20px", fontWeight: 400, letterSpacing: "0.04em", marginBottom: "8px", color: theme.text },
    practiceWhat: { fontSize: "13px", color: theme.sub, lineHeight: 1.65, fontStyle: "italic", marginBottom: "18px" },
    steps: { listStyle: "none", padding: 0, margin: 0 },
    step: { display: "flex", gap: "13px", marginBottom: "13px", alignItems: "flex-start" },
    num: { minWidth: "23px", height: "23px", borderRadius: "50%", border: `1px solid ${theme.accent}`, color: theme.accent, fontSize: "10px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px", fontFamily: theme.headFont, letterSpacing: "0.05em" },
    stepText: { fontSize: "13px", lineHeight: 1.5, color: theme.text, letterSpacing: "0.01em" },
    footer: { textAlign: "center", marginTop: "44px", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: theme.sub, opacity: 0.4 },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500&family=Crimson+Pro:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{margin:0;background:#080810;}
        img{max-width:100%;}
        button:focus{outline:none;}
      `}</style>
      <div style={c.root}>
        <div style={c.wrap}>

          <div style={c.dateRow}>{fmtDate()}</div>
          <div style={c.themeRow}>{theme.ornament} {theme.label} {theme.ornament}</div>

          <div style={c.raisonWrap}>
            <div style={c.raisonTone}>{raison.tone}</div>
            <div style={c.raisonText}>{raison.text}</div>
          </div>

          {/* Art gallery — swipeable */}
          <div style={c.card}>
            <div style={c.label}><span>{theme.ornament}</span><span>Today's Beauty</span></div>
            <ArtGallery startIndex={startArtIndex} theme={theme} />
          </div>

          {/* Practice */}
          <div style={c.card}>
            <div style={c.label}><span>{theme.ornament}</span><span>{practiceLabel}</span></div>
            <div style={c.practiceName}>{practice.name}</div>
            <div style={c.practiceWhat}>{practice.what}</div>
            <ul style={c.steps}>
              {practice.steps.map((s, i) => (
                <li key={i} style={c.step}>
                  <div style={c.num}>{i + 1}</div>
                  <div style={c.stepText}>{s}</div>
                </li>
              ))}
            </ul>
          </div>

          <div style={c.footer}>{isWeekend() ? "weekend · rest & joy" : "weekday · grow & steady"}</div>
        </div>
      </div>
    </>
  );
}
