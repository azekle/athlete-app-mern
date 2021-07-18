import ast
import requests

# orig_data_path = "./old_data/data_workout_formatted.csv"
orig_data_path = "./data_workout_formatted.csv"

url = "http://localhost:3000/api/v1/form"
count = 0

with open(orig_data_path, 'r', encoding='utf-8') as rf:
    line = rf.readline()
    line = rf.readline()
    while line != "":
        line = line.replace('\n', '')
        line = line.rsplit(',')
        data = {"id" : count, "season" : line[0], "week" : line[1], "date" : line[2], "trainer_name": line[3], "team": line[4], "session_type" : line[5],
                "duration" : line[6], "rpe" : line[7], "mental_alert" : line[8], "muscle_soreness" : line[9], "sleeping_hours" : line[10],
                "motivation" : line[11], "pain_level" : line[12], "pain_side" : line[14]}
        if line[13] != "":
            for ind, pain_loc in enumerate(ast.literal_eval(line[13].replace('|', ','))):
                data[f"pain_location[{ind}]"] = pain_loc

        requests.post(url, params=data)
        count += 1
        line = rf.readline()
