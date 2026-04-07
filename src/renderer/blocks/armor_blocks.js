Blockly.defineBlocksWithJsonArray([
  {
    "type": "register_armor_set",
    "message0": "防具セットを追加 ID 接頭辞 %1 表示名 接頭辞 %2 素材 %3 耐久倍率 %4 エンチャント適性 %5 頭 %6 胴 %7 足 %8 靴 %9",
    "args0": [
      { "type": "field_input", "name": "ID_PREFIX", "text": "ruby" },
      { "type": "field_input", "name": "NAME_PREFIX", "text": "Ruby" },
      { "type": "field_dropdown", "name": "BASE_MATERIAL", "options": [["革", "LEATHER"], ["鉄", "IRON"], ["ダイヤ", "DIAMOND"], ["ネザライト", "NETHERITE"]] },
      { "type": "field_number", "name": "DURABILITY_MULT", "value": 25, "min": 1 },
      { "type": "field_number", "name": "ENCHANTABILITY", "value": 15, "min": 0 },
      { "type": "field_number", "name": "HELMET_DEF", "value": 3, "min": 0, "max": 20 },
      { "type": "field_number", "name": "CHEST_DEF", "value": 8, "min": 0, "max": 20 },
      { "type": "field_number", "name": "LEGS_DEF", "value": 6, "min": 0, "max": 20 },
      { "type": "field_number", "name": "BOOTS_DEF", "value": 3, "min": 0, "max": 20 }
    ],
    "previousStatement": "item_register",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 300,
    "tooltip": "ヘルメット、チェスト、レギンス、ブーツをまとめて追加します。"
  },
  {
    "type": "item_tooltip",
    "message0": "アイテム説明を追加 対象 ID %1 1行目 %2 2行目 %3 3行目 %4 色 %5",
    "args0": [
      { "type": "field_input", "name": "ITEM_ID", "text": "custom_item" },
      { "type": "field_input", "name": "LINE1", "text": "ここに説明文" },
      { "type": "field_input", "name": "LINE2", "text": "" },
      { "type": "field_input", "name": "LINE3", "text": "" },
      { "type": "field_dropdown", "name": "COLOR", "options": [["灰色", "GRAY"], ["水色", "AQUA"], ["緑", "GREEN"], ["金色", "GOLD"], ["赤", "RED"], ["紫", "LIGHT_PURPLE"]] }
    ],
    "previousStatement": "event_handler",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 210,
    "tooltip": "Shift 表示などで見える説明文を追加します。"
  },
  {
    "type": "register_creative_tab",
    "message0": "クリエイティブタブを追加 ID %1 表示名 %2 アイコン %3",
    "args0": [
      { "type": "field_input", "name": "TAB_ID", "text": "my_tab" },
      { "type": "field_input", "name": "TAB_NAME", "text": "My Mod Items" },
      { "type": "field_input", "name": "ICON_ITEM", "text": "custom_item" }
    ],
    "previousStatement": "event_handler",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 270,
    "tooltip": "独自のクリエイティブタブを追加します。"
  },
  {
    "type": "register_ore_gen",
    "message0": "鉱石生成を追加 ブロック ID %1 最小 Y %2 最大 Y %3 1チャンク回数 %4 鉱脈サイズ %5 ディメンション %6",
    "args0": [
      { "type": "field_input", "name": "BLOCK_ID", "text": "custom_ore" },
      { "type": "field_number", "name": "MIN_Y", "value": -64, "min": -64 },
      { "type": "field_number", "name": "MAX_Y", "value": 32, "max": 320 },
      { "type": "field_number", "name": "VEINS_PER_CHUNK", "value": 8, "min": 1, "max": 64 },
      { "type": "field_number", "name": "VEIN_SIZE", "value": 9, "min": 1, "max": 64 },
      { "type": "field_dropdown", "name": "DIMENSION", "options": [["オーバーワールド", "OVERWORLD"], ["ネザー", "NETHER"], ["エンド", "END"]] }
    ],
    "previousStatement": "event_handler",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 120,
    "tooltip": "鉱石が自然生成される設定です。"
  },
  {
    "type": "action_spawn_entity",
    "message0": "エンティティを出す %1 X %2 Y %3 Z %4",
    "args0": [
      { "type": "field_dropdown", "name": "ENTITY", "options": [["ゾンビ", "ZOMBIE"], ["スケルトン", "SKELETON"], ["クリーパー", "CREEPER"], ["クモ", "SPIDER"], ["エンダーマン", "ENDERMAN"], ["ブレイズ", "BLAZE"], ["ウィッチ", "WITCH"], ["村人", "VILLAGER"], ["アイアンゴーレム", "IRON_GOLEM"], ["ニワトリ", "CHICKEN"], ["牛", "COW"], ["豚", "PIG"], ["羊", "SHEEP"], ["オオカミ", "WOLF"], ["猫", "CAT"], ["馬", "HORSE"], ["雷", "LIGHTNING_BOLT"], ["TNT", "TNT"], ["経験値オーブ", "EXPERIENCE_ORB"], ["額縁", "ITEM_FRAME"], ["矢", "ARROW"]] },
      { "type": "field_number", "name": "X", "value": 0 },
      { "type": "field_number", "name": "Y", "value": 0 },
      { "type": "field_number", "name": "Z", "value": 0 }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 0,
    "tooltip": "指定位置にエンティティを出します。"
  },
  {
    "type": "register_advancement",
    "message0": "進捗を追加 ID %1 タイトル %2 説明 %3 アイコン %4 条件 %5 親進捗 ID %6",
    "args0": [
      { "type": "field_input", "name": "ADV_ID", "text": "get_custom_item" },
      { "type": "field_input", "name": "TITLE", "text": "カスタムアイテムを入手" },
      { "type": "field_input", "name": "DESC", "text": "初めてのカスタムアイテム" },
      { "type": "field_input", "name": "ICON", "text": "custom_item" },
      { "type": "field_dropdown", "name": "TRIGGER", "options": [["アイテム入手", "inventory_changed"], ["アイテム使用", "using_item"], ["手動で付与", "impossible"]] },
      { "type": "field_input", "name": "PARENT", "text": "" }
    ],
    "previousStatement": "event_handler",
    "nextStatement": ["item_register", "block_register", "event_handler", "recipe"],
    "colour": 45,
    "tooltip": "実績や進捗を追加します。"
  },
  {
    "type": "action_grant_advancement",
    "message0": "進捗を付与 %1",
    "args0": [
      { "type": "field_input", "name": "ADV_ID", "text": "get_custom_item" }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 45,
    "tooltip": "指定した進捗を付与します。"
  },
  {
    "type": "action_cooldown",
    "message0": "アイテムにクールダウン 対象 %1 秒数 %2",
    "args0": [
      { "type": "field_input", "name": "ITEM", "text": "custom_item" },
      { "type": "field_number", "name": "SECONDS", "value": 5, "min": 1 }
    ],
    "previousStatement": "action",
    "nextStatement": "action",
    "colour": 0,
    "tooltip": "対象アイテムをしばらく使えなくします。"
  }
]);
