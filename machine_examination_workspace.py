"""
Spacious Holographic Machine & Component Examination Workspace
HD Expanded Workspace (960x540) with Dynamic Zoom & Minimalist HUD:
  - 2.5x larger workspace area for spacious component manipulation
  - Minimalist floating HUD mode (Toggle with 'Tab' or 'u') to reclaim 100% screen space
  - Dynamic 3D Zoom ('+' to zoom in, '-' to zoom out, '0' to reset)
  - 3 ZONES:
      1: Machines Catalog (Turbine, Gearbox, Robot Arm with 2-hand continuous explosion)
      2: Components Tray (Spacious modular parts bin)
      3: Assembly Sandbox (Free-form custom assembly)
  - High-precision neural tracking (40-60 FPS) with zero camera I/O lag
"""

import os
import sys
import time
import math
import threading
import argparse
import numpy as np
import cv2

# 1280x720 HD Widescreen Canvas Dimensions (Generous breathing room for parts & gestures)
CANVAS_W = 1280
CANVAS_H = 720

# Sci-Fi / CAD Color Palette (BGR)
COLOR_BG = (10, 13, 18)
COLOR_GRID = (20, 25, 34)
COLOR_CYAN = (255, 230, 0)
COLOR_NEON_GREEN = (50, 255, 100)
COLOR_MAGENTA = (255, 0, 220)
COLOR_ORANGE = (0, 165, 255)
COLOR_AZURE = (255, 140, 30)
COLOR_WHITE = (255, 255, 255)
COLOR_GRAY = (120, 130, 140)
COLOR_DARK_PANEL = (18, 22, 28)
COLOR_YELLOW = (0, 230, 255)


class ThreadedCamera:
    """Non-blocking threaded webcam reader for optimal 40-60 FPS performance."""
    def __init__(self, src=0, width=640, height=480):
        self.cap = cv2.VideoCapture(src)
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


# -------------------------------------------------------------
# 3D Math & Geometric Mesh Primitives
# -------------------------------------------------------------
def rotate_x(points, angle_rad):
    c, s = math.cos(angle_rad), math.sin(angle_rad)
    rot = np.array([[1, 0, 0], [0, c, -s], [0, s, c]], dtype=float)
    return points @ rot.T

def rotate_y(points, angle_rad):
    c, s = math.cos(angle_rad), math.sin(angle_rad)
    rot = np.array([[c, 0, s], [0, 1, 0], [-s, 0, c]], dtype=float)
    return points @ rot.T

def rotate_z(points, angle_rad):
    c, s = math.cos(angle_rad), math.sin(angle_rad)
    rot = np.array([[c, -s, 0], [s, c, 0], [0, 0, 1]], dtype=float)
    return points @ rot.T

def project_3d_to_2d(points_3d, origin_2d, scale=0.85, fov=520.0):
    """Perspective projection from 3D model space to 2D screen space with dynamic zoom."""
    ox, oy = origin_2d
    pts_2d = []
    depths = []
    for p in points_3d:
        z = p[2] + fov
        if z <= 10.0:
            z = 10.0
        factor = (fov / z) * scale
        x_2d = int(ox + p[0] * factor)
        y_2d = int(oy + p[1] * factor)
        pts_2d.append((x_2d, y_2d))
        depths.append(p[2])
    return pts_2d, depths


# Component Mesh Generators
def make_cylinder_lines(radius, length, segments=12):
    """Generates wireframe lines for an axial cylinder."""
    lines = []
    half_l = length / 2.0
    angles = np.linspace(0, 2 * np.pi, segments, endpoint=False)
    pts_r1 = [np.array([radius * math.cos(a), radius * math.sin(a), -half_l]) for a in angles]
    pts_r2 = [np.array([radius * math.cos(a), radius * math.sin(a), half_l]) for a in angles]
    for i in range(segments):
        lines.append((pts_r1[i], pts_r1[(i + 1) % segments]))
        lines.append((pts_r2[i], pts_r2[(i + 1) % segments]))
        if i % 2 == 0:
            lines.append((pts_r1[i], pts_r2[i]))
    return lines

