import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
  allows_write_to_pm: boolean;
}

const initialState: UserState = {
  id: 0,
  first_name: "",
  last_name: "",
  username: "",
  language_code: "",
  allows_write_to_pm: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions

export default userSlice.reducer
