# Database Seeding Script

This script populates the database with dummy data for development and testing.

## Usage

### Option 1: Run directly with Python

```bash
# From the apps/api directory
cd apps/api
python scripts/seed_data.py
```

### Option 2: Run as a module

```bash
# From the apps/api directory
python -m scripts.seed_data
```

### Option 3: Run in Docker container

```bash
# If API is running in Docker
docker-compose exec api python scripts/seed_data.py
```

## What it seeds

- **4 Projects** - Sample portfolio projects
- **3 Experiences** - Work experience entries
- **4 Skill Categories** with multiple skills each
- **3 About sections** - About content paragraphs
- **4 Stats** - Statistics cards
- **3 Social Links** - GitHub, LinkedIn, Email
- **2 Contact submissions** - Sample contact messages

## Notes

- The script will **clear all existing data** before seeding
- If you want to keep existing data, comment out the deletion section in the script
- All data includes timestamps and proper relationships
- The script creates tables if they don't exist

## Customization

Edit `scripts/seed_data.py` to modify the dummy data to match your needs.

