// FabricMod Visual Builder - Main Application

let workspace;
let generator;
let currentTab = 'main';
let isNoCheatMode = false;
let codeMode = 'auto';
let manualCodeStore = {};
let toolboxSearchText = '';
let extraResourceStore = {};
let itemAssistState = null;

const VANILLA_ITEM_SUGGESTIONS = [
  'minecraft:diamond', 'minecraft:diamond_sword', 'minecraft:diamond_pickaxe', 'minecraft:diamond_helmet',
  'minecraft:iron_ingot', 'minecraft:gold_ingot', 'minecraft:netherite_ingot', 'minecraft:emerald',
  'minecraft:redstone', 'minecraft:lapis_lazuli', 'minecraft:coal', 'minecraft:stick',
  'minecraft:apple', 'minecraft:bread', 'minecraft:golden_apple', 'minecraft:bow',
  'minecraft:crossbow', 'minecraft:trident', 'minecraft:fishing_rod', 'minecraft:shield',
  'minecraft:book', 'minecraft:enchanted_book', 'minecraft:experience_bottle', 'minecraft:totem_of_undying',
  'minecraft:stone', 'minecraft:cobblestone', 'minecraft:oak_log', 'minecraft:oak_planks',
  'minecraft:glass', 'minecraft:chest', 'minecraft:barrel', 'minecraft:furnace',
  'minecraft:crafting_table', 'minecraft:anvil', 'minecraft:hopper', 'minecraft:observer',
  'minecraft:water_bucket', 'minecraft:lava_bucket', 'minecraft:elytra', 'minecraft:ender_pearl',
  'minecraft:mending', 'minecraft:unbreaking', 'minecraft:efficiency', 'minecraft:fortune',
  'minecraft:sharpness', 'minecraft:protection', 'minecraft:looting', 'minecraft:silk_touch'
];

const BLOCK_SEARCH_KEYWORDS = {
  register_item: ['item', 'items', 'material', 'loot', 'アイテム', '素材'],
  item_food: ['food', 'foods', 'eat', 'eating', '食べ物', '料理'],
  item_tool: ['tool', 'tools', 'weapon', 'weapons', 'sword', 'pickaxe', 'axe', 'ツール', '武器'],
  register_armor_set: ['armor', 'armour', 'helmet', 'chestplate', 'leggings', 'boots', '防具'],
  register_block: ['block', 'blocks', 'building', 'ブロック'],
  register_ore_block: ['ore', 'ores', 'mining', '鉱石'],
  register_crop: ['crop', 'farm', 'farming', 'seed', 'harvest', '農業', '作物'],
  register_command: ['command', 'commands', 'コマンド'],
  register_command_with_arg: ['command', 'argument', 'コマンド', '引数'],
  register_gui_screen: ['gui', 'screen', 'menu', 'client', '画面'],
  register_keybind: ['keybind', 'keyboard', 'client', 'キー'],
  register_hud: ['hud', 'overlay', 'client', '表示'],
  register_custom_entity: ['entity', 'mob', 'mobs', 'モブ'],
  register_spawn_egg: ['entity', 'spawn', 'egg', 'スポーン'],
  register_enchantment: ['enchant', 'enchantment', 'ench', 'book', 'エンチャント'],
  register_status_effect: ['effect', 'status', 'potion', '効果'],
  register_throwable: ['throwable', 'projectile', '投擲'],
  register_fluid: ['fluid', 'liquid', 'bucket', '液体'],
  register_dimension: ['dimension', 'world', 'portal', 'ディメンション'],
  register_config: ['config', 'setting', 'settings', '設定']
};

const CHEAT_BLOCKS = new Set([
  'action_teleport', 'action_set_gamemode', 'action_execute_command',
  'action_explosion', 'action_heal', 'action_feed', 'action_xp',
  'action_clear_effects', 'action_set_block',
  'register_command', 'register_command_with_arg',
  'command_reply', 'command_get_arg_int', 'command_get_arg_string',
  'action_spawn_entity', 'action_set_weather', 'action_set_time',
  'action_lightning', 'action_modify_attribute', 'action_clear_inventory',
  'action_fill_blocks', 'action_damage_player', 'action_set_fire'
]);

const TOOLBOX_CATEGORIES = [
  { name: 'MOD設定', colour: 270, blocks: ['mod_init'] },
  { name: 'アイテム', colour: 210, blocks: ['register_item', 'item_food', 'item_tool', 'register_armor_set', 'register_item_animated', 'item_tooltip'] },
  { name: 'ブロック', colour: 120, blocks: ['register_block', 'register_ore_block', 'register_stair_block', 'register_slab_block', 'register_fence_block', 'register_door_block', 'register_crop', 'register_falling_block', 'register_tnt_block', 'register_light_block', 'register_redstone_block', 'register_container_block', 'register_ore_gen'] },
  { name: 'レシピ・素材', colour: 60, blocks: ['recipe_shaped', 'recipe_key', 'recipe_shapeless', 'recipe_ingredient', 'recipe_smelting', 'recipe_smithing', 'recipe_stonecutting', 'register_fuel', 'register_compostable', 'register_flammable'] },
  { name: 'イベント', colour: 30, blocks: ['on_item_use', 'on_block_break', 'on_block_place', 'on_block_interact', 'on_player_join', 'on_player_death', 'on_player_respawn', 'on_player_damage', 'on_player_attack', 'on_entity_death', 'on_server_tick', 'on_item_pickup', 'on_item_craft', 'on_chat_message', 'on_dimension_change', 'on_sleep'] },
  { name: 'アクション', colour: 0, blocks: ['action_give_item', 'action_send_message', 'action_send_message_dynamic', 'action_play_sound', 'action_spawn_particle', 'action_teleport', 'action_apply_effect', 'action_execute_command', 'action_set_block', 'action_explosion', 'action_spawn_entity', 'action_cooldown', 'action_drop_item', 'action_damage_item', 'action_announce', 'action_set_weather', 'action_set_time', 'action_scoreboard_add', 'action_nearby_players', 'action_random_pick', 'action_launch', 'action_set_velocity', 'action_lightning', 'action_firework', 'action_set_fire', 'action_extinguish', 'action_freeze', 'action_damage_player', 'action_modify_attribute', 'action_clear_inventory', 'action_set_slot', 'action_consume_item', 'action_fill_blocks', 'action_spawn_armor_stand', 'action_no_fall_damage', 'action_set_saturation', 'action_for_all_players', 'action_schedule'] },
  { name: 'コマンド', colour: 160, blocks: ['register_command', 'register_command_with_arg', 'command_reply', 'command_get_arg_int', 'command_get_arg_string', 'action_broadcast', 'action_title', 'action_actionbar', 'action_send_actionbar_dynamic', 'action_send_title_dynamic', 'action_tablist', 'action_bossbar_show', 'action_bossbar_hide', 'action_particle_circle', 'action_particle_line'] },
  { name: '追加システム', colour: 45, blocks: ['register_creative_tab', 'register_advancement', 'action_grant_advancement', 'register_villager_trade', 'register_mob_drop', 'register_keybind', 'register_hud', 'register_painting', 'register_banner_pattern', 'register_sound', 'action_play_custom_sound'] },
  { name: 'カスタムGUI', colour: 315, blocks: ['register_gui_screen', 'action_open_gui', 'gui_label', 'gui_label_centered', 'gui_button', 'gui_toggle', 'gui_slider', 'gui_text_field', 'gui_dropdown', 'gui_checkbox', 'gui_tab_panel', 'gui_rect', 'gui_separator', 'gui_item_display', 'gui_progress_bar', 'gui_image', 'gui_action_close', 'gui_action_send_command', 'gui_action_send_chat', 'gui_action_play_sound', 'gui_action_set_var', 'gui_action_open_screen'] },
  { name: 'カスタムモブ', colour: 20, blocks: ['register_custom_entity', 'register_spawn_egg', 'ai_wander', 'ai_attack_melee', 'ai_attack_ranged', 'ai_follow_player', 'ai_flee_player', 'ai_look_at_player', 'ai_swim', 'ai_explode', 'ai_teleport_random'] },
  { name: 'エンチャント・効果', colour: 280, blocks: ['register_enchantment', 'register_status_effect', 'register_throwable'] },
  { name: '高度な素材', colour: 280, blocks: ['register_fluid', 'register_dimension', 'register_config', 'config_int', 'config_bool', 'config_double', 'config_string', 'get_config_value'] },
  { name: '条件・ループ', colour: 190, blocks: ['condition_if', 'condition_if_else', 'check_sneaking', 'check_holding_item', 'check_dimension', 'check_time', 'check_health', 'logic_and', 'logic_or', 'logic_not', 'random_chance', 'check_in_area', 'check_biome', 'check_weather', 'check_has_permission', 'check_on_ground', 'check_in_water', 'check_in_lava', 'check_is_flying', 'check_is_sprinting', 'check_is_swimming', 'check_has_effect', 'check_item_count', 'check_armor_wearing', 'loop_repeat', 'action_delay'] },
  { name: '変数', colour: 330, blocks: ['var_declare_number', 'var_declare_string', 'var_declare_bool', 'var_set_number', 'var_set_string', 'var_set_bool', 'var_set_from_value', 'var_set_number_from_value', 'var_add', 'var_get_number', 'var_get_string', 'var_get_bool', 'var_compare', 'var_string_equals'] },
  { name: 'プレイヤー情報', colour: 45, blocks: ['get_player_name', 'get_player_health', 'get_player_max_health', 'get_player_hunger', 'get_player_level', 'get_player_xp', 'get_player_pos', 'get_player_gamemode'] },
  { name: 'アイテム情報', colour: 210, blocks: ['get_held_item_name', 'get_held_item_id', 'get_held_item_count', 'get_held_item_durability', 'get_offhand_item_name'] },
  { name: 'ワールド情報', colour: 120, blocks: ['get_world_time', 'get_day_count', 'get_weather', 'get_biome', 'get_dimension_name', 'get_light_level', 'get_block_at_pos', 'get_online_count', 'get_kill_count', 'get_entity_count', 'get_chat_message'] },
  { name: '数値・文字列', colour: 230, blocks: ['number_value', 'text_value', 'mc_text_join', 'number_to_text', 'math_operation', 'math_random'] },
  { name: '支援アクション', colour: 0, blocks: ['action_heal', 'action_feed', 'action_set_gamemode', 'action_xp', 'action_clear_effects'], cheatOnly: true }
];

