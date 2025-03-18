from fastapi import APIRouter
from app.services.qr_service import generate_qr

router = APIRouter(prefix="/qr", tags=["QR Code"])

@router.get("/generate-qr/{user_id}")
async def get_qr_code(user_id: str):
    return generate_qr(user_id)
