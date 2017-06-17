from flask import Flask, jsonify, render_template, request, url_for, redirect, flash
import scheduler
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://erik:Postgres#1@localhost:5432/scheduler'
db = SQLAlchemy(app)


class Students(db.Model):
    ___tablename___ = 'students'
    id = db.Column('student_id', db.Integer, primary_key = True)
    student_fname = db.Column(db.String(50))
    student_lname = db.Column(db.String(50))
    gender = db.Column(db.String(1))
    email = db.Column(db.String(50))
    city = db.Column(db.String(50))
    street_addr = db.Column(db.String(200))
    postal = db.Column(db.String(6))
    current_level = db.Column(db.Integer)
    prev_level = db.Column(db.Integer)


    def __init__(self, student_fname, student_lname, gender, email, city, street_addr, postal,
             current_level, prev_level):
        self.student_fname = student_fname
        self.student_lname = student_lname
        self.gender = gender
        self.email = email
        self.city = city
        self.street_addr = street_addr
        self.postal = postal
        self.current_level = current_level
        self.prev_level = prev_level


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
                           request.form['street_addr'],
                           request.form['postal'],
                           request.form['curr_level'],
                           request.form['prev_level'])

        db.session.add(student)
        db.session.commit()

        #flash('Record was successfully added')
        return redirect(url_for('get_students'))
    return render_template('add.html')


if __name__ == "__main__":
    app.run(debug=True)
    db.create_all()
