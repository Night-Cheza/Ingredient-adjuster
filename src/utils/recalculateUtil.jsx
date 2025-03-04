// import convertUnits, {nonConvertibleUnits} from "./unitConversionUtil";

// export const recalculateRecipe = (ingredients, selectedIngredient, newAmount) => {
// 	if (!selectedIngredient || newAmount <= 0) return ingredients;

// 	const scaleFactor = newAmount / selectedIngredient.amount;

// 	return ingredients.map((ingredient) => {
// 		let scaledAmount = ingredient.amount * scaleFactor;

// 			// Extract whole and fractional parts
// 			const wholePart = Math.floor(scaledAmount);
// 			const fractionalPart = scaledAmount - wholePart;

// 			// Apply conversion only if the fractional part meets the condition
// 			const shouldConvert = ((fractionalPart <= 0.99 && fractionalPart > 0.50) || (fractionalPart < 0.50 && fractionalPart > 0.00)) && !nonConvertibleUnits.includes(ingredient.unit);

// 			let convertedValues = shouldConvert ? convertUnits(fractionalPart, ingredient.unit, ingredient.name) : [];

// 			return {
// 					...ingredient,
// 					amount: shouldConvert ? wholePart : parseFloat(scaledAmount.toFixed(2)),
// 					convertedValues,
// 			};
// 	});
// };

export const recalculateRecipe = (ingredients, selectedIngredient, newAmount) => {
	if (!selectedIngredient || newAmount <= 0) return ingredients;

	const scaleFactor = newAmount / selectedIngredient.amount;

	return ingredients.map((ingredient) => ({
			...ingredient,
			amount: parseFloat((ingredient.amount * scaleFactor).toFixed(2)), // Only scale amounts
			convertedValues: [], // No conversions yet
	}));
};

