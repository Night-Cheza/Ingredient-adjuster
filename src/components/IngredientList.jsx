import React, {useState, useRef} from "react";
import Button from "./Button";

function IngredientList ( {ingredientData, onEdit, done, edited} ) {
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
		<section className="list">
			{!toEdit ?
				<table>
					{ingredientData.map((ingredient, i) => (
						<tr key={i}>
							<td>{ingredient.ingredient}</td>
							<td>{ingredient.amount}</td>
							<td>{ingredient.measurement}</td>
							{done ? <td><i className="bi bi-pencil-square" onClick={() => editHandler(ingredient.ingredient)}></i></td> : undefined}
						</tr>
					))}
				</table>
				:
				<>
					{!edited && isDisplayed ?
						<>
							<table>
								<tr>
									<th colSpan={2}>Please, enter new amount:</th>
								</tr>
								<tr>
									<td>{ingredientToEdit.ingredient}</td>
									<td><input placeholder={ingredientToEdit.amount} ref={newAmount}/></td>
									<td>{ingredientToEdit.measurement}</td>
									<td><Button text="Done" onClick={doneHandler}/></td>
								</tr>
							</table>
						</> :
						undefined
					}
				</>
			}
		</section>
	);
}

export default IngredientList;
