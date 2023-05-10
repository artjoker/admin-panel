import { Outlet } from 'react-router-dom';
import 'antd/dist/reset.css';

import { Layout, LayoutHeader, LayoutContent } from '@/ui';
import { NavMenu } from '@/modules/Layout/components';

interface IPrivateLayoutProps {}

const PrivateLayout = ({}: IPrivateLayoutProps) => {
  return (
    <Layout>
      <LayoutHeader>
        <NavMenu />
      </LayoutHeader>
      <LayoutContent>
        <Outlet />
      </LayoutContent>
    </Layout>
  );
};

export default PrivateLayout;
