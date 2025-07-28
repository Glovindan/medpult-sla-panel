import React, { useEffect, useState, useCallback } from "react";
import { slaContext } from "../../stores/SlaContext";
import TabsWrapper from "../../../UIKit/Tabs/TabsWrapper/TabsWrapper.tsx";
import TabItem from "../../../UIKit/Tabs/TabItem/TabItem.tsx";
import SlaListTask from "./SlaList/SlaListTask.tsx";
import SlaListRequest from "./SlaList/SlaListRequest.tsx";
import { FetchData } from "../../../UIKit/CustomList/CustomListTypes.ts";
import { SlaRowDataGroup } from "./SlaList/slaListTypes.ts";
import AdditionalPanel from "./AdditionalPanel/AdditionalPanel.tsx";
import Scripts from "../../shared/utils/clientScripts.ts";
import TaskSlaModal from "../ModalSla/TaskSlaModal.tsx";
import RequestSlaModal from "../ModalSla/RequestSlaModal.tsx";

/** Панель администрирования SLA */
export default function SlaPanel() {
  const [data, setValue] = slaContext.useState();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [slaDataTask, setSlaDataTask] = useState<
    FetchData<SlaRowDataGroup> | undefined
  >();
  const [slaDataRequest, setSlaDataRequest] = useState<
    FetchData<SlaRowDataGroup> | undefined
  >();
  const [showExpiredSla, setShowExpiredSla] = useState(false);

  // Состояния для модальных окон
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  // Загрузка всех SLA
  useEffect(() => {
    setIsLoading(true);
    Scripts.OnInit().then(() => {

      Promise.all([Scripts.getSlaTask(), Scripts.getSlaRequest()])
        .then(([slaDataTask, slaDataRequest]) => {
          setSlaDataTask(slaDataTask); // Сохраняем данные для задач
          setSlaDataRequest(slaDataRequest); // Сохраняем данные для обращений
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    });
  }, []);

  /** Обновить список SLA задач и обращений */
  async function reloadList() {
    setIsLoading(true);
    
    // Обновить значения SLA с сервера
    await Scripts.updateSlaDataBuffer()
    
    // Получить значения списков
    const [slaDataTask, slaDataRequest] = await Promise.all([Scripts.getSlaTask(), Scripts.getSlaRequest()]);
    setSlaDataTask(slaDataTask)
    setSlaDataRequest(slaDataRequest)

    setIsLoading(false);
  }

  /** Сортировка списка*/
  const sortSlaItems = <T extends { data: any }>(items: T[]): T[] => {
    const statusOrder = [
      "valid",
      "validPlanned",
      "planned",
      "expired",
      "canceled",
    ];

    return [...items].sort((a, b) => {
      //Сначала сортируем по isBasic
      const aIsBasic = a.data?.isBasic?.info === true ? 0 : 1;
      const bIsBasic = b.data?.isBasic?.info === true ? 0 : 1;
      if (aIsBasic !== bIsBasic) return aIsBasic - bIsBasic;

      //Потом по статусу
      const aStatus = a.data?.status?.info;
      const bStatus = b.data?.status?.info;
      const aIndex = statusOrder.indexOf(aStatus);
      const bIndex = statusOrder.indexOf(bStatus);

      return aIndex - bIndex;
    });
  };

  /** Получение всех SLA задачи*/
  const getSlaTaskHandler = useCallback(async (): Promise<
    FetchData<SlaRowDataGroup>
  > => {
    if (!slaDataTask) return { hasMore: false, items: [] };

    const filteredItems = showExpiredSla
      ? slaDataTask.items
      : slaDataTask.items.filter(
          (item) => item.data.status?.info !== "expired"
        );

    return {
      hasMore: slaDataTask.hasMore,
      items: sortSlaItems(filteredItems),
    };
  }, [slaDataTask, showExpiredSla]);
  /** Получение всех SLA обращений*/
  const getSlaRequestHandler = useCallback(async (): Promise<
    FetchData<SlaRowDataGroup>
  > => {
    if (!slaDataRequest) return { hasMore: false, items: [] };

    const filteredItems = showExpiredSla
      ? slaDataRequest.items
      : slaDataRequest.items.filter(
          (item) => item.data.status?.info !== "expired"
        );

    return {
      hasMore: slaDataRequest.hasMore,
      items: sortSlaItems(filteredItems),
    };
  }, [slaDataTask, showExpiredSla]);

  return (
    <slaContext.Provider value={{ data, setValue }}>
      <div className="medpult-sla-panel">
        <div className="medpult-sla-panel__title">SLA</div>
        <TabsWrapper>
          <TabItem code={"requests"} name={"Обращения"}>
            <AdditionalPanel
              onAddClick={() => setIsRequestModalOpen(true)}
              isSlaExpiredVisible={showExpiredSla}
              setIsSlaExpiredVisible={setShowExpiredSla}
            />
            <SlaListRequest
              key={`request-${showExpiredSla}`}
              getSlaHandler={getSlaRequestHandler}
              isLoading={isLoading}
            />
            {isRequestModalOpen && (
              <RequestSlaModal onClose={() => setIsRequestModalOpen(false)}  onReload={reloadList}/>
            )}
          </TabItem>
          <TabItem code={"tasks"} name={"Задачи"}>
            <AdditionalPanel
              onAddClick={() => setIsTaskModalOpen(true)}
              isSlaExpiredVisible={showExpiredSla}
              setIsSlaExpiredVisible={setShowExpiredSla}
            />
            <SlaListTask
              key={`task-${showExpiredSla}`}
              getSlaHandler={getSlaTaskHandler}
              isLoading={isLoading}
            />
            {isTaskModalOpen && (
              <TaskSlaModal onClose={() => setIsTaskModalOpen(false)} onReload={reloadList}/>
            )}
          </TabItem>
        </TabsWrapper>
      </div>
    </slaContext.Provider>
  );
}
