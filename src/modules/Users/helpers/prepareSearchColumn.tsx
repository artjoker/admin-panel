import Highlighter from 'react-highlight-words';
import { ColumnType } from 'antd/es/table';

import { IUser } from '@/models/user.model';
import { COLORS } from '@/theme';

import FiltersDropdown from '../components/FiltersDropdown/FiltersDropdown';
import { SearchOutlined } from '@ant-design/icons';

interface IPrepareSearchColumnParams {
  filterValue?: string;
}

export const prepareSearchColumn = ({
  filterValue,
}: IPrepareSearchColumnParams): ColumnType<IUser> => ({
  filterDropdown: (props) => <FiltersDropdown {...props} />,
  filterIcon: (filtered: boolean) => <SearchOutlined />,
  render: (text) =>
    filterValue ? (
      <Highlighter
        highlightStyle={{ backgroundColor: COLORS.HIGHLIGHTED, padding: 0 }}
        searchWords={[filterValue]}
        textToHighlight={text ? text.toString() : ''}
        autoEscape
      />
    ) : (
      text
    ),
});
