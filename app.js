/**
 * NEXUS CAD // Holographic Neon Machine & Pixel Cloud Workspace
 * Universal Iron Man Holographic CAD System
 * Real-World Transportation & Aerospace Engines + Wire Harnesses & Microchips + Modular Touchless Sandbox
 * 
 * Machine Catalog:
 *   1. 4-Stroke DOHC Bike Engine (Hero Real-World Engine)
 *   2. Twin-Turbo V8 Car Engine
 *   3. Compact 3-Wheeler Auto-Rickshaw Engine
 *   4. Heavy Agricultural Tractor Diesel Engine
 *   5. 13L Heavy Commercial Truck & Bus Diesel
 *   6. Massive V16 Freight Locomotive Powerplant
 *   7. Commercial High-Bypass Jet Turbofan (CFM/GE)
 *   8. Liquid Staged Combustion Rocket Engine
 *   9. Multi-Stage Epicyclic Planetary Gearbox
 *  10. 6-Axis Robotic Harmonic Actuator Joint
 */

// -------------------------------------------------------------
// Web Audio Sci-Fi Synthesizer
// -------------------------------------------------------------
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playPinchLock() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(740, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1480, this.ctx.currentTime + 0.07);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.07);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.07);
    } catch (e) {}
  }

  playAirClick() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(2400, this.ctx.currentTime + 0.09);
      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.09);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch (e) {}
  }

  playHoverTick() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(980, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch (e) {}
  }

  playSnapLock() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05);
      osc.frequency.exponentialRampToValueAtTime(1760, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.14);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.14);
    } catch (e) {}
  }
}

const audio = new SoundEngine();

// -------------------------------------------------------------
// Deep Engineering CAD Component Registry (Real-World Parameters)
// -------------------------------------------------------------
const COMPONENT_SPECS = {
  // 1. BIKE ENGINE
  bike_crankcase: { name: "Split Crankcase & Oil Sump", sub: "Engine Block", eng: "Integrated 6-Speed Casing", mat: "Gravity Die-Cast AlSi9Cu3", rpm: "0 (Static)" },
  bike_crankshaft: { name: "Counterweighted Crank & Magneto", sub: "Reciprocating Hub", eng: "Stroke 63.4mm, 449.7cc", mat: "Carburized 18CrNiMo7-6", rpm: "11,500 RPM REDLINE" },
  bike_conrod: { name: "Forged H-Beam Connecting Rod", sub: "Kinematic Link", eng: "C-to-C: 108mm, Bronze Bushing", mat: "Forged 4340 Nickel Chromoly", rpm: "11,500 RPM Peak" },
  bike_piston: { name: "Forged Slipper-Skirt Piston", sub: "Combustion Seal", eng: "Bore 95.0mm, 3-Ring Lands", mat: "Forged 4032 Low-Expansion Al", rpm: "24.3 m/s Mean Speed" },
  bike_cylinder: { name: "Deep-Finned Cylinder Barrel", sub: "Thermal Block", eng: "Nikasil (Ni-SiC) Bore Coated", mat: "Hypereutectic Al-Si Alloy", rpm: "Thermal: 220°C Max" },
  bike_head: { name: "DOHC Cylinder Head & 4-Valves", sub: "Gas Exchange", eng: "38mm In / 31mm Ex, 12.5:1 CR", mat: "A356-T6 Al + Ti-6Al-4V Valves", rpm: "Dual Overhead Cam" },
  bike_clutch: { name: "Multi-Plate Wet Clutch Pack", sub: "Torque Coupling", eng: "7 Friction / 8 Steel Discs", mat: "Kevlar-Paper / C75 Steel", rpm: "Primary: 2.14:1" },
  bike_exhaust: { name: "Swept Tuned Header Manifold", sub: "Gas Expansion", eng: "Mandrel Bent 42mm OD Runner", mat: "SUS304 Stainless Steel", rpm: "Acoustic Scavenging" },
  bike_harness: { name: "Ignition Lead & Sensor Harness", sub: "Electronics", eng: "CAN-Bus 1Mbps, EFI Injection", mat: "Tefzel Shielded Copper", rpm: "Signal: 12V 10A" },
  bike_ecu: { name: "Digital Engine Control Module", sub: "Electronics", eng: "32-Bit Dual Core DSP, 40MHz", mat: "FR4 PCB / Polycarbonate Case", rpm: "Firmware: v4.8 EFI" },

  // 2. CAR ENGINE (Twin-Turbo V8)
  car_block: { name: "Twin-Turbo 90° V8 Cylinder Block", sub: "Engine Block", eng: "4.0L Displacement, Cross-Bolted", mat: "AlSi7Mg Cast Alloy", rpm: "0 (Static)" },
  car_crankshaft: { name: "Crossplane V8 Crankshaft", sub: "Crank Assembly", eng: "Stroke 82.0mm, 8 Throws", mat: "Forged Microalloyed Steel", rpm: "7,800 RPM Redline" },
  car_turbos: { name: "Dual Twin-Scroll Turbochargers", sub: "Forced Induction", eng: "Boost 1.8 bar, Billet Wheels", mat: "Inconel 713C / Titanium", rpm: "185,000 RPM Spool" },
  car_heads: { name: "Dual Quad-Cam Cylinder Heads", sub: "Cylinder Heads", eng: "32-Valves, Variable Timing (VVT)", mat: "Heat-Treated A356 Al", rpm: "Double DOHC Banks" },
  car_plenum: { name: "Symmetric Intake Plenum Runners", sub: "Induction", eng: "Tuned Runner Length 210mm", mat: "Molded Carbon Composite", rpm: "Vacuum 0.95 bar" },
  car_harness: { name: "Automotive ECU Wiring Loom", sub: "Electrical Bus", eng: "Full Chassis CAN & FlexRay", mat: "High-Temp Cross-Linked PE", rpm: "Signal: 50A Max" },

  // 3. AUTO ENGINE (Compact 3-Wheeler)
  auto_case: { name: "Compact Commuter Crankcase", sub: "Powertrain", eng: "198cc 4-Stroke Unit Block", mat: "Pressure Die-Cast Aluminum", rpm: "0 (Static)" },
  auto_fan_shroud: { name: "Forced Cooling Fan Shroud", sub: "Thermal Control", eng: "High-Volume Centrifugal Vanes", mat: "Stamped Sheet Steel", rpm: "Engine Direct Drive" },
  auto_cylinder: { name: "Cast Iron Finned Cylinder", sub: "Thermal Block", eng: "Ductile Iron Bore 63.5mm", mat: "Grade 250 Grey Cast Iron", rpm: "Air-Cooled 190°C" },
  auto_carb: { name: "Variable Venturi Carburetor", sub: "Fuel Delivery", eng: "Venturi 24mm, Mechanical Slide", mat: "Zinc Alloy Die Cast", rpm: "Atmospheric" },

  // 4. TRACTOR ENGINE (Agricultural Diesel)
  tractor_block: { name: "Structural Cast Heavy Diesel Block", sub: "Chassis Member", eng: "4.5L Inline-4, Wet Liners", mat: "High-Strength Cast Iron", rpm: "2,200 RPM Governed" },
  tractor_pump: { name: "Inline Mechanical Fuel Injection", sub: "Fuel System", eng: "Plunger Pump, 1,200 bar", mat: "Hardened Tool Steel", rpm: "Cam-Driven 1,100 RPM" },
  tractor_flywheel: { name: "High-Inertia Industrial Flywheel", sub: "Kinetic Storage", eng: "Mass 48kg, Diameter 420mm", mat: "Nodular Ductile Iron", rpm: "2,200 RPM Max" },
  tractor_filter: { name: "Dual Oil-Bath Air Cleaner", sub: "Filtration", eng: "Cyclone Pre-Cleaner 99.8% Eff", mat: "Deep-Drawn Sheet Steel", rpm: "High Dust Rating" },

  // 5. TRUCK & BUS HEAVY DIESEL (13L)
  truck_block: { name: "13-Liter Heavy Commercial Block", sub: "Powertrain", eng: "Bore 130mm x Stroke 160mm", mat: "Compacted Graphite Iron (CGI)", rpm: "1,900 RPM Governed" },
  truck_common_rail: { name: "2,500-Bar Common Rail System", sub: "Fuel Delivery", eng: "Piezo Common Rail Tube", mat: "Forged Martensitic Steel", rpm: "Pressure 250 MPa" },
  truck_turbo: { name: "Variable Geometry Turbo (VGT)", sub: "Forced Induction", eng: "Moving Nozzle Vanes, 2.6 bar", mat: "Nickel-Resist Iron & Inconel", rpm: "130,000 RPM" },
  truck_head: { name: "Monolithic CGI Overhead Cam Head", sub: "Valve Train", eng: "Integrated Compression Brake", mat: "Compacted Graphite Iron", rpm: "24 Heavy Valves" },

  // 6. TRAIN LOCOMOTIVE POWERPLANT (V16)
  train_crankcase: { name: "Fabricated V16 Locomotive Block", sub: "Prime Mover", eng: "175 Liters, 4,400 HP Rating", mat: "Welded Structural Steel Plate", rpm: "1,050 RPM Rated" },
  train_turbos: { name: "Dual Heavy Locomotive Turbochargers", sub: "Induction", eng: "Twin Heavy Industrial Turbos", mat: "Cast Steel & Nimonic 90", rpm: "35,000 RPM" },
  train_alternator: { name: "Traction Alternator Coupling Hub", sub: "Electrical Gen", eng: "Output 3.2 MW AC Power", mat: "Forged Alloy Shaft / Copper", rpm: "1,050 RPM Direct" },

  // 7. AEROPLANE TURBOFAN
  cone: { name: "Aero Intake Cowl Cone", sub: "Air Induction", eng: "CFM/GE90 Class Geometry", mat: "Ti-6Al-4V Titanium", rpm: "0 (Static)" },
  fan: { name: "Wide-Chord Fan Rotor (18 Blades)", sub: "LP Compression", eng: "Bypass Ratio 10:1, Hollow Blade", mat: "Titanium Alloy Hollow Cavity", rpm: "3,200 RPM N1" },
  compressor: { name: "Axial Compressor Staged Disks", sub: "HP Compression", eng: "Pressure Ratio 40:1, 4 Stages", mat: "Nickel Superalloy", rpm: "12,400 RPM N2" },
  combustor: { name: "Annular Combustor Core & Nozzles", sub: "Combustion", eng: "16 Aerodynamic Swirl Injectors", mat: "Ceramic Matrix Composite (CMC)", rpm: "Thermal: 1,650°C" },
  turbine: { name: "High-Pressure Turbine Stage", sub: "Power Extraction", eng: "Single-Crystal Inconel 718", mat: "Single-Crystal Superalloy", rpm: "12,400 RPM N2" },
  nozzle: { name: "Exhaust Thrust Nozzle Cowl", sub: "Expansion", eng: "Supersonic Convergent Nozzle", mat: "Cobalt Base Superalloy", rpm: "0 (Static)" },

  // 8. ROCKET ENGINE
  rocket_turbopump: { name: "Dual Staged Fuel/Oxidizer Turbopump", sub: "Propellant Feed", eng: "Delivery: 850 kg/s @ 350 bar", mat: "Monel / Inconel 718", rpm: "36,000 RPM" },
  rocket_preburner: { name: "Oxygen-Rich Preburner Chamber", sub: "Gas Generation", eng: "Chamber Pressure 280 bar", mat: "Copper-Zirconium Liner", rpm: "Combustion: 900 K" },
  rocket_gimbal: { name: "Dual Hydraulic Gimbal Actuators", sub: "Thrust Vectoring", eng: "Vector Angle ±8.5°, 120 kN Force", mat: "Aerospace 7075 Al / Steel", rpm: "Dynamic Servo" },
  rocket_combustor: { name: "Regenerative Main Combustion Chamber", sub: "Thrust Chamber", eng: "Chamber Pressure 220 bar", mat: "GRCop-84 High-Cond Copper", rpm: "Thermal: 3,300 K" },
  rocket_bell: { name: "Contoured Regenerative Bell Nozzle", sub: "Expansion Nozzle", eng: "Area Ratio 45:1, Cooling Channels", mat: "Inconel 625 Brazed Jacket", rpm: "Thrust: 2,200 kN" },

  // 9. GEARBOX
  shaft_in: { name: "Input Drive Shaft", sub: "Torque Coupling", eng: "Splined Input Hub", mat: "AISI 4340 Alloy Steel", rpm: "6,000 RPM" },
  sun_gear: { name: "Sun Drive Spur Gear", sub: "Planetary Reduction", eng: "14-Tooth Involute Tooth Mesh", mat: "Case-Hardened 8620 Steel", rpm: "6,000 RPM" },
  planet_gears: { name: "Triple Planet Carrier Assembly", sub: "Epicyclic Train", eng: "3 x 24-Tooth Planet Gears", mat: "Carburized Steel", rpm: "1,800 RPM" },
  ring_gear: { name: "Internal Annulus Ring Gear", sub: "Outer Ring", eng: "Internal Tooth Form", mat: "Nitrided Alloy Steel", rpm: "0 (Locked)" },
  shaft_out: { name: "Output Hub Flange", sub: "Load Hub", eng: "6-Bolt Flange Circle", mat: "Forged High-Strength Steel", rpm: "1,200 RPM" },

  // 10. ROBOT ARM
  base_turret: { name: "Base Turret Mounting Flange", sub: "Kinematic Base", eng: "Radial Bolt Pattern, Center Bore", mat: "Cast Aerospace Aluminum", rpm: "±360° Yaw" },
  stator_motor: { name: "Brushless Servo Stator Core", sub: "Electric Drive", eng: "12-Pole Copper Winding Matrix", mat: "Silicon Steel Laminations & Cu", rpm: "4,500 RPM" },
  harmonic_drive: { name: "Harmonic Wave Flexspline Ring", sub: "Zero-Backlash", eng: "Reduction Ratio 100:1", mat: "Special High-Fatigue Spring Steel", rpm: "100:1 Ratio" },
  pivot_yoke: { name: "Articulated Pitch Yoke Arm", sub: "Articulation", eng: "Dual Journal Pivot Bearings", mat: "Billet 7075-T6 Al", rpm: "±120° Pitch" },
  end_effector: { name: "Adaptive Articulated Gripper", sub: "Tooling", eng: "Pneumatic 60N Clamping Force", mat: "Carbon Fiber & Rubber", rpm: "Tooling Axis" }
};

