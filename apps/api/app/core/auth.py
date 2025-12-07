from fastapi import Header, HTTPException, status
from app.core.config import settings
from app.core.jwt_handler import verify_token

def verify_api_key(x_api_key: str = Header(..., alias="X-API-Key")):
    """
    Dependency function to verify API key from X-API-Key header.
    Raises HTTPException if API key is missing or invalid.
    """
    # Check if API key is configured
    if not settings.API_KEY or not settings.API_KEY.strip():
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="API key is not configured on the server"
        )
    
    # Check if provided API key is blank
    if not x_api_key or not x_api_key.strip():
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="API key cannot be blank"
        )
    
    # Validate that the provided key matches the configured key
    if x_api_key.strip() != settings.API_KEY.strip():
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid API key"
        )
    
    return True

def verify_jwt_token(authorization: str = Header(None, alias="Authorization")):
    """
    Dependency function to verify JWT token from Authorization header.
    Accepts tokens in format: "Bearer <token>"
    """
    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing authorization header"
        )
    
    # Extract token from "Bearer <token>" format
    parts = authorization.split()
    if len(parts) != 2 or parts[0].lower() != "bearer":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authorization header format"
        )
    
    token = parts[1]
    payload = verify_token(token)
    
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )
    
    return payload

