from sqlalchemy import Column, Integer, String
from app.core.database import Base


class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)
    blob_url = Column(String(500), nullable=False)  # Vercel Blob URL
    original_filename = Column(String(255), nullable=False)
    mime_type = Column(String(100), nullable=False, default="application/pdf")
    created_at = Column(String(50), nullable=True)  # ISO timestamp


