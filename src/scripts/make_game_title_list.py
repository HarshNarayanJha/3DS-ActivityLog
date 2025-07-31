# Plan
# 1. Read in all JSONs
# 2. Call APIs
# 3. Create final JSON

# First the games

import json
import logging
from typing import Any

import requests

OUTPUT = "./data/final_title_list.json"

logging.basicConfig(format="%(asctime)s %(levelname)s %(message)s", datefmt="%H:%M:%S", level=logging.INFO)
logging.getLogger().handlers[0].setFormatter(
    logging.Formatter("\033[1;36m%(asctime)s\033[0m \033[1;33m%(levelname)s\033[0m \033[1;35m%(message)s\033[0m")
)


def log_info(msg: str):
    logging.info(msg)


def log_error(msg: str):
    logging.info(msg)


BASE_MISSING_LIST = requests.get(
    "https://github.com/ghost-land/3dsdb/raw/refs/heads/main/missing_db/3ds/missing_base.txt"
).text.splitlines()


# def get_api_details(tid: str) -> dict[str, str]:
#     if tid in BASE_MISSING_LIST:
#         return {}

#     GAME_RAW_URL = "https://github.com/ghost-land/3dsdb/raw/refs/heads/main/db/3ds/base/{tid}/meta.json"
#     res = requests.get(GAME_RAW_URL.format(tid=tid))
#     if res.ok:
#         return res.json()

#     log_error(f"Failed to fetch API details for {tid}: {res.status_code} {res.reason}")
#     return {}


def get_api_details(tid: str) -> dict[str, Any]:
    if tid in BASE_MISSING_LIST:
        return {}

    API_URL = "https://api.ghseshop.cc/{tid}"
    res = requests.get(API_URL.format(tid=tid))
    if res.ok:
        return res.json()

    log_error(f"Failed to fetch API details for {tid}: {res.status_code} {res.reason}")
    return {}


final_data = {}

with open("./data/ghost-land-3dsdb-data-initial_data-games.json", "r") as fp:
    all_games_data: list[dict[str, str]] = json.load(fp)

# Read in hax0kartik's regional JSONs
with open("./data/list_US.json", "r") as fp:
    raw_titles_US: list[dict[str, str]] = json.load(fp)
# with open("./data/list_JP.json", "r") as fp:
# raw_titles_JP: list[dict[str, str]] = json.load(fp)

titles_US = {}
# titles_JP = {}
for k in raw_titles_US:
    titles_US[k["TitleID"]] = k
# for k in raw_titles_JP:
# titles_JP[k["TitleID"]] = k

# missing_USA: set[str] = set()
# missing_JPN: set[str] = set()

# print({x["region"] for x in all_games_data})

log_info(f"Processing {len(all_games_data)} Entries")

import concurrent.futures


def fetch(tid: str):
    return tid, get_api_details(tid)


log_info("Begin fetching API Details")
with concurrent.futures.ThreadPoolExecutor(max_workers=128) as executor:
    results = executor.map(fetch, [e["tid"] for e in all_games_data])
    api_results = dict(results)

log_info("DONE fetching API Details")


for i, entry in enumerate(all_games_data):
    tid = entry["tid"]
    print(i, tid)
    # api_details = get_api_details(tid)
    api_details = api_results[tid]

    publisher = "N/A"
    size = 0
    # iconUrl = f"https://raw.githubusercontent.com/ghost-land/3dsdb/0c316afaf29c4d01ca88c488b1b6cb6920e9f58e/db/3ds/base/{tid}/icon.jpg"
    # bannerUrl = f"https://raw.githubusercontent.com/ghost-land/3dsdb/0c316afaf29c4d01ca88c488b1b6cb6920e9f58e/db/3ds/base/{tid}/banner.jpg"
    # boxArtUrl = f"https://raw.githubusercontent.com/ghost-land/3dsdb/0c316afaf29c4d01ca88c488b1b6cb6920e9f58e/db/3ds/base/{tid}/thumbnails/thumbnail_1.jpg"

    if tid in titles_US.keys():
        publisher = titles_US[tid]["Publisher"]
        size = titles_US[tid]["Size"]

        if not api_details:
            # 404 not found
            api_details = {
                "uid": titles_US[tid]["UID"],
                "formal_name": titles_US[tid]["Name"],
                "description": "",
                "release_date_on_eshop": "",
                "product_code": titles_US[tid]["Product Code"],
                "platform_name": "",
                "region": "USA",
                "genres": [titles_US[tid]["Genre"]],
                "media": {"banner": "", "icon": "", "thumbnails": [""]},
            }
    # elif tid in titles_JP.keys():
    #     publisher = titles_JP[tid]["Publisher"]
    #     size = titles_JP[tid]["Size"]

    #     if not api_details:
    #         # 404 not found
    #         api_details = {
    #             "uid": titles_JP[tid]["UID"],
    #             "formal_name": titles_JP[tid]["Name"],
    #             "description": "",
    #             "release_date_on_eshop": "",
    #             "product_code": titles_JP[tid]["Product Code"],
    #             "platform_name": "",
    #             "region": "JPN",
    #             "genres": [titles_JP[tid]["Genre"]],
    #             "media": {"banner": "", "icon": "", "thumbnails": [""]},
    #         }
    else:
        if not api_details:
            api_details = {
                "uid": "",
                "formal_name": entry["name"],
                "description": "",
                "release_date_on_eshop": "",
                "product_code": entry["product_code"],
                "platform_name": "",
                "region": entry["region"],
                "genres": [],
                "media": {"banner": "", "icon": "", "thumbnails": [""]},
            }

    final_data[tid] = {
        "tid": tid,
        "uid": api_details["uid"],
        "titleName": api_details["formal_name"],
        "description": api_details["description"],
        "releaseDate": api_details["release_date_on_eshop"],
        "publisher": publisher,
        "serial": api_details["product_code"],
        "platform": api_details["platform_name"],
        "region": api_details["region"],
        "trimmedSizeBytes": size,
        "genres": api_details["genres"],
        "iconUrl": api_details["media"]["icon"],
        "bannerUrl": api_details["media"]["banner"],
        "boxArtUrl": api_details["media"]["thumbnails"][0] if len(api_details["media"]["thumbnails"]) > 0 else "",
    }


with open(OUTPUT, "w") as fp:
    json.dump(final_data, fp, indent=2)

# log_info(f"USA titles not found in hax0kartik's list: {len(missing_USA)}")
# log_info(f"JPN titles not found in hax0kartik's list: {len(missing_JPN)}")
# print(missing_USA)
# print(missing_JPN)
