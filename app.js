// ==================== DATA STORE ====================
const Store = {
  get: k => { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
  set: (k, v) => localStorage.setItem(k, JSON.stringify(v)),
  
  getSettings: () => Store.get('settings') || {
    profile: { name: '', age: 36, height: 178, startingWeight: 80, targetWeight: 78 },
    targets: { calories: 2500, protein: 180, carbs: 280, fats: 75, fiber: 35 },
    alcohol: { defaultDrink: 'Cruzcampo 440ml', defaultCalories: 170, weeklyCanTarget: 4, trackDays: [5, 6, 0] }
  },
  saveSettings: s => Store.set('settings', s),
  
  getLogs: () => Store.get('dailyLogs') || {},
  saveLogs: l => Store.set('dailyLogs', l),
  
  getLog: date => { const logs = Store.getLogs(); return logs[date] || createEmptyLog(date); },
  saveLog: (date, log) => { const logs = Store.getLogs(); logs[date] = log; Store.saveLogs(logs); },
  
  getWeights: () => Store.get('weights') || [],
  saveWeights: w => Store.set('weights', w),
  
  getProgress: () => Store.get('progress') || { level: 1, xp: 0, achievements: [], streaks: { protein: { current: 0, longest: 0 }, calories: { current: 0, longest: 0 }, logging: { current: 0, longest: 0 } } },
  saveProgress: p => Store.set('progress', p),
  
  getMeals: () => Store.get('customMeals') || [],
  saveMeals: m => Store.set('customMeals', m),
  
  getShoppingList: () => Store.get('shoppingList') || null,
  saveShoppingList: l => Store.set('shoppingList', l)
};

const createEmptyLog = date => ({
  date, meals: { breakfast: [], lunch: [], dinner: [], snacks: [] },
  alcohol: { cans: 0, totalCalories: 0 },
  totals: { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0 }
});

// ==================== DEFAULT MEALS ====================
const DEFAULT_MEALS = [
  // Breakfast
  { id: 'b1', name: 'Bagel with peanut butter and banana', category: 'breakfast', calories: 500, protein: 20, carbs: 65, fats: 18, fiber: 6, tags: ['quick'], ingredients: [{ item: 'bagel', qty: 1, unit: 'piece', cat: 'carbs' }, { item: 'peanut butter', qty: 2, unit: 'tbsp', cat: 'fats' }, { item: 'banana', qty: 1, unit: 'medium', cat: 'fruits' }] },
  { id: 'b2', name: 'Porridge with honey', category: 'breakfast', calories: 400, protein: 12, carbs: 70, fats: 8, fiber: 8, tags: ['quick'], ingredients: [{ item: 'porridge oats', qty: 80, unit: 'g', cat: 'carbs' }, { item: 'oat milk', qty: 250, unit: 'ml', cat: 'beverages' }, { item: 'honey', qty: 1, unit: 'tbsp', cat: 'fats' }] },
  { id: 'b3', name: 'Bagel with almond butter and honey', category: 'breakfast', calories: 480, protein: 15, carbs: 62, fats: 20, fiber: 5, tags: ['quick'], ingredients: [{ item: 'bagel', qty: 1, unit: 'piece', cat: 'carbs' }, { item: 'almond butter', qty: 2, unit: 'tbsp', cat: 'fats' }, { item: 'honey', qty: 1, unit: 'tbsp', cat: 'fats' }] },
  { id: 'b4', name: 'Protein smoothie', category: 'breakfast', calories: 450, protein: 40, carbs: 50, fats: 12, fiber: 6, tags: ['quick'], ingredients: [{ item: 'protein powder', qty: 1, unit: 'scoop', cat: 'proteins' }, { item: 'oat milk', qty: 300, unit: 'ml', cat: 'beverages' }, { item: 'banana', qty: 1, unit: 'medium', cat: 'fruits' }, { item: 'peanut butter', qty: 1, unit: 'tbsp', cat: 'fats' }, { item: 'porridge oats', qty: 30, unit: 'g', cat: 'carbs' }] },
  { id: 'b5', name: 'PB&J bagel with blueberries', category: 'breakfast', calories: 520, protein: 18, carbs: 75, fats: 16, fiber: 7, tags: ['quick'], ingredients: [{ item: 'bagel', qty: 1, unit: 'piece', cat: 'carbs' }, { item: 'peanut butter', qty: 2, unit: 'tbsp', cat: 'fats' }, { item: 'jam', qty: 1, unit: 'tbsp', cat: 'fats' }, { item: 'blueberries', qty: 80, unit: 'g', cat: 'fruits' }] },
  { id: 'b6', name: 'Chicken sausages with beans and toast', category: 'breakfast', calories: 550, protein: 35, carbs: 55, fats: 20, fiber: 12, tags: ['home-cooking'], ingredients: [{ item: 'chicken sausages', qty: 3, unit: 'pieces', cat: 'proteins' }, { item: 'baked beans', qty: 200, unit: 'g', cat: 'carbs' }, { item: 'bread', qty: 2, unit: 'slices', cat: 'carbs' }] },
  { id: 'b7', name: 'Turkey bacon with mushrooms and toast', category: 'breakfast', calories: 420, protein: 30, carbs: 35, fats: 18, fiber: 4, tags: ['home-cooking'], ingredients: [{ item: 'turkey rashers', qty: 4, unit: 'pieces', cat: 'proteins' }, { item: 'mushrooms', qty: 100, unit: 'g', cat: 'vegetables' }, { item: 'tomatoes', qty: 2, unit: 'medium', cat: 'vegetables' }, { item: 'bread', qty: 2, unit: 'slices', cat: 'carbs' }] },
  
  // Lunch/Dinner
  { id: 'ld1', name: 'Grilled chicken with rice and veg', category: 'lunch', calories: 550, protein: 50, carbs: 55, fats: 12, fiber: 6, tags: ['batch-cookable'], ingredients: [{ item: 'chicken breasts', qty: 1, unit: 'piece', cat: 'proteins' }, { item: 'microwave rice', qty: 1, unit: 'pouch', cat: 'carbs' }, { item: 'frozen mixed veg', qty: 150, unit: 'g', cat: 'vegetables' }] },
  { id: 'ld2', name: 'Beef chilli with rice', category: 'lunch', calories: 650, protein: 45, carbs: 60, fats: 25, fiber: 10, tags: ['batch-cookable'], ingredients: [{ item: 'beef mince', qty: 150, unit: 'g', cat: 'proteins' }, { item: 'microwave rice', qty: 1, unit: 'pouch', cat: 'carbs' }, { item: 'kidney beans', qty: 100, unit: 'g', cat: 'carbs' }, { item: 'tomatoes', qty: 200, unit: 'g', cat: 'vegetables' }, { item: 'peppers', qty: 1, unit: 'piece', cat: 'vegetables' }] },
  { id: 'ld3', name: 'Beef meatballs in tomato sauce with pasta', category: 'dinner', calories: 700, protein: 45, carbs: 70, fats: 25, fiber: 6, tags: ['batch-cookable'], ingredients: [{ item: 'beef mince', qty: 150, unit: 'g', cat: 'proteins' }, { item: 'pasta', qty: 100, unit: 'g', cat: 'carbs' }, { item: 'tomato sauce', qty: 200, unit: 'g', cat: 'vegetables' }] },
  { id: 'ld4', name: 'Chicken fajita bowl', category: 'lunch', calories: 600, protein: 50, carbs: 55, fats: 18, fiber: 8, tags: ['quick'], ingredients: [{ item: 'chicken breasts', qty: 1, unit: 'piece', cat: 'proteins' }, { item: 'peppers', qty: 2, unit: 'pieces', cat: 'vegetables' }, { item: 'microwave rice', qty: 1, unit: 'pouch', cat: 'carbs' }, { item: 'salsa', qty: 50, unit: 'g', cat: 'fats' }, { item: 'guacamole', qty: 50, unit: 'g', cat: 'fats' }] },
  { id: 'ld5', name: 'Beef burrito bowl', category: 'lunch', calories: 680, protein: 48, carbs: 60, fats: 26, fiber: 12, tags: ['batch-cookable'], ingredients: [{ item: 'beef mince', qty: 150, unit: 'g', cat: 'proteins' }, { item: 'microwave rice', qty: 1, unit: 'pouch', cat: 'carbs' }, { item: 'lettuce', qty: 50, unit: 'g', cat: 'vegetables' }, { item: 'peppers', qty: 1, unit: 'piece', cat: 'vegetables' }, { item: 'kidney beans', qty: 80, unit: 'g', cat: 'carbs' }, { item: 'salsa', qty: 50, unit: 'g', cat: 'fats' }] },
  { id: 'ld6', name: 'Steak with chips and asparagus', category: 'dinner', calories: 800, protein: 55, carbs: 60, fats: 35, fiber: 6, tags: ['home-cooking'], ingredients: [{ item: 'steak', qty: 1, unit: 'piece', cat: 'proteins' }, { item: 'oven chips', qty: 200, unit: 'g', cat: 'carbs' }, { item: 'asparagus', qty: 150, unit: 'g', cat: 'vegetables' }] },
  { id: 'ld7', name: 'Spaghetti bolognese', category: 'dinner', calories: 750, protein: 45, carbs: 80, fats: 25, fiber: 8, tags: ['batch-cookable'], ingredients: [{ item: 'beef mince', qty: 150, unit: 'g', cat: 'proteins' }, { item: 'pasta', qty: 120, unit: 'g', cat: 'carbs' }, { item: 'tomato sauce', qty: 200, unit: 'g', cat: 'vegetables' }, { item: 'carrots', qty: 1, unit: 'piece', cat: 'vegetables' }] },
  { id: 'ld8', name: 'Bolognese with chips', category: 'dinner', calories: 780, protein: 42, carbs: 70, fats: 32, fiber: 6, tags: ['home-cooking'], ingredients: [{ item: 'beef mince', qty: 150, unit: 'g', cat: 'proteins' }, { item: 'oven chips', qty: 200, unit: 'g', cat: 'carbs' }, { item: 'tomato sauce', qty: 200, unit: 'g', cat: 'vegetables' }] },
  { id: 'ld9', name: 'Chicken stir-fry with noodles', category: 'dinner', calories: 600, protein: 48, carbs: 55, fats: 18, fiber: 6, tags: ['quick'], ingredients: [{ item: 'chicken breasts', qty: 1, unit: 'piece', cat: 'proteins' }, { item: 'noodles', qty: 100, unit: 'g', cat: 'carbs' }, { item: 'frozen mixed veg', qty: 150, unit: 'g', cat: 'vegetables' }] },
  { id: 'ld10', name: 'Pulled pork with chips and coleslaw', category: 'dinner', calories: 850, protein: 45, carbs: 65, fats: 42, fiber: 5, tags: ['home-cooking'], ingredients: [{ item: 'pulled pork', qty: 200, unit: 'g', cat: 'proteins' }, { item: 'oven chips', qty: 200, unit: 'g', cat: 'carbs' }, { item: 'coleslaw', qty: 100, unit: 'g', cat: 'vegetables' }] },
  { id: 'ld11', name: 'Lamb kofta with rice and hummus', category: 'dinner', calories: 720, protein: 42, carbs: 60, fats: 32, fiber: 8, tags: ['home-cooking'], ingredients: [{ item: 'lamb mince', qty: 150, unit: 'g', cat: 'proteins' }, { item: 'microwave rice', qty: 1, unit: 'pouch', cat: 'carbs' }, { item: 'hummus', qty: 60, unit: 'g', cat: 'fats' }, { item: 'peppers', qty: 1, unit: 'piece', cat: 'vegetables' }] },
  { id: 'ld12', name: 'Roast chicken with potatoes and beans', category: 'dinner', calories: 700, protein: 52, carbs: 55, fats: 28, fiber: 8, tags: ['home-cooking'], ingredients: [{ item: 'chicken breasts', qty: 1, unit: 'large piece', cat: 'proteins' }, { item: 'potatoes', qty: 250, unit: 'g', cat: 'carbs' }, { item: 'green beans', qty: 150, unit: 'g', cat: 'vegetables' }] },
  { id: 'ld13', name: 'Pork chops with mash and broccoli', category: 'dinner', calories: 680, protein: 48, carbs: 45, fats: 32, fiber: 6, tags: ['home-cooking'], ingredients: [{ item: 'pork chops', qty: 1, unit: 'large', cat: 'proteins' }, { item: 'potatoes', qty: 200, unit: 'g', cat: 'carbs' }, { item: 'broccoli', qty: 150, unit: 'g', cat: 'vegetables' }, { item: 'dairy-free butter', qty: 20, unit: 'g', cat: 'fats' }] },
  
  // Snacks
  { id: 's1', name: 'Protein shake', category: 'snacks', calories: 200, protein: 25, carbs: 10, fats: 5, fiber: 1, tags: ['quick'], ingredients: [{ item: 'protein powder', qty: 1, unit: 'scoop', cat: 'proteins' }, { item: 'oat milk', qty: 250, unit: 'ml', cat: 'beverages' }] },
  { id: 's2', name: 'Beef jerky', category: 'snacks', calories: 100, protein: 15, carbs: 5, fats: 2, fiber: 0, tags: ['quick'], ingredients: [{ item: 'beef jerky', qty: 30, unit: 'g', cat: 'snacks' }] },
  { id: 's3', name: 'Protein bar (dairy-free)', category: 'snacks', calories: 220, protein: 20, carbs: 22, fats: 8, fiber: 3, tags: ['quick'], ingredients: [{ item: 'protein bars', qty: 1, unit: 'bar', cat: 'snacks' }] },
  { id: 's4', name: 'Rice cakes with peanut butter', category: 'snacks', calories: 200, protein: 8, carbs: 22, fats: 10, fiber: 2, tags: ['quick'], ingredients: [{ item: 'rice cakes', qty: 2, unit: 'pieces', cat: 'snacks' }, { item: 'peanut butter', qty: 1, unit: 'tbsp', cat: 'fats' }] },
  { id: 's5', name: 'Rice crackers with hummus', category: 'snacks', calories: 180, protein: 6, carbs: 25, fats: 7, fiber: 3, tags: ['quick'], ingredients: [{ item: 'rice crackers', qty: 30, unit: 'g', cat: 'snacks' }, { item: 'hummus', qty: 40, unit: 'g', cat: 'fats' }] },
  { id: 's6', name: 'Mixed nuts (handful)', category: 'snacks', calories: 180, protein: 6, carbs: 8, fats: 16, fiber: 2, tags: ['quick'], ingredients: [{ item: 'mixed nuts', qty: 30, unit: 'g', cat: 'snacks' }] },
  { id: 's7', name: 'Apple with almond butter', category: 'snacks', calories: 200, protein: 5, carbs: 25, fats: 10, fiber: 4, tags: ['quick'], ingredients: [{ item: 'apples', qty: 1, unit: 'medium', cat: 'fruits' }, { item: 'almond butter', qty: 1, unit: 'tbsp', cat: 'fats' }] },
  { id: 's8', name: 'Plain crisps (portion)', category: 'snacks', calories: 150, protein: 2, carbs: 15, fats: 9, fiber: 1, tags: ['quick'], ingredients: [{ item: 'crisps', qty: 25, unit: 'g', cat: 'snacks' }] },
  { id: 's9', name: 'Dark chocolate (2-3 squares)', category: 'snacks', calories: 100, protein: 2, carbs: 10, fats: 7, fiber: 2, tags: ['quick'], ingredients: [{ item: 'dark chocolate', qty: 20, unit: 'g', cat: 'snacks' }] },
  
  // Takeaway
  { id: 't1', name: 'Chicken wrap with chips (takeaway)', category: 'takeaway', calories: 1000, protein: 45, carbs: 90, fats: 45, fiber: 5, tags: [], ingredients: [] }
];

const ACHIEVEMENTS = [
  { id: 'protein-warrior', name: 'Protein Warrior', desc: '7 consecutive days hitting protein goal', icon: '💪', target: 7, type: 'streak', streakType: 'protein', xp: 100 },
  { id: 'macro-master', name: 'Macro Master', desc: '30 consecutive days within calorie target', icon: '🎯', target: 30, type: 'streak', streakType: 'calories', xp: 500 },
  { id: 'consistency-king', name: 'Consistency King', desc: '14 consecutive days logging all meals', icon: '👑', target: 14, type: 'streak', streakType: 'logging', xp: 200 },
  { id: 'lean-week', name: 'Lean Week', desc: '7 days under takeaway goal', icon: '🥗', target: 7, type: 'custom', xp: 150 },
  { id: 'month-milestone', name: 'Month Milestone', desc: '30 days of tracking', icon: '📅', target: 30, type: 'totalDays', xp: 300 },
  { id: 'quarter-champion', name: 'Quarter Champion', desc: '90 days of tracking', icon: '🏆', target: 90, type: 'totalDays', xp: 1000 },
  { id: 'first-log', name: 'First Steps', desc: 'Log your first meal', icon: '🌟', target: 1, type: 'totalDays', xp: 50 },
  { id: 'week-warrior', name: 'Week Warrior', desc: '7 days of tracking', icon: '📆', target: 7, type: 'totalDays', xp: 100 }
];

// ==================== UTILITIES ====================
const today = () => new Date().toISOString().split('T')[0];
const formatDate = d => new Date(d + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' });
const getGreeting = () => { const h = new Date().getHours(); return h < 12 ? 'Good Morning' : h < 17 ? 'Good Afternoon' : 'Good Evening'; };
const getMealPeriod = () => { const h = new Date().getHours(); return h < 12 ? 'breakfast' : h < 16 ? 'lunch' : h < 22 ? 'dinner' : 'snacks'; };
const isWeekend = () => [0, 5, 6].includes(new Date().getDay());
const isFriday = () => new Date().getDay() === 5;
const uid = () => Date.now().toString(36) + Math.random().toString(36).substr(2);
const xpForLevel = lvl => Math.floor(100 * Math.pow(1.5, lvl - 1));

const getAllMeals = () => [...DEFAULT_MEALS, ...Store.getMeals()];

const calcTotals = log => {
  const t = { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0 };
  Object.values(log.meals).flat().forEach(m => {
    t.calories += m.calories || 0;
    t.protein += m.protein || 0;
    t.carbs += m.carbs || 0;
    t.fats += m.fats || 0;
    t.fiber += m.fiber || 0;
  });
  t.calories += log.alcohol?.totalCalories || 0;
  return t;
};

// ==================== APP STATE ====================
let state = { tab: 'dashboard', modal: null, modalData: null, selectedMealCategory: 'all' };

// ==================== RENDER FUNCTIONS ====================
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

const render = () => {
  const app = $('#app');
  app.innerHTML = `
    <div class="app-container">
      ${renderHeader()}
      <main class="main-content">${renderTab()}</main>
      ${renderNav()}
      ${state.modal ? renderModal() : ''}
    </div>
  `;
  attachEventListeners();
};

const renderHeader = () => {
  const settings = Store.getSettings();
  const progress = Store.getProgress();
  return `<header class="header">
    <div class="header-left">
      <h1 class="date">${formatDate(today())}</h1>
      <p class="greeting">${getGreeting()}${settings.profile.name ? ', ' + settings.profile.name : ''}!</p>
    </div>
    <div class="header-right">
      <span class="level-badge">Lvl ${progress.level}</span>
    </div>
  </header>`;
};

const renderNav = () => `
  <nav class="bottom-nav">
    ${[['dashboard', '🏠', 'Home'], ['meals', '🍽️', 'Meals'], ['shopping', '🛒', 'Shop'], ['progress', '📊', 'Progress'], ['settings', '⚙️', 'Settings']]
      .map(([id, icon, label]) => `<button class="nav-btn ${state.tab === id ? 'active' : ''}" data-tab="${id}"><span class="nav-icon">${icon}</span><span class="nav-label">${label}</span></button>`).join('')}
  </nav>`;

const renderTab = () => {
  switch (state.tab) {
    case 'dashboard': return renderDashboard();
    case 'meals': return renderMeals();
    case 'shopping': return renderShopping();
    case 'progress': return renderProgress();
    case 'settings': return renderSettings();
    default: return '';
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
    return `<div class="macro-ring">
      <svg viewBox="0 0 36 36" class="ring-svg">
        <path class="ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
        <path class="ring-fill ${over ? 'over' : ''}" stroke="${over ? '#EF476F' : color}" stroke-dasharray="${pct}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
      </svg>
      <div class="ring-text"><span class="ring-value">${Math.round(current)}</span><span class="ring-label">${label}</span></div>
    </div>`;
  };
  
  const mealPeriod = getMealPeriod();
  const periodMeals = log.meals[mealPeriod] || [];
  
  return `
    <div class="dashboard">
      <div class="card macros-card">
        <h2>Today's Macros</h2>
        <div class="macro-rings">
          ${macroRing('kcal', log.totals.calories, targets.calories, '#00A896')}
          ${macroRing('protein', log.totals.protein, targets.protein, '#118AB2')}
          ${macroRing('carbs', log.totals.carbs, targets.carbs, '#FFD166')}
          ${macroRing('fats', log.totals.fats, targets.fats, '#EF476F')}
        </div>
        <div class="macro-remaining">
          <span>Remaining: ${Math.max(0, targets.calories - log.totals.calories)} kcal</span>
          <span>${Math.max(0, targets.protein - log.totals.protein)}g protein</span>
        </div>
      </div>
      
      <div class="card streak-card">
        <div class="streak-main"><span class="fire">🔥</span><span class="streak-num">${progress.streaks.protein.current}</span><span class="streak-label">day protein streak</span></div>
        <div class="streak-record">🏆 Best: ${progress.streaks.protein.longest} days</div>
      </div>
      
      <div class="card meals-card">
        <div class="meals-header">
          <h2>Today's Meals</h2>
          <span class="meal-period-badge">${mealPeriod}</span>
        </div>
        <div class="meal-tabs">
          ${['breakfast', 'lunch', 'dinner', 'snacks'].map(p => `<button class="meal-tab ${p === mealPeriod ? 'active' : ''}" data-period="${p}">${p.charAt(0).toUpperCase() + p.slice(1)}</button>`).join('')}
        </div>
        <div class="logged-meals" id="logged-meals">
          ${renderLoggedMeals(log, mealPeriod)}
        </div>
        <button class="btn btn-primary log-meal-btn" data-action="log-meal">+ Log ${mealPeriod.charAt(0).toUpperCase() + mealPeriod.slice(1)}</button>
      </div>
      
      ${isWeekend() ? `<div class="card alcohol-card">
        <h2>Weekend Drinks 🍺</h2>
        <div class="alcohol-tracker">
          <div class="cans-display">${Array(settings.alcohol.weeklyCanTarget).fill(0).map((_, i) => `<span class="can ${i < log.alcohol.cans ? 'filled' : ''}">🍺</span>`).join('')}</div>
          <p>${log.alcohol.cans} / ${settings.alcohol.weeklyCanTarget} cans (${log.alcohol.totalCalories} kcal)</p>
          <button class="btn btn-sm" data-action="add-drink">+ Add Drink</button>
        </div>
      </div>` : ''}
      
      ${isFriday() ? `<div class="card reminder-card"><span>⚖️</span> Don't forget your Friday weigh-in!</div>` : ''}
    </div>`;
};

const renderLoggedMeals = (log, period) => {
  const meals = log.meals[period] || [];
  if (!meals.length) return `<p class="empty-state">No ${period} logged yet</p>`;
  return meals.map((m, i) => `
    <div class="logged-meal">
      <div class="meal-info"><strong>${m.mealName}</strong><span class="meal-macros">${m.calories} kcal | P: ${m.protein}g | C: ${m.carbs}g | F: ${m.fats}g</span></div>
      <button class="btn-icon delete-meal" data-period="${period}" data-index="${i}">🗑️</button>
    </div>`).join('');
};

const renderMeals = () => {
  const meals = getAllMeals();
  const cats = ['all', 'breakfast', 'lunch', 'dinner', 'snacks', 'takeaway'];
  const filtered = state.selectedMealCategory === 'all' ? meals : meals.filter(m => m.category === state.selectedMealCategory || (state.selectedMealCategory === 'lunch' && m.category === 'dinner') || (state.selectedMealCategory === 'dinner' && m.category === 'lunch'));
  
  return `<div class="meals-tab">
    <div class="search-bar"><input type="text" id="meal-search" placeholder="Search meals..."></div>
    <div class="filter-chips">${cats.map(c => `<button class="chip ${state.selectedMealCategory === c ? 'active' : ''}" data-filter="${c}">${c.charAt(0).toUpperCase() + c.slice(1)}</button>`).join('')}</div>
    <div class="meal-list" id="meal-list">${filtered.map(m => renderMealCard(m)).join('')}</div>
    <button class="btn btn-primary fab" data-action="add-custom-meal">+ Custom Meal</button>
  </div>`;
};

const renderMealCard = m => `
  <div class="meal-card" data-meal-id="${m.id}">
    <div class="meal-card-main">
      <h3>${m.name}</h3>
      <p class="meal-macros">${m.calories} kcal | P: ${m.protein}g | C: ${m.carbs}g | F: ${m.fats}g</p>
      <div class="meal-tags">${(m.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}</div>
    </div>
    <button class="btn btn-sm btn-primary" data-action="quick-log" data-meal-id="${m.id}">+ Log</button>
  </div>`;

const renderShopping = () => {
  const list = Store.getShoppingList();
  return `<div class="shopping-tab">
    <button class="btn btn-primary" data-action="generate-list">🛒 Generate Shopping List</button>
    ${list ? renderShoppingList(list) : '<p class="empty-state">No shopping list yet. Generate one above!</p>'}
  </div>`;
};

const renderShoppingList = list => {
  const categories = ['proteins', 'carbs', 'vegetables', 'fruits', 'fats', 'snacks', 'beverages'];
  const grouped = {};
  list.items.forEach(item => { if (!grouped[item.category]) grouped[item.category] = []; grouped[item.category].push(item); });
  
  return `<div class="shopping-list">
    <h2>Shopping List</h2>
    <p class="list-date">Generated: ${new Date(list.dateGenerated).toLocaleDateString()}</p>
    ${categories.filter(c => grouped[c]?.length).map(cat => `
      <div class="list-category">
        <h3>${cat.charAt(0).toUpperCase() + cat.slice(1)}</h3>
        ${grouped[cat].map((item, i) => `
          <label class="list-item ${item.checked ? 'checked' : ''}">
            <input type="checkbox" ${item.checked ? 'checked' : ''} data-cat="${cat}" data-index="${i}">
            <span>${item.item} (${item.quantity} ${item.unit})</span>
          </label>`).join('')}
      </div>`).join('')}
    <button class="btn btn-danger" data-action="clear-list">Clear List</button>
  </div>`;
};

const renderProgress = () => {
  const weights = Store.getWeights();
  const progress = Store.getProgress();
  const settings = Store.getSettings();
  const latestWeight = weights[weights.length - 1];
  const prevWeight = weights[weights.length - 2];
  const change = latestWeight && prevWeight ? (latestWeight.weight - prevWeight.weight).toFixed(1) : 0;
  const totalChange = latestWeight ? (latestWeight.weight - settings.profile.startingWeight).toFixed(1) : 0;
  
  return `<div class="progress-tab">
    <div class="card weight-card">
      <h2>⚖️ Weight Progress</h2>
      ${latestWeight ? `
        <div class="weight-display">
          <span class="current-weight">${latestWeight.weight} kg</span>
          <span class="weight-change ${parseFloat(change) <= 0 ? 'positive' : 'negative'}">${change > 0 ? '+' : ''}${change} kg</span>
        </div>
        <p>Total: ${totalChange > 0 ? '+' : ''}${totalChange} kg from ${settings.profile.startingWeight} kg</p>
        <div class="weight-chart"><canvas id="weight-chart"></canvas></div>
      ` : '<p>No weights logged yet</p>'}
      <button class="btn btn-primary" data-action="log-weight">+ Log Weight</button>
    </div>
    
    <div class="card achievements-card">
      <h2>🏆 Achievements</h2>
      <div class="achievements-grid">
        ${ACHIEVEMENTS.map(a => {
          const unlocked = progress.achievements.includes(a.id);
          const current = getAchievementProgress(a, progress);
          return `<div class="achievement ${unlocked ? 'unlocked' : 'locked'}">
            <span class="ach-icon">${a.icon}</span>
            <span class="ach-name">${a.name}</span>
            ${!unlocked ? `<div class="ach-progress"><div class="ach-bar" style="width:${(current/a.target)*100}%"></div></div><span class="ach-count">${current}/${a.target}</span>` : ''}
          </div>`;
        }).join('')}
      </div>
    </div>
    
    <div class="card streaks-card">
      <h2>🔥 Streaks</h2>
      <div class="streak-stats">
        <div class="streak-stat"><span class="label">Protein Goal</span><span class="value">${progress.streaks.protein.current} days</span><span class="best">Best: ${progress.streaks.protein.longest}</span></div>
        <div class="streak-stat"><span class="label">Calorie Target</span><span class="value">${progress.streaks.calories.current} days</span><span class="best">Best: ${progress.streaks.calories.longest}</span></div>
        <div class="streak-stat"><span class="label">Logging</span><span class="value">${progress.streaks.logging.current} days</span><span class="best">Best: ${progress.streaks.logging.longest}</span></div>
      </div>
    </div>
    
    <div class="card xp-card">
      <h2>⭐ Level ${progress.level}</h2>
      <div class="xp-bar"><div class="xp-fill" style="width:${(progress.xp / xpForLevel(progress.level)) * 100}%"></div></div>
      <p>${progress.xp} / ${xpForLevel(progress.level)} XP to level ${progress.level + 1}</p>
    </div>
  </div>`;
};

const getAchievementProgress = (a, progress) => {
  if (a.type === 'streak') return progress.streaks[a.streakType]?.current || 0;
  if (a.type === 'totalDays') return Object.keys(Store.getLogs()).length;
  return 0;
};

const renderSettings = () => {
  const settings = Store.getSettings();
  return `<div class="settings-tab">
    <div class="card">
      <h2>👤 Profile</h2>
      <div class="form-group"><label>Name</label><input type="text" id="setting-name" value="${settings.profile.name || ''}"></div>
      <div class="form-group"><label>Starting Weight (kg)</label><input type="number" id="setting-start-weight" value="${settings.profile.startingWeight}" step="0.1"></div>
      <div class="form-group"><label>Target Weight (kg)</label><input type="number" id="setting-target-weight" value="${settings.profile.targetWeight}" step="0.1"></div>
    </div>
    
    <div class="card">
      <h2>🎯 Daily Targets</h2>
      <div class="form-group"><label>Calories</label><input type="number" id="setting-calories" value="${settings.targets.calories}"></div>
      <div class="form-group"><label>Protein (g)</label><input type="number" id="setting-protein" value="${settings.targets.protein}"></div>
      <div class="form-group"><label>Carbs (g)</label><input type="number" id="setting-carbs" value="${settings.targets.carbs}"></div>
      <div class="form-group"><label>Fats (g)</label><input type="number" id="setting-fats" value="${settings.targets.fats}"></div>
    </div>
    
    <div class="card">
      <h2>🍺 Alcohol</h2>
      <div class="form-group"><label>Calories per drink</label><input type="number" id="setting-drink-cal" value="${settings.alcohol.defaultCalories}"></div>
      <div class="form-group"><label>Weekly can target</label><input type="number" id="setting-can-target" value="${settings.alcohol.weeklyCanTarget}"></div>
    </div>
    
    <div class="card">
      <h2>💾 Data</h2>
      <button class="btn" data-action="export-data">📤 Export Data</button>
      <button class="btn" data-action="import-data">📥 Import Data</button>
      <input type="file" id="import-file" accept=".json" style="display:none">
      <button class="btn btn-danger" data-action="clear-data">🗑️ Clear All Data</button>
    </div>
    
    <button class="btn btn-primary save-settings" data-action="save-settings">Save Settings</button>
  </div>`;
};

// ==================== MODALS ====================
const renderModal = () => {
  const content = {
    'log-meal': renderLogMealModal,
    'add-custom-meal': renderCustomMealModal,
    'log-weight': renderLogWeightModal,
    'generate-list': renderGenerateListModal,
    'confirm-portion': renderConfirmPortionModal,
    'achievement': renderAchievementModal
  }[state.modal];
  
  return `<div class="modal-overlay" data-action="close-modal">
    <div class="modal" onclick="event.stopPropagation()">${content ? content() : ''}</div>
  </div>`;
};

const renderLogMealModal = () => {
  const meals = getAllMeals();
  const period = state.modalData?.period || getMealPeriod();
  const filtered = meals.filter(m => m.category === period || m.category === 'lunch' || m.category === 'dinner' || m.category === 'snacks');
  
  return `<div class="modal-content">
    <h2>Log ${period.charAt(0).toUpperCase() + period.slice(1)}</h2>
    <input type="text" id="modal-meal-search" placeholder="Search meals...">
    <div class="modal-meal-list">${filtered.map(m => `
      <div class="modal-meal-item" data-meal-id="${m.id}" data-period="${period}">
        <span class="meal-name">${m.name}</span>
        <span class="meal-cals">${m.calories} kcal</span>
      </div>`).join('')}</div>
    <button class="btn" data-action="close-modal">Cancel</button>
  </div>`;
};

const renderConfirmPortionModal = () => {
  const { meal, period } = state.modalData;
  return `<div class="modal-content">
    <h2>Log ${meal.name}</h2>
    <p>${meal.calories} kcal | P: ${meal.protein}g | C: ${meal.carbs}g | F: ${meal.fats}g</p>
    <div class="form-group"><label>Portion</label>
      <select id="portion-size">
        <option value="0.5">Half (0.5x)</option>
        <option value="1" selected>Full (1x)</option>
        <option value="1.5">Large (1.5x)</option>
        <option value="2">Double (2x)</option>
      </select>
    </div>
    <div class="form-group"><label>Meal</label>
      <select id="meal-period">
        ${['breakfast', 'lunch', 'dinner', 'snacks'].map(p => `<option value="${p}" ${p === period ? 'selected' : ''}>${p.charAt(0).toUpperCase() + p.slice(1)}</option>`).join('')}
      </select>
    </div>
    <div class="modal-actions">
      <button class="btn" data-action="close-modal">Cancel</button>
      <button class="btn btn-primary" data-action="confirm-log">Log Meal</button>
    </div>
  </div>`;
};

const renderCustomMealModal = () => `<div class="modal-content">
  <h2>Add Custom Meal</h2>
  <div class="form-group"><label>Name</label><input type="text" id="custom-name" placeholder="Meal name"></div>
  <div class="form-group"><label>Category</label>
    <select id="custom-category">
      <option value="breakfast">Breakfast</option>
      <option value="lunch">Lunch</option>
      <option value="dinner">Dinner</option>
      <option value="snacks">Snacks</option>
    </select>
  </div>
  <div class="form-group"><label>Calories</label><input type="number" id="custom-calories" placeholder="0"></div>
  <div class="form-group"><label>Protein (g)</label><input type="number" id="custom-protein" placeholder="0"></div>
  <div class="form-group"><label>Carbs (g)</label><input type="number" id="custom-carbs" placeholder="0"></div>
  <div class="form-group"><label>Fats (g)</label><input type="number" id="custom-fats" placeholder="0"></div>
  <div class="modal-actions">
    <button class="btn" data-action="close-modal">Cancel</button>
    <button class="btn btn-primary" data-action="save-custom-meal">Save Meal</button>
  </div>
</div>`;

const renderLogWeightModal = () => `<div class="modal-content">
  <h2>Log Weight</h2>
  <div class="form-group"><label>Weight (kg)</label><input type="number" id="weight-value" step="0.1" placeholder="80.0"></div>
  <div class="form-group"><label>Date</label><input type="date" id="weight-date" value="${today()}"></div>
  <div class="modal-actions">
    <button class="btn" data-action="close-modal">Cancel</button>
    <button class="btn btn-primary" data-action="save-weight">Save Weight</button>
  </div>
</div>`;

const renderGenerateListModal = () => {
  const meals = getAllMeals();
  return `<div class="modal-content generate-list-modal">
    <h2>Plan Your Meals</h2>
    <p>Select meals for the next 3 days:</p>
    ${[0, 1, 2].map(dayOffset => {
      const d = new Date(); d.setDate(d.getDate() + dayOffset);
      const dateStr = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric' });
      return `<div class="plan-day">
        <h3>${dayName}</h3>
        ${['breakfast', 'lunch', 'dinner'].map(period => `
          <div class="plan-meal">
            <label>${period}</label>
            <select data-day="${dateStr}" data-period="${period}">
              <option value="">-- Select --</option>
              ${meals.filter(m => m.category === period || m.category === 'lunch' || m.category === 'dinner').map(m => `<option value="${m.id}">${m.name}</option>`).join('')}
            </select>
          </div>`).join('')}
      </div>`;
    }).join('')}
    <div class="modal-actions">
      <button class="btn" data-action="close-modal">Cancel</button>
      <button class="btn btn-primary" data-action="create-shopping-list">Generate List</button>
    </div>
  </div>`;
};

const renderAchievementModal = () => {
  const a = state.modalData;
  return `<div class="modal-content achievement-modal">
    <div class="ach-unlock-icon">${a.icon}</div>
    <h2>Achievement Unlocked!</h2>
    <h3>${a.name}</h3>
    <p>${a.desc}</p>
    <p class="xp-reward">+${a.xp} XP</p>
    <button class="btn btn-primary" data-action="close-modal">Awesome!</button>
  </div>`;
};

// ==================== EVENT HANDLERS ====================
const attachEventListeners = () => {
  $('.nav-btn').forEach(btn => btn.onclick = () => { state.tab = btn.dataset.tab; render(); });
  $('.meal-tab').forEach(btn => btn.onclick = () => {
    const period = btn.dataset.period;
    const log = Store.getLog(today());
    $('#logged-meals').innerHTML = renderLoggedMeals(log, period);
    $('.meal-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
  $('.chip').forEach(btn => btn.onclick = () => { state.selectedMealCategory = btn.dataset.filter; render(); });
  
  $('[data-action]').forEach(el => {
    el.onclick = e => {
      e.stopPropagation();
      handleAction(el.dataset.action, el.dataset);
    };
  });
  
  $('.modal-meal-item').forEach(el => el.onclick = () => {
    const meal = getAllMeals().find(m => m.id === el.dataset.mealId);
    state.modal = 'confirm-portion';
    state.modalData = { meal, period: el.dataset.period };
    render();
  });
  
  $('.delete-meal').forEach(btn => btn.onclick = e => {
    e.stopPropagation();
    deleteMeal(btn.dataset.period, parseInt(btn.dataset.index));
  });
  
  $('.list-item input').forEach(cb => cb.onchange = () => {
    const list = Store.getShoppingList();
    const items = list.items.filter(i => i.category === cb.dataset.cat);
    items[parseInt(cb.dataset.index)].checked = cb.checked;
    Store.saveShoppingList(list);
    render();
  });
  
  const searchInput = $('#meal-search');
  if (searchInput) searchInput.oninput = e => {
    const q = e.target.value.toLowerCase();
    $('.meal-card').forEach(card => {
      const name = card.querySelector('h3').textContent.toLowerCase();
      card.style.display = name.includes(q) ? '' : 'none';
    });
  };
  
  // Render weight chart if on progress tab
  if (state.tab === 'progress' && $('#weight-chart')) renderWeightChart();
};

const handleAction = (action, data) => {
  const actions = {
    'close-modal': () => { state.modal = null; state.modalData = null; },
    'log-meal': () => { state.modal = 'log-meal'; state.modalData = { period: getMealPeriod() }; },
    'quick-log': () => {
      const meal = getAllMeals().find(m => m.id === data.mealId);
      state.modal = 'confirm-portion';
      state.modalData = { meal, period: meal.category === 'snacks' ? 'snacks' : getMealPeriod() };
    },
    'confirm-log': () => logMeal(),
    'add-custom-meal': () => { state.modal = 'add-custom-meal'; },
    'save-custom-meal': () => saveCustomMeal(),
    'log-weight': () => { state.modal = 'log-weight'; },
    'save-weight': () => saveWeight(),
    'add-drink': () => addDrink(),
    'generate-list': () => { state.modal = 'generate-list'; },
    'create-shopping-list': () => createShoppingList(),
    'clear-list': () => { Store.saveShoppingList(null); },
    'save-settings': () => saveSettings(),
    'export-data': () => exportData(),
    'import-data': () => $('#import-file').click(),
    'clear-data': () => { if (confirm('Clear all data? This cannot be undone.')) { localStorage.clear(); location.reload(); } }
  };
  
  if (actions[action]) { actions[action](); render(); }
};

// ==================== DATA OPERATIONS ====================
const logMeal = () => {
  const { meal, period } = state.modalData;
  const portion = parseFloat($('#portion-size').value);
  const finalPeriod = $('#meal-period').value;
  
  const log = Store.getLog(today());
  log.meals[finalPeriod].push({
    mealId: meal.id,
    mealName: meal.name,
    portion,
    calories: Math.round(meal.calories * portion),
    protein: Math.round(meal.protein * portion),
    carbs: Math.round(meal.carbs * portion),
    fats: Math.round(meal.fats * portion),
    fiber: Math.round((meal.fiber || 0) * portion),
    timestamp: new Date().toISOString()
  });
  log.totals = calcTotals(log);
  Store.saveLog(today(), log);
  
  updateStreaksAndAchievements(log);
  state.modal = null;
  state.modalData = null;
};

const deleteMeal = (period, index) => {
  const log = Store.getLog(today());
  log.meals[period].splice(index, 1);
  log.totals = calcTotals(log);
  Store.saveLog(today(), log);
  render();
};

const saveCustomMeal = () => {
  const meal = {
    id: 'custom-' + uid(),
    name: $('#custom-name').value,
    category: $('#custom-category').value,
    calories: parseInt($('#custom-calories').value) || 0,
    protein: parseInt($('#custom-protein').value) || 0,
    carbs: parseInt($('#custom-carbs').value) || 0,
    fats: parseInt($('#custom-fats').value) || 0,
    fiber: 0,
    tags: ['custom'],
    ingredients: [],
    isCustom: true
  };
  
  const meals = Store.getMeals();
  meals.push(meal);
  Store.saveMeals(meals);
  state.modal = null;
};

const saveWeight = () => {
  const weight = parseFloat($('#weight-value').value);
  const date = $('#weight-date').value;
  if (!weight) return;
  
  const weights = Store.getWeights();
  const existing = weights.findIndex(w => w.date === date);
  const entry = { id: uid(), date, weight, change: 0 };
  
  if (existing >= 0) weights[existing] = entry;
  else weights.push(entry);
  
  weights.sort((a, b) => a.date.localeCompare(b.date));
  
  // Calculate changes
  for (let i = 1; i < weights.length; i++) {
    weights[i].change = parseFloat((weights[i].weight - weights[i-1].weight).toFixed(1));
  }
  
  Store.saveWeights(weights);
  addXP(50);
  state.modal = null;
};

const addDrink = () => {
  const settings = Store.getSettings();
  const log = Store.getLog(today());
  log.alcohol.cans++;
  log.alcohol.totalCalories = log.alcohol.cans * settings.alcohol.defaultCalories;
  log.totals = calcTotals(log);
  Store.saveLog(today(), log);
};

const createShoppingList = () => {
  const meals = getAllMeals();
  const selects = $('.generate-list-modal select');
  const selectedMeals = [];
  const items = {};
  
  selects.forEach(sel => {
    if (sel.value) {
      const meal = meals.find(m => m.id === sel.value);
      if (meal) selectedMeals.push(meal);
    }
  });
  
  selectedMeals.forEach(meal => {
    (meal.ingredients || []).forEach(ing => {
      const key = ing.item;
      if (!items[key]) items[key] = { item: ing.item, quantity: 0, unit: ing.unit, category: ing.cat || 'other', checked: false };
      items[key].quantity += ing.qty;
    });
  });
  
  const list = {
    dateGenerated: new Date().toISOString(),
    items: Object.values(items)
  };
  
  Store.saveShoppingList(list);
  state.modal = null;
};

const saveSettings = () => {
  const settings = Store.getSettings();
  settings.profile.name = $('#setting-name').value;
  settings.profile.startingWeight = parseFloat($('#setting-start-weight').value);
  settings.profile.targetWeight = parseFloat($('#setting-target-weight').value);
  settings.targets.calories = parseInt($('#setting-calories').value);
  settings.targets.protein = parseInt($('#setting-protein').value);
  settings.targets.carbs = parseInt($('#setting-carbs').value);
  settings.targets.fats = parseInt($('#setting-fats').value);
  settings.alcohol.defaultCalories = parseInt($('#setting-drink-cal').value);
  settings.alcohol.weeklyCanTarget = parseInt($('#setting-can-target').value);
  Store.saveSettings(settings);
  alert('Settings saved!');
};

const exportData = () => {
  const data = {
    settings: Store.getSettings(),
    dailyLogs: Store.getLogs(),
    weights: Store.getWeights(),
    progress: Store.getProgress(),
    customMeals: Store.getMeals(),
    shoppingList: Store.getShoppingList(),
    exportDate: new Date().toISOString()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `mealprep-backup-${today()}.json`;
  a.click();
};

const importData = file => {
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.settings) Store.saveSettings(data.settings);
      if (data.dailyLogs) Store.saveLogs(data.dailyLogs);
      if (data.weights) Store.saveWeights(data.weights);
      if (data.progress) Store.saveProgress(data.progress);
      if (data.customMeals) Store.saveMeals(data.customMeals);
      if (data.shoppingList) Store.saveShoppingList(data.shoppingList);
      alert('Data imported successfully!');
      render();
    } catch (err) {
      alert('Error importing data: ' + err.message);
    }
  };
  reader.readAsText(file);
};

// ==================== STREAKS & ACHIEVEMENTS ====================
const updateStreaksAndAchievements = log => {
  const settings = Store.getSettings();
  const progress = Store.getProgress();
  const targets = settings.targets;
  
  // Check goals met
  const proteinMet = log.totals.protein >= targets.protein;
  const caloriesMet = log.totals.calories >= (targets.calories - 100) && log.totals.calories <= (targets.calories + 100);
  const loggedMeals = Object.values(log.meals).some(m => m.length > 0);
  
  // Update streaks
  if (proteinMet) {
    progress.streaks.protein.current++;
    if (progress.streaks.protein.current > progress.streaks.protein.longest) {
      progress.streaks.protein.longest = progress.streaks.protein.current;
    }
  }
  
  if (caloriesMet) {
    progress.streaks.calories.current++;
    if (progress.streaks.calories.current > progress.streaks.calories.longest) {
      progress.streaks.calories.longest = progress.streaks.calories.current;
    }
  }
  
  if (loggedMeals) {
    progress.streaks.logging.current++;
    if (progress.streaks.logging.current > progress.streaks.logging.longest) {
      progress.streaks.logging.longest = progress.streaks.logging.current;
    }
  }
  
  // Check achievements
  ACHIEVEMENTS.forEach(a => {
    if (progress.achievements.includes(a.id)) return;
    
    let achieved = false;
    if (a.type === 'streak' && progress.streaks[a.streakType].current >= a.target) achieved = true;
    if (a.type === 'totalDays' && Object.keys(Store.getLogs()).length >= a.target) achieved = true;
    
    if (achieved) {
      progress.achievements.push(a.id);
      addXP(a.xp);
      state.modal = 'achievement';
      state.modalData = a;
    }
  });
  
  // Add daily XP
  addXP(10); // Daily log
  if (proteinMet) addXP(20);
  if (caloriesMet) addXP(10);
  
  Store.saveProgress(progress);
};

const addXP = amount => {
  const progress = Store.getProgress();
  progress.xp += amount;
  
  // Level up check
  while (progress.xp >= xpForLevel(progress.level)) {
    progress.xp -= xpForLevel(progress.level);
    progress.level++;
  }
  
  Store.saveProgress(progress);
};

// ==================== CHARTS ====================
const renderWeightChart = () => {
  const canvas = $('#weight-chart');
  if (!canvas) return;
  
  const weights = Store.getWeights();
  if (weights.length < 2) return;
  
  const ctx = canvas.getContext('2d');
  const w = canvas.parentElement.offsetWidth;
  const h = 150;
  canvas.width = w;
  canvas.height = h;
  
  const padding = 40;
  const chartW = w - padding * 2;
  const chartH = h - padding;
  
  const values = weights.map(w => w.weight);
  const min = Math.min(...values) - 1;
  const max = Math.max(...values) + 1;
  const range = max - min;
  
  // Draw axes
  ctx.strokeStyle = '#374151';
  ctx.beginPath();
  ctx.moveTo(padding, 10);
  ctx.lineTo(padding, chartH);
  ctx.lineTo(w - 10, chartH);
  ctx.stroke();
  
  // Draw line
  ctx.strokeStyle = '#00A896';
  ctx.lineWidth = 2;
  ctx.beginPath();
  
  weights.forEach((entry, i) => {
    const x = padding + (i / (weights.length - 1)) * chartW;
    const y = chartH - ((entry.weight - min) / range) * (chartH - 20);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
  
  // Draw points
  ctx.fillStyle = '#00A896';
  weights.forEach((entry, i) => {
    const x = padding + (i / (weights.length - 1)) * chartW;
    const y = chartH - ((entry.weight - min) / range) * (chartH - 20);
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  });
  
  // Labels
  ctx.fillStyle = '#9CA3AF';
  ctx.font = '10px sans-serif';
  ctx.fillText(max.toFixed(1) + 'kg', 5, 15);
  ctx.fillText(min.toFixed(1) + 'kg', 5, chartH);
};

// ==================== INITIALIZATION ====================
const init = () => {
  // Service worker registration
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW registration failed:', err));
  }
  
  // Import file handler
  document.addEventListener('change', e => {
    if (e.target.id === 'import-file' && e.target.files[0]) {
      importData(e.target.files[0]);
    }
  });
  
  // First render
  render();
};

document.addEventListener('DOMContentLoaded', init);
