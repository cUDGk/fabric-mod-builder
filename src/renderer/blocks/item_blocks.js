// Item blocks
Blockly.defineBlocksWithJsonArray([
  {
    "type": "register_item",
    "message0": "アイテムを追加 %1 ID %2 表示名 %3 %4 1スタックの最大数 %5 レア度 %6 %7 食べ物にする %8 %9 食べ物の設定 %10",
    "args0": [
      { "type": "input_dummy" },
      { "type": "field_input", "name": "ITEM_ID", "text": "custom_item" },
      { "type": "field_input", "name": "ITEM_NAME", "text": "Custom Item" },
      { "type": "input_dummy" },
      { "type": "field_number", "name": "MAX_COUNT", "value": 64, "min": 1, "max": 64 },
      { "type": "field_dropdown", "name": "RARITY", "options": [
        ["普通", "COMMON"],
        ["少しレア", "UNCOMMON"],
        ["レア", "RARE"],
        ["かなりレア", "EPIC"]
      ]},
      { "type": "input_dummy" },
      { "type": "field_checkbox", "name": "IS_FOOD", "checked": false },
      { "type": "input_dummy" },
      { "type": "input_statement", "name": "FOOD_PROPS", "check": "food_component" }
    ],
    "previousStatement": "item_register",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 210,
    "tooltip": "普通のアイテムを追加します。ID は半角英数字とアンダースコアがおすすめです。",
    "helpUrl": ""
  },
  {
    "type": "item_food",
    "message0": "食べ物の設定 空腹の回復 %1 満腹度の伸び %2 いつでも食べられる %3",
    "args0": [
      { "type": "field_number", "name": "HUNGER", "value": 4, "min": 0, "max": 20 },
      { "type": "field_number", "name": "SATURATION", "value": 0.4, "min": 0, "precision": 0.1 },
      { "type": "field_checkbox", "name": "ALWAYS_EDIBLE", "checked": false }
    ],
    "previousStatement": "food_component",
    "colour": 210,
    "tooltip": "食べ物にしたときの回復量を決めます。",
    "helpUrl": ""
  },
  {
    "type": "item_tool",
    "message0": "ツールや武器を追加 %1 ID %2 表示名 %3 %4 種類 %5 素材 %6 %7 攻撃力 %8 攻撃速度 %9",
    "args0": [
      { "type": "input_dummy" },
      { "type": "field_input", "name": "ITEM_ID", "text": "custom_sword" },
      { "type": "field_input", "name": "ITEM_NAME", "text": "Custom Sword" },
      { "type": "input_dummy" },
      { "type": "field_dropdown", "name": "TOOL_TYPE", "options": [
        ["剣", "SWORD"],
        ["ツルハシ", "PICKAXE"],
        ["斧", "AXE"],
        ["シャベル", "SHOVEL"],
        ["クワ", "HOE"]
      ]},
      { "type": "field_dropdown", "name": "MATERIAL", "options": [
        ["木", "WOOD"],
        ["石", "STONE"],
        ["鉄", "IRON"],
        ["金", "GOLD"],
        ["ダイヤ", "DIAMOND"],
        ["ネザライト", "NETHERITE"]
      ]},
      { "type": "input_dummy" },
      { "type": "field_number", "name": "ATTACK_DAMAGE", "value": 3, "min": 0 },
      { "type": "field_number", "name": "ATTACK_SPEED", "value": -2.4, "precision": 0.1 }
    ],
    "previousStatement": "item_register",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 210,
    "tooltip": "剣やツルハシなど、性能付きのアイテムを追加します。",
    "helpUrl": ""
  }
]);
