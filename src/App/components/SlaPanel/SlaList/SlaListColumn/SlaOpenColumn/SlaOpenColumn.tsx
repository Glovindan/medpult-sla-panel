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
};
/** Колонка с треугольником */
export default function SlaOpenColumn({ data }: SlaOpenColumnProps) {
  return (
    <button
      className="sla-open-button"
      title="Развернуть"
      onClick={() => alert(JSON.stringify(data))}
    >
      {icons.Triangle}
    </button>
  );
}
