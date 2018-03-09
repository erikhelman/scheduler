from flask import Flask, jsonify, render_template, request, url_for, redirect, json
from security import pwd_context
import uuid
from send_email import send_mail
import jwt
from flask_sqlalchemy import SQLAlchemy
import os
from flask_cors import CORS
import string
import random
from time import time


app = Flask(__name__)

app.config.from_pyfile('config.py')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']

CORS(app, resources={r"https://floating-fortress-53646.herokuapp.com/*": {"origins": "*"}, r"/*": {"supports_credentials": True}})

db = SQLAlchemy(app)
url = "https://glacial-sierra-90432.herokuapp.com/"


class Users(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True)
    first_name = db.Column(db.String(25))
    last_name = db.Column(db.String(25))
    password = db.Column(db.String(100))
    status = db.Column(db.String(10)) # active, inactive, pending
    role = db.Column(db.String(5))
    email = db.Column(db.String(50))
    students = db.relationship('Students', backref='login', lazy='dynamic')
    info = db.relationship('Profile', backref='users', uselist=False)


class Students(db.Model):
    student_id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String(25))
    lname = db.Column(db.String(25))
    gender = db.Column(db.String(1))
    dob = db.Column(db.DateTime(timezone=True))
    level = db.Column(db.Integer)
    class_type = db.Column(db.String(30))
    class_length = db.Column(db.Integer)
    status = db.Column(db.String(20)) # values = Active, Inactive
    emerg_contact = db.Column(db.String(50))
    emerg_phone = db.Column(db.String(10))
    previous_school = db.Column(db.String(100))
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))


class Profile(db.Model):
    info_id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String(50))
    lname = db.Column(db.String(50))
    customer_id = db.Column(db.Integer)
    city = db.Column(db.String(50))
    province = db.Column(db.String(2))
    street = db.Column(db.String(200))
    postal = db.Column(db.String(6))
    phone = db.Column(db.String(10))
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))