// Skeletal topology definitions
const PALM_LOOP = [0, 1, 5, 9, 13, 17];
const PALM_KNUCKLE_BRIDGE = [5, 9, 13, 17];
const FINGERTIP_IDS = [4, 8, 12, 16, 20];
const FINGER_CHAINS = [
  [0, 1, 2, 3, 4],       // Digit 1 (Thumb)
  [0, 5, 6, 7, 8],       // Digit 2 (Index)
  [0, 9, 10, 11, 12],    // Digit 3 (Middle)
  [0, 13, 14, 15, 16],   // Digit 4 (Ring)
  [0, 17, 18, 19, 20]    // Digit 5 (Pinky)
];

// -------------------------------------------------------------
// Glowing Neon Particle Texture Factory
// -------------------------------------------------------------
function createNeonPointTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
  grad.addColorStop(0.18, 'rgba(0, 240, 255, 0.95)');
  grad.addColorStop(0.48, 'rgba(0, 240, 255, 0.35)');
  grad.addColorStop(1.0, 'rgba(0, 240, 255, 0.0)');
  
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  return texture;
}

// -------------------------------------------------------------
// Main Holographic Application
// -------------------------------------------------------------
class HolographicApp {
  constructor() {
    this.canvas = document.getElementById('webgl-canvas');
    this.currentZone = 1; // 1: Machines, 2: Components, 3: Sandbox
    this.currentMachine = 'bike_engine';
    this.explosionFactor = 0.0;
    this.isWireframe = false;
    this.pixelsEnabled = true;
    this.harnessEnabled = true;
    this.grabbedMesh = null;
    this.densityMode = '250k';
    this.densityMultiplier = 1.0;

    // Three.js Core
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-999, -999);
    this.pointTexture = createNeonPointTexture();

    // Groups & Data
    this.assemblyGroup = new THREE.Group();
    this.componentsTrayGroup = new THREE.Group();
    this.workspaceSandboxGroup = new THREE.Group();
    this.machineParts = [];
    this.trayParts = [];
    this.sandboxParts = [];
    this.harnessObjects = [];
    this.pixelClouds = [];
    this.totalVoxelCount = 0;

    // Running Usage Metrics
    this.lastFrameTime = performance.now();
    this.frameCount = 0;
    this.currentFPS = 60.0;
    this.kineticRate = 0.0;
    this.lastExplosionFactor = 0.0;
    this.pulseClock = 0.0;

    // Air-Cursor & Scale-Invariant Hand Tracking State
    this.handsData = [];
    this.isPinching = false;
    this.pinchRatio = 1.0;
    this.palmScale = 1.0;
    this.pinchConvergenceAngle = 0.0;
    this.palmOrientation = { pitch: 0, yaw: 0, roll: 0 };
    this.indexArticulationAngle = 180.0;
    this.fingertipSpan = 0.0;

    this.airCursorPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.filteredAirPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.lastRawPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.hoveredElement = null;
    this.dwellStartTime = 0;
    this.dwellDuration = 1000;
    this.dwellProgress = 0;
    this.isAirDragging = false;
    this.dragStartCoords = { x: 0, y: 0 };

