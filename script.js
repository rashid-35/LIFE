const state = {
    name: "",
    country: "",
    startingCountry: "",
    age: 17,
    personality: "balanced",
    day: 1,
    totalDays: 30,
    hour: 7,
    minute: 30,
    cash: 100,
    debt: 0,
    maxDebt: 500,
    groceries: { meals: 7, drinks: 10 },
    location: "home",
    stats: { health: 100, energy: 100, hunger: 100, hydration: 100, hygiene: 100, mood: 80 },
    skills: { education: 0, social: 0, fitness: 0, work: 0 },
    npcs: [],
    history: [],
    feed: [],
    currentSection: "places",
    weather: "clear",
    milestones: [],
    goals: [],
    daily: { activities: 0, spent: 0, earned: 0 },
    lastSummary: "",
    ended: false,
    achievements: [],
    npcMeetings: {},
    npcMemories: {},
    decisions: [],
    decisionFlags: {},
    timeline: [],
    totalEarned: 0,
    totalSpent: 0,
};

const WEATHER = {
    clear: { icon: "☀️", label: "Clear" },
    cloudy: { icon: "☁️", label: "Cloudy" },
    rain: { icon: "🌧️", label: "Rainy" },
    hot: { icon: "🌤️", label: "Hot" },
};

const SAVE_KEY = "life-save";

const COUNTRIES = {
    "United Arab Emirates": { flag: "🇦🇪" },
    Afghanistan: { flag: "🇦🇫" },
    Pakistan: { flag: "🇵🇰" },
    India: { flag: "🇮🇳" },
    Spain: { flag: "🇪🇸" },
};

const PERSONALITIES = {
    balanced: { label: "Balanced" },
    social: { label: "Social" },
    academic: { label: "Academic" },
    ambitious: { label: "Ambitious" },
    calm: { label: "Calm" },
};

const NPC_TRAITS = ["quiet", "funny", "serious", "kind", "restless", "thoughtful", "competitive", "easygoing"];

const GOALS = [
    { id: "health", text: "Keep your health above 80", test: () => state.stats.health >= 80 },
    { id: "study", text: "Reach 40 education", test: () => state.skills.education >= 40 },
    { id: "friend", text: "Build one close friendship", test: () => state.npcs.some(npc => npc.relationship >= 80) },
    { id: "save", text: "Save AED 250", test: () => state.cash >= 250 },
];

const PLACES = [
    { id: "home", emoji: "🏠", name: "Home", desc: "Rest, eat and drink from your groceries, shower, use your phone and watch TV." },
    { id: "school", emoji: "🏫", name: "School", desc: "Study, attend classes, and meet friends." },
    { id: "work", emoji: "💼", name: "Work", desc: "Earn money by working shifts." },
    { id: "gym", emoji: "🏋️", name: "Gym", desc: "Work out to improve fitness and health." },
    { id: "park", emoji: "🌳", name: "Park", desc: "Relax, socialize, and enjoy the outdoors." },
    { id: "mall", emoji: "🛍️", name: "Mall", desc: "Shop, eat out, and hang out with friends." },
    { id: "cafe", emoji: "☕", name: "Café", desc: "Grab a drink, study, or meet people." },
    { id: "hospital", emoji: "🏥", name: "Hospital", desc: "Get medical treatment when sick." },
];

const HOURS = {
    home: [0, 1440], school: [450, 870], work: [540, 1080], gym: [360, 1320],
    park: [360, 1320], mall: [600, 1320], cafe: [420, 1320], hospital: [0, 1440],
};

const JOBS = [
    { title: "Shop Assistant", education: 0, reputation: 0, pay: 55 },
    { title: "Office Assistant", education: 35, reputation: 15, pay: 75 },
    { title: "Sales Representative", education: 20, reputation: 45, pay: 85 },
    { title: "Junior Developer", education: 70, reputation: 20, pay: 110 },
    { title: "Team Coordinator", education: 50, reputation: 70, pay: 125 },
];

const ACTIVITIES = {
    home: [
        { id: "sleep", emoji: "😴", name: "Sleep", cost: 0, time: 480, effects: { energy: 60, health: 5, mood: 5 } },
        { id: "eat", emoji: "🍽️", name: "Eat Meal", cost: 0, time: 30, effects: { hunger: 40, mood: 5 }, grocery: "meals" },
        { id: "healthyMeal", emoji: "🥗", name: "Make Healthy Meal", cost: 0, time: 40, effects: { hunger: 35, health: 3, mood: 3 }, grocery: "meals" },
        { id: "drink", emoji: "💧", name: "Drink Water", cost: 0, time: 5, effects: { hydration: 30 }, grocery: "drinks" },
        { id: "juice", emoji: "🧃", name: "Have Juice", cost: 0, time: 5, effects: { hydration: 22, mood: 3 }, grocery: "drinks" },
        { id: "shower", emoji: "🚿", name: "Shower", cost: 2, time: 15, effects: { hygiene: 60, mood: 5 } },
        { id: "tv", emoji: "📺", name: "Watch TV", cost: 0, time: 60, effects: { mood: 15, energy: -5 } },
        { id: "phone", emoji: "📱", name: "Use Phone", cost: 0, time: 30, effects: { mood: 8, social: 2 } },
    ],
    school: [
        { id: "class", emoji: "📚", name: "Attend Class", cost: 0, time: 120, effects: { education: 8, energy: -15, mood: -5 } },
        { id: "study", emoji: "📖", name: "Study", cost: 0, time: 90, effects: { education: 10, energy: -10 } },
        { id: "library", emoji: "📕", name: "Library", cost: 0, time: 60, effects: { education: 6, mood: -3 } },
        { id: "socialize", emoji: "🗣️", name: "Socialize", cost: 0, time: 45, effects: { social: 8, mood: 10 } },
    ],
    work: [
        { id: "shift", emoji: "💼", name: "Work Shift", cost: 0, time: 240, effects: { income: 60, energy: -25, mood: -8, work: 5 } },
        { id: "overtime", emoji: "⏰", name: "Overtime", cost: 0, time: 180, effects: { income: 50, energy: -30, mood: -12, work: 4 } },
    ],
    gym: [
        { id: "workout", emoji: "🏋️", name: "Workout", cost: 8, time: 60, effects: { fitness: 10, health: 8, energy: -20, mood: 8 } },
        { id: "cardio", emoji: "🏃", name: "Cardio", cost: 5, time: 45, effects: { fitness: 8, health: 6, energy: -15, mood: 6 } },
    ],
    park: [
        { id: "walk", emoji: "🚶", name: "Take a Walk", cost: 0, time: 30, effects: { mood: 10, health: 3, energy: -5 } },
        { id: "jog", emoji: "🏃", name: "Jog", cost: 0, time: 40, effects: { fitness: 6, health: 5, energy: -15, mood: 8 } },
        { id: "meet", emoji: "👥", name: "Meet Friends", cost: 0, time: 60, effects: { social: 8, mood: 12 } },
    ],
    mall: [
        { id: "shop", emoji: "🛍️", name: "Go Shopping", cost: 30, time: 90, effects: { mood: 20, hygiene: 5 } },
        { id: "foodcourt", emoji: "🍔", name: "Food Court", cost: 15, time: 45, effects: { hunger: 35, mood: 10 } },
        { id: "groceries", emoji: "🛒", name: "Buy Groceries", cost: 45, time: 30, effects: {}, groceryPurchase: true },
        { id: "movie", emoji: "🎬", name: "Watch Movie", cost: 12, time: 120, effects: { mood: 25, energy: -5 } },
    ],
    cafe: [
        { id: "coffee", emoji: "☕", name: "Buy Coffee", cost: 5, time: 20, effects: { energy: 15, hydration: 10, mood: 5 } },
        { id: "cafe_study", emoji: "📖", name: "Study at Café", cost: 5, time: 60, effects: { education: 7, mood: 5 } },
        { id: "cafe_meet", emoji: "💬", name: "Meet Someone", cost: 5, time: 45, effects: { social: 8, mood: 10 } },
    ],
    hospital: [
        { id: "checkup", emoji: "🩺", name: "Checkup", cost: 25, time: 60, effects: { health: 30 } },
        { id: "treat", emoji: "💊", name: "Get Treatment", cost: 40, time: 90, effects: { health: 50, energy: -10 } },
    ],
};

