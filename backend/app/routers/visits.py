from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.services.visit_service import check_in_out
from app.database.database import get_db

router = APIRouter(prefix="/visits", tags=["Visits"])

@router.post("/check-in-out")
def log_visit(user_id: str, db: Session = Depends(get_db)):
    return check_in_out(user_id, db)
