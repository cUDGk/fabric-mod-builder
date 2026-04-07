// MOD settings block
Blockly.defineBlocksWithJsonArray([
  {
    "type": "mod_init",
    "message0": "MODの基本設定 %1 MOD ID %2 表示名 %3 バージョン %4 %5 対応 Minecraft %6 動く場所 %7 %8 チート要素なし %9 %10 中身 %11",
    "args0": [
      { "type": "input_dummy" },
      { "type": "field_input", "name": "MOD_ID", "text": "my_mod" },
      { "type": "field_input", "name": "MOD_NAME", "text": "My Mod" },
      { "type": "field_input", "name": "VERSION", "text": "1.0.0" },
      { "type": "input_dummy" },
      {
        "type": "field_dropdown",
        "name": "MC_VERSION",
        "options": [
          ["26.1.1", "26.1.1"],
          ["26.1", "26.1"],
          ["1.21.11", "1.21.11"],
          ["1.21.8", "1.21.8"],
          ["1.21.6", "1.21.6"],
          ["1.21.5", "1.21.5"],
          ["1.21.4", "1.21.4"],
          ["1.21.3", "1.21.3"],
          ["1.21.2", "1.21.2"],
          ["1.21.1", "1.21.1"],
          ["1.21", "1.21"],
          ["1.20.6", "1.20.6"],
          ["1.20.4", "1.20.4"],
          ["1.20.1", "1.20.1"]
        ]
      },
      {
        "type": "field_dropdown",
        "name": "MOD_SIDE",
        "options": [
          ["両方", "BOTH"],
          ["クライアント専用", "CLIENT"],
          ["サーバー専用", "SERVER"]
        ]
      },
      { "type": "input_dummy" },
      { "type": "field_checkbox", "name": "NO_CHEAT", "checked": false },
      { "type": "input_dummy" },
      {
        "type": "input_statement",
        "name": "CONTENT",
        "check": ["item_register", "block_register", "event_handler", "recipe"]
      }
    ],
    "colour": 270,
    "tooltip": "最初に置くブロックです。MOD ID、表示名、対応バージョン、動く場所をここで決めます。",
    "helpUrl": ""
  }
]);
