# README for generating title ID list

## Sourced Lists

<!-- No need to use this, as API exists -->
<!-- 1. https://github.com/ghost-land/3dsdb -->
   <!-- a. Initial_data jsons and API for metadata -->

1. https://github.com/hax0kartik/3dsdb
   a. Apply my custom modification to generate new lists containing more data
   - list_US.json
   - list_GB.json
   - list_JP.json (has problems)
   - list_KR.json
   - list_TW.json (has problems)

2. https://github.com/ghost-land/3dsdb
   a. Fallback data
   b. `wget https://github.com/ghost-land/3dsdb/raw/refs/heads/main/data/initial_data/games.json -O ghost-land-3dsdb-initial_data-games.json`
   c. `wget https://github.com/ghost-land/3dsdb/raw/refs/heads/main/data/initial_data/virtual-console.json -O ghost-land-3dsdb-initial_data-virtual_console.json`
   d. `wget https://github.com/ghost-land/3dsdb/raw/refs/heads/main/data/initial_data/dsiware.json -O ghost-land-3dsdb-initial_data-dsiware.json`

3. Copy them to `src/data` and `cd src`

4. Run `uv run scripts/make_local_list.py`

5. Run `uv run scripts/make_fallback_list.py`

6. List generated at `data/final_local_title_list.json` and `data/final_fallback_title_list.json`. Use in app for local query and escalate to API.