def make_gear_lines(radius_outer, radius_inner, thickness, num_teeth=10):
    """Generates 3D wireframe lines for a toothed mechanical gear."""
    lines = []
    half_t = thickness / 2.0
    total_steps = num_teeth * 2
    angles = np.linspace(0, 2 * np.pi, total_steps, endpoint=False)
    pts_f = []
    pts_b = []
    for idx, a in enumerate(angles):
        r = radius_outer if (idx % 2 == 0) else radius_inner
        pts_f.append(np.array([r * math.cos(a), r * math.sin(a), -half_t]))
        pts_b.append(np.array([r * math.cos(a), r * math.sin(a), half_t]))
    for i in range(total_steps):
        lines.append((pts_f[i], pts_f[(i + 1) % total_steps]))
        lines.append((pts_b[i], pts_b[(i + 1) % total_steps]))
        lines.append((pts_f[i], pts_b[i]))
    bore_r = radius_inner * 0.4
    bore_angles = np.linspace(0, 2 * np.pi, 8, endpoint=False)
    bore_pts = [np.array([bore_r * math.cos(a), bore_r * math.sin(a), 0]) for a in bore_angles]
    for i in range(8):
        lines.append((bore_pts[i], bore_pts[(i + 1) % 8]))
    return lines

def make_rotor_fan_lines(radius, hub_radius, num_blades=8):
    """Generates 3D wireframe for an axial turbine rotor with angled fan blades."""
    lines = []
    hub_angles = np.linspace(0, 2 * np.pi, num_blades, endpoint=False)
    for a in hub_angles:
        p_hub = np.array([hub_radius * math.cos(a), hub_radius * math.sin(a), -10.0])
        p_tip1 = np.array([radius * math.cos(a + 0.15), radius * math.sin(a + 0.15), 15.0])
        p_tip2 = np.array([radius * math.cos(a + 0.28), radius * math.sin(a + 0.28), 5.0])
        lines.append((p_hub, p_tip1))
        lines.append((p_tip1, p_tip2))
        lines.append((p_tip2, p_hub))
    ring_pts = [np.array([hub_radius * math.cos(a), hub_radius * math.sin(a), 0]) for a in hub_angles]
    for i in range(num_blades):
        lines.append((ring_pts[i], ring_pts[(i + 1) % num_blades]))
    return lines

def make_cone_lines(base_r, length, segments=10):
    """Generates wireframe for an aerodynamic nose cone / nozzle."""
    lines = []
    angles = np.linspace(0, 2 * np.pi, segments, endpoint=False)
    apex = np.array([0, 0, length / 2.0])
    base_pts = [np.array([base_r * math.cos(a), base_r * math.sin(a), -length / 2.0]) for a in angles]
    for i in range(segments):
        lines.append((base_pts[i], base_pts[(i + 1) % segments]))
        lines.append((base_pts[i], apex))
    return lines


# -------------------------------------------------------------
# Component & Machine Data Model
# -------------------------------------------------------------
class Component:
    """Represents a standalone mechanical part that can be inspected, moved, or assembled."""
    def __init__(self, comp_id, name, mesh_type, params, default_pos, color=COLOR_CYAN):
        self.comp_id = comp_id
        self.name = name
        self.mesh_type = mesh_type
        self.params = params
        self.default_pos = np.array(default_pos, dtype=float)
        self.current_pos = np.array(default_pos, dtype=float)
        self.rotation = np.array([0.0, 0.0, 0.0], dtype=float)
        self.color = color
        self.is_grabbed = False
        self.is_hovered = False
        self.screen_center = (0, 0)
        self.screen_radius = 40
        self._build_mesh()

    def _build_mesh(self):
        if self.mesh_type == "cylinder":
            self.lines = make_cylinder_lines(*self.params)
        elif self.mesh_type == "gear":
            self.lines = make_gear_lines(*self.params)
        elif self.mesh_type == "rotor":
            self.lines = make_rotor_fan_lines(*self.params)
        elif self.mesh_type == "cone":
            self.lines = make_cone_lines(*self.params)
        else:
            self.lines = make_cylinder_lines(30, 40)

    def get_transformed_lines(self, global_rot, explosion_offset=np.array([0, 0, 0], dtype=float)):
        """Computes current 3D line segments transformed by rotation and position."""
        pos = self.current_pos + explosion_offset
        transformed = []
        for p1, p2 in self.lines:
            p1_t = rotate_x(p1, self.rotation[0])
            p1_t = rotate_y(p1_t, self.rotation[1])
            p1_t = rotate_z(p1_t, self.rotation[2]) + pos

            p2_t = rotate_x(p2, self.rotation[0])
            p2_t = rotate_y(p2_t, self.rotation[1])
            p2_t = rotate_z(p2_t, self.rotation[2]) + pos

            p1_g = rotate_y(rotate_x(p1_t, global_rot[0]), global_rot[1])
            p2_g = rotate_y(rotate_x(p2_t, global_rot[0]), global_rot[1])
            transformed.append((p1_g, p2_g))
        return transformed


