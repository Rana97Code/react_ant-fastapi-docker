from app.config import engine, Base, SessionLocal
from sqlalchemy import Column,String,Integer,Boolean,ForeignKey
from sqlalchemy.orm import relationship
from pydantic import BaseModel
# from app.models.units import UnitSchema
# from app.models.units import Unit



class Smtp(Base):
    __tablename__="smtp"
    id=Column(Integer,primary_key=True,index=True)
    smtp_url  = Column(String(255),index=True)
    port_num = Column(String(255),index=True)
    email = Column(String(255),index=True)
    password  = Column(String(255),index=True)



Base.metadata.create_all(bind=engine)

class SmtpCreateSchema(BaseModel):
    # id:int
    smtp_url:str
    port_num:str
    email:str
    password:str

    class Config:
        orm_mode=True


class SmtpSchema(BaseModel):
    id:int
    smtp_url:str
    port_num:str
    email:str
    password:str

    class Config:
        orm_mode=True
