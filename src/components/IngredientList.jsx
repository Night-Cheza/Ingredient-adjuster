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
		if( isNaN( amountInput ) || amountInput < 0 )
		{

		} else if( amountInput.trim() === "" )
		{
			return;
		}

		onEdit( {
			ingredient: ingredientToEdit.ingredient,
			amount: amountInput,
			measurement: ingredientToEdit.measurement,
		} );
		setIsDisplayed( false );
	}

  return (
		<section>
			{!toEdit ?
				<li>
					{ingredientData.map((ingredient, i) => (
						<ul key={i}>
							<span>{ingredient.ingredient}</span>
							<span>{ingredient.amount}</span>
							<span>{ingredient.measurement}</span>
							{done ? <span><i className="bi bi-pencil-square" onClick={() => editHandler(ingredient.ingredient)}></i></span> : undefined}
						</ul>
					))}
				</li> :
				<>
					{edited ?
						undefined :
						<>
							{isDisplayed ?
								<>
									<label>Please, enter new amount:</label><br/>
									<span>{ingredientToEdit.ingredient}</span>
									<input placeholder={ingredientToEdit.amount} ref={newAmount}/>
									<span>{ingredientToEdit.measurement}</span>
									<span><Button text="Done" onClick={doneHandler}/></span>
								</> :
								null
							}
						</>
					}
				</>
			}

    </section>
  );
}

export default IngredientList;
