Blockly.defineBlocksWithJsonArray([
  {
    "type": "register_enchantment",
    "message0": "エンチャントを追加 ID %1 表示名 %2 レア度 %3 最大レベル %4 対象 %5",
    "args0": [
      { "type": "field_input", "name": "ENCH_ID", "text": "swift_mining" },
      { "type": "field_input", "name": "ENCH_NAME", "text": "Swift Mining" },
      { "type": "field_dropdown", "name": "RARITY", "options": [["よく出る", "COMMON"], ["ふつう", "UNCOMMON"], ["レア", "RARE"], ["とてもレア", "VERY_RARE"]] },
      { "type": "field_number", "name": "MAX_LEVEL", "value": 3, "min": 1, "max": 10 },
      { "type": "field_dropdown", "name": "TARGET", "options": [["道具", "DIGGER"], ["武器", "WEAPON"], ["防具", "ARMOR"], ["本", "BREAKABLE"]] }
    ],
    "previousStatement": "event_handler",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 280,
    "tooltip": "基本的なエンチャントを追加します。"
  },
  {
    "type": "register_status_effect",
    "message0": "ステータス効果を追加 ID %1 表示名 %2 色 %3 良い効果 %4",
    "args0": [
      { "type": "field_input", "name": "EFFECT_ID", "text": "focus" },
      { "type": "field_input", "name": "EFFECT_NAME", "text": "Focus" },
      { "type": "field_input", "name": "COLOR", "text": "0x55AAFF" },
      { "type": "field_dropdown", "name": "BENEFICIAL", "options": [["はい", "TRUE"], ["いいえ", "FALSE"]] }
    ],
    "previousStatement": "event_handler",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 280,
    "tooltip": "カスタムのステータス効果を追加します。"
  },
  {
    "type": "register_throwable",
    "message0": "投げるアイテムを追加 ID %1 表示名 %2 ダメージ %3",
    "args0": [
      { "type": "field_input", "name": "ITEM_ID", "text": "magic_orb" },
      { "type": "field_input", "name": "ITEM_NAME", "text": "Magic Orb" },
      { "type": "field_number", "name": "DAMAGE", "value": 6, "min": 0 }
    ],
    "previousStatement": "item_register",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 280,
    "tooltip": "投げて使うアイテムを追加します。"
  },
  {
    "type": "register_container_block",
    "message0": "中身を持てるブロック ID %1 表示名 %2 スロット数 %3",
    "args0": [
      { "type": "field_input", "name": "BLOCK_ID", "text": "gem_chest" },
      { "type": "field_input", "name": "BLOCK_NAME", "text": "Gem Chest" },
      { "type": "field_number", "name": "SIZE", "value": 9, "min": 1, "max": 54 }
    ],
    "previousStatement": "block_register",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 280,
    "tooltip": "インベントリを持つブロックを追加します。"
  },
  {
    "type": "register_sound",
    "message0": "カスタムサウンドを登録 ID %1 ファイル名 %2",
    "args0": [
      { "type": "field_input", "name": "SOUND_ID", "text": "magic_ping" },
      { "type": "field_input", "name": "FILE", "text": "magic_ping" }
    ],
    "previousStatement": "event_handler",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 45,
    "tooltip": "サウンド用の素材管理と組み合わせて使うカスタムサウンドです。"
  },
  {
    "type": "action_play_custom_sound",
    "message0": "カスタムサウンドを再生 %1",
    "args0": [
      { "type": "field_input", "name": "SOUND_ID", "text": "magic_ping" }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 45,
    "tooltip": "登録したカスタムサウンドを再生します。"
  },
  {
    "type": "register_painting",
    "message0": "絵画を追加 ID %1 表示名 %2 横 %3 縦 %4",
    "args0": [
      { "type": "field_input", "name": "PAINTING_ID", "text": "my_painting" },
      { "type": "field_input", "name": "PAINTING_NAME", "text": "My Painting" },
      { "type": "field_number", "name": "WIDTH", "value": 16, "min": 16 },
      { "type": "field_number", "name": "HEIGHT", "value": 16, "min": 16 }
    ],
    "previousStatement": "event_handler",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 45,
    "tooltip": "絵画の素材を追加します。"
  },
  {
    "type": "register_banner_pattern",
    "message0": "旗の模様を追加 ID %1 表示名 %2",
    "args0": [
      { "type": "field_input", "name": "PATTERN_ID", "text": "starfall" },
      { "type": "field_input", "name": "PATTERN_NAME", "text": "Starfall" }
    ],
    "previousStatement": "event_handler",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 45,
    "tooltip": "旗に使う模様を追加します。"
  },
  {
    "type": "register_fluid",
    "message0": "液体を追加 ID %1 表示名 %2 明るさ %3",
    "args0": [
      { "type": "field_input", "name": "FLUID_ID", "text": "glow_water" },
      { "type": "field_input", "name": "FLUID_NAME", "text": "Glow Water" },
      { "type": "field_number", "name": "LUMINANCE", "value": 0, "min": 0, "max": 15 }
    ],
    "previousStatement": "block_register",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 280,
    "tooltip": "液体ブロックの素材を追加します。"
  },
  {
    "type": "register_dimension",
    "message0": "ディメンションを追加 ID %1 表示名 %2 空の色 %3",
    "args0": [
      { "type": "field_input", "name": "DIM_ID", "text": "crystal_realm" },
      { "type": "field_input", "name": "DIM_NAME", "text": "Crystal Realm" },
      { "type": "field_input", "name": "SKY_COLOR", "text": "0x88CCFF" }
    ],
    "previousStatement": "event_handler",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 280,
    "tooltip": "新しいディメンション用の基本素材を追加します。"
  },
  {
    "type": "register_config",
    "message0": "設定カテゴリ %1 中身 %2",
    "args0": [
      { "type": "field_input", "name": "CATEGORY", "text": "general" },
      { "type": "input_statement", "name": "OPTIONS", "check": "config_entry" }
    ],
    "previousStatement": "event_handler",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 280,
    "tooltip": "設定項目のカテゴリを作ります。"
  },
  {
    "type": "config_int",
    "message0": "整数設定 キー %1 初期値 %2",
    "args0": [
      { "type": "field_input", "name": "KEY", "text": "max_level" },
      { "type": "field_number", "name": "DEFAULT", "value": 10 }
    ],
    "previousStatement": "config_entry",
    "nextStatement": "config_entry",
    "colour": 280,
    "tooltip": "整数の設定項目です。"
  },
  {
    "type": "config_bool",
    "message0": "オンオフ設定 キー %1 初期値 %2",
    "args0": [
      { "type": "field_input", "name": "KEY", "text": "enabled" },
      { "type": "field_dropdown", "name": "DEFAULT", "options": [["オン", "TRUE"], ["オフ", "FALSE"]] }
    ],
    "previousStatement": "config_entry",
    "nextStatement": "config_entry",
    "colour": 280,
    "tooltip": "真偽値の設定項目です。"
  },
  {
    "type": "config_double",
    "message0": "小数設定 キー %1 初期値 %2",
    "args0": [
      { "type": "field_input", "name": "KEY", "text": "speed" },
      { "type": "field_number", "name": "DEFAULT", "value": 1.5, "precision": 0.1 }
    ],
    "previousStatement": "config_entry",
    "nextStatement": "config_entry",
    "colour": 280,
    "tooltip": "小数の設定項目です。"
  },
  {
    "type": "config_string",
    "message0": "文字設定 キー %1 初期値 %2",
    "args0": [
      { "type": "field_input", "name": "KEY", "text": "welcome_message" },
      { "type": "field_input", "name": "DEFAULT", "text": "Hello" }
    ],
    "previousStatement": "config_entry",
    "nextStatement": "config_entry",
    "colour": 280,
    "tooltip": "文字列の設定項目です。"
  },
  {
    "type": "get_config_value",
    "message0": "設定値 カテゴリ %1 キー %2",
    "args0": [
      { "type": "field_input", "name": "CATEGORY", "text": "general" },
      { "type": "field_input", "name": "KEY", "text": "enabled" }
    ],
    "output": null,
    "colour": 280,
    "tooltip": "設定の値を取得します。"
  }
]);
