'''
FastAPI => a web framework for building APIs with Python

Commands:
python -m pip install fastapi
pip install uvicorn
    - uvicorn runs the web server
python -m uvicorn myapi:app --reload
'''
from fastapi import FastAPI, Path
from typing import Optional

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

'''
gt => greater than
ge => greater or equal to
lt => less than
le => less or equal to
'''
@app.get("get-student{student_id}")
def get_student(student_id: int = Path(description="ID of student you want to view")):
    return students[student_id]

'''
A query parameter is search=python in the URL google.com/results?search=python
Unlike paths, a parameter is not appended to an endpoint

name: str = None makes a query parameter optional
name: Optional[str] = None is best practice to make a query parameter optional

name: str = None, test: int results in a "non-default argument follows default argument" error => Optional cannot appear before a required parameter
    - Resolved by prepending * to the parameter list
'''
@app.get("/get-by-name")
def get_by_name(*, name: Optional[str] = None, test: int):
    for student_id in students:
        if students[student_id]["name"] == name:
            return students[student_id]
    return {"Data": "Not found"}