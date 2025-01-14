import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { addIngredient, setBun } from '@slices';
import { BurgerIngredientUI } from '@ui';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { TBurgerIngredientProps } from './type';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const handleAdd = () => {
      if (ingredient.type === 'bun') {
        dispatch(setBun(ingredient));
      } else {
        dispatch(
          addIngredient({
            ...ingredient,
            id: uuidv4()
          })
        );
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