const NORMALIZED_BLOCK_SEARCH_KEYWORDS = {
  register_item: ['item', 'items', 'material', 'loot', 'アイテム', '素材'],
  item_food: ['food', 'foods', 'eat', 'eating', '食べ物', '料理'],
  item_tool: ['tool', 'tools', 'weapon', 'weapons', 'sword', 'pickaxe', 'axe', 'ツール', '武器'],
  register_armor_set: ['armor', 'armour', 'helmet', 'chestplate', 'leggings', 'boots', '防具'],
  register_block: ['block', 'blocks', 'building', 'ブロック'],
  register_ore_block: ['ore', 'ores', 'mining', '鉱石'],
  register_crop: ['crop', 'farm', 'farming', 'seed', 'harvest', '農業', '作物'],
  register_command: ['command', 'commands', 'コマンド'],
  register_command_with_arg: ['command', 'argument', 'コマンド', '引数'],
  register_gui_screen: ['gui', 'screen', 'menu', 'client', '画面'],
  register_keybind: ['keybind', 'keyboard', 'client', 'キー'],
  register_hud: ['hud', 'overlay', 'client', '表示'],
  register_custom_entity: ['entity', 'mob', 'mobs', 'モブ'],
  register_spawn_egg: ['entity', 'spawn', 'egg', 'スポーン'],
  register_enchantment: ['enchant', 'enchantment', 'ench', 'book', 'エンチャント'],
  register_status_effect: ['effect', 'status', 'potion', '効果'],
  register_throwable: ['throwable', 'projectile', '投げる'],
  register_fluid: ['fluid', 'liquid', 'bucket', '液体'],
  register_dimension: ['dimension', 'world', 'portal', 'ディメンション'],
  register_config: ['config', 'setting', 'settings', '設定']
};

const NORMALIZED_TOOLBOX_CATEGORIES = [
  { name: 'MOD設定', colour: 270, blocks: ['mod_init'] },
  { name: 'アイテム', colour: 210, blocks: ['register_item', 'item_food', 'item_tool', 'register_armor_set', 'register_item_animated', 'item_tooltip'] },
  { name: 'ブロック', colour: 120, blocks: ['register_block', 'register_ore_block', 'register_stair_block', 'register_slab_block', 'register_fence_block', 'register_door_block', 'register_crop', 'register_falling_block', 'register_tnt_block', 'register_light_block', 'register_redstone_block', 'register_container_block', 'register_ore_gen'] },
  { name: 'レシピ・素材', colour: 60, blocks: ['recipe_shaped', 'recipe_key', 'recipe_shapeless', 'recipe_ingredient', 'recipe_smelting', 'recipe_smithing', 'recipe_stonecutting', 'register_fuel', 'register_compostable', 'register_flammable'] },
  { name: 'イベント', colour: 30, blocks: ['on_item_use', 'on_block_break', 'on_block_place', 'on_block_interact', 'on_player_join', 'on_player_death', 'on_player_respawn', 'on_player_damage', 'on_player_attack', 'on_entity_death', 'on_server_tick', 'on_item_pickup', 'on_item_craft', 'on_chat_message', 'on_dimension_change', 'on_sleep'] },
  { name: 'アクション', colour: 0, blocks: ['action_give_item', 'action_send_message', 'action_send_message_dynamic', 'action_play_sound', 'action_spawn_particle', 'action_teleport', 'action_apply_effect', 'action_execute_command', 'action_set_block', 'action_explosion', 'action_spawn_entity', 'action_cooldown', 'action_drop_item', 'action_damage_item', 'action_announce', 'action_set_weather', 'action_set_time', 'action_scoreboard_add', 'action_nearby_players', 'action_random_pick', 'action_launch', 'action_set_velocity', 'action_lightning', 'action_firework', 'action_set_fire', 'action_extinguish', 'action_freeze', 'action_damage_player', 'action_modify_attribute', 'action_clear_inventory', 'action_set_slot', 'action_consume_item', 'action_fill_blocks', 'action_spawn_armor_stand', 'action_no_fall_damage', 'action_set_saturation', 'action_for_all_players', 'action_schedule'] },
  { name: 'コマンド', colour: 160, blocks: ['register_command', 'register_command_with_arg', 'command_reply', 'command_get_arg_int', 'command_get_arg_string', 'action_broadcast', 'action_title', 'action_actionbar', 'action_send_actionbar_dynamic', 'action_send_title_dynamic', 'action_tablist', 'action_bossbar_show', 'action_bossbar_hide', 'action_particle_circle', 'action_particle_line'] },
  { name: '追加システム', colour: 45, blocks: ['register_creative_tab', 'register_advancement', 'action_grant_advancement', 'register_villager_trade', 'register_mob_drop', 'register_keybind', 'register_hud', 'register_painting', 'register_banner_pattern', 'register_sound', 'action_play_custom_sound'] },
  { name: 'カスタムGUI', colour: 315, blocks: ['register_gui_screen', 'action_open_gui', 'gui_label', 'gui_label_centered', 'gui_button', 'gui_toggle', 'gui_slider', 'gui_text_field', 'gui_dropdown', 'gui_checkbox', 'gui_tab_panel', 'gui_rect', 'gui_separator', 'gui_item_display', 'gui_progress_bar', 'gui_image', 'gui_action_close', 'gui_action_send_command', 'gui_action_send_chat', 'gui_action_play_sound', 'gui_action_set_var', 'gui_action_open_screen'] },
  { name: 'カスタムモブ', colour: 20, blocks: ['register_custom_entity', 'register_spawn_egg', 'ai_wander', 'ai_attack_melee', 'ai_attack_ranged', 'ai_follow_player', 'ai_flee_player', 'ai_look_at_player', 'ai_swim', 'ai_explode', 'ai_teleport_random'] },
  { name: 'エンチャント・効果', colour: 280, blocks: ['register_enchantment', 'register_status_effect', 'register_throwable'] },
  { name: '高度な素材', colour: 280, blocks: ['register_fluid', 'register_dimension', 'register_config', 'config_int', 'config_bool', 'config_double', 'config_string', 'get_config_value'] },
  { name: '条件・ループ', colour: 190, blocks: ['condition_if', 'condition_if_else', 'check_sneaking', 'check_holding_item', 'check_dimension', 'check_time', 'check_health', 'logic_and', 'logic_or', 'logic_not', 'random_chance', 'check_in_area', 'check_biome', 'check_weather', 'check_has_permission', 'check_on_ground', 'check_in_water', 'check_in_lava', 'check_is_flying', 'check_is_sprinting', 'check_is_swimming', 'check_has_effect', 'check_item_count', 'check_armor_wearing', 'loop_repeat', 'action_delay'] },
  { name: '変数', colour: 330, blocks: ['var_declare_number', 'var_declare_string', 'var_declare_bool', 'var_set_number', 'var_set_string', 'var_set_bool', 'var_set_from_value', 'var_set_number_from_value', 'var_add', 'var_get_number', 'var_get_string', 'var_get_bool', 'var_compare', 'var_string_equals'] },
  { name: 'プレイヤー情報', colour: 45, blocks: ['get_player_name', 'get_player_health', 'get_player_max_health', 'get_player_hunger', 'get_player_level', 'get_player_xp', 'get_player_pos', 'get_player_gamemode'] },
  { name: 'アイテム情報', colour: 210, blocks: ['get_held_item_name', 'get_held_item_id', 'get_held_item_count', 'get_held_item_durability', 'get_offhand_item_name'] },
  { name: 'ワールド情報', colour: 120, blocks: ['get_world_time', 'get_day_count', 'get_weather', 'get_biome', 'get_dimension_name', 'get_light_level', 'get_block_at_pos', 'get_online_count', 'get_kill_count', 'get_entity_count', 'get_chat_message'] },
  { name: '数値・文字', colour: 230, blocks: ['number_value', 'text_value', 'mc_text_join', 'number_to_text', 'math_operation', 'math_random'] },
  { name: '制限付きアクション', colour: 0, blocks: ['action_heal', 'action_feed', 'action_set_gamemode', 'action_xp', 'action_clear_effects'], cheatOnly: true }
];

function buildToolbox(noCheat) {
  const query = toolboxSearchText.trim().toLowerCase();
  const contents = NORMALIZED_TOOLBOX_CATEGORIES
    .filter((category) => !(noCheat && category.cheatOnly))
    .map((category) => {
      const blocks = category.blocks
        .filter((type) => !(noCheat && CHEAT_BLOCKS.has(type)))
        .filter((type) => !query || blockMatchesSearch(type, query))
        .map((type) => ({ kind: 'block', type }));
      return { kind: 'category', name: category.name, colour: category.colour, contents: blocks };
    })
    .filter((category) => category.contents.length > 0);

  return { kind: 'categoryToolbox', contents };
}

function blockMatchesSearch(type, query) {
  if (type.toLowerCase().includes(query)) return true;
  const aliases = NORMALIZED_BLOCK_SEARCH_KEYWORDS[type] || BLOCK_SEARCH_KEYWORDS[type] || [];
  return aliases.some((alias) => alias.toLowerCase().includes(query));
}

