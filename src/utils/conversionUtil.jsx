export const recalculateRecipe = (ingredients, selectedIngredient, newAmount) => {
  if (!selectedIngredient || newAmount <= 0) return ingredients;

  // Scaling factor based on the new amount
  const scaleFactor = newAmount / selectedIngredient.amount;

  return ingredients.map((ing) => ({
    ...ing,
    amount: ing.name === selectedIngredient.name ? newAmount : ing.amount * scaleFactor,
  }));
};
