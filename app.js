/**
 * NEXUS CAD // Holographic Neon Machine & Pixel Cloud Workspace
 * Pure Pixel/Voxel 3D CAD + 100% Touchless In-Browser Kinetic Engine
 * 
 * Key Features:
 *   1. Pure Voxel/Pixel CAD Architecture (35,000 - 50,000 Glowing Neon Pixels per Assembly)
 *   2. Dual-Level Continuous Explosion (Axial Component Spread + Volumetric Pixel Matrix Scatter)
 *   3. Scale-Invariant Mathematical Finger Tracking (Hysteresis Schmitt Trigger, Palm Scale Normalization)
 *   4. Zero Mouse & Keyboard Requirement:
 *      - Virtual Air-Cursor with Speed-Adaptive Double EMA Jitter Filter
 *      - Air-Pinch Instant Click + Dwell Circular Progress Auto-Click
 *      - Direct Air-Drag for 3D Orbit & Explosion Sliders
 *      - Two-Hand Continuous Spatial Explosion
 *   5. Live Running Usage & Telemetry Ticker (Active Voxels, VRAM Buffer, Kinetic Rate, 60 FPS)
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
}

const audio = new SoundEngine();

// -------------------------------------------------------------
// Component Data Registry
// -------------------------------------------------------------
const COMPONENT_SPECS = {
  // Turbofan Engine
  cone: { name: "Aero Intake Cone", sub: "Air Induction", mat: "Ti-6Al-4V Titanium", rpm: "0 (Static)" },
  fan: { name: "Wide-Chord Fan Rotor", sub: "LP Compression", mat: "Titanium Hollow Blade", rpm: "3,200 RPM" },
  compressor: { name: "Axial Compressor Disk", sub: "HP Compression", mat: "Nickel Superalloy", rpm: "12,400 RPM" },
  combustor: { name: "Annular Combustor Core", sub: "Combustion Unit", mat: "Ceramic Matrix (CMC)", rpm: "0 (Thermal)" },
  turbine: { name: "High-Pressure Turbine", sub: "Power Extraction", mat: "Single-Crystal Inconel", rpm: "12,400 RPM" },
  nozzle: { name: "Exhaust Thrust Nozzle", sub: "Expansion Nozzle", mat: "Cobalt Base Superalloy", rpm: "0 (Static)" },
  
  // Gearbox
  shaft_in: { name: "Input Drive Shaft", sub: "Torque Coupling", mat: "AISI 4340 Alloy Steel", rpm: "6,000 RPM" },
  sun_gear: { name: "Sun Drive Gear", sub: "Planetary Reduction", mat: "Carburized Steel", rpm: "6,000 RPM" },
  planet_gears: { name: "Triple Planet Carrier", sub: "Epicyclic Train", mat: "Case-Hardened Steel", rpm: "1,800 RPM" },
  ring_gear: { name: "Internal Ring Gear", sub: "Outer Annulus", mat: "Nitrided Alloy", rpm: "0 (Locked)" },
  shaft_out: { name: "Output Hub Shaft", sub: "Load Transmission", mat: "Forged High-Strength Steel", rpm: "1,200 RPM" },

  // Robot Arm
  base_turret: { name: "Base Turret Flange", sub: "Kinematic Mount", mat: "Cast Aerospace Aluminum", rpm: "±360° Yaw" },
  stator_motor: { name: "Brushless Servo Stator", sub: "Electromagnetic Drive", mat: "Neodymium & Copper", rpm: "4,500 RPM" },
  harmonic_drive: { name: "Harmonic Reducer Ring", sub: "Zero-Backlash Gearing", mat: "Special Spring Steel", rpm: "100:1 Ratio" },
  pivot_yoke: { name: "Actuator Pivot Yoke", sub: "Pitch Articulation", mat: "Billet 7075-T6 Al", rpm: "±120° Pitch" },
  end_effector: { name: "Adaptive Micro-Gripper", sub: "Payload Tooling", mat: "Carbon Fiber & Rubber", rpm: "Pneumatic 50N" }
};

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
    this.currentZone = 1; // 1: Machines, 2: Components, 3: Workspace
    this.currentMachine = 'turbine';
    this.explosionFactor = 0.0;
    this.isWireframe = false;
    this.pixelsEnabled = true;
    this.grabbedMesh = null;

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
    this.pixelClouds = [];
    this.totalVoxelCount = 0;

    // Running Usage Metrics
    this.lastFrameTime = performance.now();
    this.frameCount = 0;
    this.currentFPS = 60.0;
    this.kineticRate = 0.0;
    this.lastExplosionFactor = 0.0;

    // Air-Cursor & Scale-Invariant Hand Tracking State
    this.handsData = [];
    this.isPinching = false;
    this.pinchRatio = 1.0;
    this.palmScale = 1.0;
    this.smoothHandDist = 180;
    this.airCursorPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.filteredAirPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.lastRawPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.hoveredElement = null;
    this.dwellStartTime = 0;
    this.dwellDuration = 1000; // 1.0s dwell auto-click
    this.dwellProgress = 0;
    this.isAirDragging = false;
    this.dragStartCoords = { x: 0, y: 0 };
    this.lastDragDelta = { x: 0, y: 0 };
    this.isSliderDragging = false;

    this.initThree();
    this.buildTurbineModel();
    this.buildComponentsTray();
    this.setupUI();
    this.initMediaPipeHands();
    this.animate();
  }

  // -----------------------------------------------------------
  // Three.js Engine & Lighting Setup
  // -----------------------------------------------------------
  initThree() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x040609);
    this.scene.fog = new THREE.FogExp2(0x040609, 0.0018);

    // Heroic Perspective Camera Framing
    this.camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 3500);
    this.camera.position.set(130, 85, 230);

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = false;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.35;

    this.controls = new THREE.OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.maxDistance = 750;
    this.controls.minDistance = 50;
    this.controls.target.set(0, 0, 0);

    // Dynamic 4-Point High-Intensity Neon Studio Lighting
    const ambient = new THREE.AmbientLight(0x081220, 1.8);
    this.scene.add(ambient);

    const cyanKey = new THREE.DirectionalLight(0x00f0ff, 3.2);
    cyanKey.position.set(160, 240, 200);
    this.scene.add(cyanKey);

    const magentaFill = new THREE.PointLight(0xff007f, 2.8, 800);
    magentaFill.position.set(-180, -90, 140);
    this.scene.add(magentaFill);

    const greenRim = new THREE.PointLight(0x39ff14, 2.5, 700);
    greenRim.position.set(0, 200, -200);
    this.scene.add(greenRim);

    const goldAccent = new THREE.PointLight(0xffaa00, 2.0, 500);
    goldAccent.position.set(180, -120, -100);
    this.scene.add(goldAccent);

    // Holographic CAD Floor Grid
    const gridHelper = new THREE.GridHelper(900, 60, 0x00f0ff, 0x0d1824);
    gridHelper.position.y = -95;
    this.scene.add(gridHelper);

    this.scene.add(this.assemblyGroup);
    this.scene.add(this.componentsTrayGroup);
    this.scene.add(this.workspaceSandboxGroup);
    this.componentsTrayGroup.visible = false;

    window.addEventListener('resize', () => this.onWindowResize());
  }

  // -----------------------------------------------------------
  // Translucent Ghost Shell Material & Glowing Wireframe Accents
  // -----------------------------------------------------------
  createTranslucentShellMaterial(colorHex, emissiveHex) {
    return new THREE.MeshStandardMaterial({
      color: colorHex,
      emissive: emissiveHex || colorHex,
      emissiveIntensity: 0.5,
      metalness: 0.9,
      roughness: 0.2,
      transparent: true,
      opacity: 0.22, // Subtle ghost shell so voxels dominate
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
      opacity: 0.75
    }));
    mesh.add(line);
    return line;
  }

  // -----------------------------------------------------------
  // PURE VOXEL / PIXEL CLOUD GENERATOR
  // Generates dense 3D point cloud surfaces and volumes with
  // radial velocity, vortex swirl, and turbulent explosion vectors
  // -----------------------------------------------------------
  createVolumetricPixelCloud(pointsGenCallback, colorHex, pointCount, pointSize = 3.6) {
    const originalPositions = new Float32Array(pointCount * 3);
    const currentPositions = new Float32Array(pointCount * 3);
    const scatterVectors = new Float32Array(pointCount * 3);
    const colors = new Float32Array(pointCount * 3);
    const baseColor = new THREE.Color(colorHex);

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

      // Volumetric Scatter Dynamics: Radial burst + Helical Vortex Swirl + Turbulence Noise
      const dist = Math.hypot(ox, oy, oz) || 1.0;
      const radialSpeed = 65 + Math.random() * 115;
      const radialX = (ox / dist) * radialSpeed;
      const radialY = (oy / dist) * radialSpeed;
      const radialZ = (oz / dist) * radialSpeed;

      // Tangential Swirl (Helical Vortex around Z axis)
      const swirlDist = Math.hypot(ox, oy) || 1.0;
      const swirlSpeed = 40 + Math.random() * 50;
      const swirlX = (-oy / swirlDist) * swirlSpeed;
      const swirlY = (ox / swirlDist) * swirlSpeed;

      // High-Frequency Trigonometric Turbulence
      const turbX = (Math.sin(ox * 0.1) + (Math.random() - 0.5)) * 30;
      const turbY = (Math.cos(oy * 0.1) + (Math.random() - 0.5)) * 30;
      const turbZ = (Math.sin(oz * 0.1) + (Math.random() - 0.5)) * 30;

      scatterVectors[i * 3] = radialX + swirlX * 0.45 + turbX;
      scatterVectors[i * 3 + 1] = radialY + swirlY * 0.45 + turbY;
      scatterVectors[i * 3 + 2] = radialZ + turbZ;

      // Radiant Neon Colors with Specular Highlights
      const shade = 0.85 + Math.random() * 0.4;
      colors[i * 3] = Math.min(1.0, baseColor.r * shade + (Math.random() > 0.88 ? 0.25 : 0));
      colors[i * 3 + 1] = Math.min(1.0, baseColor.g * shade + (Math.random() > 0.88 ? 0.25 : 0));
      colors[i * 3 + 2] = Math.min(1.0, baseColor.b * shade + (Math.random() > 0.88 ? 0.25 : 0));
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: pointSize,
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
  // MODEL 1: TURBOFAN JET ENGINE (Built Entirely from 42,000+ Pixels)
  // -----------------------------------------------------------
  buildTurbineModel() {
    this.clearAssembly();

    // 1. Intake Cowl Cone (3,500 Pixels)
    const coneGroup = new THREE.Group();
    const conePixels = this.createVolumetricPixelCloud((i, total) => {
      const u = i / total;
      const r = Math.pow(u, 0.7) * 32;
      const z = (1 - u) * 65 - 32.5;
      const theta = i * 2.39996; // Golden spiral
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z: z };
    }, 0x00f0ff, 3500, 3.8);
    coneGroup.add(conePixels);

    const coneGeo = new THREE.ConeGeometry(32, 65, 32);
    coneGeo.rotateX(Math.PI / 2);
    const coneShell = new THREE.Mesh(coneGeo, this.createTranslucentShellMaterial(0x00f0ff, 0x0088cc));
    this.addNeonEdges(coneShell, 0x00f0ff);
    coneGroup.add(coneShell);
    coneGroup.userData = { specKey: 'cone', baseZ: -140, pixelCloud: conePixels };
    this.registerPart(coneGroup);

    // 2. Wide-Chord Fan Rotor (18 Blades, 8,200 Blade Pixels + 2,400 Hub Pixels = 10,600 Pixels)
    const fanGroup = new THREE.Group();
    const fanHubPixels = this.createVolumetricPixelCloud((i, total) => {
      const theta = (i / total) * Math.PI * 2 * 12;
      const r = 26 * Math.sqrt(Math.random());
      const z = (Math.random() - 0.5) * 20;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z: z };
    }, 0x00f0ff, 2400, 3.5);
    fanGroup.add(fanHubPixels);

    const fanBladePixels = this.createVolumetricPixelCloud((i, total) => {
      const bladeIdx = Math.floor(i / (total / 18));
      const bladeAngle = (bladeIdx / 18) * Math.PI * 2;
      const u = (i % (total / 18)) / (total / 18);
      const span = 26 + u * 58; // Span from hub to tip
      const chord = (Math.random() - 0.5) * (14 - u * 4);
      const twist = 0.45 + (1 - u) * 0.35;
      const bx = Math.cos(bladeAngle) * span - Math.sin(bladeAngle) * chord * Math.cos(twist);
      const by = Math.sin(bladeAngle) * span + Math.cos(bladeAngle) * chord * Math.cos(twist);
      const bz = chord * Math.sin(twist) + (Math.random() - 0.5) * 1.5;
      return { x: bx, y: by, z: bz };
    }, 0x39ff14, 8200, 3.8);
    fanGroup.add(fanBladePixels);

    const fanHubGeo = new THREE.CylinderGeometry(26, 26, 18, 24);
    fanHubGeo.rotateX(Math.PI / 2);
    const fanHubShell = new THREE.Mesh(fanHubGeo, this.createTranslucentShellMaterial(0x39ff14, 0x11aa00));
    this.addNeonEdges(fanHubShell, 0x39ff14);
    fanGroup.add(fanHubShell);
    fanGroup.userData = { specKey: 'fan', baseZ: -80, pixelCloud: fanBladePixels, subCloud: fanHubPixels };
    this.registerPart(fanGroup);

    // 3. LP & HP Compressor Disks (7,600 Pixels)
    const compGroup = new THREE.Group();
    const compPixels = this.createVolumetricPixelCloud((i, total) => {
      const stage = Math.floor((i / total) * 4); // 4 compression stages
      const stageZ = (stage - 1.5) * 12;
      const stageRadius = 52 + stage * 4.5;
      const theta = (i / total) * Math.PI * 2 * 32;
      const r = 20 + Math.random() * (stageRadius - 20);
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z: stageZ + (Math.random() - 0.5) * 4 };
    }, 0x00f0ff, 7600, 3.6);
    compGroup.add(compPixels);

    const compDrumGeo = new THREE.CylinderGeometry(52, 65, 42, 32);
    compDrumGeo.rotateX(Math.PI / 2);
    const compShell = new THREE.Mesh(compDrumGeo, this.createTranslucentShellMaterial(0x00f0ff, 0x0066aa));
    this.addNeonEdges(compShell, 0x00f0ff);
    compGroup.add(compShell);
    compGroup.userData = { specKey: 'compressor', baseZ: -18, pixelCloud: compPixels };
    this.registerPart(compGroup);

    // 4. Annular Combustor Core & Fuel Injector Ring (7,200 Pixels)
    const combGroup = new THREE.Group();
    const combPixels = this.createVolumetricPixelCloud((i, total) => {
      const theta = (i / total) * Math.PI * 2 * 16;
      const r = 48 + Math.random() * 16;
      const z = (Math.random() - 0.5) * 52;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z: z };
    }, 0xffaa00, 7200, 3.8);
    combGroup.add(combPixels);

    const combGeo = new THREE.CylinderGeometry(62, 62, 52, 32, 1, true);
    combGeo.rotateX(Math.PI / 2);
    const combShell = new THREE.Mesh(combGeo, this.createTranslucentShellMaterial(0xffaa00, 0xcc6600));
    this.addNeonEdges(combShell, 0xff9900);
    combGroup.add(combShell);
    combGroup.userData = { specKey: 'combustor', baseZ: 48, pixelCloud: combPixels };
    this.registerPart(combGroup);

    // 5. HP Turbine Stage (7,000 Pixels)
    const turbGroup = new THREE.Group();
    const turbPixels = this.createVolumetricPixelCloud((i, total) => {
      const bladeIdx = Math.floor(i / (total / 24));
      const bladeAngle = (bladeIdx / 24) * Math.PI * 2;
      const u = (i % (total / 24)) / (total / 24);
      const r = 28 + u * 36;
      const z = (Math.random() - 0.5) * 16;
      return { x: Math.cos(bladeAngle) * r, y: Math.sin(bladeAngle) * r, z: z };
    }, 0xb026ff, 7000, 3.6);
    turbGroup.add(turbPixels);

    const turbGeo = new THREE.CylinderGeometry(42, 42, 22, 28);
    turbGeo.rotateX(Math.PI / 2);
    const turbShell = new THREE.Mesh(turbGeo, this.createTranslucentShellMaterial(0xb026ff, 0x7700cc));
    this.addNeonEdges(turbShell, 0xb026ff);
    turbGroup.add(turbShell);
    turbGroup.userData = { specKey: 'turbine', baseZ: 110, pixelCloud: turbPixels };
    this.registerPart(turbGroup);

    // 6. Thrust Nozzle Cowl & Supersonic Exhaust Stream (6,500 Pixels)
    const nozzGroup = new THREE.Group();
    const nozzPixels = this.createVolumetricPixelCloud((i, total) => {
      const u = i / total;
      const z = u * 75 - 37.5;
      const r = 58 - u * 18 + (Math.random() - 0.5) * 3;
      const theta = (i / total) * Math.PI * 2 * 20;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z: z };
    }, 0xff007f, 6500, 3.8);
    nozzGroup.add(nozzPixels);

    const nozzGeo = new THREE.ConeGeometry(58, 75, 32, 1, true);
    nozzGeo.rotateX(-Math.PI / 2);
    const nozzShell = new THREE.Mesh(nozzGeo, this.createTranslucentShellMaterial(0xff007f, 0xaa0044));
    this.addNeonEdges(nozzShell, 0xff007f);
    nozzGroup.add(nozzShell);
    nozzGroup.userData = { specKey: 'nozzle', baseZ: 175, pixelCloud: nozzPixels };
    this.registerPart(nozzGroup);

    this.updateAssemblyPositions();
    this.refreshVoxelCount();
  }

  // -----------------------------------------------------------
  // MODEL 2: PLANETARY GEARBOX (Built Entirely from 40,000+ Pixels)
  // -----------------------------------------------------------
  buildGearboxModel() {
    this.clearAssembly();

    // 1. Input Drive Shaft (4,200 Pixels)
    const shaftGroup = new THREE.Group();
    const shaftPixels = this.createVolumetricPixelCloud((i, total) => {
      const z = (i / total) * 85 - 42.5;
      const theta = (i / total) * Math.PI * 2 * 14;
      const r = 12 * Math.sqrt(Math.random());
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z: z };
    }, 0x00f0ff, 4200, 3.6);
    shaftGroup.add(shaftPixels);

    const shaftGeo = new THREE.CylinderGeometry(12, 12, 85, 24);
    shaftGeo.rotateX(Math.PI / 2);
    const shaftShell = new THREE.Mesh(shaftGeo, this.createTranslucentShellMaterial(0x00f0ff, 0x0077aa));
    this.addNeonEdges(shaftShell, 0x00f0ff);
    shaftGroup.add(shaftShell);
    shaftGroup.userData = { specKey: 'shaft_in', baseZ: -125, pixelCloud: shaftPixels };
    this.registerPart(shaftGroup);

    // 2. Central Sun Gear (6,800 Pixels)
    const sunGroup = new THREE.Group();
    const sunPixels = this.createVolumetricPixelCloud((i, total) => {
      const theta = (i / total) * Math.PI * 2 * 14; // 14 gear teeth
      const toothProfile = Math.sin(theta * 14) * 5.0;
      const r = 26 + toothProfile + (Math.random() - 0.5) * 4;
      const z = (Math.random() - 0.5) * 26;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z: z };
    }, 0xffaa00, 6800, 3.8);
    sunGroup.add(sunPixels);

    const sunGeo = new THREE.CylinderGeometry(28, 28, 26, 16);
    sunGeo.rotateX(Math.PI / 2);
    const sunShell = new THREE.Mesh(sunGeo, this.createTranslucentShellMaterial(0xffaa00, 0xaa5500));
    this.addNeonEdges(sunShell, 0xffaa00);
    sunGroup.add(sunShell);
    sunGroup.userData = { specKey: 'sun_gear', baseZ: -55, pixelCloud: sunPixels };
    this.registerPart(sunGroup);

    // 3. Planetary Trio Carrier (14,800 Pixels)
    const planetGroup = new THREE.Group();
    const planetPixels = this.createVolumetricPixelCloud((i, total) => {
      const pIdx = Math.floor(i / (total / 3));
      const pAngle = (pIdx / 3) * Math.PI * 2;
      const cx = Math.cos(pAngle) * 44;
      const cy = Math.sin(pAngle) * 44;
      const localI = i % (total / 3);
      const theta = (localI / (total / 3)) * Math.PI * 2 * 12;
      const tooth = Math.sin(theta * 12) * 3.5;
      const r = 20 + tooth + (Math.random() - 0.5) * 3;
      const z = (Math.random() - 0.5) * 22;
      return { x: cx + Math.cos(theta) * r, y: cy + Math.sin(theta) * r, z: z };
    }, 0x39ff14, 14800, 3.8);
    planetGroup.add(planetPixels);

    const carrierGeo = new THREE.CylinderGeometry(62, 62, 10, 28);
    carrierGeo.rotateX(Math.PI / 2);
    const carrierShell = new THREE.Mesh(carrierGeo, this.createTranslucentShellMaterial(0x39ff14, 0x11aa00));
    this.addNeonEdges(carrierShell, 0x39ff14);
    planetGroup.add(carrierShell);
    planetGroup.userData = { specKey: 'planet_gears', baseZ: 10, pixelCloud: planetPixels };
    this.registerPart(planetGroup);

    // 4. Ring Gear Outer Annulus (9,500 Pixels)
    const ringGroup = new THREE.Group();
    const ringPixels = this.createVolumetricPixelCloud((i, total) => {
      const theta = (i / total) * Math.PI * 2 * 28;
      const tooth = Math.sin(theta * 28) * 4;
      const r = 84 + tooth + (Math.random() - 0.5) * 5;
      const z = (Math.random() - 0.5) * 34;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z: z };
    }, 0xff007f, 9500, 3.8);
    ringGroup.add(ringPixels);

    const ringGeo = new THREE.CylinderGeometry(86, 86, 32, 28, 1, true);
    ringGeo.rotateX(Math.PI / 2);
    const ringShell = new THREE.Mesh(ringGeo, this.createTranslucentShellMaterial(0xff007f, 0xaa0055));
    this.addNeonEdges(ringShell, 0xff007f);
    ringGroup.add(ringShell);
    ringGroup.userData = { specKey: 'ring_gear', baseZ: 75, pixelCloud: ringPixels };
    this.registerPart(ringGroup);

    // 5. Output Flange Shaft (4,500 Pixels)
    const outGroup = new THREE.Group();
    const outPixels = this.createVolumetricPixelCloud((i, total) => {
      const z = (i / total) * 75 - 37.5;
      const theta = (i / total) * Math.PI * 2 * 12;
      const r = 18 * Math.sqrt(Math.random());
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z: z };
    }, 0x00f0ff, 4500, 3.6);
    outGroup.add(outPixels);

    const outGeo = new THREE.CylinderGeometry(18, 28, 75, 24);
    outGeo.rotateX(Math.PI / 2);
    const outShell = new THREE.Mesh(outGeo, this.createTranslucentShellMaterial(0x00f0ff, 0x0088cc));
    this.addNeonEdges(outShell, 0x00f0ff);
    outGroup.add(outShell);
    outGroup.userData = { specKey: 'shaft_out', baseZ: 140, pixelCloud: outPixels };
    this.registerPart(outGroup);

    this.updateAssemblyPositions();
    this.refreshVoxelCount();
  }

  // -----------------------------------------------------------
  // MODEL 3: ROBOTIC ACTUATOR JOINT (Built Entirely from 39,000+ Pixels)
  // -----------------------------------------------------------
  buildRobotArmModel() {
    this.clearAssembly();

    // 1. Base Mounting Turret (7,500 Pixels)
    const baseGroup = new THREE.Group();
    const basePixels = this.createVolumetricPixelCloud((i, total) => {
      const theta = (i / total) * Math.PI * 2 * 18;
      const r = 30 + Math.random() * 45;
      const z = (Math.random() - 0.5) * 26;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z: z };
    }, 0x00f0ff, 7500, 3.8);
    baseGroup.add(basePixels);

    const baseGeo = new THREE.CylinderGeometry(65, 75, 26, 32);
    baseGeo.rotateX(Math.PI / 2);
    const baseShell = new THREE.Mesh(baseGeo, this.createTranslucentShellMaterial(0x00f0ff, 0x0066aa));
    this.addNeonEdges(baseShell, 0x00f0ff);
    baseGroup.add(baseShell);
    baseGroup.userData = { specKey: 'base_turret', baseZ: -120, pixelCloud: basePixels };
    this.registerPart(baseGroup);

    // 2. Brushless Stator & Rotor Core (8,500 Pixels)
    const statGroup = new THREE.Group();
    const statPixels = this.createVolumetricPixelCloud((i, total) => {
      const theta = (i / total) * Math.PI * 2 * 20;
      const r = 24 + Math.random() * 30;
      const z = (Math.random() - 0.5) * 38;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z: z };
    }, 0xff007f, 8500, 3.8);
    statGroup.add(statPixels);

    const statGeo = new THREE.CylinderGeometry(52, 52, 38, 24);
    statGeo.rotateX(Math.PI / 2);
    const statShell = new THREE.Mesh(statGeo, this.createTranslucentShellMaterial(0xff007f, 0x990044));
    this.addNeonEdges(statShell, 0xff007f);
    statGroup.add(statShell);
    statGroup.userData = { specKey: 'stator_motor', baseZ: -50, pixelCloud: statPixels };
    this.registerPart(statGroup);

    // 3. Harmonic Reducer Ring (7,200 Pixels)
    const harmGroup = new THREE.Group();
    const harmPixels = this.createVolumetricPixelCloud((i, total) => {
      const theta = (i / total) * Math.PI * 2 * 24;
      const r = 38 + Math.random() * 12;
      const z = (Math.random() - 0.5) * 26;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z: z };
    }, 0xffaa00, 7200, 3.8);
    harmGroup.add(harmPixels);

    const harmGeo = new THREE.CylinderGeometry(46, 46, 26, 28);
    harmGeo.rotateX(Math.PI / 2);
    const harmShell = new THREE.Mesh(harmGeo, this.createTranslucentShellMaterial(0xffaa00, 0xaa5500));
    this.addNeonEdges(harmShell, 0xffaa00);
    harmGroup.add(harmShell);
    harmGroup.userData = { specKey: 'harmonic_drive', baseZ: 15, pixelCloud: harmPixels };
    this.registerPart(harmGroup);

    // 4. Articulation Yoke Arm (8,000 Pixels)
    const yokeGroup = new THREE.Group();
    const yokePixels = this.createVolumetricPixelCloud((i, total) => {
      const x = (Math.random() - 0.5) * 44;
      const y = (Math.random() - 0.5) * 78;
      const z = (Math.random() - 0.5) * 32;
      return { x, y, z };
    }, 0x00f0ff, 8000, 3.8);
    yokeGroup.add(yokePixels);

    const yokeGeo = new THREE.BoxGeometry(44, 78, 32);
    const yokeShell = new THREE.Mesh(yokeGeo, this.createTranslucentShellMaterial(0x00f0ff, 0x0088cc));
    this.addNeonEdges(yokeShell, 0x00f0ff);
    yokeGroup.add(yokeShell);
    yokeGroup.userData = { specKey: 'pivot_yoke', baseZ: 75, pixelCloud: yokePixels };
    this.registerPart(yokeGroup);

    // 5. Adaptive Gripper & End Effector (7,800 Pixels)
    const gripGroup = new THREE.Group();
    const gripPixels = this.createVolumetricPixelCloud((i, total) => {
      const isLeft = i % 2 === 0;
      const side = isLeft ? -16 : 16;
      const x = side + (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 46;
      const z = (Math.random() - 0.5) * 18;
      return { x, y, z };
    }, 0x39ff14, 7800, 3.8);
    gripGroup.add(gripPixels);

    const gBase = new THREE.Mesh(new THREE.BoxGeometry(36, 22, 26), this.createTranslucentShellMaterial(0x39ff14, 0x11aa00));
    this.addNeonEdges(gBase, 0x39ff14);
    gripGroup.add(gBase);
    gripGroup.userData = { specKey: 'end_effector', baseZ: 145, pixelCloud: gripPixels };
    this.registerPart(gripGroup);

    this.updateAssemblyPositions();
    this.refreshVoxelCount();
  }

  buildComponentsTray() {
    this.trayParts = [];
    const matParts = [
      { key: 'fan', geo: new THREE.CylinderGeometry(36, 36, 12, 24), col: 0x39ff14, x: -260 },
      { key: 'compressor', geo: new THREE.CylinderGeometry(32, 40, 20, 24), col: 0x00f0ff, x: -130 },
      { key: 'sun_gear', geo: new THREE.CylinderGeometry(24, 24, 18, 14), col: 0xffaa00, x: 0 },
      { key: 'combustor', geo: new THREE.CylinderGeometry(30, 30, 32, 32, 1, true), col: 0xff007f, x: 130 },
      { key: 'nozzle', geo: new THREE.ConeGeometry(26, 46, 32), col: 0xb026ff, x: 260 }
    ];

    matParts.forEach(p => {
      const mesh = new THREE.Mesh(p.geo, this.createTranslucentShellMaterial(p.col, p.col));
      this.addNeonEdges(mesh, p.col);
      mesh.position.set(p.x, -20, 0);
      mesh.userData = { specKey: p.key, isTrayItem: true };

      // Holographic Pedestal Disk
      const pedGeo = new THREE.CylinderGeometry(35, 42, 5, 32);
      const pedMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true });
      const ped = new THREE.Mesh(pedGeo, pedMat);
      ped.position.set(p.x, -50, 0);
      this.componentsTrayGroup.add(ped);

      this.componentsTrayGroup.add(mesh);
      this.trayParts.push(mesh);
    });
  }

  registerPart(meshOrGroup) {
    this.assemblyGroup.add(meshOrGroup);
    this.machineParts.push(meshOrGroup);
    if (meshOrGroup.userData.pixelCloud) {
      this.pixelClouds.push(meshOrGroup.userData.pixelCloud);
    }
    if (meshOrGroup.userData.subCloud) {
      this.pixelClouds.push(meshOrGroup.userData.subCloud);
    }
  }

  clearAssembly() {
    while (this.assemblyGroup.children.length > 0) {
      this.assemblyGroup.remove(this.assemblyGroup.children[0]);
    }
    this.machineParts = [];
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

    // Estimate VRAM Buffer: (Pos Float32Array[3] + Color Float32Array[3] + Scatter[3]) = 9 floats per vertex (36 bytes)
    const vramMB = ((count * 36) / (1024 * 1024)).toFixed(1);
    const vramElem = document.getElementById('usage-vram');
    if (vramElem) vramElem.textContent = `${vramMB} MB VRAM`;
  }

  // -----------------------------------------------------------
  // Continuous Dual-Level Explosion & Pixel Dispersion Engine
  // -----------------------------------------------------------
  updateAssemblyPositions() {
    const num = this.machineParts.length;
    const centerIdx = (num - 1) / 2;
    const maxSpread = 220; // Axial spacing

    // 1. Component Separation
    this.machineParts.forEach((part, i) => {
      if (part === this.grabbedMesh) return;
      const distFromCenter = i - centerIdx;
      const spread = distFromCenter * maxSpread * this.explosionFactor;
      part.position.z = part.userData.baseZ + spread;

      // 2. Micro-Pixel / Voxel Matrix Dispersion
      const updateCloud = (pCloud) => {
        if (!pCloud) return;
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

          // Cross-fade solid ghost shell into glowing pixel constellation
          part.traverse(child => {
            if (child.isMesh && child.material) {
              child.material.opacity = Math.max(0.08, 0.25 - pixelFactor * 0.20);
            }
          });
        } else {
          part.traverse(child => {
            if (child.isMesh && child.material) {
              child.material.opacity = 0.25;
            }
          });
        }
      };

      updateCloud(part.userData.pixelCloud);
      updateCloud(part.userData.subCloud);
    });
  }

  setExplosion(val) {
    const clamped = Math.max(0, Math.min(1, val));
    const delta = Math.abs(clamped - this.lastExplosionFactor);
    this.kineticRate = delta * 1200; // Kinetic rate in px/s
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

  switchZone(zoneId) {
    this.currentZone = zoneId;
    document.querySelectorAll('.pill-btn').forEach((btn, idx) => {
      btn.classList.toggle('active', idx + 1 === zoneId);
      btn.setAttribute('aria-selected', idx + 1 === zoneId);
    });

    if (zoneId === 1) {
      this.assemblyGroup.visible = true;
      this.componentsTrayGroup.visible = false;
    } else if (zoneId === 2) {
      this.assemblyGroup.visible = false;
      this.componentsTrayGroup.visible = true;
    } else {
      this.assemblyGroup.visible = true;
      this.componentsTrayGroup.visible = true;
    }
  }

  updateTelemetry(specKey) {
    const spec = COMPONENT_SPECS[specKey];
    if (!spec) return;

    const pName = document.getElementById('part-name');
    if (pName) pName.textContent = spec.name.toUpperCase();
    const pSub = document.getElementById('part-subsystem');
    if (pSub) pSub.textContent = spec.sub;
    const pMat = document.getElementById('part-material');
    if (pMat) pMat.textContent = spec.mat;
    const pRpm = document.getElementById('part-rpm');
    if (pRpm) pRpm.textContent = spec.rpm;
  }

  // -----------------------------------------------------------
  // SCALE-INVARIANT HAND TRACKING & ZERO-TOUCH AIR CURSOR ENGINE
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

      // 1. Two-Hand Continuous Explosion (Normalized by Palm Span)
      if (numHands >= 2) {
        const h1 = this.handsData[0][0]; // Wrist 1
        const h2 = this.handsData[1][0]; // Wrist 2
        const p1Scale = Math.hypot(this.handsData[0][0].x - this.handsData[0][9].x, this.handsData[0][0].y - this.handsData[0][9].y);
        const p2Scale = Math.hypot(this.handsData[1][0].x - this.handsData[1][9].x, this.handsData[1][0].y - this.handsData[1][9].y);
        const avgPalmScale = Math.max(0.05, (p1Scale + p2Scale) / 2);

        const handDist = Math.hypot(h1.x - h2.x, h1.y - h2.y);
        const distElem = document.getElementById('hud-hand-dist');
        if (distElem) distElem.textContent = `${Math.round(handDist * overlayCanvas.width)} px`;

        // Scale-Invariant span normalization: 0.35x palm span = closed, 2.5x palm span = 100% explosion
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

      // 2. Air-Cursor & Scale-Invariant Finger Geometry
      const primaryHand = this.handsData[0];
      this.drawHandOverlay(overlayCtx, primaryHand, overlayCanvas.width, overlayCanvas.height);

      // Robust Scale-Invariant Palm Metric (Wrist 0 to Middle MCP 9)
      const wrist = primaryHand[0];
      const middleMCP = primaryHand[9];
      const thumb = primaryHand[4];
      const indexTip = primaryHand[8];

      const palmDist = Math.hypot(
        wrist.x - middleMCP.x,
        wrist.y - middleMCP.y,
        (wrist.z - middleMCP.z) * 1.2
      );
      this.palmScale = Math.max(0.04, palmDist);

      // Pinch Distance Normalized by Palm Scale
      const pinchDist = Math.hypot(
        thumb.x - indexTip.x,
        thumb.y - indexTip.y,
        (thumb.z - indexTip.z) * 1.2
      );
      this.pinchRatio = pinchDist / this.palmScale;

      // Hysteresis Schmitt Trigger for Instant Zero-Flutter Pinch
      const wasPinching = this.isPinching;
      if (!this.isPinching && this.pinchRatio < 0.22) {
        this.isPinching = true;
        audio.playPinchLock();
      } else if (this.isPinching && this.pinchRatio > 0.38) {
        this.isPinching = false;
      }

      // Update Pinch Badge
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

      // 3. Speed-Adaptive Double Exponential Moving Average (1€ Filter Style)
      const rawScreenX = (1 - indexTip.x) * window.innerWidth;
      const rawScreenY = indexTip.y * window.innerHeight;

      const deltaX = rawScreenX - this.lastRawPos.x;
      const deltaY = rawScreenY - this.lastRawPos.y;
      const speed = Math.hypot(deltaX, deltaY);
      this.lastRawPos = { x: rawScreenX, y: rawScreenY };

      // High speed -> low lag (alpha ~0.88); Low speed -> extreme stability (alpha ~0.14)
      const dynamicAlpha = THREE.MathUtils.clamp(0.14 + (speed / 18) * 0.74, 0.14, 0.88);
      this.filteredAirPos.x += (rawScreenX - this.filteredAirPos.x) * dynamicAlpha;
      this.filteredAirPos.y += (rawScreenY - this.filteredAirPos.y) * dynamicAlpha;

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

  drawHandOverlay(ctx, lms, w, h) {
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2;
    ctx.fillStyle = '#ff007f';

    const connections = [
      [0, 1], [1, 2], [2, 3], [3, 4],
      [0, 5], [5, 6], [6, 7], [7, 8],
      [0, 9], [9, 10], [10, 11], [11, 12],
      [0, 13], [13, 14], [14, 15], [15, 16],
      [0, 17], [17, 18], [18, 19], [19, 20]
    ];

    connections.forEach(([i, j]) => {
      ctx.beginPath();
      ctx.moveTo(lms[i].x * w, lms[i].y * h);
      ctx.lineTo(lms[j].x * w, lms[j].y * h);
      ctx.stroke();
    });

    [4, 8, 12, 16, 20].forEach((idx) => {
      ctx.beginPath();
      ctx.arc(lms[idx].x * w, lms[idx].y * h, 3.5, 0, 2 * Math.PI);
      ctx.fill();
    });
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

    // Find interactive DOM element directly beneath the virtual air cursor
    // Hide air cursor temporarily from hit-test by css pointer-events: none
    const hitElement = document.elementFromPoint(screenX, screenY);
    const interactiveTarget = hitElement ? hitElement.closest('button, select, input, .pill-btn, .action-btn, .start-btn, .dock-circle-btn, .dock-pill-btn') : null;

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

      // 1. Dwell Progress (Auto-Click after 1.0s hover)
      const elapsed = performance.now() - this.dwellStartTime;
      this.dwellProgress = Math.min(1.0, elapsed / this.dwellDuration);
      const circleBar = document.getElementById('dwell-circle-bar');
      if (circleBar) {
        const offset = 113.1 * (1 - this.dwellProgress);
        circleBar.style.strokeDashoffset = offset;
      }

      if (this.dwellProgress >= 1.0) {
        this.triggerAirClick(interactiveTarget, cursor);
        this.dwellStartTime = performance.now() + 500; // Cooldown
      }

      // 2. Air-Pinch Click Trigger (Instant synthetic click on pinch down)
      if (this.isPinching && !wasPinching) {
        this.triggerAirClick(interactiveTarget, cursor);
      }

      // Special Case: Slider Dragging
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

      // 3. 3D Viewport Interaction (Orbit & Pinch Drag)
      if (this.isPinching) {
        if (!wasPinching) {
          this.dragStartCoords = { x: screenX, y: screenY };
          this.isAirDragging = true;
          // Raycast grab test on 3D parts
          this.testPartGrab(screenX, screenY);
        } else if (this.isAirDragging) {
          const dx = screenX - this.dragStartCoords.x;
          const dy = screenY - this.dragStartCoords.y;
          this.dragStartCoords = { x: screenX, y: screenY };

          if (this.grabbedMesh) {
            // Drag extracted part
            this.handlePartDrag(screenX, screenY);
          } else {
            // Air Orbit Rotation
            this.assemblyGroup.rotation.y += dx * 0.008;
            this.assemblyGroup.rotation.x += dy * 0.008;
          }
        }
        const modeBadge = document.getElementById('usage-mode');
        if (modeBadge) modeBadge.textContent = this.grabbedMesh ? 'PART EXTRACT' : '3D ORBIT';
      } else {
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

    // Dispatch synthetic mouse click
    target.focus();
    target.click();

    // If it's a select element, toggle to next option on air click
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
                       [...this.machineParts, ...this.trayParts];

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
      if (this.currentMachine === 'turbine') this.buildTurbineModel();
      else if (this.currentMachine === 'gearbox') this.buildGearboxModel();
      else this.buildRobotArmModel();
    };

    document.getElementById('btn-toggle-wireframe').onclick = () => this.toggleWireframe();
    document.getElementById('btn-toggle-pixels').onclick = () => this.togglePixels();
    document.getElementById('btn-reset-assembly').onclick = () => {
      this.setExplosion(0);
      if (this.currentMachine === 'turbine') this.buildTurbineModel();
      else if (this.currentMachine === 'gearbox') this.buildGearboxModel();
      else this.buildRobotArmModel();
    };

    document.getElementById('manual-explosion-slider').oninput = (e) => {
      this.setExplosion(e.target.value / 100);
    };

    // Camera Mini-PiP Toggle
    const camBox = document.getElementById('webcam-viewport');
    const minCamBtn = document.getElementById('btn-minimize-cam');
    if (minCamBtn && camBox) {
      minCamBtn.onclick = () => {
        camBox.classList.toggle('minimized');
        const isMin = camBox.classList.contains('minimized');
        minCamBtn.textContent = isMin ? '🗖' : '🗕';
      };
    }

    // Zoom Controls
    document.getElementById('btn-zoom-in').onclick = () => {
      this.camera.position.z = Math.max(80, this.camera.position.z - 35);
    };
    document.getElementById('btn-zoom-out').onclick = () => {
      this.camera.position.z = Math.min(550, this.camera.position.z + 35);
    };
    document.getElementById('btn-zoom-reset').onclick = () => {
      this.camera.position.set(130, 85, 230);
      this.controls.target.set(0, 0, 0);
    };

    document.getElementById('btn-sound-toggle').onclick = () => {
      audio.enabled = !audio.enabled;
      document.getElementById('sound-icon').textContent = audio.enabled ? '🔊' : '🔇';
    };

    // Keyboard Shortcuts (Supplementary fallback)
    window.addEventListener('keydown', (e) => {
      if (e.key === '1') this.switchZone(1);
      if (e.key === '2') this.switchZone(2);
      if (e.key === '3') this.switchZone(3);
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

    // Natural subtle idle breathing rotation in assembly mode
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

// Launch on DOM ready
window.addEventListener('DOMContentLoaded', () => {
  window.app = new HolographicApp();
});
