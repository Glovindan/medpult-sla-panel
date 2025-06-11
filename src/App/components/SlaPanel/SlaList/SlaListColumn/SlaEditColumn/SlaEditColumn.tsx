import React, { useEffect } from "react";
import CustomList from "../../../../../../UIKit/CustomList/CustomList.tsx";
import {
  SortData,
  FetchData,
  ListColumnData,
  ItemDataString,
  ItemData,
} from "../../../../../../UIKit/CustomList/CustomListTypes.ts";
import icons from "../../../../../shared/icons.tsx";

type SlaEditColumnProps = {
  data: ItemDataString;
  onEditClick: (data: ItemDataString) => void;
};
/** Колонка с кнопкой редактирования */
export default function SlaEditColumn({
  data,
  onEditClick,
}: SlaEditColumnProps) {
  return (
    <button
      title="Редактировать"
      className="sla-edit-button"
      onClick={(e) => {
        e.stopPropagation();
        onEditClick(data);
      }}
    >
      {icons.EditButton}
    </button>
  );
}
