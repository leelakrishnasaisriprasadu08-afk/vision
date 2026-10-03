"""
Hand Geometry Vision System
Pure geometric representation of hand detection (palm and all 5 fingers).
Zero anatomical names - pure geometric wireframes, vectors, polygons, and dynamic envelopes.
"""

import os
import sys
import time
import argparse
import numpy as np
import cv2

# Colors (BGR) - Modern Neon Aesthetic
COLOR_CYAN = (255, 230, 0)          # Electric Cyan
COLOR_NEON_GREEN = (50, 255, 100)    # High-vis Neon Green
COLOR_MAGENTA = (255, 0, 220)       # Dynamic Magenta
COLOR_ORANGE = (0, 165, 255)        # Glowing Amber
COLOR_AZURE = (255, 120, 0)         # Deep Blue/Azure
COLOR_WHITE = (255, 255, 255)
COLOR_PALM_FILL = (40, 180, 240)    # Translucent teal mesh

# Finger skeletal topologies (Landmark indices)
# 0: Wrist
# 1-4: Digit 1 (Thumb)
# 5-8: Digit 2 (Index)
# 9-12: Digit 3 (Middle)
# 13-16: Digit 4 (Ring)
# 17-20: Digit 5 (Pinky)
FINGER_CHAINS = [
    [0, 1, 2, 3, 4],       # Digit 1
    [0, 5, 6, 7, 8],       # Digit 2
    [0, 9, 10, 11, 12],    # Digit 3
    [0, 13, 14, 15, 16],   # Digit 4
    [0, 17, 18, 19, 20],   # Digit 5
]

# Palm base polygon indices
PALM_LOOP = [0, 1, 5, 9, 13, 17]
PALM_KNUCKLE_BRIDGE = [5, 9, 13, 17]
FINGERTIP_IDS = [4, 8, 12, 16, 20]

def draw_dashed_polygon(img, pts, color, thickness=1, dash_len=8):
    """Draws a dashed geometric polygon linking a sequence of 2D points."""
    num_pts = len(pts)
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

