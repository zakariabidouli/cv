from pydantic import BaseModel
from typing import List, Optional

class SkillBase(BaseModel):
    name: str
    category_id: int
    order_index: Optional[int] = 0

class SkillCreate(SkillBase):
    pass

class SkillUpdate(BaseModel):
    name: Optional[str] = None
    category_id: Optional[int] = None
    order_index: Optional[int] = None

class Skill(SkillBase):
    id: int
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

    class Config:
        from_attributes = True


class SkillCategoryBase(BaseModel):
    name: str
    order_index: Optional[int] = 0

class SkillCategoryCreate(SkillCategoryBase):
    pass

class SkillCategoryUpdate(BaseModel):
    name: Optional[str] = None
    order_index: Optional[int] = None

class SkillCategory(SkillCategoryBase):
    id: int
    skills: Optional[List[Skill]] = []
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

    class Config:
        from_attributes = True

