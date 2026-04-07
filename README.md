<div align="center">

# FabricMod Visual Builder

### ブロックを組み合わせて Minecraft Fabric MOD を作るデスクトップツール

[![Electron](https://img.shields.io/badge/Electron-41-47848F?style=flat&logo=electron&logoColor=white)](https://www.electronjs.org/)
[![Blockly](https://img.shields.io/badge/Blockly-12-4285F4?style=flat&logo=google&logoColor=white)](https://developers.google.com/blockly)
[![Minecraft](https://img.shields.io/badge/Minecraft-1.20.1--26.1.1-62B47A?style=flat&logo=minecraft&logoColor=white)](https://fabricmc.net/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat)](LICENSE)

**Scratch 風のビジュアルプログラミングで Fabric MOD を設計し、ビルド可能な Gradle プロジェクトとしてエクスポートできます。**

---

</div>

## 概要

FabricMod Visual Builder は、Google Blockly ベースのビジュアルエディタで Minecraft Fabric MOD を組み立てるデスクトップアプリです。Java の知識がなくてもブロックをドラッグ＆ドロップするだけで MOD を設計でき、リアルタイムで Java コードを確認しながら開発できます。

## 特徴

| 機能 | 内容 |
|------|------|
| **ビジュアルエディタ** | Scratch 風のブロック操作で MOD を設計 |
| **235+ ブロック** | アイテム・ブロック・レシピ・イベント・GUI・エンティティ・エンチャントなど |
| **リアルタイムプレビュー** | ブロックを組むと Java コードが即座に生成・表示 |
| **手動編集モード** | 生成されたコードを直接編集することも可能 |
| **Gradle エクスポート** | ビルド可能なプロジェクト一式を出力 (lang / model / blockstate / tag / loot 含む) |
| **ビルドチェック** | ワンクリックで構文検証＋Gradle ビルドテスト |
| **幅広いバージョン対応** | MC 1.20.1 ～ 26.1.1 (14バージョン) |
| **チートなしモード** | テレポート・爆発等のチート系ブロックを制限 |
| **テンプレート** | サンプルプロジェクトからワンクリック開始 |
| **初回ガイド** | チュートリアル付きで初心者でも迷わない |

## ブロックカテゴリ

| カテゴリ | 主なブロック |
|----------|-------------|
| MOD 設定 | MOD ID・MC バージョン選択・チートなし・動作サイド |
| アイテム | 通常 / 食べ物 / ツール / 防具セット / アニメーション付き / ツールチップ |
| ブロック | 通常 / 鉱石 / 階段 / ハーフ / フェンス / ドア / 作物 / 落下 / TNT / 光源 / コンテナ / レッドストーン |
| レシピ | 定型 / 不定形 / 精錬 / 鍛冶台 / 石切台 / 燃料 / コンポスター |
| イベント | アイテム使用 / ブロック破壊・設置・右クリック / 参加 / 死亡 / リスポーン / ダメージ / 攻撃 / 拾い / クラフト / チャット / ディメンション移動 / 睡眠 / tick |
| アクション | メッセージ / サウンド / パーティクル / テレポート / エフェクト / 花火 / 雷 / 属性変更 / インベントリ操作 / ボスバー / 全体アナウンス 等 50+ 種 |
| カスタム GUI | ラベル / ボタン / トグル / スライダー / 入力欄 / ドロップダウン / チェックボックス / タブパネル / プログレスバー / 画像 |
| カスタムモブ | 12 ベースモブ + 10 種 AI 行動 + スポーンエッグ |
| エンチャント・効果 | カスタムエンチャント / ステータスエフェクト / 投擲アイテム |
| 条件 | スニーク / 水中 / 飛行 / バイオーム / 天候 / 権限 / エフェクト有無 / 防具装備 / 座標範囲 等 25+ 種 |
| 変数 | 数値 / 文字列 / フラグ + ゲーム情報取得 30+ 種 |
| 高度な登録 | 液体 / ディメンション / Config / カスタムサウンド / 絵画 / バナーパターン |
| コマンド | カスタムコマンド (引数対応) / ブロードキャスト / タイトル / ボスバー |

## インストール

```bash
git clone https://github.com/s925s/fabric-mod-builder.git
cd fabric-mod-builder
npm install
npm start
```

> 開発モード (DevTools 付き): `npm run dev`

## 使い方

1. 左のツールボックスからブロックをドラッグ＆ドロップ
2. MOD 設定ブロックを配置して ID・名前・MC バージョンを設定
3. アイテム・ブロック・イベント等を組み合わせて MOD を設計
4. 右側のコードプレビューでリアルタイムに Java コードを確認
5. 「エクスポート」でビルド可能な Gradle プロジェクトを出力
6. 「ビルドチェック」で動作確認

### エクスポート後のビルド

```bash
cd exported-mod
gradle build          # Gradle がインストール済みの場合
# または
./gradlew build       # Wrapper 使用時
```

生成された JAR は `build/libs/` に出力されます。

## 対応バージョン

| 番号体系 | バージョン | Java | マッピング |
|----------|-----------|------|-----------|
| 新 (2026~) | 26.1.1, 26.1 | 25 | Mojang |
| 旧 (1.x) | 1.21.11, 1.21.8, 1.21.6, 1.21.5, 1.21.4, 1.21.3, 1.21.2, 1.21.1, 1.21 | 21 | Mojang |
| 旧 (1.x) | 1.20.6 | 21 | Mojang |
| 旧 (1.x) | 1.20.4, 1.20.1 | 17 | Mojang |

## ライセンス

[MIT License](LICENSE) — Copyright (c) 2026 s925s
</div>
