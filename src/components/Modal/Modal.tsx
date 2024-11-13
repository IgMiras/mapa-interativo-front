import React, { useState } from 'react';
import { ModalOverlay, ModalContainer, ModalTitle, Button } from './style';

interface ModalProps {
  onClose: () => void;
  onSubmit: (type: string) => void;
}

const Modal: React.FC<ModalProps> = ({ onClose, onSubmit }) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleSubmit = () => {
    if (selectedType) {
      onSubmit(selectedType);
    }
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalTitle>Selecione uma Ocorrência</ModalTitle>
        <div>
          <Button onClick={() => setSelectedType('obra')}>Obra</Button>
          <Button onClick={() => setSelectedType('blitz')}>Blitz</Button>
          <Button onClick={() => setSelectedType('acidente')}>Acidente</Button>
        </div>
        <div style={{ marginTop: '20px' }}>
          <Button onClick={handleSubmit}>Confirmar</Button>
          <Button onClick={onClose}>Cancelar</Button>
        </div>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
