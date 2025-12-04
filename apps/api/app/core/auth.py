from fastapi import Header, HTTPException, status
from app.core.config import settings

def verify_api_key(x_api_key: str = Header(..., alias="X-API-Key")):
    """
    Dependency function to verify API key from X-API-Key header.
    Raises HTTPException if API key is missing or invalid.
    """
    if not settings.API_KEY:
        # If API_KEY is not configured, allow access (for development)
        # In production, this should always be set
        return True
    
    if x_api_key != settings.API_KEY:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing API key"
        )
    
    return True

