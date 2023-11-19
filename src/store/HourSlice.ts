import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface HourState {
  value: number;
  date: string;
}


const initialState: HourState = {
  value: -1,
  date: ''
}

export const hourSlice = createSlice({
  name: 'hour',
  initialState,
  reducers: {
    set: (state :HourState, action: PayloadAction<HourState>) => {
      state.value = action.payload.value
      state.date = action.payload.date
    },
  },
})

export const {set} = hourSlice.actions

export default hourSlice.reducer