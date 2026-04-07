// Recipe blocks
Blockly.defineBlocksWithJsonArray([
  {
    "type": "recipe_shaped",
    "message0": "並べて作るクラフト %1 完成品 ID %2 完成数 %3 %4 1行目 %5 2行目 %6 3行目 %7 %8 文字と素材の対応 %9",
    "args0": [
      { "type": "input_dummy" },
      { "type": "field_input", "name": "RESULT", "text": "custom_item" },
      { "type": "field_number", "name": "COUNT", "value": 1, "min": 1, "max": 64 },
      { "type": "input_dummy" },
      { "type": "field_input", "name": "PATTERN1", "text": "AAA" },
      { "type": "field_input", "name": "PATTERN2", "text": " B " },
      { "type": "field_input", "name": "PATTERN3", "text": " B " },
      { "type": "input_dummy" },
      { "type": "input_statement", "name": "KEYS", "check": "recipe_key" }
    ],
    "previousStatement": "recipe",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 60,
    "tooltip": "3x3 の並び方が大事なクラフトです。Recipe UI を使うと簡単に作れます。",
    "helpUrl": ""
  },
  {
    "type": "recipe_key",
    "message0": "文字 %1 は アイテム %2",
    "args0": [
      { "type": "field_input", "name": "KEY", "text": "A" },
      { "type": "field_input", "name": "ITEM", "text": "minecraft:diamond" }
    ],
    "previousStatement": "recipe_key",
    "nextStatement": "recipe_key",
    "colour": 60,
    "tooltip": "クラフト表の文字と、実際に使うアイテムを対応させます。",
    "helpUrl": ""
  },
  {
    "type": "recipe_shapeless",
    "message0": "順番なしクラフト %1 完成品 ID %2 完成数 %3 %4 素材一覧 %5",
    "args0": [
      { "type": "input_dummy" },
      { "type": "field_input", "name": "RESULT", "text": "custom_item" },
      { "type": "field_number", "name": "COUNT", "value": 1, "min": 1, "max": 64 },
      { "type": "input_dummy" },
      { "type": "input_statement", "name": "INGREDIENTS", "check": "recipe_ingredient" }
    ],
    "previousStatement": "recipe",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 60,
    "tooltip": "並び順を気にしないクラフトです。",
    "helpUrl": ""
  },
  {
    "type": "recipe_ingredient",
    "message0": "素材 %1",
    "args0": [
      { "type": "field_input", "name": "ITEM", "text": "minecraft:diamond" }
    ],
    "previousStatement": "recipe_ingredient",
    "nextStatement": "recipe_ingredient",
    "colour": 60,
    "tooltip": "順番なしクラフトに使う素材を追加します。",
    "helpUrl": ""
  },
  {
    "type": "recipe_smelting",
    "message0": "焼くレシピ %1 元のアイテム %2 完成品 %3 %4 経験値 %5 時間 tick %6 %7 設備 %8",
    "args0": [
      { "type": "input_dummy" },
      { "type": "field_input", "name": "INPUT", "text": "custom_ore" },
      { "type": "field_input", "name": "OUTPUT", "text": "custom_item" },
      { "type": "input_dummy" },
      { "type": "field_number", "name": "XP", "value": 0.7, "min": 0, "precision": 0.1 },
      { "type": "field_number", "name": "COOKING_TIME", "value": 200, "min": 1 },
      { "type": "input_dummy" },
      { "type": "field_dropdown", "name": "TYPE", "options": [
        ["かまど", "smelting"],
        ["溶鉱炉", "blasting"],
        ["燻製器", "smoking"],
        ["焚き火", "campfire_cooking"]
      ]}
    ],
    "previousStatement": "recipe",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 60,
    "tooltip": "かまど、溶鉱炉、燻製器、焚き火で焼くレシピです。",
    "helpUrl": ""
  }
]);
