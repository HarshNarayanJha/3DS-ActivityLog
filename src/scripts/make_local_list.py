import json

files = {
    "./data/list_US.json": "USA",
    "./data/list_GB.json": "EUR",
}

final_data = {}

for f, r in files.items():
    with open(f, "r") as fp:
        data = json.load(fp)

    for entry in data:
        tid = entry["TitleID"]

        if tid in final_data:
            print(f"REPEATED TID: {tid}: {final_data[tid]['titleName']} -> {entry['Name']}")
            final_data[tid]["region"] = "Region Free"
            continue

        final_data[tid] = {
            "tid": tid,
            "uid": entry["UID"],
            "titleName": entry["Name"],
            "publisher": entry["Publisher"],
            "serial": entry["Product Code"],
            "region": r,
            "trimmedSizeBytes": entry["Size"],
            "genres": entry["Genre"],
            "iconUrl": entry["IconURL"],
            "bannerUrl": entry["BannerURL"],
            # "boxArtUrl": data["media"]["thumbnails"][0] if len(data["media"]["thumbnails"]) > 0 else "",
        }

with open("./data/final_local_title_list.json", "w") as fp:
    json.dump(final_data, fp, indent=2)
