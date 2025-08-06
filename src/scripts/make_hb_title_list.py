import json
import re

import requests
from bs4 import BeautifulSoup

data: dict[str, dict[str, str]] = {}
WIKI_URL = "https://wiki.hacks.guide/wiki/User:ItsCrocoSwine/3DS_homebrew_title_information"
FILE_PATH = "./data/final_hb_title_list.json"

response = requests.get(WIKI_URL)

soup = BeautifulSoup(response.content, "html.parser")

table = soup.find(name="table")
assert table is not None
rows = table.find_all(name="tr")

for r in rows:
    parts = [x.text for x in r.find_all(name="td")]
    if not parts:
        continue

    parts = [p.strip() for p in parts]
    name, tp, tid, uid, serial, source = parts

    tid = tid.upper()
    tid = re.sub(r"\[\d+\]", "", tid, count=1)

    data[tid] = {
        "name": name,
        "tid": tid,
        "uid": uid,
        "serial": serial,
        "source": source,
    }

with open(FILE_PATH, "w") as fp:
    json.dump(data, fp, indent=2)
