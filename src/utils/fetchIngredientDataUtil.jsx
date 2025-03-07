import axios from "axios";

const API_BASE_URL = "https://food-ingredient-measurement-conversion.p.rapidapi.com";

const HEADERS = {
	"X-RapidAPI-Key": "fefec5126emshc6f6acc92fec029p1d9781jsndb00639f65c9",
	"X-RapidAPI-Host": "food-ingredient-measurement-conversion.p.rapidapi.com",
};

// Fetch list of ingredients
export const fetchIngredientList = async () => {
	try {
		const response = await axios.get( `${API_BASE_URL}/list-ingredients`, {headers: HEADERS} );
		const ingredientsList = response.data[ 0 ].details;
		// console.log( 'Ingredients: ', `${response.data[ 0 ].details}` );
		// If no response data returned
		if (!response.data[0].details) {
			return [];
		}

		// Group ingredients by name
		const groupedByName = ingredientsList.reduce((listByName, item) => {
			if (!listByName[item.ingredient]) {
				listByName[item.ingredient] = [];
			}
			listByName[item.ingredient].push(item);
			return listByName;
		}, {});

		// Filter on brand "generic"
		const filteredIngredients = Object.values(groupedByName).map(ingredientGroup => {
			const brand = ingredientGroup.find(ingredient => ingredient.brand === "generic");
			return brand || ingredientGroup[0]; // If no generic brand, return the first occurrence
		});

		return filteredIngredients;
	} catch (error) {
		console.error("Error fetching ingredient list:", error);
		return [];
	}
};

// Fetch list of measurement units
export const fetchUnitList = async () => {
	try {
		const response = await axios.get( `${API_BASE_URL}/list-units`, {headers: HEADERS} );
		const resp = [...response.data[ 0 ].details, ...response.data[ 1 ].details]
		console.log( 'Measurements: ', `${response.data[ 0 ].details}` );
		if (!response.data[0].details || !response.data[ 1 ].details) {
			return [];
		}
		return resp || []; // Return list of measurement units
	} catch (error) {
			console.error("Error fetching unit list:", error);
			return [];
	}
};


// Convert measurement using API
export const fetchMeasurementConversion = async (name, amount, fromUnit, toUnit) => {
	try {
		const response = await axios.get(`${API_BASE_URL}/convert`, {
			params: { ingredient: name, from: fromUnit, to: toUnit, value: amount },
			headers: HEADERS,
		} );
		console.log( 'Converted: ', `${response.data}` );
		return response.data; // Return converted values
	} catch (error) {
			console.error("Error fetching measurement conversion:", error);
			return null;
	}
};
