from sqlalchemy import Column, Integer, DateTime
from datetime import datetime
from database.database import Base

class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    prediction_time = Column(DateTime, nullable=False)
    expected_visitors = Column(Integer, nullable=False)
