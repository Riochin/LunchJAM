# app/routers/cafeteria_status.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..services.cafeteria_status import (
    get_current_visitors,
    create_cafeteria_status,
    update_cafeteria_status_from_visits,
    get_today_status
)
from ..database.database import get_db

router = APIRouter()

@router.get("/cafeteria-status")
def read_cafeteria_status(db: Session = Depends(get_db)):
    """最新の食堂の混雑状況を取得"""
    return get_current_visitors(db)

@router.get("/status")
def read_today_status(db: Session = Depends(get_db)):
    """今日の食堂の混雑状況履歴を取得"""
    status_list = get_today_status(db)
    return [
        {
            "timestamp": status.timestamp,
            "visitors": status.current_visitors
        }
        for status in status_list
    ]

@router.post("/cafeteria-status")
def add_cafeteria_status(current_visitors: int, db: Session = Depends(get_db)):
    """新しい混雑状況を登録"""
    return create_cafeteria_status(db, current_visitors)

@router.post("/cafeteria-status/update-from-visits")
def update_status_from_visits(db: Session = Depends(get_db)):
    """visitテーブルから食堂の混雑状況を更新"""
    return update_cafeteria_status_from_visits(db)
