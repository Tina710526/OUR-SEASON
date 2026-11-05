# OUR SEASON — Agent Guidelines

## 1. 專案目的與世界觀
OUR SEASON（品牌標語：A season that never ends.）是 ZEROBASEONE × ZEROSE 主題的非官方粉絲互動網站。核心概念是屬於九位成員與 ZEROSE 的平行宇宙，情感主軸為「如果還有下一個夏天，我希望我們九個人都在」以及「九個人一直都在，而我們還有下一個季節」。

三個世界不可混淆：
- **OUR SUMMER**：現實世界的資料收藏。只放可核對的真實公開活動、演唱會、專輯與粉絲回憶；新增事件應附來源。
- **FOREVER NINE**：粉絲創作的幸福平行時空。所有故事、日常、對白均須明確標示「粉絲創作／虛構」，不可寫成真實成員發言或真實事件。
- **BEYOND THE STARS**：遊戲化星際世界。九位成員各有一顆星球，探索任務、星星與解鎖故事皆為網站虛構設定。

## 2. 技術架構
- 純 HTML、CSS、JavaScript、JSON；不使用建置工具或伺服器端程式。
- `index.html` 是單頁網站入口；`css/style.css` 負責響應式視覺；`js/app.js` 負責互動、渲染與 LocalStorage；`data/*.json` 保存可擴充內容。
- 使用 `localStorage` 保存玩家星星、探索紀錄、日記、漂流瓶、貼文、按讚與任務進度。
- GitHub Pages 可直接部署本專案根目錄。JSON 透過相對路徑 `fetch()` 載入，因此請使用本機 HTTP server 測試，不要直接以 `file://` 開啟。
- 本版本無登入、無雲端同步；LocalStorage 只存在目前瀏覽器與裝置。清除瀏覽器資料會清除本機進度。

## 3. 資料夾與檔案
- `index.html`：所有頁面區塊、語意結構與互動入口。
- `css/style.css`：色彩 token、版面、元件、手機斷點與動態效果。
- `js/app.js`：資料載入、DOM 渲染、原始事件及本機儲存。
- `js/v2.js`：V2 互動保護層、一次性任務獎勵、故事閱讀及成員星球探索紀錄。
- `data/members.json`：九位成員的固定資料。
- `data/content.json`：世界、時間軸、虛構故事、典藏分類與任務。
- `assets/`：日後放置已取得授權或自行創作的圖片、圖示與字型。
- `AGENTS.md`：專案規格與 AI 協作規範。

## 4. 設計規範
- 介面語言為繁體中文；英文只用於品牌、世界名稱與裝飾標籤。
- 核心色彩：海洋藍 `#5B9BD5`、天空藍 `#A9D8F5`、深宇宙藍 `#263C70`、雲朵白 `#FFFDF7`、薰衣草紫 `#DCD5F7`、陽光黃 `#FFE69A`。
- 視覺融合夏日海洋與夢幻星際：清爽、明亮、青春、溫柔；避免高對比刺眼色彩。
- 必須支援桌面與手機；互動控制需可辨識、可點擊，並提供基本 aria 標籤。
- 動態效果尊重 `prefers-reduced-motion`。
- 不得使用未授權的官方照片、專輯封面、商標素材或音樂。現有視覺以 CSS 原創圖形為主。

## 5. 九位成員固定資料
順序、姓名、韓文名與動物設定不得擅自變更：
1. 金地雄（김지웅）—黑貓
2. 張昊（장하오）—紅熊貓
3. 成韓彬（성한빈）—倉鼠
4. 石馬修（석매튜）—狐狸
5. 金泰來（김태래）—鴨子
6. 朴乾煜（박건욱）—灰色小狗
7. 金奎彬（김규빈）—白色小狗
8. 沈泉銳（리키）—奶牛貓
9. 韓維辰（한유진）—兔子

成員資料放在 `data/members.json`，欄位包含 `id`、`name`、`korean`、`animal`、`emoji`、`planet`、`color`、`desc`、`mission`。新增欄位前須同步更新渲染程式與本文件。

