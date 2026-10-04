"""
High-Performance Hand & Finger Geometry Vision System
Hybrid Architecture:
  1. Primary: MediaPipe Neural Hand Landmarker (RunningMode.VIDEO) with temporal tracking.
  2. Fallback: Adaptive Geometric Finger Extractor (Skin/Convexity/Defect Analysis)
     detects fingers even when palm is occluded, cropped, or not visible!
  3. Threaded asynchronous camera capture at optimized 640x480 resolution (35-60+ FPS).
  4. Zero anatomical names - pure geometric wireframes, vectors, reticles, and envelopes.
"""

import os
import sys
import time
import threading
import argparse
import numpy as np
import cv2

# Colors (BGR) - Futuristic Cyberpunk Aesthetic
COLOR_CYAN = (255, 230, 0)          # Electric Cyan
COLOR_NEON_GREEN = (50, 255, 100)    # High-vis Neon Green
COLOR_MAGENTA = (255, 0, 220)       # Dynamic Magenta
COLOR_ORANGE = (0, 165, 255)        # Glowing Amber
COLOR_AZURE = (255, 120, 0)         # Deep Azure
COLOR_WHITE = (255, 255, 255)
COLOR_PALM_FILL = (40, 180, 240)    # Translucent teal mesh

# Finger skeletal topologies for 21-point neural landmarker
FINGER_CHAINS = [
    [0, 1, 2, 3, 4],       # Digit 1 (Thumb)
    [0, 5, 6, 7, 8],       # Digit 2 (Index)
    [0, 9, 10, 11, 12],    # Digit 3 (Middle)
    [0, 13, 14, 15, 16],   # Digit 4 (Ring)
    [0, 17, 18, 19, 20],   # Digit 5 (Pinky)
]

PALM_LOOP = [0, 1, 5, 9, 13, 17]
PALM_KNUCKLE_BRIDGE = [5, 9, 13, 17]
FINGERTIP_IDS = [4, 8, 12, 16, 20]


class ThreadedCamera:
    """Non-blocking threaded webcam reader for maximum FPS throughput."""
    def __init__(self, src=0, width=640, height=480):
        self.cap = cv2.VideoCapture(src)
        # Force MJPG codec and optimal 640x480 resolution for high framerate
        self.cap.set(cv2.CAP_PROP_FOURCC, cv2.VideoWriter_fourcc(*'MJPG'))
        self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, width)
        self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, height)
        self.cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)
        
        self.ret, self.frame = self.cap.read()
        self.running = True
        self.lock = threading.Lock()
        self.thread = threading.Thread(target=self._update, daemon=True)
        self.thread.start()

    def _update(self):
        while self.running:
            ret, frame = self.cap.read()
            if ret:
                with self.lock:
                    self.ret = ret
                    self.frame = frame
            else:
                time.sleep(0.01)

    def read(self):
        with self.lock:
            return self.ret, self.frame.copy() if self.frame is not None else None

    def stop(self):
        self.running = False
        self.thread.join(timeout=1.0)
        self.cap.release()


def draw_dashed_polygon(img, pts, color, thickness=1, dash_len=8):
    """Draws a dashed geometric polygon linking a sequence of 2D points."""
    num_pts = len(pts)
    if num_pts < 2:
        return
    for i in range(num_pts):
        pt1 = np.array(pts[i], dtype=float)
        pt2 = np.array(pts[(i + 1) % num_pts], dtype=float)
        dist = np.linalg.norm(pt2 - pt1)
        if dist < 1e-3:
            continue
        num_dashes = max(1, int(dist / dash_len))
        for d in range(0, num_dashes, 2):
            start = pt1 + (pt2 - pt1) * (d / num_dashes)
            end = pt1 + (pt2 - pt1) * (min(d + 1, num_dashes) / num_dashes)
            cv2.line(img, tuple(start.astype(int)), tuple(end.astype(int)), color, thickness, cv2.LINE_AA)


def draw_reticle(img, center, radius, color):
    """Draws a precision geometric target crosshair/reticle at a point."""
    cx, cy = center
    cv2.circle(img, (cx, cy), radius, color, 1, cv2.LINE_AA)
    cv2.circle(img, (cx, cy), 2, color, -1, cv2.LINE_AA)
    arm = radius + 4
    cv2.line(img, (cx - arm, cy), (cx + arm, cy), color, 1, cv2.LINE_AA)
    cv2.line(img, (cx, cy - arm), (cx, cy + arm), color, 1, cv2.LINE_AA)


