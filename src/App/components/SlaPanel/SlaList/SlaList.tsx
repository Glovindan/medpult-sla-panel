import React, { useEffect } from 'react'
import CustomList from '../../../../UIKit/CustomList/CustomList.tsx'
import { SortData, FetchData, ListColumnData, ItemDataString, ItemData } from '../../../../UIKit/CustomList/CustomListTypes.ts'
import SlaBasicColumn from './SlaBasicColumn/SlaBasicColumn.tsx'
import { SlaRowData, SlaStatus } from './slaListTypes.ts'
import SlaStatusColumn from './SlaStatusColumn/SlaStatusColumn.tsx'

/** Список SLA */
export default function SlaList() {
	// Функция для отрисовки колонки с индикатором базового SLA
	const getSlaBasicColumn = (props: ItemData<boolean>) => <SlaBasicColumn data={props} />
	// Функция для отрисовки колонки статуса
	const getSlaStatusColumn = (props: ItemData<SlaStatus>) => <SlaStatusColumn data={props} />

	// Настройка колонок
	const columnsSettings: ListColumnData[] = [
		// Индикатор базового
		new ListColumnData({
			code: "isBasic",
			name: "",
			fr: 1,
			fixedWidth: "52px",
			getCustomColumComponent: getSlaBasicColumn
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
			fr: 1,
			getCustomColumComponent: getSlaStatusColumn
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
			status: new ItemData<SlaStatus>({ value: getRandomElement(Object.values(SlaStatus)), info: getRandomElement(Object.values(SlaStatus)) }),
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
