from pydantic import BaseModel
from datetime import datetime

class UserBase(BaseModel):
    firebase_uid: str
    name: str
    email: str

class UserCreate(UserBase):
    pass

class UserResponse(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
