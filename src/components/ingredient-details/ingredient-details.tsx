import { ingredientsSelector } from '@services/slices';
import { useSelector } from '@services/store';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { Preloader } from '../ui/preloader';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const ingredient = useSelector(ingredientsSelector);
  const ingredientData = ingredient.find((item) => item._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
