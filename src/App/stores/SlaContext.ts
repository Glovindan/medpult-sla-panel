import { initGlobalContext } from "./GlobalContext";
import { SlaRowDataTask } from "../components/SlaPanel/SlaList/slaListTypes";

/** Контекст SLA */
export class SlaContext {
  /** Список данных SLA */
  slaDataList: SlaRowDataTask[];

  constructor() {
    this.slaDataList = [];
  }
}

export const slaContext = initGlobalContext<SlaContext>(new SlaContext());
