import pandas as pd
import json
import sys

try:
    file_path = sys.argv[1]
except:
    print("file path not given ..")
    sys.exit(0)

words = pd.read_excel(file_path)
words_json = words.to_json(orient='records')
with open("words.json","w") as json_file:
    json_file.write(words_json)
print("Done converting")