from sqlalchemy import Column, Integer, String, Text
from app.core.database import Base

class Contact(Base):
    __tablename__ = "contacts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    email = Column(String(200), nullable=False)
    message = Column(Text, nullable=False)
    status = Column(String(20), default="new")  # new, read, replied, archived
    created_at = Column(String(50), nullable=True)
    updated_at = Column(String(50), nullable=True)

