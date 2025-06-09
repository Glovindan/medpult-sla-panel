import React, { useEffect, useState } from "react";
import { FieldConfig, FieldType } from "../../../shared/types";
import ModalSla from "../ModalSla";
import Scripts from "../../../shared/utils/clientScripts";
import ModalTime from "../ModalTime/ModalTime";
import ModalInputDate from "../ModalInputDate/ModalInputDate";
import ModalLineSelect from "../ModalLineSelect/ModalLineSelect";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import { ButtonType } from "../../../../UIKit/Button/ButtonTypes";
import Button from "../../../../UIKit/Button/Button";

interface EditBaseModalProps {
  onClose: () => void;
}
/** Модальное окно звонка */
export default function EditBaseModal({ onClose }: EditBaseModalProps) {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [isTimeInvalid, setIsTimeInvalid] = useState(false);
  const [isStartDateInvalid, setIsStartDateInvalid] = useState(false);

  const [type, setType] = useState<string>("Скорость решения");
  const [days, setDays] = useState<string>("");
  const [hours, setHours] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [days1, setDays1] = useState<string>("");
  const [hours1, setHours1] = useState<string>("");
  const [minutes1, setMinutes1] = useState<string>("");
  const [startDate1, setStartDate1] = useState<string>("");
  const [endDate1, setEndDate1] = useState<string>("");

  const fields: FieldConfig[] = [
    {
      type: FieldType.lineDropdown,
      label: "Показатель",
      value: type,
      setValue: (value) => setType(value as string),
      style: { width: "236px" },
      disabled: true,
    },
    {
      type: FieldType.input,
      label: "Значение показателя",
      value: "",
      setValue: () => {},
      style: { width: "74px" },
      days: days,
      setDays: setDays,
      hours: hours,
      setHours: setHours,
      minutes: minutes,
      setMinutes: setMinutes,
      disabled: true,
    },
    {
      type: FieldType.input,
      label: "Дата начала",
      value: startDate,
      setValue: (value) => setStartDate(value as string),
      style: { width: "202px" },
      disabled: true,
    },
    {
      type: FieldType.input,
      label: "Дата окончания",
      value: endDate,
      setValue: (value) => setEndDate(value as string),
      style: { width: "202px" },
      disabled: true,
    },

    {
      type: FieldType.input,
      label: "Значение показателя",
      value: "",
      setValue: () => {},
      style: { width: "72px" },
      days: days1,
      setDays: setDays1,
      hours: hours,
      setHours: setHours,
      minutes: minutes,
      setMinutes: setMinutes,
      isRequired: true,
      isInvalid: isTimeInvalid,
    },
    {
      type: FieldType.input,
      label: "Дата начала",
      value: startDate1,
      setValue: (value) => setStartDate1(value as string),
      style: { width: "202px" },
      isRequired: true,
      isInvalid: isStartDateInvalid,
    },
    {
      type: FieldType.input,
      label: "Дата окончания",
      value: endDate1,
      setValue: (value) => setEndDate1(value as string),
      style: { width: "202px" },
    },
  ];

  /** Проверка на поле значение показателя */
  const validateSlaValue = () => {
    let isValid = true;
    if (
      (hours.trim() && hours && parseInt(hours) > 24) ||
      (minutes.trim() && minutes && parseInt(minutes) > 60)
    ) {
      setIsTimeInvalid(true);
      isValid = false;
    } else {
      setIsTimeInvalid(false);
    }
    return isValid;
  };

  /** Сохранить sla Задачи */
  const savelSlaHandler = async (): Promise<boolean> => {
    if (!validateSlaValue()) {
      setErrorMessage("Укажите корректно часы и минуты");
      return false;
    }
    setErrorMessage("");
    // ... логика сохранения
    return true;
  };

  return (
    <ModalWrapper>
      <div className="sla-modal">
        <div className="sla-modal__header">
          <span className="sla-modal__label">SLA на задачу</span>
        </div>
        <div className="sla-modal__content" style={{ width: "520px" }}>
          {/* Поля ввода */}
          <div className="sla-modal__fields">
            <ModalLineSelect {...fields[0]} />
            <ModalTime {...fields[1]} />
            <ModalInputDate {...fields[2]} />
            <ModalInputDate {...fields[3]} />

            <ModalLineSelect {...fields[0]} />
            <ModalTime {...fields[4]} />
            <ModalInputDate {...fields[5]} />
            <ModalInputDate {...fields[6]} />
          </div>
          {/* Кнопки */}
          <div className="sla-modal__buttons">
            <Button
              title={"Применить"}
              clickHandler={""}
              style={{ width: "100%" }}
            />
            <Button
              title={"Отменить"}
              buttonType={ButtonType.outline}
              clickHandler={onClose}
              style={{ width: "100%" }}
            />
          </div>
          {errorMessage && (
            <div className="sla-modal__error">{errorMessage}</div>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
}
