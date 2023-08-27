from fastapi import APIRouter, Depends, HTTPException
from typing import Union,List,Optional
from sqlalchemy.orm import Session
from app.models.sms_api import SMS_ApiCreateSchema,SMS_ApiSchema,SMS_API #there two schema one are create and another one is get data id_wise
from app.config import get_db
from fastapi.responses import JSONResponse

#route define
sms_router = APIRouter()

@sms_router.post("/add_sms")
async def create(sms:SMS_ApiCreateSchema,db:Session=Depends(get_db)): #data field define using schema and session manage
    srv=SMS_API(sms_url=sms.sms_url,user_name=sms.user_name,api_key=sms.api_key,password=sms.password)
    db.add(srv)
    db.commit()
    return {"Message":"Successfully Add"}

@sms_router.get("/sms",response_model=List[SMS_ApiSchema])
async def index(db:Session=Depends(get_db)):
    return db.query(SMS_API).all()

@sms_router.get("/get_sms/{sms_id}",response_model=SMS_ApiSchema)
async def get_itm(sms_id:int,db:Session=Depends(get_db)):
    try:
        u=db.query(SMS_API).filter(SMS_API.id == sms_id).first()
        return (u)
    except:
        return HTTPException(status_code=422, details="SMS_API not found")

@sms_router.put("/update_sms/{sms_id}")
async def update(sms_id:int,sms:SMS_ApiCreateSchema,db:Session=Depends(get_db)):
    try:
        u=db.query(SMS_API).filter(SMS_API.id==sms_id).first()
        u.sms_url=sms.sms_url,
        u.user_name=sms.user_name,
        u.api_key=sms.api_key,
        u.password=sms.password
        db.add(u)
        db.commit()
        return {"Message":"Successfully Update"}
    except:
        return HTTPException(status_code=404,detail="Update Uncessfull")

@sms_router.delete("/delete_sms/{sms_id}",response_class=JSONResponse)
async def get_itm(sms_id:int,db:Session=Depends(get_db)):
    try:
        u=db.query(SMS_API).filter(SMS_API.id==sms_id).first()
        db.delete(u)
        db.commit()
        return {"sms has been deleted"}
    except:
        return HTTPException(status_code=422, details="user not found")