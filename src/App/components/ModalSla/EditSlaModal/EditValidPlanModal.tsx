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
import { SlaRowDataGroup, SlaStatus } from "../../SlaPanel/SlaList/slaListTypes.ts";
import ModalLabledField from "../ModalType/ModalLabledField/modalLabledField.tsx";
import CustomSelect from "../../../../UIKit/CustomSelect/CustomSelect.tsx";
import ModalTimeInput from "../ModalType/ModalTimeInput/ModalTimeInput.tsx";

interface EditValidPlanModalProps {
  title: string;
  onClose: () => void;
  rowData: SlaRowDataGroup;
  onComplete: (endDate: string, id: string, plannedIds?:  string[]) => Promise<void>;
  onSwitchToEditBaseModal: () => void;
  /** Обработчик перезагрузки списка */
  onReload: () => Promise<void>;
}
/** Модальное окно звонка */
export default function EditValidPlanModal({
  title,
  onClose,
  rowData,
  onComplete,
  onSwitchToEditBaseModal,
  onReload
}: EditValidPlanModalProps) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isEndDateActiveInvalid, setIsEndDateActiveInvalid] = useState(false);

  const duration = parseDuration(rowData?.value?.value ?? "");

  const [startDate, setStartDate] = useState<string>("");
  const [endDateActive, setEndDateActive] = useState<string>("");

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

  /** Проверка на заполненость обязательных полей */
  const validateFieldsRequired = () => {
    let isValid = true;
    if (!endDateActive.trim()) {
      setIsEndDateActiveInvalid(true);
      isValid = false;
    } else {
      setIsEndDateActiveInvalid(false);
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
    
    // Список SLA в статусе планируется
    const plannedSubSlaList = rowData.groupData?.filter(sla => sla.status.info == SlaStatus.planned);
    const plannedIds = plannedSubSlaList?.map(sla => sla.id.value);

    await onComplete(endDateActive, rowData.id.value, plannedIds);
    onClose();
    onReload();
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
              isRequired={true}
              startDate={rowData.startDate?.value}
              isInvalid={isEndDateActiveInvalid}
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
                days={duration.days + "д"}
                hours={duration.hours + "ч"}
                minutes={duration.minutes + "м"}
                disabled={true}
                style={{ width: "74px" }}
              />
            </ModalLabledField>

            <ModalInputDate
              label={"Дата начала"}
              value={startDate}
              style={{ width: "202px" }}
              disabled={true}
              isRequired={true}
            />

            <ModalInputDate
              label={"Дата окончания"}
              value={""}
              style={{ width: "202px" }}
              disabled={true}
            />
          </div>
          {/* Предупреждение */}
          <div className="sla-modal__warning">
            При нажатии кнопки “Завершить” планируемое SLA аннулируется
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
              clickHandler={onSwitchToEditBaseModal}
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
