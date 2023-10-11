import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'setNotification':
      return action.payload;
    case 'clearNotification':
      return null;
    default:
      return state;
  }
}

const NotificationContext = createContext()

export const NotificationProvider = (props) => {
  const [state, dispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
