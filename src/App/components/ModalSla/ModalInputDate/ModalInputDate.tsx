import React, { useState } from "react";
import { FieldConfig } from "../../../shared/types";
import CustomInputDate from "../../../../UIKit/CustomInputDate/CustomInputDate";
import { InputDateType } from "../../../../UIKit/CustomInputDate/CustomInputDateTypes";
import masks from "../../../shared/utils/masks";

/** Поле ввода в модальном окне */
export default function ModalInputDate({
  label,
  value,
  setValue,
  style,
  isRequired,
  isInvalid,
  disabled,
}: FieldConfig) {
  return (
    <div className="modal-input__left">
      <span
        className={`modal-line-select__label ${
          isRequired ? "medpult-required" : ""
        }`}
      >
        {label}
      </span>
      <CustomInputDate
        type={InputDateType.date}
        value={typeof value === "string" ? masks.applyDateMask(value) : ""}
        setValue={(v: string) => setValue(v)}
        style={style}
        isInvalid={isInvalid}
        disabled={disabled}
      />
    </div>
  );
}
