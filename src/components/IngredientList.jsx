import React, {useState} from "react";
import IngredientInput from "./IngredientInput";

function IngredientList ( {ingredientData, onEdit, done} ) {
	let editContent;
	const [ toEdit, setToEdit ] = useState( false );

	function editHandler ( ingredientName ) {
		let amountToEdit;
		ingredientData.forEach((ingredient) => {
			if( ingredient.ingredient === ingredientName )
			{
				amountToEdit = ingredient.amount;
			}
		});
		// const selectedIngredient = ingredientData.find( ( ingredient ) => ingredient.ingredient === ingredientName );
		// editContent = (
		// 	<>
		// 		<IngredientInput
		// 			type="text"
		// 			ref={ingredientName} />
		// 		<IngredientInput
		// 			type="text"
		// 			ref={ingredientName} />
		// 	</>
		// )
		// setToEdit( true );
		onEdit( ingredientName );
		console.log(amountToEdit)
	}

  return (
		<section>
			{!toEdit ?
				<li>
					{ingredientData.map((ingredient) => (
						<ul key={ingredient.ingredient}>
							<span>{ingredient.ingredient}</span>
							<span>{ingredient.amount}</span>
							<span>{ingredient.measurement}</span>
							{done ? <span><i className="bi bi-pencil-square" onClick={() => editHandler(ingredient.ingredient)}></i></span> : undefined}
						</ul>
					))}
				</li> :
				<li>
					{ingredientData.map((ingredient) => (
						<ul key={ingredient.ingredient}>
							<span>{ingredient.ingredient}</span>
							<span>{ingredient.amount}</span>
							<span>{ingredient.measurement}</span>
							<span><i className="bi bi-pencil-square"></i></span>
						</ul>
					))}
				</li>}

    </section>
  );
}

export default IngredientList;
