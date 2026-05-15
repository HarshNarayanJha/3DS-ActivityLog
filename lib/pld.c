#include <stdbool.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define PLD_SESSION_OFFSET 0x00010u
#define PLD_SUMMARY_OFFSET 0xC3510u
#define PLD_SESSION_COUNT 50000
#define PLD_SUMMARY_COUNT 256

#define PLD_DAT_PATH "../saves/ActivityLog/pld.dat"
#define CSV_SUMMARY_PATH "../output/pld_summary.csv"
#define CSV_SESSIONS_PATH "../output/pld_sessions.csv"

#define CSV_SUMMARY_HEADER                                                     \
  "TitleID,PlaytimeSeconds,Launches,FirstPlayed,LastPlayed\n"
#define CSV_SESSIONS_HEADER "TitleID,Timestamp,PlaytimeSeconds\n"

typedef struct {
  uint64_t title_id;
  uint32_t timestamp;
  uint32_t play_secs;
} __attribute__((packed)) PLDSession;

typedef struct {
  uint64_t title_id;
  uint32_t total_secs;
  uint16_t launch_count;
  uint16_t unknwon_e;
  uint16_t first_played_days;
  uint16_t last_played_days;
  uint32_t unknwon_14;
} __attribute__((packed)) PLDAppSummary;

/**
 * Reads in a 3DS Epoch (days since 2000-01-01 00:00:00 UTC) and outputs an ISO
 * Date string
 */
void fmt_date(uint16_t days, char *buf, size_t len) {
  if (days == 0) {
    snprintf(buf, len, "N/A");
    return;
  }

  static const int month_days[12] = {31, 28, 31, 30, 31, 30,
                                     31, 31, 30, 31, 30, 31};
  int year = 2000;
  int d = (int)days;

  year += (d / 1461) * 4;
  d %= 1461;

  for (int y = 0; y < 4; y++) {
    bool leap = (year % 4 == 0);
    int days_in_year = leap ? 366 : 365;
    if (d < days_in_year)
      break;
    d -= days_in_year;
    year++;
  }

  bool leap = (year % 4 == 0);
  int month = 0;
  for (month = 0; month < 12; month++) {
    int dim = month_days[month];
    if (leap && month == 1)
      dim = 29;
    if (d < dim)
      break;
    d -= dim;
  }

  snprintf(buf, len, "%04d-%02d-%02d", year, month + 1, d + 1);
}

/**
 * Formats a timestamp as a human-readable string in the format
 * "YYYY-MM-DDTHH:00".
 */
void fmt_timestamp(uint32_t timestamp, char *buf, size_t len) {
  uint32_t total_days = timestamp / 86400;
  uint32_t hour = (timestamp % 86400) / 3600;
  char date_buf[12];
  fmt_date((uint16_t)total_days, date_buf, sizeof(date_buf));
  snprintf(buf, len, "%sT%02lu:00", date_buf, (unsigned long)hour);
}

/**
 * Parses the PLD app summaries from the given file and writes them to the CSV
 * file.
 *
 * Returns the number of summaries parsed.
 */
int parse_summary(FILE *f, FILE *csv_summary) {
  PLDAppSummary summary;
  int summary_count = 0;

  // seek to the start of summary
  fseek(f, PLD_SUMMARY_OFFSET, SEEK_SET);

  // print the csv header first
  fprintf(csv_summary, CSV_SUMMARY_HEADER);

  for (int i = 0; i < PLD_SUMMARY_COUNT; i++) {
    // try reading the struct
    if (fread(&summary, sizeof(PLDAppSummary), 1, f) != 1)
      break;

    // reached the end of records, empty entries ahead
    if (summary.title_id == 0 || summary.title_id == 0xFFFFFFFFFFFFFFFFULL)
      continue;

    char first_played[16], last_played[16];
    fmt_date(summary.first_played_days, first_played, sizeof(first_played));
    fmt_date(summary.last_played_days, last_played, sizeof(last_played));

    fprintf(csv_summary, "%016llx,%u,%u,%s,%s\n",
            (unsigned long long)summary.title_id, summary.total_secs,
            summary.launch_count, first_played, last_played);
    summary_count++;
  }

  return summary_count;
}

/**
 * Parses the PLD sessions from the given file and writes them to a CSV file.
 *
 * Returns the number of sessions parsed.
 */
int parse_sessions(FILE *f, FILE *csv_sessions) {
  PLDSession session;
  int session_count = 0;

  // seek to the session offset
  fseek(f, PLD_SESSION_OFFSET, SEEK_SET);

  // print the csv header
  fprintf(csv_sessions, CSV_SESSIONS_HEADER);

  for (int i = 0; i < PLD_SESSION_COUNT; i++) {
    if (fread(&session, sizeof(PLDSession), 1, f) != 1)
      break;

    if (session.title_id == 0 || session.title_id == 0xFFFFFFFFFFFFFFFFULL)
      continue;

    char time_str[32];
    fmt_timestamp(session.timestamp, time_str, sizeof(time_str));

    fprintf(csv_sessions, "%016llx,%s,%u\n",
            (unsigned long long)session.title_id, time_str, session.play_secs);
    session_count++;
  }

  return session_count;
}

int main() {
  FILE *f = fopen(PLD_DAT_PATH, "rb");
  if (!f) {
    perror("Failed to open " PLD_DAT_PATH);
    return 1;
  }

  // 1. Parse summaries
  FILE *csv_summary = fopen(CSV_SUMMARY_PATH, "w");
  if (!csv_summary) {
    perror("Failed to open " CSV_SUMMARY_PATH);
    return 1;
  }
  int summary_count = parse_summary(f, csv_summary);
  fclose(csv_summary);
  printf("Extracted %d summaries to %s\n", summary_count, CSV_SUMMARY_PATH);

  // 2. Parse sessions
  FILE *csv_sessions = fopen(CSV_SESSIONS_PATH, "w");
  if (!csv_sessions) {
    perror("Failed to open " CSV_SESSIONS_PATH);
    return 1;
  }
  int session_count = parse_sessions(f, csv_sessions);
  fclose(csv_sessions);
  printf("Extracted %d sessions to %s\n", session_count, CSV_SESSIONS_PATH);

  fclose(f);

  return 0;
}
