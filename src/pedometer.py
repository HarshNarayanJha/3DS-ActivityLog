import struct
from datetime import datetime

RECORD_SIZE = 6  # u32 (4 bytes) + u16 (2 bytes)

with open("data/Pedometer.dat", "rb") as f:
    record_num = 0
    while True:
        data = f.read(RECORD_SIZE)
        if len(data) < RECORD_SIZE:
            break

        timestamp, steps = struct.unpack("<IH", data)
        date = datetime.fromtimestamp(timestamp)

        # if date.year in range(2016, 2026):
        print(f"Record {record_num}: Date {date}, Steps {steps}")

        record_num += 1
