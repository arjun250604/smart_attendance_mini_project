from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, Body, status
from pymongo.database import Database
from jose import JWTError
from .. import schemas
from ..database import get_db
from ..services.qr import generate_secure_qr_session, verify_qr_token
import datetime

router = APIRouter(prefix="/attendance", tags=["attendance"])

@router.post("/qr/generate", response_model=schemas.QRGenerateResponse)
def generate_qr(payload: schemas.QRGenerateRequest):
    """
    Called by the FacultyDashboard to mint a secure, time-expiring JWT QR string.
    """
    token = generate_secure_qr_session(payload.course_id, payload.duration_minutes)
    return {
        "token": token,
        "course_id": payload.course_id,
        "duration_minutes": payload.duration_minutes
    }

@router.post("/qr", response_model=schemas.AttendanceResponse)
def log_qr_attendance(token: str = Form(...), student_id: str = Form(...), db: Database = Depends(get_db)):
    """
    Called by the StudentDashboard when scanning a QR code token.
    Decodes the JWT verify expiration.
    """
    try:
        payload = verify_qr_token(token)
    except JWTError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="QR Code expired or invalid mathematically")
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
        
    course_id = payload.get("course_id")
    
    # Check if student already marked present for this session token (optional layer of security)
    # Mocking basic insert for now
    
    log = {
        "student_id": student_id,
        "course_id": course_id,
        "method": "qr",
        "status": "present",
        "timestamp": datetime.datetime.utcnow()
    }
    
    res = db["attendances"].insert_one(log)
    saved = db["attendances"].find_one({"_id": res.inserted_id})
    saved["_id"] = str(saved["_id"])
    return saved

@router.post("/face", response_model=schemas.AttendanceResponse)
def log_face_attendance(file: UploadFile = File(...), student_id: str = Form(...), db: Database = Depends(get_db)):
    log = {
        "student_id": student_id,
        "method": "face",
        "status": "present",
        "timestamp": datetime.datetime.utcnow()
    }
    res = db["attendances"].insert_one(log)
    saved = db["attendances"].find_one({"_id": res.inserted_id})
    saved["_id"] = str(saved["_id"])
    return saved

@router.get("/", response_model=list[schemas.AttendanceResponse])
def get_all_attendance(db: Database = Depends(get_db)):
    docs = list(db["attendances"].find())
    for d in docs:
        d["_id"] = str(d["_id"])
    return docs
