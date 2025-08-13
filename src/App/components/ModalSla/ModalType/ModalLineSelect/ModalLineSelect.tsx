import React, { useEffect, useState } from "react";
import { FieldConfig, FieldType } from "../../../../shared/types";
import CustomSelect from "../../../../../UIKit/CustomSelect/CustomSelect";
import { CustomSelectOption } from "../../../../../UIKit/CustomSelect/CustomSelectTypes";
import Scripts from "../../../../shared/utils/clientScripts";

export type ModalLineSelectProps = {
  label: string;
  value: string | string[];
  setValue?: (value: string | string[]) => void;
  placeholder?: string;
  maskFunction?: (value: string) => string;
  isRequired?: boolean;
  getDataHandler?: () => Promise<CustomSelectOption[]>;
  isMulti?: boolean;
  isInvalid?: boolean;
  disabled?: boolean;
}

/** Выпадающий список с названием */
export default function CustomSelectWithLabel({
  label,
  value,
  setValue = () => {},
  placeholder,
  maskFunction,
  isRequired,
  getDataHandler,
  isMulti,
  isInvalid,
  disabled,
}: ModalLineSelectProps) {
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
          // isMulti={isMulti}
          isInvalid={isInvalid}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
