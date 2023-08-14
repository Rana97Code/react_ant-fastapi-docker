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
def create(unit:UnitCreateSchema,db:Session=Depends(get_db)): #data field define using schema and session manage
    srv=Unit(unit_name=unit.unit_name,unit_details=unit.unit_details)
    db.add(srv)
    db.commit()
    return {"Message":"Successfully Add"}

@unit_router.get("/units",response_model=List[UnitSchema])
def index(db:Session=Depends(get_db)):
    return db.query(Unit).all()

@unit_router.get("/get_unit/{unit_id}",response_model=UnitSchema)
def get_itm(unit_id:int,db:Session=Depends(get_db)):
    try:
        u=db.query(Unit).filter(Unit.id == unit_id).first()
        return (u)
    except:
        return HTTPException(status_code=422, details="Unit not found")

@unit_router.put("/update_unit/{unit_id}")
def update(unit_id:int,unit:UnitCreateSchema,db:Session=Depends(get_db)):
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
def get_itm(unit_id:int,db:Session=Depends(get_db)):
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
async def update(unit_id: str, request: Request, db:Session=Depends(get_db)): #data field define using schema and session manage

    # print(unit_id)
    y = unit_id.split(",")
        # print(y)
    u=db.query(Unit).filter(Unit.id.in_(y)).all()

    name= jsonable_encoder(u)
    i = []
    unt = []
    for i in range(len(name)):
        print(i)
        unt.append({
          "unit_name": name[i]["unit_name"],
          "unit_details": name[i]["unit_details"] + '+1',
          "id": name[i]["id"]
        })
        # u_l.dict(exclude_unset=True)
        print(unt)
    for row in unt:
        print(row)
        unit_list = [Unit(**row)]
        db.execute(unit_list)
        db.commit()
    return {"Message":"Successfully Update"}