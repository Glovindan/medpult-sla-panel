import moment from "moment";
import {
  ItemData,
  ItemDataString,
} from "../../../UIKit/CustomList/CustomListTypes";
import {
  CreatorEditorData,
  SlaRowData,
  SlaStatus,
} from "../../components/SlaPanel/SlaList/slaListTypes";

// Вспомогательные утилиты
function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomDateISO(): string {
  const start = new Date(2023, 0, 1).getTime();
  const end = new Date(2025, 11, 31).getTime();
  const date = new Date(start + Math.random() * (end - start));
  return moment(date).format("DD.MM.YYYY");
}

function getRandomDateFormatted(): string {
  return getRandomDateISO();
}

function getRandomName(): string {
  const names = ["Alice", "Bob", "Charlie", "Dana", "Eve", "Frank"];
  return getRandomElement(names);
}

// Генерация CreatorEditorData
function generateCreatorEditorData(): CreatorEditorData {
  return {
    createdAt: getRandomDateFormatted(),
    createdBy: getRandomName(),
    updatedAt: getRandomDateFormatted(),
    updatedBy: getRandomName(),
  };
}

export function formatDurationFromMinutes(totalMinutes: number): string {
  const days = Math.floor(totalMinutes / (24 * 60));
  const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
  const minutes = totalMinutes % 60;

  const dd = days.toString().padStart(2, "0");
  const hh = hours.toString().padStart(2, "0");
  const mm = minutes.toString().padStart(2, "0");

  return `${dd}д ${hh}ч ${mm}м`;
}

// Основной генератор SlaRowData задачи
export function generateRandomSlaRowDataTask(): SlaRowData {
  const slaTypes = [
    { value: "Время реакции", code: "RESPONSE_TIME" },
    { value: "Время решения", code: "RESOLUTION_TIME" },
    { value: "Доступность", code: "AVAILABILITY" },
  ];

  const selectedType = getRandomElement(slaTypes);

  return {
    id: new ItemDataString(`sla-${Math.floor(Math.random() * 10000)}`),
    isBasic: new ItemData({
      value: Math.random() > 0.5 ? "true" : "false",
      info: Math.random() > 0.5,
    }),
    type: new ItemData({ value: selectedType.value, info: selectedType.code }),
    conditions: new ItemDataString(
      getRandomElement([
        "Медицинское",
        " Медицинское СМП Экстренно",
        "Негативное",
      ])
    ),
    value: new ItemDataString(
      formatDurationFromMinutes(Math.floor(Math.random() * 4320))
    ),
    status: new ItemData<SlaStatus>({
      value: "",
      info: getRandomElement(Object.values(SlaStatus)),
    }),
    startDate: new ItemDataString(getRandomDateISO()),
    endDate: new ItemDataString(getRandomDateISO()),
    taskType: new ItemDataString(
      getRandomElement(["Медицинское", "Негативное", "Инфорамционное"])
    ),
    taskSort: new ItemDataString(
      getRandomElement(["СМП", "ПНД", "Согласование услуг"])
    ),
    topic: new ItemDataString(
      getRandomElement(["Network", "Hardware", "Software", "Security"])
    ),
    urgency: new ItemDataString(getRandomElement(["Планово", "Экстренно"])),
    signVip: new ItemDataString(
      getRandomElement(["Gold", "Silver", "Platinum", "Не ВИП"])
    ),
    product: new ItemDataString(
      getRandomElement(["Low", "Medium", "High", "Critical"])
    ),
    executer: new ItemDataString(
      getRandomElement(["Иванов Иван", "Петров Петр", "Сидоров Иван"])
    ),
    creatorEditorData: new ItemData<CreatorEditorData>({
      value: "", // поле `value` нужно, т.к. это наследник ItemData
      info: generateCreatorEditorData(),
    }),
  };
}

export function getRandomSlaListTask(length: number): SlaRowData[] {
  const items = Array.from({ length: length }).map(
    generateRandomSlaRowDataTask
  );
  return items;
}

// Основной генератор SlaRowData обращения
export function generateRandomSlaRowDataRequest(): SlaRowData {
  const slaTypes = [
    { value: "Время реакции", code: "RESPONSE_TIME" },
    { value: "Время решения", code: "RESOLUTION_TIME" },
    { value: "Доступность", code: "AVAILABILITY" },
  ];

  const selectedType = getRandomElement(slaTypes);

  return {
    id: new ItemDataString(`sla-${Math.floor(Math.random() * 10000)}`),
    isBasic: new ItemData({
      value: Math.random() > 0.5 ? "true" : "false",
      info: Math.random() > 0.5,
    }),
    type: new ItemData({ value: selectedType.value, info: selectedType.code }),
    conditions: new ItemDataString(
      getRandomElement([
        "Медицинское",
        " Медицинское СМП Экстренно",
        "Негативное",
      ])
    ),
    value: new ItemDataString(
      formatDurationFromMinutes(Math.floor(Math.random() * 4320))
    ),
    status: new ItemData<SlaStatus>({
      value: "",
      info: getRandomElement(Object.values(SlaStatus)),
    }),
    startDate: new ItemDataString(getRandomDateISO()),
    endDate: new ItemDataString(getRandomDateISO()),
    channelType: new ItemDataString(
      getRandomElement(["Телефон", "СМС", "Email"])
    ),
    channelSort: new ItemDataString(
      getRandomElement(["103@sberins.ru", "102@sberins.ru"])
    ),
    signVip: new ItemDataString(
      getRandomElement(["Gold", "Silver", "Platinum", "Не ВИП"])
    ),
    creatorEditorData: new ItemData<CreatorEditorData>({
      value: "", // поле `value` нужно, т.к. это наследник ItemData
      info: generateCreatorEditorData(),
    }),
  };
}

export function getRandomSlaListRequest(length: number): SlaRowData[] {
  const items = Array.from({ length: length }).map(
    generateRandomSlaRowDataRequest
  );
  return items;
}
