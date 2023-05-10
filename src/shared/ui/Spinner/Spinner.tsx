import { Spin, SpinProps } from 'antd';
import { SpinnerWrapper } from './SpinnerStyles';

export type ISpinnerProps = SpinProps;

const Spinner = (props: ISpinnerProps) => {
  return (
    <SpinnerWrapper>
      <Spin {...props} />
    </SpinnerWrapper>
  );
};

export default Spinner;
