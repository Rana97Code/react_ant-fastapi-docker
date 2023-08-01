# from fastapi import APIRouter,Depends,HTTPException, Response
# from typing import Union,List,Optional
# from sqlalchemy.orm import Session
# from sqlalchemy import text
# from app.models.service_mail import Service_mailCreateSchema,Service_mailSchema,Service_mail
# from app.models.units import Unit,UnitSchema
# from app.config import get_db
# from fastapi.responses import JSONResponse
# from fastapi.encoders import jsonable_encoder





# product_router = APIRouter()


# @product_router.post("/product_add")
# def create(product:Service_mailCreateSchema,db:Session=Depends(get_db)):
#     srv=Service_mail(unit_id=product.unit_id,product_name=product.product_name,product_sku=product.product_sku,product_qty=product.product_qty,product_details=product.product_details)
#     db.add(srv)
#     db.commit()
#     return {"Message":"Successfully Add"}

# @product_router.get("/products")
# def index(db:Session=Depends(get_db)):
#     unit = db.query(Service_mail,Unit).join(Unit, Product.unit_id == Unit.id ).add_columns(Unit.unit_name, Product.id, Product.product_name,Product.product_qty, Product.product_details).all()
#     # unit = db.query(Product, Unt).join(Unt, Unt.id==Product.unit_id).all()
#     untt = []
#     for unt in unit:
#         # print(unt.unit_name, unt.product_name)
#         untt.append({
#             'id': unt.id,
#             'unit_name':unt.unit_name,
#             'product_name':unt.product_name,
#             'product_qty':unt.product_qty,
#             'product_details':unt.product_details
#             })

#     junit = jsonable_encoder(untt)
#     return JSONResponse(content=junit)




# @product_router.get("/get_product/{st_id}",response_model=Service_mailSchema)
# def get_itm(st_id:int,db:Session=Depends(get_db)):
#     try:
#         u=db.query(Product).filter(Product.id == st_id).first()
#         return (u)
#     except:
#         return HTTPException(status_code=422, details="Unit not found")
    

# @product_router.put("/update_Product/{st_id}")
# def update(st_id:int,product:Service_mailCreateSchema,db:Session=Depends(get_db)):
#     try:
#         u=db.query(Product).filter(Product.id==st_id).first()
#         u.unit_id=product.unit_id,
#         u.product_name=product.product_name,
#         u.product_sku=product.product_sku,
#         u.product_qty=product.product_qty,
#         u.product_details=product.product_details
#         db.add(u)
#         db.commit()
#         return {"Message":"Successfully Update"}
#     except:
#         return HTTPException(status_code=404,detail="Update Uncessfull")


# @product_router.delete("/delete_product/{st_id}",response_class=JSONResponse)
# def delete(st_id:int,db:Session=Depends(get_db)):
#     try:
#         u=db.query(Product).filter(Product.id==st_id).first()
#         db.delete(u)
#         db.commit()
#         return {"Product has been deleted"}
#     except:
#         return HTTPException(status_code=422, details="user not found")




















#         *********Flask Code *******

