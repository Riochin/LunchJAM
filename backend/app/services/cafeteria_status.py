# app/services/cafeteria_status.py
from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from datetime import datetime, timedelta, timezone
from ..database.models import CafeteriaStatus, Visit

# JSTタイムゾーンの設定
JST = timezone(timedelta(hours=9))

def get_current_visitors(db: Session):
    """最新の食堂の混雑状況を取得"""
    return db.query(CafeteriaStatus).order_by(CafeteriaStatus.timestamp.desc()).first()

def get_today_status(db: Session):
    """今日の食堂の混雑状況履歴を取得"""
    # 日本時間の今日の開始時刻をUTCに変換
    jst_now = datetime.now(JST)
    jst_start_of_day = datetime(jst_now.year, jst_now.month, jst_now.day, tzinfo=JST)
    utc_start_of_day = jst_start_of_day.astimezone(timezone.utc)

    return (
        db.query(CafeteriaStatus)
        .filter(CafeteriaStatus.timestamp >= utc_start_of_day)
        .order_by(CafeteriaStatus.timestamp.asc())
        .all()
    )

def create_cafeteria_status(db: Session, current_visitors: int):
    """新しい混雑状況を登録"""
    now_utc = datetime.now(timezone.utc)
    db_status = CafeteriaStatus(
        current_visitors=current_visitors,
        timestamp=now_utc
    )
    db.add(db_status)
    db.commit()
    db.refresh(db_status)
    return db_status

def update_cafeteria_status_from_visits(db: Session):
    """visitテーブルから現在の在室者数を計算して記録"""
    current_visitors_count = (
        db.query(func.count(Visit.user_id.distinct()))
        .filter(Visit.exit_time == None)
        .scalar()
    )
    return create_cafeteria_status(db, current_visitors_count)
