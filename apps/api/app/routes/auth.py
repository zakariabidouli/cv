from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from app.core.config import settings
from app.core.jwt_handler import create_access_token

router = APIRouter(prefix="/auth", tags=["Authentication"])

class LoginRequest(BaseModel):
    api_key: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

@router.post("/login", response_model=TokenResponse)
def login(request: LoginRequest):
    """
    Authenticate with API key and receive a JWT token.
    
    The JWT token should be used for subsequent API requests in the Authorization header.
    Format: Authorization: Bearer <token>
    """
    # Validate API secret key
    if not settings.API_SECRET_KEY or not settings.API_SECRET_KEY.strip():
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="API secret key is not configured on the server"
        )
    
    if not request.api_key or not request.api_key.strip():
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="API key cannot be blank"
        )
    
    if request.api_key.strip() != settings.API_SECRET_KEY.strip():
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid API key"
        )
    
    # Generate JWT token
    access_token = create_access_token(data={"type": "admin"})
    
    return TokenResponse(access_token=access_token)
