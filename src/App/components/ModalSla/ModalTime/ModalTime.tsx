import React, { useState } from "react";
import { FieldConfig } from "../../../shared/types";
import CustomInput from "../../../../UIKit/CustomInput/CustomInput";

/** Поле ввода в модальном окне */
export default function ModalTime({
  label,
  days,
  setDays,
  hours,
  setHours,
  minutes,
  setMinutes,
  style,
  isRequired,
  isInvalid,
  disabled,
}: FieldConfig & {
  days?: string;
  setDays?: (value: string) => void;
  hours?: string;
  setHours?: (value: string) => void;
  minutes?: string;
  setMinutes?: (value: string) => void;
}) {
  return (
    <div className="modal-input__left">
      <span
        className={`modal-line-select__label ${
          isRequired ? "medpult-required" : ""
        }`}
      >
        {label}
      </span>
      <div style={{ display: "flex", gap: "4px" }}>
        <CustomInput
          value={days || ""}
          setValue={setDays || (() => {})}
          placeholder="00д"
          style={style}
          isInvalid={isInvalid}
          disabled={disabled}
        />
        <CustomInput
          value={hours || ""}
          setValue={setHours || (() => {})}
          placeholder="00ч"
          style={style}
          isInvalid={isInvalid}
          disabled={disabled}
        />
        <CustomInput
          value={minutes || ""}
          setValue={setMinutes || (() => {})}
          placeholder="00м"
          style={style}
          isInvalid={isInvalid}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
