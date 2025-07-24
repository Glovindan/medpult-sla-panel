import { FetchData } from "../../../UIKit/CustomList/CustomListTypes";
import { SlaRowDataGroup } from "../../components/SlaPanel/SlaList/slaListTypes";
import { getRandomSlaListTask, getRandomSlaListRequest } from "./slaGenerator";
import { CustomSelectOption } from "../../../UIKit/CustomSelect/CustomSelectTypes";
import { ObjectItem } from "../../../UIKit/Filters/FiltersTypes";
import { requestMock } from "./requestMock";
import { taskMock } from "./taskMock";

/** Ожидание */
function sleep(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

/** Получение списка SLA */
async function getSlaTask(): Promise<FetchData<SlaRowDataGroup>> {
  await sleep(1000);
  const items = taskMock.map((rowData) => {
    //const subData = getRandomSlaListTask(2);
    const shouldAddGroup = Math.random() > 0.5;
    return {
      id: rowData.id.value,
      data: {
        ...rowData,
        ...(shouldAddGroup && { groupData: getRandomSlaListTask(2) }),
      },
    };
  });

  return {
    hasMore: false,
    items: items,
  };
}

async function getSlaRequest(): Promise<FetchData<SlaRowDataGroup>> {
  await sleep(1000);
  const items = requestMock.map((rowData) => {
    const shouldAddGroup = Math.random() > 0.5;
    return {
      id: rowData.id.value,
      data: {
        ...rowData,
        ...(shouldAddGroup && { groupData: getRandomSlaListRequest(2) }),
      },
    };
  });

  return {
    hasMore: false,
    items: items,
  };
}

/** Получение списка Показателей */
async function getSLaTypes(): Promise<ObjectItem[]> {
  await sleep(1000);
  const slaTypes: ObjectItem[] = [
    new ObjectItem({ code: "test", value: "Скорость обработки обращения" }),
    new ObjectItem({ code: "test1", value: "Скорость решения задачи" }),
  ];

  return slaTypes;
}
/** Получение списка ВИП */
async function getVipStatuses(): Promise<ObjectItem[]> {
  await sleep(1000);
  const vipStatuses: ObjectItem[] = [
    new ObjectItem({ code: "Gold", value: "Gold" }),
    new ObjectItem({ code: "Silver", value: "Silver" }),
    new ObjectItem({ code: "Platinum", value: "Platinum" }),
  ];
  return vipStatuses;
}
/** Получение списка тип Задачи */
async function getTaskTypes(): Promise<ObjectItem[]> {
  await sleep(1000);
  const taskTypes: ObjectItem[] = [
    new ObjectItem({ code: "medical", value: "Медицинская" }),
    new ObjectItem({ code: "informational", value: "Информационная" }),
    new ObjectItem({ code: "negative", value: "Негативная" }),
  ];
  return taskTypes;
}
/** Получение списка вид Задачи */
async function getTaskSort(): Promise<ObjectItem[]> {
  await sleep(1000);
  const taskSort: ObjectItem[] = [
    new ObjectItem({ code: "smp", value: "СМП" }),
    new ObjectItem({ code: "pnd", value: "ПНД" }),
    new ObjectItem({ code: "approval", value: "Согласование услуг" }),
  ];
  return taskSort;
}

/** Получение списка тематики */
async function getTopic(): Promise<ObjectItem[]> {
  await sleep(1000);
  const topic: ObjectItem[] = [
    new ObjectItem({ code: "incident", value: "Инцидент" }),
    new ObjectItem({ code: "request", value: "Запрос" }),
  ];
  return topic;
}
/** Получение списка срочности */
async function getUrgency(): Promise<ObjectItem[]> {
  await sleep(1000);
  const urgency: ObjectItem[] = [
    new ObjectItem({ code: "plan", value: "Планово" }),
    new ObjectItem({ code: "extra", value: "Экстренно" }),
  ];
  return urgency;
}

/** Получение списка тип Канала */
async function getTypeChannel(): Promise<ObjectItem[]> {
  await sleep(1000);
  const typeChannel: ObjectItem[] = [
    new ObjectItem({ code: "plan", value: "Планово" }),
    new ObjectItem({ code: "extra", value: "Экстренно" }),
  ];
  return typeChannel;
}
/** Получение списка вид Канала */
async function getSortChannel(): Promise<ObjectItem[]> {
  await sleep(1000);
  const sortChannel: ObjectItem[] = [
    new ObjectItem({ code: "plan", value: "Планово" }),
    new ObjectItem({ code: "extra", value: "Экстренно" }),
  ];
  return sortChannel;
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
async function OnInit(): Promise<void> {
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

  OnInit,
};
