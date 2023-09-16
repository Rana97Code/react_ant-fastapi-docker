from fastapi import APIRouter, Depends, HTTPException,status,File, UploadFile, Form
from typing import Annotated
from datetime import datetime, timedelta
# from dependencies import get_token_header
from app.models.users import UserCreateSchema,UserSchema,User,TokenData,UserInDB , SigninRequest,Token, TokenJson,UserRead
from app.config import get_db, engine
from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import passlib.hash as _hash
# import email_validator as validate_email
# import jwt as jwt,JWTError
import bcrypt
from jose import JWTError,jwt
from fastapi.encoders import jsonable_encoder
from pathlib import *

IMAGEDIR = Path('app/img/')


#make a secretkey it's optional
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
#make if for user ensure using @user_router.post("/token")
oath2pass = OAuth2PasswordBearer(tokenUrl="token")


user_router = APIRouter()

def get_user(user_email: str, db:Session=Depends(get_db)):
    if user_email in db:
        user_dict = db[user_email]
        return UserInDB(**user_dict)


#check email is exist or not
def get_user_by_email(user_email: str,db:Session=Depends(get_db)):
    return db.query(User).filter(User.user_email == user_email).first()
    # return db.query(User).filter(User.user_email == user_email).first()


def create_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, ALGORITHM)
    # return dict(access_token=encoded_jwt, token_type="bearer")
    return encoded_jwt



@user_router.post("/create_user")
async def create(user:UserCreateSchema,db:Session=Depends(get_db)): #data field define using schema and session manage
    # try: 
    #     valid = validate_email(user_email=user.user_email)
    #     email = valid.user_email
    # except validate_email:
    #     raise HTTPException(status_code= 404, details="Please Enter a valied Email")
    #email database existing check 
    u_email = get_user_by_email(user_email=user.user_email, db=db)
    if u_email:
        raise HTTPException(
            status_code=400, detail="This user email already exists"
        )
 
    #for password hashing
    hash_password = _hash.bcrypt.hash(user.user_password)
    srv=User(user_name=user.user_name,user_phone=user.user_phone,user_email=user.user_email,user_password=hash_password,confirm_password=hash_password)
    db.add(srv)
    db.commit()
    db.refresh(srv)
    return create_token( {"user_name": user.user_name})


def authenticate_user(user_email: str, user_password: str, db:Session=Depends(get_db)):
    # user = get_user_by_email(user_email=user_email, db=db)
    # with Session(engine) as session:
        results = db.query(User).filter(User.user_email == user_email).first()
        user = results
        if not user:
            return False
        if not user.verify_password(user_password=user_password): #there verify_password is from model
            return False
        return user




@user_router.post("/token")
async def generate_token(form_data: OAuth2PasswordRequestForm= Depends(),  db:Session=Depends(get_db)):
    user = authenticate_user(user_email=form_data.username, user_password=form_data.password, db=db )

    if not user:
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    
    access_token_expires = timedelta(minutes=5)
    access_token = create_token( data={"user_email": user.user_email}, expires_delta=access_token_expires )
    return {"access_token": access_token, "token_type": "bearer", "user_email": user.user_email}



@user_router.post("/signin")
async def generate_token(signin_request: SigninRequest,  db:Session=Depends(get_db)):
    user = authenticate_user(signin_request.user_email, signin_request.user_password , db=db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=20)
    access_token = create_token( data={"user_email": user.user_email}, expires_delta=access_token_expires )
    return {"access_token": access_token, "user_email": user.user_email, "token_type": "bearer"}



# @user_router.get("/current_user")
async def get_current_user(token: Annotated[str, Depends(oath2pass)], db:Session=Depends(get_db)):
#   with Session(engine) as session:
    credentials_exception = HTTPException( status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials",
     headers={"WWW-Authenticate": "Bearer"}, )
    try:
        payload = jwt.decode(token, SECRET_KEY, [ALGORITHM])
        email: str = payload.get("user_email")
        if email is None:
            raise credentials_exception
        token_data = TokenData(user_email=email)
        # print(token_data)
    except JWTError:
        raise HTTPException(status_code=401, detail="JWT Error")
    result = db.query(User).filter(User.user_email==token_data.user_email).first()
    user = result
    if user is None:
        raise HTTPException(status_code=401, detail="User Error")
    return user
    # return token_data



async def get_current_active_user(current_user: Annotated[User, Depends(get_current_user)]):
    if current_user is None:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user



@user_router.get("/my_profile", response_model=UserRead)
async def get_user(current_user: User= Depends(get_current_active_user)):
    user = UserRead(user_email=current_user.user_email)
    return user


@user_router.get("/me", response_model=UserRead)
def read_own_items(current_user:  User= Depends(get_current_active_user)):
    return [{"user_email": current_user.user_email}]

@user_router.get("/get_me/{user_email}")
async def get_itm(user_email:str,db:Session=Depends(get_db)):
    try:
        u=db.query(User).filter(User.user_email == user_email).first()
        # print(jsonable_encoder(u))
        return (u)
    except:
        return HTTPException(status_code=422, details="Unit not found")


@user_router.put("/update_user/{user_id}")
async def update(user_id:int, user:UserSchema, file: UploadFile, db:Session=Depends(get_db)):
    try:
        u=db.query(User).filter(User.id==user_id).first()
        u.user_img=file.filename,
        # u.user_name=user.user_name,
        # u.user_email=user.user_email,
        # u.user_phone=user.user_phone,
        # print(jsonable_encoder(u))
        db.add(u)
        db.commit()
        return {"Message":"Successfully Update"}
    except:
        return HTTPException(status_code=404,detail="Update Uncessfull")
    
@user_router.put("/file_upload/{user_id}")
async def create_upload_files(user_id:int, user_img: UploadFile = File(...), db:Session=Depends(get_db)):
        u=db.query(User).filter(User.id==user_id).first()
        u.user_img=user_img.filename,
        # u.user_name=form.user_name,
        # u.user_email=form.user_email,

        content = await user_img.read()
        # print(user_img)
        with open(f"{IMAGEDIR}/{user_img.filename}","wb") as f:
            f.write(content)

        db.add(u)
        db.commit()
        # junit = jsonable_encoder(u)
        # return JSONResponse(content=junit)
        return {"Message":"Successfully Update"}
 