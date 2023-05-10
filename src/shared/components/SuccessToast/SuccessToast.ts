import { message as AntdMessage, MessageArgsProps } from 'antd';

interface IShowSuccessToast
  extends Omit<MessageArgsProps, 'content' | 'className' | 'type'> {
  message: string;
}

const showSuccessToast = ({ message, ...props }: IShowSuccessToast) =>
  AntdMessage.success({
    content: message || 'Success',
    className: 'toast-notification',
    ...props,
  });

export default showSuccessToast;
