import React, { useEffect, useState } from "react";
import { slaContext } from "../../stores/SlaContext";
import TabsWrapper from "../../../UIKit/Tabs/TabsWrapper/TabsWrapper.tsx";
import TabItem from "../../../UIKit/Tabs/TabItem/TabItem.tsx";
import SlaListTask from "./SlaList/SlaListTask.tsx";
import SlaListRequest from "./SlaList/SlaListRequest.tsx";
import { FetchData } from "../../../UIKit/CustomList/CustomListTypes.ts";
import {
  SlaRowDataGroupTask,
  SlaRowDataGroupRequest,
} from "./SlaList/slaListTypes.ts";
import AdditionalPanel from "./AdditionalPanel/AdditionalPanel.tsx";
import Scripts from "../../shared/utils/clientScripts.ts";
import TaskSlaModal from "../ModalSla/TaskSlaModal/TaskSlaModal.tsx";
import RequestSlaModal from "../ModalSla/RequestSlaModal/RequestSlaModal.tsx";

/** Панель администрирования SLA */
export default function SlaPanel() {
  const [data, setValue] = slaContext.useState();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [slaDataTask, setSlaDataTask] = useState<
    FetchData<SlaRowDataGroupTask> | undefined
  >();
  const [slaDataRequest, setSlaDataRequest] = useState<
    FetchData<SlaRowDataGroupRequest> | undefined
  >();

  // Состояния для модальных окон
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  // Загрузка всех SLA
  useEffect(() => {
    setIsLoading(true);

    Promise.all([Scripts.getSlaTask(), Scripts.getSlaRequest()])
      .then(([slaDataTask, slaDataRequest]) => {
        setSlaDataTask(slaDataTask); // Сохраняем данные для задач
        setSlaDataRequest(slaDataRequest); // Сохраняем данные для обращений
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  /** Получение всех SLA задачи*/
  async function getSlaTaskHandler(): Promise<FetchData<SlaRowDataGroupTask>> {
    if (!slaDataTask) {
      return {
        hasMore: false,
        items: [],
      };
    }
    return slaDataTask;
  }
  /** Получение всех SLA обращений*/
  async function getSlaRequestHandler(): Promise<
    FetchData<SlaRowDataGroupRequest>
  > {
    if (!slaDataRequest) {
      return {
        hasMore: false,
        items: [],
      };
    }
    return slaDataRequest;
  }

  return (
    <slaContext.Provider value={{ data, setValue }}>
      <div className="medpult-sla-panel">
        <div className="medpult-sla-panel__title">SLA</div>
        <TabsWrapper>
          <TabItem code={"requests"} name={"Обращения"}>
            <AdditionalPanel onAddClick={() => setIsRequestModalOpen(true)} />
            <SlaListRequest
              getSlaHandler={getSlaRequestHandler}
              isLoading={isLoading}
            />
            {isRequestModalOpen && (
              <RequestSlaModal onClose={() => setIsRequestModalOpen(false)} />
            )}
          </TabItem>
          <TabItem code={"tasks"} name={"Задачи"}>
            <AdditionalPanel onAddClick={() => setIsTaskModalOpen(true)} />
            <SlaListTask
              getSlaHandler={getSlaTaskHandler}
              isLoading={isLoading}
            />
            {isTaskModalOpen && (
              <TaskSlaModal onClose={() => setIsTaskModalOpen(false)} />
            )}
          </TabItem>
        </TabsWrapper>
      </div>
    </slaContext.Provider>
  );
}
