import { Navigate } from 'react-router-dom';

interface IPrivateRouteProps {
  redirectTo: string;
  children: JSX.Element;
  isAuth: boolean;
}

export const PrivateRoute = ({
  children,
  redirectTo,
  isAuth,
}: IPrivateRouteProps) => (isAuth ? children : <Navigate to={redirectTo} />);
