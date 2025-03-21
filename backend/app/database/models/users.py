from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timedelta, timezone
from ..database import Base

class User(Base):
    # 日本標準時 (JST) を設定
    JST = timezone(timedelta(hours=9))

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    firebase_uid = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    hashed_qr_url = Column(String, nullable=True)

    points = Column(Integer, default=0)  # 追加: ポイントカラム
    last_visited_at = Column(DateTime(timezone=True), nullable=True)  # 追加: 最後の訪問日

    created_at = Column(DateTime(timezone=True), default=datetime.now(JST))

    visits = relationship("Visit", back_populates="user")
