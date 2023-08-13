from fastapi import APIRouter, Depends, HTTPException,Query
from typing import Union,List,Optional,Annotated
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_
from app.models.provided_service import ProServiceCreateSchema,ServiceProductSchema,ServiceProductIdArray,Provided_service
from app.models.mail_content import MailContent
from app.models.service_mail import Service_mail
from app.models.customers import Customer
from app.models.units import Unit
from app.config import engine, Base, SessionLocal, get_db
from datetime import datetime, date,timedelta
from dateutil.relativedelta import relativedelta
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

p_service_router = APIRouter()


# date_now = (purchase_date.year)
# date_2 = date_now.replace(year=years_to_add).strftime('%Y-%m-%d')

@p_service_router.post("/add_Provided_service")
def create(p_p:ProServiceCreateSchema,db:Session=Depends(get_db)):
    srv=Provided_service(product_name=p_p.product_name,unit_id=p_p.unit_id,customer_id=p_p.customer_id,p_qty=p_p.p_qty,
                         purchase_date=p_p.purchase_date,service_time=p_p.service_time,notify_time=p_p.notify_time, notification_type=p_p.notification_type,sms_id=p_p.sms_id,email_id=p_p.email_id,auto_renew=p_p.auto_renew,
                         expiry_date=datetime.strptime(p_p.purchase_date, '%Y-%m-%d') + relativedelta(months=int(p_p.service_time)),
                         renew_date = datetime.strptime(p_p.purchase_date, '%Y-%m-%d').date() + relativedelta(months=int(p_p.service_time))-relativedelta(days=int(p_p.notify_time))
                         )
    db.add(srv)
    db.commit()

    # service_id = srv.id
    # ml_id = jsonable_encoder(p_p.mail_id)
    # for i in range(len(ml_id)):
    #         ml_id[i]["service_id"] = service_id
    #         ml_id[i]["mail_id"] = ml_id
    #     # print(line_data)
    # for row in ml_id:
    #         # print(row)
    #         mail = [Service_mail(**row)]
    #         db.add_all(mail)
    #         db.commit()

    # return {"id":srv.id}
    return {"Message":"Successfully Add"}

@p_service_router.get("/Provided_services",response_model=List[ServiceProductSchema])
def index(db:Session=Depends(get_db)):
    p_p = db.query(Provided_service,Customer,Unit,MailContent).join(Customer, Provided_service.customer_id == Customer.id ).join(Unit, Provided_service.unit_id == Unit.id )\
                .join(MailContent, or_(Provided_service.sms_id == MailContent.id, Provided_service.email_id == MailContent.id) )\
            .add_columns(Provided_service.product_name,Unit.unit_name, Customer.customer_name, Provided_service.id, Provided_service.p_qty,  Provided_service.purchase_date,
                 Provided_service.service_time,Provided_service.notify_time,Provided_service.notification_type,MailContent.mail_title, Provided_service.expiry_date,Provided_service.renew_date,Provided_service.auto_renew).all()
    p_pro = []
    for pp in p_p:
        # print(pp.product_name, pp.customer_name,pp.unit_name)
        p_pro.append({
            'id':pp.id,
            'product_name':pp.product_name,
            'unit_name':pp.unit_name,
            'customer_name':pp.customer_name,
            'p_qty':pp.p_qty,
            'purchase_date':pp.purchase_date,
            'expiry_date':pp.expiry_date,
            'service_time':pp.service_time,
            'notify_time':pp.notify_time,
            'notification_type':pp.notification_type,
            'mail_title':pp.mail_title,
            'renew_date':pp.renew_date,
            'auto_renew':pp.auto_renew
            })

    junit = jsonable_encoder(p_pro)
    return JSONResponse(content=junit)
    # return db.query(Provided_service).all()

@p_service_router.get("/get_Provided_service/{pp_id}",response_model=ServiceProductSchema)
def get_itm(pp_id:int,db:Session=Depends(get_db)):
    u=db.query(Provided_service).filter(Provided_service.id == pp_id).first()
    junit = jsonable_encoder(u)
    return JSONResponse(content=junit)

