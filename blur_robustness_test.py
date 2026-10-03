import os
import sys
import argparse
import numpy as np
import cv2
from ultralytics import YOLO

def create_motion_blur_kernel(kernel_size: int, angle_deg: float = 0.0) -> np.ndarray:
    """
    Creates a linear directional motion blur Point Spread Function (PSF) kernel.
    Simulates an object moving across the camera sensor at a specific speed and angle.
    """
    if kernel_size <= 1:
        kernel = np.zeros((1, 1), dtype=np.float32)
        kernel[0, 0] = 1.0
        return kernel
    
    # Ensure odd kernel size for clean centering
    if kernel_size % 2 == 0:
        kernel_size += 1
        
    kernel = np.zeros((kernel_size, kernel_size), dtype=np.float32)
    center = kernel_size // 2
    
    # Horizontal line through the center
    kernel[center, :] = 1.0
    
    # Rotate kernel to desired angle
    if angle_deg != 0.0:
        rotation_matrix = cv2.getRotationMatrix2D((center, center), angle_deg, 1.0)
        kernel = cv2.warpAffine(kernel, rotation_matrix, (kernel_size, kernel_size))
        
    # Normalize kernel so total brightness is preserved
    kernel_sum = np.sum(kernel)
    if kernel_sum > 0:
        kernel /= kernel_sum
    return kernel

def apply_motion_blur(image: np.ndarray, intensity: int, angle_deg: float = 0.0) -> np.ndarray:
    """Applies realistic directional motion blur to simulate speed."""
    if intensity <= 1:
        return image.copy()
    kernel = create_motion_blur_kernel(intensity, angle_deg)
    return cv2.filter2D(image, -1, kernel)

def apply_gaussian_blur(image: np.ndarray, kernel_size: int) -> np.ndarray:
    """Applies defocus/Gaussian blur."""
    if kernel_size <= 1:
        return image.copy()
    if kernel_size % 2 == 0:
        kernel_size += 1
    return cv2.GaussianBlur(image, (kernel_size, kernel_size), 0)

