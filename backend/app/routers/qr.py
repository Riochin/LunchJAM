from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.services.qr_service import generate_qr, get_qr
from app.database.database import get_db

router = APIRouter(prefix="/qr", tags=["QR Code"])

@router.get("/generate-qr/{user_id}", summary="QRコード生成", description="指定されたユーザーIDに基づいてQRコードを生成し、DBに保存します。")
def generate_qr_code(user_id: str, db: Session = Depends(get_db)):
    """
    ユーザーIDに基づいてQRコードを生成し、そのQRコードの保存先URLをDBに保存します。
    成功時にQRコード画像を返します。
    """
    try:
        return generate_qr(user_id, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"QRコードの生成に失敗しました: {str(e)}")

@router.get("/get-qr/{user_id}", summary="QRコード取得", description="指定されたユーザーIDに対応するQRコードのURLを返します。")
def get_qr_code(user_id: str, db: Session = Depends(get_db)):
    """
    ユーザーIDに対応するQRコードのURLを取得します。
    `hashed_qr_url` が存在しない場合は404エラーを返します。
    """
    try:
        return get_qr(user_id, db)
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"QRコードが見つかりません: {str(e)}")
