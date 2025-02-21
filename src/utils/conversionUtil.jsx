import { convertUnit } from "./unitConversionUtil";
export const recalculateRecipe = ( ingredients, selectedIngredient, newAmount ) => {
	if (!selectedIngredient || newAmount <= 0) return ingredients;

	// Scaling factor based on the new amount
	const scaleFactor = newAmount / selectedIngredient.amount;

	return ingredients.map((ingredient) => {
		let newAmount = ingredient.amount * scaleFactor;
		let newUnit = ingredient.unit; // Default to original unit
		let convertedValues = [];

		// Extract whole and fractional parts
		const wholePart = Math.floor(newAmount);
		const fractionalPart = newAmount - wholePart;

		// Check if the fractional part falls within the conversion threshold
		const shouldConvert = ((fractionalPart < 0.99 && fractionalPart > 0.50) || (fractionalPart < 0.50 && fractionalPart > 0.00)) && ingredient.unit !== "Piece";

		// Convert unit only if different from selected ingredient
		if (shouldConvert) {
			const smallerUnits = getSmallerUnits(ingredient.unit);
			smallerUnits.forEach((smallerUnit) => {
				const convertedAmount = convertUnit(fractionalPart, ingredient.unit, smallerUnit);
				if (convertedAmount) {
					convertedValues.push({ amount: parseFloat(convertedAmount.toFixed(2)), unit: smallerUnit });
				}
			});
		}

		return {
			name: ingredient.name,
			amount: shouldConvert ? wholePart : parseFloat(newAmount.toFixed(2)),
			unit: newUnit,
			convertedValues, // Store multiple conversion possibilities
		};
	});
};

// Function to determine the next smaller unit
const getSmallerUnits = (unit) => {
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
