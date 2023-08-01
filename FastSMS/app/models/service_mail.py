from app.config import engine, Base, SessionLocal
from sqlalchemy import Column,String,Integer,Boolean,ForeignKey
from sqlalchemy.orm import relationship
from pydantic import BaseModel
# from app.models.units import UnitSchema
# from app.models.units import Unit



class Service_mail(Base):
    __tablename__="services_mail"
    id=Column(Integer,primary_key=True,index=True)
    service_id  = Column(Integer, ForeignKey("units.id"))
    mail_type = Column(String(255),index=True)
    mail_id  = Column(Integer,index=True)



Base.metadata.create_all(bind=engine)

class Service_mailCreateSchema(BaseModel):
    # id:int
    service_id:int
    mail_type:str
    mail_id:int

    class Config:
        orm_mode=True


class Service_mailSchema(BaseModel):
    id:int
    service_id:int
    mail_type:str
    mail_id:int

    class Config:
        orm_mode=True
