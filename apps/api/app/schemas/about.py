from pydantic import BaseModel
from typing import Optional

class AboutBase(BaseModel):
    section: str
    content: str
    order_index: Optional[int] = 0

class AboutCreate(AboutBase):
    pass

class AboutUpdate(BaseModel):
    section: Optional[str] = None
    content: Optional[str] = None
    order_index: Optional[int] = None

class About(AboutBase):
    id: int
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

    class Config:
        from_attributes = True


class StatBase(BaseModel):
    number: str
    label: str
    order_index: Optional[int] = 0

class StatCreate(StatBase):
    pass

class StatUpdate(BaseModel):
    number: Optional[str] = None
    label: Optional[str] = None
    order_index: Optional[int] = None

class Stat(StatBase):
    id: int
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

    class Config:
        from_attributes = True

