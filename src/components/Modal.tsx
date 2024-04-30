import { FC } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

const ModalWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContent = styled(motion.div)`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  border: 2px solid black;

  font-size: 1.5rem;
  font-weight: 700;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  width: 500px;
  height: 200px;

  button {
    padding-top: 5px;
    padding-bottom: 5px;

    background-color: #daf8e3;

    border-radius: 8px;
    border: none;

    width: 100px;
    height: 30px;
    margin-top: 20px;
  }

  button:hover {
    width: 120px;
    height: 40px;
    font-weight: 700;
  }
`;

interface WinnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: FC<WinnerModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <ModalWrapper
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ModalContent>
            {children}
            <button onClick={onClose}>확인</button>
          </ModalContent>
        </ModalWrapper>
      )}
    </AnimatePresence>
  );
};

export default Modal;
