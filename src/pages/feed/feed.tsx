import { getFeedsThunk, ordersFeedsSelector } from '@slices';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const orders = useSelector(ordersFeedsSelector);
  const dispatch = useDispatch();

  if (!orders.length) {
    return <Preloader />;
  }

  const handleGetFeeds = () => {
    dispatch(getFeedsThunk());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
