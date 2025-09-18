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
  /** Подсветить элемент списка */
  updateHighlightedId: (id: string) => void;
}

/** Модальное окно звонка */
export default function TaskSlaModal({
  onClose,
  onReload,
  updateHighlightedId,
}: TaskSlaModalProps) {
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
  const [type, setType] = useState<ObjectItem>(Scripts.getDefaultSlaTypeTask());

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
  const [signVip, setSignVip] = useState<ObjectItem | null>(null);
  // Типы задач
  const [taskType, setTaskType] = useState<ObjectItem | null>(null);
  // Виды задач
  const [taskSort, setTaskSort] = useState<ObjectItem | null>(null);
  // Тематики задач
  const [topic, setTopic] = useState<ObjectItem | null>(null);
  // Виды срочности задач
  const [urgency, setUrgency] = useState<ObjectItem | null>(null);
  const [product, setProduct] = useState<ObjectItem>();
  // Страхователь
  const [executer, setExecuter] = useState<ObjectItem>();

  /** Сохранение состояния формы */
  const saveStateHandler = () => {};

  /** Сбрасываем дату окончания, если дата начала больше */
  useEffect(() => {
    if (!startDate || !endDate) return;

    const [startDay, startMonth, startYear] = startDate.split(".");
    const [endDay, endMonth, endYear] = endDate.split(".");

    const start = new Date(+startYear, +startMonth - 1, +startDay);
    const end = new Date(+endYear, +endMonth - 1, +endDay);

    if (start >= end) {
      setEndDate("");
    }
  }, [startDate, endDate]);
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

    const isVipEmpty = !signVip || !signVip.code;
    const isTaskTypeEmpty = !taskType || !taskType.code;
    const isTaskSortEmpty = !taskSort || !taskSort.code;
    const isTopicEmpty = !topic || !topic.code;
    const isUrgencyEmpty = !urgency || !urgency.code;

    if (
      isVipEmpty &&
      isTaskTypeEmpty &&
      isTaskSortEmpty &&
      isTopicEmpty &&
      isUrgencyEmpty
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

  // Идентификатор дубликата SLA
  const [slaDuplicateId, setSlaDuplicateId] = useState<string>();

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

    const slaDuplicateIdSearch = await Scripts.checkSlaTask({
      days,
      hours,
      minutes,
      startDate,
      type: type.code,
      signVip: signVip ? [signVip.code] : [],
      taskType: taskType ? [taskType.code] : [],
      taskSort: taskSort ? [taskSort.code] : [],
      topic: topic ? [topic.code] : [],
      urgency: urgency ? [urgency.code] : [],
      product: product?.code,
      executer: executer?.code,
    });

    if (slaDuplicateIdSearch) {
      setErrorMessage(
        ' SLA с такими параметрами существует. Для редактирования нажмите кнопку "Перейти"'
      );

      setSlaDuplicateId(slaDuplicateIdSearch);
      return false;
    }

    setErrorMessage("");
    setSlaDuplicateId(undefined);

    await Scripts.addSlaTask({
      days: days,
      hours: hours,
      minutes: minutes,
      startDate: startDate,
      endDate: endDate,
      type: type.code,
      signVip: signVip ? [signVip.code] : [],
      taskType: taskType ? [taskType.code] : [],
      taskSort: taskSort ? [taskSort.code] : [],
      topic: topic ? [topic.code] : [],
      urgency: urgency ? [urgency.code] : [],
      product: product?.code,
      executer: executer?.code,
    });

    // Перезагрузить список на фоне
    onReload();

    return true;
  };

  //Кнопка "Перейти" если такое sla уже существует
  const handleRedirect = async (): Promise<void> => {
    if (slaDuplicateId) {
      updateHighlightedId(slaDuplicateId);
      setSlaDuplicateId(undefined);
    }

    onClose();
  };

  return (
    <ModalWrapper>
      <ModalSla
        title="SLA на задачу"
        saveHandler={saveSlaHandler}
        closeModal={onClose}
        errorMessage={errorMessage}
        isSlaExists={Boolean(slaDuplicateId)}
        onRedirect={handleRedirect}
      >
        <ModalLabledField label={"Показатель"} isRequired={true}>
          <CustomSelect
            value={type.value}
            setValue={(value, code) =>
              setType({ value: value, code: code ?? "" })
            }
            getDataHandler={Scripts.getSLaTypesTask}
            isInvalid={isTypeInvalid}
            showClearButton={false}
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
          <CustomSelect
            value={signVip?.value ?? ""}
            setValue={(value, code) =>
              setSignVip({ value: value, code: code ?? "" })
            }
            getDataHandler={Scripts.getVipStatuses}
            isInvalid={isSignVipInvalid}
          />
        </ModalLabledField>

        <ModalLabledField label={"Тип задачи"}>
          <CustomSelect
            value={taskType?.value ?? ""}
            setValue={(value, code) => {
              setTaskType({ value: value, code: code ?? "" });
              setTaskSort(null);
              setTopic(null);
            }}
            getDataHandler={Scripts.getTaskTypes}
            isInvalid={isTaskTypeInvalid}
          />
        </ModalLabledField>

        <ModalLabledField label={"Вид задачи"}>
          <CustomSelect
            value={taskSort?.value ?? ""}
            setValue={async (value, code) => {
              setTaskSort({ value: value, code: code ?? "" });
              setTopic(null);

              if (code) {
                const parentType =
                  await Scripts.getParentTaskTypeBySortCode(code);
                if (parentType) {
                  setTaskType(parentType);
                }
              }
            }}
            getDataHandler={() => Scripts.getTaskSort(taskType?.code)}
            isInvalid={isTaskSortInvalid}
          />
        </ModalLabledField>

        <ModalLabledField label={"Тематика"}>
          <CustomSelect
            value={topic?.value ?? ""}
            setValue={(value, code) =>
              setTopic({ value: value, code: code ?? "" })
            }
            getDataHandler={() =>
              Scripts.getTopic(taskType?.code, taskSort?.code)
            }
            isInvalid={isTopicInvalid}
          />
        </ModalLabledField>

        <ModalLabledField label={"Срочность"}>
          <CustomSelect
            value={urgency?.value ?? ""}
            setValue={(value, code) =>
              setUrgency({ value: value, code: code ?? "" })
            }
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
