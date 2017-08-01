from flask import Flask, jsonify, render_template, request, url_for, redirect, flash
import scheduler
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://erik:Postgres#1@localhost:5432/scheduler'
db = SQLAlchemy(app)


class Students(db.Model):
    ___tablename___ = 'students'
    id = db.Column('student_id', db.Integer, primary_key = True)
    fname = db.Column(db.String(50))
    lname = db.Column(db.String(50))
    gender = db.Column(db.String(1))
    email = db.Column(db.String(50))
    city = db.Column(db.String(50))
    province = db.Column(db.String(2))
    street_address = db.Column(db.String(200))
    postal = db.Column(db.String(6))
    phone_type = db.Column(db.String(6))
    area_code = db.Column(db.Integer)
    phone_number = db.Column(db.Integer)

    def __init__(self, fname, lname, gender, email, city, province, street_address, postal,
             phone_type, area_code, phone_number):
        self.fname = fname
        self.lname = lname
        self.gender = gender
        self.email = email
        self.city = city
        self.province = province
        self.street_address = street_address
        self.postal = postal
        self.phone_type = phone_type
        self.area_code = area_code
        self.phone_number = phone_number


@app.route('/')
def show_all():
    return render_template('main.html')


@app.route('/scheduler/JSON')
def scheduler_json():
    schedule = scheduler.do_the_schedule(scheduler.get_students())

    return jsonify(schedule)


@app.route('/students')
def get_students():
    return render_template('students.html', students = Students.query.all())

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
        #if not request.form['student_fname']\
        #        or not request.form['student_lname'] \
        #        or not request.form['gender'] \
        #        or not request.form['city'] \
        #        or not request.form['street_addr'] \
        #        or not request.form['postal']\
        #        or not request.form['current_level']:
        #
        #    flash('Please enter all the fields', 'error')

        #else:
        student = Students(request.form['fname'],
                           request.form['lname'],
                           request.form['gender'],
                           request.form['email'],
                           request.form['city'],
                           request.form['province'],
                           request.form['streetAddress'],
                           request.form['postal'],
                           request.form['phoneType'],
                           request.form['areaCode'],
                           request.form['phoneNumber'])

        db.session.add(student)
        db.session.commit()

        #flash('Record was successfully added')
        return redirect(url_for('get_students'))
    return render_template('add.html')


if __name__ == "__main__":
    app.run(debug=True)
    db.create_all()
