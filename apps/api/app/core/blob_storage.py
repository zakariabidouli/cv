import os
import requests
import logging
from typing import Optional
import io

logger = logging.getLogger(__name__)

VERCEL_BLOB_TOKEN = os.getenv("VERCEL_BLOB_TOKEN", "")


async def upload_to_blob(file_content: bytes, filename: str) -> Optional[str]:
    """
    Upload file to Vercel Blob storage using REST API.
    Returns the blob URL on success, None on failure.
    """
    if not VERCEL_BLOB_TOKEN:
        logger.error("VERCEL_BLOB_TOKEN not set")
        return None

    try:
        # Vercel Blob API endpoint
        url = "https://blob.vercel-storage.com/upload"
        
        headers = {
            "Authorization": f"Bearer {VERCEL_BLOB_TOKEN}",
        }
        
        # Prepare multipart form data
        files = {
            "file": (filename, io.BytesIO(file_content), "application/pdf"),
        }
        
        params = {
            "filename": filename,
        }
        
        logger.info(f"Uploading to Vercel Blob: {filename}")
        response = requests.post(
            url,
            headers=headers,
            files=files,
            params=params,
            timeout=30,
        )
        
        logger.info(f"Vercel Blob response: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            blob_url = data.get("url")
            logger.info(f"File uploaded to Vercel Blob: {blob_url}")
            return blob_url
        else:
            logger.error(f"Vercel Blob upload failed: {response.status_code} - {response.text}")
            return None
    except Exception as e:
        logger.error(f"Error uploading to Vercel Blob: {str(e)}", exc_info=True)
        return None


async def delete_from_blob(blob_url: str) -> bool:
    """
    Delete file from Vercel Blob storage.
    Returns True on success, False on failure.
    """
    if not VERCEL_BLOB_TOKEN:
        logger.error("VERCEL_BLOB_TOKEN not set")
        return False

    try:
        headers = {
            "Authorization": f"Bearer {VERCEL_BLOB_TOKEN}",
        }
        
        logger.info(f"Deleting from Vercel Blob: {blob_url}")
        response = requests.delete(
            blob_url,
            headers=headers,
            timeout=30,
        )
        
        logger.info(f"Vercel Blob delete response: {response.status_code}")
        
        if response.status_code == 200:
            logger.info(f"File deleted from Vercel Blob: {blob_url}")
            return True
        else:
            logger.error(f"Vercel Blob delete failed: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        logger.error(f"Error deleting from Vercel Blob: {str(e)}", exc_info=True)
        return False
