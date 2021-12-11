from pydantic import BaseModel
from typing import Optional

class Customer(BaseModel):
	name:str
	phone:str
	email:str

class Rental(BaseModel):
	name:str
	rent_date:str
	return_date:Optional[str]=None
	vehicle:str
	owner_id:int

class Inventory(BaseModel):
    vehicle:str
    total:int
    available:int


