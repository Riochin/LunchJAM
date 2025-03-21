# LunchJAM/backend/app/routers/cafeteria_status.py
from datetime import datetime, timedelta
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from ..database.database import get_db
from ..database.models import CafeteriaStatus

router = APIRouter()

@router.get("/status", summary="食堂の混雑状況を取得")
def get_cafeteria_status(db: Session = Depends(get_db)):
    """今日の食堂の混雑状況を取得"""
    # 日本時間の今日の日付の開始時刻をUTCに変換
    jst_now = datetime.now() + timedelta(hours=9)
    jst_start_of_day = datetime(jst_now.year, jst_now.month, jst_now.day)
    utc_start_of_day = jst_start_of_day - timedelta(hours=9)

    recent_data = (
        db.query(CafeteriaStatus)
        .filter(CafeteriaStatus.timestamp >= utc_start_of_day)
        .order_by(CafeteriaStatus.timestamp.asc())  # 時系列順に並べ替え
        .all()
    )

    return [
        {
            "timestamp": status.timestamp,
            "visitors": status.current_visitors
        }
        for status in recent_data
    ]
