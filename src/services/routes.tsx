import { IngredientDetails, Modal, OrderInfo } from '@components';
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
    element: (
      <Modal title='Детали заказа' onClose={() => null}>
        <OrderInfo />
      </Modal>
    )
  },
  {
    path: '/ingredients/:id',
    element: (
      <Modal title='Ингредиенты' onClose={() => null}>
        <IngredientDetails />
      </Modal>
    )
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
    element: (
      <Modal title='Детали заказа' onClose={() => null}>
        <OrderInfo />
      </Modal>
    )
  },
  {
    path: '*',
    element: <NotFound404 />
  }
];
