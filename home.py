from flask import Flask, jsonify, render_template
import scheduler
app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/scheduler/JSON')
def schedulerJSON():
    schedule = scheduler.do_the_schedule(scheduler.get_students())

    return jsonify(schedule)


@app.route('/scheduler')
def schedule_display():
    #display the schedule
    return render_template('schedule.html', my_string="Wheeeee!", my_list=[0, 1, 2, 3, 4, 5])


if __name__ == "__main__":
    app.run()
