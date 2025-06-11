import React, { useEffect, useState } from "react";
import { FieldConfig, FieldType } from "../../../shared/types.ts";
import Scripts from "../../../shared/utils/clientScripts.ts";
import ModalTime from "../ModalType/ModalTime/ModalTime.tsx";
import ModalInputDate from "../ModalType/ModalInputDate/ModalInputDate.tsx";
import ModalLineSelect from "../ModalType/ModalLineSelect/ModalLineSelect.tsx";
import ModalWrapper from "../ModalWrapper/ModalWrapper.tsx";
import { ButtonType } from "../../../../UIKit/Button/ButtonTypes.ts";
import Button from "../../../../UIKit/Button/Button.tsx";
import { ItemData } from "../../../../UIKit/CustomList/CustomListTypes.ts";
import { SlaRowDataGroup } from "../../SlaPanel/SlaList/slaListTypes.ts";

interface EditPlanModalProps {
  title: string;
  onClose: () => void;
  rowData: SlaRowDataGroup;
  onSave: (
    days: string,
    hours: string,
    minutes: string,
    startDate: string,
    endDate: string
  ) => Promise<void>;
  onCancel: () => Promise<void>;
}
/** Модальное окно звонка */
export default function EditPlanModal({
  title,
  onClose,
  rowData,
  onSave,
  onCancel,
}: EditPlanModalProps) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isTimeInvalid, setIsTimeInvalid] = useState(false);
  const [isStartDateInvalid, setIsStartDateInvalid] = useState(false);

  const [days, setDays] = useState<string>("");
  const [hours, setHours] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const fields: FieldConfig[] = [
    {
      type: FieldType.lineDropdown,
      label: "Показатель",
      value: rowData.type?.value ?? "",
      style: { width: "236px" },
      disabled: true,
    },
    {
      type: FieldType.input,
      label: "Значение показателя",
      value: "",
      setValue: () => {},
      style: { width: "72px" },
      days: days,
      setDays: setDays,
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
      value: startDate,
      setValue: (value) => setStartDate(value as string),
      style: { width: "202px" },
      isRequired: true,
      isInvalid: isStartDateInvalid,
    },
    {
      type: FieldType.input,
      label: "Дата окончания",
      value: endDate,
      setValue: (value) => setEndDate(value as string),
      style: { width: "202px" },
    },
  ];

  /** Проверка на заполненость обязательных полей */
  const validateFieldsRequired = () => {
    let isValid = true;
    if (!days.trim() && !hours.trim() && !minutes.trim()) {
      setIsTimeInvalid(true);
      isValid = false;
    } else {
      setIsTimeInvalid(false);
    }
    if (!startDate.trim()) {
      setIsStartDateInvalid(true);
      isValid = false;
    } else {
      setIsStartDateInvalid(false);
    }
    return isValid;
  };
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

  /** Изменить sla Задачи */
  const savelSlaHandler = async (): Promise<boolean> => {
    if (!validateFieldsRequired()) {
      setErrorMessage("Заполните обязательные поля");
      return false;
    } else if (!validateSlaValue()) {
      setErrorMessage("Укажите корректно часы и минуты");
      return false;
    }
    setErrorMessage("");
    // ... логика изменения
    await onSave(days, hours, minutes, startDate, endDate);
    onClose();
    return true;
  };

  /** Аннулировать sla Задачи */
  const cancelSlaHandler = async () => {
    // ... логика аннулирования
    await onCancel();
    onClose();
  };

  return (
    <ModalWrapper>
      <div className="sla-modal">
        <div className="sla-modal__header">
          <span className="sla-modal__label">{title}</span>
        </div>
        <div className="sla-modal__content" style={{ width: "520px" }}>
          <div className="sla-modal__status">
            <span
              className="sla-modal__status__span"
              style={{ backgroundColor: "rgb(231, 245, 182)" }}
            >
              Планируется
            </span>
          </div>
          {/* Поля ввода */}
          <div className="sla-modal__fields">
            <ModalLineSelect {...fields[0]} />
            <ModalTime {...fields[1]} />
            <ModalInputDate {...fields[2]} />
            <ModalInputDate
              {...fields[3]}
              startDate={startDate}
              onStartDateNotSet={() => {
                setIsStartDateInvalid(true);
                setErrorMessage("Установите дату начала");
              }}
            />
          </div>
          {/* Кнопки */}
          <div className="sla-modal__buttons">
            <Button
              title={"Аннулировать"}
              clickHandler={cancelSlaHandler}
              style={{ width: "100%", backgroundColor: "#FF4545" }}
            />
            <Button
              title={"Изменить"}
              clickHandler={savelSlaHandler}
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