class Machine:
    """A full mechanical assembly composed of multiple modular components."""
    def __init__(self, machine_id, name, explosion_axis="z"):
        self.machine_id = machine_id
        self.name = name
        self.explosion_axis = explosion_axis
        self.components = []

    def add_component(self, comp):
        self.components.append(comp)

    def get_exploded_offsets(self, factor):
        """Calculates axial separation offset with generous spatial spread."""
        offsets = {}
        num_comps = len(self.components)
        center_idx = (num_comps - 1) / 2.0
        max_spread = 220.0  # Generous separation distance
        
        for idx, comp in enumerate(self.components):
            dist_from_center = (idx - center_idx)
            disp = dist_from_center * max_spread * factor
            if self.explosion_axis == "z":
                offsets[comp.comp_id] = np.array([0.0, 0.0, disp])
            elif self.explosion_axis == "x":
                offsets[comp.comp_id] = np.array([disp, 0.0, 0.0])
            else:
                offsets[comp.comp_id] = np.array([0.0, disp, 0.0])
        return offsets


def build_machines_catalog():
    """Builds pre-assembled mechanical machines catalog."""
    # Machine 1: Turbofan Jet Engine
    turbine = Machine("turbine", "TURBOFAN JET ENGINE", explosion_axis="z")
    turbine.add_component(Component("t_cone", "Intake Cowl", "cone", (25, 45, 12), [0, 0, -110], COLOR_CYAN))
    turbine.add_component(Component("t_fan", "Wide-Chord Fan", "rotor", (65, 25, 10), [0, 0, -65], COLOR_NEON_GREEN))
    turbine.add_component(Component("t_comp", "LP Compressor", "gear", (55, 35, 20, 12), [0, 0, -20], COLOR_AZURE))
    turbine.add_component(Component("t_comb", "Combustion Core", "cylinder", (48, 45, 14), [0, 0, 30], COLOR_ORANGE))
    turbine.add_component(Component("t_turb", "HP Turbine Stage", "rotor", (58, 22, 12), [0, 0, 80], COLOR_MAGENTA))
    turbine.add_component(Component("t_nozzle", "Exhaust Nozzle", "cone", (40, 50, 12), [0, 0, 130], COLOR_WHITE))

    # Machine 2: Planetary Reduction Gearbox
    gearbox = Machine("gearbox", "PLANETARY GEARBOX", explosion_axis="z")
    gearbox.add_component(Component("g_shaft_in", "Input Drive Shaft", "cylinder", (14, 70, 8), [0, 0, -90], COLOR_WHITE))
    gearbox.add_component(Component("g_sun", "Sun Drive Gear", "gear", (32, 22, 18, 8), [0, 0, -40], COLOR_ORANGE))
    gearbox.add_component(Component("g_planet", "Planet Carrier Trio", "rotor", (55, 30, 3), [0, 0, 10], COLOR_NEON_GREEN))
    gearbox.add_component(Component("g_ring", "Internal Ring Gear", "gear", (68, 54, 25, 16), [0, 0, 60], COLOR_CYAN))
    gearbox.add_component(Component("g_shaft_out", "Output Coupling", "cylinder", (18, 60, 10), [0, 0, 110], COLOR_AZURE))

    # Machine 3: Robotic Actuator Joint
    actuator = Machine("actuator", "ROBOTIC ACTUATOR JOINT", explosion_axis="z")
    actuator.add_component(Component("r_base", "Base Turret Flange", "cylinder", (55, 25, 12), [0, 0, -80], COLOR_CYAN))
    actuator.add_component(Component("r_motor", "Brushless Stator", "gear", (48, 38, 35, 12), [0, 0, -30], COLOR_MAGENTA))
    actuator.add_component(Component("r_bearing", "Harmonic Reducer", "cylinder", (42, 20, 10), [0, 0, 25], COLOR_ORANGE))
    actuator.add_component(Component("r_arm", "Joint Pivot Yoke", "rotor", (50, 20, 4), [0, 0, 75], COLOR_NEON_GREEN))
    actuator.add_component(Component("r_clamp", "Output End-Effector", "cone", (30, 40, 8), [0, 0, 125], COLOR_WHITE))

    return [turbine, gearbox, actuator]


