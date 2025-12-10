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
    db: Session = Depends(get_db),
    _: dict = Depends(verify_jwt_token),
):
    """Save resume metadata with blob URL (file already uploaded to Vercel Blob by client)."""
    logger.info("📤 POST /resume/ endpoint called")
    
    try:
        body = await request.json()
        logger.info(f"📤 Request body received: {body}")
    except Exception as e:
        logger.error(f"❌ Failed to parse request body: {str(e)}")
        raise HTTPException(status_code=400, detail="Invalid request body")

    blob_url = body.get("blob_url")
    original_filename = body.get("original_filename")
    
    logger.info(f"📤 Extracted: blob_url={blob_url}, original_filename={original_filename}")

    if not blob_url or not original_filename:
        logger.error("❌ Missing blob_url or original_filename")
        raise HTTPException(status_code=400, detail="blob_url and original_filename are required")

    try:
        logger.info("💾 Creating ResumeModel...")
        db_resume = ResumeModel(
            blob_url=blob_url,
            original_filename=original_filename,
            mime_type="application/pdf",
            created_at=datetime.utcnow().isoformat(),
        )
        logger.info("💾 Adding to database...")
        db.add(db_resume)
        logger.info("💾 Committing...")
        db.commit()
        logger.info("💾 Refreshing...")
        db.refresh(db_resume)
        logger.info(f"✅ Resume metadata saved to DB with ID: {db_resume.id}, blob_url: {blob_url}")
    except Exception as e:
        logger.error(f"❌ Failed to save resume metadata: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Failed to save resume metadata: {str(e)}")

    logger.info(f"✅ Returning ResumeSchema for ID: {db_resume.id}")
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


