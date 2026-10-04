# Vision Systems & Robustness Suite

A computer vision suite featuring high-tech hand geometric wireframe tracking and deep learning blur/motion robustness benchmarking.

---

## 1. Hand & Finger Geometry Vision Tracker (`hand_geometry_tracker.py`)

A pure geometric representation system tracking all 5 fingers and the palm with **zero anatomical names/labels**, powered by a high-performance **Hybrid Vision Engine**.

### Key Upgrades
* **Recognizes Fingers Without Palm**: Standard models fail when the palm is hidden, cropped, or occluded. Our hybrid engine detects individual fingers and tips even when only fingers are in the frame!
* **High-FPS Architecture (35-60+ FPS on CPU)**:
  * Non-blocking `ThreadedCamera` reader decoupling camera I/O from inference.
  * MediaPipe Tasks `RunningMode.VIDEO` with temporal tracking cache (running at ~40 FPS instead of single-frame 15 FPS).
  * Optimized 640x480 resolution for low latency.
* **Pure Geometric Representation**:
  * **5-Finger Structural Vectors**: Dual-tone vector lines tracing each finger from base to tip.
  * **Palm Geometric Mesh**: Semi-transparent cyan/teal polygon plane with internal radial structural struts.
  * **Palm Centroid Reticle**: Dynamic target crosshair tracking the mathematical center of the palm.
  * **Dynamic Fingertip Envelope**: Dashed magenta polygon outlining the geometric boundary of all fingertips.
  * **Concentric Joint Reticles**: Precision rings on all tracked landmark nodes.
  * **Zero Anatomical Text**: Clean, futuristic sci-fi HUD without cluttered text labels.

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