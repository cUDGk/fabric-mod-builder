// ===== カスタムエンティティ・モブ =====
Blockly.defineBlocksWithJsonArray([
  {
    "type": "register_custom_entity",
    "message0": "カスタムモブ登録 %1 ID: %2 表示名: %3 %4 ベースモブ: %5 %6 体力: %7 攻撃力: %8 移動速度: %9 %10 スポーン: %11 %12 ドロップ: %13 x %14~%15 %16 AI行動: %17",
    "args0": [
      { "type": "input_dummy" },
      { "type": "field_input", "name": "ENTITY_ID", "text": "custom_mob" },
      { "type": "field_input", "name": "ENTITY_NAME", "text": "Custom Mob" },
      { "type": "input_dummy" },
      { "type": "field_dropdown", "name": "BASE_TYPE", "options": [
        ["ゾンビ系", "ZOMBIE"], ["スケルトン系", "SKELETON"],
        ["クモ系", "SPIDER"], ["クリーパー系", "CREEPER"],
        ["牛系(友好)", "COW"], ["村人系(友好)", "VILLAGER"],
        ["オオカミ系(手懐け可)", "WOLF"], ["鉄ゴーレム系", "IRON_GOLEM"],
        ["ブレイズ系(飛行)", "BLAZE"], ["ガスト系(飛行)", "GHAST"],
        ["スライム系", "SLIME"], ["エンダーマン系", "ENDERMAN"]
      ]},
      { "type": "input_dummy" },
      { "type": "field_number", "name": "HEALTH", "value": 20, "min": 1, "max": 1024 },
      { "type": "field_number", "name": "ATTACK", "value": 3, "min": 0, "max": 100 },
      { "type": "field_number", "name": "SPEED", "value": 0.25, "min": 0.01, "max": 2.0, "precision": 0.01 },
      { "type": "input_dummy" },
      { "type": "field_dropdown", "name": "SPAWN_GROUP", "options": [
        ["モンスター", "MONSTER"], ["動物", "CREATURE"],
        ["水生", "WATER_CREATURE"], ["アンビエント", "AMBIENT"],
        ["なし(手動のみ)", "MISC"]
      ]},
      { "type": "input_dummy" },
      { "type": "field_input", "name": "DROP_ITEM", "text": "custom_item" },
      { "type": "field_number", "name": "DROP_MIN", "value": 0, "min": 0 },
      { "type": "field_number", "name": "DROP_MAX", "value": 2, "min": 0 },
      { "type": "input_dummy" },
      { "type": "input_statement", "name": "AI_GOALS", "check": "ai_goal" }
    ],
    "previousStatement": "event_handler",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 20,
    "tooltip": "カスタムモブを登録。ベースとなるモブの行動を継承し、パラメータを変更できます。"
  },
  // AI Goal ブロック
  {
    "type": "ai_wander",
    "message0": "AI: 徘徊する 速度倍率: %1",
    "args0": [{ "type": "field_number", "name": "SPEED", "value": 1.0, "precision": 0.1 }],
    "previousStatement": "ai_goal", "nextStatement": "ai_goal",
    "colour": 20, "tooltip": "ランダムに歩き回る"
  },
  {
    "type": "ai_attack_melee",
    "message0": "AI: 近接攻撃 速度倍率: %1 追跡距離: %2",
    "args0": [
      { "type": "field_number", "name": "SPEED", "value": 1.0, "precision": 0.1 },
      { "type": "field_number", "name": "RANGE", "value": 16, "min": 1 }
    ],
    "previousStatement": "ai_goal", "nextStatement": "ai_goal",
    "colour": 20, "tooltip": "近接攻撃で敵を攻撃"
  },
  {
    "type": "ai_attack_ranged",
    "message0": "AI: 遠距離攻撃 射程: %1 クールダウン: %2 tick",
    "args0": [
      { "type": "field_number", "name": "RANGE", "value": 15, "min": 1 },
      { "type": "field_number", "name": "COOLDOWN", "value": 40, "min": 1 }
    ],
    "previousStatement": "ai_goal", "nextStatement": "ai_goal",
    "colour": 20, "tooltip": "遠距離攻撃（射撃）"
  },
  {
    "type": "ai_follow_player",
    "message0": "AI: プレイヤーを追跡 距離: %1",
    "args0": [{ "type": "field_number", "name": "RANGE", "value": 32, "min": 1 }],
    "previousStatement": "ai_goal", "nextStatement": "ai_goal",
    "colour": 20, "tooltip": "近くのプレイヤーを追いかける"
  },
  {
    "type": "ai_flee_player",
    "message0": "AI: プレイヤーから逃げる 距離: %1",
    "args0": [{ "type": "field_number", "name": "RANGE", "value": 8, "min": 1 }],
    "previousStatement": "ai_goal", "nextStatement": "ai_goal",
    "colour": 20, "tooltip": "プレイヤーから逃げる"
  },
  {
    "type": "ai_look_at_player",
    "message0": "AI: プレイヤーを見る",
    "previousStatement": "ai_goal", "nextStatement": "ai_goal",
    "colour": 20, "tooltip": "近くのプレイヤーを見つめる"
  },
  {
    "type": "ai_swim",
    "message0": "AI: 泳ぐ",
    "previousStatement": "ai_goal", "nextStatement": "ai_goal",
    "colour": 20, "tooltip": "水中で泳ぐ（溺れない）"
  },
  {
    "type": "ai_explode",
    "message0": "AI: 爆発する 威力: %1 着火時間: %2 tick",
    "args0": [
      { "type": "field_number", "name": "POWER", "value": 3, "min": 1 },
      { "type": "field_number", "name": "FUSE", "value": 30, "min": 1 }
    ],
    "previousStatement": "ai_goal", "nextStatement": "ai_goal",
    "colour": 20, "tooltip": "クリーパーのように近づいて爆発"
  },
  {
    "type": "ai_teleport_random",
    "message0": "AI: ランダムテレポート 確率: %1%%",
    "args0": [{ "type": "field_number", "name": "CHANCE", "value": 10, "min": 1, "max": 100 }],
    "previousStatement": "ai_goal", "nextStatement": "ai_goal",
    "colour": 20, "tooltip": "ランダムにテレポートする（エンダーマン風）"
  },

  // ===== スポーンエッグ =====
  {
    "type": "register_spawn_egg",
    "message0": "スポーンエッグ登録 %1 モブID: %2 %3 メイン色: %4 サブ色: %5",
    "args0": [
      { "type": "input_dummy" },
      { "type": "field_input", "name": "ENTITY_ID", "text": "custom_mob" },
      { "type": "input_dummy" },
      { "type": "field_input", "name": "PRIMARY", "text": "0x333333" },
      { "type": "field_input", "name": "SECONDARY", "text": "0xFF0000" }
    ],
    "previousStatement": "item_register",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 20,
    "tooltip": "カスタムモブのスポーンエッグを登録"
  }
]);
