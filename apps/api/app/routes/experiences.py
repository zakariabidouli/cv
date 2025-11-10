from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.experience import Experience
from app.schemas.experience import Experience as ExperienceSchema, ExperienceCreate, ExperienceUpdate

router = APIRouter(prefix="/experiences", tags=["Experiences"])

@router.get("/", response_model=List[ExperienceSchema])
def get_experiences(db: Session = Depends(get_db)):
    """Get all experiences ordered by order_index"""
    return db.query(Experience).order_by(Experience.order_index).all()

@router.get("/{experience_id}", response_model=ExperienceSchema)
def get_experience(experience_id: int, db: Session = Depends(get_db)):
    """Get a specific experience by ID"""
    experience = db.query(Experience).filter(Experience.id == experience_id).first()
    if not experience:
        raise HTTPException(status_code=404, detail="Experience not found")
    return experience

@router.post("/", response_model=ExperienceSchema, status_code=201)
def create_experience(experience: ExperienceCreate, db: Session = Depends(get_db)):
    """Create a new experience"""
    db_experience = Experience(**experience.model_dump())
    db.add(db_experience)
    db.commit()
    db.refresh(db_experience)
    return db_experience

@router.put("/{experience_id}", response_model=ExperienceSchema)
def update_experience(experience_id: int, experience: ExperienceUpdate, db: Session = Depends(get_db)):
    """Update an existing experience"""
    db_experience = db.query(Experience).filter(Experience.id == experience_id).first()
    if not db_experience:
        raise HTTPException(status_code=404, detail="Experience not found")
    
    update_data = experience.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_experience, field, value)
    
    db.commit()
    db.refresh(db_experience)
    return db_experience

@router.delete("/{experience_id}", status_code=204)
def delete_experience(experience_id: int, db: Session = Depends(get_db)):
    """Delete an experience"""
    db_experience = db.query(Experience).filter(Experience.id == experience_id).first()
    if not db_experience:
        raise HTTPException(status_code=404, detail="Experience not found")
    
    db.delete(db_experience)
    db.commit()
    return None

