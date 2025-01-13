import { ordersFeedsSelector } from '@services/slices';
import { useSelector } from '@services/store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';

export const Feed: FC = () => {
  const orders = useSelector(ordersFeedsSelector);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
