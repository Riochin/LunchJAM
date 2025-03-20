import qrcode
from fastapi import HTTPException, Depends
from fastapi.responses import Response
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.database.models.users import User
from fastapi.responses import JSONResponse
import os

def generate_qr(user_id: str, db: Session):
    """ユーザーIDを元にQRコードを生成し、保存場所のURLをDBに保存し、QR画像を返す"""

    # 1️⃣ QRコード生成
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(user_id)
    qr.make(fit=True)

    # 2️⃣ Pillowを使ってQRコードの画像を作成
    img = qr.make_image(fill="black", back_color="white")

    # 3️⃣ 保存場所を決める（例: サーバーのstaticフォルダ内に保存）
    file_path = f"static/qr_codes/{user_id}.png"
    os.makedirs(os.path.dirname(file_path), exist_ok=True)

    # 4️⃣ QRコード画像をサーバーに保存
    img.save(file_path)

    # 5️⃣ DBにQRコード画像のURLを保存（例: /static/qr_codes/user_id.png）
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.hashed_qr_url = f"/{file_path}"  # 画像のURLをデータベースに保存
    db.commit()

    # 6️⃣ QRコード画像を返す
    with open(file_path, "rb") as img_file:
        return Response(content=img_file.read(), media_type="image/png")


def get_qr(user_id: str, db: Session = Depends(get_db)):
    """ユーザーIDに対応するQRコードのURLを取得し、返す"""

    # ユーザーのQRコードURLをDBから取得
    user = db.query(User).filter(User.id == user_id).first()
    if not user or not user.hashed_qr_url:
        raise HTTPException(status_code=404, detail="QR code not found")

    return JSONResponse(content={"qr_url": user.hashed_qr_url})
