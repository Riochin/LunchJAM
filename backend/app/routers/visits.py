# LunchJAM/backend/app/routers/visits.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.services.visit_service import check_in_out
from app.database.database import get_db

# リクエストモデルの定義
class VisitRequest(BaseModel):
    user_id: str

router = APIRouter(prefix="/visits", tags=["Visits"])

@router.post("/check-in-out")
def log_visit(request: VisitRequest, db: Session = Depends(get_db)):
    return check_in_out(request.user_id, db)
