function StateMessage({ title, message, tone = 'quiet' }) {
  return (
    <div className={`state-message ${tone}`}>
      <h2>{title}</h2>
      {message && <p>{message}</p>}
    </div>
  )
}

export default StateMessage
