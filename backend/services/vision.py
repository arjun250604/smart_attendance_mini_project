# import cv2
# from deepface import DeepFace
import os

def verify_face(live_image_path: str, baseline_image_path: str) -> bool:
    """
    Mock implementation of DeepFace verification.
    DeepFace.verify(img1_path=..., img2_path=...) returns an object with a 'verified' boolean.
    """
    # result = DeepFace.verify(img1_path=live_image_path, img2_path=baseline_image_path, model_name="VGG-Face")
    # return result["verified"]
    
    # FOR DEMO: Automatically return True if both files exist natively
    if os.path.exists(live_image_path) and os.path.exists(baseline_image_path):
        return True
    return False
