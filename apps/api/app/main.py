# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from app.core.database import Base, engine
# from app.routes import projects

# app = FastAPI(title="Zakaria Portfolio API")

# # Allow all origins for now (Next.js frontend will connect)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Create DB tables automatically
# Base.metadata.create_all(bind=engine)

# # Register routers
# app.include_router(projects.router)

# @app.get("/health")
# def health_check():
#     return {"status": "ok"}

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import Base, engine
from app.routes import projects, experiences, contacts, skills, about, social_links
# Import all models to ensure they're registered
from app.models import Project, Experience, Skill, SkillCategory, Contact, About, Stat, SocialLink

app = FastAPI(
    title="Zakaria Portfolio API",
    description="Backend API powering Zakaria's portfolio (FastAPI + SQLAlchemy).",
    version="1.0.0",
    docs_url="/docs",           # Swagger UI
    redoc_url="/redoc",         # Optional: ReDoc alternative
    openapi_url="/openapi.json" # Schema endpoint
)

# Enable CORS (for frontend connection)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict later to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create DB tables
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(projects.router)
app.include_router(experiences.router)
app.include_router(contacts.router)
app.include_router(skills.router)
app.include_router(about.router)
app.include_router(social_links.router)

@app.get("/health")
def health_check():
    return {"status": "ok"}
