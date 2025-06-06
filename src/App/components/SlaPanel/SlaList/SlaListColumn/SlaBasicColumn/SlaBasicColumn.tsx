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

type SlaBasicColumnProps = {
  data: ItemData<boolean>;
};
/** Колонка с индикатором базового SLA */
export default function SlaBasicColumn({ data }: SlaBasicColumnProps) {
  return <div>{data.info && icons.Star}</div>;
}
