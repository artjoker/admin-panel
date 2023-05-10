import { message as AntdMessage, MessageArgsProps } from 'antd';

interface IShowErrorToast
  extends Omit<MessageArgsProps, 'content' | 'className' | 'type'> {
  message: string;
}

const showErrorToast = ({ message, ...props }: IShowErrorToast) =>
  AntdMessage.error({
    content: message || 'Error',
    className: 'toast-notification',
    ...props,
  });

export default showErrorToast;
