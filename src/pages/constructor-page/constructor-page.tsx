import styles from './constructor-page.module.css';

import { getIngredientsThunk, isIngredientsLoadingSelector } from '@slices';
import { FC, useEffect } from 'react';
import { BurgerConstructor, BurgerIngredients } from '../../components';
import { Preloader } from '../../components/ui';
import { useDispatch, useSelector } from '../../services/store';

export const ConstructorPage: FC = () => {
  const isIngredientsLoading = useSelector(isIngredientsLoadingSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsThunk());
  }, []);

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
