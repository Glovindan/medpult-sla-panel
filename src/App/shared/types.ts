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
  setValue: (value: string | string[]) => void;
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
}
