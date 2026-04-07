// ===== メガ追加ブロック =====
Blockly.defineBlocksWithJsonArray([

  // ═══════════ ボスバー ═══════════
  {
    "type": "action_bossbar_show",
    "message0": "ボスバー表示 %1 テキスト: %2 %3 色: %4 進捗: %5 %%",
    "args0": [
      { "type": "input_dummy" },
      { "type": "field_input", "name": "TEXT", "text": "ボスイベント進行中" },
      { "type": "input_dummy" },
      { "type": "field_dropdown", "name": "COLOR", "options": [
        ["赤", "RED"], ["青", "BLUE"], ["緑", "GREEN"],
        ["黄", "YELLOW"], ["紫", "PURPLE"], ["白", "WHITE"], ["ピンク", "PINK"]
      ]},
      { "type": "field_number", "name": "PROGRESS", "value": 100, "min": 0, "max": 100 }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 300,
    "tooltip": "画面上部にボスバーを表示"
  },
  {
    "type": "action_bossbar_hide",
    "message0": "ボスバーを非表示",
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 300,
    "tooltip": "ボスバーを非表示にする"
  },

  // ═══════════ パーティクル演出 ═══════════
  {
    "type": "action_particle_circle",
    "message0": "円形パーティクル %1 種類: %2 半径: %3 個数: %4",
    "args0": [
      { "type": "input_dummy" },
      { "type": "field_dropdown", "name": "PARTICLE", "options": [
        ["炎", "FLAME"], ["煙", "SMOKE"], ["ハート", "HEART"],
        ["星", "CRIT"], ["魔法", "ENCHANTED_HIT"], ["ポータル", "PORTAL"],
        ["エンドロッド", "END_ROD"], ["ソウルファイア", "SOUL_FIRE_FLAME"],
        ["チェリーの葉", "CHERRY_LEAVES"], ["電気パーティクル", "ELECTRIC_SPARK"]
      ]},
      { "type": "field_number", "name": "RADIUS", "value": 3, "min": 1, "max": 20 },
      { "type": "field_number", "name": "COUNT", "value": 30, "min": 1 }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 300,
    "tooltip": "プレイヤーの周囲に円形のパーティクルを表示"
  },
  {
    "type": "action_particle_line",
    "message0": "直線パーティクル %1 種類: %2 %3 方向: X%4 Y%5 Z%6 長さ: %7",
    "args0": [
      { "type": "input_dummy" },
      { "type": "field_dropdown", "name": "PARTICLE", "options": [
        ["炎", "FLAME"], ["エンドロッド", "END_ROD"],
        ["ソウルファイア", "SOUL_FIRE_FLAME"], ["星", "CRIT"],
        ["電気", "ELECTRIC_SPARK"], ["雪", "SNOWFLAKE"]
      ]},
      { "type": "input_dummy" },
      { "type": "field_number", "name": "DX", "value": 0, "precision": 0.1 },
      { "type": "field_number", "name": "DY", "value": 1, "precision": 0.1 },
      { "type": "field_number", "name": "DZ", "value": 0, "precision": 0.1 },
      { "type": "field_number", "name": "LENGTH", "value": 10, "min": 1 }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 300,
    "tooltip": "直線状にパーティクルを表示"
  },

  // ═══════════ 花火 ═══════════
  {
    "type": "action_firework",
    "message0": "花火を打ち上げ %1 色: %2 形: %3 %4 高さ: %5 きらめき: %6",
    "args0": [
      { "type": "input_dummy" },
      { "type": "field_dropdown", "name": "COLOR", "options": [
        ["赤", "RED"], ["青", "BLUE"], ["緑", "GREEN"],
        ["黄", "YELLOW"], ["紫", "PURPLE"], ["白", "WHITE"],
        ["オレンジ", "ORANGE"], ["水色", "CYAN"]
      ]},
      { "type": "field_dropdown", "name": "SHAPE", "options": [
        ["小さい玉", "SMALL_BALL"], ["大きい玉", "LARGE_BALL"],
        ["星型", "STAR"], ["クリーパー顔", "CREEPER"], ["破裂", "BURST"]
      ]},
      { "type": "input_dummy" },
      { "type": "field_number", "name": "POWER", "value": 2, "min": 0, "max": 5 },
      { "type": "field_checkbox", "name": "TWINKLE", "checked": true }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 300,
    "tooltip": "花火をプレイヤーの位置から打ち上げる"
  },

  // ═══════════ 雷 ═══════════
  {
    "type": "action_lightning",
    "message0": "雷を落とす 相対X%1 相対Z%2 ダメージ: %3",
    "args0": [
      { "type": "field_number", "name": "X", "value": 0 },
      { "type": "field_number", "name": "Z", "value": 0 },
      { "type": "field_checkbox", "name": "DAMAGE", "checked": true }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 0,
    "tooltip": "指定位置に雷を落とす"
  },

  // ═══════════ 属性変更 ═══════════
  {
    "type": "action_modify_attribute",
    "message0": "属性変更 %1 属性: %2 %3 操作: %4 値: %5",
    "args0": [
      { "type": "input_dummy" },
      { "type": "field_dropdown", "name": "ATTRIBUTE", "options": [
        ["最大体力", "GENERIC_MAX_HEALTH"],
        ["移動速度", "GENERIC_MOVEMENT_SPEED"],
        ["攻撃力", "GENERIC_ATTACK_DAMAGE"],
        ["攻撃速度", "GENERIC_ATTACK_SPEED"],
        ["防御力", "GENERIC_ARMOR"],
        ["防具強度", "GENERIC_ARMOR_TOUGHNESS"],
        ["ノックバック耐性", "GENERIC_KNOCKBACK_RESISTANCE"],
        ["幸運", "GENERIC_LUCK"],
        ["リーチ距離", "PLAYER_BLOCK_INTERACTION_RANGE"],
        ["ブロック破壊速度", "PLAYER_BLOCK_BREAK_SPEED"],
        ["ジャンプ力", "GENERIC_JUMP_STRENGTH"],
        ["重力", "GENERIC_GRAVITY"]
      ]},
      { "type": "input_dummy" },
      { "type": "field_dropdown", "name": "OP", "options": [
        ["加算", "ADD"],
        ["倍率加算", "MULTIPLY_BASE"],
        ["倍率乗算", "MULTIPLY_TOTAL"]
      ]},
      { "type": "field_number", "name": "VALUE", "value": 0.1, "precision": 0.01 }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 0,
    "tooltip": "プレイヤーの属性を一時的に変更"
  },

  // ═══════════ インベントリ操作 ═══════════
  {
    "type": "action_clear_inventory",
    "message0": "インベントリをクリア",
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 0,
    "tooltip": "プレイヤーのインベントリを全クリア"
  },
  {
    "type": "action_set_slot",
    "message0": "スロット %1 にアイテムをセット %2 x%3",
    "args0": [
      { "type": "field_dropdown", "name": "SLOT", "options": [
        ["メインハンド", "MAINHAND"],
        ["オフハンド", "OFFHAND"],
        ["ヘルメット", "HEAD"],
        ["チェスト", "CHEST"],
        ["レギンス", "LEGS"],
        ["ブーツ", "FEET"]
      ]},
      { "type": "field_input", "name": "ITEM", "text": "minecraft:diamond_sword" },
      { "type": "field_number", "name": "COUNT", "value": 1, "min": 1, "max": 64 }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 0,
    "tooltip": "装備スロットにアイテムを直接セット"
  },

  // ═══════════ 防具スタンド ═══════════
  {
    "type": "action_spawn_armor_stand",
    "message0": "防具スタンド設置 %1 相対X%2 Y%3 Z%4 %5 名前: %6 (空欄=なし) 見えない: %7",
    "args0": [
      { "type": "input_dummy" },
      { "type": "field_number", "name": "X", "value": 0 },
      { "type": "field_number", "name": "Y", "value": 0 },
      { "type": "field_number", "name": "Z", "value": 0 },
      { "type": "input_dummy" },
      { "type": "field_input", "name": "NAME", "text": "" },
      { "type": "field_checkbox", "name": "INVISIBLE", "checked": false }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 0,
    "tooltip": "防具スタンドを設置する"
  },

  // ═══════════ タブリスト ═══════════
  {
    "type": "action_tablist",
    "message0": "タブリスト設定 %1 ヘッダー: %2 フッター: %3",
    "args0": [
      { "type": "input_dummy" },
      { "type": "field_input", "name": "HEADER", "text": "== My Server ==" },
      { "type": "field_input", "name": "FOOTER", "text": "Players Online" }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 160,
    "tooltip": "TABキーで表示されるプレイヤーリストのヘッダー/フッター"
  },

  // ═══════════ スミステーブルレシピ ═══════════
  {
    "type": "recipe_smithing",
    "message0": "鍛冶台レシピ %1 ベース: %2 追加素材: %3 結果: %4",
    "args0": [
      { "type": "input_dummy" },
      { "type": "field_input", "name": "BASE", "text": "minecraft:diamond_sword" },
      { "type": "field_input", "name": "ADDITION", "text": "custom_item" },
      { "type": "field_input", "name": "RESULT", "text": "custom_sword" }
    ],
    "previousStatement": "recipe",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 60,
    "tooltip": "鍛冶台（スミステーブル）のレシピ"
  },

  // ═══════════ 石切台レシピ ═══════════
  {
    "type": "recipe_stonecutting",
    "message0": "石切台レシピ %1 入力: %2 出力: %3 個数: %4",
    "args0": [
      { "type": "input_dummy" },
      { "type": "field_input", "name": "INPUT", "text": "custom_block" },
      { "type": "field_input", "name": "OUTPUT", "text": "custom_slab" },
      { "type": "field_number", "name": "COUNT", "value": 2, "min": 1 }
    ],
    "previousStatement": "recipe",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 60,
    "tooltip": "石切台のレシピ"
  },

  // ═══════════ イベント追加 ═══════════
  {
    "type": "on_item_pickup",
    "message0": "アイテム拾った時 %1 アイテムID: %2 (空欄=全アイテム) %3 実行: %4",
    "args0": [
      { "type": "input_dummy" },
      { "type": "field_input", "name": "ITEM_ID", "text": "" },
      { "type": "input_dummy" },
      { "type": "input_statement", "name": "ACTIONS", "check": "action" }
    ],
    "previousStatement": "event_handler",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 30,
    "tooltip": "プレイヤーがアイテムを拾った時"
  },
  {
    "type": "on_item_craft",
    "message0": "アイテムクラフト時 %1 アイテムID: %2 (空欄=全アイテム) %3 実行: %4",
    "args0": [
      { "type": "input_dummy" },
      { "type": "field_input", "name": "ITEM_ID", "text": "" },
      { "type": "input_dummy" },
      { "type": "input_statement", "name": "ACTIONS", "check": "action" }
    ],
    "previousStatement": "event_handler",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 30,
    "tooltip": "プレイヤーがアイテムをクラフトした時"
  },
  {
    "type": "on_chat_message",
    "message0": "チャットメッセージ時 %1 実行: %2",
    "args0": [
      { "type": "input_dummy" },
      { "type": "input_statement", "name": "ACTIONS", "check": "action" }
    ],
    "previousStatement": "event_handler",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 30,
    "tooltip": "プレイヤーがチャットでメッセージを送信した時"
  },
  {
    "type": "on_dimension_change",
    "message0": "ディメンション移動時 %1 実行: %2",
    "args0": [
      { "type": "input_dummy" },
      { "type": "input_statement", "name": "ACTIONS", "check": "action" }
    ],
    "previousStatement": "event_handler",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 30,
    "tooltip": "プレイヤーがディメンション間を移動した時（ネザー/エンド等）"
  },
  {
    "type": "on_sleep",
    "message0": "ベッドで寝た時 %1 実行: %2",
    "args0": [
      { "type": "input_dummy" },
      { "type": "input_statement", "name": "ACTIONS", "check": "action" }
    ],
    "previousStatement": "event_handler",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 30,
    "tooltip": "プレイヤーがベッドで寝た時"
  },

  // ═══════════ 条件追加 ═══════════
  {
    "type": "check_has_permission",
    "message0": "権限レベル %1 以上",
    "args0": [
      { "type": "field_dropdown", "name": "LEVEL", "options": [
        ["0 (全員)", "0"], ["1", "1"], ["2 (モデレーター)", "2"],
        ["3 (管理者)", "3"], ["4 (OP)", "4"]
      ]}
    ],
    "output": "Boolean",
    "colour": 190,
    "tooltip": "プレイヤーの権限レベルを判定"
  },
  {
    "type": "check_on_ground",
    "message0": "地面にいる",
    "output": "Boolean",
    "colour": 190,
    "tooltip": "プレイヤーが地面に立っているかどうか"
  },
  {
    "type": "check_in_water",
    "message0": "水中にいる",
    "output": "Boolean",
    "colour": 190,
    "tooltip": "プレイヤーが水中にいるかどうか"
  },
  {
    "type": "check_in_lava",
    "message0": "溶岩の中にいる",
    "output": "Boolean",
    "colour": 190,
    "tooltip": "プレイヤーが溶岩の中にいるかどうか"
  },
  {
    "type": "check_is_flying",
    "message0": "飛んでいる",
    "output": "Boolean",
    "colour": 190,
    "tooltip": "プレイヤーが飛行中かどうか"
  },
  {
    "type": "check_is_sprinting",
    "message0": "ダッシュ中",
    "output": "Boolean",
    "colour": 190,
    "tooltip": "プレイヤーがダッシュ中かどうか"
  },
  {
    "type": "check_is_swimming",
    "message0": "泳いでいる",
    "output": "Boolean",
    "colour": 190,
    "tooltip": "プレイヤーが泳いでいるかどうか"
  },
  {
    "type": "check_has_effect",
    "message0": "%1 のエフェクトがある",
    "args0": [
      { "type": "field_dropdown", "name": "EFFECT", "options": [
        ["移動速度", "SPEED"], ["移動速度低下", "SLOWNESS"],
        ["攻撃力上昇", "STRENGTH"], ["再生能力", "REGENERATION"],
        ["火炎耐性", "FIRE_RESISTANCE"], ["暗視", "NIGHT_VISION"],
        ["透明化", "INVISIBILITY"], ["毒", "POISON"],
        ["ウィザー", "WITHER"], ["発光", "GLOWING"],
        ["浮遊", "LEVITATION"], ["採掘速度上昇", "HASTE"]
      ]}
    ],
    "output": "Boolean",
    "colour": 190,
    "tooltip": "プレイヤーが特定のエフェクトを持っているか"
  },
  {
    "type": "check_item_count",
    "message0": "アイテム %1 を %2 個以上持っている",
    "args0": [
      { "type": "field_input", "name": "ITEM", "text": "minecraft:diamond" },
      { "type": "field_number", "name": "COUNT", "value": 1, "min": 1 }
    ],
    "output": "Boolean",
    "colour": 190,
    "tooltip": "プレイヤーが特定のアイテムを指定数以上持っているか"
  },
  {
    "type": "check_armor_wearing",
    "message0": "%1 スロットに %2 を装備中",
    "args0": [
      { "type": "field_dropdown", "name": "SLOT", "options": [
        ["ヘルメット", "HEAD"], ["チェスト", "CHEST"],
        ["レギンス", "LEGS"], ["ブーツ", "FEET"]
      ]},
      { "type": "field_input", "name": "ITEM", "text": "minecraft:diamond_helmet" }
    ],
    "output": "Boolean",
    "colour": 190,
    "tooltip": "特定の防具を装備しているか判定"
  },

  // ═══════════ 移動・物理 ═══════════
  {
    "type": "action_launch",
    "message0": "プレイヤーを発射 %1 方向X: %2 Y: %3 Z: %4",
    "args0": [
      { "type": "input_dummy" },
      { "type": "field_number", "name": "X", "value": 0, "precision": 0.1 },
      { "type": "field_number", "name": "Y", "value": 1.5, "precision": 0.1 },
      { "type": "field_number", "name": "Z", "value": 0, "precision": 0.1 }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 0,
    "tooltip": "プレイヤーに運動量を加える（吹っ飛ばし）"
  },
  {
    "type": "action_set_velocity",
    "message0": "速度を設定 X: %1 Y: %2 Z: %3",
    "args0": [
      { "type": "field_number", "name": "X", "value": 0, "precision": 0.1 },
      { "type": "field_number", "name": "Y", "value": 0, "precision": 0.1 },
      { "type": "field_number", "name": "Z", "value": 0, "precision": 0.1 }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 0,
    "tooltip": "プレイヤーの速度を直接設定"
  },
  {
    "type": "action_freeze",
    "message0": "プレイヤーを凍結 %1 tick",
    "args0": [
      { "type": "field_number", "name": "TICKS", "value": 100, "min": 1 }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 0,
    "tooltip": "プレイヤーを凍結状態にする（粉雪のような演出）"
  },
  {
    "type": "action_set_fire",
    "message0": "プレイヤーに %1 秒間火をつける",
    "args0": [
      { "type": "field_number", "name": "SECONDS", "value": 5, "min": 1 }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 0,
    "tooltip": "プレイヤーを燃やす"
  },
  {
    "type": "action_extinguish",
    "message0": "火を消す",
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 0,
    "tooltip": "プレイヤーの炎を消火"
  },

  // ═══════════ コミュニケーション ═══════════
  {
    "type": "action_send_actionbar_dynamic",
    "message0": "動的アクションバー %1",
    "args0": [
      { "type": "input_value", "name": "TEXT", "check": "String" }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 160,
    "tooltip": "変数を含むテキストをアクションバーに表示"
  },
  {
    "type": "action_send_title_dynamic",
    "message0": "動的タイトル %1 %2 サブ: %3",
    "args0": [
      { "type": "input_value", "name": "TITLE", "check": "String" },
      { "type": "input_dummy" },
      { "type": "input_value", "name": "SUBTITLE", "check": "String" }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 160,
    "tooltip": "変数を含むタイトルとサブタイトルを表示"
  },

  // ═══════════ チャット情報取得 ═══════════
  {
    "type": "get_chat_message",
    "message0": "チャットメッセージ内容",
    "output": "String",
    "colour": 30,
    "tooltip": "チャットイベントで送信されたメッセージ内容を取得"
  },

  // ═══════════ for each プレイヤー ═══════════
  {
    "type": "action_for_all_players",
    "message0": "全プレイヤーに対して %1 実行: %2",
    "args0": [
      { "type": "input_dummy" },
      { "type": "input_statement", "name": "ACTIONS", "check": "action" }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 190,
    "tooltip": "サーバー上の全プレイヤーに対してアクションを実行"
  },

  // ═══════════ 待機(while系) ═══════════
  {
    "type": "action_schedule",
    "message0": "繰り返し実行 %1 tick毎 %2 %3 回 %4 実行: %5",
    "args0": [
      { "type": "field_number", "name": "INTERVAL", "value": 20, "min": 1 },
      { "type": "input_dummy" },
      { "type": "field_number", "name": "TIMES", "value": 5, "min": 1 },
      { "type": "input_dummy" },
      { "type": "input_statement", "name": "ACTIONS", "check": "action" }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 190,
    "tooltip": "指定間隔で指定回数繰り返し実行"
  },

  // ═══════════ アイテム消費 ═══════════
  {
    "type": "action_consume_item",
    "message0": "アイテム %1 を %2 個消費",
    "args0": [
      { "type": "field_input", "name": "ITEM", "text": "minecraft:diamond" },
      { "type": "field_number", "name": "COUNT", "value": 1, "min": 1 }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 0,
    "tooltip": "プレイヤーのインベントリからアイテムを消費（削除）"
  },

  // ═══════════ 落下ダメージ無効 ═══════════
  {
    "type": "action_no_fall_damage",
    "message0": "落下ダメージを %1 秒間無効化",
    "args0": [
      { "type": "field_number", "name": "SECONDS", "value": 10, "min": 1 }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 0,
    "tooltip": "一時的に落下ダメージを無効化"
  },

  // ═══════════ 空腹速度 ═══════════
  {
    "type": "action_set_saturation",
    "message0": "満腹度を %1 / 飽和度を %2 にセット",
    "args0": [
      { "type": "field_number", "name": "FOOD", "value": 20, "min": 0, "max": 20 },
      { "type": "field_number", "name": "SAT", "value": 5.0, "min": 0, "precision": 0.1 }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 0,
    "tooltip": "満腹度と飽和度を直接設定"
  },

  // ═══════════ マルチブロック配置 ═══════════
  {
    "type": "action_fill_blocks",
    "message0": "ブロック充填 %1 %2 相対 X1%3 Y1%4 Z1%5 X2%6 Y2%7 Z2%8",
    "args0": [
      { "type": "field_input", "name": "BLOCK", "text": "minecraft:stone" },
      { "type": "input_dummy" },
      { "type": "field_number", "name": "X1", "value": -1 },
      { "type": "field_number", "name": "Y1", "value": -1 },
      { "type": "field_number", "name": "Z1", "value": -1 },
      { "type": "field_number", "name": "X2", "value": 1 },
      { "type": "field_number", "name": "Y2", "value": 1 },
      { "type": "field_number", "name": "Z2", "value": 1 }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 0,
    "tooltip": "範囲内をブロックで充填する（fillコマンド相当）"
  },

  // ═══════════ ダメージを与える ═══════════
  {
    "type": "action_damage_player",
    "message0": "プレイヤーに %1 ダメージ (種類: %2)",
    "args0": [
      { "type": "field_number", "name": "AMOUNT", "value": 2, "min": 0.5, "precision": 0.5 },
      { "type": "field_dropdown", "name": "TYPE", "options": [
        ["通常", "GENERIC"],
        ["炎", "ON_FIRE"],
        ["マグマ", "LAVA"],
        ["溺死", "DROWN"],
        ["飢餓", "STARVE"],
        ["落下", "FALL"],
        ["窒息", "IN_WALL"],
        ["奈落", "OUT_OF_WORLD"],
        ["魔法", "MAGIC"],
        ["凍結", "FREEZE"]
      ]}
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 0,
    "tooltip": "プレイヤーにダメージを与える"
  },

  // ═══════════ ゲーム情報追加 ═══════════
  {
    "type": "get_kill_count",
    "message0": "プレイヤーの統計: %1",
    "args0": [
      { "type": "field_dropdown", "name": "STAT", "options": [
        ["プレイ時間(tick)", "PLAY_TIME"],
        ["死亡回数", "DEATHS"],
        ["モブキル数", "MOB_KILLS"],
        ["プレイヤーキル数", "PLAYER_KILLS"],
        ["ジャンプ回数", "JUMP"],
        ["歩いた距離(cm)", "WALK_ONE_CM"],
        ["ダッシュ距離(cm)", "SPRINT_ONE_CM"],
        ["泳いだ距離(cm)", "SWIM_ONE_CM"],
        ["落下距離(cm)", "FALL_ONE_CM"],
        ["飛行距離(cm)", "FLY_ONE_CM"],
        ["食べた回数", "EAT_CAKE_SLICE"],
        ["クラフト回数", "CRAFT_ITEM"]
      ]}
    ],
    "output": "Number",
    "colour": 45,
    "tooltip": "プレイヤーの統計情報を取得"
  },
  {
    "type": "get_entity_count",
    "message0": "半径 %1 以内の %2 の数",
    "args0": [
      { "type": "field_number", "name": "RADIUS", "value": 32, "min": 1 },
      { "type": "field_dropdown", "name": "ENTITY", "options": [
        ["全エンティティ", "ALL"],
        ["モンスター", "MONSTER"],
        ["動物", "ANIMAL"],
        ["プレイヤー", "PLAYER"],
        ["アイテム", "ITEM"]
      ]}
    ],
    "output": "Number",
    "colour": 45,
    "tooltip": "周囲のエンティティ数を取得"
  }
]);