document.addEventListener('DOMContentLoaded', () => {
  syncAppVersion();
  initBlockly();
  initUI();
  generator = new FabricJavaGenerator();
});

async function syncAppVersion() {
  const versionEl = document.getElementById('app-version');
  if (!versionEl || !window.api || !window.api.getAppVersion) return;
  try {
    const version = await window.api.getAppVersion();
    if (version) versionEl.textContent = `v${version}`;
  } catch (error) {
    console.error('Failed to load app version:', error);
  }
}

function initBlockly() {
  workspace = Blockly.inject('blockly-div', {
    toolbox: buildToolbox(false),
    grid: { spacing: 25, length: 3, colour: '#2a3a5c', snap: true },
    zoom: { controls: true, wheel: true, startScale: 0.9, maxScale: 2, minScale: 0.3, scaleSpeed: 1.2 },
    move: { scrollbars: true, drag: true, wheel: true },
    trashcan: true,
    renderer: 'zelos',
    theme: createDarkTheme()
  });

  workspace.addChangeListener((event) => {
    if (
      event.type === Blockly.Events.BLOCK_CHANGE ||
      event.type === Blockly.Events.BLOCK_CREATE ||
      event.type === Blockly.Events.BLOCK_DELETE ||
      event.type === Blockly.Events.BLOCK_MOVE
    ) {
      updateCodePreview();
      updateBlockCount();
      checkNoCheatToggle();
      updateCompatibilityWarnings();
    }
  });

  window.addEventListener('resize', () => Blockly.svgResize(workspace));
  setTimeout(() => Blockly.svgResize(workspace), 100);
}

function createDarkTheme() {
  return Blockly.Theme.defineTheme('fabricDark', {
    name: 'fabricDark',
    base: Blockly.Themes.Classic,
    componentStyles: {
      workspaceBackgroundColour: '#1a1a2e',
      toolboxBackgroundColour: '#16213e',
      toolboxForegroundColour: '#eaeaea',
      flyoutBackgroundColour: '#1e2d4a',
      flyoutForegroundColour: '#eaeaea',
      flyoutOpacity: 0.95,
      scrollbarColour: '#2a3a5c',
      insertionMarkerColour: '#e94560',
      insertionMarkerOpacity: 0.6,
      scrollbarOpacity: 0.7,
      cursorColour: '#e94560'
    },
    fontStyle: {
      family: "'Segoe UI', 'Meiryo', sans-serif",
      weight: 'normal',
      size: 11
    }
  });
}

function initUI() {
  document.getElementById('btn-save').addEventListener('click', saveProject);
  document.getElementById('btn-load').addEventListener('click', loadProject);
  document.getElementById('btn-export').addEventListener('click', exportMod);
  document.getElementById('btn-copy').addEventListener('click', copyCode);
  document.getElementById('btn-template').addEventListener('click', showTemplateMenu);
  document.getElementById('btn-recipe-ui').addEventListener('click', showRecipeBuilder);
  document.getElementById('btn-texture-ui').addEventListener('click', showTextureManager);
  document.getElementById('btn-resources').addEventListener('click', showResourceEditor);
  document.getElementById('btn-build-check').addEventListener('click', runBuildCheck);
  document.getElementById('btn-guide').addEventListener('click', () => showGuide(0));
  document.getElementById('btn-mode-auto').addEventListener('click', () => switchCodeMode('auto'));
  document.getElementById('btn-mode-manual').addEventListener('click', () => switchCodeMode('manual'));
  document.getElementById('toolbox-search').addEventListener('input', (event) => {
    toolboxSearchText = event.target.value || '';
    workspace.updateToolbox(buildToolbox(isNoCheatMode));
  });

  document.getElementById('code-editor').addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    event.preventDefault();
    const editor = event.target;
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    editor.value = editor.value.substring(0, start) + '    ' + editor.value.substring(end);
    editor.selectionStart = editor.selectionEnd = start + 4;
  });
  document.getElementById('code-editor').addEventListener('input', () => {
    if (codeMode === 'manual') manualCodeStore[currentTab] = document.getElementById('code-editor').value;
  });

  document.querySelectorAll('.code-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.code-tab').forEach((el) => el.classList.remove('active'));
      tab.classList.add('active');
      currentTab = tab.dataset.tab;
      if (codeMode === 'manual') {
        const editor = document.getElementById('code-editor');
        editor.value = manualCodeStore[currentTab] || document.getElementById('code-content').textContent;
      } else {
        updateCodePreview();
      }
    });
  });

  initResizeHandle();
  initItemAssist();
  checkFirstLaunch();
  updateCompatibilityWarnings();
}

function initResizeHandle() {
  const handle = document.getElementById('resize-handle');
  const codePanel = document.getElementById('code-panel');
  let isResizing = false;

  handle.addEventListener('mousedown', (event) => {
    isResizing = true;
    document.body.style.cursor = 'col-resize';
    event.preventDefault();
  });
  document.addEventListener('mousemove', (event) => {
    if (!isResizing) return;
    const containerWidth = document.getElementById('main').offsetWidth;
    const newWidth = containerWidth - event.clientX;
    if (newWidth >= 250 && newWidth <= 900) {
      codePanel.style.width = `${newWidth}px`;
      Blockly.svgResize(workspace);
    }
  });
  document.addEventListener('mouseup', () => {
    if (!isResizing) return;
    isResizing = false;
    document.body.style.cursor = '';
    Blockly.svgResize(workspace);
  });
}

function initItemAssist() {
  ensureItemAssistElements();
  document.addEventListener('focusin', (event) => {
    if (!event.target || !event.target.classList || !event.target.classList.contains('blocklyHtmlInput')) return;
    itemAssistState = { input: event.target, selectedIndex: 0 };
    updateItemAssist();
  });

  document.addEventListener('input', (event) => {
    if (!itemAssistState || event.target !== itemAssistState.input) return;
    itemAssistState.selectedIndex = 0;
    updateItemAssist();
  });

  document.addEventListener('keydown', (event) => {
    if (!itemAssistState || event.target !== itemAssistState.input) return;
    const suggestions = getItemSuggestions(itemAssistState.input.value);
    if (!suggestions.length) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      itemAssistState.selectedIndex = (itemAssistState.selectedIndex + 1) % suggestions.length;
      renderItemAssist(suggestions);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      itemAssistState.selectedIndex = (itemAssistState.selectedIndex - 1 + suggestions.length) % suggestions.length;
      renderItemAssist(suggestions);
    } else if (event.key === 'Enter' && document.getElementById('item-assist-popup').style.display !== 'none') {
      event.preventDefault();
      applyItemSuggestion(suggestions[itemAssistState.selectedIndex]);
    } else if (event.key === 'Escape') {
      hideItemAssist();
    }
  });

  document.addEventListener('click', (event) => {
    const popup = document.getElementById('item-assist-popup');
    const preview = document.getElementById('item-preview-popup');
    if (popup.contains(event.target) || preview.contains(event.target)) return;
    if (itemAssistState && event.target === itemAssistState.input) return;
    hideItemAssist();
  });
}

function ensureItemAssistElements() {
  if (!document.getElementById('item-assist-popup')) {
    const popup = document.createElement('div');
    popup.id = 'item-assist-popup';
    popup.className = 'item-assist-popup';
    document.body.appendChild(popup);
  }
  if (!document.getElementById('item-preview-popup')) {
    const preview = document.createElement('div');
    preview.id = 'item-preview-popup';
    preview.className = 'item-preview-popup';
    document.body.appendChild(preview);
  }
}

function updateItemAssist() {
  if (!itemAssistState || !itemAssistState.input) return;
  const suggestions = getItemSuggestions(itemAssistState.input.value);
  renderItemAssist(suggestions);
  renderItemPreview(itemAssistState.input.value);
}

function getWorkspaceItemSuggestions() {
  if (!workspace) return [];
  const values = new Set();
  workspace.getAllBlocks(false).forEach((block) => {
    const pairs = [
      ['ITEM_ID', true],
      ['BLOCK_ID', true],
      ['SEED_ID', true],
      ['HARVEST_ID', true],
      ['ICON_ITEM', true],
      ['ICON', true],
      ['ENCH_ID', false]
    ];
    pairs.forEach(([fieldName, namespaced]) => {
      if (!block.getField || !block.getField(fieldName)) return;
      const raw = (block.getFieldValue(fieldName) || '').trim();
      if (!raw) return;
      values.add(namespaced && !raw.includes(':') ? `${getModSettings().modInit ? getModSettings().modInit.getFieldValue('MOD_ID') || 'my_mod' : 'my_mod'}:${raw}` : raw);
    });
  });
  return Array.from(values);
}

function getItemSuggestions(query) {
  const normalized = (query || '').trim().toLowerCase();
  const candidates = [...new Set([...VANILLA_ITEM_SUGGESTIONS, ...getWorkspaceItemSuggestions()])];
  if (!normalized) return candidates.slice(0, 12);
  return candidates
    .filter((item) => item.toLowerCase().includes(normalized))
    .sort((left, right) => {
      const leftStarts = left.toLowerCase().startsWith(normalized) ? 0 : 1;
      const rightStarts = right.toLowerCase().startsWith(normalized) ? 0 : 1;
      if (leftStarts !== rightStarts) return leftStarts - rightStarts;
      return left.localeCompare(right);
    })
    .slice(0, 12);
}

