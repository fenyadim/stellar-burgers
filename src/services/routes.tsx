import {
  IngredientDetails,
  OnlyAuth,
  OnlyUnAuth,
  OrderInfo
} from '@components';
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

export const getConstuctorPath = () => '/';
export const getFeedPath = () => '/feed';
export const getLoginPath = () => '/login';
export const getRegisterPath = () => '/register';
export const getForgotPasswordPath = () => '/forgot-password';
export const getResetPasswordPath = () => '/reset-password';
export const getProfilePath = () => '/profile';
export const getProfileOrdersPath = () => '/profile/orders';
export const getIngredientDetailsPath = (id: string) => `/ingredients/${id}`;
export const getOrderInfoPath = (number: string) => `/feed/${number}`;
export const getProfileOrderInfoPath = (number: string) =>
  `/profile/orders/${number}`;

export const routesConfig: TRoute[] = [
  {
    path: getConstuctorPath(),
    element: <ConstructorPage />
  },
  {
    path: getFeedPath(),
    element: <Feed />
  },

  {
    path: getLoginPath(),
    element: (
      <OnlyUnAuth>
        <Login />
      </OnlyUnAuth>
    )
  },
  {
    path: getRegisterPath(),
    element: (
      <OnlyUnAuth>
        <Register />
      </OnlyUnAuth>
    )
  },
  {
    path: getForgotPasswordPath(),
    element: (
      <OnlyUnAuth>
        <ForgotPassword />
      </OnlyUnAuth>
    )
  },
  {
    path: getResetPasswordPath(),
    element: (
      <OnlyUnAuth>
        <ResetPassword />
      </OnlyUnAuth>
    )
  },
  {
    path: getProfilePath(),
    element: <Profile />,
    isProtected: true
  },
  {
    path: getProfileOrdersPath(),
    element: <ProfileOrders />,
    isProtected: true
  },
  {
    path: getOrderInfoPath(':number'),
    element: <OrderInfo />,
    titleModal: 'Детали заказа'
  },
  {
    path: getIngredientDetailsPath(':id'),
    element: <IngredientDetails />,
    titleModal: 'Ингредиент'
  },
  {
    path: getProfileOrderInfoPath(':number'),
    element: (
      <OnlyAuth>
        <OrderInfo />
      </OnlyAuth>
    ),
    titleModal: 'Детали заказа'
  },
  {
    path: '*',
    element: <NotFound404 />
  }
];
