import React, { useState } from "react";
import { FieldConfig } from "../../../shared/types";
import CustomInput from "../../../../UIKit/CustomInput/CustomInput";
import CustomInputAppItem from "../../../../UIKit/CustomInputAppItem/CustomInputAppItem";

/** Поле ввода в модальном окне */
export default function ModalInputSearch({
  label,
  value,
  setValue,
  style,
  href,
  saveStateHandler = () => {},
}: FieldConfig) {
  return (
    <div className="modal-input__left">
      <span className="modal-input__label">{label}</span>
      <CustomInputAppItem
        value={typeof value === "string" ? value : ""}
        setValue={(v: string) => setValue(v)}
        href={href || ""}
        style={style}
        saveStateHandler={saveStateHandler}
      />
    </div>
  );
}