function renderItemAssist(suggestions) {
  const popup = document.getElementById('item-assist-popup');
  if (!itemAssistState || !itemAssistState.input || !suggestions.length) {
    popup.style.display = 'none';
    return;
  }
  const rect = itemAssistState.input.getBoundingClientRect();
  popup.style.display = 'block';
  popup.style.left = `${rect.left + window.scrollX}px`;
  popup.style.top = `${rect.bottom + window.scrollY + 6}px`;
  popup.style.width = `${Math.max(rect.width, 240)}px`;
  popup.innerHTML = suggestions.map((item, index) => `
    <button class="item-assist-option${index === itemAssistState.selectedIndex ? ' active' : ''}" data-item="${item}">
      <span class="item-assist-id">${item}</span>
    </button>
  `).join('');
  popup.querySelectorAll('.item-assist-option').forEach((button) => {
    button.addEventListener('mousedown', (event) => {
      event.preventDefault();
      applyItemSuggestion(button.dataset.item);
    });
  });
}

function applyItemSuggestion(value) {
  if (!itemAssistState || !itemAssistState.input) return;
  itemAssistState.input.value = value;
  itemAssistState.input.dispatchEvent(new Event('input', { bubbles: true }));
  renderItemPreview(value);
  hideItemAssist(false);
}

function renderItemPreview(value) {
  const preview = document.getElementById('item-preview-popup');
  if (!itemAssistState || !itemAssistState.input) {
    preview.style.display = 'none';
    return;
  }
  const itemId = normalizePreviewItemId(value);
  if (!itemId) {
    preview.style.display = 'none';
    return;
  }
  const rect = itemAssistState.input.getBoundingClientRect();
  const assetVersion = getModSettings().mcVersion && !getModSettings().mcVersion.startsWith('26.') ? getModSettings().mcVersion : '1.21.11';
  const texturePath = itemId.replace(/^minecraft:/, '');
  const custom = !itemId.startsWith('minecraft:');
  preview.style.display = 'block';
  preview.style.left = `${rect.right + window.scrollX + 12}px`;
  preview.style.top = `${rect.top + window.scrollY}px`;
  preview.innerHTML = `
    <div class="item-preview-card">
      <div class="item-preview-icon-wrap">
        ${custom ? '<div class="item-preview-custom">CUSTOM</div>' : `<img class="item-preview-icon" src="https://mcasset.cloud/${assetVersion}/assets/minecraft/textures/item/${texturePath}.png" alt="${itemId}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">`}
        <div class="item-preview-fallback">${texturePath.split('_').slice(0, 2).join(' ').toUpperCase()}</div>
      </div>
      <div class="item-preview-meta">
        <strong>${itemId}</strong>
        <span>${custom ? 'custom item or block id' : `Minecraft ${assetVersion}`}</span>
      </div>
    </div>
  `;
}

function normalizePreviewItemId(value) {
  const raw = (value || '').trim();
  if (!raw) return '';
  if (raw.includes(':')) return raw;
  if (/^[a-z0-9_]+$/i.test(raw)) {
    const customIds = new Set(getWorkspaceItemSuggestions().map((item) => item.toLowerCase()));
    const modId = getModSettings().modInit ? (getModSettings().modInit.getFieldValue('MOD_ID') || 'my_mod') : 'my_mod';
    return customIds.has(`${modId}:${raw}`.toLowerCase()) ? `${modId}:${raw}` : `minecraft:${raw}`;
  }
  return '';
}

function hideItemAssist(clearState = true) {
  const popup = document.getElementById('item-assist-popup');
  const preview = document.getElementById('item-preview-popup');
  if (popup) popup.style.display = 'none';
  if (preview) preview.style.display = 'none';
  if (clearState) itemAssistState = null;
}

function getModInitBlock() {
  return workspace ? workspace.getTopBlocks(true).find((block) => block.type === 'mod_init') : null;
}

function appendToModContent(block) {
  const modInit = getModInitBlock();
  if (!modInit) {
    showToast('先に MOD 設定ブロックを置いてください');
    block.dispose(false);
    return false;
  }
  block.initSvg();
  block.render();
  const first = modInit.getInputTargetBlock('CONTENT');
  if (!first) {
    modInit.getInput('CONTENT').connection.connect(block.previousConnection);
  } else {
    let tail = first;
    while (tail.getNextBlock()) tail = tail.getNextBlock();
    if (tail.nextConnection && block.previousConnection) tail.nextConnection.connect(block.previousConnection);
  }
  return true;
}

function showRecipeBuilder() {
  const overlay = document.createElement('div');
  overlay.className = 'guide-overlay';
  overlay.innerHTML = `
    <div class="guide-modal" style="width:760px;max-width:92vw;">
      <div class="guide-header">
        <h2>レシピを追加</h2>
        <button class="guide-close" aria-label="Close">&times;</button>
      </div>
      <div class="guide-body">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <label>レシピの種類
            <select id="recipe-ui-type" style="width:100%;margin-top:6px;">
              <option value="shaped">並べて作るクラフト</option>
              <option value="shapeless">順番なしクラフト</option>
              <option value="smelting">かまど・溶鉱炉など</option>
            </select>
          </label>
          <label>完成品の ID
            <input id="recipe-ui-result" type="text" value="custom_item" style="width:100%;margin-top:6px;">
          </label>
          <label>完成数
            <input id="recipe-ui-count" type="number" min="1" max="64" value="1" style="width:100%;margin-top:6px;">
          </label>
          <label>素材一覧
            <input id="recipe-ui-items" type="text" value="minecraft:diamond,minecraft:stick" style="width:100%;margin-top:6px;" placeholder="カンマ区切りで入力">
          </label>
        </div>
        <div id="recipe-ui-shaped" style="margin-top:12px;">
          <p style="margin:0 0 10px;">3x3 のマスに A / B / C を入れてください。空欄は何も置かないマスです。</p>
          <div style="display:grid;grid-template-columns:repeat(3,64px);gap:8px;margin-bottom:12px;">
            <input id="recipe-grid-1" type="text" maxlength="1" value="A" style="text-align:center;height:44px;font-size:20px;">
            <input id="recipe-grid-2" type="text" maxlength="1" value="A" style="text-align:center;height:44px;font-size:20px;">
            <input id="recipe-grid-3" type="text" maxlength="1" value="A" style="text-align:center;height:44px;font-size:20px;">
            <input id="recipe-grid-4" type="text" maxlength="1" value="" style="text-align:center;height:44px;font-size:20px;">
            <input id="recipe-grid-5" type="text" maxlength="1" value="B" style="text-align:center;height:44px;font-size:20px;">
            <input id="recipe-grid-6" type="text" maxlength="1" value="" style="text-align:center;height:44px;font-size:20px;">
            <input id="recipe-grid-7" type="text" maxlength="1" value="" style="text-align:center;height:44px;font-size:20px;">
            <input id="recipe-grid-8" type="text" maxlength="1" value="B" style="text-align:center;height:44px;font-size:20px;">
            <input id="recipe-grid-9" type="text" maxlength="1" value="" style="text-align:center;height:44px;font-size:20px;">
          </div>
          <div style="display:grid;grid-template-columns:90px 1fr;gap:8px;align-items:center;">
            <input id="recipe-key-A" type="text" value="A" maxlength="1" style="text-align:center;height:38px;">
            <input id="recipe-item-A" type="text" value="minecraft:diamond" style="height:38px;" placeholder="A に使うアイテム ID">
            <input id="recipe-key-B" type="text" value="B" maxlength="1" style="text-align:center;height:38px;">
            <input id="recipe-item-B" type="text" value="minecraft:stick" style="height:38px;" placeholder="B に使うアイテム ID">
            <input id="recipe-key-C" type="text" value="C" maxlength="1" style="text-align:center;height:38px;">
            <input id="recipe-item-C" type="text" value="" style="height:38px;" placeholder="必要なら C も使えます">
          </div>
        </div>
        <div id="recipe-ui-smelting" style="display:none;margin-top:12px;">
          <p>焼く前のアイテムと、焼いた後のアイテムを決めてください。</p>
          <label>焼く前の ID<input id="recipe-ui-input" type="text" value="custom_ore" style="width:100%;margin-top:6px;"></label>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-top:8px;">
            <label>経験値<input id="recipe-ui-xp" type="number" value="0.7" step="0.1" style="width:100%;margin-top:6px;"></label>
            <label>焼き時間<input id="recipe-ui-time" type="number" value="200" min="1" style="width:100%;margin-top:6px;"></label>
            <label>設備
              <select id="recipe-ui-cook-type" style="width:100%;margin-top:6px;">
                <option value="smelting">かまど</option>
                <option value="blasting">溶鉱炉</option>
                <option value="smoking">燻製器</option>
                <option value="campfire_cooking">焚き火</option>
              </select>
            </label>
          </div>
        </div>
        <div id="recipe-ui-help" style="margin-top:14px;padding:12px;border-radius:8px;background:#0d1117;color:#c9d1d9;font-size:13px;">
          完成品を決めてから、素材を入力してください。クラフト系は上の 3x3 マスに置き方を入れれば、そのままブロックへ変換されます。
        </div>
      </div>
      <div class="guide-footer">
        <div></div>
        <div class="guide-nav">
          <button class="guide-prev" id="recipe-ui-close">閉じる</button>
          <button id="recipe-ui-add">追加</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.querySelector('.guide-close').addEventListener('click', () => overlay.remove());
  overlay.querySelector('#recipe-ui-close').addEventListener('click', () => overlay.remove());
  overlay.querySelector('#recipe-ui-type').addEventListener('change', (event) => {
    const type = event.target.value;
    overlay.querySelector('#recipe-ui-shaped').style.display = type === 'shaped' ? '' : 'none';
    overlay.querySelector('#recipe-ui-smelting').style.display = type === 'smelting' ? '' : 'none';
    overlay.querySelector('#recipe-ui-items').parentElement.style.display = type === 'shapeless' ? '' : 'none';
    overlay.querySelector('#recipe-ui-help').textContent = type === 'shaped'
      ? '3x3 マスに A / B / C を入れてください。下にある対応表で、その文字に使うアイテムを指定します。'
      : type === 'shapeless'
        ? '順番なしクラフトです。素材一覧にカンマ区切りで必要なアイテムを並べてください。'
        : '焼く前のアイテムと設備を決めるだけで追加できます。';
  });
  overlay.querySelector('#recipe-ui-add').addEventListener('click', () => {
    const type = overlay.querySelector('#recipe-ui-type').value;
    if (type === 'shaped') {
      const block = workspace.newBlock('recipe_shaped');
      block.setFieldValue(overlay.querySelector('#recipe-ui-result').value.trim(), 'RESULT');
      block.setFieldValue(String(overlay.querySelector('#recipe-ui-count').value || 1), 'COUNT');
      const cells = Array.from({ length: 9 }, (_, index) => (overlay.querySelector(`#recipe-grid-${index + 1}`).value || ' ').slice(0, 1).toUpperCase() || ' ');
      block.setFieldValue(`${cells[0]}${cells[1]}${cells[2]}`, 'PATTERN1');
      block.setFieldValue(`${cells[3]}${cells[4]}${cells[5]}`, 'PATTERN2');
      block.setFieldValue(`${cells[6]}${cells[7]}${cells[8]}`, 'PATTERN3');
      const appended = appendToModContent(block);
      if (!appended) return;
      let prev = null;
      ['A', 'B', 'C'].forEach((label) => {
        const key = (overlay.querySelector(`#recipe-key-${label}`).value || '').trim().slice(0, 1).toUpperCase();
        const item = (overlay.querySelector(`#recipe-item-${label}`).value || '').trim();
        if (!key || !item) return;
        const usedInGrid = cells.includes(key);
        if (!usedInGrid) return;
        const keyBlock = workspace.newBlock('recipe_key');
        keyBlock.setFieldValue(key, 'KEY');
        keyBlock.setFieldValue(item, 'ITEM');
        keyBlock.initSvg();
        keyBlock.render();
        if (!prev) {
          block.getInput('KEYS').connection.connect(keyBlock.previousConnection);
        } else {
          prev.nextConnection.connect(keyBlock.previousConnection);
        }
        prev = keyBlock;
      });
    } else if (type === 'shapeless') {
      const block = workspace.newBlock('recipe_shapeless');
      block.setFieldValue(overlay.querySelector('#recipe-ui-result').value.trim(), 'RESULT');
      block.setFieldValue(String(overlay.querySelector('#recipe-ui-count').value || 1), 'COUNT');
      const appended = appendToModContent(block);
      if (!appended) return;
      let prev = null;
      (overlay.querySelector('#recipe-ui-items').value || '').split(',').map((entry) => entry.trim()).filter(Boolean).forEach((item) => {
        const ingredient = workspace.newBlock('recipe_ingredient');
        ingredient.setFieldValue(item, 'ITEM');
        ingredient.initSvg();
        ingredient.render();
        if (!prev) {
          block.getInput('INGREDIENTS').connection.connect(ingredient.previousConnection);
        } else {
          prev.nextConnection.connect(ingredient.previousConnection);
        }
        prev = ingredient;
      });
    } else {
      const block = workspace.newBlock('recipe_smelting');
      block.setFieldValue(overlay.querySelector('#recipe-ui-input').value.trim(), 'INPUT');
      block.setFieldValue(overlay.querySelector('#recipe-ui-result').value.trim(), 'OUTPUT');
      block.setFieldValue(String(overlay.querySelector('#recipe-ui-xp').value || 0.7), 'XP');
      block.setFieldValue(String(overlay.querySelector('#recipe-ui-time').value || 200), 'COOKING_TIME');
      block.setFieldValue(overlay.querySelector('#recipe-ui-cook-type').value, 'TYPE');
      if (!appendToModContent(block)) return;
    }
    updateCodePreview();
    updateBlockCount();
    showToast('レシピを追加しました');
    overlay.remove();
  });
}

