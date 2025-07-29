#include <stdint.h>
#include <stdio.h>
#include <time.h>

struct PedoEntry {
  uint32_t timestamp;
  uint16_t steps;
} __attribute__((packed));

int main() {
  FILE *pedo = fopen("data/Pedometer.dat", "rb");
  if (!pedo) {
    perror("Failed to open pedometer.dat");
    return 1;
  }

  struct PedoEntry entry;
  while (fread(&entry, sizeof(struct PedoEntry), 1, pedo) == 1) {
    if (entry.timestamp != 0) {
      uint32_t timestamp = entry.timestamp;
      time_t ts = (time_t)timestamp;
      struct tm *tm_info = gmtime(&ts);
      char buffer[26];
      strftime(buffer, sizeof(buffer), "%Y-%m-%d", tm_info);
      printf("Timestamp: %u, Date: %s, Steps: %u\n", timestamp, buffer,
             entry.steps);
    }
  }

  fclose(pedo);
  return 0;
}
