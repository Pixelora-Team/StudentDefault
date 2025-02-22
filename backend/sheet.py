# import pandas as pd

# e_file = "studentname.xlsx"

# df = pd.read_excel(e_file, sheet_name="Sheet1", usecols=[2])  
# json_data = df.to_json(orient="records", indent=4)

# with open("db.json", "w") as json_file:
#     json_file.write(json_data)

# print("First column of 'studentname.xlsx' successfully converted to 'db.json'!")
import pandas as pd
import json

# Define file path
e_file = r"C:\Users\achut\OneDrive\Documents\Studentdefaulters\backend\studentname.xlsx"

# Read the first column (Ensure headers are ignored)
df = pd.read_excel(e_file, sheet_name="Sheet1", usecols=[2], header=None)

# Drop NaN values and reset index
df = df.dropna().reset_index(drop=True)

# If there's an unwanted first row (like a header), remove it explicitly
df = df.iloc[1:].reset_index(drop=True)

# Convert data into required JSON format
json_data = [{"ID": i + 1, "Name": df.iloc[i, 0]} for i in range(len(df))]

# Save JSON data to a file
with open("db.json", "w") as json_file:
    json.dump(json_data, json_file, indent=4)

print("First column of 'studentname.xlsx' successfully converted to 'db.json' with correct ID mapping!")
