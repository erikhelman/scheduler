from flask import Flask, jsonify, render_template, request, url_for, redirect, flash
import scheduler
from flask_sqlalchemy import SQLAlchemy
import os


app = Flask(__name__)
#app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://erik:postgres@localhost:5432/scheduler'
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
db = SQLAlchemy(app)


class Students(db.Model):
    ___tablename___ = 'students'
    id = db.Column('id', db.Integer, primary_key = True)
    fname = db.Column(db.String(50))
    lname = db.Column(db.String(50))
    gender = db.Column(db.String(1))
    dob = db.Column(db.Date)
    level = db.Column(db.String(10))
    class_type = db.Column(db.String(30))
    class_length = db.Column(db.Integer)
    status = db.Column(db.String(20))
    info = db.relationship('StudentInfo', uselist=False, backref='students')
    feedback = db.relationship('Feedback', backref="students")

    def __init__(self, fname, lname, gender, dob, level, class_type, class_length, status):
        self.fname = fname
        self.lname = lname
        self.gender = gender
        self.dob = dob
        self.level = level
        self.class_type = class_type
        self.class_length = class_length
        self.status = status

class StudentInfo(db.Model):
    ___tablename___ = 'student_info'
    info_id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    customer_id = db.Column(db.Integer)
    email = db.Column(db.String(50))
    city = db.Column(db.String(50))
    province = db.Column(db.String(2))
    street_address = db.Column(db.String(200))
    postal = db.Column(db.String(6))
    parent_name = db.Column(db.String(40))
    emerg_contact = db.Column(db.String(40))
    emerg_area = db.Column(db.Integer)
    emerg_phone = db.Column(db.Integer)
    area_code = db.Column(db.Integer)
    phone_number = db.Column(db.Integer)
    dr_name = db.Column(db.String(50))
    dr_area_code = db.Column(db.Integer)
    dr_phone = db.Column(db.String(15))
    ohip = db.Column(db.String(20))
    medical_conditions = db.Column(db.String(100))
    allergies_meds = db.Column(db.String(100))
    how_found = db.Column(db.String(50))
    referral = db.Column(db.String(50))

    def __init__(self, customer_id, email, city, province, street_address, postal, parent_name, emerg_contact, emerg_area, emerg_phone,
                 area_code, phone_number, dr_name, dr_area_code, dr_phone, ohip, medical_conditions, allergies_meds, how_found, referral):
        self.customer_id = customer_id
        self.email = email
        self.city = city
        self.province = province
        self.street_address = street_address
        self.postal = postal
        self.parent_name = parent_name
        self.emerg_contact = emerg_contact
        self.emerg_area = emerg_area
        self.emerg_phone = emerg_phone
        self.area_code = area_code
        self.phone_number = phone_number
        self.dr_name = dr_name
        self.dr_area_code = dr_area_code
        self.dr_phone = dr_phone
        self.ohip = ohip
        self.medical_conditions = medical_conditions
        self.allergies_meds = allergies_meds
        self.how_found = how_found
        self.referral = referral

class Feedback(db.Model):
    __tablename__='feedback'
    feedback_id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    feedback_date = db.Column(db.Date)
    feedback = db.Column(db.JSON)




@app.route('/')
def show_all():
    return render_template('main.html')


@app.route('/scheduler/JSON')
def scheduler_json():
    schedule = scheduler.do_the_schedule(scheduler.get_students())

    return jsonify(schedule)


@app.route('/students', methods=['GET','POST'])
def get_students():
    if request.method == 'POST':
        search_string = request.form['search_string']
        if search_string == '*':
            return render_template('students.html',
                                   students=db.session.query(Students, StudentInfo).join(StudentInfo).all())
        else:
            return render_template('students.html', students = db.session.query(Students, StudentInfo).join(StudentInfo).filter((Students.lname == search_string)|(Students.fname == search_string)))
            #Students.query.filter((Students.lname == search_string)|(Students.fname == search_string)).all())
    return render_template('students.html')

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


@app.route('/add', methods=['GET', 'POST'])
def add_students():
    if request.method == 'POST':
        student = Students(request.form['fname'],
                           request.form['lname'],
                           request.form['gender'],
                           request.form['dob'],
                           request.form['level'],
                           request.form['classType'],
                           request.form['classLength'],
                           request.form['customerStatus'])

        student.info = StudentInfo(request.form['customerID'],
                                   request.form['email'],
                                   request.form['city'],
                                   request.form['province'],
                                   request.form['streetAddress'],
                                   request.form['postal'],
                                   request.form['parentName'],
                                   request.form['emergencyContact'],
                                   request.form['emergencyAreaCode'],
                                   request.form['emergencyPhone'],
                                   request.form['areaCode'],
                                   request.form['phoneNumber'],
                                   request.form['drName'],
                                   request.form['drPhone'],
                                   request.form['drAreaCode'],
                                   request.form['ohip'],
                                   request.form['medical_conditions'],
                                   request.form['allergies_meds'],
                                   request.form['how_found'],
                                   request.form['referral'])

        db.session.add(student)
        db.session.commit()

        #flash('Record was successfully added')
        return redirect(url_for('get_students'))

    return render_template('add.html')


if __name__ == "__main__":
    app.run(debug=True)
    db.create_all()
