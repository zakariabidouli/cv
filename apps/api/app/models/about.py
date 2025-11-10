from sqlalchemy import Column, Integer, String, Text
from app.core.database import Base

class About(Base):
    __tablename__ = "about"

    id = Column(Integer, primary_key=True, index=True)
    section = Column(String(50), nullable=False, unique=True)  # e.g., "intro", "paragraph1", "paragraph2"
    content = Column(Text, nullable=False)  # Content text
    order_index = Column(Integer, default=0)
    created_at = Column(String(50), nullable=True)
    updated_at = Column(String(50), nullable=True)


class Stat(Base):
    __tablename__ = "stats"

    id = Column(Integer, primary_key=True, index=True)
    number = Column(String(50), nullable=False)  # e.g., "50+", "100%"
    label = Column(String(200), nullable=False)  # e.g., "Projects Completed"
    order_index = Column(Integer, default=0)
    created_at = Column(String(50), nullable=True)
    updated_at = Column(String(50), nullable=True)

