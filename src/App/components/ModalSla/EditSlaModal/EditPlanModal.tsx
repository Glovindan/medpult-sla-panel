import React, { useEffect, useState } from "react";
import { AddSlaArgs, FieldConfig, FieldType } from "../../../shared/types.ts";
import Scripts from "../../../shared/utils/clientScripts.ts";
import ModalTime from "../ModalType/ModalTime/ModalTime.tsx";
import ModalInputDate from "../ModalType/ModalInputDate/ModalInputDate.tsx";
import CustomSelectWithLabel from "../ModalType/ModalLineSelect/ModalLineSelect.tsx";
import ModalWrapper from "../ModalWrapper/ModalWrapper.tsx";
import { ButtonType } from "../../../../UIKit/Button/ButtonTypes.ts";
import Button from "../../../../UIKit/Button/Button.tsx";
import { ItemData } from "../../../../UIKit/CustomList/CustomListTypes.ts";
import { SlaRowDataGroup } from "../../SlaPanel/SlaList/slaListTypes.ts";
import ModalLabledField from "../ModalType/ModalLabledField/modalLabledField.tsx";
import CustomSelect from "../../../../UIKit/CustomSelect/CustomSelect.tsx";
import ModalTimeInput from "../ModalType/ModalTimeInput/ModalTimeInput.tsx";

interface EditPlanModalProps {
  title: string;
  onClose: () => void;
  rowData: SlaRowDataGroup;
  onSave: (slaData: AddSlaArgs) => Promise<void>;
  onCancel: (id: string) => Promise<void>;
  /** Обработчик перезагрузки списка */
  onReload: () => Promise<void>;
}
/** Модальное окно звонка */
export default function EditPlanModal({
  title,
  onClose,
  rowData,
  onSave,
  onCancel,
  onReload,
}: EditPlanModalProps) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isTimeInvalid, setIsTimeInvalid] = useState(false);
  const [isStartDateInvalid, setIsStartDateInvalid] = useState(false);

  const [days, setDays] = useState<string>("");
  const [hours, setHours] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  //Очищаем дату окончания, если дата начала больше
  useEffect(() => {
    if (!startDate) return;

    const [day, month, year] = startDate.split(".");
    const startDateObj = new Date(`${year}-${month}-${day}`);
    startDateObj.setDate(startDateObj.getDate() + 1); // день после начала

    const endDateObj = endDate
      ? (() => {
          const [d, m, y] = endDate.split(".");
          return new Date(`${y}-${m}-${d}`);
        })()
      : null;

    if (endDateObj && endDateObj < startDateObj) {
      setEndDate(""); // очищаем дату окончания
    }
  }, [startDate, endDate]);

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
    await onSave({
      days: days,
      hours: hours,
      minutes: minutes,
      startDate: startDate,
      endDate: endDate,
    });
    onClose();
    return true;
  };

  /** Аннулировать sla Задачи */
  const cancelSlaHandler = async () => {
    // ... логика аннулирования
    await onCancel(rowData.id.value);
    onReload();
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
            <ModalLabledField label={"Показатель"}>
              <CustomSelect
                value={rowData.type?.value ?? ""}
                getDataHandler={Scripts.getSLaTypes}
                setValue={() => {}}
                disabled={true}
              />
            </ModalLabledField>
            <ModalLabledField label={"Значение показателя"} isRequired={true}>
              <ModalTimeInput
                days={days}
                setDays={setDays}
                hours={hours}
                setHours={setHours}
                minutes={minutes}
                setMinutes={setMinutes}
                isInvalid={isTimeInvalid}
              />
            </ModalLabledField>
            <ModalInputDate
              label={"Дата начала"}
              value={startDate}
              style={{ width: "202px" }}
              setValue={(value) => setStartDate(value as string)}
              isRequired={true}
              isInvalid={isStartDateInvalid}
            />

            <ModalInputDate
              label={"Дата окончания"}
              value={endDate}
              style={{ width: "202px" }}
              setValue={(value) => setEndDate(value as string)}
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
