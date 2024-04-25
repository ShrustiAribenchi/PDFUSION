from pydantic import BaseModel, Field, EmailStr, validator
import re
from fastapi import HTTPException, status

class UserSchema(BaseModel):
    first_name: str = Field(...)
    last_name: str = Field(...)
    email: EmailStr = Field(...)
    password: str = Field(...)
    confirm_password: str = Field(...)

    @validator('email')
    def validate_email(cls, email: str):
        # Check if email has a valid format
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail={"msg": "Invalid email format"}
            )
        return email
    
    @validator('password')
    def validate_password(cls, password: str):
        # Check if password has at least one uppercase, one lowercase, one digit, and one special character
        if not re.search(r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$", password):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail={"msg": "Password must have at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character"}
            )
        return password
    
    @validator('confirm_password')
    def passwords_match(cls, v, values):
        if 'password' in values and v != values['password']:
            raise ValueError('passwords do not match')
        return v
    
    
    class Config:
        schema_extra = {
            "example": {
                "first_name": "Shriraj",
                "last_name": "Kulkarni",
                "email": "shriraj@xyz.com",
                "password": "any",
                "confirm_password": "any"
            }
        }

class UserLoginSchema(BaseModel):
    email: EmailStr = Field(...)
    password: str = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "email": "joe@xyz.com",
                "password": "any"
            }
        }
        
class Userforgotpasswordschema(BaseModel):
    email: EmailStr = Field(...)
    new_password: str = Field(...)

    @validator('new_password')
    def validate_password(cls, password: str):
        # Check if password has at least one uppercase, one lowercase, one digit, and one special character
        if not re.search(r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$", password):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail={"msg": "Password must have at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character"}
            )
        return password
    
    class Config:
        schema_extra = {
            "example": {
                "email": "joe@xyz.com",
                "new_password": "any"
            }
        }



# 'cls' refers to the class itself.
# 'v' contains the input data as a dictionary.
# values is a dictionary containing the values for all the fields in the model, whether they were set by the input data or have their default values.


# EMAIL CONDITION:
#The "@" symbol should be present.
# The email should contain at least one character after the "@" symbol.
# There should be a dot (".") after the "@" symbol.
# The email should contain at least one character after the dot.