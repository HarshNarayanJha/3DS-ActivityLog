# 3DS Activity Log Data Extraction (pld.dat)

> **Note**
> This is the recommended extraction method. The `pld.dat` file contains your console's permanent, lifetime play history and daily step counts. It does not suffer from the "missing data" ring-buffer issue found in the raw PTM telemetry.

This guide covers extracting `pld.dat` directly from your 3DS using JKSM (a homebrew save manager).

## Prerequisites

- A modified Nintendo 3DS with Custom Firmware.
- **JKSM** (JK's SaveManager) installed on your 3DS.
- Your 3DS SD card.

## Step 1: Export Data via JKSM

1. Launch **JKSM** from your 3DS Home Menu or the Homebrew Launcher.
2. Select **System Titles**.
3. Scroll down the list and select **Activity Log**.
4. Select **SysSave Data**.
5. Select **New**, type a name for your backup (e.g., `ActivityLogDump`), and press **A** to confirm.
6. Once the export is complete, power off your console.

## Step 2: Transfer to PC

1. Insert your 3DS SD card into your computer (or use ftpd whatever way, it doesn't matter).
2. Navigate to the JKSM backup folder: `SD:/JKSV/SysSave_Data/Activity_Log/ActivityLogDump/`.
3. Locate the `pld.dat` file.
4. Copy `pld.dat` into the `saves/` directory of this repository for parsing.

---

### Resources

1. https://www.3dbrew.org/wiki/Activity_Log
