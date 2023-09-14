import React from 'react'
import '../index.css'
import PropTypes from 'prop-types'

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

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  classname: PropTypes.string.isRequired
}

export default Notification