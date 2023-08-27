from fastapi import APIRouter, Depends, HTTPException, requests,Request
from typing import Union,List,Optional
from sqlalchemy.orm import Session
from app.models.units import UnitCreateSchema,UnitSchema,Unit #there two schema one are create and another one is get data id_wise
from app.config import get_db
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

#route define
unit_router = APIRouter()

@unit_router.post("/add_unit")
async def create(unit:UnitCreateSchema,db:Session=Depends(get_db)): #data field define using schema and session manage
    srv=Unit(unit_name=unit.unit_name,unit_details=unit.unit_details)
    db.add(srv)
    db.commit()
    return {"Message":"Successfully Add"}

@unit_router.get("/units",response_model=List[UnitSchema])
async def index(db:Session=Depends(get_db)):
    return db.query(Unit).all()

@unit_router.get("/get_unit/{unit_id}",response_model=UnitSchema)
async def get_itm(unit_id:int,db:Session=Depends(get_db)):
    try:
        u=db.query(Unit).filter(Unit.id == unit_id).first()
        return (u)
    except:
        return HTTPException(status_code=422, details="Unit not found")

@unit_router.put("/update_unit/{unit_id}")
async def update(unit_id:int,unit:UnitCreateSchema,db:Session=Depends(get_db)):
    try:
        u=db.query(Unit).filter(Unit.id==unit_id).first()
        u.unit_name=unit.unit_name,
        u.unit_details=unit.unit_details
        # print(jsonable_encoder(u))
        db.add(u)
        db.commit()
        return {"Message":"Successfully Update"}
    except:
        return HTTPException(status_code=404,detail="Update Uncessfull")

@unit_router.delete("/delete_unit/{unit_id}",response_class=JSONResponse)
async def get_itm(unit_id:int,db:Session=Depends(get_db)):
    try:
        u=db.query(Unit).filter(Unit.id==unit_id).first()
        db.delete(u)
        db.commit()
        return {"Unit has been deleted"}
    except:
        return HTTPException(status_code=422, details="user not found")
    

#array push

@unit_router.post("/add_unit_array")
async def create(unit:List[UnitCreateSchema], request: Request, db:Session=Depends(get_db)): #data field define using schema and session manage
    # for request print
    # body =await request.body()
    # print(body)

    name= jsonable_encoder(unit)
    i = []
    unt = []
    for i in range(len(name)):
        print(i)
        unt.append({
          'unit_name': name[i]["unit_name"],
          'unit_details': name[i]["unit_details"]
        })
        print(unt)
    for row in unt:
        print(row)
        unit_list = [Unit(**row)]
        db.add_all(unit_list)
        db.commit()
    return {"Message":"Successfully Add"}


@unit_router.put("/update_unit_array/{unit_id}")
async def update_array(unit_id: str, request: Request, db:Session=Depends(get_db)): #data field define using schema and session manage

    y = unit_id.split(",")
    u=db.query(Unit).filter(Unit.id.in_(y)).all()
    name= jsonable_encoder(u)
    i = []
    x = []
    for i,x in enumerate(name):
        unit_name = x["unit_name"],
        unit_details = x["unit_details"] + "+" + x["unit_name"]

        uu=db.query(Unit).filter(Unit.id == x["id"]).first()
        uu.unit_name=unit_name
        uu.unit_details=unit_details
        print(jsonable_encoder(uu))
        db.add(uu)
        db.commit()
    return {"Message":"Successfully Update"}