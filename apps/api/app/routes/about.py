from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.about import About, Stat
from app.schemas.about import (
    About as AboutSchema, 
    AboutCreate, 
    AboutUpdate,
    Stat as StatSchema,
    StatCreate,
    StatUpdate
)

router = APIRouter(prefix="/about", tags=["About"])

# About Content Routes
@router.get("/content", response_model=List[AboutSchema])
def get_about_content(db: Session = Depends(get_db)):
    """Get all about content sections"""
    return db.query(About).order_by(About.order_index).all()

@router.get("/content/{about_id}", response_model=AboutSchema)
def get_about(about_id: int, db: Session = Depends(get_db)):
    """Get a specific about section by ID"""
    about = db.query(About).filter(About.id == about_id).first()
    if not about:
        raise HTTPException(status_code=404, detail="About section not found")
    return about

@router.post("/content", response_model=AboutSchema, status_code=201)
def create_about(about: AboutCreate, db: Session = Depends(get_db)):
    """Create a new about section"""
    db_about = About(**about.model_dump())
    db.add(db_about)
    db.commit()
    db.refresh(db_about)
    return db_about

@router.put("/content/{about_id}", response_model=AboutSchema)
def update_about(about_id: int, about: AboutUpdate, db: Session = Depends(get_db)):
    """Update an about section"""
    db_about = db.query(About).filter(About.id == about_id).first()
    if not db_about:
        raise HTTPException(status_code=404, detail="About section not found")
    
    update_data = about.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_about, field, value)
    
    db.commit()
    db.refresh(db_about)
    return db_about

@router.delete("/content/{about_id}", status_code=204)
def delete_about(about_id: int, db: Session = Depends(get_db)):
    """Delete an about section"""
    db_about = db.query(About).filter(About.id == about_id).first()
    if not db_about:
        raise HTTPException(status_code=404, detail="About section not found")
    
    db.delete(db_about)
    db.commit()
    return None

# Stats Routes
@router.get("/stats", response_model=List[StatSchema])
def get_stats(db: Session = Depends(get_db)):
    """Get all stats"""
    return db.query(Stat).order_by(Stat.order_index).all()

@router.get("/stats/{stat_id}", response_model=StatSchema)
def get_stat(stat_id: int, db: Session = Depends(get_db)):
    """Get a specific stat by ID"""
    stat = db.query(Stat).filter(Stat.id == stat_id).first()
    if not stat:
        raise HTTPException(status_code=404, detail="Stat not found")
    return stat

@router.post("/stats", response_model=StatSchema, status_code=201)
def create_stat(stat: StatCreate, db: Session = Depends(get_db)):
    """Create a new stat"""
    db_stat = Stat(**stat.model_dump())
    db.add(db_stat)
    db.commit()
    db.refresh(db_stat)
    return db_stat

@router.put("/stats/{stat_id}", response_model=StatSchema)
def update_stat(stat_id: int, stat: StatUpdate, db: Session = Depends(get_db)):
    """Update a stat"""
    db_stat = db.query(Stat).filter(Stat.id == stat_id).first()
    if not db_stat:
        raise HTTPException(status_code=404, detail="Stat not found")
    
    update_data = stat.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_stat, field, value)
    
    db.commit()
    db.refresh(db_stat)
    return db_stat

@router.delete("/stats/{stat_id}", status_code=204)
def delete_stat(stat_id: int, db: Session = Depends(get_db)):
    """Delete a stat"""
    db_stat = db.query(Stat).filter(Stat.id == stat_id).first()
    if not db_stat:
        raise HTTPException(status_code=404, detail="Stat not found")
    
    db.delete(db_stat)
    db.commit()
    return None

