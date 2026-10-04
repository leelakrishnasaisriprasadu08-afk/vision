/**
 * NEXUS CAD // Holographic Machine & Component Examination Workspace
 * Pure WebGL (Three.js) + MediaPipe Hands Real-time Spatial Kinetics
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

  playExplodeHum(factor) {
    if (!this.enabled || !this.ctx) return;
    // Ambient feedback
  }
}

const audio = new SoundEngine();

// -------------------------------------------------------------
// Component Data Registry
// -------------------------------------------------------------
const COMPONENT_SPECS = {
  // Turbofan Engine
  cone: { name: "Aero Intake Cone", sub: "Air Induction", mat: "Ti-6Al-4V Titanium", tol: "±0.002 mm", mass: "8.4 kg", rpm: "0 (Static)" },
  fan: { name: "Wide-Chord Fan Rotor", sub: "LP Compression", mat: "Titanium Hollow Blade", tol: "±0.001 mm", mass: "42.5 kg", rpm: "3,200 RPM" },
  compressor: { name: "Axial Compressor Disk", sub: "HP Compression", mat: "Nickel Superalloy", tol: "±0.002 mm", mass: "31.2 kg", rpm: "12,400 RPM" },
  combustor: { name: "Annular Combustor Core", sub: "Combustion Unit", mat: "Ceramic Matrix (CMC)", tol: "±0.005 mm", mass: "28.0 kg", rpm: "0 (Thermal)" },
  turbine: { name: "High-Pressure Turbine", sub: "Power Extraction", mat: "Single-Crystal Inconel", tol: "±0.001 mm", mass: "24.6 kg", rpm: "12,400 RPM" },
  nozzle: { name: "Exhaust Thrust Nozzle", sub: "Expansion Nozzle", mat: "Cobalt Base Superalloy", tol: "±0.008 mm", mass: "19.3 kg", rpm: "0 (Static)" },
  
  // Gearbox
  shaft_in: { name: "Input Drive Shaft", sub: "Torque Coupling", mat: "AISI 4340 Alloy Steel", tol: "±0.003 mm", mass: "6.2 kg", rpm: "6,000 RPM" },
  sun_gear: { name: "Sun Drive Gear", sub: "Planetary Reduction", mat: "Carburized Steel", tol: "±0.002 mm", mass: "4.8 kg", rpm: "6,000 RPM" },
  planet_gears: { name: "Triple Planet Carrier", sub: "Epicyclic Train", mat: "Case-Hardened Steel", tol: "±0.002 mm", mass: "14.2 kg", rpm: "1,800 RPM" },
  ring_gear: { name: "Internal Ring Gear", sub: "Outer Annulus", mat: "Nitrided Alloy", tol: "±0.004 mm", mass: "18.5 kg", rpm: "0 (Locked)" },
  shaft_out: { name: "Output Hub Shaft", sub: "Load Transmission", mat: "Forged High-Strength Steel", tol: "±0.003 mm", mass: "9.8 kg", rpm: "1,200 RPM" },

  // Robot Arm
  base_turret: { name: "Base Turret Flange", sub: "Kinematic Mount", mat: "Cast Aerospace Aluminum", tol: "±0.005 mm", mass: "12.0 kg", rpm: "±360° Yaw" },
  stator_motor: { name: "Brushless Servo Stator", sub: "Electromagnetic Drive", mat: "Neodymium & Copper", tol: "±0.002 mm", mass: "8.6 kg", rpm: "4,500 RPM" },
  harmonic_drive: { name: "Harmonic Reducer Ring", sub: "Zero-Backlash Gearing", mat: "Special Spring Steel", tol: "±0.001 mm", mass: "5.1 kg", rpm: "100:1 Ratio" },
  pivot_yoke: { name: "Actuator Pivot Yoke", sub: "Pitch Articulation", mat: "Billet 7075-T6 Al", tol: "±0.003 mm", mass: "7.4 kg", rpm: "±120° Pitch" },
  end_effector: { name: "Adaptive Micro-Gripper", sub: "Payload Tooling", mat: "Carbon Fiber & Rubber", tol: "±0.010 mm", mass: "3.2 kg", rpm: "Pneumatic 50N" }
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
    this.grabbedMesh = null;
    this.hoveredMesh = null;

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

    // Kinetic Hand Controller State
    this.handsData = [];
    this.isPinching = false;
    this.pinchScreenPos = { x: -1, y: -1 };
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
    this.scene.background = new THREE.Color(0x07090e);
    this.scene.fog = new THREE.FogExp2(0x07090e, 0.004);

    this.camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 2500);
    this.camera.position.set(0, 75, 380);

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;

    this.controls = new THREE.OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxDistance = 800;
    this.controls.minDistance = 50;
    this.controls.target.set(0, 0, 0);

    // Dynamic Lighting
    const ambient = new THREE.AmbientLight(0x223344, 1.2);
    this.scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(120, 200, 150);
    this.scene.add(keyLight);

    const cyanRim = new THREE.DirectionalLight(0x00f0ff, 2.2);
    cyanRim.position.set(-180, 50, -120);
    this.scene.add(cyanRim);

    const magentaFill = new THREE.PointLight(0xff007f, 1.5, 500);
    magentaFill.position.set(0, -100, 100);
    this.scene.add(magentaFill);

    // Holographic CAD Ground Grid
    const gridHelper = new THREE.GridHelper(600, 40, 0x00f0ff, 0x162436);
    gridHelper.position.y = -80;
    this.scene.add(gridHelper);

    this.scene.add(this.assemblyGroup);
    this.scene.add(this.componentsTrayGroup);
    this.scene.add(this.workspaceSandboxGroup);
    this.componentsTrayGroup.visible = false;

    window.addEventListener('resize', () => this.onWindowResize());
  }

  // -----------------------------------------------------------
  // Procedural 3D Mechanical Models
  // -----------------------------------------------------------
  createMetallicMaterial(colorHex, emissiveHex = 0x000000, metalness = 0.88, roughness = 0.22) {
    return new THREE.MeshStandardMaterial({
      color: colorHex,
      emissive: emissiveHex,
      emissiveIntensity: 0.15,
      metalness: metalness,
      roughness: roughness,
      wireframe: this.isWireframe
    });
  }

  buildTurbineModel() {
    this.clearAssembly();
    this.machineParts = [];

    const matTitanium = this.createMetallicMaterial(0x99bbd0);
    const matBlades = this.createMetallicMaterial(0x39ff14, 0x0a330a);
    const matCore = this.createMetallicMaterial(0xff9900, 0x331a00);
    const matTurbine = this.createMetallicMaterial(0x00f0ff, 0x002233);
    const matNozzle = this.createMetallicMaterial(0xff007f, 0x33001a);

    // 1. Intake Cone
    const coneGeo = new THREE.ConeGeometry(22, 45, 32);
    coneGeo.rotateX(Math.PI / 2);
    const coneMesh = new THREE.Mesh(coneGeo, matTitanium);
    coneMesh.userData = { specKey: 'cone', baseZ: -105, currentOffset: 0 };
    this.registerPart(coneMesh);

    // 2. Wide-Chord Fan Rotor
    const fanGroup = new THREE.Group();
    const fanHub = new THREE.Mesh(new THREE.CylinderGeometry(18, 18, 12, 32), matTitanium);
    fanHub.rotateX(Math.PI / 2);
    fanGroup.add(fanHub);

    for (let i = 0; i < 18; i++) {
      const angle = (i / 18) * Math.PI * 2;
      const bladeGeo = new THREE.BoxGeometry(4, 52, 1.5);
      const blade = new THREE.Mesh(bladeGeo, matBlades);
      blade.position.set(Math.cos(angle) * 36, Math.sin(angle) * 36, 0);
      blade.rotation.z = angle + Math.PI / 2;
      blade.rotation.y = 0.45; // Blade pitch angle
      fanGroup.add(blade);
    }
    fanGroup.userData = { specKey: 'fan', baseZ: -60, currentOffset: 0 };
    this.registerPart(fanGroup);

    // 3. Compressor
    const compGroup = new THREE.Group();
    const compDrum = new THREE.Mesh(new THREE.CylinderGeometry(38, 48, 28, 32), matTitanium);
    compDrum.rotateX(Math.PI / 2);
    compGroup.add(compDrum);
    for (let r = 0; r < 24; r++) {
      const a = (r / 24) * Math.PI * 2;
      const vane = new THREE.Mesh(new THREE.BoxGeometry(2, 8, 24), matTurbine);
      vane.position.set(Math.cos(a) * 44, Math.sin(a) * 44, 0);
      vane.rotation.z = a;
      compGroup.add(vane);
    }
    compGroup.userData = { specKey: 'compressor', baseZ: -15, currentOffset: 0 };
    this.registerPart(compGroup);

    // 4. Combustor Core
    const combMesh = new THREE.Mesh(new THREE.CylinderGeometry(44, 44, 40, 32, 1, true), matCore);
    combMesh.rotateX(Math.PI / 2);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(46, 2, 16, 48), matCore);
    combMesh.add(ring);
    combMesh.userData = { specKey: 'combustor', baseZ: 35, currentOffset: 0 };
    this.registerPart(combMesh);

    // 5. HP Turbine Stage
    const turbGroup = new THREE.Group();
    const turbDisk = new THREE.Mesh(new THREE.CylinderGeometry(24, 24, 14, 32), matTurbine);
    turbDisk.rotateX(Math.PI / 2);
    turbGroup.add(turbDisk);
    for (let i = 0; i < 28; i++) {
      const a = (i / 28) * Math.PI * 2;
      const b = new THREE.Mesh(new THREE.BoxGeometry(2.5, 26, 8), matTurbine);
      b.position.set(Math.cos(a) * 32, Math.sin(a) * 32, 0);
      b.rotation.z = a + Math.PI / 2;
      b.rotation.y = -0.5;
      turbGroup.add(b);
    }
    turbGroup.userData = { specKey: 'turbine', baseZ: 85, currentOffset: 0 };
    this.registerPart(turbGroup);

    // 6. Exhaust Nozzle
    const nozzGeo = new THREE.CylinderGeometry(32, 46, 50, 32, 1, true);
    nozzGeo.rotateX(Math.PI / 2);
    const nozzMesh = new THREE.Mesh(nozzGeo, matNozzle);
    nozzMesh.userData = { specKey: 'nozzle', baseZ: 140, currentOffset: 0 };
    this.registerPart(nozzMesh);

    this.updateAssemblyPositions();
  }

  buildGearboxModel() {
    this.clearAssembly();
    this.machineParts = [];

    const matSteel = this.createMetallicMaterial(0x8899aa);
    const matSun = this.createMetallicMaterial(0xff9900, 0x331a00);
    const matPlanet = this.createMetallicMaterial(0x39ff14, 0x0a330a);
    const matRing = this.createMetallicMaterial(0x00f0ff, 0x002233);
    const matOut = this.createMetallicMaterial(0xff007f);

    // Input Shaft
    const shaftIn = new THREE.Mesh(new THREE.CylinderGeometry(10, 10, 70, 24), matSteel);
    shaftIn.rotateX(Math.PI / 2);
    shaftIn.userData = { specKey: 'shaft_in', baseZ: -95, currentOffset: 0 };
    this.registerPart(shaftIn);

    // Sun Gear
    const sunGear = new THREE.Mesh(new THREE.CylinderGeometry(24, 24, 18, 16), matSun);
    sunGear.rotateX(Math.PI / 2);
    sunGear.userData = { specKey: 'sun_gear', baseZ: -45, currentOffset: 0 };
    this.registerPart(sunGear);

    // Planet Carrier
    const planetCarrier = new THREE.Group();
    const carrierPlate = new THREE.Mesh(new THREE.CylinderGeometry(50, 50, 8, 32), matSteel);
    carrierPlate.rotateX(Math.PI / 2);
    planetCarrier.add(carrierPlate);
    for (let p = 0; p < 3; p++) {
      const a = (p / 3) * Math.PI * 2;
      const planet = new THREE.Mesh(new THREE.CylinderGeometry(16, 16, 16, 14), matPlanet);
      planet.position.set(Math.cos(a) * 32, Math.sin(a) * 32, 0);
      planet.rotateX(Math.PI / 2);
      planetCarrier.add(planet);
    }
    planetCarrier.userData = { specKey: 'planet_gears', baseZ: 5, currentOffset: 0 };
    this.registerPart(planetCarrier);

    // Ring Gear
    const ringGear = new THREE.Mesh(new THREE.CylinderGeometry(58, 58, 26, 32, 1, true), matRing);
    ringGear.rotateX(Math.PI / 2);
    ringGear.userData = { specKey: 'ring_gear', baseZ: 55, currentOffset: 0 };
    this.registerPart(ringGear);

    // Output Shaft
    const shaftOut = new THREE.Mesh(new THREE.CylinderGeometry(14, 14, 60, 24), matOut);
    shaftOut.rotateX(Math.PI / 2);
    shaftOut.userData = { specKey: 'shaft_out', baseZ: 105, currentOffset: 0 };
    this.registerPart(shaftOut);

    this.updateAssemblyPositions();
  }

  buildRobotArmModel() {
    this.clearAssembly();
    this.machineParts = [];

    const matBase = this.createMetallicMaterial(0x00f0ff);
    const matMotor = this.createMetallicMaterial(0xff007f);
    const matGear = this.createMetallicMaterial(0xff9900);
    const matArm = this.createMetallicMaterial(0x39ff14);
    const matEff = this.createMetallicMaterial(0xffffff);

    const baseFlange = new THREE.Mesh(new THREE.CylinderGeometry(45, 52, 22, 32), matBase);
    baseFlange.userData = { specKey: 'base_turret', baseZ: -80, currentOffset: 0 };
    this.registerPart(baseFlange);

    const statorMotor = new THREE.Mesh(new THREE.CylinderGeometry(36, 36, 38, 24), matMotor);
    statorMotor.userData = { specKey: 'stator_motor', baseZ: -30, currentOffset: 0 };
    this.registerPart(statorMotor);

    const reducer = new THREE.Mesh(new THREE.TorusGeometry(32, 8, 16, 32), matGear);
    reducer.userData = { specKey: 'harmonic_drive', baseZ: 25, currentOffset: 0 };
    this.registerPart(reducer);

    const yoke = new THREE.Mesh(new THREE.BoxGeometry(38, 55, 24), matArm);
    yoke.userData = { specKey: 'pivot_yoke', baseZ: 75, currentOffset: 0 };
    this.registerPart(yoke);

    const gripper = new THREE.Group();
    const gBase = new THREE.Mesh(new THREE.BoxGeometry(24, 12, 16), matEff);
    const fingerL = new THREE.Mesh(new THREE.BoxGeometry(4, 30, 8), matEff);
    const fingerR = new THREE.Mesh(new THREE.BoxGeometry(4, 30, 8), matEff);
    fingerL.position.set(-10, 16, 0);
    fingerR.position.set(10, 16, 0);
    gripper.add(gBase);
    gripper.add(fingerL);
    gripper.add(fingerR);
    gripper.userData = { specKey: 'end_effector', baseZ: 125, currentOffset: 0 };
    this.registerPart(gripper);

    this.updateAssemblyPositions();
  }

  buildComponentsTray() {
    this.trayParts = [];
    const matParts = [
      { key: 'fan', geo: new THREE.CylinderGeometry(28, 28, 10, 18), col: 0x39ff14, x: -220 },
      { key: 'compressor', geo: new THREE.CylinderGeometry(24, 30, 16, 20), col: 0x00f0ff, x: -110 },
      { key: 'sun_gear', geo: new THREE.CylinderGeometry(18, 18, 14, 12), col: 0xff9900, x: 0 },
      { key: 'combustor', geo: new THREE.CylinderGeometry(22, 22, 26, 24, 1, true), col: 0xff007f, x: 110 },
      { key: 'nozzle', geo: new THREE.ConeGeometry(20, 36, 24), col: 0xffffff, x: 220 }
    ];

    matParts.forEach(p => {
      const mesh = new THREE.Mesh(p.geo, this.createMetallicMaterial(p.col));
      mesh.position.set(p.x, -20, 0);
      mesh.userData = { specKey: p.key, isTrayItem: true };

      // Holographic Pedestal Disk
      const pedGeo = new THREE.CylinderGeometry(26, 30, 4, 32);
      const pedMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true });
      const ped = new THREE.Mesh(pedGeo, pedMat);
      ped.position.set(p.x, -45, 0);
      this.componentsTrayGroup.add(ped);

      this.componentsTrayGroup.add(mesh);
      this.trayParts.push(mesh);
    });
  }

  registerPart(meshOrGroup) {
    this.assemblyGroup.add(meshOrGroup);
    this.machineParts.push(meshOrGroup);
  }

  clearAssembly() {
    while (this.assemblyGroup.children.length > 0) {
      this.assemblyGroup.remove(this.assemblyGroup.children[0]);
    }
    this.machineParts = [];
  }

  updateAssemblyPositions() {
    const num = this.machineParts.length;
    const centerIdx = (num - 1) / 2;
    const maxSpread = 160;

    this.machineParts.forEach((part, i) => {
      if (part === this.grabbedMesh) return; // Don't snap currently grabbed part
      const distFromCenter = i - centerIdx;
      const spread = distFromCenter * maxSpread * this.explosionFactor;
      part.position.z = part.userData.baseZ + spread;
    });
  }

  setExplosion(val) {
    this.explosionFactor = Math.max(0, Math.min(1, val));
    this.updateAssemblyPositions();
    const expStr = `${Math.round(this.explosionFactor * 100)}%`;
    const expElem = document.getElementById('explosion-percentage');
    if (expElem) expElem.textContent = expStr;
    const meterBar = document.getElementById('explosion-meter-bar');
    if (meterBar) meterBar.style.width = expStr;
    const expSlider = document.getElementById('manual-explosion-slider');
    if (expSlider) expSlider.value = Math.round(this.explosionFactor * 100);
    const chipExp = document.getElementById('chip-exp');
    if (chipExp) chipExp.textContent = expStr;
  }

  toggleWireframe() {
    this.isWireframe = !this.isWireframe;
    this.scene.traverse(obj => {
      if (obj.isMesh && obj.material) {
        obj.material.wireframe = this.isWireframe;
      }
    });
    const btn = document.getElementById('btn-toggle-wireframe');
    btn.classList.toggle('active', this.isWireframe);
  }

  switchZone(zoneId) {
    this.currentZone = zoneId;
    document.querySelectorAll('.tab-btn').forEach((btn, idx) => {
      btn.classList.toggle('active', idx + 1 === zoneId);
      btn.setAttribute('aria-selected', idx + 1 === zoneId);
    });

    if (zoneId === 1) {
      this.assemblyGroup.visible = true;
      this.componentsTrayGroup.visible = false;
      document.getElementById('hud-active-mode').textContent = 'EXPLODED VIEW';
    } else if (zoneId === 2) {
      this.assemblyGroup.visible = false;
      this.componentsTrayGroup.visible = true;
      document.getElementById('hud-active-mode').textContent = 'COMPONENTS TRAY';
    } else {
      this.assemblyGroup.visible = true;
      this.componentsTrayGroup.visible = true;
      document.getElementById('hud-active-mode').textContent = 'CUSTOM SANDBOX';
    }
  }

  // -----------------------------------------------------------
  // Component Telemetry Inspector Update
  // -----------------------------------------------------------
  updateTelemetry(specKey) {
    const spec = COMPONENT_SPECS[specKey];
    if (!spec) return;

    document.getElementById('part-name').textContent = spec.name.toUpperCase();
    document.getElementById('part-subsystem').textContent = spec.sub;
    document.getElementById('part-material').textContent = spec.mat;
    document.getElementById('part-tolerance').textContent = spec.tol;
    document.getElementById('part-mass').textContent = spec.mass;
    document.getElementById('part-rpm').textContent = spec.rpm;

    const chipPart = document.getElementById('chip-part');
    if (chipPart) chipPart.textContent = spec.name.toUpperCase();
  }

  // -----------------------------------------------------------
  // MediaPipe Hands Real-Time In-Browser Tracking
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
      loadingElem.classList.add('hidden');
      overlayCanvas.width = video.videoWidth || 320;
      overlayCanvas.height = video.videoHeight || 240;
      overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

      this.handsData = results.multiHandLandmarks || [];
      const numHands = this.handsData.length;
      document.getElementById('hud-hand-count').textContent = `${numHands} DETECTED`;

      // 1. Two-Hand Distance & Continuous Explosion
      if (numHands >= 2) {
        const h1 = this.handsData[0][0]; // Wrist 1
        const h2 = this.handsData[1][0]; // Wrist 2
        const dx = (h2.x - h1.x) * overlayCanvas.width;
        const dy = (h2.y - h1.y) * overlayCanvas.height;
        const dist = Math.hypot(dx, dy);

        document.getElementById('hud-hand-dist').textContent = `${Math.round(dist)} px`;
        this.smoothHandDist = 0.85 * this.smoothHandDist + 0.15 * dist;
        const norm = (this.smoothHandDist - 70) / 180;
        this.setExplosion(norm);
      } else if (numHands === 1) {
        document.getElementById('hud-hand-dist').textContent = `SINGLE HAND`;
      } else {
        document.getElementById('hud-hand-dist').textContent = `0 px`;
      }

      // 2. Pinch Detection & 3D Raycast Dragging
      let pinchFound = false;
      this.handsData.forEach((landmarks) => {
        // Draw futuristic geometric wireframe on PIP canvas
        this.drawHandOverlay(overlayCtx, landmarks, overlayCanvas.width, overlayCanvas.height);

        const thumb = landmarks[4];
        const index = landmarks[8];
        const pDist = Math.hypot(
          (thumb.x - index.x) * overlayCanvas.width,
          (thumb.y - index.y) * overlayCanvas.height
        );

        // Schmitt trigger pinch threshold
        const grabThresh = 24;
        const releaseThresh = 42;

        if (!this.isPinching && pDist < grabThresh) {
          this.isPinching = true;
          audio.playPinchLock();
        } else if (this.isPinching && pDist > releaseThresh) {
          this.isPinching = false;
        }

        if (this.isPinching) {
          pinchFound = true;
          // Normalized device coordinates (-1 to +1) for Three.js raycasting
          const pinchX = (1 - (thumb.x + index.x) / 2) * 2 - 1; // Mirrored video
          const pinchY = -(((thumb.y + index.y) / 2) * 2 - 1);
          this.handlePinchInteraction(pinchX, pinchY);
        }
      });

      if (!pinchFound) {
        this.isPinching = false;
        if (this.grabbedMesh) {
          this.grabbedMesh = null;
        }
      }

      const pinchBadge = document.getElementById('hud-pinch-status');
      if (this.isPinching) {
        pinchBadge.textContent = 'LOCKED (PINCHING)';
        pinchBadge.className = 'kinetic-value active';
      } else {
        pinchBadge.textContent = 'INACTIVE';
        pinchBadge.className = 'kinetic-value inactive';
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
      console.warn('Camera failed to start:', err);
      loadingElem.innerHTML = '<span>CAMERA INACTIVE // USE MOUSE CONTROLS</span>';
    });
  }

  drawHandOverlay(ctx, lms, w, h) {
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2;
    ctx.fillStyle = '#ff007f';

    // Connections
    const connections = [
      [0, 1], [1, 2], [2, 3], [3, 4], // Thumb
      [0, 5], [5, 6], [6, 7], [7, 8], // Index
      [0, 9], [9, 10], [10, 11], [11, 12], // Middle
      [0, 13], [13, 14], [14, 15], [15, 16], // Ring
      [0, 17], [17, 18], [18, 19], [19, 20] // Pinky
    ];

    connections.forEach(([i, j]) => {
      ctx.beginPath();
      ctx.moveTo(lms[i].x * w, lms[i].y * h);
      ctx.lineTo(lms[j].x * w, lms[j].y * h);
      ctx.stroke();
    });

    // Fingertip Reticles
    [4, 8, 12, 16, 20].forEach((idx) => {
      ctx.beginPath();
      ctx.arc(lms[idx].x * w, lms[idx].y * h, 4, 0, 2 * Math.PI);
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

    // Find flat children meshes for raycasting
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
      // Drag in 3D
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
    // Audio unlock on first interaction
    window.addEventListener('click', () => audio.init(), { once: true });

    document.getElementById('tab-zone-1').onclick = () => this.switchZone(1);
    document.getElementById('tab-zone-2').onclick = () => this.switchZone(2);
    document.getElementById('tab-zone-3').onclick = () => this.switchZone(3);

    // Zen / Full 100% Workspace Mode Toggle
    const toggleZen = () => {
      document.body.classList.toggle('zen-mode');
      const isZen = document.body.classList.contains('zen-mode');
      const zenBtn = document.getElementById('btn-toggle-zen');
      if (zenBtn) {
        zenBtn.classList.toggle('active', isZen);
        zenBtn.innerHTML = isZen ? '<span class="btn-icon">🗗</span> EXIT ZEN' : '<span class="btn-icon">⛶</span> FULL VIEW';
      }
      setTimeout(() => this.onWindowResize(), 360);
    };
    const zenBtnElem = document.getElementById('btn-toggle-zen');
    if (zenBtnElem) zenBtnElem.onclick = toggleZen;

    // Collapsible Left Telemetry Panel & Pull-Tab
    const inspector = document.getElementById('inspector-panel');
    const collapseInspBtn = document.getElementById('btn-collapse-inspector');
    if (collapseInspBtn && inspector) {
      collapseInspBtn.onclick = () => {
        inspector.classList.add('collapsed');
        setTimeout(() => this.onWindowResize(), 360);
      };
    }
    const tabReopenInsp = document.getElementById('tab-reopen-inspector');
    if (tabReopenInsp && inspector) {
      tabReopenInsp.onclick = () => {
        document.body.classList.remove('zen-mode');
        inspector.classList.remove('collapsed');
        setTimeout(() => this.onWindowResize(), 360);
      };
    }

    // Collapsible Right Spatial Kinetics HUD Panel & Pull-Tab
    const hud = document.getElementById('hand-hud-panel');
    const collapseHudBtn = document.getElementById('btn-collapse-hud');
    if (collapseHudBtn && hud) {
      collapseHudBtn.onclick = () => {
        hud.classList.add('collapsed');
        setTimeout(() => this.onWindowResize(), 360);
      };
    }
    const tabReopenHud = document.getElementById('tab-reopen-hud');
    if (tabReopenHud && hud) {
      tabReopenHud.onclick = () => {
        document.body.classList.remove('zen-mode');
        hud.classList.remove('collapsed');
        setTimeout(() => this.onWindowResize(), 360);
      };
    }

    // Minimize Webcam PIP Preview (Reclaim HUD space)
    const camViewport = document.getElementById('webcam-viewport');
    const minCamBtn = document.getElementById('btn-minimize-cam');
    if (minCamBtn && camViewport) {
      minCamBtn.onclick = () => {
        camViewport.classList.toggle('minimized');
        const isMin = camViewport.classList.contains('minimized');
        minCamBtn.textContent = isMin ? '🗖 EXPAND CAM' : '🗕 MINIMIZE CAM';
      };
    }

    // Floating 3D Navigation & Quick Tools Dock
    const zoomInBtn = document.getElementById('btn-zoom-in');
    if (zoomInBtn) {
      zoomInBtn.onclick = () => {
        this.camera.position.z = Math.max(120, this.camera.position.z - 40);
      };
    }
    const zoomOutBtn = document.getElementById('btn-zoom-out');
    if (zoomOutBtn) {
      zoomOutBtn.onclick = () => {
        this.camera.position.z = Math.min(750, this.camera.position.z + 40);
      };
    }
    const zoomResetBtn = document.getElementById('btn-zoom-reset');
    if (zoomResetBtn) {
      zoomResetBtn.onclick = () => {
        this.camera.position.set(0, 75, 380);
        this.controls.target.set(0, 0, 0);
      };
    }

    document.getElementById('machine-select').onchange = (e) => {
      this.currentMachine = e.target.value;
      const machineNames = {
        turbine: 'TURBOFAN JET',
        gearbox: 'PLANETARY GEARBOX',
        robot_arm: 'ROBOTIC ACTUATOR'
      };
      const chipMachine = document.getElementById('chip-machine');
      if (chipMachine) chipMachine.textContent = machineNames[this.currentMachine] || this.currentMachine.toUpperCase();

      if (this.currentMachine === 'turbine') this.buildTurbineModel();
      else if (this.currentMachine === 'gearbox') this.buildGearboxModel();
      else this.buildRobotArmModel();
    };

    document.getElementById('btn-toggle-wireframe').onclick = () => this.toggleWireframe();
    document.getElementById('btn-reset-assembly').onclick = () => {
      this.setExplosion(0);
      if (this.currentMachine === 'turbine') this.buildTurbineModel();
      else if (this.currentMachine === 'gearbox') this.buildGearboxModel();
      else this.buildRobotArmModel();
    };

    document.getElementById('manual-explosion-slider').oninput = (e) => {
      this.setExplosion(e.target.value / 100);
    };

    document.getElementById('btn-sound-toggle').onclick = () => {
      audio.enabled = !audio.enabled;
      document.getElementById('sound-icon').textContent = audio.enabled ? '🔊' : '🔇';
      document.getElementById('btn-sound-toggle').textContent = `${audio.enabled ? '🔊' : '🔇'} AUDIO: ${audio.enabled ? 'ON' : 'OFF'}`;
    };

    window.addEventListener('resize', () => this.onWindowResize());

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      if (e.key === '1') this.switchZone(1);
      if (e.key === '2') this.switchZone(2);
      if (e.key === '3') this.switchZone(3);
      if (e.key === 'w' || e.key === 'W') this.toggleWireframe();
      if (e.key === 'r' || e.key === 'R') document.getElementById('btn-reset-assembly').click();
      if (e.key === 'f' || e.key === 'F' || e.key === 'z' || e.key === 'Z') toggleZen();
      if (e.key === 'c' || e.key === 'C') { if (minCamBtn) minCamBtn.click(); }
      if (e.key === '[') { if (collapseInspBtn) collapseInspBtn.click(); }
      if (e.key === ']') { if (collapseHudBtn) collapseHudBtn.click(); }
      if (e.key === '+' || e.key === '=') { if (zoomInBtn) zoomInBtn.click(); }
      if (e.key === '-' || e.key === '_') { if (zoomOutBtn) zoomOutBtn.click(); }
      if (e.key === '0') { if (zoomResetBtn) zoomResetBtn.click(); }
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

    // Slow ambient rotation of components in Zone 1 & 2
    if (!this.isPinching && this.currentZone === 1) {
      this.assemblyGroup.rotation.z += 0.003;
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

// Initialize Application when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  window.app = new HolographicApp();
});
