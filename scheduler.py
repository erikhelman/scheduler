from datetime import datetime, time
from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive
import json

classes = dict()
month = 'June'

#day:level min, level max, min age, max age, start time, end time, duration, class size, current enrollment, available
classes = {'Monday' : [[1, 1, 0, 6, 1700, 1730, 30, 4, 0, True, month, 5],
                       [1, 1, 0, 6, 1730, 1800, 30, 4, 0, True, month, 5],
                       [2, 4, 4, 6, 1800, 1900, 60, 6, 0, True, month, 5],
                       [5, 7, 7, 12, 1800, 1900, 60, 8, 0, True, month, 5],
                       [8, 10, 16, 100, 1900, 2000, 60, 8, 0, True, month, 5],
                       [11, 20, 7, 15, 1900, 2000, 60, 6, 0, True, month, 5]
                       ],
           'Tuesday' : [[1, 1, 0, 6, 1700, 1730, 30, 4, 0, True, month, 6],
                       [1, 1, 0, 6, 1730, 1800, 30, 4, 0, True, month, 6],
                       [2, 4, 4, 6, 1800, 1900, 60, 6, 0, True, month, 6],
                       [5, 7, 7, 12, 1800, 1900, 60, 8, 0, True, month, 6],
                       [8, 10, 16, 100, 1900, 2000, 60, 8, 0, True, month, 6],
                       [11, 20, 7, 15, 1900, 2000, 60, 6, 0, True, month, 6]
                       ],
           'Wednesday' : [[1, 1, 0, 6, 1700, 1730, 30, 4, 0, True, month, 7],
                       [1, 1, 0, 6, 1730, 1800, 30, 4, 0, True, month, 7],
                       [2, 4, 4, 6, 1800, 1900, 60, 6, 0, True, month, 7],
                       [5, 7, 7, 12, 1800, 1900, 60, 8, 0, True, month, 7],
                       [8, 10, 16, 100, 1900, 2000, 60, 8, 0, True, month, 7],
                       [11, 20, 7, 15, 1900, 2000, 60, 6, 0, True, month, 7]
                       ],
           'Thursday' : [[1, 1, 0, 6, 1700, 1730, 30, 4, 0, True, month, 8],
                       [1, 1, 0, 6, 1730, 1800, 30, 4, 0, True, month, 8],
                       [2, 4, 4, 6, 1800, 1900, 60, 6, 0, True, month, 8],
                       [5, 7, 7, 12, 1800, 1900, 60, 8, 0, True, month, 8],
                       [8, 10, 16, 100, 1900, 2000, 60, 8, 0, True, month, 8],
                       [11, 20, 7, 15, 1900, 2000, 60, 6, 0, True, month, 8]
                       ],
           'Friday' : [[1, 1, 4, 6, 1500, 1530, 30, 4, 0, True, month, 9],
                       [1, 1, 4, 6, 1530, 1600, 30, 4, 0, True, month, 9],
                       [2, 7, 7, 12, 1500, 1545, 45, 6, 0, True, month, 9],
                       [2, 7, 7, 12, 1545, 1630, 45, 6, 0, True, month, 9],
                       [3, 7, 7, 10, 1600, 1700, 60, 6, 0, True, month, 9],
                       [8, 12, 11, 15, 1600, 1700, 60, 8, 0, True, month, 9],
                       [5, 10, 11, 15, 1700, 1800, 60, 8, 0, True, month, 9],
                       [11, 15, 16, 100, 1700, 1800, 60, 8, 0, True, month, 9]
                       ],
           'Saturday' : [[10, 20, 16, 100, 900, 1000, 60, 8, 0, True, month, 10],
                         [0, 2, 0, 5, 900, 930, 30, 4, 0, True, month, 10],
                         [10, 20, 10, 15, 1000, 1100, 60, 4, 0, True, month, 10],
                         [5, 10, 7, 9, 1000, 1045, 45, 6, 0, True, month, 10],
                         [10, 100, 16, 100, 1100, 1200, 60, 8, 0, True, month, 10],
                         [10, 100, 16, 100, 1100, 1200, 60, 8, 0, True, month, 10]
                         ],
           'Sunday' : [[10, 100, 16, 100, 900, 1000, 60, 8, 0, True, month, 11],
                       [10, 100, 16, 100, 900, 1000, 60, 8, 0, True, month, 11],
                       [0, 2, 0, 2, 900, 930, 30, 4, 0, True, month, 11],
                       [0, 5, 0, 5, 930, 1015, 45, 4, 0, True, month, 11],
                       [10, 100, 16, 100, 1000, 1100, 60, 8, 0, True, month, 11],
                       [5, 15, 10, 15, 1000, 1100, 60, 8, 0, True, month, 11],
                       [5, 10, 7, 9, 1015, 1100, 45, 6, 0, True, month, 11],
                       [0, 2, 0, 5, 1100, 1130, 30, 4, 0, True, month, 11],
                       [10, 100, 16, 100, 1100, 1200, 60, 8, 0, True, month, 11],
                       [0, 5, 0, 5, 1200, 1230, 30, 6, 0, True, month, 11],
                       [10, 100, 16, 100, 1200, 1300, 60, 8, 0, True, month, 11],
                       [6, 10, 10, 15, 1230, 1300, 30, 6, 0, True, month, 11]
                       ]}

def get_students():

    with open('students.json') as student_file:
        students = json.load(student_file)

    return students

def do_the_schedule(students):

    schedule = {}
    schedule['sessions'] = []

    for s in students['student_list']['student']:
    #iterate through student list
        sessionFound = False

        for day, times in classes.items():
        #iterate through each day
            for session in times:

                if (session[9]) and not (sessionFound):
                #check if available

                    if (int(session[0]) <= int(s['level']) <= int(session[1])) and \
                            (int(session[2]) <= int(s['age']) <= int(session[3])):

                        session_info = {}

                        session_info = {'firstName': s['firstName'],
                                        'lastName': s['lastName'],
                                        'month': session[10],
                                        'date': session[11],
                                        'dayOFTheWeek': day,
                                        'level': s['level'],
                                        'startTime': session[4],
                                        'endTime': session[5],
                                        }

                        schedule['sessions'].append(session_info)
                        sessionFound = True
                        #print(session_info)

    with open('result.json', 'w') as fp:
        json.dump(schedule, fp, ensure_ascii=True)

    return schedule

    '''
    gauth = GoogleAuth()
    # Try to load saved client credentials
    gauth.LoadCredentialsFile("mycreds.txt")
    if gauth.credentials is None:
        # Authenticate if they're not there
        gauth.LocalWebserverAuth()
    elif gauth.access_token_expired:
        # Refresh them if expired
        gauth.Refresh()
    else:
        # Initialize the saved creds
        gauth.Authorize()
    # Save the current credentials to a file
    gauth.SaveCredentialsFile("mycreds.txt")

    drive = GoogleDrive(gauth)

    gfile = drive.CreateFile({'title': 'schedule.json',
                              'parents':
                                  [{'kind': 'drive#fileLink', 'id': '0B2HKxpqiSZhEQldVMGtmVHpnQWs'}]})
    gfile.SetContentFile('result.json')
    gfile.Upload()  # Upload it
    '''


def display_schedule(students):
    schedule = do_the_schedule(get_students())