# -------------------------------------------------------------
# Hand Kinetic Controller & Hysteresis State Machine
# -------------------------------------------------------------
class KineticController:
    """Tracks 2-hand gestures, pinch-to-grab hysteresis, zoom, and kinetic smoothing."""
    def __init__(self):
        # 2-Hand distance smoothing (Explosion factor)
        self.raw_hand_dist = 0.0
        self.smooth_hand_dist = 220.0
        self.explosion_factor = 0.0
        self.min_dist = 140.0
        self.max_dist = 480.0

        # Dynamic 3D Zoom Scale (Defaults to 0.72 for generous spatial clearance)
        self.zoom_scale = 0.72

        # Pinch State Machine with Hysteresis
        self.pinch_grab_thresh = 32.0
        self.pinch_release_thresh = 52.0
        self.is_pinching = False
        self.pinch_pos_2d = (0, 0)
        self.grabbed_component = None

        # Single Hand Orbit
        self.global_rot = np.array([0.35, -0.45, 0.0], dtype=float)
        self.prev_palm_pos = None

    def update(self, hands_landmarks, active_components, screen_origin):
        """Processes hand landmarks to compute explosion, pinch grabbing, and rotation."""
        num_hands = len(hands_landmarks)

        # 1. Two-Hand Explosion Gesture
        if num_hands >= 2:
            w1 = np.array(hands_landmarks[0][0][:2], dtype=float)
            w2 = np.array(hands_landmarks[1][0][:2], dtype=float)
            dist = np.linalg.norm(w2 - w1)
            
            # EMA Smoothing
            self.smooth_hand_dist = 0.82 * self.smooth_hand_dist + 0.18 * dist
            norm_factor = np.clip((self.smooth_hand_dist - self.min_dist) / (self.max_dist - self.min_dist), 0.0, 1.0)
            self.explosion_factor = float(norm_factor)

        # 2. Precision Pinch-to-Grab State Machine
        pinch_detected = False
        active_pinch_pt = None

        for hand in hands_landmarks:
            thumb_tip = np.array(hand[4][:2], dtype=float)
            index_tip = np.array(hand[8][:2], dtype=float)
            p_dist = np.linalg.norm(index_tip - thumb_tip)
            p_center = tuple(((thumb_tip + index_tip) * 0.5).astype(int))

            if not self.is_pinching:
                if p_dist < self.pinch_grab_thresh:
                    self.is_pinching = True
                    self.pinch_pos_2d = p_center
                    active_pinch_pt = p_center
                    pinch_detected = True
                    break
            else:
                if p_dist < self.pinch_release_thresh:
                    self.pinch_pos_2d = p_center
                    active_pinch_pt = p_center
                    pinch_detected = True
                    break
                else:
                    self.is_pinching = False

        if not pinch_detected:
            self.is_pinching = False

        # Component Grabbing & Dragging
        if self.is_pinching and active_pinch_pt is not None:
            if self.grabbed_component is None:
                closest_comp = None
                closest_d = 999.0
                for comp in active_components:
                    sc = comp.screen_center
                    d = math.hypot(sc[0] - active_pinch_pt[0], sc[1] - active_pinch_pt[1])
                    if d < comp.screen_radius + 35 and d < closest_d:
                        closest_d = d
                        closest_comp = comp
                if closest_comp is not None:
                    self.grabbed_component = closest_comp
                    self.grabbed_component.is_grabbed = True
            else:
                ox, oy = screen_origin
                dx = (active_pinch_pt[0] - ox) * (1.0 / self.zoom_scale)
                dy = (active_pinch_pt[1] - oy) * (1.0 / self.zoom_scale)
                self.grabbed_component.current_pos[0] = dx
                self.grabbed_component.current_pos[1] = dy
        else:
            if self.grabbed_component is not None:
                self.grabbed_component.is_grabbed = False
                self.grabbed_component = None

        # 3. Single-Hand Orbit
        if num_hands == 1 and not self.is_pinching:
            palm_pos = np.array(hands_landmarks[0][9][:2], dtype=float)
            if self.prev_palm_pos is not None:
                delta = palm_pos - self.prev_palm_pos
                if np.linalg.norm(delta) < 50.0:
                    self.global_rot[1] += delta[0] * 0.007
                    self.global_rot[0] -= delta[1] * 0.007
            self.prev_palm_pos = palm_pos
        else:
            self.prev_palm_pos = None


