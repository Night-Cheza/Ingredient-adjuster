/**
 * Converts ingredient measurement into milliliters (for liquids) or grams (for solids).
 * @param {array} ingredients - The list of entered ingredients.
 * @param {object} selectedIngredient - The ingredient data to adjust the rest ingredients to.
 * @param {number} newAmount - The new amount.
 * @returns {object} - Recalculated amount.
 */

export const recalculateRecipe = (ingredients, selectedIngredient, newAmount) => {
	if (!selectedIngredient || newAmount <= 0) return ingredients;

	const scaleFactor = newAmount / selectedIngredient.amount;

	return ingredients.map((ingredient) => ({
			...ingredient,
			amount: parseFloat((ingredient.amount * scaleFactor).toFixed(2))
	}));
};

