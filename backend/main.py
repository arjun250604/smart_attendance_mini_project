from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import auth, attendance

app = FastAPI(title="Smart Attendance API", description="Native MongoDB Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(attendance.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Native MongoDB Smart Attendance API!"}
