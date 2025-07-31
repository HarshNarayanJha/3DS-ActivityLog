import json

with open("./data/ghost-land-3dsdb-data-initial_data-games.json", "r") as fp:
    data = json.load(fp)

new_data = {}

for d in data:
    new_data[d["tid"]] = d

with open("./data/ghost-land-3dsdb-games.json", "w") as fp:
    json.dump(new_data, fp, indent=2)