    this.initThree();
    this.updateDensityMultiplier();
    this.buildCurrentMachine();
    this.buildComponentsTray();
    this.setupUI();
    this.initMediaPipeHands();
    this.animate();
  }

  updateDensityMultiplier() {
    if (this.densityMode === '120k') this.densityMultiplier = 0.5;
    else if (this.densityMode === '500k') this.densityMultiplier = 2.08;
    else this.densityMultiplier = 1.0; // 250k
  }

  initThree() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x040609);
    this.scene.fog = new THREE.FogExp2(0x040609, 0.0016);

    this.camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 4500);
    this.camera.position.set(130, 85, 230);

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = false;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.4;

    this.controls = new THREE.OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.maxDistance = 900;
    this.controls.minDistance = 40;
    this.controls.target.set(0, 0, 0);

    // Dynamic 4-Point High-Intensity Neon Studio Lighting
    const ambient = new THREE.AmbientLight(0x081220, 1.9);
    this.scene.add(ambient);

    const cyanKey = new THREE.DirectionalLight(0x00f0ff, 3.4);
    cyanKey.position.set(160, 240, 200);
    this.scene.add(cyanKey);

    const magentaFill = new THREE.PointLight(0xff007f, 2.9, 900);
    magentaFill.position.set(-180, -90, 140);
    this.scene.add(magentaFill);

    const greenRim = new THREE.PointLight(0x39ff14, 2.6, 800);
    greenRim.position.set(0, 200, -200);
    this.scene.add(greenRim);

    const goldAccent = new THREE.PointLight(0xffaa00, 2.2, 600);
    goldAccent.position.set(180, -120, -100);
    this.scene.add(goldAccent);

    // Holographic CAD Floor Grid
    const gridHelper = new THREE.GridHelper(1000, 60, 0x00f0ff, 0x0d1824);
    gridHelper.position.y = -95;
    this.scene.add(gridHelper);

    this.scene.add(this.assemblyGroup);
    this.scene.add(this.componentsTrayGroup);
    this.scene.add(this.workspaceSandboxGroup);
    this.componentsTrayGroup.visible = false;
    this.workspaceSandboxGroup.visible = false;

    window.addEventListener('resize', () => this.onWindowResize());
  }

  createTranslucentShellMaterial(colorHex, emissiveHex) {
    return new THREE.MeshStandardMaterial({
      color: colorHex,
      emissive: emissiveHex || colorHex,
      emissiveIntensity: 0.45,
      metalness: 0.9,
      roughness: 0.2,
      transparent: true,
      opacity: 0.16,
      wireframe: this.isWireframe,
      depthWrite: false
    });
  }

  addNeonEdges(mesh, edgeColorHex = 0x00f0ff) {
    if (!mesh.geometry) return;
    const edges = new THREE.EdgesGeometry(mesh.geometry, 28);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({
      color: edgeColorHex,
      linewidth: 1.5,
      transparent: true,
      opacity: 0.65
    }));
    mesh.add(line);
    return line;
  }

  // -----------------------------------------------------------
  // ULTRA-DENSE VOLUMETRIC PIXEL MATRIX GENERATOR (100k - 500k PTS)
  // -----------------------------------------------------------
  createVolumetricPixelCloud(pointsGenCallback, colorHex, rawCount, basePointSize = 2.2) {
    const pointCount = Math.round(rawCount * this.densityMultiplier);
    const originalPositions = new Float32Array(pointCount * 3);
    const currentPositions = new Float32Array(pointCount * 3);
    const scatterVectors = new Float32Array(pointCount * 3);
    const colors = new Float32Array(pointCount * 3);
    const baseColor = new THREE.Color(colorHex);

    const adjustedPointSize = this.densityMode === '500k' ? basePointSize * 0.75 :
                             this.densityMode === '120k' ? basePointSize * 1.25 : basePointSize;

    for (let i = 0; i < pointCount; i++) {
      const p = pointsGenCallback(i, pointCount);
      const ox = p.x;
      const oy = p.y;
      const oz = p.z;

      originalPositions[i * 3] = ox;
      originalPositions[i * 3 + 1] = oy;
      originalPositions[i * 3 + 2] = oz;

      currentPositions[i * 3] = ox;
      currentPositions[i * 3 + 1] = oy;
      currentPositions[i * 3 + 2] = oz;

      const dist = Math.hypot(ox, oy, oz) || 1.0;
      const radialSpeed = 70 + Math.random() * 120;
      const radialX = (ox / dist) * radialSpeed;
      const radialY = (oy / dist) * radialSpeed;
      const radialZ = (oz / dist) * radialSpeed;

      const swirlDist = Math.hypot(ox, oy) || 1.0;
      const swirlSpeed = 45 + Math.random() * 55;
      const swirlX = (-oy / swirlDist) * swirlSpeed;
      const swirlY = (ox / swirlDist) * swirlSpeed;

      const turbX = (Math.sin(ox * 0.12) + (Math.random() - 0.5)) * 32;
      const turbY = (Math.cos(oy * 0.12) + (Math.random() - 0.5)) * 32;
      const turbZ = (Math.sin(oz * 0.12) + (Math.random() - 0.5)) * 32;

      scatterVectors[i * 3] = radialX + swirlX * 0.45 + turbX;
      scatterVectors[i * 3 + 1] = radialY + swirlY * 0.45 + turbY;
      scatterVectors[i * 3 + 2] = radialZ + turbZ;

      const shade = 0.85 + Math.random() * 0.4;
      colors[i * 3] = Math.min(1.0, baseColor.r * shade + (Math.random() > 0.90 ? 0.3 : 0));
      colors[i * 3 + 1] = Math.min(1.0, baseColor.g * shade + (Math.random() > 0.90 ? 0.3 : 0));
      colors[i * 3 + 2] = Math.min(1.0, baseColor.b * shade + (Math.random() > 0.90 ? 0.3 : 0));
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: adjustedPointSize,
      map: this.pointTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const points = new THREE.Points(geometry, material);
    points.userData = { originalPositions, scatterVectors, count: pointCount };
    return points;
  }

  // -----------------------------------------------------------
  // ELECTRICAL WIRING HARNESSES & MICROCHIP GENERATORS
  // -----------------------------------------------------------
  createWiringHarness(pathPoints, colorHex = 0x00f0ff, pulseCount = 1200) {
    const curve = new THREE.CatmullRomCurve3(pathPoints.map(p => new THREE.Vector3(p[0], p[1], p[2])));
    const tubeGeo = new THREE.TubeGeometry(curve, 48, 1.8, 8, false);
    const tubeMat = new THREE.MeshStandardMaterial({
      color: colorHex,
      emissive: colorHex,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.85,
      depthWrite: false
    });
    const tube = new THREE.Mesh(tubeGeo, tubeMat);

    // Glowing electrical signal pulse voxels traveling along the wire
    const pulseGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(pulseCount * 3);
    const colors = new Float32Array(pulseCount * 3);
    const uvs = new Float32Array(pulseCount);

    for (let i = 0; i < pulseCount; i++) {
      const u = Math.random();
      uvs[i] = u;
      const pt = curve.getPoint(u);
      positions[i * 3] = pt.x + (Math.random() - 0.5) * 2;
      positions[i * 3 + 1] = pt.y + (Math.random() - 0.5) * 2;
      positions[i * 3 + 2] = pt.z + (Math.random() - 0.5) * 2;
      colors[i * 3] = 1.0;
      colors[i * 3 + 1] = 1.0;
      colors[i * 3 + 2] = 1.0;
    }
    pulseGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pulseGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pulseMat = new THREE.PointsMaterial({
      size: 2.5,
      map: this.pointTexture,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const pulsePoints = new THREE.Points(pulseGeo, pulseMat);
    pulsePoints.userData = { curve, uvs, count: pulseCount };

    const harnessGroup = new THREE.Group();
    harnessGroup.add(tube);
    harnessGroup.add(pulsePoints);
    harnessGroup.userData = { isHarness: true, pulsePoints };
    this.harnessObjects.push(harnessGroup);
    return harnessGroup;
  }

  createMicrochipModule(w, l, h, label, colorHex = 0x00f0ff) {
    const chipGroup = new THREE.Group();
    const boxGeo = new THREE.BoxGeometry(w, h, l);
    const boxMat = new THREE.MeshStandardMaterial({
      color: 0x0a1018,
      emissive: colorHex,
      emissiveIntensity: 0.35,
      metalness: 0.9,
      roughness: 0.2
    });
    const box = new THREE.Mesh(boxGeo, boxMat);
    this.addNeonEdges(box, colorHex);
    chipGroup.add(box);

    // Silicon die on top
    const dieGeo = new THREE.PlaneGeometry(w * 0.65, l * 0.65);
    dieGeo.rotateX(-Math.PI / 2);
    const dieMat = new THREE.MeshBasicMaterial({
      color: colorHex,
      wireframe: true,
      transparent: true,
      opacity: 0.9
    });
    const die = new THREE.Mesh(dieGeo, dieMat);
    die.position.y = h / 2 + 0.4;
    chipGroup.add(die);

    // Pin header leads
    const pinCount = 12;
    for (let i = 0; i < pinCount; i++) {
      const u = (i / (pinCount - 1) - 0.5) * (w * 0.85);
      const p1 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.8, 3.5), new THREE.MeshBasicMaterial({ color: 0xffaa00 }));
      p1.position.set(u, 0, l / 2 + 1.7);
      const p2 = p1.clone();
      p2.position.set(u, 0, -l / 2 - 1.7);
      chipGroup.add(p1);
      chipGroup.add(p2);
    }
    chipGroup.userData = { isHarness: true };
    this.harnessObjects.push(chipGroup);
    return chipGroup;
  }

  // -----------------------------------------------------------
  // 1. BIKE ENGINE (4-Stroke High-Rev DOHC Motorcycle Powertrain)
  // -----------------------------------------------------------
  buildBikeEngineModel() {
    this.clearAssembly();

    // 1. Split Crankcase with Sump & Gearbox Cavity (40,000 Voxels)
    const caseGroup = new THREE.Group();
    const casePixels = this.createVolumetricPixelCloud((i, total) => {
      const x = (Math.random() - 0.5) * 75;
      const y = (Math.random() - 0.5) * 55;
      const z = (Math.random() - 0.5) * 85;
      return { x, y, z };
    }, 0x00f0ff, 40000, 2.2);
    caseGroup.add(casePixels);
    const caseMesh = new THREE.Mesh(new THREE.BoxGeometry(75, 55, 85), this.createTranslucentShellMaterial(0x00f0ff, 0x0066aa));
    this.addNeonEdges(caseMesh, 0x00f0ff);
    caseGroup.add(caseMesh);
    caseGroup.userData = { specKey: 'bike_crankcase', baseZ: -140, pixelCloud: casePixels };
    this.registerPart(caseGroup);

    // 2. Counterweighted Crankshaft & Flywheel Magneto (38,000 Voxels)
    const crankGroup = new THREE.Group();
    const crankPixels = this.createVolumetricPixelCloud((i, total) => {
      const theta = (i / total) * Math.PI * 2 * 32;
      const r = 32 * Math.sqrt(Math.random());
      const z = (Math.random() - 0.5) * 50;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z: z };
    }, 0xffaa00, 38000, 2.2);
    crankGroup.add(crankPixels);
    const crankMesh = new THREE.Mesh(new THREE.CylinderGeometry(32, 32, 50, 24), this.createTranslucentShellMaterial(0xffaa00, 0xaa5500));
    crankMesh.rotation.z = Math.PI / 2;
    this.addNeonEdges(crankMesh, 0xffaa00);
    crankGroup.add(crankMesh);
    crankGroup.userData = { specKey: 'bike_crankshaft', baseZ: -85, pixelCloud: crankPixels };
    this.registerPart(crankGroup);

    // 3. Forged H-Beam Connecting Rod (28,000 Voxels)
    const rodGroup = new THREE.Group();
    const rodPixels = this.createVolumetricPixelCloud((i, total) => {
      const u = i / total;
      const y = (u - 0.5) * 75;
      const x = (Math.random() - 0.5) * 16;
      const z = (Math.random() - 0.5) * 14;
      return { x, y, z };
    }, 0x00f0ff, 28000, 2.2);
    rodGroup.add(rodPixels);
    const rodMesh = new THREE.Mesh(new THREE.BoxGeometry(16, 75, 14), this.createTranslucentShellMaterial(0x00f0ff, 0x0077bb));
    this.addNeonEdges(rodMesh, 0x00f0ff);
    rodGroup.add(rodMesh);
    rodGroup.userData = { specKey: 'bike_conrod', baseZ: -35, pixelCloud: rodPixels };
    this.registerPart(rodGroup);

    // 4. Forged Slipper Piston with 3 Ring Lands (32,000 Voxels)
    const pistonGroup = new THREE.Group();
    const pistonPixels = this.createVolumetricPixelCloud((i, total) => {
      const theta = (i / total) * Math.PI * 2 * 36;
      const r = 36 * Math.sqrt(Math.random());
      const z = (Math.random() - 0.5) * 45;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z: z };
    }, 0x39ff14, 32000, 2.2);
    pistonGroup.add(pistonPixels);
    const pistonMesh = new THREE.Mesh(new THREE.CylinderGeometry(36, 36, 45, 28), this.createTranslucentShellMaterial(0x39ff14, 0x11aa00));
    pistonMesh.rotation.x = Math.PI / 2;
    this.addNeonEdges(pistonMesh, 0x39ff14);
    pistonGroup.add(pistonMesh);
    pistonGroup.userData = { specKey: 'bike_piston', baseZ: 20, pixelCloud: pistonPixels };
    this.registerPart(pistonGroup);

    // 5. Deep-Finned Cylinder Barrel with Nikasil Bore (48,000 Voxels)
    const cylGroup = new THREE.Group();
    const cylPixels = this.createVolumetricPixelCloud((i, total) => {
      const u = i / total;
      const finIdx = Math.floor(u * 12);
      const isFin = (u * 12 - finIdx) > 0.45;
      const r = isFin ? 54 + Math.random() * 6 : 38 + Math.random() * 4;
      const theta = (i / total) * Math.PI * 2 * 45;
      const z = (u - 0.5) * 80;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z: z };
    }, 0x00f0ff, 48000, 2.2);
    cylGroup.add(cylPixels);
    const cylMesh = new THREE.Mesh(new THREE.CylinderGeometry(48, 48, 80, 28), this.createTranslucentShellMaterial(0x00f0ff, 0x0066aa));
    cylMesh.rotation.x = Math.PI / 2;
    this.addNeonEdges(cylMesh, 0x00f0ff);
    cylGroup.add(cylMesh);
    cylGroup.userData = { specKey: 'bike_cylinder', baseZ: 85, pixelCloud: cylPixels };
    this.registerPart(cylGroup);

    // 6. DOHC Cylinder Head & 4-Poppet Valves (44,000 Voxels)
    const headGroup = new THREE.Group();
    const headPixels = this.createVolumetricPixelCloud((i, total) => {
      const x = (Math.random() - 0.5) * 65;
      const y = (Math.random() - 0.5) * 65;
      const z = (Math.random() - 0.5) * 45;
      return { x, y, z };
    }, 0xff007f, 44000, 2.2);
    headGroup.add(headPixels);
    const headMesh = new THREE.Mesh(new THREE.BoxGeometry(65, 65, 45), this.createTranslucentShellMaterial(0xff007f, 0xaa0055));
    this.addNeonEdges(headMesh, 0xff007f);
    headGroup.add(headMesh);
    headGroup.userData = { specKey: 'bike_head', baseZ: 145, pixelCloud: headPixels };
    this.registerPart(headGroup);

    // 7. Multi-Plate Wet Clutch Assembly (34,000 Voxels)
    const clutchGroup = new THREE.Group();
    const clutchPixels = this.createVolumetricPixelCloud((i, total) => {
      const theta = (i / total) * Math.PI * 2 * 36;
      const r = 24 + Math.random() * 24;
      const z = (Math.random() - 0.5) * 35;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z: z };
    }, 0x39ff14, 34000, 2.2);
    clutchGroup.add(clutchPixels);
    clutchGroup.userData = { specKey: 'bike_clutch', baseZ: 200, pixelCloud: clutchPixels };
    this.registerPart(clutchGroup);

    // 8. Tuned Exhaust Header Pipe (25,000 Voxels)
    const exGroup = new THREE.Group();
    const exPixels = this.createVolumetricPixelCloud((i, total) => {
      const u = i / total;
      const theta = u * Math.PI * 1.4;
      const cx = Math.sin(theta) * 55;
      const cy = -Math.cos(theta) * 45;
      const cz = (u - 0.5) * 75;
      return { x: cx + (Math.random() - 0.5) * 12, y: cy + (Math.random() - 0.5) * 12, z: cz };
    }, 0xffaa00, 25000, 2.2);
    exGroup.add(exPixels);
    exGroup.userData = { specKey: 'bike_exhaust', baseZ: 260, pixelCloud: exPixels };
    this.registerPart(exGroup);

    // Integrated Wire Harness & ECU Microchip Module
    const harness = this.createWiringHarness([
      [-40, 45, 145], [-35, 30, 85], [-30, 10, 20], [-45, -20, -85], [-50, -40, -140]
    ], 0x00f0ff);
    this.assemblyGroup.add(harness);

    const ecu = this.createMicrochipModule(24, 32, 6, "EFI-ECU", 0x39ff14);
    ecu.position.set(-48, -25, -140);
    this.assemblyGroup.add(ecu);

    this.updateAssemblyPositions();
    this.refreshVoxelCount();
  }

  // -----------------------------------------------------------
  // 2. CAR ENGINE (Twin-Turbo High-Performance V8 Engine)
  // -----------------------------------------------------------
  buildCarEngineModel() {
    this.clearAssembly();

    // 1. 90-Degree V8 Engine Block (55,000 Voxels)
    const blockGroup = new THREE.Group();
    const blockPixels = this.createVolumetricPixelCloud((i, total) => {
      const bank = i % 2 === 0 ? 1 : -1;
      const ang = bank * 0.785; // 45 deg
      const u = (i / total);
      const r = 24 + Math.random() * 26;
      const x = Math.sin(ang) * (35 + r * 0.4);
      const y = Math.cos(ang) * (35 + r * 0.4);
      const z = (u - 0.5) * 120;
      return { x, y, z };
    }, 0x00f0ff, 55000, 2.2);
    blockGroup.add(blockPixels);
    const blockMesh = new THREE.Mesh(new THREE.BoxGeometry(90, 75, 120), this.createTranslucentShellMaterial(0x00f0ff, 0x0066aa));
    this.addNeonEdges(blockMesh, 0x00f0ff);
    blockGroup.add(blockMesh);
    blockGroup.userData = { specKey: 'car_block', baseZ: -120, pixelCloud: blockPixels };
    this.registerPart(blockGroup);

    // 2. Crossplane V8 Crankshaft (42,000 Voxels)
    const crankGroup = new THREE.Group();
    const crankPixels = this.createVolumetricPixelCloud((i, total) => {
      const u = i / total;
      const z = (u - 0.5) * 115;
      const pinIdx = Math.floor(u * 4);
      const pinAngle = pinIdx * (Math.PI / 2);
      const r = 26 * Math.sqrt(Math.random());
      return { x: Math.cos(pinAngle) * r, y: Math.sin(pinAngle) * r, z };
    }, 0xffaa00, 42000, 2.2);
    crankGroup.add(crankPixels);
    crankGroup.userData = { specKey: 'car_crankshaft', baseZ: -60, pixelCloud: crankPixels };
    this.registerPart(crankGroup);

    // 3. Dual Quad-Cam Cylinder Heads (52,000 Voxels)
    const headsGroup = new THREE.Group();
    const headsPixels = this.createVolumetricPixelCloud((i, total) => {
      const bank = i % 2 === 0 ? 1 : -1;
      const bx = bank * 45 + (Math.random() - 0.5) * 20;
      const by = 45 + (Math.random() - 0.5) * 20;
      const bz = (Math.random() - 0.5) * 110;
      return { x: bx, y: by, z: bz };
    }, 0xff007f, 52000, 2.2);
    headsGroup.add(headsPixels);
    headsGroup.userData = { specKey: 'car_heads', baseZ: 10, pixelCloud: headsPixels };
    this.registerPart(headsGroup);

    // 4. Symmetric Twin Turbochargers (48,000 Voxels)
    const turboGroup = new THREE.Group();
    const turboPixels = this.createVolumetricPixelCloud((i, total) => {
      const side = i % 2 === 0 ? 1 : -1;
      const cx = side * 55;
      const theta = (i / total) * Math.PI * 2 * 32;
      const r = (theta / (Math.PI * 2 * 32)) * 26 + 8;
      const x = cx + Math.cos(theta) * r;
      const y = -10 + Math.sin(theta) * r;
      const z = (Math.random() - 0.5) * 35;
      return { x, y, z };
    }, 0x39ff14, 48000, 2.2);
    turboGroup.add(turboPixels);
    turboGroup.userData = { specKey: 'car_turbos', baseZ: 85, pixelCloud: turboPixels };
    this.registerPart(turboGroup);

    // 5. Symmetric Intake Plenum Runners (38,000 Voxels)
    const plenumGroup = new THREE.Group();
    const plenumPixels = this.createVolumetricPixelCloud((i, total) => {
      const x = (Math.random() - 0.5) * 55;
      const y = 65 + (Math.random() - 0.5) * 25;
      const z = (Math.random() - 0.5) * 95;
      return { x, y, z };
    }, 0x00f0ff, 38000, 2.2);
    plenumGroup.add(plenumPixels);
    plenumGroup.userData = { specKey: 'car_plenum', baseZ: 155, pixelCloud: plenumPixels };
    this.registerPart(plenumGroup);

    // Automotive Multi-Branch CAN Wiring Harness & Dual-DSP ECU
    const leftHarness = this.createWiringHarness([[-45, 55, 60], [-40, 40, 0], [-35, 10, -60], [0, 65, -120]], 0x39ff14);
    const rightHarness = this.createWiringHarness([[45, 55, 60], [40, 40, 0], [35, 10, -60], [0, 65, -120]], 0x00f0ff);
    this.assemblyGroup.add(leftHarness);
    this.assemblyGroup.add(rightHarness);

    const carECU = this.createMicrochipModule(36, 48, 8, "V8-PCM", 0xffaa00);
    carECU.position.set(0, 72, -120);
    this.assemblyGroup.add(carECU);

    this.updateAssemblyPositions();
    this.refreshVoxelCount();
  }

  // -----------------------------------------------------------
  // 3. AUTO ENGINE (Compact 3-Wheeler Powertrain)
  // -----------------------------------------------------------
  buildAutoEngineModel() {
    this.clearAssembly();

    // 1. Commuter Crankcase Unit (38,000 Voxels)
    const caseGroup = new THREE.Group();
    const casePixels = this.createVolumetricPixelCloud((i, total) => {
      const x = (Math.random() - 0.5) * 60;
      const y = (Math.random() - 0.5) * 50;
      const z = (Math.random() - 0.5) * 70;
      return { x, y, z };
    }, 0x00f0ff, 38000, 2.2);
    caseGroup.add(casePixels);
    caseGroup.userData = { specKey: 'auto_case', baseZ: -100, pixelCloud: casePixels };
    this.registerPart(caseGroup);

    // 2. Cast Iron Finned Cylinder (42,000 Voxels)
    const cylGroup = new THREE.Group();
    const cylPixels = this.createVolumetricPixelCloud((i, total) => {
      const theta = (i / total) * Math.PI * 2 * 36;
      const r = 32 + (i % 8 === 0 ? 14 : 2);
      const z = (i / total) * 65 - 32.5;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z };
    }, 0xffaa00, 42000, 2.2);
    cylGroup.add(cylPixels);
    cylGroup.userData = { specKey: 'auto_cylinder', baseZ: -25, pixelCloud: cylPixels };
    this.registerPart(cylGroup);

    // 3. Forced-Air Cooling Fan Shroud (36,000 Voxels)
    const fanGroup = new THREE.Group();
    const fanPixels = this.createVolumetricPixelCloud((i, total) => {
      const theta = (i / total) * Math.PI * 2 * 28;
      const r = 42 * Math.sqrt(Math.random());
      const z = (Math.random() - 0.5) * 28;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z };
    }, 0x39ff14, 36000, 2.2);
    fanGroup.add(fanPixels);
    fanGroup.userData = { specKey: 'auto_fan_shroud', baseZ: 45, pixelCloud: fanPixels };
    this.registerPart(fanGroup);

    // 4. Variable Venturi Carburetor (28,000 Voxels)
    const carbGroup = new THREE.Group();
    const carbPixels = this.createVolumetricPixelCloud((i, total) => {
      const x = 35 + (Math.random() - 0.5) * 24;
      const y = 20 + (Math.random() - 0.5) * 35;
      const z = (Math.random() - 0.5) * 24;
      return { x, y, z };
    }, 0xff007f, 28000, 2.2);
    carbGroup.add(carbPixels);
    carbGroup.userData = { specKey: 'auto_carb', baseZ: 110, pixelCloud: carbPixels };
    this.registerPart(carbGroup);

    this.updateAssemblyPositions();
    this.refreshVoxelCount();
  }

  // -----------------------------------------------------------
  // 4. TRACTOR ENGINE (Agricultural Heavy Diesel)
  // -----------------------------------------------------------
  buildTractorEngineModel() {
    this.clearAssembly();

    // 1. Cast-Iron Heavy Diesel Block (54,000 Voxels)
    const blockGroup = new THREE.Group();
    const blockPixels = this.createVolumetricPixelCloud((i, total) => {
      const x = (Math.random() - 0.5) * 70;
      const y = (Math.random() - 0.5) * 85;
      const z = (Math.random() - 0.5) * 135;
      return { x, y, z };
    }, 0x00f0ff, 54000, 2.2);
    blockGroup.add(blockPixels);
    blockGroup.userData = { specKey: 'tractor_block', baseZ: -110, pixelCloud: blockPixels };
    this.registerPart(blockGroup);

    // 2. Mechanical Inline Fuel Injection Pump (44,000 Voxels)
    const pumpGroup = new THREE.Group();
    const pumpPixels = this.createVolumetricPixelCloud((i, total) => {
      const x = -48 + (Math.random() - 0.5) * 24;
      const y = -10 + (Math.random() - 0.5) * 35;
      const z = (Math.random() - 0.5) * 85;
      return { x, y, z };
    }, 0xffaa00, 44000, 2.2);
    pumpGroup.add(pumpPixels);
    pumpGroup.userData = { specKey: 'tractor_pump', baseZ: -35, pixelCloud: pumpPixels };
    this.registerPart(pumpGroup);

    // 3. High-Inertia Industrial Flywheel (42,000 Voxels)
    const flyGroup = new THREE.Group();
    const flyPixels = this.createVolumetricPixelCloud((i, total) => {
      const theta = (i / total) * Math.PI * 2 * 36;
      const r = 52 * Math.sqrt(Math.random());
      const z = (Math.random() - 0.5) * 26;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z };
    }, 0x39ff14, 42000, 2.2);
    flyGroup.add(flyPixels);
    flyGroup.userData = { specKey: 'tractor_flywheel', baseZ: 40, pixelCloud: flyPixels };
    this.registerPart(flyGroup);

    // 4. Cyclone Oil-Bath Air Cleaner (35,000 Voxels)
    const filterGroup = new THREE.Group();
    const filterPixels = this.createVolumetricPixelCloud((i, total) => {
      const theta = (i / total) * Math.PI * 2 * 28;
      const r = 28 * Math.sqrt(Math.random());
      const z = (i / total) * 75 - 37.5;
      return { x: 38 + Math.cos(theta) * r, y: 45 + Math.sin(theta) * r, z };
    }, 0xff007f, 35000, 2.2);
    filterGroup.add(filterPixels);
    filterGroup.userData = { specKey: 'tractor_filter', baseZ: 115, pixelCloud: filterPixels };
    this.registerPart(filterGroup);

    this.updateAssemblyPositions();
    this.refreshVoxelCount();
  }

  // -----------------------------------------------------------
  // 5. TRUCK & BUS HEAVY DIESEL (13-Liter Commercial Engine)
  // -----------------------------------------------------------
  buildTruckEngineModel() {
    this.clearAssembly();

    // 1. 13-Liter Monolithic CGI Block (58,000 Voxels)
    const blockGroup = new THREE.Group();
    const blockPixels = this.createVolumetricPixelCloud((i, total) => {
      const x = (Math.random() - 0.5) * 80;
      const y = (Math.random() - 0.5) * 95;
      const z = (Math.random() - 0.5) * 145;
      return { x, y, z };
    }, 0x00f0ff, 58000, 2.2);
    blockGroup.add(blockPixels);
    blockGroup.userData = { specKey: 'truck_block', baseZ: -125, pixelCloud: blockPixels };
    this.registerPart(blockGroup);

    // 2. 2,500-Bar Piezo Common Rail Line (42,000 Voxels)
    const railGroup = new THREE.Group();
    const railPixels = this.createVolumetricPixelCloud((i, total) => {
      const z = (i / total) * 130 - 65;
      const theta = (i / total) * Math.PI * 2 * 24;
      const r = 8 + (i % 6 === 0 ? 16 : 0);
      return { x: -35 + Math.cos(theta) * r, y: 38 + Math.sin(theta) * r, z };
    }, 0xffaa00, 42000, 2.2);
    railGroup.add(railPixels);
    railGroup.userData = { specKey: 'truck_common_rail', baseZ: -50, pixelCloud: railPixels };
    this.registerPart(railGroup);

    // 3. Variable Geometry Turbocharger (48,000 Voxels)
    const vgtGroup = new THREE.Group();
    const vgtPixels = this.createVolumetricPixelCloud((i, total) => {
      const theta = (i / total) * Math.PI * 2 * 36;
      const r = 36 * Math.sqrt(Math.random());
      const z = (Math.random() - 0.5) * 45;
      return { x: 48 + Math.cos(theta) * r, y: 15 + Math.sin(theta) * r, z };
    }, 0x39ff14, 48000, 2.2);
    vgtGroup.add(vgtPixels);
    vgtGroup.userData = { specKey: 'truck_turbo', baseZ: 25, pixelCloud: vgtPixels };
    this.registerPart(vgtGroup);

    // 4. CGI Cylinder Head with Compression Brake (46,000 Voxels)
    const headGroup = new THREE.Group();
    const headPixels = this.createVolumetricPixelCloud((i, total) => {
      const x = (Math.random() - 0.5) * 75;
      const y = 52 + (Math.random() - 0.5) * 28;
      const z = (Math.random() - 0.5) * 135;
      return { x, y, z };
    }, 0xff007f, 46000, 2.2);
    headGroup.add(headPixels);
    headGroup.userData = { specKey: 'truck_head', baseZ: 100, pixelCloud: headPixels };
    this.registerPart(headGroup);

    this.updateAssemblyPositions();
    this.refreshVoxelCount();
  }

  // -----------------------------------------------------------
  // 6. TRAIN LOCOMOTIVE POWERPLANT (Massive V16 Prime Mover)
  // -----------------------------------------------------------
  buildTrainEngineModel() {
    this.clearAssembly();

    // 1. Fabricated V16 Locomotive Crankcase (65,000 Voxels)
    const caseGroup = new THREE.Group();
    const casePixels = this.createVolumetricPixelCloud((i, total) => {
      const x = (Math.random() - 0.5) * 95;
      const y = (Math.random() - 0.5) * 110;
      const z = (Math.random() - 0.5) * 180;
      return { x, y, z };
    }, 0x00f0ff, 65000, 2.2);
    caseGroup.add(casePixels);
    caseGroup.userData = { specKey: 'train_crankcase', baseZ: -140, pixelCloud: casePixels };
    this.registerPart(caseGroup);

    // 2. Dual Massive Industrial Turbo-Superchargers (55,000 Voxels)
    const turboGroup = new THREE.Group();
    const turboPixels = this.createVolumetricPixelCloud((i, total) => {
      const side = i % 2 === 0 ? 1 : -1;
      const cx = side * 50;
      const theta = (i / total) * Math.PI * 2 * 36;
      const r = 42 * Math.sqrt(Math.random());
      return { x: cx + Math.cos(theta) * r, y: 65 + Math.sin(theta) * r, z: (Math.random() - 0.5) * 60 };
    }, 0xffaa00, 55000, 2.2);
    turboGroup.add(turboPixels);
    turboGroup.userData = { specKey: 'train_turbos', baseZ: -40, pixelCloud: turboPixels };
    this.registerPart(turboGroup);

    // 3. Traction Alternator Coupling Hub (50,000 Voxels)
    const altGroup = new THREE.Group();
    const altPixels = this.createVolumetricPixelCloud((i, total) => {
      const theta = (i / total) * Math.PI * 2 * 48;
      const r = 62 * Math.sqrt(Math.random());
      const z = (Math.random() - 0.5) * 55;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z };
    }, 0x39ff14, 50000, 2.2);
    altGroup.add(altPixels);
    altGroup.userData = { specKey: 'train_alternator', baseZ: 60, pixelCloud: altPixels };
    this.registerPart(altGroup);

    this.updateAssemblyPositions();
    this.refreshVoxelCount();
  }

  // -----------------------------------------------------------
  // 7. AEROPLANE TURBOFAN (CFM/GE90 Class High-Bypass Jet)
  // -----------------------------------------------------------
  buildTurbineModel() {
    this.clearAssembly();

    // 1. Intake Cowl Cone (25,000 Voxels)
    const coneGroup = new THREE.Group();
    const conePixels = this.createVolumetricPixelCloud((i, total) => {
      const u = i / total;
      const r = Math.pow(u, 0.72) * 32 + (Math.random() - 0.5) * 1.2;
      const z = (1 - u) * 65 - 32.5;
      const theta = i * 2.399963;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z: z };
    }, 0x00f0ff, 25000, 2.2);
    coneGroup.add(conePixels);
    coneGroup.userData = { specKey: 'cone', baseZ: -140, pixelCloud: conePixels };
    this.registerPart(coneGroup);

    // 2. Wide-Chord Fan Rotor (18 Blades, 80,000 Voxels)
    const fanGroup = new THREE.Group();
    const fanBladePixels = this.createVolumetricPixelCloud((i, total) => {
      const bladeIdx = Math.floor(i / (total / 18));
      const bladeAngle = (bladeIdx / 18) * Math.PI * 2;
      const localIdx = i % (total / 18);
      const u = localIdx / (total / 18);
      const span = 26 + u * 58;
      const chord = (Math.random() - 0.5) * (14 - u * 4);
      const twist = 0.45 + (1 - u) * 0.35;
      const bx = Math.cos(bladeAngle) * span - Math.sin(bladeAngle) * chord * Math.cos(twist);
      const by = Math.sin(bladeAngle) * span + Math.cos(bladeAngle) * chord * Math.cos(twist);
      const bz = chord * Math.sin(twist) + (Math.random() - 0.5) * 1.8;
      return { x: bx, y: by, z: bz };
    }, 0x39ff14, 80000, 2.2);
    fanGroup.add(fanBladePixels);
    fanGroup.userData = { specKey: 'fan', baseZ: -80, pixelCloud: fanBladePixels };
    this.registerPart(fanGroup);

    // 3. LP & HP Compressor Disks (45,000 Voxels)
    const compGroup = new THREE.Group();
    const compPixels = this.createVolumetricPixelCloud((i, total) => {
      const stage = Math.floor((i / total) * 4);
      const stageZ = (stage - 1.5) * 12;
      const stageRadius = 52 + stage * 4.5;
      const theta = (i / total) * Math.PI * 2 * 64;
      const r = 18 + Math.random() * (stageRadius - 18);
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z: stageZ };
    }, 0x00f0ff, 45000, 2.2);
    compGroup.add(compPixels);
    compGroup.userData = { specKey: 'compressor', baseZ: -18, pixelCloud: compPixels };
    this.registerPart(compGroup);

    // 4. Annular Combustor Core & Nozzles (40,000 Voxels)
    const combGroup = new THREE.Group();
    const combPixels = this.createVolumetricPixelCloud((i, total) => {
      const theta = (i / total) * Math.PI * 2 * 32;
      const r = 48 + Math.random() * 16;
      const z = (Math.random() - 0.5) * 52;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z };
    }, 0xffaa00, 40000, 2.2);
    combGroup.add(combPixels);
    combGroup.userData = { specKey: 'combustor', baseZ: 48, pixelCloud: combPixels };
    this.registerPart(combGroup);

    // 5. HP Turbine Stage (38,000 Voxels)
    const turbGroup = new THREE.Group();
    const turbPixels = this.createVolumetricPixelCloud((i, total) => {
      const bladeIdx = Math.floor(i / (total / 28));
      const bladeAngle = (bladeIdx / 28) * Math.PI * 2;
      const u = (i % (total / 28)) / (total / 28);
      const r = 26 + u * 38;
      const z = (Math.random() - 0.5) * 18;
      return { x: Math.cos(bladeAngle) * r, y: Math.sin(bladeAngle) * r, z };
    }, 0xb026ff, 38000, 2.2);
    turbGroup.add(turbPixels);
    turbGroup.userData = { specKey: 'turbine', baseZ: 110, pixelCloud: turbPixels };
    this.registerPart(turbGroup);

    // 6. Thrust Nozzle Cowl (32,000 Voxels)
    const nozzGroup = new THREE.Group();
    const nozzPixels = this.createVolumetricPixelCloud((i, total) => {
      const u = i / total;
      const z = u * 75 - 37.5;
      const r = 58 - u * 18;
      const theta = (i / total) * Math.PI * 2 * 45;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z };
    }, 0xff007f, 32000, 2.2);
    nozzGroup.add(nozzPixels);
    nozzGroup.userData = { specKey: 'nozzle', baseZ: 175, pixelCloud: nozzPixels };
    this.registerPart(nozzGroup);

    this.updateAssemblyPositions();
    this.refreshVoxelCount();
  }

  // -----------------------------------------------------------
  // 8. ROCKET ENGINE (Liquid Bipropellant Staged Combustion)
  // -----------------------------------------------------------
  buildRocketEngineModel() {
    this.clearAssembly();

    // 1. Dual Staged Turbopump Assembly (44,000 Voxels)
    const pumpGroup = new THREE.Group();
    const pumpPixels = this.createVolumetricPixelCloud((i, total) => {
      const side = i % 2 === 0 ? 1 : -1;
      const cx = side * 30;
      const theta = (i / total) * Math.PI * 2 * 36;
      const r = 22 * Math.sqrt(Math.random());
      return { x: cx + Math.cos(theta) * r, y: Math.sin(theta) * r, z: (Math.random() - 0.5) * 35 };
    }, 0x00f0ff, 44000, 2.2);
    pumpGroup.add(pumpPixels);
    pumpGroup.userData = { specKey: 'rocket_turbopump', baseZ: -120, pixelCloud: pumpPixels };
    this.registerPart(pumpGroup);

    // 2. Preburner & Gimbal Actuators (38,000 Voxels)
    const gimbalGroup = new THREE.Group();
    const gimbalPixels = this.createVolumetricPixelCloud((i, total) => {
      const theta = (i / total) * Math.PI * 2 * 28;
      const r = 26 + (Math.random() - 0.5) * 6;
      const z = (Math.random() - 0.5) * 45;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z };
    }, 0xffaa00, 38000, 2.2);
    gimbalGroup.add(gimbalPixels);
    gimbalGroup.userData = { specKey: 'rocket_gimbal', baseZ: -55, pixelCloud: gimbalPixels };
    this.registerPart(gimbalGroup);

    // 3. Regenerative Main Combustion Chamber (45,000 Voxels)
    const combGroup = new THREE.Group();
    const combPixels = this.createVolumetricPixelCloud((i, total) => {
      const u = i / total;
      const r = 32 - Math.sin(u * Math.PI) * 10;
      const theta = (i / total) * Math.PI * 2 * 45;
      const z = (u - 0.5) * 55;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z };
    }, 0x39ff14, 45000, 2.2);
    combGroup.add(combPixels);
    combGroup.userData = { specKey: 'rocket_combustor', baseZ: 15, pixelCloud: combPixels };
    this.registerPart(combGroup);

    // 4. Contoured Regenerative Bell Nozzle with Cooling Tubes (68,000 Voxels)
    const bellGroup = new THREE.Group();
    const bellPixels = this.createVolumetricPixelCloud((i, total) => {
      const u = i / total;
      const r = 22 + Math.pow(u, 1.4) * 65; // Rao parabolic expansion bell
      const theta = (i / total) * Math.PI * 2 * 64;
      const z = u * 110 - 20;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z };
    }, 0xff007f, 68000, 2.2);
    bellGroup.add(bellPixels);
    bellGroup.userData = { specKey: 'rocket_bell', baseZ: 95, pixelCloud: bellPixels };
    this.registerPart(bellGroup);

    this.updateAssemblyPositions();
    this.refreshVoxelCount();
  }

  // -----------------------------------------------------------
  // 9. PLANETARY GEARBOX
  // -----------------------------------------------------------
  buildGearboxModel() {
    this.clearAssembly();

    const shaftGroup = new THREE.Group();
    const shaftPixels = this.createVolumetricPixelCloud((i, total) => {
      const z = (i / total) * 85 - 42.5;
      const theta = (i / total) * Math.PI * 2 * 28;
      const r = 12 * Math.sqrt(Math.random());
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z };
    }, 0x00f0ff, 26000, 2.2);
    shaftGroup.add(shaftPixels);
    shaftGroup.userData = { specKey: 'shaft_in', baseZ: -125, pixelCloud: shaftPixels };
    this.registerPart(shaftGroup);

    const sunGroup = new THREE.Group();
    const sunPixels = this.createVolumetricPixelCloud((i, total) => {
      const theta = (i / total) * Math.PI * 2 * 28;
      const tooth = Math.sin(theta * 14) * 5.0;
      const r = 26 + tooth;
      const z = (Math.random() - 0.5) * 26;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z };
    }, 0xffaa00, 48000, 2.2);
    sunGroup.add(sunPixels);
    sunGroup.userData = { specKey: 'sun_gear', baseZ: -55, pixelCloud: sunPixels };
    this.registerPart(sunGroup);

    const planetGroup = new THREE.Group();
    const planetPixels = this.createVolumetricPixelCloud((i, total) => {
      const pIdx = Math.floor(i / (total / 3));
      const pAngle = (pIdx / 3) * Math.PI * 2;
      const cx = Math.cos(pAngle) * 44;
      const cy = Math.sin(pAngle) * 44;
      const localI = i % (total / 3);
      const theta = (localI / (total / 3)) * Math.PI * 2 * 24;
      const tooth = Math.sin(theta * 12) * 3.5;
      const r = 20 + tooth;
      const z = (Math.random() - 0.5) * 22;
      return { x: cx + Math.cos(theta) * r, y: cy + Math.sin(theta) * r, z };
    }, 0x39ff14, 96000, 2.2);
    planetGroup.add(planetPixels);
    planetGroup.userData = { specKey: 'planet_gears', baseZ: 10, pixelCloud: planetPixels };
    this.registerPart(planetGroup);

    const ringGroup = new THREE.Group();
    const ringPixels = this.createVolumetricPixelCloud((i, total) => {
      const theta = (i / total) * Math.PI * 2 * 56;
      const tooth = Math.sin(theta * 28) * 4;
      const r = 84 + tooth;
      const z = (Math.random() - 0.5) * 34;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z };
    }, 0xff007f, 50000, 2.2);
    ringGroup.add(ringPixels);
    ringGroup.userData = { specKey: 'ring_gear', baseZ: 75, pixelCloud: ringPixels };
    this.registerPart(ringGroup);

    const outGroup = new THREE.Group();
    const outPixels = this.createVolumetricPixelCloud((i, total) => {
      const z = (i / total) * 75 - 37.5;
      const theta = (i / total) * Math.PI * 2 * 24;
      const r = 18 * Math.sqrt(Math.random());
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z };
    }, 0x00f0ff, 28000, 2.2);
    outGroup.add(outPixels);
    outGroup.userData = { specKey: 'shaft_out', baseZ: 140, pixelCloud: outPixels };
    this.registerPart(outGroup);

    this.updateAssemblyPositions();
    this.refreshVoxelCount();
  }

  // -----------------------------------------------------------
  // 10. ROBOTIC ACTUATOR JOINT
  // -----------------------------------------------------------
  buildRobotArmModel() {
    this.clearAssembly();

    const baseGroup = new THREE.Group();
    const basePixels = this.createVolumetricPixelCloud((i, total) => {
      const theta = (i / total) * Math.PI * 2 * 36;
      const r = 30 + Math.random() * 45;
      const z = (Math.random() - 0.5) * 26;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z };
    }, 0x00f0ff, 46000, 2.2);
    baseGroup.add(basePixels);
    baseGroup.userData = { specKey: 'base_turret', baseZ: -120, pixelCloud: basePixels };
    this.registerPart(baseGroup);

    const statGroup = new THREE.Group();
    const statPixels = this.createVolumetricPixelCloud((i, total) => {
      const theta = (i / total) * Math.PI * 2 * 48;
      const r = 24 + Math.random() * 30;
      const z = (Math.random() - 0.5) * 38;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z };
    }, 0xff007f, 55000, 2.2);
    statGroup.add(statPixels);
    statGroup.userData = { specKey: 'stator_motor', baseZ: -50, pixelCloud: statPixels };
    this.registerPart(statGroup);

    const harmGroup = new THREE.Group();
    const harmPixels = this.createVolumetricPixelCloud((i, total) => {
      const theta = (i / total) * Math.PI * 2 * 48;
      const r = 38 + Math.random() * 12;
      const z = (Math.random() - 0.5) * 26;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z };
    }, 0xffaa00, 42000, 2.2);
    harmGroup.add(harmPixels);
    harmGroup.userData = { specKey: 'harmonic_drive', baseZ: 15, pixelCloud: harmPixels };
    this.registerPart(harmGroup);

    const yokeGroup = new THREE.Group();
    const yokePixels = this.createVolumetricPixelCloud((i, total) => {
      const x = (Math.random() - 0.5) * 44;
      const y = (Math.random() - 0.5) * 78;
      const z = (Math.random() - 0.5) * 32;
      return { x, y, z };
    }, 0x00f0ff, 46000, 2.2);
    yokeGroup.add(yokePixels);
    yokeGroup.userData = { specKey: 'pivot_yoke', baseZ: 75, pixelCloud: yokePixels };
    this.registerPart(yokeGroup);

    const gripGroup = new THREE.Group();
    const gripPixels = this.createVolumetricPixelCloud((i, total) => {
      const isLeft = i % 2 === 0;
      const side = isLeft ? -16 : 16;
      const x = side + (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 46;
      const z = (Math.random() - 0.5) * 18;
      return { x, y, z };
    }, 0x39ff14, 44000, 2.2);
    gripGroup.add(gripPixels);
    gripGroup.userData = { specKey: 'end_effector', baseZ: 145, pixelCloud: gripPixels };
    this.registerPart(gripGroup);

    this.updateAssemblyPositions();
    this.refreshVoxelCount();
  }

  buildCurrentMachine() {
    if (this.currentMachine === 'bike_engine') this.buildBikeEngineModel();
    else if (this.currentMachine === 'car_engine') this.buildCarEngineModel();
    else if (this.currentMachine === 'auto_engine') this.buildAutoEngineModel();
    else if (this.currentMachine === 'tractor_engine') this.buildTractorEngineModel();
    else if (this.currentMachine === 'truck_engine') this.buildTruckEngineModel();
    else if (this.currentMachine === 'train_engine') this.buildTrainEngineModel();
    else if (this.currentMachine === 'turbine') this.buildTurbineModel();
    else if (this.currentMachine === 'rocket_engine') this.buildRocketEngineModel();
    else if (this.currentMachine === 'gearbox') this.buildGearboxModel();
    else this.buildRobotArmModel();
  }

  buildComponentsTray() {
    this.trayParts = [];
    const matParts = [
      { key: 'bike_piston', geo: new THREE.CylinderGeometry(28, 28, 36, 24), col: 0x39ff14, x: -320 },
      { key: 'bike_conrod', geo: new THREE.BoxGeometry(14, 55, 12), col: 0x00f0ff, x: -210 },
      { key: 'bike_cylinder', geo: new THREE.CylinderGeometry(38, 38, 55, 24), col: 0x00f0ff, x: -100 },
      { key: 'sun_gear', geo: new THREE.CylinderGeometry(24, 24, 18, 14), col: 0xffaa00, x: 10 },
      { key: 'rocket_bell', geo: new THREE.ConeGeometry(32, 65, 32), col: 0xff007f, x: 120 },
      { key: 'fan', geo: new THREE.CylinderGeometry(36, 36, 12, 24), col: 0x39ff14, x: 230 },
      { key: 'turbo', geo: new THREE.TorusGeometry(24, 10, 16, 32), col: 0xffaa00, x: 340 }
    ];

    matParts.forEach(p => {
      const mesh = new THREE.Mesh(p.geo, this.createTranslucentShellMaterial(p.col, p.col));
      this.addNeonEdges(mesh, p.col);
      mesh.position.set(p.x, -20, 0);
      mesh.userData = { specKey: p.key, isTrayItem: true };

      const pedGeo = new THREE.CylinderGeometry(35, 42, 5, 32);
      const pedMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true });
      const ped = new THREE.Mesh(pedGeo, pedMat);
      ped.position.set(p.x, -50, 0);
      this.componentsTrayGroup.add(ped);

      this.componentsTrayGroup.add(mesh);
      this.trayParts.push(mesh);
    });
  }

  // -----------------------------------------------------------
  // ZONE 03 SANDBOX MODULAR SPAWNER & MAGNETIC SNAPPING
  // -----------------------------------------------------------
  spawnSandboxPart(partType) {
    let newMesh = null;
    let ports = [];
    const colors = { piston: 0x39ff14, conrod: 0x00f0ff, crankshaft: 0xffaa00, cylinder: 0x00f0ff, turbo: 0xffaa00, ecu_chip: 0x39ff14, wire_harness: 0x00f0ff, gear: 0xffaa00, rocket_bell: 0xff007f };
    const col = colors[partType] || 0x00f0ff;

    if (partType === 'piston') {
      newMesh = new THREE.Mesh(new THREE.CylinderGeometry(26, 26, 35, 24), this.createTranslucentShellMaterial(col, col));
      ports = [{ id: 'wrist_pin', pos: new THREE.Vector3(0, -10, 0), snapWith: 'small_end' }];
    } else if (partType === 'conrod') {
      newMesh = new THREE.Mesh(new THREE.BoxGeometry(14, 55, 12), this.createTranslucentShellMaterial(col, col));
      ports = [
        { id: 'small_end', pos: new THREE.Vector3(0, 26, 0), snapWith: 'wrist_pin' },
        { id: 'big_end', pos: new THREE.Vector3(0, -26, 0), snapWith: 'crank_pin' }
      ];
    } else if (partType === 'crankshaft') {
      newMesh = new THREE.Mesh(new THREE.CylinderGeometry(28, 28, 45, 24), this.createTranslucentShellMaterial(col, col));
      newMesh.rotation.z = Math.PI / 2;
      ports = [{ id: 'crank_pin', pos: new THREE.Vector3(22, 0, 0), snapWith: 'big_end' }];
    } else if (partType === 'cylinder') {
      newMesh = new THREE.Mesh(new THREE.CylinderGeometry(36, 36, 65, 24), this.createTranslucentShellMaterial(col, col));
      ports = [{ id: 'cylinder_base', pos: new THREE.Vector3(0, -32, 0), snapWith: 'wrist_pin' }];
    } else if (partType === 'turbo') {
      newMesh = new THREE.Mesh(new THREE.TorusGeometry(26, 12, 16, 32), this.createTranslucentShellMaterial(col, col));
      ports = [{ id: 'turbo_flange', pos: new THREE.Vector3(-25, 0, 0), snapWith: 'exhaust_port' }];
    } else if (partType === 'ecu_chip') {
      newMesh = this.createMicrochipModule(28, 38, 7, "SANDBOX-ECU", 0x39ff14);
      ports = [{ id: 'ecu_port', pos: new THREE.Vector3(0, 0, 0), snapWith: 'loom_lead' }];
    } else if (partType === 'wire_harness') {
      newMesh = this.createWiringHarness([[-25, 0, 0], [0, 20, 0], [25, 0, 0]], 0x00f0ff);
      ports = [{ id: 'loom_lead', pos: new THREE.Vector3(25, 0, 0), snapWith: 'ecu_port' }];
    } else if (partType === 'gear') {
      newMesh = new THREE.Mesh(new THREE.CylinderGeometry(26, 26, 16, 18), this.createTranslucentShellMaterial(col, col));
      ports = [{ id: 'gear_bore', pos: new THREE.Vector3(0, 0, 0), snapWith: 'shaft_hub' }];
    } else {
      newMesh = new THREE.Mesh(new THREE.ConeGeometry(32, 65, 32), this.createTranslucentShellMaterial(col, col));
      ports = [{ id: 'bell_throat', pos: new THREE.Vector3(0, -30, 0), snapWith: 'combustor_port' }];
    }

    this.addNeonEdges(newMesh, col);
    // Random placement in sandbox view
    const spawnX = (Math.random() - 0.5) * 160;
    const spawnY = (Math.random() - 0.5) * 80;
    newMesh.position.set(spawnX, spawnY, 0);
    newMesh.userData = { isSandboxItem: true, partType, ports, specKey: `bike_${partType}` };

    this.workspaceSandboxGroup.add(newMesh);
    this.sandboxParts.push(newMesh);
    audio.playAirClick();
    this.updateTelemetry(`bike_${partType}`);
  }

  clearSandbox() {
    while (this.workspaceSandboxGroup.children.length > 0) {
      this.workspaceSandboxGroup.remove(this.workspaceSandboxGroup.children[0]);
    }
    this.sandboxParts = [];
    audio.playPinchLock();
  }

  registerPart(meshOrGroup) {
    this.assemblyGroup.add(meshOrGroup);
    this.machineParts.push(meshOrGroup);
    if (meshOrGroup.userData.pixelCloud) {
      this.pixelClouds.push(meshOrGroup.userData.pixelCloud);
    }
  }

  clearAssembly() {
    while (this.assemblyGroup.children.length > 0) {
      this.assemblyGroup.remove(this.assemblyGroup.children[0]);
    }
    this.machineParts = [];
    this.harnessObjects = [];
    this.pixelClouds = [];
    this.totalVoxelCount = 0;
  }

  refreshVoxelCount() {
    let count = 0;
    this.pixelClouds.forEach(cloud => {
      if (cloud && cloud.userData && cloud.userData.count) {
        count += cloud.userData.count;
      }
    });
    this.totalVoxelCount = count;
    const voxElem = document.getElementById('usage-voxels');
    if (voxElem) voxElem.textContent = `${count.toLocaleString()} PTS`;

    const vramMB = ((count * 36) / (1024 * 1024)).toFixed(1);
    const vramElem = document.getElementById('usage-vram');
    if (vramElem) vramElem.textContent = `${vramMB} MB VRAM`;
  }

  // -----------------------------------------------------------
  // DUAL-LEVEL CONTINUOUS EXPLOSION & DISPERSION ENGINE
  // -----------------------------------------------------------
  updateAssemblyPositions() {
    const num = this.machineParts.length;
    const centerIdx = (num - 1) / 2;
    const maxSpread = 220;

    this.machineParts.forEach((part, i) => {
      if (part === this.grabbedMesh) return;
      const distFromCenter = i - centerIdx;
      const spread = distFromCenter * maxSpread * this.explosionFactor;
      part.position.z = part.userData.baseZ + spread;

      const pCloud = part.userData.pixelCloud;
      if (pCloud) {
        pCloud.visible = this.pixelsEnabled;
        if (this.pixelsEnabled) {
          const pixelFactor = Math.max(0, (this.explosionFactor - 0.08) / 0.92);
          const pGeo = pCloud.geometry;
          const posAttr = pGeo.attributes.position;
          const orig = pCloud.userData.originalPositions;
          const scatter = pCloud.userData.scatterVectors;
          const count = pCloud.userData.count;

          for (let k = 0; k < count; k++) {
            posAttr.setXYZ(
              k,
              orig[k * 3] + scatter[k * 3] * pixelFactor,
              orig[k * 3 + 1] + scatter[k * 3 + 1] * pixelFactor,
              orig[k * 3 + 2] + scatter[k * 3 + 2] * pixelFactor
            );
          }
          posAttr.needsUpdate = true;

          part.traverse(child => {
            if (child.isMesh && child.material) {
              child.material.opacity = Math.max(0.06, 0.20 - pixelFactor * 0.16);
            }
          });
        }
      }
    });
  }

  setExplosion(val) {
    const clamped = Math.max(0, Math.min(1, val));
    const delta = Math.abs(clamped - this.lastExplosionFactor);
    this.kineticRate = delta * 1400;
    this.lastExplosionFactor = clamped;
    this.explosionFactor = clamped;
    this.updateAssemblyPositions();

    const expPercent = Math.round(this.explosionFactor * 100);
    const expElem = document.getElementById('explosion-percentage');
    if (expElem) expElem.textContent = `${expPercent}%`;
    const meterBar = document.getElementById('explosion-meter-bar');
    if (meterBar) meterBar.style.width = `${expPercent}%`;
    const expSlider = document.getElementById('manual-explosion-slider');
    if (expSlider) expSlider.value = expPercent;

    const rateElem = document.getElementById('usage-rate');
    if (rateElem) rateElem.textContent = `${Math.round(this.kineticRate)} PX/S`;
  }

  toggleWireframe() {
    this.isWireframe = !this.isWireframe;
    this.scene.traverse(obj => {
      if (obj.isMesh && obj.material) {
        obj.material.wireframe = this.isWireframe;
      }
    });
    const btn = document.getElementById('btn-toggle-wireframe');
    if (btn) btn.classList.toggle('active', this.isWireframe);
  }

  togglePixels() {
    this.pixelsEnabled = !this.pixelsEnabled;
    this.updateAssemblyPositions();
    const btn = document.getElementById('btn-toggle-pixels');
    if (btn) {
      btn.classList.toggle('active', this.pixelsEnabled);
      btn.innerHTML = `<span class="btn-icon">✦</span> PIXELS: ${this.pixelsEnabled ? 'ON' : 'OFF'}`;
    }
  }

  toggleHarness() {
    this.harnessEnabled = !this.harnessEnabled;
    this.harnessObjects.forEach(obj => {
      obj.visible = this.harnessEnabled;
    });
    const btn = document.getElementById('btn-toggle-harness');
    if (btn) {
      btn.classList.toggle('active', this.harnessEnabled);
      btn.innerHTML = `<span class="btn-icon">⚡</span> WIRING & CHIPS: ${this.harnessEnabled ? 'ON' : 'OFF'}`;
    }
  }

  switchZone(zoneId) {
    this.currentZone = zoneId;
    document.querySelectorAll('.pill-btn').forEach((btn, idx) => {
      btn.classList.toggle('active', idx + 1 === zoneId);
      btn.setAttribute('aria-selected', idx + 1 === zoneId);
    });

    const sandboxTray = document.getElementById('sandbox-spawner-tray');

    if (zoneId === 1) {
      this.assemblyGroup.visible = true;
      this.componentsTrayGroup.visible = false;
      this.workspaceSandboxGroup.visible = false;
      if (sandboxTray) sandboxTray.classList.add('hidden');
    } else if (zoneId === 2) {
      this.assemblyGroup.visible = false;
      this.componentsTrayGroup.visible = true;
      this.workspaceSandboxGroup.visible = false;
      if (sandboxTray) sandboxTray.classList.add('hidden');
    } else {
      // Zone 03: Sandbox Mode
      this.assemblyGroup.visible = false;
      this.componentsTrayGroup.visible = false;
      this.workspaceSandboxGroup.visible = true;
      if (sandboxTray) sandboxTray.classList.remove('hidden');
    }
  }

  updateTelemetry(specKey) {
    const spec = COMPONENT_SPECS[specKey];
    if (!spec) return;

    const pName = document.getElementById('part-name');
    if (pName) pName.textContent = spec.name.toUpperCase();
    const pSub = document.getElementById('part-subsystem');
    if (pSub) pSub.textContent = spec.sub;
    const pEng = document.getElementById('part-engineering');
    if (pEng) pEng.textContent = spec.eng;
    const pMat = document.getElementById('part-material');
    if (pMat) pMat.textContent = spec.mat;
    const pRpm = document.getElementById('part-rpm');
    if (pRpm) pRpm.textContent = spec.rpm;
  }

  // -----------------------------------------------------------
  // SCALE-INVARIANT SPATIAL GEOMETRY & ANGLE ENGINE
  // -----------------------------------------------------------
  initMediaPipeHands() {
    const video = document.getElementById('webcam-video');
    const overlayCanvas = document.getElementById('hand-overlay-canvas');
    const overlayCtx = overlayCanvas.getContext('2d');
    const loadingElem = document.getElementById('camera-loading');

    const hands = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
    });

    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    hands.onResults((results) => {
      if (loadingElem) loadingElem.classList.add('hidden');
      const touchlessOverlay = document.getElementById('touchless-overlay');
      if (touchlessOverlay && !touchlessOverlay.classList.contains('dismissed')) {
        touchlessOverlay.classList.add('dismissed');
      }

      overlayCanvas.width = video.videoWidth || 320;
      overlayCanvas.height = video.videoHeight || 240;
      overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

      this.handsData = results.multiHandLandmarks || [];
      const numHands = this.handsData.length;
      const countBadge = document.getElementById('hud-hand-count');
      if (countBadge) countBadge.textContent = `${numHands} HANDS`;

      // 1. Two-Hand Explosion Gesture
      if (numHands >= 2) {
        const h1 = this.handsData[0][0];
        const h2 = this.handsData[1][0];
        const p1Scale = Math.hypot(this.handsData[0][0].x - this.handsData[0][9].x, this.handsData[0][0].y - this.handsData[0][9].y);
        const p2Scale = Math.hypot(this.handsData[1][0].x - this.handsData[1][9].x, this.handsData[1][0].y - this.handsData[1][9].y);
        const avgPalmScale = Math.max(0.05, (p1Scale + p2Scale) / 2);

        const handDist = Math.hypot(h1.x - h2.x, h1.y - h2.y);
        const distElem = document.getElementById('hud-hand-dist');
        if (distElem) distElem.textContent = `${Math.round(handDist * overlayCanvas.width)} px`;

        const normDist = (handDist - avgPalmScale * 0.45) / (avgPalmScale * 2.2);
        this.setExplosion(normDist);

        const modeBadge = document.getElementById('usage-mode');
        if (modeBadge) modeBadge.textContent = 'DUAL EXPLODE';
      } else if (numHands === 1) {
        const distElem = document.getElementById('hud-hand-dist');
        if (distElem) distElem.textContent = `1 HAND`;
      } else {
        const distElem = document.getElementById('hud-hand-dist');
        if (distElem) distElem.textContent = `0 px`;
        this.hideAirCursor();
        return;
      }

      // 2. Comprehensive Geometry Wireframes & Angle Extractions
      const primaryHand = this.handsData[0];
      this.computeValuedAngles(primaryHand, overlayCanvas.width, overlayCanvas.height);
      this.drawFullNeuralGeometry(overlayCtx, primaryHand, overlayCanvas.width, overlayCanvas.height);

      // 3. Speed-Adaptive Double Exponential Moving Average Pointer
      const indexTip = primaryHand[8];
      const rawScreenX = (1 - indexTip.x) * window.innerWidth;
      const rawScreenY = indexTip.y * window.innerHeight;

      const deltaX = rawScreenX - this.lastRawPos.x;
      const deltaY = rawScreenY - this.lastRawPos.y;
      const speed = Math.hypot(deltaX, deltaY);
      this.lastRawPos = { x: rawScreenX, y: rawScreenY };

      const dynamicAlpha = THREE.MathUtils.clamp(0.14 + (speed / 18) * 0.74, 0.14, 0.88);
      this.filteredAirPos.x += (rawScreenX - this.filteredAirPos.x) * dynamicAlpha;
      this.filteredAirPos.y += (rawScreenY - this.filteredAirPos.y) * dynamicAlpha;

      const wasPinching = this.isPinching;
      // Schmitt Trigger Hysteresis
      if (!this.isPinching && this.pinchRatio < 0.22) {
        this.isPinching = true;
        audio.playPinchLock();
      } else if (this.isPinching && this.pinchRatio > 0.38) {
        this.isPinching = false;
      }

      const pinchBadge = document.getElementById('hud-pinch-status');
      if (pinchBadge) {
        if (this.isPinching) {
          pinchBadge.textContent = 'PINCH: LOCKED';
          pinchBadge.className = 'pip-stat active';
        } else {
          pinchBadge.textContent = 'PINCH: FREE';
          pinchBadge.className = 'pip-stat inactive';
        }
      }

      this.updateAirCursor(this.filteredAirPos.x, this.filteredAirPos.y, wasPinching);
    });

    const camera = new Camera(video, {
      onFrame: async () => {
        await hands.send({ image: video });
      },
      width: 320,
      height: 240
    });
    camera.start().catch((err) => {
      console.warn('Camera sensor fallback:', err);
      if (loadingElem) loadingElem.innerHTML = '<span>TOUCHLESS SENSOR STANDBY</span>';
    });
  }

  // -----------------------------------------------------------
  // MATHEMATICAL ANGLE CALCULATIONS (Pitch/Yaw/Roll, Pinch Angle, Articulation)
  // -----------------------------------------------------------
  computeValuedAngles(lms, w, h) {
    const wrist = lms[0];
    const indexMCP = lms[5];
    const middleMCP = lms[9];
    const pinkyMCP = lms[17];
    const thumbTip = lms[4];
    const indexTip = lms[8];
    const indexPIP = lms[6];
    const indexDIP = lms[7];

    const palmDist3D = Math.hypot(
      wrist.x - middleMCP.x,
      wrist.y - middleMCP.y,
      (wrist.z - middleMCP.z) * 1.2
    );
    this.palmScale = Math.max(0.04, palmDist3D);

    const pinchDist3D = Math.hypot(
      thumbTip.x - indexTip.x,
      thumbTip.y - indexTip.y,
      (thumbTip.z - indexTip.z) * 1.2
    );
    this.pinchRatio = pinchDist3D / this.palmScale;

    // 3D Palm Orientation (Normal via Cross Product)
    const v1 = { x: indexMCP.x - wrist.x, y: indexMCP.y - wrist.y, z: indexMCP.z - wrist.z };
    const v2 = { x: pinkyMCP.x - wrist.x, y: pinkyMCP.y - wrist.y, z: pinkyMCP.z - wrist.z };
    const nx = v1.y * v2.z - v1.z * v2.y;
    const ny = v1.z * v2.x - v1.x * v2.z;
    const nz = v1.x * v2.y - v1.y * v2.x;
    const norm = Math.hypot(nx, ny, nz) || 1.0;
    const normX = nx / norm;
    const normY = ny / norm;
    const normZ = nz / norm;

    const pitch = Math.round(Math.atan2(normY, Math.hypot(normX, normZ)) * (180 / Math.PI));
    const yaw = Math.round(Math.atan2(normX, normZ) * (180 / Math.PI));
    const roll = Math.round(Math.atan2(v1.y, v1.x) * (180 / Math.PI));
    this.palmOrientation = { pitch, yaw, roll };

    // Pinch Vector Convergence Angle
    const vThumb = { x: thumbTip.x - lms[2].x, y: thumbTip.y - lms[2].y, z: thumbTip.z - lms[2].z };
    const vIndex = { x: indexTip.x - lms[5].x, y: indexTip.y - lms[5].y, z: indexTip.z - lms[5].z };
    const dotTI = vThumb.x * vIndex.x + vThumb.y * vIndex.y + vThumb.z * vIndex.z;
    const magT = Math.hypot(vThumb.x, vThumb.y, vThumb.z) || 1e-4;
    const magI = Math.hypot(vIndex.x, vIndex.y, vIndex.z) || 1e-4;
    const cosAngle = THREE.MathUtils.clamp(dotTI / (magT * magI), -1.0, 1.0);
    this.pinchConvergenceAngle = Math.round(Math.acos(cosAngle) * (180 / Math.PI));

    // Index Joint Articulation Angle
    const vPip = { x: indexPIP.x - indexMCP.x, y: indexPIP.y - indexMCP.y };
    const vDip = { x: indexTip.x - indexPIP.x, y: indexTip.y - indexPIP.y };
    const dotPipDip = vPip.x * vDip.x + vPip.y * vDip.y;
    const magPip = Math.hypot(vPip.x, vPip.y) || 1e-4;
    const magDip = Math.hypot(vDip.x, vDip.y) || 1e-4;
    const cosArt = THREE.MathUtils.clamp(dotPipDip / (magPip * magDip), -1.0, 1.0);
    this.indexArticulationAngle = Math.round(Math.acos(cosArt) * (180 / Math.PI));

    let maxSpan = 0;
    for (let i = 0; i < FINGERTIP_IDS.length; i++) {
      for (let j = i + 1; j < FINGERTIP_IDS.length; j++) {
        const d = Math.hypot(lms[FINGERTIP_IDS[i]].x - lms[FINGERTIP_IDS[j]].x, lms[FINGERTIP_IDS[i]].y - lms[FINGERTIP_IDS[j]].y);
        if (d > maxSpan) maxSpan = d;
      }
    }
    this.fingertipSpan = Math.round(maxSpan * w);

    // Update Telemetry Display
    const pyrElem = document.getElementById('geo-palm-pyr');
    if (pyrElem) pyrElem.textContent = `${pitch >= 0 ? '+' : ''}${pitch}° / ${yaw >= 0 ? '+' : ''}${yaw}° / ${roll >= 0 ? '+' : ''}${roll}°`;

    const pinchAngleElem = document.getElementById('geo-pinch-angle');
    if (pinchAngleElem) {
      pinchAngleElem.textContent = `${this.pinchConvergenceAngle}° (${this.isPinching ? 'LOCKED' : 'FREE'})`;
      pinchAngleElem.className = `chip-val ${this.isPinching ? 'neon-magenta-text' : 'neon-green-text'}`;
    }

    const indexArtElem = document.getElementById('geo-index-angle');
    if (indexArtElem) {
      const state = this.indexArticulationAngle < 35 ? 'EXT' : 'CURL';
      indexArtElem.textContent = `${(180 - this.indexArticulationAngle)}° (${state})`;
    }

    const palmSpanElem = document.getElementById('geo-palm-span');
    if (palmSpanElem) {
      palmSpanElem.textContent = `${this.fingertipSpan} px`;
    }
  }

  // -----------------------------------------------------------
  // "PAST PERFECTION" GEOMETRIC WIREFRAME RENDERER
  // -----------------------------------------------------------
  drawFullNeuralGeometry(ctx, lms, w, h) {
    const px = lms.map(p => ({ x: p.x * w, y: p.y * h }));

    // 1. Palm Geometric Polygon & Translucent Cyan Mesh Fill
    ctx.beginPath();
    ctx.moveTo(px[PALM_LOOP[0]].x, px[PALM_LOOP[0]].y);
    for (let i = 1; i < PALM_LOOP.length; i++) {
      ctx.lineTo(px[PALM_LOOP[i]].x, px[PALM_LOOP[i]].y);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(0, 240, 255, 0.22)';
    ctx.fill();
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 1.8;
    ctx.stroke();

    // 2. Knuckle Bridge Line
    ctx.beginPath();
    ctx.moveTo(px[PALM_KNUCKLE_BRIDGE[0]].x, px[PALM_KNUCKLE_BRIDGE[0]].y);
    for (let i = 1; i < PALM_KNUCKLE_BRIDGE.length; i++) {
      ctx.lineTo(px[PALM_KNUCKLE_BRIDGE[i]].x, px[PALM_KNUCKLE_BRIDGE[i]].y);
    }
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 3. Internal Palm Radial Struts
    const wrist = px[0];
    ctx.strokeStyle = 'rgba(180, 210, 240, 0.4)';
    ctx.lineWidth = 1;
    [5, 9, 13, 17].forEach(kIdx => {
      ctx.beginPath();
      ctx.moveTo(wrist.x, wrist.y);
      ctx.lineTo(px[kIdx].x, px[kIdx].y);
      ctx.stroke();
    });

    // 4. Centroid Target Reticle
    const palmCx = PALM_LOOP.reduce((sum, idx) => sum + px[idx].x, 0) / PALM_LOOP.length;
    const palmCy = PALM_LOOP.reduce((sum, idx) => sum + px[idx].y, 0) / PALM_LOOP.length;
    this.drawReticle(ctx, palmCx, palmCy, 9, '#ffaa00');

    // 5. Dynamic Magenta Dashed Fingertip Envelope
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(px[FINGERTIP_IDS[0]].x, px[FINGERTIP_IDS[0]].y);
    for (let i = 1; i < FINGERTIP_IDS.length; i++) {
      ctx.lineTo(px[FINGERTIP_IDS[i]].x, px[FINGERTIP_IDS[i]].y);
    }
    ctx.closePath();
    ctx.strokeStyle = '#ff007f';
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.setLineDash([]);

    // 6. Skeletal Bone Vector Rays
    const fingerColors = ['#39ff14', '#00f0ff', '#00f0ff', '#00f0ff', '#39ff14'];
    FINGER_CHAINS.forEach((chain, fIdx) => {
      const col = fingerColors[fIdx];
      ctx.strokeStyle = col;
      ctx.lineWidth = 2.0;
      for (let b = 0; b < chain.length - 1; b++) {
        const p1 = px[chain[b]];
        const p2 = px[chain[b + 1]];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    });

    // 7. Concentric Nodes & Target Crosshairs
    px.forEach((pt, idx) => {
      if (FINGERTIP_IDS.includes(idx)) {
        this.drawReticle(ctx, pt.x, pt.y, 8, idx === 8 ? '#00f0ff' : '#ff007f');
      } else if (idx === 0) {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#00f0ff';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = '#00f0ff';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }
    });
  }

  drawReticle(ctx, cx, cy, radius, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx, cy, 2, 0, Math.PI * 2);
    ctx.fill();

    const arm = radius + 3;
    ctx.beginPath();
    ctx.moveTo(cx - arm, cy);
    ctx.lineTo(cx + arm, cy);
    ctx.moveTo(cx, cy - arm);
    ctx.lineTo(cx, cy + arm);
    ctx.stroke();
  }

  // -----------------------------------------------------------
  // VIRTUAL AIR-CURSOR & SYNTHETIC MOUSE SIMULATION
  // -----------------------------------------------------------
  updateAirCursor(screenX, screenY, wasPinching) {
    const cursor = document.getElementById('air-cursor');
    if (!cursor) return;
    cursor.classList.remove('hidden');
    cursor.style.left = `${screenX}px`;
    cursor.style.top = `${screenY}px`;

    cursor.classList.toggle('pinching', this.isPinching);

    const hitElement = document.elementFromPoint(screenX, screenY);
    const interactiveTarget = hitElement ? hitElement.closest('button, select, input, .pill-btn, .action-btn, .start-btn, .dock-circle-btn, .dock-pill-btn, .sandbox-spawn-btn') : null;

    const labelElem = document.getElementById('air-cursor-label');

    if (interactiveTarget) {
      cursor.classList.add('hovering');
      if (this.hoveredElement !== interactiveTarget) {
        if (this.hoveredElement) this.hoveredElement.classList.remove('air-hovered');
        this.hoveredElement = interactiveTarget;
        this.hoveredElement.classList.add('air-hovered');
        this.dwellStartTime = performance.now();
        audio.playHoverTick();
      }

      if (labelElem) labelElem.textContent = interactiveTarget.innerText || 'INTERACT';

      const elapsed = performance.now() - this.dwellStartTime;
      this.dwellProgress = Math.min(1.0, elapsed / this.dwellDuration);
      const circleBar = document.getElementById('dwell-circle-bar');
      if (circleBar) {
        const offset = 113.1 * (1 - this.dwellProgress);
        circleBar.style.strokeDashoffset = offset;
      }

      if (this.dwellProgress >= 1.0) {
        this.triggerAirClick(interactiveTarget, cursor);
        this.dwellStartTime = performance.now() + 500;
      }

      if (this.isPinching && !wasPinching) {
        this.triggerAirClick(interactiveTarget, cursor);
      }

      if (interactiveTarget.id === 'manual-explosion-slider' && this.isPinching) {
        const rect = interactiveTarget.getBoundingClientRect();
        const ratio = THREE.MathUtils.clamp((screenX - rect.left) / rect.width, 0, 1);
        interactiveTarget.value = Math.round(ratio * 100);
        this.setExplosion(ratio);
      }

      const modeBadge = document.getElementById('usage-mode');
      if (modeBadge) modeBadge.textContent = 'AIR-HOVER LOCK';
    } else {
      cursor.classList.remove('hovering');
      if (this.hoveredElement) {
        this.hoveredElement.classList.remove('air-hovered');
        this.hoveredElement = null;
      }
      this.dwellProgress = 0;
      const circleBar = document.getElementById('dwell-circle-bar');
      if (circleBar) circleBar.style.strokeDashoffset = 113.1;

      if (labelElem) labelElem.textContent = this.isPinching ? '3D ORBIT' : 'AIR-POINT';

      if (this.isPinching) {
        if (!wasPinching) {
          this.dragStartCoords = { x: screenX, y: screenY };
          this.isAirDragging = true;
          this.testPartGrab(screenX, screenY);
        } else if (this.isAirDragging) {
          const dx = screenX - this.dragStartCoords.x;
          const dy = screenY - this.dragStartCoords.y;
          this.dragStartCoords = { x: screenX, y: screenY };

          if (this.grabbedMesh) {
            this.handlePartDrag(screenX, screenY);
          } else {
            this.assemblyGroup.rotation.y += dx * 0.008;
            this.assemblyGroup.rotation.x += dy * 0.008;
            if (this.workspaceSandboxGroup.visible) {
              this.workspaceSandboxGroup.rotation.y += dx * 0.008;
              this.workspaceSandboxGroup.rotation.x += dy * 0.008;
            }
          }
        }
        const modeBadge = document.getElementById('usage-mode');
        if (modeBadge) modeBadge.textContent = this.grabbedMesh ? 'PART EXTRACT' : '3D ORBIT';
      } else {
        if (this.isAirDragging && this.grabbedMesh && this.currentZone === 3) {
          // Check magnetic port snapping on release in Sandbox
          this.checkMagneticSnapping(this.grabbedMesh);
        }
        this.isAirDragging = false;
        if (this.grabbedMesh) this.grabbedMesh = null;
        const modeBadge = document.getElementById('usage-mode');
        if (modeBadge) modeBadge.textContent = 'AIR-CURSOR';
      }
    }
  }

  triggerAirClick(target, cursor) {
    audio.playAirClick();
    cursor.classList.add('clicking');
    setTimeout(() => cursor.classList.remove('clicking'), 400);

    target.focus();
    target.click();

    if (target.tagName.toLowerCase() === 'select') {
      const nextIdx = (target.selectedIndex + 1) % target.options.length;
      target.selectedIndex = nextIdx;
      const evt = new Event('change', { bubbles: true });
      target.dispatchEvent(evt);
    }
  }

  hideAirCursor() {
    const cursor = document.getElementById('air-cursor');
    if (cursor) cursor.classList.add('hidden');
    if (this.hoveredElement) {
      this.hoveredElement.classList.remove('air-hovered');
      this.hoveredElement = null;
    }
  }

  testPartGrab(screenX, screenY) {
    const ndcX = (screenX / window.innerWidth) * 2 - 1;
    const ndcY = -(screenY / window.innerHeight) * 2 + 1;
    this.mouse.set(ndcX, ndcY);
    this.raycaster.setFromCamera(this.mouse, this.camera);

    const candidates = this.currentZone === 1 ? this.machineParts :
                       this.currentZone === 2 ? this.trayParts :
                       this.sandboxParts;

    const flatMeshes = [];
    candidates.forEach(c => {
      c.traverse(child => {
        if (child.isMesh) {
          child.userData.parentContainer = c;
          flatMeshes.push(child);
        }
      });
    });

    const intersects = this.raycaster.intersectObjects(flatMeshes);
    if (intersects.length > 0) {
      const topPart = intersects[0].object.userData.parentContainer || intersects[0].object;
      this.grabbedMesh = topPart;
      if (topPart.userData.specKey) {
        this.updateTelemetry(topPart.userData.specKey);
      }
    }
  }

  handlePartDrag(screenX, screenY) {
    if (!this.grabbedMesh) return;
    const ndcX = (screenX / window.innerWidth) * 2 - 1;
    const ndcY = -(screenY / window.innerHeight) * 2 + 1;
    this.mouse.set(ndcX, ndcY);
    this.raycaster.setFromCamera(this.mouse, this.camera);

    const dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const intersectPt = new THREE.Vector3();
    this.raycaster.ray.intersectPlane(dragPlane, intersectPt);
    if (intersectPt) {
      this.grabbedMesh.position.x = intersectPt.x;
      this.grabbedMesh.position.y = intersectPt.y;
    }
  }

  checkMagneticSnapping(activePart) {
    if (!activePart || !activePart.userData || !activePart.userData.ports) return;
    const activePorts = activePart.userData.ports;

    for (let otherPart of this.sandboxParts) {
      if (otherPart === activePart) continue;
      if (!otherPart.userData || !otherPart.userData.ports) continue;
      const otherPorts = otherPart.userData.ports;

      for (let ap of activePorts) {
        for (let op of otherPorts) {
          if (ap.snapWith === op.id || op.snapWith === ap.id) {
            const worldAp = ap.pos.clone().add(activePart.position);
            const worldOp = op.pos.clone().add(otherPart.position);
            const dist = worldAp.distanceTo(worldOp);

            if (dist < 32.0) {
              // Magnetic Snap!
              const offset = worldOp.clone().sub(ap.pos);
              activePart.position.copy(offset);
              audio.playSnapLock();

              const modeBadge = document.getElementById('usage-mode');
              if (modeBadge) modeBadge.textContent = 'MAGNETIC SNAP LOCKED!';
              return;
            }
          }
        }
      }
    }
  }

  // -----------------------------------------------------------
  // UI & Event Bindings
  // -----------------------------------------------------------
  setupUI() {
    window.addEventListener('click', () => audio.init(), { once: true });

    const startBtn = document.getElementById('btn-touchless-start');
    if (startBtn) {
      startBtn.onclick = () => {
        audio.init();
        const overlay = document.getElementById('touchless-overlay');
        if (overlay) overlay.classList.add('dismissed');
      };
    }

    document.getElementById('tab-zone-1').onclick = () => this.switchZone(1);
    document.getElementById('tab-zone-2').onclick = () => this.switchZone(2);
    document.getElementById('tab-zone-3').onclick = () => this.switchZone(3);

    document.getElementById('machine-select').onchange = (e) => {
      this.currentMachine = e.target.value;
      this.buildCurrentMachine();
    };

    const densitySelect = document.getElementById('density-select');
    if (densitySelect) {
      densitySelect.onchange = (e) => {
        this.densityMode = e.target.value;
        this.updateDensityMultiplier();
        this.buildCurrentMachine();
      };
    }

    document.getElementById('btn-toggle-harness').onclick = () => this.toggleHarness();
    document.getElementById('btn-toggle-wireframe').onclick = () => this.toggleWireframe();
    document.getElementById('btn-toggle-pixels').onclick = () => this.togglePixels();
    document.getElementById('btn-reset-assembly').onclick = () => {
      this.setExplosion(0);
      this.buildCurrentMachine();
    };

    const clearSandboxBtn = document.getElementById('btn-clear-sandbox');
    if (clearSandboxBtn) {
      clearSandboxBtn.onclick = () => this.clearSandbox();
    }

    // Sandbox Spawner Buttons Bindings
    document.querySelectorAll('.sandbox-spawn-btn').forEach(btn => {
      btn.onclick = () => {
        const pType = btn.getAttribute('data-spawn');
        this.spawnSandboxPart(pType);
      };
    });

    document.getElementById('manual-explosion-slider').oninput = (e) => {
      this.setExplosion(e.target.value / 100);
    };

    const camBox = document.getElementById('webcam-viewport');
    const minCamBtn = document.getElementById('btn-minimize-cam');
    if (minCamBtn && camBox) {
      minCamBtn.onclick = () => {
        camBox.classList.toggle('minimized');
        const isMin = camBox.classList.contains('minimized');
        minCamBtn.textContent = isMin ? '🗖' : '🗕';
      };
    }

    document.getElementById('btn-zoom-in').onclick = () => {
      this.camera.position.z = Math.max(80, this.camera.position.z - 35);
    };
    document.getElementById('btn-zoom-out').onclick = () => {
      this.camera.position.z = Math.min(650, this.camera.position.z + 35);
    };
    document.getElementById('btn-zoom-reset').onclick = () => {
      this.camera.position.set(130, 85, 230);
      this.controls.target.set(0, 0, 0);
    };

    document.getElementById('btn-sound-toggle').onclick = () => {
      audio.enabled = !audio.enabled;
      document.getElementById('sound-icon').textContent = audio.enabled ? '🔊' : '🔇';
    };

    window.addEventListener('keydown', (e) => {
      if (e.key === '1') this.switchZone(1);
      if (e.key === '2') this.switchZone(2);
      if (e.key === '3') this.switchZone(3);
      if (e.key === 'h' || e.key === 'H') this.toggleHarness();
      if (e.key === 'w' || e.key === 'W') this.toggleWireframe();
      if (e.key === 'p' || e.key === 'P') this.togglePixels();
      if (e.key === 'r' || e.key === 'R') document.getElementById('btn-reset-assembly').click();
      if (e.key === 'c' || e.key === 'C') { if (minCamBtn) minCamBtn.click(); }
      if (e.key === '+' || e.key === '=') document.getElementById('btn-zoom-in').click();
      if (e.key === '-' || e.key === '_') document.getElementById('btn-zoom-out').click();
      if (e.key === '0') document.getElementById('btn-zoom-reset').click();
    });
  }

  onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  // -----------------------------------------------------------
  // Render & Running Telemetry Loop (60 FPS)
  // -----------------------------------------------------------
  animate() {
    requestAnimationFrame(() => this.animate());

    const now = performance.now();
    this.frameCount++;
    if (now - this.lastFrameTime >= 1000) {
      this.currentFPS = ((this.frameCount * 1000) / (now - this.lastFrameTime)).toFixed(0);
      this.frameCount = 0;
      this.lastFrameTime = now;
      const fpsBadge = document.getElementById('fps-badge');
      if (fpsBadge) fpsBadge.textContent = `${this.currentFPS} FPS`;
      const statusPill = document.getElementById('usage-status');
      if (statusPill) statusPill.textContent = `LIVE ${this.currentFPS}FPS`;
    }

    // Pulse active electrical signals along wiring harnesses
    this.pulseClock += 0.008;
    this.harnessObjects.forEach(h => {
      const p = h.userData.pulsePoints;
      if (p && p.userData && p.userData.curve) {
        const curve = p.userData.curve;
        const uvs = p.userData.uvs;
        const count = p.userData.count;
        const posAttr = p.geometry.attributes.position;
        for (let i = 0; i < count; i++) {
          uvs[i] = (uvs[i] + 0.004) % 1.0;
          const pt = curve.getPoint(uvs[i]);
          posAttr.setXYZ(i, pt.x, pt.y, pt.z);
        }
        posAttr.needsUpdate = true;
      }
    });

    if (!this.isAirDragging && !this.isPinching && this.currentZone === 1) {
      this.assemblyGroup.rotation.z += 0.0035;
    }
    if (this.currentZone === 2) {
      this.trayParts.forEach((p, idx) => {
        p.rotation.y += 0.015 * (idx % 2 === 0 ? 1 : -1);
      });
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.app = new HolographicApp();
});
