import { initGlobalContext } from "./GlobalContext";
import { SlaRowData } from "../components/SlaPanel/SlaList/slaListTypes";

/** Контекст SLA */
export class SlaContext {
  /** Список данных SLA */
  slaDataList: SlaRowData[];

  constructor() {
    this.slaDataList = [];
  }
}

export const slaContext = initGlobalContext<SlaContext>(new SlaContext());
