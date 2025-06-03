import { FetchData } from "../../../UIKit/CustomList/CustomListTypes";
import { SlaRowDataGroup } from "../../components/SlaPanel/SlaList/slaListTypes";
import { generateRandomSlaRowData, getRandomSlaList } from "./slaGenerator";

/** Ожидание */
function sleep(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

/** Получение списка SLA */
async function getSla(): Promise<FetchData<SlaRowDataGroup>> {
    await sleep(1000)
    const items = getRandomSlaList(20).map(rowData => {
      const subData = getRandomSlaList(4);
      return {
        id: rowData.id.value,
        data: {
          ...rowData,
          groupData: subData
        }
      }
    });

    return {
      hasMore: false,
      items: items
    }
}

export default {
  getSla
}
