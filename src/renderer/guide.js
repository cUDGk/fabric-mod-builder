const SUPPORTED_VERSIONS = [
  '26.1.1',
  '26.1',
  '1.21.11',
  '1.21.8',
  '1.21.6',
  '1.21.5',
  '1.21.4',
  '1.21.3',
  '1.21.2',
  '1.21.1',
  '1.21',
  '1.20.6',
  '1.20.4',
  '1.20.1'
];

const GUIDE_PAGES = [
  {
    title: 'FabricMod Visual Builder へようこそ',
    content: `
      <p><strong>ブロックを組み合わせて</strong> Minecraft Fabric MOD を作るツールです。</p>
      <p>基本の流れは次の 4 ステップです。</p>
      <div class="guide-steps">
        <div class="guide-step"><span class="step-num">1</span><span>左のツールボックスからブロックを配置</span></div>
        <div class="guide-step"><span class="step-num">2</span><span>MOD 設定やアイテム、イベントを組み立てる</span></div>
        <div class="guide-step"><span class="step-num">3</span><span>右側で Java / JSON の生成結果を確認</span></div>
        <div class="guide-step"><span class="step-num">4</span><span>エクスポートして Gradle でビルドする</span></div>
      </div>
    `
  },
  {
    title: '最初にやること',
    content: `
      <div class="guide-example">
        <p><strong>1. MOD 設定ブロック</strong> を置きます。</p>
        <p class="guide-note">MOD ID、表示名、バージョン、対象 Minecraft バージョンを先に決めます。</p>

        <p><strong>2. アイテムやブロック</strong> を追加します。</p>
        <p class="guide-note">登録ブロックは MOD 設定ブロックの中に入れてください。</p>

        <p><strong>3. レシピやイベント</strong> を追加します。</p>
        <p class="guide-note">クラフト、使用時処理、コマンドなどをつなげると挙動が増えます。</p>

        <p><strong>4. エクスポート</strong> します。</p>
        <p class="guide-note">生成先に Gradle プロジェクト一式が出力されます。</p>
      </div>
    `
  },
  {
    title: '対応バージョン',
    content: `
      <p><strong>このビルダーで選択できる対応バージョン一覧です。</strong></p>
      <div class="guide-example">
        <p class="guide-note">新表記系: 26.1.1, 26.1</p>
        <p class="guide-note">1.x 系: ${SUPPORTED_VERSIONS.filter(version => version.startsWith('1.')).join(', ')}</p>
        <p class="guide-note">テンプレート説明欄にも、どのバージョンを前提にしているかを明記しています。</p>
      </div>
    `
  },
  {
    title: '使えるカテゴリ',
    content: `
      <table class="guide-table">
        <tr><td style="color:#aa55ff">MOD 設定</td><td>MOD ID、表示名、バージョン、チート禁止モード</td></tr>
        <tr><td style="color:#5588ff">アイテム</td><td>通常アイテム、食べ物、ツール、防具、アニメーション付きアイテム</td></tr>
        <tr><td style="color:#55aa55">ブロック</td><td>通常ブロック、鉱石、スラブ、階段、ドア、コンテナなど</td></tr>
        <tr><td style="color:#aaaa00">レシピ</td><td>Shaped、Shapeless、精錬、石切り、鍛冶</td></tr>
        <tr><td style="color:#ff8800">イベント</td><td>アイテム使用時、ブロック破壊時、死亡時、tick など</td></tr>
        <tr><td style="color:#ff4444">アクション</td><td>メッセージ送信、エフェクト、パーティクル、音、コマンドなど</td></tr>
        <tr><td style="color:#ff55ff">GUI</td><td>ラベル、ボタン、入力欄、スライダー、一覧表示</td></tr>
        <tr><td style="color:#884400">エンティティ</td><td>カスタムエンティティ、スポーンエッグ、AI</td></tr>
        <tr><td style="color:#8844ff">構造</td><td>ループ、条件分岐、変数操作、バイオーム設定</td></tr>
        <tr><td style="color:#55aaff">数値</td><td>数値、乱数、座標、比較、四則演算</td></tr>
      </table>
    `
  },
  {
    title: 'エクスポートとビルド',
    content: `
      <div class="guide-example">
        <p><strong>出力されるもの</strong></p>
        <pre class="guide-code">my-mod/
├─ build.gradle
├─ gradle.properties
├─ settings.gradle
├─ src/main/java/com/modbuilder/my_mod/
├─ src/main/resources/
└─ gradle/wrapper/</pre>

        <p><strong>ビルドの流れ</strong></p>
        <p class="guide-note">1. JDK をインストールします。</p>
        <p class="guide-note">2. エクスポート先をターミナルで開きます。</p>
        <p class="guide-note">3. Wrapper がある場合は <code>gradlew.bat build</code>、ない場合は <code>gradle build</code> を実行します。</p>
        <p class="guide-note">4. <code>build/libs/</code> に jar が生成されます。</p>
      </div>
    `
  },
  {
    title: 'Tips',
    content: `
      <div class="guide-example">
        <p><strong>テクスチャ</strong></p>
        <p class="guide-note">16x16 PNG を基本にすると確認しやすいです。</p>
        <p class="guide-note">エクスポート後に <code>assets/&lt;modid&gt;/textures/</code> 配下へ追加できます。</p>

        <p><strong>チートなしモード</strong></p>
        <p class="guide-note">強力なアクションやコマンド系ブロックを制限したいときに使います。</p>

        <p><strong>ショートカット</strong></p>
        <p class="guide-note">Ctrl+Z で元に戻す、Ctrl+Y でやり直しです。</p>
        <p class="guide-note">ホイールでズーム、ドラッグで移動できます。</p>
      </div>
    `
  }
];

