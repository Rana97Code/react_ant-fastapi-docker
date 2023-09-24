from fastapi import APIRouter,Depends,HTTPException, Form
from typing import Union,List,Annotated
from sqlalchemy.orm import Session
from app.models.useraccess import AccessTable,AccessCreateSchema,AccessSchema
from app.models.userroll import RollCreateSchema,RollSchema,Roll
from app.config import engine, Base, SessionLocal, get_db
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder


user_access_router = APIRouter()


@user_access_router.post("/user_access")
async def create(user_type:Annotated[str, Form()],role_id:Annotated[str, Form()],db:Session=Depends(get_db)):
    # print(user_id)
    srv=AccessTable(user_type=user_type,role_id=role_id)
    db.add(srv)
    db.commit()
    return {"Message":"Successfully Add"}

@user_access_router.get("/all_access",response_model=List[AccessSchema])
async def index(db:Session=Depends(get_db)):
    return db.query(AccessTable).all()


@user_access_router.get("/get_all_access/{st_id}")
async def get_itm(st_id:int,db:Session=Depends(get_db)):
    u=db.query(AccessTable).join(Roll, AccessTable.role_id == Roll.id )\
        .add_columns(Roll.id,Roll.roll_details)\
        .filter(AccessTable.user_type == st_id).all()
    p_pro = []
    for pp in u:
        p_pro.append({
            'id':pp.id,
            'roll_details':pp.roll_details
        })
    junit = jsonable_encoder(p_pro)
    return JSONResponse(content=junit)
    

@user_access_router.put("/update_user_access/{st_id}")
async def update(st_id:int,rollcreate:AccessCreateSchema,db:Session=Depends(get_db)):
    try:
        u=db.query(AccessTable).filter(AccessTable.user_type==st_id).first()
        u.user_type=rollcreate.user_type,
        u.role_id=rollcreate.role_id,

        db.add(u)
        db.commit()
        return {"Message":"Successfully Update"}
    except:
        return HTTPException(status_code=404,detail="Update Uncessfull")