def render_hand_geometry(canvas: np.ndarray, landmarks_px: list, show_hull: bool = True):
    """
    Renders pure geometric representation of a detected hand:
    - Translucent palm polygon & internal structural struts
    - Dual-tone finger bone vectors for all 5 fingers
    - Dynamic fingertip geometric envelope polygon
    - Articulation nodes & concentric reticles
    - Outer geometric convex hull
    """
    overlay = canvas.copy()
    pts = np.array(landmarks_px, dtype=np.int32)
    
    # 1. Palm Geometric Polygon & Translucent Mesh Fill
    palm_pts = np.array([landmarks_px[i] for i in PALM_LOOP], dtype=np.int32)
    cv2.fillPoly(overlay, [palm_pts], COLOR_PALM_FILL)
    cv2.addWeighted(overlay, 0.25, canvas, 0.75, 0, canvas)
    
    # Palm polygon perimeter
    cv2.polylines(canvas, [palm_pts], isClosed=True, color=COLOR_CYAN, thickness=2, lineType=cv2.LINE_AA)
    
    # Knuckle bridge (structural arch across metacarpals)
    knuckle_pts = [landmarks_px[i] for i in PALM_KNUCKLE_BRIDGE]
    for i in range(len(knuckle_pts) - 1):
        cv2.line(canvas, knuckle_pts[i], knuckle_pts[i + 1], COLOR_CYAN, 1, cv2.LINE_AA)
        
    # Internal palm radial struts (wrist to knuckle joints)
    wrist = landmarks_px[0]
    for k_idx in [5, 9, 13, 17]:
        cv2.line(canvas, wrist, landmarks_px[k_idx], (160, 160, 160), 1, cv2.LINE_AA)
        
    # 2. Geometric Center of Palm (Centroid Reticle)
    palm_cx = int(np.mean([landmarks_px[i][0] for i in PALM_LOOP]))
    palm_cy = int(np.mean([landmarks_px[i][1] for i in PALM_LOOP]))
    draw_reticle(canvas, (palm_cx, palm_cy), radius=10, color=COLOR_ORANGE)
    
    # 3. Dynamic Fingertip Geometric Envelope (Polygon linking the 5 tips)
    tip_pts = [landmarks_px[i] for i in FINGERTIP_IDS]
    draw_dashed_polygon(canvas, tip_pts, color=COLOR_MAGENTA, thickness=1, dash_len=8)
    
    # 4. Finger Bone Vectors for all 5 Fingers
    finger_colors = [
        COLOR_NEON_GREEN, # Digit 1
        COLOR_CYAN,       # Digit 2
        COLOR_CYAN,       # Digit 3
        COLOR_CYAN,       # Digit 4
        COLOR_NEON_GREEN, # Digit 5
    ]
    
    for finger_idx, chain in enumerate(FINGER_CHAINS):
        f_color = finger_colors[finger_idx]
        for b in range(len(chain) - 1):
            p1 = landmarks_px[chain[b]]
            p2 = landmarks_px[chain[b + 1]]
            # Outer neon vector line
            cv2.line(canvas, p1, p2, f_color, 2, cv2.LINE_AA)
            # Inner white core line
            cv2.line(canvas, p1, p2, COLOR_WHITE, 1, cv2.LINE_AA)
            
    # 5. Joint Nodes & Reticles
    for idx, (x, y) in enumerate(landmarks_px):
        if idx in FINGERTIP_IDS:
            # Fingertips: Glow reticle
            cv2.circle(canvas, (x, y), 8, COLOR_MAGENTA, 1, cv2.LINE_AA)
            cv2.circle(canvas, (x, y), 4, COLOR_WHITE, -1, cv2.LINE_AA)
            cv2.circle(canvas, (x, y), 2, (0, 0, 0), -1, cv2.LINE_AA)
        elif idx == 0:
            # Wrist: Anchor node
            cv2.circle(canvas, (x, y), 9, COLOR_CYAN, 2, cv2.LINE_AA)
            cv2.circle(canvas, (x, y), 4, COLOR_WHITE, -1, cv2.LINE_AA)
        else:
            # Articulations: Precision nodes
            cv2.circle(canvas, (x, y), 5, COLOR_CYAN, 1, cv2.LINE_AA)
            cv2.circle(canvas, (x, y), 2, COLOR_WHITE, -1, cv2.LINE_AA)
            
    # 6. Geometric Bounding Polygon (Convex Hull)
    if show_hull:
        hull = cv2.convexHull(pts)
        cv2.polylines(canvas, [hull], isClosed=True, color=(80, 80, 240), thickness=1, lineType=cv2.LINE_AA)

def initialize_landmarker(model_path="hand_landmarker.task", num_hands=2):
    """Initializes Google MediaPipe Tasks HandLandmarker, auto-downloading model if needed."""
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
        num_hands=num_hands,
        min_hand_detection_confidence=0.5,
        min_hand_presence_confidence=0.5,
        min_tracking_confidence=0.5,
    )
    return vision.HandLandmarker.create_from_options(options)

