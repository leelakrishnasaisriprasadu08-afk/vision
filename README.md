# Vision Systems & Robustness Suite

A computer vision suite featuring interactive holographic 3D machine examination, hand geometric wireframe tracking, and deep learning blur robustness benchmarking.

---

## 1. Holographic Machine & Component Examination Workspace (`machine_examination_workspace.py`)

A 3D spatial CAD examination and assembly environment driven by hand kinetics:

### The 3 Zones:
* **ZONE 1: MACHINES CATALOG** (`Key 1`): Complete multi-part assemblies (Turbofan Jet Engine, Planetary Gearbox, Robotic Actuator Arm). Spreading both hands continuously explodes the machine into its sub-parts!
* **ZONE 2: COMPONENTS TRAY** (`Key 2`): Modular mechanical parts tray (Spur Gears, Rotors, Shafts, Stators, Nozzles). Pinch to grab, examine, and extract individual parts.
* **ZONE 3: WORKSPACE SANDBOX** (`Key 3`): Interactive assembly sandbox to combine components, assemble custom machines, and dismantle parts in 3D space.

### Hand Gestures:
* **Two-Hand Expansion**: Pull both hands apart to continuously explode/disassemble the machine ($0\% \to 100\%$). Bring hands together to reassemble into the compact machine.
* **Index + Thumb Pinch**: Hysteresis-locked precision pinch (grab at $<28\text{px}$, drop at $>46\text{px}$). Hover over any part and pinch to grab and extract it in 3D.
* **Single Open Palm**: Moving your open hand orbits and rotates the 3D machine in space.

### How to Run:
```powershell
.venv\Scripts\python.exe machine_examination_workspace.py
```
*(Optionally launch directly in Dark Holographic mode: `.venv\Scripts\python.exe machine_examination_workspace.py --dark`)*

---

## 2. Hand & Finger Geometry Vision Tracker (`hand_geometry_tracker.py`)

Pure geometric representation system tracking all 5 fingers and palm with **zero anatomical names/labels**.
* **High-FPS Hybrid Engine**: Threaded non-blocking capture (35-60 FPS on CPU).
* **Finger Fallback**: Tracks fingers even when palm is occluded. Includes strict spatial exclusion for ceiling/curtains and face.
* **Controls**: `d` for dark mode, `h` for hull, `f` for fallback toggle, `q` to exit.

```powershell
.venv\Scripts\python.exe hand_geometry_tracker.py
```

---

## 3. Motion Blur Robustness Benchmark (`blur_robustness_test.py`)

Benchmarks modern object detectors (YOLOv8) across progressive degrees of real-world motion blur and optical defocus.

```powershell
.venv\Scripts\python.exe blur_robustness_test.py
```