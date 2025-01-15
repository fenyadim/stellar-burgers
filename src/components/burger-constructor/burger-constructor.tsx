import {
  clearConstructorData,
  clearOrder,
  createOrderThunk,
  getBunSelector,
  getIngredientsSelector,
  getOrderModal,
  getOrderRequest,
  userDataSelector
} from '@slices';
import { BurgerConstructorUI } from '@ui';
import { TConstructorIngredient } from '@utils-types';
import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';

export const BurgerConstructor: FC = () => {
  const bun = useSelector(getBunSelector);
  const ingredients = useSelector(getIngredientsSelector);
  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrderModal);
  const user = useSelector(userDataSelector);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const constructorItems = {
    bun,
    ingredients
  };

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    const data = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map(({ _id }) => _id),
      constructorItems.bun._id
    ];

    if (!user) {
      navigate('/login', { state: { from: '/' } });
    }

    dispatch(createOrderThunk(data));
  };
  const closeOrderModal = () => {
    dispatch(clearConstructorData());
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
