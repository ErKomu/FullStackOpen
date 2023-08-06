import React from 'react';
import '../index.css'

const Notification = ({ message, classname }) => {
    
    if (message === '') {
      return null
    }

    return (
      <div className={classname}>
        {message}
      </div>
    )    
  }

  export default Notification;