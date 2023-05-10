import { Dayjs } from 'dayjs';
import { PickerProps } from 'antd/lib/date-picker/generatePicker';
import { CalendarOutlined } from '@ant-design/icons';

import StaticLabel from '../StaticLabel/StaticLabel';
import { StyledDatePicker } from './DatePickerStyles';

type IDatePicker = PickerProps<Dayjs> & {
  label: string;
  withRequiredMark?: boolean;
};

const DatePicker = ({
  id,
  label,
  value,
  withRequiredMark,
  ...props
}: IDatePicker) => (
  <StaticLabel label={label} id={id} withRequiredMark={withRequiredMark}>
    <StyledDatePicker
      {...props}
      value={value}
      suffixIcon={<CalendarOutlined />}
    />
  </StaticLabel>
);

export default DatePicker;
