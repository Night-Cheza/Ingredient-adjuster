import ingredientData from "../data/ingredientsData.json";

export const nonConvertibleUnits = [ "Piece", "Gram (g)", "Milliliters (ml)" ];

const conversionMap = {
	"Cup (250ml)": {
		liquid: { key: "ml_per_cup_metric", targetUnit: "Milliliters (ml)" },
		solid: { key: "g_per_cup_metric", targetUnit: "Gram (g)" },
	},
	"Cup (240ml)": {
		liquid: { key: "ml_per_cup_us", targetUnit: "Milliliters (ml)" },
		solid: { key: "g_per_cup_us", targetUnit: "Gram (g)" },
	},
	"Tablespoon (tbsp)": {
		liquid: { key: null, fixedValue: 3, targetUnit: "Teaspoon (tsp)" },
		solid: { key: null, fixedValue: 3, targetUnit: "Teaspoon (tsp)" },
	},
	"Teaspoon (tsp)": {
		liquid: { key: "ml_per_teaspoon", targetUnit: "Milliliters (ml)" },
		solid: { key: "g_per_teaspoon", targetUnit: "Gram (g)" },
	},
	"Liter (L)": {
		liquid: { key: null, fixedValue: 1000, targetUnit: "Milliliters (ml)" },
	},
	"Ounce (oz)": {
		liquid: {  key: null, fixedValue: 29.57, targetUnit: "Milliliters (ml)" },
		solid: {  key: null, fixedValue: 28.35, targetUnit: "Gram (g)" },
	},
	"Kilogram (kg)": {
		solid: { key: null, fixedValue: 1000, targetUnit: "Gram (g)" },
	},
	"Pound (lb)": {
		solid: { key: null, fixedValue: 453.6, targetUnit: "Gram (g)" },
	},
};

const convertUnits = (amount, fromUnit, ingredientName) => {
	// Skip conversion for "Piece", "Gram (g)", and "Milliliters (ml)"
	if (nonConvertibleUnits.includes(fromUnit)) {
		return { convertedAmount: null, convertedUnit: null };
	}

	let ingredient = ingredientData.find((ingredient) => {
		if (!ingredient.subname) {
				// If there's no subname, do an exact match
				return ingredientName.toLowerCase() === ingredient.name.toLowerCase();
		} else {
				// If there's a subname, check if the ingredientName includes it
				return ingredientName.toLowerCase().includes(ingredient.subname.toLowerCase());
		}
	});

	if (!ingredient) return { convertedAmount: null, convertedUnit: null };

	let convertedValues = [];

	const conversion = conversionMap[fromUnit];
	if (!conversion) return convertedValues;

	const typeKey = ingredient.type === "liquid" ? "liquid" : "solid";
	const conversionData = conversion[typeKey];

	if (!conversionData) {
		console.error("Wrong conversion");
		return convertedValues;
	}

	// Handle fixed values (e.g., 1L = 1000ml)
	if (conversionData.fixedValue) {
		convertedValues.push({ amount: (amount * conversionData.fixedValue).toFixed(2), unit: conversionData.targetUnit });
		return convertedValues;
	}

	// Handle normal conversions
	let conversionFactor = ingredient[conversionData.key];
	if (conversionFactor && conversionData.divisor) {
		// If there's a divisor (e.g., tbsp to tsp), apply it
		let divisor = ingredient[conversionData.divisor] || 1;
		convertedValues.push({ amount: (amount * conversionFactor / divisor).toFixed(2), unit: conversionData.targetUnit });
	} else if (conversionFactor) {
		convertedValues.push({ amount: (amount * conversionFactor).toFixed(2), unit: conversionData.targetUnit });
	}

	return convertedValues.length > 0 ? convertedValues : { convertedAmount: null, convertedUnit: null };
};

export default convertUnits;
