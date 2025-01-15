import { FC } from 'react';

import {
  ordersFeedsSelector,
  totalFeedsSelector,
  totalTodayFeedsSelector
} from '@slices';
import { TOrder } from '@utils-types';
import { useSelector } from '../../services/store';
import { FeedInfoUI } from '../ui/feed-info';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders = useSelector(ordersFeedsSelector);
  const total = useSelector(totalFeedsSelector);
  const totalToday = useSelector(totalTodayFeedsSelector);
  const feed = { total, totalToday };

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
