"""
Improved script to populate the database with real portfolio data.
Run with: python scripts/seed_data2.py

Features:
- Better error handling and connection validation
- Option to skip clearing existing data
- Progress indicators
- Connection string validation
"""

import sys
import os
from pathlib import Path
from urllib.parse import urlparse

# Add parent directory to path to import app modules
sys.path.insert(0, str(Path(__file__).parent.parent))

from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from app.core.database import SessionLocal, engine, Base
from app.core.config import settings
from app.models import (
    Project, Experience, Skill, SkillCategory, 
    Contact, About, Stat, SocialLink
)
from datetime import datetime

def validate_connection():
    """Validate database connection before proceeding"""
    try:
        print("🔍 Validating database connection...")
        conn = engine.connect()
        conn.close()
        print("✅ Database connection successful!")
        return True
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        print("\n💡 Make sure DATABASE_URL is set correctly:")
        print("   export DATABASE_URL='postgresql://user:pass@host:port/dbname'")
        return False

def get_timestamp():
    """Get current timestamp as string"""
    return datetime.now().isoformat()

def seed_projects(db: Session):
    """Seed projects table"""
    projects = [
        {
            "title": "PingPong - Multiplayer Game",
            "description": "Real-time multiplayer game platform built as part of 1337 School curriculum. Features live player interactions, matchmaking system, and responsive gameplay with modern web technologies.",
            "image": "/transcendence-game.png",
            "tags": ["Next.js", "React", "TypeScript", "WebSocket"],
            "live_url": None,
            "github_url": "https://github.com/zakariabidouli/transcendence",
            "featured": "true",
            "order_index": 0
        },
        {
            "title": "Webserv - HTTP Server",
            "description": "Custom HTTP/1.1 server implementation in C++ from scratch. Built with non-blocking I/O, handles concurrent connections, and supports modern HTTP features. Deep dive into networking fundamentals.",
            "image": "/http-server-architecture.png",
            "tags": ["C++", "HTTP", "Networking", "Concurrency"],
            "live_url": None,
            "github_url": "https://github.com/zakariabidouli/webserv",
            "featured": "true",
            "order_index": 1
        },
        {
            "title": "Healthcare Management System",
            "description": "Full-stack healthcare application with secure patient data management, appointment scheduling, and medical records tracking. Built with enterprise-grade architecture and security practices.",
            "image": "/healthcare-dashboard.png",
            "tags": ["Spring Boot", "PostgreSQL", "Vaadin", "Docker"],
            "live_url": None,
            "github_url": None,
            "featured": "true",
            "order_index": 2
        },
        {
            "title": "Supply Chain Analytics Dashboard",
            "description": "Interactive data warehouse visualization dashboard for supply chain management. Features real-time inventory tracking, predictive alerts for stock levels, and comprehensive logistics analytics.",
            "image": "/supply-chain-dashboard.png",
            "tags": ["Python", "PostgreSQL", "Data Visualization"],
            "live_url": None,
            "github_url": None,
            "featured": "true",
            "order_index": 3
        }
    ]
    
    count = 0
    for project_data in projects:
        try:
            project = Project(**project_data, created_at=get_timestamp(), updated_at=get_timestamp())
            db.add(project)
            count += 1
        except Exception as e:
            print(f"⚠️  Warning: Failed to add project '{project_data['title']}': {e}")
    
    db.flush()
    print(f"✓ Seeded {count}/{len(projects)} projects")
    return count

def seed_experiences(db: Session):
    """Seed experiences table"""
    experiences = [
        {
            "role": "Full-Stack Software Engineer",
            "company": "Fekra Systems",
            "period": "Apr 2024 - Aug 2025",
            "start_date": "2024-04",
            "end_date": "2025-08",
            "description": "Built and maintained healthcare applications using Spring Boot and PostgreSQL. Developed reusable front-end components with Vaadin, designed efficient database schemas, and implemented CI/CD pipelines with Docker and Jenkins.",
            "tags": ["Spring Boot", "PostgreSQL", "Vaadin", "Docker", "Jenkins"],
            "order_index": 0
        },
        {
            "role": "Supply Chain Intern",
            "company": "Alyatec",
            "period": "Apr 2021 - Jul 2021",
            "start_date": "2021-04",
            "end_date": "2021-07",
            "description": "Created an interactive dashboard to visualize supply chain data warehouse and implemented intelligent notification system to prevent stock shortages and overstock situations.",
            "tags": ["Python", "Data Visualization", "SQL", "Analytics"],
            "order_index": 1
        },
        {
            "role": "Software Engineering Student",
            "company": "1337 School (42 Network)",
            "period": "Sep 2021 - Present",
            "start_date": "2021-09",
            "end_date": None,
            "description": "Intensive peer-to-peer learning program focused on software engineering fundamentals. Built multiple complex projects including a multiplayer game platform and HTTP server from scratch.",
            "tags": ["Bash", "C", "C++", "Python", "React", "Next.js", "System Programming"],
            "order_index": 2
        }
    ]
    
    count = 0
    for exp_data in experiences:
        try:
            experience = Experience(**exp_data, created_at=get_timestamp(), updated_at=get_timestamp())
            db.add(experience)
            count += 1
        except Exception as e:
            print(f"⚠️  Warning: Failed to add experience '{exp_data['role']}': {e}")
    
    db.flush()
    print(f"✓ Seeded {count}/{len(experiences)} experiences")
    return count