# from flask import render_template, request, flash, redirect, url_for, json, jsonify
# from flask_login import LoginManager, login_required, current_user
# from sqlalchemy import text
# from apps.purchase import blueprint
# from apps import db
# from apps.purchase.models import Purchase, PurchaseLine, PurchaseSchema, PurchaseLineSchema
# from apps.purchase.forms import PurchaseForm
# from apps.suppliers.models import Suppliers
# from apps.items.models import Items
# login_manager = LoginManager()
# @blueprint.route('/purchase/')
# @login_required
# def purchase_page():
#     form = PurchaseForm(request.form)
#     result = Purchase.query.all()
#     # result = db.session.execute(
#     #     "SELECT items.*, hs_code.hs_code, units.unit_name "
#     #     "FROM `items` "
#     #     "JOIN units ON items.unit_id = units.id "
#     #     "JOIN hs_code  ON items.hs_code = hs_code.id "
#     # )
#     return render_template('purchase/index.html', purchase=result, form=form)
# @blueprint.route('/purchase/create/', methods=['GET', 'POST'])
# def purchase_create():
#     form = PurchaseForm(request.form)
#     form.supplier_id.choices = [(suppliers.id, suppliers.supplier_name) for suppliers in Suppliers.query.all()]
#     if request.method == "GET":
#         items = Items.query.all()
#         result = db.session.execute(
#             "SELECT items.item_name "
#             "FROM `items` "
#         )
#     return render_template('purchase/create.html', form=form, items=result)
# @blueprint.route('/purchase/store/', methods=['GET', 'POST'])
# def purchase_store():
#     form = PurchaseForm(request.form)
#     invoice_no = '1001'
#     if 'purchase_store' in request.form:
#         query = db.session.execute("SELECT `p_invoice_no` FROM `purchase` ORDER BY `id` DESC LIMIT 1")
#         for result in query:
#             invoice_no = int(result.p_invoice_no) + 1
#         data = Purchase(
#             supplier_id=form.supplier_id.data,
#             p_invoice_no=invoice_no,
#             entry_date=form.entry_date.data,
#             challan_date=form.challan_date.data,
#             purchase_type='3',
#             vendor_invoice=form.challan_no.data,
#             grand_total=form.grand_total.data,
#             total_tax=request.form['total_vat'],
#             user_id=current_user.get_id()
#         )
#         db.session.add(data)
#         db.session.commit()
#         data_line = form.allpurchase.data
#         line_data = json.loads(data_line)
#         purchase_id = {"purchase_id": data.id}
#         purchase_date = {"purchase_date": request.form['challan_date']}
#         entry_date = {"entry_date": request.form['entry_date']}
#         for i in range(len(line_data)):
#             line_data[i]["purchase_id"] = purchase_id["purchase_id"]
#             line_data[i]["purchase_date"] = purchase_date["purchase_date"]
#             line_data[i]["entry_date"] = entry_date["entry_date"]
#         # print(line_data)
#         for row in line_data:
#             print(row)
#             purchase_line = [PurchaseLine(**row)]
#             db.session.add_all(purchase_line)
#             db.session.commit()
#     flash("Purchase Store Successfully")
#     return redirect(url_for('purchase.purchase_page'))
# @blueprint.route('/api/purchase/supplier/<supplier_id>/', methods=['GET', 'POST'])
# def purchase_by_supplier_id(supplier_id):
#     purchase_list = Purchase.query.join(PurchaseLine, Purchase.id == PurchaseLine.purchase_id)\
#         .add_columns\
#         (
#             Purchase.id,
#             Purchase.supplier_id,
#             Purchase.p_invoice_no,
#             Purchase.vendor_invoice,
#             Purchase.challan_date,
#             Purchase.total_vds,
#             Purchase.total_tax,
#             Purchase.grand_total,
#             Purchase.entry_date,
#             Purchase.user_id
#         ).filter(Purchase.supplier_id == supplier_id)
#     print(purchase_list)
#     purchase_schema = PurchaseSchema()
#     output = purchase_schema.dump(purchase_list, many=True)
#     return jsonify(output)\
# @blueprint.route('/api/purchase/', methods=['GET', 'POST'])
# def purchase_all():
#     purchase_list = Purchase.query.all()
#     print(purchase_list)
#     purchase_schema = PurchaseSchema()
#     output = purchase_schema.dump(purchase_list, many=True)
#     return jsonify(output)
# @blueprint.route('/api/purchase/<id>/', methods=['GET', 'POST'])
# def purchase_by_id(id):
#     purchase_list = Purchase.query.get(id)
#     print(purchase_list)
#     purchase_schema = PurchaseSchema()
#     output = purchase_schema.dump(purchase_list)
#     return jsonify(output)
# @blueprint.route('/api/purchase_line/<purchase_id>/', methods=['GET', 'POST'])
# def purchase_line_by_id(purchase_id):
#     t = text(
#         "SELECT p.grand_total, i.item_name, Pl.* "
#         "FROM purchase_line AS Pl, purchase AS p, items AS i "
#         "WHERE p.id = Pl.purchase_id AND i.id = Pl.item_id AND p.id = :purchase_id"
#         )
#     purchase_list = db.session.execute(t, {'purchase_id': purchase_id})
#     print(purchase_list)
#     purchase_schema = PurchaseLineSchema()
#     output = purchase_schema.dump(purchase_list, many=True)
#     return jsonify(output)







