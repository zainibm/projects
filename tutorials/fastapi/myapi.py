'''
FastAPI => a web framework for building APIs with Python

Commands:
python -m pip install fastapi
pip install uvicorn
    - uvicorn runs the web server
python -m uvicorn myapi:app --reload
'''
from fastapi import FastAPI, Path

# Creates an instance of the fastapi object
app = FastAPI()

students = {
    1: {
        "name": "Zainib",
        "age": 25,
        "class": "college senior"
    }
}

'''
Endpoint => one end of a communication channel
For APIs, an endpoint is delete-user in the URL localhost/delete-user

Endpoint Methods:
GET => return information
POST => create something new
PUT => update information
DELETE => delete something
'''

# @app.get() creates a new API
# / (home) is our endpoint
@app.get("/")
def index():
    return {"name": "First Data"}