function collectTextureTargets() {
  const modInit = getModInitBlock();
  const modId = modInit ? (modInit.getFieldValue('MOD_ID') || 'my_mod') : 'my_mod';
  const items = [];
  const blocks = [];
  workspace.getAllBlocks(false).forEach((block) => {
    if (block.type === 'register_item' || block.type === 'item_tool' || block.type === 'register_item_animated') {
      const id = block.getFieldValue('ITEM_ID');
      const name = block.getFieldValue('ITEM_NAME') || id;
      if (id) items.push({ id, name, type: 'item', path: `assets/${modId}/textures/item/${id}.png` });
    }
    if (['register_block', 'register_ore_block', 'register_container_block', 'register_stair_block', 'register_slab_block', 'register_fence_block', 'register_door_block'].includes(block.type)) {
      const id = block.getFieldValue('BLOCK_ID');
      const name = block.getFieldValue('BLOCK_NAME') || id;
      if (id) blocks.push({ id, name, type: 'block', path: `assets/${modId}/textures/block/${id}.png` });
    }
  });
  return [...items, ...blocks];
}

function showTextureManager() {
  const targets = collectTextureTargets();
  if (!targets.length) {
    showToast('先にアイテムかブロックを登録してください');
    return;
  }
  const overlay = document.createElement('div');
  overlay.className = 'guide-overlay';
  overlay.innerHTML = `
    <div class="guide-modal" style="width:760px;max-width:92vw;">
      <div class="guide-header">
        <h2>テクスチャ登録</h2>
        <button class="guide-close" aria-label="Close">&times;</button>
      </div>
      <div class="guide-body">
        <p>アイテムまたはブロックを選んで PNG を登録します。</p>
        <select id="texture-target" style="width:100%;margin-bottom:12px;">
          ${targets.map((target) => `<option value="${target.path}">${target.type}: ${target.id} (${target.name})</option>`).join('')}
        </select>
        <input id="texture-file" type="file" accept=".png,image/png" style="width:100%;">
        <div id="texture-preview" style="margin-top:16px;color:#8892a0;">未選択</div>
      </div>
      <div class="guide-footer">
        <div></div>
        <div class="guide-nav">
          <button class="guide-prev" id="texture-close">閉じる</button>
          <button id="texture-save">保存</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.querySelector('.guide-close').addEventListener('click', () => overlay.remove());
  overlay.querySelector('#texture-close').addEventListener('click', () => overlay.remove());
  let filePayload = null;
  overlay.querySelector('#texture-file').addEventListener('change', async (event) => {
    const [file] = event.target.files || [];
    if (!file) return;
    const base64 = await readFileAsBase64(file);
    filePayload = { encoding: 'base64', content: base64 };
    overlay.querySelector('#texture-preview').innerHTML = `<div style="display:flex;align-items:center;gap:12px;"><img src="data:image/png;base64,${base64}" alt="preview" style="width:64px;height:64px;image-rendering:pixelated;border:1px solid #2a3a5c;border-radius:8px;background:#16213e;"><span>${file.name}</span></div>`;
  });
  overlay.querySelector('#texture-save').addEventListener('click', () => {
    if (!filePayload) {
      showToast('PNG ファイルを選んでください');
      return;
    }
    extraResourceStore[overlay.querySelector('#texture-target').value] = filePayload;
    overlay.remove();
    showToast('テクスチャを保存しました');
  });
}

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || '');
      resolve(result.includes(',') ? result.split(',')[1] : result);
    };
    reader.onerror = () => reject(reader.error || new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

function getModSettings() {
  const topBlocks = workspace ? workspace.getTopBlocks(true) : [];
  const modInit = topBlocks.find((block) => block.type === 'mod_init');
  return {
    modInit,
    mcVersion: modInit ? (modInit.getFieldValue('MC_VERSION') || '1.21.11') : '1.21.11',
    modSide: modInit ? (modInit.getFieldValue('MOD_SIDE') || 'BOTH') : 'BOTH'
  };
}

function checkNoCheatToggle() {
  const settings = getModSettings();
  const newNoCheat = settings.modInit ? settings.modInit.getFieldValue('NO_CHEAT') === 'TRUE' : false;
  if (newNoCheat === isNoCheatMode) return;
  isNoCheatMode = newNoCheat;
  workspace.updateToolbox(buildToolbox(isNoCheatMode));
  document.getElementById('status-text').textContent = isNoCheatMode ? 'チートなしモード ON' : '通常モード';
}

function updateCompatibilityWarnings() {
  const container = document.getElementById('compatibility-warnings');
  if (!container || !workspace) return;
  const settings = getModSettings();
  if (!settings.modInit) {
    container.textContent = 'MOD設定ブロックを置くと互換警告を表示します。';
    return;
  }

  const types = new Set(workspace.getAllBlocks(false).map((block) => block.type));
  const warnings = [];
  if (settings.modSide === 'CLIENT' && (types.has('register_command') || types.has('register_command_with_arg'))) {
    warnings.push('クライアント専用 MOD にコマンド登録が含まれています。');
  }
  if (settings.modSide === 'SERVER' && (types.has('register_gui_screen') || types.has('action_open_gui') || types.has('register_keybind'))) {
    warnings.push('サーバー専用 MOD に GUI / キーバインド要素が含まれています。');
  }
  if (settings.mcVersion.startsWith('1.20') && (types.has('register_gui_screen') || types.has('register_sound'))) {
    warnings.push('1.20.x では GUI / サウンド生成を実機で再確認してください。');
  }
  if (settings.mcVersion.startsWith('26.') && types.has('register_command_with_arg')) {
    warnings.push('26.x 系では引数付きコマンドのビルドチェック結果を必ず確認してください。');
  }

  if (types.has('register_enchantment') && settings.mcVersion.startsWith('1.20')) {
    warnings.push('1.20.x のカスタムエンチャントは旧 API ベースです。現在の出力は翻訳と補助ファイル中心なので、挙動コードは手動追記が必要です。');
  }
  if (types.has('register_enchantment') && !settings.mcVersion.startsWith('1.20')) {
    warnings.push('1.21+ のカスタムエンチャントは data-driven です。export 後に data/<modid>/enchantments/ を調整すると完成度が上がります。');
  }

  container.innerHTML = warnings.length
    ? warnings.map((warning) => `<div>• ${warning}</div>`).join('')
    : '問題は見つかっていません。';
}

function switchCodeMode(mode) {
  codeMode = mode;
  const preview = document.getElementById('code-preview');
  const editor = document.getElementById('code-editor');
  document.getElementById('btn-mode-auto').classList.toggle('active', mode === 'auto');
  document.getElementById('btn-mode-manual').classList.toggle('active', mode === 'manual');
  document.getElementById('code-mode-label').textContent = mode === 'auto' ? '自動生成モード' : '手動編集モード';

  if (mode === 'auto') {
    preview.style.display = '';
    editor.style.display = 'none';
    updateCodePreview();
  } else {
    preview.style.display = 'none';
    editor.style.display = '';
    editor.value = manualCodeStore[currentTab] || document.getElementById('code-content').textContent;
    manualCodeStore[currentTab] = editor.value;
  }
}

function updateCodePreview() {
  if (codeMode === 'manual') return;
  const result = generator.generate(workspace);
  const codeElement = document.getElementById('code-content');
  let code = result.main;

  if (currentTab === 'items') code = result.items;
  if (currentTab === 'blocks') code = result.blocks;
  if (currentTab === 'events') code = result.events;
  if (currentTab === 'commands') code = result.commands;
  if (currentTab === 'containers') code = result.containers;
  if (currentTab === 'sync') code = result.sync;
  if (currentTab === 'gui') {
    if (result.guiScreens && result.guiScreens.length > 0) {
      const guiGen = new GuiCodeGenerator(result.modId || 'my_mod');
      const pkg = `com.modbuilder.${result.modId || 'my_mod'}`;
      code = result.guiScreens.map((screen) => guiGen.generateScreenClass(pkg, screen).code).join('\n\n// ================================================\n\n');
    } else {
      code = '// GUI screen blocks will generate code here.';
    }
  }
  if (currentTab === 'recipes') {
    code = result.recipes && Object.keys(result.recipes).length
      ? Object.entries(result.recipes).map(([name, content]) => `// --- ${name} ---\n${content}`).join('\n\n')
      : '// Recipe blocks will generate JSON here.';
  }

  codeElement.textContent = code || '';
  highlightCode(codeElement);
}