@p_service_router.put("/update_Provided_service/{pp_id}")
def update(pp_id:int,p_product:ProServiceCreateSchema,db:Session=Depends(get_db)):
    try:
        u=db.query(Provided_service).filter(Provided_service.id==pp_id).first()
        u.product_name=p_product.product_name,
        u.customer_id=p_product.customer_id,
        u.p_qty=p_product.p_qty,
        u.unit_id=p_product.unit_id,
        u.expiry_date=datetime.strptime(p_product.purchase_date, '%Y-%m-%d') + relativedelta(months=int(p_product.service_time)),
        u.renew_date=datetime.strptime(p_product.purchase_date, '%Y-%m-%d').date() + relativedelta(months=int(p_product.service_time))-relativedelta(days=int(p_product.notify_time)),
        u.service_time=p_product.service_time
        u.notify_time=p_product.notify_time
        u.notification_type=p_product.notification_type
        u.sms_id=p_product.sms_id
        u.email_id=p_product.email_id
        u.auto_renew=p_product.auto_renew
        db.add(u)
        db.commit()
        return {"Message":"Successfully Update"}
    except:
        return HTTPException(status_code=404,detail="Update Unsuccessfull")

#for type of parameter pass
@p_service_router.post("/get_Provided_services",response_model=List[ServiceProductSchema])
async def g_itm(pp_id:ServiceProductIdArray, db:Session=Depends(get_db)):
    u=db.query(Provided_service).filter(Provided_service.id.in_(pp_id.s_id)).all()
    junit = jsonable_encoder(u)
    return JSONResponse(content=junit)

@p_service_router.put("/get_up/{s_id}",response_model=List[ServiceProductSchema])
async def get_id(s_id:str,db:Session=Depends(get_db)):
    y = s_id.split(",")
    # print(y)
    u=db.query(Provided_service).filter(Provided_service.id.in_(y)).all()
    junit = jsonable_encoder(u)
    return JSONResponse(content=junit)

  
@p_service_router.put("/get_up_service")
def get_u(pp_id:Annotated[list[str], Query()] = [62,75],db:Session=Depends(get_db)):
    u=db.query(Provided_service).filter(Provided_service.id.in_(pp_id)).all()
    junit = jsonable_encoder(u)
    # print(junit)
    return JSONResponse(content=junit)



@p_service_router.put("/update_service/{pp_id}",response_model=List[ServiceProductSchema])
async def upd(pp_id:str, p_product:List[ProServiceCreateSchema], db:Session=Depends(get_db)):
    # try:
        print(pp_id)
        y = pp_id.split(",")
        # print(y)
        u=db.query(Provided_service).filter(Provided_service.id.in_(y)).all()
        
        # junit = jsonable_encoder(u)
        # print(junit)
        # return JSONResponse(content=junit)
        i=[]
        for i in range(len(u)):
            u[i].product_name=p_product.product_name,
            u[i].customer_id=p_product.customer_id,
            u[i].p_qty=p_product.p_qty,
            u[i].unit_id=p_product.unit_id,
            u[i].expiry_date=datetime.strptime(p_product.purchase_date, '%Y-%m-%d') + relativedelta(months=int(p_product.service_time)),
            u[i].renew_date=datetime.strptime(p_product.purchase_date, '%Y-%m-%d').date() + relativedelta(months=int(p_product.service_time))-relativedelta(days=int(p_product.notify_time)),
            u[i].service_time=p_product.service_time
            u[i].notify_time=p_product.notify_time
            u[i].notification_type=p_product.notification_type
            u[i].sms_id=p_product.sms_id
            u[i].email_id=p_product.email_id
            u[i].auto_renew=p_product.auto_renew
            db.add(u)
            db.commit()
        return {"Message":"Successfully Update"}
    # except:
    #     return HTTPException(status_code=404,detail="Update Unsuccessfull")

@p_service_router.delete("/delete_Provided_service/{pp_id}",response_class=JSONResponse)
def get_itm(pp_id:int,db:Session=Depends(get_db)):
    try:
        u=db.query(Provided_service).filter(Provided_service.id==pp_id).first()
        db.delete(u)
        db.commit()
        return {"Provided_service has been deleted"}
    except:
        return HTTPException(status_code=422, details="user not found")