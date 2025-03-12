import {useState, useEffect} from "react";
import { fetchCategoryList, fetchIngredientByCategory, fetchUnitList } from "../utils/fetchIngredientDataUtil";

import "./RecipeForm.css"

const RecipeForm = ({ onAddIngredient }) => {
	const [ ingredient, setIngredient ] = useState( {name: "", amount: "", unit: ""} );
	const [ ingredientList, setIngredientList ] = useState( [] );
	const [ categoryList, setCategoryList ] = useState( [] );
	const [ selectedCategory, setSelectedCategory ] = useState("");;
	const [ unitList, setUnitList ] = useState( [] );

	useEffect(() => {
		const loadedCategory = fetchCategoryList();
		const loadedUnits = fetchUnitList();
		setCategoryList( loadedCategory );
		setUnitList( loadedUnits );
}, []);

	const handleCategoryChange = ( e ) => {
		const category = e.target.value;
		setSelectedCategory( category );
		const ingredientsByCategory = fetchIngredientByCategory( category );
		setIngredientList( ingredientsByCategory );

	}

	const handleSubmit = ( e ) => {
		e.preventDefault();
		onAddIngredient( {
			...ingredient,
			name: ingredient.name,
			unit: ingredient.unit,
		} );
		setIngredient( {name: "", amount: "", unit: ""} );
		setSelectedCategory( "" );
		setIngredientList( [] );
	};

	return (
		<div>
			<h2>Add Ingredients</h2>
			<form onSubmit={handleSubmit}>
				{/* <div className="error-message">{( error.amount || error.unit || error.name || error.duplicate ) && <>{errorMessage}</>}</div> */}
				<select
					// className={error.category ? "input-error" : ""}
					value={selectedCategory}
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
					// className={error.name ? "input-error" : ""}
					value={ingredient.name}
					onChange={( e ) => setIngredient( {name: e.target.value} )}
				>
					<option value="">Select ingredient</option>
					{ingredientList.map((ingredient, index) => (
						<option key={index} value={ingredient.name}>
							{ingredient.name}
						</option>
					))}
				</select>
				<input
					// className={error.amount ? "input-error" : ""}
					type="number"
					placeholder="Amount"
					value={ingredient.amount}
					onChange={( e ) => setIngredient( {...ingredient, amount: e.target.value} )}
				/>
				<select
					// className={error.amount ? "input-error" : ""}
					value={ingredient.unit}
					onChange={( e ) => setIngredient( {...ingredient, unit: e.target.value} )}>
					<option value="">Select measurement</option>
					{unitList.map((unit, index) => (
						<option key={index} value={unit}>{unit}</option>
					))}
				</select>
				<button type="submit">Add Ingredient</button>
			</form>
		</div>
	);
};

export default RecipeForm;