function highlightCode(element) {
  let html = element.textContent;
  html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  html = html.replace(/(\/\/.*$)/gm, '<span class="cmt">$1</span>');
  html = html.replace(/("(?:[^"\\]|\\.)*")/g, '<span class="str">$1</span>');
  const keywords = ['package', 'import', 'public', 'private', 'protected', 'static', 'final', 'class', 'interface', 'extends', 'implements', 'new', 'return', 'void', 'if', 'else', 'for', 'while', 'switch', 'case', 'break', 'continue', 'try', 'catch', 'throw', 'throws', 'instanceof', 'null', 'true', 'false', 'this', 'super', 'int', 'float', 'double', 'boolean', 'long', 'byte', 'short', 'char'];
  html = html.replace(new RegExp(`\\b(${keywords.join('|')})\\b`, 'g'), '<span class="kw">$1</span>');
  element.innerHTML = html;
}

function updateBlockCount() {
  document.getElementById('block-count').textContent = `ブロック: ${workspace.getAllBlocks(false).length}`;
}

function getMainClassName(modName) {
  const sanitized = (modName || '').replace(/[^a-zA-Z0-9]/g, '');
  if (!sanitized) return 'MyMod';
  return sanitized.replace(/^./, (char) => char.toUpperCase());
}

function collectExportFiles(result) {
  const className = getMainClassName(result.modName);
  const javaFiles = { [`${className}Mod.java`]: result.main };
  if (result.items && !result.items.startsWith('//')) javaFiles['ModItems.java'] = result.items;
  if (result.blocks && !result.blocks.startsWith('//')) javaFiles['ModBlocks.java'] = result.blocks;
  if (result.events && !result.events.startsWith('//')) javaFiles['ModEvents.java'] = result.events;
  if (result.commands && !result.commands.startsWith('//')) javaFiles['ModCommands.java'] = result.commands;
  if (result.containers && !result.containers.startsWith('//')) javaFiles['ModContainers.java'] = result.containers;
  if (result.sync && !result.sync.startsWith('//')) javaFiles['ModSync.java'] = result.sync;
  if (result.modVars) javaFiles['ModVars.java'] = result.modVars;
  if (result.worldGen && !result.worldGen.startsWith('//')) javaFiles['ModWorldGen.java'] = result.worldGen;

  if (result.guiScreens && result.guiScreens.length > 0) {
    const guiGen = new GuiCodeGenerator(result.modId);
    const pkg = `com.modbuilder.${result.modId}`;
    for (const screen of result.guiScreens) {
      const generated = guiGen.generateScreenClass(pkg, screen);
      javaFiles[`${generated.className}.java`] = generated.code;
    }
  }

  const tabToFile = {
    main: `${className}Mod.java`,
    items: 'ModItems.java',
    blocks: 'ModBlocks.java',
    events: 'ModEvents.java',
    commands: 'ModCommands.java',
    containers: 'ModContainers.java',
    sync: 'ModSync.java'
  };
  for (const [tab, code] of Object.entries(manualCodeStore)) {
    const file = tabToFile[tab];
    if (file && javaFiles[file]) javaFiles[file] = code;
  }
  return { javaFiles };
}

function buildResourceMap(result) {
  return { ...(result.resources || {}), ...(extraResourceStore || {}) };
}

async function saveProject() {
  const data = {
    version: '1.1.0',
    workspace: Blockly.serialization.workspaces.save(workspace),
    manualCodeStore,
    extraResourceStore
  };
  const result = await window.api.saveProject(data);
  if (!result) return;
  showToast('プロジェクトを保存しました');
  document.getElementById('status-text').textContent = `保存済み: ${result}`;
}

async function loadProject() {
  const data = await window.api.loadProject();
  if (!data || !data.workspace) return;
  workspace.clear();
  Blockly.serialization.workspaces.load(data.workspace, workspace);
  manualCodeStore = data.manualCodeStore || {};
  extraResourceStore = data.extraResourceStore || {};
  updateCodePreview();
  updateBlockCount();
  checkNoCheatToggle();
  updateCompatibilityWarnings();
  showToast('プロジェクトを読み込みました');
}

async function exportMod() {
  const result = generator.generate(workspace);
  if (!result.modId) {
    showToast('MOD設定ブロックを配置してください');
    return;
  }
  const exportFiles = collectExportFiles(result);
  const exportResult = await window.api.exportMod({
    modId: result.modId,
    modName: result.modName,
    version: result.version,
    mcVersion: result.mcVersion,
    javaFiles: exportFiles.javaFiles,
    recipes: result.recipes,
    fabricModJson: result.fabricModJson,
    resources: buildResourceMap(result)
  });
  if (!exportResult || !exportResult.filePath) return;
  const wrapperReady = exportResult.wrapper && exportResult.wrapper.ok;
  showToast(`MODをエクスポートしました: ${exportResult.filePath}`);
  document.getElementById('status-text').textContent = wrapperReady
    ? `エクスポート完了: ${exportResult.filePath}`
    : `エクスポート完了: ${exportResult.filePath} (GRADLE_SETUP.txt を確認)`;
}

function copyCode() {
  const source = codeMode === 'manual'
    ? document.getElementById('code-editor').value
    : document.getElementById('code-content').textContent;
  navigator.clipboard.writeText(source).then(() => showToast('コードをクリップボードにコピーしました'));
}

