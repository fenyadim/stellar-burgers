import { IngredientDetails, OrderInfo } from '@components';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';

type TRoute = {
  path: string;
  element: JSX.Element;
  titleModal?: string;
  isProtected?: boolean;
};

export const routesConfig: TRoute[] = [
  {
    path: '/',
    element: <ConstructorPage />
  },
  {
    path: '/feed',
    element: <Feed />
  },
  {
    path: '/feed/:number',
    element: <OrderInfo />,
    titleModal: 'Детали заказа'
  },
  {
    path: '/ingredients/:id',
    element: <IngredientDetails />,
    titleModal: 'Ингредиент'
  },
  {
    path: '/login',
    element: <Login />,
    isProtected: true
  },
  {
    path: '/register',
    element: <Register />,
    isProtected: true
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
    isProtected: true
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
    isProtected: true
  },
  {
    path: '/profile',
    element: <Profile />,
    isProtected: true
  },
  {
    path: '/profile/orders',
    element: <ProfileOrders />,
    isProtected: true
  },
  {
    path: '/profile/orders/:number',
    element: <OrderInfo />,
    titleModal: 'Детали заказа'
  },
  {
    path: '*',
    element: <NotFound404 />
  }
];
