import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface IinitialStateType {
  count: number
  direction?: "L" | "R" | "U" | "D"
  poeArr?: string[]
}

const initialState: IinitialStateType = {
  count: 100
}
const demoSlice = createSlice({
  name: "demo",
  initialState,
  reducers: {
    changeDemo(state, { payload }: PayloadAction<number>) {
      state.count = payload
    }
  }
})

export const { changeDemo } = demoSlice.actions

export default demoSlice.reducer
