import React, {useState, useRef} from "react";
import { useContext } from "react";
import { ListContext } from "../store/recipe-list-context";
import Button from "./Button";

function IngredientList () {
	const listCntx = useContext( ListContext );

	const newAmount = useRef();
	const [ toEdit, setToEdit ] = useState( false );
	const [ ingredientToEdit, setIngredientToEdit ] = useState();
	const [ isDisplayed, setIsDisplayed ] = useState( false );

	//to get ingredient data that user is editing
	function editHandler ( ingredientName ) {
		const ingredientIndex = listCntx.recipe.findIndex( ( ingredient ) => ingredient.ingredient === ingredientName );
		const findIngredient = listCntx.recipe[ ingredientIndex ];
		setIngredientToEdit( findIngredient );
		setToEdit( true );
		setIsDisplayed( true );
	}

	//done button after submitting updated ingredient data
	function doneHandler () {
		const amountInput = newAmount.current.value.trim();
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
