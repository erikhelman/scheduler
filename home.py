from flask import Flask, jsonify, render_template, request, url_for, redirect, json
from security import pwd_context
import uuid
import datetime
import jwt
import scheduler
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import update
import os

app = Flask(__name__)
#app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://erik:postgres@localhost:5432/scheduler'
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
db = SQLAlchemy(app)

class Users(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True)
    username = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(100))
    active = db.Column(db.Boolean)
    role = db.Column(db.String(5))
    email = db.Column(db.String(50))
    students = db.relationship('Students', backref='login', lazy='dynamic')
    info = db.relationship('Profile', backref='users', uselist=False)

class Students(db.Model):
    student_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50))
    phone_number = db.Column(db.Integer)
    fname = db.Column(db.String(50))
    lname = db.Column(db.String(50))
    gender = db.Column(db.String(1))
    dob = db.Column(db.Date)
    level = db.Column(db.String(10))
    class_type = db.Column(db.String(30))
    class_length = db.Column(db.Integer)
    status = db.Column(db.String(20))
    emerg_contact = db.Column(db.String(40))
    emerg_phone = db.Column(db.Integer)
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
    phone = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))

@app.route('/')
def show_all():
    return render_template('main.html')

@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':

        data = json.loads(request.data.decode('utf8'))
        name = data['name']
        password = data['password']

        user = Users.query.filter(Users.username == name).first()
        if user and pwd_context.verify(password,user.password):

            payload = {'user_id' : user.public_id, 'role' : 'user'}
            token = (jwt.encode(payload, 'secret', algorithm='HS256').decode("utf-8"))
            return ('{"isAuthenticated": "true", "token": "' + token+ '"}')

        return '{"isAuthenticated": "false"}'

    return ''

@app.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        payload = request.data.decode('utf8')
        data = json.loads(payload)
        name = data['name']
        password = data['password']
        email=data['email']

        profile = Profile(fname = None,
                          lname = None,
                          customer_id = None,
                          city = None,
                          province = None,
                          street = None,
                          postal = None,
                          phone = None)

        student = Students(fname = None,
                           lname = None,
                           gender = None,
                           dob = None,
                           level = None,
                           class_type = None,
                           class_length = None,
                           status = None)

        user = Users(public_id=uuid.uuid4(),
                     username=name,
                     password=pwd_context.hash(password),
                     active=True,
                     role='user',
                     email=email,
                     students= [student],
                     info=profile)

        db.session.add(user)
        db.session.commit()
        return '{ isRegistered: true }'

    return ''

@app.route('/profile', methods=['POST'])
def get_profile():

    if request.method == 'POST':
        payload = request.data.decode('utf8')
        data = json.loads(payload)

        try:
            token = jwt.decode(data['token'], 'secret', algorithms='HS256')

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

        try:
            token = jwt.decode(data['token'], 'secret', algorithms='HS256')

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

            return "{profileUpdate: true}"

    return ''

@app.route('/students', methods=['GET','POST'])
def get_students():
    if request.method == 'GET':
        students = Students.query.all()
        userdata = {}

        for s in students:
            userdata[str(s.student_id)] = {}
            userdata[str(s.student_id)]['fname']=s.fname
            userdata[str(s.student_id)]['lname'] = s.lname
            userdata[str(s.student_id)]['email']=s.email
            userdata[str(s.student_id)]['dob']=s.dob
            userdata[str(s.student_id)]['phone'] = s.phone_number
            userdata[str(s.student_id)]['gender']=s.gender
            userdata[str(s.student_id)]['level']=s.level
            userdata[str(s.student_id)]['class_type']=s.class_type
            userdata[str(s.student_id)]['class_length']=s.class_length
            userdata[str(s.student_id)]['status'] = s.status
            userdata[str(s.student_id)]['emerg_contact']=s.emerg_contact
            userdata[str(s.student_id)]['emerg_phone']=s.emerg_phone

        return jsonify(userdata)

    if request.method == 'POST':
        search_string = request.form['search_string']
        if search_string == '*':
            return render_template('students.html',
                                   students=db.session.query(Students, StudentInfo).join(StudentInfo).all())
        else:
            return render_template('students.html', students = db.session.query(Students, StudentInfo).join(StudentInfo).filter((Students.lname == search_string)|(Students.fname == search_string)))
            #Students.query.filter((Students.lname == search_string)|(Students.fname == search_string)).all())
    return render_template('students.html')

@app.route('/all_students', methods=['POST'])
def get_all_students():
    if request.method == 'POST':

        payload = request.data.decode('utf8')
        data = json.loads(payload)

        try:
            jwt.decode(data['token'], 'secret', algorithms='HS256')

        except jwt.ExpiredSignatureError:
            return "Token has expired, please log in again"

        except (jwt.DecodeError, jwt.InvalidTokenError):
            return "Invalid token provided"

        else:

            all_students = Students.query.all()
            userdata = {}
            userdata['students'] = []

            for s in all_students:

                new_student = {'student_id': s.student_id,
                               'fname': s.fname,
                               'lname': s.lname,
                               'email': s.email,
                               'dob': s.dob,
                               'phone': s.phone_number,
                               'gender': s.gender,
                               'level': s.level,
                               'class_type': s.class_type,
                               'class_length': s.class_length,
                               'status': s.status,
                               'emerg_contact': s.emerg_contact,
                               'emerg_phone': s.emerg_phone}

                userdata['students'].append(new_student)

            with open('testfile.txt', 'w') as f:
                json.dump(userdata, f)

                '''userdata[str(s.student_id)] = {}
                userdata[str(s.student_id)]['fname']=s.fname
                userdata[str(s.student_id)]['lname'] = s.lname
                userdata[str(s.student_id)]['email']=s.email
                userdata[str(s.student_id)]['dob']=s.dob
                userdata[str(s.student_id)]['phone'] = s.phone_number
                userdata[str(s.student_id)]['gender']=s.gender
                userdata[str(s.student_id)]['level']=s.level
                userdata[str(s.student_id)]['class_type']=s.class_type
                userdata[str(s.student_id)]['class_length']=s.class_length
                userdata[str(s.student_id)]['status'] = s.status
                userdata[str(s.student_id)]['emerg_contact']=s.emerg_contact
                userdata[str(s.student_id)]['emerg_phone']=s.emerg_phone'''

            return jsonify(userdata)


@app.route('/delete', methods=['GET', 'POST'])
def delete_students():
    if request.method == 'POST':
        delete_name = request.form['delete_name']
        Students.query.filter(Students.fname == delete_name).delete()
        db.session.commit()
    return render_template('delete.html')

@app.route('/search', methods=['GET', 'POST'])
def search_students():
    if request.method == 'POST':
        search_string = request.form['search_string']
        return render_template('search.html', students = Students.query.filter((Students.lname == search_string)|(Students.fname == search_string)).all())

    return render_template('search.html')

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
    app.run()
    #db.create_all()
