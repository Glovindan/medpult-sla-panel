import React, { useEffect } from 'react'
import { ItemData, ItemDataString } from '../../../../../UIKit/CustomList/CustomListTypes.ts'
import icons from '../../../../shared/icons.tsx'
import { SlaStatus, SlaStatusNames } from '../slaListTypes.ts'

type SlaStatusColumnProps = {
	data: ItemData<SlaStatus>
}
/** Колонка с индикатором базового SLA */
export default function SlaStatusColumn({data} : SlaStatusColumnProps) {
	// Получить значение статуса SLA
	const getSlaStatusName = () => {
		switch(data.info) {
			case(SlaStatus.valid): return SlaStatusNames.valid
			case(SlaStatus.validPlanned): return SlaStatusNames.valid
			case(SlaStatus.planned): return SlaStatusNames.planned
			case(SlaStatus.expired): return SlaStatusNames.expired
		}
	}
	
	// Получить цвет статуса SLA
	const getSlaStatusColor = () => {
		switch(data.info) {
			case(SlaStatus.valid): 
			case(SlaStatus.validPlanned): return "#81E592"
			case(SlaStatus.planned): return "#E7F5B6"
			case(SlaStatus.expired): return "#FFB5B5"
		}
	}

	return (
		<div className='sla-status-column'>
			<div className='sla-status-column__value' style={{background: getSlaStatusColor()}}>{getSlaStatusName()}</div>
			<div>{data.info == SlaStatus.validPlanned && icons.Clock}</div>
		</div>
	)
}