def seed_skills(db: Session):
    """Seed skills and skill categories"""
    categories_data = [
        {
            "name": "Backend Development",
            "order_index": 0,
            "skills": ["Spring Boot", "FastApi", "C++", "NestJS", "REST APIs"]
        },
        {
            "name": "Frontend Development",
            "order_index": 1,
            "skills": ["React", "Next.js", "TypeScript", "JavaScript", "Vaadin"]
        },
        {
            "name": "Databases",
            "order_index": 2,
            "skills": ["PostgreSQL", "MongoDB", "Redis", "GraphQL"]
        },
        {
            "name": "DevOps & Tools",
            "order_index": 3,
            "skills": ["Docker", "Jenkins", "Git", "Linux/Unix", "Bash", "CI/CD"]
        }
    ]
    
    categories_count = 0
    skills_count = 0
    
    for cat_data in categories_data:
        try:
            skills_list = cat_data.pop("skills")
            category = SkillCategory(**cat_data, created_at=get_timestamp(), updated_at=get_timestamp())
            db.add(category)
            db.flush()  # Get the category ID
            categories_count += 1
            
            for idx, skill_name in enumerate(skills_list):
                try:
                    skill = Skill(
                        name=skill_name,
                        category_id=category.id,
                        order_index=idx,
                        created_at=get_timestamp(),
                        updated_at=get_timestamp()
                    )
                    db.add(skill)
                    skills_count += 1
                except Exception as e:
                    print(f"⚠️  Warning: Failed to add skill '{skill_name}': {e}")
        except Exception as e:
            print(f"⚠️  Warning: Failed to add category '{cat_data.get('name', 'unknown')}': {e}")
    
    db.flush()
    print(f"✓ Seeded {categories_count}/{len(categories_data)} skill categories with {skills_count} skills")
    return categories_count, skills_count

def seed_about(db: Session):
    """Seed about content and stats"""
    about_content = [
        {
            "section": "intro",
            "content": "I'm a full-stack developer passionate about crafting user friendly, well-engineered solutions. With experience across backend and frontend technologies, I enjoy tackling complex problems.",
            "order_index": 0
        },
        {
            "section": "paragraph1",
            "content": "My journey in software development has taken me through diverse projects—from building healthcare systems with Spring Boot to developing real-time multiplayer games with React and Next.js. I'm comfortable working across the stack, whether it's designing database schemas, implementing REST APIs, or creating intuitive user interfaces.",
            "order_index": 1
        },
        {
            "section": "paragraph2",
            "content": "Currently still sharpening my skills at 1337 School (42 Network), where I've learn and built everything from Shell in C, HTTP servers in C++ to modern web applications. I believe in continuous learning and enjoy exploring new technologies while maintaining a focus on fundamentals.",
            "order_index": 2
        },
        {
            "section": "paragraph3",
            "content": "I'm always looking for new challenges and opportunities to grow. If you're interested in working with me, please don't hesitate to contact me.",
            "order_index": 3
        }
    ]
    
    stats = [
        {"number": "4+", "label": "Major Projects", "order_index": 0},
        {"number": "2+", "label": "Years Experience", "order_index": 1},
        {"number": "10+", "label": "Technologies", "order_index": 2},
        {"number": "100%", "label": "Passion", "order_index": 3}
    ]
    
    about_count = 0
    stats_count = 0
    
    for about_data in about_content:
        try:
            about = About(**about_data, created_at=get_timestamp(), updated_at=get_timestamp())
            db.add(about)
            about_count += 1
        except Exception as e:
            print(f"⚠️  Warning: Failed to add about section '{about_data['section']}': {e}")
    
    for stat_data in stats:
        try:
            stat = Stat(**stat_data, created_at=get_timestamp(), updated_at=get_timestamp())
            db.add(stat)
            stats_count += 1
        except Exception as e:
            print(f"⚠️  Warning: Failed to add stat '{stat_data['label']}': {e}")
    
    db.flush()
    print(f"✓ Seeded {about_count}/{len(about_content)} about sections and {stats_count}/{len(stats)} stats")
    return about_count, stats_count

