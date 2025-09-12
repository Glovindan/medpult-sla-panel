import React, { useEffect, useState } from "react";
import CustomList from "../../../../UIKit/CustomList/CustomList.tsx";
import {
  SortData,
  FetchData,
  ListColumnData,
  ItemDataString,
  ItemData,
  getDetailsLayoutAttributes,
  CustomColumnProps,
} from "../../../../UIKit/CustomList/CustomListTypes.ts";
import SlaBasicColumn from "./SlaListColumn/SlaBasicColumn/SlaBasicColumn.tsx";
import {
  CreatorEditorData,
  SlaRowDataGroup,
  SlaStatus,
} from "./slaListTypes.ts";
import SlaStatusColumn from "./SlaListColumn/SlaStatusColumn/SlaStatusColumn.tsx";
import SlaEditColumn from "./SlaListColumn/SlaEditColumn/SlaEditColumn.tsx";
import SlaOpenColumn from "./SlaListColumn/SlaOpenColumn/SlaOpenColumn.tsx";
import CreatorEditorDataColumn from "./SlaListColumn/CreatorEditorDataColumn/CreateEditDataColumn.tsx";
import Loader from "../../../../UIKit/Loader/Loader.tsx";
import EditBaseModal from "../../ModalSla/EditSlaModal/EditBaseModal.tsx";
import EditValidModal from "../../ModalSla/EditSlaModal/EditValidModal.tsx";
import EditPlanModal from "../../ModalSla/EditSlaModal/EditPlanModal.tsx";
import EditValidPlanModal from "../../ModalSla/EditSlaModal/EditValidPlanModal.tsx";
import Scripts from "../../../shared/utils/clientScripts";

/** Пропсы списка SLA */
type SlaListProps = {
  /** Получение данных SLA */
  getSlaHandler(): Promise<FetchData<SlaRowDataGroup>>;
  /** Флаг загрузки */
  isLoading: boolean;
  hideHeader?: boolean;
  /** Идентификатор подсвечиваемого элемента */
  highlightedId?: string;
};

interface getSlaListDetailsLayoutAttributes extends getDetailsLayoutAttributes {
  rowData: SlaRowDataGroup;
}

