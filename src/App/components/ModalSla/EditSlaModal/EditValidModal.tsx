import React, { useEffect, useState } from "react";
import { FieldConfig, FieldType } from "../../../shared/types.ts";
import Scripts from "../../../shared/utils/clientScripts.ts";
import { parseDuration } from "../../../shared/utils/utils.ts";
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

  /** Мин дата окончания - завтра */
  function getMinEndDate(startDateStr?: string): string {
    const today = new Date();
    today.setDate(today.getDate() + 1); // завтра
    let tomorrowDate = today;

    if (startDateStr) {
      const [day, month, year] = startDateStr.split(".");
      const startDate = new Date(`${year}-${month}-${day}`);
      startDate.setDate(startDate.getDate() + 1);

      if (startDate > tomorrowDate) {
        tomorrowDate = startDate;
      }
    }

    const yyyy = tomorrowDate.getFullYear();
    const mm = String(tomorrowDate.getMonth() + 1).padStart(2, "0");
    const dd = String(tomorrowDate.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;
  }

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
              Дейcтвует
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
              value={endDate}
              startDate={rowData.startDate?.value}
              setValue={(value) => setEndDate(value as string)}
              style={{ width: "202px" }}
              isInvalid={isEndDateInvalid}
              minDate={getMinEndDate(rowData.startDate?.value)}
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
