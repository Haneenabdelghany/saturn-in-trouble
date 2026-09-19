module.exports = async function verifyAdventure(browser, baseURL = "http://localhost:8765") {
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
  const errors = [], destinations = [];
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  page.on("pageerror", error => errors.push(error.message));
  const move = (type, index = 0) => page.evaluate(({ type, index }) => {
    const object = type === "task" ? game.world.steps[index] : type === "science" ? game.world.science[0] : type === "extra" ? game.world.extraTools[index] : game.world[type];
    Object.assign(game.player, { x: object.x, y: object.y, vx: 0, vy: 0 });
    game.detectNearby();
  }, { type, index });
  const equip = async id => {
    await page.locator("#backpack-btn").click();
    await page.locator(`[data-item="${id}"]`).click();
    await page.locator("#equip-item").click();
    await page.keyboard.press("Escape");
  };
  const advance = async () => {
    await page.waitForFunction(() => game.dialogue && performance.now() >= game.dialogue.nextAt);
    await page.keyboard.press("e");
  };
  const useTask = async index => {
    const key = await page.evaluate(index => game.world.steps[index].key, index);
    await move("task", index);
    const marker = await page.evaluate(index => {
      const step = game.world.steps[index], operations = [];
      const ctx = new Proxy({}, { get: (target, key) => (...args) => operations.push({ key, args }), set: () => true });
      game.world.drawTaskTarget(ctx, step, game, performance.now(), false);
      const owned = [...game.state.inventory, ...game.state.locker].filter(id => id === step.tool).length;
      return { active: step.active, near: game.near?.type, prompt: document.querySelector("#interaction-prompt span").textContent, operations: operations.map(call => call.key), owned };
    }, index);
    assert(marker.active && marker.near === "task", `${key}: use location is not an active task`);
    assert(marker.prompt === "USE TOOL HERE · استخدم الأداة هنا", `${key}: use location prompt looks like a pickup`);
    assert(marker.operations.includes("arc") && marker.operations.includes("setLineDash"), `${key}: glowing use marker is missing`);
    assert(!marker.operations.some(operation => ["fillRect", "strokeRect", "fillText", "ellipse", "quadraticCurveTo", "drawImage"].includes(operation)), `${key}: use marker contains physical tool art`);
    assert(marker.owned === 1, `${key}: equipped tool is not stored exactly once before use`);
    await page.keyboard.press("e");
    assert(await page.locator(".tool-science").isVisible(), `${key}: tool explanation did not open`);
    assert(!await page.evaluate(key => game.state.missionSteps.includes(key), key), `${key}: task auto-completed before the action`);
    assert((await page.locator(".tool-science").innerText()).includes("إيه دي؟") && (await page.locator(".tool-science").innerText()).includes("هستخدمها إزاي؟"), `${key}: tool purpose or usage is missing`);
    await page.locator("#use-mission-tool").click();
    await page.waitForFunction(key => game.cinematic?.type === "tool" && game.cinematic.key === key, key);
    await page.waitForFunction(key => {
      const step = game.world.steps.find(step => step.key === key);
      return game.cinematic?.key === key && game.cinematic.phase !== TOOL_WORKFLOWS[step.tool].phases[0].id;
    }, key);
    const physical = await page.evaluate(key => {
      const step = game.world.steps.find(step => step.key === key), pose = game.player.taskPose(game.cinematic, step);
      const markerOperations = [], markerCtx = new Proxy({}, { get: (target, property) => (...args) => markerOperations.push({ property, args }), set: () => true });
      game.world.drawTaskTarget(markerCtx, step, game, performance.now(), false);
      let held = null; const drawEquipment = game.world.drawEquipment;
      try {
        game.world.drawEquipment = (ctx, object, id, options) => { held = { id, held: options.held === true }; };
        game.drawToolAction(new Proxy({}, { get: () => () => {}, set: () => true }), performance.now());
      } finally { game.world.drawEquipment = drawEquipment; }
      return { duration: game.cinematic.duration, phase: game.cinematic.phase, handGap: Math.abs(step.x - pose.handWorld.x), zoom: game.camera.zoom, markerOperations: markerOperations.length, held };
    }, key);
    assert(physical.duration >= 2.5 && physical.phase && physical.handGap <= 50 && physical.zoom > 1, `${key}: physical tool action is not visibly coordinated`);
    assert(physical.markerOperations === 0 && physical.held?.id && physical.held.held, `${key}: marker remained visible or backpack tool did not appear in hand`);
    await page.waitForFunction(key => game.state.missionSteps.includes(key) && document.querySelector(".tool-science.result"), key);
    const completed = await page.evaluate(key => {
      const step = game.world.steps.find(step => step.key === key), operations = [];
      game.world.drawTaskTarget(new Proxy({}, { get: (target, property) => (...args) => operations.push({ property, args }), set: () => true }), step, game, performance.now(), true);
      return { active: step.active, operations: operations.length, owned: [...game.state.inventory, ...game.state.locker].filter(id => id === step.tool).length };
    }, key);
    assert(!completed.active && completed.operations === 0, `${key}: completed use marker is still active`);
    assert(completed.owned === 1, `${key}: tool use duplicated or removed the backpack item`);
    const report = await page.locator(".field-report").innerText();
    assert(report.includes("WHAT I DID") && report.includes("WHAT I FOUND") && report.includes("WHY IT MATTERS"), `${key}: structured result is missing`);
    assert((await page.locator(".mission-step-progress").innerText()).includes("MISSION PROGRESS"), `${key}: mission progress is missing`);
    await page.locator("#close-tool-result").click();
  };
  try {
    await page.goto(`${baseURL}/index.html`);
    assert((await page.locator(".saturn-speech").innerText()).includes("حلقاتي مشت و سابتني... قالوا زهقوا مني!"), "Saturn opening is missing");
    await page.locator("#start-btn").click();
    assert(await page.evaluate(() => game.state.location === "space" && !game.paused && game.world.planetNodes.length === 9), "Mission did not start in free flight");
    assert(!await page.locator("#modal").evaluate(element => element.classList.contains("open")), "Start opened an intermediate screen");
    await page.keyboard.down("ArrowRight");
    await page.waitForFunction(() => game.player.x > 700);
    await page.keyboard.up("ArrowRight");
    await page.locator("#map-btn").click();
    assert(await page.locator('[data-destination="earth"]').isEnabled(), "Map is gated at startup");
    await page.keyboard.press("Escape");
    for (const id of ["earth", "moon", "mars", "mercury", "venus", "jupiter", "uranus", "neptune"]) {
      await page.evaluate(id => {
        const node = game.world.planetNodes.find(node => node.id === id);
        Object.assign(game.player, { x: node.x, y: node.y, vx: 0, vy: 0 });
      }, id);
      await page.keyboard.press("e");
      await page.waitForFunction(id => game.state.location === id, id);
      assert(!await page.locator("#modal").evaluate(element => element.classList.contains("open")), `${id}: automatic arrival popup`);
      assert(!await page.evaluate(() => game.canTalk()), `${id}: arrival bypassed exploration`);
      if (id === "earth") {
        const coast = await page.evaluate(() => ({ x: game.player.x, shore: game.world.water.shoreX, ground: PLANETS.earth.ground, marine: game.world.marineLife }));
        assert(coast.x < coast.shore && coast.ground === "#c9b77f", "Earth did not start on natural sand");
        assert(coast.marine.schools.reduce((count, school) => count + school.count, 0) === 44 && coast.marine.individuals.length === 6 && coast.marine.corals.length >= 6 && coast.marine.crabs.length >= 3, "Earth ocean ecosystem is incomplete");
      }
      if (id === "mars") {
        const environment = await page.evaluate(() => {
          const world = game.world, geology = world.geology, profile = ATMOSPHERE_PROFILES.mars;
          const flowAt = time => {
            const points = [], ctx = new Proxy({}, { get: (target, key) => (...args) => { if (key === "translate") points.push(args); return { addColorStop() {} }; }, set: () => true });
            world.drawAtmosphericFlow(ctx, game.camera, time, { width: game.viewWidth, height: game.viewHeight });
            return points;
          };
          const first = flowAt(1000), next = flowAt(1250), canyonFloor = world.groundAt(geology.canyon.center);
          return {
            dry: !world.water && !world.marineLife,
            naturalRings: Object.hasOwn(geology, "rings"),
            craters: geology.craters.length,
            craterSizes: new Set(geology.craters.map(crater => `${crater.rx}:${crater.ry}`)).size,
            channels: geology.channels.length,
            moons: geology.moons.map(moon => moon.name),
            lakebedTasks: world.steps.every(step => Math.abs(step.x - geology.lakebed.center) <= geology.lakebed.width),
            canyonRelief: canyonFloor - Math.min(world.groundAt(geology.canyon.leftRim), world.groundAt(geology.canyon.rightRim)),
            ringGap: world.groundAt(world.ring.x) - world.ring.y,
            ringCrater: geology.craters.some(crater => crater.x === world.ring.x && crater.rx >= 80),
            wisps: first.length,
            displacement: Math.max(...first.map((point, index) => Math.abs(point[0] - next[index][0]))),
            directional: profile.flow.directions.every(direction => direction === 1),
            gust: profile.gust,
            burst: profile.flow.burst
          };
        });
        assert(environment.dry && !environment.naturalRings, "Mars gained present-day water, life, or natural rings");
        assert(environment.craters === 8 && environment.craterSizes === 8 && environment.channels === 2, "Mars geology lost its varied craters or dry channels");
        assert(environment.moons.join() === "phobos,deimos" && environment.canyonRelief > 70, "Mars moons or large canyon relief are missing");
        assert(environment.lakebedTasks && environment.ringCrater && environment.ringGap === 22, "Mars fieldwork or Ring is detached from the geology");
        assert(environment.wisps === 6 && environment.displacement > 8 && environment.directional && environment.gust >= .4 && environment.burst >= .5, "Mars dust is static, directionless, or over budget");
      }
      if (id === "neptune") {
        const flow = await page.evaluate(() => {
          const positions = time => { const points = [], ctx = new Proxy({}, { get: (target, key) => (...args) => { if (key === "translate") points.push(args); return { addColorStop() {} }; }, set: () => true }); game.world.drawAtmosphericFlow(ctx, game.camera, time, { width: game.viewWidth, height: game.viewHeight }); return points; };
          const first = positions(1000), next = positions(1250), profile = ATMOSPHERE_PROFILES.neptune;
          return { count: first.length, displacement: Math.max(...first.map((point, index) => Math.abs(point[0] - next[index][0]))), profile };
        });
        assert(flow.count === 6 && flow.displacement > 10 && flow.profile.flow.turbulence >= 12 && flow.profile.flow.burst >= .6, "Neptune wind is static, weak, or over budget");
      }
      if (id === "moon") {
        await page.keyboard.down("ArrowRight");
        await page.waitForFunction(() => game.state.observations.includes("moon"));
        await page.keyboard.up("ArrowRight");
      } else {
        await move("observation");
      }
      await page.waitForFunction(id => game.state.discoveries.includes(id), id);
      const ringsBeforeLog = await page.evaluate(() => game.state.rings.length);
      await page.locator("#journal-btn").click();
      assert((await page.locator(".tech-title").innerText()).includes("MISSION LOG"), `${id}: Mission Log did not open`);
      assert((await page.locator(".journal-entry").nth(["mercury", "venus", "earth", "moon", "mars", "jupiter", "saturn", "uranus", "neptune"].indexOf(id)).innerText()).includes("PLANET DISCOVERED"), `${id}: discovery was not logged`);
      if (id === "earth") {
        const reference = page.locator(".space-reference"), groups = reference.locator(".reference-group");
        assert(await reference.isVisible() && await groups.count() === 5, "Mission Log space reference is missing or incomplete");
        assert((await groups.first().innerText()).includes("مليارات النجوم"), "astronomy basics are missing from the reference");
        await groups.last().locator("summary").click();
        const saturnFacts = await groups.last().innerText();
        assert(saturnFacts.includes("293 قمرًا") && saturnFacts.includes("بايونير 11"), "Saturn reference facts are missing");
      }
      await page.keyboard.press("Escape");
      assert(await page.evaluate(count => game.state.rings.length === count, ringsBeforeLog), `${id}: Mission Log changed ring progress`);
      await move("contact");
      await page.keyboard.press("e");
      const openingSpeaker = id === "moon" ? "القمر" : "رائد الفضاء";
      assert((await page.locator("#dialogue-speaker").innerText()) === openingSpeaker, `${id}: incorrect opening speaker`);
      if (id === "moon") {
        assert((await page.locator("#dialogue-line").innerText()).includes("سدس جاذبية الأرض"), "Moon did not teach gravity first");
        const dialogueIndex = await page.evaluate(() => {
          const index = game.dialogue.index;
          game.dialogue.nextAt = performance.now() + 250;
          for (let repeat = 0; repeat < 20; repeat++) game.advanceDialogue();
          game.ui.map(); game.ui.backpack(); game.enterSpace(true);
          return index;
        });
        assert(await page.evaluate(index => game.dialogue.index === index && game.state.location === "moon", dialogueIndex), "Dialogue spam or menus changed the scene");
        await advance();
        await page.reload();
        await page.locator("#start-btn").click();
        assert(!await page.locator("#modal").evaluate(element => element.classList.contains("open")), "Reload auto-opened dialogue");
        await page.keyboard.press("e");
        assert(await page.evaluate(() => game.dialogue.index === 1), "Interrupted dialogue did not resume");
        const renderedTurns = [];
        while (await page.evaluate(() => Boolean(game.dialogue))) {
          renderedTurns.push(await page.locator("#dialogue-line").innerText());
          await advance();
        }
        const renderedConversation = renderedTurns.join(" ");
        assert(/كتلتك.*وزنك أقل/.test(renderedConversation), "Moon gravity explanation was skipped");
        assert(/حلقاته السبع.*ناحية المريخ/.test(renderedConversation), "Moon ring-mission guidance was skipped");
        assert(/مغرفة العينات.*حاوية العينات.*الحقيبة.*اضغط E/.test(renderedConversation), "Moon tool guidance was skipped");
      }
      while (await page.evaluate(() => Boolean(game.dialogue))) await advance();
      if (id === "moon") {
        assert(await page.evaluate(() => game.state.sightingPending && game.waypoint === "mars" && !game.state.rings.includes("moon")), "Moon clue did not start sighting");
        await page.waitForFunction(() => game.sighting?.time > .5);
        await page.screenshot();
        const firstPixels = await page.locator("canvas").evaluate(canvas => canvas.toDataURL());
        await page.waitForFunction(() => game.sighting?.time > 2);
        const secondPixels = await page.locator("canvas").evaluate(canvas => canvas.toDataURL());
        assert(firstPixels !== secondPixels, "Sighting has no visual motion");
        await page.waitForFunction(() => !game.state.sightingPending);
        await page.keyboard.press("e");
        while (await page.evaluate(() => Boolean(game.dialogue))) await advance();
        assert(!await page.evaluate(() => game.state.sightingPending), "Repeat dialogue duplicated sighting");
      }
      if (id === "earth") {
        await page.evaluate(() => Object.assign(game.player, { x: game.world.water.shoreX - 70, y: game.world.groundAt(game.world.water.shoreX - 70) - game.player.height / 2, vx: 0, vy: 0 }));
        await page.keyboard.down("ArrowRight"); await page.keyboard.down("ArrowDown");
        await page.waitForFunction(() => game.player.swimming && game.player.submerged && game.state.earthOceanReaction && game.oceanReaction);
        await page.keyboard.up("ArrowDown"); await page.keyboard.up("ArrowRight");
        assert(await page.evaluate(() => game.player.x > game.world.water.shoreX && game.player.y > game.world.water.surfaceY && game.state.earthOceanReaction), "Earth keyboard swim or underwater wonder reaction failed");
      }
      await move("tool"); await page.keyboard.press("e"); await page.keyboard.press("e");
      const activeExtras = await page.evaluate(() => game.world.extraTools.map((tool, index) => tool.active ? index : -1).filter(index => index >= 0));
      for (const index of activeExtras) {
        await move("extra", index); await page.keyboard.press("e"); await page.keyboard.press("e");
      }
      const tools = await page.evaluate(() => game.world.steps.map(step => step.tool));
      if (id === "mercury") {
        await equip("camera"); await move("task", 0); await page.keyboard.press("e");
        assert(await page.locator("#backpack-btn").evaluate(element => element.classList.contains("tool-needed")), "Mercury wrong-tool guidance did not highlight the backpack");
        assert((await page.locator("#toast").innerText()).includes("مسبار حرارة"), "Mercury wrong-tool guidance did not name the probe");
      }
      for (let index = 0; index < tools.length; index++) {
        await equip(tools[index]); await useTask(index);
      }
      const sampleNames = { moon: "تربة قمرية", venus: "شظية بركانية", mars: "قلب صخري مريخي" };
      if (sampleNames[id]) {
        await page.locator("#backpack-btn").click();
        const sample = await page.locator(".sample-row").filter({ hasText: sampleNames[id] }).innerText();
        assert(sample.includes("محفوظة ومثبت عليها بطاقة"), `${id}: sample is not sealed and labeled in the backpack`);
        await page.keyboard.press("Escape");
      }
      await equip("camera"); await move("science"); await page.keyboard.press("e");
      if (id !== "moon") {
        await move("ring"); await page.keyboard.press("e");
        const ringTurns = [];
        for (let line = 0; line < 7; line++) {
          ringTurns.push(await page.locator(".ring-discovery").innerText());
          assert(await page.locator(".ring-line").count() === 1, `${id}: ring science rendered as a paragraph dump`);
          const bubble = await page.locator(".modal-card").evaluate((card, line) => ({ white: getComputedStyle(card).backgroundColor, thinking: getComputedStyle(card.querySelector(".planet-speech"), "::before").display, astronaut: card.classList.contains("astronaut-bubble"), object: card.classList.contains("object-bubble"), line }), line);
          assert(bubble.white === "rgba(255, 255, 255, 0.96)" && bubble.thinking === "none" && (line % 2 === 0 ? bubble.astronaut : bubble.object), `${id}: Ring exchange did not use the white speech-bubble system`);
          if (line < 6) await page.keyboard.press("e");
        }
        const ringConversation = ringTurns.join(" ");
        assert(ringConversation.includes("رائد الفضاء") && ringConversation.includes("حلقة زحل") && ringConversation.includes("واحدة من حلقات زحل"), `${id}: ring did not identify both speakers`);
        assert(await page.locator(".ring-line").evaluate(element => element.classList.contains("astronaut")), `${id}: astronaut did not close the mission exchange`);
        assert(!/زحل مستنيني|لازم أرجع لزحل|رجعيني لزحل|لازم نرجع بسرعة/.test(ringConversation) && ringTurns.length === 7, `${id}: ring took ownership of the mission`);
        if (id === "mars") {
          await page.keyboard.press("Escape");
          assert(!await page.evaluate(() => game.state.rings.includes("mars")), "Canceled pickup awarded ring");
          await page.keyboard.press("e");
          for (let line = 0; line < 7; line++) await page.keyboard.press("e");
        }
        await page.keyboard.press("e"); await page.keyboard.press("e");
        if (id === "neptune") {
          await page.waitForFunction(() => game.state.location === "space" && game.waypoint === "saturn" && game.cinematic?.type === "return" && game.cinematic.phase === "flight");
          const returnStart = await page.evaluate(() => ({ x: game.cinematic.startX, y: game.cinematic.startY }));
          assert(await page.evaluate(() => game.paused && Object.values(game.keys).every(value => !value)), "Final autopilot restored player control");
          await page.waitForFunction(() => game.cinematic?.type === "return" && game.cinematic.time > 1.25);
          assert(await page.evaluate(start => Math.hypot(game.player.x - start.x, game.player.y - start.y) > 100, returnStart), "Final autopilot did not visibly move the spacecraft");
          await page.waitForFunction(() => game.cinematic?.type === "restoration");
          assert(await page.evaluate(() => game.state.location === "saturn" && !game.state.finalReturnPending && !Object.hasOwn(game.world, "saturnPlatform") && game.player.x === game.world.ship.x && game.player.y === game.world.ship.y), "Autopilot did not arrive beside Saturn's lander on natural terrain");
          assert(await page.locator(".restoration-system i").count() === 7, "Restoration does not have seven rings");
          assert(!await page.evaluate(() => game.state.complete), "Finale completed before Saturn spoke");
          await page.waitForFunction(() => game.restorationReady && document.querySelector("#continue-saturn"));
          for (let line = 0; line < 8; line++) {
            await page.locator("#continue-saturn").click();
            if (line < 7) await page.waitForFunction(index => game.finalDialogueIndex === index, line + 1);
          }
          assert(await page.evaluate(() => game.cinematic?.type === "finale" && !game.state.complete), "Final pull-back was skipped");
          await page.waitForFunction(() => game.state.complete);
          break;
        }
        await page.waitForFunction(() => !game.cinematic);
        const count = await page.evaluate(() => game.state.rings.length);
        await page.keyboard.press("e");
        assert(await page.evaluate(() => game.state.rings.length) === count, "Duplicate ring credit");
        if (id === "mars") {
          await page.reload(); await page.locator("#start-btn").click();
          assert(await page.evaluate(() => game.state.rings.includes("mars") && game.state.conversations.includes("mars") && !game.world.ring.active), "Reload lost collection or conversation");
        }
      }
      const result = await page.evaluate(() => ({ id: game.state.location, rings: game.state.rings.length, planets: game.exploredPlanets(), complete: game.state.complete, hud: document.querySelector("#rings-stat").textContent }));
      assert(!result.complete && result.hud === `${result.rings}/7`, "Premature ending or stale HUD");
      destinations.push(result);
      await move("ship"); await page.keyboard.press("e");
      await page.waitForFunction(() => game.state.location === "space");
    }
    const final = await page.locator(".final-stats").innerText();
    assert(await page.locator("#play-again-btn").isVisible() && await page.locator("#home-btn").isVisible(), "Final actions are missing");
    await page.locator("#home-btn").click();
    assert(await page.evaluate(() => game.state.complete && game.state.rings.length === 7 && document.querySelector("#intro-screen").classList.contains("active") && document.querySelector("#start-btn").hidden), "Home did not preserve the completed save");
    await page.evaluate(() => game.showScreen("final"));
    await page.locator("#play-again-btn").click();
    assert(await page.evaluate(() => !game.state.started && !game.state.complete && game.state.location === "base" && game.state.rings.length === 0 && document.querySelector("#intro-screen").classList.contains("active")), "Play Again did not reset the completed mission");
    assert(!/undefined|NaN|null/.test(await page.locator("body").innerText()), "Invalid UI text");
    assert(await page.locator("#scanner-btn").count() === 0, "Scanner control still present");
    assert(errors.length === 0, errors.join("; "));
    return { destinations, final, errors };
  } finally { await page.close(); }
};