# -------------------------------------------------------------
# Renderer & Workspace Views
# -------------------------------------------------------------
class MachineWorkspace:
    def __init__(self):
        self.machines = build_machines_catalog()
        self.active_machine_idx = 0
        self.current_zone = 1
        self.hud_mode = 0  # 0: Full HUD, 1: Minimalist Chip, 2: Zero HUD (Zen)
        self.camera_view_mode = 0  # 0: Corner PiP (uncluttered), 1: Hidden (Pure CAD), 2: Background Translucent
        self.loose_components = []
        self.init_loose_components()

    def init_loose_components(self):
        """Initializes modular parts for Zone 2 with generous horizontal clearance across 1280px."""
        self.loose_components = [
            Component("loose_gear", "Precision Spur Gear", "gear", (48, 32, 22, 12), [-380, -35, 0], COLOR_ORANGE),
            Component("loose_rotor", "High-Flow Fan Disk", "rotor", (58, 22, 10), [-190, -35, 0], COLOR_NEON_GREEN),
            Component("loose_nozzle", "Aero Exhaust Cowl", "cone", (36, 48, 10), [0, -35, 0], COLOR_CYAN),
            Component("loose_shaft", "Axial Drive Shaft", "cylinder", (16, 80, 10), [190, -35, 0], COLOR_WHITE),
            Component("loose_stator", "Magnetic Stator", "cylinder", (44, 34, 12), [380, -35, 0], COLOR_MAGENTA),
        ]

    def reset_active_machine(self):
        self.machines = build_machines_catalog()

    def render_3d_component(self, canvas, comp, origin_2d, global_rot, zoom_scale=0.85, explosion_offset=np.array([0, 0, 0])):
        """Projects and renders 3D lines for a single mechanical component."""
        lines_3d = comp.get_transformed_lines(global_rot, explosion_offset)
        all_pts_3d = []
        for p1, p2 in lines_3d:
            all_pts_3d.append(p1)
            all_pts_3d.append(p2)

        pts_2d, depths = project_3d_to_2d(all_pts_3d, origin_2d, scale=zoom_scale)
        
        if len(pts_2d) > 0:
            xs = [p[0] for p in pts_2d]
            ys = [p[1] for p in pts_2d]
            comp.screen_center = (int(np.mean(xs)), int(np.mean(ys)))
            comp.screen_radius = max(26, int(max(max(xs) - min(xs), max(ys) - min(ys)) * 0.45))

        color = comp.color
        thickness = 1
        if comp.is_grabbed:
            color = COLOR_NEON_GREEN
            thickness = 2
        elif comp.is_hovered:
            color = COLOR_YELLOW
            thickness = 2

        # Draw wireframe segments
        for i in range(0, len(pts_2d), 2):
            cv2.line(canvas, pts_2d[i], pts_2d[i + 1], color, thickness, cv2.LINE_AA)

        # Floating label tag
        cx, cy = comp.screen_center
        cv2.putText(canvas, comp.name.upper(), (cx - 40, cy + comp.screen_radius + 14),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.36, color, 1, cv2.LINE_AA)