/** Список SLA */
export default function SlaListRequest({
  getSlaHandler,
  isLoading,
  hideHeader = false,
  highlightedId
}: SlaListProps) {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isEditValidModalOpen, setEditValidModalOpen] = useState(false);
  const [isEditPlanModalOpen, setEditPlanModalOpen] = useState(false);
  const [isEditValidPlanModalOpen, setEditValidPlanModalOpen] = useState(false);
  const [editRowData, setEditRowData] = useState<SlaRowDataGroup | null>(null);
  const [showStarIcon, setShowStarIcon] = useState(true);

  const handleSwitchToEditBaseModal = () => {
    setEditValidModalOpen(false); // Закрываем текущую
    setEditValidPlanModalOpen(false);
    setEditModalOpen(true); // Открываем новую
    setShowStarIcon(false);
  };

  // Функция для отрисовки колонки с индикатором базового SLA
  const getSlaBasicColumn = ({ value }: CustomColumnProps<boolean>) => (
    <SlaBasicColumn data={value} />
  );
  // Функция для отрисовки колонки статуса
  const getSlaStatusColumn = ({ value }: CustomColumnProps<SlaStatus>) => (
    <SlaStatusColumn data={value} />
  );
  // Функция для отрисовки колонки с кнопкой редактирования
  const getEditColumn = ({
    value,
    rowData,
  }: {
    value: ItemDataString;
    rowData: SlaRowDataGroup;
  }) => {
    const status = rowData.status?.info;

    const canShow =
      (rowData.isBasic.info === true && status === "valid") ||
      status === "valid" ||
      status === "validPlanned" ||
      status === "planned";

    if (!canShow) return <></>;

    return (
      <SlaEditColumn
        data={value}
        onEditClick={() => {
          if (
            rowData.isBasic.info === true &&
            (rowData.status.info === "valid" ||
              rowData.status.info === "validPlanned")
          ) {
            setEditRowData(rowData);
            setEditModalOpen(true);
            setShowStarIcon(true);
          } else if (rowData.status.info === "validPlanned") {
            setEditRowData(rowData);
            setEditValidPlanModalOpen(true);
          } else if (status === "valid") {
            setEditRowData(rowData);
            setEditValidModalOpen(true);
          } else if (status === "planned") {
            setEditRowData(rowData);
            setEditPlanModalOpen(true);
          }
        }}
      />
    );
  };
  // Функция для отрисовки колонки с кнопкой треугольником
  const getOpenColumn: (props: {
    value: ItemDataString;
    rowData: SlaRowDataGroup;
    isOpen?: boolean;
  }) => JSX.Element = ({ value, rowData, isOpen = false }) => {
    const groupData = rowData.groupData;
    const hasGroup = Array.isArray(groupData) && groupData.length > 0;

    return hasGroup ? <SlaOpenColumn data={value} isOpen={isOpen} /> : <></>;
  };
  // Функция для отрисовки колонки с данными автора и редактора
  const getCreatorEditorDataColumn = ({
    value,
  }: CustomColumnProps<CreatorEditorData>) => (
    <CreatorEditorDataColumn data={value} />
  );

  async function getSubSla(id: string): Promise<FetchData<SlaRowDataGroup>> {
    // Все SLA
    const sla = await getSlaHandler();
    // Искомый SLA
    const findSla = sla.items.find((item) => item.id == id);
    return {
      hasMore: false,
      items:
        findSla?.data.groupData?.map((item) => {
          return {
            id: item.id.value,
            data: {
              ...item,
              groupData: [],
            },
          };
        }) ?? [],
    };
  }

  /** Получение формы детальной информации по строке списка ДС */
  const getCustomListDetailsLayout = ({
    rowData,
    reloadData,
    onClickRowHandler,
  }: getSlaListDetailsLayoutAttributes) => {
    // TODO: Реализовать
    const groupData = rowData.groupData;
    if (!Array.isArray(groupData) || groupData.length === 0) {
      return null;
    }
    return (
      <div style={{ backgroundColor: "#F4F4F5" }}>
        <SlaListRequest
          getSlaHandler={() => getSubSla(rowData.id.value)}
          isLoading={false}
          hideHeader={true}
        />
      </div>
    );
  };

  // Настройка колонок
  const columnsSettings: ListColumnData[] = [
    // Индикатор базового
    new ListColumnData({
      code: "isBasic",
      name: "",
      fr: 1,
      fixedWidth: "40px",
      contentPadding: "17px 11px",
      getCustomColumComponent: getSlaBasicColumn,
    }),
    // Показатель (Тип SLA)
    new ListColumnData({
      code: "type",
      name: "Показатель",
      fr: 1,
    }),
    // Условия
    new ListColumnData({
      code: "conditions",
      name: "Условия",
      fr: 1,
    }),
    // Значение показателя
    new ListColumnData({
      code: "value",
      name: "Значение показателя",
      fr: 1,
    }),
    // Статус
    new ListColumnData({
      code: "status",
      name: "Статус",
      fr: 1,
      fixedWidth: "170px",
      getCustomColumComponent: getSlaStatusColumn,
    }),
    // Дата начала
    new ListColumnData({
      code: "startDate",
      name: "Дата начала действия",
      fr: 1,
    }),
    // Дата окончания
    new ListColumnData({
      code: "endDate",
      name: "Дата окончания действия",
      fr: 1,
    }),
    // Тип канала
    new ListColumnData({
      code: "channelType",
      name: "Тип канала",
      fr: 1,
    }),
    // Вид канала
    new ListColumnData({
      code: "channelSort",
      name: "Вид канала",
      fr: 1,
    }),
    // Признак ВИП
    new ListColumnData({
      code: "signVip",
      name: "Признак ВИП",
      fr: 1,
    }),

    // Автор/редактор
    new ListColumnData({
      code: "creatorEditorData",
      name: "Автор/редактор",
      fr: 1,
      getCustomColumComponent: getCreatorEditorDataColumn,
    }),
    // Кнопка изменения
    new ListColumnData({
      code: "id",
      name: "",
      fr: 1,
      fixedWidth: "52px",
      getCustomColumComponent: getEditColumn,
    }),
    // Кнопка разворачивания
    new ListColumnData({
      code: "id",
      name: "",
      fr: 1,
      fixedWidth: "56px",
      getCustomColumComponent: getOpenColumn,
    }),
  ];

  return (
    <>
      {!isLoading && (
        <CustomList
          columnsSettings={columnsSettings}
          getDataHandler={getSlaHandler}
          isScrollable={false}
          getDetailsLayout={getCustomListDetailsLayout}
          hideHeader={hideHeader}
          highlightedId={highlightedId}
        />
      )}
      {isLoading && <Loader />}
      {isEditModalOpen && editRowData && (
        <EditBaseModal
          title="SLA на обращение"
          onClose={() => setEditModalOpen(false)}
          rowData={editRowData}
          onSave={Scripts.addSlaRequest}
          showStarIcon={showStarIcon}
        />
      )}
      {isEditValidPlanModalOpen && editRowData && (
        <EditValidPlanModal
          title="SLA на задачу"
          onClose={() => setEditValidPlanModalOpen(false)}
          rowData={editRowData}
          onComplete={Scripts.competeSlaRequest}
          onSwitchToEditBaseModal={handleSwitchToEditBaseModal}
        />
      )}
      {isEditValidModalOpen && editRowData && (
        <EditValidModal
          title="SLA на обращение"
          onClose={() => setEditValidModalOpen(false)}
          rowData={editRowData}
          onSwitchToEditBaseModal={handleSwitchToEditBaseModal}
          onComplete={Scripts.competeSlaRequest}
        />
      )}
      {isEditPlanModalOpen && editRowData && (
        <EditPlanModal
          title="SLA на обращение"
          onClose={() => setEditPlanModalOpen(false)}
          rowData={editRowData}
          onSave={Scripts.addSlaRequest}
          onCancel={Scripts.cancelSlaRequest}
        />
      )}
    </>
  );
}
