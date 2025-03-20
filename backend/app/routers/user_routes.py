from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.services.user_service import get_or_create_user, create_temp_user  # 仮ユーザー作成関数をインポート
from pydantic import BaseModel

router = APIRouter()

class TokenData(BaseModel):
    token: str  # フロントから送られるFirebase IDトークン

class TempUserData(BaseModel):
    email: str
    name: str
    firebase_uid: str

@router.post("/register")
def register_user(data: TokenData, db: Session = Depends(get_db)):
    # print(data)
    """FirebaseのIDトークンを検証し、ユーザーを取得または登録する"""
    user = get_or_create_user(db, data.token)

    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")

    return {"id": user.id, "firebase_uid": user.firebase_uid, "email": user.email, "name": user.name}

@router.post("/register-temp")
def register_temp_user(data: TempUserData, db: Session = Depends(get_db)):
    """仮ユーザーを登録する"""
    user = create_temp_user(db, data.email, data.name, data.firebase_uid)

    if not user:
        raise HTTPException(status_code=400, detail="User could not be created")

    return {"id": user.id, "email": user.email, "name": user.name, "firebase_uid": user.firebase_uid}
