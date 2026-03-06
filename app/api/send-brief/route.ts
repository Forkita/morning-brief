import { NextResponse } from "next/server";
import twilio from "twilio";

// ── Data (mirrors page.tsx for consistent daily picks) ──────────────────────

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

const COLLECTION = [
  { name: "Sheikh Lotfollah Mosque", who: "Mohammad Reza Isfahani, 1619", where: "Isfahan, Iran", note: "Its dome shifts from cream to blush to rose as the sun moves — a building that breathes color like a living thing through the hours of the day." },
  { name: "Borobudur", who: "Sailendra Dynasty, ~800 CE", where: "Central Java, Indonesia", note: "Walking its nine terraces is meant to enact the Buddhist path to enlightenment — the building is a pilgrimage compressed into stone." },
  { name: "Kinkaku-ji (Golden Pavilion)", who: "Ashikaga Yoshimitsu, 1397", where: "Kyoto, Japan", note: "Its reflection in the still pond was considered as sacred as the structure itself — two temples, one real, one water." },
  { name: "Nasir al-Mulk Mosque (Pink Mosque)", who: "Mohammad Hasan Memar, 1888", where: "Shiraz, Iran", note: "At dawn its stained glass shatters sunlight into a shifting carpet of color — the floor becomes a second ceiling." },
  { name: "Ryoan-ji Rock Garden", who: "Unknown master, ~1499", where: "Kyoto, Japan", note: "Fifteen stones arranged so that from any vantage point, one is always hidden — an unsolvable puzzle raked into gravel for 500 years." },
  { name: "The Alhambra — Court of the Lions", who: "Muhammad V, 1370", where: "Granada, Spain", note: "Its 124 marble columns were designed to evoke a palm grove — to stand inside is to inhabit a garden of paradise built from geometry and shadow." },
  { name: "Meenakshi Amman Temple", who: "Nayak dynasty, 17th century", where: "Madurai, India", note: "Its towers hold 33,000 painted sculptures — not decoration but cosmology, every surface a map of the divine crammed with impossible color." },
  { name: "Göbekli Tepe", who: "Unknown, ~9600 BCE", where: "Şanlıurfa, Turkey", note: "Built 6,000 years before Stonehenge by people with no agriculture — the oldest known monumental structure, proof that ritual preceded civilization." },
  { name: "Palenque — Temple of the Inscriptions", who: "Maya King Pakal, ~683 CE", where: "Chiapas, Mexico", note: "A king designed his own tomb with a secret stone shaft so his spirit could travel between worlds — an afterlife engineered in limestone." },
  { name: "Wieliczka Salt Mine Cathedral", who: "Polish miners, 13th–20th century", where: "Kraków, Poland", note: "An entire cathedral sculpted entirely from rock salt by miners who prayed in what they carved, 100 meters underground." },
  { name: "Ajanta Caves", who: "Buddhist monks, 2nd century BCE–6th century CE", where: "Maharashtra, India", note: "Painted in near-total darkness by oil lamp — murals depicting joy, sorrow, and desire with a psychological realism that feels startlingly modern." },
  { name: "Süleymaniye Mosque", who: "Mimar Sinan, 1558", where: "Istanbul, Turkey", note: "Sinan placed the dome so precisely that the interior seems to breathe — vast and intimate at once, light arriving as if personally invited." },
  { name: "Meteora Monasteries", who: "Orthodox monks, 14th century", where: "Thessaly, Greece", note: "Built atop rock pillars 400 meters high — monks reached them only by nets hauled by hand, faith expressed as vertical defiance." },
  { name: "Saadian Tombs", who: "Ahmad al-Mansur, 1578", where: "Marrakech, Morocco", note: "Sealed and forgotten for 200 years, rediscovered in 1917 — the cedar ceilings perfectly preserved by their own abandonment." },
  { name: "Derinkuyu Underground City", who: "Unknown, ~8th century BCE", where: "Cappadocia, Turkey", note: "An underground city 85 meters deep, 18 floors, sheltering 20,000 people — complete with wineries, stables, and a school in solid rock." },
  { name: "Chichen Itza — El Castillo", who: "Maya civilization, ~1000 CE", where: "Yucatán, Mexico", note: "On each equinox, shadow forms a serpent descending the staircase — astronomical precision engineered a thousand years before it was explained." },
  { name: "Fallingwater", who: "Frank Lloyd Wright, 1939", where: "Mill Run, Pennsylvania", note: "Wright placed the house over the waterfall, not beside it — the sound of water moves through every room, the building inseparable from what it admires." },
  { name: "Longmen Grottoes", who: "Northern Wei Dynasty, 493 CE", where: "Luoyang, China", note: "100,000 Buddhist figures carved over 400 years — the largest stands 17 meters tall, its face modeled on Empress Wu Zetian herself." },
  { name: "Trulli of Alberobello", who: "Local builders, 14th century onward", where: "Puglia, Italy", note: "Built without mortar to dodge property taxes — an entire village of fiscal evasion that became one of earth's most beautiful places." },
  { name: "Brion Cemetery", who: "Carlo Scarpa, 1978", where: "San Vito d'Altivole, Italy", note: "An architect who believed death deserved the same beauty as life — every joint and water channel considered as if grief itself had been given form." },
];

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