async function runBuildCheck() {
  const result = generator.generate(workspace);
  if (!result.modId) {
    showToast('MOD設定ブロックを配置してください');
    return;
  }

  const modal = document.createElement('div');
  modal.className = 'build-modal';
  modal.innerHTML = `
    <h3 style="margin:0 0 12px;color:var(--accent);">MOD ビルドチェック</h3>
    <div id="build-status"><span class="build-spinner"></span> 開始しています...</div>
    <div class="build-output" id="build-output">開始しています...\n</div>
    <div style="text-align:right;margin-top:12px;">
      <button id="build-close" style="background:var(--border);color:var(--text);border:none;padding:8px 16px;border-radius:6px;cursor:pointer;">閉じる</button>
    </div>
  `;
  document.body.appendChild(modal);

  const output = document.getElementById('build-output');
  const status = document.getElementById('build-status');
  let unsubscribeBuildProgress = window.api.onBuildProgress((msg) => {
    output.textContent += `${msg}\n`;
    output.scrollTop = output.scrollHeight;
  });

  document.getElementById('build-close').addEventListener('click', () => {
    if (unsubscribeBuildProgress) unsubscribeBuildProgress();
    modal.remove();
  });

  try {
    const exportFiles = collectExportFiles(result);
    const checkResult = await window.api.buildCheck({
      modId: result.modId,
      modName: result.modName,
      version: result.version,
      mcVersion: result.mcVersion,
      javaFiles: exportFiles.javaFiles,
      recipes: result.recipes,
      fabricModJson: result.fabricModJson,
      resources: buildResourceMap(result)
    });

    output.textContent += '\n=== チェック結果 ===\n\n';
    output.textContent += `生成Javaファイル数: ${checkResult.fileCount}\n\n`;
    output.textContent += checkResult.syntaxErrors.length === 0
      ? '構文チェック: すべてパス\n'
      : `構文チェック: ${checkResult.syntaxErrors.length}件のエラー\n${checkResult.syntaxErrors.map((error) => `  - ${error}`).join('\n')}\n`;

    if (checkResult.gradle) {
      if (checkResult.gradle.note) {
        output.textContent += `\n${checkResult.gradle.note}\n`;
      } else if (checkResult.gradle.success) {
        output.textContent += '\nGradleビルド: 成功\n';
      } else {
        output.textContent += '\nGradleビルド: 失敗\n';
        if (checkResult.gradle.stderr) output.textContent += `\n${checkResult.gradle.stderr}`;
        if (checkResult.gradle.error) output.textContent += `\n${checkResult.gradle.error}`;
      }
    }

    const hasErrors = checkResult.syntaxErrors.length > 0 || (checkResult.gradle && checkResult.gradle.success === false);
    status.innerHTML = hasErrors
      ? '<span style="color:#ff5555;">問題が見つかりました</span>'
      : '<span style="color:#55ff55;">チェック完了: 問題なし</span>';
  } catch (error) {
    output.textContent += `\nエラー: ${error.message}\n`;
    status.innerHTML = '<span style="color:#ff5555;">エラーが発生しました</span>';
  }

  if (unsubscribeBuildProgress) {
    unsubscribeBuildProgress();
    unsubscribeBuildProgress = null;
  }
  output.scrollTop = output.scrollHeight;
}

function getCustomTemplates() {
  try {
    return JSON.parse(localStorage.getItem('fmb_custom_templates') || '[]');
  } catch {
    return [];
  }
}

function setCustomTemplates(templates) {
  localStorage.setItem('fmb_custom_templates', JSON.stringify(templates));
}

function loadTemplateXml(xml, name) {
  workspace.clear();
  Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(xml), workspace);
  updateCodePreview();
  updateBlockCount();
  updateCompatibilityWarnings();
  showToast(`テンプレート「${name}」を読み込みました`);
}

function showTemplateMenu() {
  const existing = document.querySelector('.template-menu');
  if (existing) {
    existing.remove();
    return;
  }

  const templates = [
    ...Object.entries(MOD_TEMPLATES).map(([key, template]) => ({ key, builtIn: true, ...template })),
    ...getCustomTemplates().map((template) => ({ builtIn: false, ...template }))
  ];

  const menu = document.createElement('div');
  menu.className = 'template-menu';
  menu.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#16213e;border:2px solid #e94560;border-radius:12px;padding:24px;z-index:10000;min-width:520px;max-width:720px;max-height:80vh;overflow:auto;';

  let html = '<h3 style="margin:0 0 12px;color:#eaeaea;">テンプレート管理</h3>';
  html += '<div style="display:flex;gap:8px;margin-bottom:12px;">';
  html += '<button id="tmpl-save-current" style="background:#e94560;color:#fff;border:none;padding:8px 12px;border-radius:6px;cursor:pointer;">現在の構成を保存</button>';
  html += '<button id="tmpl-import" style="background:#2a3a5c;color:#fff;border:none;padding:8px 12px;border-radius:6px;cursor:pointer;">JSONから取込</button>';
  html += '</div>';
  for (const template of templates) {
    html += `<div style="padding:10px;margin:6px 0;background:#1a1a2e;border-radius:8px;border:1px solid #2a3a5c;">`;
    html += `<strong style="color:#e94560;">${template.name}</strong><span style="float:right;color:#8892a0;font-size:11px;">${template.builtIn ? 'Built-in' : 'Custom'}</span><br>`;
    html += `<span style="color:#8892a0;font-size:12px;">${template.description || ''}</span><div style="margin-top:8px;display:flex;gap:8px;">`;
    html += `<button class="tmpl-load" data-template="${template.key}" style="background:#e94560;color:#fff;border:none;padding:6px 10px;border-radius:6px;cursor:pointer;">読み込み</button>`;
    html += `<button class="tmpl-share" data-template="${template.key}" style="background:#2a3a5c;color:#fff;border:none;padding:6px 10px;border-radius:6px;cursor:pointer;">共有JSONコピー</button>`;
    if (!template.builtIn) html += `<button class="tmpl-delete" data-template="${template.key}" style="background:#4b1f2a;color:#fff;border:none;padding:6px 10px;border-radius:6px;cursor:pointer;">削除</button>`;
    html += '</div></div>';
  }
  html += '<div style="text-align:right;margin-top:12px;"><button id="tmpl-close" style="background:#2a3a5c;color:#eaeaea;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;">閉じる</button></div>';
  menu.innerHTML = html;
  document.body.appendChild(menu);

  const saveCurrentAsTemplate = () => {
    const name = window.prompt('テンプレート名を入力してください');
    if (!name) return;
    const xml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
    const templatesList = getCustomTemplates();
    templatesList.push({ key: `custom_${Date.now()}`, name, description: 'ユーザー保存テンプレート', xml });
    setCustomTemplates(templatesList);
    showToast('テンプレートを保存しました');
  };

  const importTemplate = () => {
    const raw = window.prompt('テンプレートJSONを貼り付けてください');
    if (!raw) return;
    const parsed = JSON.parse(raw);
    const templatesList = getCustomTemplates();
    templatesList.push({ key: parsed.key || `custom_${Date.now()}`, name: parsed.name, description: parsed.description || 'インポートテンプレート', xml: parsed.xml });
    setCustomTemplates(templatesList);
    showToast('テンプレートを取り込みました');
  };

  menu.querySelectorAll('.tmpl-load').forEach((button) => button.addEventListener('click', () => {
    const template = templates.find((item) => item.key === button.dataset.template);
    if (template && template.xml) loadTemplateXml(template.xml, template.name);
    menu.remove();
  }));
  menu.querySelectorAll('.tmpl-share').forEach((button) => button.addEventListener('click', () => {
    const template = templates.find((item) => item.key === button.dataset.template);
    if (template) navigator.clipboard.writeText(JSON.stringify(template, null, 2)).then(() => showToast('テンプレートJSONをコピーしました'));
  }));
  menu.querySelectorAll('.tmpl-delete').forEach((button) => button.addEventListener('click', () => {
    setCustomTemplates(getCustomTemplates().filter((item) => item.key !== button.dataset.template));
    menu.remove();
    showTemplateMenu();
  }));
  document.getElementById('tmpl-save-current').addEventListener('click', () => { saveCurrentAsTemplate(); menu.remove(); });
document.getElementById('tmpl-import').addEventListener('click', () => { importTemplate(); menu.remove(); });
document.getElementById('tmpl-close').addEventListener('click', () => menu.remove());
}

