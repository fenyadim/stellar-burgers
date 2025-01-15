import { userDataSelector } from '@slices';
import { AppHeaderUI } from '@ui';
import { FC } from 'react';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const user = useSelector(userDataSelector);
  return <AppHeaderUI userName={user?.name} />;
};