def seed_social_links(db: Session):
    """Seed social links"""
    social_links = [
        {
            "platform": "github",
            "url": "https://github.com/zakariabidouli",
            "icon_name": "Github",
            "order_index": 0
        },
        {
            "platform": "linkedin",
            "url": "https://linkedin.com/in/zakariabidouli",
            "icon_name": "Linkedin",
            "order_index": 1
        },
        {
            "platform": "email",
            "url": "mailto:bidouli.zak@gmail.com",
            "icon_name": "Mail",
            "order_index": 2
        }
    ]
    
    count = 0
    for link_data in social_links:
        try:
            link = SocialLink(**link_data, created_at=get_timestamp(), updated_at=get_timestamp())
            db.add(link)
            count += 1
        except Exception as e:
            print(f"⚠️  Warning: Failed to add social link '{link_data['platform']}': {e}")
    
    db.flush()
    print(f"✓ Seeded {count}/{len(social_links)} social links")
    return count

def seed_contacts(db: Session):
    """Seed sample contact submissions (optional)"""
    contacts = []
    
    count = 0
    for contact_data in contacts:
        try:
            contact = Contact(**contact_data, created_at=get_timestamp(), updated_at=get_timestamp())
            db.add(contact)
            count += 1
        except Exception as e:
            print(f"⚠️  Warning: Failed to add contact: {e}")
    
    db.flush()
    print(f"✓ Seeded {count} contact submissions")
    return count

def clear_existing_data(db: Session, skip_clear: bool = False):
    """Clear existing data from all tables"""
    if skip_clear:
        print("⏭️  Skipping data clearing (keeping existing data)")
        return
    
    print("🗑️  Clearing existing data...")
    
    try:
        # Clear in reverse order of dependencies
        deleted_counts = {}
        deleted_counts['Contact'] = db.query(Contact).delete()
        deleted_counts['Skill'] = db.query(Skill).delete()
        deleted_counts['SkillCategory'] = db.query(SkillCategory).delete()
        deleted_counts['Stat'] = db.query(Stat).delete()
        deleted_counts['About'] = db.query(About).delete()
        deleted_counts['SocialLink'] = db.query(SocialLink).delete()
        deleted_counts['Experience'] = db.query(Experience).delete()
        deleted_counts['Project'] = db.query(Project).delete()
        
        db.commit()
        
        total_deleted = sum(deleted_counts.values())
        print(f"✓ Cleared {total_deleted} existing records")
        for table, count in deleted_counts.items():
            if count > 0:
                print(f"  - {table}: {count} records")
    except Exception as e:
        print(f"⚠️  Warning: Error clearing data: {e}")
        db.rollback()

def main():
    """Main function to seed all data"""
    print("=" * 60)
    print("🌱 Portfolio Database Seeding Script v2.0")
    print("=" * 60)
    
    # Show database info (without password)
    db_url = settings.DATABASE_URL
    if db_url:
        try:
            parsed = urlparse(db_url)
            port_str = f":{parsed.port}" if parsed.port else ""
            db_name = parsed.path.split('/')[-1] if parsed.path else "database"
            db_info = f"{parsed.scheme}://{parsed.hostname}{port_str}/{db_name}"
            print(f"📊 Database: {db_info}")
        except Exception:
            # If parsing fails, show minimal safe info
            parsed = urlparse(db_url)
            safe_info = f"{parsed.scheme}://{parsed.hostname}/..."
            print(f"📊 Database: {safe_info}")
    else:
        print("⚠️  Warning: DATABASE_URL not set, using default")
    
    print("-" * 60)
    
    # Validate connection
    if not validate_connection():
        print("\n❌ Cannot proceed without valid database connection")
        sys.exit(1)
    
    print("-" * 60)
    
    # Check for skip clear option
    skip_clear = os.getenv("SKIP_CLEAR", "").lower() in ("true", "1", "yes")
    
    # Create all tables
    print("📋 Creating tables if they don't exist...")
    try:
        Base.metadata.create_all(bind=engine)
        print("✓ Tables ready")
    except Exception as e:
        print(f"❌ Error creating tables: {e}")
        sys.exit(1)
    
    print("-" * 60)
    
    db = SessionLocal()
    try:
        # Clear existing data
        clear_existing_data(db, skip_clear)
        print("-" * 60)
        
        # Seed data
        print("📦 Seeding data...")
        print()
        
        seed_projects(db)
        seed_experiences(db)
        seed_skills(db)
        seed_about(db)
        seed_social_links(db)
        seed_contacts(db)
        
        # Commit all changes
        print()
        print("💾 Committing changes to database...")
        db.commit()
        
        print("-" * 60)
        print("✅ Database seeding completed successfully!")
        print()
        print("📊 Summary:")
        print("  - Projects: 4")
        print("  - Experiences: 3")
        print("  - Skill Categories: 4")
        print("  - Skills: Multiple")
        print("  - About Sections: 4")
        print("  - Stats: 4")
        print("  - Social Links: 3")
        print("=" * 60)
        
    except SQLAlchemyError as e:
        db.rollback()
        print(f"\n❌ Database error: {e}")
        print("💡 Changes have been rolled back")
        sys.exit(1)
    except Exception as e:
        db.rollback()
        print(f"\n❌ Unexpected error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
    finally:
        db.close()

if __name__ == "__main__":
    main()

