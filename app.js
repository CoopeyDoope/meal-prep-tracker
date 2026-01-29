// ==================== DATA STORE ====================
const Store = {
  get: k => { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
  set: (k, v) => localStorage.setItem(k, JSON.stringify(v)),
  getSettings: () => Store.get('settings') || {
    profile: { name: '', startingWeight: 80, targetWeight: 78 },
    targets: { calories: 2500, protein: 180, carbs: 280, fats: 75 },
    alcohol: { defaultCalories: 170, weeklyCanTarget: 4 }
  },
  saveSettings: s => Store.set('settings', s),
  getLogs: () => Store.get('dailyLogs') || {},
  saveLogs: l => Store.set('dailyLogs', l),
  getLog: date => { 
    const logs = Store.getLogs(); 
    return logs[date] || { date, meals: { breakfast: [], lunch: [], dinner: [], snacks: [] }, alcohol: { cans: 0, totalCalories: 0 }, totals: { calories: 0, protein: 0, carbs: 0, fats: 0 } }; 
  },
  saveLog: (date, log) => { const logs = Store.getLogs(); logs[date] = log; Store.saveLogs(logs); },
  getWeights: () => Store.get('weights') || [],
  saveWeights: w => Store.set('weights', w),
  getProgress: () => Store.get('progress') || { level: 1, xp: 0, achievements: [], streaks: { protein: { current: 0, longest: 0 }, calories: { current: 0, longest: 0 }, logging: { current: 0, longest: 0 } } },
  saveProgress: p => Store.set('progress', p),
  getCustomMeals: () => Store.get('customMeals') || [],
  saveCustomMeals: m => Store.set('customMeals', m),
  getMealEdits: () => Store.get('mealEdits') || {},
  saveMealEdits: e => Store.set('mealEdits', e),
  getShoppingList: () => Store.get('shoppingList') || null,
  saveShoppingList: l => Store.set('shoppingList', l)
};

// ==================== DEFAULT MEALS ====================
const DEFAULT_MEALS = [
  { id: 'b1', name: 'Bagel with peanut butter and banana', category: 'breakfast', calories: 500, protein: 20, carbs: 65, fats: 18, tags: ['quick'], ingredients: [{ item: 'bagels', qty: 1, cat: 'carbs' }, { item: 'peanut butter', qty: 1, cat: 'fats' }, { item: 'bananas', qty: 1, cat: 'fruits' }] },
  { id: 'b2', name: 'Porridge with honey', category: 'breakfast', calories: 400, protein: 12, carbs: 70, fats: 8, tags: ['quick'], ingredients: [{ item: 'porridge oats', qty: 1, cat: 'carbs' }, { item: 'oat milk', qty: 1, cat: 'beverages' }] },
  { id: 'b3', name: 'Protein smoothie', category: 'breakfast', calories: 450, protein: 40, carbs: 50, fats: 12, tags: ['quick'], ingredients: [{ item: 'protein powder', qty: 1, cat: 'proteins' }, { item: 'oat milk', qty: 1, cat: 'beverages' }, { item: 'bananas', qty: 1, cat: 'fruits' }] },
  { id: 'b4', name: 'Turkey bacon with mushrooms and toast', category: 'breakfast', calories: 420, protein: 30, carbs: 35, fats: 18, tags: ['home-cooking'], ingredients: [{ item: 'turkey rashers', qty: 1, cat: 'proteins' }, { item: 'mushrooms', qty: 1, cat: 'vegetables' }, { item: 'bread', qty: 1, cat: 'carbs' }] },
  { id: 'l1', name: 'Grilled chicken with rice and veg', category: 'lunch', calories: 550, protein: 50, carbs: 55, fats: 12, tags: ['batch-cookable'], ingredients: [{ item: 'chicken breasts', qty: 1, cat: 'proteins' }, { item: 'microwave rice', qty: 1, cat: 'carbs' }, { item: 'frozen mixed veg', qty: 1, cat: 'vegetables' }] },
  { id: 'l2', name: 'Beef chilli with rice', category: 'lunch', calories: 650, protein: 45, carbs: 60, fats: 25, tags: ['batch-cookable'], ingredients: [{ item: 'beef mince', qty: 1, cat: 'proteins' }, { item: 'microwave rice', qty: 1, cat: 'carbs' }, { item: 'peppers', qty: 1, cat: 'vegetables' }] },
  { id: 'l3', name: 'Chicken fajita bowl', category: 'lunch', calories: 600, protein: 50, carbs: 55, fats: 18, tags: ['quick'], ingredients: [{ item: 'chicken breasts', qty: 1, cat: 'proteins' }, { item: 'peppers', qty: 2, cat: 'vegetables' }, { item: 'microwave rice', qty: 1, cat: 'carbs' }] },
  { id: 'l4', name: 'Beef burrito bowl', category: 'lunch', calories: 680, protein: 48, carbs: 60, fats: 26, tags: ['batch-cookable'], ingredients: [{ item: 'beef mince', qty: 1, cat: 'proteins' }, { item: 'microwave rice', qty: 1, cat: 'carbs' }, { item: 'lettuce', qty: 1, cat: 'vegetables' }] },
  { id: 'd1', name: 'Steak with chips and asparagus', category: 'dinner', calories: 800, protein: 55, carbs: 60, fats: 35, tags: ['home-cooking'], ingredients: [{ item: 'steak', qty: 1, cat: 'proteins' }, { item: 'oven chips', qty: 1, cat: 'carbs' }, { item: 'asparagus', qty: 1, cat: 'vegetables' }] },
  { id: 'd2', name: 'Spaghetti bolognese', category: 'dinner', calories: 750, protein: 45, carbs: 80, fats: 25, tags: ['batch-cookable'], ingredients: [{ item: 'beef mince', qty: 1, cat: 'proteins' }, { item: 'pasta', qty: 1, cat: 'carbs' }, { item: 'tomato sauce', qty: 1, cat: 'vegetables' }] },
  { id: 'd3', name: 'Chicken stir-fry with noodles', category: 'dinner', calories: 600, protein: 48, carbs: 55, fats: 18, tags: ['quick'], ingredients: [{ item: 'chicken breasts', qty: 1, cat: 'proteins' }, { item: 'noodles', qty: 1, cat: 'carbs' }, { item: 'frozen mixed veg', qty: 1, cat: 'vegetables' }] },
  { id: 'd4', name: 'Pork chops with mash and broccoli', category: 'dinner', calories: 680, protein: 48, carbs: 45, fats: 32, tags: ['home-cooking'], ingredients: [{ item: 'pork chops', qty: 1, cat: 'proteins' }, { item: 'potatoes', qty: 1, cat: 'carbs' }, { item: 'broccoli', qty: 1, cat: 'vegetables' }] },
  { id: 's1', name: 'Protein shake', category: 'snacks', calories: 200, protein: 25, carbs: 10, fats: 5, tags: ['quick'], ingredients: [{ item: 'protein powder', qty: 1, cat: 'proteins' }, { item: 'oat milk', qty: 1, cat: 'beverages' }] },
  { id: 's2', name: 'Beef jerky', category: 'snacks', calories: 100, protein: 15, carbs: 5, fats: 2, tags: ['quick'], ingredients: [{ item: 'beef jerky', qty: 1, cat: 'snacks' }] },
  { id: 's3', name: 'Rice cakes with peanut butter', category: 'snacks', calories: 200, protein: 8, carbs: 22, fats: 10, tags: ['quick'], ingredients: [{ item: 'rice cakes', qty: 1, cat: 'snacks' }, { item: 'peanut butter', qty: 1, cat: 'fats' }] },
  { id: 's4', name: 'Mixed nuts (handful)', category: 'snacks', calories: 180, protein: 6, carbs: 8, fats: 16, tags: ['quick'], ingredients: [{ item: 'mixed nuts', qty: 1, cat: 'snacks' }] },
  { id: 's5', name: 'Dark chocolate (2-3 squares)', category: 'snacks', calories: 100, protein: 2, carbs: 10, fats: 7, tags: ['quick'], ingredients: [{ item: 'dark chocolate', qty: 1, cat: 'snacks' }] },
  { id: 't1', name: 'Chicken wrap with chips (takeaway)', category: 'takeaway', calories: 1000, protein: 45, carbs: 90, fats: 45, tags: ['takeaway'], ingredients: [] }
];

const ACHIEVEMENTS = [
  { id: 'first-log', name: 'First Steps', desc: 'Log your first meal', icon: '🌟', target: 1, type: 'totalDays', xp: 50 },
  { id: 'week-warrior', name: 'Week Warrior', desc: '7 days of tracking', icon: '📆', target: 7, type: 'totalDays', xp: 100 },
  { id: 'protein-warrior', name: 'Protein Warrior', desc: '7 days hitting protein goal', icon: '💪', target: 7, type: 'streak', streakType: 'protein', xp: 100 },
  { id: 'month-milestone', name: 'Month Milestone', desc: '30 days of tracking', icon: '📅', target: 30, type: 'totalDays', xp: 300 }
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

const getMealWithEdits = meal => {
  const edits = Store.getMealEdits();
  return edits[meal.id] ? { ...meal, ...edits[meal.id] } : meal;
};

const getAllMeals = () => [...DEFAULT_MEALS.map(m => getMealWithEdits(m)), ...Store.getCustomMeals()];

const calcTotals = log => {
  const t = { calories: 0, protein: 0, carbs: 0, fats: 0 };
  Object.values(log.meals).flat().forEach(m => {
    t.calories += m.calories || 0;
    t.protein += m.protein || 0;
    t.carbs += m.carbs || 0;
    t.fats += m.fats || 0;
  });
  if (log.alcohol) t.calories += log.alcohol.totalCalories || 0;
  return t;
};

// ==================== APP STATE ====================
let state = { tab: 'dashboard', modal: null, modalData: null, selectedMealCategory: 'all', activePeriod: getMealPeriod(), shoppingDays: 3 };

// ==================== RENDER FUNCTIONS ====================
const render = () => {
  const app = document.getElementById('app');
  if (!app) return;
  app.innerHTML = '<div class="app-container">' + renderHeader() + '<main class="main-content">' + renderTab() + '</main>' + renderNav() + (state.modal ? renderModal() : '') + '</div>';
  attachEvents();
};

const renderHeader = () => {
  const s = Store.getSettings();
  const p = Store.getProgress();
  return '<header class="header"><div class="header-left"><h1 class="date">' + formatDate(today()) + '</h1><p class="greeting">' + getGreeting() + (s.profile.name ? ', ' + s.profile.name : '') + '!</p></div><div class="header-right"><span class="level-badge">Lvl ' + p.level + '</span></div></header>';
};

const renderNav = () => {
  const tabs = [['dashboard','🏠','Home'],['meals','🍽️','Meals'],['shopping','🛒','Shop'],['progress','📊','Progress'],['settings','⚙️','Settings']];
  return '<nav class="bottom-nav">' + tabs.map(t => '<button class="nav-btn' + (state.tab === t[0] ? ' active' : '') + '" data-tab="' + t[0] + '"><span class="nav-icon">' + t[1] + '</span><span class="nav-label">' + t[2] + '</span></button>').join('') + '</nav>';
};

const renderTab = () => {
  switch(state.tab) {
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
  const targets = Store.getSettings().targets;
  const progress = Store.getProgress();
  
  const ring = (l, c, t, col) => {
    const pct = Math.min((c/t)*100, 100);
    const color = c > t ? '#EF476F' : col;
    return '<div class="macro-ring"><svg viewBox="0 0 36 36" class="ring-svg"><path class="ring-bg" d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831a15.9155 15.9155 0 0 1 0-31.831"/><path class="ring-fill" stroke="'+color+'" stroke-dasharray="'+pct+',100" d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831a15.9155 15.9155 0 0 1 0-31.831"/></svg><div class="ring-text"><span class="ring-value">'+Math.round(c)+'</span><span class="ring-label">'+l+'</span></div></div>';
  };

  let h = '<div class="dashboard">';
  h += '<div class="card macros-card"><h2>Today\'s Macros</h2><div class="macro-rings">' + ring('kcal',log.totals.calories,targets.calories,'#00A896') + ring('protein',log.totals.protein,targets.protein,'#118AB2') + ring('carbs',log.totals.carbs,targets.carbs,'#FFD166') + ring('fats',log.totals.fats,targets.fats,'#EF476F') + '</div><div class="macro-remaining"><span>Remaining: '+Math.max(0,targets.calories-log.totals.calories)+' kcal</span><span>'+Math.max(0,targets.protein-log.totals.protein)+'g protein</span></div></div>';
  h += '<div class="card streak-card"><div class="streak-main"><span class="fire">🔥</span><span class="streak-num">'+progress.streaks.protein.current+'</span><span class="streak-label">day protein streak</span></div><div class="streak-record">🏆 Best: '+progress.streaks.protein.longest+' days</div></div>';
  
  const p = state.activePeriod;
  h += '<div class="card meals-card"><div class="meals-header"><h2>Today\'s Meals</h2><span class="meal-period-badge">'+p+'</span></div><div class="meal-tabs">';
  ['breakfast','lunch','dinner','snacks'].forEach(x => { h += '<button class="meal-tab'+(x===p?' active':'')+'" data-period="'+x+'">'+x.charAt(0).toUpperCase()+x.slice(1)+'</button>'; });
  h += '</div><div class="logged-meals">';
  const meals = log.meals[p] || [];
  if (meals.length === 0) { h += '<p class="empty-state">No '+p+' logged yet</p>'; }
  else { meals.forEach((m,i) => { h += '<div class="logged-meal"><div class="meal-info"><strong>'+m.mealName+'</strong><span class="meal-macros">'+m.calories+' kcal | P:'+m.protein+'g | C:'+m.carbs+'g | F:'+m.fats+'g</span></div><button class="btn-icon" data-action="delete-meal" data-period="'+p+'" data-index="'+i+'">🗑️</button></div>'; }); }
  h += '</div><button class="btn btn-primary log-meal-btn" data-action="log-meal">+ Log '+p.charAt(0).toUpperCase()+p.slice(1)+'</button></div>';
  
  if (isWeekend()) {
    const alc = log.alcohol || {cans:0,totalCalories:0};
    const t = Store.getSettings().alcohol.weeklyCanTarget;
    h += '<div class="card alcohol-card"><h2>Weekend Drinks 🍺</h2><div class="alcohol-tracker"><div class="cans-display">';
    for(let i=0;i<t;i++) h += '<span class="can'+(i<alc.cans?' filled':'')+'">🍺</span>';
    h += '</div><p>'+alc.cans+'/'+t+' cans ('+alc.totalCalories+' kcal)</p><button class="btn btn-sm" data-action="add-drink">+ Add Drink</button></div></div>';
  }
  if (isFriday()) h += '<div class="card reminder-card"><span>⚖️</span> Friday weigh-in reminder!</div>';
  h += '</div>';
  return h;
};

const renderMeals = () => {
  const meals = getAllMeals();
  const cat = state.selectedMealCategory;
  const filtered = cat === 'all' ? meals : meals.filter(m => m.category === cat);
  
  let h = '<div class="meals-tab"><div class="search-bar"><input type="text" id="meal-search" placeholder="Search meals..."></div><div class="filter-chips">';
  ['all','breakfast','lunch','dinner','snacks','takeaway'].forEach(c => { h += '<button class="chip'+(cat===c?' active':'')+'" data-filter="'+c+'">'+c.charAt(0).toUpperCase()+c.slice(1)+'</button>'; });
  h += '</div><div class="meal-list">';
  filtered.forEach(m => {
    h += '<div class="meal-card"><div class="meal-card-main"><h3>'+m.name+'</h3><p class="meal-macros">'+m.calories+' kcal | P:'+m.protein+'g | C:'+m.carbs+'g | F:'+m.fats+'g</p><div class="meal-tags">';
    (m.tags||[]).forEach(t => { h += '<span class="tag">'+t+'</span>'; });
    h += '</div></div><div class="meal-card-actions"><button class="btn btn-sm" data-action="edit-meal" data-meal-id="'+m.id+'">✏️</button><button class="btn btn-sm btn-primary" data-action="quick-log" data-meal-id="'+m.id+'">+ Log</button></div></div>';
  });
  h += '</div><button class="btn btn-primary fab" data-action="add-custom-meal">+ Custom</button></div>';
  return h;
};

const renderShopping = () => {
  const list = Store.getShoppingList();
  let h = '<div class="shopping-tab"><div class="card"><h2>🛒 Generate Shopping List</h2><div class="form-group"><label>Days to plan</label><select id="shopping-days">';
  for(let i=1;i<=7;i++) h += '<option value="'+i+'"'+(state.shoppingDays===i?' selected':'')+'>'+i+' day'+(i>1?'s':'')+'</option>';
  h += '</select></div><button class="btn btn-primary" data-action="generate-list">Generate List</button></div>';
  
  if (list && list.items && list.items.length > 0) {
    const cats = ['proteins','carbs','vegetables','fruits','fats','snacks','beverages'];
    const grouped = {};
    list.items.forEach(item => { if(item&&item.category){if(!grouped[item.category])grouped[item.category]=[];grouped[item.category].push(item);} });
    h += '<div class="shopping-list"><h2>Shopping List</h2><p class="list-date">For '+(list.days||3)+' days</p>';
    cats.forEach(cat => {
      if(grouped[cat]&&grouped[cat].length>0){
        h += '<div class="list-category"><h3>'+cat+'</h3>';
        grouped[cat].forEach((item,i) => { h += '<label class="list-item'+(item.checked?' checked':'')+'"><input type="checkbox"'+(item.checked?' checked':'')+' data-action="toggle-item" data-cat="'+cat+'" data-idx="'+i+'"><span>'+item.item+(item.quantity>1?' (x'+item.quantity+')':'')+'</span></label>'; });
        h += '</div>';
      }
    });
    h += '<button class="btn btn-danger" data-action="clear-list">Clear List</button></div>';
  } else { h += '<p class="empty-state">No shopping list yet.</p>'; }
  h += '</div>';
  return h;
};

// PART 2 - COMBINE WITH PART 1

const renderProgress = () => {
  const weights = Store.getWeights();
  const progress = Store.getProgress();
  const settings = Store.getSettings();
  const latest = weights.length > 0 ? weights[weights.length-1] : null;
  const prev = weights.length > 1 ? weights[weights.length-2] : null;
  
  let h = '<div class="progress-tab"><div class="card weight-card"><h2>⚖️ Weight Progress</h2>';
  if (latest) {
    const change = prev ? (latest.weight - prev.weight).toFixed(1) : 0;
    const total = (latest.weight - settings.profile.startingWeight).toFixed(1);
    h += '<div class="weight-display"><span class="current-weight">'+latest.weight+' kg</span><span class="weight-change '+(parseFloat(change)<=0?'positive':'negative')+'">'+(change>0?'+':'')+change+' kg</span></div><p>Total: '+(total>0?'+':'')+total+' kg from '+settings.profile.startingWeight+' kg</p>';
  } else { h += '<p>No weights logged yet</p>'; }
  h += '<button class="btn btn-primary" data-action="log-weight">+ Log Weight</button></div>';
  
  h += '<div class="card achievements-card"><h2>🏆 Achievements</h2><div class="achievements-grid">';
  ACHIEVEMENTS.forEach(a => {
    const unlocked = progress.achievements.includes(a.id);
    const current = a.type==='streak' ? progress.streaks[a.streakType].current : Object.keys(Store.getLogs()).length;
    h += '<div class="achievement '+(unlocked?'unlocked':'locked')+'"><span class="ach-icon">'+a.icon+'</span><span class="ach-name">'+a.name+'</span>';
    if(!unlocked) h += '<div class="ach-progress"><div class="ach-bar" style="width:'+Math.min((current/a.target)*100,100)+'%"></div></div><span class="ach-count">'+current+'/'+a.target+'</span>';
    h += '</div>';
  });
  h += '</div></div>';
  
  h += '<div class="card streaks-card"><h2>🔥 Streaks</h2><div class="streak-stats">';
  h += '<div class="streak-stat"><span class="label">Protein Goal</span><span class="value">'+progress.streaks.protein.current+' days</span><span class="best">Best: '+progress.streaks.protein.longest+'</span></div>';
  h += '<div class="streak-stat"><span class="label">Calorie Target</span><span class="value">'+progress.streaks.calories.current+' days</span><span class="best">Best: '+progress.streaks.calories.longest+'</span></div>';
  h += '<div class="streak-stat"><span class="label">Logging</span><span class="value">'+progress.streaks.logging.current+' days</span><span class="best">Best: '+progress.streaks.logging.longest+'</span></div>';
  h += '</div></div>';
  
  const xpNeeded = xpForLevel(progress.level);
  h += '<div class="card xp-card"><h2>⭐ Level '+progress.level+'</h2><div class="xp-bar"><div class="xp-fill" style="width:'+(progress.xp/xpNeeded)*100+'%"></div></div><p>'+progress.xp+' / '+xpNeeded+' XP to level '+(progress.level+1)+'</p></div></div>';
  return h;
};

const renderSettings = () => {
  const s = Store.getSettings();
  let h = '<div class="settings-tab">';
  h += '<div class="card"><h2>👤 Profile</h2><div class="form-group"><label>Name</label><input type="text" id="set-name" value="'+(s.profile.name||'')+'"></div><div class="form-group"><label>Starting Weight (kg)</label><input type="number" id="set-sw" value="'+s.profile.startingWeight+'" step="0.1"></div><div class="form-group"><label>Target Weight (kg)</label><input type="number" id="set-tw" value="'+s.profile.targetWeight+'" step="0.1"></div></div>';
  h += '<div class="card"><h2>🎯 Daily Targets</h2><div class="form-group"><label>Calories</label><input type="number" id="set-cal" value="'+s.targets.calories+'"></div><div class="form-group"><label>Protein (g)</label><input type="number" id="set-pro" value="'+s.targets.protein+'"></div><div class="form-group"><label>Carbs (g)</label><input type="number" id="set-carb" value="'+s.targets.carbs+'"></div><div class="form-group"><label>Fats (g)</label><input type="number" id="set-fat" value="'+s.targets.fats+'"></div></div>';
  h += '<div class="card"><h2>🍺 Alcohol</h2><div class="form-group"><label>Calories per drink</label><input type="number" id="set-drinkcal" value="'+s.alcohol.defaultCalories+'"></div><div class="form-group"><label>Weekly can target</label><input type="number" id="set-cans" value="'+s.alcohol.weeklyCanTarget+'"></div></div>';
  h += '<div class="card"><h2>💾 Data</h2><button class="btn" data-action="export-data">📤 Export</button><button class="btn" data-action="import-data">📥 Import</button><input type="file" id="import-file" accept=".json" style="display:none"><button class="btn btn-danger" data-action="clear-data">🗑️ Clear All</button></div>';
  h += '<button class="btn btn-primary save-settings" data-action="save-settings">Save Settings</button></div>';
  return h;
};

// ==================== MODALS ====================
const renderModal = () => {
  let c = '';
  if (state.modal === 'log-meal') c = renderLogMealModal();
  else if (state.modal === 'confirm-portion') c = renderConfirmModal();
  else if (state.modal === 'add-custom-meal') c = renderCustomMealModal();
  else if (state.modal === 'edit-meal') c = renderEditMealModal();
  else if (state.modal === 'log-weight') c = renderLogWeightModal();
  else if (state.modal === 'generate-list') c = renderGenerateListModal();
  else if (state.modal === 'achievement') c = renderAchievementModal();
  return '<div class="modal-overlay" data-action="close-modal"><div class="modal" onclick="event.stopPropagation()">'+c+'</div></div>';
};

const renderLogMealModal = () => {
  const meals = getAllMeals();
  const p = state.modalData?.period || getMealPeriod();
  let h = '<div class="modal-content"><h2>Log '+p+'</h2><div class="modal-meal-list">';
  h += '<div class="modal-meal-item custom-option" data-action="add-custom-meal-for-period" data-period="'+p+'"><span class="meal-name">➕ Add Custom Meal</span><span class="meal-cals">Enter your own</span></div>';
  meals.forEach(m => { h += '<div class="modal-meal-item" data-action="select-meal" data-meal-id="'+m.id+'" data-period="'+p+'"><span class="meal-name">'+m.name+'</span><span class="meal-cals">'+m.calories+' kcal</span></div>'; });
  h += '</div><button class="btn" data-action="close-modal">Cancel</button></div>';
  return h;
};

const renderConfirmModal = () => {
  const m = state.modalData?.meal;
  const p = state.modalData?.period || getMealPeriod();
  if (!m) return '';
  let h = '<div class="modal-content"><h2>Log '+m.name+'</h2><p>'+m.calories+' kcal | P:'+m.protein+'g | C:'+m.carbs+'g | F:'+m.fats+'g</p>';
  h += '<div class="form-group"><label>Portion</label><select id="portion-size"><option value="0.5">Half (0.5x)</option><option value="1" selected>Full (1x)</option><option value="1.5">Large (1.5x)</option><option value="2">Double (2x)</option></select></div>';
  h += '<div class="form-group"><label>Meal</label><select id="meal-period">';
  ['breakfast','lunch','dinner','snacks'].forEach(x => { h += '<option value="'+x+'"'+(x===p?' selected':'')+'>'+x+'</option>'; });
  h += '</select></div><div class="modal-actions"><button class="btn" data-action="close-modal">Cancel</button><button class="btn btn-primary" data-action="confirm-log">Log Meal</button></div></div>';
  return h;
};

const renderCustomMealModal = () => {
  const p = state.modalData?.period || 'lunch';
  let h = '<div class="modal-content"><h2>Add Custom Meal</h2>';
  h += '<div class="form-group"><label>Name</label><input type="text" id="custom-name" placeholder="Meal name"></div>';
  h += '<div class="form-group"><label>Category</label><select id="custom-cat">';
  ['breakfast','lunch','dinner','snacks'].forEach(x => { h += '<option value="'+x+'"'+(x===p?' selected':'')+'>'+x+'</option>'; });
  h += '</select></div>';
  h += '<div class="form-group"><label>Calories</label><input type="number" id="custom-cal" placeholder="0"></div>';
  h += '<div class="form-group"><label>Protein (g)</label><input type="number" id="custom-pro" placeholder="0"></div>';
  h += '<div class="form-group"><label>Carbs (g)</label><input type="number" id="custom-carb" placeholder="0"></div>';
  h += '<div class="form-group"><label>Fats (g)</label><input type="number" id="custom-fat" placeholder="0"></div>';
  h += '<div class="form-group"><label><input type="checkbox" id="custom-save" checked> Save to meal library</label></div>';
  h += '<div class="modal-actions"><button class="btn" data-action="close-modal">Cancel</button><button class="btn btn-primary" data-action="save-custom-meal">Save & Log</button></div></div>';
  return h;
};

const renderEditMealModal = () => {
  const m = state.modalData?.meal;
  if (!m) return '';
  let h = '<div class="modal-content"><h2>Edit '+m.name+'</h2><p class="edit-note">Changes saved for future use</p>';
  h += '<div class="form-group"><label>Calories</label><input type="number" id="edit-cal" value="'+m.calories+'"></div>';
  h += '<div class="form-group"><label>Protein (g)</label><input type="number" id="edit-pro" value="'+m.protein+'"></div>';
  h += '<div class="form-group"><label>Carbs (g)</label><input type="number" id="edit-carb" value="'+m.carbs+'"></div>';
  h += '<div class="form-group"><label>Fats (g)</label><input type="number" id="edit-fat" value="'+m.fats+'"></div>';
  h += '<div class="modal-actions"><button class="btn" data-action="close-modal">Cancel</button>';
  if (m.isCustom) h += '<button class="btn btn-danger" data-action="delete-custom-meal" data-meal-id="'+m.id+'">Delete</button>';
  h += '<button class="btn btn-primary" data-action="save-meal-edits" data-meal-id="'+m.id+'">Save</button></div></div>';
  return h;
};

const renderLogWeightModal = () => {
  return '<div class="modal-content"><h2>Log Weight</h2><div class="form-group"><label>Weight (kg)</label><input type="number" id="weight-val" step="0.1" placeholder="80.0"></div><div class="form-group"><label>Date</label><input type="date" id="weight-date" value="'+today()+'"></div><div class="modal-actions"><button class="btn" data-action="close-modal">Cancel</button><button class="btn btn-primary" data-action="save-weight">Save</button></div></div>';
};

const renderGenerateListModal = () => {
  const meals = getAllMeals();
  const days = state.shoppingDays || 3;
  let h = '<div class="modal-content generate-list-modal"><h2>Plan Your Meals</h2><p>Select meals for '+days+' day'+(days>1?'s':'')+' (leave blank to skip):</p>';
  for (let i = 0; i < days; i++) {
    const d = new Date(); d.setDate(d.getDate() + i);
    const dayName = d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric' });
    h += '<div class="plan-day"><h3>'+dayName+'</h3>';
    ['breakfast','lunch','dinner'].forEach(p => {
      h += '<div class="plan-meal"><label>'+p+'</label><select data-day="'+i+'" data-period="'+p+'"><option value="">-- Skip --</option>';
      meals.forEach(m => { h += '<option value="'+m.id+'">'+m.name+'</option>'; });
      h += '</select></div>';
    });
    h += '</div>';
  }
  h += '<div class="modal-actions"><button class="btn" data-action="close-modal">Cancel</button><button class="btn btn-primary" data-action="create-shopping-list">Generate</button></div></div>';
  return h;
};

const renderAchievementModal = () => {
  const a = state.modalData;
  if (!a) return '';
  return '<div class="modal-content achievement-modal"><div class="ach-unlock-icon">'+a.icon+'</div><h2>Achievement Unlocked!</h2><h3>'+a.name+'</h3><p>'+a.desc+'</p><p class="xp-reward">+'+a.xp+' XP</p><button class="btn btn-primary" data-action="close-modal">Awesome!</button></div>';
};

// ==================== EVENT HANDLING ====================
const attachEvents = () => {
  document.getElementById('app').onclick = e => {
    const el = e.target.closest('[data-action],[data-tab],[data-filter],[data-period]');
    if (!el) { if (e.target.classList.contains('modal-overlay')) { state.modal = null; state.modalData = null; render(); } return; }
    if (el.dataset.tab) { state.tab = el.dataset.tab; render(); return; }
    if (el.dataset.filter) { state.selectedMealCategory = el.dataset.filter; render(); return; }
    if (el.dataset.period && el.classList.contains('meal-tab')) { state.activePeriod = el.dataset.period; render(); return; }
    if (el.dataset.action) handleAction(el.dataset.action, el.dataset);
  };
  const search = document.getElementById('meal-search');
  if (search) search.oninput = e => { const q = e.target.value.toLowerCase(); document.querySelectorAll('.meal-card').forEach(c => { c.style.display = c.querySelector('h3').textContent.toLowerCase().includes(q) ? '' : 'none'; }); };
  const file = document.getElementById('import-file');
  if (file) file.onchange = e => { if(e.target.files[0]) importData(e.target.files[0]); };
  const shopDays = document.getElementById('shopping-days');
  if (shopDays) shopDays.onchange = e => { state.shoppingDays = parseInt(e.target.value); };
};

const handleAction = (action, data) => {
  switch(action) {
    case 'close-modal': state.modal = null; state.modalData = null; break;
    case 'log-meal': state.modal = 'log-meal'; state.modalData = { period: state.activePeriod }; break;
    case 'quick-log': case 'select-meal':
      const meal = getAllMeals().find(m => m.id === data.mealId);
      if (meal) { state.modal = 'confirm-portion'; state.modalData = { meal, period: data.period || state.activePeriod }; }
      break;
    case 'confirm-log': logMeal(); break;
    case 'delete-meal': deleteMeal(data.period, parseInt(data.index)); break;
    case 'add-custom-meal': state.modal = 'add-custom-meal'; state.modalData = { period: state.activePeriod }; break;
    case 'add-custom-meal-for-period': state.modal = 'add-custom-meal'; state.modalData = { period: data.period }; break;
    case 'save-custom-meal': saveCustomMeal(); break;
    case 'edit-meal': const em = getAllMeals().find(m => m.id === data.mealId); if(em){ state.modal = 'edit-meal'; state.modalData = { meal: em }; } break;
    case 'save-meal-edits': saveMealEdits(data.mealId); break;
    case 'delete-custom-meal': deleteCustomMeal(data.mealId); break;
    case 'log-weight': state.modal = 'log-weight'; break;
    case 'save-weight': saveWeight(); break;
    case 'add-drink': addDrink(); break;
    case 'generate-list': state.modal = 'generate-list'; break;
    case 'create-shopping-list': createShoppingList(); break;
    case 'toggle-item': toggleShoppingItem(data.cat, parseInt(data.idx)); break;
    case 'clear-list': Store.saveShoppingList(null); break;
    case 'save-settings': saveSettings(); break;
    case 'export-data': exportData(); return;
    case 'import-data': document.getElementById('import-file').click(); return;
    case 'clear-data': if(confirm('Clear all data?')){ localStorage.clear(); location.reload(); } return;
  }
  render();
};

// ==================== DATA OPERATIONS ====================
const logMeal = () => {
  const m = state.modalData?.meal; if(!m) return;
  const portion = parseFloat(document.getElementById('portion-size').value);
  const period = document.getElementById('meal-period').value;
  const log = Store.getLog(today());
  log.meals[period].push({ mealId: m.id, mealName: m.name, portion, calories: Math.round(m.calories*portion), protein: Math.round(m.protein*portion), carbs: Math.round(m.carbs*portion), fats: Math.round(m.fats*portion) });
  log.totals = calcTotals(log);
  Store.saveLog(today(), log);
  checkAchievements(log);
  state.modal = null; state.modalData = null;
};

const deleteMeal = (period, index) => {
  const log = Store.getLog(today());
  log.meals[period].splice(index, 1);
  log.totals = calcTotals(log);
  Store.saveLog(today(), log);
};

const saveCustomMeal = () => {
  const name = document.getElementById('custom-name').value.trim();
  if (!name) { alert('Enter a meal name'); return; }
  const meal = { id: 'custom-'+uid(), name, category: document.getElementById('custom-cat').value, calories: parseInt(document.getElementById('custom-cal').value)||0, protein: parseInt(document.getElementById('custom-pro').value)||0, carbs: parseInt(document.getElementById('custom-carb').value)||0, fats: parseInt(document.getElementById('custom-fat').value)||0, tags: ['custom'], ingredients: [], isCustom: true };
  if (document.getElementById('custom-save').checked) { const meals = Store.getCustomMeals(); meals.push(meal); Store.saveCustomMeals(meals); }
  const period = state.modalData?.period || meal.category;
  const log = Store.getLog(today());
  log.meals[period].push({ mealId: meal.id, mealName: meal.name, portion: 1, calories: meal.calories, protein: meal.protein, carbs: meal.carbs, fats: meal.fats });
  log.totals = calcTotals(log);
  Store.saveLog(today(), log);
  checkAchievements(log);
  state.modal = null; state.modalData = null;
};

const saveMealEdits = (mealId) => {
  const edits = Store.getMealEdits();
  edits[mealId] = { calories: parseInt(document.getElementById('edit-cal').value)||0, protein: parseInt(document.getElementById('edit-pro').value)||0, carbs: parseInt(document.getElementById('edit-carb').value)||0, fats: parseInt(document.getElementById('edit-fat').value)||0 };
  Store.saveMealEdits(edits);
  const customs = Store.getCustomMeals();
  const idx = customs.findIndex(m => m.id === mealId);
  if (idx >= 0) { customs[idx] = { ...customs[idx], ...edits[mealId] }; Store.saveCustomMeals(customs); }
  state.modal = null; state.modalData = null;
};

const deleteCustomMeal = (mealId) => {
  if (!confirm('Delete this meal?')) return;
  Store.saveCustomMeals(Store.getCustomMeals().filter(m => m.id !== mealId));
  state.modal = null; state.modalData = null;
};

const saveWeight = () => {
  const weight = parseFloat(document.getElementById('weight-val').value);
  const date = document.getElementById('weight-date').value;
  if (!weight) { alert('Enter a weight'); return; }
  const weights = Store.getWeights();
  const idx = weights.findIndex(w => w.date === date);
  if (idx >= 0) weights[idx] = { date, weight }; else weights.push({ date, weight });
  weights.sort((a,b) => a.date.localeCompare(b.date));
  Store.saveWeights(weights);
  addXP(50);
  state.modal = null;
};

const addDrink = () => {
  const s = Store.getSettings();
  const log = Store.getLog(today());
  if (!log.alcohol) log.alcohol = { cans: 0, totalCalories: 0 };
  log.alcohol.cans++;
  log.alcohol.totalCalories = log.alcohol.cans * s.alcohol.defaultCalories;
  log.totals = calcTotals(log);
  Store.saveLog(today(), log);
};

const toggleShoppingItem = (cat, idx) => {
  const list = Store.getShoppingList();
  if (!list || !list.items) return;
  const items = list.items.filter(i => i && i.category === cat);
  if (items[idx]) { items[idx].checked = !items[idx].checked; Store.saveShoppingList(list); }
};

const createShoppingList = () => {
  const meals = getAllMeals();
  const selects = document.querySelectorAll('.generate-list-modal select');
  const items = {};
  selects.forEach(sel => {
    if (!sel.value) return;
    const meal = meals.find(m => m.id === sel.value);
    if (meal && meal.ingredients) {
      meal.ingredients.forEach(ing => {
        if (!ing || !ing.item) return;
        const key = ing.item.toLowerCase();
        if (!items[key]) items[key] = { item: ing.item, quantity: 0, category: ing.cat || 'other', checked: false };
        items[key].quantity += ing.qty || 1;
      });
    }
  });
  Store.saveShoppingList({ dateGenerated: new Date().toISOString(), days: state.shoppingDays, items: Object.values(items) });
  state.modal = null;
};

const saveSettings = () => {
  const s = Store.getSettings();
  s.profile.name = document.getElementById('set-name').value;
  s.profile.startingWeight = parseFloat(document.getElementById('set-sw').value) || 80;
  s.profile.targetWeight = parseFloat(document.getElementById('set-tw').value) || 78;
  s.targets.calories = parseInt(document.getElementById('set-cal').value) || 2500;
  s.targets.protein = parseInt(document.getElementById('set-pro').value) || 180;
  s.targets.carbs = parseInt(document.getElementById('set-carb').value) || 280;
  s.targets.fats = parseInt(document.getElementById('set-fat').value) || 75;
  s.alcohol.defaultCalories = parseInt(document.getElementById('set-drinkcal').value) || 170;
  s.alcohol.weeklyCanTarget = parseInt(document.getElementById('set-cans').value) || 4;
  Store.saveSettings(s);
  alert('Settings saved!');
};

const exportData = () => {
  const data = { settings: Store.getSettings(), dailyLogs: Store.getLogs(), weights: Store.getWeights(), progress: Store.getProgress(), customMeals: Store.getCustomMeals(), mealEdits: Store.getMealEdits(), shoppingList: Store.getShoppingList() };
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([JSON.stringify(data,null,2)], {type:'application/json'}));
  a.download = 'mealprep-backup-'+today()+'.json';
  a.click();
};

const importData = file => {
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const d = JSON.parse(e.target.result);
      if(d.settings) Store.saveSettings(d.settings);
      if(d.dailyLogs) Store.saveLogs(d.dailyLogs);
      if(d.weights) Store.saveWeights(d.weights);
      if(d.progress) Store.saveProgress(d.progress);
      if(d.customMeals) Store.saveCustomMeals(d.customMeals);
      if(d.mealEdits) Store.saveMealEdits(d.mealEdits);
      if(d.shoppingList) Store.saveShoppingList(d.shoppingList);
      alert('Data imported!'); render();
    } catch(err) { alert('Error: '+err.message); }
  };
  reader.readAsText(file);
};