def render_full_neural_geometry(canvas: np.ndarray, landmarks_px: list, show_hull: bool = True):
    """Renders full 21-point hand geometry when full hand/palm is visible."""
    overlay = canvas.copy()
    pts = np.array(landmarks_px, dtype=np.int32)
    
    # 1. Palm Geometric Polygon & Translucent Mesh Fill
    palm_pts = np.array([landmarks_px[i] for i in PALM_LOOP], dtype=np.int32)
    cv2.fillPoly(overlay, [palm_pts], COLOR_PALM_FILL)
    cv2.addWeighted(overlay, 0.25, canvas, 0.75, 0, canvas)
    
    # Palm polygon perimeter
    cv2.polylines(canvas, [palm_pts], isClosed=True, color=COLOR_CYAN, thickness=2, lineType=cv2.LINE_AA)
    
    # Knuckle bridge
    knuckle_pts = [landmarks_px[i] for i in PALM_KNUCKLE_BRIDGE]
    for i in range(len(knuckle_pts) - 1):
        cv2.line(canvas, knuckle_pts[i], knuckle_pts[i + 1], COLOR_CYAN, 1, cv2.LINE_AA)
        
    # Internal palm radial struts
    wrist = landmarks_px[0]
    for k_idx in [5, 9, 13, 17]:
        cv2.line(canvas, wrist, landmarks_px[k_idx], (160, 160, 160), 1, cv2.LINE_AA)
        
    # 2. Geometric Center of Palm (Centroid Reticle)
    palm_cx = int(np.mean([landmarks_px[i][0] for i in PALM_LOOP]))
    palm_cy = int(np.mean([landmarks_px[i][1] for i in PALM_LOOP]))
    draw_reticle(canvas, (palm_cx, palm_cy), radius=10, color=COLOR_ORANGE)
    
    # 3. Dynamic Fingertip Geometric Envelope
    tip_pts = [landmarks_px[i] for i in FINGERTIP_IDS]
    draw_dashed_polygon(canvas, tip_pts, color=COLOR_MAGENTA, thickness=1, dash_len=8)
    
    # 4. Finger Bone Vectors for all 5 Fingers
    finger_colors = [COLOR_NEON_GREEN, COLOR_CYAN, COLOR_CYAN, COLOR_CYAN, COLOR_NEON_GREEN]
    for finger_idx, chain in enumerate(FINGER_CHAINS):
        f_color = finger_colors[finger_idx]
        for b in range(len(chain) - 1):
            p1 = landmarks_px[chain[b]]
            p2 = landmarks_px[chain[b + 1]]
            cv2.line(canvas, p1, p2, f_color, 2, cv2.LINE_AA)
            cv2.line(canvas, p1, p2, COLOR_WHITE, 1, cv2.LINE_AA)
            
    # 5. Joint Nodes & Reticles
    for idx, (x, y) in enumerate(landmarks_px):
        if idx in FINGERTIP_IDS:
            cv2.circle(canvas, (x, y), 8, COLOR_MAGENTA, 1, cv2.LINE_AA)
            cv2.circle(canvas, (x, y), 4, COLOR_WHITE, -1, cv2.LINE_AA)
            cv2.circle(canvas, (x, y), 2, (0, 0, 0), -1, cv2.LINE_AA)
        elif idx == 0:
            cv2.circle(canvas, (x, y), 9, COLOR_CYAN, 2, cv2.LINE_AA)
            cv2.circle(canvas, (x, y), 4, COLOR_WHITE, -1, cv2.LINE_AA)
        else:
            cv2.circle(canvas, (x, y), 5, COLOR_CYAN, 1, cv2.LINE_AA)
            cv2.circle(canvas, (x, y), 2, COLOR_WHITE, -1, cv2.LINE_AA)
            
    # 6. Geometric Bounding Polygon
    if show_hull:
        hull = cv2.convexHull(pts)
        cv2.polylines(canvas, [hull], isClosed=True, color=(80, 80, 240), thickness=1, lineType=cv2.LINE_AA)


