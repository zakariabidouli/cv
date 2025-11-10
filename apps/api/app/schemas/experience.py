from pydantic import BaseModel
from typing import List, Optional

class ExperienceBase(BaseModel):
    role: str
    company: str
    period: str
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    description: str
    tags: Optional[List[str]] = None
    order_index: Optional[int] = 0

class ExperienceCreate(ExperienceBase):
    pass

class ExperienceUpdate(BaseModel):
    role: Optional[str] = None
    company: Optional[str] = None
    period: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    description: Optional[str] = None
    tags: Optional[List[str]] = None
    order_index: Optional[int] = None

class Experience(ExperienceBase):
    id: int
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

    class Config:
        from_attributes = True

