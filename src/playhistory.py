import csv
import struct
from datetime import UTC, datetime, timezone

START_ENTRY_SIZE = 4  # u32 4 bytes
TOTAL_ENTRIES_SIZE = 4  # u32 4 bytes
RECORD_SIZE = 12  # u32 (titleID-high, 4 bytes) + u32 (titleID-low, 4 bytes) + u32 (28 bits (timestamp) + 4 bits (log info), 4 bytes)

with open("data/PlayHistory.dat", "rb") as f:
    record_num = 0
    data = f.read(START_ENTRY_SIZE)
    (start_entry,) = struct.unpack("<I", data)
    print(f"START ENTRY: {start_entry}")

    data = f.read(TOTAL_ENTRIES_SIZE)
    (total_entries,) = struct.unpack("<I", data)
    print(f"TOTAL ENTRIES: {total_entries}")

    csv_file = open("data/playhistory.csv", "w", newline="")
    csv_writer = csv.writer(csv_file)
    # Record Index number (from 0), TID Low, TID High, Log info flags, UNIX timestamp
    csv_writer.writerow(["Record", "TID", "Log_Info", "Timestamp"])

    while record_num < total_entries:
        data = f.read(RECORD_SIZE)
        if len(data) < RECORD_SIZE:
            break

        tidhigh, tidlow, extra = struct.unpack("<III", data)
        log_info, timestamp = extra & 0x0000000F, (extra >> 4) * 60

        epoch_2000 = datetime(2000, 1, 1, tzinfo=timezone.utc).timestamp()
        final_timestamp = timestamp + epoch_2000
        date = datetime.fromtimestamp(final_timestamp, UTC)

        # print(
        # f"Record {record_num:03d}: TID: {tidhigh:08x} {tidlow:08x}, Log: {log_info:04b}, Date: {date}, Extra: {extra:032b}"
        # )
        csv_writer.writerow([record_num + 1, f"{tidhigh:08x}{tidlow:08x}", log_info, int(final_timestamp)])

        record_num += 1

    csv_file.close()
    print("wrote to data/playhistory.csv.")
