import {useState} from "react";

import "./RecipeForm.css"

const RecipeForm = ({ onAddIngredient }) => {
	const [ ingredient, setIngredient ] = useState( {name: "", amount: "", unit: ""} );
	const [ error, setError ] = useState({ name: false, amount: false, unit: false });

	const isValidIngredientName = (name) => {
		// Check if string is not a number and has more than one letter
		return isNaN(name) && name.trim().length > 1;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		let hasError = false;
			let newErrors = { name: false, amount: false, unit: false };

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

	if (hasError) {
		setError(newErrors);
		return;
	}

		onAddIngredient({
			...ingredient,
			name: ingredient.name.trim(), //name without extra spaces
			unit: ingredient.unit.trim(), //unit without extra spaces});
		})
		setIngredient( {name: "", amount: "", unit: ""} );
		setError({ name: false, amount: false, unit: false });
		};

	return (
		<div>
			<h2>Add Ingredients</h2>
			<form onSubmit={handleSubmit}>
				<div className="error-message">{(error.amount || error.unit || error.name) && <>One or more inputs are incorrect or empty.</>}</div>
				<input
					className={error.name ? "input-error" : ""}
					type="text" placeholder="Ingredient Name"
					value={ingredient.name}
					onChange={( e ) => setIngredient( {...ingredient, name: e.target.value} )}
				/>
				<input
					className={error.amount ? "input-error" : ""}
					type="number"
					placeholder="Amount"
					value={ingredient.amount}
					onChange={( e ) => setIngredient( {...ingredient, amount: e.target.value} )}
				/>
				<select
					className={error.unit ? "input-error" : ""}
					value={ingredient.unit}
					onChange={( e ) => setIngredient( {...ingredient, unit: e.target.value} )}
				>
					<option value="">Select Measurement</option>
					{
						[ "Cup (250ml)","Tablespoon (tbsp)", "Teaspoon (tsp)", "Ounce (oz)", "Liter (L)", "Milliliters (ml)", "Kilogram (kg)", "Gram (g)", "Pound (lb)", "Piece" ].map( ( unit ) => (
						<option key={unit} value={unit}>{unit}</option>
					))}
				</select>
				<button type="submit">Add Ingredient</button>
			</form>
		</div>
	);
};

export default RecipeForm;