def extract_fingers_without_palm(frame: np.ndarray):
    """
    Extracts individual finger structures when the palm is occluded, cropped, or not visible.
    Uses multi-color space skin segmentation and convexity defect geometric apex analysis.
    Returns: list of dicts [{'base': (x,y), 'tips': [(x,y), ...], 'contour': np.ndarray}]
    """
    h, w = frame.shape[:2]
    
    # 1. Dual-Space Skin & Foreground Segmentation
    ycrcb = cv2.cvtColor(frame, cv2.COLOR_BGR2YCrCb)
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    
    # YCrCb skin mask
    lower_ycrcb = np.array([0, 133, 77], dtype=np.uint8)
    upper_ycrcb = np.array([255, 175, 127], dtype=np.uint8)
    mask_ycrcb = cv2.inRange(ycrcb, lower_ycrcb, upper_ycrcb)
    
    # HSV skin mask
    lower_hsv = np.array([0, 30, 60], dtype=np.uint8)
    upper_hsv = np.array([25, 255, 255], dtype=np.uint8)
    mask_hsv = cv2.inRange(hsv, lower_hsv, upper_hsv)
    
    # Combined refined mask
    mask = cv2.bitwise_and(mask_ycrcb, mask_hsv)
    
    # Morphological filtering
    kernel_small = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    kernel_med = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel_small)
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel_med)
    
    # 2. Extract Foreground Contours
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if not contours:
        return []
        
    detected_finger_groups = []
    
    for cnt in contours:
        area = cv2.contourArea(cnt)
        if area < 1500:  # Ignore tiny artifacts
            continue
            
        hull = cv2.convexHull(cnt, returnPoints=False)
        if hull is None or len(hull) < 3:
            continue
            
        defects = cv2.convexityDefects(cnt, hull)
        candidate_tips = []
        valleys = []
        
        if defects is not None:
            for i in range(defects.shape[0]):
                s, e, f, d = defects[i, 0]
                start = cnt[s][0]
                end = cnt[e][0]
                far = cnt[f][0]
                
                # Check apex angle at the valley
                a = np.linalg.norm(end - start)
                b = np.linalg.norm(far - start)
                c = np.linalg.norm(end - far)
                
                if b > 1e-3 and c > 1e-3:
                    cos_angle = (b**2 + c**2 - a**2) / (2 * b * c)
                    angle = np.degrees(np.arccos(np.clip(cos_angle, -1.0, 1.0)))
                    
                    # Defect must be a deep valley between fingers
                    if angle <= 88 and d > 800:
                        valleys.append(tuple(far))
                        candidate_tips.append(tuple(start))
                        candidate_tips.append(tuple(end))
                        
        # Also include extreme contour points (topmost/leftmost/rightmost) if not already found
        topmost = tuple(cnt[cnt[:, :, 1].argmin()][0])
        candidate_tips.append(topmost)
        
        # 3. Cluster & Filter Fingertip Peaks (merge nearby points on the same finger tip)
        filtered_tips = []
        for pt in candidate_tips:
            # Check distance from existing filtered tips
            if not any(np.linalg.norm(np.array(pt) - np.array(existing)) < 28 for existing in filtered_tips):
                # Ensure the tip is not deep down at the boundary
                if pt[1] < h - 15:
                    filtered_tips.append(pt)
                    
        # Sort tips by x-coordinate (left to right)
        filtered_tips = sorted(filtered_tips, key=lambda p: p[0])[:5]
        
        if len(filtered_tips) > 0:
            # Calculate base anchor (center of the lowest points of contour)
            lowest_pts = sorted(cnt[:, 0], key=lambda p: p[1], reverse=True)[:max(5, len(cnt)//8)]
            base_x = int(np.mean([p[0] for p in lowest_pts]))
            base_y = int(np.mean([p[1] for p in lowest_pts]))
            
            detected_finger_groups.append({
                "base": (base_x, base_y),
                "tips": filtered_tips,
                "valleys": valleys,
                "contour": cnt,
            })
            
    return detected_finger_groups


def render_finger_only_geometry(canvas: np.ndarray, finger_groups: list, show_hull: bool = True):
    """
    Renders pure geometric representation when only fingers are visible without a palm.
    - Bone vector rays from base to each detected fingertip
    - Dynamic dashed envelope linking fingertips
    - Concentric precision target reticles on tips
    - Base structural line
    - Zero anatomical names!
    """
    for group in finger_groups:
        base = group["base"]
        tips = group["tips"]
        cnt = group["contour"]
        
        # 1. Base anchor marker
        cv2.circle(canvas, base, 7, COLOR_ORANGE, 2, cv2.LINE_AA)
        cv2.circle(canvas, base, 3, COLOR_WHITE, -1, cv2.LINE_AA)
        
        # 2. Bone Vector Rays to each detected finger
        for tip in tips:
            # Intermediate joint representation (mid-vector articulation node)
            mid = (int((base[0] + tip[0]) * 0.5), int((base[1] + tip[1]) * 0.5))
            
            # Vector lines
            cv2.line(canvas, base, tip, COLOR_CYAN, 2, cv2.LINE_AA)
            cv2.line(canvas, base, tip, COLOR_WHITE, 1, cv2.LINE_AA)
            
            # Articulation node
            cv2.circle(canvas, mid, 4, COLOR_CYAN, 1, cv2.LINE_AA)
            cv2.circle(canvas, mid, 2, COLOR_WHITE, -1, cv2.LINE_AA)
            
            # Fingertip Target Reticle
            cv2.circle(canvas, tip, 8, COLOR_MAGENTA, 1, cv2.LINE_AA)
            cv2.circle(canvas, tip, 4, COLOR_WHITE, -1, cv2.LINE_AA)
            cv2.circle(canvas, tip, 2, (0, 0, 0), -1, cv2.LINE_AA)
            draw_reticle(canvas, tip, radius=11, color=COLOR_NEON_GREEN)
            
        # 3. Dynamic Dashed Envelope connecting the fingertips
        if len(tips) >= 2:
            draw_dashed_polygon(canvas, tips, color=COLOR_MAGENTA, thickness=1, dash_len=8)
            
        # 4. Outer Hull if enabled
        if show_hull:
            hull = cv2.convexHull(cnt)
            cv2.polylines(canvas, [hull], isClosed=True, color=(80, 80, 240), thickness=1, lineType=cv2.LINE_AA)


def initialize_landmarker(model_path="hand_landmarker.task", num_hands=2):
    """Initializes MediaPipe Tasks HandLandmarker in VIDEO running mode for high-FPS tracking."""
    from mediapipe.tasks import python as mp_tasks
    from mediapipe.tasks.python import vision
    
    if not os.path.exists(model_path):
        print(f"Model file '{model_path}' not found. Downloading official model...")
        model_url = "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task"
        import requests
        resp = requests.get(model_url, timeout=30)
        with open(model_path, "wb") as f:
            f.write(resp.content)
        print("Model downloaded successfully.")
        
    base_options = mp_tasks.BaseOptions(model_asset_path=model_path)
    options = vision.HandLandmarkerOptions(
        base_options=base_options,
        running_mode=vision.RunningMode.VIDEO,
        num_hands=num_hands,
        min_hand_detection_confidence=0.45,
        min_hand_presence_confidence=0.45,
        min_tracking_confidence=0.45,
    )
    return vision.HandLandmarker.create_from_options(options)


def process_hybrid_frame(frame, landmarker, timestamp_ms, show_hull=True, dark_mode=False, fps=0.0):
    """
    Hybrid inference engine:
    1. Tries neural MediaPipe 21-point tracking in VIDEO mode (40-60 FPS).
    2. If no palm/hand is found, seamlessly switches to Geometric Finger Extractor
       so that fingers are recognized even when the palm is hidden!
    """
    import mediapipe as mp
    
    h, w = frame.shape[:2]
    canvas = np.zeros_like(frame) if dark_mode else frame.copy()
    
    # 1. Primary Engine: MediaPipe VIDEO Tracking
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb)
    detection_result = landmarker.detect_for_video(mp_image, timestamp_ms)
    
    neural_hands = 0
    if detection_result.hand_landmarks:
        for hand_lms in detection_result.hand_landmarks:
            neural_hands += 1
            landmarks_px = [(int(lm.x * w), int(lm.y * h)) for lm in hand_lms]
            render_full_neural_geometry(canvas, landmarks_px, show_hull=show_hull)
            
    # 2. Secondary Engine: Geometric Finger Extractor (Fallback when palm is absent or occluded)
    fallback_fingers_found = 0
    if neural_hands == 0:
        finger_groups = extract_fingers_without_palm(frame)
        if finger_groups:
            fallback_fingers_found = sum(len(g["tips"]) for g in finger_groups)
            render_finger_only_geometry(canvas, finger_groups, show_hull=show_hull)
            
    # 3. Geometric HUD (Zero Anatomical Names)
    hud = canvas.copy()
    cv2.rectangle(hud, (0, 0), (370, 72), (12, 12, 12), -1)
    cv2.addWeighted(hud, 0.75, canvas, 0.25, 0, canvas)
    
    cv2.putText(canvas, "HYBRID GEOMETRY VISION SYSTEM", (14, 22), cv2.FONT_HERSHEY_SIMPLEX, 0.55, COLOR_CYAN, 1, cv2.LINE_AA)
    
    if neural_hands > 0:
        status_str = f"STATUS: FULL GEOMETRY ({neural_hands} HANDS)"
        status_color = COLOR_NEON_GREEN
    elif fallback_fingers_found > 0:
        status_str = f"STATUS: FINGERS EXTRACTED ({fallback_fingers_found} TIPS)"
        status_color = COLOR_ORANGE
    else:
        status_str = "STATUS: SCANNING..."
        status_color = (180, 180, 180)
        
    cv2.putText(canvas, status_str, (14, 44), cv2.FONT_HERSHEY_SIMPLEX, 0.45, status_color, 1, cv2.LINE_AA)
    cv2.putText(canvas, f"FPS: {fps:.1f} | RESOLUTION: {w}x{h}", (14, 64), cv2.FONT_HERSHEY_SIMPLEX, 0.40, (200, 200, 200), 1, cv2.LINE_AA)
    
    return canvas


def run_webcam(show_hull=True, dark_mode=False):
    """Real-time threaded webcam pipeline targeting 35-60+ FPS."""
    print("\n" + "=" * 70)
    print("  HYBRID HAND & FINGER GEOMETRY VISION SYSTEM")
    print("  - Detects full hand when palm is visible")
    print("  - Detects ONLY FINGERS when palm is occluded or off-screen!")
    print("  - Threaded non-blocking capture (35-60+ FPS)")
    print("  - Pure geometric wireframe representation (no text labels)")
    print("  - Controls:")
    print("      'd' -> Toggle Dark Cyberpunk Wireframe mode")
    print("      'h' -> Toggle Geometric Outer Convex Hull")
    print("      'q' -> Exit")
    print("=" * 70 + "\n")
    
    landmarker = initialize_landmarker()
    cam = ThreadedCamera(src=0, width=640, height=480)
    
    time.sleep(0.5)  # Allow camera sensor to auto-expose
    ret, test_frame = cam.read()
    if not ret or test_frame is None:
        print("Error: Could not access webcam stream.")
        cam.stop()
        return
        
    is_dark = dark_mode
    is_hull = show_hull
    
    fps = 0.0
    prev_time = time.time()
    start_time = time.time()
    
    while True:
        ret, frame = cam.read()
        if not ret or frame is None:
            time.sleep(0.005)
            continue
            
        # Flip horizontally for natural mirror feel
        frame = cv2.flip(frame, 1)
        
        # Calculate smooth FPS
        curr_time = time.time()
        fps = 0.85 * fps + 0.15 * (1.0 / max(curr_time - prev_time, 1e-4))
        prev_time = curr_time
        
        # Current timestamp in ms for MediaPipe video mode
        timestamp_ms = int((curr_time - start_time) * 1000)
        
        output = process_hybrid_frame(
            frame,
            landmarker,
            timestamp_ms,
            show_hull=is_hull,
            dark_mode=is_dark,
            fps=fps,
        )
        
        cv2.imshow("Hand & Finger Geometry Vision", output)
        key = cv2.waitKey(1) & 0xFF
        if key == ord('q'):
            break
        elif key == ord('d'):
            is_dark = not is_dark
        elif key == ord('h'):
            is_hull = not is_hull
            
    cam.stop()
    cv2.destroyAllWindows()
    landmarker.close()


def run_image(image_path, output_path="output/hand_geometry_output.jpg", show_hull=True, dark_mode=False):
    """Processes a static image and outputs geometric wireframe rendering."""
    img = cv2.imread(image_path)
    if img is None:
        print(f"Error: Unable to read image '{image_path}'")
        return
        
    landmarker = initialize_landmarker()
    output = process_hybrid_frame(img, landmarker, timestamp_ms=0, show_hull=show_hull, dark_mode=dark_mode)
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    cv2.imwrite(output_path, output)
    print(f"Geometric rendering saved to: {output_path}")
    landmarker.close()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="High-FPS Hand and Finger Geometric Vision Tracker.")
    parser.add_argument("--image", type=str, default=None, help="Process static image instead of webcam.")
    parser.add_argument("--dark", action="store_true", help="Start in Dark Cyberpunk wireframe mode.")
    parser.add_argument("--no-hull", action="store_true", help="Hide outer convex bounding hull.")
    parser.add_argument("--output", type=str, default="output/hand_geometry_output.jpg", help="Output path for image mode.")
    args = parser.parse_args()
    
    if args.image:
        run_image(args.image, output_path=args.output, show_hull=not args.no_hull, dark_mode=args.dark)
    else:
        run_webcam(show_hull=not args.no_hull, dark_mode=args.dark)
