import { isDiaryEntry } from "../types/entry/diary"
import { isEncyclopediaEntry } from "../types/entry/encyclopedia"
import { Entry, EntryType, isEntry } from "../types/entry/entry"
import { isMapEntry } from "../types/entry/map"
import { isTaskEntry } from "../types/entry/task"

export const typeGuards = (type: EntryType | "all" = "all"): (data: unknown) => data is Entry => {
  switch(type) {
    case "diary": return isDiaryEntry
    case "encyclopedia": return isEncyclopediaEntry
    case "map": return isMapEntry
    case "task": return isTaskEntry
    default: return isEntry
  }
}