import styles from './constructor-page.module.css';

import { isIngredientsLoadingSelector } from '@services/slices';
import { useSelector } from '@services/store';
import { FC } from 'react';
import { BurgerConstructor, BurgerIngredients } from '../../components';
import { Preloader } from '../../components/ui';

export const ConstructorPage: FC = () => {
  const isIngredientsLoading = useSelector(isIngredientsLoadingSelector);

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
