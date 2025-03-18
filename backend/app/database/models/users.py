from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime,timedelta,timezone
from ..database import Base

class User(Base):
    # 日本標準時 (JST) を設定
    JST = timezone(timedelta(hours=9))

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    firebase_uid = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    created_at = Column(DateTime, default=datetime.now(JST))

    visits = relationship("Visit", back_populates="user")
