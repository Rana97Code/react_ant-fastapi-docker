from app.config import engine, Base, SessionLocal
from sqlalchemy import Column,String,Integer,Boolean,ForeignKey
from sqlalchemy.orm import relationship
from pydantic import BaseModel
# from app.models.units import UnitSchema
# from app.models.units import Unit



class SMS_API(Base):
    __tablename__="sms_api"
    id=Column(Integer,primary_key=True,index=True)
    sms_url  = Column(String(255),index=True)
    user_name  = Column(String(255),index=True)
    api_key = Column(String(255),index=True)
    password  = Column(String(255),index=True)



Base.metadata.create_all(bind=engine)

class SMS_ApiCreateSchema(BaseModel):
    # id:int
    sms_url:str
    user_name:str
    api_key:str
    password:str

    class Config:
        orm_mode=True


class SMS_ApiSchema(BaseModel):
    id:int
    sms_url:str
    user_name:str
    api_key:str
    password:str

    class Config:
        orm_mode=True
