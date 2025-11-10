from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class SkillCategory(Base):
    __tablename__ = "skill_categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False, unique=True)  # e.g., "Frontend", "Backend"
    order_index = Column(Integer, default=0)  # For custom ordering
    created_at = Column(String(50), nullable=True)
    updated_at = Column(String(50), nullable=True)

    # Relationship to skills
    skills = relationship("Skill", back_populates="category", cascade="all, delete-orphan")


class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)  # Skill name
    category_id = Column(Integer, ForeignKey("skill_categories.id"), nullable=False)
    order_index = Column(Integer, default=0)  # For custom ordering within category
    created_at = Column(String(50), nullable=True)
    updated_at = Column(String(50), nullable=True)

    # Relationship to category
    category = relationship("SkillCategory", back_populates="skills")

