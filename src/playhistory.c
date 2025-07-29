#include <stdint.h>
#include <stdio.h>
#include <time.h>

struct Index {
  uint32_t start_entry;
  uint32_t num_entries;
} __attribute__((packed));

struct PlayEntry {
  uint32_t tidhigh;
  uint32_t tidlow;
  uint32_t extra;
} __attribute__((packed));

int main() {
  FILE *pedo = fopen("data/PlayHistory.dat", "rb");
  if (!pedo) {
    perror("Failed to open PlayHistory.dat");
    return 1;
  }

  struct Index index;
  int start_entry, total_entries;

  if (fread(&index, sizeof(struct Index), 1, pedo) == 1) {
    start_entry = index.start_entry;
    total_entries = index.num_entries;
  }

  printf("START ENTRY: %d\n", start_entry);
  printf("TOTAL ENTRIES: %d\n", total_entries);

  struct PlayEntry entry;

  int records = 0;

  while (records < total_entries) {
    if (fread(&entry, sizeof(struct PlayEntry), 1, pedo) == 1) {
      uint32_t tidhigh = entry.tidhigh;
      uint32_t tidlow = entry.tidlow;
      uint8_t log_info = entry.extra & 0x0000000F;
      uint32_t timestamp = (entry.extra >> 4) * 60 + 946684800;

      time_t ts = (time_t)timestamp;
      struct tm *tm_info = gmtime(&ts);
      char buffer[26];
      strftime(buffer, sizeof(buffer), "%Y-%m-%d %H:%M", tm_info);

      printf("Record %d: TID: %08x %08x, Log: %04b, Date: %s\n", records,
             tidhigh, tidlow, log_info, buffer);

      records += 1;
    } else {
      break;
    }
  }

  fclose(pedo);
  return 0;
}
