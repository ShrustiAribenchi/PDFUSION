from fastapi import FastAPI, Response,status,FastAPI, File, Form, UploadFile,Request,HTTPException
from starlette.requests import Request
from pydantic import BaseModel
from PyPDF2 import PdfReader
from io import BytesIO
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import ElasticVectorSearch, Pinecone, Weaviate, FAISS
import os
from langchain.chains.question_answering import load_qa_chain
import openai
import fastapi
import numpy as np
import uuid
import pandas as pd
from typing import List
from langchain.text_splitter import RecursiveCharacterTextSplitter
# import pinecone
import pandas as pd
import uuid
from io import BytesIO
from PyPDF2 import PdfReader
import mysql.connector
from langchain.embeddings import HuggingFaceEmbeddings
import pickle
import mysql.connector
from langchain.llms import OpenAI
import uvicorn
from fastapi import FastAPI, Body, Depends
from app.model import UserSchema, UserLoginSchema,Userforgotpasswordschema
from app.auth.auth_bearer import JWTBearer
from app.auth.auth_handler import signJWT, decodeJWT
import bcrypt
from utility import insert_pdf_data, get_pdf_data_by_docId, get_pdf_list, insert_user_data, check_existing_user, user_login_check,forgot_pass_email_check_pass_change
from fastapi.middleware.cors import CORSMiddleware
import jwt
import hmac
import hashlib
import os
from starlette.exceptions import HTTPException
from starlette import status
import datetime
import json
from starlette.exceptions import HTTPException
from starlette import status
from nanoid import generate
from dotenv import load_dotenv
load_dotenv()

JWT_SECRET_hex = os.getenv("secret")
JWT_SECRET = bytes.fromhex(JWT_SECRET_hex)
api_key = os.getenv("OPENAI_API_KEY")


app = FastAPI(title = "PDF CHATBOT",
    description = "This is the personilized CHATBOT for PDF documents")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with the appropriate origin URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/user/signup", tags=["user"])
def create_user(response:Response,user: UserSchema = Body(...)):
    try:

        email_exists = check_existing_user(user)
        if email_exists:
            response.status_code = 400
            return {"msg":"User already registered"}

        # Email does not exist, proceed with signup
        uuid_str = str(uuid.uuid4())
        first_name = user.first_name
        last_name = user.last_name
        email = user.email
        hashed_password = hmac.new(JWT_SECRET, user.password.encode('utf-8'), hashlib.sha256).hexdigest()

        insert_user_data(uuid_str, first_name, last_name, email, hashed_password)

        response.status_code = 200
        return {"msg":"User registered successfully"}
    
    except:
        response.status_code = 500
        return {"msg": "Something went wrong, please retry later"}


@app.post("/user/login", tags=["user"])
def user_login(response:Response,user: UserLoginSchema = Body(...)):
    mail = user.email
    hashed_password = hmac.new(JWT_SECRET, user.password.encode('utf-8'), hashlib.sha256).hexdigest()
    check_login_user = user_login_check(user)

    if check_login_user is None or hashed_password != check_login_user[1]:
        response.status_code = 400
        return {"msg":"Invalid Credentials"}

    else:
        uuid_str = check_login_user[0]
        response.status_code = 200
        return signJWT(uuid_str)

@app.post("/user/forgot_password", tags=["user"])
def forgot_password(response: Response, user: Userforgotpasswordschema = Body(...)):
    # Check if user email exists in the database
    email_exists = forgot_pass_email_check_pass_change(user)

    if not email_exists:
        response.status_code = 400
        return {"msg": "Email does not exist"}

    response.status_code = 200
    return {"msg": "Password updated successfully"}


@app.post("/api/pdf_file_upload", dependencies=[Depends(JWTBearer())])
async def uploadfile(response: Response, request: Request, file: UploadFile = File(default=None)):
    print(request.headers)
    authorization_header = request.headers.get('authorization')
    jwt_token = authorization_header.split(' ')[1] if authorization_header else None

    print(f"JWT Token: {jwt_token}")
    decoded_token = jwt.decode(jwt_token, algorithms=['HS256'], options={"verify_signature": False})

    if decoded_token:
        uuid_str = decoded_token.get("uuid")
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired JWT token")

    filename = file.filename

    # Check if the filename ends with ".pdf" or ".PDF"
    if not filename.lower().endswith((".pdf", ".PDF")):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid file format. File must be a PDF.")

    content = await file.read()  # Read the file contents

    with BytesIO(content) as f:
        reader = PdfReader(f)
        raw_text = ''

        for i, page in enumerate(reader.pages):
            text = page.extract_text()
            if text:
                raw_text += text

        text_splitter = CharacterTextSplitter(
            separator="\n",
            chunk_size=1000,
            chunk_overlap=200,
            length_function=len,
        )

        texts = []
        for chunk in text_splitter.split_text(raw_text):
            pdf_text = f"PDF Name: {filename}\n\n{chunk}"  # Include PDF name in the chunk
            texts.append(pdf_text)

    doc_id = generate(size=21)  # Generate a Nano ID

    insert_pdf_data(uuid_str, doc_id, filename, texts)
    
    response.status_code = 200
    return {"msg": "Document submitted successfully"}


@app.post("/api/document_list", dependencies=[Depends(JWTBearer())])
async def fetch_pdf_text(request: Request):
    try:
        jwt_token = request.headers.get("Authorization").split()[1]
        decoded_token = jwt.decode(jwt_token, algorithms=['HS256'], options={"verify_signature": False})
        uuid_str = decoded_token.get("uuid")

        pdf_data = get_pdf_list(uuid_str)
        if pdf_data:
            pdf_list = json.loads(pdf_data)
            output = [{list(pdf_dict.keys())[0]: pdf_dict[list(pdf_dict.keys())[0]]} for pdf_dict in pdf_list]
            print(output)
            return output
        else:
            return {"msg": "No documents found for the user."}

    except Exception as e:
        return {"msg": f"An error occurred: {str(e)}"}



@app.post("/api/ask-questions",dependencies=[Depends(JWTBearer())])
async def run_qa_model(docId: str = Form(...), question: str = Form(...)):
    try:
        pdf_data = get_pdf_data_by_docId(docId)
        print(pdf_data)
        # embeddings = OpenAIEmbeddings()
        
        # embeddings = HuggingFaceEmbeddings()
        # print(embeddings)

        # with open('embeddings.pkl', 'wb') as f:
        #     pickle.dump(embeddings, f)

        # Load the object from the file using pickle
        with open('embeddings.pkl', 'rb') as f:
            embeddings = pickle.load(f)

        docsearch = FAISS.from_texts(pdf_data, embeddings)

        chain = load_qa_chain(OpenAI(api_key=api_key), chain_type="stuff")
        docs = docsearch.similarity_search(question)

        answer = chain.run(input_documents=docs, question=question)
        # print(answer)
        return answer   
    
    except:

        return {"something went wrong"}
