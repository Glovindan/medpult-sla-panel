import React, { useEffect } from 'react'
import { slaContext } from '../../../stores/SlaContext.ts'
import Panel from '../../../../UIKit/Panel/Panel.tsx'
import TabsWrapper from '../../../../UIKit/Tabs/TabsWrapper/TabsWrapper.tsx'
import TabItem from '../../../../UIKit/CustomList/CustomList.tsx'
import CustomList from '../../../../UIKit/CustomList/CustomList.tsx'
import { SortData, FetchData, ListColumnData, ItemDataString, ItemData } from '../../../../UIKit/CustomList/CustomListTypes.ts'
import icons from '../../../shared/icons.tsx'
/** Статус SLA */
enum SlaStatus {
	/** Действует */
	valid = "valid",
	/** Действует и есть запланированное */
	validPlanned = "validPlanned",
	/** Планируется */
	planned = "planned",
	/** Истекло */
	expired = "expired"
}

/** Значение строки Sla */
interface SlaRowData {
	/** Идентификатор */
	id: ItemDataString;
	/** Является базовым */
	isBasic: ItemData<boolean>;
	/** Показатель (Тип SLA) */
	type: ItemDataString;
	/** Значение показателя */
	value: ItemDataString;
	/** Статус */
	status: ItemData<SlaStatus>;
	/** Дата начала  */
	startDate: ItemDataString;
	/** Дата окончания */
	endDate: ItemDataString;
	/** Тип задачи */
	taskType: ItemDataString;
	/** Вид задачи */
	taskSort: ItemDataString;
	/** Тематика */
	topic: ItemDataString;
	/** Срочность */
	urgency: ItemDataString;
}

/** Список SLA */
export default function SlaList() {
	const getComponent = (props: ItemData<boolean>) => { 
		return <div>{props.info && icons.Star}</div>
	}

	// Настройка колонок
	const columnsSettings: ListColumnData[] = [
		// Индикатор базового
		new ListColumnData({
			code: "isBasic",
			name: "",
			fr: 1,
			getCustomColumComponent: getComponent
		}),
		// Показатель (Тип SLA)
		new ListColumnData({
			code: "type",
			name: "Показатель",
			fr: 1
		}),
		// Значение показателя
		new ListColumnData({
			code: "value",
			name: "Значение показателя",
			fr: 1
		}),
		// Статус TODO: Добавить обработку кастомного компонента
		new ListColumnData({
			code: "status",
			name: "Статус",
			fr: 1
		}),
		// Дата начала 
		new ListColumnData({
			code: "startDate",
			name: "Дата начала",
			fr: 1
		}),
		// Дата окончания
		new ListColumnData({
			code: "endDate",
			name: "Дата окончания",
			fr: 1
		}),
		// TODO: Признак ВИП
		// Тип задачи
		new ListColumnData({
			code: "taskType",
			name: "Тип задачи",
			fr: 1
		}),
		// Вид задачи
		new ListColumnData({
			code: "taskSort",
			name: "Вид задачи",
			fr: 1
		}),
		// Тематика
		new ListColumnData({
			code: "topic",
			name: "Тематика",
			fr: 1
		}),
		// Срочность
		new ListColumnData({
			code: "urgency",
			name: "Срочность",
			fr: 1
		}),
		// TODO: Продукт
		// TODO: Страхователь
		// Кнопка изменения
		new ListColumnData({
			code: "id",
			name: "",
			fr: 1
		}),
		// Кнопка разворачивания
		new ListColumnData({
			code: "id",
			name: "",
			fr: 1
		})
	]

	function getRandomElement<T>(arr: T[]): T {
		return arr[Math.floor(Math.random() * arr.length)];
	}

	function getRandomDate(): string {
		const start = new Date(2023, 0, 1).getTime();
		const end = new Date(2025, 11, 31).getTime();
		const date = new Date(start + Math.random() * (end - start));
		return date.toISOString().split('T')[0];
	}

	function generateRandomSlaRowData(): SlaRowData {
		return {
			id: new ItemDataString(`sla-${Math.floor(Math.random() * 10000)}`),
			isBasic: new ItemData({ value: Math.random() > 0.5 ? "true" : "false", info: Math.random() > 0.5 }),
			type: new ItemDataString(getRandomElement(["Response Time", "Resolution Time", "Availability"])),
			value: new ItemDataString(`${Math.floor(Math.random() * 72)}h`),
			status: new ItemData<SlaStatus>({ value: getRandomElement(Object.values(SlaStatus)), info: undefined }),
			startDate: new ItemDataString(getRandomDate()),
			endDate: new ItemDataString(getRandomDate()),
			taskType: new ItemDataString(getRandomElement(["Incident", "Service Request", "Change"])),
			taskSort: new ItemDataString(getRandomElement(["Standard", "Emergency", "Normal"])),
			topic: new ItemDataString(getRandomElement(["Network", "Hardware", "Software", "Security"])),
			urgency: new ItemDataString(getRandomElement(["Low", "Medium", "High", "Critical"]))
		};
	}

	// Пример использования:
	const randomSla = generateRandomSlaRowData();
	console.log(randomSla);

	// Получение данных
	const getDataHandler = async (page: number, sortData?: SortData, searchData?: any): Promise<FetchData<SlaRowData>> => {
		const items = Array.from({ length: 10 }).map(item => {
			const rowData = generateRandomSlaRowData();
			return {
				id: rowData.id.value,
				data: rowData
			}
		});

		return {
			hasMore: false,
			items: items
		}
	}

	return (
		<CustomList columnsSettings={columnsSettings} getDataHandler={getDataHandler} isScrollable={false}/>
	)
}
