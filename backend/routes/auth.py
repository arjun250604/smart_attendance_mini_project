from fastapi import APIRouter, Depends, HTTPException, status
from pymongo.database import Database
from .. import schemas
from ..database import get_db
from ..services.auth_utils import verify_password, get_password_hash, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES
from datetime import timedelta

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login", response_model=schemas.Token)
def login(request: schemas.UserCreate, db: Database = Depends(get_db)):
    user = db["users"].find_one({"email": request.email})
    
    # FOR DEMO PURPOSES: Auto-provision mocked database roles if email is correct
    if not user:
        if request.email in ["admin@smartattend.com", "teacher@smartattend.com", "student@smartattend.com"]:
            hashed_pw = get_password_hash(request.password)
            new_user = {
                "email": request.email,
                "hashed_password": hashed_pw,
                "name": request.email.split("@")[0].capitalize(),
                "role": request.role
            }
            res = db["users"].insert_one(new_user)
            user = db["users"].find_one({"_id": res.inserted_id})
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
            
    # Normally we verify password securely:
    if user and not verify_password(request.password, user["hashed_password"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password")
            
    if user.get("role") != request.role:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Role mismatch")

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["email"], "role": user["role"]}, expires_delta=access_token_expires
    )
    
    # Cast MongoDB ObjectId helper directly into _id so Pydantic picks it up
    user["_id"] = str(user["_id"])
    return {"access_token": access_token, "token_type": "bearer", "user": user}

@router.post("/register", response_model=schemas.UserResponse)
def register_user(user: schemas.UserCreate, db: Database = Depends(get_db)):
    db_user = db["users"].find_one({"email": user.email})
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
        
    hashed_password = get_password_hash(user.password)
    new_user = {
        "email": user.email,
        "hashed_password": hashed_password,
        "name": user.name,
        "role": user.role
    }
    
    res = db["users"].insert_one(new_user)
    saved_user = db["users"].find_one({"_id": res.inserted_id})
    saved_user["_id"] = str(saved_user["_id"])
    return saved_user