function showGuide(pageIndex = 0) {
  const existing = document.querySelector('.guide-overlay');
  if (existing) existing.remove();

  const safeIndex = Math.max(0, Math.min(pageIndex, GUIDE_PAGES.length - 1));
  const page = GUIDE_PAGES[safeIndex];
  const overlay = document.createElement('div');
  overlay.className = 'guide-overlay';

  const dots = GUIDE_PAGES.map((_, i) =>
    `<span class="guide-dot ${i === safeIndex ? 'active' : ''}" data-page="${i}"></span>`
  ).join('');

  overlay.innerHTML = `
    <div class="guide-modal">
      <div class="guide-header">
        <h2>${page.title}</h2>
        <button class="guide-close" aria-label="Close guide">&times;</button>
      </div>
      <div class="guide-body">${page.content}</div>
      <div class="guide-footer">
        <div class="guide-dots">${dots}</div>
        <div class="guide-nav">
          ${safeIndex > 0 ? '<button class="guide-prev">前へ</button>' : '<span></span>'}
          ${safeIndex < GUIDE_PAGES.length - 1
            ? '<button class="guide-next">次へ</button>'
            : '<button class="guide-done">閉じる</button>'}
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  overlay.querySelector('.guide-close').addEventListener('click', () => overlay.remove());
  const prev = overlay.querySelector('.guide-prev');
  const next = overlay.querySelector('.guide-next');
  const done = overlay.querySelector('.guide-done');

  if (prev) prev.addEventListener('click', () => showGuide(safeIndex - 1));
  if (next) next.addEventListener('click', () => showGuide(safeIndex + 1));
  if (done) {
    done.addEventListener('click', () => {
      overlay.remove();
      localStorage.setItem('fmb_guide_seen', '1');
    });
  }

  overlay.querySelectorAll('.guide-dot').forEach(dot => {
    dot.addEventListener('click', () => showGuide(Number(dot.dataset.page)));
  });
}

function checkFirstLaunch() {
  if (!localStorage.getItem('fmb_guide_seen')) {
    setTimeout(() => showGuide(0), 500);
  }
}
