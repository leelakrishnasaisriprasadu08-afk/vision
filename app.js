/**
 * NEXUS CAD // Holographic Neon Machine & Pixel Cloud Workspace
 * Real-time WebGL (Three.js) + MediaPipe Hands Spatial Kinetics
 * Features:
 *   - 100% CAD viewport with floating non-blocking neon HUD
 *   - High-visibility radiant neon materials with glowing edge wireframes
 *   - Dual-Level Explosion: Component Axial Separation + Micro-Pixel Dispersion Matrix
 *   - Precision hand kinetic control (Continuous 2-hand explosion, pinch raycast grab)
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
      this.ctx = new AudioCtx();
    }
  }

  playPinchLock() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1760, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
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
// 3D Scene & Rendering Engine
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

    // Groups
    this.assemblyGroup = new THREE.Group();
    this.componentsTrayGroup = new THREE.Group();
    this.workspaceSandboxGroup = new THREE.Group();
    this.machineParts = [];
    this.trayParts = [];
    this.pixelClouds = [];

    // Kinetic Controller State
    this.handsData = [];
    this.isPinching = false;
    this.smoothHandDist = 180;

    this.initThree();
    this.buildTurbineModel();
    this.buildComponentsTray();
    this.setupUI();
    this.initMediaPipeHands();
    this.animate();
  }

  initThree() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x05070b);
    this.scene.fog = new THREE.FogExp2(0x05070b, 0.002);

    // Perspective Camera framed heroically for large visible neon range
    this.camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 3000);
    this.camera.position.set(120, 75, 210);

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;

    this.controls = new THREE.OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.maxDistance = 650;
    this.controls.minDistance = 60;
    this.controls.target.set(0, 0, 0);

    // Dynamic 4-Point Neon Studio Lighting (Produces radiant visible glow)
    const ambient = new THREE.AmbientLight(0x0a1626, 1.4);
    this.scene.add(ambient);

    const cyanKey = new THREE.DirectionalLight(0x00f0ff, 2.8);
    cyanKey.position.set(150, 220, 180);
    this.scene.add(cyanKey);

    const magentaFill = new THREE.PointLight(0xff007f, 2.4, 600);
    magentaFill.position.set(-160, -80, 120);
    this.scene.add(magentaFill);

    const greenRim = new THREE.PointLight(0x39ff14, 2.0, 500);
    greenRim.position.set(0, 180, -180);
    this.scene.add(greenRim);

    // Holographic CAD Floor Grid
    const gridHelper = new THREE.GridHelper(800, 50, 0x00f0ff, 0x121e2c);
    gridHelper.position.y = -90;
    this.scene.add(gridHelper);

    this.scene.add(this.assemblyGroup);
    this.scene.add(this.componentsTrayGroup);
    this.scene.add(this.workspaceSandboxGroup);
    this.componentsTrayGroup.visible = false;

    window.addEventListener('resize', () => this.onWindowResize());
  }

  // -----------------------------------------------------------
  // Radiant Neon Holographic Materials & Glowing Edges
  // -----------------------------------------------------------
  createNeonMaterial(colorHex, emissiveHex, opacity = 0.88) {
    return new THREE.MeshStandardMaterial({
      color: colorHex,
      emissive: emissiveHex || colorHex,
      emissiveIntensity: 0.65,
      metalness: 0.85,
      roughness: 0.18,
      transparent: true,
      opacity: opacity,
      wireframe: this.isWireframe
    });
  }

  addNeonEdges(mesh, edgeColorHex = 0x00f0ff) {
    if (!mesh.geometry) return;
    const edges = new THREE.EdgesGeometry(mesh.geometry);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({
      color: edgeColorHex,
      linewidth: 1.5,
      transparent: true,
      opacity: 0.95
    }));
    mesh.add(line);
    return line;
  }

  // -----------------------------------------------------------
  // Micro-Pixel & Particle Dispersion Matrix Generator
  // Generates thousands of glowing neon particle pixels per component
  // -----------------------------------------------------------
  createPixelCloudForMesh(geometry, colorHex, count = 2000) {
    if (!geometry || !geometry.attributes || !geometry.attributes.position) return null;
    const pos = geometry.attributes.position;
    const originalPositions = new Float32Array(count * 3);
    const currentPositions = new Float32Array(count * 3);
    const scatterVectors = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const baseColor = new THREE.Color(colorHex);

    for (let i = 0; i < count; i++) {
      const vIdx = Math.floor(Math.random() * pos.count);
      const ox = pos.getX(vIdx);
      const oy = pos.getY(vIdx);
      const oz = pos.getZ(vIdx);

      originalPositions[i * 3] = ox;
      originalPositions[i * 3 + 1] = oy;
      originalPositions[i * 3 + 2] = oz;

      currentPositions[i * 3] = ox;
      currentPositions[i * 3 + 1] = oy;
      currentPositions[i * 3 + 2] = oz;

      // Outward radial scatter vector + turbulent noise
      const dist = Math.hypot(ox, oy, oz) || 1.0;
      const speed = 75 + Math.random() * 110;
      scatterVectors[i * 3] = (ox / dist) * speed + (Math.random() - 0.5) * 40;
      scatterVectors[i * 3 + 1] = (oy / dist) * speed + (Math.random() - 0.5) * 40;
      scatterVectors[i * 3 + 2] = (oz / dist) * speed + (Math.random() - 0.5) * 40;

      // High-intensity neon shades
      const shade = 0.85 + Math.random() * 0.35;
      colors[i * 3] = Math.min(1.0, baseColor.r * shade);
      colors[i * 3 + 1] = Math.min(1.0, baseColor.g * shade);
      colors[i * 3 + 2] = Math.min(1.0, baseColor.b * shade);
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 3.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const points = new THREE.Points(pGeo, pMat);
    points.userData = { originalPositions, scatterVectors, count };
    return points;
  }

  // -----------------------------------------------------------
  // Procedural Radiant Neon Machine Models (Visible, High Scale)
  // -----------------------------------------------------------
  buildTurbineModel() {
    this.clearAssembly();

    // Palette: Radiant Neon Cyan, Green, Magenta, Gold, Amber
    const neonCyan = this.createNeonMaterial(0x00f0ff, 0x00b4d8);
    const neonGreen = this.createNeonMaterial(0x39ff14, 0x22cc00);
    const neonMagenta = this.createNeonMaterial(0xff007f, 0xcc0066);
    const neonAmber = this.createNeonMaterial(0xff9900, 0xdd6600);
    const neonViolet = this.createNeonMaterial(0xb026ff, 0x8800ff);

    // 1. Intake Cowl Cone
    const coneGeo = new THREE.ConeGeometry(32, 65, 36);
    coneGeo.rotateX(Math.PI / 2);
    const coneMesh = new THREE.Mesh(coneGeo, neonCyan);
    this.addNeonEdges(coneMesh, 0x00f0ff);
    const conePixels = this.createPixelCloudForMesh(coneGeo, 0x00f0ff, 1800);
    if (conePixels) coneMesh.add(conePixels);
    coneMesh.userData = { specKey: 'cone', baseZ: -140, pixelCloud: conePixels };
    this.registerPart(coneMesh);

    // 2. Wide-Chord Fan Rotor (18 Glowing Neon Blades)
    const fanGroup = new THREE.Group();
    const fanHubGeo = new THREE.CylinderGeometry(26, 26, 18, 36);
    fanHubGeo.rotateX(Math.PI / 2);
    const fanHub = new THREE.Mesh(fanHubGeo, neonCyan);
    this.addNeonEdges(fanHub, 0x00f0ff);
    fanGroup.add(fanHub);

    for (let i = 0; i < 18; i++) {
      const angle = (i / 18) * Math.PI * 2;
      const bladeGeo = new THREE.BoxGeometry(5.5, 68, 2.2);
      const blade = new THREE.Mesh(bladeGeo, neonGreen);
      this.addNeonEdges(blade, 0x39ff14);
      blade.position.set(Math.cos(angle) * 48, Math.sin(angle) * 48, 0);
      blade.rotation.z = angle + Math.PI / 2;
      blade.rotation.y = 0.52;
      fanGroup.add(blade);
    }
    const fanPixels = this.createPixelCloudForMesh(new THREE.CylinderGeometry(85, 85, 16, 40), 0x39ff14, 3000);
    if (fanPixels) fanGroup.add(fanPixels);
    fanGroup.userData = { specKey: 'fan', baseZ: -80, pixelCloud: fanPixels };
    this.registerPart(fanGroup);

    // 3. LP & HP Compressor Disks
    const compGroup = new THREE.Group();
    const compDrumGeo = new THREE.CylinderGeometry(52, 65, 38, 36);
    compDrumGeo.rotateX(Math.PI / 2);
    const compDrum = new THREE.Mesh(compDrumGeo, neonCyan);
    this.addNeonEdges(compDrum, 0x00f0ff);
    compGroup.add(compDrum);

    for (let r = 0; r < 24; r++) {
      const a = (r / 24) * Math.PI * 2;
      const vane = new THREE.Mesh(new THREE.BoxGeometry(3, 14, 34), neonMagenta);
      this.addNeonEdges(vane, 0xff007f);
      vane.position.set(Math.cos(a) * 60, Math.sin(a) * 60, 0);
      vane.rotation.z = a;
      compGroup.add(vane);
    }
    const compPixels = this.createPixelCloudForMesh(compDrumGeo, 0xff007f, 2600);
    if (compPixels) compGroup.add(compPixels);
    compGroup.userData = { specKey: 'compressor', baseZ: -18, pixelCloud: compPixels };
    this.registerPart(compGroup);

    // 4. Combustor Core & Fuel Injector Ring
    const combGeo = new THREE.CylinderGeometry(60, 60, 52, 36, 1, true);
    combGeo.rotateX(Math.PI / 2);
    const combMesh = new THREE.Mesh(combGeo, neonAmber);
    this.addNeonEdges(combMesh, 0xff9900);
    const torusRing = new THREE.Mesh(new THREE.TorusGeometry(62, 3, 16, 48), neonAmber);
    this.addNeonEdges(torusRing, 0xffaa00);
    combMesh.add(torusRing);
    const combPixels = this.createPixelCloudForMesh(combGeo, 0xff9900, 2400);
    if (combPixels) combMesh.add(combPixels);
    combMesh.userData = { specKey: 'combustor', baseZ: 48, pixelCloud: combPixels };
    this.registerPart(combMesh);

    // 5. HP Turbine Stage
    const turbGroup = new THREE.Group();
    const turbDiskGeo = new THREE.CylinderGeometry(34, 34, 20, 36);
    turbDiskGeo.rotateX(Math.PI / 2);
    const turbDisk = new THREE.Mesh(turbDiskGeo, neonCyan);
    this.addNeonEdges(turbDisk, 0x00f0ff);
    turbGroup.add(turbDisk);

    for (let i = 0; i < 28; i++) {
      const a = (i / 28) * Math.PI * 2;
      const b = new THREE.Mesh(new THREE.BoxGeometry(3.5, 36, 10), neonViolet);
      this.addNeonEdges(b, 0xb026ff);
      b.position.set(Math.cos(a) * 44, Math.sin(a) * 44, 0);
      b.rotation.z = a + Math.PI / 2;
      turbGroup.add(b);
    }
    const turbPixels = this.createPixelCloudForMesh(new THREE.CylinderGeometry(64, 64, 18, 36), 0xb026ff, 2800);
    if (turbPixels) turbGroup.add(turbPixels);
    turbGroup.userData = { specKey: 'turbine', baseZ: 110, pixelCloud: turbPixels };
    this.registerPart(turbGroup);

    // 6. Thrust Nozzle Cowl
    const nozzGeo = new THREE.ConeGeometry(56, 75, 36, 1, true);
    nozzGeo.rotateX(-Math.PI / 2);
    const nozzMesh = new THREE.Mesh(nozzGeo, neonMagenta);
    this.addNeonEdges(nozzMesh, 0xff007f);
    const nozzPixels = this.createPixelCloudForMesh(nozzGeo, 0xff007f, 2200);
    if (nozzPixels) nozzMesh.add(nozzPixels);
    nozzMesh.userData = { specKey: 'nozzle', baseZ: 175, pixelCloud: nozzPixels };
    this.registerPart(nozzMesh);

    this.updateAssemblyPositions();
  }

  buildGearboxModel() {
    this.clearAssembly();

    const neonCyan = this.createNeonMaterial(0x00f0ff, 0x00b4d8);
    const neonAmber = this.createNeonMaterial(0xff9900, 0xdd6600);
    const neonGreen = this.createNeonMaterial(0x39ff14, 0x22cc00);
    const neonMagenta = this.createNeonMaterial(0xff007f, 0xcc0066);

    // 1. Input Drive Shaft
    const shaftGeo = new THREE.CylinderGeometry(10, 10, 85, 32);
    shaftGeo.rotateX(Math.PI / 2);
    const shaft = new THREE.Mesh(shaftGeo, neonCyan);
    this.addNeonEdges(shaft, 0x00f0ff);
    const sPixels = this.createPixelCloudForMesh(shaftGeo, 0x00f0ff, 1500);
    if (sPixels) shaft.add(sPixels);
    shaft.userData = { specKey: 'shaft_in', baseZ: -125, pixelCloud: sPixels };
    this.registerPart(shaft);

    // 2. Central Sun Gear
    const sunGeo = new THREE.CylinderGeometry(28, 28, 22, 14);
    sunGeo.rotateX(Math.PI / 2);
    const sun = new THREE.Mesh(sunGeo, neonAmber);
    this.addNeonEdges(sun, 0xff9900);
    const sunPixels = this.createPixelCloudForMesh(sunGeo, 0xff9900, 2000);
    if (sunPixels) sun.add(sunPixels);
    sun.userData = { specKey: 'sun_gear', baseZ: -55, pixelCloud: sunPixels };
    this.registerPart(sun);

    // 3. Planetary Trio Carrier
    const planetGroup = new THREE.Group();
    const carrierGeo = new THREE.CylinderGeometry(60, 60, 8, 36);
    carrierGeo.rotateX(Math.PI / 2);
    const carrier = new THREE.Mesh(carrierGeo, neonCyan);
    this.addNeonEdges(carrier, 0x00f0ff);
    planetGroup.add(carrier);

    for (let p = 0; p < 3; p++) {
      const ang = (p / 3) * Math.PI * 2;
      const pGeo = new THREE.CylinderGeometry(22, 22, 20, 12);
      pGeo.rotateX(Math.PI / 2);
      const planet = new THREE.Mesh(pGeo, neonGreen);
      this.addNeonEdges(planet, 0x39ff14);
      planet.position.set(Math.cos(ang) * 44, Math.sin(ang) * 44, 0);
      planetGroup.add(planet);
    }
    const pPixels = this.createPixelCloudForMesh(carrierGeo, 0x39ff14, 3000);
    if (pPixels) planetGroup.add(pPixels);
    planetGroup.userData = { specKey: 'planet_gears', baseZ: 10, pixelCloud: pPixels };
    this.registerPart(planetGroup);

    // 4. Ring Gear Outer Annulus
    const ringGeo = new THREE.CylinderGeometry(85, 85, 30, 24, 1, true);
    ringGeo.rotateX(Math.PI / 2);
    const ring = new THREE.Mesh(ringGeo, neonMagenta);
    this.addNeonEdges(ring, 0xff007f);
    const ringPixels = this.createPixelCloudForMesh(ringGeo, 0xff007f, 2500);
    if (ringPixels) ring.add(ringPixels);
    ring.userData = { specKey: 'ring_gear', baseZ: 75, pixelCloud: ringPixels };
    this.registerPart(ring);

    // 5. Output Flange Shaft
    const outGeo = new THREE.CylinderGeometry(16, 26, 75, 32);
    outGeo.rotateX(Math.PI / 2);
    const outShaft = new THREE.Mesh(outGeo, neonCyan);
    this.addNeonEdges(outShaft, 0x00f0ff);
    const outPixels = this.createPixelCloudForMesh(outGeo, 0x00f0ff, 1600);
    if (outPixels) outShaft.add(outPixels);
    outShaft.userData = { specKey: 'shaft_out', baseZ: 140, pixelCloud: outPixels };
    this.registerPart(outShaft);

    this.updateAssemblyPositions();
  }

  buildRobotArmModel() {
    this.clearAssembly();

    const neonCyan = this.createNeonMaterial(0x00f0ff, 0x00b4d8);
    const neonMagenta = this.createNeonMaterial(0xff007f, 0xcc0066);
    const neonAmber = this.createNeonMaterial(0xff9900, 0xdd6600);
    const neonGreen = this.createNeonMaterial(0x39ff14, 0x22cc00);

    // 1. Base Turret Flange
    const baseGeo = new THREE.CylinderGeometry(65, 75, 24, 36);
    baseGeo.rotateX(Math.PI / 2);
    const base = new THREE.Mesh(baseGeo, neonCyan);
    this.addNeonEdges(base, 0x00f0ff);
    const bPixels = this.createPixelCloudForMesh(baseGeo, 0x00f0ff, 1800);
    if (bPixels) base.add(bPixels);
    base.userData = { specKey: 'base_turret', baseZ: -120, pixelCloud: bPixels };
    this.registerPart(base);

    // 2. Brushless Stator Core
    const statGeo = new THREE.CylinderGeometry(52, 52, 38, 24);
    statGeo.rotateX(Math.PI / 2);
    const stator = new THREE.Mesh(statGeo, neonMagenta);
    this.addNeonEdges(stator, 0xff007f);
    const statPixels = this.createPixelCloudForMesh(statGeo, 0xff007f, 2200);
    if (statPixels) stator.add(statPixels);
    stator.userData = { specKey: 'stator_motor', baseZ: -50, pixelCloud: statPixels };
    this.registerPart(stator);

    // 3. Harmonic Reducer
    const harmGeo = new THREE.CylinderGeometry(45, 45, 25, 36);
    harmGeo.rotateX(Math.PI / 2);
    const harm = new THREE.Mesh(harmGeo, neonAmber);
    this.addNeonEdges(harm, 0xff9900);
    const hPixels = this.createPixelCloudForMesh(harmGeo, 0xff9900, 2000);
    if (hPixels) harm.add(hPixels);
    harm.userData = { specKey: 'harmonic_drive', baseZ: 15, pixelCloud: hPixels };
    this.registerPart(harm);

    // 4. Articulation Yoke Arm
    const yokeGeo = new THREE.BoxGeometry(40, 75, 30);
    const yoke = new THREE.Mesh(yokeGeo, neonCyan);
    this.addNeonEdges(yoke, 0x00f0ff);
    const yPixels = this.createPixelCloudForMesh(yokeGeo, 0x00f0ff, 2200);
    if (yPixels) yoke.add(yPixels);
    yoke.userData = { specKey: 'pivot_yoke', baseZ: 75, pixelCloud: yPixels };
    this.registerPart(yoke);

    // 5. Adaptive Gripper
    const gripGroup = new THREE.Group();
    const gBase = new THREE.Mesh(new THREE.BoxGeometry(32, 20, 25), neonGreen);
    this.addNeonEdges(gBase, 0x39ff14);
    const fL = new THREE.Mesh(new THREE.BoxGeometry(8, 35, 12), neonGreen);
    this.addNeonEdges(fL, 0x39ff14);
    fL.position.set(-14, 20, 0);
    const fR = new THREE.Mesh(new THREE.BoxGeometry(8, 35, 12), neonGreen);
    this.addNeonEdges(fR, 0x39ff14);
    fR.position.set(14, 20, 0);
    gripGroup.add(gBase);
    gripGroup.add(fL);
    gripGroup.add(fR);
    const gPixels = this.createPixelCloudForMesh(new THREE.BoxGeometry(40, 45, 30), 0x39ff14, 2400);
    if (gPixels) gripGroup.add(gPixels);
    gripGroup.userData = { specKey: 'end_effector', baseZ: 145, pixelCloud: gPixels };
    this.registerPart(gripGroup);

    this.updateAssemblyPositions();
  }

  buildComponentsTray() {
    this.trayParts = [];
    const matParts = [
      { key: 'fan', geo: new THREE.CylinderGeometry(36, 36, 12, 24), col: 0x39ff14, x: -260 },
      { key: 'compressor', geo: new THREE.CylinderGeometry(32, 40, 20, 24), col: 0x00f0ff, x: -130 },
      { key: 'sun_gear', geo: new THREE.CylinderGeometry(24, 24, 18, 14), col: 0xff9900, x: 0 },
      { key: 'combustor', geo: new THREE.CylinderGeometry(30, 30, 32, 32, 1, true), col: 0xff007f, x: 130 },
      { key: 'nozzle', geo: new THREE.ConeGeometry(26, 46, 32), col: 0xb026ff, x: 260 }
    ];

    matParts.forEach(p => {
      const mesh = new THREE.Mesh(p.geo, this.createNeonMaterial(p.col, p.col));
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
  }

  clearAssembly() {
    while (this.assemblyGroup.children.length > 0) {
      this.assemblyGroup.remove(this.assemblyGroup.children[0]);
    }
    this.machineParts = [];
    this.pixelClouds = [];
  }

  // -----------------------------------------------------------
  // Dual-Level Explosion Engine (Component + Micro-Pixel Scatter)
  // -----------------------------------------------------------
  updateAssemblyPositions() {
    const num = this.machineParts.length;
    const centerIdx = (num - 1) / 2;
    const maxSpread = 220; // Roomy axial separation

    // 1. Component Level Separation
    this.machineParts.forEach((part, i) => {
      if (part === this.grabbedMesh) return;
      const distFromCenter = i - centerIdx;
      const spread = distFromCenter * maxSpread * this.explosionFactor;
      part.position.z = part.userData.baseZ + spread;

      // 2. Micro-Pixel / Particle Matrix Dispersion ("Range of Pixels")
      const pCloud = part.userData.pixelCloud;
      if (pCloud) {
        pCloud.visible = this.pixelsEnabled;
        if (this.pixelsEnabled) {
          // Pixel scatter threshold: disperses continuously as explosion rises
          const pixelFactor = Math.max(0, (this.explosionFactor - 0.15) / 0.85);
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

          // Cross-fade solid mesh into glowing pixel constellation
          part.traverse(child => {
            if (child.isMesh && child.material) {
              child.material.opacity = Math.max(0.25, 0.92 - pixelFactor * 0.70);
            }
          });
        } else {
          part.traverse(child => {
            if (child.isMesh && child.material) {
              child.material.opacity = 0.92;
            }
          });
        }
      }
    });
  }

  setExplosion(val) {
    this.explosionFactor = Math.max(0, Math.min(1, val));
    this.updateAssemblyPositions();

    const expPercent = Math.round(this.explosionFactor * 100);
    const expElem = document.getElementById('explosion-percentage');
    if (expElem) expElem.textContent = `${expPercent}%`;
    const meterBar = document.getElementById('explosion-meter-bar');
    if (meterBar) meterBar.style.width = `${expPercent}%`;
    const expSlider = document.getElementById('manual-explosion-slider');
    if (expSlider) expSlider.value = expPercent;
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
  // MediaPipe Hands In-Browser Spatial Tracking (60 FPS WebAssembly)
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
      overlayCanvas.width = video.videoWidth || 320;
      overlayCanvas.height = video.videoHeight || 240;
      overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

      this.handsData = results.multiHandLandmarks || [];
      const numHands = this.handsData.length;
      const countBadge = document.getElementById('hud-hand-count');
      if (countBadge) countBadge.textContent = `${numHands} HANDS`;

      // 1. Two-Hand Continuous Distance & Dual Explosion
      if (numHands >= 2) {
        const h1 = this.handsData[0][0];
        const h2 = this.handsData[1][0];
        const dx = (h2.x - h1.x) * overlayCanvas.width;
        const dy = (h2.y - h1.y) * overlayCanvas.height;
        const dist = Math.hypot(dx, dy);

        const distElem = document.getElementById('hud-hand-dist');
        if (distElem) distElem.textContent = `${Math.round(dist)} px`;

        this.smoothHandDist = 0.84 * this.smoothHandDist + 0.16 * dist;
        const norm = (this.smoothHandDist - 75) / 185;
        this.setExplosion(norm);
      } else if (numHands === 1) {
        const distElem = document.getElementById('hud-hand-dist');
        if (distElem) distElem.textContent = `1 HAND`;
      } else {
        const distElem = document.getElementById('hud-hand-dist');
        if (distElem) distElem.textContent = `0 px`;
      }

      // 2. Pinch Detection & 3D Grab
      let pinchFound = false;
      this.handsData.forEach((landmarks) => {
        this.drawHandOverlay(overlayCtx, landmarks, overlayCanvas.width, overlayCanvas.height);

        const thumb = landmarks[4];
        const index = landmarks[8];
        const pDist = Math.hypot(
          (thumb.x - index.x) * overlayCanvas.width,
          (thumb.y - index.y) * overlayCanvas.height
        );

        if (!this.isPinching && pDist < 26) {
          this.isPinching = true;
          audio.playPinchLock();
        } else if (this.isPinching && pDist > 44) {
          this.isPinching = false;
        }

        if (this.isPinching) {
          pinchFound = true;
          const pinchX = (1 - (thumb.x + index.x) / 2) * 2 - 1;
          const pinchY = -(((thumb.y + index.y) / 2) * 2 - 1);
          this.handlePinchInteraction(pinchX, pinchY);
        }
      });

      if (!pinchFound) {
        this.isPinching = false;
        if (this.grabbedMesh) this.grabbedMesh = null;
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
      if (loadingElem) loadingElem.innerHTML = '<span>MOUSE CAD MODE</span>';
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

  handlePinchInteraction(ndcX, ndcY) {
    this.mouse.x = ndcX;
    this.mouse.y = ndcY;
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
      const topMesh = intersects[0].object.userData.parentContainer || intersects[0].object;
      if (!this.grabbedMesh) {
        this.grabbedMesh = topMesh;
        if (topMesh.userData.specKey) {
          this.updateTelemetry(topMesh.userData.specKey);
        }
      }
    }

    if (this.grabbedMesh) {
      const dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const intersectPt = new THREE.Vector3();
      this.raycaster.ray.intersectPlane(dragPlane, intersectPt);
      if (intersectPt) {
        this.grabbedMesh.position.x = intersectPt.x;
        this.grabbedMesh.position.y = intersectPt.y;
      }
    }
  }

  // -----------------------------------------------------------
  // UI & Event Bindings
  // -----------------------------------------------------------
  setupUI() {
    window.addEventListener('click', () => audio.init(), { once: true });

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
      this.camera.position.z = Math.max(90, this.camera.position.z - 30);
    };
    document.getElementById('btn-zoom-out').onclick = () => {
      this.camera.position.z = Math.min(500, this.camera.position.z + 30);
    };
    document.getElementById('btn-zoom-reset').onclick = () => {
      this.camera.position.set(120, 75, 210);
      this.controls.target.set(0, 0, 0);
    };

    document.getElementById('btn-sound-toggle').onclick = () => {
      audio.enabled = !audio.enabled;
      document.getElementById('sound-icon').textContent = audio.enabled ? '🔊' : '🔇';
    };

    // Keyboard Shortcuts
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
  // Render & Animation Loop
  // -----------------------------------------------------------
  animate() {
    requestAnimationFrame(() => this.animate());

    // Slow cinematic ambient rotation in assembly mode
    if (!this.isPinching && this.currentZone === 1) {
      this.assemblyGroup.rotation.z += 0.004;
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
