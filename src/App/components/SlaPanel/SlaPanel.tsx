import React, { useEffect, useState } from 'react'
import { slaContext } from '../../stores/SlaContext'
import Panel from '../../../UIKit/Panel/Panel.tsx'
import TabsWrapper from '../../../UIKit/Tabs/TabsWrapper/TabsWrapper.tsx'
import TabItem from '../../../UIKit/Tabs/TabItem/TabItem.tsx'
import SlaList from './SlaList/SlaList.tsx'
import { FetchData } from '../../../UIKit/CustomList/CustomListTypes.ts'
import { SlaRowDataGroup } from './SlaList/slaListTypes.ts'

import Scripts from '../../shared/utils/clientScripts.ts'
/** Панель администрирования SLA */
export default function SlaPanel() {
	const [data, setValue] = slaContext.useState()

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [slaData, setSlaData] = useState<FetchData<SlaRowDataGroup> | undefined>();

	// Загрузка всех SLA
	useEffect(() => {
		setIsLoading(true);

		Scripts.getSla().then(slaData => {
			setSlaData(slaData);
			setIsLoading(false)
		})
	}, [])

	/** Получение всех SLA */
	async function getSlaHandler(): Promise<FetchData<SlaRowDataGroup>> {
		if(!slaData) {
			return {
				hasMore: false,
				items: []
			}
		}

		return slaData;
	}

	// Получение SLA для Задач
	// Получение SLA для Обращений

	return (
		<slaContext.Provider value={{ data, setValue }}>
			<Panel label='SLA' isRollable={false}>
				<TabsWrapper>
					<TabItem code={'requests'} name={'Обращения'}>
						<SlaList getSlaHandler={getSlaHandler} isLoading={isLoading}/>
					</TabItem>
					<TabItem code={'tasks'} name={'Задачи'}>
						test1
					</TabItem>
				</TabsWrapper>
			</Panel>
		</slaContext.Provider>
	)
}
