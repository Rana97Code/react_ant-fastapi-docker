from app.config import engine, Base, SessionLocal
from sqlalchemy import Column,String,Integer,Boolean
from sqlalchemy.orm import relationship
from pydantic import BaseModel


class AccessTable(Base):
    __tablename__="user_role_access"
    id=Column(Integer,primary_key=True,index=True)
    user_type = Column(Integer)
    role_id = Column(Integer)


Base.metadata.create_all(bind=engine)

class AccessCreateSchema(BaseModel):
    user_type:int
    role_id:int
    class Config:
        orm_mode=True

class AccessSchema(BaseModel):
    id:int
    user_type:int
    role_id:int
    class Config:
        orm_mode=True
