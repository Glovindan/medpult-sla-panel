import React, { useEffect } from 'react'
import CustomList from '../../../../../UIKit/CustomList/CustomList.tsx'
import { SortData, FetchData, ListColumnData, ItemDataString, ItemData } from '../../../../../UIKit/CustomList/CustomListTypes.ts'
import icons from '../../../../shared/icons.tsx'
import { CreatorEditorData } from '../slaListTypes.ts'

type CreateEditDataColumnProps = {
	data: ItemData<CreatorEditorData>
}
/** Колонка с данными автора и редактора SLA */
export default function CreatorEditorDataColumn({data} : CreateEditDataColumnProps) {

	// TODO: Реализовать
	return (
		<div className='creator-editor-data'>{`${data.info?.createdBy ?? "-"} / ${data.info?.updatedBy ?? "-"}`}</div>
	)
}
