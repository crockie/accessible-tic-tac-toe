from fastapi import FastAPI
from app.sockets import sio_app

app = FastAPI()
app.mount("/ws", app=sio_app)


@app.get("/")
def read_root():
    return {"message": "hello world!"}
