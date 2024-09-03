import React, {useState} from "react";
import "./App.css"
import "bootstrap-icons/font/bootstrap-icons.css";
import IngredientData from "./components/IngredientData.jsx";
import IngredientList from "./components/IngredientList.jsx";
import Header from './components/Header.jsx'
import {recalculateRecipe} from './util/recipeCalculator.js';
import {ListContext} from './store/recipe-list-context.jsx';

function App() {
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
	}

	return (
		<ListContext.Provider value={cntxValue}>
			<header>
				<h1>Re-calculate recipe ingredients</h1>
			</header>
			<main>
				{!isDone ?
					<>
						<Header done = {isDone} edited = {isEdited}/>
						<IngredientData onAdd={addIngredientHandler} />
						<IngredientList done={isDone} empty={isEmpty} active={isActive} />
					</>
				:
					<>
						<Header done = {isDone} edited = {isEdited}/>
						<IngredientList done={isDone} />
					</>
				}
				{isEdited ?
					<>
						<IngredientList ingredientData={ingredientEntry.recipe} edited={isEdited} />
					</> : undefined
				}
			</main>
		</ListContext.Provider>
	);
}
export default App;
