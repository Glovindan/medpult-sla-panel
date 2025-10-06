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
  /** Обработчик перезагрузки списка */
  onReload: () => Promise<void>;
  /** Подсветить элемент списка */
  updateHighlightedId: (id: string) => void;
}

/** Модальное окно звонка */
export default function RequestSlaModal({
  onClose,
  onReload,
  updateHighlightedId,
}: RequestSlaModalProps) {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [isTypeInvalid, setIsTypeInvalid] = useState(false);
  const [isTimeInvalid, setIsTimeInvalid] = useState(false);
  const [isStartDateInvalid, setIsStartDateInvalid] = useState(false);

  const [isSignVipInvalid, setIsSignVipInvalid] = useState(false);
  const [isChannelTypeInvalid, setIsChannelTypeInvalid] = useState(false);
  const [isChannelSortInvalid, setIsChannelSortInvalid] = useState(false);

  // const [type, setType] = useState<string>("Скорость обработки");
  // Показатель
  const [type, setType] = useState<ObjectItem>(
    Scripts.getDefaultSlaTypeRequest()
  ); // TODO: Реализовать функцию получения стандартной категории

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
  //const [signVip, setSignVip] = useState<ObjectItem[]>([]);
  const [signVip, setSignVip] = useState<ObjectItem | null>(null);
  // Тип канала
  const [channelType, setChannelType] = useState<ObjectItem | null>(null);
  // Вид канала (Линии)
  const [channelSort, setChannelSort] = useState<ObjectItem | null>(null);

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
    const isChannelTypeEmpty = !channelType || !channelType.code;
    const isChannelSortEmpty = !channelSort || !channelSort.code;

    if (isVipEmpty && isChannelTypeEmpty && isChannelSortEmpty) {
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

    const slaDuplicateIdSearch = await Scripts.checkSlaRequest({
      days,
      hours,
      minutes,
      startDate,
      type: type.code,
      signVip: signVip ? [signVip.code] : [],
      channelType: channelType ? [channelType.code] : [],
      channelSort: channelSort ? [channelSort.code] : [],
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

    await Scripts.addSlaRequest({
      days: days,
      hours: hours,
      minutes: minutes,
      startDate: startDate,
      endDate: endDate,
      type: type.code,
      //signVip: signVip.map(item => item.code),
      signVip: signVip ? [signVip.code] : [],
      channelType: channelType ? [channelType.code] : [],
      channelSort: channelSort ? [channelSort.code] : [],
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
        title="SLA на обращение"
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
            getDataHandler={Scripts.getSLaTypesRequest}
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
          {/* <ModalMultipleCustomSelect
            values={signVip}
            setValues={setSignVip}
            getDataHandler={Scripts.getVipStatuses}
            isInvalid={isSignVipInvalid}
          /> */}
          <CustomSelect
            value={signVip?.value ?? ""}
            setValue={(value, code) =>
              setSignVip({ value: value, code: code ?? "" })
            }
            getDataHandler={Scripts.getVipStatuses}
            isInvalid={isSignVipInvalid}
          />
        </ModalLabledField>

        <ModalLabledField label={"Тип канала"}>
          <CustomSelect
            value={channelType?.value ?? ""}
            setValue={(value, code) => {
              setChannelType({ value: value, code: code ?? "" });
              setChannelSort(null);
            }}
            getDataHandler={Scripts.getTypeChannel}
            isInvalid={isChannelTypeInvalid}
          />
        </ModalLabledField>

        <ModalLabledField label={"Вид канала"}>
          <CustomSelect
            value={channelSort?.value ?? ""}
            setValue={async (value, code) => {
              setChannelSort({ value: value, code: code ?? "" });

              if (code) {
                const parentType =
                  await Scripts.getParentChannelTypeBySortCode(code);
                if (parentType) {
                  setChannelType(parentType);
                }
              }
            }}
            getDataHandler={() => Scripts.getSortChannel(channelType?.code)}
            isInvalid={isChannelSortInvalid}
          />
        </ModalLabledField>
      </ModalSla>
    </ModalWrapper>
  );
}
