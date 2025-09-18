import React, { useState } from "react";
import { FieldConfig } from "../../../../shared/types";
import CustomInput from "../../../../../UIKit/CustomInput/CustomInput";

/** Пропсы  */
interface ModalTimeInputProps {
  /** Количество дней */
  days: string;
  /** Изменить Количество дней */
  setDays?: (value: string) => void;
  /** Количество часов */
  hours: string;
  /** Изменить Количество часов */
  setHours?: (value: string) => void;
  /** Количество минут */
  minutes: string;
  /** Изменить Количество минут */
  setMinutes?: (value: string) => void;
  /** Является невалидным */
  isInvalid?: boolean;
  /** Только для чтения */
  disabled?: boolean;
  /** Стили окон ввода */
  style?: React.CSSProperties;
}

/** Поле ввода в модальном окне */
export default function ModalTimeInput({
  days,
  style,
  setDays,
  hours,
  setHours,
  minutes,
  setMinutes,
  isInvalid,
  disabled,
}: ModalTimeInputProps) {
  /** Применить маску ввода часов */
  function applyDaysMask(value: string) {
    const numberParse = parseInt(value);
    if (Number.isNaN(numberParse)) return "";

    return `${numberParse}`;
  }

  /** Применить маску ввода часов */
  function applyHoursMask(value: string) {
    const numberParse = parseInt(value);
    if (Number.isNaN(numberParse)) return "";

    //if (numberParse < 0) return `0`;
    //if (numberParse > 23) return `23`;

    return `${numberParse}`;
  }

  /** Применить маску ввода минут */
  function applyMinutesMask(value: string) {
    const numberParse = parseInt(value);
    if (Number.isNaN(numberParse)) return "";

    //if (numberParse < 0) return `0`;
    //if (numberParse > 59) return `59`;

    return `${numberParse}`;
  }

  const defaultHandler = () => {};

  return (
    <div className="modal-time-input">
      <CustomInput
        maskFunction={applyDaysMask}
        value={days}
        setValue={setDays ?? defaultHandler}
        placeholder="00д"
        style={style ?? { width: "72px" }}
        isInvalid={isInvalid}
        disabled={disabled}
      />
      <CustomInput
        maskFunction={applyHoursMask}
        value={hours}
        setValue={setHours ?? defaultHandler}
        placeholder="00ч"
        style={style ?? { width: "72px" }}
        isInvalid={isInvalid}
        disabled={disabled}
      />
      <CustomInput
        maskFunction={applyMinutesMask}
        value={minutes}
        setValue={setMinutes ?? defaultHandler}
        placeholder="00м"
        style={style ?? { width: "72px" }}
        isInvalid={isInvalid}
        disabled={disabled}
      />
    </div>
  );
}
