import React, { useState } from "react";
import Button from "../../../../UIKit/Button/Button";

/**Панель */
function AdditionalPanel({}) {
  const [isSlaExpiredVisible, setIsSlaExpiredVisible] = useState(false);

  const toggleSlaExpired = () => {
    setIsSlaExpiredVisible(!isSlaExpiredVisible);
  };
  /** Добавить SLA */
  const onClickAdd = async () => {};

  return (
    <div className="medpult-additional-panel">
      <div className="medpult-additional-panel__switch">
        <div className="medpult-additional-panel__switch__text">
          Показать истекшие SLA
        </div>
        <label className="medpult-additional-panel__switch__check">
          <input
            type="checkbox"
            checked={isSlaExpiredVisible}
            onChange={toggleSlaExpired}
          />
          <span className="medpult-slider medpult-round"></span>
        </label>
      </div>
      <Button clickHandler={onClickAdd} title="+  Добавить" />
    </div>
  );
}

export default AdditionalPanel;
