import React, {useState, useRef} from "react";
import Button from "./Button";

function IngredientList ( {ingredientData, doneAdding, onEdit, done, edited, empty, active} ) {
	const newAmount = useRef();
	const [ toEdit, setToEdit ] = useState( false );
	const [ ingredientToEdit, setIngredientToEdit ] = useState();
	const [ isDisplayed, setIsDisplayed ] = useState( true );

	//to get ingredient data that user is editing
	function editHandler ( ingredientName ) {
		const ingredientIndex = ingredientData.findIndex( ( ingredient ) => ingredient.ingredient === ingredientName );
		setToEdit( true );
		const editIngredient = ingredientData[ ingredientIndex ];
		setIngredientToEdit( editIngredient );
	}

	//done button after submitting updated ingredient data
	function doneHandler () {
		const amountInput = newAmount.current.value.trim();
		if( isNaN( amountInput ) || amountInput < 0 || amountInput.trim() === "" )
		{
			throw Error( 'Please provide correct amount' );
		}

		onEdit( {
			ingredient: ingredientToEdit.ingredient,
			amount: amountInput,
			measurement: ingredientToEdit.measurement,
		} );
		setIsDisplayed( false );
	}

	return (
		<>
			{empty || done || edited ? undefined : <p>Here is your recipe list. <br/> Please press 'Done' when done adding ingredients.</p>}
			<div className="list">
				{!toEdit ?
					<>
						<table>
							<tbody>
								{empty || done || edited ? undefined :
									<tr>
										<th>Ingredient</th>
										<th>Amount</th>
										<th>Measurement</th>
									</tr>
								}
								{ingredientData.map((ingredient, i) => (
									<tr key={i}>
										<td>{ingredient.ingredient}</td>
										<td>{ingredient.amount}</td>
										<td>{ingredient.measurement}</td>
										{done ? <td><i className="bi bi-pencil-square" onClick={() => editHandler(ingredient.ingredient)}></i></td> : undefined}
									</tr>
								) )}
								{empty || done || edited ? undefined : <tr><td colSpan='3'><Button onClick={doneAdding} text="Done" disabled={!active} /></td></tr>}
							</tbody>
						</table>
					</>
					:
					<>
						{!edited && isDisplayed ?
							<>
								<table>
									<tbody>
										<tr>
											<th colSpan='3'>Please, enter new amount:</th>
										</tr>
										<tr>
											<td>{ingredientToEdit.ingredient}</td>
											<td><input placeholder={ingredientToEdit.amount} ref={newAmount}/></td>
											<td>{ingredientToEdit.measurement}</td>
										</tr>
										<tr>
											<td colSpan='3'><Button text="Done" onClick={doneHandler}/></td>
										</tr>
									</tbody>
								</table>
							</> :
							undefined
						}
					</>
				}
		</div>
		</>

	);
}

export default IngredientList;