@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':

        data = json.loads(request.data.decode('utf8'))
        email = data['email'].lower()
        password = data['password']

        user = Users.query.filter(Users.email == email).first()

        if user:

            if user.status == 'active':

                if pwd_context.verify(password,user.password):

                    payload = {'user_id' : user.public_id}
                    token = (jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256').decode("utf-8"))
                    return jsonify({"isAuthenticated": "true", "role": user.role, "token": token})

                return jsonify({"isAuthenticated": "false", "error": "Email address and/or password are incorrect."})

            elif user.status == 'inactive':

                return jsonify({"isAuthenticated": "false",
                                "error": "This account has been deactivated. Please contact info@championswimming.ca for more details."})

            elif user.status == 'pending':

                return jsonify({"isAuthenticated": "false",
                                "error": "This account has not yet been activated. Champion Swimming will contact you with further details."})

        return jsonify({"isAuthenticated": "false", "error": "Username and/or password are incorrect."})

    return ''


@app.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        payload = request.data.decode('utf8')
        data = json.loads(payload)

        email = data['email'].lower().strip()
        password = data['password']

        if Users.query.filter(Users.email == email).first() is None:

            user = Users(public_id=uuid.uuid4(),
                         password=pwd_context.hash(password),
                         status='pending',
                         role='user',
                         email=email)

            user.info = Profile(fname=data['fname'],
                                lname=data['lname'],
                                customer_id=None,
                                city=None,
                                province=None,
                                street=None,
                                postal=None,
                                phone=data['phone'])

            for s in data['students']:

                with open('student.txt', 'w') as f:
                    json.dump(s, f)

                new_student = Students(fname=s['fname'],
                                       lname=s['lname'],
                                       gender=s['gender'],
                                       dob=s['dob'],
                                       level=s['level'],
                                       class_type=s['class_type'],
                                       class_length=s['class_length'],
                                       status='Pending',
                                       emerg_contact=None,
                                       emerg_phone=None,
                                       previous_school=s['previous_school'])

                user.students.append(new_student)

            db.session.add(user)
            db.session.commit()

            send_mail(
                'helman.erik@gmail.com',
                'Registration - Action Required',
                'A new user has registered in the system, ' + data['fname'] + ' ' + data['lname']+ '.'

            )

            return jsonify({"isRegistered": "true"})

        else:
            return jsonify({"isRegistered": "false",
                            "errors": "This user name already exists, please select a different one."})

    return ''


@app.route('/profile', methods=['POST'])
def get_profile():

    if request.method == 'POST':
        payload = request.data.decode('utf8')
        data = json.loads(payload)

        try:
            token = jwt.decode(data['token'], app.config['SECRET_KEY'], algorithms='HS256')

        except jwt.ExpiredSignatureError:
            return "Token has expired, please log in again"

        except (jwt.DecodeError, jwt.InvalidTokenError):
            return "Invalid token provided"

        else:

            user_id = token['user_id']
            profile = Users.query.filter(Users.public_id == user_id).first()

            user_profile = {}
            user_profile['fname'] = profile.info.fname
            user_profile['lname'] = profile.info.lname
            user_profile['city'] = profile.info.city
            user_profile['province'] = profile.info.province
            user_profile['street'] = profile.info.street
            user_profile['postal'] = profile.info.postal
            user_profile['phone'] = profile.info.phone
            user_profile['email'] = profile.email

            return jsonify(user_profile)

    return ''


@app.route('/update_profile', methods=['POST'])
def update_profile():
    if request.method == 'POST':
        payload = request.data.decode('utf8')
        data = json.loads(payload)

        with open ('testfile.txt','w') as f:
           json.dump(data, f)

        try:
            token = jwt.decode(data['token'], app.config['SECRET_KEY'], algorithms='HS256')

        except jwt.ExpiredSignatureError:
            return "Token has expired, please log in again"

        except (jwt.DecodeError, jwt.InvalidTokenError):
            return "Invalid token provided"

        else:
            user_id = token['user_id']
            user = Users.query.filter(Users.public_id == user_id).first()

            if data['phone'] == '':
                data['phone'] = None

            user.info.fname = data['fname']
            user.info.lname = data['lname']
            user.info.city = data['city']
            user.info.province = data['province']
            user.info.street = data['street']
            user.info.postal = data['postal']
            user.info.phone = data['phone']
            user.email = data['email']

            db.session.add(user)
            db.session.commit()

            return jsonify({"profileUpdate": "true"})

    return ''


@app.route('/students', methods=['POST'])
def get_students():
    if request.method == 'POST':
        payload = request.data.decode('utf8')
        data = json.loads(payload)

        try:
            token = jwt.decode(data['token'], app.config['SECRET_KEY'], algorithms='HS256')

        except jwt.ExpiredSignatureError:
            return "Token has expired, please log in again"

        except (jwt.DecodeError, jwt.InvalidTokenError):
            return "Invalid token provided"

        else:
            user_id = token['user_id']
            user = Users.query.filter(Users.public_id == user_id).first()

            userdata = {}
            userdata['students'] = []

            for s in user.students:

                new_student = {'student_id': s.student_id,
                               'fname': s.fname if s.fname != None else '',
                               'lname': s.lname if s.lname != None else '',
                               'dob': s.dob.isoformat() if s.dob != None else s.dob,
                               'gender': s.gender if s.gender != None else '',
                               'level': s.level if s.level != None else '',
                               'class_type': s.class_type if s.gender != None else '',
                               'class_length': s.class_length if s.class_length != None else '',
                               'status': s.status if s.status != None else '',
                               'emerg_contact': s.emerg_contact if s.emerg_contact != None else '',
                               'emerg_phone': s.emerg_phone if s.emerg_phone != None else ''}

                userdata['students'].append(new_student)

            return jsonify(userdata)

    return ''


@app.route('/update_students', methods=['POST'])
def update_students():
    if request.method == 'POST':
        payload = request.data.decode('utf8')
        data = json.loads(payload)

        with open ('testfile.txt','w') as f:
            json.dump(data, f)

        try:
            token = jwt.decode(data['token'], app.config['SECRET_KEY'], algorithms='HS256')

        except jwt.ExpiredSignatureError:
            return "Token has expired, please log in again"

        except (jwt.DecodeError, jwt.InvalidTokenError):
            return "Invalid token provided"

        else:
            user_id = token['user_id']
            user = Users.query.filter(Users.public_id == user_id).first()

            if user.students.count() != len(data['students']):

                for es in user.students:

                    match = False

                    for ds in data['students']:

                        if es.student_id == ds['student_id']:

                            match = True

                    if not match:

                        Students.query.filter(Students.student_id==es.student_id).delete()

            for s in data['students']:

                date = None
                class_length = None
                emerg_phone = None

                if 'dob' in s:

                    if s['dob'] != '':
                        date = s['dob']

                if 'class_length' in s:

                    if s['class_length'] != '':

                        class_length = s['class_length']

                if 'emerg_phone' in s:

                    if s['emerg_phone'] != '':

                        emerg_phone = s['emerg_phone']

                if s['student_id'] == str(-1):

                    new_student = Students(fname = s['fname'] if 'fname' in s else None,
                                           lname=s['lname'] if 'lname' in s else None,
                                           gender=s['gender'] if 'gender' in s else None,
                                           dob = date,
                                           level=s['level'] if 'level' in s else None,
                                           class_type=s['class_type'] if 'class_type' in s else None,
                                           class_length= class_length,
                                           emerg_contact=s['emerg_contact'] if 'emerg_contact' in s else None,
                                           emerg_phone=emerg_phone)

                    user.students.append(new_student)

                else:

                    for es in user.students:

                        if es.student_id == s['student_id']:
                            es.fname = s['fname'] if 'fname' in s else None
                            es.lname = s['lname'] if 'lname' in s else None
                            es.gender = s['gender'] if 'gender' in s else None
                            es.dob = date
                            es.level = s['level'] if 'level' in s else None
                            es.class_type = s['class_type'] if 'class_type' in s else None
                            es.class_length = class_length
                            es.emerg_contact=s['emerg_contact'] if 'emerg_contact' in s else None
                            es.emerg_phone=emerg_phone

            db.session.add(user)
            db.session.commit()

            userdata = {}
            userdata['students'] = []

            for s in user.students:
                new_student = {'student_id': s.student_id,
                               'fname': s.fname if s.fname != None else '',
                               'lname': s.lname if s.lname != None else '',
                               'dob': s.dob.isoformat() if s.dob != None else s.dob,
                               'gender': s.gender if s.gender != None else '',
                               'level': s.level if s.level != None else '',
                               'class_type': s.class_type if s.gender != None else '',
                               'class_length': s.class_length if s.class_length != None else '',
                               'status': s.status if s.status != None else '',
                               'emerg_contact': s.emerg_contact if s.emerg_contact != None else '',
                               'emerg_phone': s.emerg_phone if s.emerg_phone != None else ''}

                userdata['students'].append(new_student)

            userdata['studentUpdate'] = True

            return jsonify(userdata)

    return ''


@app.route('/update_admin_student', methods=['POST'])
def update_admin_student():
    if request.method == 'POST':
        payload = request.data.decode('utf8')
        data = json.loads(payload)

        with open ('testfile.txt','w') as f:
            json.dump(data, f)


        try:
            token = jwt.decode(data['token'], app.config['SECRET_KEY'], algorithms='HS256')

        except jwt.ExpiredSignatureError:
            return "Token has expired, please log in again"

        except (jwt.DecodeError, jwt.InvalidTokenError):
            return "Invalid token provided"

        else:
            student_id = data['id']
            s = Students.query.filter(Students.student_id == student_id).first()

            date = None
            class_length = None
            emerg_phone = None

            if 'dob' in s:

                if s['dob'] != '':
                    date = s['dob']

            if data['class_length'] != '':

                class_length = data['class_length']

            if data['emerg_phone'] != '':

                emerg_phone = data['emerg_phone']

            s.fname = data['fname'] if data['fname'] != '' else None
            s.lname = data['lname'] if data['lname'] != '' else None
            s.gender = data['gender'] if data['gender'] != '' else None
            s.dob = date
            s.level = data['level'] if data['level'] != '' else None
            s.class_type = data['class_type'] if data['class_type'] != '' else None
            s.class_length = class_length
            s.emerg_contact=data['emerg_contact'] if data['emerg_phone'] != '' else None
            s.emerg_phone=emerg_phone

            db.session.add(s)
            db.session.commit()

            return jsonify({"studentUpdate": "true"})

    return ''


@app.route('/admin_student', methods=['POST'])
def get_admin_student():
    if request.method == 'POST':
        payload = request.data.decode('utf8')
        data = json.loads(payload)

        with open ('testfile.txt','w') as f:
            json.dump(data, f)

        try:
            token = jwt.decode(data['token'], app.config['SECRET_KEY'], algorithms='HS256')

        except jwt.ExpiredSignatureError:
            return "Token has expired, please log in again"

        except (jwt.DecodeError, jwt.InvalidTokenError):
            return "Invalid token provided"

        else:
            student_id = data['id']
            s = Students.query.filter(Students.student_id == student_id).first()

            userdata = {'student_id': s.student_id,
                           'fname': s.fname if s.fname != None else '',
                           'lname': s.lname if s.lname != None else '',
                           'dob': s.dob.isoformat() if s.dob != None else s.dob,
                           'gender': s.gender if s.gender != None else '',
                           'level': s.level if s.level != None else '',
                           'class_type': s.class_type if s.gender != None else '',
                           'class_length': s.class_length if s.class_length != None else '',
                           'status': s.status if s.status != None else '',
                           'emerg_contact': s.emerg_contact if s.emerg_contact != None else '',
                           'emerg_phone': s.emerg_phone if s.emerg_phone != None else ''}

            return jsonify(userdata)

    return ''


@app.route('/all_students', methods=['POST'])
def get_all_students():
    if request.method == 'POST':

        payload = request.data.decode('utf8')
        data = json.loads(payload)

        try:
            jwt.decode(data['token'], app.config['SECRET_KEY'], algorithms='HS256')

        except jwt.ExpiredSignatureError:
            return "Token has expired, please log in again"

        except (jwt.DecodeError, jwt.InvalidTokenError):
            return "Invalid token provided"

        else:

            all_students = Students.query.order_by(Students.student_id).all()
            userdata = {}
            userdata['students'] = []

            for s in all_students:

                new_student = {'student_id': s.student_id,
                               'fname': s.fname,
                               'lname': s.lname,
                               'dob': s.dob,
                               'gender': s.gender,
                               'level': s.level,
                               'class_type': s.class_type,
                               'class_length': s.class_length,
                               'status': s.status,
                               'emerg_contact': s.emerg_contact,
                               'emerg_phone': s.emerg_phone}

                userdata['students'].append(new_student)

            return jsonify(userdata)


@app.route('/all_users', methods=['POST'])
def get_all_users():
    if request.method == 'POST':

        payload = request.data.decode('utf8')
        data = json.loads(payload)

        try:
            jwt.decode(data['token'], app.config['SECRET_KEY'], algorithms='HS256')

        except jwt.ExpiredSignatureError:
            return "Token has expired, please log in again"

        except (jwt.DecodeError, jwt.InvalidTokenError):
            return "Invalid token provided"

        else:

            all_users = Users.query.order_by(Users.user_id).all()
            userdata = {}
            userdata['users'] = []
            for u in all_users:

                new_user = {'id': u.public_id,
                            'status': u.status,
                            'email': u.email,
                            'role': u.role,
                            'fname': u.info.fname,
                            'lname': u.info.lname,
                            'customerID': u.info.customer_id,
                            'city': u.info.city,
                            'province': u.info.province,
                            'street': u.info.street,
                            'postal': u.info.postal,
                            'phone': u.info.phone}

                userdata['users'].append(new_user)

        return jsonify(userdata)
    return ''


@app.route('/admin_user', methods=['POST'])
def get_admin_user():
    if request.method == 'POST':
        payload = request.data.decode('utf8')
        data = json.loads(payload)

        with open ('testfile.txt','w') as f:
            json.dump(data, f)


        try:
            token = jwt.decode(data['token'], app.config['SECRET_KEY'], algorithms='HS256')

        except jwt.ExpiredSignatureError:
            return "Token has expired, please log in again"

        except (jwt.DecodeError, jwt.InvalidTokenError):
            return "Invalid token provided"

        else:
            user_id = data['id']
            u = Users.query.filter(Users.public_id == user_id).first()


            userdata = {'id': u.public_id,
                        'status': u.status,
                        'role': u.role,
                        'fname': u.info.fname if u.info.fname != None else '',
                        'lname': u.info.lname if u.info.lname != None else '',
                        'email': u.email,
                        'customerID': u.info.customer_id if u.info.customer_id != None else '',
                        'phone': u.info.phone if u.info.phone != None else '',
                        'city': u.info.city if u.info.city != None else '',
                        'province': u.info.province if u.info.province != None else '',
                        'street': u.info.street if u.info.street != None else '',
                        'postal': u.info.postal if u.info.postal != None else ''}

            return jsonify(userdata)

    return ''


@app.route('/update_admin_user', methods=['POST'])
def update_admin_user():
    if request.method == 'POST':
        payload = request.data.decode('utf8')
        data = json.loads(payload)

        with open ('testfile.txt','w') as f:
            json.dump(data, f)

        try:
            token = jwt.decode(data['token'], app.config['SECRET_KEY'], algorithms='HS256')

        except jwt.ExpiredSignatureError:
            return "Token has expired, please log in again"

        except (jwt.DecodeError, jwt.InvalidTokenError):
            return "Invalid token provided"

        else:
            user_id = data['id']
            u = Users.query.filter(Users.public_id == user_id).first()

            phone = None

            if data['phone'] != '':

                phone = data['phone']

            u.info.fname = data['fname']
            u.info.lname = data['lname']
            u.role = data['role'] if data['role'] != '' else None
            u.status = data['status']
            u.info.customer_id = data['customerID'] if 'customerID' in 'data' and data['customerID'] !='' else None
            u.city = data['city'] if 'city' in  data else ''
            u.info.province = data['province'] if 'province' in data else ''
            u.info.street=data['street'] if 'street' in data else ''
            u.info.postal=data['postal'] if 'postal' in data else ''
            u.info.phone=phone
            u.email = data['email']

            db.session.add(u)
            db.session.commit()

            return jsonify({"userUpdate": "true"})

    return ''


@app.route('/instructors', methods=['POST'])
def get_instructors():
    if request.method == 'POST':

        payload = request.data.decode('utf8')
        data = json.loads(payload)

        try:
            jwt.decode(data['token'], app.config['SECRET_KEY'], algorithms='HS256')

        except jwt.ExpiredSignatureError:
            return "Token has expired, please log in again"

        except (jwt.DecodeError, jwt.InvalidTokenError):
            return "Invalid token provided"

        else:

            all_instructors = Users.query.filter(Users.role=='inst').order_by(Users.user_id).all()
            userdata = {}
            userdata['instructors'] = []

            for i in all_instructors:

                new_instructor = {'id': i.public_id,
                                  'username': i.username,
                                  'email': i.email,
                                  'status': i.status,
                                  'fname': i.info.fname,
                                  'lname': i.info.lname,
                                  'phone': i.info.phone}

                userdata['instructors'].append(new_instructor)

            return jsonify(userdata)


@app.route('/add_instructor', methods=['POST'])
def add_instructor():
    if request.method == 'POST':
        payload = request.data.decode('utf8')
        data = json.loads(payload)
        username = data['username'].lower().strip()

        try:
            token = jwt.decode(data['token'], app.config['SECRET_KEY'], algorithms='HS256')

        except jwt.ExpiredSignatureError:
            return "Token has expired, please log in again"

        except (jwt.DecodeError, jwt.InvalidTokenError):
            return "Invalid token provided"

        else:

            if data['phone'] == '':
                data['phone'] = None

            if Users.query.filter(Users.username == data['username']).first() is None:
                password = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(10))

                instructor_profile = Profile(fname = data['fname'],
                                             lname = data['lname'],
                                             customer_id = None,
                                             city = None,
                                             province = None,
                                             street = None,
                                             postal = None,
                                             phone = data['phone'])

                instructor = Users(public_id=uuid.uuid4(),
                                   username=username,
                                   password=pwd_context.hash(password),
                                   status='active',
                                   role='inst',
                                   email=data['email'],
                                   info=instructor_profile)

                db.session.add(instructor)
                db.session.commit()

                all_instructors=Users.query.filter(Users.role=='inst').order_by(Users.user_id).all()
                userdata = {}
                userdata['instructors'] = []
                for i in all_instructors:
                    new_instructor = {'id': i.public_id,
                                'username': i.username,
                                'status': i.status,
                                'email': i.email,
                                'fname': i.info.fname,
                                'lname': i.info.lname,
                                'phone': i.info.phone}

                    userdata['instructors'].append(new_instructor)

                userdata['isRegistered'] = True

                return jsonify(userdata)

            else:
                return jsonify({"isRegistered": "false",
                                "errors": "This user name already exists, please select a different one."})

    return ''


