import {useState, useEffect} from "react";
import { fetchIngredientList, fetchUnitList } from "../utils/fetchIngredientDataUtil";

import "./RecipeForm.css"

const RecipeForm = ({ onAddIngredient, ingredients }) => {
	const [ ingredient, setIngredient ] = useState( {name: "", amount: "", unit: ""} );
	const [ ingredientList, setIngredientList ] = useState( [] );
	const [unitList, setUnitList] = useState([]);
	const [ error, setError ] = useState({name: false, amount: false, unit: false, duplicate: false} );
	const [ errorMessage, setErrorMessage ] = useState( "One or more inputs are incorrect or empty." );

	useEffect(() => {
		const loadData = async () => {
			setIngredientList(await fetchIngredientList());
			setUnitList(await fetchUnitList());
		};
		loadData();
}, []);

	const isValidIngredientName = (name) => {
		// Check if entered ingredient name contains only letters and spaces
		return /^[A-Za-z\s]+$/.test(name.trim()) && name.trim().length > 1;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		let hasError = false;
		let newErrors = { name: false, amount: false, unit: false, duplicate: false};

		if (!ingredient.name.trim() || !isValidIngredientName(ingredient.name)) {
			newErrors.name = true;
			hasError = true;
		}

		if (!ingredient.amount || isNaN(ingredient.amount) || ingredient.amount <= 0) {
			newErrors.amount = true;
			hasError = true;
		}

		if (!ingredient.unit.trim()) {
			newErrors.unit = true;
			hasError = true;
		}

		//Check if ingredient already exists (case-insensitive)
		const isDuplicate = ingredients.find(
			(newIngredient) => newIngredient.name.trim().toLowerCase() === ingredient.name.trim().toLowerCase()
		);

		if( isDuplicate )	{
			newErrors.name = true;
			newErrors.duplicate = true
			hasError = true;
			setErrorMessage("You already have this ingredient in the list.");
		}

		if( hasError ) {
			setError( newErrors );
			return;
		}

		onAddIngredient({
			...ingredient,
			name: ingredient.name.trim(), //name without extra spaces
			unit: ingredient.unit.trim(), //unit without extra spaces);
		})
		setIngredient( {name: "", amount: "", unit: ""} );
		setError( {name: false, amount: false, unit: false, duplicate: false} );
		setErrorMessage( "" );
	};

	return (
		<div>
			<h2>Add Ingredients</h2>
			<form onSubmit={handleSubmit}>
				<div className="error-message">{(error.amount || error.unit || error.name || error.duplicate) && <>{errorMessage}</>}</div>
				<select
					className={error.name ? "input-error" : ""}
					// value={selectedIngredient}
					onChange={( e ) => setIngredient( {ingredient: e.target.value })}>
					<option value="">Choose an ingredient</option>
					{ingredientList.map((ingredient, index) => (
						<option key={index} value={ingredient.ingredient}>
							{ingredient.ingredient}
						</option>
					))}
				</select>
				<input
					className={error.amount ? "input-error" : ""}
					type="number"
					placeholder="Amount"
					value={ingredient.amount}
					onChange={( e ) => setIngredient( {...ingredient, amount: e.target.value} )}
				/>
				<select
					className={error.amount ? "input-error" : ""}
					// value={unitList}
					onChange={( e ) => setUnitList( {unit: e.target.value} )}>
					<option value="">Select a unit</option>
					{unitList.map((unit, index) => (
						<option key={index} value={unit}>{unit.unit}</option>
					))}
				</select>
				<button type="submit">Add Ingredient</button>
			</form>
		</div>
	);
};

export default RecipeForm;