# -------------------------------------------------------------
# Main Application Loop
# -------------------------------------------------------------
def run_examination_workspace(dark_mode=False):
    print("\n" + "=" * 75)
    print("  SPACIOUS HOLOGRAPHIC MACHINE & COMPONENT WORKSPACE (HD 960x540)")
    print("  - SPACE TO WORK: 2.5x larger HD canvas with full 3D zoom & pan")
    print("  - CONTROLS:")
    print("      'Tab' or 'u' -> Toggle Minimalist HUD (reclaims 100% space!)")
    print("      '+' / '-'    -> Dynamic 3D Zoom In / Zoom Out")
    print("      '0'          -> Reset Zoom to default (0.85x)")
    print("      '1', '2', '3'-> Switch Zone (Machines / Components / Sandbox)")
    print("      'r'          -> Reset assembly to dock")
    print("      'm'          -> Switch Machine model")
    print("      'd'          -> Toggle Dark Holographic CAD mode")
    print("      'q'          -> Exit")
    print("=" * 75 + "\n")

    from mediapipe.tasks import python as mp_tasks
    from mediapipe.tasks.python import vision
    import mediapipe as mp

    model_path = "hand_landmarker.task"
    if not os.path.exists(model_path):
        print(f"Downloading model {model_path}...")
        import requests
        url = "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task"
        resp = requests.get(url, timeout=30)
        with open(model_path, "wb") as f:
            f.write(resp.content)

    base_options = mp_tasks.BaseOptions(model_asset_path=model_path)
    options = vision.HandLandmarkerOptions(
        base_options=base_options,
        running_mode=vision.RunningMode.VIDEO,
        num_hands=2,
        min_hand_detection_confidence=0.35,
        min_hand_presence_confidence=0.35,
        min_tracking_confidence=0.35,
    )
    landmarker = vision.HandLandmarker.create_from_options(options)

    cam = ThreadedCamera(src=0, width=640, height=480)
    time.sleep(0.4)

    workspace = MachineWorkspace()
    controller = KineticController()

    is_dark = dark_mode
    fps = 0.0
    prev_time = time.time()
    start_time = time.time()

    # Create named window with full resize support
    window_name = "Spacious Holographic Machine Workspace"
    cv2.namedWindow(window_name, cv2.WINDOW_NORMAL)
    cv2.resizeWindow(window_name, CANVAS_W, CANVAS_H)

    while True:
        ret, frame = cam.read()
        if not ret or frame is None:
            time.sleep(0.005)
            continue

        frame = cv2.flip(frame, 1)
        cam_h, cam_w = frame.shape[:2]

        curr_time = time.time()
        fps = 0.85 * fps + 0.15 * (1.0 / max(curr_time - prev_time, 1e-4))
        prev_time = curr_time
        timestamp_ms = int((curr_time - start_time) * 1000)

        # ---------------------------------------------------------
        # Spacious 1280x720 Canvas & Camera Display Mode
        # Mode 0 (PiP): Clean CAD grid with discreet corner preview (Zero center clutter)
        # Mode 1 (Hidden): Pure CAD workspace (0% camera image, 100% space for 3D model)
        # Mode 2 (Background): Subtle translucent camera feed in background
        # ---------------------------------------------------------
        canvas = np.full((CANVAS_H, CANVAS_W, 3), COLOR_BG, dtype=np.uint8)

        # Subtle Blueprint Grid for CAD workspace depth
        grid_step = 64
        for gx in range(0, CANVAS_W, grid_step):
            cv2.line(canvas, (gx, 0), (gx, CANVAS_H), COLOR_GRID, 1)
        for gy in range(0, CANVAS_H, grid_step):
            cv2.line(canvas, (0, gy), (CANVAS_W, gy), COLOR_GRID, 1)

        if workspace.camera_view_mode == 2:
            # Mode 2: Translucent background video
            cam_bg = cv2.resize(frame, (CANVAS_W, CANVAS_H))
            canvas = cv2.addWeighted(cam_bg, 0.22, canvas, 0.78, 0)

        scale_x = CANVAS_W / float(cam_w)
        scale_y = CANVAS_H / float(cam_h)

        # ---------------------------------------------------------
        # Neural Hand Landmark Detection
        # ---------------------------------------------------------
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        mp_img = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb)
        results = landmarker.detect_for_video(mp_img, timestamp_ms)

        hands_landmarks_px = []
        if results.hand_landmarks:
            for hand in results.hand_landmarks:
                pts = [(int(lm.x * cam_w * scale_x), int(lm.y * cam_h * scale_y), lm.z) for lm in hand]
                hands_landmarks_px.append(pts)

                # Precision kinetic indicators on canvas
                thumb_tip = pts[4][:2]
                index_tip = pts[8][:2]
                wrist = pts[0][:2]
                cv2.circle(canvas, thumb_tip, 5, COLOR_MAGENTA, 1, cv2.LINE_AA)
                cv2.circle(canvas, index_tip, 5, COLOR_MAGENTA, 1, cv2.LINE_AA)
                cv2.circle(canvas, wrist, 6, COLOR_CYAN, 1, cv2.LINE_AA)
                cv2.line(canvas, thumb_tip, index_tip, (140, 160, 180), 1, cv2.LINE_AA)

        # Mode 0: Sleek Picture-in-Picture (PiP) Corner Thumbnail
        if workspace.camera_view_mode == 0:
            pip_w, pip_h = 220, 165
            pip_x = CANVAS_W - pip_w - 20
            pip_y = 52 if workspace.hud_mode == 0 else 18
            small_cam = cv2.resize(frame, (pip_w, pip_h))
            canvas[pip_y:pip_y + pip_h, pip_x:pip_x + pip_w] = small_cam
            cv2.rectangle(canvas, (pip_x, pip_y), (pip_x + pip_w, pip_y + pip_h), COLOR_CYAN, 1)
            cv2.putText(canvas, "LIVE CAMERA [C: TOGGLE]", (pip_x + 8, pip_y - 6),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.36, COLOR_CYAN, 1, cv2.LINE_AA)
            if results.hand_landmarks:
                for hand in results.hand_landmarks:
                    for idx_lm in [4, 8, 0]:
                        lm = hand[idx_lm]
                        px_pip = int(pip_x + lm.x * pip_w)
                        py_pip = int(pip_y + lm.y * pip_h)
                        cv2.circle(canvas, (px_pip, py_pip), 3, COLOR_MAGENTA, -1)

        # 3D Origin centered with ample breathing room
        origin_3d = (CANVAS_W // 2, CANVAS_H // 2 + 15)

        # Determine active components based on zone
        if workspace.current_zone == 1:
            active_machine = workspace.machines[workspace.active_machine_idx]
            active_comps = active_machine.components
        elif workspace.current_zone == 2:
            active_comps = workspace.loose_components
        else:
            active_machine = workspace.machines[workspace.active_machine_idx]
            active_comps = active_machine.components + workspace.loose_components

        # Update Kinetic State Machine
        controller.update(hands_landmarks_px, active_comps, origin_3d)

        # ---------------------------------------------------------
        # Render 3D Machine Assembly & Components
        # ---------------------------------------------------------
        if workspace.current_zone == 1 or workspace.current_zone == 3:
            active_machine = workspace.machines[workspace.active_machine_idx]
            offsets = active_machine.get_exploded_offsets(controller.explosion_factor)
            for comp in active_machine.components:
                off = offsets.get(comp.comp_id, np.array([0, 0, 0], dtype=float))
                workspace.render_3d_component(
                    canvas, comp, origin_3d, controller.global_rot,
                    zoom_scale=controller.zoom_scale, explosion_offset=off
                )

        if workspace.current_zone == 2 or workspace.current_zone == 3:
            for comp in workspace.loose_components:
                workspace.render_3d_component(
                    canvas, comp, origin_3d, controller.global_rot,
                    zoom_scale=controller.zoom_scale
                )

        # ---------------------------------------------------------
        # Pinch Reticle & Laser
        # ---------------------------------------------------------
        if controller.is_pinching:
            px, py = controller.pinch_pos_2d
            cv2.circle(canvas, (px, py), 12, COLOR_NEON_GREEN, 2, cv2.LINE_AA)
            cv2.circle(canvas, (px, py), 4, COLOR_WHITE, -1, cv2.LINE_AA)
            cv2.line(canvas, (px - 18, py), (px + 18, py), COLOR_NEON_GREEN, 1, cv2.LINE_AA)
            cv2.line(canvas, (px, py - 18), (px, py + 18), COLOR_NEON_GREEN, 1, cv2.LINE_AA)
            if controller.grabbed_component is not None:
                cv2.putText(canvas, f"LOCKED: {controller.grabbed_component.name}", (px + 16, py - 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.44, COLOR_NEON_GREEN, 1, cv2.LINE_AA)

        # ---------------------------------------------------------
        # Spacious HUD System (Full, Minimalist, or Zen Mode)
        # ---------------------------------------------------------
        if workspace.hud_mode == 0:
            # Mode 0: Full Sci-Fi Panels
            # Top Bar
            cv2.rectangle(canvas, (0, 0), (CANVAS_W, 44), (12, 14, 18), -1)
            cv2.line(canvas, (0, 44), (CANVAS_W, 44), (35, 45, 55), 1, cv2.LINE_AA)

            zones = [
                (1, "1. MACHINES CATALOG", workspace.current_zone == 1),
                (2, "2. COMPONENTS TRAY", workspace.current_zone == 2),
                (3, "3. WORKSPACE SANDBOX", workspace.current_zone == 3),
            ]
            btn_w = (CANVAS_W - 260) // 3
            for idx, (zid, ztitle, is_active) in enumerate(zones):
                x1 = idx * btn_w
                x2 = x1 + btn_w
                if is_active:
                    cv2.rectangle(canvas, (x1 + 6, 6), (x2 - 6, 38), (30, 40, 52), -1)
                    cv2.rectangle(canvas, (x1 + 6, 6), (x2 - 6, 38), COLOR_CYAN, 1)
                    cv2.putText(canvas, ztitle, (x1 + 24, 26), cv2.FONT_HERSHEY_SIMPLEX, 0.44, COLOR_CYAN, 1, cv2.LINE_AA)
                else:
                    cv2.putText(canvas, ztitle, (x1 + 24, 26), cv2.FONT_HERSHEY_SIMPLEX, 0.40, COLOR_GRAY, 1, cv2.LINE_AA)

            # Camera Mode Pill in Top Bar
            cam_mode_names = {0: "PIP CAM", 1: "CAM OFF", 2: "CAM BG"}
            cv2.putText(canvas, f"CAMERA: {cam_mode_names[workspace.camera_view_mode]} [C]", (CANVAS_W - 240, 26),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.38, COLOR_CYAN, 1, cv2.LINE_AA)

            # Bottom Bar
            cv2.rectangle(canvas, (0, CANVAS_H - 44), (CANVAS_W, CANVAS_H), (12, 14, 18), -1)
            cv2.line(canvas, (0, CANVAS_H - 44), (CANVAS_W, CANVAS_H - 44), (35, 45, 55), 1, cv2.LINE_AA)

            if workspace.current_zone == 1:
                active_m = workspace.machines[workspace.active_machine_idx]
                info_str = f"ACTIVE: {active_m.name} | EXPLODED: {controller.explosion_factor * 100:.0f}%"
            elif workspace.current_zone == 2:
                info_str = "COMPONENT TRAY: 5 MODULAR PARTS | PINCH TO EXTRACT & EXAMINE"
            else:
                info_str = "WORKSPACE SANDBOX: DRAG & SNAP PARTS FREELY"

            cv2.putText(canvas, info_str, (16, CANVAS_H - 18), cv2.FONT_HERSHEY_SIMPLEX, 0.42, COLOR_WHITE, 1, cv2.LINE_AA)
            cv2.putText(canvas, f"ZOOM: {controller.zoom_scale:.2f}x | FPS: {fps:.1f} | 'TAB' MINIMIZE | 'C' CAM MODE", (CANVAS_W - 440, CANVAS_H - 18),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.38, COLOR_CYAN, 1, cv2.LINE_AA)

        elif workspace.hud_mode == 1:
            # Mode 1: Minimalist Floating HUD Chip (Reclaims 100% of top/bottom space!)
            chip_bg = canvas.copy()
            cv2.rectangle(chip_bg, (12, 12), (340, 48), (12, 14, 18), -1)
            cv2.addWeighted(chip_bg, 0.8, canvas, 0.2, 0, canvas)
            cv2.rectangle(canvas, (12, 12), (340, 48), COLOR_CYAN, 1)

            zone_names = {1: "MACHINES CATALOG", 2: "COMPONENTS TRAY", 3: "WORKSPACE SANDBOX"}
            cv2.putText(canvas, f"ZONE: {zone_names[workspace.current_zone]}", (20, 28),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.38, COLOR_CYAN, 1, cv2.LINE_AA)
            cv2.putText(canvas, f"ZOOM: {controller.zoom_scale:.2f}x | {fps:.0f} FPS | 'TAB' RESTORE", (20, 42),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.32, COLOR_GRAY, 1, cv2.LINE_AA)
        
        # Mode 2 is Zen Mode: Zero HUD (cleanest workspace)

        # Continuous Explosion Gauge (When 2 hands active)
        if len(hands_landmarks_px) >= 2:
            bar_w = 180
            bar_x = (CANVAS_W - bar_w) // 2
            bar_y = 14 if workspace.hud_mode != 0 else 16
            cv2.rectangle(canvas, (bar_x, bar_y), (bar_x + bar_w, bar_y + 12), (25, 30, 40), -1)
            fill_w = int(bar_w * controller.explosion_factor)
            cv2.rectangle(canvas, (bar_x, bar_y), (bar_x + fill_w, bar_y + 12), COLOR_MAGENTA, -1)
            cv2.rectangle(canvas, (bar_x, bar_y), (bar_x + bar_w, bar_y + 12), COLOR_WHITE, 1)
            cv2.putText(canvas, f"EXP: {controller.explosion_factor * 100:.0f}%", (bar_x - 68, bar_y + 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.36, COLOR_MAGENTA, 1, cv2.LINE_AA)

        cv2.imshow(window_name, canvas)

        key = cv2.waitKey(1) & 0xFF
        if key == ord('q'):
            break
        elif key == 9 or key == ord('u') or key == ord('h'):  # Tab / u / h cycles HUD modes
            workspace.hud_mode = (workspace.hud_mode + 1) % 3
        elif key == ord('c') or key == ord('v'):  # c / v cycles camera views (PiP -> Hidden -> Background)
            workspace.camera_view_mode = (workspace.camera_view_mode + 1) % 3
        elif key == ord('+') or key == ord('='):
            controller.zoom_scale = min(1.8, controller.zoom_scale + 0.08)
        elif key == ord('-') or key == ord('_'):
            controller.zoom_scale = max(0.35, controller.zoom_scale - 0.08)
        elif key == ord('0'):
            controller.zoom_scale = 0.72
        elif key == ord('1'):
            workspace.current_zone = 1
        elif key == ord('2'):
            workspace.current_zone = 2
        elif key == ord('3'):
            workspace.current_zone = 3
        elif key == ord('m'):
            workspace.active_machine_idx = (workspace.active_machine_idx + 1) % len(workspace.machines)
        elif key == ord('r'):
            workspace.reset_active_machine()
            controller.explosion_factor = 0.0
        elif key == ord('d'):
            is_dark = not is_dark

    cam.stop()
    cv2.destroyAllWindows()
    landmarker.close()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Spacious Holographic Machine & Component Workspace.")
    parser.add_argument("--dark", action="store_true", help="Launch directly in Dark Holographic CAD mode.")
    args = parser.parse_args()
    run_examination_workspace(dark_mode=args.dark)
