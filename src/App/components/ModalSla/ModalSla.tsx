import React from "react";
import { ButtonType } from "../../../UIKit/Button/ButtonTypes";
import Button from "../../../UIKit/Button/Button";

interface ModalSlaProps extends React.PropsWithChildren {
  /** Заголовок модального окна */
  title: string;
  /** Функция для сохранения данных */
  saveHandler?: () => Promise<boolean>;
  /** Отменить */
  closeModal: () => void;
  /** Сообщение об ошибке */
  errorMessage?: string;
  /** Если Sla уже существует */
  isSlaExists?: boolean;
  onRedirect?: () => void;
}

/** Универсальное модальное окно */
export default function ModalSla({
  title,
  saveHandler,
  closeModal,
  children,
  errorMessage,
  isSlaExists = false,
  onRedirect,
}: ModalSlaProps) {
  const onClickAdd = async () => {
    if (saveHandler) {
      const success = await saveHandler();
      if (!success) return;
    }
    closeModal();
  };

  const onClickCancel = () => {
    closeModal();
  };

  return (
    <div className="sla-modal">
      <div className="sla-modal__header">
        <span className="sla-modal__label">{title}</span>
      </div>
      <div className="sla-modal__content" style={{ width: "520px" }}>
        {/* Поля ввода */}
        <div className="sla-modal__fields">{children}</div>
        {/* Кнопки */}
        <div className="sla-modal__buttons">
          {!isSlaExists ? (
            <Button
              title={"Добавить"}
              clickHandler={onClickAdd}
              style={{ width: "100%" }}
            />
          ) : (
            <Button
              title={"Перейти"}
              clickHandler={onRedirect}
              style={{ width: "100%" }}
            />
          )}

          <Button
            title={"Отменить"}
            buttonType={ButtonType.outline}
            clickHandler={onClickCancel}
            style={{ width: "100%" }}
          />
        </div>
        {errorMessage && <div className="sla-modal__error">{errorMessage}</div>}
      </div>
    </div>
  );
}
