
orig_data_path = "./old_data/data_workout.csv"
new_data_path = "./old_data/data_workout_formatted.txt"

session_type_dict = {
    "כדורסל" : 1,
    "אתלטיקה" : 2,
    "כוח" : 3,
    "משחק" : 4,
    "אימון אישי" : 5,
    "מדידה" : 6,
    "אחר" : 99
}

wellness_dict = {
    "הרגשתי רע מאוד, אימון גרוע" : 1,
    "הרגשתי לא טוב, אימון רע" : 2,
    "הרגשתי בסדר, אימון טוב" : 3,
    "הרגשתי טוב, אימון טוב מאוד" : 4,
    "הרגשתי חיוני ואנרגטי, אימון יוצא דופן" : 5
}

pain_dict = {
    "כתפיים" : 1,
    "שכמות" : 2,
    "גב תחתון" : 3,
    "המסטרינג" : 4,
    "תאומים" : 5,
    "גיד אכילס" : 6,
    "קרסול" :7,
    "כתפיים (צידי/קדמי)" : 8,
    "מפשעות" : 9,
    "מפרק כף יד" : 10,
    "מותן כסל" : 11,
    "ברך" : 12,
    "אחר" : 99
}

pain_side_dict = {
    "שמאל" : 1,
    "ימין" : 2
}

write_data = ["season,week,date,name,team,sesstion_type,duration,rpe,mental_alert,muscle_soreness,sleeping_hours,motivation,pain_level,pain_location,pain_side\n"]
with open(orig_data_path, 'r', errors='replace', encoding='utf-8') as rf:
    line = rf.readline()
    line = rf.readline()
    while line != "":
        line_vec = line.rsplit(',')
        season = line_vec[0]
        week = line_vec[1]
        date = line_vec[2]
        name = line_vec[3]
        team = line_vec[4]
        try:
            session_type = session_type_dict[line_vec[5]]
        except KeyError:
            session_type = 7
        duration = line_vec[6]
        rpe = line_vec[7]
        mental_alert = line_vec[8]
        muscle_soreness = line_vec[9]
        sleeping_hours = line_vec[10]
        motivation = line_vec[11]

        if line_vec[12] != "":
            pain_level = "1"
            pain_location = line_vec[12]
        elif line_vec[13] != "":
            pain_level = "2"
            pain_location = line_vec[13]
        elif line_vec[14] != "":
            pain_level = "3"
            pain_location = line_vec[14]
        elif line_vec[15] != "":
            pain_level = "4"
            pain_location = line_vec[15]
        else:
            pain_level = ""
            pain_location = ""
        try:
            pain_location = str([pain_dict[x] for x in pain_location.rsplit('|')]).replace(',', '|')
        except:
            pain_location = ""

        try:
            pain_side = pain_side_dict[line_vec[16]]
        except KeyError:
            pain_side = ""

        write_data.append(f"{season},{week},{date},{name},{team},{session_type},{duration},{rpe},{mental_alert},{muscle_soreness},{sleeping_hours},{motivation},{pain_level},{pain_location},{pain_side}".replace('\n', '') + "\n")
        if line_vec[17] != "":
            session_type = line_vec[17]
            duration = line_vec[18]
            rpe = line_vec[19]
        write_data.append(f"{season},{week},{date},{name},{team},{session_type},{duration},{rpe},{mental_alert},{muscle_soreness},{sleeping_hours},{motivation},{pain_level},{pain_location},{pain_side}".replace('\n', '') + "\n")

        line = rf.readline()

with open(new_data_path, 'w', encoding='utf-8') as wf:
    for line in write_data:
        wf.writelines(line)