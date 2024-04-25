# This file is responsible for signing , encoding , decoding and returning JWTS
import time
from typing import Dict
import jwt
import os
import uuid

JWT_SECRET  = os.getenv("secret")
JWT_ALGORITHM = os.getenv("algorithm")


def token_response(token: str):
    return {
        "access_token": token
    }


def signJWT(uuid: uuid.UUID) -> Dict[str, str]:
    payload = {
        # "user_id": user_id,
        "uuid": str(uuid),
        "expires": time.time()+600
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

    return token_response(token)


def decodeJWT(token: str) -> dict:
    try:
        decoded_token = jwt.decode(token, algorithms=['HS256'], options={"verify_signature": False})
        return decoded_token 
    except jwt.exceptions.InvalidAlgorithmError as e:
        print("Invalid algorithm used in JWT token")
        return {}
    except jwt.exceptions.DecodeError as e:
        print("Invalid JWT token")
        return {}