const HAPPINESS_TECHNIQUES = [
  { name: "Three Good Things", what: "Writing three specific positive events each night rewires the brain toward noticing what's working.", steps: ["Write 3 specific good things today — small counts.", "For each: why did it happen? What does it mean?", "7 days in a row. The effect compounds."] },
  { name: "Savoring", what: "Deliberately slowing to absorb a good experience extends its emotional benefit.", steps: ["Choose one moment today and stop fully.", "Engage all senses. Stay 30 seconds longer.", "'I am taking this in.' Mean it."] },
  { name: "Awe Walk", what: "Deliberately seeking awe expands your sense of time and self.", steps: ["Walk 20 mins. Find something that makes you feel small — in a good way.", "Look up more than usual.", "When awe flickers: stop. Stay 30 seconds."] },
  { name: "Best Possible Self", what: "Vividly imagining your ideal future increases optimism today.", steps: ["10 mins: write your life 5 years from now. Everything went well.", "Be specific: where, who, what does Tuesday look like?", "Name one thing today that moves toward it."] },
  { name: "Gratitude Letter", what: "One of the highest-impact happiness interventions ever measured.", steps: ["Someone who shaped you and was never thanked.", "3–4 sentences: what they did and how it changed you.", "Send it today. Even a text."] },
  { name: "Anticipatory Savoring", what: "Looking forward produces nearly as much joy as the experience itself.", steps: ["Plan something specific this week. Not someday.", "Make it concrete: where, when, who.", "5 mins imagining it in detail. This is a practice."] },
  { name: "Meaningful Conversation", what: "Deeper conversations produce more happiness than surface chat.", steps: ["Ask one question deeper than usual: 'What's actually on your mind?'", "Listen to what they actually say.", "Share something true in return."] },
];

// ── Helpers (identical to page.tsx so picks match) ───────────────────────────

function seed(): number {
  const t = new Date();
  return t.getFullYear() * 10000 + (t.getMonth() + 1) * 100 + t.getDate();
}

function pick<T>(arr: T[]): T { return arr[seed() % arr.length]; }

function isWeekend(): boolean {
  const d = new Date().getDay();
  return d === 0 || d === 6;
}

function fmtDate(): string {
  const t = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const d = t.getDate();
  const suf = [11, 12, 13].includes(d) ? "th" : (["st", "nd", "rd"][(d % 10) - 1] || "th");
  return `${days[t.getDay()]} · ${months[t.getMonth()]} ${d}${suf}`;
}

// ── Message builder ──────────────────────────────────────────────────────────

function buildMessage(): string {
  const raison = pick(RAISONS);
  const art = pick(COLLECTION);
  const practice = isWeekend() ? pick(HAPPINESS_TECHNIQUES) : pick(ANXIETY_SKILLS);
  const practiceLabel = isWeekend() ? "Weekend Practice" : "Today's Skill";

  return [
    `Morning Brief — ${fmtDate()}`,
    "",
    `[ ${raison.tone} ]`,
    raison.text,
    "",
    "─────────────────",
    `Today's Beauty: ${art.name}`,
    `${art.who} · ${art.where}`,
    "",
    art.note,
    "",
    "─────────────────",
    `${practiceLabel}: ${practice.name}`,
    practice.what,
    "",
    practice.steps.map((s, i) => `${i + 1}. ${s}`).join("\n"),
  ].join("\n");
}

// ── Route handler ────────────────────────────────────────────────────────────

export async function GET() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM;
  const to = process.env.TWILIO_TO;

  if (!accountSid || !authToken || !from || !to) {
    return NextResponse.json({ error: "Missing Twilio env vars" }, { status: 500 });
  }

  try {
    const client = twilio(accountSid, authToken);
    const body = buildMessage();

    await client.messages.create({ from, to, body });

    return NextResponse.json({ ok: true, preview: body });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
