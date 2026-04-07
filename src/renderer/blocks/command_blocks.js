Blockly.defineBlocksWithJsonArray([
  {
    "type": "register_command",
    "message0": "コマンドを追加 /%1 実行すること %2",
    "args0": [
      { "type": "field_input", "name": "COMMAND", "text": "mymod" },
      { "type": "input_statement", "name": "ACTIONS", "check": "action" }
    ],
    "previousStatement": "event_handler",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 160,
    "tooltip": "引数なしのコマンドを追加します。"
  },
  {
    "type": "register_command_with_arg",
    "message0": "コマンドを追加 /%1 引数名 %2 種類 %3 実行すること %4",
    "args0": [
      { "type": "field_input", "name": "COMMAND", "text": "givecustom" },
      { "type": "field_input", "name": "ARG_NAME", "text": "value" },
      { "type": "field_dropdown", "name": "ARG_TYPE", "options": [["数字", "INTEGER"], ["文字", "STRING"]] },
      { "type": "input_statement", "name": "ACTIONS", "check": "action" }
    ],
    "previousStatement": "event_handler",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 160,
    "tooltip": "1つの引数を受け取るコマンドを追加します。"
  },
  {
    "type": "command_reply",
    "message0": "コマンド実行者にメッセージ %1",
    "args0": [
      { "type": "field_input", "name": "MESSAGE", "text": "実行しました" }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 160,
    "tooltip": "コマンドを実行した相手へ返信します。"
  },
  {
    "type": "command_get_arg_int",
    "message0": "数字の引数",
    "output": "Number",
    "colour": 160,
    "tooltip": "コマンドの数字引数を取得します。"
  },
  {
    "type": "command_get_arg_string",
    "message0": "文字の引数",
    "output": "String",
    "colour": 160,
    "tooltip": "コマンドの文字引数を取得します。"
  },
  {
    "type": "action_broadcast",
    "message0": "全員にチャット表示 %1",
    "args0": [
      { "type": "field_input", "name": "MESSAGE", "text": "サーバーからのお知らせ" }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 160,
    "tooltip": "全プレイヤーへチャットを送ります。"
  },
  {
    "type": "action_title",
    "message0": "タイトル表示 タイトル %1 サブタイトル %2",
    "args0": [
      { "type": "field_input", "name": "TITLE", "text": "達成" },
      { "type": "field_input", "name": "SUBTITLE", "text": "カスタムイベント" }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 160,
    "tooltip": "タイトルとサブタイトルを表示します。"
  },
  {
    "type": "action_actionbar",
    "message0": "アクションバー表示 %1",
    "args0": [
      { "type": "field_input", "name": "MESSAGE", "text": "アクションバーの表示" }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 160,
    "tooltip": "画面下部のアクションバーに表示します。"
  },
  {
    "type": "action_send_actionbar_dynamic",
    "message0": "アクションバー表示 テキスト %1",
    "args0": [
      { "type": "input_value", "name": "TEXT", "check": ["String", "Number", "Boolean"] }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 160,
    "tooltip": "変数や値を使ってアクションバーを表示します。"
  },
  {
    "type": "action_send_title_dynamic",
    "message0": "タイトル表示 タイトル %1 サブタイトル %2",
    "args0": [
      { "type": "input_value", "name": "TITLE", "check": ["String", "Number", "Boolean"] },
      { "type": "input_value", "name": "SUBTITLE", "check": ["String", "Number", "Boolean"] }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 160,
    "tooltip": "変数や値を使ってタイトルを表示します。"
  },
  {
    "type": "action_tablist",
    "message0": "プレイヤー一覧の上下テキスト 上 %1 下 %2",
    "args0": [
      { "type": "field_input", "name": "HEADER", "text": "サーバーへようこそ" },
      { "type": "field_input", "name": "FOOTER", "text": "楽しんでください" }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 160,
    "tooltip": "TAB リストの上部と下部の表示を変えます。"
  },
  {
    "type": "action_bossbar_show",
    "message0": "ボスバーを表示 テキスト %1 色 %2 進み具合 %3 %",
    "args0": [
      { "type": "field_input", "name": "TEXT", "text": "イベント進行中" },
      { "type": "field_dropdown", "name": "COLOR", "options": [["紫", "PURPLE"], ["青", "BLUE"], ["赤", "RED"], ["緑", "GREEN"], ["黄", "YELLOW"], ["白", "WHITE"]] },
      { "type": "field_number", "name": "PROGRESS", "value": 50, "min": 0, "max": 100 }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 160,
    "tooltip": "ボスバーを表示します。"
  },
  {
    "type": "action_bossbar_hide",
    "message0": "ボスバーを隠す",
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 160,
    "tooltip": "表示中のボスバーを隠します。"
  },
  {
    "type": "action_particle_circle",
    "message0": "円形にパーティクル %1 半径 %2 個数 %3",
    "args0": [
      { "type": "field_input", "name": "PARTICLE", "text": "flame" },
      { "type": "field_number", "name": "RADIUS", "value": 2, "min": 0 },
      { "type": "field_number", "name": "COUNT", "value": 24, "min": 1 }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 160,
    "tooltip": "プレイヤーの周りに円形のパーティクルを出します。"
  },
  {
    "type": "action_particle_line",
    "message0": "線形にパーティクル %1 向き X %2 Y %3 Z %4 長さ %5",
    "args0": [
      { "type": "field_input", "name": "PARTICLE", "text": "end_rod" },
      { "type": "field_number", "name": "DX", "value": 1 },
      { "type": "field_number", "name": "DY", "value": 0 },
      { "type": "field_number", "name": "DZ", "value": 0 },
      { "type": "field_number", "name": "LENGTH", "value": 5, "min": 1 }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 160,
    "tooltip": "指定方向へ線状のパーティクルを出します。"
  },
  {
    "type": "loop_repeat",
    "message0": "%1 回くり返す %2",
    "args0": [
      { "type": "field_number", "name": "COUNT", "value": 5, "min": 1 },
      { "type": "input_statement", "name": "ACTIONS", "check": "action" }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 190,
    "tooltip": "中の処理を指定回数くり返します。"
  },
  {
    "type": "action_delay",
    "message0": "%1 tick 待ってから %2",
    "args0": [
      { "type": "field_number", "name": "TICKS", "value": 20, "min": 1 },
      { "type": "input_statement", "name": "ACTIONS", "check": "action" }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 190,
    "tooltip": "指定 tick 後に中の処理を実行します。"
  }
]);
