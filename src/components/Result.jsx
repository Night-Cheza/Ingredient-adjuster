import React, { useState } from "react";
import IngredientInput from "./IngredientInput.jsx";
import Button from "./Button.jsx";

function Result ({ onAdd, onDone, onAdjust, headerText, btnText }) {
	const [newData, setNewData] = useState();
	function adjustHandler (adjustData) {
		const index = ingredientEntry.recipe.findIndex(
			(data) => data.ingredient === adjustData.ingredient
		);
		if(index === undefined || index === -1)
		{
			//HANDLE ERROR MESSAGE WHEN ADJUSTING INGREDIENT THAT IS NOT IN THE LIST
			return;
		}
		const oldEntry = ingredientEntry.recipe[index]; //to save previous data
		const recipe = [...ingredientEntry.recipe];
		recipe.splice([index], 1); //remove changed by user ingredient

		//calculate adjustment for all ingredients in the recipe
		recipe.forEach((entry) => {
			const difference = (adjustData.amount * 100) / oldEntry.amount;
			const newAmount = difference * entry.amount / 100;
			const newEntry = { ingredient: entry.ingredient, amount: newAmount, measurement: entry.measurement };
			result.push(newEntry);
		});
		result.push(adjustData);
		setIngredientEntry({ result });
		// console.log(result);
		setAdjusted(true);
	}
}

export default Result;
