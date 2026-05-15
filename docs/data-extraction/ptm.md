# 3DS PTM Telemetry Extraction (PlayHistory.dat & Pedometer.dat)

> **Warning**
> The Play Time Management (PTM) data is a temporary ring buffer. It only contains recent telemetry. Older application
> closures and step counts get overwritten over time. For accurate lifetime data, use the `pld.dat` extraction method
> instead.

This guide covers extracting the raw `.dat` telemetry files using JKSM, bypassing the need for GodMode9 and payload
decryption tools in the [legacy](ptm-legacy.md) guide.

## Prerequisites

- A modified Nintendo 3DS with Custom Firmware.
- **JKSM** (JK's SaveManager) installed on your 3DS.
- Python 3 and `uv` installed on your computer.

## Step 1: Export PTM Data via JKSM

1. Launch **JKSM** from your 3DS.
2. Navigate to **System Save Data** (not System Titles).
3. Look for the PTM module ID: `00010022`. Select it.
4. Select **New**, name the backup (e.g., `PTMDump`), and press **A** to export.
5. Power off the console.

## Step 2: Transfer to PC

1. Insert your 3DS SD card into your computer.
2. Navigate to `SD:/JKSV/SysSave/00010022/PTMDump/`.
3. You will see your fully decrypted `PlayHistory.dat` and `Pedometer.dat` files.
4. Copy both files into the `input/` directory of this repository.

## Step 3: Convert .dat to CSV

Use the provided Python scripts to parse the raw binary files into readable data.

**Play History:**
Converts raw Title IDs and UNIX timestamps into a chronologically sorted CSV.

```bash
uv run lib/playhistory.py
```

**Output:** `output/playhistory.csv`

### Pedometer Data (Not Working Yet)

Reads the 6-byte records (timestamp + step count) and prints the daily step history.

```bash
uv run lib/pedometer.py

```

**Output:** Prints the work in progress pedometer parsing to the console.

---

### Resources:

1. https://3dbrew.org/wiki/System_SaveData - Overview on the location of different saves files.

2. https://www.3dbrew.org/wiki/PTM_Savegame - Save data structure for help in reverse engineering.

3. https://gbatemp.net/threads/playhistory-dat-timestamp.580853/post-10297936 - Source of the explanation in article [2], by TollyH.
