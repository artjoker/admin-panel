import { ReactNode } from 'react';
import { Form as AntdForm, FormProps, FormInstance } from 'antd';

export interface IFormProps extends FormProps {
  children: ReactNode;
}

export type IFormInstance = FormInstance;
export type TFieldsErrors = ReturnType<IFormInstance['getFieldsError']>;

export const { useForm, useWatch: useWatchForm, useFormInstance } = AntdForm;

const Form = (props: IFormProps) => <AntdForm layout="vertical" {...props} />;

export default Form;
