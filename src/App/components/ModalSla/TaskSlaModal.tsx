import React, { useEffect, useState } from "react";
import { FieldConfig, FieldType } from "../../shared/types";
import ModalSla from "./ModalSla";
import Scripts from "../../shared/utils/clientScripts";
import ModalInput from "./ModalType/ModalInputSearch/ModalInputSearch";
import ModalTime from "./ModalType/ModalTime/ModalTime";
import ModalInputDate from "./ModalType/ModalInputDate/ModalInputDate";
import CustomSelectWithLabel from "./ModalType/ModalLineSelect/ModalLineSelect";
import ModalWrapper from "./ModalWrapper/ModalWrapper";

interface TaskSlaModalProps {
  onClose: () => void;
}

/** Модальное окно звонка */
export default function TaskSlaModal({ onClose }: TaskSlaModalProps) {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [isTypeInvalid, setIsTypeInvalid] = useState(false);
  const [isTimeInvalid, setIsTimeInvalid] = useState(false);
  const [isStartDateInvalid, setIsStartDateInvalid] = useState(false);

  const [isSignVipInvalid, setIsSignVipInvalid] = useState(false);
  const [isTaskTypeInvalid, setIsTaskTypeInvalid] = useState(false);
  const [isTaskSortInvalid, setIsTaskSortInvalid] = useState(false);
  const [isTopicInvalid, setIsTopicInvalid] = useState(false);
  const [isUrgencyInvalid, setIsSUrgencyInvalid] = useState(false);

  const [type, setType] = useState<string>("Скорость решения");
  const [days, setDays] = useState<string>("");
  const [hours, setHours] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  
  const [signVip, setSignVip] = useState<string[]>([]);
  const [taskType, setTaskType] = useState<string[]>([]);
  const [taskSort, setTaskSort] = useState<string[]>([]);
  const [topic, setTopic] = useState<string[]>([]);
  const [urgency, setUrgency] = useState<string[]>([]);
  const [product, setProduct] = useState<string>("");
  const [executer, setExecuter] = useState<string>("");

  /** Сохранение состояния формы */
  const saveStateHandler = () => {};

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
      label: "Тип задачи",
      value: taskType,
      setValue: (value) => setTaskType(Array.isArray(value) ? value : [value]),
      style: { width: "236px" },
      getDataHandler: Scripts.getTaskTypes,
      isMulti: true,
      isInvalid: isTaskTypeInvalid,
    },
    {
      type: FieldType.input,
      label: "Вид задачи",
      value: taskSort,
      setValue: (value) => setTaskSort(Array.isArray(value) ? value : [value]),
      style: { width: "236px" },
      getDataHandler: Scripts.getTaskSort,
      isMulti: true,
      isInvalid: isTaskSortInvalid,
    },
    {
      type: FieldType.input,
      label: "Тематика",
      value: topic,
      setValue: (value) => setTopic(Array.isArray(value) ? value : [value]),
      style: { width: "236px" },
      getDataHandler: Scripts.getTopic,
      isMulti: true,
      isInvalid: isTopicInvalid,
    },
    {
      type: FieldType.input,
      label: "Срочность",
      value: urgency,
      setValue: (value) => setUrgency(Array.isArray(value) ? value : [value]),
      style: { width: "236px" },
      getDataHandler: Scripts.getUrgency,
      isMulti: true,
      isInvalid: isUrgencyInvalid,
    },
    {
      type: FieldType.input,
      label: "Продукт",
      value: product,
      setValue: (value) => setProduct(value as string),
      style: { width: "202px" },
      href: "",
      saveStateHandler: saveStateHandler,
    },
    {
      type: FieldType.input,
      label: "Страхователь",
      value: executer,
      setValue: (value) => setExecuter(value as string),
      style: { width: "202px" },
      href: "",
      saveStateHandler: saveStateHandler,
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
      taskType.length === 0 &&
      taskSort.length === 0 &&
      topic.length === 0 &&
      urgency.length === 0
    ) {
      setIsSignVipInvalid(true);
      setIsTaskTypeInvalid(true);
      setIsTaskSortInvalid(true);
      setIsTopicInvalid(true);
      setIsSUrgencyInvalid(true);
      isValid = false;
    } else {
      setIsSignVipInvalid(false);
      setIsTaskTypeInvalid(false);
      setIsTaskSortInvalid(false);
      setIsTopicInvalid(false);
      setIsSUrgencyInvalid(false);
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
    await Scripts.addSlaTask({
      days: days,
      hours: hours,
      minutes: minutes,
      startDate: startDate,
      endDate: endDate,
      type: type,
      signVip: signVip,
      taskType: taskType,
      taskSort: taskSort,
      topic: topic,
      urgency: urgency,
      product: product,
      executer: executer
    });

    return true;
  };

  return (
    <ModalWrapper>
      <ModalSla
        title="SLA на задачу"
        saveHandler={savelSlaHandler}
        closeModal={onClose}
        errorMessage={errorMessage}
      >
        <CustomSelectWithLabel
          label={"Показатель"}
          value={type}
          setValue={(value) => setType(value as string)}
          isRequired={true}
          getDataHandler={Scripts.getSLaTypes}
          isInvalid={isTypeInvalid}
        />
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
        <CustomSelectWithLabel {...fields[4]} />
        <CustomSelectWithLabel {...fields[5]} />
        <CustomSelectWithLabel {...fields[6]} />
        <CustomSelectWithLabel {...fields[7]} />
        <CustomSelectWithLabel {...fields[8]} />
        <ModalInput {...fields[9]} />
        <ModalInput {...fields[10]} />
      </ModalSla>
    </ModalWrapper>
  );
}
