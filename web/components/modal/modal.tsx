import {
  Modal as ModalComponent,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import { FC, useCallback } from 'react';

interface IModalProps {
  isOpen: boolean;
  children?: React.ReactNode;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
}

const Modal: FC<IModalProps> = ({
  isOpen,
  children,
  onClose,
  onSubmit,
  title,
  disabled = false
}) => {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  if (!isOpen) {
    return null;
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.code === 'Enter' && disabled === false) {
      onSubmit();
    }
  };

  return (
    <ModalComponent onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        {children}
      </ModalContent>
    </ModalComponent>
  );
};

export default Modal;