## 6. 新增資料格式
### 世界
```json
{"id":"unique-id","name":"WORLD NAME","title":"繁體中文標題","description":"說明文字","symbol":"✧"}
```
世界 id 僅使用 `summer`、`forever`、`stars`，除非先設計完整新世界流程。

### 時間軸事件（真實資料）
```json
{"date":"YYYY.MM.DD","title":"事件名稱","description":"簡短說明","source":"可核對的官方來源或網址"}
```
只新增已核實事件。不可把推測或粉絲創作放入此清單。

### FOREVER NINE 故事（虛構）
```json
{"tag":"FICTION 04 · CATEGORY","title":"故事標題","body":"故事內容"}
```
每篇故事必須清楚標示為 FICTION／粉絲創作，且不可冒充真實發言、行程或事件。

### 星球／成員任務
星球沿用 `members.json` 的成員項目；任務欄位 `mission` 是玩家可讀的虛構遊戲目標。不可改動成員順序、姓名、韓文名或動物代表。

### 社群貼文
```json
{"id":"unique-id","name":"暱稱","text":"貼文內容","date":"YYYY-MM-DD","likes":0}
```
貼文目前由使用者透過介面建立，存在瀏覽器 LocalStorage，不應硬編碼成真實成員發言。

## 7. AI 修改程式碼必須遵守
1. 先閱讀本文件及相關 JSON／JS，再修改；保留純靜態網站與 GitHub Pages 相容性。
2. 不得擅自更改專案方向、品牌名稱、核心色票、三世界定義或九位成員固定設定。
3. 真實事件與虛構故事必須分開；不得將虛構故事寫成成員真實說過的話。
4. 新增資料沿用既有 JSON 欄位格式；新增欄位需同步更新程式、範例與文件。
5. 使用者輸入內容必須經 HTML escaping 後再插入 DOM，避免 XSS。
6. LocalStorage schema 有變更時，提供向後相容預設值或遷移處理；不要無預警清空玩家資料。
7. 不引入需要 API key 的服務、追蹤器或外部後端，除非使用者明確同意。
8. 避免未授權使用官方圖片、影片、音訊、字型或其他受版權保護素材；優先自行繪製 CSS 圖形或使用已授權素材。
9. 不得聲稱本機貼文可跨裝置同步；若要多人即時社群，需另行設計後端與內容審核。
10. 修改後更新本文件中的架構與操作說明。

## 8. V2 互動規則
- 每位成員星球探索獎勵只可領取一次，紀錄存於 `visitedMembers`。
- 任務只能由對應實際行動完成，不可透過取消勾選重複領取星星；已完成任務存於 `quests`。
- 已閱讀故事存於 `readStories`；閱讀內容必須持續標示為粉絲創作／虛構。
- V2 新增欄位需沿用舊版資料並補上預設值，不可清空 `our-season-v1`。

## 9. 測試
- 使用 `python -m http.server 8000` 啟動本機伺服器，再瀏覽 `http://localhost:8000`。
- 檢查 JSON 是否成功載入、九位成員順序、三個世界入口、星球彈窗、星星領取每日限制、任務勾選、日記、漂流瓶、貼文及按讚。
- 以桌面與手機寬度檢查排版；檢查瀏覽器 Console 是否有錯誤。
- 測試重新整理後 LocalStorage 資料仍存在；使用無痕視窗確認空白初始狀態。
- 變更 `data/*.json` 後，確認 JSON 格式有效。

## 10. GitHub Pages 部署
1. 在 GitHub 建立新 Repository（例如 `our-season`）。
2. 上傳本專案所有檔案與資料夾，確保 `index.html` 位於 Repository 根目錄。
3. 開啟 Repository → Settings → Pages。
4. 在 Build and deployment 選擇 Deploy from a branch；Branch 選 `main`、資料夾選 `/ (root)`，按 Save。
5. 等待 GitHub Pages 完成部署，使用 Pages 顯示的網址開啟。
6. 更新網站時，提交並 push 修改；GitHub Pages 會自動重新部署。
