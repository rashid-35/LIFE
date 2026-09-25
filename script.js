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

const NAMES = ["Albert Lalu", "Harshith Pradeep", "Fares Yusuf", "Anand John", "Ryan Matthew", "Mohammed Shamil", "Yahya bin Navas", "Omar Aslam"];
const EMOJIS = ["🙂", "😎", "🤓", "😊", "😄", "🥳", "😌", "🤗"];
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
        state.npcs = (Array.isArray(state.npcs) ? state.npcs : []).map((npc, idx) => ({
            ...npc,
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
    state.npcs = NAMES.map((name, idx) => ({
        name,
        emoji: EMOJIS[idx],
        trait: NPC_TRAITS[idx],
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
        addFeed("You earned " + money(income) + " as a " + job.title + ".", "good");
    }
    if (state.personality === "academic" && activity.effects.education) state.skills.education += 3;
    if (state.personality === "social" && activity.effects.social) state.skills.social += 3;
    if (state.personality === "ambitious" && activity.effects.income) state.skills.work += 2;
    if (state.personality === "calm" && activity.id === "sleep") state.stats.mood = clamp(state.stats.mood + 5, 0, 100);
    addMinutes(activity.time);
    addFeed(activity.name + " done.");

    if (["socialize", "meet", "cafe_meet"].includes(id)) {
        const npc = state.npcs[Math.floor(Math.random() * state.npcs.length)];
        if (npc) npc.relationship = clamp(npc.relationship + 5, 0, 100);
    }
    updateMilestones();
    updateGoals();
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

function endGame(reason) {
    if (state.ended) return;
    state.ended = true;
    clearSave();
    const reputation = getReputation();
    let verdict = "You made it through the month.";
    if (state.debt >= 250) verdict = "Money became harder to manage than you expected.";
    else if (state.stats.health >= 80 && state.stats.mood >= 75) verdict = "You kept yourself in good shape.";
    else if (reputation >= 70) verdict = "Your friends made the month better.";
    else if (state.skills.fitness >= state.skills.education) verdict = "You spent the month staying active.";
    else if (state.cash >= 200) verdict = "You managed your money well.";
    showModal("🏁 Results", "<p>" + (reason || "Thirty days are up. Here's how things turned out.") + "</p><p style='margin-top:14px'><strong>" + verdict + "</strong></p><p style='margin-top:14px'>Cash: <strong>" + money(state.cash) + "</strong><br>Debt: <strong>" + money(state.debt) + "</strong><br>Goals: <strong>" + state.goals.length + " / " + GOALS.length + "</strong><br>Memories: <strong>" + state.milestones.length + "</strong></p><button class='primary' onclick='restartGame()'>START OVER</button>");
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
    document.getElementById("game").classList.add("hidden");
    document.getElementById("intro").classList.remove("hidden");
}

function phone() {
    showModal("📱 Phone", "<button class='option' onclick='bankApp()'><span class='opt-title'>🏦 Bank</span><span class='opt-sub'>Check balance and loans</span></button><button class='option' onclick='messagesApp()'><span class='opt-title'>💬 Messages</span><span class='opt-sub'>Chat with friends</span></button><button class='option' onclick='jobsApp()'><span class='opt-title'>💼 Jobs</span><span class='opt-sub'>Look for work</span></button><button class='option' onclick='goalsApp()'><span class='opt-title'>✓ Goals</span><span class='opt-sub'>See what you are working toward</span></button>");
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
    state.npcs.forEach(npc => { html += "<button class='option' onclick='chatWith(" + JSON.stringify(npc.name) + ")'><span class='opt-title'>" + npc.emoji + " " + npc.name + "</span><span class='opt-sub'>Relationship: " + npc.relationship + "%</span></button>"; });
    showModal("💬 Messages", html);
}

function chatWith(name) {
    showModal("💬 " + name, "<button class='option' onclick='chatAction(" + JSON.stringify(name) + ", 5)'>😊 Friendly chat (+5)</button><button class='option' onclick='chatAction(" + JSON.stringify(name) + ", 10)'>🎁 Give a gift (+10, costs AED 20)</button><button class='option' onclick='chatAction(" + JSON.stringify(name) + ", -5)'>😒 Be rude (-5)</button>");
}

function chatAction(name, amount) {
    if (amount === 10) {
        if (state.cash < 20) return addFeed("You can't afford a gift right now.", "bad"), render();
        state.cash -= 20;
    }
    const npc = state.npcs.find(item => item.name === name);
    if (npc) npc.relationship = clamp(npc.relationship + amount, 0, 100);
    addFeed("You chatted with " + name + "."); closeModal(); render(); saveGame();
}

function jobsApp() {
    if (state.day <= 15) return showModal("💼 Jobs", "<p>Jobs open up after Day 15. For now, focus on school.</p>");
    const job = getJob();
    showModal("💼 Jobs", "<p>Your best option right now is <strong>" + job.title + "</strong> — AED " + job.pay + " per shift.</p><button class='option' onclick='closeModal();goTo(\"work\")'>Go to work</button>");
}

function historyModal() {
    const html = state.history.length ? state.history.slice().reverse().slice(0, 30).map(item => "<div class='feed-item " + item.type + "'><span class='time-tag'>Day " + item.day + " " + item.time + "</span>" + item.text + "</div>").join("") : "<p>No events yet.</p>";
    showModal("📜 History", html);
}

function memoriesModal() {
    const html = state.milestones.length
        ? state.milestones.map(item => "<div class='feed-item good'><strong>Day " + item.day + " — " + item.title + "</strong><br>" + item.detail + "</div>").join("")
        : "<p>No milestones yet.</p>";
    showModal("✨ Memories", html);
}

function friendsModal() {
    const html = state.npcs.map(npc => "<div class='npc-row'><span class='avatar'>" + npc.emoji + "</span><div><div class='npc-name'>" + npc.name + "</div><div class='npc-rel'>" + npc.trait + " · " + npc.relationship + "%</div></div><div class='rel-bar'><div class='rel-fill' style='width:" + npc.relationship + "%'></div></div></div>").join("");
    showModal("👥 Friends", html || "<p>You haven't met anyone yet.</p>");
}

function render() {
    state.cash = Number.isFinite(Number(state.cash)) ? Number(state.cash) : 0;
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
    let html = rows.map(([key, label]) => "<div class='stat-row'><span class='label'>" + label + "</span><div class='stat-bar'><div class='fill " + key + "' style='width:" + state.stats[key] + "%'></div></div><span class='value'>" + Math.round(state.stats[key]) + "</span></div>").join("");
    html += "<div style='margin-top:14px;border-top:1px solid var(--line);padding-top:12px;'>" + ["education", "social", "fitness", "work"].map(key => "<div class='stat-row'><span class='label'>" + key[0].toUpperCase() + key.slice(1) + "</span><span class='value'>" + state.skills[key] + "</span></div>").join("") + "</div>";
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
    document.getElementById("npcs").innerHTML = state.npcs.slice(0, 4).map(npc => "<div class='npc-row'><span class='avatar'>" + npc.emoji + "</span><div><div class='npc-name'>" + npc.name + "</div><div class='npc-rel'>" + npc.relationship + "%</div></div><div class='rel-bar'><div class='rel-fill' style='width:" + npc.relationship + "%'></div></div></div>").join("");
}

function renderInfo() {
    const personality = PERSONALITIES[state.personality] || PERSONALITIES.balanced;
    const completed = GOALS.filter(goal => state.goals.includes(goal.id)).length;
    const location = PLACES.find(item => item.id === state.location) || PLACES[0];
    document.getElementById("info").innerHTML = "<div class='info-row'><span>Age</span><span class='input'>" + state.age + "</span></div><div class='info-row'><span>Personality</span><span class='input'>" + personality.label + "</span></div><div class='info-row'><span>Country</span><span class='input'>" + state.country + "</span></div><div class='info-row'><span>Location</span><span class='input'>" + location.name + "</span></div><div class='info-row'><span>Day</span><span class='input'>" + state.day + " / " + state.totalDays + "</span></div><div class='info-row'><span>Goals</span><span class='input'>" + completed + " / " + GOALS.length + "</span></div>";
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
        grid.innerHTML = PLACES.filter(place => place.id !== "school" || state.day <= 15).filter(place => place.id !== "work" || state.day > 15).map(place => "<div class='card' onclick='goTo(" + JSON.stringify(place.id) + ")'><div class='emoji'>" + place.emoji + "</div><div class='name'>" + place.name + "</div><div class='sub'>" + (place.id === state.location ? "You are here" : "Visit") + "</div></div>").join("");
    } else if (state.currentSection === "activities") {
        const activities = ACTIVITIES[state.location] || [];
        grid.innerHTML = activities.map(item => "<div class='card' onclick='doActivity(" + JSON.stringify(item.id) + ")'><div class='emoji'>" + item.emoji + "</div><div class='name'>" + item.name + "</div><div class='sub'>" + (item.cost ? money(item.cost) : "Free") + " • " + (item.time / 60).toFixed(1) + "h</div></div>").join("");
    } else {
        grid.innerHTML = TRAVEL.map(([country, emoji, cost]) => "<div class='card' onclick='travelTo(" + JSON.stringify(country) + ")'><div class='emoji'>" + emoji + "</div><div class='name'>" + country + "</div><div class='sub'>" + (country === state.country ? "Current" : money(cost)) + "</div></div>").join("");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("continueButton").classList.toggle("hidden", !localStorage.getItem(SAVE_KEY));
    document.getElementById("name").focus();
    document.getElementById("modal").addEventListener("click", handleModalClick);
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeModal();
    });
});
