import qrcode
from io import BytesIO
from fastapi import HTTPException
from fastapi.responses import Response

def generate_qr(user_id: str):
    """ユーザーIDを元にQRコードを生成し、PNG画像を返す"""
    qr = qrcode.make(user_id)
    img_buffer = BytesIO()
    qr.save(img_buffer, format="PNG")
    img_buffer.seek(0)
    return Response(content=img_buffer.getvalue(), media_type="image/png")
