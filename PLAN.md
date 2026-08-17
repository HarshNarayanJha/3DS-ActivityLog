### Flow

1. Upload your csv file
2. Open the Activity Log "Homepage"
   a. (top) Today's Date and records (titles played for now)
   b. (bottom) Two buttons, Daily Records and Software Library
3. Software Library Screen
   a. (top) detail card about the currently selected title
   b. (bottom) Grid of all titles
4. Daily Activity Screen - Will have daily logs and timeline views

### Architecture Plan

#### Structure

```
web/src/lib/
├-- parser/
│   ├-- parser.ts        # Parse CSV -> PlayHistory
│   ├-- types.ts         # Enums: PlayEvent, EntryType, SystemEvent
│   └-- errors.ts        # ParserError classes
│
├-- stats/
│   ├-- index.ts         # getPlayStats() - calculate per-title stats
│   └-- aggregation.ts   # daily/weekly/monthly aggregations
│
├-- database/
│   ├-- index.ts         # getTitle() - unified lookup
│   ├-- local.ts         # Local JSON lookups
│   ├-- fallback.ts      # Fallback DB lookups
│   ├-- homebrew.ts      # Homebrew DB lookups
│   ├-- remote.ts        # API client
│   └-- types.ts         # Region, TitleData, etc.
│
├-- timezone/
│   ├-- index.ts         # Global timezone state & selector
│   ├-- utils.ts         # parseTimestamp, formatTimestamp
│   └-- constants.ts     # Available timezones list
│
├-- state/
    ├-- context.ts       # Svelte context for route-scoped state
    └-- stores.ts        # Global timezone store only
```

#### Data Flow

```
CSV File -> parser.ts -> PlayHistory -> stats/index.ts -> PlayStats
                                   |
                              globalState (via context)
                                   |
                  timezone/index.ts (applies user timezone)
                                   |
                         UI Components (displayed)
```

### TODO

- [ ] make a /icon/tid.png route to serve icons based on availability and switch sources easily, remove icon url entirely from the data structure.