const TRAVEL = [
    ["United Arab Emirates", "🇦🇪", 200], ["Afghanistan", "🇦🇫", 150],
    ["Pakistan", "🇵🇰", 120], ["India", "🇮🇳", 130], ["Spain", "🇪🇸", 180],
];

const NPC_DATA = [
    ["Albert Lalu", "best friend", "🙂"],
    ["Harshith Pradeep", "close friend", "😎"],
    ["Fares Yusuf", "connector", "🤓"],
    ["Anand John", "classmate", "😊"],
    ["Ryan Matthew", "sports friend", "😄"],
    ["Mohammed Shamil", "trusted friend", "🥳"],
    ["Yahya bin Navas", "mentor", "😌"],
    ["Omar Aslam", "banker", "🤗"],
    ["Mohammed Nadeem", "investor", "🧑‍💼"],
    ["Isaac Newton", "rival", "🧐"],
    ["Ahmed Raees", "entrepreneur", "💡"],
    ["Jishan Mohammed", "social friend", "🎉"],
    ["Saud.A", "academic", "📚"],
    ["Sultan", "football friend", "⚽"],
    ["Hyder", "quiet friend", "🙂"]
];

const EVENTS = [
    [0.22, "You had a quiet day.", "info", { mood: 4 }],
    [0.16, "You found AED 15 on the way home.", "good", {}, 15],
    [0.14, "You caught a cold.", "bad", { health: -5, energy: -8 }],
    [0.16, "A friend sent you a funny message.", "good", { mood: 7, social: 2 }],
    [0.12, "You had a productive morning.", "good", { energy: 5, mood: 4 }],
    [0.10, "A bill arrived.", "bad", {}, -25],
    [0.10, "Someone noticed your effort.", "good", { mood: 5, social: 3 }],
];

const clamp = (value, smallest, largest) => Math.max(smallest, Math.min(largest, value));
const money = value => "AED " + Math.round(value).toLocaleString();

function timeText() {
    const suffix = state.hour >= 12 ? "PM" : "AM";
    const hour = state.hour % 12 || 12;
    return hour + ":" + String(state.minute).padStart(2, "0") + " " + suffix;
}

function addFeed(text, type = "info") {
    const item = { day: state.day, time: timeText(), text, type };
    state.feed.unshift(item);
    state.history.push(item);
    state.feed = state.feed.slice(0, 50);
}

