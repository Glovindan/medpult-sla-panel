import React from "react";
import CustomListRowColumn from "../CustomListRowColumn/CustomListRowColumn";
import {
  ItemData,
  ListColumnData,
  getDetailsLayoutAttributes,
} from "../CustomListTypes";
import CustomListSelector from "../CustomListSelector/CustomListSelector";

interface ListRowProps<ItemType = any> {
  /** Настройки строки (обязательно) */
  /** Параметры отображения колонки */
  columnsSettings: ListColumnData[];
  /** Данные строки */
  data: ItemType;

  /** Настройки открытия детальной информации по строке (Необязательно) */
  /** Показать детальную информацию */
  isShowDetails?: boolean;
  /** Обработчик нажатия на строку */
  setOpenRowIndex?: () => any;
  /** Функция получения разметки детальной информации строки списка */
  getDetailsLayout?: ({
    rowData,
    onClickRowHandler,
  }: getDetailsLayoutAttributes) => any;

  /** Строгие настройки отображения строки списка (Необязательно) */
  /** Открыта */
  isOpen?: boolean;
  /** Кликабельна */
  isClickable?: boolean;

  reloadData: () => void;

  listRef?: React.RefObject<HTMLDivElement>;

  /** Возможность выбора строки */
  isSelectable?: boolean;
  /** Множественный выбор строк */
  isMultipleSelect?: boolean;

  /** Изменить выбор строки */
  toggleChecked: () => void;
  /** Селектор активен */
  isChecked: boolean;

  /** Идентификатор подсвечиваемой строки */
  highlightedId: string | undefined;
  /** Массив элементов списка */
  highlightRefs: React.MutableRefObject<{}>;
  /** Идентификатор строки */
  rowId: string;
}

/** Строка таблицы */
function CustomListRow<ItemType = any>(props: ListRowProps<ItemType>) {
  const {
    isShowDetails,
    columnsSettings,
    data,
    getDetailsLayout,
    setOpenRowIndex,
    isOpen,
    isClickable,
    reloadData,
    listRef,
    isSelectable,
    isMultipleSelect,
    toggleChecked,
    isChecked,
    highlightedId,
    highlightRefs,
    rowId,
  } = props;

  /** Получение значения класса строки */
  const hasGroup =
    Array.isArray((data as any).groupData) &&
    (data as any).groupData.length > 0;

  /** Получение значения класса строки */
  const getRowClassname = (): string => {
    // Базовое наименование класса
    const baseClassName = "custom-list-row"
    let classNamesArr = [baseClassName];
    
    if (((getDetailsLayout && isShowDetails) || isOpen) && hasGroup) {
      // Для раскрытых строк
      classNamesArr.push("custom-list-row_open")
    } else if (getDetailsLayout || isClickable) {
      // Для раскрываемых строк
      classNamesArr.push("custom-list-row_openable")
    }

    // Для подсветки
    if(highlightedId == rowId) {
      classNamesArr.push("custom-list-row_highlight")
    }

    return classNamesArr.join(" ");
  };

  const rowStyles: React.CSSProperties = {
    //overflow: "visible",
    overflow: "hidden",
  };
  // if (!isSelectable) rowStyles.paddingLeft = `20px`;

  return (
    <>
      <div
        className={getRowClassname()}
        onClick={setOpenRowIndex}
        style={rowStyles}
        ref={(el) => (highlightRefs.current[rowId] = el)}
      >
        {/* Селектор */}
        {isSelectable && (
          <CustomListSelector
            onClickSelector={toggleChecked}
            isMultiple={isMultipleSelect}
            isChecked={isChecked}
          />
        )}
        {/* Колонки с данными */}
        {columnsSettings.map((settings) => {
          if (data == undefined) {
            return;
          }
          const columnData: ItemData<any> = data[settings.code];

          return (
            <CustomListRowColumn
              listRef={listRef}
              data={columnData}
              {...settings}
              isOpen={isShowDetails}
              rowData={data}
            />
          );
        })}
      </div>

      {/* Заменять строку на разметку деталей строки списка */}
      {isShowDetails && getDetailsLayout && (
        <div className="custom-list-row-details">
          {getDetailsLayout({
            rowData: data,
            reloadData,
            onClickRowHandler: setOpenRowIndex,
          })}
        </div>
      )}
    </>
  );
}

export default CustomListRow;
