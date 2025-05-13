import {useState, useEffect} from "react";
import { fetchCategoryList, fetchIngredientByCategory, fetchUnitList } from "../utils/fetchIngredientDataUtil";

import "./RecipeForm.css"

const RecipeForm = ({ onAddIngredient, duplicate }) => {
	const [ ingredient, setIngredient ] = useState( {} );
	const [ ingredientList, setIngredientList ] = useState( [] );
	const [ categoryList, setCategoryList ] = useState( [] );
	const [ unitList, setUnitList ] = useState( {units:[], abbrs: []} );
	const [ errors, setErrors ] = useState( {category: false, name: false, amount: false, unit: false, general: false} );

	useEffect(() => {
		const loadedCategory = fetchCategoryList();
		const {loadedUnits, loadedAbbrs} = fetchUnitList();
		setCategoryList( loadedCategory );
		setUnitList( {units: loadedUnits, abbrs: loadedAbbrs} );
}, []);

	const handleCategoryChange = ( e ) => {
		const selectedCategory = e.target.value;
		setIngredient( {category: selectedCategory} );
		const ingredientsByCategory = fetchIngredientByCategory( selectedCategory );
		setIngredientList( ingredientsByCategory );
	}

	const handleSubmit = ( e ) => {
		e.preventDefault();

		let newErrors = {category: false, name: false, amount: false, unit: false, general: false};
		let missingFields = [];


		if (!ingredient.category) {
			newErrors.category = true;
			newErrors.name = true;
			missingFields.push( true );
		}

		if (!ingredient.name || ingredient.name.length === 0) {
			newErrors.name = true;
			missingFields.push( true );
		}
		if (!ingredient.amount || isNaN(ingredient.amount) || ingredient.amount <= 0) {
			newErrors.amount = true;
			missingFields.push( true );
		}
		if (!ingredient.unit) {
			newErrors.unit = true;
			missingFields.push( true );
		}

		if (missingFields.length > 1) {
			newErrors.general = true;
		}

		setErrors(newErrors );

		if( missingFields.length > 0 ) {
			return;
		}

		const index = unitList.units.indexOf(ingredient.unit);
		const abbr = unitList.abbrs[index];

		onAddIngredient( {
			...ingredient,
			name: ingredient.name,
			amount: ingredient.amount,
			unit: ingredient.unit,
			abbr: abbr
		} );
		setIngredient( {category: "", name: "", amount: "", unit: ""} );
		setIngredientList( [] );
	};

	return (
		<div>
			<h2>Add Ingredients</h2>
			<form onSubmit={handleSubmit}>
				<div className="error-message">{duplicate ? "The ingredient is already on the list" : (errors.category || errors.igredient || errors.amount || errors.unit || errors.general) ? "Please provide correct information" : ""}</div>
				<select
					className={errors.category ? "input-error" : ""}
					value={ingredient.category}
					onChange={handleCategoryChange}
				>
					<option value="">Select category</option>
					{categoryList.map((category, index) => (
						<option key={index} value={category}>
							{category}
						</option>
					))}
				</select>
				<select
					className={errors.name ? "input-error" : ""}
					value={ingredient.name}
					onChange={( e ) => setIngredient( {...ingredient, name: e.target.value} )}
				>
					<option value="">Select ingredient</option>
					{ingredientList.map((ingredient, index) => (
						<option key={index} value={ingredient.name}>
							{ingredient.name}
						</option>
					))}
				</select>
				<input
					className={errors.amount ? "input-error" : ""}
					type="number"
					placeholder="Amount"
					value={ingredient.amount}
					onChange={( e ) => setIngredient( {...ingredient, amount: e.target.value} )}
				/>
				<select
					className={errors.unit ? "input-error" : ""}
					value={ingredient.unit}
					onChange={( e ) => setIngredient( {...ingredient, unit: e.target.value} )}>
					<option value="">Select measurement</option>
					{unitList.units.map((unit, index) => (
						<option key={index} value={unit}>{unit}</option>
					))}
				</select>
				<button type="submit">Add Ingredient</button>
			</form>
		</div>
	);
};

export default RecipeForm;
