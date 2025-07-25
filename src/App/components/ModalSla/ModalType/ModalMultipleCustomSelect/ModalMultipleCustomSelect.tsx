import React from "react";
import CustomSelect from "../../../../../UIKit/CustomSelect/CustomSelect";
import Scripts from "../../../../shared/utils/clientScripts";
import { ObjectItem } from "../../../../../UIKit/Filters/FiltersTypes";
import { CustomSelectOption } from "../../../../../UIKit/CustomSelect/CustomSelectTypes";

export type ModalMultipleCustomSelectProps = {
  /** Значения */
  values: ObjectItem[]
  /** Изменить Значения */
  setValues: React.Dispatch<React.SetStateAction<ObjectItem[]>>
  /** Является не валидным */
  isInvalid: boolean
  /** Функция получения значений выпадающего списка */
  getDataHandler: () => Promise<CustomSelectOption[]>;
}

/** Выпадающий список с множественным выбором */
export default function ModalMultipleCustomSelect({
  values,
  setValues,
  isInvalid,
  getDataHandler
}: ModalMultipleCustomSelectProps) {

  /** Получить строку со всеми выбранными значениями */
  function getValuesString(values: ObjectItem[]) {
    return values.map(value => value.value).join(", ");
  }

  /** Обновить выбранные значения */
  function updateValues(value: string, code?: string) {
    if(!code) throw new Error("Не указан код значения");

    // Если значение с таким кодом есть - убрать
    if(values.find(value => value.code == code)) {
      setValues(values.filter(value => value.code != code));
      return;
    }

    // Иначе - добавить новое значение
    setValues([...values, {value: value, code: code}]);
  }

  return (
    <CustomSelect
      value={getValuesString(values)}
      setValue={updateValues}
      getDataHandler={getDataHandler}
      isInvalid={isInvalid}
    />
  );
}
