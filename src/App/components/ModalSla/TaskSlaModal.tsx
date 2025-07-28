import React, { useEffect, useState } from "react";
import { FieldConfig, FieldType } from "../../shared/types";
import ModalSla from "./ModalSla";
import Scripts from "../../shared/utils/clientScripts";
import ModalInput from "./ModalType/ModalInputSearch/ModalInputSearch";
import ModalTime from "./ModalType/ModalTime/ModalTime";
import ModalInputDate from "./ModalType/ModalInputDate/ModalInputDate";
import CustomSelectWithLabel from "./ModalType/ModalLineSelect/ModalLineSelect";
import ModalWrapper from "./ModalWrapper/ModalWrapper";
import ModalLabledField from "./ModalType/ModalLabledField/modalLabledField";
import CustomSelect from "../../../UIKit/CustomSelect/CustomSelect";
import { ObjectItem } from "../../../UIKit/Filters/FiltersTypes";
import ModalTimeInput from "./ModalType/ModalTimeInput/ModalTimeInput";
import ModalMultipleCustomSelect from "./ModalType/ModalMultipleCustomSelect/ModalMultipleCustomSelect";
import CustomInputAppItem from "../../../UIKit/CustomInputAppItem/CustomInputAppItem";

interface TaskSlaModalProps {
  onClose: () => void;
  /** Обработчик перезагрузки списка */
  onReload: () => Promise<void>;
}

/** Модальное окно звонка */
export default function TaskSlaModal({ onClose, onReload }: TaskSlaModalProps) {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [isTypeInvalid, setIsTypeInvalid] = useState(false);
  const [isTimeInvalid, setIsTimeInvalid] = useState(false);
  const [isStartDateInvalid, setIsStartDateInvalid] = useState(false);

  const [isSignVipInvalid, setIsSignVipInvalid] = useState(false);
  const [isTaskTypeInvalid, setIsTaskTypeInvalid] = useState(false);
  const [isTaskSortInvalid, setIsTaskSortInvalid] = useState(false);
  const [isTopicInvalid, setIsTopicInvalid] = useState(false);
  const [isUrgencyInvalid, setIsSUrgencyInvalid] = useState(false);

  // Показатель
  const [type, setType] = useState<ObjectItem>(Scripts.getDefaultSlaType());

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
  // Типы задач
  const [taskType, setTaskType] = useState<ObjectItem[]>([]);
  // Виды задач
  const [taskSort, setTaskSort] = useState<ObjectItem[]>([]);
  // Тематики задач
  const [topic, setTopic] = useState<ObjectItem[]>([]);
  // Виды срочности задач
  const [urgency, setUrgency] = useState<ObjectItem[]>([]);
  // Продукт
  const [product, setProduct] = useState<ObjectItem>();
  // Страхователь
  const [executer, setExecuter] = useState<ObjectItem>();

  /** Сохранение состояния формы */
  const saveStateHandler = () => {};

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

    await Scripts.addSlaTask({
      days: days,
      hours: hours,
      minutes: minutes,
      startDate: startDate,
      endDate: endDate,
      type: type.code,
      signVip: signVip.map(item => item.code),
      taskType: taskType.map(item => item.code),
      taskSort: taskSort.map(item => item.code),
      topic: topic.map(item => item.code),
      urgency: urgency.map(item => item.code),
      product: product?.code,
      executer: executer?.code
    });
    
    // Перезагрузить список на фоне
    onReload()

    return true;
  };

  return (
    <ModalWrapper>
      <ModalSla
        title="SLA на задачу"
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

        <ModalLabledField label={"Тип задачи"}>
          <ModalMultipleCustomSelect
            values={taskType}
            setValues={setTaskType}
            getDataHandler={Scripts.getTaskTypes}
            isInvalid={isTaskTypeInvalid}
          />
        </ModalLabledField>

        <ModalLabledField label={"Вид задачи"}>
          <ModalMultipleCustomSelect
            values={taskSort}
            setValues={setTaskSort}
            getDataHandler={Scripts.getTaskSort}
            isInvalid={isTaskSortInvalid}
          />
        </ModalLabledField>

        <ModalLabledField label={"Тематика"}>
          <ModalMultipleCustomSelect
            values={topic}
            setValues={setTopic}
            getDataHandler={Scripts.getTopic}
            isInvalid={isTopicInvalid}
          />
        </ModalLabledField>

        <ModalLabledField label={"Срочность"}>
          <ModalMultipleCustomSelect
            values={urgency}
            setValues={setUrgency}
            getDataHandler={Scripts.getUrgency}
            isInvalid={isUrgencyInvalid}
          />
        </ModalLabledField>
        
        {/* TODO: Доработать при получении постановки */}
        <ModalLabledField label={"Продукт"}>
          <CustomInputAppItem
            value={product?.value ?? ""}
            setValue={() => {}}
            href={""}
            saveStateHandler={saveStateHandler}
            />
        </ModalLabledField>

        {/* TODO: Доработать при получении постановки */}
        <ModalLabledField label={"Страхователь"}>
          <CustomInputAppItem
            value={product?.value ?? ""}
            setValue={() => {}}
            href={""}
            saveStateHandler={saveStateHandler}
          />
        </ModalLabledField>
      </ModalSla>
    </ModalWrapper>
  );
}
