from pydantic import BaseModel
from datetime import datetime

class PredictionBase(BaseModel):
    prediction_time: datetime
    expected_visitors: int

class PredictionCreate(PredictionBase):
    pass

class PredictionResponse(PredictionBase):
    id: int

    class Config:
        from_attributes = True
