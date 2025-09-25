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

type SlaOpenColumnProps = {
  data: ItemDataString;
  isOpen?: boolean;
};
/** Колонка с треугольником */
export default function SlaOpenColumn({
  data,
  isOpen = false,
}: SlaOpenColumnProps) {
  return (
    <button
      className={`sla-open-button ${isOpen ? "sla-open-button__open" : ""}`}
      title={isOpen ? "Свернуть" : "Развернуть"}
    >
      {icons.Triangle}
    </button>
  );
}
