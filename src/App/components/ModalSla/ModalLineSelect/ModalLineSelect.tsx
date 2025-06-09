import React, { useEffect, useState } from "react";
import { FieldConfig, FieldType } from "../../../shared/types";
import CustomSelect from "../../../../UIKit/CustomSelect/CustomSelect";
import { CustomSelectOption } from "../../../../UIKit/CustomSelect/CustomSelectTypes";
import Scripts from "../../../shared/utils/clientScripts";

/** Выпадающий список выбора Линии */
export default function ModalLineSelect({
  label,
  value,
  setValue,
  placeholder,
  style,
  maskFunction,
  isRequired,
  getDataHandler,
  isMulti,
  isInvalid,
  disabled,
}: FieldConfig) {
  const defaultHandler = async (): Promise<CustomSelectOption[]> => {
    return [];
  };

  return (
    <div className="modal-line-select__left">
      <span
        className={`modal-line-select__label ${
          isRequired ? "medpult-required" : ""
        }`}
      >
        {label}
      </span>
      <div className="modal-line-select__select">
        <CustomSelect
          value={value}
          setValue={setValue}
          placeholder={placeholder}
          maskFunction={maskFunction}
          getDataHandler={getDataHandler || defaultHandler}
          isMulti={isMulti}
          isInvalid={isInvalid}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
