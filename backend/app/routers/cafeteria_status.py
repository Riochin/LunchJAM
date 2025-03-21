 #LunchJAM/backend/app/routers/cafeteria_status.py
from datetime import datetime, timedelta
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from ..database.database import get_db
from ..database.models import CafeteriaStatus
from ..services.cafeteria_status import get_current_visitors, create_cafeteria_status, update_cafeteria_status_from_visits
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
@router.get("/cafeteria-status")
def read_cafeteria_status(db: Session = Depends(get_db)):
    # 最新の食堂の混雑状況を取得
    return get_current_visitors(db)
@router.post("/cafeteria-status")
def add_cafeteria_status(current_visitors: int, db: Session = Depends(get_db)):
    # 新しい混雑状況を登録
    return create_cafeteria_status(db, current_visitors)
@router.post("/cafeteria-status/update-from-visits")
def update_cafeteria_status(db: Session = Depends(get_db)):
    # visitテーブルのデータを使って食堂の混雑状況を更新
    return update_cafeteria_status_from_visits(db)