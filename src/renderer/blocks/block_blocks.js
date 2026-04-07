// Block blocks
Blockly.defineBlocksWithJsonArray([
  {
    "type": "register_block",
    "message0": "ブロックを追加 %1 ID %2 表示名 %3 %4 硬さ %5 爆発への強さ %6 %7 明るさ %8 すべりやすさ %9 %10 壊す道具 %11 必要な道具レベル %12 %13 アイテムとして持てる %14",
    "args0": [
      { "type": "input_dummy" },
      { "type": "field_input", "name": "BLOCK_ID", "text": "custom_block" },
      { "type": "field_input", "name": "BLOCK_NAME", "text": "Custom Block" },
      { "type": "input_dummy" },
      { "type": "field_number", "name": "HARDNESS", "value": 1.5, "min": 0, "precision": 0.1 },
      { "type": "field_number", "name": "RESISTANCE", "value": 6.0, "min": 0, "precision": 0.1 },
      { "type": "input_dummy" },
      { "type": "field_number", "name": "LUMINANCE", "value": 0, "min": 0, "max": 15 },
      { "type": "field_number", "name": "SLIPPERINESS", "value": 0.6, "min": 0, "max": 1, "precision": 0.1 },
      { "type": "input_dummy" },
      { "type": "field_dropdown", "name": "TOOL", "options": [
        ["指定なし", "NONE"],
        ["ツルハシ", "PICKAXE"],
        ["斧", "AXE"],
        ["シャベル", "SHOVEL"],
        ["クワ", "HOE"]
      ]},
      { "type": "field_dropdown", "name": "MINING_LEVEL", "options": [
        ["木", "WOOD"],
        ["石", "STONE"],
        ["鉄", "IRON"],
        ["ダイヤ", "DIAMOND"],
        ["ネザライト", "NETHERITE"]
      ]},
      { "type": "input_dummy" },
      { "type": "field_checkbox", "name": "HAS_ITEM", "checked": true }
    ],
    "previousStatement": "block_register",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 120,
    "tooltip": "普通のブロックを追加します。明るさは 0 から 15 までです。",
    "helpUrl": ""
  },
  {
    "type": "register_ore_block",
    "message0": "鉱石ブロックを追加 %1 ID %2 表示名 %3 %4 硬さ %5 爆発への強さ %6 %7 経験値 最小 %8 最大 %9 %10 アイテムとして持てる %11",
    "args0": [
      { "type": "input_dummy" },
      { "type": "field_input", "name": "BLOCK_ID", "text": "custom_ore" },
      { "type": "field_input", "name": "BLOCK_NAME", "text": "Custom Ore" },
      { "type": "input_dummy" },
      { "type": "field_number", "name": "HARDNESS", "value": 3.0, "min": 0, "precision": 0.1 },
      { "type": "field_number", "name": "RESISTANCE", "value": 3.0, "min": 0, "precision": 0.1 },
      { "type": "input_dummy" },
      { "type": "field_number", "name": "XP_MIN", "value": 2, "min": 0 },
      { "type": "field_number", "name": "XP_MAX", "value": 5, "min": 0 },
      { "type": "input_dummy" },
      { "type": "field_checkbox", "name": "HAS_ITEM", "checked": true }
    ],
    "previousStatement": "block_register",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 120,
    "tooltip": "壊したときに経験値が出る鉱石ブロックを追加します。",
    "helpUrl": ""
  },
  {
    "type": "register_falling_block",
    "message0": "落ちるブロックを追加 ID %1 表示名 %2 固さ %3 爆発への強さ %4 アイテム化 %5",
    "args0": [
      { "type": "field_input", "name": "BLOCK_ID", "text": "custom_sand" },
      { "type": "field_input", "name": "BLOCK_NAME", "text": "Custom Sand" },
      { "type": "field_number", "name": "HARDNESS", "value": 0.5, "min": 0, "precision": 0.1 },
      { "type": "field_number", "name": "RESISTANCE", "value": 0.5, "min": 0, "precision": 0.1 },
      { "type": "field_checkbox", "name": "HAS_ITEM", "checked": true }
    ],
    "previousStatement": "block_register",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 120,
    "tooltip": "砂や砂利のように落下するブロック用です。",
    "helpUrl": ""
  },
  {
    "type": "register_tnt_block",
    "message0": "TNT風ブロックを追加 ID %1 表示名 %2 固さ %3 爆発への強さ %4 アイテム化 %5",
    "args0": [
      { "type": "field_input", "name": "BLOCK_ID", "text": "custom_tnt" },
      { "type": "field_input", "name": "BLOCK_NAME", "text": "Custom TNT" },
      { "type": "field_number", "name": "HARDNESS", "value": 0.0, "min": 0, "precision": 0.1 },
      { "type": "field_number", "name": "RESISTANCE", "value": 0.0, "min": 0, "precision": 0.1 },
      { "type": "field_checkbox", "name": "HAS_ITEM", "checked": true }
    ],
    "previousStatement": "block_register",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 120,
    "tooltip": "見た目や素材をまとめる TNT 系ブロックです。",
    "helpUrl": ""
  },
  {
    "type": "register_light_block",
    "message0": "光るブロックを追加 ID %1 表示名 %2 固さ %3 爆発への強さ %4 明るさ %5 アイテム化 %6",
    "args0": [
      { "type": "field_input", "name": "BLOCK_ID", "text": "custom_lamp" },
      { "type": "field_input", "name": "BLOCK_NAME", "text": "Custom Lamp" },
      { "type": "field_number", "name": "HARDNESS", "value": 1.0, "min": 0, "precision": 0.1 },
      { "type": "field_number", "name": "RESISTANCE", "value": 1.0, "min": 0, "precision": 0.1 },
      { "type": "field_number", "name": "LUMINANCE", "value": 15, "min": 0, "max": 15 },
      { "type": "field_checkbox", "name": "HAS_ITEM", "checked": true }
    ],
    "previousStatement": "block_register",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 120,
    "tooltip": "明るさを持つブロックです。",
    "helpUrl": ""
  },
  {
    "type": "register_redstone_block",
    "message0": "レッドストーン系ブロック ID %1 表示名 %2 固さ %3 爆発への強さ %4 アイテム化 %5",
    "args0": [
      { "type": "field_input", "name": "BLOCK_ID", "text": "custom_redstone_block" },
      { "type": "field_input", "name": "BLOCK_NAME", "text": "Custom Redstone Block" },
      { "type": "field_number", "name": "HARDNESS", "value": 1.5, "min": 0, "precision": 0.1 },
      { "type": "field_number", "name": "RESISTANCE", "value": 6.0, "min": 0, "precision": 0.1 },
      { "type": "field_checkbox", "name": "HAS_ITEM", "checked": true }
    ],
    "previousStatement": "block_register",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 120,
    "tooltip": "レッドストーン系の素材ブロック用です。",
    "helpUrl": ""
  }
]);
