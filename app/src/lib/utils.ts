export const formatTimestamp = (timestamp: number) => {
  return new Date(timestamp * 1000).toUTCString()
}
