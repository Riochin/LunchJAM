from datetime import datetime, timedelta, timezone
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.database.models import Visit, User

# 日本標準時 (JST) を設定
JST = timezone(timedelta(hours=9))

def check_in_out(user_id: str, db: Session):
    """ユーザーの入退室を管理し、1日1回のポイントを付与する"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    latest_visit = (
        db.query(Visit)
        .filter(Visit.user_id == user_id)
        .order_by(Visit.entry_time.desc())
        .first()
    )

    now = datetime.now(JST)

    # 1日の最初の訪問ならポイントを付与
    if not user.last_visited_at or user.last_visited_at.date() < now.date():
        user.points += 1
        user.last_visited_at = now

    if latest_visit and latest_visit.exit_time is None:
        # 退室処理
        entry_time_with_tz = latest_visit.entry_time.replace(tzinfo=JST)
        if now - entry_time_with_tz > timedelta(hours=12):
            # 12時間以上経過している場合は新規入室として記録
            new_visit = Visit(user_id=user_id, entry_time=now)
            db.add(new_visit)
            db.commit()
            db.refresh(new_visit)
            return {
                "message": "新規入室しました",
                "entry_time": new_visit.entry_time,
                "points": user.points
            }
        else:
            latest_visit.exit_time = now
            db.commit()
            return {
                "message": "退室しました",
                "exit_time": latest_visit.exit_time,
                "points": user.points
            }

    # 新規入室
    new_visit = Visit(user_id=user_id, entry_time=now)
    db.add(new_visit)
    db.commit()
    db.refresh(new_visit)

    return {
        "message": "入室しました",
        "entry_time": new_visit.entry_time,
        "points": user.points
    }
