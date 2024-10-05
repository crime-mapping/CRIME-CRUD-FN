// ConfirmationModal.tsx
import React from 'react';
import '../styles/confirmationModel.css'

interface ConfirmationModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  message,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal-content">
        <h3 className="confirm-modal-title">Confirmation</h3>
        <p>{message}</p>
        <div className="confirm-modal-actions">
          <button className="confirm-button" onClick={onConfirm}>
            Yes
          </button>
          <button className="cancel-button" onClick={onClose}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
