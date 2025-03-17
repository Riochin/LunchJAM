from pydantic import BaseModel
from datetime import datetime

class VisitBase(BaseModel):
    user_id: int
    entry_time: datetime
    exit_time: datetime | None = None

class VisitCreate(VisitBase):
    pass

class VisitResponse(VisitBase):
    id: int

    class Config:
        from_attributes = True
