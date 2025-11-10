from sqlalchemy import Column, Integer, String, Text, JSON
from app.core.database import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    image = Column(String(500), nullable=True)  # Image URL/path
    tags = Column(JSON, nullable=True)  # Array of technology tags as JSON
    live_url = Column(String(500), nullable=True)  # Live demo URL
    github_url = Column(String(500), nullable=True)  # GitHub repository URL
    featured = Column(String(10), default="false")  # Whether to show in featured section
    order_index = Column(Integer, default=0)  # For custom ordering
    created_at = Column(String(50), nullable=True)  # Timestamp
    updated_at = Column(String(50), nullable=True)  # Timestamp
