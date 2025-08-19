import React, { useState } from "react";
import CustomInputDate from "../../../../../UIKit/CustomInputDate/CustomInputDate";
import { InputDateType } from "../../../../../UIKit/CustomInputDate/CustomInputDateTypes";
import masks from "../../../../shared/utils/masks";
import ModalLabledField from "../ModalLabledField/modalLabledField";

export type ModalInputDateProps = {
  label: string;
  value: string;
  setValue?: (value: string) => void;
  style?: React.CSSProperties;
  isRequired?: boolean;
  isInvalid?: boolean;
  disabled?: boolean;
  startDate?: string;
  onStartDateNotSet?: () => void;
  minDate?: string;
};

/** Поле ввода даты в модальном окне */
export default function ModalInputDate({
  label,
  value,
  setValue = () => {},
  style,
  isRequired,
  isInvalid,
  disabled,
  startDate,
  onStartDateNotSet,
  minDate,
}: ModalInputDateProps) {
  return (
    // TODO: Вынести логику с датами из CustomInputDate и затем вынести ModalLabledField
    <ModalLabledField label={label} isRequired={isRequired}>
      <CustomInputDate
        type={InputDateType.date}
        value={typeof value === "string" ? masks.applyDateMask(value) : ""}
        setValue={(v: string) => setValue(v)}
        style={style}
        isInvalid={isInvalid}
        disabled={disabled}
        startDate={startDate}
        onStartDateNotSet={onStartDateNotSet}
        label={label}
        minDate={minDate}
      />
    </ModalLabledField>
  );
}
