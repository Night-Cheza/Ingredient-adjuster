import ingredientData from "../data/ingredientList.json"
import unitData from "../data/units.json"

export const fetchCategoryList = () => {
	const category = ingredientData.map(item => item.category)
	return category;
};

export const fetchIngredientByCategory = (category) => {
	const categoryData = ingredientData.find( item => item.category === category );
	return categoryData ? categoryData.ingredients : [];
};

export const fetchUnitList = () => {
	const loadedUnits = unitData.map( item => item.unit )
	const loadedAbbrs = unitData.map( item => item.abbr );
	return {loadedUnits, loadedAbbrs};
}
