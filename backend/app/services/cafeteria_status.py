# app/services/cafeteria_status.py
from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from datetime import datetime
from ..database.models import CafeteriaStatus, Visit

def get_current_visitors(db: Session):
    # 最新の食堂の混雑状況を取得
    return db.query(CafeteriaStatus).order_by(CafeteriaStatus.timestamp.desc()).first()

def create_cafeteria_status(db: Session, current_visitors: int):
    # 新しい混雑状況を登録
    db_status = CafeteriaStatus(current_visitors=current_visitors, timestamp=datetime.utcnow())
    db.add(db_status)
    db.commit()
    db.refresh(db_status)
    return db_status

def update_cafeteria_status_from_visits(db: Session):
    # `visit`テーブルから`exit_time`が`NULL`のレコードを取得し、その人数をカウント
    current_visitors_count = db.query(func.count(Visit.user_id.distinct())).filter(Visit.exit_time == None).scalar()

    # その人数を`cafeteria_status`テーブルに登録
    return create_cafeteria_status(db, current_visitors_count)
