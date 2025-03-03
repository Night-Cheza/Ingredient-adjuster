import ingredientData from "../data/ingredientsData.json";

export const nonConvertibleUnits = ["Piece", "Gram (g)", "Milliliters (ml)"];

const convertUnits = (amount, fromUnit, ingredientName) => {
	// Skip conversion for "Piece", "Gram (g)", and "Milliliters (ml)"
	if (nonConvertibleUnits.includes(fromUnit)) {
		return { convertedAmount: null, convertedUnit: null };
	}

	// Find the ingredient in JSON
	let ingredient = ingredientData.find(
		(ing) => ingredientName.toLowerCase().includes(ing.name.toLowerCase())
	);

	if (!ingredient) return { convertedAmount: null, convertedUnit: null };

	let convertedValues = [];

	//allowed conversions for liquid and non-liquid ingredients
	const liquidConversions = ["Liter (L)", "Ounce (oz)", "Cup (250ml)", "Cup (240ml)", "Tablespoon (tbsp)", "Teaspoon (tsp)", "Milliliters (ml)"];
	const solidConversions = ["Kilogram (kg)", "Pound (lb)", "Ounce (oz)", "Cup (250ml)", "Cup (240ml)", "Tablespoon (tbsp)", "Teaspoon (tsp)", "Gram (g)"];

	let allowedConversions = ingredient.type === "liquid" ? liquidConversions : solidConversions;

	//Check subname for non-liquid ingredients
	if (ingredient.type !== "liquid" && ingredient.subname) {
		if (!ingredientName.toLowerCase().includes(ingredient.subname.toLowerCase())) {
			return { convertedAmount: null, convertedUnit: null };
		}
	}

	switch (fromUnit) {
		case "Cup (250ml)":
			if (ingredient.type === "liquid") {
				let mlValue = ingredient.ml_per_cup_metric;
				if (mlValue && allowedConversions.includes("Milliliters (ml)")) {
					convertedValues.push({ amount: (amount * mlValue).toFixed(2), unit: "Milliliters (ml)" });
				}
			} else {
				let gValue = ingredient.g_per_cup_metric;
				if (gValue && allowedConversions.includes("Gram (g)")) {
					convertedValues.push({ amount: (amount * gValue).toFixed(2), unit: "Gram (g)" });
				}
			}
			break;
		case "Cup (240ml)":
			if( ingredient.type === "liquid" )
			{
				let mlValue = ingredient.ml_per_cup_us;
				if( mlValue && allowedConversions.includes( "Milliliters (ml)" ) )
				{
					convertedValues.push( {amount: ( amount * mlValue ).toFixed( 2 ), unit: "Milliliters (ml)"} );
				}
			} else
			{
				let gValue = ingredient.g_per_cup_us;
				if( gValue && allowedConversions.includes( "Gram (g)" ) )
				{
					convertedValues.push( {amount: ( amount * gValue ).toFixed( 2 ), unit: "Gram (g)"} );
				}
			}
			break;
		case "Tablespoon (tbsp)":
			if( ingredient.type === "liquid" )
			{
				let mlValue = ingredient.ml_per_tablespoon;
				if( mlValue &&  allowedConversions.includes("Teaspoon (tsp)") )
				{
					convertedValues.push( {amount: ( amount * mlValue / ingredient.ml_per_teaspoon ).toFixed( 2 ), unit: "Teaspoon (tsp)"} );
				}
			} else
			{
				let gValue = ingredient.g_per_tablespoon;
				if( gValue && allowedConversions.includes("Teaspoon (tsp)") )
				{
					convertedValues.push( {amount: ( amount * gValue / ingredient.g_per_teaspoon ).toFixed( 2 ), unit: "Teaspoon (tsp)"} );
				}
			}
			break;
		case "Teaspoon (tsp)":
						if( ingredient.type === "liquid" )
			{
				let mlValue = ingredient.ml_per_teaspoon;
				if( mlValue &&  allowedConversions.includes( "Milliliters (ml)" ) )
				{
					convertedValues.push( {amount: ( amount * mlValue ).toFixed( 2 ), unit: "Milliliters (ml)"} );
				}
			} else
			{
				let gValue = ingredient.g_per_teaspoon;
				if( gValue && allowedConversions.includes( "Gram (g)" ) )
				{
					convertedValues.push( {amount: ( amount * gValue ).toFixed( 2 ), unit: "Gram (g)"} );
				}
			}
			break;
		case "Liter (L)":
			if (ingredient.type === "liquid") {
				let mlValue = 1000;
				if (mlValue && allowedConversions.includes("Milliliters (ml)")) {
					convertedValues.push({ amount: (amount * mlValue).toFixed(2), unit: "Milliliters (ml)" });
				}
			} else {
					throw console.error('Wrong conversion');
				}
			break;
		case "Ounce (oz)":
			if( ingredient.type === "liquid" )
			{
				let mlValue = ingredient.ml_per_ounce;
				if( mlValue && allowedConversions.includes( "Milliliters (ml)" ) )
				{
					convertedValues.push( {amount: ( amount * mlValue ).toFixed( 2 ), unit: "Milliliters (ml)"} );
				}
			} else
			{
				let gValue = ingredient.g_per_ounce;
				if( gValue && allowedConversions.includes( "Gram (g)" ) )
				{
					convertedValues.push( {amount: ( amount * gValue ).toFixed( 2 ), unit: "Gram (g)"} );
				}
			}
			break;
		case "Kilogram (kg)":
			if (ingredient.type !== "liquid") {
				let gValue = 1000;
				if (gValue && allowedConversions.includes("Gram (g)")) {
					convertedValues.push({ amount: (amount * gValue).toFixed(2), unit: "Gram (g)" });
				}
			} else {
					throw console.error('Wrong conversion');
				}
			break;
				case "Pound (lb)":
			if (ingredient.type !== "liquid") {
				let gValue = 453.6;
				if (gValue && allowedConversions.includes("Gram (g)")) {
					convertedValues.push({ amount: (amount * gValue).toFixed(2), unit: "Gram (g)" });
				}
			} else {
					throw console.error('Wrong conversion');
				}
			break;

		default:
			break;
	}

	return convertedValues.length > 0 ? convertedValues : { convertedAmount: null, convertedUnit: null };
};

export default convertUnits;
