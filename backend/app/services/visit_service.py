from datetime import datetime, timedelta, timezone
from sqlalchemy.orm import Session
from app.database.models import Visit

# 日本標準時 (JST) を設定
JST = timezone(timedelta(hours=9))

def check_in_out(user_id: str, db: Session):
    """ユーザーの入退室を管理する"""
    latest_visit = (
        db.query(Visit)
        .filter(Visit.user_id == user_id)  # ユーザーIDでフィルタリング
        .order_by(Visit.entry_time.desc())  # 入室時間の降順でソート
        .first()  # 最初の1件を取得
    )

    now = datetime.now(JST)

    if latest_visit and latest_visit.exit_time is None:
        # 退室処理
        entry_time_with_tz = latest_visit.entry_time.replace(tzinfo=JST)  # オフセット付きに変換
        if now - entry_time_with_tz > timedelta(hours=12):
            # 12時間以上経過している場合は新規入室として記録
            new_visit = Visit(user_id=user_id, entry_time=now)
            db.add(new_visit)
            db.commit()
            db.refresh(new_visit)
            return {"message": "新規入室しました", "entry_time": new_visit.entry_time}
        else:
            latest_visit.exit_time = now
            db.commit()
            return {"message": "退室しました", "exit_time": latest_visit.exit_time}
    
    # 新規入室
    new_visit = Visit(user_id=user_id, entry_time=now)
    db.add(new_visit)
    db.commit()
    db.refresh(new_visit)
    
    return {"message": "入室しました", "entry_time": new_visit.entry_time}
