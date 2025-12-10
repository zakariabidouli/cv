import os
import requests
import logging
from typing import Optional

logger = logging.getLogger(__name__)

VERCEL_BLOB_TOKEN = os.getenv("VERCEL_BLOB_TOKEN", "")
VERCEL_BLOB_API_URL = "https://blob.vercel-storage.com"


async def upload_to_blob(file_content: bytes, filename: str) -> Optional[str]:
    """
    Upload file to Vercel Blob storage.
    Returns the blob URL on success, None on failure.
    """
    if not VERCEL_BLOB_TOKEN:
        logger.error("VERCEL_BLOB_TOKEN not set")
        return None

    try:
        headers = {
            "Authorization": f"Bearer {VERCEL_BLOB_TOKEN}",
        }
        
        files = {
            "file": (filename, file_content),
        }
        
        response = requests.post(
            f"{VERCEL_BLOB_API_URL}/upload",
            headers=headers,
            files=files,
        )
        
        if response.status_code == 200:
            data = response.json()
            blob_url = data.get("url")
            logger.info(f"File uploaded to Vercel Blob: {blob_url}")
            return blob_url
        else:
            logger.error(f"Vercel Blob upload failed: {response.status_code} - {response.text}")
            return None
    except Exception as e:
        logger.error(f"Error uploading to Vercel Blob: {str(e)}")
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
        
        response = requests.delete(
            blob_url,
            headers=headers,
        )
        
        if response.status_code == 200:
            logger.info(f"File deleted from Vercel Blob: {blob_url}")
            return True
        else:
            logger.error(f"Vercel Blob delete failed: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        logger.error(f"Error deleting from Vercel Blob: {str(e)}")
        return False
