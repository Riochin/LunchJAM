from sqlalchemy import Column, Integer, DateTime
from datetime import datetime
from ..database import Base

class CafeteriaStatus(Base):
    __tablename__ = "cafeteria_status"

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow, nullable=False)
    current_visitors = Column(Integer, nullable=False)
