// Event blocks
Blockly.defineBlocksWithJsonArray([
  {
    "type": "on_item_use",
    "message0": "このアイテムを使ったとき %1 対象アイテム ID %2 %3 実行すること %4",
    "args0": [
      { "type": "input_dummy" },
      { "type": "field_input", "name": "ITEM_ID", "text": "custom_item" },
      { "type": "input_dummy" },
      { "type": "input_statement", "name": "ACTIONS", "check": "action" }
    ],
    "previousStatement": "event_handler",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 30,
    "tooltip": "プレイヤーが指定したアイテムを使ったときに動きます。",
    "helpUrl": ""
  },
  {
    "type": "on_block_break",
    "message0": "このブロックが壊れたとき %1 対象ブロック ID %2 %3 実行すること %4",
    "args0": [
      { "type": "input_dummy" },
      { "type": "field_input", "name": "BLOCK_ID", "text": "" },
      { "type": "input_dummy" },
      { "type": "input_statement", "name": "ACTIONS", "check": "action" }
    ],
    "previousStatement": "event_handler",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 30,
    "tooltip": "ブロックを壊した瞬間に動きます。空欄にすると対象が分からないので、必ず入れてください。",
    "helpUrl": ""
  },
  {
    "type": "on_block_place",
    "message0": "このブロックを置いたとき %1 対象ブロック ID %2 %3 実行すること %4",
    "args0": [
      { "type": "input_dummy" },
      { "type": "field_input", "name": "BLOCK_ID", "text": "" },
      { "type": "input_dummy" },
      { "type": "input_statement", "name": "ACTIONS", "check": "action" }
    ],
    "previousStatement": "event_handler",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 30,
    "tooltip": "ブロックを設置した瞬間に動きます。",
    "helpUrl": ""
  },
  {
    "type": "on_player_join",
    "message0": "プレイヤーが参加したとき %1 実行すること %2",
    "args0": [
      { "type": "input_dummy" },
      { "type": "input_statement", "name": "ACTIONS", "check": "action" }
    ],
    "previousStatement": "event_handler",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 30,
    "tooltip": "ワールドやサーバーに入ったタイミングで動きます。",
    "helpUrl": ""
  },
  {
    "type": "on_entity_death",
    "message0": "このエンティティが倒れたとき %1 対象 %2 %3 実行すること %4",
    "args0": [
      { "type": "input_dummy" },
      { "type": "field_dropdown", "name": "ENTITY", "options": [
        ["すべて", "ALL"],
        ["プレイヤー", "PLAYER"],
        ["ゾンビ", "ZOMBIE"],
        ["スケルトン", "SKELETON"],
        ["クリーパー", "CREEPER"],
        ["エンダーマン", "ENDERMAN"],
        ["ウィザー", "WITHER"],
        ["エンダードラゴン", "ENDER_DRAGON"]
      ]},
      { "type": "input_dummy" },
      { "type": "input_statement", "name": "ACTIONS", "check": "action" }
    ],
    "previousStatement": "event_handler",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 30,
    "tooltip": "指定したエンティティが倒れたときに動きます。",
    "helpUrl": ""
  },
  {
    "type": "on_server_tick",
    "message0": "一定時間ごとに実行 %1 何 tick ごと %2 %3 実行すること %4",
    "args0": [
      { "type": "input_dummy" },
      { "type": "field_number", "name": "INTERVAL", "value": 20, "min": 1 },
      { "type": "input_dummy" },
      { "type": "input_statement", "name": "ACTIONS", "check": "action" }
    ],
    "previousStatement": "event_handler",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 30,
    "tooltip": "定期的に動かしたい処理に使います。20 tick で約 1 秒です。",
    "helpUrl": ""
  }
]);
