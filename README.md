# Vision Systems & Robustness Suite

A computer vision suite featuring high-tech hand geometric wireframe tracking and deep learning blur/motion robustness benchmarking.

---

## 1. Hand Geometry Vision Tracker (`hand_geometry_tracker.py`)

A pure geometric representation system tracking all 5 fingers and the palm with **zero anatomical names/labels**.

### Features
* **5-Finger Structural Vectors**: Dual-tone vector lines tracing each finger from wrist to fingertip.
* **Palm Geometric Mesh**: Semi-transparent cyan/teal polygon plane with internal radial structural struts.
* **Palm Centroid Reticle**: Dynamic target crosshair tracking the mathematical center of the palm.
* **Dynamic Fingertip Envelope**: Dashed magenta polygon outlining the geometric boundary of all 5 fingertips.
* **Concentric Joint Nodes**: Precision reticles on all 21 hand landmarks.
* **Zero Anatomical Text**: Clean, futuristic sci-fi wireframe HUD without cluttered text labels.

### Controls (Live Webcam)
| Key | Action |
| :---: | :--- |
| `d` | Toggle **Dark Cyberpunk Wireframe** mode (black background with glowing vectors) |
| `h` | Toggle **Geometric Outer Convex Hull** |
| `q` | Quit camera window |

### How to Run
```powershell
.venv\Scripts\python.exe hand_geometry_tracker.py
```
*(Optionally run directly in dark mode: `.venv\Scripts\python.exe hand_geometry_tracker.py --dark`)*

---

## 2. Motion Blur Robustness Benchmark (`blur_robustness_test.py`)

Benchmarks modern object detectors (YOLOv8) across progressive degrees of real-world motion blur and optical defocus.

```powershell
# Run synthetic benchmark across 6 blur levels
.venv\Scripts\python.exe blur_robustness_test.py

# Test custom image
.venv\Scripts\python.exe blur_robustness_test.py --image "path\to\photo.jpg"
```