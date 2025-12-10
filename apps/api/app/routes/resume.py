from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Request
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from typing import Optional
from datetime import datetime
import logging

from app.core.database import get_db
from app.core.auth import verify_jwt_token
from app.core.blob_storage import upload_to_blob, delete_from_blob
from app.models.resume import Resume as ResumeModel
from app.schemas.resume import Resume as ResumeSchema

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/resume", tags=["Resume"])


@router.get("/latest", response_model=Optional[ResumeSchema])
def get_latest_resume(request: Request, db: Session = Depends(get_db)):
    """Get the latest uploaded resume (or null if none)."""
    resume = db.query(ResumeModel).order_by(ResumeModel.id.desc()).first()
    if not resume:
        return None

    return ResumeSchema(
        id=resume.id,
        original_filename=resume.original_filename,
        mime_type=resume.mime_type,
        file_url=resume.blob_url,
        created_at=resume.created_at,
    )


@router.get("/{resume_id}/file", name="download_resume")
def download_resume(resume_id: int, db: Session = Depends(get_db)):
    """Redirect to Vercel Blob URL for resume download."""
    resume = db.query(ResumeModel).filter(ResumeModel.id == resume_id).first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    return RedirectResponse(url=resume.blob_url, status_code=302)


@router.post("/", response_model=ResumeSchema, status_code=201)
async def upload_resume(
    request: Request,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    _: dict = Depends(verify_jwt_token),
):
    """Upload a new resume PDF to Vercel Blob."""
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    try:
        file_content = await file.read()
    except Exception as e:
        logger.error(f"Failed to read file: {str(e)}")
        raise HTTPException(status_code=400, detail="Failed to read file")

    logger.info(f"Uploading resume to Vercel Blob: {file.filename}")
    blob_url = await upload_to_blob(file_content, file.filename)
    
    if not blob_url:
        raise HTTPException(status_code=500, detail="Failed to upload file to blob storage")

    try:
        db_resume = ResumeModel(
            blob_url=blob_url,
            original_filename=file.filename,
            mime_type=file.content_type or "application/pdf",
            created_at=datetime.utcnow().isoformat(),
        )
        db.add(db_resume)
        db.commit()
        db.refresh(db_resume)
        logger.info(f"Resume metadata saved to DB with ID: {db_resume.id}")
    except Exception as e:
        logger.error(f"Failed to save resume metadata: {str(e)}")
        await delete_from_blob(blob_url)
        raise HTTPException(status_code=500, detail=f"Failed to save resume metadata: {str(e)}")

    return ResumeSchema(
        id=db_resume.id,
        original_filename=db_resume.original_filename,
        mime_type=db_resume.mime_type,
        file_url=blob_url,
        created_at=db_resume.created_at,
    )


@router.delete("/{resume_id}", status_code=204)
async def delete_resume(resume_id: int, db: Session = Depends(get_db), _: dict = Depends(verify_jwt_token)):
    """Delete a resume from Vercel Blob and database."""
    resume = db.query(ResumeModel).filter(ResumeModel.id == resume_id).first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    logger.info(f"Deleting resume from Vercel Blob: {resume.blob_url}")
    await delete_from_blob(resume.blob_url)

    db.delete(resume)
    db.commit()
    return None


