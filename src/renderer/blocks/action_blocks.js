// アクションブロック
Blockly.defineBlocksWithJsonArray([
  {
    "type": "action_give_item",
    "message0": "アイテムを付与: %1 個数: %2",
    "args0": [
      { "type": "field_input", "name": "ITEM", "text": "minecraft:diamond" },
      { "type": "field_number", "name": "COUNT", "value": 1, "min": 1, "max": 64 }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 0,
    "tooltip": "プレイヤーにアイテムを付与",
    "helpUrl": ""
  },
  {
    "type": "action_send_message",
    "message0": "メッセージ送信: %1 %2 色: %3",
    "args0": [
      { "type": "field_input", "name": "MESSAGE", "text": "Hello!" },
      { "type": "input_dummy" },
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
    "tooltip": "プレイヤーにメッセージを送信",
    "helpUrl": ""
  },
  {
    "type": "action_play_sound",
    "message0": "サウンド再生: %1 %2 音量: %3 ピッチ: %4",
    "args0": [
      { "type": "field_dropdown", "name": "SOUND", "options": [
        ["レベルアップ", "ENTITY_PLAYER_LEVELUP"],
        ["爆発", "ENTITY_GENERIC_EXPLODE"],
        ["エンダーマンテレポート", "ENTITY_ENDERMAN_TELEPORT"],
        ["金床使用", "BLOCK_ANVIL_USE"],
        ["チェスト開く", "BLOCK_CHEST_OPEN"],
        ["経験値", "ENTITY_EXPERIENCE_ORB_PICKUP"],
        ["食べる", "ENTITY_GENERIC_EAT"],
        ["飲む", "ENTITY_GENERIC_DRINK"],
        ["ウィザー召喚", "ENTITY_WITHER_SPAWN"]
      ]},
      { "type": "input_dummy" },
      { "type": "field_number", "name": "VOLUME", "value": 1.0, "min": 0, "precision": 0.1 },
      { "type": "field_number", "name": "PITCH", "value": 1.0, "min": 0.5, "max": 2.0, "precision": 0.1 }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 0,
    "tooltip": "サウンドを再生",
    "helpUrl": ""
  },
  {
    "type": "action_spawn_particle",
    "message0": "パーティクル生成: %1 %2 個数: %3",
    "args0": [
      { "type": "field_dropdown", "name": "PARTICLE", "options": [
        ["炎", "FLAME"],
        ["煙", "SMOKE"],
        ["ハート", "HEART"],
        ["星", "CRIT"],
        ["魔法", "ENCHANTED_HIT"],
        ["ポータル", "PORTAL"],
        ["爆発", "EXPLOSION"],
        ["雪", "SNOWFLAKE"],
        ["チェリーの葉", "CHERRY_LEAVES"],
        ["ノート", "NOTE"]
      ]},
      { "type": "input_dummy" },
      { "type": "field_number", "name": "COUNT", "value": 10, "min": 1 }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 0,
    "tooltip": "プレイヤーの位置にパーティクルを生成",
    "helpUrl": ""
  },
  {
    "type": "action_teleport",
    "message0": "テレポート: X %1 Y %2 Z %3",
    "args0": [
      { "type": "field_number", "name": "X", "value": 0 },
      { "type": "field_number", "name": "Y", "value": 64 },
      { "type": "field_number", "name": "Z", "value": 0 }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 0,
    "tooltip": "プレイヤーを指定座標にテレポート",
    "helpUrl": ""
  },
  {
    "type": "action_apply_effect",
    "message0": "エフェクト付与: %1 %2 時間(秒): %3 レベル: %4",
    "args0": [
      { "type": "field_dropdown", "name": "EFFECT", "options": [
        ["移動速度", "SPEED"],
        ["移動速度低下", "SLOWNESS"],
        ["採掘速度上昇", "HASTE"],
        ["採掘疲労", "MINING_FATIGUE"],
        ["攻撃力上昇", "STRENGTH"],
        ["即座回復", "INSTANT_HEALTH"],
        ["ジャンプ力上昇", "JUMP_BOOST"],
        ["再生能力", "REGENERATION"],
        ["耐性", "RESISTANCE"],
        ["火炎耐性", "FIRE_RESISTANCE"],
        ["水中呼吸", "WATER_BREATHING"],
        ["透明化", "INVISIBILITY"],
        ["暗視", "NIGHT_VISION"],
        ["発光", "GLOWING"],
        ["浮遊", "LEVITATION"],
        ["幸運", "LUCK"]
      ]},
      { "type": "input_dummy" },
      { "type": "field_number", "name": "DURATION", "value": 10, "min": 1 },
      { "type": "field_number", "name": "AMPLIFIER", "value": 0, "min": 0, "max": 255 }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 0,
    "tooltip": "プレイヤーにポーション効果を付与",
    "helpUrl": ""
  },
  {
    "type": "action_execute_command",
    "message0": "コマンド実行: / %1",
    "args0": [
      { "type": "field_input", "name": "COMMAND", "text": "say Hello" }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 0,
    "tooltip": "サーバーコマンドを実行",
    "helpUrl": ""
  },
  {
    "type": "action_set_block",
    "message0": "ブロック設置: %1 %2 相対X: %3 相対Y: %4 相対Z: %5",
    "args0": [
      { "type": "field_input", "name": "BLOCK", "text": "minecraft:stone" },
      { "type": "input_dummy" },
      { "type": "field_number", "name": "X", "value": 0 },
      { "type": "field_number", "name": "Y", "value": 0 },
      { "type": "field_number", "name": "Z", "value": 0 }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 0,
    "tooltip": "プレイヤーの相対位置にブロックを設置",
    "helpUrl": ""
  },
  {
    "type": "action_explosion",
    "message0": "爆発を生成 威力: %1 火災: %2",
    "args0": [
      { "type": "field_number", "name": "POWER", "value": 4.0, "min": 0, "precision": 0.1 },
      { "type": "field_checkbox", "name": "FIRE", "checked": false }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 0,
    "tooltip": "プレイヤーの位置で爆発を生成",
    "helpUrl": ""
  }
,
  {
    "type": "action_heal",
    "message0": "体力を回復 %1",
    "args0": [
      { "type": "field_number", "name": "AMOUNT", "value": 4, "min": 1 }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 0,
    "tooltip": "プレイヤーの体力を回復します。",
    "helpUrl": ""
  },
  {
    "type": "action_feed",
    "message0": "空腹を回復 %1",
    "args0": [
      { "type": "field_number", "name": "AMOUNT", "value": 4, "min": 1 }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 0,
    "tooltip": "プレイヤーの空腹度を回復します。",
    "helpUrl": ""
  },
  {
    "type": "action_set_gamemode",
    "message0": "ゲームモードを %1 にする",
    "args0": [
      { "type": "field_dropdown", "name": "MODE", "options": [["サバイバル", "SURVIVAL"], ["クリエイティブ", "CREATIVE"], ["アドベンチャー", "ADVENTURE"], ["スペクテイター", "SPECTATOR"]] }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 0,
    "tooltip": "ゲームモードを変更します。",
    "helpUrl": ""
  },
  {
    "type": "action_xp",
    "message0": "経験値を追加 種類 %1 量 %2",
    "args0": [
      { "type": "field_dropdown", "name": "TYPE", "options": [["ポイント", "POINTS"], ["レベル", "LEVELS"]] },
      { "type": "field_number", "name": "AMOUNT", "value": 5 }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 0,
    "tooltip": "経験値ポイントかレベルを追加します。",
    "helpUrl": ""
  },
  {
    "type": "action_clear_effects",
    "message0": "すべての効果を消す",
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 0,
    "tooltip": "プレイヤーのステータス効果をすべて消します。",
    "helpUrl": ""
  }
]);
