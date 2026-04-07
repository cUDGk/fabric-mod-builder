# FabricMod Visual Builder - 設計仕様書

## 概要
スクラッチ（Scratch）のようなビジュアルブロックプログラミングで
Minecraft Fabric MODを組み立てて、ビルド可能なJavaプロジェクトとしてエクスポートできるデスクトップアプリ。

## 技術スタック
- **フロントエンド**: Electron 41 + HTML/CSS/JS
- **ブロックエディタ**: Google Blockly 12
- **コード生成**: Blockly → Java ソースコード
- **出力**: Gradle + Fabric Loom プロジェクト一式
- **ターゲット**: Minecraft 1.21.x / Fabric Loader 0.16+ / Fabric API

## アーキテクチャ

```
┌─────────────────────────────────────────┐
│  Electron Main Process                   │
│  - ファイルI/O (保存/読込/エクスポート)   │
│  - Gradleテンプレート展開                │
│  - ダイアログ管理                        │
└──────────┬──────────────────────────────┘
           │ IPC
┌──────────▼──────────────────────────────┐
│  Renderer Process                        │
│  ┌─────────────┐  ┌──────────────────┐  │
│  │  Blockly     │  │  Code Preview    │  │
│  │  Workspace   │  │  (生成Javaコード) │  │
│  │             │  │                  │  │
│  └─────────────┘  └──────────────────┘  │
│  ┌──────────────────────────────────┐   │
│  │  Toolbar: 保存/読込/エクスポート  │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

## ブロックカテゴリ体系

### 1. MOD設定 (紫)
- **mod_init**: MOD初期化ブロック（mod_id, mod_name, version）
  - 全ブロックの親。1ワークスペースに1つ

### 2. アイテム (青)
- **register_item**: カスタムアイテム登録
  - パラメータ: id, name, maxCount, rarity, foodComponent有無
- **item_food**: 食べ物プロパティ
  - パラメータ: hunger, saturation, alwaysEdible
- **item_settings**: アイテム設定
  - maxCount, maxDamage, fireproof

### 3. ブロック (緑)
- **register_block**: カスタムブロック登録
  - パラメータ: id, name, material, hardness, resistance
- **block_settings**: ブロック設定
  - hardness, resistance, luminance, slipperiness
- **register_block_item**: ブロックアイテム登録（ブロックにアイテムを紐付け）

### 4. レシピ (黄)
- **recipe_shaped**: 定型クラフト
  - パターン3行 + 材料マッピング
- **recipe_shapeless**: 不定形クラフト
  - 材料リスト + 結果
- **recipe_smelting**: 精錬レシピ
  - input, output, experience, cookingTime

### 5. イベント (オレンジ)
- **on_player_join**: プレイヤー参加時
- **on_block_break**: ブロック破壊時
- **on_block_place**: ブロック設置時
- **on_entity_death**: エンティティ死亡時
- **on_item_use**: アイテム使用時
- **on_server_tick**: サーバーティック

### 6. アクション (赤)
- **give_item**: アイテムを付与
- **send_message**: メッセージ送信
- **play_sound**: サウンド再生
- **spawn_particle**: パーティクル生成
- **teleport_player**: テレポート
- **set_block**: ブロック設置
- **execute_command**: コマンド実行
- **apply_effect**: エフェクト付与

### 7. 条件 (水色)
- **if_holding_item**: 特定アイテム持ち判定
- **if_sneaking**: スニーク中判定
- **if_dimension**: ディメンション判定
- **if_time**: ゲーム時間判定
- **if_block_at**: 特定座標ブロック判定

### 8. ロジック (灰色)
- **logic_if / logic_ifelse**: 条件分岐
- **logic_compare**: 比較演算
- **logic_and_or**: AND/OR
- **logic_not**: NOT
- **math_number**: 数値
- **text_string**: 文字列
- **math_arithmetic**: 四則演算
- **variables**: 変数 (Blockly組み込み)

## コード生成パイプライン

```
Blockly Workspace
    ↓ (Blockly code generator)
Java Source Code (複数ファイル)
    ↓
Gradle Project Template に配置
    ↓
ZIP or フォルダとしてエクスポート
```

### 生成ファイル構成
```
exported-mod/
├── build.gradle
├── settings.gradle
├── gradle.properties
├── gradle/wrapper/
│   ├── gradle-wrapper.jar
│   └── gradle-wrapper.properties
├── src/main/
│   ├── java/com/modbuilder/{mod_id}/
│   │   ├── {ModName}Mod.java          ← メインクラス
│   │   ├── ModItems.java              ← アイテム登録
│   │   ├── ModBlocks.java             ← ブロック登録
│   │   └── ModEvents.java             ← イベントハンドラ
│   └── resources/
│       ├── fabric.mod.json
│       ├── {mod_id}.mixins.json       ← (必要時のみ)
│       └── data/{mod_id}/
│           └── recipe/                ← レシピJSON
└── gradlew / gradlew.bat
```

## UI レイアウト

```
┌──────────────────────────────────────────────────────┐
│ ■ FabricMod Visual Builder          _ □ ×           │
├────────┬────────────────────┬────────────────────────┤
│Toolbox │                    │  Code Preview          │
│        │    Blockly          │  ┌──────────────────┐ │
│[MOD設定]│    Workspace        │  │ // Generated     │ │
│[アイテム]│                    │  │ // Java code     │ │
│[ブロック]│                    │  │ public class...  │ │
│[レシピ] │                    │  │                  │ │
│[イベント]│                    │  │                  │ │
│[アクション]│                   │  │                  │ │
│[条件]   │                    │  │                  │ │
│[ロジック]│                    │  │                  │ │
│        │                    │  └──────────────────┘ │
├────────┴────────────────────┴────────────────────────┤
│ [💾保存] [📂開く] [▶エクスポート] [📋コードコピー]      │
└──────────────────────────────────────────────────────┘
```

## 保存形式
- `.fmb` (FabricModBuilder) - JSON形式
  - Blocklyワークスペースのシリアライズ
  - プロジェクトメタデータ

## 対応Minecraftバージョン
- 1.21.x (初期対応)
- Fabric Loader 0.16+
- Fabric API (latest)
