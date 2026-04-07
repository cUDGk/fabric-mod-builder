// ゲーム情報取得ブロック - 変数に代入できる動的な値
Blockly.defineBlocksWithJsonArray([
  // ===== プレイヤー情報 =====
  {
    "type": "get_player_name",
    "message0": "プレイヤー名",
    "output": "String",
    "colour": 45,
    "tooltip": "現在のプレイヤーの表示名を取得"
  },
  {
    "type": "get_player_health",
    "message0": "プレイヤー体力",
    "output": "Number",
    "colour": 45,
    "tooltip": "プレイヤーの現在の体力 (0-20)"
  },
  {
    "type": "get_player_max_health",
    "message0": "プレイヤー最大体力",
    "output": "Number",
    "colour": 45,
    "tooltip": "プレイヤーの最大体力"
  },
  {
    "type": "get_player_hunger",
    "message0": "プレイヤー満腹度",
    "output": "Number",
    "colour": 45,
    "tooltip": "プレイヤーの現在の満腹度 (0-20)"
  },
  {
    "type": "get_player_level",
    "message0": "プレイヤーレベル",
    "output": "Number",
    "colour": 45,
    "tooltip": "プレイヤーの経験値レベル"
  },
  {
    "type": "get_player_xp",
    "message0": "プレイヤー経験値(合計)",
    "output": "Number",
    "colour": 45,
    "tooltip": "プレイヤーの合計経験値"
  },
  {
    "type": "get_player_pos",
    "message0": "プレイヤー %1 座標",
    "args0": [
      { "type": "field_dropdown", "name": "AXIS", "options": [
        ["X", "X"], ["Y", "Y"], ["Z", "Z"]
      ]}
    ],
    "output": "Number",
    "colour": 45,
    "tooltip": "プレイヤーのX/Y/Z座標"
  },
  {
    "type": "get_player_gamemode",
    "message0": "プレイヤーのゲームモード名",
    "output": "String",
    "colour": 45,
    "tooltip": "現在のゲームモード (survival/creative/adventure/spectator)"
  },

  // ===== アイテム情報 =====
  {
    "type": "get_held_item_name",
    "message0": "手持ちアイテムの名前",
    "output": "String",
    "colour": 210,
    "tooltip": "メインハンドに持っているアイテムの表示名"
  },
  {
    "type": "get_held_item_id",
    "message0": "手持ちアイテムのID",
    "output": "String",
    "colour": 210,
    "tooltip": "メインハンドに持っているアイテムのID (例: minecraft:diamond)"
  },
  {
    "type": "get_held_item_count",
    "message0": "手持ちアイテムの個数",
    "output": "Number",
    "colour": 210,
    "tooltip": "メインハンドに持っているアイテムのスタック数"
  },
  {
    "type": "get_held_item_durability",
    "message0": "手持ちアイテムの耐久値",
    "output": "Number",
    "colour": 210,
    "tooltip": "メインハンドに持っているアイテムの残り耐久値"
  },
  {
    "type": "get_offhand_item_name",
    "message0": "オフハンドアイテムの名前",
    "output": "String",
    "colour": 210,
    "tooltip": "オフハンドに持っているアイテムの表示名"
  },

  // ===== ワールド情報 =====
  {
    "type": "get_world_time",
    "message0": "ゲーム内時刻(tick)",
    "output": "Number",
    "colour": 120,
    "tooltip": "現在のゲーム内時刻 (0-24000)"
  },
  {
    "type": "get_day_count",
    "message0": "経過日数",
    "output": "Number",
    "colour": 120,
    "tooltip": "ワールドの経過日数"
  },
  {
    "type": "get_weather",
    "message0": "現在の天候",
    "output": "String",
    "colour": 120,
    "tooltip": "clear / rain / thunder のいずれか"
  },
  {
    "type": "get_biome",
    "message0": "プレイヤーのバイオーム名",
    "output": "String",
    "colour": 120,
    "tooltip": "プレイヤーがいるバイオームの名前"
  },
  {
    "type": "get_dimension_name",
    "message0": "現在のディメンション名",
    "output": "String",
    "colour": 120,
    "tooltip": "overworld / the_nether / the_end"
  },
  {
    "type": "get_light_level",
    "message0": "プレイヤー位置の明るさ",
    "output": "Number",
    "colour": 120,
    "tooltip": "プレイヤーがいる場所の光レベル (0-15)"
  },
  {
    "type": "get_block_at_pos",
    "message0": "座標 X%1 Y%2 Z%3 のブロックID",
    "args0": [
      { "type": "input_value", "name": "X", "check": "Number" },
      { "type": "input_value", "name": "Y", "check": "Number" },
      { "type": "input_value", "name": "Z", "check": "Number" }
    ],
    "output": "String",
    "colour": 120,
    "tooltip": "指定座標にあるブロックのIDを取得"
  },

  // ===== サーバー情報 =====
  {
    "type": "get_online_count",
    "message0": "オンラインプレイヤー数",
    "output": "Number",
    "colour": 270,
    "tooltip": "現在サーバーにいるプレイヤーの人数"
  },
  {
    "type": "get_server_tps",
    "message0": "サーバーTPS目安",
    "output": "Number",
    "colour": 270,
    "tooltip": "サーバーの現在のmspt(ミリ秒/tick)からTPS概算"
  },

  // ===== 変数に代入用の複合ブロック =====
  {
    "type": "var_set_from_value",
    "message0": "変数 %1 に %2 を代入",
    "args0": [
      { "type": "field_input", "name": "VAR_NAME", "text": "myVar" },
      { "type": "input_value", "name": "VALUE" }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 330,
    "tooltip": "変数にゲーム情報やブロックの値を代入"
  },
  {
    "type": "var_set_number_from_value",
    "message0": "数値変数 %1 に %2 を代入",
    "args0": [
      { "type": "field_input", "name": "VAR_NAME", "text": "myNum" },
      { "type": "input_value", "name": "VALUE", "check": "Number" }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 330,
    "tooltip": "数値変数にゲーム情報の数値を代入"
  },

  // ===== メッセージに変数を埋め込む =====
  {
    "type": "action_send_message_dynamic",
    "message0": "メッセージ送信 %1 色: %2",
    "args0": [
      { "type": "input_value", "name": "MESSAGE", "check": "String" },
      { "type": "field_dropdown", "name": "COLOR", "options": [
        ["白", "WHITE"],
        ["金色", "GOLD"],
        ["赤", "RED"],
        ["緑", "GREEN"],
        ["青", "AQUA"],
        ["黄色", "YELLOW"],
        ["紫", "LIGHT_PURPLE"]
      ]}
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 0,
    "tooltip": "変数やゲーム情報を含むメッセージを送信"
  },

  // ===== 数値変換 =====
  {
    "type": "number_to_text",
    "message0": "数値→テキスト %1",
    "args0": [
      { "type": "input_value", "name": "NUM", "check": "Number" }
    ],
    "output": "String",
    "colour": 230,
    "tooltip": "数値をテキストに変換"
  },
  {
    "type": "math_operation",
    "message0": "%1 %2 %3",
    "args0": [
      { "type": "input_value", "name": "A", "check": "Number" },
      { "type": "field_dropdown", "name": "OP", "options": [
        ["+", "+"], ["-", "-"], ["x", "*"], ["÷", "/"], ["余り", "%"]
      ]},
      { "type": "input_value", "name": "B", "check": "Number" }
    ],
    "output": "Number",
    "colour": 230,
    "tooltip": "四則演算"
  }
]);
