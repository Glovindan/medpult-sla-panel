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
  showStarIcon?: boolean;
}
/** Модальное окно звонка */
export default function EditBaseModal({
  title,
  onClose,
  rowData,
  onSave,
  showStarIcon,
}: EditBaseModalProps) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isTimeInvalid, setIsTimeInvalid] = useState(false);
  const [isEndDateActiveInvalid, setIsEndDateActiveInvalid] = useState(false);
  const [isStartDateInvalid, setIsStartDateInvalid] = useState(false);

  const duration = parseDuration(rowData?.value?.value ?? "");

  const [days, setDays] = useState<string>("");
  const [hours, setHours] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDateActive, setEndDateActive] = useState<string>("");
  const [endDatePlanned, setEndDatePlanned] = useState<string>("");

  // Инициализация даты окончания при открытии модалки
  useEffect(() => {
    setStartDate(rowData.startDate?.value ?? "");
    setEndDateActive(rowData.endDate?.value ?? "");
  }, [rowData]);

  // Обновляем дату начала при выборе даты окончания
  useEffect(() => {
    if (!endDateActive) {
      setStartDate("");
      return;
    }

    const [day, month, year] = endDateActive.split(".");
    const newEnd = new Date(+year, +month - 1, +day);

    if (!isNaN(newEnd.getTime())) {
      const nextDay = new Date(newEnd);
      nextDay.setDate(newEnd.getDate() + 1);

      const formatted =
        String(nextDay.getDate()).padStart(2, "0") +
        "." +
        String(nextDay.getMonth() + 1).padStart(2, "0") +
        "." +
        nextDay.getFullYear();

      setStartDate(formatted);
    }
  }, [endDateActive]);

  /** Сбрасываем дату окончания, если дата начала больше */
  useEffect(() => {
    if (!startDate || !endDatePlanned) return;

    const [startDay, startMonth, startYear] = startDate.split(".");
    const [endDay, endMonth, endYear] = endDatePlanned.split(".");

    const start = new Date(+startYear, +startMonth - 1, +startDay);
    const end = new Date(+endYear, +endMonth - 1, +endDay);

    if (start >= end) {
      setEndDatePlanned("");
    }
  }, [startDate, endDatePlanned]);

  /** Проверка на заполненость обязательных полей */
  const validateFieldsRequired = () => {
    let isValid = true;
    if (!days.trim() && !hours.trim() && !minutes.trim()) {
      setIsTimeInvalid(true);
      isValid = false;
    } else {
      setIsTimeInvalid(false);
    }

    if (!endDateActive.trim()) {
      setIsEndDateActiveInvalid(true);
      isValid = false;
    } else {
      setIsEndDateActiveInvalid(false);
    }

    if (!startDate) {
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
    await onSave({
      days: days,
      hours: hours,
      minutes: minutes,
      startDate: startDate,
      endDate: endDatePlanned,
    });
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
            {showStarIcon && icons.Star}
            <span
              className="sla-modal__status__span"
              style={{ backgroundColor: "rgb(129, 229, 146)" }}
            >
              Действует
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
                disabled={true}
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
              value={endDateActive}
              setValue={(value) => setEndDateActive(value as string)}
              style={{ width: "202px" }}
              startDate={rowData.startDate?.value}
              isInvalid={isEndDateActiveInvalid}
              isRequired={true}
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
              disabled={true}
              isRequired={true}
              isInvalid={isStartDateInvalid}
            />

            <ModalInputDate
              label={"Дата окончания"}
              value={endDatePlanned}
              setValue={(value) => setEndDatePlanned(value as string)}
              style={{ width: "202px" }}
              startDate={startDate}
              onStartDateNotSet={() => {
                setErrorMessage("Установите дату окончания действующего SLA");
                setIsEndDateActiveInvalid(true);
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
