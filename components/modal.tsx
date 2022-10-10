import { useRef } from "react";
import styles from "./modal.module.css";

type PropsType = {
  title: string;
  content: string;
  onClose: () => void;
};

const Modal: React.FC<PropsType> = (props) => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={backgroundRef}
      className={styles.background}
      onClick={() => props.onClose()}
    >
      <div className={styles.modal}>
        <div className={styles.modalTitle}>{props.title}</div>
        <div className={styles.modalContent}>{props.content}</div>
      </div>
    </div>
  );
};

export default Modal;
