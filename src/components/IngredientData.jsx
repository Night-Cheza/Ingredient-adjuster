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
	let errorMessage = false;
	const {addIngredient} = useContext( ListContext );
	const [ values, setValues ] = useState( {
		ingredient: '',
		amount: '',
		measurement: ''
	} );

	//CHECK IF EACH INPUT IS NUMBER
	function isNumber ( value ) {
		let isNumber;
		if( value )
		{
			for(let i = 0; i < value.length; i++ )
			{
				console.log( 'Is value number? ' + i);
				isNumber =  !isNaN(value[i]);
			}
			return isNumber;
		}
	}

	const ingredientInvalid = isNumber(values.ingredient) && values.ingredient.length > 0;
	const amountInvalid = !isNumber( values.amount ) && values.amount.length > 0;


	//GETTING INPUT ON CHANGE
	function inputChangeHandler ( inputType, value ) {
		if(ingredientInvalid || amountInvalid)
		{
			console.log( 'ERROR!' )
		} else
		{
			console.log(values.measurement.length)
			setValues( prevValues => ( {
				...prevValues,
				[ inputType ]: value
			}))
		}
	}


	function submitHandler () {
		//CHECK IF INPUT IS EMPTY
		if( values.ingredient.length === 0 || values.amount.length === 0 || values.measurement.length === 0 )
		{
			console.log('ERROR PART')
			errorMessage = true;
			return;
		} else
		{
			console.log('SUBMITTED')
			addIngredient({
			ingredient: values.ingredient,
			amount: values.amount,
			measurement: values.measurement,
		});
		}

		//RESETTING VALUES
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
								type='text'
								value={values.ingredient}
								onChange={( event ) => inputChangeHandler( 'ingredient', event.target.value )}
							/>
						</td>
					</tr>
					<tr>
						<td>
							<label type='text'>Amount</label>
						</td>
						<td>
							<input
								type='text'
								name='amount' value={values.amount}
								onChange={( event ) => inputChangeHandler( 'amount', event.target.value )}
							/>
						</td>
					</tr>
					<tr>
						<td>
							<label>Measurement</label>
						</td>
						<td>
							<select
								name='measurement'
								value={values.measurement}
								onChange={( event ) => inputChangeHandler( 'measurement', event.target.value )}
							>
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
			<p className='errorMessage'>
				{ingredientInvalid && 'Please enter a valid ingredient name'}
				{amountInvalid && 'Please enter a valid amount'}
				{errorMessage && 'Please provide valid data'}
			</p>
		</div>
	);
}

export default IngredientData;
