from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.services.user_service import get_or_create_user
from pydantic import BaseModel

router = APIRouter()

class TokenData(BaseModel):
    token: str  # フロントから送られるFirebase IDトークン

@router.post("/register")
def register_user(data: TokenData, db: Session = Depends(get_db)):
    """FirebaseのIDトークンを検証し、ユーザーを取得または登録する"""
    user = get_or_create_user(db, data.token)

    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")

    return {"id": user.id, "firebase_uid": user.firebase_uid, "email": user.email, "name": user.name}
