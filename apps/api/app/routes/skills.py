from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.skill import Skill, SkillCategory
from app.schemas.skill import (
    Skill as SkillSchema, 
    SkillCreate, 
    SkillUpdate,
    SkillCategory as SkillCategorySchema,
    SkillCategoryCreate,
    SkillCategoryUpdate
)

router = APIRouter(prefix="/skills", tags=["Skills"])

# Skill Category Routes
@router.get("/categories", response_model=List[SkillCategorySchema])
def get_categories(db: Session = Depends(get_db)):
    """Get all skill categories with their skills"""
    from sqlalchemy.orm import joinedload
    return db.query(SkillCategory).options(joinedload(SkillCategory.skills)).order_by(SkillCategory.order_index).all()

@router.get("/categories/{category_id}", response_model=SkillCategorySchema)
def get_category(category_id: int, db: Session = Depends(get_db)):
    """Get a specific category by ID"""
    from sqlalchemy.orm import joinedload
    category = db.query(SkillCategory).options(joinedload(SkillCategory.skills)).filter(SkillCategory.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category

@router.post("/categories", response_model=SkillCategorySchema, status_code=201)
def create_category(category: SkillCategoryCreate, db: Session = Depends(get_db)):
    """Create a new skill category"""
    db_category = SkillCategory(**category.model_dump())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

@router.put("/categories/{category_id}", response_model=SkillCategorySchema)
def update_category(category_id: int, category: SkillCategoryUpdate, db: Session = Depends(get_db)):
    """Update a skill category"""
    db_category = db.query(SkillCategory).filter(SkillCategory.id == category_id).first()
    if not db_category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    update_data = category.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_category, field, value)
    
    db.commit()
    db.refresh(db_category)
    return db_category

@router.delete("/categories/{category_id}", status_code=204)
def delete_category(category_id: int, db: Session = Depends(get_db)):
    """Delete a skill category (will cascade delete skills)"""
    db_category = db.query(SkillCategory).filter(SkillCategory.id == category_id).first()
    if not db_category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    db.delete(db_category)
    db.commit()
    return None

# Skill Routes
@router.get("/", response_model=List[SkillSchema])
def get_skills(db: Session = Depends(get_db)):
    """Get all skills"""
    return db.query(Skill).order_by(Skill.category_id, Skill.order_index).all()

@router.get("/{skill_id}", response_model=SkillSchema)
def get_skill(skill_id: int, db: Session = Depends(get_db)):
    """Get a specific skill by ID"""
    skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    return skill

@router.post("/", response_model=SkillSchema, status_code=201)
def create_skill(skill: SkillCreate, db: Session = Depends(get_db)):
    """Create a new skill"""
    # Verify category exists
    category = db.query(SkillCategory).filter(SkillCategory.id == skill.category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    db_skill = Skill(**skill.model_dump())
    db.add(db_skill)
    db.commit()
    db.refresh(db_skill)
    return db_skill

@router.put("/{skill_id}", response_model=SkillSchema)
def update_skill(skill_id: int, skill: SkillUpdate, db: Session = Depends(get_db)):
    """Update a skill"""
    db_skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not db_skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    
    # Verify category exists if updating category_id
    if skill.category_id and skill.category_id != db_skill.category_id:
        category = db.query(SkillCategory).filter(SkillCategory.id == skill.category_id).first()
        if not category:
            raise HTTPException(status_code=404, detail="Category not found")
    
    update_data = skill.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_skill, field, value)
    
    db.commit()
    db.refresh(db_skill)
    return db_skill

@router.delete("/{skill_id}", status_code=204)
def delete_skill(skill_id: int, db: Session = Depends(get_db)):
    """Delete a skill"""
    db_skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not db_skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    
    db.delete(db_skill)
    db.commit()
    return None

