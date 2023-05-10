import { ModalProps } from 'antd';
import { StyledModal } from './ModalStyles';

export type IModalProps = ModalProps;

const Modal = (props: IModalProps) => <StyledModal {...props} />;

export default Modal;
