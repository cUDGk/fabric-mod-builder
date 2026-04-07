// 変数ブロック
Blockly.defineBlocksWithJsonArray([
  {
    "type": "var_declare_number",
    "message0": "数値変数を作成 %1 = %2",
    "args0": [
      { "type": "field_input", "name": "VAR_NAME", "text": "score" },
      { "type": "field_number", "name": "VALUE", "value": 0 }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 330,
    "tooltip": "数値変数を作成して初期値を設定",
    "helpUrl": ""
  },
  {
    "type": "var_declare_string",
    "message0": "文字列変数を作成 %1 = %2",
    "args0": [
      { "type": "field_input", "name": "VAR_NAME", "text": "playerName" },
      { "type": "field_input", "name": "VALUE", "text": "Hello" }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 330,
    "tooltip": "文字列変数を作成して初期値を設定",
    "helpUrl": ""
  },
  {
    "type": "var_declare_bool",
    "message0": "フラグ変数を作成 %1 = %2",
    "args0": [
      { "type": "field_input", "name": "VAR_NAME", "text": "isActive" },
      { "type": "field_checkbox", "name": "VALUE", "checked": false }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 330,
    "tooltip": "真偽値変数を作成",
    "helpUrl": ""
  },
  {
    "type": "var_set_number",
    "message0": "変数 %1 に %2 を代入",
    "args0": [
      { "type": "field_input", "name": "VAR_NAME", "text": "score" },
      { "type": "field_number", "name": "VALUE", "value": 0 }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 330,
    "tooltip": "数値変数に値を代入",
    "helpUrl": ""
  },
  {
    "type": "var_set_string",
    "message0": "変数 %1 に %2 を代入",
    "args0": [
      { "type": "field_input", "name": "VAR_NAME", "text": "message" },
      { "type": "field_input", "name": "VALUE", "text": "新しい値" }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 330,
    "tooltip": "文字列変数に値を代入",
    "helpUrl": ""
  },
  {
    "type": "var_set_bool",
    "message0": "変数 %1 を %2 にする",
    "args0": [
      { "type": "field_input", "name": "VAR_NAME", "text": "isActive" },
      { "type": "field_checkbox", "name": "VALUE", "checked": true }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 330,
    "tooltip": "フラグ変数を設定",
    "helpUrl": ""
  },
  {
    "type": "var_add",
    "message0": "変数 %1 に %2 を加算",
    "args0": [
      { "type": "field_input", "name": "VAR_NAME", "text": "score" },
      { "type": "field_number", "name": "VALUE", "value": 1 }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 330,
    "tooltip": "数値変数に値を加算",
    "helpUrl": ""
  },
  {
    "type": "var_get_number",
    "message0": "数値変数 %1",
    "args0": [
      { "type": "field_input", "name": "VAR_NAME", "text": "score" }
    ],
    "output": "Number",
    "colour": 330,
    "tooltip": "数値変数の値を取得",
    "helpUrl": ""
  },
  {
    "type": "var_get_string",
    "message0": "文字列変数 %1",
    "args0": [
      { "type": "field_input", "name": "VAR_NAME", "text": "message" }
    ],
    "output": "String",
    "colour": 330,
    "tooltip": "文字列変数の値を取得",
    "helpUrl": ""
  },
  {
    "type": "var_get_bool",
    "message0": "フラグ変数 %1",
    "args0": [
      { "type": "field_input", "name": "VAR_NAME", "text": "isActive" }
    ],
    "output": "Boolean",
    "colour": 330,
    "tooltip": "フラグ変数の値を取得",
    "helpUrl": ""
  },
  {
    "type": "var_compare",
    "message0": "変数 %1 %2 %3",
    "args0": [
      { "type": "field_input", "name": "VAR_NAME", "text": "score" },
      { "type": "field_dropdown", "name": "OP", "options": [
        ["=", "=="],
        ["≠", "!="],
        [">", ">"],
        ["<", "<"],
        ["≥", ">="],
        ["≤", "<="]
      ]},
      { "type": "field_number", "name": "VALUE", "value": 10 }
    ],
    "output": "Boolean",
    "colour": 330,
    "tooltip": "数値変数を比較",
    "helpUrl": ""
  },
  {
    "type": "var_string_equals",
    "message0": "変数 %1 が %2 と同じ",
    "args0": [
      { "type": "field_input", "name": "VAR_NAME", "text": "message" },
      { "type": "field_input", "name": "VALUE", "text": "hello" }
    ],
    "output": "Boolean",
    "colour": 330,
    "tooltip": "文字列変数を比較",
    "helpUrl": ""
  }
,
  {
    "type": "number_value",
    "message0": "数字 %1",
    "args0": [
      { "type": "field_number", "name": "NUM", "value": 0 }
    ],
    "output": "Number",
    "colour": 230,
    "tooltip": "そのまま使える数字です。",
    "helpUrl": ""
  },
  {
    "type": "text_value",
    "message0": "文字 %1",
    "args0": [
      { "type": "field_input", "name": "TEXT", "text": "hello" }
    ],
    "output": "String",
    "colour": 230,
    "tooltip": "そのまま使える文字列です。",
    "helpUrl": ""
  },
  {
    "type": "mc_text_join",
    "message0": "文字をつなぐ %1 と %2",
    "args0": [
      { "type": "input_value", "name": "A", "check": ["String", "Number", "Boolean"] },
      { "type": "input_value", "name": "B", "check": ["String", "Number", "Boolean"] }
    ],
    "output": "String",
    "colour": 230,
    "tooltip": "2つの値を文字としてつなげます。",
    "helpUrl": ""
  },
  {
    "type": "math_random",
    "message0": "ランダムな数字 最小 %1 最大 %2",
    "args0": [
      { "type": "field_number", "name": "MIN", "value": 0 },
      { "type": "field_number", "name": "MAX", "value": 10 }
    ],
    "output": "Number",
    "colour": 230,
    "tooltip": "最小から最大までのランダムな整数です。",
    "helpUrl": ""
  }
]);
