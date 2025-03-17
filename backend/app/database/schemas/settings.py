from pydantic import BaseModel

class SettingBase(BaseModel):
    key: str
    value: str

class SettingCreate(BaseModel):
    key: str
    value: str

class SettingResponse(SettingBase):
    id: int

    class Config:
        from_attributes = True
