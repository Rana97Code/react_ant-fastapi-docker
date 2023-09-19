from fastapi import APIRouter,Depends,HTTPException, Form
from typing import Union,List,Annotated
from sqlalchemy.orm import Session
from app.models.userroll import RollCreateSchema,RollSchema,Roll
from app.config import engine, Base, SessionLocal, get_db
from fastapi.responses import JSONResponse

user_roll_router = APIRouter()


@user_roll_router.post("/roll_add")
async def create(roll:Annotated[str, Form()],roll_details:Annotated[str, Form()],db:Session=Depends(get_db)):
    # print(roll)
    srv=Roll(roll_tag=roll,roll_details=roll_details)
    db.add(srv)
    db.commit()
    return {"Message":"Successfully Add"}

@user_roll_router.get("/rolls",response_model=List[RollSchema])
async def index(db:Session=Depends(get_db)):
    return db.query(Roll).all()


@user_roll_router.get("/get_roll/{st_id}",response_model=RollSchema)
async def get_itm(st_id:int,db:Session=Depends(get_db)):
    try:
        u=db.query(Roll).filter(Roll.id == st_id).first()
        return (u)
    except:
        return HTTPException(status_code=422, details="Unit not found")
    

@user_roll_router.put("/update_roll/{st_id}")
async def update(st_id:int,rollcreate:RollCreateSchema,db:Session=Depends(get_db)):
    try:
        u=db.query(Roll).filter(Roll.id==st_id).first()
        u.roll_tag=rollcreate.roll_tag,
        u.roll_details=rollcreate.roll_details,

        db.add(u)
        db.commit()
        return {"Message":"Successfully Update"}
    except:
        return HTTPException(status_code=404,detail="Update Uncessfull")


@user_roll_router.delete("/delete_roll/{st_id}",response_class=JSONResponse)
async def delete(st_id:int,db:Session=Depends(get_db)):
    try:
        u=db.query(Roll).filter(Roll.id==st_id).first()
        db.delete(u)
        db.commit()
        return {"Customer has been deleted"}
    except:
        return HTTPException(status_code=422, details="user not found")