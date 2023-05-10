import { MenuProps } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { StyledMenu } from './MenuStyles';

export type IMenu = MenuProps;
export type IMenuItemType = ItemType;

const Menu = (props: IMenu) => <StyledMenu {...props} />;

export default Menu;
