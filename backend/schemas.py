from pydantic import BaseModel, Field
from datetime import datetime
from typing import List, Optional

# Custom validator subclass for MongoDB ObjectId mapping cleanly to PyDantic
class PyObjectId(str):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        return str(v)

# ---- Users ----
class UserBase(BaseModel):
    email: str
    name: str

class UserCreate(UserBase):
    password: str
    role: str = "student"

class UserResponse(UserBase):
    id: PyObjectId = Field(alias="_id")
    role: str
    profile_image_path: Optional[str] = None

    class Config:
        populate_by_name = True

# ---- Auth Tokens ----
class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

class TokenData(BaseModel):
    email: Optional[str] = None

# ---- Attendance ----
class AttendanceBase(BaseModel):
    method: str
    course_id: Optional[str] = None
    timestamp: Optional[datetime] = None
    status: str = "present"

class AttendanceCreate(AttendanceBase):
    student_id: str

class AttendanceResponse(AttendanceBase):
    id: PyObjectId = Field(alias="_id")
    student_id: str
    
    class Config:
        populate_by_name = True

# ---- QR Generation ----
class QRGenerateRequest(BaseModel):
    course_id: str
    duration_minutes: int = 10

class QRGenerateResponse(BaseModel):
    token: str
    course_id: str
    duration_minutes: int
