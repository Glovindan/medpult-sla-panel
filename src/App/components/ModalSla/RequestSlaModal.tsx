import React, { useEffect, useState } from "react";
import { FieldConfig, FieldType } from "../../shared/types";
import ModalSla from "./ModalSla";
import Scripts from "../../shared/utils/clientScripts";
import ModalTime from "./ModalType/ModalTime/ModalTime";
import ModalInputDate from "./ModalType/ModalInputDate/ModalInputDate";
import CustomSelectWithLabel from "./ModalType/ModalLineSelect/ModalLineSelect";
import ModalWrapper from "./ModalWrapper/ModalWrapper";
import ModalLabledField from "./ModalType/ModalLabledField/modalLabledField";
import CustomSelect from "../../../UIKit/CustomSelect/CustomSelect";
import { ObjectItem } from "../../../UIKit/Filters/FiltersTypes";
import ModalTimeInput from "./ModalType/ModalTimeInput/ModalTimeInput";
import CustomInputDate from "../../../UIKit/CustomInputDate/CustomInputDate";
import { InputDateType } from "../../../UIKit/CustomInputDate/CustomInputDateTypes";
import masks from "../../shared/utils/masks";
import ModalMultipleCustomSelect from "./ModalType/ModalMultipleCustomSelect/ModalMultipleCustomSelect";

interface RequestSlaModalProps {
  onClose: () => void;
}

/** Модальное окно звонка */
export default function RequestSlaModal({ onClose }: RequestSlaModalProps) {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [isTypeInvalid, setIsTypeInvalid] = useState(false);
  const [isTimeInvalid, setIsTimeInvalid] = useState(false);
  const [isStartDateInvalid, setIsStartDateInvalid] = useState(false);

  const [isSignVipInvalid, setIsSignVipInvalid] = useState(false);
  const [isChannelTypeInvalid, setIsChannelTypeInvalid] = useState(false);
  const [isChannelSortInvalid, setIsChannelSortInvalid] = useState(false);

  // const [type, setType] = useState<string>("Скорость обработки");
  // Показатель
  const [type, setType] = useState<ObjectItem>(Scripts.getDefaultSlaType()); // TODO: Реализовать функцию получения стандартной категории

  // Значение показателя дни
  const [days, setDays] = useState<string>("");
  // Значение показателя часы
  const [hours, setHours] = useState<string>("");
  // Значение показателя минуты
  const [minutes, setMinutes] = useState<string>("");
  // Дата начала действия
  const [startDate, setStartDate] = useState<string>("");
  // Дата окончания действия
  const [endDate, setEndDate] = useState<string>("");

  // Признак важности
  const [signVip, setSignVip] = useState<ObjectItem[]>([]);
  // Тип канала
  const [channelType, setChannelType] = useState<ObjectItem[]>([]);
  // Вид канала (Линии)
  const [channelSort, setChannelSort] = useState<ObjectItem[]>([]);

  /** Проверка на заполненость обязательных полей */
  const validateFieldsRequired = () => {
    let isValid = true;

    // Валидация Типа показателя
    if (!type.code) {
      setIsTypeInvalid(true);
      isValid = false;
    } else {
      setIsTypeInvalid(false);
    }
    
    // Валидация Значения показателя
    if (!days.trim() && !hours.trim() && !minutes.trim()) {
      setIsTimeInvalid(true);
      isValid = false;
    } else {
      setIsTimeInvalid(false);
    }

    // Валидация Даты начала
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

  /** Проверка на заполненость хотя бы одного поля */
  const validateFields = () => {
    let isValid = true;

    if (
      signVip.length === 0 &&
      channelType.length === 0 &&
      channelSort.length === 0
    ) {
      setIsSignVipInvalid(true);
      setIsChannelTypeInvalid(true);
      setIsChannelSortInvalid(true);
      isValid = false;
    } else {
      setIsSignVipInvalid(false);
      setIsChannelTypeInvalid(false);
      setIsChannelSortInvalid(false);
    }

    return isValid;
  };

  /** Сохранить sla Задачи */
  const saveSlaHandler = async (): Promise<boolean> => {
    if (!validateFieldsRequired()) {
      setErrorMessage("Заполните обязательные поля");
      return false;
    } 
    
    if (!validateSlaValue()) {
      setErrorMessage("Укажите корректно часы и минуты");
      return false;
    } 
    
    if (!validateFields()) {
      setErrorMessage("Укажите хотя бы один из критериев");
      return false;
    }
    setErrorMessage("");
    
    await Scripts.addSlaRequest({
      days: days,
      hours: hours,
      minutes: minutes,
      startDate: startDate,
      endDate: endDate,
      type: type.code,
      signVip: signVip.map(item => item.code),
      channelType: channelType.map(item => item.code),
      channelSort: channelSort.map(item => item.code)
    });

    return true;
  };
  return (
    <ModalWrapper>
      <ModalSla
        title="SLA на обращение"
        saveHandler={saveSlaHandler}
        closeModal={onClose}
        errorMessage={errorMessage}
      >
        <ModalLabledField label={"Показатель"} isRequired={true}>
          <CustomSelect
            value={type.value}
            setValue={(value, code) => setType({value: value, code: code ?? ""})}
            getDataHandler={Scripts.getSLaTypes}
            isInvalid={isTypeInvalid}
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
            isInvalid = {isTimeInvalid}
          />
        </ModalLabledField>

        <ModalInputDate 
          label={"Дата начала"}
          value={startDate}
          setValue={(value) => setStartDate(value)}
          style={{ width: "202px" }}
          isRequired={true}
          isInvalid={isStartDateInvalid}
        />

        <ModalInputDate
          label={"Дата окончания"}
          value={endDate}
          setValue={(value) => setEndDate(value)}
          style={{ width: "202px" }}
          startDate={startDate}
          onStartDateNotSet={() => {
            setIsStartDateInvalid(true);
            setErrorMessage("Установите дату начала");
          }}
        />
        
        <ModalLabledField label={"Признак ВИП"}>
          <ModalMultipleCustomSelect
            values={signVip}
            setValues={setSignVip}
            getDataHandler={Scripts.getVipStatuses}
            isInvalid={isSignVipInvalid}
          />
        </ModalLabledField>

        <ModalLabledField label={"Тип канала"}>
          <ModalMultipleCustomSelect
            values={channelType}
            setValues={setChannelType}
            getDataHandler={Scripts.getTypeChannel}
            isInvalid={isChannelTypeInvalid}
          />
        </ModalLabledField>
          
        <ModalLabledField label={"Вид канала"}>
          <ModalMultipleCustomSelect
            values={channelSort}
            setValues={setChannelSort}
            getDataHandler={Scripts.getSortChannel}
            isInvalid={isChannelSortInvalid}
          />
        </ModalLabledField>
      </ModalSla>
    </ModalWrapper>
  );
}