@app.route('/recovery', methods=['POST'])
def password_recovery():
    if request.method == 'POST':
        payload = request.data.decode('utf8')
        data = json.loads(payload)

        email = data['email'].lower()
        expiry = 3600

        with open ('testfile.txt','w') as f:
            json.dump(data, f)

        user = Users.query.filter(Users.email == email).first()

        if user:

            token_data = {'user_id': user.public_id, 'exp': time() + expiry}
            token = (jwt.encode(token_data, app.config['SECRET_KEY'], algorithm='HS256').decode("utf-8"))

            reset_url = 'http://localhost:5000/password_reset/' + token

            send_mail(email, 'Password Reset Request', 'This is a password reset request. Click the link below \n' + reset_url)

        return jsonify({"recoverySuccessful": "true"})

    return jsonify({"recoverySuccessful": "false"})


@app.route('/password_reset/<token>', methods=['GET', 'POST'])
def password_reset(token):
    if request.method == 'GET':


        return ''

    return ''


@app.route('/schedule', methods= ['GET'])
def get_schedule():
    if request.method == 'GET':

        header = request.headers.get('Authorization').split(' ')
        with open('testfile.txt','w') as f:
            for x in header:

                f.write(x + '\n')
                f.write(str(len(header)))

        if len(header) == 2:

            if header[0] == 'Bearer':

                try:
                    token = jwt.decode(header[1], 'secret', algorithms='HS256')
                except jwt.ExpiredSignatureError:
                    return "Token has expired, please log in again"
                except (jwt.DecodeError, jwt.InvalidTokenError):
                    return "Invalid token provided"
                else:
                    with open('testfile.txt','w') as f:
                        f.write(token['user_id'])
                    return "Successfully decoded!"
            return 'Incorrect Authorization Type'

            #schedule = scheduler.do_the_schedule(scheduler.get_students())
            #return jsonify(schedule)
        return 'Authentication error'
    return 'Nothing happened'


if __name__ == "__main__":
    app.run(debug=True)
    #db.create_all()
