import type { Region, TitleData } from "./types"
import rawTitleDB from "./final_local_title_list.json"
import rawFallbackDB from "./final_fallback_title_list.json"

const titleDB: Record<string, any> = rawTitleDB as Record<string, any>
const fallbackDB: Record<string, any> = rawFallbackDB as Record<string, any>

const cache = new Map<string, any>()

export const stats = {
  cache: new Set(),
  local: new Set(),
  notFound: new Set()
}

export const getTitle = async (tid: string): Promise<TitleData> => {
  // search the cache first
  if (cache.has(tid)) {
    // console.log(`Cache hit`)
    stats.cache.add(`${tid}: ${cache.get(tid).titleName}`)
    return cache.get(tid)
  }

  const gameData = findTitleInLocalDB(tid)
  if (gameData !== null) {
    stats.local.add(`${tid}: ${gameData.titleName}`)
    cache.set(tid, gameData)
    return gameData
  }

  const fallbackData = findTitleInFallbackDB(tid)
  if (fallbackData !== null) {
    stats.local.add(`${tid}: ${fallbackData.titleName}`)
    cache.set(tid, fallbackData)
    return fallbackData
  }

  stats.notFound.add(`${tid}: Unknown`)

  // check hbdb
  // const hbData = findTitleInHbDB(tid)
  // if (hbData !== null) {
  //   cache.set(tid, hbData)
  //   return hbData
  // }

  // check remote title db
  // console.log(`Calling API`)
  // const res = await fetch(`https://api.ghseshop.cc/${tid}`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   cache: "force-cache"
  // })

  // if (res.status === 404) {
  //   const data = {
  //     tid,
  //     titleName: "Unknown",
  //     serial: "Unknown",
  //     region: parseRegion("Region Free"),
  //     publisher: "Nintendo",
  //     trimmedSizeBytes: 1234
  //   }
  //   cache.set(tid, data)
  //   return data
  // }

  // if (!res.ok) {
  //   const error = await res.text()
  //   console.error(error)
  //   throw new Error(`API Error ${res.status}: ${error}`)
  // }

  // console.log(`Got data. setting cache and returning`)

  // const rawData = await res.json()
  // const data = {
  //   tid,
  //   titleName: rawData.formal_name,
  //   serial: rawData.product_code,
  //   region: parseRegion(rawData.region),
  //   publisher: "Nintendo",
  //   trimmedSizeBytes: 1234
  // }
  // cache.set(tid, data)

  // return data

  // console.log(`Not found ${tid}`)
  const data = {
    tid,
    uid: "",
    titleName: "Unknown",
    publisher: "Unknown",
    serial: "???",
    region: parseRegion("Region Free"),
    trimmedSizeBytes: 0
  }
  cache.set(tid, data)
  return data
}

const parseRegion = (region: string): Region => {
  switch (region) {
    case "JPN":
      return "Japan"
    case "USA":
      return "North America"
    case "EUR":
      return "Europe"
    case "KOR":
      return "Korea"
    case "TWN":
      return "Taiwan"
    case "CHN":
      return "China"
    case "Region Free":
      return "Region Free"
    default:
      return region as Region
  }
}

const findTitleInLocalDB = (tid: string): TitleData | null => {
  if (tid in titleDB) {
    // console.log("Found in game db")
    const rawData = titleDB[tid]
    return {
      tid,
      uid: rawData.uid,
      titleName: rawData.titleName,
      publisher: rawData.publisher,
      serial: rawData.serial,
      region: parseRegion(rawData.region),
      trimmedSizeBytes: rawData.trimmedSizeBytes,
      genres: rawData.genres,
      iconUrl: rawData.iconUrl,
      bannerUrl: rawData.bannerUrl
    }
  }

  return null
}

const findTitleInFallbackDB = (tid: string): TitleData | null => {
  if (tid in fallbackDB) {
    // console.log("Found in game db")
    const rawData = fallbackDB[tid]
    return {
      tid,
      uid: rawData.uid,
      titleName: rawData.titleName,
      publisher: rawData.publisher,
      serial: rawData.serial,
      region: parseRegion(rawData.region),
      trimmedSizeBytes: rawData.trimmedSizeBytes,
      genres: rawData.genres
      // iconUrl: rawData.iconUrl,
      // bannerUrl: rawData.bannerUrl
    }
  }

  return null
}

// const findTitleInHbDB = (tid: string): TitleData | null => {
//   if (tid in hbDB) {
//     // console.log("Found in hb db")
//     const rawData = hbDB[tid]
//     return {
//       tid,
//       titleName: rawData.name,
//       serial: "",
//       region: parseRegion("Region Free"),
//       publisher: rawData.author,
//       trimmedSizeBytes: 1234
//     }
//   }

//   return null
// }
