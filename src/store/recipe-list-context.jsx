import {createContext, useState} from "react";
import {recalculateRecipe} from '../util/recipeCalculator.js';

export const ListContext = createContext({
	recipe: [],
	addIngredient: () => { },
	doneAdding: () => { },
	editIngredient: () => { },
	done: false,
	edited: false,
	empty: true,
	active: false
});

export default function ListContextProvider ({children}) {
	const [ingredientEntry, setIngredientEntry] = useState({
		recipe: [],
	});
	const [ isDone, setIsDone ] = useState( false );
	const [ isEdited, setIsEdited ] = useState( false );
	const [ isEmpty, setIsEmpty ] = useState( true );
	const [isActive, setIsActive] = useState( false );


	//to add ingredients to list and render it
	function addIngredientHandler (ingredientData) {
		ingredientEntry.recipe.forEach((entry) => {
			if(entry.ingredient === ingredientData.ingredient)
			{
				console.log('You already have this ingredient');
				throw Error('You already have this ingredient');
			}
		});
		setIngredientEntry((prevState) => {
			const newData = {
				...ingredientData,
			};
			return {
				...prevState,
				recipe: [...prevState.recipe, newData],
			};
		} );
		if( ingredientEntry.recipe.length > 0 || !isDone)
		{
			setIsEmpty( false );
		}
		if( ingredientEntry.recipe.length >= 1 )
		{
			setIsActive( true );
		}
	}

	//when done adding ingredients to the list
	function doneHandler () {
		setIngredientEntry((prevState) => {
			return {
				...prevState,
			};
		} );
		setIsDone( true );

		if(ingredientEntry.recipe.length > 0 && isDone) {
			setIsEmpty( true );
		}
	}

	//when edit one ingredient
	//re-calculating other ingredients in the list
	function editHandler ( ingredient ) {
		const newRecipe = ingredientEntry;
		const ingredientIndex = newRecipe.recipe.findIndex( ( entry ) => entry.ingredient === ingredient.ingredient );
		ingredientEntry.recipe.forEach( entry => {
			if( entry.ingredient !== ingredient.ingredient )
			{
				entry.amount = recalculateRecipe( newRecipe.recipe[ ingredientIndex ].amount, ingredient.amount, entry.amount );
			}
		} )
		newRecipe.recipe[ingredientIndex] = ingredient

		setIngredientEntry( () => {
			return {
				recipe: [...newRecipe.recipe]
			}
		});
		setIsEdited( true );
	}

	const cntxValue = {
		recipe: ingredientEntry.recipe,
		addIngredient: addIngredientHandler,
		doneAdding: doneHandler,
		editIngredient: editHandler,
		done: isDone,
		edited: isEdited,
		empty: isEmpty,
		active: isActive
	}

	return <ListContext.Provider value={cntxValue}>{children}</ListContext.Provider>
}
