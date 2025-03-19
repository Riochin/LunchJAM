from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class UserBase(BaseModel):
    firebase_uid: str
    name: str
    email: str

class UserCreate(UserBase):
    hashed_qr_url: Optional[str] = None  # 追加

class UserResponse(UserBase):
    id: int
    created_at: datetime
    hashed_qr_url: Optional[str] = None

    class Config:
        from_attributes = True
