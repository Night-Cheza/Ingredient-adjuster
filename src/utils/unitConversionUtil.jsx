import volumeData from "../data/units.json";
import solidData from "../data/ingredientList.json";

const FIXEDVALUES = [
    { key: "Kilogram", value: 1000, unit: "Gram" },
    { key: "Liter", value: 1000, unit: "Milliliter" },
    { key: "Ounce", value: 28.35, unit: "Gram" },
    { key: "Pound", value: 453.59, unit: "Gram" }
];

/**
 * Converts ingredient measurement into milliliters (for liquids) or grams (for solids).
 * @param {string} ingredientName - The ingredient name.
 * @param {number} amount - The amount of the ingredient.
 * @param {string} fromUnit - The original unit of measurement.
 * @returns {object} ingredientName, converted amount and unit.
 */
export const convertMeasurements = ( ingredientName, amount, fromUnit) => {
	let convertedAmount = null;
	let convertedUnit = null;

	if (!amount || isNaN(amount) || amount <= 0 || !fromUnit || !ingredientName) {
		return { convertedAmount: null, convertedUnit: null };
	}

	const isFixedValue = FIXEDVALUES.find(value => value.key === fromUnit);
	// Convert using fixed values
	if( isFixedValue ) {
		convertedAmount = amount * isFixedValue.value;
		convertedUnit = isFixedValue.unit
	}

	// Find the ingredient in solidData
const ingredient = solidData
  .flatMap(category => category.ingredients)
  .find(ingredient => ingredient.name.toLowerCase() === ingredientName.toLowerCase()) || null;

	if( !ingredient )	{
		return { convertedAmount: null, convertedUnit: null };
	}

	// Determine if the ingredient is liquid
	const isLiquid = ingredient.type === "liquid";

	// Convert liquids to milliliters using volumeData
	if( isLiquid )
	{
		const volumeEntry = volumeData.find( unit => unit.unit === fromUnit );
		if( !volumeEntry ) return {convertedAmount: null, convertedUnit: null};

		convertedAmount = amount * volumeEntry.volume;
		convertedUnit = "Milliliters (ml)";

		// Convert milliliters to liters if ≥ 1000ml
		if( convertedAmount >= 1000 )
		{
			convertedAmount = convertedAmount / 1000;
			convertedUnit = "Liters (L)";
		}
	}
	// Convert non-liquids to grams using solidData
	else
	{
		convertedUnit = "Gram (g)";
		// Calculate percentage difference between Cups
		const baseCupValue = volumeData.find( unit => unit.unit === "Cup (Metric)" ).volume; // Baseline = 100%
		const usCupDifference = ( baseCupValue - volumeData.find( unit => unit.unit === "Cup (US)" ).volume ) / baseCupValue * 100;
		const imperialCupDifference = ( volumeData.find( unit => unit.unit === "Cup (Imperial)" ).volume - baseCupValue ) / baseCupValue * 100;

		// Calculate percentage difference between Tablespoons
		const baseTbspValue = volumeData.find( unit => unit.unit === "Tablespoon" ).volume; // Baseline = 100%
		const imperialTbspDifference = ( volumeData.find( unit => unit.unit === "Tablespoon (Imperial)" ).volume - baseTbspValue ) / baseTbspValue * 100;

		// Calculate percentage difference between Teaspoons
		const baseTeaspValue = volumeData.find( unit => unit.unit === "Teaspoon" ).volume; // Baseline = 100%
		const imperialTeaspDifference = ( volumeData.find( unit => unit.unit === "Teaspoon (Imperial)" ).volume - baseTeaspValue ) / baseTeaspValue * 100;

		if( !isFixedValue ) {
			switch( fromUnit )
			{
				case "Cup (Metric)":
					convertedAmount = amount * ingredient.g_per_cup_metric;
					break;
				case "Cup (US)":
					convertedAmount = amount * ( ingredient.g_per_cup_metric - usCupDifference );
					break;
				case "Cup (Imperial)":
					convertedAmount = amount * ( ingredient.g_per_cup_metric + imperialCupDifference );
					break;
				case "Tablespoon":
					convertedAmount = amount * ingredient.g_per_tablespoon;
					break;
				case "Tablespoon (Imperial)":
					convertedAmount = amount * ( ingredient.g_per_tablespoon + imperialTbspDifference );
					break;
				case "Teaspoon":
					convertedAmount = amount * ingredient.g_per_tablespoon / 3;
					break;
				case "Teaspoon (Imperial)":
					convertedAmount = amount * ( ingredient.g_per_tablespoon / 3 + imperialTeaspDifference );
					break;
				default:
					convertedAmount = amount;
					convertedUnit = fromUnit;
			}
		}

		// Convert grams to kilograms if ≥ 1000g
		if (convertedAmount >= 1000) {
			convertedAmount = convertedAmount/1000;
			convertedUnit = "Kilograms (kg)";
		}
	}

		return {
			name: ingredientName,
			amount: parseFloat( convertedAmount.toFixed( 2 ) ),
			unit: convertedUnit
	};

};
