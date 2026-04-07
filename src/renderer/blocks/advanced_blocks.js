Blockly.defineBlocksWithJsonArray([
  {
    "type": "register_fuel",
    "message0": "燃料を追加 アイテム ID %1 燃焼時間 tick %2",
    "args0": [
      { "type": "field_input", "name": "ITEM_ID", "text": "custom_item" },
      { "type": "field_number", "name": "BURN_TIME", "value": 1600, "min": 1 }
    ],
    "previousStatement": "event_handler",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 60,
    "tooltip": "かまどなどで使える燃料にします。"
  },
  {
    "type": "register_compostable",
    "message0": "コンポスター対応 アイテム ID %1 成功率 %2",
    "args0": [
      { "type": "field_input", "name": "ITEM_ID", "text": "custom_item" },
      { "type": "field_dropdown", "name": "CHANCE", "options": [["30%", "0.3"], ["50%", "0.5"], ["65%", "0.65"], ["85%", "0.85"], ["100%", "1.0"]] }
    ],
    "previousStatement": "event_handler",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 120,
    "tooltip": "コンポスターに入れられるようにします。"
  },
  {
    "type": "register_flammable",
    "message0": "燃えるブロックにする ブロック ID %1 燃えやすさ %2 延焼しやすさ %3",
    "args0": [
      { "type": "field_input", "name": "BLOCK_ID", "text": "custom_block" },
      { "type": "field_number", "name": "BURN", "value": 20, "min": 0 },
      { "type": "field_number", "name": "SPREAD", "value": 5, "min": 0 }
    ],
    "previousStatement": "event_handler",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 120,
    "tooltip": "火で燃えるブロックにします。"
  },
  {
    "type": "on_block_interact",
    "message0": "ブロックを右クリックしたとき 対象ブロック ID %1 実行すること %2",
    "args0": [
      { "type": "field_input", "name": "BLOCK_ID", "text": "" },
      { "type": "input_statement", "name": "ACTIONS", "check": "action" }
    ],
    "previousStatement": "event_handler",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 30,
    "tooltip": "特定ブロックを右クリックしたときに実行します。"
  },
  {
    "type": "on_player_damage",
    "message0": "プレイヤーがダメージを受けたとき %1",
    "args0": [
      { "type": "input_statement", "name": "ACTIONS", "check": "action" }
    ],
    "previousStatement": "event_handler",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 30,
    "tooltip": "被ダメージ時の処理です。"
  },
  {
    "type": "on_player_attack",
    "message0": "プレイヤーが攻撃したとき %1",
    "args0": [
      { "type": "input_statement", "name": "ACTIONS", "check": "action" }
    ],
    "previousStatement": "event_handler",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 30,
    "tooltip": "攻撃時の処理です。"
  },
  {
    "type": "register_item_animated",
    "message0": "アニメーション付きアイテム ID %1 表示名 %2 動き %3 使用時間 tick %4 使ったとき %5",
    "args0": [
      { "type": "field_input", "name": "ITEM_ID", "text": "magic_wand" },
      { "type": "field_input", "name": "ITEM_NAME", "text": "Magic Wand" },
      { "type": "field_dropdown", "name": "ANIMATION", "options": [["弓", "BOW"], ["食べる", "EAT"], ["飲む", "DRINK"], ["防御", "BLOCK"], ["クロスボウ", "CROSSBOW"], ["投げる", "SPEAR"], ["望遠鏡", "SPYGLASS"], ["ホーン", "TOOT_HORN"], ["ブラシ", "BRUSH"]] },
      { "type": "field_number", "name": "USE_TIME", "value": 40, "min": 1 },
      { "type": "input_statement", "name": "ACTIONS", "check": "action" }
    ],
    "previousStatement": "item_register",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 210,
    "tooltip": "使用時アニメーション付きのアイテムです。"
  },
  {
    "type": "register_villager_trade",
    "message0": "村人取引を追加 職業 %1 レベル %2 支払う %3 x%4 受け取る %5 x%6 最大回数 %7 経験値 %8",
    "args0": [
      { "type": "field_dropdown", "name": "PROFESSION", "options": [["農民", "FARMER"], ["漁師", "FISHERMAN"], ["羊飼い", "SHEPHERD"], ["矢師", "FLETCHER"], ["司書", "LIBRARIAN"], ["製図家", "CARTOGRAPHER"], ["聖職者", "CLERIC"], ["防具鍛冶", "ARMORER"], ["武器鍛冶", "WEAPONSMITH"], ["道具鍛冶", "TOOLSMITH"], ["肉屋", "BUTCHER"], ["革細工師", "LEATHERWORKER"], ["石工", "MASON"]] },
      { "type": "field_dropdown", "name": "LEVEL", "options": [["新人", "1"], ["見習い", "2"], ["一人前", "3"], ["熟練", "4"], ["達人", "5"]] },
      { "type": "field_input", "name": "INPUT_ITEM", "text": "minecraft:emerald" },
      { "type": "field_number", "name": "INPUT_COUNT", "value": 10, "min": 1, "max": 64 },
      { "type": "field_input", "name": "OUTPUT_ITEM", "text": "custom_item" },
      { "type": "field_number", "name": "OUTPUT_COUNT", "value": 1, "min": 1, "max": 64 },
      { "type": "field_number", "name": "MAX_USES", "value": 12, "min": 1 },
      { "type": "field_number", "name": "XP", "value": 10, "min": 0 }
    ],
    "previousStatement": "event_handler",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 45,
    "tooltip": "村人の取引に追加します。"
  },
  {
    "type": "register_mob_drop",
    "message0": "モブドロップを追加 対象 %1 アイテム %2 最小 %3 最大 %4 確率 %5 %",
    "args0": [
      { "type": "field_dropdown", "name": "ENTITY", "options": [["ゾンビ", "ZOMBIE"], ["スケルトン", "SKELETON"], ["クリーパー", "CREEPER"], ["クモ", "SPIDER"], ["エンダーマン", "ENDERMAN"], ["ブレイズ", "BLAZE"], ["ウィッチ", "WITCH"], ["ガーディアン", "GUARDIAN"], ["ファントム", "PHANTOM"], ["ピグリン", "PIGLIN"], ["ウィザースケルトン", "WITHER_SKELETON"], ["牛", "COW"], ["豚", "PIG"], ["羊", "SHEEP"], ["ニワトリ", "CHICKEN"]] },
      { "type": "field_input", "name": "ITEM", "text": "custom_item" },
      { "type": "field_number", "name": "MIN", "value": 1, "min": 0 },
      { "type": "field_number", "name": "MAX", "value": 3, "min": 1 },
      { "type": "field_number", "name": "CHANCE", "value": 50, "min": 1, "max": 100 }
    ],
    "previousStatement": "event_handler",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 0,
    "tooltip": "対象モブの追加ドロップです。"
  },
  {
    "type": "register_stair_block",
    "message0": "階段ブロック ID %1 表示名 %2 元ブロック ID %3",
    "args0": [
      { "type": "field_input", "name": "BLOCK_ID", "text": "custom_stairs" },
      { "type": "field_input", "name": "BLOCK_NAME", "text": "Custom Stairs" },
      { "type": "field_input", "name": "BASE_BLOCK", "text": "custom_block" }
    ],
    "previousStatement": "block_register",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 120,
    "tooltip": "階段ブロックを追加します。"
  },
  {
    "type": "register_slab_block",
    "message0": "ハーフブロック ID %1 表示名 %2",
    "args0": [
      { "type": "field_input", "name": "BLOCK_ID", "text": "custom_slab" },
      { "type": "field_input", "name": "BLOCK_NAME", "text": "Custom Slab" }
    ],
    "previousStatement": "block_register",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 120,
    "tooltip": "ハーフブロックを追加します。"
  },
  {
    "type": "register_fence_block",
    "message0": "フェンス ID %1 表示名 %2",
    "args0": [
      { "type": "field_input", "name": "BLOCK_ID", "text": "custom_fence" },
      { "type": "field_input", "name": "BLOCK_NAME", "text": "Custom Fence" }
    ],
    "previousStatement": "block_register",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 120,
    "tooltip": "フェンスを追加します。"
  },
  {
    "type": "register_door_block",
    "message0": "ドア ID %1 表示名 %2",
    "args0": [
      { "type": "field_input", "name": "BLOCK_ID", "text": "custom_door" },
      { "type": "field_input", "name": "BLOCK_NAME", "text": "Custom Door" }
    ],
    "previousStatement": "block_register",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 120,
    "tooltip": "ドアを追加します。"
  },
  {
    "type": "register_crop",
    "message0": "作物を追加 作物 ID %1 種 ID %2 収穫アイテム %3 最小数 %4 最大数 %5 種表示名 %6 収穫表示名 %7",
    "args0": [
      { "type": "field_input", "name": "CROP_ID", "text": "tomato_crop" },
      { "type": "field_input", "name": "SEED_ID", "text": "tomato_seeds" },
      { "type": "field_input", "name": "HARVEST_ID", "text": "tomato" },
      { "type": "field_number", "name": "MIN_DROP", "value": 1, "min": 1 },
      { "type": "field_number", "name": "MAX_DROP", "value": 3, "min": 1 },
      { "type": "field_input", "name": "SEED_NAME", "text": "Tomato Seeds" },
      { "type": "field_input", "name": "HARVEST_NAME", "text": "Tomato" }
    ],
    "previousStatement": "block_register",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 120,
    "tooltip": "育てて収穫できる作物を追加します。"
  },
  {
    "type": "register_keybind",
    "message0": "キー操作を追加 名前 %1 キー %2 押したとき %3",
    "args0": [
      { "type": "field_input", "name": "KEY_NAME", "text": "特殊スキル" },
      { "type": "field_dropdown", "name": "KEY", "options": [["R", "key.keyboard.r"], ["G", "key.keyboard.g"], ["H", "key.keyboard.h"], ["J", "key.keyboard.j"], ["K", "key.keyboard.k"], ["V", "key.keyboard.v"], ["B", "key.keyboard.b"], ["N", "key.keyboard.n"], ["M", "key.keyboard.m"], ["P", "key.keyboard.p"], ["U", "key.keyboard.u"], ["Y", "key.keyboard.y"]] },
      { "type": "input_statement", "name": "ACTIONS", "check": "action" }
    ],
    "previousStatement": "event_handler",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 160,
    "tooltip": "クライアント側のキー操作です。"
  },
  {
    "type": "register_hud",
    "message0": "HUD 表示 テキスト %1 位置 %2 色 %3",
    "args0": [
      { "type": "input_value", "name": "TEXT", "check": "String" },
      { "type": "field_dropdown", "name": "POSITION", "options": [["左上", "TOP_LEFT"], ["右上", "TOP_RIGHT"], ["上中央", "TOP_CENTER"], ["左下", "BOTTOM_LEFT"], ["右下", "BOTTOM_RIGHT"]] },
      { "type": "field_dropdown", "name": "COLOR", "options": [["白", "0xFFFFFF"], ["赤", "0xFF5555"], ["緑", "0x55FF55"], ["青", "0x5555FF"], ["金", "0xFFAA00"], ["水色", "0x55FFFF"], ["紫", "0xFF55FF"]] }
    ],
    "previousStatement": "event_handler",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 160,
    "tooltip": "画面に常時テキストを表示します。"
  },
  {
    "type": "action_damage_item",
    "message0": "手に持ったアイテムを %1 消耗させる",
    "args0": [
      { "type": "field_number", "name": "AMOUNT", "value": 1, "min": 1 }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 0,
    "tooltip": "耐久値を減らします。"
  },
  {
    "type": "action_drop_item",
    "message0": "その場にアイテムを落とす %1 x%2",
    "args0": [
      { "type": "field_input", "name": "ITEM", "text": "minecraft:diamond" },
      { "type": "field_number", "name": "COUNT", "value": 1, "min": 1, "max": 64 }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 0,
    "tooltip": "指定アイテムをドロップします。"
  },
  {
    "type": "action_set_weather",
    "message0": "天気を変える %1",
    "args0": [
      { "type": "field_dropdown", "name": "WEATHER", "options": [["晴れ", "CLEAR"], ["雨", "RAIN"], ["雷雨", "THUNDER"]] }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 0,
    "tooltip": "ワールドの天気を変えます。"
  },
  {
    "type": "action_set_time",
    "message0": "時間を変える %1",
    "args0": [
      { "type": "field_dropdown", "name": "TIME", "options": [["朝", "1000"], ["昼", "6000"], ["夕方", "12000"], ["夜", "18000"], ["夜明け", "0"]] }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 0,
    "tooltip": "ワールドの時間を変えます。"
  },
  {
    "type": "action_announce",
    "message0": "全員へアナウンス タイトル %1 サブタイトル %2 音 %3",
    "args0": [
      { "type": "field_input", "name": "TITLE", "text": "イベント開始" },
      { "type": "field_input", "name": "SUBTITLE", "text": "30秒後に始まります" },
      { "type": "field_dropdown", "name": "SOUND", "options": [["なし", "NONE"], ["レベルアップ", "ENTITY_PLAYER_LEVELUP"], ["エンダードラゴン", "ENTITY_ENDER_DRAGON_GROWL"], ["ウィザー出現", "ENTITY_WITHER_SPAWN"], ["雷", "ENTITY_LIGHTNING_BOLT_THUNDER"], ["レイド開始", "EVENT_RAID_HORN"]] }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 0,
    "tooltip": "全プレイヤーへタイトルで通知します。"
  },
  {
    "type": "action_random_pick",
    "message0": "ランダムでどちらか実行 A %1 B %2",
    "args0": [
      { "type": "input_statement", "name": "A", "check": "action" },
      { "type": "input_statement", "name": "B", "check": "action" }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 190,
    "tooltip": "A か B をランダムに実行します。"
  },
  {
    "type": "action_nearby_players",
    "message0": "半径 %1 ブロック以内の全プレイヤーに %2",
    "args0": [
      { "type": "field_number", "name": "RADIUS", "value": 16, "min": 1, "max": 256 },
      { "type": "input_statement", "name": "ACTIONS", "check": "action" }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 190,
    "tooltip": "近くの全プレイヤーへ処理します。"
  },
  {
    "type": "action_scoreboard_add",
    "message0": "スコア %1 に %2 加算",
    "args0": [
      { "type": "field_input", "name": "OBJECTIVE", "text": "kills" },
      { "type": "field_number", "name": "VALUE", "value": 1, "min": -999 }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 330,
    "tooltip": "スコアボード値を増減します。"
  },
  {
    "type": "on_player_death",
    "message0": "プレイヤーが死亡したとき %1",
    "args0": [
      { "type": "input_statement", "name": "ACTIONS", "check": "action" }
    ],
    "previousStatement": "event_handler",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 30,
    "tooltip": "死亡時の処理です。"
  },
  {
    "type": "on_player_respawn",
    "message0": "プレイヤーがリスポーンしたとき %1",
    "args0": [
      { "type": "input_statement", "name": "ACTIONS", "check": "action" }
    ],
    "previousStatement": "event_handler",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 30,
    "tooltip": "リスポーン時の処理です。"
  },
  {
    "type": "check_in_area",
    "message0": "範囲内にいる X %1 から %2 Y %3 から %4 Z %5 から %6",
    "args0": [
      { "type": "field_number", "name": "X1", "value": -10 },
      { "type": "field_number", "name": "X2", "value": 10 },
      { "type": "field_number", "name": "Y1", "value": 0 },
      { "type": "field_number", "name": "Y2", "value": 256 },
      { "type": "field_number", "name": "Z1", "value": -10 },
      { "type": "field_number", "name": "Z2", "value": 10 }
    ],
    "output": "Boolean",
    "colour": 190,
    "tooltip": "プレイヤーが指定範囲内にいるか調べます。"
  },
  {
    "type": "check_biome",
    "message0": "バイオームが %1",
    "args0": [
      { "type": "field_dropdown", "name": "BIOME", "options": [["平原", "plains"], ["森", "forest"], ["砂漠", "desert"], ["ジャングル", "jungle"], ["タイガ", "taiga"], ["雪原", "snowy_plains"], ["沼地", "swamp"], ["キノコ島", "mushroom_fields"], ["山岳", "stony_peaks"], ["海", "ocean"], ["ネザー荒地", "nether_wastes"], ["エンド", "the_end"]] }
    ],
    "output": "Boolean",
    "colour": 190,
    "tooltip": "今いるバイオームを調べます。"
  },
  {
    "type": "check_weather",
    "message0": "天気が %1",
    "args0": [
      { "type": "field_dropdown", "name": "WEATHER", "options": [["晴れ", "CLEAR"], ["雨", "RAIN"], ["雷雨", "THUNDER"]] }
    ],
    "output": "Boolean",
    "colour": 190,
    "tooltip": "今の天気を調べます。"
  }
]);
