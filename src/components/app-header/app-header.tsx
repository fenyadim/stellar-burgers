import { userDataSelector } from '@services/slices';
import { useSelector } from '@services/store';
import { AppHeaderUI } from '@ui';
import { FC } from 'react';

export const AppHeader: FC = () => {
  const user = useSelector(userDataSelector);
  return <AppHeaderUI userName={user?.name} />;
};
