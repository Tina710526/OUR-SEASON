/* OUR SEASON V2 — progression and interaction safeguards.
   Loaded after app.js so the original visual system and stored progress remain intact. */
(() => {
  "use strict";

  // Keep existing v1 progress and add only the fields required by V2.
  const user = state.user;
  user.stars = Number.isFinite(Number(user.stars)) ? Math.max(0, Number(user.stars)) : 0;
  for (const key of ["visited", "journals", "bottles", "posts", "likes", "quests", "visitedMembers", "readStories"]) {
    if (!Array.isArray(user[key])) user[key] = [];
  }
  if (typeof user.claimed !== "string") user.claimed = "";

  function completeQuest(index) {
    if (user.quests.includes(index)) return false;
    user.quests.push(index);
    user.stars += 1;
    save();
    renderQuests();
    toast("任務完成！獲得 1 顆星星 ✦");
    return true;
  }

  // Quest cards are completed by real actions, not manually toggled checkboxes.
  window.renderQuests = function renderQuestsV2() {
    const labels = state.content?.quests || [];
    $("questList").innerHTML = labels.map((label, i) => {
      const done = user.quests.includes(i);
      return `<div class="quest-item ${done ? "done" : ""}" aria-label="${done ? "已完成" : "尚未完成"}">
        <span class="quest-status" aria-hidden="true">${done ? "✓" : "✧"}</span>
        <span>${esc(label)}</span>
        <small class="quest-state">${done ? "已完成" : "待完成"}</small>
      </div>`;
    }).join("");
  };

  const originalOpenWorld = window.openWorld;
  window.openWorld = function openWorldV2(id) {
    originalOpenWorld(id);
    completeQuest(0);
  };

  const originalRenderStories = window.renderStories;
  window.renderStories = function renderStoriesV2() {
    originalRenderStories();
    document.querySelectorAll(".daily-card").forEach((card, index) => {
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", "閱讀故事：" + (state.content.stories[index]?.title || ""));
      card.addEventListener("click", () => openStory(index));
      card.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openStory(index);
        }
      });
    });
  };

  function openStory(index) {
    const story = state.content.stories[index];
    if (!story) return;
    $("modalContent").innerHTML = `
      <p class="eyebrow blue">${esc(story.tag)}</p>
      <h3>${esc(story.title)}</h3>
      <p class="fiction-note">粉絲創作・虛構平行時空，非成員真實發言或事件。</p>
      <p class="story-modal-body">${esc(story.body)}</p>
      <button class="button button-primary" id="finishStory">完成閱讀 ✦</button>`;
    $("modalBackdrop").classList.add("open");
    $("modalClose").focus();
    $("finishStory").addEventListener("click", () => {
      if (!user.readStories.includes(index)) user.readStories.push(index);
      save();
      completeQuest(1);
      $("modalBackdrop").classList.remove("open");
    });
  }

  // A member planet can award its exploration star only once per member.
  window.openMember = function openMemberV2(id) {
    const member = state.members.find(item => item.id === id);
    if (!member) return;
    const alreadyVisited = user.visitedMembers.includes(id);
    $("modalContent").innerHTML = `
      <div class="modal-animal">${esc(member.emoji)}</div>
      <p class="eyebrow blue">BEYOND THE STARS · PLANET GUIDE</p>
      <h3>${esc(member.name)} 的 ${esc(member.planet)}</h3>
      <p>${esc(member.korean)} · ${esc(member.animal)}</p>
      <p>${esc(member.desc)}</p>
      <div class="planet-mission"><b>星球探索任務</b><p>${esc(member.mission)}</p></div>
      <p class="fiction-note">此星球設定為 OUR SEASON 的粉絲創作遊戲世界。</p>
      <button class="button button-primary" id="memberExplore" ${alreadyVisited ? "disabled" : ""}>
        ${alreadyVisited ? "已完成探索 ✓" : "完成探索並收集星星 ✦"}
      </button>`;
    $("modalBackdrop").classList.add("open");
    $("modalClose").focus();
    const action = $("memberExplore");
    if (!alreadyVisited) action.addEventListener("click", () => {
      user.visitedMembers.push(id);
      user.stars += 1;
      save();
      completeQuest(2);
      $("modalBackdrop").classList.remove("open");
      toast("已探索 " + member.planet + "，獲得星星！ ✦");
    });
  };

  // Add the journal quest listener after the original submit handler.
  const originalBindEvents = window.bindEvents;
  window.bindEvents = function bindEventsV2() {
    originalBindEvents();
    $("journalForm").addEventListener("submit", () => {
      if ($("journalText").value.trim()) completeQuest(3);
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && $("modalBackdrop").classList.contains("open")) {
        $("modalBackdrop").classList.remove("open");
      }
    });
  };

  // Escape user-controlled content in world detail cards as well.
  const originalWorldDetail = window.openWorld;
  // Existing world labels/descriptions are project JSON, but escape them before DOM insertion.
  window.openWorld = function safeWorldDetail(id) {
    const world = state.content?.worlds.find(item => item.id === id);
    if (!world) return;
    originalWorldDetail(id);
    $("worldDetail").innerHTML = `
      <span class="detail-symbol">${esc(world.symbol)}</span>
      <div><b>${esc(world.name)} — ${esc(world.title)}</b><p>${esc(world.description)}</p></div>
      <span class="detail-count">WORLD UNLOCKED</span>`;
  };
})();
