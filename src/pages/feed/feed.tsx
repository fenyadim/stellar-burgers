import {
  getFeedsThunk,
  getIngredientsThunk,
  ordersFeedsSelector
} from '@slices';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const orders = useSelector(ordersFeedsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedsThunk());
    dispatch(getIngredientsThunk());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  const handleGetFeeds = () => {
    dispatch(getFeedsThunk());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
