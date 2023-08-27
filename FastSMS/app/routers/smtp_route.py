from fastapi import APIRouter, Depends, HTTPException
from typing import Union,List,Optional
from sqlalchemy.orm import Session
from app.models.smtp import SmtpCreateSchema,SmtpSchema,Smtp #there two schema one are create and another one is get data id_wise
from app.config import get_db
from fastapi.responses import JSONResponse

#route define
smtp_router = APIRouter()

@smtp_router.post("/add_smtp")
async def create(smtp:SmtpCreateSchema,db:Session=Depends(get_db)): #data field define using schema and session manage
    srv=Smtp(smtp_url=smtp.smtp_url,port_num=smtp.port_num,email=smtp.email,password=smtp.password)
    db.add(srv)
    db.commit()
    return {"Message":"Successfully Add"}

@smtp_router.get("/smtp",response_model=List[SmtpSchema])
async def index(db:Session=Depends(get_db)):
    return db.query(Smtp).all()

@smtp_router.get("/get_smtp/{smtp_id}",response_model=SmtpSchema)
async def get_itm(smtp_id:int,db:Session=Depends(get_db)):
    try:
        u=db.query(Smtp).filter(Smtp.id == smtp_id).first()
        return (u)
    except:
        return HTTPException(status_code=422, details="SMTP not found")

@smtp_router.put("/update_smtp/{smtp_id}")
async def update(smtp_id:int,smtp:SmtpCreateSchema,db:Session=Depends(get_db)):
    try:
        u=db.query(Smtp).filter(Smtp.id==smtp_id).first()
        u.smtp_url=smtp.smtp_url,
        u.port_num=smtp.port_num,
        u.email=smtp.email,
        u.password=smtp.password,
        db.add(u)
        db.commit()
        return {"Message":"Successfully Update"}
    except:
        return HTTPException(status_code=404,detail="Update Uncessfull")

@smtp_router.delete("/delete_smtp/{smtp_id}",response_class=JSONResponse)
async def get_itm(smtp_id:int,db:Session=Depends(get_db)):
    try:
        u=db.query(Smtp).filter(Smtp.id==smtp_id).first()
        db.delete(u)
        db.commit()
        return {"SMTP has been deleted"}
    except:
        return HTTPException(status_code=422, details="smtp not found")