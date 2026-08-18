import csv
import struct
from datetime import datetime, timedelta

EPOCH_2000 = datetime(2000, 1, 1)


def days_to_date(days):
    if days == 0:
        return "N/A"
    return (EPOCH_2000 + timedelta(days=days)).strftime("%Y-%m-%d")


def timestamp_to_date(timestamp):
    total_days = timestamp // 86400
    hour = (timestamp % 86400) // 3600
    date_str = days_to_date(total_days)
    return f"{date_str}T{hour:02d}:00"


def parse_pld(input_path):
    with open(input_path, "rb") as f:
        # --- 1. PARSE SUMMARIES (Library) ---
        f.seek(0xC3510)
        summaries = []
        for _ in range(256):
            chunk = f.read(24)
            if len(chunk) < 24:
                break

            # Struct: u64(Title), u32(Secs), u16(Launches), u16(Unk), u16(First), u16(Last), u32(Unk)
            tid, total_secs, launches, _, first, last, _ = struct.unpack("<QIHHHH I", chunk)

            if tid in (0, 0xFFFFFFFFFFFFFFFF):
                continue

            summaries.append([f"{tid:016x}", total_secs, launches, days_to_date(first), days_to_date(last)])

        summaries.sort(key=lambda x: x[1], reverse=True)

        with open("output/pld_summary.csv", "w", newline="") as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(["TitleID", "PlaytimeSeconds", "Launches", "FirstPlayed", "LastPlayed"])
            writer.writerows(summaries)
        print(f"Extracted {len(summaries)} summaries to output/pld_summary.csv")

        # --- 2. PARSE SESSIONS (Hour-by-hour logs) ---
        f.seek(0x00010)
        sessions = []
        for _ in range(50000):
            chunk = f.read(16)
            if len(chunk) < 16:
                break

            # Struct: u64(Title), u32(Timestamp), u32(PlaySeconds)
            tid, timestamp, play_secs = struct.unpack("<QII", chunk)

            if tid in (0, 0xFFFFFFFFFFFFFFFF):
                continue

            sessions.append([f"{tid:016x}", timestamp_to_date(timestamp), play_secs])

        with open("output/pld_sessions.csv", "w", newline="") as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(["TitleID", "Timestamp", "PlaySeconds"])
            writer.writerows(sessions)
        print(f"Extracted {len(sessions)} sessions to output/pld_sessions.csv")


if __name__ == "__main__":
    parse_pld("saves/ActivityLog/pld.dat")
