from pydantic import BaseModel
from typing import List, Optional

class ProjectBase(BaseModel):
    title: str
    description: str
    image: Optional[str] = None
    tags: Optional[List[str]] = None
    live_url: Optional[str] = None
    github_url: Optional[str] = None
    featured: Optional[str] = "false"
    order_index: Optional[int] = 0

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    image: Optional[str] = None
    tags: Optional[List[str]] = None
    live_url: Optional[str] = None
    github_url: Optional[str] = None
    featured: Optional[str] = None
    order_index: Optional[int] = None

class Project(ProjectBase):
    id: int
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

    class Config:
        from_attributes = True
