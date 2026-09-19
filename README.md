# Saturn in Trouble

An educational space exploration game for children. This bilingual Canvas adventure follows seven story-character rings that deliberately
left Saturn. The seven characters are a storytelling choice, not an astronomical
claim about the number of physical rings.

Play the production release at https://saturn-in-trouble.pages.dev/.

## Play

Open the HTML entry point directly, or serve this directory locally:

```powershell
py -m http.server 8765 --bind 127.0.0.1
```

Open http://localhost:8765/index.html. Use another port if 8765 is occupied.
No build step, backend, or application framework is required. Google Fonts are
optional; the game uses fallback fonts when offline.

## Controls

- Arrow keys or WASD: walk or steer the spacecraft.
- Space: jump; press again in the air for a limited thruster boost.
- Shift: move faster.
- E: interact or continue dialogue.
- Tab: equipment; M: waypoint map; J: persistent Mission Log; Escape: pause or close.
- Touch controls: a right-thumb movement/action cluster and the bottom utility bar, including Pause.

The game opens with Saturn's story and the astronaut accepting the mission.
Starting the mission immediately places the spacecraft in the open Solar System.
Pilot freely to any destination and approach it before pressing E. There is no
prerequisite stage or tutorial screen. The map only sets a waypoint. Flight is
an assisted 2D simulation with gentle inertia, stable camera follow, and a slow
continuous approach scale, not a to-scale orbital mechanics model.

## Missions And Equipment

Nine destinations have field tasks and science photography. The Moon and Saturn
have no wandering ring. Mercury, Venus, Earth,
Mars, Jupiter, Uranus, and Neptune each have one. Gas and ice giants are explored
from atmospheric orbital regions, never by landing on a solid surface. Destination
gravity uses each body's approximate gravity relative to Earth; Free Space keeps
assisted flight controls.

Each destination has a visual-only environmental layer: persistent Venusian haze,
calm terrestrial clouds, directional Martian dust with intermittent stronger gusts,
soft Saturnian bands, subtle Uranian flow, and clear airless skies on Mercury and the Moon. Neptune uses seven
continuous gaseous layers plus a fixed six-wisp foreground pool with strongly
directional, multi-speed flow, turbulence, and smooth gust bursts. Jupiter uses
four continuous, alternating east/west gas bands with deterministic changes in
speed, amplitude, and local turbulence.
Open space, Mercury, and the Moon never
receive wind streaks. Native Web Audio adds quiet
surface and atmospheric character, subtle rocky footsteps, and tool-specific
feedback. Atmospheric gains and slow modulation are tuned independently for each
world. Neptune's low-frequency wind uses a continuous crossfaded noise bed with
slow filter and intensity gusts rather than a repeated effect. Vacuum flight uses
spacecraft and suit hum rather than impossible space wind, transitions fade between
environments, and ambience ducks under dialogue.
Sparse distant meteors add depth without becoming interactive objects,
hazards, resources, or mission requirements. Rocky terrain stays irregular and
natural, while giant-world exploration uses layered atmospheric clouds rather
than a solid ground plane. Saturn uses a compact spacecraft-linked observation
platform with bounded walking and no jumping.
Local skies use distinct deterministic star fields and
never repeat the visited planet as a background disk. At most one sufficiently
near planet is projected from the same simplified orbital layout used by Free
Space navigation. Selected moons belong only to their correct giant-planet system;
they are visual context, not a statement of each planet's total moon count.

Mars is a dedicated dry geological scene rather than generic red terrain. Muted
rust, tan, mauve, and basalt materials distinguish a cracked sedimentary lakebed,
two dry channels, eight differently sized and eroded impact craters, scattered rock
fields, and a broad layered canyon that remains traversable on foot. A distant
shield-volcano silhouette conveys the scale of Olympus Mons without adding a lava
hazard. The thin dusty sky contains a small Sun plus irregular Phobos and Deimos,
with no present-day open water, life, thick fog, or natural ring system. A bounded
six-wisp atmospheric layer and 28 deterministic ground particles move with the
prevailing wind; stronger gusts also modulate the matching low dry ambience, while
walking disturbs a short-lived puff of regolith.

Navigation follows the eight planets in solar order, each on its own orbital
path around the central Sun. Saturn keeps its banded ring system so it is
recognizable on sight. The Moon sits on a small orbit beside Earth and
contributes only to the separate nine-destination total. Arrival
never opens dialogue: leave the spacecraft, explore the surroundings, approach
the planet's contact marker, and press E. Speaker-labelled conversations persist
across interruption and reload. Each destination has a distinct conversation;
the Moon opens its gravity lesson, while the astronaut initiates the other
destination conversations. A ring-bearing planet gives its ring's physical location; the
separate physical ring enthusiastically shares its planet-specific science
discovery before the astronaut decides to continue the mission. Earth does not
teach Moon facts. The Moon speaks for itself, then its clue shows an intact ring
moving toward Mars and sets a waypoint without moving the player.

Observing a destination for the first time reveals a one-time discovery moment
with a local science fact. Discoveries persist in the Mission Log independently
of explored destinations and collected rings. The Mission Log also contains an
expandable Arabic space reference covering astronomy terms, Solar System objects,
exploration milestones, astronaut training and daily life, mission risks, and a
detailed Saturn section.

