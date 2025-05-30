import React, { useEffect } from 'react'
import { slaContext } from '../../stores/SlaContext'
import Panel from '../../../UIKit/Panel/Panel.tsx'
import TabsWrapper from '../../../UIKit/Tabs/TabsWrapper/TabsWrapper.tsx'
import TabItem from '../../../UIKit/Tabs/TabItem/TabItem.tsx'
import SlaList from './SlaList/SlaList.tsx'
/** Панель администрирования SLA */
export default function SlaPanel() {
	const [data, setValue] = slaContext.useState()

	return (
		<Panel label='SLA' isRollable={false}>
			<TabsWrapper>
				<TabItem code={'requests'} name={'Обращения'}>
					<SlaList />
				</TabItem>
				<TabItem code={'tasks'} name={'Задачи'}>
					test1
				</TabItem>
			</TabsWrapper>
		</Panel>
		// TODO: SlaContext
		// Sla modals
		// Sla list
	)
}
