import { FetchData } from "../../../UIKit/CustomList/CustomListTypes";
import { SlaRowDataGroup } from "../../components/SlaPanel/SlaList/slaListTypes";
import { getRandomSlaListTask, getRandomSlaListRequest } from "./slaGenerator";
import { CustomSelectOption } from "../../../UIKit/CustomSelect/CustomSelectTypes";
import { ObjectItem } from "../../../UIKit/Filters/FiltersTypes";
import { requestMock } from "./requestMock";
import { taskMock } from "./taskMock";
import { AddRequestSlaArgs, AddTaskSlaArgs, EditSlaArgs } from "../types";

/** Ожидание */
function sleep(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

/** Получение списка SLA */
async function getSlaTask(): Promise<FetchData<SlaRowDataGroup>> {
  await sleep(1000);
  // const items = taskMock.map((rowData) => {
  const items = getRandomSlaListTask(20).map((rowData) => {
    //const subData = getRandomSlaListTask(2);
    const shouldAddGroup = Math.random() > 0.5;
    return {
      id: rowData.id.value,
      data: {
        ...rowData,
        ...(shouldAddGroup && { groupData: getRandomSlaListTask(10) }),
      },
    };
  });

  window["itemsBuffer"] = items;

  console.log("itemsBuffer: ", window["itemsBuffer"]);

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

  window["itemsBufferRequest"] = items;

  console.log("itemsBufferRequest: ", window["itemsBufferRequest"]);

  return {
    hasMore: false,
    items: items,
  };
}

/** Получение списка Показателей обращения */
async function getSLaTypesRequest(): Promise<ObjectItem[]> {
  await sleep(1000);
  const slaTypes: ObjectItem[] = [
    new ObjectItem({ code: "test", value: "Скорость обработки обращения" }),
    new ObjectItem({ code: "test1", value: "Скорость обработки обращения" }),
  ];

  return slaTypes;
}
/** Получение списка Показателей задачи */
async function getSLaTypesTask(): Promise<ObjectItem[]> {
  await sleep(1000);
  const slaTypes: ObjectItem[] = [
    new ObjectItem({ code: "test", value: "Скорость решения задачи" }),
    new ObjectItem({
      code: "test1",
      value: "Скорость решения задачи смежного подразделения",
    }),
  ];

  return slaTypes;
}

/** Получение списка Показателей */
async function getSLaTypes(): Promise<ObjectItem[]> {
  await sleep(1000);
  const slaTypes: ObjectItem[] = [
    new ObjectItem({ code: "test", value: "Скорость решения задачи" }),
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
async function getTaskSort(typeCode?: string): Promise<ObjectItem[]> {
  await sleep(1000);
  const taskSort: ObjectItem[] = [
    new ObjectItem({ code: "smp", value: "СМП" }),
    new ObjectItem({ code: "pnd", value: "ПНД" }),
    new ObjectItem({ code: "approval", value: "Согласование услуг" }),
  ];
  return taskSort;
}
/** Получение типа задачи по коду вида задачи */
async function getParentTaskTypeBySortCode(
  sortCode: string
): Promise<ObjectItem> {
  const taskSort = new ObjectItem({ code: "smp", value: "СМП" });

  return taskSort;
}

/** Получение списка тематики */
async function getTopic(
  typeCode?: string,
  sortCode?: string
): Promise<ObjectItem[]> {
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
    new ObjectItem({ code: "email", value: "Email" }),
    new ObjectItem({ code: "phone", value: "Телефон" }),
  ];
  return typeChannel;
}
/** Получение списка вид Канала */
async function getSortChannel(): Promise<ObjectItem[]> {
  await sleep(1000);
  const sortChannel: ObjectItem[] = [
    new ObjectItem({ code: "dog", value: "dog@pesik.com" }),
    new ObjectItem({ code: "cat", value: "cat@kotik.com" }),
  ];
  return sortChannel;
}

/** Добавить sla Задачи */
async function addSlaTask(slaData: AddTaskSlaArgs): Promise<void> {
  const {
    days,
    hours,
    minutes,
    startDate,
    type,
    endDate,
    signVip,
    taskType,
    taskSort,
    topic,
    urgency,
    product,
    executer,
  } = slaData;

  await sleep(1000);
}

/** Добавить sla Обращения */
async function addSlaRequest(slaData: AddRequestSlaArgs): Promise<void> {
  const {
    days,
    hours,
    minutes,
    startDate,
    type,
    endDate,
    signVip,
    channelType,
    channelSort,
  } = slaData;
  await sleep(1000);
}

/** Изменить sla */
async function editSla(slaData: EditSlaArgs): Promise<void> {
  const {
    days,
    hours,
    minutes,
    startDate,
    type,
    endDate,
    id
  } = slaData;

  await sleep(1000);
}

/** завершить sla Задачи */
async function competeSlaTask(endDate: string, id: string, plannedIds?:  string[]): Promise<void> {
  // TODO
  await sleep(1000);
}

/** завершить sla Обращения */
async function competeSlaRequest(endDate: string, id: string, plannedIds?:  string[]): Promise<void> {
  // TODO
  await sleep(1000);
}

/** аннулировать sla Задачи */
async function cancelSlaTask(id: string): Promise<void> {
  // TODO
  await sleep(1000);
}

/** аннулировать sla Обращения */
async function cancelSlaRequest(id: string): Promise<void> {
  // TODO
  await sleep(1000);
}
async function OnInit(): Promise<void> {
  await sleep(1000);
}

/** Получить стандартный тип SLA обращения*/
function getDefaultSlaTypeRequest(): ObjectItem {
  return { value: "Скорость обработки", code: "speed_code" };
}
/** Получить стандартный тип SLA задачи*/
function getDefaultSlaTypeTask(): ObjectItem {
  return { value: "Скорость обработки", code: "speed_code" };
}

/** Обновление буфера SLA */
async function updateSlaDataBuffer(): Promise<void> {
  await sleep(1000);
}

//Проверка существует ли такой sla обращения
async function checkSlaRequest(slaData: AddRequestSlaArgs): Promise<string | undefined> {
  const {
    days,
    hours,
    minutes,
    startDate,
    type,
    endDate,
    signVip,
    channelType,
    channelSort,
  } = slaData;

  // const isFound = Math.random() > 0.5;
  // if(!isFound) return;
  
  const itemsBuffer = window["itemsBufferRequest"].filter((ib: any) => ib.data.status.info != "expired");
  console.log("itemsBufferRequest: ", itemsBuffer)
  const randomIndex = Math.floor(Math.random() * (itemsBuffer.length - 1));
  const randomItemId = itemsBuffer[randomIndex].id;
  console.log("randomItemId", randomItemId);
  
  return randomItemId;
}

/** Переход к существующему SLA обращения*/
async function redirectSlaRequest(): Promise<void> {
  //TODO
  console.log("Переход к существующему SLA");
  await sleep(1000);
}

//Проверка существует ли такой sla задачи
async function checkSlaTask(slaData: AddTaskSlaArgs): Promise<string | undefined> {
  const {
    days,
    hours,
    minutes,
    startDate,
    type,
    endDate,
    signVip,
    taskType,
    taskSort,
    topic,
    urgency,
    product,
    executer,
  } = slaData;

  await sleep(1000);

  // const isFound = Math.random() > 0.5;
  // if(!isFound) return;
  
  const itemsBuffer = window["itemsBuffer"].filter((ib: any) => ib.data.status.info != "expired");
  console.log("itemsBuffer1: ", itemsBuffer)
  const randomIndex = Math.floor(Math.random() * (itemsBuffer.length - 1));
  const randomItemId = itemsBuffer[randomIndex].id;

  return randomItemId;
}

/** Переход к существующему SLA задачи*/
async function redirectSlaTask(): Promise<void> {
  //TODO
  console.log("Переход к существующему SLA");
  await sleep(1000);
}

export default {
  getSlaTask,
  getSlaRequest,

  getSLaTypes,
  getSLaTypesRequest,
  getSLaTypesTask,
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
  getDefaultSlaTypeRequest,
  getDefaultSlaTypeTask,
  updateSlaDataBuffer,
  getParentTaskTypeBySortCode,

  checkSlaRequest,
  redirectSlaRequest,
  checkSlaTask,
  redirectSlaTask,

  editSla
};