The planet lessons incorporate the supplied tour material while retaining the
mission structure. They cover Mercury's slow rotation, Venus's
brightness and reverse rotation, Earth's oceans and internal layers, Martian
gravity, Jupiter's short day and magnetic field, Uranus's methane-blue atmosphere,
Neptune's faint rings and arcs, and Saturn's size, atmosphere, orbit, moons,
spacecraft history, and complex ring system.

Fieldwork follows an observe, question, mission, tool choice, physical action,
result, explanation, and mission-progress loop. After observing a destination
and speaking with its contact, the astronaut approaches a small glowing use marker,
equips the requested instrument, and starts the action in place. A phased action
shows the astronaut bracing, reaching, measuring, drilling, scooping, sealing,
or servicing the target before the field report gives the recorded result and
explains why it matters.

The backpack carries up to six pieces of equipment. Overflow goes to the
spacecraft locker, and equipment can be retrieved through the equipment panel.
Essential equipment and the current mission tool cannot be stored manually.
The field kits include a rock hammer, scoop, tongs, sample container,
temperature probe, drill, hydrophone, radiation detector, navigation computer,
flashlight, heater, magnetometer, and scientific camera. Cases, instruments,
and other collectible tools are drawn as recognizable physical equipment. Tool-use
locations instead share one compact cyan-green scanning marker with no equipment
silhouette. The marker disappears when use begins; during the action the equipped
tool comes from the backpack, stays attached to the astronaut's gloved hand, and
follows the tool-specific motion and audio for the current phase.

Moon regolith, a Venusian rock chip, and a Martian core each progress through
their applicable exposed, collected, sealed, and labelled states. Their sample
records appear in the backpack without consuming extra slots. Mars fieldwork uses
the existing drill and sample-container workflow at the ancient lakebed, where
layered sediment can be tested for evidence of water that existed long ago. Its
Ring rests partly in a shallow crater beyond the canyon and owns the lesson about
ancient water, rusted iron, Olympus Mons, thin carbon-dioxide air, temperature
swings, Phobos, Deimos, and the roughly 24.6-hour sol. Earth's fieldwork
takes place below the ocean surface, where the astronaut aims a hydrophone and
compares acoustic pulses to locate the signal. The spacecraft lands on a broad,
clean sandy coast that fades through wet sand and transparent shallows before
deepening into blue water, with moving foam, reflections, and a continuous
walk-to-shallows-to-swim-to-dive transition. Below the surface, light rays,
suspended sediment, bubbles, six varied schools and six larger roaming fish
create a fixed population of 50, joined by coral, anemones, swaying plants,
crabs, shells, and starfish. A one-time child-like reaction appears without interrupting
movement, and Earth's Ring rests partly in seabed sand beside the reef.

A ring becomes visible only after the planet gives its clue, the local field
tasks are complete, and the astronaut searches near its location. Ring credit is
awarded after its collection animation, in place, without reloading the page.
The seventh ring starts a short automatic return through the existing Free Space
view. Controls remain suspended while the spacecraft follows a smooth path and
Saturn grows in view. It enters Saturn automatically, restores all seven rings,
and then Saturn explains their ice, rock, dust, reflected light, bands, gaps, and
thin but complex dynamic structure. The final exchange begins a cinematic
pull-back across the full Solar System before completing the mission. Exploration
counts and final statistics reflect actual progress. Home preserves the completed
save, while Play Again resets the mission in place.

## Saves

Continue resumes the existing local save. Actions, periodic autosaves, tab
visibility changes, and page exit save progress under `saturnSevenRingsV3`.
The version-9 loader retains this key and migrates earlier saves, deduplicates
progress, validates values, and moves excess carried equipment to the locker.
Saves from the removed introductory stage and affected Moon-start saves resume
in open space with mission progress retained; obsolete fields and positions are discarded.
An explicit schema discards obsolete resource fields. Conversation progress,
observations, clues, pending sightings, and the one-time ocean reaction are
persisted separately.
New Mission requires confirmation. Browser profiles and origins have separate
saves, including `localhost` versus `127.0.0.1`.

## Checks

With Node.js installed:

```powershell
node --test tests/game.test.cjs
```

The 93 isolated tests cover all destination prerequisites, phased tool workflows,
hand-to-tool anchoring, pickup/use-marker separation, field reports, sample records, inventory
overflow, marker-free exploration, duplicate awards, direct startup, travel guards,
reload migration, jump/boost behavior, orbital map layout, Saturn's rings, timed
completion, moving marine-life variation, seabed Ring placement, the persisted
ocean reaction, bounded deterministic Mars geology and dust, measurable Neptune
flow, supplied educational facts, and Mission Log reference rendering. Saturn
coverage verifies its compact deck, fixed boot contact, bounded movement, moving
cloud layers, and metallic footstep audio. The tests never access browser saves.
Browser acceptance checks additionally exercise immediate keyboard flight,
collection cancellation, waypoint travel, restoration, white Ring speech bubbles,
the expandable space reference, live Mars geology and wind, Canvas pixel content,
and desktop/mobile layouts in fresh contexts.

`tests/browser-qa.cjs` exports an async function that accepts a Playwright Browser
and an optional base URL. It runs the Earth/Moon clue, representative Mercury,
Moon, Mars, and Earth fieldwork, the seven-ring mission, reload, and Saturn return
flow in a fresh page. It positions the astronaut near mission objects to accelerate
travel; physical movement is checked separately by the Node collision suite and
keyboard flight acceptance run. The old unused five-ring implementation has been
removed; the HTML loads only the current game.