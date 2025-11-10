from pydantic import BaseModel
from typing import Optional

class SocialLinkBase(BaseModel):
    platform: str
    url: str
    icon_name: Optional[str] = None
    order_index: Optional[int] = 0

class SocialLinkCreate(SocialLinkBase):
    pass

class SocialLinkUpdate(BaseModel):
    platform: Optional[str] = None
    url: Optional[str] = None
    icon_name: Optional[str] = None
    order_index: Optional[int] = None

class SocialLink(SocialLinkBase):
    id: int
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

    class Config:
        from_attributes = True

