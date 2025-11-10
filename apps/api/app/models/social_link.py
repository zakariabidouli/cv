from sqlalchemy import Column, Integer, String
from app.core.database import Base

class SocialLink(Base):
    __tablename__ = "social_links"

    id = Column(Integer, primary_key=True, index=True)
    platform = Column(String(50), nullable=False, unique=True)  # e.g., "github", "linkedin", "email"
    url = Column(String(500), nullable=False)  # Social media URL
    icon_name = Column(String(50), nullable=True)  # Icon identifier (e.g., "Github", "Linkedin")
    order_index = Column(Integer, default=0)
    created_at = Column(String(50), nullable=True)
    updated_at = Column(String(50), nullable=True)

