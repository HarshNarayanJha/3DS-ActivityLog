# Activity Log Save Format (`pld.dat`)

The `pld.dat` file contains the permanent lifetime play history and hour-by-hour session logs for the Nintendo 3DS
Activity Log as it's (system) save data. The app pulls in data from the PTM module regularly and keeps updating it's own
entries. Surely this is much better than parsing the whole log history and showing the results to the player. There is
very little information about the file structure of this file.

I found two GitHub repos, which have attempted to parse the `pld.dat` file, and one has succeeded as well.

## Overview

- **File Location (System SaveData):** `/pld.dat`
- **Save Archive IDs:**
  - `0x00020202` (JPN)
  - `0x00020212` (USA)
  - `0x00020222` (EUR)
  - `0x00020272` (KOR)

- **Total File Size:** `806,160 bytes` (fixed)
- **Byte Order:** Little-Endian
- **Epoch:** Nintendo 3DS Epoch (January 1, 2000, 00:00:00 UTC)

## 1. Global File Layout

The file is divided into three main sections: a small header, a massive ring buffer for play sessions, and an aggregated
library summary at the end.

| Start Offset | Size (Bytes) | Section Name         | Description                                                         |
| ------------ | ------------ | -------------------- | ------------------------------------------------------------------- |
| `0x00000`    | 16           | Header               | Metadata and potential session/app count flags.                     |
| `0x00010`    | 800,000      | Table 1: Session Log | Hour-by-hour play sessions. 50,000 records total (16 bytes each).   |
| `0xC3510`    | 6,144        | Table 2: App Summary | Lifetime totals per application. 256 records total (24 bytes each). |

The fixed record count is the reason 3DS starts deleting old entries when the buffer is full (approximately 10 years).

## 2. Data Structures

All multi-byte integer fields are stored in _Little-Endian_ format. Unused or empty slots in both tables are indicated
by a Title ID of either `0x0000000000000000` or `0xFFFFFFFFFFFFFFFF`.

### The File Header (16 Bytes)

Offset: `0x00000`

| Offset | Type     | Name       | Description                                                            |
| ------ | -------- | ---------- | ---------------------------------------------------------------------- |
| `0x00` | `uint32` | `unknown0` | Unknown.                                                               |
| `0x04` | `uint32` | `field04`  | Often observed as 232; potentially related to total app/session count. |
| `0x08` | `uint32` | `unknown8` | Unknown.                                                               |
| `0x0C` | `uint32` | `unknownC` | Unknown.                                                               |

### Table 1: Session Log Entry (16 Bytes)

Offset: `0x00010`

This table tracks exactly _when_ and _for how long_ an app was played. The 3DS aggregates these logs into 1-hour chunks.

| Offset | Type     | Name        | Description                                                                          |
| ------ | -------- | ----------- | ------------------------------------------------------------------------------------ |
| `0x00` | `uint64` | `title_id`  | Unique 64-bit Title ID of the application.                                           |
| `0x08` | `uint32` | `timestamp` | Seconds since Jan 1, 2000. Aligned to the start of the hour. (no minute granularity) |
| `0x0C` | `uint32` | `play_secs` | Total seconds played during that specific hour (0–3600).                             |

### Table 2: App Summary Entry (24 Bytes)

Offset: `0xC3510`

This table represents the "Software Library" view. It stores the aggregated lifetime statistics for every application
launched on the console, with a hard limit of 256 applications.

| Offset | Type     | Name           | Description                                              |
| ------ | -------- | -------------- | -------------------------------------------------------- |
| `0x00` | `uint64` | `title_id`     | Unique 64-bit Title ID of the application.               |
| `0x08` | `uint32` | `total_secs`   | Lifetime total playtime in seconds.                      |
| `0x0C` | `uint16` | `launch_count` | Number of times the application was launched.            |
| `0x0E` | `uint16` | `unknown_e`    | Unknown (often observed as 1 or 2).                      |
| `0x10` | `uint16` | `first_played` | Days since Jan 1, 2000 the app was first opened.         |
| `0x12` | `uint16` | `last_played`  | Days since Jan 1, 2000 the app was most recently opened. |
| `0x14` | `uint32` | `unknown_14`   | Unknown (always observed as 0).                          |

---

## 3. Date & Time Parsing

The 3DS does not use standard UNIX time (1970). It uses a custom epoch starting at **January 1, 2000**. Furthermore, the
console does not strictly obey timezones; it merely counts the seconds/days based on the system's local clock
configuration.

- **Timestamps (`uint32`):** To convert to UNIX time, add `946684800` (the number of seconds between Jan 1, 1970, and
  Jan 1, 2000).
- **Days (`uint16`):** Used in the App Summary block. To convert to a Gregorian date, add the day integer to the
  `January 1, 2000` base date.

---

### References

1. https://github.com/TheOkster/3DSActivityLogParser - Partial parsing, but exports with title information. Kickstarted
   my search.

2. https://github.com/davidthebard/activity-log-plus-plus - Awesome resource, does a full parsing, since it actually
   mimics the actual Activity Log app, with some extra features.

3. https://github.com/Ryuzaki-MrL/Cthulhu - Performs editing of the Activity Log save.
