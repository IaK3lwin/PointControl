import type { WorkDayCollection } from "$lib/domain/WorkDayCollection";

export function returnWorkdayPaitTrue(workdayCollection: WorkDayCollection): WorkDayCollection {

    return workdayCollection.filter((key, workday) => {
      if (!workday) {
        return false
      }

      if (workday.pait) {
        return true
      }

      return false
    })
}