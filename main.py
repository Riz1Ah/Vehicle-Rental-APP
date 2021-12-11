from fastapi import FastAPI, Depends 
import schemas,models
import pandas as pd
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware


from database import engine, SessionLocal

models.Base.metadata.create_all(engine)

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



def get_db():
    db = SessionLocal()
    
    try:
        yield db
    finally:
        db.close()

@app.get('/')
def index():
	return {'data':'Hello World'}


@app.post('/addcust')
def add_cust(cust:schemas.Customer, db:Session= Depends(get_db)):
    
    new_cust = models.Customers(name=cust.name, phone=cust.phone, email=cust.email)
    db.add(new_cust)
    db.commit()
    db.refresh(new_cust)
    
    return new_cust

@app.post('/addrental')
def add_rental(rent:schemas.Rental, db:Session= Depends(get_db)):
	
    available = db.query(models.Inventory.available).filter(models.Inventory.vehicle==rent.vehicle).first()[0]
    
    
    if available:
        new_rent = models.Rentals(name = rent.name, rent_date = rent.rent_date, return_date= rent.return_date, 
                                  vehicle = rent.vehicle, owner_id=rent.owner_id)
        db.add(new_rent)
        db.commit()
        db.refresh(new_rent)
        
        idx = db.query(models.Inventory.id).filter(models.Inventory.vehicle==rent.vehicle).first()
        table = db.query(models.Inventory).get(idx)
        table.available = available-1
        db.commit()
        
        
        return new_rent
    else:
        return 0

@app.post('/addinventory')
def add_inventory(inv:schemas.Inventory, db:Session= Depends(get_db)):
    
    new_inv = models.Inventory(vehicle=inv.vehicle, total=inv.total, available=inv.available)
    db.add(new_inv)
    db.commit()
    db.refresh(new_inv)
    
    return new_inv

@app.get('/showcustomers')
def showcust(db: Session=Depends(get_db)):
    custs = db.query(models.Customers).all()
    
    return custs


@app.get('/showrentals')
def showrent(db: Session=Depends(get_db)):
	rents = db.query(models.Rentals).all()
	return rents


@app.get('/showinventory')
def showrent(db: Session=Depends(get_db)):
	inv = db.query(models.Inventory).all()
	return inv
