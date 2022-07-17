export default function Modal ({ show, onClose, children }) {
  const handleClose = e => {
    if (e.currentTarget === e.target) {
      onClose()
    }
  }
  return (
    <div className={`modal ${show ? 'modal-open' : ''}`} onClick={handleClose}>
      <div className="modal-box">{children}</div>
    </div>
  )
}
