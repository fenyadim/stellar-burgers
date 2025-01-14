import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { setBunToOrder, setIngredientToOrder } from '@slices';
import { BurgerIngredientUI } from '@ui';
import { useDispatch } from 'react-redux';
import { TBurgerIngredientProps } from './type';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const handleAdd = () => {
      if (ingredient.type === 'bun') {
        dispatch(setBunToOrder(ingredient));
      } else {
        dispatch(setIngredientToOrder({ ...ingredient, id: ingredient._id }));
      }
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
