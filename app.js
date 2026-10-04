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
  // 14 ESSENTIAL REAL-WORLD SANDBOX COMPONENTS
  piston: { name: "Forged Slipper-Skirt Piston", sub: "Combustion Seal", eng: "Bore 95.0mm, 3 Ring Lands, CNC Valve Pockets", mat: "Forged 4032 Low-Expansion Al", rpm: "24.3 m/s Mean Speed" },
  conrod: { name: "Forged H-Beam Connecting Rod", sub: "Kinematic Link", eng: "C-to-C: 108mm, Bronze Bushing, ARP 2000 Bolts", mat: "Forged 4340 Nickel Chromoly", rpm: "11,500 RPM Peak" },
  crankshaft: { name: "Counterweighted Crankshaft Web", sub: "Reciprocating Hub", eng: "Stroke 63.4mm, Twin Half-Moon Cheeks", mat: "Carburized 18CrNiMo7-6 Steel", rpm: "11,500 RPM Redline" },
  cylinder: { name: "Deep-Finned Cylinder Barrel", sub: "Thermal Block", eng: "Nikasil (Ni-SiC) Honed Bore, 12 Tiered Fins", mat: "Hypereutectic Al-Si Alloy", rpm: "Thermal: 220°C Max" },
  head: { name: "DOHC 4-Valve Cylinder Head", sub: "Gas Exchange", eng: "Pent-Roof Chamber, Dual Cams, 4 Poppet Valves", mat: "A356-T6 Al + Ti-6Al-4V Valves", rpm: "Dual Cam 11,500 RPM" },
  spark_plug: { name: "Iridium-Tipped Spark Plug", sub: "Ignition Source", eng: "0.6mm Laser Iridium Tip, Ribbed Ceramic", mat: "Alumina Ceramic / Steel Shell", rpm: "Voltage: 28,000V" },
  injector: { name: "High-Pressure Piezo Fuel Injector", sub: "Fuel Delivery", eng: "Multi-Hole Micro Orifice, 200 bar Rail", mat: "Stainless 440C / Piezo Crystal", rpm: "Pressure: 20 MPa" },
  turbo: { name: "Twin-Scroll Turbocharger", sub: "Forced Induction", eng: "Scroll Volute Snail, Billet Impeller Wheel", mat: "Inconel 713C Turbine / Al Compressor", rpm: "185,000 RPM Spool" },
  wire_threads: { name: "6-Thread Braided Wiring Loom", sub: "Electrical Bus", eng: "6 Helically Twisted Braided Conductors", mat: "Tefzel Shielded Multi-Strand Copper", rpm: "CAN 1Mbps / 12V 15A" },
  wire_harness: { name: "6-Thread Braided Wiring Loom", sub: "Electrical Bus", eng: "6 Helically Twisted Braided Conductors", mat: "Tefzel Shielded Multi-Strand Copper", rpm: "CAN 1Mbps / 12V 15A" },
  ecu_chip: { name: "32-Bit Microcontroller ECU Module", sub: "Powertrain Engine Control", eng: "Dual Core 40MHz DSP, Aluminum Finned Case", mat: "FR4 Multi-Layer PCB / Polycarbonate", rpm: "Firmware: v4.8 EFI" },
  gear: { name: "Involute Spur Gear (24-Tooth)", sub: "Power Transmission", eng: "Module 2.5, 20° Pressure Angle, Lightening Holes", mat: "Case-Hardened 8620 Alloy Steel", rpm: "Torque: 420 Nm" },
  bearing: { name: "Deep-Groove Radial Ball Bearing", sub: "Rotary Support", eng: "ISO 6205 Grade C3, 8 Chrome Steel Balls", mat: "AISI 52100 Chrome Bearing Steel", rpm: "Speed: 16,000 RPM" },
  clutch: { name: "Multi-Plate Wet Clutch Assembly", sub: "Torque Coupling", eng: "Slotted Basket, 7 Friction & 8 Steel Discs", mat: "Kevlar-Paper / C75 Tempered Steel", rpm: "Primary: 2.14:1" },
  exhaust: { name: "Mandrel-Bent Swept Header Pipe", sub: "Gas Evacuation", eng: "42mm OD Mandrel-Bent Smooth Radius Runner", mat: "SUS304 Austenitic Stainless Steel", rpm: "Thermal: 950°C Max" },

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
  // MULTI-THREAD BRAIDED WIRE HARNESSES & HOLOGRAPHIC MICROCHIPS
  // -----------------------------------------------------------
  createMultiThreadWiringHarness(pathPoints, options = {}) {
    const points = pathPoints.map(p => Array.isArray(p) ? new THREE.Vector3(p[0], p[1], p[2]) : p);
    const curve = new THREE.CatmullRomCurve3(points);
    const threadCount = options.threadCount || 6;
    const twists = options.twists || 3.5;
    const bundleRadius = options.bundleRadius || 3.2;
    const threadRadius = options.threadRadius || 0.85;
    const pulseCountPerThread = options.pulseCountPerThread || 650;

    const harnessGroup = new THREE.Group();
    // Color-coded industrial strands: CAN-High, 12V+ Ignition, Sensor Return, CAN-Low, Shield Ground, Drive Pulse
    const strandColors = [0x00f0ff, 0xff0055, 0x39ff14, 0xffaa00, 0xffffff, 0xb026ff];
    const strands = [];

    // Central high-durability conduit core
    const coreGeo = new THREE.TubeGeometry(curve, 48, bundleRadius * 0.45, 8, false);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x060c14,
      emissive: 0x020810,
      metalness: 0.9,
      roughness: 0.3,
      transparent: true,
      opacity: 0.75
    });
    harnessGroup.add(new THREE.Mesh(coreGeo, coreMat));

    // Sample Frenet frames for helical braid calculation
    const sampleSteps = 64;
    const frames = curve.computeFrenetFrames(sampleSteps, false);

    for (let s = 0; s < threadCount; s++) {
      const col = strandColors[s % strandColors.length];
      const strandPts = [];
      const phase = (s / threadCount) * Math.PI * 2;

      for (let i = 0; i <= sampleSteps; i++) {
        const u = i / sampleSteps;
        const pt = curve.getPoint(u);
        const N = frames.normals[i];
        const B = frames.binormals[i];
        const angle = u * Math.PI * 2 * twists + phase;
        
        const ox = (Math.cos(angle) * N.x + Math.sin(angle) * B.x) * bundleRadius;
        const oy = (Math.cos(angle) * N.y + Math.sin(angle) * B.y) * bundleRadius;
        const oz = (Math.cos(angle) * N.z + Math.sin(angle) * B.z) * bundleRadius;

        strandPts.push(new THREE.Vector3(pt.x + ox, pt.y + oy, pt.z + oz));
      }

      const strandCurve = new THREE.CatmullRomCurve3(strandPts);
      const threadGeo = new THREE.TubeGeometry(strandCurve, 48, threadRadius, 6, false);
      const threadMat = new THREE.MeshStandardMaterial({
        color: col,
        emissive: col,
        emissiveIntensity: 0.8,
        metalness: 0.8,
        roughness: 0.2,
        transparent: true,
        opacity: 0.92,
        depthWrite: false
      });
      const threadMesh = new THREE.Mesh(threadGeo, threadMat);
      harnessGroup.add(threadMesh);

      // Streaming electron pulse voxels along each individual thread
      const pGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(pulseCountPerThread * 3);
      const colors = new Float32Array(pulseCountPerThread * 3);
      const uvs = new Float32Array(pulseCountPerThread);
      const baseCol = new THREE.Color(col);

      for (let k = 0; k < pulseCountPerThread; k++) {
        const u = Math.random();
        uvs[k] = u;
        const pt = strandCurve.getPoint(u);
        positions[k * 3] = pt.x + (Math.random() - 0.5) * 1.2;
        positions[k * 3 + 1] = pt.y + (Math.random() - 0.5) * 1.2;
        positions[k * 3 + 2] = pt.z + (Math.random() - 0.5) * 1.2;

        colors[k * 3] = Math.min(1.0, baseCol.r * 1.4);
        colors[k * 3 + 1] = Math.min(1.0, baseCol.g * 1.4);
        colors[k * 3 + 2] = Math.min(1.0, baseCol.b * 1.4);
      }

      pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const pMat = new THREE.PointsMaterial({
        size: 2.4,
        map: this.pointTexture,
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      const pMesh = new THREE.Points(pGeo, pMat);
      harnessGroup.add(pMesh);

      strands.push({
        curve: strandCurve,
        mesh: pMesh,
        uvs,
        count: pulseCountPerThread,
        speed: 0.0035 + (s * 0.0006)
      });
    }

    // Molded weather-pack connector boots on both ends
    const startPt = curve.getPoint(0);
    const endPt = curve.getPoint(1);

    const startPlug = new THREE.Mesh(
      new THREE.BoxGeometry(bundleRadius * 3.2, bundleRadius * 2.6, 9),
      new THREE.MeshStandardMaterial({ color: 0x0a1018, emissive: 0x00f0ff, emissiveIntensity: 0.4 })
    );
    startPlug.position.copy(startPt);
    this.addNeonEdges(startPlug, 0x00f0ff);
    harnessGroup.add(startPlug);

    const endPlug = new THREE.Mesh(
      new THREE.BoxGeometry(bundleRadius * 3.2, bundleRadius * 2.6, 9),
      new THREE.MeshStandardMaterial({ color: 0x0a1018, emissive: 0xff0055, emissiveIntensity: 0.4 })
    );
    endPlug.position.copy(endPt);
    this.addNeonEdges(endPlug, 0xff0055);
    harnessGroup.add(endPlug);

    harnessGroup.userData = { isHarness: true, strands, pulsePoints: strands[0] };
    this.harnessObjects.push(harnessGroup);
    return harnessGroup;
  }

  createWiringHarness(pathPoints, colorHex = 0x00f0ff, pulseCount = 1200) {
    return this.createMultiThreadWiringHarness(pathPoints, { bundleRadius: 2.8 });
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

    // Microchip heatsink fins
    const finCount = 5;
    for (let f = 0; f < finCount; f++) {
      const fz = (f / (finCount - 1) - 0.5) * (l * 0.7);
      const fin = new THREE.Mesh(new THREE.BoxGeometry(w * 0.85, 2.5, 1.2), boxMat);
      fin.position.set(0, h / 2 + 1.25, fz);
      chipGroup.add(fin);
    }

    // Silicon die on top
    const dieGeo = new THREE.PlaneGeometry(w * 0.65, l * 0.65);
    dieGeo.rotateX(-Math.PI / 2);
    const dieMat = new THREE.MeshBasicMaterial({
      color: colorHex,
      wireframe: true,
      transparent: true,
      opacity: 0.95
    });
    const die = new THREE.Mesh(dieGeo, dieMat);
    die.position.y = h / 2 + 0.4;
    chipGroup.add(die);

    // Dual-row gold pin header leads
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
  // 14 ESSENTIAL REAL-WORLD CAD COMPONENT FACTORY METHODS
  // -----------------------------------------------------------

  // 1. FORGED SLIPPER PISTON (Crown with 4 Valve Relief Pockets, 3 Ring Lands, Gudgeon Pin)
  buildCADPiston(colorHex = 0x39ff14) {
    const grp = new THREE.Group();
    // Crown & Slipper Skirt Body
    const bodyGeo = new THREE.CylinderGeometry(28, 28, 38, 32);
    const bodyMesh = new THREE.Mesh(bodyGeo, this.createTranslucentShellMaterial(colorHex, colorHex));
    this.addNeonEdges(bodyMesh, colorHex);
    grp.add(bodyMesh);

    // 4 CNC Valve Relief Depressions in Piston Crown
    const intakePockets = [new THREE.Vector3(8.5, 18.5, -6.5), new THREE.Vector3(8.5, 18.5, 6.5)];
    const exhaustPockets = [new THREE.Vector3(-8.5, 18.5, -5.5), new THREE.Vector3(-8.5, 18.5, 5.5)];

    intakePockets.forEach(pos => {
      const pocket = new THREE.Mesh(new THREE.CylinderGeometry(7.5, 7.5, 2.5, 20), this.createTranslucentShellMaterial(0xffaa00, 0xffaa00));
      pocket.position.copy(pos);
      pocket.rotation.z = 0.12;
      this.addNeonEdges(pocket, 0xffaa00);
      grp.add(pocket);
    });
    exhaustPockets.forEach(pos => {
      const pocket = new THREE.Mesh(new THREE.CylinderGeometry(6.2, 6.2, 2.5, 20), this.createTranslucentShellMaterial(0xffaa00, 0xffaa00));
      pocket.position.copy(pos);
      pocket.rotation.z = -0.12;
      this.addNeonEdges(pocket, 0xffaa00);
      grp.add(pocket);
    });

    // 3 Circumferential Ring Land Grooves (Top Compression, Napier Scraper, Oil Control)
    [14, 10, 6].forEach(y => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(28.2, 0.7, 8, 32), new THREE.MeshBasicMaterial({ color: 0x00f0ff }));
      ring.position.y = y;
      ring.rotation.x = Math.PI / 2;
      grp.add(ring);
    });

    // Gudgeon / Wrist Pin Bore through bosses
    const pin = new THREE.Mesh(new THREE.CylinderGeometry(6.5, 6.5, 36, 24), this.createTranslucentShellMaterial(0xffaa00, 0xaa5500));
    pin.rotation.z = Math.PI / 2;
    pin.position.y = -2;
    this.addNeonEdges(pin, 0xffaa00);
    grp.add(pin);

    // Volumetric Contoured Pixel Cloud
    const pixelCloud = this.createVolumetricPixelCloud((i, total) => {
      const u = i / total;
      if (u < 0.35) {
        // Crown and valve reliefs
        const theta = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random()) * 27.5;
        const y = 18 + (Math.random() - 0.5) * 1.5;
        return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
      } else if (u < 0.65) {
        // Skirt thrust faces
        const theta = (Math.random() > 0.5 ? 0 : Math.PI) + (Math.random() - 0.5) * 1.2;
        const r = 27.5 + (Math.random() - 0.5) * 1.0;
        const y = (Math.random() - 0.5) * 36;
        return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
      } else {
        // Wrist pin and internal bosses
        const x = (Math.random() - 0.5) * 35;
        const theta = Math.random() * Math.PI * 2;
        const r = 6.2 * Math.sqrt(Math.random());
        return { x, y: -2 + Math.sin(theta) * r, z: Math.cos(theta) * r };
      }
    }, colorHex, 36000, 2.2);
    grp.add(pixelCloud);

    grp.userData = {
      specKey: 'piston',
      pixelCloud,
      ports: [
        { id: 'wrist_pin', pos: new THREE.Vector3(0, -2, 0), snapWith: 'small_end' },
        { id: 'piston_crown', pos: new THREE.Vector3(0, 18.5, 0), snapWith: 'cylinder_bore' }
      ]
    };
    return grp;
  }

  // 2. FORGED H-BEAM CONNECTING ROD (Small-End Eye, Fluted H-Shank, Split Cap & ARP Bolts)
  buildCADConrod(colorHex = 0x00f0ff) {
    const grp = new THREE.Group();

    // Small-End Bronze Bushing Eye (for wrist pin)
    const smallEye = new THREE.Mesh(new THREE.CylinderGeometry(11, 11, 14, 24), this.createTranslucentShellMaterial(colorHex, colorHex));
    smallEye.position.y = 36;
    smallEye.rotation.x = Math.PI / 2;
    this.addNeonEdges(smallEye, colorHex);
    grp.add(smallEye);

    // Fluted H-Beam Column (Structural Web + Twin Thick Flanges)
    const web = new THREE.Mesh(new THREE.BoxGeometry(4.5, 50, 11), this.createTranslucentShellMaterial(colorHex, colorHex));
    web.position.y = 0;
    this.addNeonEdges(web, colorHex);
    grp.add(web);

    const flangeFront = new THREE.Mesh(new THREE.BoxGeometry(13, 52, 3), this.createTranslucentShellMaterial(colorHex, colorHex));
    flangeFront.position.set(0, 0, 5);
    this.addNeonEdges(flangeFront, colorHex);
    grp.add(flangeFront);

    const flangeBack = new THREE.Mesh(new THREE.BoxGeometry(13, 52, 3), this.createTranslucentShellMaterial(colorHex, colorHex));
    flangeBack.position.set(0, 0, -5);
    this.addNeonEdges(flangeBack, colorHex);
    grp.add(flangeBack);

    // Big-End Split Journal Cap
    const bigUpper = new THREE.Mesh(new THREE.CylinderGeometry(18, 18, 16, 24), this.createTranslucentShellMaterial(colorHex, colorHex));
    bigUpper.position.y = -36;
    bigUpper.rotation.x = Math.PI / 2;
    this.addNeonEdges(bigUpper, colorHex);
    grp.add(bigUpper);

    // 2 High-Tensile ARP 2000 Rod Bolts
    [-14, 14].forEach(bx => {
      const bolt = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 2.5, 22, 12), new THREE.MeshBasicMaterial({ color: 0xffaa00 }));
      bolt.position.set(bx, -40, 0);
      grp.add(bolt);
    });

    // Volumetric Contoured Pixel Cloud
    const pixelCloud = this.createVolumetricPixelCloud((i, total) => {
      const u = i / total;
      if (u < 0.25) {
        // Small eye
        const theta = Math.random() * Math.PI * 2;
        const r = 7 + Math.random() * 4;
        return { x: Math.cos(theta) * r, y: 36 + Math.sin(theta) * r, z: (Math.random() - 0.5) * 14 };
      } else if (u < 0.65) {
        // H-Beam shank
        const y = (Math.random() - 0.5) * 50;
        const isFlange = Math.random() > 0.35;
        const z = isFlange ? (Math.random() > 0.5 ? 5 : -5) + (Math.random() - 0.5) * 2 : (Math.random() - 0.5) * 8;
        const x = (Math.random() - 0.5) * (isFlange ? 13 : 4.5);
        return { x, y, z };
      } else {
        // Big end split journal & bolts
        const theta = Math.random() * Math.PI * 2;
        const r = 12 + Math.random() * 6;
        return { x: Math.cos(theta) * r, y: -36 + Math.sin(theta) * r, z: (Math.random() - 0.5) * 16 };
      }
    }, colorHex, 32000, 2.2);
    grp.add(pixelCloud);

    grp.userData = {
      specKey: 'conrod',
      pixelCloud,
      ports: [
        { id: 'small_end', pos: new THREE.Vector3(0, 36, 0), snapWith: 'wrist_pin' },
        { id: 'big_end', pos: new THREE.Vector3(0, -36, 0), snapWith: 'crank_pin' }
      ]
    };
    return grp;
  }

  // 3. COUNTERWEIGHTED CRANKSHAFT (Offset Pin, Twin Half-Moon Lobes, Main Journals)
  buildCADCrankshaft(colorHex = 0xffaa00) {
    const grp = new THREE.Group();

    // Main Journal Center Shaft
    const mainShaft = new THREE.Mesh(new THREE.CylinderGeometry(11, 11, 90, 24), this.createTranslucentShellMaterial(colorHex, colorHex));
    mainShaft.rotation.x = Math.PI / 2;
    this.addNeonEdges(mainShaft, colorHex);
    grp.add(mainShaft);

    // Twin Aerodynamic Half-Moon Counterweight Cheeks
    [-15, 15].forEach(z => {
      const cheek = new THREE.Mesh(new THREE.CylinderGeometry(36, 36, 11, 24, 1, false, Math.PI / 2, Math.PI), this.createTranslucentShellMaterial(colorHex, colorHex));
      cheek.position.set(0, 0, z);
      cheek.rotation.x = Math.PI / 2;
      this.addNeonEdges(cheek, colorHex);
      grp.add(cheek);
    });

    // Offset Crankpin Journal (at x = +22)
    const pin = new THREE.Mesh(new THREE.CylinderGeometry(11, 11, 18, 24), this.createTranslucentShellMaterial(0x00f0ff, 0x00f0ff));
    pin.position.set(22, 0, 0);
    pin.rotation.x = Math.PI / 2;
    this.addNeonEdges(pin, 0x00f0ff);
    grp.add(pin);

    // Front Timing Snout & Rear Flywheel Mounting Flange
    const frontSnout = new THREE.Mesh(new THREE.CylinderGeometry(9, 9, 22, 20), this.createTranslucentShellMaterial(colorHex, colorHex));
    frontSnout.position.set(0, 0, 52);
    frontSnout.rotation.x = Math.PI / 2;
    this.addNeonEdges(frontSnout, colorHex);
    grp.add(frontSnout);

    const rearFlange = new THREE.Mesh(new THREE.CylinderGeometry(24, 24, 6, 24), this.createTranslucentShellMaterial(colorHex, colorHex));
    rearFlange.position.set(0, 0, -50);
    rearFlange.rotation.x = Math.PI / 2;
    this.addNeonEdges(rearFlange, colorHex);
    grp.add(rearFlange);

    // Volumetric Contoured Pixel Cloud
    const pixelCloud = this.createVolumetricPixelCloud((i, total) => {
      const u = i / total;
      if (u < 0.45) {
        // Counterweights
        const theta = Math.PI / 2 + Math.random() * Math.PI;
        const r = 12 + Math.random() * 24;
        const z = (Math.random() > 0.5 ? 15 : -15) + (Math.random() - 0.5) * 10;
        return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z };
      } else if (u < 0.70) {
        // Crankpin journal
        const theta = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random()) * 11;
        return { x: 22 + Math.cos(theta) * r, y: Math.sin(theta) * r, z: (Math.random() - 0.5) * 18 };
      } else {
        // Main shaft
        const theta = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random()) * 11;
        const z = (Math.random() - 0.5) * 90;
        return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z };
      }
    }, colorHex, 40000, 2.2);
    grp.add(pixelCloud);

    grp.userData = {
      specKey: 'crankshaft',
      pixelCloud,
      ports: [
        { id: 'crank_pin', pos: new THREE.Vector3(22, 0, 0), snapWith: 'big_end' },
        { id: 'crank_front', pos: new THREE.Vector3(0, 0, 52), snapWith: 'gear_bore' },
        { id: 'crank_rear', pos: new THREE.Vector3(0, 0, -50), snapWith: 'clutch_hub' },
        { id: 'crank_journal', pos: new THREE.Vector3(0, 0, 24), snapWith: 'bearing_bore' }
      ]
    };
    return grp;
  }

  // 4. DEEP-FINNED CYLINDER BARREL (Tiered Aerodynamic Cooling Fins & Honed Liner)
  buildCADCylinder(colorHex = 0x00f0ff) {
    const grp = new THREE.Group();

    // Honed Cylinder Liner Sleeve
    const liner = new THREE.Mesh(new THREE.CylinderGeometry(29, 29, 85, 32), this.createTranslucentShellMaterial(colorHex, colorHex));
    this.addNeonEdges(liner, colorHex);
    grp.add(liner);

    // 10 Tiered Cooling Fins (Wider at the top near combustion heat zone)
    for (let f = 0; f < 10; f++) {
      const fy = -36 + f * 8;
      const fr = 38 + (f / 9) * 13; // 38mm bottom to 51mm top
      const fin = new THREE.Mesh(new THREE.CylinderGeometry(fr, fr, 2.2, 32), this.createTranslucentShellMaterial(colorHex, colorHex));
      fin.position.y = fy;
      this.addNeonEdges(fin, colorHex);
      grp.add(fin);
    }

    // 4 Corner Through-Stud Columns
    [-24, 24].forEach(x => {
      [-24, 24].forEach(z => {
        const stud = new THREE.Mesh(new THREE.CylinderGeometry(4.5, 4.5, 85, 16), this.createTranslucentShellMaterial(0xffaa00, 0xffaa00));
        stud.position.set(x, 0, z);
        this.addNeonEdges(stud, 0xffaa00);
        grp.add(stud);
      });
    });

    // Volumetric Contoured Pixel Cloud
    const pixelCloud = this.createVolumetricPixelCloud((i, total) => {
      const u = i / total;
      if (u < 0.70) {
        // Tiered fins
        const finIdx = Math.floor(Math.random() * 10);
        const y = -36 + finIdx * 8 + (Math.random() - 0.5) * 1.8;
        const maxR = 38 + (finIdx / 9) * 13;
        const theta = Math.random() * Math.PI * 2;
        const r = 29 + Math.random() * (maxR - 29);
        return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
      } else {
        // Cylinder bore liner
        const theta = Math.random() * Math.PI * 2;
        const r = 28.5 + (Math.random() - 0.5) * 1.0;
        const y = (Math.random() - 0.5) * 85;
        return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
      }
    }, colorHex, 45000, 2.2);
    grp.add(pixelCloud);

    grp.userData = {
      specKey: 'cylinder',
      pixelCloud,
      ports: [
        { id: 'cylinder_bore', pos: new THREE.Vector3(0, 0, 0), snapWith: 'piston_crown' },
        { id: 'deck_top', pos: new THREE.Vector3(0, 42.5, 0), snapWith: 'head_deck' },
        { id: 'deck_bottom', pos: new THREE.Vector3(0, -42.5, 0), snapWith: 'crankcase_deck' }
      ]
    };
    return grp;
  }

  // 5. DOHC 4-VALVE CYLINDER HEAD (Dual Camshafts, 4 Angled Poppet Valves & Springs)
  buildCADHead(colorHex = 0xff007f) {
    const grp = new THREE.Group();

    // Head Casting Main Block
    const headDeck = new THREE.Mesh(new THREE.BoxGeometry(64, 34, 64), this.createTranslucentShellMaterial(colorHex, colorHex));
    this.addNeonEdges(headDeck, colorHex);
    grp.add(headDeck);

    // 4 Angled Poppet Valves with Dual Concentric Springs
    const valveData = [
      { x: 14, z: -12, ang: 0.35, col: 0x39ff14, r: 7.5 },  // Intake 1
      { x: 14, z: 12, ang: 0.35, col: 0x39ff14, r: 7.5 },   // Intake 2
      { x: -14, z: -11, ang: -0.32, col: 0xffaa00, r: 6.2 }, // Exhaust 1
      { x: -14, z: 11, ang: -0.32, col: 0xffaa00, r: 6.2 }   // Exhaust 2
    ];
    valveData.forEach(v => {
      const vHead = new THREE.Mesh(new THREE.CylinderGeometry(v.r, v.r, 2.5, 18), this.createTranslucentShellMaterial(v.col, v.col));
      vHead.position.set(v.x, -14, v.z);
      grp.add(vHead);

      const stem = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.2, 26, 12), this.createTranslucentShellMaterial(v.col, v.col));
      stem.position.set(v.x, 0, v.z);
      stem.rotation.z = v.ang;
      grp.add(stem);

      const spring = new THREE.Mesh(new THREE.CylinderGeometry(5.2, 5.2, 14, 16), this.createTranslucentShellMaterial(0x00f0ff, 0x00f0ff));
      spring.position.set(v.x, 2, v.z);
      spring.rotation.z = v.ang;
      this.addNeonEdges(spring, 0x00f0ff);
      grp.add(spring);
    });

    // Twin Overhead Camshafts (DOHC Intake & Exhaust)
    [-15, 15].forEach(camX => {
      const camShaft = new THREE.Mesh(new THREE.CylinderGeometry(4.8, 4.8, 58, 20), this.createTranslucentShellMaterial(0xffaa00, 0xffaa00));
      camShaft.position.set(camX, 15, 0);
      camShaft.rotation.x = Math.PI / 2;
      this.addNeonEdges(camShaft, 0xffaa00);
      grp.add(camShaft);

      // 2 Asymmetric Teardrop Cam Lobes per shaft
      [-12, 12].forEach(lz => {
        const lobe = new THREE.Mesh(new THREE.ConeGeometry(5.8, 8, 16), this.createTranslucentShellMaterial(0x39ff14, 0x39ff14));
        lobe.position.set(camX, 17, lz);
        lobe.rotation.x = Math.PI / 2;
        this.addNeonEdges(lobe, 0x39ff14);
        grp.add(lobe);
      });
    });

    // Spark Plug Central Recess Well
    const sparkWell = new THREE.Mesh(new THREE.CylinderGeometry(6.5, 6.5, 20, 20), this.createTranslucentShellMaterial(0xffffff, 0xffffff));
    sparkWell.position.set(0, 10, 0);
    this.addNeonEdges(sparkWell, 0xffffff);
    grp.add(sparkWell);

    // Volumetric Contoured Pixel Cloud
    const pixelCloud = this.createVolumetricPixelCloud((i, total) => {
      const u = i / total;
      if (u < 0.40) {
        // Camshafts & lobes
        const camX = Math.random() > 0.5 ? 15 : -15;
        const z = (Math.random() - 0.5) * 58;
        const theta = Math.random() * Math.PI * 2;
        const r = 4.8 + Math.random() * 4.5;
        return { x: camX + Math.cos(theta) * r, y: 15 + Math.sin(theta) * r, z };
      } else if (u < 0.75) {
        // 4 poppet valves & springs
        const vd = valveData[Math.floor(Math.random() * valveData.length)];
        const theta = Math.random() * Math.PI * 2;
        const r = Math.random() * vd.r;
        return { x: vd.x + Math.cos(theta) * r, y: (Math.random() - 0.5) * 26, z: vd.z + Math.sin(theta) * r };
      } else {
        // Head deck enclosure
        const x = (Math.random() - 0.5) * 64;
        const y = (Math.random() - 0.5) * 34;
        const z = (Math.random() - 0.5) * 64;
        return { x, y, z };
      }
    }, colorHex, 48000, 2.2);
    grp.add(pixelCloud);

    grp.userData = {
      specKey: 'head',
      pixelCloud,
      ports: [
        { id: 'head_deck', pos: new THREE.Vector3(0, -17, 0), snapWith: 'deck_top' },
        { id: 'spark_port', pos: new THREE.Vector3(0, 18, 0), snapWith: 'spark_thread' },
        { id: 'injector_port', pos: new THREE.Vector3(-20, 10, 0), snapWith: 'injector_tip' },
        { id: 'exhaust_port', pos: new THREE.Vector3(28, -6, 0), snapWith: 'exhaust_flange' }
      ]
    };
    return grp;
  }

  // 6. IRIDIUM-TIPPED SPARK PLUG (Hex Drive Body, 5-Rib Ceramic, Threaded M10, Ground Electrode)
  buildCADSparkPlug(colorHex = 0xffffff) {
    const grp = new THREE.Group();

    // Hexagonal Steel Drive Body
    const hex = new THREE.Mesh(new THREE.CylinderGeometry(7, 7, 8, 6), this.createTranslucentShellMaterial(0x00f0ff, 0x00f0ff));
    this.addNeonEdges(hex, 0x00f0ff);
    grp.add(hex);

    // Threaded M10 Lower Base
    const thread = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 14, 20), this.createTranslucentShellMaterial(0xffaa00, 0xffaa00));
    thread.position.y = -10;
    this.addNeonEdges(thread, 0xffaa00);
    grp.add(thread);

    // Ground Hook Strap & Center Electrode
    const groundHook = new THREE.Mesh(new THREE.BoxGeometry(1.2, 5, 3.5), new THREE.MeshBasicMaterial({ color: 0x00f0ff }));
    groundHook.position.set(0, -18.5, 1.8);
    grp.add(groundHook);

    // 5-Rib White Alumina Ceramic Insulator
    const ceramic = new THREE.Mesh(new THREE.CylinderGeometry(5.2, 5.2, 22, 24), this.createTranslucentShellMaterial(colorHex, colorHex));
    ceramic.position.y = 15;
    this.addNeonEdges(ceramic, colorHex);
    grp.add(ceramic);

    // Top Brass SAE Terminal Nut
    const nut = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 2.5, 6, 16), new THREE.MeshBasicMaterial({ color: 0xffaa00 }));
    nut.position.y = 28;
    grp.add(nut);

    // Volumetric Contoured Pixel Cloud
    const pixelCloud = this.createVolumetricPixelCloud((i, total) => {
      const u = i / total;
      if (u < 0.45) {
        // Ceramic insulator & ribs
        const y = 4 + Math.random() * 22;
        const rib = Math.sin(y * 1.8) * 1.0;
        const theta = Math.random() * Math.PI * 2;
        const r = 4.5 + rib + Math.random() * 0.8;
        return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
      } else if (u < 0.75) {
        // Hex body & threads
        const y = -16 + Math.random() * 20;
        const theta = Math.random() * Math.PI * 2;
        const r = y < -4 ? 5.0 + Math.random() * 0.8 : 6.8 + Math.random() * 0.6;
        return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
      } else {
        // Terminal nut & spark gap
        const y = 25 + Math.random() * 6;
        const theta = Math.random() * Math.PI * 2;
        return { x: Math.cos(theta) * 2.5, y, z: Math.sin(theta) * 2.5 };
      }
    }, colorHex, 20000, 2.0);
    grp.add(pixelCloud);

    grp.userData = {
      specKey: 'spark_plug',
      pixelCloud,
      ports: [
        { id: 'spark_thread', pos: new THREE.Vector3(0, -18, 0), snapWith: 'spark_port' },
        { id: 'spark_terminal', pos: new THREE.Vector3(0, 28, 0), snapWith: 'wire_terminal' }
      ]
    };
    return grp;
  }

  // 7. HIGH-PRESSURE PIEZO FUEL INJECTOR (Solenoid Body, 2-Pin Plug, Micro-Hole Tip)
  buildCADInjector(colorHex = 0xffaa00) {
    const grp = new THREE.Group();

    // Stepped Stainless Body
    const upperBody = new THREE.Mesh(new THREE.CylinderGeometry(7.5, 7.5, 20, 24), this.createTranslucentShellMaterial(colorHex, colorHex));
    upperBody.position.y = 6;
    this.addNeonEdges(upperBody, colorHex);
    grp.add(upperBody);

    const lowerBarrel = new THREE.Mesh(new THREE.CylinderGeometry(4.5, 4.5, 18, 20), this.createTranslucentShellMaterial(colorHex, colorHex));
    lowerBarrel.position.y = -12;
    this.addNeonEdges(lowerBarrel, colorHex);
    grp.add(lowerBarrel);

    // Fuel Rail Inlet Boss & O-Ring
    const inletBoss = new THREE.Mesh(new THREE.CylinderGeometry(5.5, 5.5, 6, 20), this.createTranslucentShellMaterial(0x00f0ff, 0x00f0ff));
    inletBoss.position.y = 19;
    this.addNeonEdges(inletBoss, 0x00f0ff);
    grp.add(inletBoss);

    // 2-Pin Electrical Harness Connector Socket
    const conn = new THREE.Mesh(new THREE.BoxGeometry(8, 9, 8), this.createTranslucentShellMaterial(0x39ff14, 0x39ff14));
    conn.position.set(8, 8, 0);
    this.addNeonEdges(conn, 0x39ff14);
    grp.add(conn);

    // Micro-Hole Spray Tip
    const tip = new THREE.Mesh(new THREE.ConeGeometry(3, 4, 16), new THREE.MeshBasicMaterial({ color: 0xff0055 }));
    tip.position.y = -22;
    tip.rotation.x = Math.PI;
    grp.add(tip);

    // Volumetric Contoured Pixel Cloud
    const pixelCloud = this.createVolumetricPixelCloud((i, total) => {
      const u = i / total;
      if (u < 0.60) {
        // Main injector body
        const y = -18 + Math.random() * 38;
        const r = y < -4 ? 4.5 * Math.sqrt(Math.random()) : 7.5 * Math.sqrt(Math.random());
        const theta = Math.random() * Math.PI * 2;
        return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
      } else {
        // Connector socket & spray tip
        const isConn = Math.random() > 0.4;
        if (isConn) {
          return { x: 8 + (Math.random() - 0.5) * 8, y: 8 + (Math.random() - 0.5) * 9, z: (Math.random() - 0.5) * 8 };
        } else {
          const theta = Math.random() * Math.PI * 2;
          return { x: Math.cos(theta) * 2.5, y: -22 - Math.random() * 3, z: Math.sin(theta) * 2.5 };
        }
      }
    }, colorHex, 20000, 2.0);
    grp.add(pixelCloud);

    grp.userData = {
      specKey: 'injector',
      pixelCloud,
      ports: [
        { id: 'injector_tip', pos: new THREE.Vector3(0, -22, 0), snapWith: 'injector_port' },
        { id: 'injector_plug', pos: new THREE.Vector3(8, 8, 0), snapWith: 'wire_lead' }
      ]
    };
    return grp;
  }

  // 8. TWIN-SCROLL TURBOCHARGER (Logarithmic Snail Volute, Compressor Housing & Impeller)
  buildCADTurbo(colorHex = 0x39ff14) {
    const grp = new THREE.Group();

    // Snail Exhaust Turbine Volute Housing (Expanding Logarithmic Helix)
    const snailPts = [];
    for (let t = 0; t <= 32; t++) {
      const theta = (t / 32) * Math.PI * 2 * 1.25;
      const r = 10 + Math.pow(t / 32, 1.3) * 22;
      snailPts.push(new THREE.Vector3(Math.cos(theta) * r, Math.sin(theta) * r, (t / 32) * 12 - 6));
    }
    const snailCurve = new THREE.CatmullRomCurve3(snailPts);
    const snailGeo = new THREE.TubeGeometry(snailCurve, 36, 6.5, 12, false);
    const snailMesh = new THREE.Mesh(snailGeo, this.createTranslucentShellMaterial(0xffaa00, 0xffaa00));
    this.addNeonEdges(snailMesh, 0xffaa00);
    grp.add(snailMesh);

    // Aluminum Compressor Scroll Housing
    const compHousing = new THREE.Mesh(new THREE.TorusGeometry(24, 8.5, 16, 32), this.createTranslucentShellMaterial(colorHex, colorHex));
    compHousing.position.z = 18;
    this.addNeonEdges(compHousing, colorHex);
    grp.add(compHousing);

    // Axial Inducer Bellmouth & Billet Impeller Wheel
    const inducer = new THREE.Mesh(new THREE.CylinderGeometry(14, 18, 12, 24), this.createTranslucentShellMaterial(0x00f0ff, 0x00f0ff));
    inducer.position.z = 24;
    inducer.rotation.x = Math.PI / 2;
    this.addNeonEdges(inducer, 0x00f0ff);
    grp.add(inducer);

    // Center Bearing CHRA Cartridge
    const chra = new THREE.Mesh(new THREE.CylinderGeometry(11, 11, 14, 20), this.createTranslucentShellMaterial(0xff0055, 0xff0055));
    chra.position.z = 7;
    chra.rotation.x = Math.PI / 2;
    this.addNeonEdges(chra, 0xff0055);
    grp.add(chra);

    // Pneumatic Wastegate Canister & Link Rod
    const wg = new THREE.Mesh(new THREE.CylinderGeometry(7, 7, 16, 16), this.createTranslucentShellMaterial(0xffffff, 0xffffff));
    wg.position.set(-28, 22, 8);
    this.addNeonEdges(wg, 0xffffff);
    grp.add(wg);

    const wgRod = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 26, 8), new THREE.MeshBasicMaterial({ color: 0xffaa00 }));
    wgRod.position.set(-18, 12, 4);
    wgRod.rotation.z = -0.7;
    grp.add(wgRod);

    // Volumetric Contoured Pixel Cloud
    const pixelCloud = this.createVolumetricPixelCloud((i, total) => {
      const u = i / total;
      if (u < 0.50) {
        // Snail turbine volute
        const t = Math.random();
        const pt = snailCurve.getPoint(t);
        const theta = Math.random() * Math.PI * 2;
        const r = Math.random() * 6.5;
        return { x: pt.x + Math.cos(theta) * r, y: pt.y + Math.sin(theta) * r, z: pt.z + (Math.random() - 0.5) * 4 };
      } else if (u < 0.85) {
        // Compressor housing
        const theta = Math.random() * Math.PI * 2;
        const r = 18 + Math.random() * 12;
        return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z: 18 + (Math.random() - 0.5) * 8.5 };
      } else {
        // CHRA & wastegate
        return { x: -28 + (Math.random() - 0.5) * 14, y: 18 + (Math.random() - 0.5) * 16, z: 8 + (Math.random() - 0.5) * 12 };
      }
    }, colorHex, 45000, 2.2);
    grp.add(pixelCloud);

    grp.userData = {
      specKey: 'turbo',
      pixelCloud,
      ports: [
        { id: 'turbo_inlet', pos: new THREE.Vector3(-26, 0, 0), snapWith: 'exhaust_flange' },
        { id: 'turbo_outlet', pos: new THREE.Vector3(22, 16, 0), snapWith: 'intake_pipe' }
      ]
    };
    return grp;
  }

  // 9. 6-THREAD BRAIDED WIRING LOOM (Color-Coded Strands, Connectors & Animated Signals)
  buildCADWireLoom(pathPoints, colorHex = 0x00f0ff) {
    const pts = pathPoints || [[-35, 0, 0], [-18, 16, 12], [0, 8, -10], [18, 20, 8], [35, 0, 0]];
    const grp = this.createMultiThreadWiringHarness(pts, {
      threadCount: 6,
      bundleRadius: 3.2,
      threadRadius: 0.85,
      twists: 3.8
    });
    grp.userData.specKey = 'wire_threads';
    grp.userData.ports = [
      { id: 'wire_terminal', pos: new THREE.Vector3(-35, 0, 0), snapWith: 'spark_terminal' },
      { id: 'wire_lead', pos: new THREE.Vector3(-35, 0, 0), snapWith: 'injector_plug' },
      { id: 'wire_ecu_plug', pos: new THREE.Vector3(35, 0, 0), snapWith: 'ecu_socket' }
    ];
    return grp;
  }

  // 10. 32-BIT MICROCONTROLLER ECU (Finned Enclosure, 34-Pin Socket, Silicon DSP Core)
  buildCADECU(colorHex = 0x39ff14) {
    const grp = this.createMicrochipModule(40, 52, 9, "POWERTRAIN-DSP", colorHex);
    grp.userData.specKey = 'ecu_chip';
    grp.userData.ports = [
      { id: 'ecu_socket', pos: new THREE.Vector3(0, -14, 26), snapWith: 'wire_ecu_plug' }
    ];
    return grp;
  }

  // 11. INVOLUTE SPUR GEAR (24 Machined Involute Teeth, Center Keyed Bore, Lightening Holes)
  buildCADGear(colorHex = 0xffaa00) {
    const grp = new THREE.Group();

    // Gear Rim & Center Hub
    const rim = new THREE.Mesh(new THREE.CylinderGeometry(25, 25, 14, 32), this.createTranslucentShellMaterial(colorHex, colorHex));
    this.addNeonEdges(rim, colorHex);
    grp.add(rim);

    // 24 Individual Machined Involute Teeth
    for (let t = 0; t < 24; t++) {
      const angle = (t / 24) * Math.PI * 2;
      const tooth = new THREE.Mesh(new THREE.BoxGeometry(3.6, 14, 5.5), this.createTranslucentShellMaterial(colorHex, colorHex));
      tooth.position.set(Math.cos(angle) * 27, 0, Math.sin(angle) * 27);
      tooth.rotation.y = -angle;
      this.addNeonEdges(tooth, colorHex);
      grp.add(tooth);
    }

    // Keyed Shaft Bore Hub
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(11, 11, 16, 24), this.createTranslucentShellMaterial(0x00f0ff, 0x00f0ff));
    this.addNeonEdges(hub, 0x00f0ff);
    grp.add(hub);

    // 4 Web Lightening Cutout Rings
    for (let h = 0; h < 4; h++) {
      const hAngle = (h / 4) * Math.PI * 2;
      const cut = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 4.2, 14.5, 16), new THREE.MeshBasicMaterial({ color: 0x040810, wireframe: true }));
      cut.position.set(Math.cos(hAngle) * 17.5, 0, Math.sin(hAngle) * 17.5);
      grp.add(cut);
    }

    // Volumetric Contoured Pixel Cloud
    const pixelCloud = this.createVolumetricPixelCloud((i, total) => {
      const u = i / total;
      if (u < 0.50) {
        // Involute teeth
        const tIdx = Math.floor(Math.random() * 24);
        const angle = (tIdx / 24) * Math.PI * 2 + (Math.random() - 0.5) * 0.12;
        const r = 24.5 + Math.random() * 5.5;
        return { x: Math.cos(angle) * r, y: (Math.random() - 0.5) * 14, z: Math.sin(angle) * r };
      } else {
        // Gear web & hub
        const angle = Math.random() * Math.PI * 2;
        const r = 6 + Math.random() * 18;
        return { x: Math.cos(angle) * r, y: (Math.random() - 0.5) * 14, z: Math.sin(angle) * r };
      }
    }, colorHex, 35000, 2.2);
    grp.add(pixelCloud);

    grp.userData = {
      specKey: 'gear',
      pixelCloud,
      ports: [
        { id: 'gear_bore', pos: new THREE.Vector3(0, 0, 0), snapWith: 'crank_front' }
      ]
    };
    return grp;
  }

  // 12. DEEP-GROOVE RADIAL BALL BEARING (Inner/Outer Races, Stamped Cage & 8 Chrome Balls)
  buildCADBearing(colorHex = 0x00f0ff) {
    const grp = new THREE.Group();

    // Outer Ground Raceway
    const outerRace = new THREE.Mesh(new THREE.CylinderGeometry(28, 28, 14, 32), this.createTranslucentShellMaterial(colorHex, colorHex));
    this.addNeonEdges(outerRace, colorHex);
    grp.add(outerRace);

    // Inner Shaft Journal Bore
    const innerRace = new THREE.Mesh(new THREE.CylinderGeometry(15, 15, 14, 32), this.createTranslucentShellMaterial(colorHex, colorHex));
    this.addNeonEdges(innerRace, colorHex);
    grp.add(innerRace);

    // 8 Spherical Mirror-Finish Ball Bearings in Stamped Retainer
    for (let b = 0; b < 8; b++) {
      const angle = (b / 8) * Math.PI * 2;
      const ball = new THREE.Mesh(new THREE.SphereGeometry(4.4, 16, 16), new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0x00f0ff,
        emissiveIntensity: 0.5,
        metalness: 0.95,
        roughness: 0.1
      }));
      ball.position.set(Math.cos(angle) * 21.5, 0, Math.sin(angle) * 21.5);
      grp.add(ball);
    }

    // Volumetric Contoured Pixel Cloud
    const pixelCloud = this.createVolumetricPixelCloud((i, total) => {
      const u = i / total;
      if (u < 0.45) {
        // 8 Chrome balls
        const bIdx = Math.floor(Math.random() * 8);
        const angle = (bIdx / 8) * Math.PI * 2;
        const bx = Math.cos(angle) * 21.5;
        const bz = Math.sin(angle) * 21.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const r = 4.4 * Math.cbrt(Math.random());
        return {
          x: bx + r * Math.sin(phi) * Math.cos(theta),
          y: r * Math.cos(phi),
          z: bz + r * Math.sin(phi) * Math.sin(theta)
        };
      } else {
        // Inner and outer raceways
        const isOuter = Math.random() > 0.45;
        const theta = Math.random() * Math.PI * 2;
        const r = isOuter ? 26 + Math.random() * 2 : 15 + Math.random() * 2;
        return { x: Math.cos(theta) * r, y: (Math.random() - 0.5) * 14, z: Math.sin(theta) * r };
      }
    }, colorHex, 32000, 2.2);
    grp.add(pixelCloud);

    grp.userData = {
      specKey: 'bearing',
      pixelCloud,
      ports: [
        { id: 'bearing_bore', pos: new THREE.Vector3(0, 0, 0), snapWith: 'crank_journal' }
      ]
    };
    return grp;
  }

  // 13. MULTI-PLATE WET CLUTCH ASSEMBLY (Slotted Basket, Friction Plates & Coil Springs)
  buildCADClutch(colorHex = 0x39ff14) {
    const grp = new THREE.Group();

    // Outer Slotted Alloy Clutch Basket
    const basket = new THREE.Mesh(new THREE.CylinderGeometry(32, 32, 22, 32), this.createTranslucentShellMaterial(colorHex, colorHex));
    this.addNeonEdges(basket, colorHex);
    grp.add(basket);

    // Multi-Plate Pack (Alternating Friction & Steel Discs)
    for (let p = 0; p < 6; p++) {
      const py = -8 + p * 3.2;
      const isFriction = p % 2 === 0;
      const plate = new THREE.Mesh(
        new THREE.CylinderGeometry(30, 30, 1.6, 24),
        this.createTranslucentShellMaterial(isFriction ? 0xffaa00 : 0x00f0ff, isFriction ? 0xffaa00 : 0x00f0ff)
      );
      plate.position.y = py;
      this.addNeonEdges(plate, isFriction ? 0xffaa00 : 0x00f0ff);
      grp.add(plate);
    }

    // 5 Clutch Pressure Plate Spring Retainers & Hex Bolts
    for (let s = 0; s < 5; s++) {
      const angle = (s / 5) * Math.PI * 2;
      const spring = new THREE.Mesh(new THREE.CylinderGeometry(3.5, 3.5, 12, 16), new THREE.MeshBasicMaterial({ color: 0xff0055, wireframe: true }));
      spring.position.set(Math.cos(angle) * 18, 6, Math.sin(angle) * 18);
      grp.add(spring);

      const bolt = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 14, 8), new THREE.MeshBasicMaterial({ color: 0xffaa00 }));
      bolt.position.set(Math.cos(angle) * 18, 6, Math.sin(angle) * 18);
      grp.add(bolt);
    }

    // Center Splined Hub
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(10, 10, 24, 20), this.createTranslucentShellMaterial(0x00f0ff, 0x00f0ff));
    this.addNeonEdges(hub, 0x00f0ff);
    grp.add(hub);

    // Volumetric Contoured Pixel Cloud
    const pixelCloud = this.createVolumetricPixelCloud((i, total) => {
      const u = i / total;
      if (u < 0.45) {
        // Multi-disc pack
        const theta = Math.random() * Math.PI * 2;
        const r = 12 + Math.random() * 18;
        const pIdx = Math.floor(Math.random() * 6);
        return { x: Math.cos(theta) * r, y: -8 + pIdx * 3.2 + (Math.random() - 0.5) * 1.5, z: Math.sin(theta) * r };
      } else if (u < 0.75) {
        // Slotted outer basket
        const theta = Math.random() * Math.PI * 2;
        const r = 30 + Math.random() * 2.5;
        return { x: Math.cos(theta) * r, y: (Math.random() - 0.5) * 22, z: Math.sin(theta) * r };
      } else {
        // 5 Spring retainers
        const sIdx = Math.floor(Math.random() * 5);
        const angle = (sIdx / 5) * Math.PI * 2;
        const sx = Math.cos(angle) * 18 + (Math.random() - 0.5) * 6;
        const sz = Math.sin(angle) * 18 + (Math.random() - 0.5) * 6;
        return { x: sx, y: 6 + (Math.random() - 0.5) * 12, z: sz };
      }
    }, colorHex, 36000, 2.2);
    grp.add(pixelCloud);

    grp.userData = {
      specKey: 'clutch',
      pixelCloud,
      ports: [
        { id: 'clutch_hub', pos: new THREE.Vector3(0, 0, 0), snapWith: 'crank_rear' }
      ]
    };
    return grp;
  }

  // 14. SWEPT MANDREL-BENT EXHAUST HEADER (Smooth Curved Runner, Laser Flange & Flared Exit)
  buildCADExhaust(colorHex = 0xffaa00) {
    const grp = new THREE.Group();

    // 3D Swept Mandrel-Bent Primary Runner Tube
    const runnerPts = [
      new THREE.Vector3(0, 26, 0),
      new THREE.Vector3(12, 18, -12),
      new THREE.Vector3(26, -4, -18),
      new THREE.Vector3(18, -26, -10),
      new THREE.Vector3(6, -45, 6)
    ];
    const curve = new THREE.CatmullRomCurve3(runnerPts);
    const pipeGeo = new THREE.TubeGeometry(curve, 48, 6.5, 16, false);
    const pipe = new THREE.Mesh(pipeGeo, this.createTranslucentShellMaterial(colorHex, colorHex));
    this.addNeonEdges(pipe, colorHex);
    grp.add(pipe);

    // 3-Bolt Laser-Cut Mounting Flange
    const flange = new THREE.Mesh(new THREE.BoxGeometry(22, 4, 18), this.createTranslucentShellMaterial(0x00f0ff, 0x00f0ff));
    flange.position.set(0, 26, 0);
    this.addNeonEdges(flange, 0x00f0ff);
    grp.add(flange);

    // Flared Tailpipe Collector Exit
    const exitCone = new THREE.Mesh(new THREE.ConeGeometry(9.5, 14, 20, 1, true), this.createTranslucentShellMaterial(colorHex, colorHex));
    exitCone.position.set(6, -48, 6);
    exitCone.rotation.x = Math.PI;
    this.addNeonEdges(exitCone, colorHex);
    grp.add(exitCone);

    // Volumetric Contoured Pixel Cloud
    const pixelCloud = this.createVolumetricPixelCloud((i, total) => {
      const u = i / total;
      if (u < 0.85) {
        // Swept runner pipe
        const t = Math.random();
        const pt = curve.getPoint(t);
        const theta = Math.random() * Math.PI * 2;
        const r = 6.5 + (Math.random() - 0.5) * 1.0;
        return { x: pt.x + Math.cos(theta) * r, y: pt.y + Math.sin(theta) * r, z: pt.z + (Math.random() - 0.5) * 2 };
      } else {
        // Flange & flared collector
        return { x: (Math.random() - 0.5) * 22, y: 26 + (Math.random() - 0.5) * 4, z: (Math.random() - 0.5) * 18 };
      }
    }, colorHex, 28000, 2.2);
    grp.add(pixelCloud);

    grp.userData = {
      specKey: 'exhaust',
      pixelCloud,
      ports: [
        { id: 'exhaust_flange', pos: new THREE.Vector3(0, 26, 0), snapWith: 'exhaust_port' }
      ]
    };
    return grp;
  }

  // -----------------------------------------------------------
  // 1. BIKE ENGINE (4-Stroke High-Rev DOHC Motorcycle Powertrain)
  // -----------------------------------------------------------
  buildBikeEngineModel() {
    this.clearAssembly();

    // 1. Split Crankcase with Sump & Gearbox Cavity (45,000 Voxels)
    const caseGroup = new THREE.Group();
    const caseGeo = new THREE.BoxGeometry(78, 56, 88);
    const caseMesh = new THREE.Mesh(caseGeo, this.createTranslucentShellMaterial(0x00f0ff, 0x0066aa));
    this.addNeonEdges(caseMesh, 0x00f0ff);
    caseGroup.add(caseMesh);

    // Lower Ribbed Oil Sump
    const sump = new THREE.Mesh(new THREE.BoxGeometry(60, 16, 70), this.createTranslucentShellMaterial(0x00f0ff, 0x0066aa));
    sump.position.y = -34;
    this.addNeonEdges(sump, 0x00f0ff);
    caseGroup.add(sump);

    const casePixels = this.createVolumetricPixelCloud((i, total) => {
      const x = (Math.random() - 0.5) * 78;
      const y = (Math.random() - 0.5) * 56;
      const z = (Math.random() - 0.5) * 88;
      return { x, y, z };
    }, 0x00f0ff, 45000, 2.2);
    caseGroup.add(casePixels);
    caseGroup.userData = { specKey: 'bike_crankcase', baseZ: -140, pixelCloud: casePixels };
    this.registerPart(caseGroup);

    // 2. Counterweighted Crankshaft (buildCADCrankshaft)
    const crankGroup = this.buildCADCrankshaft(0xffaa00);
    crankGroup.userData.specKey = 'bike_crankshaft';
    crankGroup.userData.baseZ = -85;
    this.registerPart(crankGroup);

    // 3. Forged H-Beam Connecting Rod (buildCADConrod)
    const rodGroup = this.buildCADConrod(0x00f0ff);
    rodGroup.userData.specKey = 'bike_conrod';
    rodGroup.userData.baseZ = -35;
    this.registerPart(rodGroup);

    // 4. Forged Slipper Piston with 4 Valve Relief Pockets (buildCADPiston)
    const pistonGroup = this.buildCADPiston(0x39ff14);
    pistonGroup.userData.specKey = 'bike_piston';
    pistonGroup.userData.baseZ = 20;
    this.registerPart(pistonGroup);

    // 5. Deep-Finned Cylinder Barrel with Nikasil Liner (buildCADCylinder)
    const cylGroup = this.buildCADCylinder(0x00f0ff);
    cylGroup.userData.specKey = 'bike_cylinder';
    cylGroup.userData.baseZ = 85;
    this.registerPart(cylGroup);

    // 6. DOHC Cylinder Head & 4-Valves with Cams (buildCADHead)
    const headGroup = this.buildCADHead(0xff007f);
    headGroup.userData.specKey = 'bike_head';
    headGroup.userData.baseZ = 150;
    this.registerPart(headGroup);

    // 7. Multi-Plate Wet Clutch Assembly (buildCADClutch)
    const clutchGroup = this.buildCADClutch(0x39ff14);
    clutchGroup.userData.specKey = 'bike_clutch';
    clutchGroup.userData.baseZ = 210;
    this.registerPart(clutchGroup);

    // 8. Tuned Swept Header Pipe (buildCADExhaust)
    const exGroup = this.buildCADExhaust(0xffaa00);
    exGroup.userData.specKey = 'bike_exhaust';
    exGroup.userData.baseZ = 270;
    this.registerPart(exGroup);

    // Integrated 6-Thread Braided Wire Harness & Microchip ECU
    const harness = this.createMultiThreadWiringHarness([
      [-40, 45, 150], [-35, 30, 85], [-30, 10, 20], [-45, -20, -85], [-52, -40, -140]
    ], { threadCount: 6, bundleRadius: 3.2 });
    this.assemblyGroup.add(harness);

    const ecu = this.createMicrochipModule(28, 38, 7, "EFI-ECU", 0x39ff14);
    ecu.position.set(-50, -25, -140);
    this.assemblyGroup.add(ecu);

    this.updateAssemblyPositions();
    this.refreshVoxelCount();
  }

  // -----------------------------------------------------------
  // 2. CAR ENGINE (Twin-Turbo High-Performance V8 Engine)
  // -----------------------------------------------------------
  buildCarEngineModel() {
    this.clearAssembly();

    // 1. 90-Degree V8 Engine Block with Cross-Bolted Main Caps (60,000 Voxels)
    const blockGroup = new THREE.Group();
    const blockMesh = new THREE.Mesh(new THREE.BoxGeometry(94, 78, 125), this.createTranslucentShellMaterial(0x00f0ff, 0x0066aa));
    this.addNeonEdges(blockMesh, 0x00f0ff);
    blockGroup.add(blockMesh);

    const blockPixels = this.createVolumetricPixelCloud((i, total) => {
      const bank = i % 2 === 0 ? 1 : -1;
      const ang = bank * 0.785;
      const u = (i / total);
      const r = 24 + Math.random() * 26;
      const x = Math.sin(ang) * (35 + r * 0.4);
      const y = Math.cos(ang) * (35 + r * 0.4);
      const z = (u - 0.5) * 125;
      return { x, y, z };
    }, 0x00f0ff, 60000, 2.2);
    blockGroup.add(blockPixels);
    blockGroup.userData = { specKey: 'car_block', baseZ: -120, pixelCloud: blockPixels };
    this.registerPart(blockGroup);

    // 2. Crossplane V8 Crankshaft (48,000 Voxels)
    const crankGroup = new THREE.Group();
    const crankPixels = this.createVolumetricPixelCloud((i, total) => {
      const u = i / total;
      const z = (u - 0.5) * 120;
      const pinIdx = Math.floor(u * 4);
      const pinAngle = pinIdx * (Math.PI / 2);
      const r = 28 * Math.sqrt(Math.random());
      return { x: Math.cos(pinAngle) * r, y: Math.sin(pinAngle) * r, z };
    }, 0xffaa00, 48000, 2.2);
    crankGroup.add(crankPixels);
    crankGroup.userData = { specKey: 'car_crankshaft', baseZ: -60, pixelCloud: crankPixels };
    this.registerPart(crankGroup);

    // 3. Dual Quad-Cam Cylinder Heads (56,000 Voxels)
    const headsGroup = new THREE.Group();
    [-46, 46].forEach(bx => {
      const bHead = new THREE.Mesh(new THREE.BoxGeometry(32, 28, 115), this.createTranslucentShellMaterial(0xff007f, 0xaa0055));
      bHead.position.set(bx, 44, 0);
      bHead.rotation.z = bx > 0 ? -0.785 : 0.785;
      this.addNeonEdges(bHead, 0xff007f);
      headsGroup.add(bHead);
    });

    const headsPixels = this.createVolumetricPixelCloud((i, total) => {
      const bank = i % 2 === 0 ? 1 : -1;
      const bx = bank * 46 + (Math.random() - 0.5) * 24;
      const by = 44 + (Math.random() - 0.5) * 24;
      const bz = (Math.random() - 0.5) * 115;
      return { x: bx, y: by, z: bz };
    }, 0xff007f, 56000, 2.2);
    headsGroup.add(headsPixels);
    headsGroup.userData = { specKey: 'car_heads', baseZ: 10, pixelCloud: headsPixels };
    this.registerPart(headsGroup);

    // 4. Symmetric Twin Turbochargers (54,000 Voxels)
    const turboGroup = new THREE.Group();
    const leftTurbo = this.buildCADTurbo(0x39ff14);
    leftTurbo.position.set(-58, -10, 0);
    turboGroup.add(leftTurbo);

    const rightTurbo = this.buildCADTurbo(0x39ff14);
    rightTurbo.position.set(58, -10, 0);
    turboGroup.add(rightTurbo);

    const turboPixels = this.createVolumetricPixelCloud((i, total) => {
      const side = i % 2 === 0 ? 1 : -1;
      const cx = side * 58;
      const theta = (i / total) * Math.PI * 2 * 32;
      const r = (theta / (Math.PI * 2 * 32)) * 26 + 8;
      const x = cx + Math.cos(theta) * r;
      const y = -10 + Math.sin(theta) * r;
      const z = (Math.random() - 0.5) * 35;
      return { x, y, z };
    }, 0x39ff14, 54000, 2.2);
    turboGroup.add(turboPixels);
    turboGroup.userData = { specKey: 'car_turbos', baseZ: 85, pixelCloud: turboPixels };
    this.registerPart(turboGroup);

    // 5. Symmetric Intake Plenum Runners with 8 Trumpets (42,000 Voxels)
    const plenumGroup = new THREE.Group();
    const plenumMesh = new THREE.Mesh(new THREE.BoxGeometry(58, 22, 100), this.createTranslucentShellMaterial(0x00f0ff, 0x00f0ff));
    plenumMesh.position.y = 66;
    this.addNeonEdges(plenumMesh, 0x00f0ff);
    plenumGroup.add(plenumMesh);

    const plenumPixels = this.createVolumetricPixelCloud((i, total) => {
      const x = (Math.random() - 0.5) * 58;
      const y = 66 + (Math.random() - 0.5) * 24;
      const z = (Math.random() - 0.5) * 100;
      return { x, y, z };
    }, 0x00f0ff, 42000, 2.2);
    plenumGroup.add(plenumPixels);
    plenumGroup.userData = { specKey: 'car_plenum', baseZ: 160, pixelCloud: plenumPixels };
    this.registerPart(plenumGroup);

    // Dual Multi-Thread Braided Wiring Harnesses & V8 PCM
    const leftHarness = this.createMultiThreadWiringHarness([[-46, 55, 60], [-40, 40, 0], [-35, 10, -60], [0, 68, -120]], { threadCount: 6 });
    const rightHarness = this.createMultiThreadWiringHarness([[46, 55, 60], [40, 40, 0], [35, 10, -60], [0, 68, -120]], { threadCount: 6 });
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

    // 1. Commuter Crankcase Unit (42,000 Voxels)
    const caseGroup = new THREE.Group();
    const caseGeo = new THREE.BoxGeometry(64, 52, 74);
    const caseMesh = new THREE.Mesh(caseGeo, this.createTranslucentShellMaterial(0x00f0ff, 0x0066aa));
    this.addNeonEdges(caseMesh, 0x00f0ff);
    caseGroup.add(caseMesh);

    const casePixels = this.createVolumetricPixelCloud((i, total) => {
      const x = (Math.random() - 0.5) * 64;
      const y = (Math.random() - 0.5) * 52;
      const z = (Math.random() - 0.5) * 74;
      return { x, y, z };
    }, 0x00f0ff, 42000, 2.2);
    caseGroup.add(casePixels);
    caseGroup.userData = { specKey: 'auto_case', baseZ: -100, pixelCloud: casePixels };
    this.registerPart(caseGroup);

    // 2. Cast Iron Finned Cylinder (46,000 Voxels)
    const cylGroup = this.buildCADCylinder(0xffaa00);
    cylGroup.userData.specKey = 'auto_cylinder';
    cylGroup.userData.baseZ = -25;
    this.registerPart(cylGroup);

    // 3. Forced-Air Cooling Fan Shroud & Vanes (40,000 Voxels)
    const fanGroup = new THREE.Group();
    const fanShroud = new THREE.Mesh(new THREE.CylinderGeometry(44, 44, 24, 28), this.createTranslucentShellMaterial(0x39ff14, 0x39ff14));
    this.addNeonEdges(fanShroud, 0x39ff14);
    fanGroup.add(fanShroud);

    const fanPixels = this.createVolumetricPixelCloud((i, total) => {
      const theta = (i / total) * Math.PI * 2 * 28;
      const r = 44 * Math.sqrt(Math.random());
      const z = (Math.random() - 0.5) * 24;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z };
    }, 0x39ff14, 40000, 2.2);
    fanGroup.add(fanPixels);
    fanGroup.userData = { specKey: 'auto_fan_shroud', baseZ: 50, pixelCloud: fanPixels };
    this.registerPart(fanGroup);

    // 4. Variable Venturi Slide Carburetor (32,000 Voxels)
    const carbGroup = new THREE.Group();
    const carbMesh = new THREE.Mesh(new THREE.BoxGeometry(26, 38, 26), this.createTranslucentShellMaterial(0xff007f, 0xff007f));
    this.addNeonEdges(carbMesh, 0xff007f);
    carbGroup.add(carbMesh);

    const carbPixels = this.createVolumetricPixelCloud((i, total) => {
      const x = 35 + (Math.random() - 0.5) * 26;
      const y = 20 + (Math.random() - 0.5) * 38;
      const z = (Math.random() - 0.5) * 26;
      return { x, y, z };
    }, 0xff007f, 32000, 2.2);
    carbGroup.add(carbPixels);
    carbGroup.userData = { specKey: 'auto_carb', baseZ: 115, pixelCloud: carbPixels };
    this.registerPart(carbGroup);

    // Multi-Thread Ignition Wire & Spark Plug
    const harness = this.createMultiThreadWiringHarness([[20, 20, 115], [0, 45, 50], [0, 40, -25]], { threadCount: 4 });
    this.assemblyGroup.add(harness);

    this.updateAssemblyPositions();
    this.refreshVoxelCount();
  }

  // -----------------------------------------------------------
  // 4. TRACTOR ENGINE (Agricultural Heavy Diesel)
  // -----------------------------------------------------------
  buildTractorEngineModel() {
    this.clearAssembly();

    // 1. Cast-Iron Heavy Diesel Block (58,000 Voxels)
    const blockGroup = new THREE.Group();
    const blockMesh = new THREE.Mesh(new THREE.BoxGeometry(74, 88, 140), this.createTranslucentShellMaterial(0x00f0ff, 0x0066aa));
    this.addNeonEdges(blockMesh, 0x00f0ff);
    blockGroup.add(blockMesh);

    const blockPixels = this.createVolumetricPixelCloud((i, total) => {
      const x = (Math.random() - 0.5) * 74;
      const y = (Math.random() - 0.5) * 88;
      const z = (Math.random() - 0.5) * 140;
      return { x, y, z };
    }, 0x00f0ff, 58000, 2.2);
    blockGroup.add(blockPixels);
    blockGroup.userData = { specKey: 'tractor_block', baseZ: -110, pixelCloud: blockPixels };
    this.registerPart(blockGroup);

    // 2. Mechanical Inline Fuel Injection Pump (48,000 Voxels)
    const pumpGroup = new THREE.Group();
    const pumpMesh = new THREE.Mesh(new THREE.BoxGeometry(26, 38, 90), this.createTranslucentShellMaterial(0xffaa00, 0xffaa00));
    pumpMesh.position.set(-48, -10, 0);
    this.addNeonEdges(pumpMesh, 0xffaa00);
    pumpGroup.add(pumpMesh);

    const pumpPixels = this.createVolumetricPixelCloud((i, total) => {
      const x = -48 + (Math.random() - 0.5) * 26;
      const y = -10 + (Math.random() - 0.5) * 38;
      const z = (Math.random() - 0.5) * 90;
      return { x, y, z };
    }, 0xffaa00, 48000, 2.2);
    pumpGroup.add(pumpPixels);
    pumpGroup.userData = { specKey: 'tractor_pump', baseZ: -35, pixelCloud: pumpPixels };
    this.registerPart(pumpGroup);

    // 3. High-Inertia Industrial Flywheel (46,000 Voxels)
    const flyGroup = new THREE.Group();
    const flyMesh = new THREE.Mesh(new THREE.CylinderGeometry(54, 54, 28, 32), this.createTranslucentShellMaterial(0x39ff14, 0x39ff14));
    this.addNeonEdges(flyMesh, 0x39ff14);
    flyGroup.add(flyMesh);

    const flyPixels = this.createVolumetricPixelCloud((i, total) => {
      const theta = (i / total) * Math.PI * 2 * 36;
      const r = 54 * Math.sqrt(Math.random());
      const z = (Math.random() - 0.5) * 28;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z };
    }, 0x39ff14, 46000, 2.2);
    flyGroup.add(flyPixels);
    flyGroup.userData = { specKey: 'tractor_flywheel', baseZ: 45, pixelCloud: flyPixels };
    this.registerPart(flyGroup);

    // 4. Cyclone Oil-Bath Air Cleaner (38,000 Voxels)
    const filterGroup = new THREE.Group();
    const filterMesh = new THREE.Mesh(new THREE.CylinderGeometry(30, 30, 80, 24), this.createTranslucentShellMaterial(0xff007f, 0xff007f));
    filterMesh.position.set(40, 48, 0);
    this.addNeonEdges(filterMesh, 0xff007f);
    filterGroup.add(filterMesh);

    const filterPixels = this.createVolumetricPixelCloud((i, total) => {
      const theta = (i / total) * Math.PI * 2 * 28;
      const r = 30 * Math.sqrt(Math.random());
      const z = (i / total) * 80 - 40;
      return { x: 40 + Math.cos(theta) * r, y: 48 + Math.sin(theta) * r, z };
    }, 0xff007f, 38000, 2.2);
    filterGroup.add(filterPixels);
    filterGroup.userData = { specKey: 'tractor_filter', baseZ: 120, pixelCloud: filterPixels };
    this.registerPart(filterGroup);

    this.updateAssemblyPositions();
    this.refreshVoxelCount();
  }

  // -----------------------------------------------------------
  // 5. TRUCK & BUS HEAVY DIESEL (13-Liter Commercial Engine)
  // -----------------------------------------------------------
  buildTruckEngineModel() {
    this.clearAssembly();

    // 1. 13-Liter Monolithic CGI Block (64,000 Voxels)
    const blockGroup = new THREE.Group();
    const blockMesh = new THREE.Mesh(new THREE.BoxGeometry(84, 98, 150), this.createTranslucentShellMaterial(0x00f0ff, 0x0066aa));
    this.addNeonEdges(blockMesh, 0x00f0ff);
    blockGroup.add(blockMesh);

    const blockPixels = this.createVolumetricPixelCloud((i, total) => {
      const x = (Math.random() - 0.5) * 84;
      const y = (Math.random() - 0.5) * 98;
      const z = (Math.random() - 0.5) * 150;
      return { x, y, z };
    }, 0x00f0ff, 64000, 2.2);
    blockGroup.add(blockPixels);
    blockGroup.userData = { specKey: 'truck_block', baseZ: -125, pixelCloud: blockPixels };
    this.registerPart(blockGroup);

    // 2. 2,500-Bar Piezo Common Rail Line (46,000 Voxels)
    const railGroup = new THREE.Group();
    const railMesh = new THREE.Mesh(new THREE.CylinderGeometry(6, 6, 135, 16), this.createTranslucentShellMaterial(0xffaa00, 0xffaa00));
    railMesh.position.set(-36, 40, 0);
    railMesh.rotation.x = Math.PI / 2;
    this.addNeonEdges(railMesh, 0xffaa00);
    railGroup.add(railMesh);

    const railPixels = this.createVolumetricPixelCloud((i, total) => {
      const z = (i / total) * 135 - 67.5;
      const theta = (i / total) * Math.PI * 2 * 24;
      const r = 8 + (i % 6 === 0 ? 18 : 0);
      return { x: -36 + Math.cos(theta) * r, y: 40 + Math.sin(theta) * r, z };
    }, 0xffaa00, 46000, 2.2);
    railGroup.add(railPixels);
    railGroup.userData = { specKey: 'truck_common_rail', baseZ: -50, pixelCloud: railPixels };
    this.registerPart(railGroup);

    // 3. Variable Geometry Turbocharger (VGT, 52,000 Voxels)
    const vgtGroup = this.buildCADTurbo(0x39ff14);
    vgtGroup.position.set(50, 18, 0);
    vgtGroup.userData.specKey = 'truck_turbo';
    vgtGroup.userData.baseZ = 28;
    this.registerPart(vgtGroup);

    // 4. CGI Overhead Cam Head with Compression Brake (50,000 Voxels)
    const headGroup = new THREE.Group();
    const headMesh = new THREE.Mesh(new THREE.BoxGeometry(80, 32, 140), this.createTranslucentShellMaterial(0xff007f, 0xaa0055));
    headMesh.position.y = 54;
    this.addNeonEdges(headMesh, 0xff007f);
    headGroup.add(headMesh);

    const headPixels = this.createVolumetricPixelCloud((i, total) => {
      const x = (Math.random() - 0.5) * 80;
      const y = 54 + (Math.random() - 0.5) * 32;
      const z = (Math.random() - 0.5) * 140;
      return { x, y, z };
    }, 0xff007f, 50000, 2.2);
    headGroup.add(headPixels);
    headGroup.userData = { specKey: 'truck_head', baseZ: 105, pixelCloud: headPixels };
    this.registerPart(headGroup);

    // Heavy Multi-Thread Engine Harness & ECU
    const harness = this.createMultiThreadWiringHarness([
      [-36, 40, 60], [-25, 20, 0], [30, 15, -40], [50, 18, -80]
    ], { threadCount: 6 });
    this.assemblyGroup.add(harness);

    this.updateAssemblyPositions();
    this.refreshVoxelCount();
  }

  // -----------------------------------------------------------
  // 6. TRAIN LOCOMOTIVE POWERPLANT (Massive V16 Prime Mover)
  // -----------------------------------------------------------
  buildTrainEngineModel() {
    this.clearAssembly();

    // 1. Fabricated V16 Locomotive Crankcase (70,000 Voxels)
    const caseGroup = new THREE.Group();
    const caseMesh = new THREE.Mesh(new THREE.BoxGeometry(98, 115, 185), this.createTranslucentShellMaterial(0x00f0ff, 0x0066aa));
    this.addNeonEdges(caseMesh, 0x00f0ff);
    caseGroup.add(caseMesh);

    const casePixels = this.createVolumetricPixelCloud((i, total) => {
      const x = (Math.random() - 0.5) * 98;
      const y = (Math.random() - 0.5) * 115;
      const z = (Math.random() - 0.5) * 185;
      return { x, y, z };
    }, 0x00f0ff, 70000, 2.2);
    caseGroup.add(casePixels);
    caseGroup.userData = { specKey: 'train_crankcase', baseZ: -140, pixelCloud: casePixels };
    this.registerPart(caseGroup);

    // 2. Dual Massive Industrial Turbo-Superchargers (58,000 Voxels)
    const turboGroup = new THREE.Group();
    [-52, 52].forEach(tx => {
      const tMesh = new THREE.Mesh(new THREE.CylinderGeometry(44, 44, 55, 28), this.createTranslucentShellMaterial(0xffaa00, 0xffaa00));
      tMesh.position.set(tx, 68, 0);
      this.addNeonEdges(tMesh, 0xffaa00);
      turboGroup.add(tMesh);
    });

    const turboPixels = this.createVolumetricPixelCloud((i, total) => {
      const side = i % 2 === 0 ? 1 : -1;
      const cx = side * 52;
      const theta = (i / total) * Math.PI * 2 * 36;
      const r = 44 * Math.sqrt(Math.random());
      return { x: cx + Math.cos(theta) * r, y: 68 + Math.sin(theta) * r, z: (Math.random() - 0.5) * 60 };
    }, 0xffaa00, 58000, 2.2);
    turboGroup.add(turboPixels);
    turboGroup.userData = { specKey: 'train_turbos', baseZ: -40, pixelCloud: turboPixels };
    this.registerPart(turboGroup);

    // 3. Traction Alternator Coupling Hub (54,000 Voxels)
    const altGroup = new THREE.Group();
    const altMesh = new THREE.Mesh(new THREE.CylinderGeometry(64, 64, 58, 36), this.createTranslucentShellMaterial(0x39ff14, 0x39ff14));
    this.addNeonEdges(altMesh, 0x39ff14);
    altGroup.add(altMesh);

    const altPixels = this.createVolumetricPixelCloud((i, total) => {
      const theta = (i / total) * Math.PI * 2 * 48;
      const r = 64 * Math.sqrt(Math.random());
      const z = (Math.random() - 0.5) * 58;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z };
    }, 0x39ff14, 54000, 2.2);
    altGroup.add(altPixels);
    altGroup.userData = { specKey: 'train_alternator', baseZ: 65, pixelCloud: altPixels };
    this.registerPart(altGroup);

    this.updateAssemblyPositions();
    this.refreshVoxelCount();
  }

  // -----------------------------------------------------------
  // 7. AEROPLANE TURBOFAN (CFM/GE90 Class High-Bypass Jet)
  // -----------------------------------------------------------
  buildTurbineModel() {
    this.clearAssembly();

    // 1. Titanium Intake Spinner Cone with Vortex Spiral (28,000 Voxels)
    const coneGroup = new THREE.Group();
    const coneMesh = new THREE.Mesh(new THREE.ConeGeometry(32, 65, 32), this.createTranslucentShellMaterial(0x00f0ff, 0x00f0ff));
    coneMesh.rotation.x = Math.PI;
    this.addNeonEdges(coneMesh, 0x00f0ff);
    coneGroup.add(coneMesh);

    const conePixels = this.createVolumetricPixelCloud((i, total) => {
      const u = i / total;
      const r = Math.pow(u, 0.72) * 32 + (Math.random() - 0.5) * 1.2;
      const z = (1 - u) * 65 - 32.5;
      const theta = i * 2.399963;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z: z };
    }, 0x00f0ff, 28000, 2.2);
    coneGroup.add(conePixels);
    coneGroup.userData = { specKey: 'cone', baseZ: -140, pixelCloud: conePixels };
    this.registerPart(coneGroup);

    // 2. Wide-Chord Hollow Titanium Fan Blades (18 Blades, 85,000 Voxels)
    const fanGroup = new THREE.Group();
    const fanHub = new THREE.Mesh(new THREE.CylinderGeometry(28, 28, 16, 24), this.createTranslucentShellMaterial(0x39ff14, 0x39ff14));
    fanHub.rotation.x = Math.PI / 2;
    fanGroup.add(fanHub);

    const fanBladePixels = this.createVolumetricPixelCloud((i, total) => {
      const bladeIdx = Math.floor(i / (total / 18));
      const bladeAngle = (bladeIdx / 18) * Math.PI * 2;
      const localIdx = i % (total / 18);
      const u = localIdx / (total / 18);
      const span = 26 + u * 60;
      const chord = (Math.random() - 0.5) * (15 - u * 4);
      const twist = 0.45 + (1 - u) * 0.35;
      const bx = Math.cos(bladeAngle) * span - Math.sin(bladeAngle) * chord * Math.cos(twist);
      const by = Math.sin(bladeAngle) * span + Math.cos(bladeAngle) * chord * Math.cos(twist);
      const bz = chord * Math.sin(twist) + (Math.random() - 0.5) * 1.8;
      return { x: bx, y: by, z: bz };
    }, 0x39ff14, 85000, 2.2);
    fanGroup.add(fanBladePixels);
    fanGroup.userData = { specKey: 'fan', baseZ: -80, pixelCloud: fanBladePixels };
    this.registerPart(fanGroup);

    // 3. LP & HP Compressor Staged Blisks (48,000 Voxels)
    const compGroup = new THREE.Group();
    const compPixels = this.createVolumetricPixelCloud((i, total) => {
      const stage = Math.floor((i / total) * 4);
      const stageZ = (stage - 1.5) * 14;
      const stageRadius = 52 + stage * 4.5;
      const theta = (i / total) * Math.PI * 2 * 64;
      const r = 18 + Math.random() * (stageRadius - 18);
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z: stageZ };
    }, 0x00f0ff, 48000, 2.2);
    compGroup.add(compPixels);
    compGroup.userData = { specKey: 'compressor', baseZ: -18, pixelCloud: compPixels };
    this.registerPart(compGroup);

    // 4. Annular Combustor Core & 16 Swirl Nozzles (44,000 Voxels)
    const combGroup = new THREE.Group();
    const combPixels = this.createVolumetricPixelCloud((i, total) => {
      const theta = (i / total) * Math.PI * 2 * 32;
      const r = 48 + Math.random() * 16;
      const z = (Math.random() - 0.5) * 52;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z };
    }, 0xffaa00, 44000, 2.2);
    combGroup.add(combPixels);
    combGroup.userData = { specKey: 'combustor', baseZ: 48, pixelCloud: combPixels };
    this.registerPart(combGroup);

    // 5. HP Turbine Single-Crystal Stage (40,000 Voxels)
    const turbGroup = new THREE.Group();
    const turbPixels = this.createVolumetricPixelCloud((i, total) => {
      const bladeIdx = Math.floor(i / (total / 28));
      const bladeAngle = (bladeIdx / 28) * Math.PI * 2;
      const u = (i % (total / 28)) / (total / 28);
      const r = 26 + u * 40;
      const z = (Math.random() - 0.5) * 18;
      return { x: Math.cos(bladeAngle) * r, y: Math.sin(bladeAngle) * r, z };
    }, 0xb026ff, 40000, 2.2);
    turbGroup.add(turbPixels);
    turbGroup.userData = { specKey: 'turbine', baseZ: 110, pixelCloud: turbPixels };
    this.registerPart(turbGroup);

    // 6. Thrust Nozzle Cowl (36,000 Voxels)
    const nozzGroup = new THREE.Group();
    const nozzPixels = this.createVolumetricPixelCloud((i, total) => {
      const u = i / total;
      const z = u * 75 - 37.5;
      const r = 60 - u * 20;
      const theta = (i / total) * Math.PI * 2 * 45;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z };
    }, 0xff007f, 36000, 2.2);
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

    // 1. Dual Staged Turbopump Assembly (48,000 Voxels)
    const pumpGroup = new THREE.Group();
    const pumpPixels = this.createVolumetricPixelCloud((i, total) => {
      const side = i % 2 === 0 ? 1 : -1;
      const cx = side * 32;
      const theta = (i / total) * Math.PI * 2 * 36;
      const r = 24 * Math.sqrt(Math.random());
      return { x: cx + Math.cos(theta) * r, y: Math.sin(theta) * r, z: (Math.random() - 0.5) * 36 };
    }, 0x00f0ff, 48000, 2.2);
    pumpGroup.add(pumpPixels);
    pumpGroup.userData = { specKey: 'rocket_turbopump', baseZ: -120, pixelCloud: pumpPixels };
    this.registerPart(pumpGroup);

    // 2. Preburner & Hydraulic Gimbal Actuators (42,000 Voxels)
    const gimbalGroup = new THREE.Group();
    const gimbalPixels = this.createVolumetricPixelCloud((i, total) => {
      const theta = (i / total) * Math.PI * 2 * 28;
      const r = 26 + (Math.random() - 0.5) * 6;
      const z = (Math.random() - 0.5) * 45;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z };
    }, 0xffaa00, 42000, 2.2);
    gimbalGroup.add(gimbalPixels);
    gimbalGroup.userData = { specKey: 'rocket_gimbal', baseZ: -55, pixelCloud: gimbalPixels };
    this.registerPart(gimbalGroup);

    // 3. Regenerative Main Combustion Chamber (48,000 Voxels)
    const combGroup = new THREE.Group();
    const combPixels = this.createVolumetricPixelCloud((i, total) => {
      const u = i / total;
      const r = 34 - Math.sin(u * Math.PI) * 11;
      const theta = (i / total) * Math.PI * 2 * 45;
      const z = (u - 0.5) * 58;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z };
    }, 0x39ff14, 48000, 2.2);
    combGroup.add(combPixels);
    combGroup.userData = { specKey: 'rocket_combustor', baseZ: 15, pixelCloud: combPixels };
    this.registerPart(combGroup);

    // 4. Contoured Parabolic Bell Nozzle with Regenerative Cooling Channels (72,000 Voxels)
    const bellGroup = new THREE.Group();
    const bellPixels = this.createVolumetricPixelCloud((i, total) => {
      const u = i / total;
      const r = 22 + Math.pow(u, 1.38) * 68;
      const theta = (i / total) * Math.PI * 2 * 64;
      const z = u * 115 - 20;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z };
    }, 0xff007f, 72000, 2.2);
    bellGroup.add(bellPixels);
    bellGroup.userData = { specKey: 'rocket_bell', baseZ: 98, pixelCloud: bellPixels };
    this.registerPart(bellGroup);

    this.updateAssemblyPositions();
    this.refreshVoxelCount();
  }

  // -----------------------------------------------------------
  // 9. PLANETARY GEARBOX
  // -----------------------------------------------------------
  buildGearboxModel() {
    this.clearAssembly();

    // 1. Splined Input Drive Shaft (28,000 Voxels)
    const shaftGroup = new THREE.Group();
    const shaftMesh = new THREE.Mesh(new THREE.CylinderGeometry(12, 12, 85, 24), this.createTranslucentShellMaterial(0x00f0ff, 0x00f0ff));
    shaftMesh.rotation.x = Math.PI / 2;
    this.addNeonEdges(shaftMesh, 0x00f0ff);
    shaftGroup.add(shaftMesh);

    const shaftPixels = this.createVolumetricPixelCloud((i, total) => {
      const z = (i / total) * 85 - 42.5;
      const theta = (i / total) * Math.PI * 2 * 28;
      const r = 12 * Math.sqrt(Math.random());
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z };
    }, 0x00f0ff, 28000, 2.2);
    shaftGroup.add(shaftPixels);
    shaftGroup.userData = { specKey: 'shaft_in', baseZ: -125, pixelCloud: shaftPixels };
    this.registerPart(shaftGroup);

    // 2. 14-Tooth Sun Drive Gear (buildCADGear)
    const sunGroup = this.buildCADGear(0xffaa00);
    sunGroup.userData.specKey = 'sun_gear';
    sunGroup.userData.baseZ = -55;
    this.registerPart(sunGroup);

    // 3. Triple Planet Carrier Assembly (98,000 Voxels)
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
    }, 0x39ff14, 98000, 2.2);
    planetGroup.add(planetPixels);
    planetGroup.userData = { specKey: 'planet_gears', baseZ: 10, pixelCloud: planetPixels };
    this.registerPart(planetGroup);

    // 4. Internal Annulus Ring Gear (54,000 Voxels)
    const ringGroup = new THREE.Group();
    const ringPixels = this.createVolumetricPixelCloud((i, total) => {
      const theta = (i / total) * Math.PI * 2 * 56;
      const tooth = Math.sin(theta * 28) * 4;
      const r = 84 + tooth;
      const z = (Math.random() - 0.5) * 34;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z };
    }, 0xff007f, 54000, 2.2);
    ringGroup.add(ringPixels);
    ringGroup.userData = { specKey: 'ring_gear', baseZ: 75, pixelCloud: ringPixels };
    this.registerPart(ringGroup);

    // 5. Output Flange Hub (30,000 Voxels)
    const outGroup = new THREE.Group();
    const outPixels = this.createVolumetricPixelCloud((i, total) => {
      const z = (i / total) * 75 - 37.5;
      const theta = (i / total) * Math.PI * 2 * 24;
      const r = 18 * Math.sqrt(Math.random());
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z };
    }, 0x00f0ff, 30000, 2.2);
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

    // 1. Base Turret Flange (48,000 Voxels)
    const baseGroup = new THREE.Group();
    const basePixels = this.createVolumetricPixelCloud((i, total) => {
      const theta = (i / total) * Math.PI * 2 * 36;
      const r = 30 + Math.random() * 45;
      const z = (Math.random() - 0.5) * 26;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z };
    }, 0x00f0ff, 48000, 2.2);
    baseGroup.add(basePixels);
    baseGroup.userData = { specKey: 'base_turret', baseZ: -120, pixelCloud: basePixels };
    this.registerPart(baseGroup);

    // 2. Brushless Stator Motor (58,000 Voxels)
    const statGroup = new THREE.Group();
    const statPixels = this.createVolumetricPixelCloud((i, total) => {
      const theta = (i / total) * Math.PI * 2 * 48;
      const r = 24 + Math.random() * 30;
      const z = (Math.random() - 0.5) * 38;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z };
    }, 0xff007f, 58000, 2.2);
    statGroup.add(statPixels);
    statGroup.userData = { specKey: 'stator_motor', baseZ: -50, pixelCloud: statPixels };
    this.registerPart(statGroup);

    // 3. Harmonic Wave Flexspline (44,000 Voxels)
    const harmGroup = new THREE.Group();
    const harmPixels = this.createVolumetricPixelCloud((i, total) => {
      const theta = (i / total) * Math.PI * 2 * 48;
      const r = 38 + Math.random() * 12;
      const z = (Math.random() - 0.5) * 26;
      return { x: Math.cos(theta) * r, y: Math.sin(theta) * r, z };
    }, 0xffaa00, 44000, 2.2);
    harmGroup.add(harmPixels);
    harmGroup.userData = { specKey: 'harmonic_drive', baseZ: 15, pixelCloud: harmPixels };
    this.registerPart(harmGroup);

    // 4. Billet 7075-T6 Pitch Yoke Arm (48,000 Voxels)
    const yokeGroup = new THREE.Group();
    const yokePixels = this.createVolumetricPixelCloud((i, total) => {
      const x = (Math.random() - 0.5) * 44;
      const y = (Math.random() - 0.5) * 78;
      const z = (Math.random() - 0.5) * 32;
      return { x, y, z };
    }, 0x00f0ff, 48000, 2.2);
    yokeGroup.add(yokePixels);
    yokeGroup.userData = { specKey: 'pivot_yoke', baseZ: 75, pixelCloud: yokePixels };
    this.registerPart(yokeGroup);

    // 5. Adaptive Gripper End-Effector (46,000 Voxels)
    const gripGroup = new THREE.Group();
    const gripPixels = this.createVolumetricPixelCloud((i, total) => {
      const isLeft = i % 2 === 0;
      const side = isLeft ? -16 : 16;
      const x = side + (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 46;
      const z = (Math.random() - 0.5) * 18;
      return { x, y, z };
    }, 0x39ff14, 46000, 2.2);
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
      { key: 'piston', buildFn: () => this.buildCADPiston(0x39ff14), x: -360 },
      { key: 'conrod', buildFn: () => this.buildCADConrod(0x00f0ff), x: -240 },
      { key: 'crankshaft', buildFn: () => this.buildCADCrankshaft(0xffaa00), x: -120 },
      { key: 'cylinder', buildFn: () => this.buildCADCylinder(0x00f0ff), x: 0 },
      { key: 'head', buildFn: () => this.buildCADHead(0xff007f), x: 120 },
      { key: 'turbo', buildFn: () => this.buildCADTurbo(0x39ff14), x: 240 },
      { key: 'gear', buildFn: () => this.buildCADGear(0xffaa00), x: 360 }
    ];

    matParts.forEach(p => {
      const part = p.buildFn();
      part.position.set(p.x, -20, 0);
      part.userData.specKey = p.key;
      part.userData.isTrayItem = true;

      const pedGeo = new THREE.CylinderGeometry(35, 42, 5, 32);
      const pedMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true });
      const ped = new THREE.Mesh(pedGeo, pedMat);
      ped.position.set(p.x, -50, 0);
      this.componentsTrayGroup.add(ped);

      this.componentsTrayGroup.add(part);
      this.trayParts.push(part);
    });
  }

  // -----------------------------------------------------------
  // ZONE 03 SANDBOX MODULAR SPAWNER & MAGNETIC SNAPPING
  // -----------------------------------------------------------
  spawnSandboxPart(partType) {
    let newPart = null;

    if (partType === 'piston') {
      newPart = this.buildCADPiston(0x39ff14);
    } else if (partType === 'conrod') {
      newPart = this.buildCADConrod(0x00f0ff);
    } else if (partType === 'crankshaft') {
      newPart = this.buildCADCrankshaft(0xffaa00);
    } else if (partType === 'cylinder') {
      newPart = this.buildCADCylinder(0x00f0ff);
    } else if (partType === 'head') {
      newPart = this.buildCADHead(0xff007f);
    } else if (partType === 'spark_plug') {
      newPart = this.buildCADSparkPlug(0xffffff);
    } else if (partType === 'injector') {
      newPart = this.buildCADInjector(0xffaa00);
    } else if (partType === 'turbo') {
      newPart = this.buildCADTurbo(0x39ff14);
    } else if (partType === 'wire_threads' || partType === 'wire_harness') {
      newPart = this.buildCADWireLoom();
    } else if (partType === 'ecu_chip') {
      newPart = this.buildCADECU(0x39ff14);
    } else if (partType === 'gear') {
      newPart = this.buildCADGear(0xffaa00);
    } else if (partType === 'bearing') {
      newPart = this.buildCADBearing(0x00f0ff);
    } else if (partType === 'clutch') {
      newPart = this.buildCADClutch(0x39ff14);
    } else if (partType === 'exhaust') {
      newPart = this.buildCADExhaust(0xffaa00);
    } else {
      newPart = this.buildCADPiston(0x00f0ff);
    }

    const spawnX = (Math.random() - 0.5) * 160;
    const spawnY = (Math.random() - 0.5) * 80;
    newPart.position.set(spawnX, spawnY, 0);
    newPart.userData.isSandboxItem = true;
    newPart.userData.partType = partType;
    newPart.userData.specKey = partType;

    this.workspaceSandboxGroup.add(newPart);
    this.sandboxParts.push(newPart);
    audio.playAirClick();
    this.updateTelemetry(partType);
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

    // Direct Mouse Click-and-Drag Support for Sandbox Assembly (in addition to hands-free tracking)
    let isMouseDragging = false;
    this.canvas.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        this.testPartGrab(e.clientX, e.clientY);
        if (this.grabbedMesh) {
          isMouseDragging = true;
          this.controls.enabled = false;
        }
      }
    });

    window.addEventListener('mousemove', (e) => {
      if (isMouseDragging && this.grabbedMesh) {
        this.handlePartDrag(e.clientX, e.clientY);
      }
    });

    window.addEventListener('mouseup', () => {
      if (isMouseDragging) {
        if (this.grabbedMesh && this.currentZone === 3) {
          this.checkMagneticSnapping(this.grabbedMesh);
        }
        isMouseDragging = false;
        this.grabbedMesh = null;
        this.controls.enabled = true;
      }
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

    // Pulse active electrical signals along multi-thread wiring harnesses
    this.pulseClock += 0.008;
    this.harnessObjects.forEach(h => {
      if (h.userData && h.userData.strands) {
        h.userData.strands.forEach(s => {
          const curve = s.curve;
          const uvs = s.uvs;
          const count = s.count;
          const posAttr = s.mesh.geometry.attributes.position;
          for (let i = 0; i < count; i++) {
            uvs[i] = (uvs[i] + s.speed) % 1.0;
            const pt = curve.getPoint(uvs[i]);
            posAttr.setXYZ(i, pt.x, pt.y, pt.z);
          }
          posAttr.needsUpdate = true;
        });
      } else {
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
