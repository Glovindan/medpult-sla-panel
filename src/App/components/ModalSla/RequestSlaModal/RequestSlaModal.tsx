import React, { useEffect, useState } from "react";
import { FieldConfig, FieldType } from "../../../shared/types";
import ModalSla from "../ModalSla";
import Scripts from "../../../shared/utils/clientScripts";
import ModalTime from "../ModalTime/ModalTime";
import ModalInputDate from "../ModalInputDate/ModalInputDate";
import ModalLineSelect from "../ModalLineSelect/ModalLineSelect";
import ModalWrapper from "../ModalWrapper/ModalWrapper";

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

  const [type, setType] = useState<string>("Скорость обработки");
  const [days, setDays] = useState<string>("");
  const [hours, setHours] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [signVip, setSignVip] = useState<string[]>([]);
  const [channelType, setChannelType] = useState<string[]>([]);
  const [channelSort, setChannelSort] = useState<string[]>([]);

  const fields: FieldConfig[] = [
    {
      type: FieldType.lineDropdown,
      label: "Показатель",
      value: type,
      setValue: (value) => setType(value as string),
      style: { width: "236px" },
      isRequired: true,
      getDataHandler: Scripts.getSLaTypes,
      isInvalid: isTypeInvalid,
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
    {
      type: FieldType.input,
      label: "Признак ВИП",
      value: signVip,
      setValue: (value) => setSignVip(Array.isArray(value) ? value : [value]),
      style: { width: "236px" },
      getDataHandler: Scripts.getVipStatuses,
      isMulti: true,
      isInvalid: isSignVipInvalid,
    },
    {
      type: FieldType.input,
      label: "Тип канала",
      value: channelType,
      setValue: (value) =>
        setChannelType(Array.isArray(value) ? value : [value]),
      style: { width: "236px" },
      getDataHandler: Scripts.getTypeChannel,
      isMulti: true,
      isInvalid: isChannelTypeInvalid,
    },
    {
      type: FieldType.input,
      label: "Вид канала",
      value: channelSort,
      setValue: (value) =>
        setChannelSort(Array.isArray(value) ? value : [value]),
      style: { width: "236px" },
      getDataHandler: Scripts.getSortChannel,
      isMulti: true,
      isInvalid: isChannelSortInvalid,
    },
  ];

  /** Проверка на заполненость обязательных полей */
  const validateFieldsRequired = () => {
    let isValid = true;
    if (!type.trim()) {
      setIsTypeInvalid(true);
      isValid = false;
    } else {
      setIsTypeInvalid(false);
    }
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
  const savelSlaHandler = async (): Promise<boolean> => {
    if (!validateFieldsRequired()) {
      setErrorMessage("Заполните обязательные поля");
      return false;
    } else if (!validateSlaValue()) {
      setErrorMessage("Укажите корректно часы и минуты");
      return false;
    } else if (!validateFields()) {
      setErrorMessage("Укажите хотя бы один из критериев");
      return false;
    }
    setErrorMessage("");
    // ... логика сохранения
    return true;
  };

  return (
    <ModalWrapper>
      <ModalSla
        title="SLA на обращение"
        saveHandler={savelSlaHandler}
        closeModal={onClose}
        errorMessage={errorMessage}
      >
        <ModalLineSelect {...fields[0]} />
        <ModalTime {...fields[1]} />
        <ModalInputDate {...fields[2]} />
        <ModalInputDate {...fields[3]} />
        <ModalLineSelect {...fields[4]} />
        <ModalLineSelect {...fields[5]} />
        <ModalLineSelect {...fields[6]} />
      </ModalSla>
    </ModalWrapper>
  );
}
