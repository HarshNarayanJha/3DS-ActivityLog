# 3DS PTM Data Extraction & Conversion

> **Warning**
> The data extracted using this specific method comes from the Play Time Management (PTM) system module. This module
> uses a ring buffer. It only contains recent telemetry and will be missing older entries if the buffer has overwritten
> them. For lifetime Activity Log data, `pld.dat` extraction is required (documented separately).

This guide covers extracting `PlayHistory.dat` and `Pedometer.dat` directly from a modified Nintendo 3DS and converting
them into readable CSV formats.

## Prerequisites

- A 3DS with Custom Firmware (Luma3DS + GodMode9).
- Python 3 installed on your computer.
- `uv` installed (for running the Python scripts, can use system python as well).
- Clone this repository to your local machine.

## Step 1: Extract NAND SaveData via GodMode9

The 3DS logs hardware telemetry (app launches, closures, step counts) in the NAND. This data is known to be inaccurate
in some cases.

1. Boot your 3DS while holding the **START** button to launch GodMode9.
2. Navigate to `[1:] SYSNAND CTRNAND` -> `data` -> `<ID0>` (your unique 32-character folder).
3. Navigate to `sysdata` -> `00010022`.
4. Locate the file named `00000000`. This is the encrypted PTM save data.
5. Press **A** on `00000000`, select **Copy to 0:/gm9/out**, and press **A** to confirm.
6. Power off the console.
7. Insert your 3DS SD card into your computer.
8. Create an `input/` directory in the root of this cloned repository.
9. Move the `00000000` file from `SD:/gm9/out/` to the `input/` directory.

## Step 2: Unpack the DISA Archive

The `00000000` file is a DISA archive. We use `3ds-save-tool` to extract the underlying `.dat` files.

1. Open a terminal at the root of this repository.
2. Clone the extraction tool:

```bash
git clone https://github.com/wwylele/3ds-save-tool.git

```

3. Create an `output/` directory for the extracted files:

```bash
mkdir output

```

4. Run the extraction script:

```bash
python 3ds-save-tool/disa-extract.py input/00000000 output/

```

5. Verify that `PlayHistory.dat` and `Pedometer.dat` now exist in the `output/` directory.

## Step 3: Convert .dat to CSV

Use the provided Python scripts to parse the raw binary files into readable data.

### Play History

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

**Output:** Standard console output (can be piped to a file: `uv run lib/pedometer.py > output/pedometer.txt`).

---

### Resources

1. https://3dbrew.org/wiki/System_SaveData - Overview on the location of different saves files.

2. https://www.3dbrew.org/wiki/PTM_Savegame - Save data structure for help in reverse engineering.

3. https://gbatemp.net/threads/playhistory-dat-timestamp.580853/post-10297936 - Source of the explanation in article [2], by TollyH.

4. https://gbatemp.net/threads/playhistory-dat-timestamp.580853/post-10085500 - for the automated extraction gm9 script

5. https://github.com/wwylele/3ds-save-tool - extraction of save files, which is now done automatically by JKSM in the [latest](ptm.md) guide.
