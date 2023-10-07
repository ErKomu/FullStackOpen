import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(state => state)
  
  let style = {}
  if (notification.anecdoteNotification.message !== '') {
    style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
  }

  return (
    <div style={style}>
      {notification.anecdoteNotification.message}
    </div>
  )
}

export default Notification