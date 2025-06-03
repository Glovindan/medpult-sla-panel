import { ItemData, ItemDataString } from "../../../UIKit/CustomList/CustomListTypes";
import { CreatorEditorData, SlaRowData, SlaStatus } from "../../components/SlaPanel/SlaList/slaListTypes";

// Вспомогательные утилиты
function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomDateISO(): string {
  const start = new Date(2023, 0, 1).getTime();
  const end = new Date(2025, 11, 31).getTime();
  const date = new Date(start + Math.random() * (end - start));
  return date.toISOString().split('T')[0];
}

function getRandomDateFormatted(): string {
  const date = new Date(getRandomDateISO());
  return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
}

function getRandomName(): string {
  const names = ['Alice', 'Bob', 'Charlie', 'Dana', 'Eve', 'Frank'];
  return getRandomElement(names);
}

// Генерация CreatorEditorData
function generateCreatorEditorData(): CreatorEditorData {
  return {
    createdAt: getRandomDateFormatted(),
    createdBy: getRandomName(),
    updatedAt: getRandomDateFormatted(),
    updatedBy: getRandomName()
  };
}

// Основной генератор SlaRowData
export function generateRandomSlaRowData(): SlaRowData {
  const slaTypes = [
    { value: "Время реакции", code: "RESPONSE_TIME" },
    { value: "Время решения", code: "RESOLUTION_TIME" },
    { value: "Доступность", code: "AVAILABILITY" },
  ];

  const selectedType = getRandomElement(slaTypes);

  return {
    id: new ItemDataString(`sla-${Math.floor(Math.random() * 10000)}`),
    isBasic: new ItemData({ value: Math.random() > 0.5 ? "true" : "false", info: Math.random() > 0.5 }),
    type: new ItemData({ value: selectedType.value, info: selectedType.code }),
    value: new ItemDataString(`${Math.floor(Math.random() * 72)}h`),
    status: new ItemData<SlaStatus>({
      value: "",
      info: getRandomElement(Object.values(SlaStatus))
    }),
    startDate: new ItemDataString(getRandomDateISO()),
    endDate: new ItemDataString(getRandomDateISO()),
    taskType: new ItemDataString(getRandomElement(["Incident", "Service Request", "Change"])),
    taskSort: new ItemDataString(getRandomElement(["Standard", "Emergency", "Normal"])),
    topic: new ItemDataString(getRandomElement(["Network", "Hardware", "Software", "Security"])),
    urgency: new ItemDataString(getRandomElement(["Low", "Medium", "High", "Critical"])),
    creatorEditorData: new ItemData<CreatorEditorData>({
      value: "", // поле `value` нужно, т.к. это наследник ItemData
      info: generateCreatorEditorData()
    })
  };
}

export function getRandomSlaList(length: number): SlaRowData[] {
    const items = Array.from({ length: length }).map(generateRandomSlaRowData);

    return items
}