# Database Seeding Scripts

This directory contains scripts to populate the database with portfolio data.

## Available Scripts

### 1. `seed_data.py` (Original)
Basic seeding script with standard error handling.

### 2. `seed_data2.py` (Improved) ⭐ Recommended
Enhanced version with better error handling, connection validation, and progress indicators.

## Usage

### Option 1: Run directly with Python

```bash
# From the apps/api directory
cd apps/api

# Original script
python scripts/seed_data.py

# Improved script (recommended)
python scripts/seed_data2.py
```

### Option 2: Run as a module

```bash
# From the apps/api directory
python -m scripts.seed_data
python -m scripts.seed_data2
```

### Option 3: Run in Docker container

```bash
# If API is running in Docker
docker-compose exec api python scripts/seed_data2.py
```

### Option 4: Skip clearing existing data

```bash
# Keep existing data and add new records
SKIP_CLEAR=true python scripts/seed_data2.py
```

## Environment Setup

Make sure `DATABASE_URL` is set:

```bash
# For Supabase
export DATABASE_URL="postgresql://postgres:password@db.project-ref.supabase.co:5432/postgres"

# Or create apps/api/.env file
echo "DATABASE_URL=your-connection-string" > apps/api/.env
```

## What it seeds

- **4 Projects** - Sample portfolio projects
- **3 Experiences** - Work experience entries
- **4 Skill Categories** with multiple skills each
- **4 About sections** - About content paragraphs
- **4 Stats** - Statistics cards
- **3 Social Links** - GitHub, LinkedIn, Email
- **0 Contact submissions** - (empty by default)

## Features of seed_data2.py

✅ **Connection validation** - Checks database connection before proceeding  
✅ **Better error handling** - Continues even if individual records fail  
✅ **Progress indicators** - Shows what's being seeded  
✅ **Skip clear option** - Use `SKIP_CLEAR=true` to keep existing data  
✅ **Detailed output** - Shows counts and summaries  
✅ **Safe rollback** - Automatically rolls back on errors  

## Notes

- **seed_data.py**: Clears all existing data before seeding (hardcoded)
- **seed_data2.py**: Clears data by default, but can skip with `SKIP_CLEAR=true`
- Both scripts create tables if they don't exist
- All data includes timestamps and proper relationships

## Customization

Edit `scripts/seed_data.py` or `scripts/seed_data2.py` to modify the data to match your needs.