def process_frame(frame, landmarker, show_hull=True, dark_mode=False, fps=0.0):
    """Processes a frame, extracts hand landmarks, and renders geometric overlay."""
    import mediapipe as mp
    
    h, w = frame.shape[:2]
    
    if dark_mode:
        canvas = np.zeros_like(frame)
    else:
        canvas = frame.copy()
        
    # Convert BGR to RGB for MediaPipe
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb)
    
    detection_result = landmarker.detect(mp_image)
    
    hand_count = 0
    if detection_result.hand_landmarks:
        for hand_landmarks in detection_result.hand_landmarks:
            hand_count += 1
            landmarks_px = [
                (int(lm.x * w), int(lm.y * h))
                for lm in hand_landmarks
            ]
            render_hand_geometry(canvas, landmarks_px, show_hull=show_hull)
            
    # Render Sleek Geometric HUD (No anatomical names)
    hud = canvas.copy()
    cv2.rectangle(hud, (0, 0), (330, 68), (12, 12, 12), -1)
    cv2.addWeighted(hud, 0.75, canvas, 0.25, 0, canvas)
    
    cv2.putText(canvas, "GEOMETRIC VISION SYSTEM", (14, 22), cv2.FONT_HERSHEY_SIMPLEX, 0.55, COLOR_CYAN, 1, cv2.LINE_AA)
    status_str = f"STATUS: TRACKING ({hand_count} ACTIVE)" if hand_count > 0 else "STATUS: SCANNING..."
    status_color = COLOR_NEON_GREEN if hand_count > 0 else (180, 180, 180)
    cv2.putText(canvas, status_str, (14, 42), cv2.FONT_HERSHEY_SIMPLEX, 0.45, status_color, 1, cv2.LINE_AA)
    cv2.putText(canvas, f"FPS: {fps:.1f} | NODES: 21/HAND", (14, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.40, (200, 200, 200), 1, cv2.LINE_AA)
    
    return canvas

def run_webcam(show_hull=True, dark_mode=False):
    """Live interactive geometric hand tracking via webcam."""
    print("\n" + "=" * 65)
    print("  HAND GEOMETRIC VISION SYSTEM ACTIVATED")
    print("  - Detects all 5 fingers and palm geometry")
    print("  - Pure geometric wireframe representation (no text labels)")
    print("  - Keyboard shortcuts:")
    print("      'd' -> Toggle Dark Cyberpunk Wireframe mode")
    print("      'h' -> Toggle Geometric Outer Convex Hull")
    print("      'q' -> Exit")
    print("=" * 65 + "\n")
    
    landmarker = initialize_landmarker()
    cap = cv2.VideoCapture(0)
    
    if not cap.isOpened():
        print("Error: Could not access webcam.")
        return
        
    is_dark = dark_mode
    is_hull = show_hull
    
    prev_time = time.time()
    fps = 0.0
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break
            
        # Flip horizontally for intuitive mirror experience
        frame = cv2.flip(frame, 1)
        
        # Calculate smooth FPS
        curr_time = time.time()
        fps = 0.9 * fps + 0.1 * (1.0 / max(curr_time - prev_time, 1e-4))
        prev_time = curr_time
        
        output = process_frame(frame, landmarker, show_hull=is_hull, dark_mode=is_dark, fps=fps)
        
        cv2.imshow("Hand Geometry Vision", output)
        key = cv2.waitKey(1) & 0xFF
        if key == ord('q'):
            break
        elif key == ord('d'):
            is_dark = not is_dark
        elif key == ord('h'):
            is_hull = not is_hull
            
    cap.release()
    cv2.destroyAllWindows()
    landmarker.close()

def run_image(image_path, output_path="output/hand_geometry_output.jpg", show_hull=True, dark_mode=False):
    """Processes a still photo and outputs geometric wireframe rendering."""
    img = cv2.imread(image_path)
    if img is None:
        print(f"Error: Unable to read image '{image_path}'")
        return
        
    landmarker = initialize_landmarker()
    output = process_frame(img, landmarker, show_hull=show_hull, dark_mode=dark_mode)
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    cv2.imwrite(output_path, output)
    print(f"Geometric rendering saved to: {output_path}")
    landmarker.close()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Hand Geometry Vision: Real-time 5-finger and palm geometric tracker.")
    parser.add_argument("--image", type=str, default=None, help="Process static image instead of webcam.")
    parser.add_argument("--dark", action="store_true", help="Start in Dark Cyberpunk wireframe mode.")
    parser.add_argument("--no-hull", action="store_true", help="Hide outer convex bounding hull.")
    parser.add_argument("--output", type=str, default="output/hand_geometry_output.jpg", help="Output path for image mode.")
    args = parser.parse_args()
    
    if args.image:
        run_image(args.image, output_path=args.output, show_hull=not args.no_hull, dark_mode=args.dark)
    else:
        run_webcam(show_hull=not args.no_hull, dark_mode=args.dark)
