from pydantic import BaseModel
from datetime import datetime

class CafeteriaStatusBase(BaseModel):
    timestamp: datetime
    current_visitors: int

class CafeteriaStatusCreate(CafeteriaStatusBase):
    pass

class CafeteriaStatusResponse(CafeteriaStatusBase):
    id: int

    class Config:
        from_attributes = True
