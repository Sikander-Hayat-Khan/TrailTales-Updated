

import ReactDOM from 'react-dom';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, memoryTitle }: any) => {
  if (!isOpen) return null;

  // Backwards compatibility for Dashboard usage if not updated immediately, 
  // though we will update it.
  const displayTitle = title || "Delete Memory?";
  const displayMessage = message || (
    <>
      Are you sure you want to delete <strong>"{memoryTitle}"</strong>? 
      This action cannot be undone.
    </>
  );

  return ReactDOM.createPortal(
    <div className="modal-overlay active" style={{ zIndex: 9999 }}>
      {/* Ensure CSS has backdrop-filter: blur(5px) on .modal-overlay */}
      <div className="delete-confirm-window">
        <div className="delete-icon-wrapper">
          <i className="ph ph-trash"></i>
        </div>
        <h3>{displayTitle}</h3>
        <p>{displayMessage}</p>
        <div className="delete-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="confirm-delete-btn" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DeleteConfirmationModal;

