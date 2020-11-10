const Notification = ({ message, messageType }) => {
  if (!message) {
    return null
  }

  return (
    <div className={messageType}>
      {message}
    </div>
  )
}

export default Notification