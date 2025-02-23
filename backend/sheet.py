import pandas as pd
import json
e_file = r"C:\Users\achut\OneDrive\Documents\Studentdefaulters\backend\studentname.xlsx"
df = pd.read_excel(e_file, sheet_name="Sheet1", usecols=[0 , 1 ,2], header=None)
df = df.dropna().reset_index(drop=True)
df = df.iloc[1:].reset_index(drop=True)
json_data = [
    {"ID": i + 1, "RegisterNo" :  df.iloc[i,1 ], "Rollno": df.iloc[i, 0], "StudentName": df.iloc[i, 2]} 
    for i in range(len(df))
]
with open("db.json", "w") as json_file:
    json.dump(json_data, json_file, indent=4)
print("First column of 'studentname.xlsx' successfully converted to 'db.json' with correct ID mapping!")