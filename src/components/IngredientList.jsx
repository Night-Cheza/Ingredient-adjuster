import React, {useState} from "react";
import { useContext } from "react";
import { ListContext } from "../store/recipe-list-context";
import Button from "./Button";

function IngredientList () {
	const listCntx = useContext( ListContext );
	const [ newAmount, setNewAmount ] = useState();
	const [ toEdit, setToEdit ] = useState( false );
	const [ ingredientToEdit, setIngredientToEdit ] = useState();
	const [ isDisplayed, setIsDisplayed ] = useState( false );

	//RETRIEVING INGREDIENT TO EDIT
	function editHandler ( ingredientName ) {
		const ingredientIndex = listCntx.recipe.findIndex( ( ingredient ) => ingredient.ingredient === ingredientName );
		const findIngredient = listCntx.recipe[ ingredientIndex ];
		setIngredientToEdit( findIngredient );
		setToEdit( true );
		setIsDisplayed( true );
	}

	function inputChangeHandler (event) {
		setNewAmount( event.target.value )
	}
	//SUBMITTING EDITED AMOUNT
	function doneHandler () {
		const amountInput = newAmount;
		if( isNaN( amountInput ) || amountInput < 0 || amountInput.trim() === "" )
		{
			throw Error( 'Please provide correct amount' );
		}

		listCntx.editIngredient( {
			ingredient: ingredientToEdit.ingredient,
			amount: amountInput,
			measurement: ingredientToEdit.measurement,
		} );
	}

	return (
		<>
			{listCntx.empty || listCntx.done ? undefined : <p>Here is your recipe list. <br/> Please press 'Done' when done adding ingredients.</p>}
			<div className="list">
				{!toEdit ?
					<>
						<table>
							<tbody>
								{listCntx.empty ? undefined :
									<tr>
										<th>Ingredient</th>
										<th>Amount</th>
										<th>Measurement</th>
									</tr>
								}
								{listCntx.recipe.map((ingredient, i) => (
									<tr key={i}>
										<td>{ingredient.ingredient}</td>
										<td>{ingredient.amount}</td>
										<td>{ingredient.measurement}</td>
										{listCntx.done && !listCntx.edited ? <td><i className="bi bi-pencil-square" onClick={() => editHandler( ingredient.ingredient )}></i></td> : undefined}
									</tr>
								) )}
								{listCntx.empty || listCntx.done ? undefined : <tr><td colSpan='3'><Button onClick={listCntx.doneAdding} text="Done" disabled={!listCntx.active} /></td></tr>}
							</tbody>
						</table>
					</>
					:
					<>
						{!listCntx.edited && isDisplayed ?
							<>
								<table>
									<tbody>
										<tr>
											<th colSpan='3'>Please, enter new amount:</th>
										</tr>
										<tr>
											<td>{ingredientToEdit.ingredient}</td>
											<td><input placeholder={ingredientToEdit.amount} value={newAmount} onChange={inputChangeHandler}/></td>
											<td>{ingredientToEdit.measurement}</td>
										</tr>
										<tr>
											<td colSpan='3'><Button text="Done" onClick={doneHandler}/></td>
										</tr>
									</tbody>
								</table>
								<p className='errorMessage'>'Please enter correct amount'</p>
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
