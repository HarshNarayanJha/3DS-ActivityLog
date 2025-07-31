import json

with open("./data/list_US.json", "r") as fp:
    data = json.load(fp)

new_data = {}

for d in data:
    new_data[d["TitleID"]] = {
        "name": d["Name"],
        "tid": d["TitleID"],
        "sizeBytes": d["Size"],
        "serial": d["Product Code"],
        "publisher": d["Publisher"],
        "genre": d["Genre"],
        "iconUrl": d["IconURL"],
        "bannerUrl": d["BannerURL"],
        "region": "USA",
    }

with open("./data/3dsdb_2_US.json", "w") as fp:
    json.dump(new_data, fp)
