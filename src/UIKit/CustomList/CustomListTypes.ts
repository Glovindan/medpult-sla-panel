import { SlaRowDataGroup } from "../../App/components/SlaPanel/SlaList/slaListTypes";
/** Атрибуты функции получения разметки деталей строки списка */
export interface getDetailsLayoutAttributes {
  /** Сокращенные данные строки */
  rowData: any;
  /** Обработчик нажатия на строку */
  onClickRowHandler: any;
  /** Перезагрузка списка */
  reloadData: () => void;
}

/** Данные сортировки */
export class SortData {
  /** Код колонки списка */
  code: string;
  /** Флажок по возрастанию */
  isAscending: boolean;

  constructor({ code, isAscending }: { code?: string; isAscending?: boolean }) {
    this.code = code ?? "";
    this.isAscending = isAscending ?? true;
  }
}

/** Данные столбца таблицы */
export class ListColumnData {
  /** Коэффициент соотношения ширины столбца */
  fr: number;
  /** Фиксированная ширина столбца */
  fixedWidth: string;
  /** Кастомные настройки отступа вокруг содержания ячейки таблицы */
  contentPadding: string;
  /** Можно ли по этому столбцу сортировать */
  isSortable: boolean;
  /** Хранит ли по столбец ссылки */
  isLink: boolean;
  /** Название столбца */
  name: string;
  /** Код значения */
  code: string;
  /** Обработчик нажатия */
  onClick?: (props: ItemData) => any;
  /** Разворачиваемый ли столбец */
  isRollable: boolean;
  /** Кастомный компонент колонки */
  getCustomColumComponent?: (props: any) => JSX.Element;

  constructor({
    name,
    code,
    fr,
    isSortable,
    isLink,
    onClick,
    isRollable,
    getCustomColumComponent,
    fixedWidth,
    contentPadding,
  }: {
    name: string;
    code: string;
    fr?: number;
    isSortable?: boolean;
    isLink?: boolean;
    onClick?: (props: any) => any;
    isRollable?: boolean;
    getCustomColumComponent?: (props: any) => JSX.Element;
    fixedWidth?: string;
    contentPadding?: string;
  }) {
    this.fr = fr ?? 1;
    this.isSortable = isSortable ?? false;
    this.isLink = isLink ?? false;

    if (onClick) this.onClick = onClick;
    if (getCustomColumComponent)
      this.getCustomColumComponent = getCustomColumComponent;

    this.name = name;
    this.code = code;
    this.isRollable = isRollable ?? false;
    if (fixedWidth) this.fixedWidth = fixedWidth;
    if (contentPadding) this.contentPadding = contentPadding;
  }
}

/** Значение колонки */
export class ItemData<InfoType = string> {
  /** Значение */
  value: string;
  /** Дополнительная информация */
  info?: InfoType;

  constructor({ value, info }: { value?: string; info?: InfoType }) {
    this.value = value ?? "";
    if (info) this.info = info;
  }
}

/** Строковое значение колонки */
export class ItemDataString extends ItemData<undefined> {
  constructor(value: string) {
    super({ value: value });
  }
}

/** Значение элемента списка */
export interface FetchItem<DataType = any> {
  /** Идентификатор элемента */
  id: string;
  /** Данные элемента */
  data: DataType;
}

/** Ответ запроса данных с сервера */
export interface FetchData<DataType> {
  /** Данные */
  items: FetchItem<DataType>[];
  /** Доступны ли еще данные для подгрузки? */
  hasMore: boolean;
}

export interface CustomColumnProps<T> {
  value: ItemData<T>;
  rowData: SlaRowDataGroup;
}
