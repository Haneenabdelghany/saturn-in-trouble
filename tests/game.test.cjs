const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { test } = require("node:test");

const elements = new Map();
function element(selector) {
  if (!elements.has(selector)) elements.set(selector, {
    style: {}, dataset: {}, classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
    querySelector: element, setAttribute() {}, focus() {}, textContent: ""
  });
  return elements.get(selector);
}
const context = vm.createContext({
  console, performance, setTimeout, clearTimeout,
  document: { querySelector: element, querySelectorAll: () => [] },
  localStorage: { getItem: () => null, setItem() {} }
});
const source = fs.readFileSync(path.join(__dirname, "../advanced-game.js"), "utf8");
const indexSource = fs.readFileSync(path.join(__dirname, "../index.html"), "utf8");
const advancedStyleSource = fs.readFileSync(path.join(__dirname, "../advanced-style.css"), "utf8");
const dialogueStyleSource = fs.readFileSync(path.join(__dirname, "../seven-rings.css"), "utf8");
vm.runInContext(source.replace("window.game=new Game();", "globalThis.api={Game,SaveManager,Inventory,MissionManager,World,Player,UIManager,AudioManager,PLANETS,PLANET_DIALOGUES,RING_DIALOGUES,SPACE_REFERENCE,ORDER,DESTINATIONS,ITEMS,MISSIONS,TOOL_WORKFLOWS,SAMPLE_RECORDS,TASK_SCIENCE,SYSTEM_MOONS,JUPITER_FLOW_LAYERS,jupiterFlowState,MARS_GEOLOGY,ATMOSPHERE_PROFILES,AUDIO_PROFILES,AUDIO_LEVELS,EARTH_UNDERWATER_AUDIO,modulateAudioProfile};"), context);
const { Game, SaveManager, Inventory, MissionManager, World, Player, UIManager, AudioManager, PLANETS, PLANET_DIALOGUES, RING_DIALOGUES, SPACE_REFERENCE, ORDER, DESTINATIONS, ITEMS, MISSIONS, TOOL_WORKFLOWS, SAMPLE_RECORDS, TASK_SCIENCE, SYSTEM_MOONS, JUPITER_FLOW_LAYERS, jupiterFlowState, MARS_GEOLOGY, ATMOSPHERE_PROFILES, AUDIO_PROFILES, AUDIO_LEVELS, EARTH_UNDERWATER_AUDIO, modulateAudioProfile } = context.api;

function makeGame(id = "mercury") {
  const game = Object.create(Game.prototype);
  game.state = SaveManager.defaults();
  game.state.location = id;
  game.state.started = true;
  game.planet = PLANETS[id];
  game.inventory = new Inventory(game);
  game.missions = new MissionManager(game);
  game.world = new World(id);
  game.missions.configure(game.world);
  game.player = new Player();
  game.player.reset(game.planet.mode);
  game.camera = { x: 0, y: 0, zoom: 1, shake: 0, follow() {} };
  game.audio = { play() {}, playStep() {}, playTool() {}, playToolPhase() {}, tone() {}, stop() {}, setEnvironment() {}, updateAmbience() {} };
  game.ui = { toast() {}, open() {}, close() { game.paused = false; game.dialogue = null; }, ring() {}, toolAction(step, science) { game.pendingToolAction = { step, science }; game.paused = true; }, toolResult(step, science) { game.toolResult = { step, science }; game.paused = true; }, planetIntro() { game.paused = true; }, saturnFinal() { game.finalDialogueShown = true; game.paused = true; }, locked: false };
  game.save = () => {};
  game.updateHUD = () => {};
  game.clearInput = () => {};
  game.keys = {};
  game.paused = false;
  return game;
}

test("save migration rejects invalid or duplicate progress", () => {
  const state = SaveManager.normalize({ rings: ["mars", "mars", "moon", "invalid"], inventory: ["invalid"], oxygen: -40, positions: { mars: { x: "bad", y: 3 } }, complete: true });
  assert.equal(state.rings.join(), "mars");
  assert.equal(state.oxygen, 0);
  assert.equal(state.complete, false);
  assert.equal(Object.keys(state.positions).length, 0);
  assert.equal(state.inventory.length, 1);
});

test("save schema discards obsolete fields and invalid flags", () => {
  const state = SaveManager.normalize({ obsoleteMeter: 42, started: "yes", sound: {}, earthOceanReaction: "yes", solved: ["mars"], scanned: ["mars"], inventory: ["tether", "scanner", "camera"], rings: ["mars"] });
  assert.equal(Object.hasOwn(state, "obsoleteMeter"), false);
  assert.equal(Object.hasOwn(state, "solved"), false);
  assert.equal(Object.hasOwn(state, "scanned"), false);
  assert.equal(state.inventory.includes("tether"), false);
  assert.equal(state.inventory.includes("scanner"), false);
  assert.equal(state.equipped, "camera");
  assert.equal(state.started, false);
  assert.equal(state.sound, true);
  assert.equal(state.earthOceanReaction, false);
  assert.equal(Object.hasOwn(state, "trainingStage"), false);
  assert.equal(Object.hasOwn(state, "trainingSkills"), false);
  assert.equal(state.rings.join(), "mars");
});

