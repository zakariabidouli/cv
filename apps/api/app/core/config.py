from pydantic_settings import BaseSettings
import os
from typing import List

class Settings(BaseSettings):
    # DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./test.db")
    # DATABASE_URL: str = "postgresql://postgres:8+u%qaUZa@db.hepnvmfeuodqagrpjadt.supabase.co:5432/postgres"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./test.db")
    DB_POOL_SIZE: int = int(os.getenv("DB_POOL_SIZE", "5"))
    DB_MAX_OVERFLOW: int = int(os.getenv("DB_MAX_OVERFLOW", "10"))
    DB_POOL_TIMEOUT: int = int(os.getenv("DB_POOL_TIMEOUT", "30"))
    DB_POOL_RECYCLE: int = int(os.getenv("DB_POOL_RECYCLE", "3600"))
    
    # CORS Configuration - comma-separated origins or "*" for all
    CORS_ORIGINS: str = os.getenv("CORS_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000")
    
    # Environment: development, staging, production
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    
    # Optional: API Secret Key for future authentication
    API_SECRET_KEY: str = os.getenv("API_SECRET_KEY", "")
    
    # API Key for authentication (must match API_KEY in frontend/Vercel)
    API_KEY: str = os.getenv("API_KEY", "")
    
    # Optional: Logging level
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")

    class Config:
        env_file = ".env"
    
    def get_cors_origins(self) -> List[str]:
        """Parse CORS_ORIGINS string into a list."""
        if self.CORS_ORIGINS == "*":
            return ["*"]
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]

settings = Settings()