import { convertUnit } from "./unitConversionUtil";
export const recalculateRecipe = ( ingredients, selectedIngredient, newAmount ) => {
	if (!selectedIngredient || newAmount <= 0) return ingredients;

	// Scaling factor based on the new amount
	const scaleFactor = newAmount / selectedIngredient.amount;

	return ingredients.map((ingredient) => {
		let newAmount = ingredient.amount * scaleFactor;
		let newUnit = ingredient.unit; // Default to original unit
		let convertedPart = null

		// Extract whole and fractional parts
		const wholePart = Math.floor(newAmount);
		const fractionalPart = newAmount - wholePart;
		// Check if the fractional part falls within the conversion threshold
		const shouldConvert = (fractionalPart < 0.99 && fractionalPart > 0.50) || (fractionalPart > 0.01 && fractionalPart < 0.50);

		// Convert unit only if different from selected ingredient
		if (shouldConvert && ingredient.unit !== selectedIngredient.unit) {
			convertedPart = convertUnit(fractionalPart, ingredient.unit, getSmallerUnit(ingredient.unit));
			newUnit = ingredient.unit; // Keep the main unit unchanged
		}

		return {
			...ingredient,
      amount: wholePart, // Keep the whole number in original unit
      unit: newUnit,
      convertedAmount: convertedPart, // Converted fractional part
      convertedUnit: convertedPart ? getSmallerUnit(ingredient.unit) : null, // Store new unit for fractional part
		};
	});
};

// Function to determine the next smaller unit
const getSmallerUnit = (unit) => {
	const unitHierarchy = {
		"Cup (250ml)": ["Tbsp", "tsp", "ml"],
		"Tablespoon (tbsp)": ["tsp", "g", "ml"],
		"Teaspoon (tsp)": ["g", "ml"],
		"Ounce (oz)": ["g", "ml"],
		"Liter (L)": ["ml"],
		"Kilogram (kg)": ["g"],
		"Pound (lb)": ["g"]
	};
	return unitHierarchy[unit] || unit; // Default to same unit if no smaller unit is available
};
