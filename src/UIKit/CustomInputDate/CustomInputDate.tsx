import React, { useRef } from "react";
import CustomInput from "../CustomInput/CustomInput";
import InputButton from "../InputButton/InputButton";
import Masks from "../shared/utils/masks";
import icons from "../shared/icons";
import { InputDateType } from "./CustomInputDateTypes";
import { CustomInputProps } from "../shared/types/types";

interface CustomInputDateProps extends CustomInputProps {
  /** Тип даты */
  type: InputDateType;
  startDate?: string;
  onStartDateNotSet?: () => void;
  label?: string;
}

/** Поле ввода даты */
function CustomInputDate(props: CustomInputDateProps) {
  const { type = InputDateType.date, setValue, disabled } = props;
  const pickerRef = useRef<HTMLInputElement>(null);
  const buttonSvg = icons.Calendar;

  const getMinDate = () => {
    if (props.label === "Дата окончания" && props.startDate) {
      // Парсим дату начала из формата ДД.ММ.ГГГГ
      const [day, month, year] = props.startDate.split(".");
      const startDateObj = new Date(`${year}-${month}-${day}`);
      startDateObj.setDate(startDateObj.getDate() + 1); // Добавляем 1 день

      const yyyy = startDateObj.getFullYear();
      const mm = String(startDateObj.getMonth() + 1).padStart(2, "0");
      const dd = String(startDateObj.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    }

    // Для остальных случаев используем сегодняшнюю дату + 1 день
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const minDate = getMinDate();

  // Открыть календарь
  const openPicker = () => {
    const picker = pickerRef.current;
    if (!picker) return;
    if (disabled) return;
    // Если не установлена дата начала
    if (props.label === "Дата окончания" && !props.startDate) {
      if (props.onStartDateNotSet) {
        props.onStartDateNotSet();
      }
      return;
    }

    picker.showPicker();
  };

  //  При выборе даты/времени в календаре
  const onChangePickerValue = () => {
    const picker = pickerRef.current;
    if (!picker) return;

    let value = "";
    switch (picker.type) {
      case InputDateType.date: {
        const values = picker.value.split("-");
        value = values.reverse().join(".");
        break;
      }
      case InputDateType.time: {
        value = picker.value;
        break;
      }
      case InputDateType.datetime: {
        const values = picker.value.split("T");
        const dateValues = values[0].split("-");
        const timeValue = values[1];

        value = dateValues.reverse().join(".") + " " + timeValue;
        break;
      }
    }

    setValue(value);
  };

  return (
    <div className="custom-input-date">
      <input
        type={type}
        onChange={onChangePickerValue}
        className="custom-input-date__picker"
        ref={pickerRef}
        min={minDate}
      />
      <CustomInput
        {...props}
        type="text"
        buttons={<InputButton svg={buttonSvg} clickHandler={openPicker} />}
        placeholder={props.placeholder ?? "ДД.ММ.ГГГГ"}
        maskFunction={Masks.applyDateMask}
        readOnly
      />
    </div>
  );
}

export default CustomInputDate;
