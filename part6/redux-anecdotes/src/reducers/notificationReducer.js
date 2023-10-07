import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: ''
}

export const showNotification = content => dispatch => {
    dispatch(setNotification(content))
    console.log('showNotification: ', content)
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
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
