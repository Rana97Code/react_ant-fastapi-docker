from fastapi import APIRouter,Depends,HTTPException, Form, Request
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
    

# @user_access_router.put("/update_user_access/{a_id}")
# async def update( a_id:int,acc:List[AccessCreateSchema], db:Session=Depends(get_db)):
#     # try:
#         name= jsonable_encoder(acc)
#         # print(a_id)
#         print(name)
#         i = []
#         x = []
#         for i in range(len(name)):
#             print(i)
#             # unt.append({
#             user_type= name[i]["user_type"],
#             role_id= name[i]["role_id"]
#             # })
#             # print(unt)

#         u=db.query(AccessTable).filter(AccessTable.user_type==a_id).all()
#         ua =jsonable_encoder(u)
#         print(ua)
#         # unt = []
#         for e,x in enumerate(ua):
#             x['user_type'] = user_type
#             x['role_id']= role_id
#             db.add(x)
#         db.commit()
#         return {"Message":"Successfully Update"}
#     # except:
#     #     return HTTPException(status_code=404,detail="Update Uncessfull")




# @user_access_router.put("/update_user_access/{a_id}")
# async def update(a_id:int,acc:List[AccessCreateSchema], db:Session=Depends(get_db)):
#         u=db.query(AccessTable).filter(AccessTable.user_type==a_id).all()
#         ua =jsonable_encoder(acc)
#         for o in u:
#             db.delete(o)
#         for ac in ua:
#             db.add_all([AccessTable(**ac)])
#         db.commit()
#         return {"Message":"Successfully Update"}