function showResourceEditor() {
  const overlay = document.createElement('div');
  overlay.className = 'guide-overlay';
  overlay.innerHTML = `
    <div class="guide-modal" style="width:760px;max-width:90vw;">
      <div class="guide-header">
        <h2>リソース編集</h2>
        <button class="guide-close" aria-label="Close">&times;</button>
      </div>
      <div class="guide-body">
        <p>キーに相対パス、値にファイル内容を持つ JSON を入力してください。</p>
        <textarea id="resource-editor-json" style="width:100%;min-height:320px;background:#0d1117;color:#c9d1d9;border:1px solid #2a3a5c;border-radius:8px;padding:12px;font-family:Consolas,monospace;">${JSON.stringify(extraResourceStore, null, 2)}</textarea>
      </div>
      <div class="guide-footer">
        <div></div>
        <div class="guide-nav">
          <button class="guide-prev" id="resource-reset">クリア</button>
          <button class="guide-next" id="resource-save">保存</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.querySelector('.guide-close').addEventListener('click', () => overlay.remove());
  overlay.querySelector('#resource-reset').addEventListener('click', () => {
    overlay.querySelector('#resource-editor-json').value = '{}';
  });
  overlay.querySelector('#resource-save').addEventListener('click', () => {
    try {
      extraResourceStore = JSON.parse(overlay.querySelector('#resource-editor-json').value || '{}');
      overlay.remove();
      showToast('リソース上書きを保存しました');
    } catch (error) {
      showToast(`リソースJSONが不正です: ${error.message}`);
    }
  });
}

function loadTemplateXml(xml, name) {
  workspace.clear();
  Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(xml), workspace);
  updateCodePreview();
  updateBlockCount();
  updateCompatibilityWarnings();
  showToast(`テンプレート「${name}」を読み込みました`);
}

function showTemplateMenu() {
  const templates = [
    ...Object.entries(MOD_TEMPLATES).map(([key, template]) => ({ key, builtIn: true, ...template })),
    ...getCustomTemplates().map((template) => ({ builtIn: false, ...template }))
  ];

  const overlay = document.createElement('div');
  overlay.className = 'guide-overlay';
  overlay.innerHTML = `
    <div class="guide-modal" style="width:760px;max-width:92vw;">
      <div class="guide-header">
        <h2>テンプレート</h2>
        <button class="guide-close" aria-label="Close">&times;</button>
      </div>
      <div class="guide-body">
        <p>よく使う構成を選んで読み込めます。今の内容を自分用テンプレートとして保存することもできます。</p>
        <div style="display:flex;gap:8px;margin:12px 0 16px;flex-wrap:wrap;">
          <button id="tmpl-save-current" style="background:#e94560;color:#fff;border:none;padding:8px 12px;border-radius:6px;cursor:pointer;">今の内容を保存</button>
          <button id="tmpl-toggle-advanced" style="background:#2a3a5c;color:#fff;border:none;padding:8px 12px;border-radius:6px;cursor:pointer;">詳細操作</button>
        </div>
        <div id="tmpl-advanced" style="display:none;padding:12px;border:1px solid #2a3a5c;border-radius:8px;margin-bottom:16px;">
          <p style="margin-top:0;">上級者向け: テンプレート JSON を読み込んだりコピーしたりできます。</p>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button id="tmpl-import" style="background:#2a3a5c;color:#fff;border:none;padding:8px 12px;border-radius:6px;cursor:pointer;">JSON を読み込む</button>
            <button id="tmpl-export-selected" style="background:#2a3a5c;color:#fff;border:none;padding:8px 12px;border-radius:6px;cursor:pointer;">選択中を JSON コピー</button>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          ${templates.map((template) => `
            <div style="padding:12px;background:#1a1a2e;border-radius:8px;border:1px solid #2a3a5c;">
              <div style="display:flex;justify-content:space-between;gap:12px;align-items:center;">
                <div>
                  <strong style="color:#e94560;">${template.name}</strong>
                  <div style="color:#8892a0;font-size:12px;margin-top:4px;">${template.description || ''}</div>
                </div>
                <span style="color:#8892a0;font-size:11px;">${template.builtIn ? '標準' : '自作'}</span>
              </div>
              <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap;">
                <button class="tmpl-load" data-template="${template.key}" style="background:#e94560;color:#fff;border:none;padding:6px 10px;border-radius:6px;cursor:pointer;">使う</button>
                <button class="tmpl-select" data-template="${template.key}" style="background:#2a3a5c;color:#fff;border:none;padding:6px 10px;border-radius:6px;cursor:pointer;">詳細用に選択</button>
                ${template.builtIn ? '' : `<button class="tmpl-delete" data-template="${template.key}" style="background:#4b1f2a;color:#fff;border:none;padding:6px 10px;border-radius:6px;cursor:pointer;">削除</button>`}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="guide-footer">
        <div id="tmpl-selected-label" style="color:#8892a0;">詳細用に選択: なし</div>
        <div class="guide-nav">
          <button class="guide-prev" id="tmpl-close">閉じる</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  let selectedTemplateKey = templates[0] ? templates[0].key : null;
  const updateSelectedLabel = () => {
    const selected = templates.find((item) => item.key === selectedTemplateKey);
    overlay.querySelector('#tmpl-selected-label').textContent = `詳細用に選択: ${selected ? selected.name : 'なし'}`;
  };
  updateSelectedLabel();

  overlay.querySelector('.guide-close').addEventListener('click', () => overlay.remove());
  overlay.querySelector('#tmpl-close').addEventListener('click', () => overlay.remove());
  overlay.querySelector('#tmpl-toggle-advanced').addEventListener('click', () => {
    const advanced = overlay.querySelector('#tmpl-advanced');
    advanced.style.display = advanced.style.display === 'none' ? 'block' : 'none';
  });
  overlay.querySelector('#tmpl-save-current').addEventListener('click', () => {
    const name = window.prompt('テンプレート名を入力してください');
    if (!name) return;
    const xml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
    const templatesList = getCustomTemplates();
    templatesList.push({ key: `custom_${Date.now()}`, name, description: '保存した作業内容', xml });
    setCustomTemplates(templatesList);
    overlay.remove();
    showToast('テンプレートを保存しました');
  });
  overlay.querySelector('#tmpl-import').addEventListener('click', () => {
    const raw = window.prompt('テンプレート JSON を貼り付けてください');
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      const templatesList = getCustomTemplates();
      templatesList.push({
        key: parsed.key || `custom_${Date.now()}`,
        name: parsed.name || 'Imported Template',
        description: parsed.description || '読み込んだテンプレート',
        xml: parsed.xml
      });
      setCustomTemplates(templatesList);
      overlay.remove();
      showToast('テンプレートを読み込みました');
    } catch (error) {
      showToast(`テンプレート JSON が不正です: ${error.message}`);
    }
  });
  overlay.querySelector('#tmpl-export-selected').addEventListener('click', () => {
    const selected = templates.find((item) => item.key === selectedTemplateKey);
    if (!selected) {
      showToast('先にテンプレートを選んでください');
      return;
    }
    navigator.clipboard.writeText(JSON.stringify(selected, null, 2)).then(() => {
      showToast('選択したテンプレートの JSON をコピーしました');
    });
  });
  overlay.querySelectorAll('.tmpl-load').forEach((button) => button.addEventListener('click', () => {
    const template = templates.find((item) => item.key === button.dataset.template);
    if (template && template.xml) {
      loadTemplateXml(template.xml, template.name);
      overlay.remove();
    }
  }));
  overlay.querySelectorAll('.tmpl-select').forEach((button) => button.addEventListener('click', () => {
    selectedTemplateKey = button.dataset.template;
    updateSelectedLabel();
  }));
  overlay.querySelectorAll('.tmpl-delete').forEach((button) => button.addEventListener('click', () => {
    setCustomTemplates(getCustomTemplates().filter((item) => item.key !== button.dataset.template));
    overlay.remove();
    showTemplateMenu();
  }));
}

function showResourceEditor() {
  const overlay = document.createElement('div');
  overlay.className = 'guide-overlay';
  overlay.innerHTML = `
    <div class="guide-modal" style="width:760px;max-width:90vw;">
      <div class="guide-header">
        <h2>追加リソース</h2>
        <button class="guide-close" aria-label="Close">&times;</button>
      </div>
      <div class="guide-body">
        <p>画像は「テクスチャ」から追加できます。ここでは言語ファイルや音の設定を簡単に追加できます。</p>
        <div style="display:grid;grid-template-columns:1fr;gap:14px;">
          <div style="padding:12px;border:1px solid #2a3a5c;border-radius:8px;">
            <strong>言語ファイルを追加</strong>
            <p style="margin:6px 0 10px;color:#8892a0;">1 行に 1 件ずつ、key = value で入力します。</p>
            <label>言語
              <select id="resource-lang-code" style="width:100%;margin-top:6px;">
                <option value="ja_jp">ja_jp</option>
                <option value="en_us">en_us</option>
              </select>
            </label>
            <textarea id="resource-lang-text" style="width:100%;min-height:120px;margin-top:8px;background:#0d1117;color:#c9d1d9;border:1px solid #2a3a5c;border-radius:8px;padding:12px;font-family:Consolas,monospace;" placeholder="item.my_mod.magic_wand = Magic Wand"></textarea>
          </div>
          <div style="padding:12px;border:1px solid #2a3a5c;border-radius:8px;">
            <strong>sounds.json を追加</strong>
            <p style="margin:6px 0 10px;color:#8892a0;">独自サウンドを使うときだけ入力してください。</p>
            <textarea id="resource-sounds-json" style="width:100%;min-height:120px;background:#0d1117;color:#c9d1d9;border:1px solid #2a3a5c;border-radius:8px;padding:12px;font-family:Consolas,monospace;" placeholder='{"my_sound":{"sounds":["my_sound"]}}'></textarea>
          </div>
          <div style="padding:12px;border:1px solid #2a3a5c;border-radius:8px;">
            <strong>詳細編集</strong>
            <p style="margin:6px 0 10px;color:#8892a0;">上級者向けです。相対パスと内容を JSON で直接編集できます。</p>
            <details>
              <summary style="cursor:pointer;">詳細 JSON を開く</summary>
              <textarea id="resource-editor-json" style="width:100%;min-height:220px;margin-top:10px;background:#0d1117;color:#c9d1d9;border:1px solid #2a3a5c;border-radius:8px;padding:12px;font-family:Consolas,monospace;">${JSON.stringify(extraResourceStore, null, 2)}</textarea>
            </details>
          </div>
        </div>
      </div>
      <div class="guide-footer">
        <div style="color:#8892a0;">画像は「テクスチャ」ボタンから追加できます。</div>
        <div class="guide-nav">
          <button class="guide-prev" id="resource-reset">初期化</button>
          <button class="guide-next" id="resource-save">保存</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.querySelector('.guide-close').addEventListener('click', () => overlay.remove());
  overlay.querySelector('#resource-reset').addEventListener('click', () => {
    overlay.querySelector('#resource-editor-json').value = '{}';
    overlay.querySelector('#resource-lang-text').value = '';
    overlay.querySelector('#resource-sounds-json').value = '';
  });
  overlay.querySelector('#resource-save').addEventListener('click', () => {
    try {
      const advanced = JSON.parse(overlay.querySelector('#resource-editor-json').value || '{}');
      const modInit = getModInitBlock();
      const modId = modInit ? (modInit.getFieldValue('MOD_ID') || 'my_mod') : 'my_mod';
      const nextResources = { ...advanced };
      const langText = overlay.querySelector('#resource-lang-text').value.trim();
      const soundsText = overlay.querySelector('#resource-sounds-json').value.trim();
      if (langText) {
        const langObject = {};
        langText.split(/\r?\n/).map((line) => line.trim()).filter(Boolean).forEach((line) => {
          const splitIndex = line.indexOf('=');
          if (splitIndex === -1) return;
          const key = line.slice(0, splitIndex).trim();
          const value = line.slice(splitIndex + 1).trim();
          if (key) langObject[key] = value;
        });
        nextResources[`assets/${modId}/lang/${overlay.querySelector('#resource-lang-code').value}.json`] = JSON.stringify(langObject, null, 2);
      }
      if (soundsText) {
        JSON.parse(soundsText);
        nextResources[`assets/${modId}/sounds.json`] = soundsText;
      }
      extraResourceStore = nextResources;
      overlay.remove();
      showToast('追加リソースを保存しました');
    } catch (error) {
      showToast(`入力内容を保存できませんでした: ${error.message}`);
    }
  });
}

function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
