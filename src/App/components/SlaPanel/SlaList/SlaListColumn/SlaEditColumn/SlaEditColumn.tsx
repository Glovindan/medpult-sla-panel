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
};
/** Колонка с кнопкой редактирования */
export default function SlaEditColumn({ data }: SlaEditColumnProps) {
  return (
    <button
      className="sla-edit-button"
      onClick={() => alert(JSON.stringify(data))}
    >
      {icons.EditButton}
    </button>
  );
}
