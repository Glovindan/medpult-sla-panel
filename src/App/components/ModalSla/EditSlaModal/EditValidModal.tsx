import React, { useEffect, useState } from "react";
import { FieldConfig, FieldType } from "../../../shared/types.ts";
import Scripts from "../../../shared/utils/clientScripts.ts";
import { parseDuration } from "../../../shared/utils/utils.ts";
import ModalTime from "../ModalType/ModalTime/ModalTime.tsx";
import ModalInputDate from "../ModalType/ModalInputDate/ModalInputDate.tsx";
import ModalLineSelect from "../ModalType/ModalLineSelect/ModalLineSelect.tsx";
import ModalWrapper from "../ModalWrapper/ModalWrapper.tsx";
import { ButtonType } from "../../../../UIKit/Button/ButtonTypes.ts";
import Button from "../../../../UIKit/Button/Button.tsx";
import { ItemData } from "../../../../UIKit/CustomList/CustomListTypes.ts";
import { SlaRowDataGroup } from "../../SlaPanel/SlaList/slaListTypes.ts";

interface EditValidModalProps {
  title: string;
  onClose: () => void;
  rowData: SlaRowDataGroup;
  onSwitchToEditBaseModal: () => void;
  onComplete: (endDate: string) => Promise<void>;
}
/** Модальное окно звонка */
export default function EditValidModal({
  title,
  onClose,
  rowData,
  onSwitchToEditBaseModal,
  onComplete,
}: EditValidModalProps) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isEndDateInvalid, setIsEndDateInvalid] = useState(false);
  const duration = parseDuration(rowData?.value?.value ?? "");
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
      style: { width: "74px" },
      days: duration.days + "д",
      hours: duration.hours + "ч",
      minutes: duration.minutes + "м",
      disabled: true,
    },
    {
      type: FieldType.input,
      label: "Дата начала",
      value: rowData.startDate?.value ?? "",
      style: { width: "202px" },
      disabled: true,
    },
    {
      type: FieldType.input,
      label: "Дата окончания",
      value: endDate,
      setValue: (value) => setEndDate(value as string),
      style: { width: "202px" },
      isInvalid: isEndDateInvalid,
    },
  ];

  /** Проверка на заполненость обязательных полей */
  const validateFieldsRequired = () => {
    let isValid = true;
    if (!endDate.trim()) {
      setIsEndDateInvalid(true);
      isValid = false;
    } else {
      setIsEndDateInvalid(false);
    }
    return isValid;
  };

  /** Завершить sla Задачи */
  const completelSlaHandler = async (): Promise<boolean> => {
    if (!validateFieldsRequired()) {
      setErrorMessage("Заполните обязательные поля");
      return false;
    }
    setErrorMessage("");
    // ... логика завершения
    await onComplete(endDate);
    onClose();
    return true;
  };

  /** Изменить sla Задачи */
  const savelSlaHandler = async () => {
    onSwitchToEditBaseModal();
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
              style={{ backgroundColor: "rgb(129, 229, 146)" }}
            >
              Дейтсвует
            </span>
          </div>
          {/* Поля ввода */}
          <div className="sla-modal__fields">
            <ModalLineSelect {...fields[0]} />
            <ModalTime {...fields[1]} />
            <ModalInputDate {...fields[2]} />
            <ModalInputDate
              {...fields[3]}
              startDate={rowData.startDate?.value}
            />
          </div>
          {/* Кнопки */}
          <div className="sla-modal__buttons">
            <Button
              title={"Завершить"}
              clickHandler={completelSlaHandler}
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
