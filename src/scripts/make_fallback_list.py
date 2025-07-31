import json

files = [
    "./data/ghost-land-3dsdb-initial_data-games.json",
    "./data/ghost-land-3dsdb-initial_data-virtual_console.json",
    "./data/ghost-land-3dsdb-initial_data-dsiware.json",
]

final_fallback_data = {}

for f in files:
    with open(f, "r") as fp:
        data = json.load(fp)

    for entry in data:
        tid = entry["tid"]

        if tid in final_fallback_data:
            print(f"REPEATED TID: {tid}: {final_fallback_data[tid]['titleName']} -> {entry['name']}")
            continue

        final_fallback_data[tid] = {
            "tid": tid,
            "uid": "",
            "titleName": entry["name"],
            "publisher": "",
            "serial": entry["product_code"],
            "region": entry["region"],
            "trimmedSizeBytes": 0,
            "genres": "",
            # "iconUrl": entry["IconURL"],
            # "bannerUrl": entry["BannerURL"],
            # "boxArtUrl": data["media"]["thumbnails"][0] if len(data["media"]["thumbnails"]) > 0 else "",
        }

with open("./data/final_fallback_title_list.json", "w") as fp:
    json.dump(final_fallback_data, fp, indent=2)
