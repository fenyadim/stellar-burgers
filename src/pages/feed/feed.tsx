import { getFeedsThunk, ordersFeedsSelector } from '@services/slices';
import { useDispatch, useSelector } from '@services/store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';

export const Feed: FC = () => {
  const orders = useSelector(ordersFeedsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedsThunk());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
