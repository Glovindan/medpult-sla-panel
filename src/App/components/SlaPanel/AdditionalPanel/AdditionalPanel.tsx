import React, { useState } from "react";
import Button from "../../../../UIKit/Button/Button";

interface AdditionalPanelProps {
  onAddClick?: () => void;
  isSlaExpiredVisible: boolean;
  setIsSlaExpiredVisible: (value: boolean) => void;
}
/**Панель */
function AdditionalPanel({
  onAddClick,
  isSlaExpiredVisible,
  setIsSlaExpiredVisible,
}: AdditionalPanelProps) {
  const toggleSlaExpired = () => {
    setIsSlaExpiredVisible(!isSlaExpiredVisible);
  };

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
      <Button clickHandler={onAddClick} title="+  Добавить" />
    </div>
  );
}

export default AdditionalPanel;
