// 条件ブロック
Blockly.defineBlocksWithJsonArray([
  {
    "type": "condition_if",
    "message0": "もし %1 なら %2 実行: %3",
    "args0": [
      { "type": "input_value", "name": "CONDITION", "check": "Boolean" },
      { "type": "input_dummy" },
      { "type": "input_statement", "name": "DO", "check": "action" }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 190,
    "tooltip": "条件が真のとき実行",
    "helpUrl": ""
  },
  {
    "type": "condition_if_else",
    "message0": "もし %1 なら %2 実行: %3 でなければ %4 実行: %5",
    "args0": [
      { "type": "input_value", "name": "CONDITION", "check": "Boolean" },
      { "type": "input_dummy" },
      { "type": "input_statement", "name": "DO", "check": "action" },
      { "type": "input_dummy" },
      { "type": "input_statement", "name": "ELSE", "check": "action" }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 190,
    "tooltip": "条件分岐",
    "helpUrl": ""
  },
  {
    "type": "check_sneaking",
    "message0": "スニーク中",
    "output": "Boolean",
    "colour": 190,
    "tooltip": "プレイヤーがスニーク中かどうか",
    "helpUrl": ""
  },
  {
    "type": "check_holding_item",
    "message0": "アイテム %1 を持っている",
    "args0": [
      { "type": "field_input", "name": "ITEM", "text": "minecraft:diamond" }
    ],
    "output": "Boolean",
    "colour": 190,
    "tooltip": "プレイヤーが特定のアイテムを持っているか",
    "helpUrl": ""
  },
  {
    "type": "check_dimension",
    "message0": "%1 にいる",
    "args0": [
      { "type": "field_dropdown", "name": "DIMENSION", "options": [
        ["オーバーワールド", "OVERWORLD"],
        ["ネザー", "THE_NETHER"],
        ["エンド", "THE_END"]
      ]}
    ],
    "output": "Boolean",
    "colour": 190,
    "tooltip": "プレイヤーが特定のディメンションにいるか",
    "helpUrl": ""
  },
  {
    "type": "check_time",
    "message0": "ゲーム時間が %1",
    "args0": [
      { "type": "field_dropdown", "name": "TIME", "options": [
        ["昼 (0-12000)", "DAY"],
        ["夜 (12000-24000)", "NIGHT"],
        ["日の出 (0-2000)", "SUNRISE"],
        ["日の入り (10000-14000)", "SUNSET"]
      ]}
    ],
    "output": "Boolean",
    "colour": 190,
    "tooltip": "現在のゲーム時間を判定",
    "helpUrl": ""
  },
  {
    "type": "check_health",
    "message0": "体力が %1 %2",
    "args0": [
      { "type": "field_dropdown", "name": "OP", "options": [
        ["以下", "<="],
        ["以上", ">="],
        ["等しい", "=="]
      ]},
      { "type": "field_number", "name": "VALUE", "value": 10, "min": 0, "max": 20 }
    ],
    "output": "Boolean",
    "colour": 190,
    "tooltip": "プレイヤーの体力を判定",
    "helpUrl": ""
  },
  {
    "type": "logic_and",
    "message0": "%1 かつ %2",
    "args0": [
      { "type": "input_value", "name": "A", "check": "Boolean" },
      { "type": "input_value", "name": "B", "check": "Boolean" }
    ],
    "output": "Boolean",
    "colour": 190,
    "tooltip": "両方の条件が真",
    "helpUrl": ""
  },
  {
    "type": "logic_or",
    "message0": "%1 または %2",
    "args0": [
      { "type": "input_value", "name": "A", "check": "Boolean" },
      { "type": "input_value", "name": "B", "check": "Boolean" }
    ],
    "output": "Boolean",
    "colour": 190,
    "tooltip": "どちらかの条件が真",
    "helpUrl": ""
  },
  {
    "type": "logic_not",
    "message0": "%1 ではない",
    "args0": [
      { "type": "input_value", "name": "BOOL", "check": "Boolean" }
    ],
    "output": "Boolean",
    "colour": 190,
    "tooltip": "条件の否定",
    "helpUrl": ""
  },
  {
    "type": "random_chance",
    "message0": "%1 %% の確率",
    "args0": [
      { "type": "field_number", "name": "CHANCE", "value": 50, "min": 0, "max": 100 }
    ],
    "output": "Boolean",
    "colour": 190,
    "tooltip": "指定確率で真を返す",
    "helpUrl": ""
  }
]);
