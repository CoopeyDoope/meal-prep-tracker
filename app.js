// ==================== DATA STORE ====================
const Store = {
get: k => { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
set: (k, v) => localStorage.setItem(k, JSON.stringify(v)),
getSettings: () => Store.get(‘settings’) || {
profile: { name: ‘’, age: 36, height: 178, startingWeight: 80, targetWeight: 78 },
targets: { calories: 2500, protein: 180, carbs: 280, fats: 75, fiber: 35 },
alcohol: { defaultDrink: ‘Cruzcampo 440ml’, defaultCalories: 170, weeklyCanTarget: 4 }
},
saveSettings: s => Store.set(‘settings’, s),
getLogs: () => Store.get(‘dailyLogs’) || {},
saveLogs: l => Store.set(‘dailyLogs’, l),
getLog: date => { const logs = Store.getLogs(); return logs[date] || createEmptyLog(date); },
saveLog: (date, log) => { const logs = Store.getLogs(); logs[date] = log; Store.saveLogs(logs); },
getWeights: () => Store.get(‘weights’) || [],
saveWeights: w => Store.set(‘weights’, w),
getProgress: () => Store.get(‘progress’) || { level: 1, xp: 0, achievements: [], streaks: { protein: { current: 0, longest: 0 }, calories: { current: 0, longest: 0 }, logging: { current: 0, longest: 0 } } },
saveProgress: p => Store.set(‘progress’, p),
getCustomMeals: () => Store.get(‘customMeals’) || [],
saveCustomMeals: m => Store.set(‘customMeals’, m),
getMealEdits: () => Store.get(‘mealEdits’) || {},
saveMealEdits: e => Store.set(‘mealEdits’, e),
getShoppingList: () => Store.get(‘shoppingList’) || null,
saveShoppingList: l => Store.set(‘shoppingList’, l)
};

const createEmptyLog = date => ({ date, meals: { breakfast: [], lunch: [], dinner: [], snacks: [] }, alcohol: { cans: 0, totalCalories: 0 }, totals: { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0 } });

// ==================== DEFAULT MEALS ====================
const DEFAULT_MEALS = [
// Breakfast
{ id: ‘b1’, name: ‘Bagel with peanut butter and banana’, category: ‘breakfast’, calories: 500, protein: 20, carbs: 65, fats: 18, fiber: 6, tags: [‘quick’], ingredients: [{ item: ‘bagels’, qty: 1, cat: ‘carbs’ }, { item: ‘peanut butter’, qty: 1, cat: ‘fats’ }, { item: ‘bananas’, qty: 1, cat: ‘fruits’ }] },
{ id: ‘b2’, name: ‘Porridge with honey’, category: ‘breakfast’, calories: 400, protein: 12, carbs: 70, fats: 8, fiber: 8, tags: [‘quick’], ingredients: [{ item: ‘porridge oats’, qty: 1, cat: ‘carbs’ }, { item: ‘oat milk’, qty: 1, cat: ‘beverages’ }, { item: ‘honey’, qty: 1, cat: ‘fats’ }] },
{ id: ‘b3’, name: ‘Protein smoothie’, category: ‘breakfast’, calories: 450, protein: 40, carbs: 50, fats: 12, fiber: 6, tags: [‘quick’], ingredients: [{ item: ‘protein powder’, qty: 1, cat: ‘proteins’ }, { item: ‘oat milk’, qty: 1, cat: ‘beverages’ }, { item: ‘bananas’, qty: 1, cat: ‘fruits’ }, { item: ‘peanut butter’, qty: 1, cat: ‘fats’ }] },
{ id: ‘b4’, name: ‘Turkey bacon with mushrooms and toast’, category: ‘breakfast’, calories: 420, protein: 30, carbs: 35, fats: 18, fiber: 4, tags: [‘home-cooking’], ingredients: [{ item: ‘turkey rashers’, qty: 1, cat: ‘proteins’ }, { item: ‘mushrooms’, qty: 1, cat: ‘vegetables’ }, { item: ‘bread’, qty: 1, cat: ‘carbs’ }] },
// Lunch
{ id: ‘ld1’, name: ‘Grilled chicken with rice and veg’, category: ‘lunch’, calories: 550, protein: 50, carbs: 55, fats: 12, fiber: 6, tags: [‘batch-cookable’], ingredients: [{ item: ‘chicken breasts’, qty: 1, cat: ‘proteins’ }, { item: ‘microwave rice’, qty: 1, cat: ‘carbs’ }, { item: ‘frozen mixed veg’, qty: 1, cat: ‘vegetables’ }] },
{ id: ‘ld2’, name: ‘Beef chilli with rice’, category: ‘lunch’, calories: 650, protein: 45, carbs: 60, fats: 25, fiber: 10, tags: [‘batch-cookable’], ingredients: [{ item: ‘beef mince’, qty: 1, cat: ‘proteins’ }, { item: ‘microwave rice’, qty: 1, cat: ‘carbs’ }, { item: ‘kidney beans’, qty: 1, cat: ‘carbs’ }, { item: ‘peppers’, qty: 1, cat: ‘vegetables’ }] },
{ id: ‘ld3’, name: ‘Chicken fajita bowl’, category: ‘lunch’, calories: 600, protein: 50, carbs: 55, fats: 18, fiber: 8, tags: [‘quick’], ingredients: [{ item: ‘chicken breasts’, qty: 1, cat: ‘proteins’ }, { item: ‘peppers’, qty: 2, cat: ‘vegetables’ }, { item: ‘microwave rice’, qty: 1, cat: ‘carbs’ }, { item: ‘salsa’, qty: 1, cat: ‘fats’ }] },
{ id: ‘ld4’, name: ‘Beef burrito bowl’, category: ‘lunch’, calories: 680, protein: 48, carbs: 60, fats: 26, fiber: 12, tags: [‘batch-cookable’], ingredients: [{ item: ‘beef mince’, qty: 1, cat: ‘proteins’ }, { item: ‘microwave rice’, qty: 1, cat: ‘carbs’ }, { item: ‘lettuce’, qty: 1, cat: ‘vegetables’ }, { item: ‘peppers’, qty: 1, cat: ‘vegetables’ }] },
// Dinner
{ id: ‘ld5’, name: ‘Steak with chips and asparagus’, category: ‘dinner’, calories: 800, protein: 55, carbs: 60, fats: 35, fiber: 6, tags: [‘home-cooking’], ingredients: [{ item: ‘steak’, qty: 1, cat: ‘proteins’ }, { item: ‘oven chips’, qty: 1, cat: ‘carbs’ }, { item: ‘asparagus’, qty: 1, cat: ‘vegetables’ }] },
{ id: ‘ld6’, name: ‘Spaghetti bolognese’, category: ‘dinner’, calories: 750, protein: 45, carbs: 80, fats: 25, fiber: 8, tags: [‘batch-cookable’], ingredients: [{ item: ‘beef mince’, qty: 1, cat: ‘proteins’ }, { item: ‘pasta’, qty: 1, cat: ‘carbs’ }, { item: ‘tomato sauce’, qty: 1, cat: ‘vegetables’ }] },
{ id: ‘ld7’, name: ‘Chicken stir-fry with noodles’, category: ‘dinner’, calories: 600, protein: 48, carbs: 55, fats: 18, fiber: 6, tags: [‘quick’], ingredients: [{ item: ‘chicken breasts’, qty: 1, cat: ‘proteins’ }, { item: ‘noodles’, qty: 1, cat: ‘carbs’ }, { item: ‘frozen mixed veg’, qty: 1, cat: ‘vegetables’ }] },
{ id: ‘ld8’, name: ‘Pork chops with mash and broccoli’, category: ‘dinner’, calories: 680, protein: 48, carbs: 45, fats: 32, fiber: 6, tags: [‘home-cooking’], ingredients: [{ item: ‘pork chops’, qty: 1, cat: ‘proteins’ }, { item: ‘potatoes’, qty: 1, cat: ‘carbs’ }, { item: ‘broccoli’, qty: 1, cat: ‘vegetables’ }] },
// Snacks
{ id: ‘s1’, name: ‘Protein shake’, category: ‘snacks’, calories: 200, protein: 25, carbs: 10, fats: 5, fiber: 1, tags: [‘quick’], ingredients: [{ item: ‘protein powder’, qty: 1, cat: ‘proteins’ }, { item: ‘oat milk’, qty: 1, cat: ‘beverages’ }] },
{ id: ‘s2’, name: ‘Beef jerky’, category: ‘snacks’, calories: 100, protein: 15, carbs: 5, fats: 2, fiber: 0, tags: [‘quick’], ingredients: [{ item: ‘beef jerky’, qty: 1, cat: ‘snacks’ }] },
{ id: ‘s3’, name: ‘Rice cakes with peanut butter’, category: ‘snacks’, calories: 200, protein: 8, carbs: 22, fats: 10, fiber: 2, tags: [‘quick’], ingredients: [{ item: ‘rice cakes’, qty: 1, cat: ‘snacks’ }, { item: ‘peanut butter’, qty: 1, cat: ‘fats’ }] },
{ id: ‘s4’, name: ‘Mixed nuts (handful)’, category: ‘snacks’, calories: 180, protein: 6, carbs: 8, fats: 16, fiber: 2, tags: [‘quick’], ingredients: [{ item: ‘mixed nuts’, qty: 1, cat: ‘snacks’ }] },
{ id: ‘s5’, name: ‘Dark chocolate (2-3 squares)’, category: ‘snacks’, calories: 100, protein: 2, carbs: 10, fats: 7, fiber: 2, tags: [‘quick’], ingredients: [{ item: ‘dark chocolate’, qty: 1, cat: ‘snacks’ }] },
// Takeaway
{ id: ‘t1’, name: ‘Chicken wrap with chips (takeaway)’, category: ‘takeaway’, calories: 1000, protein: 45, carbs: 90, fats: 45, fiber: 5, tags: [‘takeaway’], ingredients: [] }
];

const ACHIEVEMENTS = [
{ id: ‘first-log’, name: ‘First Steps’, desc: ‘Log your first meal’, icon: ‘🌟’, target: 1, type: ‘totalDays’, xp: 50 },
{ id: ‘week-warrior’, name: ‘Week Warrior’, desc: ‘7 days of tracking’, icon: ‘📆’, target: 7, type: ‘totalDays’, xp: 100 },
{ id: ‘protein-warrior’, name: ‘Protein Warrior’, desc: ‘7 days hitting protein goal’, icon: ‘💪’, target: 7, type: ‘streak’, streakType: ‘protein’, xp: 100 },
{ id: ‘month-milestone’, name: ‘Month Milestone’, desc: ‘30 days of tracking’, icon: ‘📅’, target: 30, type: ‘totalDays’, xp: 300 }
];

// ==================== UTILITIES ====================
const today = () => new Date().toISOString().split(‘T’)[0];
const formatDate = d => new Date(d + ‘T12:00:00’).toLocaleDateString(‘en-GB’, { weekday: ‘long’, day: ‘numeric’, month: ‘short’ });
const getGreeting = () => { const h = new Date().getHours(); return h < 12 ? ‘Good Morning’ : h < 17 ? ‘Good Afternoon’ : ‘Good Evening’; };
const getMealPeriod = () => { const h = new Date().getHours(); return h < 12 ? ‘breakfast’ : h < 16 ? ‘lunch’ : h < 22 ? ‘dinner’ : ‘snacks’; };
const isWeekend = () => [0, 5, 6].includes(new Date().getDay());
const isFriday = () => new Date().getDay() === 5;
const uid = () => Date.now().toString(36) + Math.random().toString(36).substr(2);
const xpForLevel = lvl => Math.floor(100 * Math.pow(1.5, lvl - 1));

// Get meal with any saved edits applied
const getMealWithEdits = (meal) => {
const edits = Store.getMealEdits();
if (edits[meal.id]) {
return { …meal, …edits[meal.id] };
}
return meal;
};

const getAllMeals = () => {
const defaults = DEFAULT_MEALS.map(m => getMealWithEdits(m));
const custom = Store.getCustomMeals();
return […defaults, …custom];
};

const calcTotals = log => {
const t = { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0 };
Object.values(log.meals).flat().forEach(m => { t.calories += m.calories || 0; t.protein += m.protein || 0; t.carbs += m.carbs || 0; t.fats += m.fats || 0; t.fiber += m.fiber || 0; });
t.calories += log.alcohol?.totalCalories || 0;
return t;
};

// ==================== APP STATE ====================
let state = { tab: ‘dashboard’, modal: null, modalData: null, selectedMealCategory: ‘all’, activePeriod: getMealPeriod(), shoppingDays: 3 };

// ==================== RENDER ====================
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

const render = () => {
const app = $(’#app’);
app.innerHTML = `<div class="app-container">${renderHeader()}<main class="main-content">${renderTab()}</main>${renderNav()}${state.modal ? renderModal() : ''}</div>`;
attachEvents();
};

const renderHeader = () => {
const settings = Store.getSettings();
const progress = Store.getProgress();
return `<header class="header"><div class="header-left"><h1 class="date">${formatDate(today())}</h1><p class="greeting">${getGreeting()}${settings.profile.name ? ', ' + settings.profile.name : ''}!</p></div><div class="header-right"><span class="level-badge">Lvl ${progress.level}</span></div></header>`;
};

const renderNav = () => `<nav class="bottom-nav">${[['dashboard', '🏠', 'Home'], ['meals', '🍽️', 'Meals'], ['shopping', '🛒', 'Shop'], ['progress', '📊', 'Progress'], ['settings', '⚙️', 'Settings']].map(([id, icon, label]) => `<button class="nav-btn ${state.tab === id ? 'active' : ''}" data-tab="${id}"><span class="nav-icon">${icon}</span><span class="nav-label">${label}</span></button>`).join('')}</nav>`;

const renderTab = () => {
switch (state.tab) {
case ‘dashboard’: return renderDashboard();
case ‘meals’: return renderMeals();
case ‘shopping’: return renderShopping();
case ‘progress’: return renderProgress();
case ‘settings’: return renderSettings();
default: return ‘’;
}
};

const renderDashboard = () => {
const log = Store.getLog(today());
log.totals = calcTotals(log);
const settings = Store.getSettings();
const targets = settings.targets;
const progress = Store.getProgress();

const macroRing = (label, current, target, color) => {
const pct = Math.min((current / target) * 100, 100);
const over = current > target;
return `<div class="macro-ring"><svg viewBox="0 0 36 36" class="ring-svg"><path class="ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/><path class="ring-fill ${over ? 'over' : ''}" stroke="${over ? '#EF476F' : color}" stroke-dasharray="${pct}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/></svg><div class="ring-text"><span class="ring-value">${Math.round(current)}</span><span class="ring-label">${label}</span></div></div>`;
};

return `<div class="dashboard"> <div class="card macros-card"><h2>Today's Macros</h2><div class="macro-rings">${macroRing('kcal', log.totals.calories, targets.calories, '#00A896')}${macroRing('protein', log.totals.protein, targets.protein, '#118AB2')}${macroRing('carbs', log.totals.carbs, targets.carbs, '#FFD166')}${macroRing('fats', log.totals.fats, targets.fats, '#EF476F')}</div><div class="macro-remaining"><span>Remaining: ${Math.max(0, targets.calories - log.totals.calories)} kcal</span><span>${Math.max(0, targets.protein - log.totals.protein)}g protein</span></div></div> <div class="card streak-card"><div class="streak-main"><span class="fire">🔥</span><span class="streak-num">${progress.streaks.protein.current}</span><span class="streak-label">day protein streak</span></div><div class="streak-record">🏆 Best: ${progress.streaks.protein.longest} days</div></div> <div class="card meals-card"><div class="meals-header"><h2>Today's Meals</h2><span class="meal-period-badge">${state.activePeriod}</span></div><div class="meal-tabs">${['breakfast', 'lunch', 'dinner', 'snacks'].map(p => `<button class="meal-tab ${p === state.activePeriod ? 'active' : ''}" data-period="${p}">${p.charAt(0).toUpperCase() + p.slice(1)}</button>`).join('')}</div><div class="logged-meals">${renderLoggedMeals(log, state.activePeriod)}</div><button class="btn btn-primary log-meal-btn" data-action="log-meal">+ Log ${state.activePeriod.charAt(0).toUpperCase() + state.activePeriod.slice(1)}</button></div> ${isWeekend() ? `<div class="card alcohol-card"><h2>Weekend Drinks 🍺</h2><div class="alcohol-tracker"><div class="cans-display">${Array(settings.alcohol.weeklyCanTarget).fill(0).map((_, i) => `<span class="can ${i < log.alcohol.cans ? 'filled' : ''}">🍺</span>`).join(’’)}</div><p>${log.alcohol.cans} / ${settings.alcohol.weeklyCanTarget} cans (${log.alcohol.totalCalories} kcal)</p><button class="btn btn-sm" data-action="add-drink">+ Add Drink</button></div></div>`: ''} ${isFriday() ?`<div class="card reminder-card"><span>⚖️</span> Don’t forget your Friday weigh-in!</div>` : ‘’}

  </div>`;
};

const renderLoggedMeals = (log, period) => {
const meals = log.meals[period] || [];
if (!meals.length) return `<p class="empty-state">No ${period} logged yet</p>`;
return meals.map((m, i) => `<div class="logged-meal"><div class="meal-info"><strong>${m.mealName}</strong><span class="meal-macros">${m.calories} kcal | P: ${m.protein}g | C: ${m.carbs}g | F: ${m.fats}g</span></div><button class="btn-icon" data-action="delete-meal" data-period="${period}" data-index="${i}">🗑️</button></div>`).join(’’);
};

const renderMeals = () => {
const meals = getAllMeals();
const filtered = state.selectedMealCategory === ‘all’ ? meals : meals.filter(m => m.category === state.selectedMealCategory);
return `<div class="meals-tab"> <div class="search-bar"><input type="text" id="meal-search" placeholder="Search meals..."></div> <div class="filter-chips">${['all', 'breakfast', 'lunch', 'dinner', 'snacks', 'takeaway'].map(c => `<button class="chip ${state.selectedMealCategory === c ? 'active' : ''}" data-filter="${c}">${c.charAt(0).toUpperCase() + c.slice(1)}</button>`).join('')}</div> <div class="meal-list">${filtered.map(m => `<div class="meal-card">
<div class="meal-card-main"><h3>${m.name}</h3><p class="meal-macros">${m.calories} kcal | P: ${m.protein}g | C: ${m.carbs}g | F: ${m.fats}g</p><div class="meal-tags">${(m.tags || []).map(t => `<span class="tag">${t}</span>`).join(’’)}</div></div>
<div class="meal-card-actions">
<button class="btn btn-sm" data-action="edit-meal" data-meal-id="${m.id}">✏️</button>
<button class="btn btn-sm btn-primary" data-action="quick-log" data-meal-id="${m.id}">+ Log</button>
</div>
</div>`).join(’’)}</div>
<button class="btn btn-primary fab" data-action="add-custom-meal">+ Custom</button>

  </div>`;
};

const renderShopping = () => {
const list = Store.getShoppingList();
return `<div class="shopping-tab"> <div class="card"> <h2>🛒 Generate Shopping List</h2> <div class="form-group"><label>Days to plan</label> <select id="shopping-days"> ${[1,2,3,4,5,6,7].map(n => `<option value=”${n}” ${state.shoppingDays === n ? ‘selected’ : ‘’}>${n} day${n > 1 ? ‘s’ : ‘’}</option>`).join(’’)}
</select>
</div>
<button class="btn btn-primary" data-action="generate-list">Generate List</button>
</div>
${list ? renderShoppingList(list) : ‘<p class="empty-state">No shopping list yet. Generate one above!</p>’}

  </div>`;
};

const renderShoppingList = list => {
const cats = [‘proteins’, ‘carbs’, ‘vegetables’, ‘fruits’, ‘fats’, ‘snacks’, ‘beverages’];
const grouped = {};
(list.items || []).forEach(item => {
if (!item || !item.category) return;
if (!grouped[item.category]) grouped[item.category] = [];
grouped[item.category].push(item);
});
const hasCats = cats.some(c => grouped[c]?.length);
if (!hasCats) return ‘<p class="empty-state">No items in shopping list. Select some meals first!</p>’;
return `<div class="shopping-list"><h2>Shopping List</h2><p class="list-date">For ${list.days} days | Generated: ${new Date(list.dateGenerated).toLocaleDateString()}</p>${cats.filter(c => grouped[c]?.length).map(cat => `<div class="list-category"><h3>${cat}</h3>${grouped[cat].map((item, i) => `<label class="list-item ${item.checked ? 'checked' : ''}"><input type="checkbox" ${item.checked ? 'checked' : ''} data-action="toggle-item" data-cat="${cat}" data-idx="${i}"><span>${item.item}${item.quantity > 1 ? ` (x${item.quantity})` : ''}</span></label>`).join(’’)}</div>`).join('')}<button class="btn btn-danger" data-action="clear-list">Clear List</button></div>`;
};

const renderProgress = () => {
const weights = Store.getWeights();
const progress = Store.getProgress();
const settings = Store.getSettings();
const latest = weights[weights.length - 1];
const prev = weights[weights.length - 2];
const change = latest && prev ? (latest.weight - prev.weight).toFixed(1) : 0;
const total = latest ? (latest.weight - settings.profile.startingWeight).toFixed(1) : 0;

return `<div class="progress-tab"> <div class="card weight-card"><h2>⚖️ Weight Progress</h2>${latest ? `<div class="weight-display"><span class="current-weight">${latest.weight} kg</span><span class="weight-change ${parseFloat(change) <= 0 ? 'positive' : 'negative'}">${change > 0 ? ‘+’ : ‘’}${change} kg</span></div><p>Total: ${total > 0 ? ‘+’ : ‘’}${total} kg from ${settings.profile.startingWeight} kg</p>`: '<p>No weights logged yet</p>'}<button class="btn btn-primary" data-action="log-weight">+ Log Weight</button></div> <div class="card achievements-card"><h2>🏆 Achievements</h2><div class="achievements-grid">${ACHIEVEMENTS.map(a => { const unlocked = progress.achievements.includes(a.id); const current = a.type === 'streak' ? (progress.streaks[a.streakType]?.current || 0) : Object.keys(Store.getLogs()).length; return`<div class="achievement ${unlocked ? 'unlocked' : 'locked'}"><span class="ach-icon">${a.icon}</span><span class="ach-name">${a.name}</span>${!unlocked ? `<div class="ach-progress"><div class="ach-bar" style="width:${Math.min((current/a.target)*100, 100)}%"></div></div><span class="ach-count">${current}/${a.target}</span>` : ‘’}</div>`; }).join(’’)}</div></div>
<div class="card streaks-card"><h2>🔥 Streaks</h2><div class="streak-stats"><div class="streak-stat"><span class="label">Protein Goal</span><span class="value">${progress.streaks.protein.current} days</span><span class="best">Best: ${progress.streaks.protein.longest}</span></div><div class="streak-stat"><span class="label">Calorie Target</span><span class="value">${progress.streaks.calories.current} days</span><span class="best">Best: ${progress.streaks.calories.longest}</span></div><div class="streak-stat"><span class="label">Logging</span><span class="value">${progress.streaks.logging.current} days</span><span class="best">Best: ${progress.streaks.logging.longest}</span></div></div></div>
<div class="card xp-card"><h2>⭐ Level ${progress.level}</h2><div class="xp-bar"><div class="xp-fill" style="width:${(progress.xp / xpForLevel(progress.level)) * 100}%"></div></div><p>${progress.xp} / ${xpForLevel(progress.level)} XP to level ${progress.level + 1}</p></div>

  </div>`;
};

const renderSettings = () => {
const s = Store.getSettings();
return `<div class="settings-tab">
<div class="card"><h2>👤 Profile</h2><div class="form-group"><label>Name</label><input type="text" id="set-name" value="${s.profile.name || ''}"></div><div class="form-group"><label>Starting Weight (kg)</label><input type="number" id="set-sw" value="${s.profile.startingWeight}" step="0.1"></div><div class="form-group"><label>Target Weight (kg)</label><input type="number" id="set-tw" value="${s.profile.targetWeight}" step="0.1"></div></div>
<div class="card"><h2>🎯 Daily Targets</h2><div class="form-group"><label>Calories</label><input type="number" id="set-cal" value="${s.targets.calories}"></div><div class="form-group"><label>Protein (g)</label><input type="number" id="set-pro" value="${s.targets.protein}"></div><div class="form-group"><label>Carbs (g)</label><input type="number" id="set-carb" value="${s.targets.carbs}"></div><div class="form-group"><label>Fats (g)</label><input type="number" id="set-fat" value="${s.targets.fats}"></div></div>
<div class="card"><h2>🍺 Alcohol</h2><div class="form-group"><label>Calories per drink</label><input type="number" id="set-drinkcal" value="${s.alcohol.defaultCalories}"></div><div class="form-group"><label>Weekly can target</label><input type="number" id="set-cans" value="${s.alcohol.weeklyCanTarget}"></div></div>
<div class="card"><h2>💾 Data</h2><button class="btn" data-action="export-data">📤 Export Data</button><button class="btn" data-action="import-data">📥 Import Data</button><input type="file" id="import-file" accept=".json" style="display:none"><button