test("modal and dialogue layers remain above non-interactive toasts", () => {
  const modalZ = Number(advancedStyleSource.match(/\.modal\{z-index:(\d+)/)?.[1]);
  const toastZ = Number(advancedStyleSource.match(/\.toast\{z-index:(\d+)/)?.[1]);
  assert.ok(Number.isFinite(modalZ) && Number.isFinite(toastZ) && modalZ > toastZ);
  assert.match(dialogueStyleSource, /\.toast\s*\{[^}]*pointer-events:\s*none/);
});

test("mobile controls expose pause and safe touch targets", () => {
  assert.match(indexSource, /name="viewport"[^>]*viewport-fit=cover/);
  assert.match(indexSource, /id="pause-btn"[^>]*aria-label=/);
  assert.match(source, /\$\("#pause-btn"\)\.onclick=\(\)=>this\.ui\.pause\(\)/);
  assert.match(dialogueStyleSource, /\.modal-close\s*\{[^}]*min-width:\s*44px;[^}]*min-height:\s*44px/);
  assert.match(dialogueStyleSource, /\.tech-button\s*\{[^}]*min-height:\s*44px/);
  assert.match(dialogueStyleSource, /safe-area-inset-bottom/);
  assert.match(dialogueStyleSource, /@media \(max-width: 600px\) and \(orientation: portrait\)[\s\S]*grid-template-columns: repeat\(4, minmax\(44px, 1fr\)\)/);
  assert.match(dialogueStyleSource, /#pause-btn \{ grid-column: 4; grid-row: 2; \}/);
  assert.match(dialogueStyleSource, /#backpack-btn b, #map-btn b, #journal-btn b, #pause-btn b \{[\s\S]*display: block/);
  assert.match(dialogueStyleSource, /@media \(max-width: 600px\) and \(orientation: portrait\)[\s\S]*\.objective-panel \{[\s\S]*top: calc\(var\(--mobile-hud-top\) \+ 93px\)/);
  assert.match(dialogueStyleSource, /\.canvas-touch \{[\s\S]*left: auto;[\s\S]*right: max\(8px, env\(safe-area-inset-right\)\);[\s\S]*width: 144px;[\s\S]*height: 138px/);
  assert.match(dialogueStyleSource, /\.canvas-touch button:nth-child\(3\) \{[^}]*left: 44px;[^}]*top: 0;[^}]*width: 56px; height: 44px/);
  assert.match(dialogueStyleSource, /\.interaction-prompt \{[\s\S]*bottom: calc\(220px \+ env\(safe-area-inset-bottom\)\)[\s\S]*max-width: calc\(100% - 176px\)/);
  assert.match(dialogueStyleSource, /@media \(orientation: landscape\) and \(max-height: 520px\) and \(min-width: 500px\) and \(max-width: 950px\)[\s\S]*width: min\(100vw, calc\(100dvh \* 16 \/ 9\)\)/);
  assert.match(dialogueStyleSource, /@media \(orientation: landscape\) and \(max-height: 520px\) and \(min-width: 500px\) and \(max-width: 950px\)[\s\S]*overflow: visible/);
  assert.match(dialogueStyleSource, /@media \(orientation: landscape\) and \(max-height: 520px\) and \(min-width: 500px\) and \(max-width: 950px\)[\s\S]*\.canvas-touch \{[\s\S]*left: auto;[\s\S]*right: calc\(max\(15px, env\(safe-area-inset-right\)\) - \(\(100vw - 100%\) \/ 2\)\);[\s\S]*height: 138px/);
});

test("all tools fit across six carried slots and overflow locker", () => {
  const game = makeGame();
  for (const id of Object.keys(context.api.ITEMS)) game.inventory.acquire(id);
  assert.ok(game.state.inventory.length <= 6);
  assert.equal(new Set([...game.state.inventory, ...game.state.locker]).size, Object.keys(context.api.ITEMS).length);
  for (const id of ORDER) {
    game.planet = PLANETS[id];
    assert.equal(game.inventory.equip(game.planet.tool), true);
    assert.ok(game.state.inventory.length <= 6);
  }
});

test("exploring on foot records the trace, once, away from the ship", () => {
  const game = makeGame();
  game.observeNearby();
  assert.equal(game.state.observations.length, 0);
  Object.assign(game.player, { x: game.world.ship.x, y: game.world.ship.y });
  game.observeNearby();
  assert.equal(game.state.observations.length, 0);
  Object.assign(game.player, { x: game.world.observation.x, y: game.world.observation.y });
  game.observeNearby();
  game.observeNearby();
  assert.equal(game.state.observations.join(), "mercury");
});

test("meaningful exploration records one discovery without changing rings", () => {
  const game = makeGame("mercury");
  let saves = 0;
  game.save = () => { saves++; };
  game.observeNearby();
  assert.equal(game.state.discoveries.length, 0);
  Object.assign(game.player, { x: game.world.observation.x, y: game.world.observation.y });
  game.observeNearby();
  assert.equal(game.state.discoveries.join(), "mercury");
  assert.equal(game.state.rings.length, 0);
  assert.equal(game.discoveryMoment.id, "mercury");
  assert.equal(saves, 1);
  game.observeNearby();
  assert.equal(saves, 1);
  game.updateDiscoveryMoment(5.1);
  assert.equal(game.discoveryMoment, null);
  assert.equal(SaveManager.normalize(game.state).discoveries.join(), "mercury");
});

test("Mission Log includes the supplied space and astronaut reference", () => {
  assert.equal(SPACE_REFERENCE.length, 5);
  const reference = SPACE_REFERENCE.flatMap(section => [section.title, ...section.entries.flat()]).join(" ");
  for (const fact of [
    /المجرة.*مليارات النجوم/,
    /ثمانية كواكب/,
    /1957.*سبوتنيك 1/,
    /1961.*يوري جاجارين/,
    /1969.*نيل أرمسترونج/,
    /ثماني ساعات.*كيس نوم/,
    /الرياضة.*ساعتين/,
    /زحل الحقيقي.*29\.5 سنة/,
    /293 قمرًا/,
    /بايونير 11.*1979/
  ]) assert.match(reference, fact);

  const game = makeGame("mercury"), ui = new UIManager(game);
  game.ui = ui;
  ui.journal();
  assert.match(ui.content.innerHTML, /space-reference/);
  assert.equal((ui.content.innerHTML.match(/class="reference-group"/g) || []).length, SPACE_REFERENCE.length);
  assert.match(ui.content.innerHTML, /دليل الفضاء ورائد الفضاء/);
  assert.match(dialogueStyleSource, /\.reference-group > div \{ display: grid;/);
  assert.match(dialogueStyleSource, /@media \(max-width: 600px\)[\s\S]*\.reference-group > div \{ grid-template-columns: 1fr;/);
});

test("ring discovery requires the planet clue, field work and proximity", () => {
  const game = makeGame();
  game.discoverRing();
  assert.equal(game.pendingRing, undefined);
  for (const step of game.world.steps) game.state.missionSteps.push(step.key);
  game.state.conversations.push("mercury");
  game.discoverRing();
  assert.equal(game.pendingRing, undefined);
  Object.assign(game.player, { x: game.world.ring.x, y: game.world.ring.y });
  game.discoverRing();
  assert.equal(game.pendingRing, "mercury");
});

test("camera photography remains optional for story-ring recovery", () => {
  const game = makeGame("mars");
  game.state.conversations.push("mars");
  game.state.missionSteps.push(...game.world.steps.map(step => step.key));
  game.state.scienceLogged = [];
  game.state.equipped = "camera";
  assert.equal(game.missions.canReveal(), true);
  game.state.equipped = "repair";
  assert.equal(game.missions.canReveal(), true);
});

for (const id of DESTINATIONS) {
  test(`${id}: field work and camera lead to exactly one reward`, () => {
    const game = makeGame(id);
    game.state.conversations.push(id);
    game.inventory.acquire(game.planet.tool);
    game.inventory.equip(game.planet.tool);
    for (const step of game.world.steps) {
      game.inventory.acquire(step.tool);
      game.inventory.equip(step.tool);
      Object.assign(game.player, { x: step.x, y: step.y });
      game.missions.useStep(step);
      assert.equal(game.state.missionSteps.includes(step.key), false);
      assert.equal(game.pendingToolAction.step.key, step.key);
      game.beginToolAction(step.key);
      assert.equal(game.cinematic.type, "tool");
      game.updateCinematic(game.cinematic.duration + .1);
      assert.equal(game.toolResult.step.key, step.key);
      assert.equal(game.state.missionSteps.includes(step.key), true);
      const score = game.state.knowledge;
      game.missions.useStep(step);
      assert.equal(game.state.knowledge, score);
      game.ui.close();
    }
    game.inventory.equip("camera");
    Object.assign(game.player, { x: game.world.science[0].x, y: game.world.science[0].y });
    game.interact();
    assert.equal(game.state.scienceLogged.includes(id), true);
    if (game.planet.hasRing) {
      assert.equal(game.missions.canReveal(), true);
      Object.assign(game.player, { x: game.world.ring.x, y: game.world.ring.y });
      game.discoverRing();
      game.confirmRing();
      assert.equal(game.state.rings.length, 0);
      game.confirmRing();
      game.updateCinematic(1.5);
      game.confirmRing();
      assert.equal(game.state.rings.join(), id);
      assert.equal(game.state.explored.join(), id);
    } else {
      assert.equal(game.state.rings.length, 0);
      game.completeNoRing();
      const score = game.state.knowledge;
      game.completeNoRing();
      assert.equal(game.state.knowledge, score);
      assert.equal(game.state.explored.join(), id);
    }
    const restored = SaveManager.normalize(JSON.parse(JSON.stringify(game.state)));
    assert.equal(restored.rings.length, game.state.rings.length);
    assert.equal(restored.knowledge, game.state.knowledge);
  });
}

test("every field task explains its subject, action, result and meaning", () => {
  const keys = DESTINATIONS.flatMap(id => makeGame(id).world.steps.map(step => step.key));
  assert.equal(keys.length, 18);
  for (const key of keys) {
    const science = TASK_SCIENCE[key];
    for (const field of ["subject", "measure", "result", "meaning", "button"]) assert.ok(science[field], `${key}: missing ${field}`);
  }
  assert.equal(TASK_SCIENCE["venus:0"].sample, "شظية بركانية");
  const venusTasks = makeGame("venus").world.steps.map(step => step.label).join(" ");
  assert.match(venusTasks, /شظية|الحاوية/);
  assert.doesNotMatch(venusTasks, /المسبار/);
});

test("seven rings require a physical return and timed restoration", () => {
  const game = makeGame("neptune");
  game.state.rings = ORDER.filter(id => PLANETS[id].hasRing);
  game.finish();
  game.restoreSaturn();
  assert.equal(game.state.complete, false);
  game.state.location = "saturn";
  game.planet = PLANETS.saturn;
  game.world = new World("saturn");
  game.showScreen = () => {};
  game.player.x = 2500;
  game.restoreSaturn();
  assert.equal(game.cinematic, undefined);
  Object.assign(game.player, { x: game.world.ship.x, y: game.world.ship.y });
  game.restoreSaturn();
  game.finish();
  assert.equal(game.state.complete, false);
  game.updateCinematic(3);
  assert.equal(game.state.complete, false);
  game.updateCinematic(.9);
  assert.equal(game.finalDialogueShown, true);
  assert.equal(game.state.complete, false);
  for(let line=0;line<8;line++)game.advanceSaturnFinal(8);
  assert.equal(game.cinematic.type, "finale");
  assert.equal(game.state.complete, false);
  game.updateCinematic(4.1);
  assert.equal(game.state.complete, true);
});

test("the seventh ring automatically flies through Free Space into Saturn restoration", () => {
  const game = makeGame("neptune");
  game.state.rings = ORDER.filter(id => PLANETS[id].hasRing);
  game.viewWidth = 1366;
  game.viewHeight = 900;
  game.beginFinalReturn();
  game.updateCinematic(2.1);
  assert.equal(game.state.location, "space");
  assert.equal(game.waypoint, "saturn");
  assert.equal(game.cinematic.type, "return");
  assert.equal(game.cinematic.phase, "flight");
  assert.equal(game.paused, true);
  assert.equal(game.state.complete, false);
  const start = { x: game.player.x, y: game.player.y };
  game.updateCinematic(2.75);
  assert.equal(game.state.location, "space");
  assert.ok(Math.hypot(game.player.x - start.x, game.player.y - start.y) > 100, "automatic flight did not move the spacecraft");
  assert.equal(game.paused, true);
  game.updateCinematic(2.75);
  assert.equal(game.state.location, "saturn");
  assert.equal(game.state.finalReturnPending, false);
  assert.equal(game.cinematic.type, "restoration");
  assert.equal(game.paused, true);
  assert.ok(Math.hypot(game.player.x - game.world.ship.x, game.player.y - game.world.ship.y) < 165);
  assert.equal(game.player.x, game.world.ship.x);
  assert.equal(game.player.y, game.world.ship.y);
  assert.equal(Object.hasOwn(game.world, "saturnPlatform"), false);
  game.updateCinematic(3.9);
  assert.equal(game.finalDialogueShown, true);
  assert.equal(game.state.complete, false);
});

test("final Home preserves completion while Play Again resets mission state", () => {
  const game = makeGame("saturn");
  game.state.rings = ORDER.filter(id => PLANETS[id].hasRing);
  game.state.complete = true;
  game.state.knowledge = 123;
  let restores = 0;
  game.restore = () => { restores++; };
  game.home();
  assert.equal(restores, 1);
  assert.equal(game.state.complete, true);
  assert.equal(game.state.rings.length, 7);
  assert.equal(game.state.knowledge, 123);
  const reset = SaveManager.reset;
  SaveManager.reset = () => true;
  try { game.resetMission(true); } finally { SaveManager.reset = reset; }
  assert.equal(restores, 2);
  assert.equal(game.state.complete, false);
  assert.equal(game.state.started, false);
  assert.equal(game.state.location, "base");
  assert.equal(game.state.rings.length, 0);
  assert.equal(game.state.knowledge, 0);
});

test("Free Space camera eases closer only during a planet approach", () => {
  const game = makeGame("space");
  game.viewWidth = 1366;
  game.viewHeight = 900;
  game.camera.zoom = Math.min(game.viewWidth / game.world.width, game.viewHeight / game.world.height) * .92;
  const farZoom = game.camera.zoom;
  const saturn = game.world.planetNodes.find(node => node.id === "saturn");
  Object.assign(game.player, { x: saturn.x + saturn.radius + 120, y: saturn.y });
  game.updateSpaceApproach(.5);
  assert.ok(game.camera.zoom > farZoom);
  assert.ok(game.camera.zoom < .68);
  assert.equal(game.state.location, "space");
});

test("Free Space acceleration and coast-down preserve gentle inertia", () => {
  const game = makeGame("space");
  game.keys.arrowright = true;
  game.player.update(game, .5);
  const acceleratingSpeed = game.player.vx;
  assert.ok(acceleratingSpeed > 0 && acceleratingSpeed < 340);
  game.keys.arrowright = false;
  game.player.update(game, .5);
  assert.ok(game.player.vx > 0);
  assert.ok(game.player.vx < acceleratingSpeed);
  game.keys.arrowleft = true;
  game.player.update(game, .1);
  assert.ok(game.player.vx > 0);
});

test("flight entry requires proximity but no completed tutorial", () => {
  const game = makeGame("space");
  let transition = null;
  game.transition = id => { transition = id; };
  game.selectDestination("neptune");
  assert.equal(transition, null);
  assert.equal(game.waypoint, "neptune");
  const node = game.world.planetNodes.find(node => node.id === "neptune");
  Object.assign(game.player, { x: node.x, y: node.y });
  game.state.trainingComplete = false;
  game.selectDestination("neptune");
  assert.equal(transition, "neptune");
});

test("mission acceptance opens free flight without a modal", () => {
  const game = makeGame("space");
  game.state = SaveManager.defaults();
  const screens = [];
  game.showScreen = name => screens.push(name);
  game.ui.open = () => assert.fail("Opening must not show an intermediate modal");
  game.viewWidth = 1366;
  game.viewHeight = 900;
  game.start();
  assert.equal(screens.join(), "game");
  assert.equal(game.state.location, "space");
  assert.equal(game.world.planetNodes.length, 9);
  assert.equal(game.paused, false);
  const visible = object => {
    const x = (object.x - game.camera.x) * game.camera.zoom;
    const y = (object.y - game.camera.y) * game.camera.zoom;
    return x >= 0 && x <= game.viewWidth && y >= 0 && y <= game.viewHeight;
  };
  assert.equal(visible(game.world.sun), true);
  assert.equal(game.world.planetNodes.every(visible), true);
  assert.equal(visible(game.player), true);
});

test("old training saves resume in space without losing rings", () => {
  const game = makeGame("space");
  game.state = SaveManager.normalize({ started: true, location: "training", trainingComplete: false, rings: ["mars"] });
  assert.equal(game.state.location, "space");
  assert.equal(Object.hasOwn(game.state, "trainingComplete"), false);
  game.showScreen = () => {};
  game.ui.open = () => assert.fail("Resume must not open a tutorial");
  game.viewWidth = 1366;
  game.viewHeight = 900;
  game.start();
  assert.equal(game.state.location, "space");
  assert.equal(game.state.rings.join(), "mars");
});

test("existing Moon-start saves migrate to free space without losing progress", () => {
  const state = SaveManager.normalize({ version: 6, started: true, location: "moon", rings: ["mars"], visited: ["moon", "mars"] });
  assert.equal(state.location, "space");
  assert.equal(state.rings.join(), "mars");
  assert.equal(state.visited.join(), "moon,mars");
  assert.equal(state.version, 9);
});

test("arrow movement, buffered jumps and unlimited EVA thrust remain valid", () => {
  const game = makeGame("mars");
  game.keys.arrowright = true;
  game.player.update(game, .034);
  assert.ok(game.player.vx > 0);
  game.player.y = game.world.groundAt(game.player.x) - game.player.height / 2;
  game.player.onGround = true;
  game.requestJump();
  game.player.update(game, .016);
  assert.ok(game.player.vy < 0);
  assert.equal(game.jumpRequested, false);
  game.state.thrusterCharges = 0;
  assert.equal(game.player.useThruster(game, false), true);
  assert.equal(game.state.thrusterCharges, 0);
});

test("legacy oxygen and thruster fields remain inert during gameplay", () => {
  const game = makeGame("mars");
  game.state.oxygen = 0;
  game.state.thrusterCharges = 0;
  game.player.useThruster(game, false);
  assert.equal(game.state.oxygen, 0);
  assert.equal(game.state.thrusterCharges, 0);
  assert.equal(typeof game.updateResources, "undefined");
  assert.equal(typeof game.rescue, "undefined");
  assert.doesNotMatch(source, /OXYGEN LOW|LIFE SUPPORT RESTORED|maxThrusterCharges/);
});

test("Earth alone slopes from a daytime coast into a deep ocean", () => {
  const world = new World("earth");
  assert.equal(world.height, 1180);
  assert.deepEqual({ ...world.water }, { shoreX: 1220, surfaceY: 552 });
  assert.ok(world.groundAt(world.water.shoreX) < world.water.surfaceY, "beach is not visibly above the water datum");
  assert.ok(world.groundAt(2800) - world.groundAt(700) > 180, "Earth seabed never becomes meaningfully deep");
  assert.equal(world.isWaterAt(700), false);
  assert.equal(world.isWaterAt(1800), true);
  assert.ok(world.waterDepthAt(world.water.shoreX + 40) < 25, "Earth has no translucent shallow-water shelf");
  assert.ok(world.waterDepthAt(1800) > world.waterDepthAt(1500) + 70, "Earth water does not deepen gradually");
  assert.ok(world.obstacles.every(obstacle => obstacle.x > world.water.shoreX + 300), "a rock blocks the shoreline entry");
  assert.equal(world.stars.length, 0);
  assert.equal(world.meteors.length, 0);
  assert.equal(PLANETS.earth.ground, "#c9b77f", "Earth spawn terrain is not sand");
  assert.match(source, /farHorizon=Math\.max\(0,surface-2\)/, "distant ocean renders above the true water surface");
  for (const id of DESTINATIONS.filter(id => id !== "earth")) {
    const other = new World(id);
    assert.equal(other.water, null, `${id}: inherited Earth's ocean`);
    assert.equal(other.height, 720, `${id}: inherited Earth's world depth`);
  }
});

test("Earth water converts directional controls into diving and permits a shore return", () => {
  const game = makeGame("earth"), surface = game.world.water.surfaceY;
  Object.assign(game.player, { x: 1800, y: surface + 60, vx: 0, vy: 0, onGround: false });
  game.keys = { arrowright: true, arrowdown: true };
  const start = { x: game.player.x, y: game.player.y };
  game.player.update(game, 1 / 30);
  assert.equal(game.player.swimming, true);
  assert.equal(game.player.submerged, true);
  assert.ok(game.player.x > start.x && game.player.y > start.y, "right/down did not swim and descend");
  game.keys = { arrowup: true };
  const diveY = game.player.y;
  for (let frame = 0; frame < 6; frame++) game.player.update(game, 1 / 30);
  assert.ok(game.player.y < diveY && game.player.vy < 0, "up did not return the astronaut toward the surface");
  Object.assign(game.player, { x: 900, y: game.world.groundAt(900) - game.player.height / 2, vx: 0, vy: 0 });
  game.keys = { arrowleft: true };
  game.player.update(game, 1 / 60);
  assert.equal(game.player.swimming, false);
  assert.equal(game.player.onGround, true);
  assert.ok(Math.abs(game.player.y - (game.world.groundAt(game.player.x) - game.player.height / 2)) < 1);
});

test("Earth acoustic task and Ring wait on the underwater seafloor", () => {
  const game = makeGame("earth"), [step] = game.world.steps, surface = game.world.water.surfaceY;
  assert.equal(step.tool, "hydrophone");
  assert.match(step.label, /المنارة الصوتية.*تحت الماء/);
  assert.ok(game.world.isWaterAt(step.x) && step.y > surface + 120, "acoustic task is not underwater");
  assert.ok(game.world.isWaterAt(game.world.ring.x) && game.world.ring.y > surface + 120, "Ring is not underwater");
  assert.ok(game.world.ring.x > step.x, "Ring does not follow the acoustic task");
  assert.ok(Math.abs(game.world.groundAt(game.world.ring.x) - game.world.ring.y - 18) < 1, "Ring is not resting in the seabed sand");
  assert.ok(game.world.marineLife.corals.some(coral => Math.abs(coral.x - game.world.ring.x) < 140), "Ring is isolated from the reef");
});

test("Earth has a varied fixed ecosystem whose fish continuously move", () => {
  const world = new World("earth"), life = world.marineLife;
  assert.ok(life);
  assert.equal(life.schools.reduce((count, school) => count + school.count, 0), 44);
  assert.equal(life.individuals.length, 6);
  assert.ok(life.corals.length >= 6 && life.plants.length >= 7 && life.anemones.length >= 4);
  assert.ok(life.crabs.length >= 3 && life.shells.length >= 5 && life.starfish.length >= 4);
  assert.ok(new Set([...life.schools, ...life.individuals].map(fish => `${fish.body}:${fish.accent}:${fish.size}`)).size >= 10, "fish repeat too few designs");
  const frames = [];
  world.drawMarineFish = (ctx, x, y, size, direction, body, accent, variant) => frames.push({ x, y, size, direction, body, accent, variant });
  const ctx = new Proxy({}, { get: () => () => {}, set: () => true });
  world.drawMarineLife(ctx, 1);
  const first = frames.splice(0);
  world.drawMarineLife(ctx, 3);
  assert.equal(first.length, 50);
  assert.equal(frames.length, 50);
  assert.ok(first.every(fish => world.isWaterAt(fish.x) && fish.y - fish.size * 1.5 > world.water.surfaceY && fish.y + fish.size * 1.5 < world.groundAt(fish.x)), "fish left the valid water column");
  assert.ok(first.some((fish, index) => Math.abs(fish.x - frames[index].x) > 25), "fish appear stationary");
  assert.deepEqual([...new Set(first.map(fish => fish.direction))].sort(), [-1, 1]);
  assert.equal(new Set(first.map(fish => fish.variant)).size, 3);
});

test("Earth underwater wonder reaction triggers once and persists", () => {
  const game = makeGame("earth");
  let saves = 0;
  game.save = () => { saves++; };
  Object.assign(game.player, { x: game.world.water.shoreX + 220, y: game.world.water.surfaceY + 120, swimming: true, submerged: true });
  game.updateOceanReaction(1 / 60);
  assert.equal(game.state.earthOceanReaction, true);
  assert.equal(game.oceanReaction.time, 0);
  assert.equal(saves, 1);
  game.updateOceanReaction(5);
  assert.equal(game.oceanReaction, null);
  game.updateOceanReaction(1 / 60);
  assert.equal(game.oceanReaction, null, "reaction repeated after it was seen");
  assert.equal(saves, 1);
  assert.equal(SaveManager.normalize({ earthOceanReaction: true }).earthOceanReaction, true);
});

test("Earth rendering and ambience transition with water depth", () => {
  const game = makeGame("earth"), world = game.world;
  let earthBackground = 0, genericAtmosphere = 0;
  world.drawEarthBackground = () => { earthBackground++; };
  world.drawAtmosphere = () => { genericAtmosphere++; };
  world.drawBackground({}, game.camera, 1000, { width: 1366, height: 900 });
  assert.equal(earthBackground, 1);
  assert.equal(genericAtmosphere, 0);
  const audio = new AudioManager(game);
  audio.environment = "earth";
  Object.assign(game.player, { x: 600, y: world.groundAt(600) - game.player.height / 2 });
  const coast = audio.ambientMix();
  Object.assign(game.player, { x: world.ring.x, y: world.ring.y });
  const deep = audio.ambientMix();
  assert.equal(coast.id, "earth");
  assert.match(deep.id, /^earth>water:/);
  assert.ok(deep.profile.filter < coast.profile.filter / 3, "underwater ambience is not muffled");
  assert.ok(deep.profile.frequency < coast.profile.frequency, "underwater suit tone did not deepen");
  game.player.swimming = true;
  game.player.submerged = false;
  assert.equal(game.environmentMode(), "COAST SWIM");
  game.player.submerged = true;
  assert.equal(game.environmentMode(), "UNDERWATER DIVE");
});

test("eight planets follow solar order and Moon belongs to Earth", () => {
  assert.equal(ORDER.join(), "mercury,venus,earth,mars,jupiter,saturn,uranus,neptune");
  assert.equal(ORDER.filter(id => PLANETS[id].hasRing).length, 7);
  assert.equal(ORDER.filter(id => !PLANETS[id].hasRing).join(), "saturn");
  assert.equal(["moon", ...ORDER].filter(id => !PLANETS[id].hasRing).join(), "moon,saturn");
  const game = makeGame("space");
  assert.equal(game.world.planetNodes.length, 9);
  assert.equal(game.world.planetNodes.find(node => node.id === "moon").parent, "earth");
  game.state.explored = ["moon", "earth"];
  assert.equal(game.exploredPlanets(), 1);
});

test("planets orbit the central Sun instead of forming a line", () => {
  const world = new World("space"), sun = world.sun;
  const node = id => world.planetNodes.find(entry => entry.id === id);
  assert.equal(world.orbits.length, 8);
  const radii = ORDER.map((id, index) => {
    const planet = node(id), rx = world.orbits[index].rx;
    const onOrbit = Math.hypot((planet.x - sun.x) / rx, (planet.y - sun.y) / world.orbits[index].ry);
    assert.ok(Math.abs(onOrbit - 1) < .01, `${id} is off its orbit`);
    assert.ok(Math.hypot(planet.x - sun.x, planet.y - sun.y) > sun.radius + planet.radius, `${id} overlaps the Sun`);
    return rx;
  });
  assert.equal(radii.join(), [...radii].sort((a, b) => a - b).join());
  assert.equal(new Set(radii).size, 8);
  const angles = ORDER.map(id => Math.atan2(node(id).y - sun.y, node(id).x - sun.x).toFixed(2));
  assert.equal(new Set(angles).size, 8);
  assert.equal(new Set(ORDER.map(id => node(id).y)).size, 8);
  assert.equal(new Set(ORDER.map(id => node(id).x)).size, 8);
  for (const [first, second] of ORDER.flatMap((a, index) => ORDER.slice(index + 1).map(b => [a, b])))
    assert.ok(Math.hypot(node(first).x - node(second).x, node(first).y - node(second).y) > node(first).radius + node(second).radius, `${first} overlaps ${second}`);
  for (const planet of world.planetNodes) {
    assert.ok(planet.x > planet.radius && planet.x < world.width - planet.radius, `${planet.id} outside world width`);
    assert.ok(planet.y > planet.radius && planet.y < world.height - planet.radius, `${planet.id} outside world height`);
  }
  const earth = node("earth"), moon = node("moon");
  const moonGap = Math.hypot(moon.x - earth.x, moon.y - earth.y);
  assert.ok(moonGap > earth.radius + moon.radius && moonGap < world.orbits[0].rx, "Moon is not held close to Earth");
  for (const id of ORDER) assert.ok(Math.hypot(moon.x - node(id).x, moon.y - node(id).y) >= moonGap || id === "earth", "Moon is nearer another planet than Earth");
});

test("rocky obstacles render as natural geology instead of metal blocks", () => {
  for (const id of ["moon", "mercury", "venus", "earth", "mars"]) {
    const world = new World(id), calls = [];
    const ctx = new Proxy({}, { get: (target, key) => (...args) => calls.push({ key, args }), set: () => true });
    world.drawObstacle(ctx, world.obstacles[0], false);
    assert.equal(calls.some(call => call.key === "fillRect" || call.key === "strokeRect"), false, `${id}: rocky terrain uses rectangular panels`);
    assert.ok(calls.some(call => call.key === "quadraticCurveTo"), `${id}: obstacle lacks an irregular rock silhouette`);
  }
});

test("giant exploration zones render organic cloud depth without paved lines", () => {
  for (const id of ["jupiter", "saturn", "uranus", "neptune"]) {
    const world = new World(id), calls = [];
    const ctx = new Proxy({}, { get: (target, key) => (...args) => calls.push({ key, args }), set: () => true });
    world.drawCloudDeck(ctx, 1000);
    assert.equal(calls.some(call => call.key === "fillRect" || call.key === "strokeRect"), false, `${id}: cloud deck uses a rectangular floor`);
    assert.equal(calls.some(call => call.key === "stroke" || call.key === "setLineDash"), false, `${id}: cloud deck contains a painted line`);
    assert.ok(calls.filter(call => call.key === "quadraticCurveTo").length >= 60, `${id}: cloud deck lacks irregular atmospheric contours`);
  }
});

test("Saturn exploration uses natural cloud terrain without a constructed platform", () => {
  const game = makeGame("saturn"), world = game.world;
  assert.equal(Object.hasOwn(world, "saturnPlatform"), false);
  assert.equal(typeof world.drawSaturnPlatform, "undefined");
  assert.equal(world.obstacles.length, 0, "Saturn's open terrain gained traversal obstacles");
  assert.doesNotMatch(source, /saturnPlatform|drawSaturnPlatform/);

  let cloudDeckRenders = 0;
  world.drawCloudDeck = () => { cloudDeckRenders++; };
  world.drawEnvironment = () => {};
  world.drawShip = () => {};
  world.drawEquipment = () => {};
  world.drawTaskTarget = () => {};
  world.drawSpecimen = () => {};
  const ctx = new Proxy({}, { get: () => () => {}, set: () => true });
  world.draw(ctx, game, 1000);
  assert.equal(cloudDeckRenders, 1, "Saturn's natural cloud terrain did not render");
});

test("Saturn keeps grounded movement without artificial traversal bounds", () => {
  const game = makeGame("saturn"), ground = game.world.groundAt(400);
  Object.assign(game.player, { x: 400, y: ground - game.player.height / 2, onGround: true });
  game.requestJump();
  assert.equal(game.jumpRequested, false, "Saturn still accepts a planetary jump");
  assert.equal(game.player.jumpBufferTimer, 0, "Saturn queued a jump from the cloud terrain");

  game.keys = { d: true };
  for (let frame = 0; frame < 360; frame++) game.player.update(game, 1 / 60);
  assert.ok(game.player.x > 1200, "an invisible remnant of the platform still bounds Saturn traversal");
  assert.equal(game.player.y + game.player.height / 2, game.world.groundAt(game.player.x), "astronaut feet lost contact with the natural terrain");
  assert.equal(game.player.groundedExpedition, true, "Saturn movement reverted to a floating pose");
  assert.equal(game.state.thrusterCharges, 5, "grounded Saturn movement altered dormant charge state");

  const calls = [], gradient = { addColorStop() {} };
  const ctx = new Proxy({}, {
    get: (target, key) => key === "createLinearGradient" ? () => gradient : (...args) => calls.push({ key, args }),
    set: () => true
  });
  Object.assign(game.player, { vx: 100, walkPhase: Math.PI / 2 });
  game.player.draw(ctx, 1000, "orbit");
  assert.deepEqual(calls.find(call => call.key === "translate").args, [game.player.x, game.player.y], "drawn boots bob away from Saturn's natural terrain");

  game.viewWidth = 1366; game.viewHeight = 900;
  game.resetScene();
  assert.equal(game.camera.zoom, 1, "Saturn retained the bridge-specific camera framing");
});

test("Saturn clouds move continuously across the natural terrain", () => {
  const world = new World("saturn"), render = time => {
    const calls = [], ctx = new Proxy({}, { get: (target, key) => (...args) => calls.push({ key, args }), set: () => true });
    world.drawCloudDeck(ctx, time);
    return calls.filter(call => call.key === "quadraticCurveTo").map(call => call.args.join(",")).join("|");
  };
  assert.notEqual(render(1000), render(1400), "Saturn cloud geometry is a static painting");
});

test("planetary scenes omit route labels, flags and background infrastructure", () => {
  for (const id of DESTINATIONS) {
    const game = makeGame(id);
    assert.equal(game.world.pathHints.length, 0, `${id}: route labels remain in the environment`);
  }
  assert.doesNotMatch(source, /drawDistantSatellite\s*\(/);
  assert.doesNotMatch(source, /drawMarker\s*\(/);
  assert.doesNotMatch(source, /setLineDash\(\[80,34\]\)/);
});

test("atmospheres and meteors remain visual-only background layers", () => {
  for (const id of DESTINATIONS) {
    const world = new World(id);
    assert.equal(world.meteors.length, id === "earth" ? 0 : 4, `${id}: meteor field should match the local sky`);
    assert.equal(world.objects().some(object => object.type === "meteor"), false, `${id}: meteor became interactive`);
    assert.ok(world.meteors.every(meteor => meteor.size <= 1.8 && meteor.depth < 1), `${id}: meteor is too large or near`);
    if (id !== "earth") assert.equal(new Set(world.meteors.map(meteor => meteor.direction)).size, 2, `${id}: meteors all move in one direction`);
  }
  for (const id of ["venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune"]) {
    const calls = [], world = new World(id);
    const ctx = new Proxy({}, { get: (target, key) => (...args) => { calls.push({ key, args }); return { addColorStop() {} }; }, set: () => true });
    world.drawAtmosphere(ctx, { x: 0, y: 0 }, 1000, { width: 1366, height: 900 });
    assert.ok(calls.some(call => call.key === "fillRect"), `${id}: atmosphere is missing`);
  }
  for (const id of ["moon", "mercury"]) {
    const calls = [], world = new World(id);
    const ctx = new Proxy({}, { get: (target, key) => (...args) => calls.push({ key, args }), set: () => true });
    world.drawAtmosphere(ctx, { x: 0, y: 0 }, 1000, { width: 1366, height: 900 });
    assert.equal(calls.length, 0, `${id}: air or fog was added despite lacking atmosphere`);
  }
});

test("generic planet flow uses sparse filled curves and no airless wind", () => {
  for (const id of ["space", "moon", "mercury"]) {
    const calls = [], world = new World(id);
    const ctx = new Proxy({}, { get: (target, key) => (...args) => calls.push({ key, args }), set: () => true });
    world.drawAtmosphericFlow(ctx, { x: 0, y: 0 }, 1000, { width: 1366, height: 900 });
    assert.equal(calls.length, 0, `${id}: atmospheric flow exists without an atmosphere`);
  }
  for (const id of ["venus", "earth", "mars", "saturn", "uranus", "neptune"]) {
    const calls = [], world = new World(id);
    const ctx = new Proxy({}, { get: (target, key) => (...args) => { calls.push({ key, args }); return { addColorStop() {} }; }, set: () => true });
    world.drawAtmosphericFlow(ctx, { x: 0, y: 0 }, 1000, { width: 1366, height: 900 });
    const curves = calls.filter(call => call.key === "bezierCurveTo");
    assert.ok(curves.length >= 5 && curves.length <= 6, `${id}: atmospheric flow is not sparse`);
    assert.equal(calls.some(call => call.key === "lineTo"), false, `${id}: straight wind streak returned`);
    assert.equal(calls.some(call => call.key === "stroke"), false, `${id}: outlined wind path returned`);
    assert.ok(calls.some(call => call.key === "fill"), `${id}: soft cloud structures are missing`);
  }
  const jupiterCalls = [], jupiter = new World("jupiter");
  const jupiterContext = new Proxy({}, { get: (target, key) => (...args) => jupiterCalls.push({ key, args }), set: () => true });
  jupiter.drawAtmosphericFlow(jupiterContext, { x: 0, y: 0 }, 1000, { width: 1366, height: 900 });
  assert.equal(jupiterCalls.length, 0, "Jupiter still uses the discrete atmospheric-object renderer");
});

test("Neptune foreground air crosses the viewport with layered turbulent gusts", () => {
  const world = new World("neptune"), profile = ATMOSPHERE_PROFILES.neptune;
  const frame = time => {
    const calls = [], ctx = new Proxy({}, { get: (target, key) => (...args) => { calls.push({ key, args }); return { addColorStop() {} }; }, set: () => true });
    world.drawAtmosphericFlow(ctx, { x: 0, y: 0 }, time, { width: 1366, height: 900 });
    return calls.filter(call => call.key === "translate").map(call => call.args);
  };
  const first = frame(1000), next = frame(1250);
  assert.equal(first.length, 6, "Neptune exceeded the fixed foreground flow pool");
  assert.equal(next.length, first.length);
  assert.ok(first.some((position, index) => Math.abs(position[0] - next[index][0]) > 10), "Neptune flow looks frozen between frames");
  assert.ok(profile.flow.drift > ATMOSPHERE_PROFILES.mars.flow.drift * 2.25, "Neptune is not dramatically faster than dusty wind");
  assert.ok(profile.layers >= 7 && profile.flow.turbulence >= 12 && profile.flow.burst >= .6);
  assert.ok(profile.flow.directions.filter(direction => direction > 0).length >= 5, "Neptune lacks a forceful prevailing direction");
  assert.ok(AUDIO_PROFILES.neptune.frequency < AUDIO_PROFILES.uranus.frequency && AUDIO_PROFILES.neptune.modulation > AUDIO_PROFILES.jupiter.modulation);
});

test("Jupiter renders a deterministic continuously deforming four-layer flow field", () => {
  const render = (time, cameraX = 280) => {
    const calls = [], gradients = [], world = new World("jupiter");
    const ctx = new Proxy({}, { get: (target, key) => (...args) => {
      calls.push({ key, args });
      if (key === "createLinearGradient") {
        const stops = [];
        gradients.push(stops);
        return { addColorStop: (...stop) => stops.push(stop) };
      }
    }, set: () => true });
    world.drawJupiterFlowField(ctx, { x: cameraX, y: 0 }, time, { width: 1366, height: 900 });
    return { calls, gradients, geometry: calls.filter(call => call.key === "moveTo" || call.key === "bezierCurveTo").flatMap(call => call.args) };
  };
  const first = render(0), repeated = render(5000), repeatedAgain = render(5000);
  assert.equal(first.gradients.length, 4, "Jupiter should have four gas-wave layers");
  assert.ok(first.gradients.every(stops => stops.length === 5), "Jupiter wave edges are not softly blended");
  assert.equal(first.calls.filter(call => call.key === "fill").length, 4, "Jupiter waves are not persistent filled fields");
  assert.equal(first.calls.filter(call => call.key === "moveTo").length, 4, "a Jupiter layer is split into disconnected wave segments");
  assert.equal(first.calls.some(call => ["stroke", "lineTo", "arc", "translate"].includes(call.key)), false, "Jupiter still renders line or particle objects");
  assert.deepEqual(repeated.geometry, repeatedAgain.geometry, "Jupiter flow uses frame-to-frame randomness");
  assert.notDeepEqual(render(5000, 0).geometry, render(5000, 500).geometry, "Jupiter flow is detached from world-space camera movement");

  const samples = Array.from({ length: 41 }, (_, index) => render(index * 250).geometry);
  for (let index = 1; index < samples.length; index++) {
    const delta = Math.max(...samples[index].map((value, valueIndex) => Math.abs(value - samples[index - 1][valueIndex])));
    assert.ok(delta > .05, `Jupiter flow froze at ${index * .25}s`);
    assert.ok(delta < 5, `Jupiter flow jumped abruptly at ${index * .25}s`);
  }
});

test("playable Jupiter integrates one animated Great Red Spot into its gas bands", () => {
  const render = time => {
    const calls = [], gradient = { addColorStop() {} }, world = new World("jupiter");
    const ctx = new Proxy({}, { get: (target, key) => (...args) => {
      calls.push({ key, args });
      if (key === "createLinearGradient" || key === "createRadialGradient") return gradient;
    }, set: () => true });
    world.drawJupiterGreatRedSpot(ctx, { x: 0, y: 0 }, time, { width: 1366, height: 900 });
    return calls;
  };
  const first = render(1000), next = render(4000), boundary = first.find(call => call.key === "ellipse");
  assert.ok(boundary, "Jupiter's playable scene has no storm boundary");
  assert.ok(boundary.args[2] >= 72 && boundary.args[2] <= 132 && boundary.args[3] / boundary.args[2] > .35, "Great Red Spot size or shape is not recognizable");
  assert.ok(first.filter(call => call.key === "bezierCurveTo").length >= 6, "Great Red Spot is not blended into the gas bands");
  assert.ok(first.some(call => call.key === "clip") && first.filter(call => call.key === "ellipse").length >= 9, "Great Red Spot lacks internal cloud texture");
  assert.notDeepEqual(first.filter(call => call.key === "ellipse").map(call => call.args), next.filter(call => call.key === "ellipse").map(call => call.args), "Great Red Spot texture is static");

  const world = new World("jupiter");let flowRenders = 0,spotRenders = 0;
  world.drawJupiterFlowField = () => { flowRenders++; };
  world.drawJupiterGreatRedSpot = () => { spotRenders++; };
  world.drawAtmosphere({}, { x: 0, y: 0 }, 1000, { width: 1366, height: 900 });
  assert.equal(flowRenders, 1, "Jupiter's existing atmospheric flow was replaced");
  assert.equal(spotRenders, 1, "Great Red Spot is absent from the playable atmosphere");
});

test("Jupiter jets are moderately faster, alternating and smoothly gusting", () => {
  const previousAverage = [.28, .24, .32, .4].reduce((total, speed) => total + speed, 0) / 4;
  const layerAverage = JUPITER_FLOW_LAYERS.reduce((total, layer) => total + layer.speed, 0) / JUPITER_FLOW_LAYERS.length;
  const states = Array.from({ length: 481 }, (_, index) => jupiterFlowState(index * .25));
  const speedAverage = states.reduce((total, state) => total + state.speed, 0) / states.length;
  const movementRatio = layerAverage * speedAverage / previousAverage;
  assert.ok(movementRatio >= 1.2 && movementRatio <= 1.35, `Jupiter movement changed by ${Math.round((movementRatio - 1) * 100)}%`);
  assert.equal(JUPITER_FLOW_LAYERS.filter(layer => layer.direction === 1).length, 2);
  assert.equal(JUPITER_FLOW_LAYERS.filter(layer => layer.direction === -1).length, 2);
  const amplitudeRange = Math.max(...states.map(state => state.amplitude)) - Math.min(...states.map(state => state.amplitude));
  const turbulenceRange = Math.max(...states.map(state => state.turbulence)) - Math.min(...states.map(state => state.turbulence));
  assert.ok(amplitudeRange > .1 && turbulenceRange > .2, "Jupiter gusts do not noticeably vary intensity");
  for (let index = 1; index < states.length; index++) {
    assert.ok(Math.abs(states[index].speed - states[index - 1].speed) < .02, "Jupiter gust speed jumps abruptly");
    assert.ok(Math.abs(states[index].amplitude - states[index - 1].amplitude) < .04, "Jupiter gust amplitude jumps abruptly");
  }
});

test("every atmospheric planet has a distinct scientifically weighted flow profile", () => {
  const ids = ["venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune"];
  assert.equal(new Set(ids.map(id => ATMOSPHERE_PROFILES[id].kind)).size, ids.length);
  assert.equal(new Set(ids.map(id => JSON.stringify(ATMOSPHERE_PROFILES[id]))).size, ids.length);
  assert.equal(ATMOSPHERE_PROFILES.moon, undefined);
  assert.equal(ATMOSPHERE_PROFILES.mercury, undefined);
  assert.ok(ATMOSPHERE_PROFILES.venus.layers > ATMOSPHERE_PROFILES.earth.layers, "Venus is not denser than Earth");
  assert.ok(ATMOSPHERE_PROFILES.mars.gust > ATMOSPHERE_PROFILES.earth.gust, "Mars lacks dusty gust variation");
  assert.ok(ATMOSPHERE_PROFILES.saturn.gust < ATMOSPHERE_PROFILES.jupiter.gust, "Saturn is not softer than Jupiter");
  assert.ok(ATMOSPHERE_PROFILES.uranus.drift < ATMOSPHERE_PROFILES.neptune.drift, "Uranus is not calmer than Neptune");
});

test("Mars has dry varied geology with a traversable ancient lakebed and canyon", () => {
  const game = makeGame("mars"), world = game.world, geology = world.geology;
  assert.equal(geology, MARS_GEOLOGY);
  assert.equal(world.water, null, "Mars gained present-day surface water");
  assert.equal(world.marineLife, null, "Mars gained present-day life");
  assert.equal(Object.hasOwn(geology, "rings"), false, "Mars gained a natural ring system");
  assert.deepEqual(Array.from(geology.moons, moon => moon.name), ["phobos", "deimos"]);
  assert.equal(geology.craters.length, 8);
  assert.equal(new Set(geology.craters.map(crater => crater.rx)).size, 8, "Mars craters repeat one size");
  assert.ok(Math.max(...geology.craters.map(crater => crater.age)) - Math.min(...geology.craters.map(crater => crater.age)) > .5, "Mars craters lack varied erosion ages");
  assert.equal(geology.channels.length, 2);
  assert.ok(geology.channels.every(channel => channel.length >= 5 && channel.at(-1)[0] - channel[0][0] >= 400), "a dry channel lacks meaningful length");

  const lakeSamples = Array.from({ length: 13 }, (_, index) => world.groundAt(geology.lakebed.center - 120 + index * 20));
  assert.ok(Math.max(...lakeSamples) - Math.min(...lakeSamples) < 12, "ancient lakebed is not visibly level");
  const canyonFloor = world.groundAt(geology.canyon.center);
  const canyonRim = Math.min(world.groundAt(geology.canyon.leftRim), world.groundAt(geology.canyon.rightRim));
  assert.ok(canyonFloor - canyonRim > 70, "canyon lacks large-scale relief");
  const terrainSteps = Array.from({ length: 250 }, (_, index) => {
    const x = 2020 + index * 4;
    return Math.abs(world.groundAt(x + 4) - world.groundAt(x));
  });
  assert.ok(Math.max(...terrainSteps) < 3, "canyon terrain is too abrupt to traverse on foot");

  const crater = geology.craters.find(candidate => candidate.x === world.ring.x);
  assert.ok(crater && crater.rx >= 80, "Ring is not associated with the shallow destination crater");
  assert.equal(world.groundAt(world.ring.x) - world.ring.y, 22, "Ring is not settled into the regolith");
  assert.ok(world.steps.every(step => Math.abs(step.x - geology.lakebed.center) <= geology.lakebed.width), "ancient-water fieldwork left the dry basin");
});

test("Mars dust moves in bounded directional gusts matched by low dry ambience", () => {
  const world = new World("mars"), profile = ATMOSPHERE_PROFILES.mars;
  const render = (method, time, player = { onGround: false, vx: 0 }) => {
    const calls = [], gradient = { addColorStop() {} };
    const ctx = new Proxy({}, {
      get: (target, key) => key === "createLinearGradient" || key === "createRadialGradient" ? () => gradient : (...args) => calls.push({ key, args }),
      set: () => true
    });
    if (method === "flow") world.drawAtmosphericFlow(ctx, { x: 0, y: 0 }, time, { width: 1366, height: 900 });
    else world.drawMarsEnvironment(ctx, { player }, time);
    return calls;
  };
  const flowAt = time => render("flow", time).filter(call => call.key === "translate").map(call => call.args);
  const firstFlow = flowAt(1000), nextFlow = flowAt(1250);
  assert.equal(firstFlow.length, 6, "Mars exceeded its fixed atmospheric-wisp pool");
  assert.ok(firstFlow.some((point, index) => Math.abs(point[0] - nextFlow[index][0]) > 8), "Mars foreground dust looks frozen");
  assert.ok(profile.flow.directions.every(direction => direction === 1), "Mars dust lost its prevailing direction");

  const groundDustAt = time => render("ground", time).filter(call => call.key === "ellipse").slice(-28).map(call => call.args);
  const firstDust = groundDustAt(1000), repeatedDust = groundDustAt(1000), nextDust = groundDustAt(1500);
  assert.equal(firstDust.length, 28, "Mars exceeded its fixed ground-dust pool");
  assert.deepEqual(firstDust, repeatedDust, "Mars dust uses frame-to-frame randomness");
  assert.ok(firstDust.some((point, index) => Math.abs(point[0] - nextDust[index][0]) > 10), "Mars ground dust does not drift between frames");
  assert.equal(render("ground", 1000, { onGround: true, vx: 120, x: 1500, walkPhase: 2 }).filter(call => call.key === "arc").length, 8, "footsteps do not disturb the regolith");
  assert.equal(AUDIO_PROFILES.mars.modRate, profile.gustRate);
  assert.equal(AUDIO_PROFILES.mars.phase, profile.phase);
  assert.ok(AUDIO_PROFILES.mars.frequency < AUDIO_PROFILES.earth.frequency, "Mars ambience is not a low dry wind");
});

test("environment audio keeps vacuum hum-led, ducks dialogue and routes subtle effects", () => {
  assert.equal(new Set(Object.values(AUDIO_PROFILES).map(profile => JSON.stringify(profile))).size, Object.keys(AUDIO_PROFILES).length, "planet audio profiles are duplicated");
  assert.ok(AUDIO_PROFILES.space.hum > 0, "spacecraft or suit hum is missing in vacuum");
  assert.ok(AUDIO_PROFILES.space.air < AUDIO_PROFILES.space.hum / 10, "vacuum ambience sounds like wind");
  assert.ok(AUDIO_PROFILES.moon.air < AUDIO_PROFILES.earth.air, "airless Moon is too noisy");
  assert.ok(AUDIO_PROFILES.neptune.air > AUDIO_PROFILES.uranus.air, "planet profiles lack distinct intensity");

  const game = { state: { sound: true, location: "space" }, suspended: false, dialogue: null, pendingRing: null, paused: false };
  const audio = new AudioManager(game), targets = [];
  const param = value => ({ value, cancelScheduledValues() {}, setValueAtTime(next) { this.value = next; }, exponentialRampToValueAtTime(next) { this.value = next; targets.push(next); }, linearRampToValueAtTime(next) { this.value = next; } });
  audio.context = { currentTime: 0, state: "running" };
  audio.ambience = { master: { gain: param(.001) }, humGain: { gain: param(.001) }, airGain: { gain: param(.001) }, hum: { frequency: param(55) }, filter: { frequency: param(420) } };
  audio.updateAmbience();
  assert.ok(targets.includes(1.35), "normal ambience master level is missing");
  game.dialogue = { index: 0 };
  audio.updateAmbience();
  assert.ok(targets.some(value => Math.abs(value - 1.35 * .18) < .0001), "dialogue does not duck ambience");

  const tones = [];
  audio.tone = (...args) => tones.push(args);
  audio.playStep("jupiter");
  assert.equal(tones.length, 0, "gas-giant orbit gained solid-ground footsteps");
  audio.playStep("saturn");
  assert.equal(tones.length, 1, "Saturn platform lacks restrained metallic boot contact");
  assert.equal(tones[0][2], "square", "Saturn boot contact does not sound mechanical");
  assert.ok(tones[0][3] < .01, "Saturn platform footsteps overpower the atmosphere");
  audio.playStep("mars");
  audio.playToolPhase("soil");
  audio.playToolPhase("seal");
  assert.equal(tones.length, 4);
  assert.notDeepEqual(tones[2], tones[3], "sample scrape and container click sound identical");
});

test("atmospheric audio gains rise independently while vacuum stays nearly silent", () => {
  const previousAir = { venus: .044, earth: .022, mars: .027, jupiter: .05, saturn: .037, uranus: .017, neptune: .052 };
  for (const [id, previous] of Object.entries(previousAir)) {
    const ratio = AUDIO_PROFILES[id].air / previous;
    assert.ok(ratio >= 1.3 && ratio <= 1.4, `${id}: environmental gain changed by ${Math.round((ratio - 1) * 100)}%`);
  }
  assert.equal(AUDIO_PROFILES.space.air, .001);
  assert.equal(AUDIO_PROFILES.moon.air, .0004);
  assert.equal(AUDIO_PROFILES.mercury.air, .0005);
  assert.ok(AUDIO_PROFILES.jupiter.air > AUDIO_PROFILES.saturn.air);
  assert.ok(AUDIO_PROFILES.neptune.air > AUDIO_PROFILES.uranus.air);
  for (const id of ["mars", "jupiter", "neptune"]) {
    const samples = Array.from({ length: 241 }, (_, index) => modulateAudioProfile(AUDIO_PROFILES[id], index * .5).air);
    assert.ok(Math.max(...samples) - Math.min(...samples) > AUDIO_PROFILES[id].air * .1, `${id}: ambience lacks smooth gust intensity changes`);
  }
});

test("audio category balance raises ambience and tools while keeping Earth beach above water", () => {
  assert.equal(AUDIO_LEVELS.ambience, 1.35);
  assert.equal(AUDIO_LEVELS.environment, 2.6);
  assert.equal(AUDIO_LEVELS.tool, 2.5);
  assert.equal(AUDIO_LEVELS.equipment, 1.8);
  assert.ok(AUDIO_PROFILES.earth.air > EARTH_UNDERWATER_AUDIO.air, "Earth water overpowers beach ambience");
  const audio = new AudioManager({ state: { sound: true }, suspended: false }), tones = [];
  audio.tone = (...args) => tones.push(args);
  audio.playTool("rockHammer");
  audio.playToolPhase("impact");
  assert.equal(tones[0][3], .025 * 2.5);
  assert.equal(tones[1][3], .032 * 2.5);
  assert.ok(tones.every(tone => tone[3] <= .1), "tool category can exceed its clipping guard");
  audio.play("item");
  assert.equal(tones[2][3], .05 * 1.8);
});

test("Uranus playable terrain is solid irregular ice shared by rendering and collision", () => {
  const game = makeGame("uranus"), samples = [300, 800, 1400, 2100, 2900].map(x => game.world.groundAt(x));
  assert.ok(Math.max(...samples) - Math.min(...samples) > 8, "Uranus ice ground is flat");
  assert.equal(typeof game.world.drawUranusIce, "function");
  assert.match(source, /if\(this\.id==="uranus"\)this\.drawUranusIce\(ctx,time\)/);
  assert.match(source, /drawUranusIce\(ctx,time\).*#bfeef0.*#78c4ce.*#285e72/);
  assert.match(source, /if\(this\.id==="uranus"\).*quadraticCurveTo/);
  game.player.x = 800;
  game.player.y = game.world.groundAt(800) - game.player.height / 2;
  game.player.onGround = true;
  game.keys = { arrowright: true };
  for (let frame = 0; frame < 20; frame++) game.player.update(game, 1 / 60);
  assert.ok(game.player.x > 800 && game.player.onGround, "astronaut cannot walk on Uranus ice");
  assert.ok(Math.abs(game.player.y + game.player.height / 2 - game.world.groundAt(game.player.x)) < .01, "astronaut feet do not contact Uranus ice");
  game.keys = {};
  game.player.queueJump(.15);
  game.jumpRequested = true;
  game.jumpHeld = true;
  game.player.update(game, 1 / 60);
  assert.ok(!game.player.onGround && game.player.vy < 0, "astronaut cannot jump from Uranus ice");
});

test("backpack equipped feedback is persistent and emitted only for the active tool", () => {
  assert.match(source, /const equipped=state\.equipped===id/);
  assert.match(source, /equipped\?'<span class="equipped-indicator">✓ EQUIPPED<\/span>':""/);
  assert.match(advancedStyleSource, /\.inventory-slot\.equipped\{border:2px solid var\(--amber\)/);
  assert.match(advancedStyleSource, /\.inventory-slot \.equipped-indicator\{/);
  assert.match(advancedStyleSource, /\.inventory-slot:not\(\.empty\):hover,\.inventory-slot:not\(\.empty\):focus-visible/);
});

test("Uranus uses a smooth pale ice-giant treatment instead of shared gas bands", () => {
  const paintSource = source.slice(source.indexOf("paintPlanet(ctx,id,radius)"), source.indexOf("draw(ctx,game,time)"));
  assert.match(paintSource, /if\(id==="uranus"\)[\s\S]*createRadialGradient/);
  assert.match(paintSource, /#d8fbf7.*#8fdde0.*#58b8c3.*#2d7383/);
  assert.match(paintSource, /else if\(\["venus","jupiter","saturn","neptune"\]\.includes\(id\)\)/);
  assert.doesNotMatch(paintSource, /\["venus","jupiter","saturn","uranus","neptune"\]/);
  assert.match(source, /if\(this\.id==="uranus"\)\{const layers=\["rgba\(35,112,132,.28\)"/);
});

test("first player interaction unlocks exactly one ambience graph", async () => {
  const game = { state: { sound: true, location: "space" }, suspended: false };
  const audio = new AudioManager(game);
  let resumes = 0, creates = 0, updates = 0;
  const context = { state: "suspended", resume() { resumes++; this.state = "running"; return Promise.resolve(); } };
  audio.ensureContext = () => context;
  audio.createAmbience = () => { creates++; };
  audio.updateAmbience = () => { updates++; };
  audio.unlock();
  const pending = audio.resumePromise;
  audio.unlock();
  await pending;
  assert.equal(resumes, 1, "repeated input resumed AudioContext more than once");
  assert.equal(creates, 1, "repeated input created duplicate ambience loops");
  assert.equal(updates, 1, "ambience did not start after AudioContext resumed");
});

test("spacecraft proximity crossfades Jupiter ambience and restores vacuum", () => {
  const jupiter = { id: "jupiter", x: 1000, y: 500, radius: 105 };
  const game = { state: { sound: true, location: "space" }, world: { planetNodes: [jupiter] }, player: { x: 0, y: 500 } };
  const audio = new AudioManager(game);
  audio.environment = "space";
  const far = audio.ambientMix();
  assert.equal(far.id, "space");
  assert.equal(far.profile.air, AUDIO_PROFILES.space.air);
  game.player.x = jupiter.x - jupiter.radius - 105;
  const near = audio.ambientMix();
  assert.equal(near.id, "space>jupiter:1");
  assert.equal(near.profile.air, AUDIO_PROFILES.jupiter.air);
  game.player.x = 0;
  const departed = audio.ambientMix();
  assert.equal(departed.id, "space");
  assert.equal(departed.profile.hum, AUDIO_PROFILES.space.hum);
});

test("local skies never duplicate the visited planet as wallpaper", () => {
  for (const id of DESTINATIONS) {
    const world = new World(id), bodies = [];
    world.drawDistantBody = (ctx, body, x, y, radius) => bodies.push({ body, radius });
    world.drawMoon = () => {};
    world.drawMeteors = () => {};
    world.drawAtmosphere = () => {};
    const ctx = new Proxy({}, { get: () => (...args) => ({ addColorStop() {} }), set: () => true });
    world.drawBackground(ctx, { x: 0, y: 0 }, 1000, { width: 1366, height: 900 });
    assert.equal(bodies.some(entry => entry.body === id), false, `${id}: visited planet duplicated in its own sky`);
    assert.ok(bodies.length <= 1, `${id}: background became a Solar System poster`);
    assert.ok(bodies.every(entry => entry.radius <= 24), `${id}: distant body is too large`);
  }
});

test("planet systems use distinct star fields and only selected correct moons", () => {
  const counts=DESTINATIONS.map(id=>new World(id).stars.length);
  assert.equal(new Set(counts).size,DESTINATIONS.length,"local star density repeats between destinations");
  assert.equal(Object.keys(SYSTEM_MOONS).sort().join(),"jupiter,neptune,saturn,uranus");
  assert.equal(SYSTEM_MOONS.jupiter.map(moon=>moon.id).join(),"io,europa,ganymede");
  assert.equal(SYSTEM_MOONS.saturn.map(moon=>moon.id).join(),"titan,rhea");
  assert.equal(SYSTEM_MOONS.uranus.map(moon=>moon.id).join(),"ariel,titania,oberon");
  assert.equal(SYSTEM_MOONS.neptune.map(moon=>moon.id).join(),"triton");
  for(const moons of Object.values(SYSTEM_MOONS))assert.equal(new Set(moons.map(moon=>moon.orbit)).size,moons.length,"moon distances repeat");
  assert.doesNotMatch(source,/has 8 moons|عنده 8 أقمار|لديه 8 أقمار/i);
});

module.exports = { makeGame, context, Game, SaveManager, PLANETS, ORDER, World };

test("Saturn keeps a banded ring system in the solar system view", () => {
  const world = new World("space"), calls = [];
  const ctx = new Proxy({}, { get: (target, key) => {
    if (key === "canvas") return { width: 1366, height: 900 };
    return (...args) => { calls.push({ key, args }); return { addColorStop() {} }; };
  } });
  const node = world.planetNodes.find(entry => entry.id === "saturn");
  world.drawPlanetNode(ctx, node, { state: { explored: [] }, waypoint: null }, 0);
  const bands = calls.filter(call => call.key === "ellipse" && call.args[2] > node.radius);
  assert.ok(bands.length >= 6, "Saturn should draw banded rings behind and in front");
  for (const band of bands) {
    assert.ok(band.args[2] > node.radius * 1.1 && band.args[2] < node.radius * 2.2, "ring band has an unrealistic radius");
    assert.ok(band.args[3] < band.args[2] * .5, "ring band is not elliptical");
  }
  assert.equal(calls.some(call => call.key === "fillText" && /[\u{1F300}-\u{1FAFF}]/u.test(String(call.args[0]))), false);
});

test("ordinary jumps clear every surface obstacle without charges", () => {
  for(const id of ["moon","mercury","mars"]){
    const game=makeGame(id);
    game.state.thrusterCharges=0;
    for(const obstacle of game.world.obstacles){
      Object.assign(game.player,{x:obstacle.x-95,y:game.world.groundAt(obstacle.x-95)-game.player.height/2,vx:185,vy:0,onGround:true});
      game.keys={d:true};game.requestJump();
      for(let frame=0;frame<180&&game.player.x<obstacle.x+obstacle.w+25;frame++)game.player.update(game,1/60);
      assert.ok(game.player.x>obstacle.x+obstacle.w,`${id}: obstacle ${obstacle.x}`);
      assert.equal(game.state.thrusterCharges,0);
    }
  }
});

test("malformed saves preserve essentials without inventing conversations", () => {
  for(const raw of [null,[],42,{inventory:["heater","sample","thermal","repair","navigation","radiation","scanner","camera","tether"],version:4,rings:["mars"],dialogueProgress:{mars:99},positions:null}]){
    const state=SaveManager.normalize(raw);
    for(const id of ["camera"])assert.ok(state.inventory.includes(id));
    assert.ok(state.inventory.length<=6);
    assert.equal(state.conversations.length,0);
  }
});

test("manual dialogue requires local search, survives interruption and ignores spam", () => {
  const game = makeGame("moon");
  game.startDialogue();
  assert.equal(game.dialogue, undefined);
  Object.assign(game.player, {x:740,y:480});
  game.startDialogue();
  assert.equal(game.dialogue, undefined);
  game.observeNearby();
  game.interact();
  assert.equal(game.dialogue.index,0);
  game.advanceDialogue();
  assert.equal(game.dialogue.index,0);
  game.dialogue.nextAt=0;
  game.advanceDialogue();
  assert.equal(game.dialogue.index,1);
  game.state=SaveManager.normalize(game.state);
  game.ui.close();
  game.startDialogue();
  assert.equal(game.dialogue.index,1);
  while(game.dialogue){game.dialogue.nextAt=0;game.advanceDialogue()}
  assert.equal(game.state.conversations.join(),"moon");
  assert.equal(game.state.rings.length,0);
  assert.equal(game.waypoint,"mars");
  assert.equal(game.state.sightingPending,true);
  game.updateSighting(5.1);
  assert.equal(game.state.sightingPending,false);
  const score=game.state.knowledge;
  game.startDialogue();
  while(game.dialogue){game.dialogue.nextAt=0;game.advanceDialogue()}
  assert.equal(game.state.knowledge,score);
  assert.equal(game.state.sightingPending,false);
});

test("Moon teaches gravity before connecting Saturn's rings and real field tools", () => {
  const lines = PLANET_DIALOGUES.moon;
  assert.equal(lines.length, 8);
  assert.equal(lines.map(line => line.astronaut === true ? "astronaut" : "moon").join(","), "moon,astronaut,moon,astronaut,moon,astronaut,moon,astronaut");
  assert.match(lines[0].text, /سدس جاذبية الأرض.*أخف/);
  assert.match(lines[1].text, /حركتي أخف.*بنط أعلى/);
  assert.match(lines[2].text, /كتلتك.*وزنك أقل.*جاذبيتي الأضعف.*تنط أعلى/);
  assert.match(lines[3].text, /زحل.*حلقاته السبع/);
  assert.match(lines[4].text, /مفيش حلقة.*القمر.*ناحية المريخ/);
  assert.match(lines[6].text, /مغرفة العينات.*حاوية العينات.*الحقيبة.*علامة العمل.*E/);
  assert.equal(PLANETS.moon.hasRing, false);
  assert.equal(PLANETS.moon.tool, "scoop");
  assert.equal(MISSIONS.moon.steps.map(step => step[3]).join(), "scoop,sampleContainer");
  assert.equal(MISSIONS.moon.kit.map(item => item[0]).join(), "sampleContainer");
  assert.equal(ITEMS.scoop.name, "مغرفة عينات");
  assert.equal(ITEMS.sampleContainer.name, "حاوية عينات");

  const game = makeGame("moon"), visitedTurns = [];
  game.state.observations.push("moon");
  Object.assign(game.player, { x: game.world.contact.x, y: game.world.contact.y });
  game.startDialogue();
  while (game.dialogue) {
    visitedTurns.push(game.dialogue.index);
    game.dialogue.nextAt = 0;
    game.advanceDialogue();
  }
  assert.equal(visitedTurns.join(), "0,1,2,3,4,5,6,7");
  assert.equal(game.paused, false);
  assert.equal(game.state.conversations.join(), "moon");
  assert.equal(game.state.rings.length, 0);
  assert.equal(game.state.missionSteps.length, 0);
  assert.equal(game.waypoint, "mars");
});

test("ring planets give locations while their rings own the science facts", () => {
  const ringPlanets=ORDER.filter(id => PLANETS[id].hasRing),scripts=new Set(),ownership={
    mercury:{guidance:/مسبار الحرارة.*الصخر المشمس.*داخل الظل/,science:[/أصغر كوكب/,/88/,/جليد ماء/],forbidden:/أصغر كوكب|88|غلافه الجوي شبه منعدم|جليد ماء/},
    venus:{guidance:/المطرقة الجيولوجية.*الملاقط.*حاوية العينات.*ثلاث ضربات.*الملاقط.*أغلق الحاوية.*بطاقة/,science:[/ثاني أكسيد الكربون/,/470/,/92/,/ألف بركان/,/11 كيلومتر/],forbidden:/ثاني أكسيد الكربون|470|92|ألف بركان|11 كيلومتر/},
    earth:{guidance:/مستشعر الصوت المائي.*اغوص.*قارن قوة النبضات/,science:[/71%/,/ماء سائل/,/موطنًا للحياة/,/غلافها الجوي/],forbidden:/71%|ماء سائل|موطنًا للحياة|غلافها الجوي/},
    mars:{guidance:/مثقاب العينات.*استخرج قلبًا.*أغلق الأنبوب.*بطاقة/,science:[/أوليمبوس مونس/,/مياه سائلة قديمة/,/الحديد/,/اتأكسدت/,/ثاني أكسيد الكربون/,/الحرارة تتغير بشدة/,/فوبوس/,/ديموس/,/سول/,/24\.6/],forbidden:/مياه سائلة قديمة|معادن.*الحديد|اتأكسدت|أوليمبوس مونس|ثاني أكسيد الكربون|الحرارة تتغير بشدة|فوبوس|ديموس|سول|24\.6/},
    jupiter:{guidance:/كاشف الإشعاع.*المسبار الأول.*قارن القراءة/,science:[/البقعة الحمراء/,/أكبر كواكب/,/عشر ساعات/],forbidden:/البقعة الحمراء|أكبر كواكب|عشر ساعات|عملاق غازي/},
    uranus:{guidance:/حاسوب الملاحة.*المنارات.*ثبّت المسار/,science:[/عملاق جليدي/,/98 درجة/,/21 سنة/],forbidden:/عملاق جليدي|98 درجة|21 سنة/},
    neptune:{guidance:/المصباح.*تدفئة الأجهزة/,science:[/أسرع الرياح/,/2000 كيلومتر/,/الميثان/,/165 سنة/],forbidden:/رياح|2000 كيلومتر|الميثان|165 سنة|أبعد كوكب/}
  };
  assert.equal(ringPlanets.length,7);
  assert.deepEqual([...ringPlanets],["mercury","venus","earth","mars","jupiter","uranus","neptune"]);
  for(const id of ringPlanets){
    const game=makeGame(id);
    assert.ok(Math.hypot(game.world.ring.x-game.world.contact.x,game.world.ring.y-game.world.contact.y)>1000,`${id}: ring appears beside the astronaut`);
    game.state.observations.push(id);
    Object.assign(game.player,{x:game.world.contact.x,y:game.world.contact.y});
    game.startDialogue();
    assert.equal(game.dialogue.lines[0].astronaut,true);
    assert.match(game.dialogue.lines[0].text,/حلقات زحل/);
    const planetSpeech=game.dialogue.lines.filter(line=>!line.astronaut).map(line=>line.text).join(" "),ringSpeech=RING_DIALOGUES[id].filter(line=>line.speaker==="ring").map(line=>line.text).join(" ");
    assert.doesNotMatch(planetSpeech,ownership[id].forbidden,`${id}: planet took ownership of its science`);
    assert.match(planetSpeech,ownership[id].guidance,`${id}: planet omitted activity guidance`);
    assert.match(game.dialogue.lines.map(line=>line.text).join(" "),/ناحية|بعد|المسار|المدار|بريق/,`${id}: planet omitted the location clue`);
    for(const fact of ownership[id].science)assert.match(ringSpeech,fact,`${id}: Ring omitted planet science ${fact}`);
    assert.equal(RING_DIALOGUES[id].length,7);
    assert.equal(RING_DIALOGUES[id][0].speaker,"astronaut");
    assert.equal(RING_DIALOGUES[id].at(-1).speaker,"astronaut");
    assert.ok(RING_DIALOGUES[id].filter(line=>line.speaker==="ring").length>=3,`${id}: ring lacks a substantial discovery`);
    scripts.add(RING_DIALOGUES[id].map(line=>line.text).join(" "));
  }
  assert.equal(scripts.size,7);
});

test("Ring lessons introduce science before the astronaut reacts", () => {
  const concepts={
    mercury:[/أصغر كوكب/,/أقربهم للشمس/,/معندوش أقمار أو حلقات/,/88 يوم/,/59 يوم/,/غلافه الجوي شبه منعدم/,/فوهات قديمة/,/جليد ماء/],
    venus:[/ثاني أكسيد الكربون/,/470 درجة/,/92 مرة/,/ألف بركان/,/11 كيلومتر/,/سحبه تعكس/,/عكس اتجاه/,/225 يوم/,/يومه أطول/],
    earth:[/71%/,/ماء سائل/,/موطنًا للحياة/,/غلافها الجوي/,/أربع طبقات/,/القشرة/,/اللب الداخلي/],
    mars:[/أوليمبوس مونس/,/مياه سائلة قديمة/,/الحديد/,/اتأكسدت/,/ثاني أكسيد الكربون/,/الحرارة تتغير بشدة/,/38%/,/فوبوس/,/ديموس/,/سول/,/24\.6/],
    jupiter:[/البقعة الحمراء/,/أكبر من الأرض/,/مئات السنين/,/أكبر كواكب/,/9\.9 ساعات/,/عشر ساعات/,/12 سنة/,/مجال مغناطيسي/],
    uranus:[/عملاق جليدي/,/الميثان/,/حلقات خافتة/,/98 درجة/,/21 سنة/],
    neptune:[/2000 كيلومتر/,/الميثان/,/حلقات وأقواس خافتة/,/165 سنة/]
  };
  for(const [id,lines] of Object.entries(RING_DIALOGUES)){
    assert.equal(lines.map(line=>line.speaker).join(","),"astronaut,ring,astronaut,ring,astronaut,ring,astronaut",`${id}: speakers do not alternate naturally`);
    assert.match(lines[2].text,/؟/,`${id}: the astronaut did not ask a discovery question`);
    assert.doesNotMatch(lines[2].text,/\d/,`${id}: the astronaut gave away a scientific number before the lesson`);
    for(const concept of concepts[id]){
      const first=lines.find(line=>concept.test(line.text));
      assert.ok(first,`${id}: missing science concept ${concept}`);
      assert.equal(first.speaker,"ring",`${id}: astronaut introduced ${concept} before the Ring`);
    }
  }
});

test("story ring interaction identifies both speakers before collection", () => {
  const game=makeGame("mars");
  game.clearInput=()=>{};
  game.confirmRing=()=>{};
  const ui=new UIManager(game);
  ui.ring(PLANETS.mars,4);
  const turns=[];
  for(let index=0;index<RING_DIALOGUES.mars.length;index++){
    turns.push(ui.content.innerHTML);
    if(index<RING_DIALOGUES.mars.length-1)ui.onContinue();
  }
  const conversation=turns.join(" ");
  assert.match(conversation,/رائد الفضاء/);
  assert.match(conversation,/واحدة من حلقات زحل/);
  assert.match(conversation,/الحديد/);
  assert.doesNotMatch(conversation,/زحل مستنيني|لازم أرجع لزحل|رجعيني لزحل|لازم نرجع بسرعة/);
  assert.match(conversation,/لسه حلقات ناقصة ولازم أكمل/);
  assert.ok(turns.every(turn=>(turn.match(/class="ring-line/g)||[]).length===1),"ring science was dumped as one paragraph");
  assert.match(turns[0],/world-speech astronaut/);
  assert.match(turns[1],/world-speech ring/);
});

test("planet conversations use the themed popup while only rings use speech bubbles", () => {
  const game=makeGame("mercury");
  const ui=new UIManager(game),classes=new Set();
  ui.modal.classList={add:(...names)=>names.forEach(name=>classes.add(name)),remove:(...names)=>names.forEach(name=>classes.delete(name)),toggle:(name,force)=>force?classes.add(name):classes.delete(name),contains:name=>classes.has(name)};
  game.ui=ui;game.dialogue={id:"mercury",lines:PLANET_DIALOGUES.mercury,index:0,nextAt:0};
  ui.planetIntro();
  assert.equal(classes.has("ring-dialogue"),false);
  assert.match(ui.content.innerHTML,/class="planet-dialogue"/);
  assert.match(ui.content.innerHTML,/class="talking-planet"/);
  assert.match(ui.content.innerHTML,/class="primary-btn"/);
  assert.doesNotMatch(ui.content.innerHTML,/world-speech|bubble-next/);
  ui.ring(PLANETS.mercury,1,0);
  assert.equal(classes.has("ring-dialogue"),true);
  assert.match(ui.content.innerHTML,/class="ring-discovery world-speech astronaut"/);
  assert.match(ui.content.innerHTML,/class="bubble-next"/);
  assert.doesNotMatch(`${source}\n${dialogueStyleSource}`,/thinking-bubble|thought-bubble|thought-circle/);
  assert.match(dialogueStyleSource,/\.planet-dialogue \.planet-speech::before \{ display: none; \}/);
  assert.match(dialogueStyleSource,/width: min\(520px, calc\(100vw - 32px\)\)/);
  assert.match(dialogueStyleSource,/width: min\(440px, calc\(100vw - 16px\)\)/);
  assert.match(dialogueStyleSource,/\.ring-dialogue \.world-speech \{ position: static;/);
});

test("Mercury uses stronger local solar exposure without gaining atmosphere", () => {
  const sunRadius=id=>{const calls=[],world=new World(id),ctx=new Proxy({}, {get:(target,key)=>key==="createRadialGradient"||key==="createLinearGradient"?()=>({addColorStop(){}}):(...args)=>calls.push({key,args}),set:()=>true});world.drawMeteors=()=>{};world.drawDistantSolarBody=()=>{};world.drawMoon=()=>{};world.drawBackground(ctx,{x:0,y:0},1000,{width:1366,height:900});return Math.max(...calls.filter(call=>call.key==="arc").map(call=>call.args[2]||0))};
  assert.ok(sunRadius("mercury")>sunRadius("earth")*1.8,"Mercury's Sun is not visibly larger than Earth's");
  assert.equal(ATMOSPHERE_PROFILES.mercury,undefined);
  assert.equal(AUDIO_PROFILES.mercury.air,.0005);
});

test("Mercury combines cratered airless geology, polar ice evidence and thermal contrast", () => {
  const planetDialogue=PLANET_DIALOGUES.mercury.filter(line=>!line.astronaut).map(line=>line.text).join(" "),ringDialogue=RING_DIALOGUES.mercury.filter(line=>line.speaker==="ring").map(line=>line.text).join(" ");
  assert.match(source,/drawMercuryHorizon\(ctx,camera,canvas\)/);
  assert.match(source,/const polarX=2540/);
  assert.match(planetDialogue,/مسبار الحرارة/);
  assert.doesNotMatch(planetDialogue,/أصغر كوكب|غلافه الجوي شبه منعدم|جليد ماء/);
  assert.match(ringDialogue,/أصغر كوكب/);
  assert.match(ringDialogue,/غلافه الجوي شبه منعدم/);
  assert.match(ringDialogue,/جليد ماء/);
  assert.match(source,/mercury:\{title:"ANCIENT IMPACT CRATER",fact:"واو\.\.\. الفوهات في كل مكان!/);
  assert.match(source,/"mercury:0":\{[^\n]+result:"EXTREME HEAT/);
  assert.match(source,/"mercury:1":\{[^\n]+result:"SHADOW COOLER/);
});

test("Venus diffuses its Sun while Mercury keeps the hard solar core", () => {
  assert.match(source,/if\(!venus\).*ctx\.arc\(sunX,sunY,sunRadius/);
  assert.match(source,/venus\?"rgba\(255,222,151,\.24\)"/);
  assert.match(source,/mercury\?"rgba\(255,255,232,1\)"/);
  assert.ok(ATMOSPHERE_PROFILES.venus.layers>=6);
  assert.equal(ATMOSPHERE_PROFILES.mercury,undefined);
});

test("Venus combines slow dense air, volcanic geology and distinct science", () => {
  const planetDialogue=PLANET_DIALOGUES.venus.filter(line=>!line.astronaut).map(line=>line.text).join(" "),ringDialogue=RING_DIALOGUES.venus.filter(line=>line.speaker==="ring").map(line=>line.text).join(" "),profile=ATMOSPHERE_PROFILES.venus,audio=AUDIO_PROFILES.venus;
  assert.match(planetDialogue,/حاوية العينات/);
  assert.doesNotMatch(planetDialogue,/ثاني أكسيد الكربون|470|92|ألف بركان|11 كيلومتر/);
  assert.match(ringDialogue,/ثاني أكسيد الكربون/);
  assert.match(ringDialogue,/92/);
  assert.match(ringDialogue,/ألف بركان/);
  assert.match(ringDialogue,/11 كيلومتر/);
  assert.ok(profile.drift<.5&&profile.flow.drift<.4&&profile.gust<.1,"Venus surface air is too fast");
  assert.equal(profile.flow.motes,0);
  assert.ok(audio.air>=.06&&audio.filter<=220,"Venus ambience is not audible and muffled");
  assert.match(source,/drawVenusHorizon\(ctx,camera,canvas\)/);
  assert.match(source,/if\(this\.id==="venus"\).*shimmer/);
});

test("HUD omits survival and RPG meters while keeping mission data", () => {
  assert.doesNotMatch(indexSource,/oxygen-bar|oxygen-value|health-bar|health-value|thruster-bar|thruster-value|>O₂<|>HP<|>THR<|>XP</);
  assert.match(indexSource,/id="rings-stat"/);
  assert.match(indexSource,/id="planets-stat"/);
  assert.match(indexSource,/id="tools-stat"/);
});

test("home replaces difficulty widgets with one educational statement", () => {
  assert.doesNotMatch(indexSource,/data-difficulty|difficulty-card|SCIENTIST|SPECIALIST/);
  assert.match(indexSource,/class="space-curiosity"/);
  assert.match(indexSource,/اكتشفنا جزء صغير من الفضاء/);
});

test("destinations without story rings teach their own science", () => {
  const moon=PLANET_DIALOGUES.moon.map(line=>line.text).join(" "),saturn=PLANET_DIALOGUES.saturn.map(line=>line.text).join(" ");
  assert.equal(RING_DIALOGUES.moon,undefined);
  assert.equal(RING_DIALOGUES.saturn,undefined);
  assert.match(moon,/سدس جاذبية الأرض/);
  assert.match(moon,/تابع الأرض الطبيعي، مش كوكب/);
  assert.match(saturn,/ثاني أكبر/);
  assert.match(saturn,/تسعة أضعاف/);
  assert.match(saturn,/الهيدروجين والهيليوم/);
  assert.match(saturn,/29\.5 سنة/);
});

test("Saturn explains that its thin ring bands form a complex dynamic system", () => {
  const game=makeGame("saturn");
  game.finalDialogueIndex=6;
  const ui=new UIManager(game);
  ui.saturnFinal();
  assert.match(ui.content.innerHTML,/واسعة جدًا لكن رفيعة/);
  assert.match(ui.content.innerHTML,/نظام ديناميكي معقد/);
  assert.match(ui.content.innerHTML,/آلاف النطاقات/);
  game.finalDialogueIndex=5;
  ui.saturnFinal();
  assert.match(ui.content.innerHTML,/A وB وC/);
  assert.match(ui.content.innerHTML,/D وE وF وG/);
});

test("all destination conversations are substantial, distinct and appropriately initiated", () => {
  const scripts=new Set();
  for(const id of DESTINATIONS){
    const lines=PLANET_DIALOGUES[id],text=lines.map(line=>line.text).join(" ");
    assert.ok(lines.length>=5&&lines.length<=8,`${id}: dialogue length`);
    assert.equal(lines[0].astronaut===true,id!=="moon",`${id}: incorrect opening speaker`);
    assert.match(text,/حلقة|حلقات/,`${id}: mission question missing`);
    scripts.add(text);
  }
  assert.equal(scripts.size,9);
  assert.doesNotMatch(PLANET_DIALOGUES.earth.map(line=>line.text).join(" "),/القمر/);
  const ringSpeech=Object.values(RING_DIALOGUES).flat().filter(line=>line.speaker==="ring").map(line=>line.text).join(" ");
  assert.doesNotMatch(ringSpeech,/زحل مستنيني|لازم أرجع لزحل|رجعيني لزحل|لازم نرجع بسرعة/);
});

test("planetary scenes have no observation circle or cursor reticle", () => {
  assert.doesNotMatch(source,/drawTrace\s*\(/);
  assert.doesNotMatch(source,/drawReticle\s*\(/);
});

test("stationary saved positions inside ledges recover to a stable surface", () => {
  const game=makeGame("mars"),obstacle=game.world.obstacles[0];
  Object.assign(game.player,{x:obstacle.x+obstacle.w/2,y:obstacle.y+10,vx:0,vy:0});
  game.player.update(game,1/60);
  assert.equal(game.player.y+game.player.height/2,obstacle.y);
  for(let frame=0;frame<120;frame++)game.player.update(game,1/60);
  assert.equal(game.player.y+game.player.height/2,obstacle.y);
  assert.equal(game.player.onGround,true);
});

test("every ground jump consumes coyote eligibility", () => {
  const game=makeGame("mars");
  game.player.coyoteTimer=.15;
  game.player.jump(game,game.planet);
  assert.equal(game.player.coyoteTimer,0);
});

test("surface missions use real field equipment and staged kits", () => {
  const assignments = { moon: "scoop", mercury: "temperatureProbe", venus: "rockHammer", earth: "hydrophone", mars: "drill" };
  for (const [id, tool] of Object.entries(assignments)) {
    assert.equal(PLANETS[id].tool, tool);
    assert.ok(ITEMS[tool], `${id}: missing ${tool}`);
    for (const step of makeGame(id).world.steps) assert.ok(TOOL_WORKFLOWS[step.tool], `${step.key}: missing physical workflow`);
  }
  for (const retired of ["geology", "thermal", "sample", "communicator", "repair"]) assert.equal(ITEMS[retired], undefined);
  assert.equal(makeGame("moon").world.steps.map(step => step.tool).join(), "scoop,sampleContainer");
  assert.equal(makeGame("venus").world.steps.map(step => step.tool).join(), "rockHammer,tongs,sampleContainer");
  assert.equal(makeGame("mars").world.steps.map(step => step.tool).join(), "drill,sampleContainer");
});

test("legacy field tools migrate to their physical replacements", () => {
  const state = SaveManager.normalize({
    inventory: ["camera", "geology", "communicator"],
    locker: ["repair", "sample", "thermal"],
    equipped: "geology"
  });
  assert.equal(state.inventory.join(), "camera,scoop,hydrophone");
  assert.equal(state.locker.join(), "drill,sampleContainer,temperatureProbe");
  assert.equal(state.equipped, "scoop");
});

test("tool workflows advance through phases and play each cue once", () => {
  const game = makeGame("venus"), step = game.world.steps[0], cues = [];
  game.audio.playToolPhase = cue => cues.push(cue);
  game.inventory.acquire(step.tool);
  game.inventory.equip(step.tool);
  Object.assign(game.player, { x: step.x, y: step.y });
  game.beginToolAction(step.key);
  assert.equal(game.cinematic.duration, TOOL_WORKFLOWS.rockHammer.duration);
  game.updateCinematic(.56);
  assert.deepEqual(cues, ["impact"]);
  game.updateCinematic(.01);
  assert.deepEqual(cues, ["impact"]);
  game.updateCinematic(.7);
  game.updateCinematic(.65);
  assert.deepEqual(cues, ["impact", "impact", "impact"]);
  game.updateCinematic(game.cinematic.duration - game.cinematic.time + .1);
  assert.equal(game.state.missionSteps.includes(step.key), true);
  assert.equal(game.toolResult.step.key, step.key);
});

test("task poses keep the working tool anchored between glove and target", () => {
  for (const id of ["moon", "mercury", "venus", "earth", "mars"]) {
    const game = makeGame(id), step = game.world.steps[0];
    game.inventory.acquire(step.tool);
    game.inventory.equip(step.tool);
    Object.assign(game.player, { x: step.x, y: step.y, facing: 1 });
    game.beginToolAction(step.key);
    game.cinematic.time = game.cinematic.duration * .45;
    const pose = game.player.taskPose(game.cinematic, step);
    assert.ok(pose && Number.isFinite(pose.handWorld.x) && Number.isFinite(pose.handWorld.y), `${id}: invalid hand anchor`);
    assert.equal(pose.handWorld.x, game.player.x + pose.facing * pose.hand.x);
    assert.ok(Math.abs(step.x - pose.handWorld.x) < 50, `${id}: tool hand is detached from target`);
  }
});

test("physical pickups, abstract use markers and held tools stay visually distinct", () => {
  const renderMarker = (game, step, time = 1000, complete = false) => {
    const calls = [], writes = [];
    const ctx = new Proxy({}, {
      get: (target, key) => (...args) => calls.push({ key, args }),
      set: (target, key, value) => { writes.push({ key, value }); return true; }
    });
    game.world.drawTaskTarget(ctx, step, game, time, complete);
    return { calls, writes };
  };
  const forbidden = new Set(["fillRect", "strokeRect", "fillText", "ellipse", "quadraticCurveTo", "bezierCurveTo", "drawImage"]);
  let markerSignature = null, markerCount = 0;
  for (const id of DESTINATIONS) {
    const game = makeGame(id);
    for (const step of game.world.steps) {
      game.missions.remaining = () => [step];
      const marker = renderMarker(game, step), later = renderMarker(game, step, 1350);
      const signature = marker.calls.map(call => call.key).join(",");
      markerSignature ??= signature;
      assert.equal(signature, markerSignature, `${step.key}: tool type changed the marker geometry`);
      assert.ok(marker.calls.some(call => call.key === "setLineDash"), `${step.key}: scanning ring is missing`);
      assert.ok(marker.calls.filter(call => call.key === "arc").length >= 3, `${step.key}: pulse rings are missing`);
      assert.ok(marker.calls.filter(call => call.key === "arc").every(call => call.args[2] <= 28), `${step.key}: marker is too large`);
      assert.equal(marker.calls.some(call => forbidden.has(call.key)), false, `${step.key}: use marker resembles physical equipment`);
      assert.notDeepEqual(later.calls.filter(call => call.key === "arc").map(call => call.args), marker.calls.filter(call => call.key === "arc").map(call => call.args), `${step.key}: marker does not shimmer or scan`);
      game.cinematic = { type: "tool", key: "another:step" };
      assert.equal(renderMarker(game, step).calls.length, 0, `${step.key}: marker remains during a tool cinematic`);
      game.cinematic = null;
      assert.equal(renderMarker(game, step, 1000, true).calls.length, 0, `${step.key}: marker remains after completion`);
      step.active = false;
      assert.equal(renderMarker(game, step).calls.length, 0, `${step.key}: inactive marker still renders`);
      step.active = true;
      markerCount++;
    }
  }
  assert.ok(markerCount > 0, "no mission use locations were checked");

  const pickupGame = makeGame("venus"), pickupWorld = pickupGame.world, equipment = [];
  pickupWorld.drawEnvironment = pickupWorld.drawObstacle = pickupWorld.drawShip = pickupWorld.drawTaskTarget = pickupWorld.drawSpecimen = () => {};
  pickupWorld.drawEquipment = (ctx, object, id, options = {}) => equipment.push({ object, id, options });
  const gradient = { addColorStop() {} }, pickupCtx = new Proxy({}, {
    get: (target, key) => key === "createLinearGradient" || key === "createRadialGradient" ? () => gradient : () => {},
    set: () => true
  });
  pickupWorld.draw(pickupCtx, pickupGame, 1000);
  const activePickups = [pickupWorld.tool, ...pickupWorld.extraTools].filter(tool => tool.active);
  assert.equal(equipment.length, activePickups.length, "a physical pickup stopped using equipment art");
  assert.ok(equipment.every(entry => activePickups.includes(entry.object) && entry.options.held !== true), "a use location was rendered as a pickup");

  const actionGame = makeGame("moon"), actionStep = actionGame.world.steps[0];
  actionGame.inventory.acquire(actionStep.tool); actionGame.inventory.equip(actionStep.tool);
  Object.assign(actionGame.player, { x: actionStep.x, y: actionStep.y });
  actionGame.beginToolAction(actionStep.key);
  let heldTool = null;
  actionGame.world.drawEquipment = (ctx, object, id, options) => { heldTool = { id, held: options.held }; };
  actionGame.drawToolAction(new Proxy({}, { get: () => () => {}, set: () => true }), 1000);
  assert.deepEqual(heldTool, { id: actionStep.tool, held: true }, "tool action did not draw the backpack tool in the astronaut's hand");

  const promptGame = makeGame("mercury"), promptStep = promptGame.world.steps[0];
  for (const object of promptGame.world.objects()) object.active = object === promptStep;
  Object.assign(promptGame.player, { x: promptStep.x, y: promptStep.y });
  promptGame.detectNearby();
  assert.equal(promptGame.near.type, "task");
  assert.equal(element("span").textContent, "USE TOOL HERE · استخدم الأداة هنا");
  promptGame.world.tool.active = true; promptStep.active = false;
  Object.assign(promptGame.player, { x: promptGame.world.tool.x, y: promptGame.world.tool.y });
  promptGame.detectNearby();
  assert.equal(promptGame.near.type, "tool");
  assert.equal(element("span").textContent, "التقط الأداة");
});

test("wrong tools identify and visually request the required equipment", () => {
  const game = makeGame("mercury"), step = game.world.steps[0];
  let required = null;
  game.ui.requiredTool = id => { required = id; };
  Object.assign(game.player, { x: step.x, y: step.y });
  game.state.equipped = "camera";
  game.missions.useStep(step);
  assert.equal(required, "temperatureProbe");
  assert.equal(game.pendingToolAction, undefined);
});

test("sample records and field reports expose each physical stage", () => {
  assert.equal(SAMPLE_RECORDS.map(record => record.planet).join(), "moon,venus,mars");
  const game = makeGame("venus"), ui = new UIManager(game);
  game.ui = ui;
  game.state.missionSteps = ["venus:0"];
  ui.backpack();
  assert.match(ui.content.innerHTML, /شظية بركانية/);
  assert.match(ui.content.innerHTML, /مكشوفة في الموقع/);
  game.state.missionSteps.push("venus:1");
  ui.backpack();
  assert.match(ui.content.innerHTML, /داخل الحاوية/);
  game.state.missionSteps.push("venus:2");
  ui.backpack();
  assert.match(ui.content.innerHTML, /محفوظة ومثبت عليها بطاقة/);
  ui.toolResult(game.world.steps[2], TASK_SCIENCE["venus:2"]);
  assert.match(ui.content.innerHTML, /WHAT I DID/);
  assert.match(ui.content.innerHTML, /WHAT I FOUND/);
  assert.match(ui.content.innerHTML, /WHY IT MATTERS/);
  assert.match(ui.content.innerHTML, /3 \/ 3/);
});

test("Moon fieldwork stays active before the Mars departure clue", () => {
  const game = makeGame("moon");
  game.state.observations.push("moon");
  game.state.conversations.push("moon");
  game.state.explored.push("moon");
  assert.equal(game.missionStatus().code, "EQUIPMENT");
  game.inventory.acquire("scoop");
  assert.equal(game.missionStatus().code, "LUNAR REGOLITH SAMPLE");
  game.state.missionSteps.push("moon:0");
  assert.equal(game.missionStatus().code, "EQUIPMENT");
  game.inventory.acquire("sampleContainer");
  assert.match(game.missionStatus().text, /أغلق الحاوية/);
  game.state.missionSteps.push("moon:1");
  assert.equal(game.missionStatus().code, "FOLLOW THE RING → MARS");
});