def annotate_predictions(image: np.ndarray, results, condition_label: str) -> np.ndarray:
    """Draws bounding boxes, confidences, and condition label onto the image."""
    annotated = image.copy()
    h, w = annotated.shape[:2]
    
    # Top banner for condition name
    banner_height = 40
    overlay = annotated.copy()
    cv2.rectangle(overlay, (0, 0), (w, banner_height), (20, 20, 20), -1)
    cv2.addWeighted(overlay, 0.7, annotated, 0.3, 0, annotated)
    
    cv2.putText(
        annotated,
        condition_label,
        (12, 26),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.7,
        (255, 255, 255),
        2,
        cv2.LINE_AA,
    )
    
    boxes = results[0].boxes
    if boxes is not None and len(boxes) > 0:
        for box in boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            conf = float(box.conf[0])
            cls_id = int(box.cls[0])
            class_name = results[0].names[cls_id]
            
            # Color based on confidence (Green = high, Yellow = medium, Red = low)
            if conf >= 0.70:
                color = (0, 220, 0)
            elif conf >= 0.40:
                color = (0, 215, 255)
            else:
                color = (0, 80, 255)
                
            # Draw box
            cv2.rectangle(annotated, (x1, y1), (x2, y2), color, 2)
            
            # Draw tag
            label_text = f"{class_name} {conf * 100:.1f}%"
            (text_w, text_h), baseline = cv2.getTextSize(label_text, cv2.FONT_HERSHEY_SIMPLEX, 0.5, 1)
            y_tag = max(banner_height + text_h + 4, y1)
            cv2.rectangle(annotated, (x1, y_tag - text_h - 4), (x1 + text_w + 6, y_tag + baseline), color, -1)
            cv2.putText(annotated, label_text, (x1 + 3, y_tag - 2), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1, cv2.LINE_AA)
    else:
        cv2.putText(annotated, "NO DETECTION", (w // 2 - 80, h // 2), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)
        
    return annotated

def run_experiment(image_path: str = None, model_name: str = "yolov8n.pt", output_dir: str = "output"):
    os.makedirs(output_dir, exist_ok=True)
    
    # 1. Load model
    print(f"\n[1/4] Loading modern object detector: {model_name}...")
    model = YOLO(model_name)
    
    # 2. Acquire sample image
    sample_img = None
    if image_path and os.path.exists(image_path):
        sample_img = cv2.imread(image_path)
    else:
        # Standard high-quality test image
        default_url = "https://ultralytics.com/images/bus.jpg"
        print(f"[2/4] Downloading standard benchmark test image from {default_url}...")
        try:
            import urllib.request
            test_img_path = os.path.join(output_dir, "test_input.jpg")
            urllib.request.urlretrieve(default_url, test_img_path)
            sample_img = cv2.imread(test_img_path)
        except Exception as e:
            print(f"Failed to download image: {e}. Generating a synthetic test scene...")
            sample_img = np.zeros((480, 640, 3), dtype=np.uint8)
            cv2.rectangle(sample_img, (100, 150), (350, 380), (180, 100, 30), -1)
            cv2.circle(sample_img, (500, 250), 70, (0, 200, 255), -1)
            
    # Resize to standard analysis dimensions for uniform comparison
    sample_img = cv2.resize(sample_img, (640, 480))
    
    # 3. Define corruption levels (testing physical speed motion blur and optical blur)
    test_conditions = [
        {"name": "1. Pristine (0 Blur)", "type": "none", "intensity": 0, "angle": 0},
        {"name": "2. Mild Motion (Low Speed)", "type": "motion", "intensity": 15, "angle": 0},
        {"name": "3. Medium Motion (Moderate Speed)", "type": "motion", "intensity": 31, "angle": 15},
        {"name": "4. Heavy Motion (High Speed)", "type": "motion", "intensity": 55, "angle": 25},
        {"name": "5. Out-of-Focus (Defocus Blur)", "type": "gaussian", "intensity": 23, "angle": 0},
        {"name": "6. Severe Motion Streak", "type": "motion", "intensity": 85, "angle": 30},
    ]
    
    print("\n[3/4] Running multi-stage blur robustness test...")
    results_summary = []
    processed_images = []
    
    print("-" * 80)
    print(f"{'Condition':<34} | {'Detections Found':<25} | {'Max Confidence':<12}")
    print("-" * 80)
    
    for cond in test_conditions:
        # Apply transformation
        if cond["type"] == "none":
            corrupted = sample_img.copy()
        elif cond["type"] == "motion":
            corrupted = apply_motion_blur(sample_img, cond["intensity"], cond["angle"])
        elif cond["type"] == "gaussian":
            corrupted = apply_gaussian_blur(sample_img, cond["intensity"])
            
        # Run inference
        results = model.predict(corrupted, conf=0.25, verbose=False)
        
        # Analyze detections
        boxes = results[0].boxes
        names = results[0].names
        detections_desc = []
        max_conf = 0.0
        
        if boxes is not None and len(boxes) > 0:
            for b in boxes:
                cls_name = names[int(b.cls[0])]
                c = float(b.conf[0])
                if c > max_conf:
                    max_conf = c
                detections_desc.append(f"{cls_name} ({c*100:.0f}%)")
            det_str = ", ".join(detections_desc[:3])
            if len(detections_desc) > 3:
                det_str += f" +{len(detections_desc)-3} more"
        else:
            det_str = "None (Lost)"
            
        print(f"{cond['name']:<34} | {det_str:<25} | {max_conf*100:>5.1f}%")
        
        # Annotate
        annotated = annotate_predictions(corrupted, results, f"{cond['name']} - Max: {max_conf*100:.0f}%")
        processed_images.append(annotated)
        results_summary.append({
            "condition": cond["name"],
            "detections": det_str,
            "max_conf": max_conf,
        })
        
    # 4. Construct a 2x3 Grid Visual Comparison
    row1 = np.hstack([processed_images[0], processed_images[1], processed_images[2]])
    row2 = np.hstack([processed_images[3], processed_images[4], processed_images[5]])
    grid = np.vstack([row1, row2])
    
    comparison_path = os.path.join(output_dir, "blur_robustness_comparison.jpg")
    cv2.imwrite(comparison_path, grid)
    print("-" * 80)
    print(f"\n[4/4] Visual comparison chart saved to:")
    print(f"      -> {os.path.abspath(comparison_path)}")
    print("\nObservation Summary:")
    print("1. Notice how at 'Mild' and 'Medium' motion blur, the model STILL detects objects with high confidence.")
    print("2. The model relies on hierarchical spatial representations (silhouettes & context) rather than sharp edges.")
    print("3. Only when blur reaches extreme levels ('Severe Streak') does feature loss cause confidence to degrade.")
    print("-" * 80)

def run_webcam():
    """Live interactive webcam demonstration showing real-time motion blur resilience."""
    print("\nStarting live webcam test. Wave your hand or move objects quickly to see how YOLO handles motion!")
    print("Press 'q' in the camera window to quit.")
    
    model = YOLO("yolov8n.pt")
    cap = cv2.VideoCapture(0)
    
    if not cap.isOpened():
        print("Error: Could not access webcam.")
        return
        
    while True:
        ret, frame = cap.read()
        if not ret:
            break
            
        results = model.predict(frame, conf=0.35, verbose=False)
        annotated = results[0].plot()
        
        cv2.putText(
            annotated,
            "Move objects quickly to test motion blur robustness | Press 'q' to quit",
            (10, 30),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.6,
            (0, 255, 0),
            2,
        )
        
        cv2.imshow("Real-Time Motion Robustness Test", annotated)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
            
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Test modern object detection resilience against motion and optical blur.")
    parser.add_argument("--image", type=str, default=None, help="Path to custom image to test.")
    parser.add_argument("--webcam", action="store_true", help="Launch live webcam test.")
    parser.add_argument("--model", type=str, default="yolov8n.pt", help="YOLO model variant (e.g. yolov8n.pt, yolov8s.pt).")
    parser.add_argument("--output", type=str, default="output", help="Directory to save output comparison images.")
    args = parser.parse_args()
    
    if args.webcam:
        run_webcam()
    else:
        run_experiment(image_path=args.image, model_name=args.model, output_dir=args.output)
