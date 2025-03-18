from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timedelta, timezone
from ..database import Base

class Visit(Base):
    # 日本標準時 (JST) を設定
    JST = timezone(timedelta(hours=9))

    __tablename__ = "visits"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    entry_time = Column(DateTime, default=lambda: datetime.now(Visit.JST), nullable=False)
    exit_time = Column(DateTime, nullable=True)

    user = relationship("User", back_populates="visits")
