import mysql.connector
from app.model import UserSchema, UserLoginSchema,Userforgotpasswordschema
import hmac
import hashlib
import os
import datetime,json
from dotenv import load_dotenv
load_dotenv()

JWT_SECRET_hex = os.getenv("secret")
JWT_SECRET = bytes.fromhex(JWT_SECRET_hex)

import datetime

def insert_pdf_data(uuid_str, doc_id, pdf_name, pdf_text):
    # Establish a connection with the MySQL database (Add the required field from db)
    db_user = ''
    db_passwd = ''
    db_host = ''
    database = ''
    port = ''

    conn = mysql.connector.connect(user=db_user, password=db_passwd,
                                   host=db_host,
                                   database=database,
                                   port=port)

    now = datetime.datetime.now()
    sql = "INSERT INTO user_pdf_data (user_uuid, doc_id, pdf_name, pdf_text, upload_timestamp) VALUES (%s, %s, %s, %s, %s)"
    val = (uuid_str, doc_id, pdf_name, "".join(pdf_text), now)

    try:
        mycursor = conn.cursor()
        mycursor.execute(sql, val)
        conn.commit()
        print(mycursor.rowcount, "record inserted.")
    except mysql.connector.IntegrityError:
        print(f"Error: Record with UUID {uuid_str} already exists.")


def get_pdf_data_by_docId(docId):
    conn = None
    try:
        # Establish a connection with the MySQL database (Add the required field from db)
        db_user = ''
        db_passwd = ''
        db_host = ''
        database = ''
        port = ''

        conn = mysql.connector.connect(user=db_user, password=db_passwd,
                                    host=db_host,
                                    database=database,
                                    port=port)
        cursor = conn.cursor()

        sql = "SELECT pdf_text FROM user_pdf_data WHERE doc_id = %s"
        val = (docId,)
        cursor.execute(sql, val)

        result = cursor.fetchone()
        if result:
            texts_str = result[0]
            texts = texts_str.split(",")
            return texts

    except mysql.connector.Error as e:
        print(f"Error while connecting to MySQL {e}")

    finally:
        if conn:
            conn.close()

def get_pdf_list(uuid_str):
    try:
        # Establish a connection with the MySQL database (Add the required field from db)
        db_user = ''
        db_passwd = ''
        db_host = ''
        database = ''
        port = ''

        conn = mysql.connector.connect(user=db_user, password=db_passwd,
                                       host=db_host,
                                       database=database,
                                       port=port)
        cursor = conn.cursor()

        sql = "SELECT doc_id, pdf_name FROM user_pdf_data WHERE user_uuid = %s"
        cursor.execute(sql, (uuid_str,))

        pdf_list = []
        results = cursor.fetchall()
        print(results)
        for result in results:
            doc_id = result[0]
            doc_name = result[1]
            pdf_dict = {doc_id: doc_name}
            pdf_list.append(pdf_dict)

        return json.dumps(pdf_list)

    except mysql.connector.Error as e:
        print(f"Error while connecting to MySQL {e}")

    finally:
        if conn:
            conn.close()


def insert_user_data(uuid_str, first_name, last_name,email,password):
    # Establish a connection with the MySQL database (Add the required field from db)
    db_user = ''
    db_passwd = ''
    db_host = ''
    database = ''
    port = ''

    conn = mysql.connector.connect(user=db_user, password=db_passwd,
                                host=db_host,
                                database=database,
                                port=port)
    now = datetime.datetime.now()
    sql = "INSERT INTO user_table (uuid, first_name, last_name, email, password, signup_timestamp) VALUES (%s, %s, %s, %s, %s, %s)"
    val = (uuid_str, first_name, last_name, email, password, now)
    
    try:
        mycursor = conn.cursor()
        mycursor.execute(sql, val)
        conn.commit()
        print(mycursor.rowcount, "record inserted.")
    except mysql.connector.IntegrityError:
        print(f"Error: Record with UUID {uuid_str} already exists.")


def check_existing_user(user: UserSchema):
    # Establish a connection with the MySQL database (Add the required field from db)
    db_user = ''
    db_passwd = ''
    db_host = ''
    database = ''
    port = ''

    conn = mysql.connector.connect(user=db_user, password=db_passwd,
                                   host=db_host,
                                   database=database,
                                   port=port)
    cursor = conn.cursor()

    query = "SELECT email FROM langchain_chatbot.user_table WHERE email = %s"
    cursor.execute(query, (user.email,))
    result = cursor.fetchone()

    # Check if a row was found for the email
    if result is None:
        return False  # Email does not exist
    else:
        return True  # Email already exists

    cursor.close()
    conn.close()



def user_login_check(user: UserLoginSchema):
    # Establish a connection with the MySQL database (Add the required field from db)
    db_user = ''
    db_passwd = ''
    db_host = ''
    database = ''
    port = ''

    conn = mysql.connector.connect(user=db_user, password=db_passwd,
                                   host=db_host,
                                   database=database,
                                   port=port)
    cursor = conn.cursor()

    query = "SELECT uuid, password FROM langchain_chatbot.user_table WHERE email = %s"
    cursor.execute(query, (user.email,))
    result = cursor.fetchone()
    return result
    cursor.close()
    conn.close()


def forgot_pass_email_check_pass_change(user: Userforgotpasswordschema):
    # Establish a connection with the MySQL database (Add the required field from db)
    db_user = ''
    db_passwd = ''
    db_host = ''
    database = ''
    port = ''

    conn = mysql.connector.connect(user=db_user, password=db_passwd,
                                   host=db_host,
                                   database=database,
                                   port=port)
    cursor = conn.cursor()

    query = "SELECT email FROM langchain_chatbot.user_table WHERE email = %s"
    cursor.execute(query, (user.email,))
    result = cursor.fetchone()

    # Check if a row was found for the email
    if result is None:
        return False  # Email does not exist
    else:
        # Update the password for the email
        update_query = "UPDATE langchain_chatbot.user_table SET password = %s WHERE email = %s"
        hashed_password = hmac.new(JWT_SECRET, user.new_password.encode('utf-8'), hashlib.sha256).hexdigest()
        cursor.execute(update_query, (hashed_password, user.email))
        conn.commit()
        return True  # Email exists and password updated successfully

    cursor.close()
    conn.close()
