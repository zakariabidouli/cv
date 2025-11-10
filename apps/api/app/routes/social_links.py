from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.social_link import SocialLink
from app.schemas.social_link import SocialLink as SocialLinkSchema, SocialLinkCreate, SocialLinkUpdate

router = APIRouter(prefix="/social-links", tags=["Social Links"])

@router.get("/", response_model=List[SocialLinkSchema])
def get_social_links(db: Session = Depends(get_db)):
    """Get all social links ordered by order_index"""
    return db.query(SocialLink).order_by(SocialLink.order_index).all()

@router.get("/{link_id}", response_model=SocialLinkSchema)
def get_social_link(link_id: int, db: Session = Depends(get_db)):
    """Get a specific social link by ID"""
    link = db.query(SocialLink).filter(SocialLink.id == link_id).first()
    if not link:
        raise HTTPException(status_code=404, detail="Social link not found")
    return link

@router.post("/", response_model=SocialLinkSchema, status_code=201)
def create_social_link(link: SocialLinkCreate, db: Session = Depends(get_db)):
    """Create a new social link"""
    db_link = SocialLink(**link.model_dump())
    db.add(db_link)
    db.commit()
    db.refresh(db_link)
    return db_link

@router.put("/{link_id}", response_model=SocialLinkSchema)
def update_social_link(link_id: int, link: SocialLinkUpdate, db: Session = Depends(get_db)):
    """Update an existing social link"""
    db_link = db.query(SocialLink).filter(SocialLink.id == link_id).first()
    if not db_link:
        raise HTTPException(status_code=404, detail="Social link not found")
    
    update_data = link.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_link, field, value)
    
    db.commit()
    db.refresh(db_link)
    return db_link

@router.delete("/{link_id}", status_code=204)
def delete_social_link(link_id: int, db: Session = Depends(get_db)):
    """Delete a social link"""
    db_link = db.query(SocialLink).filter(SocialLink.id == link_id).first()
    if not db_link:
        raise HTTPException(status_code=404, detail="Social link not found")
    
    db.delete(db_link)
    db.commit()
    return None

