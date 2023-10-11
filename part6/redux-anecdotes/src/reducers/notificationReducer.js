import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: ''
}

export const showNotification = (content, timeInSeconds) => dispatch => {
    dispatch(setNotification(content))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeInSeconds * 1000)
  }
  
const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.message = action.payload
    },
    clearNotification: (state) => {
      state.message = ''
    },
  },
})

export const { setNotification, clearNotification } = notificationsSlice.actions
export default notificationsSlice.reducer
