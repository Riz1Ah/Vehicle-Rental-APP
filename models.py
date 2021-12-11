from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from database import Base


class Customers(Base):
    __tablename__ = "Customers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    phone = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    

class Rentals(Base):
    __tablename__ = "Rentals"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    rent_date = Column(String, index=True)
    return_date = Column(String, index=True)
    vehicle = Column(String, index=True)
    owner_id = Column(Integer, ForeignKey("Customers.id"))

    

class Inventory(Base):
    __tablename__ = "Inventory"

    id = Column(Integer, primary_key=True, index=True)
    vehicle = Column(String, unique=True ,index=True)
    total = Column(Integer, index=True)
    available = Column(Integer, index=True)
    