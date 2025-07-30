import type { Region, TitleData } from "./types"
import rawTitleDB from "./3ds_releases.json"
import rawHwDB from "./hbdb.json"

const titleDB: Record<string, any> = rawTitleDB as Record<string, any>
const hbDB: Record<string, any> = rawHwDB as Record<string, any>

const cache = new Map<string, any>()

export const getTitle = async (tid: string): Promise<TitleData> => {
  // search the cache first
  if (cache.has(tid)) {
    console.log(`Cache hit`)
    return cache.get(tid)
  }

  // check local title db
  const localData = findTitleInLocalDB(tid)
  if (localData !== null) {
    cache.set(tid, localData)
    return localData
  }

  // check hbdb
  const hbData = findTitleInHbDB(tid)
  if (hbData !== null) {
    cache.set(tid, hbData)
    return hbData
  }

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

  console.log(`Not found ${tid}`)
  const data = {
    tid,
    titleName: "Unknown",
    serial: "Unknown",
    region: parseRegion("Region Free"),
    publisher: "Nintendo",
    trimmedSizeBytes: 1234
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
    console.log("Found in local db")
    const rawData = titleDB[tid]
    return {
      tid,
      titleName: rawData.name,
      serial: rawData.serial,
      region: parseRegion(rawData.region),
      publisher: rawData.publisher,
      trimmedSizeBytes: rawData.trimmedsize
    }
  }

  return null
}

const findTitleInHbDB = (tid: string): TitleData | null => {
  if (tid in hbDB) {
    console.log("Found in hb db")
    const rawData = hbDB[tid]
    return {
      tid,
      titleName: rawData.name,
      serial: "",
      region: parseRegion("Region Free"),
      publisher: rawData.author,
      trimmedSizeBytes: 1234
    }
  }

  return null
}
