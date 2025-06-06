import {
  SortData,
  FetchData,
  ListColumnData,
  ItemDataString,
  ItemData,
} from "../../../../UIKit/CustomList/CustomListTypes.ts";
/** Названия статусов SLA */
export enum SlaStatusNames {
  /** Действует */
  valid = "Действует",
  /** Планируется */
  planned = "Планируется",
  /** Истекло */
  expired = "Истекло",
  /** Аннулировано */
  canceled = "Аннулировано",
}

/** Статус SLA */
export enum SlaStatus {
  /** Действует */
  valid = "valid",
  /** Действует и есть запланированное */
  validPlanned = "validPlanned",
  /** Планируется */
  planned = "planned",
  /** Истекло */
  expired = "expired",
  /** Аннулировано */
  canceled = "canceled",
}

/** Значение строки Sla задачи */
export interface SlaRowDataTask {
  /** Идентификатор */
  id: ItemDataString;
  /** Является базовым */
  isBasic: ItemData<boolean>;
  /** Показатель (Тип SLA) */
  type: ItemData<string>;
  /**Условия */
  conditions: ItemDataString;
  /** Значение показателя */
  value: ItemDataString;
  /** Статус */
  status: ItemData<SlaStatus>;
  /** Дата начала  */
  startDate: ItemDataString;
  /** Дата окончания */
  endDate: ItemDataString;
  /** Тип задачи */
  taskType: ItemDataString;
  /** Вид задачи */
  taskSort: ItemDataString;
  /** Тематика */
  topic: ItemDataString;
  /** Срочность */
  urgency: ItemDataString;
  /** Признак ВИП */
  signVip: ItemDataString;
  /** Продукт */
  product: ItemDataString;
  /** Страхователь */
  executer: ItemDataString;
  /** Данные автора и редактора */
  creatorEditorData: ItemData<CreatorEditorData>;
}

/** Сгруппированное значение строки Sla задачи */
export interface SlaRowDataGroupTask extends SlaRowDataTask {
  /** Данные остальных SLA в группе */
  groupData: SlaRowDataTask[];
}

/** Значение строки Sla обращения*/
export interface SlaRowDataRequest {
  /** Идентификатор */
  id: ItemDataString;
  /** Является базовым */
  isBasic: ItemData<boolean>;
  /** Показатель (Тип SLA) */
  type: ItemData<string>;
  /**Условия */
  conditions: ItemDataString;
  /** Значение показателя */
  value: ItemDataString;
  /** Статус */
  status: ItemData<SlaStatus>;
  /** Дата начала  */
  startDate: ItemDataString;
  /** Дата окончания */
  endDate: ItemDataString;
  /** Тип канала */
  channelType: ItemDataString;
  /** Вид канала */
  channelSort: ItemDataString;
  /** Признак ВИП */
  signVip: ItemDataString;
  /** Данные автора и редактора */
  creatorEditorData: ItemData<CreatorEditorData>;
}

/** Сгруппированное значение строки Sla обращения */
export interface SlaRowDataGroupRequest extends SlaRowDataRequest {
  /** Данные остальных SLA в группе */
  groupData: SlaRowDataRequest[];
}

/** Данные создания и изменения элемента */
export type CreatorEditorData = {
  /** Дата создания в формате DD.MM.YYYY */
  createdAt: string;
  /** Автор */
  createdBy: string;
  /** Дата изменения в формате DD.MM.YYYY */
  updatedAt: string;
  /** Редактор */
  updatedBy: string;
};
