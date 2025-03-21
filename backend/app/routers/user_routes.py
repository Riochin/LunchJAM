from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.database.models import User  # Userモデルをインポート
from app.services.user_service import get_or_create_user, create_temp_user, get_current_user  # get_current_userを追加
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
    """FirebaseのIDトークンを検証し、ユーザーを取得または登録する"""
    user = get_or_create_user(db, data.token)

    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")

    return {
        "id": user.id,
        "firebase_uid": user.firebase_uid,
        "email": user.email,
        "name": user.name
    }

@router.post("/register-temp")
def register_temp_user(data: TempUserData, db: Session = Depends(get_db)):
    """仮ユーザーを登録する"""
    user = create_temp_user(db, data.email, data.name, data.firebase_uid)

    if not user:
        raise HTTPException(status_code=400, detail="User could not be created")

    return {
        "id": user.id,
        "email": user.email,
        "name": user.name,
        "firebase_uid": user.firebase_uid
    }

@router.get("/me", summary="現在のユーザー情報を取得", description="ログインしているユーザーの情報を取得します。")
def get_current_user_info(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    ログイン中のユーザー情報を取得するエンドポイント。
    """
    user = db.query(User).filter(User.firebase_uid == current_user.firebase_uid).first()

    if not user:
        raise HTTPException(status_code=404, detail="ユーザーが見つかりません")

    return {
        "id": user.id,
        "firebase_uid": user.firebase_uid,
        "name": user.name,
        "email": user.email,
        "points": user.points,  # ポイント機能がある場合
        "created_at": user.created_at,
        "last_visited_at": user.last_visited_at
    }
