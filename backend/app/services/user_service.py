from sqlalchemy.orm import Session
from app.database.models import User
from firebase_admin import auth
from app.services.qr_service import generate_qr

from fastapi import Depends, HTTPException, status, Header
from app.database.database import get_db

def get_or_create_user(db: Session, id_token: str):
    """FirebaseのIDトークンを検証し、ユーザーを取得または作成する"""
    try:
        decoded_token = auth.verify_id_token(id_token)
        firebase_uid = decoded_token.get("uid")
        email = decoded_token.get("email", "No Email")
        name = decoded_token.get("name", "No Name")  # デフォルト値を設定

        # DB内に同じ Firebase UID のユーザーがいるか確認
        user = db.query(User).filter(User.firebase_uid == firebase_uid).first()

        if user:
            return user  # すでに登録済みならそのまま返す

        # ユーザーがいない場合は新規作成
        new_user = User(firebase_uid=firebase_uid, email=email, name=name)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        generate_qr(str(new_user.id), db)  # QRコードを生成


        return new_user

    except Exception as e:
        print(f"Error verifying token: {e}")
        return None

def create_temp_user(db: Session, email: str, name: str, firebase_uid:str):
    """仮ユーザーを作成する"""
    try:
        new_user = User(firebase_uid=firebase_uid,email=email, name=name)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
    except Exception as e:
        print(f"Error creating temp user: {e}")
        return None

async def get_current_user(db: Session = Depends(get_db), authorization: str = Header(None)) -> User:
    """
    現在のユーザーを取得する関数
    """
    if not authorization or not authorization.startswith('Bearer '):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="認証トークンがありません",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = authorization.split(' ')[1]
    try:
        # Firebaseトークンを検証
        decoded_token = auth.verify_id_token(token)
        firebase_uid = decoded_token['uid']

        # データベースからユーザーを取得
        user = db.query(User).filter(User.firebase_uid == firebase_uid).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="ユーザーが見つかりません"
            )
        return user

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="無効なトークンです",
            headers={"WWW-Authenticate": "Bearer"},
        )
