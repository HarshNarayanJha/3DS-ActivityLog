# Project Structure

```
3DS-ActivityLog/
├-- web/                    # SvelteKit web application
├-- lib/                    # Python data processing
│   ├-- playhistory.py      # Parse PlayHistory.dat -> CSV
│   ├-- pedometer.py        # Parse Pedometer.dat -> CSV
│   ├-- playhistory.c
│   ├-- pedometer.c
│   └-- Makefile
│
├-- scripts/                    # Title list generation
│   ├-- make_local_list.py      # Generate final_local_title_list.json
│   ├-- make_fallback_list.py   # Generate final_fallback_title_list.json
│   ├-- make_hb_title_list.py   # Generate final_hb_title_list.json
│   ├-- make_game_title_list.py # Generate final_title_list.json
│   ├-- tid2key_json.py         # Test script: TID -> JSON
│   ├-- xml2json.py             # Test script: XML -> JSON
│   └-- PlayHistoryBACKUP.gm9   # GodMode9 script for extraction
│
├-- data/                   # Data files
│   ├-- source/             # Downloaded external data
│   └-- generated/          # Processed title databases
│
├-- input/                  # Raw input data from 3DS
├-- saves/                  # Raw save data from 3DS
├-- output/                 # Processed output files
│
├-- examples/               # Example data for testing
│
├-- .github/
│   ├-- workflows/
│   │   └-- deploy-app.yml  # CI/CD deployment
│   └-- dependabot.yml      # Dependency updates
│
├-- README.md               # User documentation
├-- README-dev.md           # Developer documentation
├-- AGENTS.md
├-- PLAN.md                 # Development roadmap
|-- STRUCTURE.md            # project structure
└-- LICENSE
```

## Directory Purposes

| Directory   | Purpose                                       |
| ----------- | --------------------------------------------- |
| `web/`      | SvelteKit web application                     |
| `lib/`      | Python scripts for parsing raw 3DS data files |
| `scripts/`  | Python scripts for generating title databases |
| `data/`     | Title lists XML and JSON                      |
| `input/`    | Place raw 3DS extracted files here            |
| `saves/`    | Place raw 3DS save files here                 |
| `output/`   | Processed data from `lib/` scripts            |
| `examples/` | Sample data for testing/demo                  |
