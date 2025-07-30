import json
import xml.etree.ElementTree as ET

with open("data/3dsreleases.xml", "r") as fp:
    xml_data = fp.read()

root = ET.fromstring(xml_data)
releases = {}
for release in root.findall("release"):
    release_data = {}
    for child in release:
        release_data[child.tag] = child.text
    releases[release_data["titleid"]] = release_data

with open("data/3ds_releases.json", "w") as fp:
    json.dump(releases, fp, indent=2)