// ==================== ACHIEVEMENTS ====================
const checkAchievements = log => {
  const progress = Store.getProgress();
  const targets = Store.getSettings().targets;
  if (log.totals.protein >= targets.protein) { progress.streaks.protein.current++; progress.streaks.protein.longest = Math.max(progress.streaks.protein.longest, progress.streaks.protein.current); }
  if (log.totals.calories >= targets.calories-100 && log.totals.calories <= targets.calories+100) { progress.streaks.calories.current++; progress.streaks.calories.longest = Math.max(progress.streaks.calories.longest, progress.streaks.calories.current); }
  progress.streaks.logging.current++; progress.streaks.logging.longest = Math.max(progress.streaks.logging.longest, progress.streaks.logging.current);
  const totalDays = Object.keys(Store.getLogs()).length;
  ACHIEVEMENTS.forEach(a => {
    if (progress.achievements.includes(a.id)) return;
    let achieved = a.type==='streak' ? progress.streaks[a.streakType].current >= a.target : totalDays >= a.target;
    if (achieved) { progress.achievements.push(a.id); addXP(a.xp); state.modal = 'achievement'; state.modalData = a; }
  });
  addXP(10);
  Store.saveProgress(progress);
};

const addXP = amt => {
  const p = Store.getProgress();
  p.xp += amt;
  while (p.xp >= xpForLevel(p.level)) { p.xp -= xpForLevel(p.level); p.level++; }
  Store.saveProgress(p);
};

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(()=>{});
  render();
});
