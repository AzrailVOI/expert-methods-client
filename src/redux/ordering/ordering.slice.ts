import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IOrdering {
	orderingLetter: string
	orderingMatrix: number[][]
}
const initialState: IOrdering[] = []
export const orderingSlice = createSlice({
	name: 'mismatch',
	initialState,
	reducers: {
		addOrderingMatrix: (state, action: PayloadAction<IOrdering>) => {
			return state
				.filter(
					(ordering: IOrdering) =>
						ordering.orderingLetter !== action.payload.orderingLetter
				)
				.concat({
					orderingLetter: action.payload.orderingLetter,
					orderingMatrix: action.payload.orderingMatrix
				})
		}
	}
})

export const { addOrderingMatrix } = orderingSlice.actions

export default orderingSlice.reducer
