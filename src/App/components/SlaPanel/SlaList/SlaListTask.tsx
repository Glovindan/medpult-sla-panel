import React, { useEffect } from "react";
import CustomList from "../../../../UIKit/CustomList/CustomList.tsx";
import {
  SortData,
  FetchData,
  ListColumnData,
  ItemDataString,
  ItemData,
  getDetailsLayoutAttributes,
} from "../../../../UIKit/CustomList/CustomListTypes.ts";
import SlaBasicColumn from "./SlaListColumn/SlaBasicColumn/SlaBasicColumn.tsx";
import {
  CreatorEditorData,
  SlaRowDataGroupTask,
  SlaStatus,
} from "./slaListTypes.ts";
import SlaStatusColumn from "./SlaListColumn/SlaStatusColumn/SlaStatusColumn.tsx";
import SlaEditColumn from "./SlaListColumn/SlaEditColumn/SlaEditColumn.tsx";
import SlaOpenColumn from "./SlaListColumn/SlaOpenColumn/SlaOpenColumn.tsx";
import CreatorEditorDataColumn from "./SlaListColumn/CreatorEditorDataColumn/CreateEditDataColumn.tsx";
import Loader from "../../../../UIKit/Loader/Loader.tsx";

/** Пропсы списка SLA */
type SlaListProps = {
  /** Получение данных SLA */
  getSlaHandler(): Promise<FetchData<SlaRowDataGroupTask>>;
  /** Флаг загрузки */
  isLoading: boolean;
};

interface getSlaListDetailsLayoutAttributes extends getDetailsLayoutAttributes {
  rowData: SlaRowDataGroupTask;
}

/** Список SLA */
export default function SlaListTask({
  getSlaHandler,
  isLoading,
}: SlaListProps) {
  // Функция для отрисовки колонки с индикатором базового SLA
  const getSlaBasicColumn = (props: ItemData<boolean>) => (
    <SlaBasicColumn data={props} />
  );
  // Функция для отрисовки колонки статуса
  const getSlaStatusColumn = (props: ItemData<SlaStatus>) => (
    <SlaStatusColumn data={props} />
  );
  // Функция для отрисовки колонки с кнопкой редактирования
  const getEditColumn = (props: ItemDataString) => (
    <SlaEditColumn data={props} />
  );
  // Функция для отрисовки колонки с кнопкой треугольником
  const getOpenColumn = (props: ItemDataString) => (
    <SlaOpenColumn data={props} />
  );
  // Функция для отрисовки колонки с данными автора и редактора
  const getCreatorEditorDataColumn = (props: ItemData<CreatorEditorData>) => (
    <CreatorEditorDataColumn data={props} />
  );

  async function getSubSla(
    id: string
  ): Promise<FetchData<SlaRowDataGroupTask>> {
    // Все SLA
    const sla = await getSlaHandler();
    // Искомый SLA
    const findSla = sla.items.find((item) => item.id == id);
    return {
      hasMore: false,
      items:
        findSla?.data.groupData.map((item) => {
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
    // return (
    // 	<SlaList
    // 		getSlaHandler={() => getSubSla(rowData.id.value)}
    // 		isLoading={false}
    // 	/>
    // )
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
      fixedWidth: "36px",
      getCustomColumComponent: getEditColumn,
    }),
    // Кнопка разворачивания
    new ListColumnData({
      code: "id",
      name: "",
      fr: 1,
      fixedWidth: "36px",
      getCustomColumComponent: getOpenColumn,
    }),
  ];

  return (
    <>
      {!isLoading && (
        <CustomList
          columnsSettings={columnsSettings}
          getDataHandler={getSlaHandler}
          isScrollable={
            false
          } /* getDetailsLayout={getCustomListDetailsLayout} */
        />
      )}
      {isLoading && <Loader />}
    </>
  );
}
