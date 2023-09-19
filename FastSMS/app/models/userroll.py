from app.config import engine, Base, SessionLocal
from sqlalchemy import Column,String,Integer,Boolean
from sqlalchemy.orm import relationship
from pydantic import BaseModel


class Roll(Base):
    __tablename__="user_roll"
    id=Column(Integer,primary_key=True,index=True)
    roll_tag = Column(String(100),unique=True,index=True)
    roll_details = Column(String(255),unique=True,index=True)


Base.metadata.create_all(bind=engine)

class RollCreateSchema(BaseModel):
    # user_id:int
    roll_tag:str
    roll_details:str
    class Config:
        orm_mode=True

class RollSchema(BaseModel):
    id:int
    # user_id:int
    roll_tag:str
    roll_details:str
    class Config:
        orm_mode=True
