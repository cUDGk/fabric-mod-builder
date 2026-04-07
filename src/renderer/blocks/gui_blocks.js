Blockly.defineBlocksWithJsonArray([
  {
    "type": "register_gui_screen",
    "message0": "画面を追加 ID %1 タイトル %2 背景色 %3 幅 %4 高さ %5 部品 %6",
    "args0": [
      { "type": "field_input", "name": "SCREEN_ID", "text": "example_screen" },
      { "type": "field_input", "name": "TITLE", "text": "Example Screen" },
      { "type": "field_input", "name": "BG_COLOR", "text": "0xAA101820" },
      { "type": "field_number", "name": "WIDTH", "value": 256, "min": 64 },
      { "type": "field_number", "name": "HEIGHT", "value": 180, "min": 64 },
      { "type": "input_statement", "name": "ELEMENTS", "check": "gui_element" }
    ],
    "previousStatement": "event_handler",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 315,
    "tooltip": "カスタム画面を追加します。"
  },
  {
    "type": "action_open_gui",
    "message0": "画面を開く %1",
    "args0": [
      { "type": "field_input", "name": "SCREEN_ID", "text": "example_screen" }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 315,
    "tooltip": "指定した画面を開きます。"
  },
  {
    "type": "gui_label",
    "message0": "文字を表示 %1 X %2 Y %3 色 %4 拡大率 %5 影 %6",
    "args0": [
      { "type": "field_input", "name": "TEXT", "text": "Hello" },
      { "type": "field_number", "name": "X", "value": 12 },
      { "type": "field_number", "name": "Y", "value": 12 },
      { "type": "field_input", "name": "COLOR", "text": "0xFFFFFF" },
      { "type": "field_number", "name": "SCALE", "value": 1, "min": 0.5, "precision": 0.1 },
      { "type": "field_dropdown", "name": "SHADOW", "options": [["あり", "TRUE"], ["なし", "FALSE"]] }
    ],
    "previousStatement": "gui_element",
    "nextStatement": "gui_element",
    "colour": 315,
    "tooltip": "通常のテキストを表示します。"
  },
  {
    "type": "gui_label_centered",
    "message0": "中央に文字を表示 %1 Y %2 色 %3",
    "args0": [
      { "type": "field_input", "name": "TEXT", "text": "Title" },
      { "type": "field_number", "name": "Y", "value": 12 },
      { "type": "field_input", "name": "COLOR", "text": "0xFFFFFF" }
    ],
    "previousStatement": "gui_element",
    "nextStatement": "gui_element",
    "colour": 315,
    "tooltip": "画面中央に文字を表示します。"
  },
  {
    "type": "gui_button",
    "message0": "ボタン %1 X %2 Y %3 幅 %4 高さ %5 押したとき %6",
    "args0": [
      { "type": "field_input", "name": "TEXT", "text": "決定" },
      { "type": "field_number", "name": "X", "value": 20 },
      { "type": "field_number", "name": "Y", "value": 40 },
      { "type": "field_number", "name": "W", "value": 80, "min": 20 },
      { "type": "field_number", "name": "H", "value": 20, "min": 20 },
      { "type": "input_statement", "name": "ON_CLICK", "check": "gui_action" }
    ],
    "previousStatement": "gui_element",
    "nextStatement": "gui_element",
    "colour": 315,
    "tooltip": "押せるボタンを置きます。"
  },
  {
    "type": "gui_toggle",
    "message0": "切り替えボタン %1 X %2 Y %3 幅 %4 保存名 %5",
    "args0": [
      { "type": "field_input", "name": "TEXT", "text": "有効化" },
      { "type": "field_number", "name": "X", "value": 20 },
      { "type": "field_number", "name": "Y", "value": 70 },
      { "type": "field_number", "name": "W", "value": 120, "min": 20 },
      { "type": "field_input", "name": "VAR_NAME", "text": "enabled" }
    ],
    "previousStatement": "gui_element",
    "nextStatement": "gui_element",
    "colour": 315,
    "tooltip": "ON/OFF を切り替えるボタンです。"
  },
  {
    "type": "gui_slider",
    "message0": "スライダー %1 X %2 Y %3 幅 %4 最小 %5 最大 %6 初期値 %7 保存名 %8",
    "args0": [
      { "type": "field_input", "name": "LABEL", "text": "音量" },
      { "type": "field_number", "name": "X", "value": 20 },
      { "type": "field_number", "name": "Y", "value": 100 },
      { "type": "field_number", "name": "W", "value": 120, "min": 20 },
      { "type": "field_number", "name": "MIN", "value": 0 },
      { "type": "field_number", "name": "MAX", "value": 100 },
      { "type": "field_number", "name": "DEFAULT", "value": 50 },
      { "type": "field_input", "name": "VAR_NAME", "text": "volume" }
    ],
    "previousStatement": "gui_element",
    "nextStatement": "gui_element",
    "colour": 315,
    "tooltip": "数値を左右で調整できます。"
  },
  {
    "type": "gui_text_field",
    "message0": "文字入力 X %1 Y %2 幅 %3 案内文 %4 保存名 %5",
    "args0": [
      { "type": "field_number", "name": "X", "value": 20 },
      { "type": "field_number", "name": "Y", "value": 130 },
      { "type": "field_number", "name": "W", "value": 120, "min": 20 },
      { "type": "field_input", "name": "PLACEHOLDER", "text": "ここに入力" },
      { "type": "field_input", "name": "VAR_NAME", "text": "text_value" }
    ],
    "previousStatement": "gui_element",
    "nextStatement": "gui_element",
    "colour": 315,
    "tooltip": "テキストを入力できる欄です。"
  },
  {
    "type": "gui_dropdown",
    "message0": "選択リスト X %1 Y %2 幅 %3 候補 %4 保存名 %5",
    "args0": [
      { "type": "field_number", "name": "X", "value": 20 },
      { "type": "field_number", "name": "Y", "value": 160 },
      { "type": "field_number", "name": "W", "value": 120, "min": 20 },
      { "type": "field_input", "name": "OPTIONS", "text": "one,two,three" },
      { "type": "field_input", "name": "VAR_NAME", "text": "selected_value" }
    ],
    "previousStatement": "gui_element",
    "nextStatement": "gui_element",
    "colour": 315,
    "tooltip": "カンマ区切りの候補から1つ選ぶ欄です。"
  },
  {
    "type": "gui_checkbox",
    "message0": "チェックボックス %1 X %2 Y %3 保存名 %4",
    "args0": [
      { "type": "field_input", "name": "TEXT", "text": "同意する" },
      { "type": "field_number", "name": "X", "value": 20 },
      { "type": "field_number", "name": "Y", "value": 190 },
      { "type": "field_input", "name": "VAR_NAME", "text": "agreed" }
    ],
    "previousStatement": "gui_element",
    "nextStatement": "gui_element",
    "colour": 315,
    "tooltip": "オンオフのチェック項目です。"
  },
  {
    "type": "gui_tab_panel",
    "message0": "タブパネル X %1 Y %2 幅 %3 高さ %4 タブ名 %5 保存名 %6",
    "args0": [
      { "type": "field_number", "name": "X", "value": 10 },
      { "type": "field_number", "name": "Y", "value": 30 },
      { "type": "field_number", "name": "W", "value": 220, "min": 40 },
      { "type": "field_number", "name": "H", "value": 120, "min": 40 },
      { "type": "field_input", "name": "TABS", "text": "基本,詳細,その他" },
      { "type": "field_input", "name": "VAR_NAME", "text": "active_tab" }
    ],
    "previousStatement": "gui_element",
    "nextStatement": "gui_element",
    "colour": 315,
    "tooltip": "複数タブを切り替える土台です。"
  },
  {
    "type": "gui_rect",
    "message0": "四角形 X %1 Y %2 幅 %3 高さ %4 色 %5 枠線 %6",
    "args0": [
      { "type": "field_number", "name": "X", "value": 8 },
      { "type": "field_number", "name": "Y", "value": 8 },
      { "type": "field_number", "name": "W", "value": 240, "min": 1 },
      { "type": "field_number", "name": "H", "value": 160, "min": 1 },
      { "type": "field_input", "name": "COLOR", "text": "0xAA202020" },
      { "type": "field_dropdown", "name": "OUTLINE", "options": [["あり", "TRUE"], ["なし", "FALSE"]] }
    ],
    "previousStatement": "gui_element",
    "nextStatement": "gui_element",
    "colour": 315,
    "tooltip": "背景や枠として使える四角形です。"
  },
  {
    "type": "gui_separator",
    "message0": "区切り線 Y %1 色 %2",
    "args0": [
      { "type": "field_number", "name": "Y", "value": 60 },
      { "type": "field_input", "name": "COLOR", "text": "0xFFFFFFFF" }
    ],
    "previousStatement": "gui_element",
    "nextStatement": "gui_element",
    "colour": 315,
    "tooltip": "横線を引きます。"
  },
  {
    "type": "gui_item_display",
    "message0": "アイテム表示 %1 X %2 Y %3",
    "args0": [
      { "type": "field_input", "name": "ITEM", "text": "minecraft:diamond" },
      { "type": "field_number", "name": "X", "value": 20 },
      { "type": "field_number", "name": "Y", "value": 20 }
    ],
    "previousStatement": "gui_element",
    "nextStatement": "gui_element",
    "colour": 315,
    "tooltip": "アイテムの見た目を表示します。"
  },
  {
    "type": "gui_progress_bar",
    "message0": "進捗バー X %1 Y %2 幅 %3 高さ %4 色 %5 保存名 %6",
    "args0": [
      { "type": "field_number", "name": "X", "value": 20 },
      { "type": "field_number", "name": "Y", "value": 50 },
      { "type": "field_number", "name": "W", "value": 120, "min": 1 },
      { "type": "field_number", "name": "H", "value": 10, "min": 1 },
      { "type": "field_input", "name": "COLOR", "text": "0x55FF55" },
      { "type": "field_input", "name": "VAR_NAME", "text": "progress" }
    ],
    "previousStatement": "gui_element",
    "nextStatement": "gui_element",
    "colour": 315,
    "tooltip": "0 から 100 の進捗を表示します。"
  },
  {
    "type": "gui_image",
    "message0": "画像 X %1 Y %2 幅 %3 高さ %4 テクスチャ名 %5",
    "args0": [
      { "type": "field_number", "name": "X", "value": 20 },
      { "type": "field_number", "name": "Y", "value": 20 },
      { "type": "field_number", "name": "W", "value": 32, "min": 1 },
      { "type": "field_number", "name": "H", "value": 32, "min": 1 },
      { "type": "field_input", "name": "TEXTURE", "text": "icon" }
    ],
    "previousStatement": "gui_element",
    "nextStatement": "gui_element",
    "colour": 315,
    "tooltip": "GUI 用テクスチャを表示します。"
  },
  {
    "type": "gui_action_close",
    "message0": "画面を閉じる",
    "previousStatement": "gui_action",
    "nextStatement": "gui_action",
    "colour": 315,
    "tooltip": "今の画面を閉じます。"
  },
  {
    "type": "gui_action_send_command",
    "message0": "コマンドを送る %1",
    "args0": [
      { "type": "field_input", "name": "COMMAND", "text": "say hello" }
    ],
    "previousStatement": "gui_action",
    "nextStatement": "gui_action",
    "colour": 315,
    "tooltip": "プレイヤーがコマンドを送ります。"
  },
  {
    "type": "gui_action_send_chat",
    "message0": "チャット送信 %1",
    "args0": [
      { "type": "field_input", "name": "MESSAGE", "text": "hello" }
    ],
    "previousStatement": "gui_action",
    "nextStatement": "gui_action",
    "colour": 315,
    "tooltip": "プレイヤーがチャットを送ります。"
  },
  {
    "type": "gui_action_play_sound",
    "message0": "効果音を鳴らす %1",
    "args0": [
      { "type": "field_input", "name": "SOUND", "text": "ENTITY_EXPERIENCE_ORB_PICKUP" }
    ],
    "previousStatement": "gui_action",
    "nextStatement": "gui_action",
    "colour": 315,
    "tooltip": "画面操作時に効果音を鳴らします。"
  },
  {
    "type": "gui_action_set_var",
    "message0": "GUI 変数 %1 を %2 にする",
    "args0": [
      { "type": "field_input", "name": "VAR_NAME", "text": "selected_value" },
      { "type": "field_input", "name": "VALUE", "text": "1" }
    ],
    "previousStatement": "gui_action",
    "nextStatement": "gui_action",
    "colour": 315,
    "tooltip": "GUI 内で使う値を更新します。"
  },
  {
    "type": "gui_action_open_screen",
    "message0": "別の画面を開く %1",
    "args0": [
      { "type": "field_input", "name": "SCREEN_ID", "text": "second_screen" }
    ],
    "previousStatement": "gui_action",
    "nextStatement": "gui_action",
    "colour": 315,
    "tooltip": "他の GUI 画面へ切り替えます。"
  }
]);
