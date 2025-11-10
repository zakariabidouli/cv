from sqlalchemy import Column, Integer, String, Text, JSON
from app.core.database import Base

class Experience(Base):
    __tablename__ = "experiences"

    id = Column(Integer, primary_key=True, index=True)
    role = Column(String(200), nullable=False)  # Job title/role
    company = Column(String(200), nullable=False)  # Company name
    period = Column(String(100), nullable=False)  # e.g., "2023 - Present"
    start_date = Column(String(50), nullable=True)  # Start date for sorting
    end_date = Column(String(50), nullable=True)  # End date (null if current)
    description = Column(Text, nullable=False)  # Job description
    tags = Column(JSON, nullable=True)  # Technologies/skills used as JSON array
    order_index = Column(Integer, default=0)  # For custom ordering
    created_at = Column(String(50), nullable=True)
    updated_at = Column(String(50), nullable=True)

