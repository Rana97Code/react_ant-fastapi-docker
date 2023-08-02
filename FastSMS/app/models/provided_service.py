from app.config import engine, Base, SessionLocal
from sqlalchemy import Column,String,Integer,Boolean,Date,DateTime
from pydantic import BaseModel
# from typing import Annotated #
# from fastapi import Body
from datetime import datetime, time

class Provided_service(Base):
    __tablename__="provided_service"
    id=Column(Integer,primary_key=True,index=True)
    product_name=Column(String(255),unique=True,index=True)
    unit_id=Column(Integer,index=True)
    customer_id=Column(Integer,index=True)
    p_qty=Column(Integer,index=True)
    purchase_date = Column(DateTime,index=True, default=datetime.utcnow())
    service_time = Column(String(255),unique=True,index=True)    
    notify_time = Column(Integer,index=True)    
    notification_type = Column(String(255),unique=True,index=True)  
    sms_id= Column(String(255),nullable=True)
    email_id= Column(String(255), nullable=True)
    expiry_date = Column(String(255),unique=True,index=True)
    renew_date = Column(String(255),unique=True,index=True)    

Base.metadata.create_all(bind=engine)

class ProServiceCreateSchema(BaseModel):
    product_name:str
    unit_id:int
    customer_id:int
    p_qty:int
    purchase_date:str
    # expiry_date:str
    # renew_date:str
    service_time:str
    notify_time:int
    notification_type:str
    sms_id:str | None
    email_id:str | None
    class Config:
        orm_mode=True

class ServiceProductSchema(BaseModel):
    id:int 
    product_name:str
    unit_id:int 
    p_qty:int
    customer_id:int 
    purchase_date:datetime | None
    expiry_date:str | None 
    # renew_date:datetime | None
    service_time:str 
    notify_time:int 
    notification_type:str 
    sms_id:str | None
    email_id:str | None

class Config:
    orm_mode=True
