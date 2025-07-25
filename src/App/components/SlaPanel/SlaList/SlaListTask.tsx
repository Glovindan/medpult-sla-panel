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
import Scripts from "../../../shared/utils/clientScripts";

/** Пропсы списка SLA */
type SlaListProps = {
  /** Получение данных SLA */
  getSlaHandler(): Promise<FetchData<SlaRowDataGroup>>;
  /** Флаг загрузки */
  isLoading: boolean;
  hideHeader?: boolean;
};

interface getSlaListDetailsLayoutAttributes extends getDetailsLayoutAttributes {
  rowData: SlaRowDataGroup;
}

/** Список SLA */
export default function SlaListTask({
  getSlaHandler,
  isLoading,
  hideHeader = false,
}: SlaListProps) {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isEditValidModalOpen, setEditValidModalOpen] = useState(false);
  const [isEditPlanModalOpen, setEditPlanModalOpen] = useState(false);
  const [editRowData, setEditRowData] = useState<SlaRowDataGroup | null>(null);

  const handleSwitchToEditBaseModal = () => {
    setEditValidModalOpen(false); // Закрываем текущую
    setEditModalOpen(true); // Открываем новую
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
  }) => (
    <SlaEditColumn
      data={value}
      onEditClick={() => {
        if (rowData.isBasic.info === true && rowData.status.info === "valid") {
          setEditRowData(rowData);
          setEditModalOpen(true);
        } else if (
          rowData.status.info === "valid" ||
          rowData.status.info === "validPlanned"
        ) {
          setEditRowData(rowData);
          setEditValidModalOpen(true);
        } else if (rowData.status.info === "planned") {
          setEditRowData(rowData);
          setEditPlanModalOpen(true);
        } else {
          return;
        }
      }}
    />
  );
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
    const groupData = rowData.groupData;
    if (!Array.isArray(groupData) || groupData.length === 0) {
      return null;
    }
    return (
      <div style={{ backgroundColor: "#F4F4F5" }}>
        <SlaListTask
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
      fixedWidth: "32px",
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
    // TODO: Признак ВИП
    // Тип задачи
    new ListColumnData({
      code: "taskType",
      name: "Тип задачи",
      fr: 1,
    }),
    // Вид задачи
    new ListColumnData({
      code: "taskSort",
      name: "Вид задачи",
      fr: 1,
    }),
    // Тематика
    new ListColumnData({
      code: "topic",
      name: "Тематика",
      fr: 1,
    }),
    // Срочность
    new ListColumnData({
      code: "urgency",
      name: "Срочность",
      fr: 1,
    }),
    // Признак ВИП
    new ListColumnData({
      code: "signVip",
      name: "Признак ВИП",
      fr: 1,
    }),
    // Продукт
    new ListColumnData({
      code: "product",
      name: "Продукт",
      fr: 1,
    }),
    // Срочность
    new ListColumnData({
      code: "executer",
      name: "Страхователь",
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
        />
      )}
      {isLoading && <Loader />}
      {isEditModalOpen && editRowData && (
        <EditBaseModal
          title="SLA на задачу"
          onClose={() => setEditModalOpen(false)}
          rowData={editRowData}
          onSave={Scripts.addSlaTask}
        />
      )}
      {isEditValidModalOpen && editRowData && (
        <EditValidModal
          title="SLA на задачу"
          onClose={() => setEditValidModalOpen(false)}
          rowData={editRowData}
          onSwitchToEditBaseModal={handleSwitchToEditBaseModal}
          onComplete={Scripts.competeSlaTask}
        />
      )}
      {isEditPlanModalOpen && editRowData && (
        <EditPlanModal
          title="SLA на задачу"
          onClose={() => setEditPlanModalOpen(false)}
          rowData={editRowData}
          onSave={Scripts.addSlaTask}
          onCancel={Scripts.cancelSlaTask}
        />
      )}
    </>
  );
}
