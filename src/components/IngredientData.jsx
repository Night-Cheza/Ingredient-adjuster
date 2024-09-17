import React, {useState} from "react";
import { useContext } from "react";
import { ListContext } from "../store/recipe-list-context.jsx";
import Button from "./Button.jsx";

const OPTIONS = [
	"Please select",
	"Cup (250ml)",
	"Tablespoon (tbsp)",
	"Teaspoon (tsp)",
	"Ounce (oz)",
	"Liter (L)",
	"Milliliters (ml)",
	"Kilogram (kg)",
	"Gram (g)",
	"Pound (lb)",
	"Piece",
];

function IngredientData () {
	const {addIngredient} = useContext( ListContext );
	const [ values, setValues ] = useState( {
		ingredient: '',
		amount: '',
		measurement: ''
	} );

	//getting user's initial input
	function inputChangeHandler (inputType, value) {
		setValues( prevValues => ( {
			...prevValues,
			[ inputType ]: value
		} ) )
	}

	function submitHandler () {
		addIngredient({
			ingredient: values.ingredient,
			amount: values.amount,
			measurement: values.measurement,
		} );
		//resetting table
		setValues( {
			ingredient: '',
			amount: '',
			measurement: ''
		})
	}

	return (
		<div className="ingredientInput">
			<table>
				<tbody>
					<tr>
						<td>
							<label>Ingredient</label>
						</td>
						<td>
							<input
								type='text' value={values.ingredient} onChange={( event ) => inputChangeHandler( 'ingredient', event.target.value )} />
						</td>
					</tr>
					<tr>
						<td>
							<label type='text'>Amount</label>
						</td>
						<td>
							<input type='text' name='amount' value={values.amount} onChange={(event) => inputChangeHandler('amount', event.target.value)} />
						</td>
					</tr>
					<tr>
						<td>
							<label>Measurement</label>
						</td>
						<td>
							<select name='measurement' value={values.measurement} onChange={(event) => inputChangeHandler('measurement', event.target.value)}>
								{OPTIONS.map((value, valueIndex) => (
									<option key={valueIndex} value={value}>
										{value}
									</option>
								))}
							</select>
						</td>
					</tr>
					<tr>
						<td colSpan='2'>
							<Button onClick={submitHandler} text='Add Ingredient' />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default IngredientData;
