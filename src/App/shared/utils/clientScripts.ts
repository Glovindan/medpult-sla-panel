import { FetchData } from "../../../UIKit/CustomList/CustomListTypes";
import {
  SlaRowDataGroupTask,
  SlaRowDataGroupRequest,
} from "../../components/SlaPanel/SlaList/slaListTypes";
import { getRandomSlaListTask, getRandomSlaListRequest } from "./slaGenerator";

/** Ожидание */
function sleep(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

/** Получение списка SLA */
async function getSlaTask(): Promise<FetchData<SlaRowDataGroupTask>> {
  await sleep(1000);
  const items = getRandomSlaListTask(20).map((rowData) => {
    const subData = getRandomSlaListTask(4);
    return {
      id: rowData.id.value,
      data: {
        ...rowData,
        groupData: subData,
      },
    };
  });

  return {
    hasMore: false,
    items: items,
  };
}
async function getSlaRequest(): Promise<FetchData<SlaRowDataGroupRequest>> {
  await sleep(1000);
  const items = getRandomSlaListRequest(20).map((rowData) => {
    const subData = getRandomSlaListRequest(4);
    return {
      id: rowData.id.value,
      data: {
        ...rowData,
        groupData: subData,
      },
    };
  });

  return {
    hasMore: false,
    items: items,
  };
}

export default {
  getSlaTask,
  getSlaRequest,
};
