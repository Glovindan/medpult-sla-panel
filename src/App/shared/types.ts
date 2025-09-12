import { CustomSelectOption } from "../../UIKit/CustomSelect/CustomSelectTypes";
/** Тип поля */
export enum FieldType {
  /** Поле ввода */
  input = "input",
  /** Текстовое поле */
  textarea = "textarea",
  /** Выпадающий список линий */
  lineDropdown = "lineDropdown",
}

export interface FieldConfig {
  type: FieldType;
  label: string;
  value: string | string[];
  setValue?: (value: string | string[]) => void;
  placeholder?: string;
  style?: React.CSSProperties;
  maskFunction?: (value: string) => string;
  days?: string;
  setDays?: (value: string) => void;
  hours?: string;
  setHours?: (value: string) => void;
  minutes?: string;
  setMinutes?: (value: string) => void;
  href?: string;
  saveStateHandler?: () => void;
  isRequired?: boolean;
  getDataHandler?: () => Promise<CustomSelectOption[]>;
  isMulti?: boolean;
  isInvalid?: boolean;
  disabled?: boolean;
  startDate?: string;
  onStartDateNotSet?: () => void;
}

/** Аргументы для добавления SLA */
export interface AddSlaArgs {
  /** Значение SLA дни */
  days: string;
  /** Значение SLA часы */
  hours: string;
  /** Значение SLA минуты */
  minutes: string;
  /** Дата начала */
  startDate: string;
  /** Дата окончания */
  endDate?: string;
  /** Тип SLA */
  type?: string;
}

/** Аргументы для обновления SLA */
export interface EditSlaArgs extends AddSlaArgs {
  /** Идентификатор SLA */
  id: string;
  /** Дата окончания действующего SLA */
  endDateActive?: string;
}

/** Аргументы для добавления SLA задачи */
export interface AddTaskSlaArgs extends AddSlaArgs {
  /** Признак важности */
  signVip?: string[];
  /** Тип задачи */
  taskType?: string[];
  /** Вид задачи */
  taskSort?: string[];
  /** Тематика задачи */
  topic?: string[];
  /** Срочность задачи */
  urgency?: string[];
  /** Продукт */
  product?: string;
  /** Страхователь */
  executer?: string;
}

/** Аргументы для добавления SLA обращения */
export interface AddRequestSlaArgs extends AddSlaArgs {
  /** Признак важности */
  signVip?: string[];
  /** Тип канала */
  channelType?: string[];
  /** Вид канала (Линия) */
  channelSort?: string[];
}