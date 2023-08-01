from sqlalchemy import create_engine,MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

metadata = MetaData()

# SQLALCHEMY_DATABASE_URL = "mysql://root@localhost/fastapi"
# for docker
# SQLALCHEMY_DATABASE_URL = "mysql+mysqldb://root:root@db:3306/fastapi"
SQLALCHEMY_DATABASE_URL = "mysql+mysqldb://root:root@localhost:3306/fastapi"
#Database connection
engine=create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

metadata.create_all(engine)

Base = declarative_base()

#Session Generate
def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()