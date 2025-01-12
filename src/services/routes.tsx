import { IngredientDetails, OnlyUnAuth, OrderInfo } from '@components';
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
    element: (
      <OnlyUnAuth>
        <Login />
      </OnlyUnAuth>
    )
  },
  {
    path: '/register',
    element: (
      <OnlyUnAuth>
        <Register />
      </OnlyUnAuth>
    )
  },
  {
    path: '/forgot-password',
    element: (
      <OnlyUnAuth>
        <ForgotPassword />
      </OnlyUnAuth>
    )
  },
  {
    path: '/reset-password',
    element: (
      <OnlyUnAuth>
        <ResetPassword />
      </OnlyUnAuth>
    )
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
