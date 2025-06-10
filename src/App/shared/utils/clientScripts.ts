import { FetchData } from "../../../UIKit/CustomList/CustomListTypes";
import {
  SlaRowDataGroupTask,
  SlaRowDataGroupRequest,
} from "../../components/SlaPanel/SlaList/slaListTypes";
import { getRandomSlaListTask, getRandomSlaListRequest } from "./slaGenerator";
import { CustomSelectOption } from "../../../UIKit/CustomSelect/CustomSelectTypes";

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

/** Получение списка Показателей */
async function getSLaTypes(): Promise<CustomSelectOption[]> {
  await sleep(1000);
  return [
    {
      code: "9f8e6dda-94f3-47f0-b69c-bc514a446b14",
      value: "103.test",
    },
    {
      code: "b97aa797-55a4-4429-a64d-e7c51910b33c",
      value: "sa-medpult-mail",
    },
  ];
}
/** Получение списка ВИП */
async function getVipStatuses(): Promise<CustomSelectOption[]> {
  await sleep(1000);
  return [
    { code: "Gold", value: "Gold" },
    { code: "Silver", value: "Silver" },
    { code: "Platinum", value: "Platinum" },
  ];
}
/** Получение списка тип Задачи */
async function getTaskTypes(): Promise<CustomSelectOption[]> {
  await sleep(1000);
  return [
    { code: "medical", value: "Медицинская" },
    { code: "informational", value: "Информационная" },
    { code: "negative", value: "Негативная" },
  ];
}
/** Получение списка вид Задачи */
async function getTaskSort(): Promise<CustomSelectOption[]> {
  await sleep(1000);
  return [
    { code: "smp", value: "СМП" },
    { code: "pnd", value: "ПНД" },
    { code: "approval", value: "Согласование услуг" },
  ];
}

/** Получение списка тематики */
async function getTopic(): Promise<CustomSelectOption[]> {
  await sleep(1000);
  return [
    { code: "incident", value: "Инцидент" },
    { code: "request", value: "Запрос" },
  ];
}
/** Получение списка срочности */
async function getUrgency(): Promise<CustomSelectOption[]> {
  await sleep(1000);
  return [
    { code: "plan", value: "Планово" },
    { code: "extra", value: "Экстренно" },
  ];
}

/** Получение списка тип Канала */
async function getTypeChannel(): Promise<CustomSelectOption[]> {
  await sleep(1000);
  return [
    { code: "medical", value: "Медицинская" },
    { code: "informational", value: "Информационная" },
    { code: "negative", value: "Негативная" },
  ];
}
/** Получение списка вид Канала */
async function getSortChannel(): Promise<CustomSelectOption[]> {
  await sleep(1000);
  return [
    { code: "smp", value: "СМП" },
    { code: "pnd", value: "ПНД" },
    { code: "approval", value: "Согласование услуг" },
  ];
}

/** Добавить sla Задачи */
async function addSlaTask(
  days: string,
  hours: string,
  minutes: string,
  startDate: string,
  type?: string,
  endDate?: string,
  signVip?: string | string[],
  taskType?: string | string[],
  taskSort?: string | string[],
  topic?: string | string[],
  urgency?: string | string[],
  product?: string,
  executer?: string
): Promise<void> {
  // TODO
  await sleep(1000);
}

/** Добавить sla Обращения */
async function addSlaRequest(
  days: string,
  hours: string,
  minutes: string,
  startDate: string,
  type?: string,
  endDate?: string,
  signVip?: string | string[],
  channelType?: string | string[],
  channelSort?: string | string[]
): Promise<void> {
  // TODO
  await sleep(1000);
}

/** завершить sla Задачи */
async function competeSlaTask(endDate: string): Promise<void> {
  // TODO
  await sleep(1000);
}

/** завершить sla Обращения */
async function competeSlaRequest(endDate: string): Promise<void> {
  // TODO
  await sleep(1000);
}

/** аннулировать sla Задачи */
async function cancelSlaTask(): Promise<void> {
  // TODO
  await sleep(1000);
}

/** аннулировать sla Обращения */
async function cancelSlaRequest(): Promise<void> {
  // TODO
  await sleep(1000);
}

export default {
  getSlaTask,
  getSlaRequest,

  getSLaTypes,
  getVipStatuses,
  getTaskTypes,
  getTaskSort,
  getTopic,
  getUrgency,
  getTypeChannel,
  getSortChannel,

  addSlaTask,
  addSlaRequest,
  competeSlaTask,
  competeSlaRequest,
  cancelSlaTask,
  cancelSlaRequest,
};