function saveGame() {
    if (!state.name || state.ended) return;
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

function loadGame() {
    try {
        const saved = JSON.parse(localStorage.getItem(SAVE_KEY));
        if (!saved || !saved.name) return false;
        Object.assign(state, saved);
        state.stats = { ...state.stats };
        state.skills = { ...state.skills };
        state.groceries = { meals: 0, drinks: 0, ...state.groceries };
        state.goals = Array.isArray(state.goals) ? state.goals : [];
        state.daily = { activities: 0, spent: 0, earned: 0, ...state.daily };
        state.lastSummary = state.lastSummary || "";
        state.history = Array.isArray(state.history) ? state.history : [];
        state.feed = Array.isArray(state.feed) ? state.feed : [];
        state.milestones = Array.isArray(state.milestones) ? state.milestones : [];
        state.achievements = Array.isArray(state.achievements) ? state.achievements : [];
        state.npcMeetings = state.npcMeetings && typeof state.npcMeetings === "object" ? state.npcMeetings : {};
        state.npcMemories = state.npcMemories && typeof state.npcMemories === "object" ? state.npcMemories : {};
        state.decisions = Array.isArray(state.decisions) ? state.decisions : [];
        state.decisionFlags = state.decisionFlags && typeof state.decisionFlags === "object" ? state.decisionFlags : {};
        state.timeline = Array.isArray(state.timeline) ? state.timeline : [];
        state.totalEarned = Number(state.totalEarned) || 0;
        state.totalSpent = Number(state.totalSpent) || 0;
        state.npcs = (Array.isArray(state.npcs) ? state.npcs : []).map((npc, idx) => ({
            ...npc,
            role: npc.role || (NPC_DATA[idx] ? NPC_DATA[idx][1] : "friend"),
            trait: npc.trait || NPC_TRAITS[idx % NPC_TRAITS.length],
            relationship: clamp(Number(npc.relationship) || 0, 0, 100),
        }));
        state.location = PLACES.some(place => place.id === state.location) ? state.location : "home";
        state.currentSection = ["places", "activities", "travel"].includes(state.currentSection) ? state.currentSection : "places";
        state.weather = WEATHER[state.weather] ? state.weather : "clear";
        document.getElementById("intro").classList.add("hidden");
        document.getElementById("game").classList.remove("hidden");
        updateLocation();
        render();
        return true;
    } catch (error) {
        localStorage.removeItem(SAVE_KEY);
        return false;
    }
}

function showSetup() {
    document.getElementById("landing").classList.add("hidden");
    document.getElementById("intro").classList.remove("hidden");
    const nameInput = document.getElementById("name");
    if (nameInput) nameInput.focus();
}

function continueGame() {
    if (!loadGame()) localStorage.removeItem(SAVE_KEY);
}

function clearSave() {
    localStorage.removeItem(SAVE_KEY);
}

function addMilestone(title, detail) {
    if (state.milestones.some(item => item.title === title)) return;
    state.milestones.push({ title, detail, day: state.day });
    addFeed("Milestone: " + title + ".", "good");
}

const ACHIEVEMENTS = [
    { id: "first_step", title: "First Step", detail: "Complete your first activity.", test: () => state.daily.activities >= 1 },
    { id: "good_friend", title: "Good Friend", detail: "Reach 80% with someone.", test: () => state.npcs.some(npc => npc.relationship >= 80) },
    { id: "well_travelled", title: "Well Travelled", detail: "Visit a country different from where you started.", test: () => state.country !== state.startingCountry },
    { id: "hard_worker", title: "Hard Worker", detail: "Earn at least AED 250 in one life.", test: () => (Number(state.totalEarned) || 0) >= 250 },
    { id: "scholar", title: "Scholar", detail: "Reach 60 education.", test: () => state.skills.education >= 60 },
    { id: "balanced_life", title: "Balanced Life", detail: "Finish with health and mood at 70 or higher.", test: () => state.ended && state.stats.health >= 70 && state.stats.mood >= 70 },
];

const DECISION_MOMENTS = [
    {
        id: "school_opportunity",
        day: 5,
        title: "An Unexpected Opportunity",
        text: "A friend asks you to help with an important school project. You have studying to do too.",
        options: [
            ["Help your friend", "Social +8 • Education -2 • Relationship +10", () => { state.skills.social += 8; state.skills.education = Math.max(0, state.skills.education - 2); changeNpc(10); }],
            ["Study for yourself", "Education +8 • Social -2", () => { state.skills.education += 8; state.skills.social = Math.max(0, state.skills.social - 2); }],
            ["Try to do both", "Education +4 • Social +4 • Energy -8", () => { state.skills.education += 4; state.skills.social += 4; state.stats.energy = clamp(state.stats.energy - 8, 0, 100); }]
        ]
    },
    {
        id: "money_choice",
        day: 10,
        title: "A Chance to Earn",
        text: "Someone offers you a quick paid task, but it will take time away from your plans.",
        options: [
            ["Take the opportunity", "Earn AED 45 • Work +6 • Energy -10", () => { state.cash += 45; state.totalEarned += 45; state.skills.work += 6; state.stats.energy = clamp(state.stats.energy - 10, 0, 100); }],
            ["Focus on your goals", "Education +5 • Mood +3", () => { state.skills.education += 5; state.stats.mood = clamp(state.stats.mood + 3, 0, 100); }],
            ["Ask a friend to join", "Social +6 • Work +3 • Earn AED 20", () => { state.skills.social += 6; state.skills.work += 3; state.cash += 20; state.totalEarned += 20; changeNpc(6); }]
        ]
    },
    {
        id: "future_choice",
        day: 20,
        title: "What Matters Most?",
        text: "Adult life has started. You have limited time and money. What do you prioritize?",
        options: [
            ["Build your career", "Work +8 • Education +3 • Mood -3", () => { state.skills.work += 8; state.skills.education += 3; state.stats.mood = clamp(state.stats.mood - 3, 0, 100); }],
            ["Invest in relationships", "Social +8 • Mood +8 • Relationship +10", () => { state.skills.social += 8; state.stats.mood = clamp(state.stats.mood + 8, 0, 100); changeNpc(10); }],
            ["Invest in yourself", "Fitness +6 • Health +5 • Mood +5", () => { state.skills.fitness += 6; state.stats.health = clamp(state.stats.health + 5, 0, 100); state.stats.mood = clamp(state.stats.mood + 5, 0, 100); }]
        ]
    }
];

function changeNpc(amount) {
    const npc = state.npcs.slice().sort((a,b) => b.relationship - a.relationship)[0];
    if (npc) npc.relationship = clamp(npc.relationship + amount, 0, 100);
    return npc || null;
}

function rememberNpc(name, text, sentiment = "neutral") {
    if (!name) return;
    if (!state.npcMemories[name]) state.npcMemories[name] = [];
    state.npcMemories[name].push({ day: state.day, text, sentiment });
    state.npcMemories[name] = state.npcMemories[name].slice(-8);
}

function rememberDecisionWithNpc(id, index) {
    const npc = state.npcs.slice().sort((a,b) => b.relationship - a.relationship)[0];
    if (!npc) return;
    const memories = {
        school_opportunity: [
            "You helped when I needed you for the school project.",
            "You chose to focus on your own studies instead of helping me.",
            "You tried to balance helping me and studying."
        ],
        money_choice: [
            "You took an opportunity to earn money.",
            "You chose your goals instead of chasing quick money.",
            "You invited a friend to join you in an earning opportunity."
        ],
        future_choice: [
            "You told me your career was a priority.",
            "You made relationships a priority when adult life got busy.",
            "You decided to invest in yourself and your wellbeing."
        ]
    };
    const text = (memories[id] && memories[id][index]) || "You made an important choice.";
    rememberNpc(npc.name, text, index === 0 || index === 2 ? "positive" : "negative");
}

function npcReaction(npc) {
    const memories = state.npcMemories[npc.name] || [];
    if (!memories.length) return "We are still getting to know each other.";
    const last = memories[memories.length - 1];
    if (last.sentiment === "positive") return "I remember Day " + last.day + " — " + last.text + " It made an impression on me.";
    if (last.sentiment === "negative") return "I remember Day " + last.day + " — " + last.text + " I haven't forgotten that.";
    return "I remember Day " + last.day + " — " + last.text;
}

function npcMemoryList(npc) {
    const memories = state.npcMemories[npc.name] || [];
    if (!memories.length) return "<p class='modal-intro'>No specific memories yet. Your future choices can change that.</p>";
    return "<h3 class='report-heading'>🧠 What they remember</h3>" +
        memories.slice().reverse().map(memory => "<div class='feed-item " +
        (memory.sentiment === "positive" ? "good" : memory.sentiment === "negative" ? "bad" : "info") +
        "'><span class='time-tag'>Day " + memory.day + "</span>" + memory.text + "</div>").join("");
}

function addTimeline(title, detail) {
    state.timeline.push({ day: state.day, title, detail });
    state.timeline = state.timeline.slice(-30);
}

function maybeDecisionMoment() {
    const moment = DECISION_MOMENTS.find(item => item.day === state.day && !state.decisionFlags[item.id]);
    if (!moment || state.ended) return;
    state.decisionFlags[moment.id] = true;
    showDecision(moment);
}

function showDecision(moment) {
    const buttons = moment.options.map((option, index) =>
        "<button class='decision-card' onclick='chooseDecision(" + JSON.stringify(moment.id) + "," + index + ")'>" +
        "<strong>" + option[0] + "</strong><span>" + option[1] + "</span></button>"
    ).join("");
    showModal("⚖️ " + moment.title, "<p class='decision-text'>" + moment.text + "</p><div class='decision-options'>" + buttons + "</div>");
}

function chooseDecision(id, index) {
    const moment = DECISION_MOMENTS.find(item => item.id === id);
    if (!moment || !moment.options[index]) return;
    const option = moment.options[index];
    option[2]();
    rememberDecisionWithNpc(id, index);
    state.decisions.push({ day: state.day, title: moment.title, choice: option[0], id });
    addTimeline(moment.title, option[0] + ". " + option[1]);
    addFeed("Decision: " + moment.title + " — " + option[0] + ".", "good");
    closeModal();
    updateGoals(); updateAchievements(); render(); saveGame();
}

function updateAchievements() {
    ACHIEVEMENTS.forEach(achievement => {
        if (achievement.test() && !state.achievements.includes(achievement.id)) {
            state.achievements.push(achievement.id);
            addFeed("Achievement unlocked: " + achievement.title + ".", "good");
        }
    });
}

function updateGoals() {
    GOALS.forEach(goal => {
        if (goal.test() && !state.goals.includes(goal.id)) {
            state.goals.push(goal.id);
            addFeed("Goal complete: " + goal.text + ".", "good");
        }
    });
}

function dailySummary() {
    state.lastSummary = "Day " + state.day + ": " + state.daily.activities + " activities, " + money(state.daily.earned) + " earned, " + money(state.daily.spent) + " spent.";
    addFeed(state.lastSummary, "info");
    state.daily = { activities: 0, spent: 0, earned: 0 };
}

function updateMilestones() {
    if (state.skills.education >= 35) addMilestone("Study target", "Education reached 35.");
    if (state.skills.fitness >= 35) addMilestone("Fitness target", "Fitness reached 35.");
    if (getReputation() >= 80) addMilestone("Popular", "Your average relationship reached 80%.");
    if (state.country !== state.startingCountry && state.country) addMilestone("Travelled", "You visited another country.");
    if (state.cash >= 250) addMilestone("Saved AED 250", "Your cash reached AED 250.");
}

function applyEffects(effects = {}) {
    Object.entries(effects).forEach(([key, amount]) => {
        if (key in state.stats) state.stats[key] = clamp(state.stats[key] + amount, 0, 100);
        if (key in state.skills) state.skills[key] = Math.max(0, state.skills[key] + amount);
    });
}

function advanceNeeds(minutes) {
    if (state.ended || minutes <= 0) return;

    const hoursPassed = minutes / 60;
    applyEffects({
        energy: -hoursPassed * 0.35,
        hunger: -hoursPassed * 4,
        hydration: -hoursPassed * 6,
        hygiene: -hoursPassed * 0.5,
        mood: -hoursPassed * 0.15,
    });

    if (state.stats.hunger < 20) state.stats.health = clamp(state.stats.health - (minutes / 60) * 0.5, 0, 100);
    if (state.stats.hydration < 20) state.stats.health = clamp(state.stats.health - (minutes / 60) * 0.7, 0, 100);
    if (state.stats.hygiene < 20) state.stats.health = clamp(state.stats.health - (minutes / 60) * 0.3, 0, 100);
}

function advanceDay() {
    if (state.ended) return;

    dailySummary();
    state.day++;
    if (state.stats.hunger < 20) state.stats.health = clamp(state.stats.health - 5, 0, 100);
    if (state.stats.hydration < 20) state.stats.health = clamp(state.stats.health - 5, 0, 100);
    if (state.stats.hygiene < 20) state.stats.health = clamp(state.stats.health - 3, 0, 100);

    state.totalEarned = Number(state.totalEarned) || 0;
    state.totalSpent = Number(state.totalSpent) || 0;
    if (state.debt > 0) {
        const interest = Math.round(state.debt * 0.05);
        state.debt = clamp(state.debt + interest, 0, state.maxDebt);
        addFeed("Debt interest added: +" + money(interest) + ".", "bad");
    }

    addFeed("Day " + state.day + ".");
    const event = EVENTS.find(item => Math.random() < item[0]);
    if (event && state.day <= state.totalDays) {
        applyEffects(event[3]);
        if (event[4]) {
            if (event[4] > 0) state.cash += event[4];
            else {
                const bill = Math.abs(event[4]);
                const paid = Math.min(state.cash, bill);
                state.cash -= paid;
                state.debt = clamp(state.debt + bill - paid, 0, state.maxDebt);
            }
        }
        addFeed(event[1], event[2]);
    }
    updateGoals();
    updateAchievements();
    maybeDecisionMoment();

    state.weather = Object.keys(WEATHER)[Math.floor(Math.random() * Object.keys(WEATHER).length)];
    if (state.location === "school" && state.day > 15) {
        state.location = "home";
        updateLocation();
    }
    updateMilestones();
    checkGameOver();
    if (state.day > state.totalDays && !state.ended) endGame();
}

function addMinutes(minutes) {
    if (!Number.isFinite(minutes) || minutes <= 0 || state.ended) return;

    advanceNeeds(minutes);

    const totalMinutes = state.hour * 60 + state.minute + minutes;
    const daysPassed = Math.floor(totalMinutes / 1440);
    const remainingMinutes = totalMinutes % 1440;

    state.hour = Math.floor(remainingMinutes / 60);
    state.minute = remainingMinutes % 60;

    for (let idx = 0; idx < daysPassed && !state.ended; idx++) {
        advanceDay();
    }
}

function startGame() {
    if (localStorage.getItem(SAVE_KEY) && !window.confirm("Start a new life and replace your saved game?")) return;
    state.name = document.getElementById("name").value.trim() || "Player";
    state.country = document.getElementById("country").value;
    state.startingCountry = state.country;
    state.age = clamp(parseInt(document.getElementById("age").value, 10) || 17, 16, 80);
    state.personality = document.getElementById("personality").value;
    state.day = 1; state.hour = 7; state.minute = 30; state.cash = 100; state.debt = 0;
    state.groceries = { meals: 7, drinks: 10 }; state.location = "home"; state.ended = false;
    state.stats = { health: 100, energy: 100, hunger: 100, hydration: 100, hygiene: 100, mood: 80 };
    state.skills = { education: 0, social: 0, fitness: 0, work: 0 };
    state.feed = []; state.history = []; state.currentSection = "places";
    state.weather = "clear";
    state.milestones = [];
    state.goals = [];
    state.daily = { activities: 0, spent: 0, earned: 0 };
    state.lastSummary = "";
    state.achievements = [];
    state.npcMeetings = {};
    state.npcMemories = {};
    state.decisions = [];
    state.decisionFlags = {};
    state.timeline = [{ day: 1, title: "Life begins", detail: "You started a new life with AED 100." }];
    state.totalEarned = 0;
    state.totalSpent = 0;
    state.npcs = NPC_DATA.map(([name, role, emoji], idx) => ({
        name,
        emoji,
        role,
        trait: NPC_TRAITS[idx % NPC_TRAITS.length],
        relationship: 20 + Math.floor(Math.random() * 40),
    }));

    document.getElementById("intro").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");
    addFeed("You arrived in " + state.country + ". Cash: AED 100.");
    addFeed("Day 1. You have a lot of choices ahead.");
    updateLocation();
    render();
    saveGame();
}

function updateLocation() {
    const place = PLACES.find(item => item.id === state.location);
    if (!place) return;
    document.getElementById("locationTitle").textContent = place.emoji + " " + place.name;
    document.getElementById("locationDesc").textContent = place.desc;
}

function available(placeId) {
    if (placeId === "school" && state.day > 15) return false;
    if (placeId === "work" && state.day <= 15) return false;
    const [open, close] = HOURS[placeId] || [0, 1440];
    const now = state.hour * 60 + state.minute;
    return open === 0 && close === 1440 || now >= open && now < close;
}

function goTo(placeId) {
    if (state.ended) return;
    const place = PLACES.find(item => item.id === placeId);
    if (!place) return;
    if (state.location === placeId) {
        addFeed("You're already at " + place.name + ".");
    } else if (!available(placeId)) {
        addFeed(place.name + " is closed right now.", "bad");
    } else {
        state.location = placeId;
        addMinutes(15);
        addFeed("You went to " + place.name + ".");
        updateLocation();
    }
    render();
    saveGame();
}

function showSection(section) {
    state.currentSection = section;
    ["place", "activity", "travel"].forEach(name => document.getElementById(name + "Tab").classList.toggle("active", section === name + "s"));
    renderMainGrid();
}

function doActivity(id) {
    if (state.ended) return;
    const activity = (ACTIVITIES[state.location] || []).find(item => item.id === id);
    if (!activity) return;
    if (!available(state.location)) return addFeed("This place is closed right now.", "bad"), render();
    if (activity.cost > state.cash) return addFeed("You can't afford that.", "bad"), render();
    if (activity.grocery && state.groceries[activity.grocery] <= 0) return addFeed("You're out of that. Buy more groceries at the mall.", "bad"), render();

    if (activity.id === "shift" && state.age < 18) {
        return addFeed("You need to be 18 to work a regular shift.", "bad"), render();
    }
    if (activity.id === "overtime" && state.age < 18) {
        return addFeed("Overtime is not available until you're 18.", "bad"), render();
    }
    if (activity.grocery) state.groceries[activity.grocery]--;
    if (activity.groceryPurchase) {
        state.groceries.meals += 7;
        state.groceries.drinks += 10;
        addFeed("You bought groceries: 7 meals and 10 drinks.", "good");
    }
    state.cash -= activity.cost;
    state.daily.spent += activity.cost;
    state.totalSpent = (Number(state.totalSpent) || 0) + activity.cost;
    state.daily.activities++;
    const effects = { ...activity.effects };
    if (activity.id === "sleep" && (state.stats.hunger < 30 || state.stats.hydration < 30)) {
        effects.energy = 35;
        effects.mood = -5;
        addFeed("You slept badly because you were hungry or thirsty.", "bad");
    }
    applyEffects(effects);
    if (activity.effects.income) {
        const job = getJob();
        const income = activity.id === "shift" ? job.pay : activity.effects.income;
        state.cash += income;
        state.daily.earned += income;
        state.totalEarned = (Number(state.totalEarned) || 0) + income;
        addFeed("You earned " + money(income) + " as a " + job.title + ".", "good");
    }
    if (state.personality === "academic" && activity.effects.education) state.skills.education += 3;
    if (state.personality === "social" && activity.effects.social) state.skills.social += 3;
    if (state.personality === "ambitious" && activity.effects.income) state.skills.work += 2;
    if (state.personality === "calm" && activity.id === "sleep") state.stats.mood = clamp(state.stats.mood + 5, 0, 100);
    addMinutes(activity.time);
    addFeed(activity.name + " done.");

    addTimeline(activity.name, "You chose to " + activity.name.toLowerCase() + ".");
    if (["socialize", "meet", "cafe_meet"].includes(id)) {
        const npc = state.npcs[Math.floor(Math.random() * state.npcs.length)];
        if (npc) {
            npc.relationship = clamp(npc.relationship + 5, 0, 100);
            rememberNpc(npc.name, "You spent time with me and made an effort to stay connected.", "positive");
        }
    }
    updateMilestones();
    updateGoals();
    updateAchievements();
    checkGameOver();
    render();
    saveGame();
}

function getReputation() {
    return state.npcs.length ? Math.round(state.npcs.reduce((aggregate, npc) => aggregate + npc.relationship, 0) / state.npcs.length) : 0;
}

function getJob() {
    const qualified = JOBS.filter(job => state.skills.education >= job.education && getReputation() >= job.reputation);
    return qualified[qualified.length - 1] || JOBS[0];
}

function skipDay() {
    if (state.ended) return;
    addFeed("You skipped the rest of the day.");
    const minutesUntilMorning = (1440 - (state.hour * 60 + state.minute)) + 450;
    addMinutes(minutesUntilMorning);
    state.hour = 7; state.minute = 30;
    checkGameOver();
    render();
    saveGame();
}

function travelTo(country) {
    if (state.ended) return;
    if (state.age < 18) return addFeed("You need to be 18 to travel alone.", "bad"), render();
    const trip = TRAVEL.find(item => item[0] === country);
    if (!trip) return;
    if (state.country === country) return addFeed("You're already in " + country + "."), render();
    if (state.cash < trip[2]) return addFeed("You can't afford that trip.", "bad"), render();
    if (!window.confirm("Travel to " + country + " for " + money(trip[2]) + "?")) return;
    state.cash -= trip[2]; state.country = country; addMinutes(240);
    addMilestone("Travelled", "You visited another country.");
    addTimeline("Travelled to " + country, "You spent " + money(trip[2]) + " to experience a new country.");
    addFeed("You traveled to " + country + ".", "good");
    render();
    saveGame();
}

function checkGameOver() {
    if (state.stats.health <= 0) endGame("Your health reached zero. You didn't survive.");
    else if (state.debt >= state.maxDebt) endGame("Your debt reached the maximum. You went bankrupt.");
    else if (state.day > state.totalDays) endGame();
    else if (state.stats.mood >= 90 && state.stats.health >= 80) addMilestone("Good health", "Your health and mood are both high.");
}

function getLifeOutcome() {
    const score = state.stats.health + state.stats.mood + state.skills.education + state.skills.social + state.skills.fitness + state.skills.work + Math.min(state.cash, 300) / 3;
    if (state.debt >= 250) return ["⚠️ The Hard Lesson", "Money and pressure shaped your month. Your choices show how quickly small costs can grow."];
    if (state.skills.education >= 70 && state.skills.education >= state.skills.social && state.skills.education >= state.skills.fitness) return ["🎓 The Scholar", "You built your future around learning and discipline."];
    if (state.skills.work >= 60 && state.cash >= 200) return ["💼 The Career Builder", "You turned limited time into experience, income and opportunity."];
    if (state.skills.social >= 65 && getReputation() >= 65) return ["🤝 The People Person", "Your strongest investment was the people around you."];
    if (state.skills.fitness >= 60 && state.stats.health >= 75) return ["🏃 The Athlete", "You prioritized energy, fitness and taking care of yourself."];
    if (state.country !== state.startingCountry && state.country) return ["🌍 The Explorer", "You chose experiences and stepped beyond what was familiar."];
    if (state.stats.health >= 70 && state.stats.mood >= 70 && state.skills.social >= 35 && state.skills.education >= 35) return ["🌱 The Balanced Life", "You found a way to make room for health, learning and people."];
    if (score < 250) return ["🧭 The Missed Opportunities", "Your month was full of choices that could have gone differently. That is part of LIFE."];
    return ["⭐ The All-Rounder", "You built a varied life without letting one area completely take over."];
}

const DECISION_OUTCOMES = {
    school_opportunity: [
        ["Help your friend", "🤝 The People Person", "You would have strengthened relationships by putting someone else first."],
        ["Study for yourself", "🎓 The Scholar", "You would have pushed education higher, trading some social progress for academic progress."],
        ["Try to do both", "🌱 The Balanced Life", "You would have balanced social and academic progress, but spent more energy."]
    ],
    money_choice: [
        ["Take the opportunity", "💼 The Career Builder", "You would have gained work experience and extra money, but lost some energy."],
        ["Focus on your goals", "🎓 The Scholar", "You would have strengthened education and mood instead of taking the quick earning opportunity."],
        ["Ask a friend to join", "🤝 The People Person", "You would have combined earning with teamwork and a stronger relationship."]
    ],
    future_choice: [
        ["Build your career", "💼 The Career Builder", "You would have prioritized work and education, with less room for mood."],
        ["Invest in relationships", "🤝 The People Person", "You would have made people the center of adult life and improved social skill and mood."],
        ["Invest in yourself", "🏃 The Athlete", "You would have focused on fitness, health and personal wellbeing."]
    ]
};

function outcomeCardsForDecision(decision) {
    const options = DECISION_OUTCOMES[decision.id];
    if (!options) return "";
    return "<div class='outcome-paths'>" + options.map(item => {
        const chosen = item[0] === decision.choice;
        return "<div class='outcome-path " + (chosen ? "chosen" : "") + "'>" +
            "<div class='outcome-path-top'>" + (chosen ? "✓ YOUR CHOICE" : "ALTERNATIVE PATH") + "</div>" +
            "<strong>" + item[1] + "</strong>" +
            "<p><b>If you chose " + item[0] + ":</b> " + item[2] + "</p></div>";
    }).join("") + "</div>";
}

function whatIfSummary() {
    if (!state.decisions.length) return "<p class='modal-intro'>No major recorded decisions yet.</p>";
    return state.decisions.slice().reverse().map(item =>
        "<div class='judge-decision'><h4>Day " + item.day + " — " + item.title + "</h4><p>You chose <strong>" + item.choice + "</strong>.</p>" + outcomeCardsForDecision(item) + "</div>"
    ).join("");
}

function gradeFor(value) {
    if (value >= 85) return "A";
    if (value >= 70) return "B";
    if (value >= 55) return "C";
    if (value >= 40) return "D";
    return "F";
}

function reportCardHtml() {
    const rows = [
        ["Health & Wellbeing", state.stats.health, "How well you cared for yourself."],
        ["Education", state.skills.education, "Learning and study progress."],
        ["Relationships", getReputation(), "Average strength of your relationships."],
        ["Fitness", state.skills.fitness, "Physical activity and fitness progress."],
        ["Work & Career", state.skills.work, "Experience, earning and career progress."],
        ["Mood", state.stats.mood, "How positively your month ended."]
    ];
    const average = rows.reduce((sum,row) => sum + Number(row[1]), 0) / rows.length;
    return "<h3 class='report-heading'>📋 FINAL REPORT CARD</h3><div class='report-card'>" +
        rows.map(row => "<div class='grade-row'><div><strong>" + row[0] + "</strong><span>" + row[2] + "</span></div><b>" + gradeFor(row[1]) + "</b><em>" + Math.round(row[1]) + "/100</em></div>").join("") +
        "<div class='overall-grade'><span>OVERALL LIFE GRADE</span><strong>" + gradeFor(average) + "</strong><em>" + Math.round(average) + "/100</em></div></div>";
}

function judgeReportHtml() {
    const outcome = getLifeOutcome();
    const decisionHtml = state.decisions.length ? whatIfSummary() : DECISION_MOMENTS.map(moment => {
        const fake = { id: moment.id, day: moment.day, title: moment.title, choice: "" };
        return "<div class='judge-decision'><h4>Day " + moment.day + " — " + moment.title + "</h4>" + outcomeCardsForDecision(fake) + "</div>";
    }).join("");
    return "<p class='modal-intro'>Judge Mode shows your current outcome, every major decision path, and a brief explanation of what each alternative could have changed.</p>" +
        "<div class='outcome-banner'><span>🏁 CURRENT OUTCOME — " + outcome[0] + "</span><strong>" + outcome[1] + "</strong></div>" +
        "<h3 class='report-heading'>🔀 ALL POSSIBLE DECISION PATHS</h3>" + decisionHtml + reportCardHtml();
}

function openJudgeMode() {
    showModal("🎬 JUDGE MODE", judgeReportHtml() + "<button class='primary' onclick='closeModal()'>BACK TO LIFE</button>");
}

function whatIfSummary() {
    if (!state.decisions.length) return "You made no major recorded decisions.";
    return state.decisions.slice(-3).map(item => "<div class='feed-item info'><strong>Day " + item.day + " — " + item.title + "</strong><br>You chose <strong>" + item.choice + "</strong>.<br><span style='color:var(--muted)'>A different choice could have changed another part of your life.</span></div>").join("");
}

function endGame(reason) {
    if (state.ended) return;
    state.ended = true;
    clearSave();
    updateAchievements();
    const outcome = getLifeOutcome();
    const bestFriend = state.npcs.slice().sort((a,b) => b.relationship - a.relationship)[0];
    const weakest = Object.entries(state.skills).sort((a,b) => a[1] - b[1])[0];
    const strongest = Object.entries(state.skills).sort((a,b) => b[1] - a[1])[0];
    const report = "<p>" + (reason || "Thirty days are up. Here's how things turned out.") + "</p>" + reportCardHtml() +
        "<div class='outcome-banner'><span>" + outcome[0] + "</span><strong>" + outcome[1] + "</strong></div>" +
        "<div class='report-grid' style='margin-top:16px'>" +
        "<div><span>Cash</span><strong>" + money(state.cash) + "</strong></div>" +
        "<div><span>Debt</span><strong>" + money(state.debt) + "</strong></div>" +
        "<div><span>Education</span><strong>" + Math.round(state.skills.education) + "</strong></div>" +
        "<div><span>Fitness</span><strong>" + Math.round(state.skills.fitness) + "</strong></div>" +
        "<div><span>Social</span><strong>" + Math.round(state.skills.social) + "</strong></div>" +
        "<div><span>Work</span><strong>" + Math.round(state.skills.work) + "</strong></div></div>" +
        "<p style='margin-top:14px'><strong>Strongest:</strong> " + strongest[0] + " &nbsp; <strong>Needs work:</strong> " + weakest[0] + "<br><strong>Closest relationship:</strong> " + (bestFriend ? bestFriend.name + " (" + bestFriend.relationship + "%)" : "None") + "</p>" +
        "<p style='margin-top:14px'><strong>Goals:</strong> " + state.goals.length + " / " + GOALS.length + " · <strong>Achievements:</strong> " + state.achievements.length + " / " + ACHIEVEMENTS.length + "<br><strong>Total earned:</strong> " + money(state.totalEarned || 0) + " · <strong>Total spent:</strong> " + money(state.totalSpent || 0) + "</p>" +
        "<h3 class='report-heading'>✨ Your Life Timeline</h3><div class='timeline report-timeline'>" + state.timeline.slice().reverse().slice(0, 8).map(item => "<div class='timeline-item'><div class='timeline-dot'>•</div><div><strong>Day " + item.day + " — " + item.title + "</strong><br><span>" + item.detail + "</span></div></div>").join("") + "</div>" +
        "<h3 class='report-heading'>🔀 What If?</h3>" + whatIfSummary() +
        "<button class='primary' onclick='restartGame()'>START OVER</button>";
    showModal("🏁 YOUR LIFE REPORT", report);
}
function showModal(title, content) {
    document.getElementById("modalBox").innerHTML = "<button class='close' onclick='closeModal()' aria-label='Close'>×</button><h2>" + title + "</h2>" + content;
    document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("modal").classList.add("hidden");
}

function handleModalClick(event) {
    if (event.target.id === "modal") closeModal();
}

function restartGame() {
    closeModal();
    state.ended = false;
    clearSave();
    document.getElementById("game").classList.add("hidden");
    document.getElementById("intro").classList.add("hidden");
    document.getElementById("landing").classList.remove("hidden");
    document.getElementById("landingContinue").classList.add("hidden");
}

function phone() {
    showModal("📱 Phone", "<button class='option' onclick='bankApp()'><span class='opt-title'>🏦 Bank</span><span class='opt-sub'>Check balance and loans</span></button><button class='option' onclick='messagesApp()'><span class='opt-title'>💬 Messages</span><span class='opt-sub'>Chat with friends</span></button><button class='option' onclick='jobsApp()'><span class='opt-title'>💼 Jobs</span><span class='opt-sub'>Look for work</span></button><button class='option' onclick='goalsApp()'><span class='opt-title'>✓ Goals</span><span class='opt-sub'>See what you are working toward</span></button><button class='option' onclick='achievementsModal()'><span class='opt-title'>🏆 Achievements</span><span class='opt-sub'>Track special milestones</span></button><button class='option' onclick='openJudgeMode()'><span class='opt-title'>🎬 Judge Mode</span><span class='opt-sub'>See what other choices could have changed</span></button>");
}

function goalsApp() {
    const html = GOALS.map(goal => "<div class='feed-item " + (state.goals.includes(goal.id) ? "good" : "info") + "'>" + (state.goals.includes(goal.id) ? "✓ " : "") + goal.text + "</div>").join("");
    showModal("Goals", html);
}

function bankApp() {
    let html = "<p>Balance: <strong>" + money(state.cash) + "</strong></p><p>Debt: <strong>" + money(state.debt) + " / " + money(state.maxDebt) + "</strong></p>";
    if (state.debt < state.maxDebt) html += "<button class='option' onclick='takeLoan(50)'>Take AED 50 loan</button><button class='option' onclick='takeLoan(100)'>Take AED 100 loan</button>";
    if (state.debt > 0) html += "<button class='option' onclick='repayLoan()'>Repay debt</button>";
    showModal("🏦 Bank", html);
}

function takeLoan(amount) {
    const actual = Math.min(amount, state.maxDebt - state.debt);
    if (!actual || !window.confirm("Borrow " + money(actual) + "? Interest is added each day.")) return;
    state.debt += actual; state.cash += actual;
    addFeed("You took a loan of " + money(actual) + ".", "bad"); closeModal(); render(); saveGame();
}

function repayLoan() {
    const amount = Math.min(state.cash, state.debt);
    state.cash -= amount; state.debt -= amount;
    addFeed("You repaid " + money(amount) + " of your debt.", "good"); closeModal(); render(); saveGame();
}

function messagesApp() {
    let html = "";
    state.npcs.forEach(npc => { html += "<button class='option' onclick='chatWith(" + JSON.stringify(npc.name) + ")'><span class='opt-title'>" + npc.emoji + " " + npc.name + "</span><span class='opt-sub'>" + npc.role + " · Relationship " + npc.relationship + "%</span></button>"; });
    showModal("💬 Messages", html);
}

function chatWith(name) {
    const npc = state.npcs.find(item => item.name === name);
    if (!npc) return;
    const meetings = Number(state.npcMeetings[name] || 0);
    let extra = "<p style='color:var(--muted);font-size:12px;margin-bottom:10px;'>" + npc.role + " · " + npc.trait + " · " + meetings + " conversations</p><p class='modal-intro'>“" + npcReaction(npc) + "”</p>" + npcMemoryList(npc);
    if (npc.role === "mentor") extra += "<button class='option' onclick='mentorAdvice()'>🧭 Ask for advice (+education)</button>";
    if (npc.role === "banker") extra += "<button class='option' onclick='bankTip()'>🏦 Ask for a money tip</button>";
    if (npc.role === "investor") extra += "<button class='option' onclick='investorPitch()'>💡 Pitch an idea</button>";
    if (npc.role === "rival") extra += "<button class='option' onclick='rivalChallenge()'>🏁 Friendly challenge</button>";
    showModal("💬 " + name, extra + "<button class='option' onclick='chatAction(" + JSON.stringify(name) + ", 5)'>😊 Friendly chat (+5)</button><button class='option' onclick='chatAction(" + JSON.stringify(name) + ", 10)'>🎁 Give a gift (+10, costs AED 20)</button><button class='option' onclick='chatAction(" + JSON.stringify(name) + ", -5)'>😒 Be rude (-5)</button>");
}

function mentorAdvice() {
    state.skills.education += 5;
    state.stats.mood = clamp(state.stats.mood + 3, 0, 100);
    addFeed("Your mentor gave you useful advice. Education +5.", "good");
    closeModal(); render(); saveGame();
}

function bankTip() {
    state.skills.work += 3;
    state.stats.mood = clamp(state.stats.mood + 2, 0, 100);
    addFeed("You learned a practical money tip. Work skill +3.", "good");
    closeModal(); render(); saveGame();
}

function investorPitch() {
    if (state.skills.work < 10) {
        addFeed("Your pitch needs more experience. Build your work skill first.", "bad");
        return;
    }
    state.cash += 35;
    state.totalEarned = (Number(state.totalEarned) || 0) + 35;
    state.skills.work += 5;
    addFeed("Your idea got a small vote of confidence: AED 35.", "good");
    closeModal(); render(); saveGame();
}

function rivalChallenge() {
    const fitness = state.skills.fitness + state.skills.education;
    if (fitness >= 25) {
        state.stats.mood = clamp(state.stats.mood + 8, 0, 100);
        state.skills.social += 3;
        addFeed("You held your own in a friendly challenge.", "good");
    } else {
        state.stats.mood = clamp(state.stats.mood - 4, 0, 100);
        addFeed("The challenge reminded you that there is room to improve.", "info");
    }
    closeModal(); render(); saveGame();
}

function chatAction(name, amount) {
    if (amount === 10) {
        if (state.cash < 20) return addFeed("You can't afford a gift right now.", "bad"), render();
        state.cash -= 20;
    }
    const npc = state.npcs.find(item => item.name === name);
    if (npc) {
        npc.relationship = clamp(npc.relationship + amount, 0, 100);
        state.npcMeetings[name] = Number(state.npcMeetings[name] || 0) + 1;
        rememberNpc(name, amount >= 10 ? "You gave me a thoughtful gift." : amount > 0 ? "You took time to talk to me." : "You were rude to me.", amount > 0 ? "positive" : "negative");
    }
    addFeed("You chatted with " + name + ".");
    updateAchievements(); closeModal(); render(); saveGame();
}

function jobsApp() {
    if (state.day <= 15) return showModal("💼 Jobs", "<p>Jobs open up after Day 15. For now, focus on school.</p>");
    const job = getJob();
    showModal("💼 Jobs", "<p>Your best option right now is <strong>" + job.title + "</strong> — AED " + job.pay + " per shift.</p><button class='option' onclick='closeModal();goTo(\"work\")'>Go to work</button>");
}

function historyModal() {
    const html = state.history.length ? state.history.slice().reverse().slice(0, 30).map(item => "<div class='feed-item " + item.type + "'><span class='time-tag'>Day " + item.day + " " + item.time + "</span>" + item.text + "</div>").join("") : "<p>No history yet.</p>";
    showModal("📜 History", html);
}

function memoriesModal() {
    const timeline = state.timeline.length
        ? state.timeline.slice().reverse().map(item => "<div class='timeline-item'><div class='timeline-dot'>•</div><div><strong>Day " + item.day + " — " + item.title + "</strong><br><span>" + item.detail + "</span></div></div>").join("")
        : "<p>No memories yet.</p>";
    showModal("✨ Your Life Timeline", "<p class='modal-intro'>Every choice leaves a mark.</p><div class='timeline'>" + timeline + "</div>");
}

function friendsModal() {
    const html = state.npcs.map(npc => "<button class='option' onclick='chatWith(" + JSON.stringify(npc.name) + ")'><span class='opt-title'>" + npc.emoji + " " + npc.name + "</span><span class='opt-sub'>" + npc.role + " · Relationship " + npc.relationship + "%</span></button>").join("");
    showModal("👥 People in Your Life", html || "<p>You haven't met anyone yet.</p>");
}

function achievementsModal() {
    const html = ACHIEVEMENTS.map(item => "<div class='feed-item " + (state.achievements.includes(item.id) ? "good" : "info") + "'>" + (state.achievements.includes(item.id) ? "🏆 " : "○ ") + "<strong>" + item.title + "</strong><br><span style='color:var(--muted)'>" + item.detail + "</span></div>").join("");
    showModal("🏆 Achievements (" + state.achievements.length + "/" + ACHIEVEMENTS.length + ")", html);
}

function render() {
    state.cash = Number.isFinite(Number(state.cash)) ? Number(state.cash) : 0;
    state.totalEarned = Number(state.totalEarned) || 0;
    state.totalSpent = Number(state.totalSpent) || 0;
    state.achievements = Array.isArray(state.achievements) ? state.achievements : [];
    state.debt = Number.isFinite(Number(state.debt)) ? Math.max(0, Number(state.debt)) : 0;
    state.day = Number.isFinite(Number(state.day)) ? Math.max(1, Number(state.day)) : 1;
    state.hour = Number.isFinite(Number(state.hour)) ? ((Number(state.hour) % 24) + 24) % 24 : 7;
    state.minute = Number.isFinite(Number(state.minute)) ? clamp(Number(state.minute), 0, 59) : 30;
    const country = COUNTRIES[state.country] || { flag: "🌍" };
    document.getElementById("playerName").textContent = state.name;
    document.getElementById("playerCountry").textContent = country.flag + " " + state.country;
    document.getElementById("cash").textContent = money(state.cash);
    document.getElementById("debt").textContent = "Debt: " + money(state.debt) + " / " + money(state.maxDebt);
    document.getElementById("day").textContent = clamp(state.day, 1, state.totalDays) + " / " + state.totalDays;
    document.getElementById("time").textContent = timeText();
    const weather = WEATHER[state.weather] || WEATHER.clear;
    document.getElementById("weather").textContent = weather.icon + " " + weather.label;
    document.getElementById("timeFill").style.width = ((state.hour * 60 + state.minute) / 1440 * 100) + "%";
    document.getElementById("act").textContent = state.day <= 15 ? "ACT I • SCHOOL" : "ACT II • ADULT LIFE";
    renderStats(); renderNPCs(); renderInfo(); renderFeed(); renderMainGrid();
}

function renderStats() {
    const rows = [["health", "Health"], ["energy", "Energy"], ["hunger", "Hunger"], ["hydration", "Hydration"], ["hygiene", "Hygiene"], ["mood", "Mood"]];
    rows.forEach(([key]) => {
        if (!Number.isFinite(Number(state.stats[key]))) state.stats[key] = 0;
        state.stats[key] = clamp(Number(state.stats[key]), 0, 100);
    });
    let html = rows.map(([key, label]) => "<div class='stat-row'><span class='label'>" + label + "</span><div class='stat-bar'><div class='fill " + key + "' style='width:" + state.stats[key] + "%'></div></div></div>").join("");
    html += "<div style='margin-top:14px;border-top:1px solid var(--line);padding-top:12px;'>" + ["education", "social", "fitness", "work"].map(key => "<div class='stat-row'><span class='label'>" + key[0].toUpperCase() + key.slice(1) + "</span><div class='stat-bar'><div class='fill " + key + "' style='width:" + state.skills[key] + "%'></div></div></div>").join("") + "</div>";
    document.getElementById("stats").innerHTML = html;
    const warnings = [];
    if (state.stats.energy < 25) warnings.push("You are running low on energy.");
    if (state.stats.hunger < 25) warnings.push("You should eat something.");
    if (state.stats.hydration < 25) warnings.push("You need water.");
    if (state.stats.hygiene < 25) warnings.push("A shower would help.");
    const warningBox = document.getElementById("needsWarning");
    warningBox.textContent = warnings.join(" ");
    warningBox.classList.toggle("hidden", warnings.length === 0);
}

function renderNPCs() {
    document.getElementById("npcs").innerHTML = state.npcs.slice(0, 4).map(npc => "<div class='npc-row'><span class='avatar'>" + npc.emoji + "</span><div><div class='npc-name'>" + npc.name + "</div><div class='npc-rel'>" + npc.relationship + "%</div></div></div>").join("");
}

function renderInfo() {
    const personality = PERSONALITIES[state.personality] || PERSONALITIES.balanced;
    const completed = GOALS.filter(goal => state.goals.includes(goal.id)).length;
    const location = PLACES.find(item => item.id === state.location) || PLACES[0];
    document.getElementById("info").innerHTML = "<div class='info-row'><span>Age</span><span class='input'>" + state.age + "</span></div><div class='info-row'><span>Personality</span><span class='input'>" + personality.label + "</span></div><div class='info-row'><span>Country</span><span class='input'>" + state.country + "</span></div><div class='info-row'><span>Location</span><span class='input'>" + location.name + "</span></div><div class='info-row'><span>Day</span><span class='input'>" + state.day + " / " + state.totalDays + "</span></div><div class='info-row'><span>Goals</span><span class='input'>" + completed + " / " + GOALS.length + "</span></div><div class='info-row'><span>Achievements</span><span class='input'>" + state.achievements.length + " / " + ACHIEVEMENTS.length + "</span></div><div class='info-row'><span>Major choices</span><span class='input'>" + state.decisions.length + "</span></div>";
}

function renderFeed() {
    const milestoneBox = document.getElementById("milestones");
    milestoneBox.innerHTML = state.milestones.slice(-4).map(item => "<span class='milestone' title='" + item.detail + "'>✦ " + item.title + "</span>").join("");
    const html = state.feed.slice(0, 20).map(item => "<div class='feed-item " + item.type + "'><span class='time-tag'>Day " + item.day + " " + item.time + "</span>" + item.text + "</div>").join("");
    document.getElementById("feed").innerHTML = html || "<p style='color:var(--muted);font-size:13px;'>Nothing much has happened yet.</p>";
}

function renderMainGrid() {
    const grid = document.getElementById("mainGrid");
    document.getElementById("sectionTitle").textContent = state.currentSection[0].toUpperCase() + state.currentSection.slice(1);
    if (state.currentSection === "places") {
        grid.innerHTML = PLACES.filter(place => place.id !== "school" || state.day <= 15).filter(place => place.id !== "work" || state.day > 15).map(place => "<div class='card' onclick='goTo(" + JSON.stringify(place.id) + ")'><div class='emoji'>" + place.emoji + "</div><div class='name'>" + place.name + "</div></div>").join("");
    } else if (state.currentSection === "activities") {
        const activities = ACTIVITIES[state.location] || [];
        grid.innerHTML = activities.map(item => "<div class='card' onclick='doActivity(" + JSON.stringify(item.id) + ")'><div class='emoji'>" + item.emoji + "</div><div class='name'>" + item.name + "</div><div class='meta'>" + (item.cost ? "AED " + item.cost : "Free") + " • " + item.time + " min</div></div>").join("");
    } else {
        grid.innerHTML = TRAVEL.map(([country, emoji, cost]) => "<div class='card' onclick='travelTo(" + JSON.stringify(country) + ")'><div class='emoji'>" + emoji + "</div><div class='name'>" + country + "</div><div class='meta'>AED " + cost + "</div></div>").join("");
    }
}

function demoMode() {
    clearSave();
    state.name = "Alex";
    state.country = "United Arab Emirates";
    state.startingCountry = "United Arab Emirates";
    state.age = 18;
    state.personality = "balanced";
    state.day = 20; state.hour = 17; state.minute = 30;
    state.cash = 235; state.debt = 0;
    state.groceries = { meals: 5, drinks: 8 };
    state.location = "home"; state.ended = false;
    state.stats = { health: 82, energy: 68, hunger: 72, hydration: 78, hygiene: 76, mood: 84 };
    state.skills = { education: 58, social: 52, fitness: 44, work: 47 };
    state.feed = []; state.history = []; state.currentSection = "places";
    state.weather = "clear"; state.milestones = [];
    state.goals = ["health","study","friend"]; state.achievements = ["first_step","good_friend","hard_worker"];
    state.npcMeetings = {}; state.npcMemories = { "Albert Lalu": [{day:5,text:"You helped me with the school project.",sentiment:"positive"},{day:10,text:"You invited a friend to join an earning opportunity.",sentiment:"positive"}], "Harshith Pradeep": [{day:10,text:"You made room for your friends in an important opportunity.",sentiment:"positive"}] }; state.decisions = [{day:5,title:"An Unexpected Opportunity",choice:"Help your friend",id:"school_opportunity"},{day:10,title:"A Chance to Earn",choice:"Ask a friend to join",id:"money_choice"}];
    state.decisionFlags = {school_opportunity:true,money_choice:true};
    state.timeline = [
        {day:1,title:"Life begins",detail:"You started with AED 100."},
        {day:5,title:"An Unexpected Opportunity",detail:"You chose to help your friend."},
        {day:10,title:"A Chance to Earn",detail:"You chose to ask a friend to join."},
        {day:16,title:"Adult life",detail:"School ended and a new chapter began."}
    ];
    state.totalEarned = 280; state.totalSpent = 145;
    state.npcs = NPC_DATA.map(([name, role, emoji], idx) => ({name,emoji,role,trait:NPC_TRAITS[idx % NPC_TRAITS.length],relationship:45 + (idx===0 ? 40 : idx===1 ? 25 : 0)}));
    state.npcs[0].relationship=92; state.npcs[1].relationship=70;
    document.getElementById("landing").classList.add("hidden");
    document.getElementById("intro").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");
    updateLocation(); render();
    addFeed("DEMO MODE: This scenario is designed to show the core LIFE experience.", "good");
    addTimeline("Demo scenario", "A judge-ready snapshot of a life already in progress.");
    openJudgeMode();
}
document.addEventListener("DOMContentLoaded", () => {
    const hasSave = !!localStorage.getItem(SAVE_KEY);
    document.getElementById("continueButton").classList.toggle("hidden", !hasSave);
    document.getElementById("landingContinue").classList.toggle("hidden", !hasSave);
    document.getElementById("name").focus();
    document.getElementById("modal").addEventListener("click", handleModalClick);
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeModal();
    });
});
