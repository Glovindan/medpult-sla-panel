import React, { useEffect, useState } from "react";
import { AddSlaArgs, FieldConfig, FieldType } from "../../../shared/types.ts";
import ModalSla from "../ModalSla.tsx";
import Scripts from "../../../shared/utils/clientScripts.ts";
import { parseDuration } from "../../../shared/utils/utils.ts";
import ModalTime from "../ModalType/ModalTime/ModalTime.tsx";
import ModalInputDate from "../ModalType/ModalInputDate/ModalInputDate.tsx";
import CustomSelectWithLabel from "../ModalType/ModalLineSelect/ModalLineSelect.tsx";
import ModalWrapper from "../ModalWrapper/ModalWrapper.tsx";
import { ButtonType } from "../../../../UIKit/Button/ButtonTypes.ts";
import Button from "../../../../UIKit/Button/Button.tsx";
import icons from "../../../shared/icons.tsx";
import { ItemData } from "../../../../UIKit/CustomList/CustomListTypes.ts";
import { SlaRowDataGroup } from "../../SlaPanel/SlaList/slaListTypes.ts";
import ModalLabledField from "../ModalType/ModalLabledField/modalLabledField.tsx";
import CustomSelect from "../../../../UIKit/CustomSelect/CustomSelect.tsx";
import ModalTimeInput from "../ModalType/ModalTimeInput/ModalTimeInput.tsx";

interface EditBaseModalProps {
  title: string;
  onClose: () => void;
  rowData: SlaRowDataGroup;
  onSave: (slaData: AddSlaArgs) => Promise<void>;
}
/** Модальное окно звонка */
export default function EditBaseModal({
  title,
  onClose,
  rowData,
  onSave,
}: EditBaseModalProps) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isTimeInvalid, setIsTimeInvalid] = useState(false);
  const [isStartDateInvalid, setIsStartDateInvalid] = useState(false);

  const duration = parseDuration(rowData?.value?.value ?? "");

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
      value: rowData.endDate?.value ?? "",
      style: { width: "202px" },
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

  /** Проверка что поле значение показателя не равно текущему */
  function validateDuration() {
    let isValid = true;
    if (
      Number(days) === Number(duration.days) &&
      Number(hours) === Number(duration.hours) &&
      Number(minutes) === Number(duration.minutes)
    ) {
      setIsTimeInvalid(true);
      isValid = false;
    } else {
      setIsTimeInvalid(false);
    }
    return isValid;
  }

  /** Сохранить sla Задачи */
  const savelSlaHandler = async (): Promise<boolean> => {
    if (!validateFieldsRequired()) {
      setErrorMessage("Заполните обязательные поля");
      return false;
    } else if (!validateSlaValue()) {
      setErrorMessage("Укажите корректно часы и минуты");
      return false;
    } else if (!validateDuration()) {
      setErrorMessage("Данное значение установлено в текущей версии");
      return false;
    }
    setErrorMessage("");
    // ... логика сохранения
    await onSave({days: days, hours: hours, minutes: minutes, startDate: startDate, endDate: endDate});
    onClose();
    return true;
  };

  return (
    <ModalWrapper>
      <div className="sla-modal">
        <div className="sla-modal__header">
          <span className="sla-modal__label">{title}</span>
        </div>
        <div className="sla-modal__content" style={{ width: "520px" }}>
          <div className="sla-modal__status">
            {icons.Star}
            <span
              className="sla-modal__status__span"
              style={{ backgroundColor: "rgb(129, 229, 146)" }}
            >
              Дейтсвует
            </span>
          </div>
          {/* Поля ввода */}
          <div
            className="sla-modal__fields"
            style={{ borderBottom: "1px solid #D2D3D6" }}
          >
            <ModalLabledField label={"Показатель"}>
              <CustomSelect
                value={rowData.type?.value ?? ""}
                getDataHandler={Scripts.getSLaTypes}
                setValue={() => {}}
                disabled={true}
              />
            </ModalLabledField>
            
            <ModalLabledField label={"Значение показателя"}>
              <ModalTimeInput
                days={duration.days + "д"} 
                hours={duration.hours + "ч"} 
                minutes={duration.minutes + "м"} 
                disabled = {true}
                style={{ width: "74px" }}
              />
            </ModalLabledField>
                        
            <ModalInputDate 
              label={"Дата начала"}
              value={rowData.startDate?.value ?? ""}
              style={{ width: "202px" }}
              disabled={true}
            />

            <ModalInputDate 
              label={"Дата окончания"}
              value={rowData.endDate?.value}
              style={{ width: "202px" }}
              disabled={true}
            />
          </div>
          <div className="sla-modal__status">
            <span
              className="sla-modal__status__span"
              style={{ backgroundColor: "rgb(209, 216, 220)" }}
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

            {/* <ModalTime {...fields[4]} />
            <ModalInputDate {...fields[5]} />
            <ModalInputDate
              {...fields[6]}
              startDate={startDate}
              onStartDateNotSet={() => {
                setIsStartDateInvalid(true);
                setErrorMessage("Установите дату начала");
              }}
            /> */}
            
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
              title={"Применить"}
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
